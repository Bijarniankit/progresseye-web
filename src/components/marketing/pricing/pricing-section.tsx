import { PricingCards } from "./pricing-cards";

/**
 * Server Component: Pricing Section Shell
 *
 * Hosts static marketing copy, launch notice metadata, and embeds the lean
 * PricingCards client island for billing cycle toggling.
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="content-visibility-auto scroll-mt-20 lg:scroll-mt-24 py-16 sm:py-24 border-b border-[var(--color-border)] relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)]">
            <span>Transparent Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Roadmap</span>
          </div>

          <h2
            id="pricing-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[var(--color-text)]"
          >
            Simple, transparent pricing.
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            Every plan includes essential daily school operations. Scale up as your school grows.
          </p>

          {/* Placeholder disclaimer banner */}
          <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] inline-flex items-center gap-2.5 text-left max-w-2xl mx-auto">
            <span
              className="w-2 h-2 rounded-full bg-[var(--color-brand)] shrink-0"
              aria-hidden="true"
            />
            <span>
              <strong>Launch Notice</strong>: Displayed pricing figures are indicative launch plans.
              Commercial contracts and GST tax registration will be finalized prior to public
              general availability.
            </span>
          </div>
        </div>

        {/* Pricing Cards & Toggle Island */}
        <PricingCards />
      </div>
    </section>
  );
}
