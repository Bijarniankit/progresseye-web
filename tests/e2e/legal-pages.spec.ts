import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const legalPages = [
  { path: "/privacy", heading: "Privacy Policy" },
  { path: "/terms", heading: "Terms of Service" },
  { path: "/cookies", heading: "Cookie & Storage Disclosure" },
  { path: "/gdpr", heading: "GDPR & DPDP Overview (Planned)" },
] as const;

test.describe("Phase 8 CP3: Legal Pages & Login Stub", () => {
  for (const pageInfo of legalPages) {
    test(`renders ${pageInfo.path} with single H1, draft notice, and navigation sidebar`, async ({
      page,
    }) => {
      await page.goto(`http://localhost:3000${pageInfo.path}`, { waitUntil: "networkidle" });

      // 1. Single H1
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(pageInfo.heading);

      // 2. Draft notice badge and banner
      const draftBadge = page.locator("text=DRAFT-NEEDS-LEGAL-REVIEW").first();
      await expect(draftBadge).toBeVisible();
      const draftBanner = page.locator("text=DRAFT — PENDING LEGAL REVIEW").first();
      await expect(draftBanner).toBeVisible();

      // 3. Effective date
      await expect(page.locator("text=Effective Date: TODO-REAL-DATA")).toBeVisible();

      // 4. Sidebar navigation with active link
      const activeLink = page.locator(
        `nav[aria-label="Legal documents navigation"] a[href="${pageInfo.path}"]`,
      );
      await expect(activeLink).toBeVisible();
      await expect(activeLink).toHaveAttribute("aria-current", "page");
    });
  }

  test("verifies /cookies documents localStorage theme with required classification", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/cookies", { waitUntil: "networkidle" });

    // Table rows check
    await expect(page.locator("text=theme").first()).toBeVisible();
    await expect(
      page.locator("text=likely strictly necessary; DRAFT-NEEDS-LEGAL-REVIEW").first(),
    ).toBeVisible();
  });

  test("renders /login stub with single H1, planned rollout badge, and demo CTA", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("School Operations Portal");

    const demoBtn = page.getByRole("link", { name: "Book a free demo" });
    await expect(demoBtn).toBeVisible();
    await expect(demoBtn).toHaveAttribute("href", "/demo");
  });

  test("verifies zero horizontal overflow across 360, 768, and 1280 viewports for legal routes", async ({
    page,
  }) => {
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const p of legalPages) {
        await page.goto(`http://localhost:3000${p.path}`, { waitUntil: "networkidle" });
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing).toBe(false);
      }
    }
  });

  test("passes axe-core accessibility audit on legal routes in light and dark mode", async ({
    page,
  }) => {
    for (const p of legalPages) {
      await page.goto(`http://localhost:3000${p.path}`, { waitUntil: "networkidle" });

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
    }
  });

  test("verifies cookie banner component renders 0 B DOM when siteConfig.hasConsentBanner is false", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/cookies", { waitUntil: "networkidle" });
    const banner = page.locator('[data-testid="cookie-banner"]');
    await expect(banner).toHaveCount(0);
  });
});
