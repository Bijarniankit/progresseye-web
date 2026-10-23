# Phase 6 Technical & Maintenance Backlog

Deferred maintenance chores and dependency upgrades scheduled for execution at the start of Phase 6:

1. **pnpm packageManager**: Unify pnpm version in `package.json` (`packageManager: pnpm@12.11.2`), commit updated `pnpm-lock.yaml` with `packageManagerDependencies`, and remove hardcoded `version:` in CI `pnpm/action-setup` (PR #11 opened).
2. **dependabot.yml**: Add grouped weekly minor/patch updates and ignore semver-major bumps for core framework/tooling packages across both repositories (PR in progress).
3. **Actions v7 upgrades**: Bump and cryptographically pin `actions/checkout@v7.0.1`, `actions/setup-node@v7.1.0`, and `actions/upload-artifact@v7.0.2` in both workflow files (Completed: web PRs #1–#3 merged, api PRs #1–#3 merged).
4. **@types/node 24**: Upgrade `@types/node` in `progresseye-web` to `^24.x.x` matching the Node 24 runtime used in CI, `.nvmrc`, and Docker (closed Dependabot PR #7 for major v26; major ignored in `dependabot.yml`).
5. **Prisma 7**: Upgrade `prisma` CLI and `@prisma/client` from 6.19.3 to 7.x.x in `progresseye-api` in an isolated PR with migration verification (closed Dependabot PR #8; major ignored in `dependabot.yml`).
6. **TypeScript 6**: Upgrade `typescript` to 6.x in `progresseye-api` once compatible across NestJS and tooling (closed Dependabot PR #4; major ignored in `dependabot.yml`).
7. **Jest 30**: Upgrade `jest` and `@types/jest` to 30.x in `progresseye-api` once ts-jest / NestJS testing ecosystem stabilizes (closed Dependabot PR #7; major ignored in `dependabot.yml`).
8. **git identity**: Configure official `user.name` and `user.email` locally across both repositories per owner specification.
9. **branch protection**: Verify and enforce GitHub branch protection rules (`Linux Verification (ubuntu-latest)`, branch up to date, no force push/deletions) on `main` for both repos.

---

## Phase 6 Follow-ups & Technical Debt (Recorded Post-Approval)

### 1. Phase 10: Interleaved A/B Lighthouse & Real Staging Measurements
- **Investigation Scope**: Conduct interleaved A/B Lighthouse measurement runs (alternating old commit vs new PR head in identical browser sessions on a quiet machine) to pinpoint and explain the Total Blocking Time (TBT) difference observed during Phase 6 testing (median 328 ms on CP3 early commit vs 633 ms on final PR head).
- **LCP Floor & CSS/Font Optimization**: Benchmark analysis in Phase 7 revealed that even with zero route-specific client JS (100% Server Component), throttled mobile LCP has a lower bound of ~2.0 s due to render-blocking stylesheet weight and font preloading/swapping. In Phase 10 staging, investigate:
  - Font preload pruning: evaluate which display font weights can be subsetted or deferred without triggering FOUT or CLS.
  - Critical CSS extraction / inlining: measure if critical path CSS optimization reduces FCP/LCP under mobile throttling.
- **Staging Verification**: Re-measure all landing page performance gates on a real staging infrastructure environment:
  - Real mobile hardware devices.
  - HTTP/2 or HTTP/3 multiplexing with active SSL/TLS edge termination.
  - Production CDN caching and Brotli compression headers enabled.

### 2. Production Bundle Analysis & Hero Idle-Mounted Scenes Blocking Time
- **Real Bundle Analyzer**: Run formal webpack / turbopack bundle analysis via `@next/bundle-analyzer` or `next experimental-analyze` instead of heuristic chunk inspection.
- **Accurate Chunk Mapping**: Replace heuristic / inferred chunk labels in documentation with exact source-mapped module allocations.
- **Hero Idle Scenes Evaluation**: Quantify whether the hero carousel scenes 1 & 2 (`FeaturesScene`, `FeatureDetailScene`), which are deferred and mounted during browser idle (`requestIdleCallback` / fallback 1500 ms timeout), contribute any blocking time, style recalcs, or long tasks during background execution.

### 3. Hero Scene Component & Illustration Clarification
- **Scene 0 Identity**: The initial hero scene (`currentSlide === 0`, mounted synchronously on first paint) is the **Heritage Indian School Scene** (`SchoolScene`), previously referred to informally in benchmark notes as "DashboardScene".
- **Illustration Files**:
  - `src/components/illustrations/school-scene.tsx` (`SchoolScene`): Heritage school building ("ProgressEye Public School", banyan tree, playground, sun, clouds, birds, Indian flag, school bus).
  - `src/components/illustrations/features-scene.tsx` (`FeaturesScene`): Attendance, fees, exams quick cards.
  - `src/components/illustrations/feature-detail-scene.tsx` (`FeatureDetailScene`): Attendance 3x4 dot matrix, fees collection progress bar, exams grade distribution bars.
  - `src/components/illustrations/index.ts`: Barrel export.

### 4. Placeholders Still Blocking Public Launch (Central Summary from `PLACEHOLDERS.md`)
The following unverified claims and planned placeholders in `docs/design/PLACEHOLDERS.md` strictly block commercial public launch until real data, verified infrastructure commitments, or phase features are completed:
- **Corporate & Infrastructure Metadata**:
  - Legal Entity Name (`src/config/site.ts`: `siteConfig.name` — currently `"ProgressEye Technologies Pvt. Ltd."`).
  - Production Canonical Domain (`src/config/site.ts`: `siteConfig.url` — decision pending `progresseye.in` vs `progresseye.com`).
  - Official Support Email (`src/config/site.ts`: `siteConfig.supportEmail` — currently `"support@progresseye.com"`).
- **Public Quantitative Marketing Claims**:
  - Customer count: `"35+ schools"` (requires verified active tenant count).
  - User count: `"14K+ students"` (requires verified database aggregation).
  - SLA commitments: `"99% uptime"` / `"99.9% SLA"` (requires verified production infrastructure SLA & legal review).
  - Principal Office Address: Bangalore office location (requires official registered place of business).
- **Planned Product Tour Capabilities**:
  - Attendance Engine: Daily roll call & guardian notifications (Phase 16).
  - Fees & Finance: Online fee collection, UPI-first, receipts, due notices (Phase 17).
  - Exams & Gradebook: Configurable grading scales & report cards (Phase 18).
- **Planned Bento Grid Modules**:
  - Student & staff records (Phase 15).
  - Quick daily attendance (Phase 16).
  - Fees that collect themselves (Phase 17).
  - Exams & report cards (Phase 18).
  - Communication via SMS and email (Phase 19).
  - Actionable insights & reporting (Phase 20).
- **Why ProgressEye Section Claims**:
  - Speed: Sub-second render goals (Phase 14).
  - Privacy: Tenant isolation with Row-Level Security (Phase 13).
  - Everywhere: Universal browser and mobile accessibility (Phase 14).
  - India: Rupee/lakh formatting & Hindi localization (Phase 15).
- **Pricing Commercial Model Placeholders**:
  - Starter Tier Cap: 100 students (`studentLimit: 100`).
  - School Tier Commercial Rates: ₹25 / student / month annual, ₹30 / student / month monthly.
  - Commercial Plan Bullets: All 15 tier feature bullets currently marked `status: planned`.
- **Public FAQ & CTA Claims**:
  - Payment handling, boards alignment, and DPDP privacy notice (`DRAFT-NEEDS-LEGAL-REVIEW`).
  - Commercial terms: "Free Starter tier forever", "No credit card required", "Cancel anytime".

---

## Phase 10: Critical Launch Blockers & Performance Architecture

### 1. Lead Capture Inability (Launch Blocker)
- **Issue**: Every "Book a free demo" and "Contact our team" path across marketing pages currently routes to stubs (`/demo`) or disconnected client-side form notices (`/contact`). The website currently cannot capture, persist, or notify the sales/support team of inbound school leads.
- **Resolution Target**: Phase 9 (Inquiry & Lead Capture Integration), where API lead capture endpoints and notification webhooks are wired.

### 2. Shared Layout Bundle Weight & Client Component Splitting
- **Issue**: Every marketing route ships ~208 kB gzip of shared JavaScript across 13 chunks despite pages having 0 B of route-specific client JS (Server Components).
- **Action Plan**:
  - Perform a formal, source-mapped bundle analysis (replacing heuristic/guessed chunk labels with exact package sizes from `@next/bundle-analyzer`).
  - Evaluate code-splitting and dynamic `next/dynamic` lazy-loading for non-critical shared layout islands, particularly the mobile navigation drawer (`MobileDrawer`) and theme provider hydration, so above-the-fold first paint downloads only critical navigation primitives.

### 3. Shared Chunk Analysis: `05cxy9p-13hw1.js` (hypothesis, verify with the bundle analyzer in Phase 10)
- **Working Hypothesis**: Emitted by Turbopack as the dynamic import wrapper and runtime client router manifest for `ContactFormIsland` (`import("@/components/marketing/contact/contact-form")`).
- **Importer / Shared Scope**: Presumed imported and registered by the Next.js App Router client runtime manifest across the shared `(marketing)` layout group, causing the dynamic loader wrapper (~860 B gzip) to load on sibling routes `/about` and `/faq` while the actual form island (`1bgt61xj1asfv.js`, ~2.4 kB gzip) remains strictly isolated to `/contact`.
- **Phase 10 Verification Requirement**: Confirm or refute this attribution in Phase 10 using `@next/bundle-analyzer` and source-mapped production output rather than heuristic chunk inspection. The exact identity and module breakdown of that chunk (and its variant `2l7vuh3_s87_z.js`, ~859 B gzip) remains unresolved pending formal Phase 10 bundle analysis.

### 4. Client Dynamic Island Screenshot Verification (Hydration Timing Note)
- **Observation**: Contact screenshots previously exhibited identical byte sizes across re-captures despite placeholder copy changes because headless browser capture ran before dynamic island hydration completed, capturing the static loading skeleton rather than the mounted form inputs.
- **Verification Requirement**: Ensure all automated screenshot routines explicitly wait for client-hydrated form elements (e.g. `#contact-school`) to reach the visible state before taking screenshots, rather than relying solely on `networkidle`.

### 5. Post-Pilot i18n Migration (Hindi / Vernacular Languages)
- **Problem & Blocker**: Public marketing pages (`/features`, `/get-started`, `/demo`, `/careers`, `/about`, `/faq`, `/contact`, and legal routes) define their copy inside typed TypeScript configuration files (`src/config/*.ts`) and server component templates rather than `messages/en.json`. While `messages/en.json` contains shared shell, navigation, and footer strings, the core marketing copy is not in translation files. This architectural choice blocks adding Hindi (`hi`) or regional Indian languages until a structured migration is executed.
- **Action Plan**:
  - Following the school pilot launch, migrate marketing copy from `src/config/*.ts` into namespaced `next-intl` message bundles (`messages/en.json`, `messages/hi.json`).
  - Enforce compile-time type safety over translation keys via `next-intl` type generation.
  - Retain typed configs for structural metadata (routes, icon keys, numeric pricing constants) while delegating user-facing text to message catalogs.

### 6. Demo Form Data Minimisation Review (Pre-Wiring / Phase 9)
- **Problem**: The prototype demo form (`/demo`) currently accepts 7 inputs: name, email, phone number, school name, city/state, student capacity, and preferred time.
- **Action Plan**: Prior to wiring backend API lead capture endpoints in Phase 9, perform a statutory data minimisation review under DPDP guidelines. Determine whether phone, city/state, capacity, and timing selections can be pruned or deferred to post-inquiry communication, reducing initial collection scope to essential contact data.

### 7. /careers LCP 2.35 s Investigation (Phase 10)
- **Problem**: `/careers` is a 100% Server Component with 0 B route-specific client JS, yet exhibits mobile LCP around ~2.35 s under mobile throttling.
- **Root Cause & Action Plan**: Telemetry identifies the LCP element as the zero-vacancy empty-state paragraph (`<p class="text-sm text-text-muted leading-relaxed max-w-md mx-auto">`) with an Element Render Delay of ~2,355 ms waiting for font swapping (`font-display: swap`) and render-blocking CSS layout. In Phase 10 staging, benchmark critical path CSS inlining and font subset preloading to reduce throttled render delay.

### 8. Phase 10 Automated Launch-Readiness CI Build Check & Domain Verification
- **Build Guard**: Implement an automated build/CI check that fails the build if rendered HTML contains `"TODO-REAL-DATA"` or the legal draft banner (`LegalDraftBanner` / `DRAFT-NEEDS-LEGAL-REVIEW`) while a launch flag is active (e.g. `NEXT_PUBLIC_LAUNCH_READY=true`).
- **Domain Constant**: Re-verify that the canonical domain constant in `src/config/site.ts` (`siteConfig.url`) is final (`progresseye.in` vs `progresseye.com`) and that all metadata, OpenGraph, sitemap, and robots configurations resolve to the final production URL.
