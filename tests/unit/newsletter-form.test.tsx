import messages from "@messages/en.json";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/config/site";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

function renderFooter(props?: { hideNewsletter?: boolean }) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Footer {...props} />
    </NextIntlClientProvider>,
  );
}

describe("Footer & Newsletter Form Unit Tests", () => {
  const originalFetch = global.fetch;
  const originalSiteKey = siteConfig.turnstileSiteKey;

  beforeEach(() => {
    vi.restoreAllMocks();
    siteConfig.turnstileSiteKey = "";
    window.history.replaceState({}, "", "/");
    const script = document.getElementById("cf-turnstile-script");
    if (script) script.remove();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    siteConfig.turnstileSiteKey = originalSiteKey;
    window.history.replaceState({}, "", "/");
    const script = document.getElementById("cf-turnstile-script");
    if (script) script.remove();
  });

  it("renders watermark text 'ProgressEye' in title case with aria-hidden", () => {
    const { container } = renderFooter();
    const watermark = container.querySelector("[aria-hidden='true'].font-display.font-extrabold");
    expect(watermark).toBeInTheDocument();
    expect(watermark?.textContent?.trim()).toBe("ProgressEye");
  });

  it("validates email input and prevents empty submission", () => {
    renderFooter();
    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it("displays informative not-connected state notice on submission (zero fake success, flag-OFF byte-identical to Phase 8)", () => {
    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;

    const { container } = renderFooter();
    const emailInput = screen.getByPlaceholderText(/enter your school email/i);
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: "principal@delhischool.edu.in" } });
    fireEvent.click(submitButton);

    // In flag-OFF mode: zero network requests
    expect(fetchSpy).not.toHaveBeenCalled();

    // Renders inside a <p> element with exact Phase 8 message
    const noticeP = container.querySelector("p.text-xs.font-medium");
    expect(noticeP).toBeInTheDocument();
    expect(noticeP?.tagName).toBe("P");
    expect(noticeP?.textContent?.trim()).toBe("Newsletter subscriptions will open in Phase 9.");
  });

  it("confirms flag-OFF loads no Cloudflare script on footer render or interaction", () => {
    renderFooter();
    const emailInput = screen.getByPlaceholderText(/enter your school email/i);
    fireEvent.focus(emailInput);
    fireEvent.change(emailInput, { target: { value: "test@school.edu" } });

    expect(document.getElementById("cf-turnstile-script")).toBeNull();
    expect(screen.queryByTestId("turnstile-widget")).not.toBeInTheDocument();
  });

  it("hides newsletter form when hideNewsletter is true", () => {
    renderFooter({ hideNewsletter: true });
    expect(screen.queryByPlaceholderText(/enter your school email/i)).not.toBeInTheDocument();
  });

  describe("API wiring parity with backend flag enabled (?backend=true)", () => {
    beforeEach(() => {
      window.history.replaceState({}, "", "/?backend=true");
    });

    afterEach(() => {
      window.history.replaceState({}, "", "/");
      siteConfig.turnstileSiteKey = originalSiteKey;
    });

    it("renders honeypot field with name 'website_url' matching API schema exactly", () => {
      const { container } = renderFooter();
      const honeypotInput = container.querySelector(
        'input[name="website_url"]',
      ) as HTMLInputElement;

      expect(honeypotInput).toBeInTheDocument();
      expect(honeypotInput.name).toBe("website_url");
      expect(honeypotInput.tabIndex).toBe(-1);
    });

    it("activates Turnstile widget on email focus when backend is enabled and siteKey is set", () => {
      siteConfig.turnstileSiteKey = "1x00000000000000000000AA";
      renderFooter();

      // Before focus: widget not mounted
      expect(screen.queryByTestId("turnstile-widget")).not.toBeInTheDocument();

      // Focus email input
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      fireEvent.focus(emailInput);

      // Widget mounts in DOM
      expect(screen.getByTestId("turnstile-widget")).toBeInTheDocument();
    });

    it("disables submit button when Turnstile is enabled until a token exists", () => {
      siteConfig.turnstileSiteKey = "1x00000000000000000000AA";
      renderFooter();

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      // When Turnstile is required and token is not set, submit button is disabled
      expect(submitButton).toBeDisabled();
    });

    it("sends Idempotency-Key UUID header and expected JSON payload", async () => {
      let capturedUrl = "";
      let capturedHeaders: Record<string, string> = {};
      let capturedBody: Record<string, unknown> = {};

      global.fetch = vi.fn().mockImplementation(async (url, init) => {
        capturedUrl = String(url);
        capturedHeaders = init?.headers as Record<string, string>;
        capturedBody = JSON.parse(init?.body as string);
        return new Response(
          JSON.stringify({
            id: "sub-123",
            status: "received",
            message: "Subscribed to updates successfully",
            createdAt: "2026-10-24T12:00:00.000Z",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } },
        );
      });

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "headmaster@school.ac.in" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(capturedUrl).toBe("/api/v1/public/newsletter");
      expect(capturedHeaders["Content-Type"]).toBe("application/json");
      expect(capturedHeaders["Idempotency-Key"]).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
      expect(capturedBody).toEqual({
        email: "headmaster@school.ac.in",
        consentGiven: true,
      });

      expect(screen.getByText(/subscribed! thank you for staying updated/i)).toBeInTheDocument();
    });

    it("transitions to success state and renders confirmation message on 201 response", async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            id: "sub-201",
            status: "received",
            message: "Subscribed successfully",
            createdAt: "2026-10-25T12:00:00.000Z",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } },
        ),
      );

      const { container } = renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "teacher@school.org" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      const outputElem = container.querySelector("output");
      expect(outputElem).toBeInTheDocument();
      expect(outputElem?.textContent).toContain("Subscribed! Thank you for staying updated.");
    });

    it("ignores submission if honeypot website_url is filled (bot protection)", async () => {
      const fetchSpy = vi.fn();
      global.fetch = fetchSpy;

      const { container } = renderFooter();
      const honeypotInput = container.querySelector(
        'input[name="website_url"]',
      ) as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(honeypotInput, { target: { value: "https://spam.example.com" } });
      fireEvent.change(emailInput, { target: { value: "spammer@bot.org" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("maps RFC 9457 400 validation error with invalidParams reason", async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            type: "https://progresseye.com/probs/validation-error",
            title: "Validation Failed",
            status: 400,
            invalidParams: [{ name: "email", reason: "Educational institution email required" }],
          }),
          { status: 400, headers: { "Content-Type": "application/problem+json" } },
        ),
      );

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "user@disposable.com" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(screen.getByText("Educational institution email required")).toBeInTheDocument();
    });

    it("maps Turnstile verification failure from API to clear security message", async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            type: "https://progresseye.com/probs/bad-request",
            title: "Bad Request",
            detail: "Spam verification failed",
            status: 400,
          }),
          { status: 400, headers: { "Content-Type": "application/problem+json" } },
        ),
      );

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "visitor@school.edu" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(
        screen.getByText("Verification failed. Please complete the security check and try again."),
      ).toBeInTheDocument();
    });

    it("maps 409 in-flight conflict to retry message", async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            type: "https://progresseye.com/probs/conflict",
            title: "Conflict",
            detail: "A submission with this idempotency key is already processing",
            status: 409,
          }),
          { status: 409, headers: { "Content-Type": "application/problem+json" } },
        ),
      );

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "principal@delhi.edu" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(
        screen.getByText("A request is already in progress. Please wait a moment and try again."),
      ).toBeInTheDocument();
    });

    it("maps RFC 9457 422 error and regenerates idempotency key", async () => {
      const keysUsed: string[] = [];

      global.fetch = vi.fn().mockImplementation(async (_url, init) => {
        const headers = (init?.headers ?? {}) as Record<string, string>;
        keysUsed.push(headers["Idempotency-Key"]);
        return new Response(
          JSON.stringify({
            type: "https://progresseye.com/probs/idempotency-conflict",
            title: "Unprocessable Entity",
            status: 422,
            detail: "Payload mismatch for key",
          }),
          { status: 422, headers: { "Content-Type": "application/problem+json" } },
        );
      });

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "principal@delhi.edu" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(
        screen.getByText(
          /subscription session expired\. please review your details and submit again/i,
        ),
      ).toBeInTheDocument();

      // Submit again to confirm new key was generated
      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(keysUsed.length).toBe(2);
      expect(keysUsed[0]).not.toBe(keysUsed[1]);
    });

    it("maps RFC 9457 429 rate limit error with Retry-After header", async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            type: "https://progresseye.com/probs/rate-limit-exceeded",
            title: "Too Many Requests",
            status: 429,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/problem+json",
              "Retry-After": "180",
            },
          },
        ),
      );

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "principal@delhi.edu" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(
        screen.getByText(/too many requests\. please try again in 3 minutes\./i),
      ).toBeInTheDocument();
    });

    it("maps 500 server error to friendly message", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValue(new Response("Internal Server Error", { status: 500 }));

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "principal@delhi.edu" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(
        screen.getByText(/unable to subscribe\. please try again later\./i),
      ).toBeInTheDocument();
    });

    it("maps network error to user-friendly message", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Failed to fetch"));

      renderFooter();
      const emailInput = screen.getByPlaceholderText(/enter your school email/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(emailInput, { target: { value: "principal@delhi.edu" } });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(screen.getByText(/network error\. please try again\./i)).toBeInTheDocument();
    });
  });
});
