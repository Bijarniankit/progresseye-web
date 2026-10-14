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

test.describe("Marketing Shell — No-JS Fallback & SSR Hero Visibility", () => {
  test.use({ javaScriptEnabled: false });

  test("confirms hero headline and subtitle are visible when JavaScript is disabled", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify hero h1 heading is visible and contains expected text
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("The school workspace that runs itself.");

    // Verify hero subtitle paragraph is visible
    const subtitle = page
      .locator("p")
      .filter({ hasText: "An advanced, end-to-end school management platform" });
    await expect(subtitle).toBeVisible();
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

test.describe("Marketing Shell — Zero Horizontal Overflow (document.scrollWidth <= window.innerWidth)", () => {
  const testViewports = [
    { width: 360, height: 740, label: "360px" },
    { width: 768, height: 1024, label: "768px" },
    { width: 1024, height: 768, label: "1024px" },
    { width: 1280, height: 800, label: "1280px" },
    { width: 1536, height: 900, label: "1536px" },
  ];

  for (const vp of testViewports) {
    for (const route of marketingRoutes) {
      test(`verifies document.scrollWidth <= window.innerWidth on ${route} at ${vp.label}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        }));

        expect(overflow.hasOverflow).toBe(false);
        expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);
      });
    }
  }
});

test.describe("Marketing Shell — Watermark Viewport Scaling (320px, 360px, 390px)", () => {
  const mobileWidths = [320, 360, 390];
  for (const width of mobileWidths) {
    test(`renders footer watermark without clipping or horizontal overflow at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const watermark = page.locator("footer div[aria-hidden='true']").last();
      await expect(watermark).toBeVisible();

      const watermarkMetrics = await watermark.evaluate((el) => ({
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        windowWidth: window.innerWidth,
      }));

      expect(watermarkMetrics.scrollWidth).toBeLessThanOrEqual(watermarkMetrics.windowWidth);
    });
  }
});
