import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");

// Verify that the actual casing on the filesystem matches the requested segment exactly
function verifySegmentCasing(parentDir, segment) {
  if (!fs.existsSync(parentDir)) return false;
  const entries = fs.readdirSync(parentDir);
  return entries.includes(segment);
}

function verifyPathCasing(targetPath) {
  const relativeFromRoot = path.relative(rootDir, targetPath);
  const segments = relativeFromRoot.split(path.sep);

  let current = rootDir;
  for (const segment of segments) {
    if (!verifySegmentCasing(current, segment)) {
      return {
        matched: false,
        failedSegment: segment,
        inDirectory: current,
        available: fs.existsSync(current) ? fs.readdirSync(current) : [],
      };
    }
    current = path.join(current, segment);
  }
  return { matched: true };
}

// Resolve import specifier to file on disk
const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".json", ".css", ".woff", ".woff2"];

function resolveImportPath(importerFile, importSpecifier) {
  let resolvedBase = null;

  if (importSpecifier.startsWith("@/")) {
    resolvedBase = path.join(srcDir, importSpecifier.slice(2));
  } else if (importSpecifier.startsWith("./") || importSpecifier.startsWith("../")) {
    resolvedBase = path.resolve(path.dirname(importerFile), importSpecifier);
  } else {
    // External package import (e.g., 'react', 'next')
    return null;
  }

  // Check exact file match
  if (fs.existsSync(resolvedBase) && fs.statSync(resolvedBase).isFile()) {
    return resolvedBase;
  }

  // Check with extensions
  for (const ext of EXTENSIONS) {
    const withExt = resolvedBase + ext;
    if (fs.existsSync(withExt) && fs.statSync(withExt).isFile()) {
      return withExt;
    }
  }

  // Check index file inside directory
  for (const ext of EXTENSIONS) {
    const indexWithExt = path.join(resolvedBase, `index${ext}`);
    if (fs.existsSync(indexWithExt) && fs.statSync(indexWithExt).isFile()) {
      return indexWithExt;
    }
  }

  return null;
}

function scanFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== "generated") {
        results = results.concat(scanFiles(fullPath));
      }
    } else if (/\.(tsx?|jsx?|mjs)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

console.log("=== ProgressEye Case-Sensitivity Verification ===");
const files = scanFiles(srcDir);
let errors = 0;
let checkedImports = 0;

const importRegex = /(?:import|export)\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]/g;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const matches = [...content.matchAll(importRegex)];
  for (const match of matches) {
    const importSpecifier = match[1];
    if (!importSpecifier.startsWith(".") && !importSpecifier.startsWith("@/")) {
      continue;
    }

    const resolved = resolveImportPath(file, importSpecifier);
    if (!resolved) {
      console.error(
        `[UNRESOLVED] In ${path.relative(rootDir, file)}: Cannot resolve "${importSpecifier}"`,
      );
      errors++;
      continue;
    }

    checkedImports++;
    const check = verifyPathCasing(resolved);
    if (!check.matched) {
      console.error(
        `[CASING MISMATCH] In ${path.relative(rootDir, file)}: "${importSpecifier}"\n` +
          `  Failed segment: "${check.failedSegment}" in "${path.relative(rootDir, check.inDirectory)}"\n` +
          `  Actual filesystem entries: [${check.available.join(", ")}]`,
      );
      errors++;
    }
  }
}

console.log(`\nVerified ${checkedImports} local imports across ${files.length} source files.`);
if (errors > 0) {
  console.error(`FAILED: ${errors} case-sensitivity error(s) found!`);
  process.exit(1);
} else {
  console.log("PASSED: 100% case-sensitivity compliance verified against file system.");
}
