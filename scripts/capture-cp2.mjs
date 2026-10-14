import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

async function capture() {
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: "mobile-360", width: 360, height: 740 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1280", width: 1280, height: 800 },
    { name: "ultrawide-1536", width: 1536, height: 900 },
  ];

  const scenes = [
    { id: 0, name: "scene1-school" },
    { id: 1, name: "scene2-features" },
    { id: 2, name: "scene3-detail" },
  ];

  // Modes to capture:
  // 1. Light Mode (scene 0, 1, 2)
  // 2. Dark Mode Option A (identical artwork on lighter dark plate) (scene 0, 1, 2)
  // 3. Dark Mode Option B (dark-adapted variant) (scene 0, 1, 2)
  const modes = [
    { modeName: "light", theme: "light", option: "a" },
    { modeName: "dark-optA", theme: "dark", option: "a" },
    { modeName: "dark-optB", theme: "dark", option: "b" },
  ];

  for (const scene of scenes) {
    for (const mode of modes) {
      for (const vp of viewports) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: mode.theme,
        });
        const page = await context.newPage();

        const url = `http://localhost:3000/?scene=${scene.id}&option=${mode.option}`;
        await page.goto(url, { waitUntil: "networkidle" });

        // Ensure html dark class reflects the theme
        if (mode.theme === "dark") {
          await page.evaluate(() => {
            document.documentElement.classList.add("dark");
          });
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove("dark");
          });
        }

        // Wait for fonts and styles to render
        await page.waitForTimeout(400);

        const filename = `cp2-${scene.name}-${mode.modeName}-${vp.name}.png`;
        const outputPath = path.join(artifactDir, filename);

        // Full viewport screenshot showing navbar, hero, gutters, and alignment
        await page.screenshot({ path: outputPath, fullPage: false });
        console.log(`Saved screenshot: ${filename}`);

        await context.close();
      }
    }
  }

  await browser.close();
  console.log("CP2 screenshot capture successfully complete.");
}

capture().catch((e) => {
  console.error("Capture error:", e);
  process.exit(1);
});
