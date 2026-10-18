"use client";

import * as React from "react";

/**
 * HashScrollHandler ensures that anchor links (e.g. #tour, #why, #pricing, #faq, #cta)
 * reliably position at the target element after layout computation,
 * preventing scroll position drift caused by below-fold content-visibility: auto.
 *
 * Accessibility & Motion Compliance:
 * - Uses behavior: "instant" to execute without motion, strictly adhering to prefers-reduced-motion.
 * - Leaves document.activeElement undisturbed so keyboard navigation and focus rings are not affected.
 */
export function HashScrollHandler() {
  React.useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const el = document.querySelector(hash);
          if (el) {
            // Wait for next animation frame to allow content-visibility layout to register
            requestAnimationFrame(() => {
              el.scrollIntoView({ behavior: "instant", block: "start" });
            });
          }
        } catch {
          // Ignore invalid hash selectors
        }
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
