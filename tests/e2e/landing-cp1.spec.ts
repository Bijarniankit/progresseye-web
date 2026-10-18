import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 6 CP1: Product Tour & Bento Grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");
  });

  test("hero 'Watch product tour' links to /#tour and scrolls to section", async ({ page }) => {
    const tourLink = page.getByRole("link", { name: /watch product tour/i });
    await expect(tourLink).toBeVisible();
    await expect(tourLink).toHaveAttribute("href", "/#tour");

    await tourLink.click();
    await expect(page).toHaveURL(/.*#tour/);
    const tourSection = page.locator("#tour");
    await expect(tourSection).toBeVisible();
  });

  test("product tour renders with mockDomain from config and honest planned notice", async ({
    page,
  }) => {
    const tourSection = page.locator("#tour");
    await expect(tourSection).toBeVisible();

    // Check browser address bar mock domain
    await expect(tourSection.getByText("yourschool.example")).toBeVisible();

    // Honest planned notice & sample data badges
    await expect(
      tourSection.getByText(/Preview of planned features, shown with sample data/i),
    ).toBeVisible();
    const sampleBadges = tourSection.getByText(/sample data/i);
    await expect(sampleBadges.first()).toBeVisible();
  });

  test("product tour tabs switch panels on click and roving arrow keys", async ({ page }) => {
    const tourSection = page.locator("#tour");
    await tourSection.scrollIntoViewIfNeeded();

    const attendanceTab = tourSection.getByRole("tab", { name: /attendance/i });
    const feesTab = tourSection.getByRole("tab", { name: /fees/i });
    const examsTab = tourSection.getByRole("tab", { name: /exams/i });

    // Initial state: Attendance is selected
    await expect(attendanceTab).toHaveAttribute("aria-selected", "true");
    await expect(tourSection.getByText(/Class VIII-A · Daily Roll Call/i)).toBeVisible();
    await expect(tourSection.getByText(/28 \/ 30 Present \(93%\)/i)).toBeVisible();

    // Click Fees tab
    await feesTab.click();
    await expect(feesTab).toHaveAttribute("aria-selected", "true");
    await expect(attendanceTab).toHaveAttribute("aria-selected", "false");
    await expect(tourSection.getByText(/Fee Collection · Term 2 Overview/i)).toBeVisible();
    await expect(tourSection.getByText(/87% Collected/i)).toBeVisible();
    await expect(tourSection.getByText("14,82,500")).toBeVisible();

    // Click Exams tab
    await examsTab.click();
    await expect(examsTab).toHaveAttribute("aria-selected", "true");
    await expect(feesTab).toHaveAttribute("aria-selected", "false");
    await expect(tourSection.getByText(/Mathematics Term 1 · Grade Distribution/i)).toBeVisible();
    await expect(tourSection.getByText(/53 \/ 53 Graded/i)).toBeVisible();

    // Keyboard navigation (ArrowLeft from Exams -> Fees, ArrowLeft -> Attendance)
    await examsTab.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(feesTab).toBeFocused();
    await expect(feesTab).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("ArrowLeft");
    await expect(attendanceTab).toBeFocused();
    await expect(attendanceTab).toHaveAttribute("aria-selected", "true");

    // ArrowRight from Attendance -> Fees
    await page.keyboard.press("ArrowRight");
    await expect(feesTab).toBeFocused();
    await expect(feesTab).toHaveAttribute("aria-selected", "true");
  });

  test("pre-hydration click on Fees tab buffers and activates Fees tab with 0 CLS", async ({
    page,
  }) => {
    // Intercept client component chunk to simulate network delay
    let fulfillChunk: () => void = () => {};
    const chunkPromise = new Promise<void>((resolve) => {
      fulfillChunk = resolve;
    });

    await page.route("**/product-tour.tsx*", async (route) => {
      await chunkPromise;
      await route.continue();
    });

    // Start tracking layout shifts
    await page.goto("http://localhost:3000/");

    await page.evaluate(() => {
      (window as unknown as { __cumulativeLayoutShift: number }).__cumulativeLayoutShift = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShift = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShift.hadRecentInput && layoutShift.value) {
            (window as unknown as { __cumulativeLayoutShift: number }).__cumulativeLayoutShift +=
              layoutShift.value;
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    });

    // Click Fees tab while in server shell state (data-tab-id="fees")
    const tourSection = page.locator("#tour");
    const feesTabBtn = tourSection.locator('[data-tab-id="fees"]');
    await feesTabBtn.click();

    // Release the component chunk
    fulfillChunk();

    // Component should mount and immediately initialize to the clicked Fees tab
    const feesTab = tourSection.getByRole("tab", { name: /fees/i });
    await expect(feesTab).toHaveAttribute("aria-selected", "true", { timeout: 5000 });
    await expect(tourSection.getByText(/Fee Collection · Term 2 Overview/i)).toBeVisible();

    // Confirm CLS remained negligible (<= 0.01)
    const cls = await page.evaluate(
      () => (window as unknown as { __cumulativeLayoutShift: number }).__cumulativeLayoutShift,
    );
    expect(cls).toBeLessThanOrEqual(0.01);
  });

  test("bento grid renders all 6 planned cards with 'Planned' badges and header", async ({
    page,
  }) => {
    const bentoSection = page.locator('section[aria-label="Planned feature modules overview"]');
    await expect(bentoSection).toBeVisible();

    // Section header
    await expect(
      bentoSection.getByText(/Everything your school needs\. Built into a cohesive whole\./i),
    ).toBeVisible();
    await expect(
      bentoSection.getByText(/Preview of planned features, shown with sample data/i),
    ).toBeVisible();

    // 6 Cards
    const cardTitles = [
      "Roles done right",
      "Attendance in one tap",
      "Fees that collect themselves",
      "Exams & report cards",
      "Communication that lands",
      "Insights that lead to action",
    ];

    for (const title of cardTitles) {
      const card = bentoSection.getByRole("heading", { name: title });
      await expect(card).toBeVisible();
    }

    // Every card has a "Planned" tag
    const plannedBadges = bentoSection.getByText("Planned");
    // At least 7 (1 in header + 6 in cards)
    expect(await plannedBadges.count()).toBeGreaterThanOrEqual(7);
  });

  test("passes axe-core accessibility audit on CP1 sections in light and dark mode", async ({
    page,
  }) => {
    // Light mode
    await page.emulateMedia({ colorScheme: "light" });
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
    await page.waitForTimeout(200);

    const lightAudit = await new AxeBuilder({ page })
      .include("#tour")
      .include('section[aria-label="Planned feature modules overview"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(lightAudit.violations).toEqual([]);

    // Dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.evaluate(() => {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(200);

    const darkAudit = await new AxeBuilder({ page })
      .include("#tour")
      .include('section[aria-label="Planned feature modules overview"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(darkAudit.violations).toEqual([]);
  });

  test("renders all three tour panels stacked when JavaScript is disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/#tour");

    // All three panels must be rendered in DOM and visible
    await expect(page.locator("#tour-panel-attendance")).toBeVisible();
    await expect(page.locator("#tour-panel-fees")).toBeVisible();
    await expect(page.locator("#tour-panel-exams")).toBeVisible();

    // Verify key panel headings across all three
    await expect(page.getByText("Class VIII-A · Daily Roll Call")).toBeVisible();
    await expect(page.getByText("Fee Collection · Term 2 Overview")).toBeVisible();
    await expect(page.getByText("Mathematics Term 1 · Grade Distribution")).toBeVisible();
  });
});
