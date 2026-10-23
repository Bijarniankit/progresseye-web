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

  test("storage guard: fails if the site writes a storage key that /cookies does not list", async ({
    page,
  }) => {
    // 1. Visit /cookies and extract documented storage keys
    await page.goto("http://localhost:3000/cookies", { waitUntil: "networkidle" });

    // Table rows check: classification badge
    await expect(
      page.locator("text=likely strictly necessary; DRAFT-NEEDS-LEGAL-REVIEW").first(),
    ).toBeVisible();

    const documentedRows = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows.map((tr) => {
        const type = tr.querySelector("td:nth-child(1)")?.textContent?.trim() || "";
        const key = tr.querySelector("td:nth-child(2)")?.textContent?.trim() || "";
        return { type, key };
      });
    });

    const documentedStorageKeyNames = documentedRows
      .map((d) => d.key)
      .filter((k) => k && k !== "None");

    // 2. Assert /cookies lists pe_hero_played (sessionStorage) and theme (localStorage)
    const listsTheme = documentedRows.some((d) => d.type === "localStorage" && d.key === "theme");
    const listsHero = documentedRows.some(
      (d) => d.type === "sessionStorage" && d.key === "pe_hero_played",
    );
    expect(listsTheme).toBe(true);
    expect(listsHero).toBe(true);

    // 3. Install Playwright clock to fast-forward hero transitions without real dwell
    await page.clock.install();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    // Fast-forward 9 transitions (9 * 5200ms) to trigger sessionStorage write
    for (let i = 0; i < 9; i++) {
      await page.clock.fastForward(5200);
    }
    await page.waitForTimeout(100);

    // Toggle theme to ensure theme key is written to localStorage
    const themeBtn = page.getByRole("button", { name: /toggle theme|switch theme/i }).first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(100);
    }

    // Inspect all keys written to client storage
    const writtenKeys = await page.evaluate(() => ({
      localKeys: Object.keys(window.localStorage),
      sessionKeys: Object.keys(window.sessionStorage),
    }));

    // Assert that every written key is present in /cookies documented list
    for (const k of writtenKeys.localKeys) {
      expect(
        documentedStorageKeyNames,
        `localStorage key "${k}" is written by the site but not documented on /cookies`,
      ).toContain(k);
    }

    for (const k of writtenKeys.sessionKeys) {
      expect(
        documentedStorageKeyNames,
        `sessionStorage key "${k}" is written by the site but not documented on /cookies`,
      ).toContain(k);
    }
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
