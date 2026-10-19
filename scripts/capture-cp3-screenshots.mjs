import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

const viewports = [
  { name: "360", width: 360, height: 800 },
  { name: "1280", width: 1280, height: 900 },
];

const themes = ["light", "dark"];

async function capture() {
  console.log("Launching Chromium for CP3 screenshots...");
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    for (const th of themes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: th,
      });

      const page = await context.newPage();
      await page.goto("http://localhost:3000/#faq", { waitUntil: "networkidle" });

      await page.evaluate((theme) => {
        if (theme === "dark") {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
      }, th);

      // 1. Capture FAQ Section
      const faqSection = page.locator("#faq");
      await faqSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      // Expand first FAQ item so accordion state is visible in screenshot
      const firstSummary = faqSection.locator("summary").first();
      await firstSummary.click();
      await page.waitForTimeout(200);

      const faqFilename = `faq-${vp.name}-${th}.png`;
      await faqSection.screenshot({ path: path.join(artifactDir, faqFilename) });
      console.log(`Captured: ${faqFilename}`);

      // 2. Capture Final CTA Section
      const ctaSection = page.locator("#cta");
      await ctaSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const ctaFilename = `cta-${vp.name}-${th}.png`;
      await ctaSection.screenshot({ path: path.join(artifactDir, ctaFilename) });
      console.log(`Captured: ${ctaFilename}`);

      await context.close();
    }
  }

  await browser.close();
  console.log("CP3 screenshot captures complete.");
}

capture().catch((err) => {
  console.error("Error capturing CP3 screenshots:", err);
  process.exit(1);
});
