# ProgressEye Public Pages — Complete Design & Graphics Specification

> **Purpose**: This design document contains the complete visual system, layout hierarchies, color codes, typography scales, motion physics, interactive mock widgets, and **raw vector SVG code** for all public marketing pages of **ProgressEye** (**Landing**, **Contact**, **About**, **FAQ**, and **Features**).
> 
> Use this document to replicate the public pages **ditto (1:1 pixel-perfect)** in any modern web framework (React 19, Next.js 15/16, Tailwind CSS v3/v4, Framer Motion).

---

## Table of Contents

1. [Global Design System Foundations](#1-global-design-system-foundations)
   - [Color Palettes & Semantic Roles](#color-palettes--semantic-roles)
   - [Typography System & Responsive Classes](#typography-system--responsive-classes)
   - [Surfaces, Textures, and Noise](#surfaces-textures-and-noise)
   - [Motion Physics & Keyframes (`PAGE_STYLES`)](#motion-physics--keyframes-page_styles)
   - [Shared Micro-Interaction Components](#shared-micro-interaction-components)
2. [Global Navigation & Layout](#2-global-navigation--layout)
   - [PublicNavbar Specification](#publicnavbar-specification)
   - [Footer Specification (Pastel & Watermark)](#footer-specification-pastel--watermark)
3. [Landing Page (`/`) Design Specification](#3-landing-page--design-specification)
   - [Hero: School Split Carousel & SVG Illustrations](#hero-school-split-carousel--svg-illustrations)
     - [Scene 1: SchoolScene (SVG Vector & Animation)](#scene-1-schoolscene-svg-vector--animation)
     - [Scene 2: FeaturesScene (Orbital Hub & 4 Mini Cards)](#scene-2-featuresscene-orbital-hub--4-mini-cards)
     - [Scene 3: FeatureDetailScene (3 Tilted Live Metric Cards)](#scene-3-featuredetailscene-3-tilted-live-metric-cards)
   - [Product Tour: Interactive Tabbed Workspace](#product-tour-interactive-tabbed-workspace)
   - [Features Bento Grid with Spotlight Effects](#features-bento-grid-with-spotlight-effects)
   - [Why ProgressEye Section (Sticky Split)](#why-progresseye-section-sticky-split)
   - [Pricing Section (Annual/Monthly Toggle & Spotlight Cards)](#pricing-section-annualmonthly-toggle--spotlight-cards)
   - [FAQ Accordion Section](#faq-accordion-section)
   - [Final CTA (Ambient Glow & Orbiting Particles)](#final-cta-ambient-glow--orbiting-particles)
4. [Contact Page (`/contact`) Design Specification](#4-contact-page-contact-design-specification)
   - [Hero: Speech Bubble Pair (Animated Vector)](#hero-speech-bubble-pair-animated-vector)
   - [Channel Cards Grid](#channel-cards-grid)
   - [Split Form & Context Card](#split-form--context-card)
   - [Bottom FAQ Teaser Card](#bottom-faq-teaser-card)
5. [About Page (`/about`) Design Specification](#5-about-page-about-design-specification)
   - [Hero: Manifesto Wall with Ink Swoosh](#hero-manifesto-wall-with-ink-swoosh)
   - [Animated Easing Stats Strip](#animated-easing-stats-strip)
   - [Our Story: Giant Numbered Milestone Cards](#our-story-giant-numbered-milestone-cards)
   - [Vision & Mission 3D Tilt Cards](#vision--mission-3d-tilt-cards)
   - [Values Grid with Cursor Spotlight](#values-grid-with-cursor-spotlight)
   - [Comparison Table: Legacy ERP vs. ProgressEye](#comparison-table-legacy-erp-vs-progresseye)
   - [Principles Strip & Final CTA](#principles-strip--final-cta)
6. [FAQ Page (`/faq`) Design Specification](#6-faq-page-faq-design-specification)
   - [Hero: Giant Watermark '?' & Floating Question Marks](#hero-giant-watermark--floating-question-marks)
   - [Search Input & Animated Category Pills](#search-input--animated-category-pills)
   - [Categorized Accordion List & Empty State](#categorized-accordion-list--empty-state)
   - [Direct Help CTA Card](#direct-help-cta-card)
7. [Features Page (`/features`) Design Specification](#7-features-page-features-design-specification)
   - [Hero: Floating 24-Verb Word Cloud](#hero-floating-24-verb-word-cloud)
   - [8-Module Overview Catalog](#8-module-overview-catalog)
   - [Alternating Deep-Dive Sections with Live Widgets](#alternating-deep-dive-sections-with-live-widgets)
   - [Trust & Reliability Grid](#trust--reliability-grid)
   - [School Inquiry Form & Final CTA](#school-inquiry-form--final-cta)
8. [Quick Replication Checklist for Next.js / React](#8-quick-replication-checklist-for-nextjs--react)

---

## 1. Global Design System Foundations

### Color Palettes & Semantic Roles

The design pairs **high-contrast editorial typography** with **warm cream/stone backgrounds**, **deep royal indigo tones**, and **modern translucent glassmorphic surfaces**.

#### Primary Brand Colors (Indigo / Royal Blue)
| Token | Hex Code | Purpose / Usage |
|---|---|---|
| `brand-950` / `#1e1b4b` | `#1e1b4b` | Deep dark hero text, dark card backgrounds, primary buttons |
| `brand-900` / `#3730a3` | `#3730a3` | Italic hero tagline accents, dark borders |
| `brand-700` / `#4338ca` | `#4338ca` | Primary badge text, active SVG fills, illustration accents |
| `brand-600` / `#2563eb` / `#1d4ed8` | `#2563eb` | Main interactive blue, button hover state, logo dot |
| `brand-500` / `#3b82f6` | `#3b82f6` | Pulsing badges, active toggles, highlighted text |
| `brand-400` / `#60a5fa` | `#60a5fa` | Secondary highlights, dark mode active dots |
| `brand-200` / `#c7d2fe` | `#c7d2fe` | SVG connectors, attendance cell fills |
| `brand-100` / `#e0e7ff` | `#e0e7ff` | Subtle illustration fills, progress bar tracks |
| `brand-50`  / `#eff6ff` | `#eff6ff` | Light badge backgrounds |

#### Background Warm Pastels (Signature Visual Signature)
| Token / Hex | Context / Component | Details |
|---|---|---|
| `#FAF6EC` | **Landing Page Hero Background** | Warm antique cream giving an editorial print aesthetic |
| `#FBF6EB` | **Footer Background** | Warm parchment cream with subtle radial dot pattern |
| `#FED7AA` | Footer Warm Wash (top-left) | Soft peach ambient blur blob (`opacity: 0.45, blur-3xl`) |
| `#A7F3D0` | Footer Cool Wash (bottom-right) | Soft mint ambient blur blob (`opacity: 0.35, blur-3xl`) |
| `#F59E0B` | Amber / Gold Accent | Rupee coin fill, warning badges, logo corner dot |
| `#C2410C` | Terracotta / Burnt Orange | Footer subheading accent & newsletter eyebrow |
| `#1c1917` / `#0a0a0a` | Charcoal / Black | Final CTA cards, dark cards, logo backgrounds |

#### Dark Mode Palette
- Background: `#0a0a0a` / `#171717` (`neutral-950` / `neutral-900`)
- Cards: `bg-neutral-900` with `border-neutral-800`
- Text: Primary `#ffffff`, secondary `#a3a3a3` (`neutral-400`), muted `#737373` (`neutral-500`)

---

### Typography System & Responsive Classes

ProgressEye utilizes a two-tier typography pairing loaded via Google Fonts:
1. **Display Font**: `Poppins` (`font-weight: 600, 700, 800`) — Headings, brand logos, stat counters, and numbers.
2. **Body / Interface Font**: `Inter` (`font-weight: 400, 500, 600`) — Body copy, navigation links, table rows, form inputs.

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap");
```

#### Standardized Responsive Typography Classes
The application enforces strict typography classes across all public pages:

| Class | Mobile (<480px) | Tablet (768px+) | Desktop (1024px+) | Line Height | Usage |
|---|---|---|---|---|---|
| `.fs-h1` | 24px (`1.5rem`) | 30px (`1.875rem`) | 36px (`2.25rem`) | 1.1–1.2 | Page & main section headings |
| `.fs-h2` | 18px (`1.125rem`) | 20px (`1.25rem`) | 24px (`1.5rem`) | 1.25 | Sub-section headings |
| `.fs-h3` | 18px (`1.125rem`) | 20px (`1.25rem`) | 24px (`1.5rem`) | 1.3 | Card titles, modal titles |
| `.fs-h4` | 16px (`1rem`) | 16px (`1rem`) | 18px (`1.125rem`) | 1.35 | Sub-feature headings, quote leads |
| `.fs-h5` | 16px (`1rem`) | 16px (`1rem`) | 16px (`1rem`) | 1.4 | Accordion headers, small titles |
| `.fs-h6` | 15px (`0.9375rem`)| 15px | 15px | 1.4 | Minor section subtitles |
| `.fs-body` | 16px (`1rem`) | 16px | 16px | 1.6 | Standard paragraph body text |
| `.fs-small`| 14px (`0.875rem`)| 14px | 14px | 1.5 | Captions, card body, table cells |
| `.fs-tiny` | 12px (`0.75rem`) | 12px | 12px | 1.4 | Badges, tags, status pills, uppercase eyebrows |

*Note: All inputs (`input`, `select`, `textarea`) have `font-size: 16px !important;` to eliminate unwanted iOS Safari zooming.*

---

### Surfaces, Textures, and Noise

#### 1. Paper Grid Texture (`.pe-paper`)
Used as the default backdrop on hero sections:
```css
.pe-paper {
  background-color: #ffffff;
  background-image: radial-gradient(circle at 1px 1px, rgba(10, 10, 10, 0.05) 1px, transparent 0);
  background-size: 24px 24px;
}
.dark .pe-paper {
  background-color: #0a0a0a;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
}
```

#### 2. Subtle SVG Noise Overlay (Hero Grain)
```jsx
<div
  aria-hidden
  className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.04] mix-blend-overlay"
  style={{
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  }}
/>
```

#### 3. Ambient Color Washes
Soft radial blur blobs behind content:
- Indigo blob: `w-2xl h-168 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl`
- Amber blob: `w-xl h-144 rounded-full bg-amber-100/50 dark:bg-amber-900/10 blur-3xl`

---

### Motion Physics & Keyframes (`PAGE_STYLES`)

Add this standard style block to all marketing pages:
```css
@keyframes pe-pulse-ring {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes pe-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.pe-pulse-ring {
  position: absolute; inset: 0; border-radius: 9999px;
  border: 2px solid currentColor;
  animation: pe-pulse-ring 2.2s ease-out infinite;
}
.pe-cursor {
  display: inline-block;
  width: 2px; height: 1em;
  background: currentColor;
  vertical-align: -0.12em;
  margin-left: 2px;
  animation: pe-blink 1s steps(2) infinite;
}
```

---

### Shared Micro-Interaction Components

#### `WordReveal` Component
Staggered reveal where each word slides up from `y: 110%` with a blur dissolve (`filter: blur(8px) -> blur(0px)`):
```jsx
export const WordReveal = ({ text, className = '', delay = 0, highlight = false }) => {
  const words = text.split(' ');
  return (
    <span className={`inline-block ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
          <motion.span
            initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block ${highlight ? 'text-blue-700 dark:text-blue-400' : ''}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
```

#### `MagneticButton` Component
Button that gently tracks the user's cursor within its boundary using spring physics:
```jsx
export const MagneticButton = ({ children, className = '', strength = 0.3, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

#### `TiltCard` Component
Adds subtle 3D perspective pitch and yaw (`rotateX`, `rotateY`) on mouse move:
```jsx
export const TiltCard = ({ children, className = '', max = 5 }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

#### `useSpotlight` Hook
Injects dynamic `--mx` and `--my` CSS custom variables to render a cursor-following radial spotlight over cards:
```jsx
export const useSpotlight = () => {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return { ref, onMouseMove };
};
```

---

## 2. Global Navigation & Layout

### PublicNavbar Specification

#### Visual Anatomy
1. **Fixed Header**: Height `h-16 md:h-20`, `fixed top-0 inset-x-0 z-40`.
2. **Scroll State (`scrollY > 8`)**:
   - Scrolled: `bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/70 dark:border-neutral-800/70`
   - Unscrolled: `bg-transparent border-b border-transparent`
3. **Logo**:
   - Square `w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white`
   - Letter `P`: `font-display font-extrabold text-white dark:text-neutral-900 text-lg`
   - Corner Dot: `w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-neutral-50 dark:ring-neutral-950 absolute -bottom-1 -right-1`
   - Brand Wordmark: `font-display font-bold text-neutral-900 dark:text-white text-lg tracking-tight`
4. **Desktop Navigation Links**:
   - Items: `Home` (`/`), `Features` (`/features`), `Pricing` (`/get-started`), `FAQ` (`/faq`), `About` (`/about`), `Contact` (`/contact`)
   - Active state has a spring floating pill behind it: `<motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800/80 -z-10" />`
5. **Right CTAs**:
   - "Sign in" link (`/login`)
   - "Get started" button (`/get-started`): `rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold px-4 py-2 hover:bg-blue-700`
6. **Mobile Drawer**: Animated toggle with `FiMenu` / `FiX`, full overlay sliding downwards (`y: -8 -> 0`).

---

### Footer Specification (Pastel & Watermark)

#### Visual Anatomy
1. **Background**: Warm cream `#FBF6EB`, `relative overflow-hidden text-stone-800`.
2. **Ambient Pastel Washes**:
   - Peach Wash: `-top-40 -left-40 w-176 h-176 rounded-full blur-3xl bg-[#FED7AA] opacity-45`
   - Mint Wash: `-bottom-40 -right-40 w-160 h-160 rounded-full blur-3xl bg-[#A7F3D0] opacity-35`
3. **Dot Pattern**: `radial-gradient(circle at 1px 1px, rgba(28,25,23,0.65) 1px, transparent 0)`, `backgroundSize: '28px 28px'`, `opacity: 0.06`.
4. **Oversized Watermark**:
   - Text: `"ProgressEye"`
   - Typography: `font-display font-extrabold leading-[0.85] text-stone-900`
   - Size: `clamp(4rem, 15vw, 17rem)`
   - Opacity: `0.06`
   - Position: Centered horizontally behind bottom content.
5. **Brand Block**:
   - Heading: `"The school workspace"` in `font-display fs-h4 text-stone-900`
   - Subheading: `"that runs itself."` in `font-display fs-h4 italic text-[#C2410C]`
   - Bio: "From morning attendance to term-end reports, every routine task that used to mean paperwork now takes a single tap..."
6. **Newsletter Pill Form**:
   - Container: `rounded-full border border-[#E7E5E4] bg-white/70 backdrop-blur-sm p-1 pl-5`
   - Button: `rounded-full bg-[#FED7AA] text-stone-900 font-bold px-4 py-2 hover:brightness-95`
7. **Link Columns**:
   - `Product`: Features (`/features`), Pricing (`/get-started`), Book a demo (`/demo`), FAQ (`/faq`)
   - `Company`: About (`/about`), Careers (`/careers` with pill `"We're hiring"`), Contact (`/contact`)
   - `Legal`: Privacy (`/privacy`), Terms (`/terms`), Cookies (`/cookies`), GDPR (`/gdpr`)
8. **Bottom Strip**:
   - `© {year} ProgressEye Technologies Pvt. Ltd. · Made with care in India.`
   - Social Icons: Twitter, LinkedIn, Instagram, GitHub (`FiTwitter`, `FiLinkedin`, `FiInstagram`, `FiGithub`).

---

## 3. Landing Page (`/`) Design Specification

### Hero: School Split Carousel & SVG Illustrations

#### Left Column (Editorial Typography)
- Background: `#FAF6EC` (Cream)
- Headline:
  ```jsx
  <h1 className="font-display leading-none tracking-tight text-[#1e1b4b] dark:text-white text-[clamp(40px,5.5vw,72px)] mb-6">
    <span className="block font-extrabold">
      <WordReveal text="The school workspace" />
    </span>
    <motion.span className="block font-medium italic text-[#3730a3] dark:text-indigo-300 mt-1 pr-2">
      that runs itself.
    </motion.span>
  </h1>
  ```
- Subtitle: *"An advanced, end-to-end school management platform built for Indian schools — attendance, fees, exams, communication, all in one calm screen."* (`text-[16px] lg:text-[18px] text-neutral-700`)
- CTAs:
  - Primary: "Book a free demo" (`/demo`) — dark button (`#1e1b4b`), with upward slide overlay (`bg-indigo-700`)
  - Secondary: "Watch product tour" (`/features`) — glassmorphic pill with `FiPlay` button in purple disc
- Circular Plate Carousel:
  - Aspect square container with circular plate: `rounded-full bg-linear-to-br from-indigo-100 via-[#FAF6EC] to-amber-50`
  - Orbiting dashed border: `border border-dashed border-indigo-300/50`, rotating 360° continuously over 80 seconds.
  - Cycle Interval: Auto-crossfades every `5200ms` between 3 scenes.

---

#### Scene 1: SchoolScene (SVG Vector & Animation)

Vector illustration of an Indian heritage school building with clock tower, sun, clouds, tree, books, and flying papers.

```svg
<svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
  <defs>
    <linearGradient id="sch-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#e0e7ff" />
      <stop offset="100%" stop-color="#FAF6EC" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="sch-bldg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e0e7ff" />
    </linearGradient>
  </defs>

  <!-- Floating Indigo Sun / Halo -->
  <g class="animate-pulse">
    <circle cx="310" cy="100" r="34" fill="#4338ca" opacity="0.92" />
    <circle cx="310" cy="100" r="44" fill="#4338ca" opacity="0.15" />
    <circle cx="310" cy="100" r="58" fill="#4338ca" opacity="0.06" />
  </g>

  <!-- Sky Backing -->
  <rect x="60" y="80" width="280" height="200" fill="url(#sch-sky)" opacity="0.5" />

  <!-- Animated Tree -->
  <g style="transform-origin: 120px 280px">
    <rect x="116" y="260" width="8" height="50" fill="#1e1b4b" />
    <circle cx="120" cy="240" r="34" fill="#6366f1" opacity="0.85" />
    <circle cx="100" cy="248" r="22" fill="#818cf8" opacity="0.85" />
    <circle cx="140" cy="248" r="22" fill="#818cf8" opacity="0.85" />
    <circle cx="120" cy="220" r="20" fill="#a5b4fc" opacity="0.85" />
  </g>

  <!-- Ground Line -->
  <line x1="40" y1="310" x2="360" y2="310" stroke="#1e1b4b" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />

  <!-- School Main Building -->
  <g>
    <!-- Roof pediment -->
    <polygon points="200,130 290,180 110,180" fill="#1e1b4b" />
    <rect x="195" y="100" width="10" height="40" fill="#1e1b4b" />
    <circle cx="200" cy="98" r="5" fill="#f59e0b" />

    <!-- Building facade -->
    <rect x="120" y="180" width="160" height="130" fill="url(#sch-bldg)" stroke="#1e1b4b" stroke-width="2" />

    <!-- Building pillars (5 pillars) -->
    <rect x="137" y="200" width="6" height="100" fill="#1e1b4b" opacity="0.85" />
    <rect x="172" y="200" width="6" height="100" fill="#1e1b4b" opacity="0.85" />
    <rect x="207" y="200" width="6" height="100" fill="#1e1b4b" opacity="0.85" />
    <rect x="242" y="200" width="6" height="100" fill="#1e1b4b" opacity="0.85" />
    <rect x="277" y="200" width="6" height="100" fill="#1e1b4b" opacity="0.85" />

    <!-- Lintel and base plinth -->
    <rect x="125" y="194" width="150" height="6" fill="#1e1b4b" />
    <rect x="125" y="300" width="150" height="8" fill="#1e1b4b" />

    <!-- Arch Door -->
    <rect x="186" y="245" width="28" height="55" fill="#1e1b4b" />
    <rect x="190" y="249" width="20" height="48" fill="#4338ca" opacity="0.6" />

    <!-- Pediment Clock -->
    <circle cx="200" cy="155" r="9" fill="#ffffff" stroke="#4338ca" stroke-width="1.6" />
    <line x1="200" y1="155" x2="200" y2="149" stroke="#4338ca" stroke-width="1.4" stroke-linecap="round" />
    <line x1="200" y1="155" x2="204" y2="155" stroke="#4338ca" stroke-width="1.4" stroke-linecap="round" />
  </g>

  <!-- Stack of Books (left ground) -->
  <g>
    <rect x="60" y="296" width="40" height="6" rx="1" fill="#4338ca" />
    <rect x="56" y="302" width="48" height="6" rx="1" fill="#818cf8" />
    <rect x="62" y="308" width="44" height="6" rx="1" fill="#3730a3" />
  </g>

  <!-- Floating Exam Sheet (right) -->
  <g transform="rotate(-10 320 250)">
    <rect x="300" y="240" width="40" height="48" rx="2" fill="#ffffff" stroke="#1e1b4b" stroke-width="1.2" />
    <circle cx="320" cy="252" r="3" fill="#f59e0b" />
    <line x1="306" y1="262" x2="334" y2="262" stroke="#a5b4fc" stroke-width="1.4" stroke-linecap="round" />
    <line x1="306" y1="270" x2="328" y2="270" stroke="#a5b4fc" stroke-width="1.4" stroke-linecap="round" />
  </g>
</svg>
```

---

#### Scene 2: FeaturesScene (Orbital Hub & 4 Mini Cards)

Central ProgressEye emblem with dashed connector lines leading to 4 satellite feature cards:

```svg
<svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
  <defs>
    <radialGradient id="feat-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4338ca" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#4338ca" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="feat-core" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#3730a3" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
  </defs>

  <circle cx="200" cy="200" r="120" fill="url(#feat-halo)" />
  <circle cx="200" cy="200" r="118" fill="none" stroke="#a5b4fc" stroke-width="1.3" stroke-dasharray="2 6" opacity="0.7" />

  <!-- 4 Connectors -->
  <line x1="200" y1="200" x2="200" y2="90" stroke="#c7d2fe" stroke-width="1.4" stroke-dasharray="2 4" />
  <line x1="200" y1="200" x2="310" y2="200" stroke="#c7d2fe" stroke-width="1.4" stroke-dasharray="2 4" />
  <line x1="200" y1="200" x2="200" y2="310" stroke="#c7d2fe" stroke-width="1.4" stroke-dasharray="2 4" />
  <line x1="200" y1="200" x2="90" y2="200" stroke="#c7d2fe" stroke-width="1.4" stroke-dasharray="2 4" />

  <!-- Center ProgressEye Eye Core -->
  <circle cx="200" cy="200" r="50" fill="url(#feat-core)" />
  <ellipse cx="200" cy="200" rx="22" ry="13" fill="none" stroke="#ffffff" stroke-width="2.4" />
  <circle cx="200" cy="200" r="6" fill="#f59e0b" />
  <circle cx="202" cy="198" r="1.6" fill="#ffffff" />

  <!-- TOP CARD: Attendance Grid -->
  <g>
    <rect x="155" y="40" width="90" height="68" rx="10" fill="#ffffff" stroke="#1e1b4b" stroke-width="2" />
    <rect x="155" y="40" width="90" height="14" rx="10" fill="#1e1b4b" />
    <text x="200" y="51" text-anchor="middle" font-size="7.5" font-weight="700" fill="#ffffff" font-family="Inter, system-ui" letter-spacing="0.12em">ATTENDANCE</text>
    <!-- 3 rows x 4 cols of attendance dots (absent dots in #fde68a, present in #c7d2fe) -->
  </g>

  <!-- RIGHT CARD: Fees Rupee Coin -->
  <g>
    <rect x="276" y="166" width="68" height="68" rx="12" fill="#ffffff" stroke="#1e1b4b" stroke-width="2" />
    <circle cx="310" cy="195" r="18" fill="#f59e0b" stroke="#1e1b4b" stroke-width="2" />
    <text x="310" y="200" text-anchor="middle" font-size="16" font-weight="800" fill="#1e1b4b" font-family="Inter, system-ui">₹</text>
    <text x="310" y="225" text-anchor="middle" font-size="7.5" font-weight="700" fill="#1e1b4b" font-family="Inter, system-ui" letter-spacing="0.12em">FEES</text>
  </g>

  <!-- BOTTOM CARD: Exam Grade Pills -->
  <g>
    <rect x="155" y="290" width="90" height="60" rx="10" fill="#ffffff" stroke="#1e1b4b" stroke-width="2" />
    <text x="200" y="306" text-anchor="middle" font-size="7.5" font-weight="700" fill="#1e1b4b" font-family="Inter, system-ui" letter-spacing="0.12em">EXAMS</text>
    <!-- Pills: A+ (#1e1b4b), A (#c7d2fe), B (#c7d2fe), C (#fde68a) -->
  </g>

  <!-- LEFT CARD: Comms Chat Bubble -->
  <g>
    <rect x="56" y="166" width="68" height="68" rx="12" fill="#ffffff" stroke="#1e1b4b" stroke-width="2" />
    <path d="M 70 184 Q 70 178 76 178 L 110 178 Q 116 178 116 184 L 116 202 Q 116 208 110 208 L 86 208 L 78 216 L 80 208 L 76 208 Q 70 208 70 202 Z" fill="#4338ca" stroke="#1e1b4b" stroke-width="1.6" />
    <circle cx="82" cy="193" r="2" fill="#ffffff" />
    <circle cx="93" cy="193" r="2" fill="#ffffff" />
    <circle cx="104" cy="193" r="2" fill="#f59e0b" />
    <text x="90" y="225" text-anchor="middle" font-size="7.5" font-weight="700" fill="#1e1b4b" font-family="Inter, system-ui" letter-spacing="0.12em">COMMS</text>
  </g>
</svg>
```

---

#### Scene 3: FeatureDetailScene (3 Tilted Live Metric Cards)

Three stacked realistic dashboard cards:
1. **Attendance (Back, tilt -4°)**:
   - Header: `"Attendance · This week"`, Badge: `94%` (gold on dark plinth)
   - Matrix: 6 days (`M T W T F S`) × 4 classes, dark indigo pills for present, gold pills for absent.
2. **Fee Collection (Middle, straight)**:
   - Header: `"Fee collection · Term 2"`
   - Circular Donut: `87%` ring (`strokeDashoffset` animation)
   - Text: `₹ 14,82,500` / `of ₹ 17,00,000 collected`
   - Progress bar: 87% fill (`fill="#4338ca"`).
3. **Exam Grade Distribution (Front, tilt +4°)**:
   - Header: `"Exams · Grade distribution"`, Badge: `53 / 53`
   - Bar Chart: 5 vertical animated bars:
     - `A+` (12 students, `#1e1b4b`)
     - `A` (18 students, `#3730a3`)
     - `B` (14 students, `#6366f1`)
     - `C` (7 students, `#a5b4fc`)
     - `D` (2 students, `#fcd34d`)

---

### Product Tour: Interactive Tabbed Workspace

Container: Browser Chrome Mockup (`app.progresseye.com / [activeTab]`) with 3 window controls.

#### 5 Interactive Tab Panels:
1. **Attendance**: 30-square grid (`28 / 30 present`), green checkmarks for present, rose crosses for absent (`i=7`, `i=19`). Bottom bar shows: `"Auto-saved · 9:14 AM"` & `"Parents notified"`.
2. **Fees**: Metric display `₹ 14,82,500` (87% collected). Live transaction feed:
   - Aarav Sharma (VIII-A): `₹ 12,000` · Received
   - Diya Patel (VI-B): `₹ 9,500` · Received
   - Rohan Mehta (X-C): `₹ 15,000` · Reminder sent
3. **Exams**: Grade table (`Student | Marks | Grade`):
   - Priya Iyer (92, A+)
   - Karan Singh (87, A)
   - Meera Joshi (78, B+)
   - Aditya Roy (95, A+)
   - Action: `↗ Publish report card`
4. **Communication**: Composer simulation with blinking terminal cursor (`pe-cursor`):
   - Subject: `📢 Parent-teacher meeting`
   - Channels: SMS (`1,284`), Email (`1,151`), App push (`892`)
5. **Analytics**: Real-time SVG line chart of 30-day attendance trend (`↗ +4.2%`) with filled linear gradient and glowing current data point.

---

### Features Bento Grid with Spotlight Effects

Asymmetric 6-card grid (`md:grid-cols-2 lg:grid-cols-3`):
1. **Roles done right** (`col-span-2`): Overlapping avatar stack `A` (Admin), `P` (Principal), `T` (Teacher), `S` (Student), `P` (Parent).
2. **Attendance in one tap** (`col-span-1`): 35-block mini attendance calendar grid.
3. **Fees that collect themselves** (`col-span-1`): Mini progress bar showing `87%` (`₹ 14,82,500`).
4. **Exams and report cards** (`col-span-2`): Staggered tilted grade pills (`A+`, `A`, `B+`, `A+`, `A`) with auto-graded caption.
5. **Communication that lands** (`col-span-1`): 3 chat bubbles sliding in from left and right (`"Holiday tomorrow"`, `"Sent to 1,284 parents"`, `"✅ Delivered"`).
6. **Insights that lead to action** (`col-span-2`): 12-bar mini sparkline histogram showing `+12%` growth.

*Every Bento card features per-card cursor spotlighting:*
```css
background: radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(29,78,216,0.10), transparent 55%);
```

---

### Why ProgressEye Section (Sticky Split)

- **Left (Sticky)**: Eyebrow `"WHY PROGRESSEYE"`, Headline *"Powerful when you need it. Invisible when you don't."*
- **Right (4 Rows)**:
  1. `Built for speed` (`FiZap`): Sub-second navigation, even on patchy 3G.
  2. `Privacy by design` (`FiShield`): Encryption at rest, RBAC, audit logs — out of the box.
  3. `Works everywhere` (`FiSmartphone`): Desktop, tablet, mobile — no app store required.
  4. `Made in India` (`FiGlobe`): English and Hindi today. More regional languages soon.

---

### Pricing Section (Annual/Monthly Toggle & Spotlight Cards)

#### Annual / Monthly Toggle
- Pill toggle with spring layout glider (`layoutId`)
- Annual pill features bounce badge: `"Save 17%"` (`bg-blue-700 text-white fs-tiny font-bold`)

#### 3 Pricing Tiers
1. **Starter** (Free Forever):
   - Price: `Free forever`
   - For small schools finding their feet (Up to 100 students, attendance, communication).
2. **School** (Most Popular — Inverted Dark Card):
   - Card Style: `bg-neutral-950 text-white dark:bg-white dark:text-neutral-900 shadow-2xl`
   - Floating badge: `"MOST POPULAR"` (`bg-blue-700 text-white`)
   - Price: `₹25` (Annual) or `₹30` (Monthly) `/ student / month`
   - Numbers animate on toggle switch via `AnimatePresence mode="popLayout"`.
   - Includes: Unlimited students, all modules, priority WhatsApp support, unlimited admins, custom report cards.
3. **District** (Custom Enterprise):
   - Price: `Custom tailored to scale`
   - For multi-school chains: SLA guarantees, on-site training, dedicated success manager.

---

### FAQ Accordion Section
Two-column layout. Sticky left title *"Things schools ask us. Can't find what you're looking for? Talk to a human →"*. Right column features smooth height-collapsing accordions with rotate-180 plus/minus buttons.

---

### Final CTA (Ambient Glow & Orbiting Particles)

- Pill container: `rounded-10 bg-neutral-950 text-white p-10 md:p-20 text-center relative overflow-hidden`
- Interactive cursor glow: `width: 600, height: 600, background: radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 60%)`
- **12 Orbiting Particles**: Math-driven sinus/cosinus loop trajectories around center point.
- Headline: *"Your school deserves software it actually loves."*
- Perks check-list: `No credit card · Setup in 1 hour · Cancel anytime`

---

## 4. Contact Page (`/contact`) Design Specification

### Hero: Speech Bubble Pair (Animated Vector)

- Headline: `"Say hi."` (`fs-h1 font-extrabold text-[clamp(2rem,5.5vw,4.5rem)]`)
- Subtitle: *"Email, phone, or the form below — whichever feels easiest. A real human reads every message."*
- **Floating Speech Bubbles Vector (`SpeechBubbles`)**:
  - **Top-Left Outlined Bubble**:
    ```svg
    <svg viewBox="0 0 220 180" className="w-56 h-44 md:w-72 md:h-56 lg:w-96 lg:h-72 text-blue-600/35">
      <path d="M 30 30 Q 30 12 50 12 L 190 12 Q 210 12 210 30 L 210 110 Q 210 128 190 128 L 88 128 L 60 158 L 64 128 L 50 128 Q 30 128 30 110 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ```
    Animates with continuous `y: [0, -10, 0]` float (12s easeInOut).
  - **Bottom-Right Tinted Bubble**:
    Filled shape (`text-blue-600/18`) with 3 bouncing typing indicator dots (`w-2 h-2 rounded-full bg-blue-600`).

---

### Channel Cards Grid
4 cards across the grid:
1. `Email`: `hello@progresseye.in` ("We reply within one working day.")
2. `Phone`: `+91 98765 43210` ("Mon – Sat, 9 AM – 6 PM IST.")
3. `Office`: `Bangalore, India` ("Visit us — schedule first, please.")
4. `Response time`: `Under 24 hours` ("Always. Even on weekends.")

---

### Split Form & Context Card

#### Left Column (Context TiltCard)
- Card: `rounded-3xl p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200`
- Team Avatar: Square `P` monogram (`bg-blue-700 text-white font-bold`)
- Status: `"The ProgressEye team · Usually replies in 4 hours"`
- Quick routing links:
  - For partnership inquiries → Reach out via form
  - For media or press → `press@progresseye.in`
  - For careers → `/careers`

#### Right Column (React Hook Form)
- Form Card: `rounded-3xl bg-white dark:bg-neutral-900 p-7 md:p-10 shadow-2xl`
- Fields:
  1. `Full name` (with `FiUser` icon inside input)
  2. `Email` (with `FiMail` icon inside input)
  3. `Subject` (with `FiHelpCircle` icon inside input)
  4. `Message` (5 rows textarea with `FiMessageSquare` icon)
- Inputs feature focus ring: `focus:shadow-[0_0_0_4px_rgba(29,78,216,0.08)]`
- Submit: `MagneticButton` with sliding fill `bg-blue-700`
- Success State: Smooth flip to green check circle icon (`FiCheckCircle`) with reset button.

---

## 5. About Page (`/about`) Design Specification

### Hero: Manifesto Wall with Ink Swoosh

- Headline:
  ```jsx
  <h1 className="font-display font-extrabold leading-[0.92] tracking-tight text-[clamp(1.75rem,5vw,4rem)]">
    <span className="block"><WordReveal text="Built by people" /></span>
    <span className="block"><WordReveal text="who've sat in" delay={0.2} /></span>
    <span className="block"><WordReveal text="staff rooms." delay={0.4} highlight /></span>
  </h1>
  ```
- Subtitle: *"Six months of staff-room conversations. One belief: software made for schools should feel like the school itself — quiet, capable, and never in the way."*
- **Ink Swoosh Vector**:
  ```svg
  <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-blue-600/[0.07]">
    <path d="M -40 480 Q 280 380 460 440 T 1040 340" fill="none" stroke="currentColor" stroke-width="80" stroke-linecap="round" />
  </svg>
  ```
  Animates `pathLength: 0 -> 1` on mount over 2.4s.

---

### Animated Easing Stats Strip
4 animated counter cards triggered on view (`useCounter` hook):
- `35+` — Schools live (and growing every month)
- `14K+` — Students managed (across India)
- `99%` — Uptime (over the last 12 months)
- `₹0` — Setup fee (ever, on any plan)

---

### Our Story: Giant Numbered Milestone Cards
4 cards with massive half-visible watermark numbers (`text-[6rem] font-display font-extrabold text-neutral-100 dark:text-neutral-800`):
- `01 | 2024` — **The idea**: Spent 6 months in Bangalore, Pune, and Jaipur staff rooms.
- `02 | 2024` — **First school**: CBSE school in Indiranagar became first design partner.
- `03 | 2025` — **Open beta**: Public self-serve rollout.
- `04 | 2026` — **Today**: The calm operating system for Indian schools.

---

### Vision & Mission 3D Tilt Cards
- **Vision (Clean White Card)**:
  - Icon: `FiEye` inside blue disc
  - Body: *"A future where Indian school administration is so quiet, so reliable, so out of the way, that teachers can spend their day on what actually matters..."*
- **Mission (High Contrast Dark Card)**:
  - Card: `bg-neutral-950 text-white shadow-2xl`
  - Icon: `FiTarget`
  - Body: *"To build the school management software we wish every school could have — affordable, honest, modern, and built for the way Indian schools actually work."*

---

### Comparison Table: Legacy ERP vs. ProgressEye

| Dimension | Typical Legacy ERP (`FiX` Red) | ProgressEye (`FiCheck` Blue) |
|---|---|---|
| **Deployment** | 2–6 months of setup | Live in 48 hours |
| **Pricing** | Per-module add-on fees | All-inclusive flat rate |
| **Built for** | Generic institutions | Indian schools, specifically |
| **Mobile** | Desktop-first (if at all) | Mobile-first PWA |
| **Support** | Ticketing queues | WhatsApp + real humans |
| **Data residency**| Foreign servers | India-hosted, always |

---

## 6. FAQ Page (`/faq`) Design Specification

### Hero: Giant Watermark '?' & Floating Question Marks

- Headline: `"Ask us anything."` (`text-[clamp(1.75rem,4.5vw,3.5rem)]`)
- Subtitle: *"The questions schools ask us most. Search below — if you don't see yours, our team replies in under a day."*
- **Giant Watermark '?'**:
  ```jsx
  <span className="font-display block leading-none text-blue-700/8 dark:text-blue-400/8" style={{ fontSize: 'clamp(20rem, 42vw, 40rem)', fontWeight: 900 }}>
    ?
  </span>
  ```
- **4 Floating '?' Marks**: Oscillate in 2D space with varying delays (0.5s–1.3s) and durations (8s–11s).

---

### Search Input & Animated Category Pills

- **Search Bar**:
  - Floating pill container: `max-w-2xl mx-auto rounded-2xl bg-white shadow-lg`
  - Icon: `FiSearch` left-aligned at `left-5`
  - Text input with dynamic clear button (`clear`).
- **Category Filter Pills**:
  - `All`
  - `Getting started` (`FiZap`)
  - `Features & usage` (`FiBookOpen`)
  - `Pricing & billing` (`FiCreditCard`)
  - `Security & support` (`FiShield`)
  - Active pill has animated layout glider (`layoutId="faq-tab-active"`).

---

### FAQ Content Structure & Accordions
Accordions animate via Framer Motion's `AnimatePresence` with `height: 0 -> auto`.

#### Key Categories & Items:
- **Getting Started**:
  - School registration process (under 1 hour)
  - Information needed (Board affiliation, class structure)
  - 30-day free trial details
  - Bulk CSV import for students/staff
  - Progressive Web App (PWA) installation
- **Features & Usage**:
  - Tap-grid attendance & offline sync
  - Parent portal real-time notifications
  - Multi-class / multi-section timetabling conflict auto-detection
  - Fee heads, UPI & online payment gateway
  - Automated CBSE/ICSE PDF report cards
- **Pricing & Billing**:
  - ₹25/student/month pricing transparency
  - No setup fee guarantee
  - Razorpay payment options
  - 90-day data retention on cancellation
- **Security & Support**:
  - Data stored in India (AWS Mumbai)
  - 6-hour automated backups & 30-day snapshots
  - WhatsApp & phone priority support

---

## 7. Features Page (`/features`) Design Specification

### Hero: Floating 24-Verb Word Cloud

- Headline: `"Everything a school does, in one calm place."`
- Subtitle: *"Eight modules that talk to each other so data never gets re-entered, and people never get lost."*
- **24-Verb Drifting Word Cloud (`WordCloud`)**:
  - Verbs: `attend, collect, publish, message, analyze, plan, schedule, grade, invoice, remind, export, enroll, promote, review, report, invite, assign, track, notify, archive, audit, inspect, celebrate, support`
  - Typography: `font-display font-bold text-blue-700/40 select-none`
  - Mask: Radial gradient vignette (`maskImage: 'radial-gradient(ellipse at center, transparent 0%, transparent 22%, black 65%)'`) so center headline is clean and readable.
  - Animation: Deterministic pseudorandom loops floating across X/Y axis.

---

### 8-Module Overview Catalog
Spotlight cards (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`):
1. `Student & Staff` (`FiUsers`): Unified profiles with granular RBAC permissions.
2. `Attendance` (`FiCalendar`): Mark, track, and notify in a single screen.
3. `Exams & Grades` (`FiBarChart2`): Build exams, capture marks, publish PDF report cards.
4. `Fees` (`FiDollarSign`): Invoices, online payments, reminders — automated.
5. `Library` (`FiBook`): Books, lending, returns, automatic fine calculation.
6. `Communication` (`FiMessageSquare`): SMS, email, in-app push — all parents in seconds.
7. `Timetable` (`FiClock`): Auto-detect conflicts. Bulk reschedule. Per-class views.
8. `Mobile-ready` (`FiSmartphone`): Native feel on every device. No app store required.

---

### Alternating Deep-Dive Sections with Live Widgets

Alternating two-column sections (`flip={true/false}`):

#### 1. Attendance Deep-Dive
- Left: Title *"Mark a class in under 30 seconds."*
- Bullets: Bulk-mark by class, SMS + WhatsApp parent notifications, Offline mode.
- Right Widget: `AttendanceVisual` (Interactive 30-student grid with auto-save timestamp and notification indicator).

#### 2. Fees Deep-Dive
- Left Widget: `FeesVisual` (Term 2 collection ₹14,82,500, 87% progress bar, live feed with payment badges).
- Right: Title *"Watch collection happen, live."*
- Bullets: Razorpay + UPI + bank transfer, auto-reminders (7/3/1 days), receipts emailed.

#### 3. Exams Deep-Dive
- Left: Title *"From marks entry to report card, in one place."*
- Bullets: Reusable exam templates, auto GPA/rank, PDF report cards with school crest.
- Right Widget: `ExamsVisual` (Mid-term Mathematics marks table with student names and grades).

#### 4. Communication Deep-Dive
- Left Widget: `CommsVisual` (Multi-channel composer: SMS, Email, Push recipients metrics).
- Right: Title *"Reach every parent in seconds."*
- Bullets: SMS + Email + Push, audience filters, delivery and read receipts.

---

### Trust & Reliability Grid
4 cards covering the foundational infrastructure:
1. `Bank-grade security` (`FiShield`): Encryption at rest, RBAC, audit logs out of the box.
2. `Privacy first` (`FiLock`): Your data stays in India. No third-party data sales, ever.
3. `99.9% uptime` (`FiZap`): Real SLA. Real status page. Real engineers on-call.
4. `Daily backups` (`FiCloud`): Encrypted snapshots every 24 hours. 30-day retention.

---

### School Inquiry Form
Form with direct API submission to backend lead service:
- Fields: `School name`, `Your name`, `Email`, `Phone` (10-digit validation), `City`, `Number of students` (Dropdown: 1-100, 101-500, 501-1000, 1001-5000, 5000+), `Message`.
- Submit button with `FiSend` icon.
- Success state displays green circle badge and confirmation message.

---

## 8. Quick Replication Checklist for Next.js / React

To replicate these pages 1:1 in a new or migrated project:

1. **Install Dependencies**:
   ```bash
   npm install framer-motion lucide-react react-icons react-hook-form react-hot-toast
   ```
2. **Setup Tailwind & Font Families**:
   - Add Google Fonts link for `Inter` and `Poppins` to your `index.html` or `layout.tsx`.
   - Extend `fontFamily` in `tailwind.config.js`:
     ```js
     fontFamily: {
       sans: ['Inter', 'system-ui', 'sans-serif'],
       display: ['Poppins', 'Inter', 'sans-serif'],
     }
     ```
3. **Copy Global CSS**:
   - Copy `.fs-h1` through `.fs-tiny` font classes and `.pe-paper`, `.pe-cursor` keyframes into your `globals.css`.
4. **Implement Shared Marketing Primitives**:
   - Create `components/marketing/motion.tsx` with `WordReveal`, `MagneticButton`, `TiltCard`, `useSpotlight`.
5. **Implement SVGs & Heroes**:
   - Copy vector code for `SchoolScene`, `FeaturesScene`, and `FeatureDetailScene` into `LandingHero`.
   - Copy `SpeechBubbles` into `ContactHero`.
   - Copy `InkSwoosh` into `AboutHero`.
   - Copy floating question mark loops into `FAQHero`.
   - Copy 24-verb word cloud into `FeaturesHero`.
6. **Assemble Navigation & Footer**:
   - `PublicNavbar` with fixed scroll blur trigger and spring active tab indicator.
   - `Footer` with `#FBF6EB` background, peach/mint blur washes, and huge `"ProgressEye"` watermark.
