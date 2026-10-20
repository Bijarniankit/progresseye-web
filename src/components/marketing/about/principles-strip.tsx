import { CheckCircle2 } from "lucide-react";
import { aboutConfig } from "@/config/about";

export function PrinciplesStrip() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="relative border-y border-border bg-surface-subtle py-12 md:py-16"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="principles-heading"
            className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl"
          >
            How We Approach School Software
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-text-muted">
            Non-negotiable product standards for everything we design and deliver.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutConfig.principles.map((principle, index) => (
            <div
              key={principle.id}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5 shadow-2xs"
            >
              <div className="mt-0.5 shrink-0 text-brand">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  0{index + 1}
                </span>
                <p className="mt-1 text-sm font-medium text-text">{principle.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
