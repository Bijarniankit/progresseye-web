"use client";

import {
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import * as React from "react";

export interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className = "", max = 5, ...props }: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [glarePosition, setGlarePosition] = React.useState<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    setMounted(true);
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setIsTouchDevice(true);
    }
  }, []);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });

  const isInactive = !mounted || isTouchDevice || Boolean(shouldReduceMotion);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isInactive) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);

    // Specular highlight coordinate
    setGlarePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setGlarePosition(null);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={isInactive ? undefined : onMove}
      onMouseLeave={isInactive ? undefined : onLeave}
      style={
        isInactive
          ? undefined
          : {
              rotateX: srx,
              rotateY: sry,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative ${className}`}
      {...props}
    >
      {children}
      {!isInactive && glarePosition && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${glarePosition.x}px ${glarePosition.y}px, rgba(255,255,255,0.08), transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
}
