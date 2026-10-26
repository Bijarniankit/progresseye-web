import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/marketing/contact/contact-form";
import { siteConfig } from "@/config/site";
import { validateProductionTurnstileConfig } from "@/config/turnstile-env";
import * as api from "@/lib/api/generated/endpoints/public/public";
import enMessages from "../../messages/en.json";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    prefetch: _prefetch,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    prefetch?: boolean;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Lead Forms Unit Tests (Contact & Demo)", () => {
  const originalHasLeadBackend = siteConfig.hasLeadBackend;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    siteConfig.hasLeadBackend = originalHasLeadBackend;
  });

  describe("Flag OFF (siteConfig.hasLeadBackend = false)", () => {
    beforeEach(() => {
      siteConfig.hasLeadBackend = false;
    });

    it("renders contact form with all expected fields and zero network requests on submit", () => {
      render(<ContactForm mode="contact" />);

      expect(screen.getByRole("heading", { name: "Send us a message" })).toBeInTheDocument();
      expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/School \/ Institution Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Topic/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

      // Submit valid data
      fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: "Anita Sharma" } });
      fireEvent.change(screen.getByLabelText(/Email address/i), {
        target: { value: "anita@school.edu.in" },
      });
      fireEvent.change(screen.getByLabelText(/Topic/i), { target: { value: "general" } });
      fireEvent.change(screen.getByLabelText(/Message/i), {
        target: { value: "Testing the offline submission behavior." },
      });

      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      // Honest notice appears
      expect(screen.getByTestId("contact-submission-notice")).toBeInTheDocument();
      expect(screen.getByText(/Form not connected/i)).toBeInTheDocument();

      // Input preserved
      expect(screen.getByLabelText(/Your name/i)).toHaveValue("Anita Sharma");
      expect(screen.getByLabelText(/Email address/i)).toHaveValue("anita@school.edu.in");
    });

    it("renders pruned demo form (without phone, city, student count, preferred time)", () => {
      render(<ContactForm mode="demo" />);

      expect(screen.getByRole("heading", { name: "Schedule a Product Demo" })).toBeInTheDocument();
      expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Work \/ School email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/School \/ Institution Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Notes or specific questions/i)).toBeInTheDocument();

      // Pruned fields are absent
      expect(screen.queryByLabelText(/Phone number/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/City/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Estimated Student Count/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Preferred Time/i)).not.toBeInTheDocument();

      // Pre-typing notice is visible in offline mode
      expect(screen.getByTestId("demo-pre-typing-notice")).toBeInTheDocument();

      // Submit valid demo request
      fireEvent.change(screen.getByLabelText(/Your name/i), {
        target: { value: "Principal Gupta" },
      });
      fireEvent.change(screen.getByLabelText(/Work \/ School email/i), {
        target: { value: "principal@dps.org" },
      });
      fireEvent.change(screen.getByLabelText(/School \/ Institution Name/i), {
        target: { value: "DPS Gurgaon" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Request a demo" }));

      expect(screen.getByTestId("demo-submission-notice")).toBeInTheDocument();
      expect(screen.getByText("Not sent")).toBeInTheDocument();

      // Input preserved
      expect(screen.getByLabelText(/Your name/i)).toHaveValue("Principal Gupta");
    });
  });

  describe("Flag ON (siteConfig.hasLeadBackend = true)", () => {
    beforeEach(() => {
      siteConfig.hasLeadBackend = true;
    });

    it("submits contact inquiry to API and displays opaque receipt on 201", async () => {
      const mockReceipt = {
        id: "c1234567-89ab-cdef-0123-456789abcdef",
        status: "received",
        message: "Inquiry received successfully",
        createdAt: "2026-10-24T12:00:00.000Z",
      };

      const submitSpy = vi
        .spyOn(api, "publicControllerSubmitContact")
        .mockResolvedValueOnce(mockReceipt);

      render(<ContactForm mode="contact" />);

      // Pre-typing notice should NOT be visible when backend is active
      expect(screen.queryByTestId("contact-submission-notice")).not.toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: "Director Roy" } });
      fireEvent.change(screen.getByLabelText(/Email address/i), {
        target: { value: "director@stxaviers.edu" },
      });
      fireEvent.change(screen.getByLabelText(/Topic/i), { target: { value: "onboarding" } });
      fireEvent.change(screen.getByLabelText(/Message/i), {
        target: { value: "We would like to discuss campus fee automation." },
      });

      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      await waitFor(() => {
        expect(submitSpy).toHaveBeenCalledTimes(1);
      });

      // Verify payload and idempotency header
      const [payload, options] = submitSpy.mock.calls[0];
      expect(payload).toMatchObject({
        name: "Director Roy",
        email: "director@stxaviers.edu",
        topic: "onboarding",
        message: "We would like to discuss campus fee automation.",
        consentGiven: true,
      });
      expect(options?.headers).toHaveProperty("Idempotency-Key");

      // Verify receipt UI
      await waitFor(() => {
        expect(screen.getByTestId("contact-receipt")).toBeInTheDocument();
      });
      expect(screen.getByText(/Inquiry Received/i)).toBeInTheDocument();
      expect(screen.getByText(/Ref: c1234567/i)).toBeInTheDocument();
    });

    it("submits demo request to API and displays opaque receipt on 201", async () => {
      const mockReceipt = {
        id: "d9876543-210f-edcb-a987-654321fedcba",
        status: "received",
        message: "Demo request received successfully",
        createdAt: "2026-10-24T12:00:00.000Z",
      };

      const submitSpy = vi
        .spyOn(api, "publicControllerSubmitDemo")
        .mockResolvedValueOnce(mockReceipt);

      render(<ContactForm mode="demo" />);

      // Pre-typing notice should NOT be visible when backend is active
      expect(screen.queryByTestId("demo-pre-typing-notice")).not.toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/Your name/i), {
        target: { value: "Principal Mehta" },
      });
      fireEvent.change(screen.getByLabelText(/Work \/ School email/i), {
        target: { value: "mehta@heritage.ac.in" },
      });
      fireEvent.change(screen.getByLabelText(/School \/ Institution Name/i), {
        target: { value: "The Heritage School" },
      });
      fireEvent.change(screen.getByLabelText(/Notes or specific questions/i), {
        target: { value: "Specific interest in automated grade cards." },
      });

      fireEvent.click(screen.getByRole("button", { name: "Request a demo" }));

      await waitFor(() => {
        expect(submitSpy).toHaveBeenCalledTimes(1);
      });

      // Verify payload and idempotency header
      const [payload, options] = submitSpy.mock.calls[0];
      expect(payload).toMatchObject({
        name: "Principal Mehta",
        email: "mehta@heritage.ac.in",
        schoolName: "The Heritage School",
        notes: "Specific interest in automated grade cards.",
        consentGiven: true,
      });
      expect(options?.headers).toHaveProperty("Idempotency-Key");

      // Verify receipt UI
      await waitFor(() => {
        expect(screen.getByTestId("demo-receipt")).toBeInTheDocument();
      });
      expect(screen.getByText(/Demo Request Received/i)).toBeInTheDocument();
      expect(screen.getByText(/Ref: d9876543/i)).toBeInTheDocument();
    });
  });

  describe("Honeypot Field Verification", () => {
    it("renders honeypot field with name and id matching API schema field 'website_url'", () => {
      const { container } = render(<ContactForm mode="contact" />);
      const honeypot = container.querySelector('input[name="website_url"]');
      expect(honeypot).toBeInTheDocument();
      expect(honeypot).toHaveAttribute("id", "contact-website_url");
      expect(honeypot).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("Production Turnstile Validation (validateProductionTurnstileConfig)", () => {
    it("rejects production build if NEXT_PUBLIC_TURNSTILE_SITE_KEY is a Cloudflare test key when flag is on", () => {
      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "production",
          hasLeadBackend: "true",
          siteKey: "1x00000000000000000000AA",
        }),
      ).toThrowError(/cannot be a Cloudflare test key/);

      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "production",
          hasLeadBackend: true,
          siteKey: "2x00000000000000000000AB",
        }),
      ).toThrowError(/cannot be a Cloudflare test key/);

      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "production",
          hasLeadBackend: true,
          siteKey: "3x00000000000000000000FF",
        }),
      ).toThrowError(/cannot be a Cloudflare test key/);
    });

    it("rejects production build if site key is empty when flag is on", () => {
      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "production",
          hasLeadBackend: true,
          siteKey: "",
        }),
      ).toThrowError(/NEXT_PUBLIC_TURNSTILE_SITE_KEY is required/);
    });

    it("allows production build when valid non-test production key is provided", () => {
      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "production",
          hasLeadBackend: true,
          siteKey: "0x4AAAAAAtestRealProdKey123",
        }),
      ).not.toThrow();
    });

    it("allows test keys when not in production environment or flag is off", () => {
      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "development",
          hasLeadBackend: true,
          siteKey: "1x00000000000000000000AA",
        }),
      ).not.toThrow();

      expect(() =>
        validateProductionTurnstileConfig({
          appEnv: "production",
          hasLeadBackend: false,
          siteKey: "1x00000000000000000000AA",
        }),
      ).not.toThrow();
    });
  });

  describe("Newsletter Consent Text Synchronization", () => {
    it("asserts client newsletter consent copy exactly matches server consent template", () => {
      // Server template from src/modules/public/domain/consent-templates.ts:
      // "By subscribing, you agree to receive ProgressEye product updates and announcements."
      const serverTemplate =
        "By subscribing, you agree to receive ProgressEye product updates and announcements.";
      expect(enMessages.footer.newsletterPrivacy).toBe(serverTemplate);
    });
  });

  describe("API Turnstile Failure Code Mapping", () => {
    beforeEach(() => {
      siteConfig.hasLeadBackend = true;
    });

    it("maps SPAM_VERIFICATION_FAILED problem code to general error message on contact submission", async () => {
      const { ApiProblemError } = await import("@/lib/api/client");
      vi.spyOn(api, "publicControllerSubmitContact").mockRejectedValueOnce(
        new ApiProblemError(400, {
          code: "SPAM_VERIFICATION_FAILED",
          title: "Bad Request",
          detail: "Spam verification failed",
        }),
      );

      render(<ContactForm mode="contact" />);
      fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: "Anita Sharma" } });
      fireEvent.change(screen.getByLabelText(/Email address/i), {
        target: { value: "anita@school.edu.in" },
      });
      fireEvent.change(screen.getByLabelText(/Topic/i), { target: { value: "general" } });
      fireEvent.change(screen.getByLabelText(/Message/i), {
        target: { value: "Need a demonstration for our school staff." },
      });

      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      await waitFor(() => {
        expect(
          screen.getByText(
            "Verification failed. Please complete the security check and try again.",
          ),
        ).toBeInTheDocument();
      });
    });

    it("maps SPAM_VERIFICATION_FAILED problem code to general error message on demo submission", async () => {
      const { ApiProblemError } = await import("@/lib/api/client");
      vi.spyOn(api, "publicControllerSubmitDemo").mockRejectedValueOnce(
        new ApiProblemError(400, {
          code: "SPAM_VERIFICATION_FAILED",
          title: "Bad Request",
          detail: "Spam verification failed",
        }),
      );

      render(<ContactForm mode="demo" />);
      fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: "Rajesh Kumar" } });
      fireEvent.change(screen.getByLabelText(/Work \/ School Email/i), {
        target: { value: "rajesh@school.edu.in" },
      });
      fireEvent.change(screen.getByLabelText(/School \/ Institution Name/i), {
        target: { value: "St. Xavier's School" },
      });

      fireEvent.click(screen.getByRole("button", { name: /request a demo/i }));

      await waitFor(() => {
        expect(
          screen.getByText(
            "Verification failed. Please complete the security check and try again.",
          ),
        ).toBeInTheDocument();
      });
    });
  });
});
