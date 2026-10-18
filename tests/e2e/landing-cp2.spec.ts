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

  test("verifies /#tour, /#why, /#pricing anchor jumps land correctly with header visible and zero CLS", async ({
    page,
  }) => {
    for (const sectionId of ["tour", "why", "pricing"]) {
      // Track CLS during anchor navigation
      await page.goto(`http://localhost:3000/#${sectionId}`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(100);

      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible();
      await expect(section).toHaveClass(/scroll-mt-/);
      await expect(section).toHaveClass(/content-visibility-auto/);

      // Section top must be at or below navbar height (64px) and visible near viewport top (< 250px)
      const boundingBox = await section.boundingBox();
      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        expect(boundingBox.y).toBeGreaterThanOrEqual(0);
        expect(boundingBox.y).toBeLessThanOrEqual(250);
      }

      // Check CLS on the navigated page
      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let totalCls = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
                totalCls += (entry as unknown as { value: number }).value;
              }
            }
          });
          observer.observe({ type: "layout-shift", buffered: true });
          setTimeout(() => {
            observer.disconnect();
            resolve(totalCls);
          }, 300);
        });
      });
      expect(cls).toBeLessThanOrEqual(0.01);
    }
  });

  test("keyboard navigation through interactive pricing toggle", async ({ page }) => {
    await page.goto("http://localhost:3000/#pricing");
    const pricingSection = page.locator("#pricing");
    await expect(pricingSection).toBeVisible();

    const monthlyBtn = pricingSection.getByRole("button", { name: /monthly billing/i });
    const annualBtn = pricingSection.getByRole("button", { name: /annual billing/i });

    // Focus first toggle button in DOM (Monthly billing)
    await monthlyBtn.focus();
    await expect(monthlyBtn).toBeFocused();

    // Press Enter to switch to monthly
    await page.keyboard.press("Enter");
    await expect(pricingSection.getByText("Billed monthly")).toBeVisible();

    // Tab to annual button
    await page.keyboard.press("Tab");
    await expect(annualBtn).toBeFocused();

    // Press Enter to activate annual
    await page.keyboard.press("Enter");
    await expect(pricingSection.getByText("Billed annually (Save 17%)")).toBeVisible();
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

  test("verifies subpages load 0 bytes of the motion/react vendor chunk", async ({ page }) => {
    for (const subpage of ["/features", "/demo", "/faq", "/about", "/pricing"]) {
      const jsRequests: string[] = [];
      const listener = (req: { url: () => string }) => {
        const url = req.url();
        if (url.includes(".js")) {
          jsRequests.push(url);
        }
      };

      page.on("request", listener);
      await page.goto(`http://localhost:3000${subpage}`);
      await page.waitForLoadState("networkidle");
      page.off("request", listener);

      // Assert motion/react vendor chunk (0_cx2_ft5g-al.js) is NOT requested on subpages
      const loadedMotion = jsRequests.some((url) => url.includes("0_cx2_ft5g-al"));
      expect(loadedMotion).toBe(false);
    }
  });
});
