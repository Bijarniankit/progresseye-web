---
name: pe-motion
description: Use for page transitions, scroll reveals, hover effects, carousels and micro-interactions in ProgressEye.
---
# Motion
Use the motion package (import from motion/react). Durations: 150-250ms for UI feedback, 500-800ms for hero reveals. Entrance easing [0.22, 1, 0.36, 1]. Springs for magnetic and tilt effects (stiffness 250, damping 18).
Scroll reveals: whileInView, once, margin -80px, stagger 60-80ms. Page transitions: opacity plus 8px translate only.
Hover effects use transform and opacity only and have a focus-visible equivalent. Never put information only in a hover state.
useReducedMotion must render the final state with no parallax and no perpetual loops.
Perpetual loops (carousel, orbit, floating) pause when offscreen and when the tab is hidden. Auto-advancing content has a visible pause control.
Do not animate width, height, top or left except accordions. Keep CLS at or below 0.1. Prefer CSS keyframes for simple loops and keep JS animation inside small client components.
