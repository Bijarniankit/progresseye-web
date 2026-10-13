# Design Decisions & Gap Resolutions (DECISIONS.md)

This document records architectural, visual, and copy decisions modifying or completing `public-pages-spec.md` as mandated by Section 5 of `01-SETUP-AND-INSTRUCTIONS.md` and `02-PHASES.md`.

---

## 1. Spec Gaps & Proposed Resolutions

- **Contact Bottom FAQ Teaser**: Implement a compact 3-question accordion linking directly to `/faq` with "Still have questions? Reach our support team."
- **About Values Grid & Principles Strip**: Grid of 4 core values (Transparency, Speed, Reliability, Child Safety) and a banner CTA to schedule a walk-through.
- **FAQ Empty State & Direct-Help Card**: When search yields 0 matches, display friendly illustration, "No answers found", and direct contact card with phone/email/WhatsApp triggers.
- **Features Final CTA**: Standardized high-converting CTA block across all feature pages leading to `/get-started` and `/demo`.
- **SVG Scenes**: Complete attendance dots and exam grade pill illustrations in code; resolve landing scene text by implementing clean vector layers rather than missing comment placeholders. Prefix all SVG gradient IDs per component (e.g., `sch-sky`, `ft-grade`) to prevent document-level ID collisions.

---

## 2. Claims, Placeholders & Contradictions

- **Placeholders & Zero Invented Data**: All metrics (`35+ schools`, `14K+ students`, `99% uptime`, `99.9% SLA`, Bangalore office address) MUST be marked `TODO-REAL-DATA` until verified in production. All company data (legal entity name, production domain, support emails) is driven by environment configuration (`src/config/site.ts`) with clear `TODO-REAL-DATA` placeholders until provided by the project owner.
- **Setup Speed**: Standardized on "Setup in 1 hour with full data migration in 24-48 hours".
- **Backup Frequency**: Automated multi-region backups every 6 hours with point-in-time recovery.
- **Pricing**: Dynamic currency and tier rates managed via central configuration (`src/config/pricing.ts`).
- **Legal Pages**: All legal routes (`/privacy`, `/terms`, `/cookies`, `/gdpr`) ship as drafts marked `DRAFT-NEEDS-LEGAL-REVIEW` until certified by legal counsel.

---

## 3. Modernizing the Implementation

- **Fonts**: Dual-font system loaded via `next/font/google` (`Poppins` for display, `Inter` for body) with `display: swap`. Zero external render-blocking font `@import` rules.
- **Icons**: Standardized strictly on `lucide-react` across all public marketing and application pages (replacing the two conflicting icon sets in the legacy spec).
- **Animation**: Physics and gesture engine standardized on `motion` (`motion/react`).
- **Tokens**: Two-layer token architecture in Tailwind CSS 4 (`@theme`), providing complete Light and Dark theme parity. Invalid legacy utilities (e.g. `rounded-10`) are strictly eliminated in favor of semantic tokens.
- **Display Typography Tier**: Explicit fluid display tiers using CSS `clamp()`: `--text-display-hero` (40px–72px) and `--text-display-page` (28px–64px).
- **Accessibility & Motion**: Strict `prefers-reduced-motion` compliance. All looping animations pause when scrolled offscreen or when browser tab is inactive.
- **Decorative Elements**: Watermarks, word clouds, blur blobs, and decorative SVGs are strictly tagged `aria-hidden="true"` and `pointer-events-none`.
- **Component Architecture**: Server Components by default. Interactive widgets (spotlight cards, magnetic buttons, mobile drawer, theme toggles) are isolated small client components.

---

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

---

## 5. Phase 4 Marketing Shell Architecture Decisions

### D-007: Marketing Shell Structure, Landmarks & Content Offset (`(marketing)/layout.tsx`)
- **Decision**: All public marketing pages reside inside the `(marketing)` route group and share `src/app/(marketing)/layout.tsx`.
- **Semantic Landmarks**:
  - `<header role="banner">` enclosing `PublicNavbar`.
  - `<main id="main-content" tabIndex={-1}>` enclosing page contents with top padding offset (`pt-16 md:pt-20`) to prevent content from hiding beneath the fixed navbar.
  - Root container specifies `scroll-padding-top` (`scroll-pt-16 md:scroll-pt-20`) so in-page anchor links smoothly scroll without header overlap.
  - `<footer>` landmark enclosing `Footer` with `role="contentinfo"`.
- **Skip Link**: Top-level keyboard skip link: `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-md ...">Skip to main content</a>`.

### D-008: PublicNavbar Design, Route Mapping & Recorded Deviations
- **Nav Link Order**: `Home` (`/`), `Features` (`/features`), `Pricing` (redirects to `/get-started`), `FAQ` (`/faq`), `About` (`/about`), `Contact` (`/contact`).
- **`/pricing` Destination**: Configured as an HTTP 307 redirect to `/get-started` in `next.config.ts` (redirects users to free tier onboarding & pricing selector). It is not a stub page and is excluded from `sitemap.ts`.
- **Actions**:
  - "Sign in" (ghost button) linking to `/login`.
  - "Get started" (brand primary button) linking to `/get-started`.
- **Scroll State**: Fixed header applies `backdrop-blur-xl` and subtle border when `scrollY > 8px`. Layout height is fixed (`h-16 md:h-20`) to eliminate cumulative layout shift (CLS = 0).
- **Active State**: Displays an animated floating pill `<motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800/80 -z-10" />` (automatically disabled when `useReducedMotion` is active).
- **Deviation Recorded from Spec: Theme Toggle in Header**: The legacy spec did not include a theme switch in the public header. We provide an accessible theme toggle button (`Sun` / `Moon` icons) in the navbar to verify and support Light and Dark modes across all marketing pages. Accessible name explicitly contains its visible label ("Switch to Light Mode" / "Switch to Dark Mode") ensuring WCAG 2.5.3 compliance.

### D-009: Mobile Navigation Drawer (Right Side-Sheet Deviation)
- **Deviation Recorded from Spec**: The legacy spec specified a top drop-down menu (`y: -8 -> 0`). We deliberately implement a **Right Side-Sheet** using the existing `src/components/ui/sheet.tsx` component (shadcn/Radix).
- **Rationale**: Right side-sheets provide superior ergonomic reach on mobile touchscreens (thumb-accessible), prevent layout shifting of underlying page content, provide accessible keyboard focus trapping, close on `Escape`, and automatically close on route changes via `usePathname()`.
- **Touch Target Compliance**: All drawer navigation items and action buttons strictly meet the minimum 44x44px touch target requirement.

### D-010: Footer Architecture, Watermark Alignment & Newsletter Scope
- **Surface**: Dedicated footer semantic token `--color-surface-footer` (warm cream `#FBF6EB` in light mode; `#020617` in dark mode).
- **Ambient Color Washes**: Soft peach ambient blur blob (`#FED7AA`, opacity 0.45, `blur-3xl`) top-left; soft mint ambient blur blob (`#A7F3D0`, opacity 0.35, `blur-3xl`) bottom-right.
- **Dot Pattern**: 28px dot pattern at 0.06 opacity (`radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)` with `background-size: 28px 28px`).
- **Oversized Watermark**:
  - Watermark text is `"ProgressEye"` (Title Case, matching spec — NOT uppercase).
  - Typography: `font-display font-extrabold leading-[0.85]`, `clamp(4rem, 15vw, 17rem)`, opacity `0.06`.
  - Position: Tagged `aria-hidden="true"`, `pointer-events-none`, `user-select-none`, centered horizontally behind bottom content, guaranteed never to collide with or obscure text/links across 360px to 1536px viewports.
- **Newsletter Scope**: Rendered globally across public marketing pages in `Footer`, but **hidden on legal routes** (`/privacy`, `/terms`, `/cookies`, `/gdpr`).
- **Newsletter Connection State**: Zero fake success confirmations. The form clearly presents an informative not-connected state: *"Newsletter subscriptions will open in Phase 9."*
- **Columns & Bottom Strip**: 3 link columns (Product, Company, Legal); bottom strip with copyright, `TODO-REAL-DATA` metadata, and social icons with accessible `aria-label`s.

### D-011: Client Motion Primitives, Touch Device Fallbacks & Recorded Deviations
- **`WordReveal`**:
  - Preserves the spec's masked slide and blur: words animate from `y: 110%`, `opacity: 0`, `filter: blur(8px)` to `y: 0%`, `opacity: 1`, `filter: blur(0px)` with stagger (`delay + i * 0.07`, duration 0.75s, ease `[0.22, 1, 0.36, 1]`) inside an `overflow-hidden` wrapper.
  - Accessible markup: outer container specifies `aria-label={text}`, while inner animated spans are tagged `aria-hidden="true"`.
  - SSR / No-JS fallback: text is fully visible in DOM before JS hydration runs.
- **`MagneticButton`, `TiltCard`, `useSpotlight`**:
  - **Deviation Recorded from Spec: Specular Highlight**: Added subtle radial highlight on card hover to improve visual feedback.
  - **Touch Device Fallbacks**: All magnetic cursor attraction, 3D tilt perspective, and mouse spotlight tracking are explicitly disabled on touch/coarse devices (`@media (pointer: coarse)` / `window.matchMedia('(pointer: fine)').matches === false`).
  - **Reduced Motion Contract**: Each primitive queries `useReducedMotion()`. When active, animations instantly resolve to static resting states without transforms, springs, or blur.

### D-012: SEO Base, Metadata & Robots Configuration
- **Default OG Image**: Standard branded Open Graph card generated via `src/app/opengraph-image.tsx`.
- **Metadata Base & Canonical**: `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://progresseye.com')`. Every page specifies canonical URL derived from this base.
- **Title Template**: `%s | ProgressEye` (default: `ProgressEye — Modern Multi-Tenant School Operating System`).
- **Robots Policy (`src/app/robots.ts`)**:
  - Staging/Preview (`process.env.VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_APP_ENV === 'staging'`): Disallows everything (`Disallow: /`).
  - Production: Allows `/`, disallows private internal routes (`/dev/`, `/api/`). Excluded `/app/*` from robots.
- **Sitemap (`src/app/sitemap.ts`)**: Dynamically indexes all 12 marketing routes. `/pricing` (redirect) and `/login` (auth deferral) are excluded.
- **Structured Data (`src/components/marketing/organization-json-ld.tsx`)**: Renders Schema.org `Organization` metadata reading environment configuration (`TODO-REAL-DATA`). Omit `sameAs` array completely until real verified social handles are provided by the user.

### D-013: `/login` Auth Deferral Stub inside `(marketing)` Group
- **Location**: `src/app/(marketing)/login/page.tsx` so it shares the marketing layout shell.
- **SEO**: Marked `robots: { index: false, follow: false }` (`noindex, nofollow`). Excluded from `sitemap.ts`.
- **Purpose**: Informs visitors that administrative school operating portals and parent logins launch in Phase 14, providing links to Return Home or Request a Demo (`/demo`).

### D-014: Locale Strategy (`next-intl` 4.x + proxy.ts)
- **Strategy**:
  - English (`en`) is served at the root URL paths (`/`, `/features`, etc.).
  - Hindi (`hi`) will be mounted under the `/hi` prefix (e.g., `/hi/features`) via `localePrefix: 'as-needed'` in later phases.
  - `NextIntlClientProvider` is initialized at the root provider with English messages.
- **Coexistence with `proxy.ts`**:
  - In `next.config.ts`, `/api/*` rewrites forward traffic to the NestJS API reading server-only `API_INTERNAL_URL`.
  - Next.js middleware matcher explicitly excludes `/api/*`, `/_next/*`, `/dev/*`, and static files (`favicon.ico`, `robots.txt`, etc.).
  - This ensures API proxying and dev routes bypass internationalization middleware without routing conflicts.

### D-015: Dev-Only Components Showcase (`/dev/components`)
- **Showcase**: Route `/dev/components` showcasing all marketing primitives, navbar states, and footer in light and dark mode.
- **Production Guard**: Employs `if (process.env.NODE_ENV === "production") notFound();` to guarantee it never ships in production. Verified by automated unit test.

### D-016: Zero-Invented-Data & Placeholders Architecture
- **Decision**: All company names, domains, support emails, and social handles are centralized in `src/config/site.ts` reading environment variables (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_SUPPORT_EMAIL`).
- **Markers**: All unconfirmed default values are explicitly tagged `TODO-REAL-DATA`. Real domain and legal company entity will be supplied directly by the project owner.

### D-017: Open Graph Image Constants & Satori Rendering Exemption
- **Decision**: Satori (`@vercel/og`) compiles social cards in an isolated environment without access to DOM stylesheets or CSS custom properties (`var(--...)`). All brand colors used in OG image generation are centralized in `src/config/og-theme.ts`.
- **Linter Exemption**: `src/config/og-theme.ts` is explicitly exempted in `scripts/no-hex-check.mjs`.
- **Brand Typography**: `opengraph-image.tsx` loads self-hosted brand fonts (`Poppins` Bold and `Inter` Regular) from `src/assets/fonts/` into the `ImageResponse` fonts configuration, guaranteeing brand consistency and zero remote network dependencies.

### D-018: Next-Intl 4.x SWC Native Binding Workaround on Windows
- **Decision**: On Windows root drive paths, Next.js 16 with `@swc/core@1.16+` fails DACL ancestor path security checks when `createNextIntlPlugin` attempts to register native SWC compilation bindings.
- **Resolution**: Bypassed `createNextIntlPlugin()` wrapper in `next.config.ts` and directly mapped `'next-intl/config'` to `'./src/i18n/request.ts'` via Turbopack `resolveAlias` and Webpack `config.resolve.alias`. This preserves full NextIntl Server and Client functionality with clean sub-second build times and zero SWC native binary panics.

### D-019: Responsive Navigation Breakpoint & Overflow Safeguard
- **Decision**: To prevent text wrapping of "Sign in" and cutoff of "Get started" in the 768px–1023px tablet range, desktop navigation and action buttons are visible only on `lg:` viewports (>= 1024px). All viewports below 1024px utilize the accessible mobile hamburger drawer.
- **Verification**: Dedicated e2e tests verify `document.documentElement.scrollWidth <= window.innerWidth` across all 13 routes at 360, 768, 1024, 1280, and 1536px viewports.

### D-020: Watermark Responsiveness, Descender Preservation & Footer Data Flags
- **Watermark Sizing**: Sized using fluid CSS `clamp(1.75rem, 8.2vw, 14rem)` with `leading-normal` and `pb-6 px-4`. This ensures the watermark never clips horizontally across 320px to 1536px screens while providing ample room for full descender visibility (`g` and `y` curves remain uncropped and distinct).
- **Hiring Badge Flag**: Configured via `siteConfig.hasOpenRoles` (default `false`). The "We're hiring" badge in navigation and footer remains hidden until active job postings exist.
- **Social Icons Flag**: Configured via `siteConfig.hasConfiguredSocial`. Social icons are completely hidden until real verified profile URLs are configured in environment variables.


