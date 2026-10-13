import AxeBuilder from "@axe-core/playwright";
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

test.describe("Marketing Shell — Accessibility (Light Mode)", () => {
  for (const route of marketingRoutes) {
    test(`has zero serious or critical a11y violations on ${route}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      });
      await page.waitForTimeout(200);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const seriousOrCritical = accessibilityScanResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      expect(seriousOrCritical).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }
});

test.describe("Marketing Shell — Accessibility (Dark Mode)", () => {
  for (const route of marketingRoutes) {
    test(`has zero serious or critical a11y violations on ${route} in dark mode`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      });
      await page.waitForTimeout(200);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const seriousOrCritical = accessibilityScanResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      expect(seriousOrCritical).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }
});

test.describe("Marketing Shell — Mobile Drawer Accessibility", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("has zero serious or critical violations with open drawer (Light Mode)", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });

    const menuButton = page.getByRole("button", { name: /open navigation menu/i });
    await menuButton.click();
    await page.waitForTimeout(400);

    const sheetDialog = page.getByRole("dialog");
    await expect(sheetDialog).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(seriousOrCritical).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("has zero serious or critical violations with open drawer (Dark Mode)", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });

    const menuButton = page.getByRole("button", { name: /open navigation menu/i });
    await menuButton.click();
    await page.waitForTimeout(400);

    const sheetDialog = page.getByRole("dialog");
    await expect(sheetDialog).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(seriousOrCritical).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
