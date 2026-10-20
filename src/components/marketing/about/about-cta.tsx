import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function AboutCta() {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-contrast)] p-8 text-center text-[var(--color-text-inverse)] shadow-[var(--shadow-e3)] sm:p-12 lg:p-16 dark:border-[var(--color-brand)]/50 dark:bg-[var(--color-surface-card)] dark:text-[var(--color-text)] dark:shadow-[0_0_50px_-12px_color-mix(in_srgb,var(--color-brand)_25%,transparent)]">
          {/* Pure CSS Radial Atmosphere */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-brand)_0%,_transparent_65%)] opacity-25 dark:opacity-20"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <h2
              id="about-cta-heading"
              className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl dark:text-[var(--color-text)]"
            >
              See how we think about school software.
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/80 sm:text-base dark:text-[var(--color-text-muted)]">
              We are building ProgressEye with direct input from educators and administrators. Join
              us on our journey to calmer school days.
            </p>
          </div>

          <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3.5 text-sm font-semibold text-[var(--color-brand-foreground)] shadow-[var(--shadow-e2)] transition-colors hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] sm:w-auto"
            >
              <span>Book a demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/features"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] sm:w-auto dark:border-[var(--color-brand)]/40 dark:text-[var(--color-text)] dark:hover:bg-[var(--color-surface-subtle)]"
            >
              <span>Explore planned features</span>
            </Link>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70 sm:text-sm dark:text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>Designed for Indian schools</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>Gated, verified data only</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
              <span>Zero sales pressure</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
