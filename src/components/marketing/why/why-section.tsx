import { Check, ShieldCheck, Smartphone, Sparkles, X, Zap } from "lucide-react";
import { whyRowsConfig } from "@/config/landing-claims";

export interface WhyRow {
  id: string;
  category: string;
  icon: typeof Zap;
  legacyText: string;
  progressEyeText: string;
}

const WHY_ROWS: WhyRow[] = [
  {
    id: "speed",
    category: "Performance on slow connections",
    icon: Zap,
    legacyText:
      "Heavy megabyte downloads, multi-second page freezes, and slow transitions on spotty mobile data.",
    progressEyeText:
      "Designed to stay quick on slow connections. Tiny initial payload, lean styling, and sub-second renders.",
  },
  {
    id: "privacy",
    category: "Student privacy & multitenancy",
    icon: ShieldCheck,
    legacyText:
      "Shared database tables, co-mingled student records, and complex cross-tenant query vulnerabilities.",
    progressEyeText:
      "Each school's data is kept separate by design. PostgreSQL Row-Level Security guarantees tenant boundary isolation.",
  },
  {
    id: "everywhere",
    category: "Device & operating system support",
    icon: Smartphone,
    legacyText:
      "Requires dedicated Windows desktop clients, local servers, or slow proprietary mobile wrappers.",
    progressEyeText:
      "Works in any modern browser on desktop, tablet and phone. Nothing to install, zero local hardware requirements.",
  },
  {
    id: "india",
    category: "Designed for Indian schools",
    icon: Sparkles,
    legacyText:
      "Western accounting defaults, million/billion numbering, foreign date formats, and rigid international structures.",
    progressEyeText:
      "Built around Indian schools: rupee and lakh/crore formatting. English now, Hindi planned. Tailored for CBSE and ICSE norms.",
  },
];

/**
 * Server Component: Why ProgressEye Comparison Section
 *
 * Communicates honest design goals and architectural contrast against legacy ERPs.
 * Every row is marked as a planned design goal (blocks public launch = Yes).
 */
export function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="py-16 sm:py-24 border-b border-[var(--color-border)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50">
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
            Most school software is either a 20-year-old desktop ERP or a generic foreign system
            with a rupee symbol added. We designed ProgressEye from scratch for modern Indian school
            operations.
          </p>

          {/* Honest architectural disclaimer banner */}
          <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full bg-[var(--color-brand)] shrink-0"
              aria-hidden="true"
            />
            <span>
              <strong>Design Goal Commitments</strong>: The comparisons below reflect our target
              engineering specifications and product roadmap. No unverified benchmark figures are
              asserted until production validation.
            </span>
          </div>
        </div>

        {/* Comparison Table for Desktop / Tablet */}
        <div className="hidden md:block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-e1)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">
              Comparison between Legacy School Software and ProgressEye design goals
            </caption>
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                <th scope="col" className="p-5 w-1/4">
                  Feature & Goal
                </th>
                <th scope="col" className="p-5 w-3/8 text-[var(--color-text-muted)]">
                  Legacy School Software
                </th>
                <th
                  scope="col"
                  className="p-5 w-3/8 text-blue-800 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/20 border-l border-[var(--color-border)]"
                >
                  <div className="flex items-center justify-between">
                    <span>ProgressEye</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                      Planned
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-sm">
              {WHY_ROWS.map((row) => {
                const IconComponent = row.icon;
                const claim = whyRowsConfig[row.id];

                return (
                  <tr
                    key={row.id}
                    className="hover:bg-[var(--color-surface-subtle)]/40 transition-colors"
                  >
                    {/* Goal category */}
                    <th
                      scope="row"
                      className="p-5 font-semibold text-[var(--color-text)] align-top"
                    >
                      <div className="flex items-start gap-2.5">
                        <IconComponent
                          className="w-4 h-4 text-[var(--color-brand)] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <div>{row.category}</div>
                          {claim && (
                            <span className="text-[10px] text-[var(--color-text-muted)] font-normal block mt-0.5">
                              Status: {claim.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </th>

                    {/* Legacy description */}
                    <td className="p-5 text-[var(--color-text-muted)] align-top">
                      <div className="flex items-start gap-2">
                        <X
                          className="w-4 h-4 text-red-500/70 dark:text-red-400/70 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{row.legacyText}</span>
                      </div>
                    </td>

                    {/* ProgressEye description */}
                    <td className="p-5 text-[var(--color-text)] align-top font-medium bg-blue-50/20 dark:bg-blue-950/10 border-l border-[var(--color-border)]">
                      <div className="flex items-start gap-2">
                        <Check
                          className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{row.progressEyeText}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Stacked Cards for Mobile Viewports (< 768px) */}
        <div className="md:hidden space-y-4">
          {WHY_ROWS.map((row) => {
            const IconComponent = row.icon;

            return (
              <div
                key={row.id}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4 shadow-[var(--shadow-e1)]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-text)]">
                    <IconComponent
                      className="w-4 h-4 text-[var(--color-brand)]"
                      aria-hidden="true"
                    />
                    <span>{row.category}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                    Planned
                  </span>
                </div>

                {/* Legacy vs ProgressEye mobile comparison */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-muted)]">
                      <X className="w-3.5 h-3.5 text-red-500/70" aria-hidden="true" />
                      <span>Legacy Systems</span>
                    </div>
                    <p className="text-[var(--color-text-muted)] leading-relaxed pl-5">
                      {row.legacyText}
                    </p>
                  </div>

                  <div className="p-3 rounded-[var(--radius-md)] bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/50 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-blue-800 dark:text-blue-300">
                      <Check className="w-3.5 h-3.5 text-[var(--color-brand)]" aria-hidden="true" />
                      <span>ProgressEye Goal</span>
                    </div>
                    <p className="text-[var(--color-text)] font-medium leading-relaxed pl-5">
                      {row.progressEyeText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
