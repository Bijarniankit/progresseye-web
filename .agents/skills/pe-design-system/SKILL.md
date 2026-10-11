---
name: pe-design-system
description: Use first for any ProgressEye UI work. Defines brand colors, tokens, tone and how to port the design spec.
---
# ProgressEye design system
Read docs/design/public-pages-spec.md before building any marketing page, then docs/design/DECISIONS.md for approved deviations. The spec wins unless DECISIONS.md overrides it.
Brand feel: editorial, calm, trustworthy. Warm cream surfaces (#FAF6EC hero, #FBF6EB footer), deep indigo (#1e1b4b, #3730a3, #4338ca), interactive blue (#2563eb and #1d4ed8), amber accent (#f59e0b), terracotta (#c2410c).
Every color, radius, shadow, z-index and duration is a CSS variable in src/styles/tokens.css, exposed through Tailwind 4 @theme. Components use tokens only.
Every semantic token (surface, surface-raised, text, text-muted, border, brand, accent, success, warning, danger) has light and dark values.
Content rule: never invent numbers or claims. Mark placeholders TODO-REAL-DATA.
When the spec is silent or has a gap, propose the design in the plan, wait for approval, then record the decision in DECISIONS.md.
