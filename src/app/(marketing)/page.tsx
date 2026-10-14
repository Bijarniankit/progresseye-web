import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { MagneticButton } from "@/components/marketing/motion/magnetic-button";
import { TiltCard } from "@/components/marketing/motion/tilt-card";
import { WordReveal } from "@/components/marketing/motion/word-reveal";
import { Button } from "@/components/ui/button";

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
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.1]">
          <WordReveal text="The school workspace that runs itself." />
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
          A calm, unified operating environment for school workflows, administrative records, and
          community communication.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <MagneticButton>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] px-8 font-semibold shadow-[var(--shadow-e2)] gap-2 min-h-[48px]"
            >
              <Link href="/get-started" prefetch={false}>
                <span>Get Started</span>
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
            <Link href="/demo" prefetch={false}>
              Book a Product Demo
            </Link>
          </Button>
        </div>
      </div>

      {/* Feature Preview Cards with Tilt and Motion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] text-[var(--color-surface)] flex items-center justify-center font-bold">
            01
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">Calm Administrative Flow</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Structured records and unified dashboards designed to reduce cognitive overhead across
            daily school management.
          </p>
        </TiltCard>

        <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] text-[var(--color-surface)] flex items-center justify-center font-bold">
            02
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">Multi-Tenant Foundation</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Architected for strict institutional data isolation, role-based access control, and
            reliable multi-tenant operations.
          </p>
        </TiltCard>

        <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] text-[var(--color-surface)] flex items-center justify-center font-bold">
            03
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">Connected Community</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Clear communication channels built to keep administrators, educators, and families
            informed and coordinated.
          </p>
        </TiltCard>
      </div>
    </div>
  );
}
