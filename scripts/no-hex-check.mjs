#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Directories to scan
const targetDirs = [
  path.join(projectRoot, "src", "components"),
  path.join(projectRoot, "src", "app"),
  path.join(projectRoot, "src", "config"),
];

// Whitelisted paths (e.g. multi-stop raw vector SVG illustrations, and Satori OG image constants)
const whitelistedPatterns = [
  path.normalize("src/components/illustrations/"),
  path.normalize("src/config/og-theme.ts"),
];

// Regular expression to match 3, 4, 6, or 8-digit hex colors
const hexColorRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

// Regular expression to match raw rgb(), rgba(), hsl(), hsla() literals
const rgbHslRegex = /(?:^|[^a-zA-Z0-9])(rgba?|hsla?)\s*\([^)]*\)/gi;

// Anchors or ID patterns to ignore
const ignoredContextPatterns = [
  /href=["']#[a-zA-Z0-9_-]+["']/,
  /id=["']#[a-zA-Z0-9_-]+["']/,
  /url\(#[a-zA-Z0-9_-]+\)/,
  /#main-content/,
];

function isWhitelisted(filePath) {
  const normalized = path.normalize(filePath);
  return whitelistedPatterns.some((pattern) => normalized.includes(path.normalize(pattern)));
}

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (/\.(tsx|ts|jsx|js)$/.test(item.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

let totalErrors = 0;
const scannedFiles = [];

for (const dir of targetDirs) {
  const files = getFiles(dir);
  for (const file of files) {
    if (isWhitelisted(file)) {
      continue;
    }
    scannedFiles.push(file);

    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");

    for (const [index, line] of lines.entries()) {
      // Check if line contains ignored patterns
      const hasIgnoredContext = ignoredContextPatterns.some((pat) => pat.test(line));
      if (hasIgnoredContext) {
        continue;
      }

      // 1. Check for raw hex colors
      const hexMatches = line.match(hexColorRegex);
      if (hexMatches) {
        for (const match of hexMatches) {
          const matchIdx = line.indexOf(match);
          const nextChar = line[matchIdx + match.length];
          if (nextChar && /[a-zA-Z0-9_-]/.test(nextChar)) {
            continue;
          }

          console.error(
            `\x1b[31m[NO-HEX-VIOLATION]\x1b[0m ${path.relative(projectRoot, file)}:${index + 1}`,
          );
          console.error(`  Found hex code: \x1b[33m${match}\x1b[0m in line: "${line.trim()}"`);
          console.error(
            "  Hint: Replace with a semantic CSS variable from src/styles/tokens.css\n",
          );
          totalErrors++;
        }
      }

      // 2. Check for raw rgb(), rgba(), hsl(), hsla() literals
      const rgbMatches = line.match(rgbHslRegex);
      if (rgbMatches) {
        for (const match of rgbMatches) {
          console.error(
            `\x1b[31m[NO-RGB-HSL-VIOLATION]\x1b[0m ${path.relative(projectRoot, file)}:${index + 1}`,
          );
          console.error(
            `  Found rgb/hsl literal: \x1b[33m${match.trim()}\x1b[0m in line: "${line.trim()}"`,
          );
          console.error(
            "  Hint: Replace with color-mix(in srgb, var(--color-brand) X%, transparent) or a semantic CSS variable\n",
          );
          totalErrors++;
        }
      }
    }
  }
}

console.log(`[no-hex-check] Scanned ${scannedFiles.length} files.`);
if (totalErrors > 0) {
  console.error(`\x1b[31mFAILED: Found ${totalErrors} raw color violation(s).\x1b[0m`);
  process.exit(1);
} else {
  console.log(
    "\x1b[32mPASSED: Zero raw hex, rgb(), or hsl() colors found in UI components.\x1b[0m",
  );
  process.exit(0);
}
