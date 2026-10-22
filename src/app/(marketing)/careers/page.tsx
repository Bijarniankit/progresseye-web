import { ArrowRight, Briefcase } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { careersConfig } from "@/config/careers";

export const metadata: Metadata = {
  title: "Careers — ProgressEye",
  description:
    "Explore career opportunities and learn about our engineering culture at ProgressEye.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | ProgressEye",
    description:
      "Explore career opportunities and learn about our engineering culture at ProgressEye.",
    url: "/careers",
  },
};

export default function CareersPage() {
  const { hasOpenRoles, openRoles, emptyState } = careersConfig;

  return (
    <div className="flex flex-col">
      {/* 1. Careers Hero */}
      <section
        aria-labelledby="careers-hero-heading"
        className="relative overflow-hidden bg-surface py-16 md:py-20 lg:py-24 border-b border-border"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Briefcase className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span>Working at ProgressEye</span>
          </div>

          <h1
            id="careers-hero-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-5xl"
          >
            {careersConfig.headline}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
            {careersConfig.subheadline}
          </p>
        </div>
      </section>

      {/* 2. Open Roles or Honest Zero-Vacancy State */}
      <section
        aria-labelledby="roles-section-heading"
        className="relative bg-surface py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="roles-section-heading" className="sr-only">
            Current Openings
          </h2>

          {hasOpenRoles && openRoles.length > 0 ? (
            <div className="space-y-4">
              {openRoles.map((role) => (
                <div
                  key={role.id}
                  className="rounded-2xl border border-border bg-surface-card p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-text">{role.title}</h3>
                    <p className="text-sm text-text-muted">
                      {role.department} · {role.location} · {role.type}
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed pt-1">
                      {role.description}
                    </p>
                  </div>
                  <Button asChild size="sm" className="rounded-full shrink-0">
                    <Link href={`/careers/${role.id}`}>
                      <span>View details</span>
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            /* Honest Zero-Vacancy Empty State (Decision D-036) */
            <div
              data-testid="careers-empty-state"
              className="rounded-3xl border border-border bg-surface-card p-8 sm:p-12 text-center shadow-xs space-y-6 max-w-2xl mx-auto"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-subtle border border-border text-brand">
                <Briefcase className="h-6 w-6" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold tracking-tight text-text">
                  {emptyState.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-md mx-auto">
                  {emptyState.message}
                </p>
              </div>

              <div className="pt-2 border-t border-border/80">
                <p className="text-xs text-text-muted mb-4">{emptyState.contactPrompt}</p>
                <Button asChild variant="outline" className="rounded-full gap-2">
                  <Link href={emptyState.contactHref}>
                    <span>Contact our team</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
