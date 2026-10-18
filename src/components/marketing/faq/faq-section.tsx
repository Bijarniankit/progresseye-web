import { ChevronDown } from "lucide-react";
import { landingFaqs } from "@/config/faq";

/**
 * Server Component: FAQ Section with Native <details> Accordion
 *
 * Utilizes native browser <details> and <summary> semantics for complete keyboard
 * operability and zero-JavaScript accordion expansion.
 */
export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="content-visibility-auto scroll-mt-20 lg:scroll-mt-24 py-16 sm:py-24 border-b border-[var(--color-border)] relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)]">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
              Planned
            </span>
          </div>

          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[var(--color-text)]"
          >
            Clear answers to everyday questions.
          </h2>

          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            Everything you need to know about our roadmap, student data privacy, and planned rollout
            schedule.
          </p>
        </div>

        {/* Native <details> Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {landingFaqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-e1)] overflow-hidden transition-colors hover:border-[var(--color-brand)]/40"
            >
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none font-display font-semibold text-base sm:text-lg text-[var(--color-text)] bg-[var(--color-surface)] list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]">
                <span>{faq.question}</span>
                <ChevronDown
                  className="w-5 h-5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border-muted)] pt-4 space-y-3">
                <p>{faq.answer}</p>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                    Planned Feature
                  </span>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
