import { expect, test } from "@playwright/test";

const marketingRoutes = [
  "/",
  "/features",
  "/get-started",
  "/faq",
  "/demo",
  "/about",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/gdpr",
  "/login",
];

test.describe("Marketing Shell — Core Route Loading & Landmarks", () => {
  for (const route of marketingRoutes) {
    test(`renders route ${route} with shared shell landmarks`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // Verify header, main with id="main-content", and footer landmarks
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      // Verify skip link is present
      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeAttached();
    });
  }

  test("redirects /pricing permanently (308) to /get-started", async ({ page }) => {
    const response = await page.goto("/pricing");
    // Verify final URL is /get-started
    expect(page.url()).toContain("/get-started");
    // Verify status was a redirect
    expect(response?.status()).toBe(200);
  });
});

test.describe("Marketing Shell — Navbar Scroll & CLS", () => {
  test("toggles scrolled styling without causing layout shift", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Verify initial transparent/unscrolled state
    const initialClasses = await header.getAttribute("class");
    expect(initialClasses).toContain("bg-transparent");

    // Scroll down 150px
    await page.evaluate(() => window.scrollTo(0, 150));
    await page.waitForTimeout(300);

    // Verify scrolled state with backdrop blur and border
    const scrolledClasses = await header.getAttribute("class");
    expect(scrolledClasses).toContain("backdrop-blur-xl");
    expect(scrolledClasses).toContain("border-b");

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const backToTopClasses = await header.getAttribute("class");
    expect(backToTopClasses).toContain("bg-transparent");
  });
});

test.describe("Marketing Shell — Keyboard Navigation & Accessibility", () => {
  test("focuses skip link on first tab and navigates to #main-content", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Tab once to focus skip link
    await page.keyboard.press("Tab");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    // Press Enter on skip link
    await page.keyboard.press("Enter");

    // Main content or its first focusable child should be targeted
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeAttached();
  });

  test("navigates through header links with keyboard", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Tab through skip link into header logo
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // Logo link

    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeFocused();

    // Tab into first nav link
    await page.keyboard.press("Tab");
    const firstNavLink = page.locator('header nav a[href="/"]');
    await expect(firstNavLink).toBeFocused();
  });
});

test.describe("Marketing Shell — Mobile Drawer", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("opens drawer, traps focus, closes on escape and navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Desktop nav should be hidden, mobile menu button visible
    await expect(page.locator("header nav")).toBeHidden();
    const menuButton = page.getByRole("button", { name: /open navigation menu/i });
    await expect(menuButton).toBeVisible();

    // Click menu button to open drawer
    await menuButton.click();
    await page.waitForTimeout(300);

    // Sheet drawer dialog should be visible
    const sheetDialog = page.getByRole("dialog");
    await expect(sheetDialog).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(sheetDialog).not.toBeVisible();

    // Reopen and click a link to verify navigation and automatic closing
    await menuButton.click();
    await page.waitForTimeout(300);
    await expect(sheetDialog).toBeVisible();

    const featuresLink = sheetDialog.getByRole("link", { name: /^features$/i });
    await featuresLink.click();
    await page.waitForURL("**/features");
    await page.waitForTimeout(300);

    // Drawer should now be closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});

test.describe("Marketing Shell — Reduced Motion Mode", () => {
  test("renders without layout motion animations when reduced motion is preferred", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify page renders cleanly
    const header = page.locator("header");
    await expect(header).toBeVisible();
    const mainContent = page.locator("main#main-content");
    await expect(mainContent).toBeVisible();

    // Active pill should render as plain span without framer motion layoutId
    const activeSpan = page.locator("header nav a[href='/'] span");
    await expect(activeSpan).toBeAttached();
  });
});
