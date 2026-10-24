import { expect, test } from "@playwright/test";

test.describe("Phase 9: Public Lead Forms API Integration (Flag ON)", () => {
  test("submits contact inquiry to API and displays opaque receipt with reference ID", async ({
    page,
  }) => {
    let capturedHeaders: Record<string, string> = {};
    let capturedBody: Record<string, unknown> = {};

    await page.route("**/api/v1/public/contact", async (route) => {
      const request = route.request();
      capturedHeaders = request.headers();
      capturedBody = JSON.parse(request.postData() || "{}");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "c1000000-0000-0000-0000-000000000001",
          status: "received",
          message: "Inquiry received successfully",
          createdAt: "2026-10-24T12:00:00.000Z",
        }),
      });
    });

    await page.goto("http://localhost:3000/contact?backend=true", { waitUntil: "networkidle" });

    // Fill valid form
    await page.fill("#contact-name", "Principal Ramanathan");
    await page.fill("#contact-email", "ramanathan@cityschool.edu.in");
    await page.fill("#contact-school", "City Senior Secondary School");
    await page.selectOption("#contact-topic", "onboarding");
    await page.fill(
      "#contact-message",
      "We would like to discuss automated fee tracking and student records migration.",
    );

    // Submit
    await page.click("button[type='submit']");

    // Receipt display verification
    const receipt = page.locator('[data-testid="contact-receipt"]');
    await expect(receipt).toBeVisible();
    await expect(receipt).toContainText("Inquiry Received");
    await expect(receipt).toContainText("Ref: c1000000");

    // Verify sent payload & Idempotency-Key
    expect(capturedBody).toMatchObject({
      name: "Principal Ramanathan",
      email: "ramanathan@cityschool.edu.in",
      schoolName: "City Senior Secondary School",
      topic: "onboarding",
      message: "We would like to discuss automated fee tracking and student records migration.",
      consentGiven: true,
    });
    expect(capturedHeaders).toHaveProperty("idempotency-key");
    expect(capturedHeaders["idempotency-key"]).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });

  test("submits demo request to API and displays opaque receipt with reference ID", async ({
    page,
  }) => {
    let capturedHeaders: Record<string, string> = {};
    let capturedBody: Record<string, unknown> = {};

    await page.route("**/api/v1/public/demo", async (route) => {
      const request = route.request();
      capturedHeaders = request.headers();
      capturedBody = JSON.parse(request.postData() || "{}");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "d2000000-0000-0000-0000-000000000002",
          status: "received",
          message: "Demo request received successfully",
          createdAt: "2026-10-24T12:00:00.000Z",
        }),
      });
    });

    await page.goto("http://localhost:3000/demo?backend=true", { waitUntil: "networkidle" });

    // Pre-typing notice should NOT appear when backend is enabled
    await expect(page.locator('[data-testid="demo-pre-typing-notice"]')).not.toBeVisible();

    // Fill valid form
    await page.fill("#demo-name", "Director Mukherjee");
    await page.fill("#demo-email", "mukherjee@heritage.edu.in");
    await page.fill("#demo-school", "Heritage Valley Public School");
    await page.fill(
      "#demo-notes",
      "We want to evaluate parent portal communications and automated fee receipts.",
    );

    // Submit
    await page.click("button[type='submit']");

    // Receipt display verification
    const receipt = page.locator('[data-testid="demo-receipt"]');
    await expect(receipt).toBeVisible();
    await expect(receipt).toContainText("Demo Request Received");
    await expect(receipt).toContainText("Ref: d2000000");

    // Verify sent payload & Idempotency-Key
    expect(capturedBody).toMatchObject({
      name: "Director Mukherjee",
      email: "mukherjee@heritage.edu.in",
      schoolName: "Heritage Valley Public School",
      notes: "We want to evaluate parent portal communications and automated fee receipts.",
      consentGiven: true,
    });
    expect(capturedHeaders).toHaveProperty("idempotency-key");
  });

  test("maps RFC 9457 400 Problem Details invalidParams to inline field errors without clearing input", async ({
    page,
  }) => {
    await page.route("**/api/v1/public/contact", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/problem+json",
        body: JSON.stringify({
          type: "https://api.progresseye.com/errors/validation-error",
          title: "Validation Error",
          status: 400,
          code: "VALIDATION_ERROR",
          detail: "Input validation failed",
          invalidParams: [
            {
              name: "email",
              reason: "Email domain must belong to an educational institution.",
            },
          ],
        }),
      });
    });

    await page.goto("http://localhost:3000/contact?backend=true", { waitUntil: "networkidle" });

    await page.fill("#contact-name", "Administrator Roy");
    await page.fill("#contact-email", "admin@gmail.com");
    await page.selectOption("#contact-topic", "onboarding");
    await page.fill(
      "#contact-message",
      "Evaluating student roster and exam grading management systems.",
    );

    await page.click("button[type='submit']");

    // Inline field error mapped from invalidParams
    const emailError = page.locator("#contact-email-error");
    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText("Email domain must belong to an educational institution.");

    // Input preserved
    await expect(page.locator("#contact-name")).toHaveValue("Administrator Roy");
    await expect(page.locator("#contact-email")).toHaveValue("admin@gmail.com");
    await expect(page.locator("#contact-message")).toHaveValue(
      "Evaluating student roster and exam grading management systems.",
    );
  });

  test("handles RFC 9457 429 rate limit with friendly retry notice and preserves input", async ({
    page,
  }) => {
    await page.route("**/api/v1/public/contact", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/problem+json",
        headers: {
          "Retry-After": "900",
        },
        body: JSON.stringify({
          type: "https://api.progresseye.com/errors/rate-limit-exceeded",
          title: "Rate Limit Exceeded",
          status: 429,
          code: "RATE_LIMIT_EXCEEDED",
          detail: "Too many requests from this IP address. Please retry in 15 minutes.",
        }),
      });
    });

    await page.goto("http://localhost:3000/contact?backend=true", { waitUntil: "networkidle" });

    await page.fill("#contact-name", "Principal Banner");
    await page.fill("#contact-email", "banner@school.edu.in");
    await page.selectOption("#contact-topic", "pricing");
    await page.fill("#contact-message", "Testing rate limiting handling on inquiry endpoint.");

    await page.click("button[type='submit']");

    const errorAlert = page.locator('[data-testid="contact-error-alert"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText("Too many requests");

    // Input preserved
    await expect(page.locator("#contact-name")).toHaveValue("Principal Banner");
    await expect(page.locator("#contact-email")).toHaveValue("banner@school.edu.in");
  });

  test("handles 500 server error gracefully with retry alert and preserves user input", async ({
    page,
  }) => {
    await page.route("**/api/v1/public/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/problem+json",
        body: JSON.stringify({
          type: "https://api.progresseye.com/errors/internal-server-error",
          title: "Internal Server Error",
          status: 500,
          detail: "An unexpected error occurred.",
        }),
      });
    });

    await page.goto("http://localhost:3000/contact?backend=true", { waitUntil: "networkidle" });

    await page.fill("#contact-name", "Mrs. Kapoor");
    await page.fill("#contact-email", "kapoor@academy.ac.in");
    await page.selectOption("#contact-topic", "general");
    await page.fill("#contact-message", "Inquiring about multi-campus operations capability.");

    await page.click("button[type='submit']");

    const errorAlert = page.locator('[data-testid="contact-error-alert"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText("Unable to process inquiry");

    // Input preserved
    await expect(page.locator("#contact-name")).toHaveValue("Mrs. Kapoor");
    await expect(page.locator("#contact-email")).toHaveValue("kapoor@academy.ac.in");
  });

  test("wires footer newsletter subscription to API when backend is active", async ({ page }) => {
    let capturedBody: Record<string, unknown> = {};

    await page.route("**/api/v1/public/newsletter", async (route) => {
      capturedBody = JSON.parse(route.request().postData() || "{}");
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "n3000000-0000-0000-0000-000000000003",
          status: "received",
          message: "Subscribed to updates successfully",
          createdAt: "2026-10-24T12:00:00.000Z",
        }),
      });
    });

    await page.goto("http://localhost:3000/?backend=true", { waitUntil: "networkidle" });

    const newsletterInput = page.locator("#footer-newsletter-email");
    await newsletterInput.fill("newsletter-reader@school.edu.in");

    const submitBtn = page
      .locator("footer")
      .getByRole("button", { name: /subscribe/i })
      .first();
    await submitBtn.click();

    await expect(page.locator("footer output")).toContainText("Subscribed!");
    expect(capturedBody).toMatchObject({
      email: "newsletter-reader@school.edu.in",
      consentGiven: true,
    });
  });
});
