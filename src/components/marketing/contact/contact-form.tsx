"use client";

import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { contactConfig } from "@/config/contact";

interface FormState {
  name: string;
  email: string;
  schoolName: string;
  topic: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  schoolName: "",
  topic: "",
  message: "",
  website: "",
};

// Hand-written lightweight email validator (zero external dependency, 0 bytes Zod)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedNotice, setSubmittedNotice] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Honeypot check: silent return if filled by bots
    if (formData.website.trim().length > 0) {
      return;
    }

    // 2. Client-side validation (pure hand-written validation without full zod)
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@school.org).";
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "Please select an inquiry topic.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please enter a message of at least 10 characters.";
    }

    // 3. If validation fails, set errors and shift focus to the first invalid field
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmittedNotice(false);

      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.email) {
        emailRef.current?.focus();
      } else if (newErrors.topic) {
        topicRef.current?.focus();
      } else if (newErrors.message) {
        messageRef.current?.focus();
      }
      return;
    }

    // 4. Validation passed: show honest submission notice
    // NO network request made (zero fetch, zero telemetry)
    // Field values preserved (do not clear user input on submit)
    setErrors({});
    setSubmittedNotice(true);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="mb-6 space-y-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text">
          Send us a message
        </h2>
        <p className="text-sm text-text-muted">
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

      {submittedNotice && (
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
              {/* DRAFT-CONTENT-REVIEW: Honest notice regarding unbuilt form backend */}
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
          <label htmlFor="contact-website">Leave this field blank</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-sm font-medium text-text">
            Your name <span className="text-brand">*</span>
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Ramesh Sharma"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              errors.name ? "border-brand" : "border-border hover:border-brand/40"
            }`}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="text-xs font-medium text-brand mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-sm font-medium text-text">
            Email address <span className="text-brand">*</span>
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="e.g. principal@school.edu.in"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
              errors.email ? "border-brand" : "border-border hover:border-brand/40"
            }`}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="text-xs font-medium text-brand mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* School Name (Optional) */}
        <div className="space-y-1.5">
          <label htmlFor="contact-school" className="block text-sm font-medium text-text">
            School / Institution Name{" "}
            <span className="text-xs font-normal text-text-muted">(Optional)</span>
          </label>
          <input
            id="contact-school"
            name="schoolName"
            type="text"
            autoComplete="organization"
            placeholder="Your school name"
            value={formData.schoolName}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          />
        </div>

        {/* Topic Selector */}
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
            aria-invalid={!!errors.topic}
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

        {/* Message Field */}
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
            aria-invalid={!!errors.message}
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

        {/* Privacy Agreement Line */}
        {/* DRAFT-NEEDS-LEGAL-REVIEW: Privacy Policy acceptance line */}
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-xs transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:w-auto"
          >
            <span>Send message</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
