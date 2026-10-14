import { chromium } from "@playwright/test";

async function measureHydrationCls() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Record CLS during entire page load and hydration
  await page.addInitScript(() => {
    window.__clsEntries = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__clsEntries.push(entry.value);
        }
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const totalCls = await page.evaluate(() => {
    const entries = window.__clsEntries || [];
    return entries.reduce((sum, val) => sum + val, 0);
  });

  console.log(`Measured Cumulative Layout Shift (CLS) across hydration: ${totalCls.toFixed(4)}`);
  await browser.close();
}

measureHydrationCls();
