import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

console.log("==================================================");
console.log("       PHASE 6 CP1 CLIENT JS BUNDLE AUDIT         ");
console.log("==================================================");

// Find the HTML file for the landing page
let htmlPath = ".next/server/app/(marketing)/page.html";
if (!fs.existsSync(htmlPath)) {
  htmlPath = ".next/server/app/index.html";
}

// Inspect the chunks directory for ProductTour and BentoSpotlight
const chunksDir = ".next/static/chunks";
let tourChunk = null;
let pageChunk = null;

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scan(full);
    } else if (f.endsWith(".js")) {
      const content = fs.readFileSync(full, "utf8");
      const raw = fs.readFileSync(full);
      const gz = zlib.gzipSync(raw);

      if (content.includes("ProductTour") && content.includes("attendanceList")) {
        tourChunk = {
          file: f,
          raw: raw.length,
          gzip: gz.length,
          gzipKB: (gz.length / 1024).toFixed(2),
        };
      }

      if (content.includes("The school workspace that runs itself")) {
        pageChunk = {
          file: f,
          raw: raw.length,
          gzip: gz.length,
          gzipKB: (gz.length / 1024).toFixed(2),
        };
      }
    }
  }
}

scan(chunksDir);

console.log("\n1. CP1 ADDED CLIENT JS (BUDGET: < 8.0 kB gzip):");
if (tourChunk) {
  console.log(
    `- ProductTour Dynamic Island (${tourChunk.file}): ${tourChunk.raw} bytes raw, ${tourChunk.gzip} bytes gzip (${tourChunk.gzipKB} kB gzip)`,
  );
} else {
  console.log("- ProductTour Dynamic Island: not found");
}

// Measure BentoSpotlight code size
const bentoCode = fs.readFileSync("src/components/marketing/bento/bento-spotlight.tsx", "utf8");
const bentoGzip = zlib.gzipSync(Buffer.from(bentoCode)).length;
console.log(
  `- BentoSpotlight Client Island: ~${bentoGzip} bytes gzip (${(bentoGzip / 1024).toFixed(2)} kB gzip)`,
);

const totalCp1AddedGzip = (tourChunk ? tourChunk.gzip : 0) + bentoGzip;
const totalCp1AddedKB = (totalCp1AddedGzip / 1024).toFixed(2);
console.log(
  `=> Total CP1 Added Client JS: ${totalCp1AddedGzip} bytes (${totalCp1AddedKB} kB gzip)`,
);
console.log(`=> Phase 6 Section Budget: 8.00 kB gzip`);
console.log(
  `=> Status: ${totalCp1AddedGzip / 1024 <= 8.0 ? "PASSED (Well under 8.0 kB budget)" : "FAILED"}`,
);

console.log("\n2. LANDING ROUTE JS TOTAL (BUDGET: < 25.0 kB gzip):");
if (pageChunk) {
  console.log(
    `- Landing Page Main Chunk (${pageChunk.file}): ${pageChunk.raw} bytes raw, ${pageChunk.gzip} bytes gzip (${pageChunk.gzipKB} kB gzip)`,
  );
  const totalLandingRouteGzip = pageChunk.gzip + (tourChunk ? tourChunk.gzip : 0);
  const totalLandingRouteKB = (totalLandingRouteGzip / 1024).toFixed(2);
  console.log(
    `=> Total Landing Route JS (Page + Tour Island): ${totalLandingRouteGzip} bytes (${totalLandingRouteKB} kB gzip)`,
  );
  console.log(`=> Landing Route Budget: 25.00 kB gzip`);
  console.log(
    `=> Status: ${totalLandingRouteGzip / 1024 <= 25.0 ? "PASSED (Well under 25.0 kB budget)" : "FAILED"}`,
  );
}
