import zlib from "node:zlib";
import { chromium } from "@playwright/test";

async function measureRoute(path) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const chunks = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes("/_next/static/chunks/") && url.endsWith(".js")) {
      try {
        const buf = await res.body();
        const filename = url.split("/").pop().split("?")[0];
        chunks.push({
          name: filename,
          raw: buf.length,
          gzip: zlib.gzipSync(buf).length,
        });
      } catch {}
    }
  });

  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
  await browser.close();

  console.log(`=== JS REQUESTED AT SCROLL 0 FOR '${path}' ===`);
  chunks.forEach((c, i) => {
    const isMotion = c.name.includes("1tzlwb30no9h5");
    const marker = isMotion ? "  <-- [MOTION/REACT RUNTIME]" : "";
    console.log(
      `${(i + 1).toString().padStart(2)}. ${c.name.padEnd(30)} | Gzip: ${c.gzip.toString().padStart(6)} B | Raw: ${c.raw.toString().padStart(7)} B${marker}`,
    );
  });
  const totalGzip = chunks.reduce((a, c) => a + c.gzip, 0);
  const totalRaw = chunks.reduce((a, c) => a + c.raw, 0);
  console.log(
    `TOTAL (${chunks.length} chunks): ${totalGzip} B gzip (${(totalGzip / 1024).toFixed(1)} kB) | ${totalRaw} B raw (${(totalRaw / 1024).toFixed(1)} kB)\n`,
  );
  return chunks;
}

async function main() {
  await measureRoute("/");
  await measureRoute("/features");
}

main().catch(console.error);
