import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

async function capture() {
  console.log("Starting CP3 Final High-Fidelity Screenshot Capture...");
  const browser = await chromium.launch({ headless: true });

  const freezeScript = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  // 1. Desktop 1280px captures (Slides 1, 2, 3 in Light and Dark)
  const desktopItems = [
    { name: "cp3-slide1-overview-light-1280.png", theme: "light", slideIndex: 0 },
    { name: "cp3-slide2-features-light-1280.png", theme: "light", slideIndex: 1 },
    { name: "cp3-slide3-detail-light-1280.png", theme: "light", slideIndex: 2 },
    { name: "cp3-slide1-overview-dark-1280.png", theme: "dark", slideIndex: 0 },
    { name: "cp3-slide2-features-dark-1280.png", theme: "dark", slideIndex: 1 },
    { name: "cp3-slide3-detail-dark-1280.png", theme: "dark", slideIndex: 2 },
  ];

  for (const item of desktopItems) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: item.theme,
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    if (item.theme === "dark") {
      await page.evaluate(() => document.documentElement.classList.add("dark"));
    } else {
      await page.evaluate(() => document.documentElement.classList.remove("dark"));
    }
    await page.waitForTimeout(300);

    if (item.slideIndex > 0) {
      const btn = page.getByRole("button", {
        name: new RegExp(`Go to slide ${item.slideIndex + 1}`),
      });
      await btn.click();
      // Wait for crossfade transition to fully finish
      await page.waitForTimeout(600);
    }

    // Freeze animations
    await page.evaluate(freezeScript);
    await page.waitForTimeout(100);

    const out = path.join(artifactDir, item.name);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`Captured: ${item.name}`);
    await context.close();
  }

  // 2. Normal-scale Mobile (360px) Full Hero with Carousel & Controls (Slides 1-3, Light and Dark)
  const mobileItems = [
    { name: "cp3-mobile-360-slide1-light.png", theme: "light", slideIndex: 0 },
    { name: "cp3-mobile-360-slide2-light.png", theme: "light", slideIndex: 1 },
    { name: "cp3-mobile-360-slide3-light.png", theme: "light", slideIndex: 2 },
    { name: "cp3-mobile-360-slide1-dark.png", theme: "dark", slideIndex: 0 },
    { name: "cp3-mobile-360-slide2-dark.png", theme: "dark", slideIndex: 1 },
    { name: "cp3-mobile-360-slide3-dark.png", theme: "dark", slideIndex: 2 },
  ];

  for (const item of mobileItems) {
    const context = await browser.newContext({
      viewport: { width: 360, height: 1100 },
      colorScheme: item.theme,
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    if (item.theme === "dark") {
      await page.evaluate(() => document.documentElement.classList.add("dark"));
    } else {
      await page.evaluate(() => document.documentElement.classList.remove("dark"));
    }
    await page.waitForTimeout(300);

    if (item.slideIndex > 0) {
      const btn = page.getByRole("button", {
        name: new RegExp(`Go to slide ${item.slideIndex + 1}`),
      });
      await btn.click();
      await page.waitForTimeout(600);
    }

    await page.evaluate(freezeScript);
    await page.waitForTimeout(100);

    const out = path.join(artifactDir, item.name);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`Captured Mobile: ${item.name}`);
    await context.close();
  }

  // 3. Zoomed Crop of Scene 3 Attendance Card showing all 4 class rows
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: "light",
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    const btn = page.getByRole("button", { name: /Go to slide 3/ });
    await btn.click();
    await page.waitForTimeout(600);
    await page.evaluate(freezeScript);

    const carousel = page.locator('section[aria-roledescription="carousel"]');
    const out = path.join(artifactDir, "cp3-scene3-attendance-4rows-crop.png");
    await carousel.screenshot({ path: out });
    console.log("Captured Zoomed Crop: cp3-scene3-attendance-4rows-crop.png");
    await context.close();
  }

  // 4. No-JS Fallback Capture (Scene 1 Visibly Rendered, Controls Hidden, Tagline at 100% full colour)
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/");
    // Wait for CSS headline and tagline animations to completely finish (820ms total duration)
    await page.waitForTimeout(1200);

    const out = path.join(artifactDir, "cp3-no-javascript-fallback-1280.png");
    await page.screenshot({ path: out, fullPage: false });
    console.log("Captured No-JS: cp3-no-javascript-fallback-1280.png");
    await context.close();
  }

  // 5. Active Pause State & Keyboard Focus
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    const pauseBtn = page.getByRole("button", { name: "Pause automatic slide rotation" });
    await pauseBtn.click();
    await page.waitForTimeout(200);
    await page.evaluate(freezeScript);

    const out = path.join(artifactDir, "cp3-pause-active-state-1280.png");
    await page.screenshot({ path: out, fullPage: false });
    console.log("Captured Pause State: cp3-pause-active-state-1280.png");
    await context.close();
  }

  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    // Focus previous slide button then press Tab to trigger keyboard :focus-visible on dot 1
    const prevBtn = page.getByRole("button", { name: "Previous slide" });
    await prevBtn.focus();
    await page.keyboard.press("Tab");
    await page.waitForTimeout(200);

    const out = path.join(artifactDir, "cp3-keyboard-focus-ring-1280.png");
    await page.screenshot({ path: out, fullPage: false });
    console.log("Captured Focus Ring: cp3-keyboard-focus-ring-1280.png");
    await context.close();
  }

  await browser.close();
  console.log("CP3 Final Screenshot Capture complete.");
}

capture().catch((e) => {
  console.error("Capture error:", e);
  process.exit(1);
});
