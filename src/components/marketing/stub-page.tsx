import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";

export interface StubPageProps {
  title: string;
  subtitle: string;
  badge?: string;
  children?: React.ReactNode;
}

export function StubPage({ title, subtitle, badge, children }: StubPageProps) {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Page Hero */}
      <div className="space-y-4 text-center md:text-left">
        {badge && (
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-wash-peach)] text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/20">
              {badge}
            </span>
          </div>
        )}
        <h1 className="font-display text-[var(--text-h1)] md:text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight text-[var(--color-text)] leading-[1.1]">
          <span>{title}</span>
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Main Content Area or Placeholder Card */}
      <div className="p-8 md:p-12 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-6">
        {children || (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Marketing Shell Active
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              This route is actively rendered within the universal ProgressEye marketing layout with
              verified keyboard navigation, theme parity, and semantic landmark hierarchy. Full
              feature scenes and interactive workflows are arriving throughout our rollout.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" size="sm" className="rounded-full gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to Home</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
