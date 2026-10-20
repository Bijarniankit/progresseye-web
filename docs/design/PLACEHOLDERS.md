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
| **Product Tour: Attendance** | `src/components/marketing/tour/product-tour.tsx` | "Planned: take attendance from a phone or desktop and notify guardians of absences." | Unbuilt / Planned | **Yes** | Phase 16 (Attendance Engine) |
| **Product Tour: Fees** | `src/components/marketing/tour/product-tour.tsx` | "Planned: collect fees online (UPI first) with receipts and due reminders." | Unbuilt / Planned | **Yes** | Phase 17 (Fees & Finance) |
| **Product Tour: Exams** | `src/components/marketing/tour/product-tour.tsx` | "Planned: configurable grading scales and report cards." | Unbuilt / Planned | **Yes** | Phase 18 (Exams & Gradebook) |
| **Bento Card: Student & staff records** | `src/components/marketing/bento/bento-grid.tsx` | "Planned: unified student directory and staff profiles with role-based access." | Unbuilt / Planned | **Yes** | Phase 15 (Student & Staff Directory) |
| **Bento Card: Quick daily attendance** | `src/components/marketing/bento/bento-grid.tsx` | "Planned: take attendance from phone or desktop and notify guardians of absences." | Unbuilt / Planned | **Yes** | Phase 16 (Attendance Engine) |
| **Bento Card: Fees that collect themselves** | `src/components/marketing/bento/bento-grid.tsx` | "Planned: collect fees online (UPI first) with receipts and due reminders." | Unbuilt / Planned | **Yes** | Phase 17 (Fees & Finance) |
| **Bento Card: Exams & report cards** | `src/components/marketing/bento/bento-grid.tsx` | "Planned: configurable grading scales, term weightings, and printable report cards." | Unbuilt / Planned | **Yes** | Phase 18 (Exams & Gradebook) |
| **Bento Card: Communication that lands** | `src/components/marketing/bento/bento-grid.tsx` | "Planned: broadcast notices to parents and staff via SMS and email." | Unbuilt / Planned | **Yes** | Phase 19 (Parent Comms) |
| **Bento Card: Insights that lead to action** | `src/components/marketing/bento/bento-grid.tsx` | "Planned: visual overview of attendance patterns, fee collection, and academic progress." | Unbuilt / Planned | **Yes** | Phase 20 (Reports & Dashboards) |

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

---

## 7. Phase 6 CP2 Why Rows & Pricing Placeholders

| Item / Row | Component File / Config | Capability / Value Claimed | Verification Status | Blocks Public Launch | Target Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Why: Speed** | `src/components/marketing/why/why-section.tsx` | "Designed to stay quick on slow connections." | Design goal / target specification | **Yes** | Phase 14 (App Shell Performance) |
| **Why: Privacy** | `src/components/marketing/why/why-section.tsx` | "Each school's data is kept separate by design." | Target architecture (RLS isolation) | **Yes** | Phase 13 (Multi-tenant RLS) |
| **Why: Everywhere** | `src/components/marketing/why/why-section.tsx` | "Works in any modern browser on desktop, tablet and phone. Nothing to install." | Responsive web standard | **Yes** | Phase 14 (App Shell UX) |
| **Why: India** | `src/components/marketing/why/why-section.tsx` | "Built around Indian schools: rupee and lakh/crore formatting. English now, Hindi planned." | Localization roadmap (Hindi planned) | **Yes** | Phase 15 (Localization Engine) |
| **Pricing: Starter Student Limit** | `src/config/pricing.ts` (`studentLimit: 100`) | `100` students free tier cap | **Invented Placeholder** (`TODO-REAL-DATA`) | **Yes** | Phase 8 (Commercial Sign-off) |
| **Pricing: School Tier Annual Price** | `src/config/pricing.ts` (`annualPricePerStudent: 25`) | `₹25 / student / month` (Save 17% derived) | **Commercial Target** (`TODO-REAL-DATA`) | **Yes** | Phase 8 (Pricing Sign-off) |
| **Pricing: School Tier Monthly Price** | `src/config/pricing.ts` (`monthlyPricePerStudent: 30`) | `₹30 / student / month` | **Commercial Target** (`TODO-REAL-DATA`) | **Yes** | Phase 8 (Pricing Sign-off) |
| **Pricing: Starter Bullet 1** | `src/config/pricing.ts` | Daily attendance roll call | Planned scope (`status: planned`) | **Yes** | Phase 16 (Attendance Engine) |
| **Pricing: Starter Bullet 2** | `src/config/pricing.ts` | Fee recording | Planned scope (`status: planned`) | **Yes** | Phase 17 (Fees & Finance) |
| **Pricing: Starter Bullet 3** | `src/config/pricing.ts` | Student & parent directory | Planned scope (`status: planned`) | **Yes** | Phase 13 (User Management) |
| **Pricing: Starter Bullet 4** | `src/config/pricing.ts` | Notice board & announcements | Planned scope (`status: planned`) | **Yes** | Phase 19 (Comms) |
| **Pricing: Starter Bullet 5** | `src/config/pricing.ts` | Staff web portal | Planned scope (`status: planned`) | **Yes** | Phase 14 (App Shell) |
| **Pricing: School Bullet 1** | `src/config/pricing.ts` | Daily attendance & alerts | Planned scope (`status: planned`) | **Yes** | Phase 16 (Attendance Engine) |
| **Pricing: School Bullet 2** | `src/config/pricing.ts` | Automated fee collection & receipts | Planned scope (`status: planned`) | **Yes** | Phase 17 (Fees & Finance) |
| **Pricing: School Bullet 3** | `src/config/pricing.ts` | Exams, grading & report cards | Planned scope (`status: planned`) | **Yes** | Phase 18 (Exams & Gradebook) |
| **Pricing: School Bullet 4** | `src/config/pricing.ts` | Staff & teacher accounts | Planned scope (`status: planned`) | **Yes** | Phase 13 (User Management) |
| **Pricing: School Bullet 5** | `src/config/pricing.ts` | Parent communication portal | Planned scope (`status: planned`) | **Yes** | Phase 19 (Parent Comms) |
| **Pricing: District Bullet 1** | `src/config/pricing.ts` | Multi-campus aggregated analytics | Planned scope (`status: planned`) | **Yes** | Phase 20 (Reports & Dashboards) |
| **Pricing: District Bullet 2** | `src/config/pricing.ts` | Centralized group finance & fee roll-up | Planned scope (`status: planned`) | **Yes** | Phase 17 (Multi-Campus Finance) |
| **Pricing: District Bullet 3** | `src/config/pricing.ts` | Custom SIS & board integrations | Planned scope (`status: planned`) | **Yes** | Phase 21 (Integrations) |
| **Pricing: District Bullet 4** | `src/config/pricing.ts` | Dedicated onboarding & support | Planned scope (`status: planned`) | **Yes** | Phase 8 (Support Contracts) |
| **Pricing: District Bullet 5** | `src/config/pricing.ts` | On-site teacher & staff training | Planned scope (`status: planned`) | **Yes** | Phase 8 (Professional Services) |

---

## 8. Phase 6 CP3 FAQ & Final CTA Placeholders
| Item / Claim | Component File / Config | Capability / Claim Description | Verification Status | Blocks Public Launch | Target Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FAQ: UPI & Net Banking** | `src/config/faq.ts` (`payments-upi`) | Planned: collect fees online (UPI first) with digital receipts and pending dues notices | `DRAFT-CONTENT-REVIEW` (`status: planned`) | **Yes** | Phase 18 (Fees & Finance) |
| **FAQ: CBSE/ICSE/State Boards** | `src/config/faq.ts` (`academics-boards`) | Planned: configurable grading scales and report cards designed to align with board requirements | `DRAFT-CONTENT-REVIEW` (`status: planned`) | **Yes** | Phase 17 (Exams & Gradebook) |
| **FAQ: DPDP Privacy Compliance** | `src/config/faq.ts` (`privacy-dpdp`) | Planned: each school's records are designed to be kept separate from other schools'. We are building our data handling with India's Digital Personal Data Protection Act in mind; details will be published before launch. | `DRAFT-NEEDS-LEGAL-REVIEW` (`status: planned`) | **Yes** | Phase 13 (Multi-tenant RLS) |
| **FAQ: Zero Installation** | `src/config/faq.ts` (`platform-install`) | Responsive web application with nothing to install | `DRAFT-CONTENT-REVIEW` | **No** (Design goal) | Phase 14 (App Shell) |
| **FAQ: Roster Migration & Import** | `src/config/faq.ts` (`onboarding-timeline`) | Planned: structured spreadsheet templates and assisted data import workflows for rosters | `DRAFT-CONTENT-REVIEW` (`status: planned`) | **Yes** | Phase 8 (Pilot Launch) |
| **FAQ: Staff & Teacher Training** | `src/config/faq.ts` (`onboarding-training`) | Planned: guided orientation walkthroughs, role-specific documentation, and live setup support | `DRAFT-CONTENT-REVIEW` (`status: planned`) | **Yes** | Phase 8 (Support & Training) |
| **Pricing / CTA: Free Starter Tier Forever** | `src/config/pricing.ts` / `PLACEHOLDERS.md` | Free Starter tier forever up to 100 students | Planned commercial model (`TODO-REAL-DATA`) | **Yes** | Phase 8 (Commercial Sign-off) |
| **Final CTA: Indian Schools Focus** | `src/components/marketing/cta/cta-section.tsx` | "Designed for Indian schools" | Product architectural orientation | **No** (Core focus) | Phase 15 (Localization) |
| **Final CTA: No Credit Card Required** | `src/components/marketing/cta/cta-section.tsx` | "No credit card required" | Planned commercial signup term (`TODO-REAL-DATA`) | **Yes** | Phase 8 (Commercial Sign-off) |
| **Final CTA: Cancel Anytime** | `src/components/marketing/cta/cta-section.tsx` | "Cancel anytime" | Planned commercial subscription term (`TODO-REAL-DATA`) | **Yes** | Phase 8 (Commercial Sign-off) |



