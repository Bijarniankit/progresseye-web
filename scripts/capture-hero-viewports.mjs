import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { width: 320, height: 640, name: "320" },
  { width: 360, height: 640, name: "360" },
  { width: 390, height: 844, name: "390" },
  { width: 412, height: 915, name: "412" },
  { width: 768, height: 1024, name: "768" },
  { width: 1024, height: 768, name: "1024" },
  { width: 1280, height: 800, name: "1280" },
];

const OUT_DIR = "C:/Users/ankit/.gemini/antigravity/brain/372d7063-5f3e-4649-9080-0274d00a3078/screenshots";
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  const summary = [];

  for (const vp of VIEWPORTS) {
    for (const theme of ["light", "dark"]) {
      // 100% zoom
      {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: theme,
        });
        const page = await context.newPage();
        await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
        
        // Wait for theme application
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove("dark"));
        }
        await page.waitForTimeout(300);

        const editorial = page.locator("section[aria-label='Hero overview'] div.lg\\:col-span-6").first();
        const editorialBox = await editorial.boundingBox();
        const carousel = page.locator("[data-testid='hero-plate-container']").first();
        const carouselBox = await carousel.boundingBox();

        const file = path.join(OUT_DIR, `hero-${vp.name}-${theme}-100zoom.png`);
        await page.screenshot({ path: file, fullPage: false });

        summary.push({
          viewport: vp.name,
          theme,
          zoom: "100%",
          editorialHeight: Math.round(editorialBox?.height || 0),
          carouselTop: Math.round(carouselBox?.y || 0),
          file: path.basename(file),
        });
        await context.close();
      }

      // 200% text zoom (deviceScaleFactor / zoom emulation)
      {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: theme,
        });
        const page = await context.newPage();
        await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove("dark"));
        }
        // Emulate 200% font zoom by scaling font size on root
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "200%";
        });
        await page.waitForTimeout(300);

        const editorial = page.locator("section[aria-label='Hero overview'] div.lg\\:col-span-6").first();
        const editorialBox = await editorial.boundingBox();
        const carousel = page.locator("[data-testid='hero-plate-container']").first();
        const carouselBox = await carousel.boundingBox();

        const file = path.join(OUT_DIR, `hero-${vp.name}-${theme}-200zoom.png`);
        await page.screenshot({ path: file, fullPage: false });

        summary.push({
          viewport: vp.name,
          theme,
          zoom: "200%",
          editorialHeight: Math.round(editorialBox?.height || 0),
          carouselTop: Math.round(carouselBox?.y || 0),
          file: path.basename(file),
        });
        await context.close();
      }
    }
  }

  // Mobile throttled cold load vs repeat visit (360 and 412 widths)
  for (const w of [360, 412]) {
    for (const theme of ["light", "dark"]) {
      // Cold load with font blocking / network delay (fallback font)
      const context = await browser.newContext({
        viewport: { width: w, height: 640 },
        colorScheme: theme,
      });
      const page = await context.newPage();
      
      // Block font files to capture exact fallback font stack
      await page.route("**/*.woff2", (route) => route.abort());
      await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
      if (theme === "dark") {
        await page.evaluate(() => document.documentElement.classList.add("dark"));
      }
      await page.waitForTimeout(500);
      const coldFile = path.join(OUT_DIR, `fallback-stack-${w}-${theme}-cold.png`);
      await page.screenshot({ path: coldFile });
      await context.close();

      // Repeat visit with fonts loaded
      const context2 = await browser.newContext({
        viewport: { width: w, height: 640 },
        colorScheme: theme,
      });
      const page2 = await context2.newPage();
      await page2.goto("http://localhost:3000/", { waitUntil: "networkidle" });
      if (theme === "dark") {
        await page2.evaluate(() => document.documentElement.classList.add("dark"));
      }
      await page2.waitForTimeout(500);
      const repeatFile = path.join(OUT_DIR, `loaded-stack-${w}-${theme}-repeat.png`);
      await page2.screenshot({ path: repeatFile });
      await context2.close();
    }
  }

  await browser.close();

  console.log(JSON.stringify(summary, null, 2));
}

run().catch(console.error);
