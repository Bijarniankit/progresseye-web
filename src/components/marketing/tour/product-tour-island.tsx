"use client";

import * as React from "react";
import type { TourTabId } from "./product-tour";
import { ProductTourShell } from "./product-tour-shell";

export function ProductTourIsland() {
  const [Component, setComponent] = React.useState<React.ComponentType<{
    initialTab?: TourTabId;
  }> | null>(null);
  const [initialTab, setInitialTab] = React.useState<TourTabId>("attendance");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pendingTabRef = React.useRef<TourTabId>("attendance");
  const isHydratedRef = React.useRef(false);

  // Load interactive component dynamically
  const loadInteractiveComponent = React.useCallback(() => {
    if (isHydratedRef.current) return;
    isHydratedRef.current = true;
    import("./product-tour").then((mod) => {
      setInitialTab(pendingTabRef.current);
      setComponent(() => mod.ProductTour);
    });
  }, []);

  // Intersection-gated hydration: trigger import when within 200px of viewport
  React.useEffect(() => {
    if (isHydratedRef.current) return;

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      loadInteractiveComponent();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadInteractiveComponent();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadInteractiveComponent]);

  // Pre-hydration click delegation: catch tab click before component finishes loading
  const handleClickCapture = (e: React.MouseEvent) => {
    if (Component) return; // already hydrated
    const target = e.target as HTMLElement;
    const tabBtn = target.closest<HTMLElement>("[data-tab-id]");
    if (tabBtn?.dataset.tabId) {
      const tabId = tabBtn.dataset.tabId as TourTabId;
      pendingTabRef.current = tabId;
      loadInteractiveComponent();
    }
  };

  // Pre-hydration focus delegation
  const handleFocusCapture = () => {
    if (!Component) {
      loadInteractiveComponent();
    }
  };

  return (
    <div
      ref={containerRef}
      onClickCapture={handleClickCapture}
      onFocusCapture={handleFocusCapture}
      className="w-full"
    >
      {Component ? <Component initialTab={initialTab} /> : <ProductTourShell />}
    </div>
  );
}
