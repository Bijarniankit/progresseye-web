import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const OUT_DIR = path.resolve(process.cwd(), "runner-screenshots");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  console.log("=== Capturing Fallback & Viewport Screenshots ===");
  const findings = [];

  // 1. Fallback screenshots at 360 and 412: light & dark, cold (fallback font) & repeat (loaded font)
  for (const w of [360, 412]) {
    for (const theme of ["light", "dark"]) {
      // Cold load with font requests aborted -> renders fallback font stack (DejaVu Sans on Ubuntu)
      {
        const context = await browser.newContext({
          viewport: { width: w, height: 740 },
          colorScheme: theme,
        });
        const page = await context.newPage();
        await page.route("**/*.woff2", (route) => route.abort());
        await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove("dark"));
        }
        await page.waitForTimeout(500);

        const coldFile = path.join(OUT_DIR, `fallback-stack-${w}-${theme}-cold.png`);
        await page.screenshot({ path: coldFile, fullPage: false });
        console.log(`Saved cold fallback screenshot: ${path.basename(coldFile)}`);
        await context.close();
      }

      // Repeat visit: fonts load normally
      {
        const context = await browser.newContext({
          viewport: { width: w, height: 740 },
          colorScheme: theme,
        });
        const page = await context.newPage();
        await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove("dark"));
        }
        await page.evaluate(async () => {
          if (document.fonts) await document.fonts.ready;
        });
        await page.waitForTimeout(500);

        const repeatFile = path.join(OUT_DIR, `loaded-stack-${w}-${theme}-repeat.png`);
        await page.screenshot({ path: repeatFile, fullPage: false });
        console.log(`Saved repeat loaded screenshot: ${path.basename(repeatFile)}`);
        await context.close();
      }
    }
  }

  // 2. Viewport inspection: 320 (100% & 200% zoom), 360, 412, 1024
  const testViewports = [
    { width: 320, height: 640, name: "320" },
    { width: 360, height: 640, name: "360" },
    { width: 412, height: 915, name: "412" },
    { width: 1024, height: 768, name: "1024" },
  ];

  for (const vp of testViewports) {
    for (const theme of ["light", "dark"]) {
      // 100% zoom
      {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: theme,
        });
        const page = await context.newPage();
        await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove("dark"));
        }
        await page.waitForTimeout(300);

        const check = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;
          const hero = document.querySelector("section[aria-label='Hero overview']");
          const heroRect = hero ? hero.getBoundingClientRect() : null;
          return {
            hasHorizontalScroll: scrollWidth > clientWidth,
            scrollWidth,
            clientWidth,
            heroHeight: heroRect ? heroRect.height : 0,
          };
        });

        const file = path.join(OUT_DIR, `viewport-${vp.name}-${theme}-100zoom.png`);
        await page.screenshot({ path: file, fullPage: false });

        findings.push({
          viewport: vp.name,
          theme,
          zoom: "100%",
          ...check,
          file: path.basename(file),
        });
        await context.close();
      }

      // 200% text zoom for 320
      if (vp.width === 320) {
        const context = await browser.newContext({
          viewport: { width: 320, height: 640 },
          colorScheme: theme,
        });
        const page = await context.newPage();
        await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove("dark"));
        }
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "200%";
        });
        await page.waitForTimeout(300);

        const check = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;
          return {
            hasHorizontalScroll: scrollWidth > clientWidth,
            scrollWidth,
            clientWidth,
          };
        });

        const file = path.join(OUT_DIR, `viewport-320-${theme}-200zoom.png`);
        await page.screenshot({ path: file, fullPage: false });

        findings.push({
          viewport: "320",
          theme,
          zoom: "200%",
          ...check,
          file: path.basename(file),
        });
        await context.close();
      }
    }
  }

  await browser.close();

  console.log("=== Viewport Inspection Findings ===");
  console.log(JSON.stringify(findings, null, 2));

  const hasAnyHScroll = findings.some((f) => f.hasHorizontalScroll);
  if (hasAnyHScroll) {
    console.warn("WARNING: Detected horizontal scroll at tested viewports!");
  } else {
    console.log(
      "PASS: Zero horizontal scroll detected across all tested viewports (320, 320@200%, 360, 412, 1024).",
    );
  }
}

run().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
