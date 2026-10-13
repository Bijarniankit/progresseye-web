import { MagneticButton } from "@/components/marketing/motion/magnetic-button";
import { TiltCard } from "@/components/marketing/motion/tilt-card";
import { WordReveal } from "@/components/marketing/motion/word-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "The school workspace that runs itself",
  description:
    "An advanced, end-to-end multi-tenant school operating system built for Indian schools — attendance, fees, exams, communication, all in one calm screen.",
};

export default function HomePage() {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-subtle)] text-[var(--color-brand)] border border-[var(--color-border)]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Phase 4 Marketing Shell Complete</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.1]">
          <WordReveal text="The school workspace that runs itself." />
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
          Centralize attendance, academics, fees, and parent communication in one calm, reliable
          platform engineered for modern school leaders and educators.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <MagneticButton>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] px-8 font-semibold shadow-[var(--shadow-e2)] gap-2 min-h-[48px]"
            >
              <Link href="/get-started">
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MagneticButton>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 font-semibold min-h-[48px]"
          >
            <Link href="/demo">Book a Product Demo</Link>
          </Button>
        </div>
      </div>

      {/* Feature Preview Cards with Tilt and Motion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] text-[var(--color-surface)] flex items-center justify-center font-bold">
            01
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">Attendance in Seconds</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Multi-tier classroom verification, instant SMS triggers to guardians, and automated
            daily summary audits.
          </p>
        </TiltCard>

        <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] text-[var(--color-surface)] flex items-center justify-center font-bold">
            02
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">Double-Entry Fee Ledger</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Immutable integer paise ledger with automated UPI reconciliations, discount brackets,
            and instant receipts.
          </p>
        </TiltCard>

        <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] text-[var(--color-surface)] flex items-center justify-center font-bold">
            03
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">DPDP & Safety Architecture</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Multi-tenant Row-Level Security, audit trails for minor records, and explicit parental
            consent tracking.
          </p>
        </TiltCard>
      </div>
    </div>
  );
}
