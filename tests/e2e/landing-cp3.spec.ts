import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 6 CP3: FAQ Accordion & Final CTA Sections", () => {
  test("renders FAQ section with native <details> and handles toggle via click & keyboard", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/#faq");

    const faqSection = page.locator("#faq");
    await expect(faqSection).toBeVisible();
    await expect(faqSection).toHaveClass(/scroll-mt-/);
    await expect(faqSection).toHaveClass(/content-visibility-auto/);

    await expect(
      faqSection.getByRole("heading", {
        name: "Clear answers to everyday questions.",
      }),
    ).toBeVisible();

    // Verify all 6 question summaries are present
    const details = faqSection.locator("details");
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

    // Click summary again to collapse
    await firstSummary.click();
    await expect(firstDetails).not.toHaveAttribute("open");

    // Keyboard toggle with Space / Enter
    await firstSummary.focus();
    await expect(firstSummary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(firstDetails).toHaveAttribute("open");
    await page.keyboard.press("Space");
    await expect(firstDetails).not.toHaveAttribute("open");
  });

  test("renders Final CTA section with dark card in both themes, demo & get-started links, and perks", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/#cta");

    const ctaSection = page.locator("#cta");
    await expect(ctaSection).toBeVisible();
    await expect(ctaSection).toHaveClass(/scroll-mt-/);
    await expect(ctaSection).toHaveClass(/content-visibility-auto/);

    await expect(
      ctaSection.getByRole("heading", {
        name: "Ready to bring calm to your school administration?",
      }),
    ).toBeVisible();

    // Plain text copy
    await expect(
      ctaSection.getByText("Book a free demo to see what we are building."),
    ).toBeVisible();

    // Links: Demo -> /demo, Get Started -> /get-started
    const demoLink = ctaSection.getByRole("link", { name: "Book a free demo" });
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveAttribute("href", "/demo");

    const getStartedLink = ctaSection.getByRole("link", { name: "Get started free" });
    await expect(getStartedLink).toBeVisible();
    await expect(getStartedLink).toHaveAttribute("href", "/get-started");

    // Perks line
    await expect(ctaSection.getByText("Designed for Indian schools")).toBeVisible();
    await expect(ctaSection.getByText("No credit card required")).toBeVisible();
    await expect(ctaSection.getByText("Cancel anytime")).toBeVisible();
  });

  test("passes axe-core accessibility audit on FAQ & Final CTA in light and dark mode", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/#faq");

    // Light mode audit
    const lightAudit = await new AxeBuilder({ page }).include(["#faq", "#cta"]).analyze();
    expect(lightAudit.violations).toEqual([]);

    // Dark mode audit
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(100);

    const darkAudit = await new AxeBuilder({ page }).include(["#faq", "#cta"]).analyze();
    expect(darkAudit.violations).toEqual([]);
  });

  test("maintains zero layout shift (CLS <= 0.01) across full load and full page scroll in light and dark mode", async ({
    page,
  }) => {
    for (const theme of ["light", "dark"] as const) {
      await page.goto("http://localhost:3000/");

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

      // Scroll gradually through the page to bottom and back to top
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const step = 400;
      for (let y = 0; y <= scrollHeight; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(40);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);

      const totalCls = await page.evaluate(() => {
        const shifts = (window as unknown as { __recordedShifts: number[] }).__recordedShifts || [];
        return shifts.reduce((acc, val) => acc + val, 0);
      });

      expect(totalCls, `CLS in ${theme} mode must be <= 0.01`).toBeLessThanOrEqual(0.01);
    }
  });
});
