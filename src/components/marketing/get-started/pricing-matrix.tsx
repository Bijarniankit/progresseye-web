import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ANNUAL_SAVINGS_PERCENT, PRICING_TIERS, type PricingTier } from "@/config/pricing";

export function PricingMatrix() {
  const tiers: PricingTier[] = [
    PRICING_TIERS.starter,
    PRICING_TIERS.school,
    PRICING_TIERS.district,
  ];

  return (
    <div className="space-y-8">
      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => {
          const isHighlighted = tier.isPopular;

          return (
            <div
              key={tier.id}
              data-testid={`pricing-tier-${tier.id}`}
              className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                isHighlighted
                  ? "bg-[var(--color-surface-card)] border-[var(--color-brand)] shadow-[var(--shadow-e2)] ring-1 ring-[var(--color-brand)]"
                  : "bg-[var(--color-surface-card)] border-[var(--color-border)] shadow-xs"
              }`}
            >
              {/* Most Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[var(--color-brand)] text-[var(--color-surface)] shadow-xs">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold text-[var(--color-text)]">
                      {tier.name}
                    </h2>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)] border border-[var(--color-badge-info-border)]">
                      Planned
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] min-h-[40px] leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-[var(--color-border)]/60 space-y-1">
                  {tier.customPriceLabel ? (
                    <div className="text-3xl font-display font-extrabold text-[var(--color-text)]">
                      {tier.customPriceLabel}
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-display font-extrabold text-[var(--color-text)]">
                        ₹{tier.annualPricePerStudent}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {tier.billingPeriodLabel}
                      </span>
                    </div>
                  )}

                  {tier.id === "school" && (
                    <p className="text-xs text-[var(--color-brand)] font-semibold pt-1">
                      Save {ANNUAL_SAVINGS_PERCENT}% when billed annually (₹
                      {tier.monthlyPricePerStudent}/mo monthly)
                    </p>
                  )}

                  {tier.studentLimit && (
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Up to {tier.studentLimit} students (Planned limit)
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block">
                    Planned Inclusions
                  </span>
                  <ul className="space-y-3">
                    {tier.features.map((feat) => (
                      <li
                        key={feat.text}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text-muted)]"
                      >
                        <Check className="h-4 w-4 text-[var(--color-brand)] mt-0.5 shrink-0" />
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t border-[var(--color-border)]/60">
                <Button
                  asChild
                  variant={isHighlighted ? "default" : "outline"}
                  size="lg"
                  className="w-full rounded-full gap-2"
                >
                  <Link href={tier.ctaHref}>
                    <span>{tier.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
