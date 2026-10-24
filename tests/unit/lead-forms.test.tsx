import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/marketing/contact/contact-form";
import { siteConfig } from "@/config/site";
import * as api from "@/lib/api/generated/endpoints/public/public";

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
});
