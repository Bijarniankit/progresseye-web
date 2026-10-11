---
name: pe-typography
description: Use when choosing fonts, sizes, line height, weights or text hierarchy in any ProgressEye page or component.
---
# Typography
Fonts: Poppins (display, 600-800) and Inter (body, 400-600) loaded with next/font/google as CSS variables --font-display and --font-sans, display swap. Never use CSS @import. Add Noto Sans Devanagari when Hindi ships.
Scale (mobile / tablet / desktop px): h1 24/30/36, h2 18/20/24, h3 18/20/24, h4 16/16/18, h5 16, h6 15, body 16, small 14, tiny 12. Hero display tier uses clamp: hero 40 to 72, page heroes 28 to 64. All sizes are tokens (--text-*).
Line height: display 0.92-1.05, headings 1.1-1.3, body 1.6, small 1.5. Display tracking -0.02em. Uppercase eyebrows 0.12em.
Hierarchy: one h1 per page, no skipped levels, paragraphs 60-75ch wide, at most two families and three weights per view.
Inputs are at least 16px (no important flag). Stat numbers use tabular-nums. Devanagari gets +0.1 line height and no negative tracking. Use text-wrap balance on headings and pretty on paragraphs.
Check: nothing under 12px, body contrast 4.5:1 or better, large text 3:1 or better.
