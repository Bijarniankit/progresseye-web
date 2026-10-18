import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { STORAGE_KEYS } from "@/config/storage-keys";

test.describe("Hero Visual — Decorative Plate Semantics & Accessibility", () => {
  test("plate is decorative with aria-hidden='true' and no carousel widget controls", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    // Plate container is marked aria-hidden="true" and has no tabindex (not focusable)
    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    await expect(plateContainer).toBeVisible();
    await expect(plateContainer).toHaveAttribute("aria-hidden", "true");
    await expect(plateContainer).not.toHaveAttribute("tabindex");

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

    // Hero plate contains strictly ZERO buttons, links, or interactive/focusable elements
    const interactiveElements = plateContainer.locator(
      'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])',
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
    // Trigger render update for off-screen content-visibility sections
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(100);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

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

  test("pauses animations and rotation on pointer hover and resumes on pointer leave", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Hover over plate -> paused
    await plateContainer.hover();
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Move pointer away -> resumes
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("pauses animations and rotation on pointer-down hold and resumes on pointer release", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Pointer down (tap-and-hold) -> paused
    await plateContainer.dispatchEvent("pointerdown");
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Pointer up -> resumes
    await plateContainer.dispatchEvent("pointerup");
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("toggles pause state on successive taps or clicks", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // First tap -> paused
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Second tap -> resumes
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("pauses rotation and animations when browser tab is hidden and resumes when visible", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Tab visibility change -> pauses when document is hidden
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Resumes when tab becomes visible again
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: false, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(100);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("pauses rotation and animations when plate is scrolled out of viewport (IntersectionObserver)", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Scroll off-screen -> paused via IntersectionObserver
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(300);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Resumes when scrolled back into viewport
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("tap toggle pauses plate and automatically resumes after 15-second safety timeout", async ({
    page,
  }) => {
    await page.clock.install();
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Initial state is running
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // Tap (click) the plate to trigger pause
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Fast-forward virtual clock by 15000ms
    await page.clock.fastForward(15000);

    // Verify plate automatically resumes running
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

test.describe("Hero Visual — Option B Rotation Limit (9 Transitions, Session, Replay)", () => {
  test("stops auto-rotation after 9th transition (3 complete loops)", async ({ page }) => {
    await page.clock.install();
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // Fast-forward virtual clock through 9 transitions (9 * 5200ms)
    for (let i = 0; i < 9; i++) {
      await page.clock.fastForward(5200);
    }

    // Verify plate is now paused due to reaching rotation limit
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Verify sessionStorage has recorded that the rotation played
    const storageValue = await page.evaluate(
      (key) => window.sessionStorage.getItem(key),
      STORAGE_KEYS.HERO_ROTATION_PLAYED,
    );
    expect(storageValue).toBe("true");

    // Verify plate remains paused on Scene 1 even after more time passes
    await page.clock.fastForward(5200);
    await expect(plate).toHaveCSS("animation-play-state", "paused");
  });

  test("replays rotation on tap after auto-stopping", async ({ page }) => {
    await page.clock.install();
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Fast-forward virtual clock through 9 transitions to trigger auto-stop
    for (let i = 0; i < 9; i++) {
      await page.clock.fastForward(5200);
    }
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Tap the plate container to trigger replay
    await plateContainer.click();
    await page.mouse.move(0, 0);

    // Verify rotation resumes running
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // Verify sessionStorage played flag remains "true" during manual replay
    const storageValue = await page.evaluate(
      (key) => window.sessionStorage.getItem(key),
      STORAGE_KEYS.HERO_ROTATION_PLAYED,
    );
    expect(storageValue).toBe("true");
  });

  test("replay, then reload starts stopped", async ({ page }) => {
    await page.clock.install();
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Fast-forward virtual clock through 9 transitions to trigger auto-stop
    for (let i = 0; i < 9; i++) {
      await page.clock.fastForward(5200);
    }
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    // Tap to replay
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // Verify sessionStorage retains played = true
    const storageValue = await page.evaluate(
      (key) => window.sessionStorage.getItem(key),
      STORAGE_KEYS.HERO_ROTATION_PLAYED,
    );
    expect(storageValue).toBe("true");

    // Reload page mid-replay to simulate return visit/refresh
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify plate starts stopped immediately on reload
    await expect(plate).toHaveCSS("animation-play-state", "paused");
  });

  test("plate rotates normally and does not crash when sessionStorage throws on get/set/remove", async ({
    page,
  }) => {
    // Intercept sessionStorage before navigation to simulate restricted/disabled storage environment
    await page.addInitScript(() => {
      const throwingStorage = {
        getItem: () => {
          throw new DOMException("The operation is insecure.", "SecurityError");
        },
        setItem: () => {
          throw new DOMException("The operation is insecure.", "SecurityError");
        },
        removeItem: () => {
          throw new DOMException("The operation is insecure.", "SecurityError");
        },
        clear: () => {
          throw new DOMException("The operation is insecure.", "SecurityError");
        },
        key: () => null,
        length: 0,
      };
      Object.defineProperty(window, "sessionStorage", {
        value: throwingStorage,
        configurable: true,
      });
    });

    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Plate starts and rotates normally (fallback active)
    await expect(plate).toHaveCSS("animation-play-state", "running");

    // Tap toggle functions without crashing
    await plateContainer.click();
    await page.mouse.move(0, 0);
    await expect(plate).toHaveCSS("animation-play-state", "paused");

    await plateContainer.click();
    await page.mouse.move(0, 0);
    await expect(plate).toHaveCSS("animation-play-state", "running");
  });

  test("return visit in the same session starts stopped", async ({ page }) => {
    // Navigate and set the session storage flag representing a previous completion
    await page.goto("http://localhost:3000/");
    await page.evaluate(
      (key) => window.sessionStorage.setItem(key, "true"),
      STORAGE_KEYS.HERO_ROTATION_PLAYED,
    );

    // Reload page to simulate return visit within the same session
    await page.reload();
    await page.waitForLoadState("networkidle");

    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Verify plate starts stopped immediately
    await expect(plate).toHaveCSS("animation-play-state", "paused");
  });

  test("reduced motion + tap does nothing", async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    const plateContainer = page.locator('[data-testid="hero-plate-container"]');
    const plate = page.locator('[data-testid="hero-plate"]');
    await expect(plate).toBeVisible();

    // Initial reduced-motion state: Scene 1 visible, paused
    const scene1 = plate.locator("svg").first();
    await expect(scene1).toBeVisible();

    // Tap the plate container under reduced motion
    await plateContainer.click();
    await page.waitForTimeout(300);

    // Plate strictly remains stationary on Scene 1, no rotation starts
    await expect(scene1).toBeVisible();
    const storageValue = await page.evaluate(
      (key) => window.sessionStorage.getItem(key),
      STORAGE_KEYS.HERO_ROTATION_PLAYED,
    );
    expect(storageValue).toBeNull();

    await context.close();
  });
});
