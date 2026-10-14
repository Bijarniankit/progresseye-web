import { chromium } from "@playwright/test";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const requests = [];

  page.on("response", async (response) => {
    const req = response.request();
    const url = req.url();
    const resourceType = req.resourceType();
    const status = response.status();
    let size = 0;
    try {
      const buffer = await response.body();
      size = buffer.length;
    } catch {
      // ignore
    }
    requests.push({ url, resourceType, status, size });
  });

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  console.log("=== Network Requests on http://localhost:3000/ ===");
  const fonts = [];
  const css = [];
  const js = [];
  const others = [];

  for (const r of requests) {
    if (r.resourceType === "font") fonts.push(r);
    else if (r.resourceType === "stylesheet") css.push(r);
    else if (r.resourceType === "script") js.push(r);
    else others.push(r);
  }

  console.log(`\n--- Fonts (${fonts.length} total) ---`);
  for (const f of fonts) {
    console.log(`[FONT] ${f.url} | ${(f.size / 1024).toFixed(2)} KB`);
  }

  console.log(`\n--- CSS (${css.length} total) ---`);
  for (const c of css) {
    console.log(`[CSS] ${c.url} | ${(c.size / 1024).toFixed(2)} KB`);
  }

  console.log(`\n--- JS (${js.length} total) ---`);
  for (const j of js) {
    console.log(`[JS] ${j.url} | ${(j.size / 1024).toFixed(2)} KB`);
  }

  console.log(`\n--- Others (${others.length} total) ---`);
  for (const o of others) {
    console.log(`[${o.resourceType}] ${o.url} | ${(o.size / 1024).toFixed(2)} KB`);
  }

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
