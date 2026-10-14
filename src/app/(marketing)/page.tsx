import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero/hero-section";
import { TiltCard } from "@/components/marketing/motion/tilt-card";

export const metadata: Metadata = {
  title: "The school workspace that runs itself",
  description:
    "An advanced, end-to-end multi-tenant school operating system built for Indian schools — attendance, fees, exams, communication, all in one calm screen.",
};

interface HomePageProps {
  searchParams?: Promise<{ scene?: string; option?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const sceneParam = params?.scene ? Number.parseInt(params.scene, 10) : 0;
  const sceneIndex = (sceneParam >= 0 && sceneParam <= 2 ? sceneParam : 0) as 0 | 1 | 2;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection sceneIndex={sceneIndex} />

      {/* Feature Preview Cards */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
