"use client";

import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { ApiProblemError } from "@/lib/api/client";
import {
  publicControllerSubmitContact,
  publicControllerSubmitDemo,
} from "@/lib/api/generated/endpoints/public/public";
import type { PublicLeadResponseDto } from "@/lib/api/generated/model";
import { TurnstileWidget } from "./turnstile-widget";

export interface InquiryFormProps {
  mode?: "contact" | "demo";
}

interface FormState {
  name: string;
  email: string;
  schoolName: string;
  topic: string;
  message: string;
  notes: string;
  website_url: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  schoolName?: string;
  topic?: string;
  message?: string;
  notes?: string;
  general?: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  schoolName: "",
  topic: "",
  message: "",
  notes: "",
  website_url: "",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function ContactForm({ mode = "contact" }: InquiryFormProps) {
  const isDemo = mode === "demo";
  const prefix = isDemo ? "demo" : "contact";
  const [hasBackend] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("backend") === "true") return true;
    }
    return siteConfig.hasLeadBackend;
  });

  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedNotice, setSubmittedNotice] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [receipt, setReceipt] = useState<PublicLeadResponseDto | null>(null);

  // Idempotency key per submission intent; regenerated on field edit
  const idempotencyKeyRef = useRef<string>(generateUuid());

  // Field refs for focus shifting
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Generate new idempotency key when user edits fields
    idempotencyKeyRef.current = generateUuid();
    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Honeypot check for offline preview mode
    if (!hasBackend && formData.website_url.trim().length > 0) {
      return;
    }

    // 2. Client-side validation
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@school.org).";
    }

    if (isDemo) {
      if (!formData.schoolName.trim() || formData.schoolName.trim().length < 2) {
        newErrors.schoolName = "Please enter your school or institution name.";
      }
    } else {
      if (!formData.topic.trim()) {
        newErrors.topic = "Please select an inquiry topic.";
      }

      if (!formData.message.trim() || formData.message.trim().length < 10) {
        newErrors.message = "Please enter a message of at least 10 characters.";
      }
    }

    // 3. Focus shifting to first invalid field
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmittedNotice(false);

      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.email) {
        emailRef.current?.focus();
      } else if (isDemo && newErrors.schoolName) {
        schoolRef.current?.focus();
      } else if (!isDemo && newErrors.topic) {
        topicRef.current?.focus();
      } else if (!isDemo && newErrors.message) {
        messageRef.current?.focus();
      }
      return;
    }

    // 4. Offline mode: show honest submission notice with zero network requests
    if (!hasBackend) {
      setErrors({});
      setSubmittedNotice(true);
      return;
    }

    // 5. Backend mode: wire to live API with idempotency header
    setIsSubmitting(true);
    setErrors({});

    try {
      const headers = {
        "Idempotency-Key": idempotencyKeyRef.current,
      };

      if (isDemo) {
        const res = await publicControllerSubmitDemo(
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            schoolName: formData.schoolName.trim(),
            notes: formData.notes.trim() || undefined,
            consentGiven: true,
            website_url: formData.website_url.trim() || undefined,
            turnstileToken: turnstileToken || undefined,
          },
          { headers },
        );
        setReceipt(res);
      } else {
        const res = await publicControllerSubmitContact(
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            schoolName: formData.schoolName.trim() || undefined,
            topic: formData.topic.trim() || undefined,
            message: formData.message.trim(),
            consentGiven: true,
            website_url: formData.website_url.trim() || undefined,
            turnstileToken: turnstileToken || undefined,
          },
          { headers },
        );
        setReceipt(res);
      }
    } catch (err: unknown) {
      if (err instanceof ApiProblemError) {
        if (err.problem.code === "SPAM_VERIFICATION_FAILED") {
          setErrors({
            general: "Verification failed. Please complete the security check and try again.",
          });
        } else if (err.status === 409) {
          setErrors({
            general: "A request is already in progress. Please wait a moment and try again.",
          });
        } else if (err.status === 400 && err.problem.invalidParams) {
          const fieldErrors: FormErrors = {};
          for (const param of err.problem.invalidParams) {
            fieldErrors[param.name as keyof FormErrors] = param.reason;
          }
          setErrors(fieldErrors);
        } else if (err.status === 429) {
          const retryMsg = err.retryAfter
            ? `Too many requests. Please try again in ${Math.ceil(err.retryAfter / 60)} minutes.`
            : "Too many requests. Please try again in a few minutes.";
          setErrors({ general: retryMsg });
        } else if (err.status === 422) {
          // Idempotency payload mismatch; regenerate key and request retry
          idempotencyKeyRef.current = generateUuid();
          setErrors({
            general: "Submission session expired. Please review your details and submit again.",
          });
        } else {
          setErrors({
            general: "Unable to process inquiry. Please check your information and try again.",
          });
        }
      } else {
        setErrors({
          general: "A network error occurred. Please check your connection and try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData(initialFormState);
    setErrors({});
    setSubmittedNotice(false);
    setReceipt(null);
    idempotencyKeyRef.current = generateUuid();
  }

  // 6. Connected Mode: Opaque Receipt Display
  if (hasBackend && receipt) {
    return (
      <div
        role="status"
        aria-live="polite"
        data-testid={isDemo ? "demo-receipt" : "contact-receipt"}
        className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
      >
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-brand/10 p-3 text-brand">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold tracking-tight text-text">
              {isDemo ? "Demo Request Received" : "Inquiry Received"}
            </h2>
            <p className="text-sm text-text-muted">
              Reference Code:{" "}
              <code className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-xs font-semibold text-brand">
                Ref: {receipt.id.slice(0, 8)}
              </code>
            </p>
          </div>
        </div>

        <p className="text-sm text-text-muted leading-relaxed">
          Thank you for reaching out. Your inquiry has been logged securely and our team will review
          it shortly.
        </p>

        <div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text hover:bg-surface-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            {isDemo ? "Request another demo" : "Send another message"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="mb-6 space-y-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text">
          {isDemo ? "Schedule a Product Demo" : "Send us a message"}
        </h2>
        <p className="text-sm text-text-muted">
          {!hasBackend ? (
            isDemo ? (
              "This form is not connected yet, so requests are not sent."
            ) : (
              <>
                This form is not connected yet, so messages are not sent. To reach us,{" "}
                <Link
                  href="/demo"
                  prefetch={false}
                  className="font-semibold text-brand underline hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  book a free demo
                </Link>
                .
              </>
            )
          ) : isDemo ? (
            "Explore planned ProgressEye workflows tailored to your school."
          ) : (
            "Have questions about features or deployment? Reach our team."
          )}
        </p>
      </div>

      {/* Honest notice shown before typing on Demo page (Offline mode only) */}
      {!hasBackend && isDemo && !submittedNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="demo-pre-typing-notice"
          className="mb-6 rounded-xl border border-border bg-surface-subtle p-5 text-sm text-text"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p className="font-semibold text-text">Demo requests not connected</p>
              <p className="text-text-muted leading-relaxed">
                This form is not connected yet, so requests are not sent.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submission Success Notice (Contact Offline Mode) */}
      {!hasBackend && !isDemo && submittedNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="contact-submission-notice"
          className="mb-6 rounded-xl border border-border bg-surface-subtle p-5 text-sm text-text"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p className="font-semibold text-text">Form not connected</p>
              <p className="text-text-muted leading-relaxed">
                This form is not connected yet, so messages are not sent. To reach us,{" "}
                <Link
                  href="/demo"
                  prefetch={false}
                  className="font-semibold text-brand underline hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  book a free demo
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submission Notice (Demo Offline Mode) */}
      {!hasBackend && isDemo && submittedNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="demo-submission-notice"
          className="mb-6 rounded-xl border border-border bg-surface-subtle p-5 text-sm text-text"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p className="font-semibold text-text">Not sent</p>
              <p className="text-text-muted leading-relaxed">
                This form is not connected yet, so your request was not sent.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* General Submission Error (Backend Mode) */}
      {hasBackend && errors.general && (
        <div
          role="alert"
          data-testid={`${prefix}-error-alert`}
          className="mb-6 rounded-xl border border-brand bg-surface-subtle p-4 text-sm text-text"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
            <p className="font-medium text-brand">{errors.general}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot field for bot suppression */}
        <div
          className="sr-only"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            opacity: 0,
            height: 0,
            width: 0,
            overflow: "hidden",
          }}
        >
          <label htmlFor={`${prefix}-website_url`}>Leave this field blank</label>
          <input
            id={`${prefix}-website_url`}
            name="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_url}
            onChange={handleChange}
          />
        </div>

        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor={`${prefix}-name`} className="block text-sm font-medium text-text">
            Your name <span className="text-brand">*</span>
          </label>
          <input
            ref={nameRef}
            id={`${prefix}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
            className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              errors.name ? "border-brand" : "border-border hover:border-brand/40"
            }`}
          />
          {errors.name && (
            <p
              id={`${prefix}-name-error`}
              role="alert"
              className="text-xs font-medium text-brand mt-1"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor={`${prefix}-email`} className="block text-sm font-medium text-text">
            {isDemo ? "Work / School email" : "Email address"} <span className="text-brand">*</span>
          </label>
          <input
            ref={emailRef}
            id={`${prefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={isDemo ? "name@yourschool.example" : "e.g. principal@school.edu.in"}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? `${prefix}-email-error` : undefined}
            className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              errors.email ? "border-brand" : "border-border hover:border-brand/40"
            }`}
          />
          {errors.email && (
            <p
              id={`${prefix}-email-error`}
              role="alert"
              className="text-xs font-medium text-brand mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* School Name Field */}
        <div className="space-y-1.5">
          <label htmlFor={`${prefix}-school`} className="block text-sm font-medium text-text">
            School / Institution Name{" "}
            {isDemo ? (
              <span className="text-brand">*</span>
            ) : (
              <span className="text-xs font-normal text-text-muted">(Optional)</span>
            )}
          </label>
          <input
            ref={schoolRef}
            id={`${prefix}-school`}
            name="schoolName"
            type="text"
            required={isDemo}
            autoComplete="organization"
            placeholder="Your school name"
            value={formData.schoolName}
            onChange={handleChange}
            aria-invalid={errors.schoolName ? "true" : "false"}
            aria-describedby={errors.schoolName ? `${prefix}-school-error` : undefined}
            className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              errors.schoolName ? "border-brand" : "border-border hover:border-brand/40"
            }`}
          />
          {errors.schoolName && (
            <p
              id={`${prefix}-school-error`}
              role="alert"
              className="text-xs font-medium text-brand mt-1"
            >
              {errors.schoolName}
            </p>
          )}
        </div>

        {/* Topic Selector (Contact only) */}
        {!isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="contact-topic" className="block text-sm font-medium text-text">
              Topic <span className="text-brand">*</span>
            </label>
            <select
              ref={topicRef}
              id="contact-topic"
              name="topic"
              required
              value={formData.topic}
              onChange={handleChange}
              aria-invalid={errors.topic ? "true" : "false"}
              aria-describedby={errors.topic ? "contact-topic-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.topic ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            >
              <option value="">Select a topic...</option>
              {contactConfig.topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.topic && (
              <p
                id="contact-topic-error"
                role="alert"
                className="text-xs font-medium text-brand mt-1"
              >
                {errors.topic}
              </p>
            )}
          </div>
        )}

        {/* Message Field (Contact only) */}
        {!isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="block text-sm font-medium text-text">
              Message <span className="text-brand">*</span>
            </label>
            <textarea
              ref={messageRef}
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="How can we help your institution?"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.message ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            />
            {errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="text-xs font-medium text-brand mt-1"
              >
                {errors.message}
              </p>
            )}
          </div>
        )}

        {/* Notes Field (Demo only) */}
        {isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="demo-notes" className="block text-sm font-medium text-text">
              Notes or specific questions{" "}
              <span className="text-xs font-normal text-text-muted">(Optional)</span>
            </label>
            <textarea
              ref={notesRef}
              id="demo-notes"
              name="notes"
              rows={3}
              placeholder="Any specific areas of interest or questions?"
              value={formData.notes}
              onChange={handleChange}
              aria-invalid={errors.notes ? "true" : "false"}
              aria-describedby={errors.notes ? "demo-notes-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.notes ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            />
            {errors.notes && (
              <p id="demo-notes-error" role="alert" className="text-xs font-medium text-brand mt-1">
                {errors.notes}
              </p>
            )}
          </div>
        )}

        {/* Turnstile Anti-Abuse Widget (Backend Mode Only) */}
        {hasBackend && (
          <TurnstileWidget
            hasBackend={hasBackend}
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
          />
        )}

        {/* Privacy Agreement Line */}
        <p className="text-xs text-text-muted leading-relaxed">
          By sending this you agree to our{" "}
          <Link
            href="/privacy"
            className="font-medium text-text underline hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-xs transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
          >
            <span>
              {isSubmitting ? "Submitting..." : isDemo ? "Request a demo" : "Send message"}
            </span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}

export const InquiryForm = ContactForm;
