---
name: pe-responsive
description: Use when making ProgressEye layouts work on mobile, tablet and desktop, including tables, images and touch targets.
---
# Responsive design
Mobile-first. Breakpoints 640, 768, 1024, 1280, 1536. Always verify at 360, 390, 768, 1024, 1280 and 1536 px.
Touch targets at least 44x44px with space between them. No hover-only features.
Images use next/image with sizes and reserved aspect ratio. SVG illustrations use a viewBox and scale fluidly.
Tables become stacked cards or scroll in their own container. Use fluid type via clamp tokens and container queries for components that move between columns.
Use dvh units and safe-area insets. Never disable zoom. Content must reflow at 320px and at 200% zoom.
Test throttled: slow 3G network and 4x CPU slowdown for animation-heavy pages.
