"use client";

import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { contactConfig } from "@/config/contact";

export interface InquiryFormProps {
  mode?: "contact" | "demo";
}

interface FormState {
  name: string;
  email: string;
  schoolName: string;
  topic: string;
  message: string;
  phone: string;
  city: string;
  studentCount: string;
  preferredTime: string;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  phone?: string;
  schoolName?: string;
  city?: string;
  studentCount?: string;
  preferredTime?: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  schoolName: "",
  topic: "",
  message: "",
  phone: "",
  city: "",
  studentCount: "",
  preferredTime: "",
  website: "",
};

export const STUDENT_COUNT_OPTIONS = [
  { value: "under-250", label: "Under 250 students" },
  { value: "250-500", label: "250 - 500 students" },
  { value: "500-1000", label: "500 - 1,000 students" },
  { value: "1000-plus", label: "1,000+ students" },
];

export const PREFERRED_TIME_OPTIONS = [
  { value: "morning", label: "Morning (9:00 AM – 12:00 PM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM – 3:00 PM)" },
  { value: "late-afternoon", label: "Late Afternoon (3:00 PM – 6:00 PM)" },
];

// Hand-written lightweight email validator (zero external dependency, 0 bytes Zod)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Hand-written lightweight phone validator
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

export function ContactForm({ mode = "contact" }: InquiryFormProps) {
  const isDemo = mode === "demo";
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedNotice, setSubmittedNotice] = useState<boolean>(false);

  // Field refs for focus shifting
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const studentCountRef = useRef<HTMLSelectElement>(null);
  const preferredTimeRef = useRef<HTMLSelectElement>(null);
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
      if (!formData.phone.trim()) {
        newErrors.phone = "Please enter your phone number.";
      } else if (!isValidPhone(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
      }

      if (!formData.schoolName.trim() || formData.schoolName.trim().length < 2) {
        newErrors.schoolName = "Please enter your school or institution name.";
      }

      if (!formData.city.trim() || formData.city.trim().length < 2) {
        newErrors.city = "Please enter your city.";
      }

      if (!formData.studentCount.trim()) {
        newErrors.studentCount = "Please select estimated student count.";
      }

      if (!formData.preferredTime.trim()) {
        newErrors.preferredTime = "Please select a preferred walkthrough time.";
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
      } else if (isDemo && newErrors.phone) {
        phoneRef.current?.focus();
      } else if (isDemo && newErrors.schoolName) {
        schoolRef.current?.focus();
      } else if (isDemo && newErrors.city) {
        cityRef.current?.focus();
      } else if (isDemo && newErrors.studentCount) {
        studentCountRef.current?.focus();
      } else if (isDemo && newErrors.preferredTime) {
        preferredTimeRef.current?.focus();
      } else if (!isDemo && newErrors.topic) {
        topicRef.current?.focus();
      } else if (!isDemo && newErrors.message) {
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

  const prefix = isDemo ? "demo" : "contact";

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="mb-6 space-y-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text">
          {isDemo ? "Schedule a Product Demo" : "Send us a message"}
        </h2>
        <p className="text-sm text-text-muted">
          {isDemo ? (
            <>
              This demo request form is not connected yet, so submissions are not stored. To reach
              us directly,{" "}
              <Link
                href="/contact"
                prefetch={false}
                className="font-semibold text-brand underline hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                visit our contact page
              </Link>
              .
            </>
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
          )}
        </p>
      </div>

      {/* Honest notice shown before typing on Demo page */}
      {isDemo && !submittedNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="demo-pre-typing-notice"
          className="mb-6 rounded-xl border border-border bg-surface-subtle p-5 text-sm text-text"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p className="font-semibold text-text">Demo requests are not connected yet</p>
              <p className="text-text-muted leading-relaxed">
                This form is a preview of our planned demo booking workflow. Submissions are not
                sent or stored. To reach our team directly, you can{" "}
                <Link
                  href="/contact"
                  prefetch={false}
                  className="font-semibold text-brand underline hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  visit our contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submission Success Notice (Contact) */}
      {!isDemo && submittedNotice && (
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

      {/* Submission Success Notice (Demo) */}
      {isDemo && submittedNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="demo-submission-notice"
          className="mb-6 rounded-xl border border-border bg-surface-subtle p-5 text-sm text-text"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p className="font-semibold text-text">Demo request received (Preview)</p>
              <p className="text-text-muted leading-relaxed">
                Thank you for your interest in ProgressEye. This preview form is not connected to a
                live booking system yet, so no notification has been dispatched.
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
          <label htmlFor={`${prefix}-website`}>Leave this field blank</label>
          <input
            id={`${prefix}-website`}
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
            placeholder="e.g. Ramesh Sharma"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
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
            placeholder={isDemo ? "principal@school.edu.in" : "e.g. principal@school.edu.in"}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
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

        {/* Phone Field (Demo only) */}
        {isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="demo-phone" className="block text-sm font-medium text-text">
              Phone number <span className="text-brand">*</span>
            </label>
            <input
              ref={phoneRef}
              id="demo-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "demo-phone-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.phone ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            />
            {errors.phone && (
              <p id="demo-phone-error" role="alert" className="text-xs font-medium text-brand mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        )}

        {/* School Name */}
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
            ref={isDemo ? schoolRef : undefined}
            id={`${prefix}-school`}
            name="schoolName"
            type="text"
            required={isDemo}
            autoComplete="organization"
            placeholder="Your school name"
            value={formData.schoolName}
            onChange={handleChange}
            aria-invalid={!!errors.schoolName}
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

        {/* City (Demo only) */}
        {isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="demo-city" className="block text-sm font-medium text-text">
              City / State <span className="text-brand">*</span>
            </label>
            <input
              ref={cityRef}
              id="demo-city"
              name="city"
              type="text"
              required
              placeholder="e.g. Jaipur, Rajasthan"
              value={formData.city}
              onChange={handleChange}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "demo-city-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.city ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            />
            {errors.city && (
              <p id="demo-city-error" role="alert" className="text-xs font-medium text-brand mt-1">
                {errors.city}
              </p>
            )}
          </div>
        )}

        {/* Student Count (Demo only) */}
        {isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="demo-student-count" className="block text-sm font-medium text-text">
              Estimated Student Count <span className="text-brand">*</span>
            </label>
            <select
              ref={studentCountRef}
              id="demo-student-count"
              name="studentCount"
              required
              value={formData.studentCount}
              onChange={handleChange}
              aria-invalid={!!errors.studentCount}
              aria-describedby={errors.studentCount ? "demo-student-count-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.studentCount ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            >
              <option value="">Select student count...</option>
              {STUDENT_COUNT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.studentCount && (
              <p
                id="demo-student-count-error"
                role="alert"
                className="text-xs font-medium text-brand mt-1"
              >
                {errors.studentCount}
              </p>
            )}
          </div>
        )}

        {/* Preferred Time (Demo only) */}
        {isDemo && (
          <div className="space-y-1.5">
            <label htmlFor="demo-preferred-time" className="block text-sm font-medium text-text">
              Preferred Walkthrough Time <span className="text-brand">*</span>
            </label>
            <select
              ref={preferredTimeRef}
              id="demo-preferred-time"
              name="preferredTime"
              required
              value={formData.preferredTime}
              onChange={handleChange}
              aria-invalid={!!errors.preferredTime}
              aria-describedby={errors.preferredTime ? "demo-preferred-time-error" : undefined}
              className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                errors.preferredTime ? "border-brand" : "border-border hover:border-brand/40"
              }`}
            >
              <option value="">Select preferred time...</option>
              {PREFERRED_TIME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p
                id="demo-preferred-time-error"
                role="alert"
                className="text-xs font-medium text-brand mt-1"
              >
                {errors.preferredTime}
              </p>
            )}
          </div>
        )}

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
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-xs transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:w-auto"
          >
            <span>{isDemo ? "Request preview demo" : "Send message"}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}

export const InquiryForm = ContactForm;
