import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Design Tokens Showcase Accessibility", () => {
  test("has zero critical or serious a11y violations in light mode", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto("/dev/tokens");
    if (response?.status() === 404) {
      test.skip(true, "/dev/tokens returns 404 in production builds");
      return;
    }
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(seriousOrCritical).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("has zero critical or serious a11y violations in dark mode", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto("/dev/tokens");
    if (response?.status() === 404) {
      test.skip(true, "/dev/tokens returns 404 in production builds");
      return;
    }
    await page.waitForLoadState("networkidle");

    // Toggle theme to dark mode
    const toggleButton = page.getByRole("button", { name: /mode/i });
    await toggleButton.click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(seriousOrCritical).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
