---
name: pe-spacing-layout
description: Use when setting spacing, grids, alignment, section rhythm or whitespace in ProgressEye layouts.
---
# Spacing and layout
Base unit 4px. Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
Container max 1280px (1152px for text-heavy pages). Gutters 16 / 24 / 32 by breakpoint. Section rhythm 64 mobile, 96 tablet, 128 desktop.
Grid: 4 columns mobile, 8 tablet, 12 desktop. Grid for two-dimensional layout, flex for one-dimensional. Use gap, not margins, between siblings.
Alignment: left-align text blocks; center only short heroes and CTAs. Cards share padding and radius tokens. Related items sit within 16px; separate groups by 32px or more.
No horizontal page scroll ever. Wide tables scroll inside their own container. Use min-h-dvh, not 100vh. Fixed bars respect safe-area insets.
