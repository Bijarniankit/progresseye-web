import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 6 CP2: Why ProgressEye & Pricing Sections", () => {
  test("renders 'Why ProgressEye' section with 4 design goal rows and scroll margin", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/#why");

    const whySection = page.locator("#why");
    await expect(whySection).toBeVisible();
    await expect(whySection).toHaveClass(/scroll-mt-/);

    await expect(
      whySection.getByRole("heading", {
        name: "Calm by design. Built specifically for Indian schools.",
      }),
    ).toBeVisible();

    // Verify all 4 design goal categories and titles
    await expect(whySection.getByRole("heading", { level: 3, name: "Speed" })).toBeVisible();
    await expect(whySection.getByText("Performance on slow connections")).toBeVisible();

    await expect(whySection.getByRole("heading", { level: 3, name: "Privacy" })).toBeVisible();
    await expect(whySection.getByText("Student privacy & multitenancy")).toBeVisible();

    await expect(whySection.getByRole("heading", { level: 3, name: "Everywhere" })).toBeVisible();
    await expect(whySection.getByText("Device & operating system support")).toBeVisible();

    await expect(whySection.getByRole("heading", { level: 3, name: "India" })).toBeVisible();
    await expect(whySection.getByText("Designed for Indian schools")).toBeVisible();

    // Verify agreed copy
    await expect(
      whySection.getByText("Designed to stay quick on slow connections.").first(),
    ).toBeVisible();
    await expect(
      whySection.getByText("Each school's data is kept separate by design.").first(),
    ).toBeVisible();
    await expect(
      whySection
        .getByText("Works in any modern browser on desktop, tablet and phone. Nothing to install.")
        .first(),
    ).toBeVisible();
    await expect(
      whySection
        .getByText(
          "Built around Indian schools: rupee and lakh/crore formatting. English now, Hindi planned.",
        )
        .first(),
    ).toBeVisible();

    // Verify honest disclaimer banner
    await expect(whySection.getByText("Design Goal Commitments:")).toBeVisible();
    await expect(whySection.getByText(/Design goals, not measured results/)).toBeVisible();
  });

  test("renders 3-tier pricing section with dynamic billing toggle and scroll margin", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/#pricing");

    const pricingSection = page.locator("#pricing");
    await expect(pricingSection).toBeVisible();
    await expect(pricingSection).toHaveClass(/scroll-mt-/);

    // Verify heading and disclaimer
    await expect(
      pricingSection.getByRole("heading", {
        name: "Simple, transparent pricing.",
      }),
    ).toBeVisible();
    await expect(pricingSection.getByText("Launch Notice:")).toBeVisible();

    // Verify 3 tiers exist
    await expect(pricingSection.getByRole("heading", { name: "Starter" })).toBeVisible();
    await expect(pricingSection.getByRole("heading", { name: "School" })).toBeVisible();
    await expect(pricingSection.getByRole("heading", { name: "District" })).toBeVisible();

    // Verify Starter Free forever
    await expect(pricingSection.getByText("Free forever")).toBeVisible();

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

    // Verify links: Starter -> /demo, School -> /demo, District -> /contact
    const demoLinks = pricingSection.getByRole("link", { name: "Book a free demo" });
    await expect(demoLinks).toHaveCount(2);
    await expect(demoLinks.nth(0)).toHaveAttribute("href", "/demo");
    await expect(demoLinks.nth(1)).toHaveAttribute("href", "/demo");

    const districtLink = pricingSection.getByRole("link", { name: "Talk to our team" });
    await expect(districtLink).toHaveAttribute("href", "/contact");
  });

  test("verifies /#tour has scroll margin to clear fixed navbar", async ({ page }) => {
    await page.goto("http://localhost:3000/#tour");
    const tourSection = page.locator("#tour");
    await expect(tourSection).toBeVisible();
    await expect(tourSection).toHaveClass(/scroll-mt-/);
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
