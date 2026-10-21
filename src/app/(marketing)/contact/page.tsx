import {
  ArrowRight,
  Calendar,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactFormIsland } from "@/components/marketing/contact/contact-form-island";
import { contactConfig } from "@/config/contact";
import { landingFaqs } from "@/config/faq";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the ProgressEye team for school onboarding inquiries, roadmap questions, and guided product walkthroughs.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | ProgressEye",
    description:
      "Reach the ProgressEye team for school onboarding inquiries, roadmap questions, and guided product walkthroughs.",
    url: "/contact",
  },
};

export default function ContactPage() {
  // Check if any direct channels are configured
  const hasChannels =
    contactConfig.hasConfiguredEmail ||
    contactConfig.hasConfiguredPhone ||
    contactConfig.hasConfiguredOffice ||
    contactConfig.hasConfiguredResponseTime;

  // Select 3 representative questions for bottom FAQ teaser
  const teaserFaqIds = ["onboarding-timeline", "privacy-dpdp", "platform-install"];
  const teaserFaqs = landingFaqs.filter((faq) => teaserFaqIds.includes(faq.id));

  return (
    <div className="flex flex-col">
      {/* 1. Contact Hero */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative overflow-hidden bg-surface py-16 md:py-20 lg:py-24 border-b border-border"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <MessageSquare className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span>Connect with ProgressEye</span>
          </div>

          <h1
            id="contact-hero-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-5xl"
          >
            Get in Touch with our Team
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
            Have questions about school onboarding, our roadmap, or data protection? We are here to
            discuss your institution&apos;s requirements.
          </p>
        </div>
      </section>

      {/* 2. Split Layout: Channels / Walkthrough Alternative + Contact Form */}
      <section
        aria-labelledby="contact-section-heading"
        className="relative bg-surface py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="contact-section-heading" className="sr-only">
            Contact Options & Inquiry Form
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Context Card & Walkthrough Option */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>Guided Walkthrough</span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-text">
                    Experience ProgressEye first-hand
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    We are currently onboarding institutions via guided orientation walkthroughs.
                    Book a walkthrough to explore the platform with our team.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/demo"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text shadow-2xs transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    <span>Book a free demo</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="border-t border-border pt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-text-muted">
                    <ShieldCheck className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
                    <span>Zero sales pressure & no credit card required</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-text-muted">
                    <Sparkles className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
                    <span>Designed for Indian school workflows</span>
                  </div>
                </div>
              </div>

              {/* If any channels are configured, render them */}
              {hasChannels && (
                <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-4">
                  <h3 className="font-display text-lg font-bold text-text">Direct Channels</h3>
                  <div className="space-y-3 text-sm">
                    {contactConfig.hasConfiguredEmail && contactConfig.email && (
                      <div>
                        <span className="block text-xs font-semibold uppercase text-text-muted">
                          Email
                        </span>
                        <a
                          href={`mailto:${contactConfig.email}`}
                          className="font-medium text-brand hover:underline"
                        >
                          {contactConfig.email}
                        </a>
                      </div>
                    )}
                    {contactConfig.hasConfiguredPhone && contactConfig.phone && (
                      <div>
                        <span className="block text-xs font-semibold uppercase text-text-muted">
                          Phone
                        </span>
                        <span className="font-medium text-text">{contactConfig.phone}</span>
                      </div>
                    )}
                    {contactConfig.hasConfiguredOffice && contactConfig.office && (
                      <div>
                        <span className="block text-xs font-semibold uppercase text-text-muted">
                          Office Address
                        </span>
                        <span className="text-text-muted">{contactConfig.office}</span>
                      </div>
                    )}
                    {contactConfig.hasConfiguredResponseTime && contactConfig.responseTime && (
                      <div>
                        <span className="block text-xs font-semibold uppercase text-text-muted">
                          Expected Response
                        </span>
                        <span className="text-text-muted">{contactConfig.responseTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contact Form Island */}
            <div className="lg:col-span-7">
              <ContactFormIsland />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom FAQ Teaser */}
      <section
        aria-labelledby="contact-faq-heading"
        className="relative border-t border-border bg-surface-subtle py-16 md:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
              <HelpCircle className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              <span>Quick Answers</span>
            </div>
            <h2
              id="contact-faq-heading"
              className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Common questions about onboarding, data handling, and device access.
            </p>
          </div>

          <div className="space-y-4">
            {teaserFaqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-xl border border-border bg-surface p-5 shadow-xs transition-colors hover:border-brand/40"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer select-none font-display font-semibold text-base text-text list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
                  <span>{faq.question}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm text-text-muted leading-relaxed border-t border-border-muted pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <span>View all frequently asked questions</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
