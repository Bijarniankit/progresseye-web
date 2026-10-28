import { chromium } from "@playwright/test";

const widths = [320, 360, 412];

async function measure() {
  const browser = await chromium.launch({ headless: true });
  console.log("=== CLS Measurement Across 3 Viewport Widths ===");

  for (const w of widths) {
    const context = await browser.newContext({
      viewport: { width: w, height: 640 },
    });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.__cls = 0;
      window.__shifts = [];
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__cls += entry.value;
            window.__shifts.push({ value: entry.value, sources: entry.sources });
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const cls = await page.evaluate(() => window.__cls);
    const shifts = await page.evaluate(() => window.__shifts);

    console.log(`Width ${w}px -> CLS: ${cls.toFixed(4)}, Shift entries: ${shifts.length}`);
    await context.close();
  }

  await browser.close();
}

measure().catch(console.error);
