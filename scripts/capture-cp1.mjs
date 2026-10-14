import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

async function capture() {
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: "desktop-1280", width: 1280, height: 800 },
    { name: "mobile-360", width: 360, height: 740 },
  ];

  for (const vp of viewports) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme,
      });
      const page = await context.newPage();
      await page.goto("http://localhost:3000/");

      // Ensure theme is set properly via next-themes or html class
      if (theme === "dark") {
        await page.evaluate(() => {
          document.documentElement.classList.add("dark");
        });
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.remove("dark");
        });
      }

      await page.waitForTimeout(600); // allow transitions to settle

      const hero = page.locator("section[aria-label='Hero overview']");
      const filename = `cp1-hero-${vp.name}-${theme}.png`;
      const outputPath = path.join(artifactDir, filename);

      await hero.screenshot({ path: outputPath });
      console.log(`Saved screenshot: ${filename}`);

      await context.close();
    }
  }

  await browser.close();
  console.log("CP1 screenshot capture complete.");
}

capture().catch((e) => {
  console.error("Capture error:", e);
  process.exit(1);
});
