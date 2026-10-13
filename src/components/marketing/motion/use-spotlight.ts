"use client";

import * as React from "react";

export function useSpotlight() {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Check if pointer is coarse (touch device)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}
