import path from "node:path";
import { expect, test } from "@playwright/test";

const artifactDir = "C:/Users/ankit/.gemini/antigravity/brain/372d7063-5f3e-4649-9080-0274d00a3078";

const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "ultrawide-1536", width: 1536, height: 960 },
];

test.describe("Marketing Shell — Visual QA Screenshots", () => {
  for (const vp of viewports) {
    test(`captures ${vp.name} in Light and Dark mode`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Light mode full-page capture
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      });
      await page.waitForTimeout(400);

      const lightPath = path.join(artifactDir, `marketing-${vp.name}-light.png`);
      await page.screenshot({ path: lightPath, fullPage: true });

      // If ultra-wide 1536, also capture footer closeup to confirm watermark text separation
      if (vp.width === 1536) {
        const footerLocator = page.locator("footer");
        await footerLocator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        const footerLightPath = path.join(artifactDir, "watermark-1536-light.png");
        await footerLocator.screenshot({ path: footerLightPath });
      }

      // Switch to Dark Mode
      await page.evaluate(() => {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      });
      await page.waitForTimeout(400);

      const darkPath = path.join(artifactDir, `marketing-${vp.name}-dark.png`);
      await page.screenshot({ path: darkPath, fullPage: true });

      // If ultra-wide 1536, also capture footer closeup in dark mode
      if (vp.width === 1536) {
        const footerLocator = page.locator("footer");
        await footerLocator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        const footerDarkPath = path.join(artifactDir, "watermark-1536-dark.png");
        await footerLocator.screenshot({ path: footerDarkPath });
      }
    });
  }

  test("captures open Mobile Drawer at 360px and 767px in Light and Dark mode", async ({
    page,
  }) => {
    for (const width of [360, 767]) {
      await page.setViewportSize({ width, height: 800 });

      // Light mode drawer
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      });
      const menuButton = page.getByRole("button", { name: /open navigation menu/i });
      await menuButton.click();
      await page.waitForTimeout(400);

      const drawerLightPath = path.join(artifactDir, `drawer-${width}-light.png`);
      await page.screenshot({ path: drawerLightPath });

      // Toggle dark mode in drawer
      await page.evaluate(() => {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      });
      await page.waitForTimeout(400);

      const drawerDarkPath = path.join(artifactDir, `drawer-${width}-dark.png`);
      await page.screenshot({ path: drawerDarkPath });
    }
  });
});
