import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 8 CP1: Get Started Page (/get-started)", () => {
  test("renders single H1, planned commercial notice, and all 3 pricing tiers", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/get-started");
    await page.waitForLoadState("networkidle");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
    await expect(page.locator("h1")).toHaveText("Simple, Transparent School Pricing");

    // Planned commercial notice
    await expect(
      page.locator('section[aria-label="Planned commercial status notice"]'),
    ).toBeVisible();

    // 3 pricing tier cards
    const expectedTiers = ["starter", "school", "district"];
    for (const tierId of expectedTiers) {
      const card = page.locator(`[data-testid="pricing-tier-${tierId}"]`);
      await expect(card).toBeVisible();
      await expect(card.getByText("Planned", { exact: true })).toBeVisible();
    }

    // School tier popular badge
    const schoolCard = page.locator('[data-testid="pricing-tier-school"]');
    await expect(schoolCard.locator("text=Suggested")).toBeVisible();

    // Prohibited words assertions on public DOM
    const bodyText = (await page.locator("main").innerText()).toLowerCase();
    expect(bodyText).not.toContain("free trial");
    expect(bodyText).not.toContain("30-day");
    expect(bodyText).not.toContain("trial period");
    expect(bodyText).not.toContain("cbse");
    expect(bodyText).not.toContain("icse");
    expect(bodyText).not.toContain("whatsapp");
    expect(bodyText).not.toContain("better than");
  });

  test("has zero horizontal overflow across 360, 768, and 1280 viewports", async ({ page }) => {
    const viewports = [
      { width: 360, height: 640 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("http://localhost:3000/get-started");
      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(
        hasHorizontalScroll,
        `Expected no horizontal overflow at viewport ${vp.width}x${vp.height}`,
      ).toBe(false);
    }
  });

  test("passes axe-core accessibility audit on /get-started in light and dark mode", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/get-started");
    await page.waitForLoadState("networkidle");

    // 1. Light Mode Audit
    const lightAudit = await new AxeBuilder({ page }).include("main").analyze();
    expect(lightAudit.violations).toEqual([]);

    // 2. Dark Mode Audit
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    });
    await page.waitForTimeout(100);

    const darkAudit = await new AxeBuilder({ page }).include("main").analyze();
    expect(darkAudit.violations).toEqual([]);
  });

  test("maintains zero layout shift (CLS <= 0.01) on /get-started", async ({ page }) => {
    for (const theme of ["light", "dark"] as const) {
      await page.goto("http://localhost:3000/get-started");

      await page.evaluate((t) => {
        if (t === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }

        (window as unknown as { __recordedShifts: number[] }).__recordedShifts = [];
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const shift = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (!shift.hadRecentInput) {
              (window as unknown as { __recordedShifts: number[] }).__recordedShifts.push(
                shift.value,
              );
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
      }, theme);

      await page.waitForLoadState("networkidle");

      // Scroll gradually down the page
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const step = 300;
      for (let y = 0; y <= scrollHeight; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(30);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);

      const totalCls = await page.evaluate(() => {
        const shifts = (window as unknown as { __recordedShifts: number[] }).__recordedShifts || [];
        return shifts.reduce((acc, val) => acc + val, 0);
      });

      expect(totalCls, `CLS on /get-started in ${theme} mode must be <= 0.01`).toBeLessThanOrEqual(
        0.01,
      );
    }
  });
});
