"use client";

import { motion, useReducedMotion } from "motion/react";
import * as React from "react";

export interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlight?: boolean;
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
  highlight = false,
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const tokens = React.useMemo(
    () =>
      text.split(" ").map((word, index) => ({
        id: `token-${word}-${index}`,
        word,
      })),
    [text],
  );

  // Accessibility contract: Screen reader reads the full unfragmented text in sr-only,
  // while animated word tokens are hidden from assistive technology with aria-hidden="true".
  // SSR fallback: Text renders statically without motion transforms before client hydration.
  if (shouldReduceMotion || !mounted) {
    return (
      <span className={`inline-block ${className}`}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {tokens.map(({ id, word }, i) => (
            <React.Fragment key={id}>
              <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <span className={`inline-block ${highlight ? "text-[var(--color-brand)]" : ""}`}>
                  {word}
                </span>
              </span>
              {i < tokens.length - 1 ? " " : null}
            </React.Fragment>
          ))}
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map(({ id, word }, i) => (
          <React.Fragment key={id}>
            <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.5,
                  delay: delay + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${highlight ? "text-[var(--color-brand)]" : ""}`}
              >
                {word}
              </motion.span>
            </span>
            {i < tokens.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}
