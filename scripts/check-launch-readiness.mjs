#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = process.env.LAUNCH_CHECK_ROOT_DIR
  ? path.resolve(process.env.LAUNCH_CHECK_ROOT_DIR)
  : path.resolve(__dirname, "..");

export const FORBIDDEN_STRINGS = [
  "TODO-REAL-DATA",
  "DRAFT-NEEDS-LEGAL-REVIEW",
  "To be provided",
  "legal entity to be provided",
  "DRAFT — PENDING LEGAL REVIEW",
];

/**
 * Strips script, style, and HTML tags to extract rendered visible text from HTML files,
 * ensuring HTML attributes (such as placeholder="...") do not produce false positives.
 */
export function extractRenderedHtmlText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".html", ".md"]);

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  ".gemini",
  "artifacts",
  "docs", // Docs contain historical registers and PLACEHOLDERS.md
  "scripts", // Exclude scripts from self-scanning
  "tests",
]);

/**
 * Recursively find files with target extensions
 */
export function collectFiles(dir, collected = []) {
  if (!fs.existsSync(dir)) return collected;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, collected);
    } else if (entry.isFile() && SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      collected.push(fullPath);
    }
  }
  return collected;
}

/**
 * Core readiness validation logic
 */
export function checkLaunchReadiness(options = {}) {
  const env = options.env || process.env;
  const isLaunchReady = env.NEXT_PUBLIC_LAUNCH_READY === "true";
  const defaultScanDirs = [path.join(ROOT_DIR, "src"), path.join(ROOT_DIR, "messages")];
  const nextAppDir = path.join(ROOT_DIR, ".next", "server", "app");
  if (fs.existsSync(nextAppDir)) {
    defaultScanDirs.push(nextAppDir);
  }
  const scanDirs = options.scanDirs || defaultScanDirs;

  const defaultScanFiles = [];
  const prerenderManifest = path.join(ROOT_DIR, ".next", "prerender-manifest.json");
  if (fs.existsSync(prerenderManifest)) {
    defaultScanFiles.push(prerenderManifest);
  }
  const scanFiles = options.scanFiles !== undefined ? options.scanFiles : defaultScanFiles;

  const violations = [];

  // 1. Env variable validation
  if (isLaunchReady) {
    if (env.NEXT_PUBLIC_APP_ENV !== "production") {
      violations.push({
        type: "ENV_MISCONFIGURATION",
        message: `NEXT_PUBLIC_APP_ENV must be "production" when NEXT_PUBLIC_LAUNCH_READY=true (got "${env.NEXT_PUBLIC_APP_ENV || ""}")`,
      });
    }

    if (env.NEXT_PUBLIC_HAS_LEAD_BACKEND === "true") {
      const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
      if (
        !siteKey ||
        siteKey.startsWith("1x000000") ||
        siteKey.startsWith("2x000000") ||
        siteKey.startsWith("3x000000")
      ) {
        violations.push({
          type: "ENV_MISCONFIGURATION",
          message: `Production Turnstile site key must be a valid Cloudflare site key, not test/placeholder key (got "${siteKey}")`,
        });
      }
    }
  }

  // 2. Scan source, messages, and build files for placeholder tokens
  const allTargetFiles = new Set(scanFiles);
  for (const dir of scanDirs) {
    const files = collectFiles(dir);
    for (const file of files) {
      allTargetFiles.add(file);
    }
  }

  for (const file of allTargetFiles) {
    if (!fs.existsSync(file)) continue;
    const rawContent = fs.readFileSync(file, "utf8");
    const textToScan = file.endsWith(".html") ? extractRenderedHtmlText(rawContent) : rawContent;
    for (const token of FORBIDDEN_STRINGS) {
      if (textToScan.includes(token)) {
        violations.push({
          type: "FORBIDDEN_TOKEN",
          file: path.relative(ROOT_DIR, file),
          token,
        });
      }
    }
  }

  return {
    isLaunchReady,
    violations,
    passed: !isLaunchReady || violations.length === 0,
  };
}

// CLI runner
if (process.argv[1] === __filename) {
  const result = checkLaunchReadiness();

  if (!result.isLaunchReady) {
    console.log(
      `[INFO] Launch readiness check: NEXT_PUBLIC_LAUNCH_READY is false/unset. Scan informational only. Found ${result.violations.length} placeholder occurrences.`,
    );
    process.exit(0);
  }

  if (!result.passed) {
    console.error(
      `[ERROR] Launch readiness check failed! Found ${result.violations.length} launch-blocking violation(s):`,
    );
    for (const v of result.violations) {
      if (v.type === "ENV_MISCONFIGURATION") {
        console.error(`  - [ENV] ${v.message}`);
      } else {
        console.error(`  - [TOKEN] "${v.token}" in ${v.file}`);
      }
    }
    process.exit(1);
  }

  console.log("[SUCCESS] Launch readiness check passed: all launch-blocking checks satisfied.");
  process.exit(0);
}
