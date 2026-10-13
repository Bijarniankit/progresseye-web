import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "docs", "screenshots", "tokens");
const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

fs.mkdirSync(outputDir, { recursive: true });

const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 900 },
];

async function run() {
  console.log("Launching browser for screenshot capture...");
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    console.log(`Capturing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // 1. Light mode full page
    await page.goto("http://localhost:3000/dev/tokens", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const lightFull = path.join(outputDir, `tokens-${vp.name}-light.png`);
    await page.screenshot({ path: lightFull, fullPage: true });

    // Light mode primitives
    const primitivesSection = page.locator('section[aria-labelledby="tokens-primitives-title"]');
    if ((await primitivesSection.count()) > 0) {
      const lightPrimitives = path.join(outputDir, `primitives-${vp.name}-light.png`);
      await primitivesSection.screenshot({ path: lightPrimitives });
    }

    // 2. Dark mode: Click theme toggle
    const toggle = page.getByRole("button", { name: /toggle theme/i });
    if ((await toggle.count()) > 0) {
      await toggle.click();
      await page.waitForTimeout(400);
    }

    const darkFull = path.join(outputDir, `tokens-${vp.name}-dark.png`);
    await page.screenshot({ path: darkFull, fullPage: true });

    // Dark mode primitives
    if ((await primitivesSection.count()) > 0) {
      const darkPrimitives = path.join(outputDir, `primitives-${vp.name}-dark.png`);
      await primitivesSection.screenshot({ path: darkPrimitives });
    }

    await context.close();
  }

  await browser.close();
  console.log("Screenshots captured successfully!");

  // Copy all screenshots to artifact directory as well
  if (fs.existsSync(artifactDir)) {
    const files = fs.readdirSync(outputDir);
    for (const f of files) {
      fs.copyFileSync(path.join(outputDir, f), path.join(artifactDir, f));
    }
    console.log(`Copied ${files.length} screenshots to artifact directory.`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
