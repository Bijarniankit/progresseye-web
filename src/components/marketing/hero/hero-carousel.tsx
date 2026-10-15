"use client";

import { AnimatePresence, domAnimation, LazyMotion, m, useReducedMotion } from "motion/react";
import * as React from "react";
import { SchoolScene } from "@/components/illustrations";

// Lazy-load Scenes 2 and 3 for optimal initial bundle and SSR speed
const FeaturesScene = React.lazy(() =>
  import("@/components/illustrations").then((mod) => ({ default: mod.FeaturesScene })),
);
const FeatureDetailScene = React.lazy(() =>
  import("@/components/illustrations").then((mod) => ({ default: mod.FeatureDetailScene })),
);

export interface HeroCarouselProps {
  initialScene?: 0 | 1 | 2;
  autoRotateIntervalMs?: number;
}

export function HeroCarousel({ initialScene = 0, autoRotateIntervalMs = 5200 }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState<0 | 1 | 2>(initialScene);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPointerHeld, setIsPointerHeld] = React.useState(false);
  const [isTapped, setIsTapped] = React.useState(false);
  const [isInView, setIsInView] = React.useState(true);
  const [isTabVisible, setIsTabVisible] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Preload Scenes 2 and 3 during idle periods after hydration
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const preload = () => {
      // Dynamic import triggers chunk prefetch without blocking main thread
      import("@/components/illustrations");
    };

    if ("requestIdleCallback" in window) {
      const handle = (
        window as Window & { requestIdleCallback: (cb: () => void) => number }
      ).requestIdleCallback(preload);
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
            handle,
          );
        }
      };
    }

    const timer = setTimeout(preload, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Monitor visibility of browser tab
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Monitor intersection observer for off-screen pausing
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Determine whether auto-rotation and decorative animations are paused:
  // Pauses on hover, on tap-and-hold (pointer down), on tap toggle, off-screen, tab hidden, or reduced motion
  const isPaused =
    Boolean(shouldReduceMotion) ||
    isHovered ||
    isPointerHeld ||
    isTapped ||
    !isInView ||
    !isTabVisible;

  // Auto-rotation timer (5.2s crossfade between scenes 1, 2, 3)
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, autoRotateIntervalMs);

    return () => clearInterval(interval);
  }, [isPaused, autoRotateIntervalMs]);

  const animationPlayState = isPaused ? "paused" : "running";

  return (
    <LazyMotion features={domAnimation}>
      {/*
        The plate is decorative artwork per user directive (aria-hidden="true").
        No carousel controls, no ARIA carousel roles, no keyboard focus trapping.
        Rotation and orbit/cloud animations pause on hover, tap-and-hold, tap toggle,
        when off-screen, or when tab is hidden.
        Under prefers-reduced-motion, Scene 1 is shown statically with no animation.
      */}
      <div
        ref={containerRef}
        aria-hidden="true"
        data-testid="hero-plate-container"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsPointerHeld(false);
        }}
        onPointerDown={() => setIsPointerHeld(true)}
        onPointerUp={() => setIsPointerHeld(false)}
        onPointerCancel={() => setIsPointerHeld(false)}
        onClick={() => setIsTapped((prev) => !prev)}
        className="relative flex items-center justify-center w-full select-none cursor-pointer"
      >
        {/* Main circular illustrative plate with responsive diameter (328/500/430/520px) */}
        <div
          data-testid="hero-plate"
          className="relative aspect-square w-full max-w-[328px] md:max-w-[500px] lg:max-w-[430px] xl:max-w-[520px] rounded-full p-4 sm:p-6 shadow-md border-2 border-[var(--color-hero-plate-border)] flex items-center justify-center transition-colors overflow-hidden"
          style={{ background: "var(--color-hero-plate-bg)", animationPlayState }}
        >
          {/* 80-second rotating dashed orbit border (pauses on hover, tab-hidden, off-screen, or reduced-motion) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-[var(--color-hero-plate-border)] animate-[spin_80s_linear_infinite] will-change-transform"
            style={{ animationPlayState }}
          />

          {/* Active Scene Presentation Container */}
          <div
            data-testid="hero-active-scene"
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ animationPlayState }}
          >
            {!isMounted || shouldReduceMotion ? (
              /* Pre-hydration SSR Fallback & Reduced-Motion Static Display: Scene 1 visible */
              <div className="w-full h-full flex items-center justify-center">
                <SchoolScene />
              </div>
            ) : (
              /* Hydrated Overlapping Crossfade: Plate is never blank or empty during transitions */
              <AnimatePresence initial={false}>
                <m.div
                  key={currentSlide}
                  data-scene-index={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  {currentSlide === 0 && <SchoolScene />}
                  {currentSlide === 1 && (
                    <React.Suspense fallback={<div className="w-full h-full" />}>
                      <FeaturesScene />
                    </React.Suspense>
                  )}
                  {currentSlide === 2 && (
                    <React.Suspense fallback={<div className="w-full h-full" />}>
                      <FeatureDetailScene />
                    </React.Suspense>
                  )}
                </m.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
