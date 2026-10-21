import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Phase 7 CP3: Contact Page", () => {
  test("renders Hero, walkthrough context card, form, and bottom FAQ teaser", async ({ page }) => {
    await page.goto("http://localhost:3000/contact");

    // 1. Heading H1
    const h1 = page.getByRole("heading", {
      level: 1,
      name: "Get in Touch with our Team",
    });
    await expect(h1).toBeVisible();

    // 2. Context Card with Walkthrough CTA
    await expect(
      page.getByRole("heading", { level: 3, name: "Experience ProgressEye first-hand" }),
    ).toBeVisible();
    const demoLink = page.getByRole("link", { name: "Book a free demo" });
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveAttribute("href", "/demo");

    // Channels are gated (all false by default); assert no fake channels are visible
    await expect(page.getByText("Direct Channels")).not.toBeVisible();

    // 3. Contact Form
    await expect(page.getByRole("heading", { level: 2, name: "Send us a message" })).toBeVisible();
    await expect(page.getByLabel(/Your name/i)).toBeVisible();
    await expect(page.getByLabel(/Email address/i)).toBeVisible();
    await expect(page.getByLabel(/School \/ Institution Name/i)).toBeVisible();
    await expect(page.getByLabel(/Topic/i)).toBeVisible();
    await expect(page.getByLabel(/Message/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();

    // Autocomplete attributes
    await expect(page.locator("#contact-name")).toHaveAttribute("autocomplete", "name");
    await expect(page.locator("#contact-email")).toHaveAttribute("autocomplete", "email");
    await expect(page.locator("#contact-school")).toHaveAttribute("autocomplete", "organization");

    // Privacy line
    const privacyLink = page.getByRole("link", { name: "Privacy Policy" });
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute("href", "/privacy");

    // 4. Bottom FAQ teaser
    await expect(
      page.getByRole("heading", { level: 2, name: "Frequently Asked Questions" }),
    ).toBeVisible();
    const teaserDetails = page.locator("section[aria-labelledby='contact-faq-heading'] details");
    await expect(teaserDetails).toHaveCount(3);

    const faqLink = page.getByRole("link", { name: "View all frequently asked questions" });
    await expect(faqLink).toBeVisible();
    await expect(faqLink).toHaveAttribute("href", "/faq");
  });

  test("validates form client-side, shifts focus to first invalid field, and shows error alerts", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/contact");

    const nameInput = page.locator("#contact-name");
    const emailInput = page.locator("#contact-email");
    const topicSelect = page.locator("#contact-topic");
    const messageInput = page.locator("#contact-message");
    const submitBtn = page.getByRole("button", { name: "Send message" });

    // Initial state: no errors
    await expect(nameInput).toHaveAttribute("aria-invalid", "false");
    await expect(emailInput).toHaveAttribute("aria-invalid", "false");

    // Attempt submit with empty fields
    await submitBtn.click();

    // Focus moves to first invalid field (Name)
    await expect(nameInput).toBeFocused();
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(nameInput).toHaveAttribute("aria-describedby", "contact-name-error");
    await expect(page.locator("#contact-name-error")).toHaveText(
      "Please enter your name (at least 2 characters).",
    );

    // Fill valid name, submit again -> focus moves to Email
    await nameInput.fill("Ramesh Sharma");
    await submitBtn.click();

    await expect(emailInput).toBeFocused();
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#contact-email-error")).toHaveText(
      "Please enter your email address.",
    );

    // Fill invalid email -> format error
    await emailInput.fill("invalid-email-no-at");
    await submitBtn.click();

    await expect(emailInput).toBeFocused();
    await expect(page.locator("#contact-email-error")).toHaveText(
      "Please enter a valid email address (e.g. name@school.org).",
    );

    // Fill valid email, submit -> focus moves to Topic
    await emailInput.fill("ramesh@school.edu.in");
    await submitBtn.click();

    await expect(topicSelect).toBeFocused();
    await expect(page.locator("#contact-topic-error")).toHaveText(
      "Please select an inquiry topic.",
    );

    // Select topic, submit -> focus moves to Message
    await topicSelect.selectOption("onboarding");
    await submitBtn.click();

    await expect(messageInput).toBeFocused();
    await expect(page.locator("#contact-message-error")).toHaveText(
      "Please enter a message of at least 10 characters.",
    );
  });

  test("submits honestly without clearing input and makes zero network requests", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/contact");

    const nameInput = page.locator("#contact-name");
    const emailInput = page.locator("#contact-email");
    const schoolInput = page.locator("#contact-school");
    const topicSelect = page.locator("#contact-topic");
    const messageInput = page.locator("#contact-message");
    const submitBtn = page.getByRole("button", { name: "Send message" });

    // Fill all fields with valid test input
    await nameInput.fill("Dr. Sunita Patel");
    await emailInput.fill("sunita.patel@modernschool.org");
    await schoolInput.fill("Modern Academy Delhi");
    await topicSelect.selectOption("onboarding");
    await messageInput.fill(
      "We are planning to transition our 1,200 student roster for the upcoming academic session.",
    );

    // Wait for all initial page and link prefetching to settle
    await page.waitForLoadState("networkidle");

    // Track any network requests dispatched by form submission
    const outgoingRequests: string[] = [];
    page.on("request", (req) => {
      // Exclude background Next.js client router link prefetching (_rsc)
      if (!req.url().includes("_rsc")) {
        outgoingRequests.push(`${req.method()} ${req.url()}`);
      }
    });

    // Click submit
    await submitBtn.click();
    await page.waitForTimeout(300);

    // Verify honest submission notice appears
    const notice = page.locator("[data-testid='contact-submission-notice']");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("Form not connected");
    await expect(notice).toContainText(
      "This form is not connected yet, so your message was not sent. To reach us, book a free demo.",
    );

    // Notice contains working link to /demo
    const noticeDemoLink = notice.getByRole("link", { name: "book a free demo" });
    await expect(noticeDemoLink).toBeVisible();
    await expect(noticeDemoLink).toHaveAttribute("href", "/demo");

    // CRITICAL: User input was NOT cleared on submit
    await expect(nameInput).toHaveValue("Dr. Sunita Patel");
    await expect(emailInput).toHaveValue("sunita.patel@modernschool.org");
    await expect(schoolInput).toHaveValue("Modern Academy Delhi");
    await expect(topicSelect).toHaveValue("onboarding");
    await expect(messageInput).toHaveValue(
      "We are planning to transition our 1,200 student roster for the upcoming academic session.",
    );

    // CRITICAL: Zero network requests were dispatched on submit
    expect(
      outgoingRequests,
      "No network requests (API, fetch, telemetry) may be dispatched on submit",
    ).toEqual([]);
  });

  test("has zero horizontal overflow across mobile, tablet, and desktop viewports", async ({
    page,
  }) => {
    const viewports = [
      { width: 360, height: 640, label: "mobile" },
      { width: 768, height: 1024, label: "tablet" },
      { width: 1280, height: 800, label: "desktop" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000/contact");
      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });

      expect(
        hasHorizontalScroll,
        `Viewport ${vp.label} (${vp.width}px) should have zero horizontal scroll`,
      ).toBe(false);
    }
  });

  test("passes axe-core accessibility audit on /contact in light and dark mode", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/contact");

    // Light mode audit
    const lightAudit = await new AxeBuilder({ page }).include("main").analyze();
    expect(lightAudit.violations).toEqual([]);

    // Dark mode audit
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    });
    await page.waitForTimeout(100);

    const darkAudit = await new AxeBuilder({ page }).include("main").analyze();
    expect(darkAudit.violations).toEqual([]);
  });

  test("maintains zero layout shift (CLS <= 0.01) on /contact", async ({ page }) => {
    for (const theme of ["light", "dark"] as const) {
      await page.goto("http://localhost:3000/contact");

      await page.evaluate((t) => {
        if (t === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }

        (window as unknown as { __recordedShifts: number[] }).__recordedShifts = [];
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
            if (!shift.hadRecentInput) {
              (window as unknown as { __recordedShifts: number[] }).__recordedShifts.push(
                shift.value,
              );
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
      }, theme);

      await page.waitForLoadState("networkidle");

      // Scroll gradually down the page
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const step = 300;
      for (let y = 0; y <= scrollHeight; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(30);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);

      const totalCls = await page.evaluate(() => {
        const shifts = (window as unknown as { __recordedShifts: number[] }).__recordedShifts || [];
        return shifts.reduce((acc, val) => acc + val, 0);
      });

      expect(totalCls, `CLS on /contact in ${theme} mode must be <= 0.01`).toBeLessThanOrEqual(
        0.01,
      );
    }
  });
});
