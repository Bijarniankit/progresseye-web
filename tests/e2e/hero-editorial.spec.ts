import { expect, test } from "@playwright/test";

test.describe("Hero Editorial Column & Accessible Structure", () => {
  test("h1 accessible name is exactly 'The school workspace that runs itself.'", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");

    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Verify accessible name computed by accessibility tree
    const accessibleName = await h1.evaluate((el) => {
      // In DOM, compute textContent with whitespace normalized
      return (el.textContent || "").replace(/\s+/g, " ").trim();
    });
    expect(accessibleName).toBe("The school workspace that runs itself.");

    // Verify accessible role query matches
    await expect(
      page.getByRole("heading", { level: 1, name: "The school workspace that runs itself." }),
    ).toBeVisible();
  });

  test("headline, subtitle, and CTAs render with correct destinations", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Check subtitle
    const subtitle = page.locator("text=An advanced, end-to-end school management platform");
    await expect(subtitle).toBeVisible();

    // Check Primary CTA
    const primaryCta = page.getByRole("link", { name: "Book a free demo" });
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute("href", "/demo");

    // Check Secondary CTA
    const secondaryCta = page.getByRole("link", { name: "Watch product tour" });
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute("href", "/features");
  });

  test("static SSR text is completely visible when JavaScript is disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/");

    const h1 = page.getByRole("heading", {
      level: 1,
      name: "The school workspace that runs itself.",
    });
    await expect(h1).toBeVisible();

    const subtitle = page.locator("text=An advanced, end-to-end school management platform");
    await expect(subtitle).toBeVisible();

    await context.close();
  });
});
