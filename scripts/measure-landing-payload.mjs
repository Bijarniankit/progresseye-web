import zlib from "node:zlib";
import { chromium } from "@playwright/test";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const responses = [];

  page.on("response", async (res) => {
    try {
      const buffer = await res.body();
      const headers = res.headers();
      responses.push({
        url: res.url(),
        status: res.status(),
        contentType: headers["content-type"] || "",
        rawSize: buffer.length,
        gzipSize: zlib.gzipSync(buffer).length,
      });
    } catch {}
  });

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await browser.close();

  const html = responses.find(
    (r) => r.url === "http://localhost:3000/" || r.contentType.includes("text/html"),
  );
  const cssList = responses.filter(
    (r) => r.contentType.includes("text/css") || r.url.endsWith(".css"),
  );
  const jsList = responses.filter(
    (r) =>
      r.contentType.includes("javascript") ||
      r.url.endsWith(".js") ||
      r.url.includes("/_next/static/chunks/"),
  );

  const totalCssRaw = cssList.reduce((acc, r) => acc + r.rawSize, 0);
  const totalCssGzip = cssList.reduce((acc, r) => acc + r.gzipSize, 0);

  const totalJsRaw = jsList.reduce((acc, r) => acc + r.rawSize, 0);
  const totalJsGzip = jsList.reduce((acc, r) => acc + r.gzipSize, 0);

  console.log("=========================================");
  console.log("     TRANSFER SIZES FOR ROUTE '/'        ");
  console.log("=========================================");
  if (html) {
    console.log(
      `HTML Document: ${html.rawSize.toLocaleString()} B raw (${(html.rawSize / 1024).toFixed(1)} kB) | ${html.gzipSize.toLocaleString()} B gzip (${(html.gzipSize / 1024).toFixed(1)} kB)`,
    );
  }
  console.log(
    `Total CSS (${cssList.length} file): ${totalCssRaw.toLocaleString()} B raw (${(totalCssRaw / 1024).toFixed(1)} kB) | ${totalCssGzip.toLocaleString()} B gzip (${(totalCssGzip / 1024).toFixed(1)} kB)`,
  );
  console.log(
    `Total JS (${jsList.length} chunks): ${totalJsRaw.toLocaleString()} B raw (${(totalJsRaw / 1024).toFixed(1)} kB) | ${totalJsGzip.toLocaleString()} B gzip (${(totalJsGzip / 1024).toFixed(1)} kB)`,
  );

  console.log("\n=========================================");
  console.log("       REAL CHUNK LIST FOR ROUTE '/'     ");
  console.log("=========================================");
  jsList.forEach((r, idx) => {
    const filename = r.url.split("/").pop().split("?")[0];
    const isMotion = filename.includes("0_cx2_ft5g-al");
    const marker = isMotion ? "  <-- [MOTION/REACT VENDOR CHUNK]" : "";
    console.log(
      `${(idx + 1).toString().padStart(2, " ")}. ${filename.padEnd(30, " ")} | Raw: ${r.rawSize.toString().padStart(6, " ")} B | Gzip: ${r.gzipSize.toString().padStart(5, " ")} B${marker}`,
    );
  });
  console.log("=========================================");
}

main().catch(console.error);
