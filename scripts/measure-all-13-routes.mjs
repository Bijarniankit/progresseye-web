import { spawn } from "node:child_process";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.resolve(__dirname, "..");

const ROUTES = [
  "/",
  "/about",
  "/features",
  "/demo",
  "/careers",
  "/get-started",
  "/faq",
  "/contact",
  "/login",
  "/privacy",
  "/terms",
  "/cookies",
  "/gdpr",
];

const PHASE8_BASELINE = {
  "/": { chunks: 15, gzip: 219484 },
  "/about": { chunks: 14, gzip: 209359 },
  "/features": { chunks: 14, gzip: 209359 },
  "/demo": { chunks: 15, gzip: 212748 },
  "/careers": { chunks: 14, gzip: 209359 },
  "/get-started": { chunks: 14, gzip: 209359 },
  "/faq": { chunks: 14, gzip: 209359 },
  "/contact": { chunks: 15, gzip: 212748 },
  "/login": { chunks: 14, gzip: 209359 },
  "/privacy": { chunks: 14, gzip: 208413 },
  "/terms": { chunks: 14, gzip: 208413 },
  "/cookies": { chunks: 14, gzip: 209359 },
  "/gdpr": { chunks: 14, gzip: 209359 },
};

function waitForServer(port) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start > 30000) {
        clearInterval(interval);
        reject(new Error("Timeout waiting for server"));
        return;
      }
      const req = http.get(`http://localhost:${port}/`, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      });
      req.on("error", () => {});
    }, 300);
  });
}

async function main() {
  const port = 3008;
  console.log(`Starting next start on port ${port}...`);
  const server = spawn("pnpm", ["next", "start", "-p", String(port)], {
    shell: true,
    stdio: "inherit",
    cwd: WEB_ROOT,
  });

  try {
    await waitForServer(port);
    console.log(`Server is ready on port ${port}. Measuring all 13 routes...`);

    const browser = await chromium.launch();
    const results = [];

    for (const route of ROUTES) {
      // Use clean, isolated context per route
      const context = await browser.newContext();
      const page = await context.newPage();
      const jsResponses = [];

      page.on("response", async (res) => {
        const url = res.url();
        const headers = res.headers();
        const contentType = headers["content-type"] || "";

        // Strict JS chunk matching - ignore css, sourcemaps, etc.
        const isJs =
          (url.endsWith(".js") || contentType.includes("javascript")) &&
          !url.endsWith(".css") &&
          !url.endsWith(".map");

        if (isJs && (url.includes("/_next/static/chunks/") || url.includes("/_next/static/"))) {
          try {
            const buffer = await res.body();
            jsResponses.push({
              url,
              name: url.split("/").pop().split("?")[0],
              rawSize: buffer.length,
              gzipSize: zlib.gzipSync(buffer).length,
            });
          } catch {}
        }
      });

      await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle" });
      await page.close();
      await context.close();

      const totalRaw = jsResponses.reduce((acc, r) => acc + r.rawSize, 0);
      const totalGzip = jsResponses.reduce((acc, r) => acc + r.gzipSize, 0);

      results.push({
        route,
        chunks: jsResponses.length,
        raw: totalRaw,
        gzip: totalGzip,
        chunkList: jsResponses.map((r) => ({ name: r.name, gzip: r.gzipSize, raw: r.rawSize })),
      });
    }

    await browser.close();

    console.log(
      "\n=========================================================================================",
    );
    console.log("ROUTE JS TRANSFER RECONCILIATION TABLE (GZIP ONLY VS PHASE 8 BASELINE)");
    console.log(
      "=========================================================================================",
    );
    console.log(
      `${"Route".padEnd(16)} | ${"Chunks".padEnd(7)} | ${"Gzip Transfer".padEnd(14)} | ${"Phase 8 Gzip".padEnd(13)} | ${"Delta vs P8".padEnd(12)} | Status`,
    );
    console.log(
      "-----------------+---------+----------------+---------------+--------------+---------",
    );

    for (const res of results) {
      const p8 = PHASE8_BASELINE[res.route] || { chunks: 14, gzip: 209359 };
      const delta = res.gzip - p8.gzip;
      const deltaStr = delta > 0 ? `+${delta} B` : `${delta} B`;
      const status = delta <= 1024 ? "PASS (<= +1kB)" : "FAIL (> +1kB)";
      console.log(
        `${res.route.padEnd(16)} | ${res.chunks.toString().padEnd(7)} | ${(`${res.gzip.toLocaleString()} B`).padEnd(14)} | ${(`${p8.gzip.toLocaleString()} B`).padEnd(13)} | ${deltaStr.padEnd(12)} | ${status}`,
      );
    }
    console.log(
      "=========================================================================================\n",
    );

    console.log("CHUNKS ON ROUTE '/' (Home):");
    const home = results.find((r) => r.route === "/");
    home?.chunkList.forEach((c, i) => {
      console.log(
        `  ${(i + 1).toString().padStart(2)}. ${c.name.padEnd(30)}: ${c.gzip.toString().padStart(6)} B gzip (${c.raw} B raw)`,
      );
    });

    console.log("\nCHUNKS ON ROUTE '/about':");
    const about = results.find((r) => r.route === "/about");
    about?.chunkList.forEach((c, i) => {
      console.log(
        `  ${(i + 1).toString().padStart(2)}. ${c.name.padEnd(30)}: ${c.gzip.toString().padStart(6)} B gzip (${c.raw} B raw)`,
      );
    });

    console.log("\nCHUNKS ON ROUTE '/privacy':");
    const privacy = results.find((r) => r.route === "/privacy");
    privacy?.chunkList.forEach((c, i) => {
      console.log(
        `  ${(i + 1).toString().padStart(2)}. ${c.name.padEnd(30)}: ${c.gzip.toString().padStart(6)} B gzip (${c.raw} B raw)`,
      );
    });

    console.log("\nCHUNKS ON ROUTE '/contact':");
    const contact = results.find((r) => r.route === "/contact");
    contact?.chunkList.forEach((c, i) => {
      console.log(
        `  ${(i + 1).toString().padStart(2)}. ${c.name.padEnd(30)}: ${c.gzip.toString().padStart(6)} B gzip (${c.raw} B raw)`,
      );
    });
  } finally {
    console.log("Stopping server...");
    server.kill();
  }
}

main().catch(console.error);
