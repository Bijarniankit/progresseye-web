# ProgressEye 2.0 — Design Tokens System (tokens.md)

This document specifies the design tokens architecture, token taxonomy, responsive scales, and governance rules for ProgressEye 2.0.

---

## 1. Architecture: Two-Layer Token Model

ProgressEye follows a strict **Two-Layer Token Architecture**:

```
┌────────────────────────────────────────────────────────┐
│  Layer 1: Raw Palette Tokens (Prism/Primitive Tier)    │
│  - Raw mathematical scales (Brand 50-950, Slate 50-950)│
│  - Physical values (hex / hsl / px / cubic-bezier)     │
│  - NEVER imported or referenced directly in UI code    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Layer 2: Semantic Tokens (Application / Intent Tier)  │
│  - Intent-driven roles (surface, text, border, brand)  │
│  - Adaptive: changes value automatically per theme     │
│  - EXCLUSIVELY consumed by components and pages        │
└────────────────────────────────────────────────────────┘
```

### Governance Rule: Zero Raw Hex in UI Components
- **Rule**: All UI components (`src/components/ui/`, `src/components/marketing/`, `src/app/`) MUST consume Layer 2 semantic CSS variables or their Tailwind utility mappings.
- **Enforcement**: Automated CI script `scripts/no-hex-check.mjs` scans all JSX/TSX components and blocks any commit containing hardcoded hex color codes (`#...`), with a single documented whitelist for complex multi-stop vector illustrations (`src/components/illustrations/**`).

---

## 2. Color Tokens

### 2.1 Layer 1: Primitive Palette
- **Brand Scale**: Royal Blue `#2563EB` centered palette (`brand-50` through `brand-950`).
- **Slate Scale**: Balanced neutral ramp (`slate-50` through `slate-950`).
- **Accent Washes**:
  - Warm Peach Wash: `#FDEEE9` (`--palette-peach-wash`)
  - Fresh Mint Wash: `#E6F4EA` (`--palette-mint-wash`)
- **Status Ramps**: Success (`#16A34A`), Warning (`#D97706`), Danger (`#DC2626`), Info (`#2563EB`).

### 2.2 Layer 2: Semantic Tokens (Light & Dark Mode)

| Semantic Token | Light Mode Target | Dark Mode Target | Semantic Role / Intent |
|---|---|---|---|
| `--color-surface` | `#FAFAFA` (Slate 50) | `#020617` (Slate 950) | Primary canvas background |
| `--color-surface-hero` | `#FAF6EC` (Cream 50) | `#020617` (Slate 950) | Landing hero canvas surface |
| `--color-surface-footer` | `#FBF6EB` (Cream 100) | `#020617` (Slate 950) | Marketing footer background |
| `--color-hero-heading` | `#1E1B4B` (Indigo 900) | `#F8FAFC` (Slate 50) | Hero editorial headline h1 text |
| `--color-hero-tagline` | `#3730A3` (Indigo 700) | `#A5B4FC` (Indigo 300) | Hero italic tagline text accent |
| `--color-hero-play-disc`| `#4338CA` (Indigo 700) | `#4F46E5` (Indigo 600) | Product tour secondary CTA play disc |
| `--color-hero-plate-border`| `rgba(99,102,241,0.4)` | `rgba(99,102,241,0.35)` | Hero circular carousel plate dashed border |
| `--color-hero-plate-bg`| `linear-gradient(...)` | `linear-gradient(...)` | Hero circular carousel plate backdrop |
| `--color-hero-carousel-dot`| `#3730A3` (Indigo 700) | `#818CF8` (Indigo 400) | Hero carousel active indicator pill/dot |
| `--color-hero-carousel-dot-inactive`| `rgba(99,102,241,0.25)` | `rgba(129,140,248,0.25)` | Hero carousel inactive indicator dot |
| `--color-hero-carousel-control-bg`| `rgba(255,255,255,0.85)` | `rgba(30,41,59,0.85)` | Hero carousel floating control background |
| `--color-hero-carousel-control-border`| `rgba(99,102,241,0.2)` | `rgba(99,102,241,0.35)` | Hero carousel floating control border |
| `--color-hero-carousel-control-text`| `#1E1B4B` (Indigo 900) | `#F8FAFC` (Slate 50) | Hero carousel control icon text |
| `--color-surface-subtle` | `#F1F5F9` (Slate 100) | `#0F172A` (Slate 900) | Muted badges, secondary sections |
| `--color-surface-card` | `#FFFFFF` | `#1E293B` (Slate 800) | Card backgrounds, elevated panels |
| `--color-surface-contrast`| `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Tooltips, high-contrast banners |
| `--color-text` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Primary heading and body copy |
| `--color-text-muted` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Captions, secondary labels |
| `--color-text-inverse` | `#FFFFFF` | `#0F172A` (Slate 900) | Text over brand/dark surfaces |
| `--color-border` | `#E2E8F0` (Slate 200) | `#334155` (Slate 700) | Dividers, hair-line card borders |
| `--color-border-focus` | `#2563EB` (Brand 600) | `#60A5FA` (Brand 400) | Accessible keyboard focus outline |
| `--color-brand` | `#2563EB` (Brand 600) | `#3B82F6` (Brand 500) | Primary brand CTA buttons and badges |
| `--color-brand-hover` | `#1D4ED8` (Brand 700) | `#60A5FA` (Brand 400) | Primary button hover state |
| `--color-brand-foreground`| `#FFFFFF` | `#FFFFFF` | Text on brand action buttons |
| `--color-peach-wash` | `#FDEEE9` | `rgba(253, 238, 233, 0.12)` | Marketing hero warm backdrop |
| `--color-mint-wash` | `#E6F4EA` | `rgba(230, 244, 234, 0.12)` | Growth / verified stat backdrop |
| `--color-status-success` | `#16A34A` | `#22C55E` | Positive status indicator |
| `--color-status-warning` | `#D97706` | `#F59E0B` | Pending status indicator |
| `--color-status-danger` | `#DC2626` | `#EF4444` | Destructive status indicator |
| `--color-status-info` | `#2563EB` | `#3B82F6` | Informational status indicator |

---

## 3. Typography Scale & Hierarchy

ProgressEye uses two fonts via `next/font/google`:
- **Display & Headings**: `Poppins` (500, 600, 700, 800 + italic) mapped to `--font-display`.
- **Interface & Body**: `Inter` (variable) mapped to `--font-sans`.

| Role | Token | Font Family | Size / Clamp | Weight | Line Height |
|---|---|---|---|---|---|
| **Hero Display Tier** | `--text-display-hero` | Poppins | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` (40px–72px) | 800 | 0.96 |
| **Page-Hero Display Tier** | `--text-display-page` | Poppins | `clamp(1.75rem, 3.5vw + 0.5rem, 4rem)` (28px–64px) | 800 | 0.96 |
| **H1 (Hero Heading)** | `--text-h1` | Poppins | `2.25rem` (36px) | 700 | 1.15 |
| **H2 (Section Heading)** | `--text-h2` | Poppins | `1.5rem` (24px) | 600 | 1.2 |
| **H3 (Sub-section)** | `--text-h3` | Poppins | `1.5rem` (24px) | 600 | 1.3 |
| **H4 (Card Title)**| `--text-h4` | Poppins | `1.125rem` (18px) | 600 | 1.35 |
| **H5 (Widget Title)**| `--text-h5` | Poppins | `1rem` (16px) | 500 | 1.4 |
| **H6 (Sub-title)** | `--text-h6` | Poppins | `0.9375rem` (15px) | 500 | 1.4 |
| **Body Large** | `--text-body-lg` | Inter | `1.125rem` (18px) | 400 | 1.6 |
| **Body (Default)** | `--text-body` | Inter | `1rem` (16px) | 400 | 1.5 |
| **Small / Helper** | `--text-small` | Inter | `0.875rem` (14px) | 400 | 1.45 |
| **Caption / Tiny** | `--text-caption` | Inter | `0.75rem` (12px) | 500 | 1.4 |

---

## 4. Spacing Scale (4px Baseline Rhythm)

| Token | Pixels | Rem Equivalent | Use Case |
|---|---|---|---|
| `--space-1` | 4px | 0.25rem | Hairline margins, badge inner padding |
| `--space-2` | 8px | 0.5rem | Button inner spacing, chip gaps |
| `--space-3` | 12px | 0.75rem | Compact form field spacing |
| `--space-4` | 16px | 1rem | Standard card internal padding |
| `--space-5` | 20px | 1.25rem | Medium component grouping |
| `--space-6` | 24px | 1.5rem | Standard card padding |
| `--space-8` | 32px | 2rem | Grid column gutters |
| `--space-10`| 40px | 2.5rem | Section sub-group spacing |
| `--space-12`| 48px | 3rem | Section padding on mobile |
| `--space-16`| 64px | 4rem | Section padding on desktop |
| `--space-20`| 80px | 5rem | Hero padding |
| `--space-24`| 96px | 6rem | Major page boundary |
| `--space-32`| 128px| 8rem | Massive hero / splash padding |

---

## 5. Elevation & Shadow Tokens

All shadows use multi-layered ambient and penumbra blur coordinates to avoid harsh gray borders:

- **`--shadow-e1`**: `0 1px 2px 0 rgb(0 0 0 / 0.05)` — Resting cards, subtle borders.
- **`--shadow-e2`**: `0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)` — Dropdowns, hover elevations.
- **`--shadow-e3`**: `0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)` — Popovers, sticky headers.
- **`--shadow-e4`**: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.08)` — Modals, slide-out sheets.

---

## 6. Motion & Timing Tokens

All animations adhere to `prefers-reduced-motion` guidelines.

- **Easings**:
  - `--ease-out-spring`: `cubic-bezier(0.16, 1, 0.3, 1)` — Interactive bounces, drawer reveals.
  - `--ease-in-out-smooth`: `cubic-bezier(0.4, 0, 0.2, 1)` — Crossfades, dimension morphs.
  - `--ease-out-decelerate`: `cubic-bezier(0, 0, 0.2, 1)` — Entrances.
  - `--ease-in-accelerate`: `cubic-bezier(0.4, 0, 1, 1)` — Exits.
- **Durations**:
  - `--duration-fast`: `150ms` — Hover, tooltips, micro-interactions.
  - `--duration-normal`: `250ms` — Dropdowns, tabs, accordions.
  - `--duration-slow`: `400ms` — Modal entrances, drawers.
  - `--duration-deliberate`: `600ms` — Hero vector transitions.

---

## 7. Border Radius Tokens

- `--radius-xs`: `4px`
- `--radius-sm`: `6px`
- `--radius-md`: `8px`
- `--radius-lg`: `12px`
- `--radius-xl`: `16px`
- `--radius-full`: `9999px`

---

## 8. Showcase & Inspection

ProgressEye provides a live interactive showcase route at `/dev/tokens`:
- Displays all swatches with contrast labels.
- Live motion and easing tester.
- Interactive primitive component sandbox (Buttons, Dialog, Sheet, Select, Checkbox, Tabs, Accordion, Tooltip, Toast).
- Strict production guard: returns `404 Not Found` if `process.env.NODE_ENV === "production"`.
