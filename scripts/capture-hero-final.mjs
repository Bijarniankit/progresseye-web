import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

const viewports = [
  { name: "360", width: 360, height: 860 },
  { name: "768", width: 768, height: 980 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1536", width: 1536, height: 850 },
];

const scenes = [
  { index: 0, num: 1, label: "scene1-overview" },
  { index: 1, num: 2, label: "scene2-features" },
  { index: 2, num: 3, label: "scene3-detail" },
];

const themes = ["light", "dark"];

async function captureAll() {
  console.log("Launching Chromium for 24 Full-Viewport Captures...");
  const browser = await chromium.launch({ headless: true });

  const freezeCss = () => {
    const style = document.createElement("style");
    style.id = "freeze-animations-qa";
    style.innerHTML = `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  let count = 0;

  for (const vp of viewports) {
    for (const sc of scenes) {
      for (const th of themes) {
        count++;
        const filename = `hero-${vp.name}-scene${sc.num}-${th}.png`;
        const filePath = path.join(artifactDir, filename);

        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: th,
        });

        const page = await context.newPage();
        await page.goto(`http://localhost:3000/?scene=${sc.index}`, {
          waitUntil: "networkidle",
        });

        // Set theme class on root html
        await page.evaluate((theme) => {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
          }
        }, th);

        // Wait for fonts & layout stabilization
        await page.waitForTimeout(400);

        // Freeze animations for perfectly crisp capture
        await page.evaluate(freezeCss);
        await page.waitForTimeout(100);

        // Capture full viewport
        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`[${count}/24] Saved: ${filename}`);

        await context.close();
      }
    }
  }

  // Also capture no-JS 1280 capture for verification
  {
    const noJsCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      javaScriptEnabled: false,
    });
    const page = await noJsCtx.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    const noJsPath = path.join(artifactDir, "hero-1280-nojs-fallback.png");
    await page.screenshot({ path: noJsPath, fullPage: false });
    console.log(`[Bonus] Saved: hero-1280-nojs-fallback.png`);
    await noJsCtx.close();
  }

  await browser.close();
  console.log("All 24 full-viewport screenshots captured successfully!");
}

captureAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
