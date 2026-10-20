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
  console.log("Launching Chromium for CP1 screenshots...");
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    for (const th of themes) {
      const filename = `cp1-${vp.name}-${th}.png`;
      const filePath = path.join(artifactDir, filename);

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: th,
      });

      const page = await context.newPage();
      await page.goto("http://localhost:3000/#tour", { waitUntil: "networkidle" });

      await page.evaluate((theme) => {
        if (theme === "dark") {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
      }, th);

      // Scroll to tour section to ensure it is in view and hydrated
      const tour = page.locator("#tour");
      await tour.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      // Capture full page or section
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Captured: ${filename}`);

      await context.close();
    }
  }

  await browser.close();
  console.log("CP1 screenshot captures complete.");
}

capture().catch((err) => {
  console.error("Error during capture:", err);
  process.exit(1);
});
