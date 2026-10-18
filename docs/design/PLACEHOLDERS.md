# ProgressEye — Central Registry of Placeholders & Unsourced Claims

> **Status**: Active Living Registry  
> **Rule**: Never invent numbers, customer metrics, legal entity names, pricing, or security claims. Any unverified value rendered in UI or metadata must be tracked here and marked with a `TODO-REAL-DATA` code comment until real production data is supplied by the project owner.

---

## 1. Company, Domain & Contact Metadata

| Item | Code / Config Location | Current Value | Source / Classification | Blocks Public Launch | Resolution Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Legal Entity Name** | `src/config/site.ts` (`siteConfig.name`) | `"ProgressEye Technologies Pvt. Ltd."` | **Invented Placeholder** (`TODO-REAL-DATA`) | **Yes** | Project owner to provide official registered corporate entity name for legal contracts, GST, and footer copyright. |
| **Production Domain** | `src/config/site.ts` (`siteConfig.url`), `docs/design/public-pages-spec.md` | `progresseye.in` (spec) vs `progresseye.com` (code) | **OPEN DECISION** (`TODO-REAL-DATA`) | **Yes** | Project owner to decide canonical domain (`progresseye.in` vs `progresseye.com`) and configure DNS / SSL certificates. |
| **Support Email** | `src/config/site.ts` (`siteConfig.supportEmail`) | `"support@progresseye.com"` | **Invented Placeholder** (`TODO-REAL-DATA`) | **Yes** | Set up real support email inbox, MX records, and helpdesk integration. |
| **Origin Claim / Tagline** | `messages/en.json` (`footer.copyright`), `docs/design/public-pages-spec.md` | `"© {year} ProgressEye Technologies Pvt. Ltd. · Made with care in India."` | Spec editorial default | **No** (Brand copy) | Retained as editorial footer brand tagline once legal entity name is confirmed. |
| **Social Profiles** | `src/config/site.ts` (`siteConfig.social.{twitter,linkedin,github}`) | `""` (Empty string; icons conditionally hidden) | Omitted from UI via `hasConfiguredSocial: false` | **No** (Optional) | Populate only when official corporate profiles exist. |

---

## 2. Marketing Metrics & Quantitative Claims (Phase 6 Tracking)

The following statistics are cited in architectural specifications (`docs/design/DECISIONS.md`) and must be strictly verified against production database queries before publishing in public landing page copy during Phase 6:

| Metric Claim | Context | Verification Status | Blocks Public Launch | Phase 6 Action |
| :--- | :--- | :--- | :--- | :--- |
| **"35+ schools"** | Public customer count | Unverified | **Yes** | Replace with real tenant count or omit until verified. |
| **"14K+ students"** | Public user count | Unverified | **Yes** | Replace with real aggregated student enrollment. |
| **"99% uptime" / "99.9% SLA"** | Service level guarantee | Unverified | **Yes** | Formal SLA terms require verified infrastructure commitments and legal review. |
| **Bangalore Office Address** | Contact / office location | Unverified | **Yes** | Replace with registered principal place of business. |

---

## 3. Stub Feature Cards Below Hero (Removed in Phase 6 CP1)

> **Phase 6 Update**: The three temporary Phase 4 stub cards were removed from `src/app/(marketing)/page.tsx` during Phase 6 CP1 and replaced with the interactive Product Tour and Bento Grid preview sections.

---

## 4. Phase 6 CP1 Planned Features & Mockup Registry

Every capability card and module preview in Phase 6 Checkpoint 1 represents planned functionality and is explicitly labeled with `"Preview of planned features, shown with sample data"` and `"Planned"` badges:

| Module / Card | Component File | Capability Claimed | Verification Status | Blocks Public Launch | Target Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Product Tour: Browser Mockup Domain** | `src/config/site.ts` (`siteConfig.mockDomain`) | Rendered mock domain: `yourschool.example` | Mock preview host | **No** (Mock label) | Phase 6 |
| **Product Tour: Attendance** | `src/components/marketing/tour/product-tour.tsx` | Daily roll call with 30-square grid (`28 / 30 present`, 93% derived) | Unbuilt / Planned | **Yes** | Phase 16 (Attendance Engine) |
| **Product Tour: Fees** | `src/components/marketing/tour/product-tour.tsx` | Fee ledger overview (`₹ 14,82,500 of ₹ 17,00,000`, 87% derived) | Unbuilt / Planned | **Yes** | Phase 17 (Fees & Finance) |
| **Product Tour: Exams** | `src/components/marketing/tour/product-tour.tsx` | Grade distribution & report cards (`53 / 53 graded`, 100% derived) | Unbuilt / Planned | **Yes** | Phase 18 (Exams & Gradebook) |
| **Bento Card: Roles done right** | `src/components/marketing/bento/bento-grid.tsx` | Multi-tenant RBAC interfaces for Admin, Principal, Teacher, Student, Parent | Unbuilt / Planned | **Yes** | Phase 13 (User & Tenancy Admin) |
| **Bento Card: Attendance in one tap** | `src/components/marketing/bento/bento-grid.tsx` | Rapid roll call grid across all sections | Unbuilt / Planned | **Yes** | Phase 16 (Attendance Engine) |
| **Bento Card: Fees that collect themselves** | `src/components/marketing/bento/bento-grid.tsx` | Automated reconciliation and digital receipt generation | Unbuilt / Planned | **Yes** | Phase 17 (Fees & Finance) |
| **Bento Card: Exams & report cards** | `src/components/marketing/bento/bento-grid.tsx` | Multi-subject weightings and printable term cards | Unbuilt / Planned | **Yes** | Phase 18 (Exams & Gradebook) |
| **Bento Card: Communication that lands** | `src/components/marketing/bento/bento-grid.tsx` | Direct broadcast engine to parents via App, SMS, and Email | Unbuilt / Planned | **Yes** | Phase 19 (Parent Comms) |
| **Bento Card: Insights that lead to action** | `src/components/marketing/bento/bento-grid.tsx` | Visual administrative analytics and attendance trendlines | Unbuilt / Planned | **Yes** | Phase 20 (Reports & Dashboards) |

---

## 5. Hero Illustration Sample Data (Purely Illustrative)

The hero carousel scenes render illustrative mockups designed to communicate product capabilities without asserting real school data:

| Scene | Element | Mock Data Rendered | File Reference | Blocks Public Launch | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Scene 2 & 3: Attendance** | Attendance Grid & Cards | 3x4 dot matrix (`#c7d2fe` / `#fde68a`), 4 avatar rows ("Attendance · This week") | `src/components/illustrations/features-scene.tsx`, `feature-detail-scene.tsx` | **No** | Purely decorative / non-real illustrative mockup (`aria-hidden="true"`). |
| **Scene 2 & 3: Fees** | Fees Collection Summary | `"₹ 14,82,500 of ₹ 17,00,000 collected"` | `src/components/illustrations/feature-detail-scene.tsx`, `features-scene.tsx` | **No** | Purely decorative sample currency figures (`aria-hidden="true"`). |
| **Scene 2 & 3: Exams** | Grade Distribution Chart | 5 vertical animated bars: `A+ 12`, `A 18`, `B 14`, `C 7`, `D 2` | `src/components/illustrations/feature-detail-scene.tsx`, `features-scene.tsx` | **No** | Purely decorative distribution sample (`aria-hidden="true"`). |

---

## 6. Client Storage Registry & Privacy Note (Phase 8 Compliance)

The application utilizes browser client-side storage for functional user preferences. These keys are defined centrally in `src/config/storage-keys.ts`:

### Active Storage Keys

1. **`STORAGE_KEYS.HERO_ROTATION_PLAYED` (`"pe_hero_played"`)**:
   - **Storage Type**: `window.sessionStorage`
   - **Value**: `"true"`
   - **Purpose**: Records whether the hero carousel completed its 3-cycle rotation limit (9 slide transitions) or was manually replayed in the current tab session.
   - **Behavior**:
     - When set, return visits within the same browser session initialize the carousel directly in the paused/stopped state (`isAutoStopped = true`), preventing repetitive auto-rotation motion.
     - Preserved across manual tap replay so refreshing the page mid-replay does not trigger a full auto-play sequence.
     - Scoped strictly to the browser tab lifecycle (`sessionStorage`), clearing automatically when the tab is closed.
   - **Blocks Public Launch**: **No**.
   - **Phase 8 Privacy & Cookie Notice Classification**:
     - **Category**: Strictly Functional / Essential Session Preference.
     - **Exemption**: Exempt from consent banners under ePrivacy / GDPR / DPDP guidelines as it stores zero personal identifiable information (PII), transmits no telemetry, and exists solely to fulfill user-requested motion reduction and state continuity.
