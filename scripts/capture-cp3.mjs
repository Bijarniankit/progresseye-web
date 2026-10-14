import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

async function capture() {
  const browser = await chromium.launch({ headless: true });

  const captures = [
    {
      name: "cp3-slide1-overview-light-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      action: async (_page) => {
        // Slide 1 initial state
      },
    },
    {
      name: "cp3-slide2-features-light-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      action: async (page) => {
        const nextBtn = page.getByRole("button", { name: "Next slide" });
        await nextBtn.click();
        await page.waitForTimeout(350);
      },
    },
    {
      name: "cp3-slide3-detail-light-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      action: async (page) => {
        const dot3 = page.getByRole("button", { name: "Go to slide 3: Deep Feature Detail" });
        await dot3.click();
        await page.waitForTimeout(350);
      },
    },
    {
      name: "cp3-slide1-overview-dark-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "dark",
      action: async (_page) => {
        // Slide 1 in Dark Mode Option B
      },
    },
    {
      name: "cp3-slide2-features-dark-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "dark",
      action: async (page) => {
        const nextBtn = page.getByRole("button", { name: "Next slide" });
        await nextBtn.click();
        await page.waitForTimeout(350);
      },
    },
    {
      name: "cp3-slide3-detail-dark-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "dark",
      action: async (page) => {
        const dot3 = page.getByRole("button", { name: "Go to slide 3: Deep Feature Detail" });
        await dot3.click();
        await page.waitForTimeout(350);
      },
    },
    {
      name: "cp3-pause-active-state-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      action: async (page) => {
        const pauseBtn = page.getByRole("button", { name: "Pause automatic slide rotation" });
        await pauseBtn.click();
        await page.waitForTimeout(200);
      },
    },
    {
      name: "cp3-keyboard-focus-ring-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      action: async (page) => {
        const dot1 = page.getByRole("button", { name: "Go to slide 1: Heritage School Overview" });
        await dot1.focus();
        await page.waitForTimeout(200);
      },
    },
    {
      name: "cp3-reduced-motion-mode-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      reducedMotion: "reduce",
      action: async (page) => {
        await page.waitForTimeout(300);
      },
    },
    {
      name: "cp3-mobile-360-slide1-light.png",
      viewport: { width: 360, height: 740 },
      theme: "light",
      action: async (page) => {
        await page.waitForTimeout(300);
      },
    },
    {
      name: "cp3-mobile-360-slide2-dark.png",
      viewport: { width: 360, height: 740 },
      theme: "dark",
      action: async (page) => {
        const nextBtn = page.getByRole("button", { name: "Next slide" });
        await nextBtn.click();
        await page.waitForTimeout(350);
      },
    },
    {
      name: "cp3-no-javascript-fallback-1280.png",
      viewport: { width: 1280, height: 800 },
      theme: "light",
      javaScriptEnabled: false,
      action: async (_page) => {
        // No-JS mode
      },
    },
  ];

  for (const item of captures) {
    const context = await browser.newContext({
      viewport: item.viewport,
      colorScheme: item.theme,
      reducedMotion: item.reducedMotion || "no-preference",
      javaScriptEnabled: item.javaScriptEnabled ?? true,
    });

    const page = await context.newPage();
    await page.goto("http://localhost:3000/", {
      waitUntil: item.javaScriptEnabled === false ? "commit" : "networkidle",
    });

    if (item.javaScriptEnabled !== false) {
      if (item.theme === "dark") {
        await page.evaluate(() => {
          document.documentElement.classList.add("dark");
        });
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.remove("dark");
        });
      }
      await page.waitForTimeout(200);
      await item.action(page);
    } else {
      await page.waitForTimeout(400);
    }

    const outputPath = path.join(artifactDir, item.name);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Saved screenshot: ${item.name}`);

    await context.close();
  }

  await browser.close();
  console.log("CP3 screenshot capture complete.");
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
