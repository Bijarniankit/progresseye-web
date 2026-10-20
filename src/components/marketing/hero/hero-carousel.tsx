"use client";

import * as React from "react";
import { SchoolScene } from "@/components/illustrations";
import { STORAGE_KEYS } from "@/config/storage-keys";

function useReducedMotion(): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMatches(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return matches;
}

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
  const [isAutoStopped, setIsAutoStopped] = React.useState(false);
  const [isInView, setIsInView] = React.useState(true);
  const [isTabVisible, setIsTabVisible] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);
  const [mountDeferredScenes, setMountDeferredScenes] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const tapTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const transitionCountRef = React.useRef(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    setIsMounted(true);
    try {
      if (
        typeof window !== "undefined" &&
        window.sessionStorage.getItem(STORAGE_KEYS.HERO_ROTATION_PLAYED) === "true"
      ) {
        setIsAutoStopped(true);
      }
    } catch {
      // sessionStorage unavailable or restricted
    }

    const mountScenes = () => {
      setMountDeferredScenes(true);
    };

    let idleId: number | null = null;
    let timerId: NodeJS.Timeout | null = null;

    if ("requestIdleCallback" in window) {
      idleId = (
        window as Window & {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(mountScenes, { timeout: 3000 });
    } else {
      timerId = setTimeout(mountScenes, 2500);
    }

    return () => {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      if (idleId !== null && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
          idleId,
        );
      }
      if (timerId !== null) clearTimeout(timerId);
    };
  }, []);

  const handleTap = React.useCallback(() => {
    // Under prefers-reduced-motion, tap strictly does nothing
    if (shouldReduceMotion) return;

    // If rotation reached 9-transition limit or was previously played in session, tap replays without clearing played flag
    if (isAutoStopped) {
      setIsAutoStopped(false);
      transitionCountRef.current = 0;
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(STORAGE_KEYS.HERO_ROTATION_PLAYED, "true");
        }
      } catch {
        // ignore
      }
      return;
    }

    setIsTapped((prev) => {
      const next = !prev;
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      if (next) {
        // Auto-resume after 15 seconds of inactivity
        tapTimeoutRef.current = setTimeout(() => {
          setIsTapped(false);
        }, 15000);
      }
      return next;
    });
  }, [shouldReduceMotion, isAutoStopped]);

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
  // Pauses on hover, on tap-and-hold (pointer down), on tap toggle, off-screen, tab hidden, auto-stop limit, or reduced motion
  const isPaused =
    Boolean(shouldReduceMotion) ||
    isAutoStopped ||
    isHovered ||
    isPointerHeld ||
    isTapped ||
    !isInView ||
    !isTabVisible;

  // Auto-rotation timer (5.2s crossfade between scenes 1, 2, 3, stopping after 9 transitions)
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      transitionCountRef.current += 1;
      setCurrentSlide((prev) => ((prev + 1) % 3) as 0 | 1 | 2);

      if (transitionCountRef.current >= 9) {
        setIsAutoStopped(true);
        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(STORAGE_KEYS.HERO_ROTATION_PLAYED, "true");
          }
        } catch {
          // ignore
        }
      }
    }, autoRotateIntervalMs);

    return () => clearInterval(interval);
  }, [isPaused, autoRotateIntervalMs]);

  const animationPlayState = !isMounted ? "running" : isPaused ? "paused" : "running";

  return (
    /*
      The plate is decorative artwork per user directive (aria-hidden="true").
      No carousel controls, no ARIA carousel roles, no keyboard focus trapping.
      Rotation and orbit/cloud animations pause on hover, tap-and-hold, tap toggle,
      when off-screen, or when tab is hidden.
      Under prefers-reduced-motion, Scene 1 is shown statically with no animation.
    */
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
      onClick={handleTap}
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
          {/* Scene 0 (SchoolScene): Always rendered in initial SSR HTML for no-JS and LCP */}
          <div
            data-scene-index={0}
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-[320ms] ease-in-out ${
              !isMounted || shouldReduceMotion || currentSlide === 0
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <SchoolScene />
          </div>

          {/* Scenes 1 and 2: Hydrated crossfade layers, deferred until idle or rotation */}
          {isMounted && !shouldReduceMotion && (mountDeferredScenes || currentSlide !== 0) && (
            <>
              <div
                data-scene-index={1}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-[320ms] ease-in-out ${
                  currentSlide === 1
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <React.Suspense fallback={<div className="w-full h-full" />}>
                  <FeaturesScene />
                </React.Suspense>
              </div>

              <div
                data-scene-index={2}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-[320ms] ease-in-out ${
                  currentSlide === 2
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <React.Suspense fallback={<div className="w-full h-full" />}>
                  <FeatureDetailScene />
                </React.Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
