import { ShieldCheck, Smartphone, Sparkles, Zap } from "lucide-react";
import { whyRowsConfig } from "@/config/landing-claims";

export interface WhyRow {
  id: string;
  name: string;
  category: string;
  icon: typeof Zap;
  text: string;
}

const WHY_ROWS: WhyRow[] = [
  {
    id: "speed",
    name: "Speed",
    category: "Performance on slow connections",
    icon: Zap,
    text: "Designed to stay quick on slow connections.",
  },
  {
    id: "privacy",
    name: "Privacy",
    category: "Student privacy & multitenancy",
    icon: ShieldCheck,
    text: "Each school's data is kept separate by design.",
  },
  {
    id: "everywhere",
    name: "Everywhere",
    category: "Device & operating system support",
    icon: Smartphone,
    text: "Works in any modern browser on desktop, tablet and phone. Nothing to install.",
  },
  {
    id: "india",
    name: "India",
    category: "Designed for Indian schools",
    icon: Sparkles,
    text: "Built around Indian schools: rupee and lakh/crore formatting. English now, Hindi planned.",
  },
];

/**
 * Server Component: Why ProgressEye Architectural Goals
 *
 * Renders the 4 approved architectural design goals without competitor claims.
 * Every item is flagged as a planned roadmap target (blocks public launch = Yes).
 */
export function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="content-visibility-auto scroll-mt-20 lg:scroll-mt-24 py-16 sm:py-24 border-b border-[var(--color-border)] relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)]">
            <span>Why ProgressEye</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Goals</span>
          </div>

          <h2
            id="why-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[var(--color-text)]"
          >
            Calm by design. Built specifically for Indian schools.
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            We designed ProgressEye from scratch around the daily operations of Indian schools.
          </p>

          {/* Honest architectural disclaimer banner */}
          <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full bg-[var(--color-brand)] shrink-0"
              aria-hidden="true"
            />
            <span>
              <strong>Design Goal Commitments</strong>: Design goals, not measured results. Target
              specifications and architectural roadmap. Verified metrics will be measured against
              production workloads upon rollout.
            </span>
          </div>
        </div>

        {/* 4 Approved One-Liner Cards (Desktop & Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_ROWS.map((row) => {
            const IconComponent = row.icon;
            const claim = whyRowsConfig[row.id];

            return (
              <div
                key={row.id}
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-[var(--shadow-e1)] hover:border-[var(--color-brand)]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] flex items-center justify-center text-[var(--color-brand)]">
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-[var(--color-text)]">
                          {row.name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                          {row.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                      {claim?.status ?? "Planned"}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--color-text)] font-normal leading-relaxed pt-2">
                    {row.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
