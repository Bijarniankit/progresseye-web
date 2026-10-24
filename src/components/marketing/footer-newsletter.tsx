"use client";

import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

export interface FooterNewsletterProps {
  eyebrow: string;
  placeholder: string;
  buttonText: string;
  notice: string;
  privacy: string;
}

export function FooterNewsletter({
  eyebrow,
  placeholder,
  buttonText,
  notice,
  privacy,
}: FooterNewsletterProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasBackend] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("backend") === "true") return true;
    }
    return siteConfig.hasLeadBackend;
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    if (!hasBackend) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const { publicControllerSubmitNewsletter } = await import(
        "@/lib/api/generated/endpoints/public/public"
      );
      await publicControllerSubmitNewsletter({
        email: email.trim().toLowerCase(),
        consentGiven: true,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const { ApiProblemError } = await import("@/lib/api/client");
      if (err instanceof ApiProblemError) {
        if (err.status === 429) {
          setError("Too many requests. Please try again later.");
        } else if (err.status === 400) {
          setError("Please enter a valid email address.");
        } else {
          setError("Unable to subscribe. Please try again later.");
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2 pt-2">
      <div className="text-xs font-semibold tracking-wider uppercase text-[var(--color-terracotta)]">
        {eyebrow}
      </div>
      <form onSubmit={handleNewsletterSubmit} className="max-w-md flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <label htmlFor="footer-newsletter-email" className="sr-only">
            {placeholder}
          </label>
          <Input
            id="footer-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="rounded-full bg-[var(--color-surface)]/80 backdrop-blur-sm border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] font-semibold px-5 text-sm gap-2 disabled:opacity-60"
        >
          <span>{isSubmitting ? "..." : buttonText}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}

      {submitted && (
        <output className="block text-xs font-medium text-[var(--color-brand)] bg-[var(--color-surface-subtle)] p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)]">
          {hasBackend ? "Subscribed! Thank you for staying updated." : notice}
        </output>
      )}

      <p className="text-xs text-[var(--color-text-muted)]">{privacy}</p>
    </div>
  );
}
