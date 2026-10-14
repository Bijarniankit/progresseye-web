import { chromium } from "@playwright/test";

async function measure() {
  const browser = await chromium.launch();
  const viewports = [360, 768, 1024, 1280, 1536];

  for (const js of [true, false]) {
    console.log(`\n--- JavaScript ${js ? "ENABLED" : "DISABLED"} ---`);
    for (const w of viewports) {
      const context = await browser.newContext({
        viewport: { width: w, height: 800 },
        javaScriptEnabled: js,
      });
      const page = await context.newPage();
      await page.goto("http://localhost:3000/");
      if (js) await page.waitForTimeout(500);

      const plate = page.locator('[data-testid="hero-plate"]');
      const box = await plate.boundingBox();
      console.log(
        `Width ${w}px -> Plate: ${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)}px`,
      );
      await context.close();
    }
  }
  await browser.close();
}

measure();
