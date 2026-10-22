import {
  BarChart3,
  Bell,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Receipt,
  Users,
} from "lucide-react";
import type React from "react";
import { type FeatureModule, featuresConfig } from "@/config/features";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  attendance: CalendarCheck,
  fees: Receipt,
  academics: GraduationCap,
  directory: Users,
  communication: Bell,
  insights: BarChart3,
};

export function FeaturesList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {featuresConfig.modules.map((mod: FeatureModule) => {
        const IconComponent = iconMap[mod.id] || CalendarCheck;

        return (
          <article
            key={mod.id}
            data-testid={`feature-module-${mod.id}`}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5 sm:p-8 shadow-xs flex flex-col justify-between transition-colors hover:border-[var(--color-brand)]/40 overflow-hidden"
          >
            <div className="space-y-6">
              {/* Header with Category and Planned Badge */}
              <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 border-b border-[var(--color-border)]/60 pb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-2.5 rounded-xl bg-[var(--color-surface-subtle)] text-[var(--color-brand)] border border-[var(--color-border)] shrink-0">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block">
                      {mod.category}
                    </span>
                    <h2 className="text-lg sm:text-xl font-display font-bold text-[var(--color-text)] break-words">
                      {mod.name}
                    </h2>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)] border border-[var(--color-badge-info-border)]">
                  Planned
                </span>
              </div>

              {/* Tagline & Overview */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[var(--color-text)] break-words">
                  {mod.tagline}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed break-words">
                  {mod.overview}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block">
                  Planned Capabilities
                </span>
                <ul className="space-y-2.5">
                  {mod.highlights.map((hl) => (
                    <li
                      key={hl.title}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text-muted)]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-brand)] mt-0.5 shrink-0" />
                      <span className="break-words min-w-0">
                        <strong className="font-semibold text-[var(--color-text)]">
                          {hl.title}:
                        </strong>{" "}
                        {hl.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Status Marker */}
            <div className="mt-8 pt-4 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
              <span>Status: Planned Architecture</span>
              <span className="font-medium">In Design</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
