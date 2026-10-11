# Design Decisions & Gap Resolutions (DECISIONS.md)

This document records architectural, visual, and copy decisions modifying or completing `public-pages-spec.md` as mandated by Section 5 of `01-SETUP-AND-INSTRUCTIONS.md`.

## 1. Spec Gaps & Proposed Resolutions
- **Contact Bottom FAQ Teaser**: Implement a compact 3-question accordion linking directly to `/faq` with "Still have questions? Reach our support team."
- **About Values Grid & Principles Strip**: Grid of 4 core values (Transparency, Speed, Reliability, Child Safety) and a banner CTA to schedule a walk-through.
- **FAQ Empty State & Direct-Help Card**: When search yields 0 matches, display friendly illustration, "No answers found", and direct contact card with phone/email/WhatsApp triggers.
- **Features Final CTA**: Standardized high-converting CTA block across all feature pages leading to `/get-started` and `/demo`.
- **SVG Scenes**: Complete attendance dots and exam grade pill illustrations in code; resolve landing scene text by implementing clean vector layers rather than missing comment placeholders.

## 2. Claims, Placeholders & Contradictions
- **Placeholders**: All metrics (`35+ schools`, `14K+ students`, `99% uptime`, `99.9% SLA`, Bangalore office address) MUST be marked `TODO-REAL-DATA` until verified in production.
- **Setup Speed**: Standardized on "Setup in 1 hour with full data migration in 24-48 hours".
- **Backup Frequency**: Automated multi-region backups every 6 hours with point-in-time recovery.
- **Pricing**: Dynamic currency and tier rates managed via central configuration (`src/config/pricing.ts`).

## 3. Implementation Modernization Rules
- **Typography**: Loaded via `next/font/google` (`Poppins` + `Inter`), CSS variables `--font-display` and `--font-sans`. Zero `@import`. Explicit display tier (clamp 40px–72px).
- **Icons**: Exclusively `lucide-react`. No mixing with other font or icon libraries.
- **Animation**: `motion/react` with mandatory `prefers-reduced-motion` fallbacks, pause on offscreen/blur, and accessible carousel controls.
- **Styling**: Tailwind CSS 4 CSS-first variables in `tokens.css`. No invalid classes (e.g. `rounded-10` replaced with standardized radius tokens).
- **Accessibility**: Watermark characters and background clouds marked `aria-hidden="true"`.
- **Rendering Architecture**: React Server Components by default; interactive client islands dynamically loaded below the fold.
- **SVG Isolation**: Gradient IDs prefixed per component (e.g., `sch-sky`, `feat-hero`) to eliminate DOM collisions.
- **Compliance & Legal**: All legal pages labeled `DRAFT-NEEDS-LEGAL-REVIEW`; strict cookie consent gating for non-essential scripts.
