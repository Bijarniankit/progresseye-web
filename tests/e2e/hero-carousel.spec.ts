import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Hero Visual — Decorative Plate Semantics & Accessibility", () => {
  test("plate is decorative with aria-hidden='true' and no carousel widget controls", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    // Plate container is marked aria-hidden="true"
    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    await expect(plateContainer).toBeVisible();
    await expect(plateContainer).toHaveAttribute("aria-hidden", "true");

    // Circular plate element exists
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // SVGs inside are aria-hidden
    const svg = plate.locator("svg").first();
    await expect(svg).toHaveAttribute("aria-hidden", "true");

    // All carousel roles and controls are strictly absent
    await expect(page.locator('[aria-roledescription="carousel"]')).toHaveCount(0);
    await expect(page.locator('[aria-roledescription="slide"]')).toHaveCount(0);
    await expect(page.locator('nav[aria-label="Carousel controls"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: /previous slide/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /next slide/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /pause/i })).toHaveCount(0);

    // Hero plate contains strictly ZERO buttons, links, or interactive roles
    const interactiveElements = plateContainer.locator(
      'button, a, [role="button"], [role="link"], [tabindex]',
    );
    await expect(interactiveElements).toHaveCount(0);
  });

  test("h1 accessible name remains unchanged as 'The school workspace that runs itself.'", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toHaveAccessibleName("The school workspace that runs itself.");
  });

  test("passes axe-core accessibility audit on '/' in Light and Dark mode with 0 violations", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    // Light Mode scan
    const lightResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(lightResults.violations).toEqual([]);

    // Dark Mode scan
    await page.evaluate(() => {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(300);

    const darkResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(darkResults.violations).toEqual([]);
  });
});

test.describe("Hero Visual — Safeguards (Reduced Motion, Hover Pause, No Overflow)", () => {
  test("stops rotation and renders Scene 1 statically under prefers-reduced-motion: reduce", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Scene 1 is visible
    const scene1 = plate.locator("svg").first();
    await expect(scene1).toBeVisible();

    // Wait 2.5 seconds — should remain stationary on Scene 1
    await page.waitForTimeout(2500);
    await expect(scene1).toBeVisible();

    await context.close();
  });

  test("pauses animations and rotation on pointer hover and tap over plate", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // 1. Hover over plate -> paused
    await plateContainer.hover();
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Move pointer away -> resumes
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // 2. Pointer down (tap-and-hold) -> paused
    await plateContainer.dispatchEvent("pointerdown");
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Pointer up -> resumes
    await plateContainer.dispatchEvent("pointerup");
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // 3. Tap toggle: click and move pointer away to isolate tap toggle from hover
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Second Tap toggle -> resumes
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("guarantees zero horizontal overflow across 360, 768, 1024, 1280, 1536px viewports", async ({
    page,
  }) => {
    const viewports = [360, 768, 1024, 1280, 1536];

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("http://localhost:3000/");
      await page.waitForLoadState("networkidle");

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasOverflow, `Expected zero horizontal overflow at ${width}px viewport`).toBe(false);
    }
  });

  test("renders Scene 1 and plate structure in HTML when JavaScript is disabled", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/");

    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Scene 1 SVG is present in initial HTML markup and has non-empty bounding box
    const svg = plate.locator("svg").first();
    await expect(svg).toBeVisible();

    const box = await svg.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.width).toBeGreaterThan(100);
    expect(box?.height).toBeGreaterThan(100);

    await context.close();
  });

  test("maintains zero layout shift (CLS < 0.01) across hydration and slide crossfades", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    await page.evaluate(() => {
      (window as unknown as { __clsEntries: number[] }).__clsEntries = [];
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!shift.hadRecentInput) {
            (window as unknown as { __clsEntries: number[] }).__clsEntries.push(shift.value);
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    });

    // Wait through crossfades
    await page.waitForTimeout(1500);

    const totalCls = await page.evaluate(() => {
      const entries = (window as unknown as { __clsEntries: number[] }).__clsEntries || [];
      return entries.reduce((sum, val) => sum + val, 0);
    });

    expect(totalCls).toBeLessThan(0.01);
  });
});
