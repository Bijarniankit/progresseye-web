import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 7 CP2: FAQ Page", () => {
  test("renders FAQ Hero, category sections, details accordions, and contact CTA", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/faq");

    // 1. Heading H1
    const h1 = page.getByRole("heading", {
      level: 1,
      name: "Frequently Asked Questions",
    });
    await expect(h1).toBeVisible();

    // 2. Category headings (3 grouped sections)
    await expect(
      page.getByRole("heading", { level: 3, name: "Academics & Fee Collection" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Privacy & Platform Access" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Onboarding & Rollout Guidance" }),
    ).toBeVisible();

    // 3. All 6 details accordions
    const details = page.locator("details");
    await expect(details).toHaveCount(6);

    // Initial state: first details element is closed
    const firstDetails = details.first();
    await expect(firstDetails).not.toHaveAttribute("open");

    // Click summary to expand
    const firstSummary = firstDetails.locator("summary");
    await firstSummary.click();
    await expect(firstDetails).toHaveAttribute("open");
    await expect(
      firstDetails.getByText(/Planned: collect fees online \(UPI first\)/i),
    ).toBeVisible();
    await expect(firstDetails.getByText("Planned Feature")).toBeVisible();

    // Click summary again to collapse
    await firstSummary.click();
    await expect(firstDetails).not.toHaveAttribute("open");

    // Keyboard toggle with Enter and Space
    await firstSummary.focus();
    await expect(firstSummary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(firstDetails).toHaveAttribute("open");
    await page.keyboard.press("Space");
    await expect(firstDetails).not.toHaveAttribute("open");

    // 4. Contact CTA
    await expect(
      page.getByRole("heading", { level: 2, name: "Still have questions?" }),
    ).toBeVisible();
    const contactLink = page.getByRole("link", { name: "Contact our team" });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute("href", "/contact");

    const walkthroughLink = page.getByRole("link", { name: "Book a walkthrough" });
    await expect(walkthroughLink).toBeVisible();
    await expect(walkthroughLink).toHaveAttribute("href", "/demo");
  });

  test("has zero horizontal overflow across mobile, tablet, and desktop viewports", async ({
    page,
  }) => {
    const viewports = [
      { width: 360, height: 640, label: "mobile" },
      { width: 768, height: 1024, label: "tablet" },
      { width: 1280, height: 800, label: "desktop" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000/faq");
      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 // 1px threshold for fractional pixels
        );
      });

      expect(
        hasHorizontalScroll,
        `Viewport ${vp.label} (${vp.width}px) should have zero horizontal scroll`,
      ).toBe(false);
    }
  });

  test("passes axe-core accessibility audit on /faq in light and dark mode", async ({ page }) => {
    await page.goto("http://localhost:3000/faq");

    // Light mode audit
    const lightAudit = await new AxeBuilder({ page }).include("main").analyze();
    expect(lightAudit.violations).toEqual([]);

    // Dark mode audit
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    });
    await page.waitForTimeout(100);

    const darkAudit = await new AxeBuilder({ page }).include("main").analyze();
    expect(darkAudit.violations).toEqual([]);
  });

  test("maintains zero layout shift (CLS <= 0.01) on /faq", async ({ page }) => {
    for (const theme of ["light", "dark"] as const) {
      await page.goto("http://localhost:3000/faq");

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
            const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
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

      expect(totalCls, `CLS on /faq in ${theme} mode must be <= 0.01`).toBeLessThanOrEqual(0.01);
    }
  });
});
