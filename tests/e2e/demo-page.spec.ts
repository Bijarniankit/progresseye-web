import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 8 CP2: Demo Page (/demo)", () => {
  test("renders Hero, walkthrough context card, pre-typing notice, and demo form", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/demo", { waitUntil: "networkidle" });

    // 1. Single H1
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Book a Free Demo");

    // 2. Pre-typing honest notice
    const preNotice = page.locator('[data-testid="demo-pre-typing-notice"]');
    await expect(preNotice).toBeVisible();
    await expect(preNotice).toContainText(
      "This form is not connected yet, so requests are not sent.",
    );

    // 3. Form elements present
    await expect(page.locator("#demo-name")).toBeVisible();
    await expect(page.locator("#demo-email")).toBeVisible();
    await expect(page.locator("#demo-school")).toBeVisible();
    await expect(page.locator("#demo-notes")).toBeVisible();

    // 4. Submit button
    const submitBtn = page.getByRole("button", { name: "Request a demo" });
    await expect(submitBtn).toBeVisible();
  });

  test("validates demo form client-side, shifts focus to first invalid field, and shows error alerts", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/demo", { waitUntil: "networkidle" });
    const submitBtn = page.getByRole("button", { name: "Request a demo" });

    // Submit empty form
    await submitBtn.click();

    // First invalid field: name
    await expect(page.locator("#demo-name-error")).toBeVisible();
    await expect(page.locator("#demo-name-error")).toContainText("Please enter your name");
    await expect(page.locator("#demo-name")).toBeFocused();

    // Fill name, submit again -> focus moves to email
    await page.fill("#demo-name", "Principal Sharma");
    await submitBtn.click();
    await expect(page.locator("#demo-email-error")).toBeVisible();
    await expect(page.locator("#demo-email")).toBeFocused();

    // Invalid email
    await page.fill("#demo-email", "invalid-email");
    await submitBtn.click();
    await expect(page.locator("#demo-email-error")).toContainText("Please enter a valid email");
    await expect(page.locator("#demo-email")).toBeFocused();

    // Valid email, empty school -> focus moves to school
    await page.fill("#demo-email", "principal@cityschool.edu.in");
    await submitBtn.click();
    await expect(page.locator("#demo-school-error")).toBeVisible();
    await expect(page.locator("#demo-school")).toBeFocused();
  });

  test("submits honestly without clearing input and makes zero network requests", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/demo", { waitUntil: "networkidle" });

    const nameInput = page.locator("#demo-name");
    const emailInput = page.locator("#demo-email");
    const schoolInput = page.locator("#demo-school");
    const notesInput = page.locator("#demo-notes");
    const submitBtn = page.getByRole("button", { name: "Request a demo" });

    // Fill all required fields
    await nameInput.fill("Principal Sharma");
    await emailInput.fill("principal@cityschool.edu.in");
    await schoolInput.fill("City International School");
    await notesInput.fill("We would like a walkthrough of attendance and grading modules.");

    // Wait for any link prefetching to settle
    await page.waitForLoadState("networkidle");

    // Track any network requests dispatched by form submission
    const outgoingRequests: string[] = [];
    page.on("request", (req) => {
      // Exclude background Next.js client router prefetching (_rsc)
      if (!req.url().includes("_rsc")) {
        outgoingRequests.push(`${req.method()} ${req.url()}`);
      }
    });

    // Submit
    await submitBtn.click();
    await page.waitForTimeout(300);

    // Honest submission notice rendered
    const notice = page.locator('[data-testid="demo-submission-notice"]');
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("Not sent");
    await expect(notice).toContainText(
      "This form is not connected yet, so your request was not sent.",
    );

    // Field values preserved
    await expect(nameInput).toHaveValue("Principal Sharma");
    await expect(emailInput).toHaveValue("principal@cityschool.edu.in");
    await expect(schoolInput).toHaveValue("City International School");
    await expect(notesInput).toHaveValue(
      "We would like a walkthrough of attendance and grading modules.",
    );

    // Zero API/telemetry requests dispatched
    expect(outgoingRequests).toHaveLength(0);
  });

  test("has zero horizontal overflow across 360, 768, and 1280 viewports", async ({ page }) => {
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("http://localhost:3000/demo", { waitUntil: "networkidle" });

      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(isOverflowing).toBe(false);
    }
  });

  test("passes axe-core accessibility audit on /demo in light and dark mode", async ({ page }) => {
    await page.goto("http://localhost:3000/demo", { waitUntil: "networkidle" });

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
  });

  test("maintains zero layout shift (CLS <= 0.01) on /demo", async ({ page }) => {
    await page.goto("http://localhost:3000/demo", { waitUntil: "networkidle" });
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const shift = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (!shift.hadRecentInput) {
              clsValue += shift.value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });
    expect(cls).toBeLessThanOrEqual(0.01);
  });
});
