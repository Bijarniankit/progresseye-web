import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

const standardViewports = [
  { name: "360", width: 360, height: 960 },
  { name: "768", width: 768, height: 980 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1536", width: 1536, height: 850 },
];

const intermediateViewports = [
  { name: "1024", width: 1024, height: 800 },
  { name: "1100", width: 1100, height: 800 },
];

const scenes = [
  { index: 0, num: 1, label: "scene1-overview" },
  { index: 1, num: 2, label: "scene2-features" },
  { index: 2, num: 3, label: "scene3-detail" },
];

const themes = ["light", "dark"];

async function captureAll() {
  console.log("Launching Chromium for comprehensive hero captures...");
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

  // 1. Standard 24 captures with 1200ms wait (guarantees 820ms h1 reveal is complete)
  for (const vp of standardViewports) {
    for (const sc of scenes) {
      for (const th of themes) {
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

        await page.evaluate((theme) => {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
          }
        }, th);

        // Wait 1200ms so the 820ms word reveal and tagline reveal are 100% finished
        await page.waitForTimeout(1200);

        // Freeze animations for crisp static snapshot
        await page.evaluate(freezeCss);
        await page.waitForTimeout(50);

        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`Saved: ${filename}`);

        // If this is Scene 3 at 1280px Light, also capture the clean crop without controls!
        if (vp.name === "1280" && sc.num === 3 && th === "light") {
          const cropPath = path.join(artifactDir, "cp3-scene3-attendance-4rows-crop.png");
          const plateLocator = page.locator('[data-testid="hero-plate"]');
          await plateLocator.screenshot({ path: cropPath });
          console.log(
            `Saved clean detail crop (no controls): cp3-scene3-attendance-4rows-crop.png`,
          );
        }

        // If this is Scene 1 at 360px, capture the plate + note crop
        if (vp.name === "360" && sc.num === 1) {
          const noteCropPath = path.join(artifactDir, `hero-360-note-crop-${th}.png`);
          const plateAndNoteContainer = page.locator("div.grid > div.flex.flex-col.items-center");
          await plateAndNoteContainer.screenshot({ path: noteCropPath });
          console.log(`Saved 360px note crop: hero-360-note-crop-${th}.png`);
        }

        await context.close();
      }
    }
  }

  // 2. Intermediate viewports: 1024px and 1100px (Scene 1 and Scene 3)
  for (const vp of intermediateViewports) {
    for (const sc of [scenes[0], scenes[2]]) {
      for (const th of themes) {
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

        await page.evaluate((theme) => {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
          }
        }, th);

        await page.waitForTimeout(1200);
        await page.evaluate(freezeCss);
        await page.waitForTimeout(50);

        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`Saved intermediate: ${filename}`);
        await context.close();
      }
    }
  }

  // 3. No-JS Captures (1280px and 360px) to verify pure HTML rendering
  {
    const noJsCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      javaScriptEnabled: false,
    });
    const page = await noJsCtx.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    const noJsPath1280 = path.join(artifactDir, "hero-1280-nojs-fallback.png");
    await page.screenshot({ path: noJsPath1280, fullPage: false });
    console.log(`Saved: hero-1280-nojs-fallback.png`);
    await noJsCtx.close();
  }

  {
    const noJsCtx360 = await browser.newContext({
      viewport: { width: 360, height: 860 },
      javaScriptEnabled: false,
    });
    const page = await noJsCtx360.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    const noJsPath360 = path.join(artifactDir, "hero-360-nojs-fallback.png");
    await page.screenshot({ path: noJsPath360, fullPage: false });
    console.log(`Saved: hero-360-nojs-fallback.png`);
    await noJsCtx360.close();
  }

  await browser.close();
  console.log("All captures completed successfully!");
}

captureAll().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
