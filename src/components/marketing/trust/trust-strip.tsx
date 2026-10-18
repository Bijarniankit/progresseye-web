import { siteConfig } from "@/config/site";

/**
 * Trust Strip Section
 *
 * Gated strictly behind siteConfig.hasCustomerLogos.
 * When false (default), zero DOM elements are emitted to avoid fictional
 * customer names, unverified crests, or fake metrics.
 */
export function TrustStrip() {
  if (!siteConfig.hasCustomerLogos) {
    return null;
  }

  return (
    <section
      aria-label="Customer trust"
      className="py-8 border-b border-[var(--color-border-muted)] bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)]">
          Trusted by educational institutions across India
        </p>
      </div>
    </section>
  );
}
