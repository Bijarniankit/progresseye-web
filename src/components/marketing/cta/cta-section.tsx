import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

/**
 * Server Component: Final CTA Section
 *
 * Implements Option B (pure CSS radial atmosphere).
 * In light mode: renders as a contrast dark card (bg-surface-contrast).
 * In dark mode: renders as a contrast light card (bg-surface-contrast in dark mode is light slate).
 */
export function FinalCtaSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="content-visibility-auto scroll-mt-20 lg:scroll-mt-24 py-16 sm:py-24 relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[var(--radius-xl)] bg-[var(--color-surface-contrast)] text-[var(--color-text-inverse)] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[var(--shadow-e3)] border border-[var(--color-border)] text-center space-y-8">
          {/* Pure CSS Radial Atmosphere (Option B) */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--color-brand)_0%,_transparent_65%)] opacity-25 dark:opacity-15"
            aria-hidden="true"
          />

          {/* Planned Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface)]/20 text-[var(--color-text-inverse)] border border-[var(--color-border)]/30">
            <span>Early Access Program</span>
            <span aria-hidden="true">·</span>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
              Planned
            </span>
          </div>

          {/* Heading & Copy */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-display tracking-tight text-[var(--color-text-inverse)]"
            >
              Ready to bring calm to your school administration?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-inverse)]/80 leading-relaxed max-w-2xl mx-auto">
              Join forward-looking school leaders on our preview rollout. Experience attendance,
              fees, and communication built specifically for Indian school operations.
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
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base border border-[var(--color-border)] text-[var(--color-text-inverse)] hover:bg-[var(--color-surface)]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              Get started free
            </Link>
          </div>

          {/* Perks Row with Planned Scope */}
          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[var(--color-text-inverse)]/70">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>Free Starter tier forever</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>Designed for Indian schools</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>No credit card required</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
