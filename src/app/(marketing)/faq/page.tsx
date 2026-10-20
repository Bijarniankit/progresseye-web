import { ArrowRight, ChevronDown, HelpCircle, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { type FaqItem, landingFaqs } from "@/config/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Clear answers to everyday questions about ProgressEye school management software, privacy, and roadmap.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | ProgressEye",
    description:
      "Clear answers to everyday questions about ProgressEye school management software, privacy, and roadmap.",
    url: "/faq",
  },
};

const categoryLabels: Record<FaqItem["category"], string> = {
  payments: "Fee Collection & Payments",
  academics: "Academics & Report Cards",
  privacy: "Privacy & Data Protection",
  platform: "Platform & Device Access",
  onboarding: "Roster Migration & Onboarding",
  training: "Training & Rollout Support",
};

export default function FaqPage() {
  // Extract only categories that have content
  const activeCategories = Array.from(new Set(landingFaqs.map((faq) => faq.category))).filter(
    (cat) => landingFaqs.some((faq) => faq.category === cat),
  );

  return (
    <div className="flex flex-col">
      {/* 1. FAQ Hero */}
      <section
        aria-labelledby="faq-page-title"
        className="relative overflow-hidden bg-surface py-16 md:py-20 lg:py-24 border-b border-border"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <HelpCircle className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span>Help & Reference</span>
          </div>

          <h1
            id="faq-page-title"
            className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-5xl"
          >
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
            Clear answers about our planned roadmap, data handling, and school administration
            workflows.
          </p>
        </div>
      </section>

      {/* 2. Categorized Accordions (Native <details>) */}
      <section
        aria-labelledby="faq-categories-title"
        className="relative bg-surface py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="faq-categories-title" className="sr-only">
            Question Categories
          </h2>

          <div className="space-y-12">
            {activeCategories.map((category) => {
              const categoryFaqs = landingFaqs.filter((faq) => faq.category === category);

              return (
                <div key={category} className="space-y-4">
                  <h3 className="font-display text-xl font-bold tracking-tight text-text border-b border-border-muted pb-2">
                    {categoryLabels[category]}
                  </h3>

                  <div className="space-y-3">
                    {categoryFaqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group rounded-xl border border-border bg-surface shadow-xs transition-colors hover:border-brand/40 overflow-hidden"
                      >
                        <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer select-none font-display font-semibold text-base sm:text-lg text-text list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
                          <span>{faq.question}</span>
                          <ChevronDown
                            className="h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>

                        <div className="px-5 pb-5 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border-muted pt-4 space-y-3">
                          <p>{faq.answer}</p>
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-subtle text-text-muted border border-border">
                              Planned Feature
                            </span>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Still Have Questions CTA */}
      <section
        aria-labelledby="faq-cta-heading"
        className="relative border-t border-border bg-surface-subtle py-12 md:py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-xl space-y-3">
            <h2
              id="faq-cta-heading"
              className="font-display text-2xl font-bold tracking-tight text-text"
            >
              Still have questions?
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              We are building ProgressEye step by step. If you have a specific question about your
              school or roadmap needs, we would be happy to discuss it.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-xs transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:w-auto"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Contact our team</span>
            </Link>

            <Link
              href="/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text shadow-2xs transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:w-auto"
            >
              <span>Book a walkthrough</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
