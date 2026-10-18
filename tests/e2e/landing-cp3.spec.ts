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

    // Verify all 5 question summaries are present
    const details = faqSection.locator("details");
    await expect(details).toHaveCount(5);

    // Initial state: first details element is closed
    const firstDetails = details.first();
    await expect(firstDetails).not.toHaveAttribute("open");

    // Click summary to expand
    const firstSummary = firstDetails.locator("summary");
    await firstSummary.click();
    await expect(firstDetails).toHaveAttribute("open");
    await expect(
      firstDetails.getByText(/ProgressEye is designed to support direct UPI/i),
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

  test("renders Final CTA section with dual-theme card, demo & get-started links, and perks", async ({
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

    // Links: Demo -> /demo, Get Started -> /get-started
    const demoLink = ctaSection.getByRole("link", { name: "Book a free demo" });
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveAttribute("href", "/demo");

    const getStartedLink = ctaSection.getByRole("link", { name: "Get started free" });
    await expect(getStartedLink).toBeVisible();
    await expect(getStartedLink).toHaveAttribute("href", "/get-started");

    // Perks line
    await expect(ctaSection.getByText("Free Starter tier forever")).toBeVisible();
    await expect(ctaSection.getByText("Designed for Indian schools")).toBeVisible();
    await expect(ctaSection.getByText("No credit card required")).toBeVisible();
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
});
