import { HeartHandshake, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import type * as React from "react";
import { aboutConfig } from "@/config/about";

const valueIcons: Record<string, React.ReactNode> = {
  transparency: <HeartHandshake className="h-5 w-5" aria-hidden="true" />,
  clarity: <Sparkles className="h-5 w-5" aria-hidden="true" />,
  reliability: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
  "child-safety": <UserCheck className="h-5 w-5" aria-hidden="true" />,
};

export function ValuesGrid() {
  return (
    <section aria-labelledby="values-heading" className="relative bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Core Principles
          </div>
          <h2
            id="values-heading"
            className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            Values We Build By
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-muted">
            Aspirational commitments that shape how we design interfaces, handle records, and
            support school communities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {aboutConfig.values.map((value) => (
            <div
              key={value.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-surface-raised p-6 sm:p-8"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    {valueIcons[value.id]}
                  </div>
                  <span className="rounded-md border border-border bg-surface-subtle px-2 py-0.5 text-[11px] font-medium text-text-muted">
                    {value.reviewStatus}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-text">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
