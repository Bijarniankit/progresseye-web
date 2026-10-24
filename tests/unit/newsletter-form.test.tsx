import messages from "@messages/en.json";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/marketing/footer";

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

  beforeEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.history.replaceState({}, "", "/");
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
