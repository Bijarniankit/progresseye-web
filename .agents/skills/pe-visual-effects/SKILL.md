---
name: pe-visual-effects
description: Use for gradients, textures, shadows, glass, blur and layered backgrounds in ProgressEye.
---
# Visual effects
Gradients: two stops, from tokens, at most one hero gradient per page. Textures: dot paper grid (24px) and 3.5% noise overlay as classes in effects.css, hero only.
Shadows: elevation tokens e1 to e4, two-layer low-opacity. In dark mode prefer borders and faint glow over heavy shadows.
Layers: z-index tokens (base 0, raised 10, nav 40, overlay 50, modal 60, toast 70). Decorative layers are aria-hidden and pointer-events-none.
Blur blobs: at most 2 per viewport, animate transform and opacity only, never the blur radius. Backdrop blur only on the fixed nav and floating pills, always with a solid fallback color.
Spotlight cards use --mx and --my set by the useSpotlight hook.
Performance: no filter animation on large areas, will-change only while animating, content-visibility auto on below-the-fold sections. Check text contrast over every gradient.
