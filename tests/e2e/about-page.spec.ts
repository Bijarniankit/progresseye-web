import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 7 CP1: About Page", () => {
  test("renders Manifesto Hero, Vision, Mission, Values, Principles, and CTA", async ({ page }) => {
    await page.goto("http://localhost:3000/about");

    // 1. Hero: Factual claims gated behind hasConfiguredStory (default off)
    const heroHeading = page.getByRole("heading", {
      level: 1,
      name: /Software designed for schools that value calm/i,
    });
    await expect(heroHeading).toBeVisible();

    // 2. Vision and Mission
    await expect(page.getByRole("heading", { level: 3, name: "Our Vision" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Our Mission" })).toBeVisible();

    // 3. Values Grid with 4 values; DRAFT-CONTENT-REVIEW badges hidden by default from public UI
    await expect(page.getByRole("heading", { level: 2, name: "Values We Build By" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Transparency" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Clarity" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Reliability" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Child safety" })).toBeVisible();

    const reviewBadges = page.getByText("DRAFT-CONTENT-REVIEW");
    await expect(reviewBadges).toHaveCount(0);

    // 4. Principles Strip: Plain intentions ("We aim to...")
    await expect(
      page.getByRole("heading", { level: 2, name: "How We Approach School Software" }),
    ).toBeVisible();
    await expect(page.getByText("We aim to respect teachers' time above all else.")).toBeVisible();
    await expect(
      page.getByText("We aim to design for patchy connections and everyday phones."),
    ).toBeVisible();
    await expect(
      page.getByText("We aim to separate school data strictly by design."),
    ).toBeVisible();
    await expect(
      page.getByText("We aim for clear interfaces, plain pricing and no hidden add-ons."),
    ).toBeVisible();

    // 5. CTA Section
    const ctaHeading = page.getByRole("heading", {
      level: 2,
      name: "See how we think about school software.",
    });
    await expect(ctaHeading).toBeVisible();
    await expect(
      page.getByText(
        "We are building ProgressEye step by step, and we would like to show you where it is heading.",
      ),
    ).toBeVisible();
    await expect(page.getByText("Designed for Indian schools")).toBeVisible();

    const mainContent = page.locator("#main-content");
    const demoLink = mainContent.getByRole("link", { name: "Book a demo" });
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveAttribute("href", "/demo");

    const featuresLink = mainContent.getByRole("link", { name: "Explore planned features" });
    await expect(featuresLink).toBeVisible();
    await expect(featuresLink).toHaveAttribute("href", "/features");
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
      await page.goto("http://localhost:3000/about");
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

  test("passes axe-core accessibility audit on /about in light and dark mode", async ({ page }) => {
    await page.goto("http://localhost:3000/about");

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

  test("maintains zero layout shift (CLS <= 0.01) on /about", async ({ page }) => {
    for (const theme of ["light", "dark"] as const) {
      await page.goto("http://localhost:3000/about");

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

      expect(totalCls, `CLS on /about in ${theme} mode must be <= 0.01`).toBeLessThanOrEqual(0.01);
    }
  });
});
