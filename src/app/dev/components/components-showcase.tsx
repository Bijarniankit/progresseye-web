"use client";

import { MagneticButton } from "@/components/marketing/motion/magnetic-button";
import { TiltCard } from "@/components/marketing/motion/tilt-card";
import { useSpotlight } from "@/components/marketing/motion/use-spotlight";
import { WordReveal } from "@/components/marketing/motion/word-reveal";
import { Button } from "@/components/ui/button";
import { Moon, RefreshCw, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";

export function ComponentsShowcase() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  const { ref: spotlightRef, onMouseMove: onSpotlightMove } = useSpotlight();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const replayMotion = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-8 md:px-12 md:py-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)]">
              Internal Only
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              /dev/components (404 in production)
            </span>
          </div>
          <h1 className="text-[var(--text-h2)] font-bold tracking-tight mt-2 text-[var(--color-text)]">
            ProgressEye 2.0 Marketing Components Showcase
          </h1>
          <p className="text-[var(--color-text-muted)] text-[var(--text-body)] mt-1">
            Motion primitives, micro-interactions, responsive states, and shell components.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={replayMotion} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Replay Motion
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="gap-2"
            aria-label={
              mounted && theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {mounted && theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" /> Dark Mode
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Section 1: WordReveal Primitive */}
      <section className="space-y-6" aria-labelledby="section-word-reveal">
        <div>
          <h2
            id="section-word-reveal"
            className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
          >
            1. WordReveal Motion Primitive
          </h2>
          <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
            Masked slide and blur entrance with word stagger. Accessible text wrapper, hidden inner
            tokens, SSR visible fallback.
          </p>
        </div>

        <div
          key={`reveal-${resetKey}`}
          className="p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-4"
        >
          <div className="font-display text-3xl md:text-4xl font-extrabold text-[var(--color-text)]">
            <WordReveal text="The school workspace that runs itself." />
          </div>

          <div className="font-display text-2xl font-bold text-[var(--color-text)]">
            <WordReveal text="Highlighting intelligent features." highlight delay={0.2} />
          </div>
        </div>
      </section>

      {/* Section 2: MagneticButton Primitive */}
      <section className="space-y-6" aria-labelledby="section-magnetic">
        <div>
          <h2
            id="section-magnetic"
            className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
          >
            2. MagneticButton Motion Primitive
          </h2>
          <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
            Gentle cursor tracking with physics spring. Disabled automatically on coarse pointer
            (touch) devices and under reduced motion.
          </p>
        </div>

        <div className="p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] flex flex-wrap gap-6 items-center">
          <MagneticButton>
            <Button className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] px-6 py-3 font-semibold shadow-[var(--shadow-e2)]">
              Magnetic Primary Button
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.5}>
            <Button variant="outline" className="rounded-full px-6 py-3 font-semibold">
              Stronger Magnetic Pull (0.5)
            </Button>
          </MagneticButton>
        </div>
      </section>

      {/* Section 3: TiltCard Primitive */}
      <section className="space-y-6" aria-labelledby="section-tilt">
        <div>
          <h2
            id="section-tilt"
            className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
          >
            3. TiltCard 3D Perspective & Specular Highlight
          </h2>
          <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
            Pitch and yaw 3D tilt tracking with smooth radial glare. Disabled on touch and reduced
            motion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">Standard Tilt (max=5)</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Move your mouse across this card to observe 3D perspective pitch and specular
              highlight.
            </p>
          </TiltCard>

          <TiltCard
            max={10}
            className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3"
          >
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">Enhanced Pitch (max=10)</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Greater angular response for interactive feature emphasis cards.
            </p>
          </TiltCard>

          <TiltCard className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] space-y-3">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-status-success)]/10 text-[var(--color-status-success)] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">Reduced-Motion Fallback</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              When OS reduced motion is active or on touchscreens, card rests flat with zero 3D
              transforms.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* Section 4: useSpotlight Hook Showcase */}
      <section className="space-y-6" aria-labelledby="section-spotlight">
        <div>
          <h2
            id="section-spotlight"
            className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
          >
            4. useSpotlight Radial Gradient Hook
          </h2>
          <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
            Injects --mx and --my CSS custom variables dynamically to follow cursor within boundary.
          </p>
        </div>

        <div
          ref={spotlightRef}
          onMouseMove={onSpotlightMove}
          className="relative overflow-hidden p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e2)]"
          style={{
            backgroundImage:
              "radial-gradient(circle 350px at var(--mx, -500px) var(--my, -500px), var(--color-wash-peach), transparent 70%)",
          }}
        >
          <div className="relative z-10 space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cursor Following Spotlight</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">
              Interactive Ambient Spotlight
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Move your mouse inside this card to see the radial wash follow your cursor in real
              time. On mobile/touch devices, touch events are ignored to maintain scrolling
              performance.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Shell Status & Links */}
      <section className="space-y-4 pt-4 border-t border-[var(--color-border)]">
        <h2 className="text-[var(--text-h4)] font-semibold text-[var(--color-text)]">
          Marketing Shell Verified Routes
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "/",
            "/features",
            "/get-started",
            "/faq",
            "/demo",
            "/about",
            "/careers",
            "/contact",
            "/privacy",
            "/terms",
            "/cookies",
            "/gdpr",
            "/login",
          ].map((route) => (
            <Button asChild key={route} variant="outline" size="sm" className="rounded-full">
              <Link href={route}>{route}</Link>
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}
