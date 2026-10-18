import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 6 CP2: Why ProgressEye & Pricing Sections", () => {
  test("renders 'Why ProgressEye' comparison section with 4 design goal rows", async ({ page }) => {
    await page.goto("http://localhost:3000/#why");

    const whySection = page.locator("#why");
    await expect(whySection).toBeVisible();

    await expect(
      whySection.getByRole("heading", {
        name: "Calm by design. Built specifically for Indian schools.",
      }),
    ).toBeVisible();

    // Verify all 4 design goal categories
    await expect(whySection.getByText("Performance on slow connections").first()).toBeVisible();
    await expect(whySection.getByText("Student privacy & multitenancy").first()).toBeVisible();
    await expect(whySection.getByText("Device & operating system support").first()).toBeVisible();
    await expect(whySection.getByText("Designed for Indian schools").first()).toBeVisible();

    // Verify agreed copy
    await expect(
      whySection.getByText("Designed to stay quick on slow connections.").first(),
    ).toBeVisible();
    await expect(
      whySection.getByText("Each school's data is kept separate by design.").first(),
    ).toBeVisible();
    await expect(
      whySection.getByText("Works in any modern browser on desktop, tablet and phone.").first(),
    ).toBeVisible();
    await expect(
      whySection.getByText("Built around Indian schools: rupee and lakh/crore formatting.").first(),
    ).toBeVisible();

    // Verify honest disclaimer banner
    await expect(whySection.getByText("Design Goal Commitments:")).toBeVisible();
  });

  test("renders 3-tier pricing section with dynamic billing toggle", async ({ page }) => {
    await page.goto("http://localhost:3000/#pricing");

    const pricingSection = page.locator("#pricing");
    await expect(pricingSection).toBeVisible();

    // Verify heading and disclaimer
    await expect(
      pricingSection.getByRole("heading", {
        name: "Simple, honest pricing. No hidden per-module fees.",
      }),
    ).toBeVisible();
    await expect(pricingSection.getByText("Launch Notice:")).toBeVisible();

    // Verify 3 tiers exist
    await expect(pricingSection.getByRole("heading", { name: "Starter" })).toBeVisible();
    await expect(pricingSection.getByRole("heading", { name: "School" })).toBeVisible();
    await expect(pricingSection.getByRole("heading", { name: "District" })).toBeVisible();

    // Verify Starter Free forever
    await expect(pricingSection.getByText("Free forever")).toBeVisible();
    await expect(pricingSection.getByText("Small schools up to 100 students")).toBeVisible();

    // Verify School tier initial Annual pricing (₹25 and Save 17%)
    await expect(
      pricingSection.getByRole("button", { name: /Annual billing/ }).getByText("Save 17%"),
    ).toBeVisible();
    await expect(pricingSection.getByText("Billed annually (Save 17%)")).toBeVisible();
    await expect(pricingSection.getByText("25", { exact: true })).toBeVisible();

    // Click Monthly billing
    await pricingSection.getByRole("button", { name: "Monthly billing" }).click();

    // Verify School tier updates to ₹30
    await expect(pricingSection.getByText("Billed monthly")).toBeVisible();
    await expect(pricingSection.getByText("30", { exact: true })).toBeVisible();

    // Toggle back to Annual
    await pricingSection.getByRole("button", { name: /Annual billing/ }).click();
    await expect(pricingSection.getByText("Billed annually (Save 17%)")).toBeVisible();
    await expect(pricingSection.getByText("25", { exact: true })).toBeVisible();

    // Verify links
    const starterLink = pricingSection.getByRole("link", { name: "Get started free" });
    await expect(starterLink).toHaveAttribute("href", "/get-started");

    const schoolLink = pricingSection.getByRole("link", { name: "Start free trial" });
    await expect(schoolLink).toHaveAttribute("href", "/get-started?tier=school");

    const districtLink = pricingSection.getByRole("link", { name: "Talk to our team" });
    await expect(districtLink).toHaveAttribute("href", "/contact");
  });

  test("passes axe-core accessibility audit on Why & Pricing in light and dark mode", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/#why");

    // Light mode audit
    const lightAudit = await new AxeBuilder({ page }).include(["#why", "#pricing"]).analyze();
    expect(lightAudit.violations).toEqual([]);

    // Dark mode audit
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(100);

    const darkAudit = await new AxeBuilder({ page }).include(["#why", "#pricing"]).analyze();
    expect(darkAudit.violations).toEqual([]);
  });
});
