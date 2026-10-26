"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import * as React from "react";
import { TurnstileWidget } from "@/components/marketing/contact/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { ApiProblemError } from "@/lib/api/client";
import { publicControllerSubmitNewsletter } from "@/lib/api/generated/endpoints/public/public";

export interface FooterProps {
  hideNewsletter?: boolean;
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

export function Footer({ hideNewsletter: forcedHide }: FooterProps) {
  const tFooter = useTranslations("footer");
  const pathname = usePathname();

  // Hide newsletter on legal routes per user decisions
  const isLegalRoute =
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/cookies") ||
    pathname.startsWith("/gdpr");

  const hideNewsletter = forcedHide ?? isLegalRoute;

  const [email, setEmail] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [isTurnstileActive, setIsTurnstileActive] = React.useState(false);
  const idempotencyKeyRef = React.useRef(generateUuid());
  const [hasBackend] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("backend") === "true") return true;
    }
    return siteConfig.hasLeadBackend;
  });

  const isTurnstileRequired = hasBackend && !!siteConfig.turnstileSiteKey;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    // Honeypot check
    if (honeypot.trim().length > 0) {
      if (!hasBackend) {
        setSubmitted(true);
      }
      return;
    }

    if (!hasBackend) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await publicControllerSubmitNewsletter(
        {
          email: email.trim().toLowerCase(),
          consentGiven: true,
          website_url: honeypot.trim() || undefined,
          turnstileToken: turnstileToken || undefined,
        },
        {
          headers: {
            "Idempotency-Key": idempotencyKeyRef.current,
          },
        },
      );
      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof ApiProblemError) {
        if (err.problem.code === "SPAM_VERIFICATION_FAILED") {
          setError("Verification failed. Please complete the security check and try again.");
        } else if (err.status === 409) {
          setError("A request is already in progress. Please wait a moment and try again.");
        } else if (err.status === 400 && err.problem.invalidParams) {
          const emailErr = err.problem.invalidParams.find((p) => p.name === "email");
          if (emailErr?.reason) {
            setError(emailErr.reason);
          } else {
            setError(err.message || "Please enter a valid email address.");
          }
        } else if (err.status === 422) {
          idempotencyKeyRef.current = generateUuid();
          setError("Subscription session expired. Please review your details and submit again.");
        } else if (err.status === 429) {
          const seconds = err.retryAfter;
          if (seconds && seconds > 0) {
            setError(`Too many requests. Please try again in ${Math.ceil(seconds / 60)} minutes.`);
          } else {
            setError("Too many requests. Please try again in a few minutes.");
          }
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[var(--color-surface-footer)] text-[var(--color-text)] pt-16 pb-12 border-t border-[var(--color-border)]">
      {/* Ambient Pastel Washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-176 h-176 rounded-full blur-3xl bg-[var(--color-wash-peach)] opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-160 h-160 rounded-full blur-3xl bg-[var(--color-wash-mint)] opacity-35"
      />

      {/* 28px Dot Pattern at 0.06 Opacity */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-footer-dots" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Brand Identity & Newsletter */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-[var(--radius-md)]"
              >
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-surface-contrast)] relative flex items-center justify-center">
                  <span className="font-display font-extrabold text-[var(--color-surface)] text-base">
                    P
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] ring-2 ring-[var(--color-surface)] absolute -bottom-0.5 -right-0.5" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-[var(--color-text)]">
                  {siteConfig.shortName}
                </span>
              </Link>

              <div className="font-display text-[var(--text-h4)] font-bold tracking-tight text-[var(--color-text)]">
                {tFooter("taglinePrimary")}{" "}
                <span className="italic font-medium text-[var(--color-terracotta)]">
                  {tFooter("taglineSecondary")}
                </span>
              </div>

              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-md">
                {tFooter("description")}
              </p>
            </div>

            {/* Newsletter Subscription Block (Hidden on legal routes) */}
            {!hideNewsletter && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold tracking-wider uppercase text-[var(--color-terracotta)]">
                  {tFooter("newsletterEyebrow")}
                </div>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="max-w-md flex flex-col sm:flex-row gap-2"
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                      height: 0,
                      width: 0,
                    }}
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      {tFooter("newsletterPlaceholder")}
                    </label>
                    <Input
                      id="footer-newsletter-email"
                      type="email"
                      value={email}
                      onFocus={() => {
                        if (hasBackend && siteConfig.turnstileSiteKey) {
                          setIsTurnstileActive(true);
                        }
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        idempotencyKeyRef.current = generateUuid();
                        if (error) setError("");
                      }}
                      placeholder={tFooter("newsletterPlaceholder")}
                      className="rounded-full bg-[var(--color-surface)]/80 backdrop-blur-sm border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] transition-shadow"
                      aria-label={tFooter("newsletterPlaceholder")}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isSubmitting || (isTurnstileRequired && !turnstileToken)}
                    className="rounded-full px-5 py-2 font-medium shrink-0 flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
                  >
                    <span>{isSubmitting ? "..." : tFooter("newsletterButton")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                {isTurnstileActive && hasBackend && siteConfig.turnstileSiteKey && (
                  <div className="pt-2">
                    <TurnstileWidget
                      onVerify={(token) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => setTurnstileToken("")}
                      hasBackend={hasBackend}
                    />
                  </div>
                )}

                {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}

                {submitted &&
                  (hasBackend ? (
                    <output className="block text-xs font-medium text-[var(--color-brand)] bg-[var(--color-surface-subtle)] p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                      Subscribed! Thank you for staying updated.
                    </output>
                  ) : (
                    <p className="text-xs font-medium text-[var(--color-brand)] bg-[var(--color-surface-subtle)] p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                      {tFooter("newsletterNotice")}
                    </p>
                  ))}

                <p className="text-xs text-[var(--color-text-subtle)] leading-normal pt-1">
                  {tFooter("newsletterPrivacy")}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Columns (Product, Company, Legal) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-text)]">
                {tFooter("productColumn")}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {siteConfig.footerLinks.product.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-[var(--radius-sm)]"
                    >
                      {tFooter(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-text)]">
                {tFooter("companyColumn")}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {siteConfig.footerLinks.company.map((item) => (
                  <li key={item.href} className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-[var(--radius-sm)]"
                    >
                      {tFooter(item.labelKey)}
                    </Link>
                    {item.badgeKey && siteConfig.hasOpenRoles && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                        {tFooter(item.badgeKey)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-text)]">
                {tFooter("legalColumn")}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {siteConfig.footerLinks.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-[var(--radius-sm)]"
                    >
                      {tFooter(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Accessible Social Links */}
        <div
          className={`pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center ${
            siteConfig.hasConfiguredSocial ? "justify-between" : "justify-center text-center"
          } gap-4 text-xs text-[var(--color-text-muted)]`}
        >
          <div>{tFooter("copyright", { year: currentYear })}</div>

          {siteConfig.hasConfiguredSocial && (
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ProgressEye on X (formerly Twitter)"
                className="p-1 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with ProgressEye on LinkedIn"
                className="p-1 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View ProgressEye on GitHub"
                className="p-1 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Oversized Non-Colliding Watermark (Title Case "ProgressEye", aria-hidden, full descenders) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-display font-extrabold leading-normal text-[clamp(1.75rem,8.2vw,14rem)] opacity-[0.06] text-[var(--color-text)] tracking-tight whitespace-nowrap pt-8 pb-6 px-4"
      >
        ProgressEye
      </div>
    </footer>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
