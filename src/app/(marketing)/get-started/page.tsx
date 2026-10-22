import { ArrowRight, HelpCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PricingMatrix } from "@/components/marketing/get-started/pricing-matrix";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Get Started — Simple, Transparent School Pricing",
  description:
    "Explore planned commercial tiers for ProgressEye school workspaces: Starter, School, and District editions.",
};

const commonQuestions = [
  {
    q: "Is ProgressEye available for purchase today?",
    a: "ProgressEye is currently in active development. We are onboarding early partner schools in phases. You can book a preview demo to see our design approach and follow our progress.",
  },
  {
    q: "Are the displayed prices final?",
    a: "The rates shown are planned commercial targets under review. Final subscription terms and institutional discount frameworks will be confirmed before public launch.",
  },
  {
    q: "How does school roster onboarding work?",
    a: "We are developing structured spreadsheet import tools and assisted onboarding workflows to help administrators migrate student and staff records cleanly.",
  },
  {
    q: "What payment methods are planned for fees?",
    a: "We are designing fee collection workflows prioritizing UPI, net banking, and debit card receipts with clear transaction records for bursars and parents.",
  },
];

export default function GetStartedPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)] border border-[var(--color-badge-info-border)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
          <span>Planned Pricing Matrix</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.15] break-words">
          Simple, Transparent School Pricing
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
          Choose the plan that fits your institution. Every tier is designed with honest limits and
          straightforward terms.
        </p>
      </div>

      {/* Planned Commercial Disclaimer */}
      <section
        aria-label="Planned commercial status notice"
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 sm:p-6 text-sm text-[var(--color-text-muted)] leading-relaxed"
      >
        <p>
          <strong className="font-semibold text-[var(--color-text)]">Notice:</strong> All pricing
          structures, student tier caps, and included capabilities listed below represent planned
          commercial targets under business model review. No credit card is required to explore our
          product direction.
        </p>
      </section>

      {/* Main Pricing Matrix */}
      <section aria-label="Commercial plan comparison">
        <PricingMatrix />
      </section>

      {/* Onboarding FAQ Section */}
      <section aria-label="Frequently asked questions about plans" className="pt-6 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-[var(--color-text)]">
            Common Questions About Plans
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Clear, honest answers about our product rollout and commercial model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {commonQuestions.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 space-y-2 shadow-xs"
            >
              <div className="flex items-start gap-2.5">
                <HelpCircle className="h-5 w-5 text-[var(--color-brand)] shrink-0 mt-0.5" />
                <h3 className="text-base font-semibold text-[var(--color-text)]">{item.q}</h3>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed pl-7.5">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section
        aria-label="Contact and demo inquiry"
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 sm:p-12 shadow-xs text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text)]">
            Have questions about pricing or multi-campus scale?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We are glad to talk through your school&apos;s operational needs or schedule a live
            preview walkthrough.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
          <Button asChild size="lg" className="rounded-full gap-2 w-full sm:w-auto">
            <Link href="/demo">
              <span>Book a preview demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
            <Link href="/contact">
              <span>Contact our team</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
