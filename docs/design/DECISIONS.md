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

### D-018: Next-Intl 4.x Platform-Split Architecture (Official Plugin on Linux/CI, Native Alias on Windows)
- **Problem**: When `createNextIntlPlugin` runs on Windows, `@swc/core@1.16+` validates directory DACL permissions up to the drive root (`C:\` / `E:\`). Default Windows NTFS drive roots grant replacement rights (`0x1301bf`) to Authenticated Users (`SID S-1-5-11`). SWC rejects native binary loading with the following error:
  ```
  Error: Failed to load native binding
  [cause]: [
    Error: SWC native addon: user cache failed: validate cache root C:\Users\...\AppData\Local\swc: cache ancestor C:\: DACL grants replacement rights 0x1301bf to SID S-1-5-11; fallback cache failed: validate cache root C:\Users\...\.swc-cache: cache ancestor C:\: DACL grants replacement rights 0x1301bf to SID S-1-5-11; set SWC_NATIVE_BINDING_CACHE to a safe absolute directory owned by your user whose ancestors do not grant other users replacement rights.
    code: 'ERR_SWC_NATIVE_CACHE'
  ]
  ```
- **Platform-Split Implementation**:
  - **Linux / CI / Docker (`process.platform !== "win32"`)**: Dynamically invokes the official `createNextIntlPlugin("./src/i18n/request.ts")` wrapper, ensuring 100% adherence to next-intl's standard setup on Linux-based continuous integration and production containers.
  - **Windows (`process.platform === "win32"`)**: Configures the exact equivalent Turbopack (`resolveAlias: { "next-intl/config": "./src/i18n/request.ts" }`) and Webpack (`config.resolve.alias["next-intl/config"] = path.resolve("./src/i18n/request.ts")`) configurations without invoking SWC's native binding validator.

### D-019: Responsive Navigation Breakpoint & Overflow Safeguard
- **Decision**: To prevent text wrapping of "Sign in" and cutoff of "Get started" in the 768px–1023px tablet range, desktop navigation and action buttons are visible only on `lg:` viewports (>= 1024px). All viewports below 1024px utilize the accessible mobile hamburger drawer.
- **Verification**: Dedicated e2e tests verify `document.documentElement.scrollWidth <= window.innerWidth` across all 13 routes at 360, 768, 1024, 1280, and 1536px viewports.

### D-020: Watermark Responsiveness, Descender Preservation & Footer Data Flags
- **Watermark Sizing**: Sized using fluid CSS `clamp(1.75rem, 8.2vw, 14rem)` with `leading-normal` and `pb-6 px-4`. This ensures the watermark never clips horizontally across 320px to 1536px screens while providing ample room for full descender visibility (`g` and `y` curves remain uncropped and distinct).
- **Hiring Badge Flag**: Configured via `siteConfig.hasOpenRoles` (default `false`). The "We're hiring" badge in navigation and footer remains hidden until active job postings exist.
- **Social Icons Flag**: Configured via `siteConfig.hasConfiguredSocial`. Social icons are completely hidden until real verified profile URLs are configured in environment variables.

### D-021: LCP Optimization, WordReveal Initial State & No-JS Fallback
- **LCP Root Cause**: In `WordReveal`, the animated token component previously initialized with `opacity: 0` and `filter: blur(8px)`. Under Lighthouse mobile CPU throttling, Chrome ignored the element until opacity > 0, delaying LCP candidate paint until animation completion (~3.6s–4.0s).
- **Resolution**:
  - Removed `opacity: 0` and blur from `initial`. Tokens maintain full opacity (`1`) constantly.
  - Aligned SSR HTML structure and CSS classes (`overflow-hidden`, `mr-[0.22em]`, `align-bottom`) identically with hydrated client tokens, preventing DOM layout recalculations.
  - Client animation transforms only `y: "100%" -> "0%"` after hydration.
  - Added Playwright test with `javaScriptEnabled: false` verifying that hero `h1` and subtitle `p` are visible in static SSR HTML.
- **5-Run Mobile Lighthouse Results (Production Build)**:
  - **Light Mode Median**: Performance **90**, LCP **3.6s** (Lantern simulated) / **2.5s** (DevTools throttled), FCP **771ms**, TBT **34ms**, CLS **0**.
  - **Dark Mode Median**: Performance **90**, LCP **3.7s** (Lantern simulated) / **2.5s** (DevTools throttled), FCP **777ms**, TBT **58ms**, CLS **0**.
  - **Observed Unthrottled**: FCP **199ms**, LCP **199ms**, CLS **0**.

### D-022: Font Licensing (SIL Open Font License 1.1)
- **Decision**: Added official SIL Open Font License 1.1 documentation to `src/assets/fonts/OFL.txt` covering self-hosted `Inter` (The Inter Project Authors) and `Poppins` (Indian Type Foundry) fonts used across marketing pages and Open Graph images.

### D-024: Unified Dark Surface (#020617)
- **Decision**: Unify hero section, body canvas, and footer dark backgrounds to a single cohesive dark surface token: `--color-surface-hero: #020617` (matching `--color-surface: #020617` and `--color-surface-footer: #020617`).
- **Rationale**: Eliminates noticeable slate-navy (#0F172A) vs slate-950 (#020617) boundary seams between the fixed navbar, hero, page body, and footer, creating an immersive, unified dark aesthetic across all marketing routes. Elevated cards continue to use `#0F172A` / `#1E293B` for visual hierarchy.

### D-025: Above-The-Fold Display Font Preload Optimization
- **Decision**: In `src/app/layout.tsx`, split `next/font/google` font preloading so only the critical above-the-fold display weights are preloaded in `<head>`:
  - `Inter` (body font, variable, `preload: true`)
  - `Poppins` 800 normal (primary headline display tier, `preload: true`)
  - `Poppins` 500 italic (editorial tagline accent, `preload: true`)
- **Deferred Display Weights**:
  - `Poppins` 600, 700 normal (`preload: false`, mapped to `--font-display-deferred`). Loaded asynchronously for below-the-fold cards and badges.
- **Performance Impact**: Reduces critical preloaded font count from 5 to 3 files (saving ~38% preload weight), minimizing network contention during initial FCP/LCP rendering.
- **Superseded By**: D-026.

### D-026: Reversal of D-025 & Preloading All Above-The-Fold Brand Display Fonts
- **Context**: In Phase 5 review, visual inspection revealed that the fixed navigation wordmark directly renders in `font-bold` (Poppins 700), and the hero primary/secondary CTA action buttons render in `font-semibold` (Poppins 600).
- **Problem**: Deferring weights 600 and 700 caused visible font flash (FOUT) on the navbar brand text and CTA buttons upon initial viewport render.
- **Resolution**: Reversed D-025 to preload all required above-the-fold display font weights in `src/app/layout.tsx`:
  - `Poppins` 800 normal (`font-extrabold` in hero h1)
  - `Poppins` 700 normal (`font-bold` in navbar wordmark)
  - `Poppins` 600 normal (`font-semibold` in CTA buttons)
  - `Poppins` 500 italic (`font-medium italic` in tagline)
  - `Inter` (body copy)
- **Outcome**: Completely eliminates font flash and visual layout shift (CLS = 0.000) while maintaining fast LCP (2.0s throttled / 0.30s observed).

### D-027: Removal of Procedural feTurbulence Filter Overlay & Replacement with GPU Radial Washes
- **Context**: `public-pages-spec.md` originally specified an atmospheric noise overlay using an inline SVG `<filter>` with `<feTurbulence>` and CSS `mix-blend-mode: overlay`.
- **Problem**: In performance benchmarks under mobile CPU throttling, live `<feTurbulence>` procedural noise calculations coupled with 64px Gaussian blurs forced CPU-bound rasterization passes on every paint. This caused an LCP regression (observed LCP increased to 1.62s and TBT rose to 157ms).
- **Resolution**: Removed the CPU-intensive `feTurbulence` procedural filter overlay and heavy `blur-3xl` passes from `HeroSection`. Replaced with lightweight, GPU-composited CSS `radial-gradient` ambient washes (`var(--color-peach-wash)` and `var(--color-mint-wash)`).
- **Outcome**: TBT dropped from 157ms to 35–52ms; observed LCP dropped to 0.30s–0.33s; DevTools throttled LCP achieved 2.0s, passing the $\le$ 2.5s exit gate.
### D-028: Hero Plate Breakpoint Sizing & Overlapping Crossfade Architecture
- **Plate Sizing Across Breakpoints (Initial Implementation)**:
  - `360px` (Mobile Portrait): `328px` diameter (100% of container: 360px viewport minus 32px padding).
  - `768px` (Tablet Portrait): `460px` diameter (`max-w-[460px]` spec maximum).
  - `1024px` (Laptop / Tablet Landscape): `381px` diameter (constrained by 12-column grid 5-column slot at 1024px breakpoint: 960px container minus 352px grid gaps, 5 columns = 381.33px).
  - `1280px` (Desktop Spec Baseline): `460px` diameter (`max-w-[460px]` spec maximum fully restored).
  - `1536px` (Ultra-Wide Desktop): `460px` diameter (`max-w-[460px]` spec maximum).
- **Overlapping Crossfade Animation Architecture**:
  - Replaced sequential `mode="wait"` exit transitions with concurrent absolute overlapping crossfades (`AnimatePresence initial={false}` with `<m.div className="absolute inset-0 ...">`).
  - The outgoing scene fades out while the incoming scene simultaneously fades and scales in, ensuring the circular illustrative plate is never blank or empty during transitions.
  - Transition CLS measured via `PerformanceObserver` across all 3 slides is 0.0000.

### D-029: Removal of Carousel Controls, WCAG 2.2.2 Deviation Acceptance & Expanded Plate Dimensions
- **Removal of Carousel Controls**:
  - The carousel navigation toolbar, previous/next buttons, slide indicator dots, and explicit play/pause button were removed entirely per product direction.
  - Scenes auto-rotate on a 5.2s interval with a 320ms overlapping crossfade.
- **Plate Becomes Purely Decorative**:
  - Marked `aria-hidden="true"` and `data-testid="hero-plate-container"`.
  - Removed all ARIA carousel semantics (`aria-roledescription="carousel"`, `role="group"`, `aria-roledescription="slide"`, `aria-live`, and slide title wiring).
  - Screen readers perceive the hero as a clean editorial column (headline, subtitle, CTAs) with zero decorative distraction.
- **User-Accepted Deviation from WCAG 2.2.2 (Level A - Pause, Stop, Hide)**:
  - WCAG 2.2.2 requires an explicit user mechanism to pause, stop, or hide moving/auto-updating content lasting > 5 seconds.
  - The project owner explicitly approved omitting a visible pause button in favor of a minimalist aesthetic.
- **Formal Pause State Machine Specification**:
  - **Inputs / Events Monitored**: `pointerenter`, `pointerleave`, `pointerdown`, `pointerup`, `pointercancel`, `click`, 15-second safety timer, `visibilitychange`, `IntersectionObserver`, and `prefers-reduced-motion`.
  - **Compound Pause Condition**:
    `isPaused = Boolean(shouldReduceMotion) || isHovered || isPointerHeld || isTapped || !isInView || !isTabVisible`
  - **State Transitions**:
    1. **Hover (`isHovered`)**:
       - `pointerenter` over plate container sets `isHovered = true` (pauses interval and sets `animationPlayState = "paused"`).
       - `pointerleave` sets `isHovered = false` and `isPointerHeld = false`. If `isTapped === false`, rotation resumes.
    2. **Pointer Down / Touch-and-Hold (`isPointerHeld`)**:
       - `pointerdown` sets `isPointerHeld = true` immediately upon contact.
       - `pointerup` or `pointercancel` sets `isPointerHeld = false`.
    3. **Tap / Mouse-Click Toggle (`isTapped`)**:
       - `click` toggles `isTapped = !isTapped`.
       - When transitioning to `true`: Clears any existing timeout and arms a 15,000ms safety timeout (`tapTimeoutRef`).
       - When transitioning to `false`: Clears the timeout immediately and resumes rotation (provided not hovered or held).
    4. **15-Second Safety Auto-Resume Timeout**:
       - After 15 seconds without user interaction, the timeout fires and resets `isTapped = false`, restoring rotation.
       - Verified with Playwright virtual clock test (`page.clock.fastForward(15000)`).
    5. **Pointer Leave While Tap-Paused**:
       - If a user clicks the plate with a mouse (setting `isTapped = true`) and moves the cursor away, `onPointerLeave` clears `isHovered`, but `isTapped` remains `true`. The plate remains paused until either clicked again or the 15-second timeout elapses.
    6. **Tab Visibility (`isTabVisible`)**:
       - `document.hidden === true` sets `isTabVisible = false` (pausing rotation during background tab execution). Resumes on tab foreground.
    7. **Off-Screen Intersection (`isInView`)**:
       - `IntersectionObserver` with 0.1 threshold pauses rotation when hero scrolls out of view and resumes when re-entering.
    8. **Reduced Motion (`shouldReduceMotion`)**:
       - Under `prefers-reduced-motion: reduce`, rotation and all motion are permanently disabled; Scene 1 renders statically.
- **Rotation Limit Policy Decision (Pending User Selection)**:
  - Options under review:
    - `[A]` Infinite auto-rotation loop protected by the 6 motion safeguards.
    - `[B]` Auto-stop after 3 complete cycles (9 slide transitions total, ~47 seconds runtime), permanently settling on Scene 1.
    - `[C]` Auto-stop after 1 complete cycle (3 slide transitions total, ~16 seconds runtime), permanently settling on Scene 1.
  - The chosen option will be permanently codified here once selected by the user.
- **Removal of 44px Controls Slot & Vertical Centering**:
  - The 44px reserved controls container below the plate was removed.
  - The circular plate is vertically centered directly against the left headline column via CSS grid `items-center`.
- **Expanded Responsive Plate Dimensions**:
  - `360px` (Mobile Portrait): `328px` diameter (100% of container width minus 32px gutters).
  - `768px` (Tablet Portrait): `500px` diameter (`md:max-w-[500px]`, up from 460px).
  - `1024px` (Laptop / Landscape): `430px` diameter (`lg:max-w-[430px]`, accommodated by adjusting the grid column split to `lg:col-span-6 / lg:col-span-6`, providing 464px column width).
  - `1280px` (Desktop Baseline): `520px` diameter (`xl:max-w-[520px]`, up from 460px).
  - `1536px` (Ultra-Wide Desktop): `520px` diameter (`xl:max-w-[520px]`).
  - Sizing remains 100.0% identical between JavaScript-enabled and JavaScript-disabled states across all breakpoints.
- **8% Artwork Scaling in Scenes 1 & 2**:
  - Vector artwork inside Scene 1 (`SchoolScene`) and Scene 2 (`FeaturesScene`) is scaled up by 8% (`transform="translate(-16 -16) scale(1.08)"`) to eliminate empty margin while preserving padding and zero clipping.
  - Scene 3 (`FeatureDetailScene`) remains unscaled to prevent card clipping.

