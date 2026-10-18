"use client";

import * as React from "react";

interface BentoSpotlightProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoSpotlight({ className = "", children }: BentoSpotlightProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof window === "undefined") return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    el.addEventListener("pointermove", handlePointerMove);
    return () => el.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-e2)] hover:border-[var(--color-brand)]/40 flex flex-col justify-between ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(37, 99, 235, 0.08), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}
