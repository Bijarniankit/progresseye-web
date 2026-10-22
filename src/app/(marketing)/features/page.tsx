import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FeaturesList } from "@/components/marketing/features/features-list";
import { Button } from "@/components/ui/button";
import { featuresConfig } from "@/config/features";

export const metadata: Metadata = {
  title: "Planned Features — ProgressEye",
  description:
    "Planned capabilities under development for school operations: attendance tracking, fee collection, academic scheduling, and communications.",
};

export default function FeaturesPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)] border border-[var(--color-badge-info-border)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
          <span>Product Roadmap Overview</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.15] break-words">
          {featuresConfig.headline}
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
          {featuresConfig.subheadline}
        </p>
      </div>

      {/* Honest Architectural Disclaimer Banner */}
      <section
        aria-label="Planned status notice"
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 sm:p-6 text-sm text-[var(--color-text-muted)] leading-relaxed"
      >
        <p>
          <strong className="font-semibold text-[var(--color-text)]">Architectural Notice:</strong>{" "}
          {featuresConfig.disclaimer}
        </p>
      </section>

      {/* Structured Modules Grid */}
      <section aria-label="Planned school modules">
        <FeaturesList />
      </section>

      {/* Roadmap & Inquiries CTA Strip */}
      <section
        aria-label="Demonstration and contact inquiries"
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 sm:p-12 shadow-xs text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text)]">
            Interested in learning more about our roadmap?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We are building ProgressEye step by step. Book a preview demo to see our design approach
            or contact our team directly.
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
