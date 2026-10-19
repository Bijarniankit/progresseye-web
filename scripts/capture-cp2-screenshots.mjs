import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

const viewports = [
  { name: "360", width: 360, height: 800 },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 900 },
];

const themes = ["light", "dark"];

async function capture() {
  console.log("Launching Chromium for CP2 screenshots...");
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    for (const th of themes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: th,
      });

      const page = await context.newPage();
      await page.goto("http://localhost:3000/#why", { waitUntil: "networkidle" });

      await page.evaluate((theme) => {
        if (theme === "dark") {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
      }, th);

      // 1. Capture Why Section
      const whySection = page.locator("#why");
      await whySection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const whyFilename = `cp2-why-${vp.name}-${th}.png`;
      await whySection.screenshot({ path: path.join(artifactDir, whyFilename) });
      console.log(`Captured: ${whyFilename}`);

      // 2. Capture Pricing Section
      const pricingSection = page.locator("#pricing");
      await pricingSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const pricingFilename = `cp2-pricing-${vp.name}-${th}.png`;
      await pricingSection.screenshot({ path: path.join(artifactDir, pricingFilename) });
      console.log(`Captured: ${pricingFilename}`);

      await context.close();
    }
  }

  await browser.close();
  console.log("CP2 screenshot captures complete.");
}

capture().catch((err) => {
  console.error("Error capturing CP2 screenshots:", err);
  process.exit(1);
});
