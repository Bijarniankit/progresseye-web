import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 8 CP2: Careers Page (/careers)", () => {
  test("renders Hero, single H1, and honest zero-vacancy state card", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/careers", { waitUntil: "networkidle" });

    // 1. Single H1
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Careers at ProgressEye");

    // 2. Honest zero-vacancy state card
    const emptyState = page.locator('[data-testid="careers-empty-state"]');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText("No Open Roles at Present");
    await expect(emptyState).toContainText("not actively hiring");

    // 3. Contact link
    const contactBtn = emptyState.locator('a[href="/contact"]');
    await expect(contactBtn).toBeVisible();
    await expect(contactBtn).toContainText("Contact our team");
  });

  test("has zero horizontal overflow across 360, 768, and 1280 viewports", async ({
    page,
  }) => {
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("http://localhost:3000/careers", { waitUntil: "networkidle" });

      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(isOverflowing).toBe(false);
    }
  });

  test("passes axe-core accessibility audit on /careers in light and dark mode", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/careers", { waitUntil: "networkidle" });

    // Light mode
    const lightResults = await new AxeBuilder({ page }).include("main").analyze();
    expect(lightResults.violations).toEqual([]);

    // Dark mode
    await page.evaluate(() => {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(100);

    const darkResults = await new AxeBuilder({ page }).include("main").analyze();
    expect(darkResults.violations).toEqual([]);
  });

  test("maintains zero layout shift (CLS <= 0.01) on /careers", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/careers", { waitUntil: "networkidle" });
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const shift = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (!shift.hadRecentInput) {
              clsValue += shift.value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });
    expect(cls).toBeLessThanOrEqual(0.01);
  });
});
