import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

/**
 * Server Component: Final CTA Section
 *
 * Implements Option B (pure CSS radial atmosphere).
 * In light mode: renders as a deep navy card (bg-surface-contrast).
 * In dark mode: renders as a dark card with illuminated border and soft glow (dark:bg-surface-card).
 */
export function FinalCtaSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="content-visibility-auto scroll-mt-20 lg:scroll-mt-24 py-16 sm:py-24 relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[var(--radius-xl)] bg-[var(--color-surface-contrast)] text-[var(--color-text-inverse)] dark:bg-[var(--color-surface-card)] dark:text-[var(--color-text)] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[var(--shadow-e3)] border border-[var(--color-border)] dark:border-[var(--color-brand)]/50 dark:shadow-[0_0_50px_-12px_rgba(96,165,250,0.25)] text-center space-y-8">
          {/* Pure CSS Radial Atmosphere (Option B) */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--color-brand)_0%,_transparent_65%)] opacity-25 dark:opacity-20"
            aria-hidden="true"
          />

          {/* Heading & Copy */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-display tracking-tight text-white dark:text-[var(--color-text)]"
            >
              Ready to bring calm to your school administration?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 dark:text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
              Book a free demo to see what we are building.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] transition-colors shadow-[var(--shadow-e2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              <span>Book a free demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/get-started"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base border border-white/20 dark:border-[var(--color-border)] text-white dark:text-[var(--color-text)] hover:bg-white/10 dark:hover:bg-[var(--color-surface-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              Get started free
            </Link>
          </div>

          {/* Perks Row with Planned Scope */}
          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-white/70 dark:text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>Designed for Indian schools</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
              {/* TODO-REAL-DATA: Planned commercial terms. Blocks public launch. */}
              <span>No credit card required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
              {/* TODO-REAL-DATA: Planned commercial terms. Blocks public launch. */}
              <span>Cancel anytime</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
