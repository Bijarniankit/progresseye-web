import type * as React from "react";
import { HeroCarousel } from "./hero-carousel";
import { HeroEditorial } from "./hero-editorial";

export interface HeroSectionProps {
  carouselSlot?: React.ReactNode;
  sceneIndex?: 0 | 1 | 2;
}

export function HeroSection({ carouselSlot, sceneIndex = 0 }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero overview"
      className="relative overflow-hidden bg-[var(--color-surface-hero)] pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-b border-[var(--color-border-muted)]"
    >
      {/* Ambient background washes using GPU-accelerated radial gradients (zero Gaussian blur filter overhead) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-70 dark:opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--color-peach-wash) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-32 -right-24 h-96 w-96 rounded-full opacity-60 dark:opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--color-mint-wash) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 min-h-[460px] sm:min-h-[400px] lg:min-h-0">
            <HeroEditorial />
          </div>

          {/* Right Visual Plate Slot */}
          <div className="flex flex-col items-center justify-center lg:col-span-6 w-full">
            {carouselSlot ?? <HeroCarousel initialScene={sceneIndex} />}
            <p className="mt-3 text-[11px] sm:text-xs text-[var(--color-text-muted)] text-center tracking-wide select-none">
              Illustrations and interface cards display simulated sample data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
