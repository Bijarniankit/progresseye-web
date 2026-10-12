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

## 4. Phase 3 Architecture & Design Token Decisions

### D-001: Pinned OpenAPI Specification & Contract Drift Detection
- **Decision**: Rather than fetching OpenAPI from live dev server at build time, the OpenAPI spec is pinned in `openapi/openapi.json` with clear provenance metadata in `openapi/README.md` (originating from `progresseye-api` git tag `phase-02-approved`, commit `5bdf148`). Orval reads this pinned file.
- **Verification**: `pnpm test:contract-drift` runs in CI to verify that generated Orval client files match the committed contract.

### D-002: Dual-Font System (`next/font/google`)
- **Decision**: Load Google Fonts using Next.js optimized font loader:
  - `Poppins` (weights 500, 600, 700, 800 with both normal and italic styles) mapped to `--font-display`.
  - `Inter` (variable font) mapped to `--font-sans`.
- **Performance**: Zero external network render-blocking calls; fonts are self-hosted automatically at build time.

### D-003: Two-Layer Token Architecture (Layer 1 vs Layer 2)
- **Decision**:
  - Layer 1 (`src/styles/tokens.css` `:root`) defines raw palette scales (`--palette-brand-*`, `--palette-slate-*`, peach/mint washes).
  - Layer 2 binds semantic intent (`--color-surface`, `--color-text`, `--color-border`, `--color-brand`, etc.) for both light and dark mode (`.dark`).
  - Components exclusively consume Layer 2 semantic CSS variables or their Tailwind utility mappings. Components are never permitted to reference Layer 1 directly.

### D-004: No-Hex Rule Enforcement & Vector Illustration Exception
- **Decision**: Raw hex colors (`#...`) are strictly prohibited in all UI components (`src/components/ui/`, `src/components/marketing/`, `src/app/`).
- **Enforcement**: `scripts/no-hex-check.mjs` scans all JSX/TSX files.
- **Whitelist Exception**: Complex multi-stop vector illustrations located in `src/components/illustrations/**` require exact gradient stops, tints, and shadows from the design spec; these files are whitelisted in `scripts/no-hex-check.mjs`.
- **Anchor Handling**: The linter excludes HTML ID fragments and anchors (e.g., `#main-content`, `href="#..."`) to prevent false positives.

### D-005: Internal-Only Dev Route (`/dev/tokens`)
- **Decision**: The interactive design tokens showcase at `/dev/tokens` is exclusively available during development. In production (`process.env.NODE_ENV === "production"`), the route triggers Next.js `notFound()`, rendering a standard 404 page.
- **Testing**: A dedicated unit test in `tests/unit/dev-tokens.test.tsx` confirms that `notFound()` is invoked when `NODE_ENV === "production"`.

### D-006: Server-Only Proxy Destination via `API_INTERNAL_URL`
- **Decision**: In `next.config.ts`, the API rewrite proxy destination reads from the server-only environment variable `process.env.API_INTERNAL_URL || process.env.API_BASE_URL || "http://localhost:4000"`.
- **Rationale**: Keeps internal VPC/Kubernetes network addresses confidential from the client browser bundle.

