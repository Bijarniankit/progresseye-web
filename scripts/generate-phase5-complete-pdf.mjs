import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";
const pdfPath = path.join(artifactDir, "phase_05_complete_report.pdf");
const htmlPath = path.join(artifactDir, "phase_05_complete_report.html");

function getBase64Image(filename) {
  const filePath = path.join(artifactDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return "";
  }
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function generateCompleteReport() {
  console.log("Generating Comprehensive Phase 5 Complete Report PDF...");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ProgressEye 2.0 — Phase 5 Complete Verification Report</title>
  <style>
    @page {
      size: A4;
      margin: 10mm 12mm 12mm 12mm;
      @bottom-right {
        content: counter(page);
        font-size: 7.5pt;
        color: #94a3b8;
      }
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.35;
      font-size: 8.5pt;
      margin: 0;
      padding: 0;
    }
    header {
      border-bottom: 2.5px solid #2563eb;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    h1 {
      font-size: 14pt;
      margin: 0 0 3px 0;
      color: #1e1b4b;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 8pt;
      color: #475569;
      margin: 0;
    }
    .header-meta {
      font-size: 7.2pt;
      color: #64748b;
      margin-top: 4px;
      line-height: 1.3;
    }
    .header-meta strong {
      color: #1e293b;
    }
    .meta-badges {
      display: flex;
      gap: 5px;
      align-items: center;
      margin-top: 2px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 9999px;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-blue { background: #e0e7ff; color: #3730a3; }
    .badge-success { background: #dcfce7; color: #166534; }
    .badge-dark { background: #0f172a; color: #f8fafc; }

    h2 {
      font-size: 9.5pt;
      color: #1e1b4b;
      margin: 10px 0 4px 0;
      padding-bottom: 3px;
      border-bottom: 1px solid #e2e8f0;
      page-break-after: avoid;
    }
    h3 {
      font-size: 8pt;
      color: #334155;
      margin: 7px 0 3px 0;
      page-break-after: avoid;
    }
    p, li {
      font-size: 7.8pt;
      color: #334155;
      margin: 0 0 4px 0;
    }
    ul {
      margin: 0 0 5px 14px;
      padding: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 4px 0 7px 0;
      font-size: 7pt;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 3px 5px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
    }
    tr:nth-child(even) { background: #f8fafc; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-success { color: #15803d; font-weight: 700; }

    .summary-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px 9px;
      margin-bottom: 7px;
      page-break-inside: avoid;
    }
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 6px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .kpi-box {
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      background: #ffffff;
      padding: 5px 6px;
      text-align: center;
    }
    .kpi-value {
      font-size: 11pt;
      font-weight: 800;
      color: #1e1b4b;
      line-height: 1.1;
    }
    .kpi-label {
      font-size: 6.2pt;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      margin-top: 2px;
    }

    .page-break {
      page-break-before: always;
    }

    /* Grid layout for full-viewport desktop screenshots */
    .viewport-grid-desktop {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 7px;
      margin-bottom: 7px;
    }
    .desktop-shot {
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #ffffff;
      padding: 4px;
      page-break-inside: avoid;
    }
    .desktop-shot img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }
    .shot-title {
      font-size: 7.2pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 3px;
    }
    .shot-desc {
      font-size: 6.5pt;
      color: #64748b;
      line-height: 1.25;
      margin-top: 1px;
    }

    /* Grid layout for mobile 360px screenshots */
    .viewport-grid-mobile {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 7px;
    }
    .mobile-shot {
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #ffffff;
      padding: 3px;
      page-break-inside: avoid;
    }
    .mobile-shot img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: EXECUTIVE SUMMARY & AUDIT GATES -->
  <header>
    <div class="header-row">
      <div>
        <h1>Phase 5 Complete Verification Report</h1>
        <p class="subtitle">Hero Section, Editorial Layout, Vector Illustration Scenes &amp; Decorative Plate Architecture</p>
        <div class="header-meta">
          <strong>Date:</strong> October 15, 2026 &nbsp;|&nbsp;
          <strong>Branch:</strong> <code>phase-05/hero-carousel</code> &nbsp;|&nbsp;
          <strong>Commit SHA:</strong> <code>6286b953a72edb257b3536783af084b84b3a013b</code>
        </div>
      </div>
      <div class="text-right">
        <div class="meta-badges">
          <span class="badge badge-success">Exit Gate Passed</span>
          <span class="badge badge-blue">Stage 5 Complete</span>
          <span class="badge badge-dark">Squash-Merged to Main</span>
        </div>
      </div>
    </div>
  </header>

  <div class="kpi-row">
    <div class="kpi-box">
      <div class="kpi-value">2.00 s</div>
      <div class="kpi-label">Throttled LCP (&le; 2.50s)</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-value">95 / 100</div>
      <div class="kpi-label">Lighthouse Score (&ge; 90)</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-value">0.0000</div>
      <div class="kpi-label">Hydration CLS (&lt; 0.01)</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-value">0 Violations</div>
      <div class="kpi-label">Axe 2.2 AA (WCAG 100%)</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-value">0 Raw Hex</div>
      <div class="kpi-label">Token Purity (100% Vars)</div>
    </div>
  </div>

  <h2>1. Executive Summary &amp; Scope Completed</h2>
  <p>
    Phase 5 delivers the production hero section for ProgressEye 2.0. All tasks across Checkpoints 1, 2, and 3 have been executed, verified, and merged into <code>main</code> with git tag <code>phase-05-approved</code>.
  </p>
  <ul>
    <li><strong>Checkpoint 1 (CP1) — Typography &amp; Editorial Column</strong>: Responsive display typography (Poppins 800/700/600/500 italic + Inter), CSS-only word reveal animation, warm cream hero background (<code>--color-surface-hero</code>), unified dark slate surface (<code>#020617</code>), and primary/secondary CTA buttons.</li>
    <li><strong>Checkpoint 2 (CP2) — Illustration Artwork &amp; Dark Theme Option B</strong>: Ported the three vector scenes from spec without hex literals: Scene 1 (Classical Heritage School), Scene 2 (Orbital Platform Hub with 4 satellite cards), and Scene 3 (Deep Feature Detail with 3 tilted cards: 4-row attendance, fee ledger, and grade performance bars). Dark Mode Option B implemented with semantic CSS variables.</li>
    <li><strong>Checkpoint 3 (CP3 Final) — Decorative Plate Architecture &amp; Refinements</strong>:
      <ul>
        <li><strong>Controls Removal</strong>: Removed carousel navigation toolbar, prev/next arrows, indicator dots, and pause button per direction. Scenes auto-rotate on a 5.2s interval with a 320ms overlapping crossfade.</li>
        <li><strong>Plate Becomes Decorative</strong>: Tagged <code>aria-hidden="true"</code>, removing all carousel ARIA widget roles. Screen readers perceive the hero cleanly as headline, subtitle, and CTAs.</li>
        <li><strong>User-Accepted WCAG 2.2.2 Level A Deviation</strong>: Recorded explicit product approval to omit a visible pause toggle button while preserving four motion safeguards.</li>
        <li><strong>Safeguards</strong>: Automatic pause of rotation, orbit border spin, and cloud drift on pointer hover, tap-and-hold (pointer down), and tap toggle; pause when browser tab is hidden; pause when off-screen; and permanent static display of Scene 1 under <code>prefers-reduced-motion: reduce</code>.</li>
        <li><strong>Expanded Responsive Diameters</strong>: 328px (360px), 500px (768px), 430px (1024px), 520px (1280px), 520px (1536px). Artwork scaled up by 8% in Scenes 1 &amp; 2 to use empty margins.</li>
      </ul>
    </li>
  </ul>

  <h2>2. Five-Run Performance Benchmark (Lighthouse Mobile)</h2>
  <p>Tested on production build (<code>pnpm build</code> + <code>next start -p 3000</code>) with machine idle. All five runs exceed the &le; 2.50s LCP exit gate:</p>

  <table>
    <thead>
      <tr>
        <th class="text-center">Run</th>
        <th class="text-center">DevTools Throttled Score</th>
        <th class="text-center">Throttled LCP (s)</th>
        <th class="text-center">Throttled FCP (s)</th>
        <th class="text-center">Total Blocking Time</th>
        <th class="text-center">Simulated Score</th>
        <th class="text-center">Simulated LCP (s)</th>
        <th class="text-center">Exit Gate Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">Run 1</td>
        <td class="text-center">95</td>
        <td class="text-center">1.99 s (1,994 ms)</td>
        <td class="text-center">1.99 s</td>
        <td class="text-center">179 ms</td>
        <td class="text-center">91</td>
        <td class="text-center">3.48 s</td>
        <td class="text-center text-success">PASS (&le; 2.50s)</td>
      </tr>
      <tr>
        <td class="text-center">Run 2</td>
        <td class="text-center">94</td>
        <td class="text-center">2.02 s (2,023 ms)</td>
        <td class="text-center">2.02 s</td>
        <td class="text-center">195 ms</td>
        <td class="text-center">91</td>
        <td class="text-center">3.47 s</td>
        <td class="text-center text-success">PASS (&le; 2.50s)</td>
      </tr>
      <tr>
        <td class="text-center">Run 3</td>
        <td class="text-center">95</td>
        <td class="text-center">2.00 s (1,999 ms)</td>
        <td class="text-center">2.00 s</td>
        <td class="text-center">187 ms</td>
        <td class="text-center">90</td>
        <td class="text-center">3.52 s</td>
        <td class="text-center text-success">PASS (&le; 2.50s)</td>
      </tr>
      <tr>
        <td class="text-center">Run 4</td>
        <td class="text-center">95</td>
        <td class="text-center">2.00 s (2,002 ms)</td>
        <td class="text-center">2.00 s</td>
        <td class="text-center">168 ms</td>
        <td class="text-center">91</td>
        <td class="text-center">3.46 s</td>
        <td class="text-center text-success">PASS (&le; 2.50s)</td>
      </tr>
      <tr>
        <td class="text-center">Run 5</td>
        <td class="text-center">96</td>
        <td class="text-center">1.98 s (1,975 ms)</td>
        <td class="text-center">1.98 s</td>
        <td class="text-center">160 ms</td>
        <td class="text-center">91</td>
        <td class="text-center">3.46 s</td>
        <td class="text-center text-success">PASS (&le; 2.50s)</td>
      </tr>
      <tr style="font-weight: 700; background: #eff6ff;">
        <td class="text-center">TRUE MEDIAN</td>
        <td class="text-center">95</td>
        <td class="text-center">2.00 s (1,999 ms)</td>
        <td class="text-center">2.00 s</td>
        <td class="text-center">179 ms</td>
        <td class="text-center">91</td>
        <td class="text-center">3.47 s</td>
        <td class="text-center text-success">PASS (EXIT GATE MET)</td>
      </tr>
    </tbody>
  </table>

  <h2>3. Responsive Plate Diameters &amp; Hydration CLS</h2>
  <table>
    <thead>
      <tr>
        <th>Viewport</th>
        <th>Target Size</th>
        <th>Measured (JS Enabled)</th>
        <th>Measured (No-JS SSR)</th>
        <th>Grid &amp; Spacing Behavior</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>360px</strong> (Mobile)</td>
        <td>328px</td>
        <td><strong>328 &times; 328 px</strong></td>
        <td><strong>328 &times; 328 px</strong></td>
        <td>100% of container (360px viewport minus 32px gutters). Zero horizontal overflow.</td>
      </tr>
      <tr>
        <td><strong>768px</strong> (Tablet)</td>
        <td>500px</td>
        <td><strong>500 &times; 500 px</strong></td>
        <td><strong>500 &times; 500 px</strong></td>
        <td>Stacked <code>md:max-w-[500px]</code>, centered. Ample breathing room.</td>
      </tr>
      <tr>
        <td><strong>1024px</strong> (Landscape)</td>
        <td>430px</td>
        <td><strong>430 &times; 430 px</strong></td>
        <td><strong>430 &times; 430 px</strong></td>
        <td>Grid adjusted to <code>lg:col-span-6</code> (464px slot). Zero collision.</td>
      </tr>
      <tr>
        <td><strong>1280px</strong> (Desktop)</td>
        <td>520px</td>
        <td><strong>520 &times; 520 px</strong></td>
        <td><strong>520 &times; 520 px</strong></td>
        <td><code>xl:col-span-6</code> (592px slot). Clean margin, zero collision.</td>
      </tr>
      <tr>
        <td><strong>1536px</strong> (Ultra-Wide)</td>
        <td>520px</td>
        <td><strong>520 &times; 520 px</strong></td>
        <td><strong>520 &times; 520 px</strong></td>
        <td>Centered inside <code>max-w-7xl</code> container (592px slot).</td>
      </tr>
    </tbody>
  </table>

  <h2>4. Bundle Analyzer &amp; Accessibility Verification</h2>
  <ul>
    <li><strong>Bundle Savings</strong>: Scoping <code>LazyMotion</code> with <code>domAnimation</code> saved <strong>~76 kB uncompressed / ~23.5 kB gzip</strong>. Removing manual carousel controls saved an additional <strong>~5.2 kB uncompressed</strong> client JS. Landing route first-load JS shared by all: ~104 kB gzip; landing page specific JS: <strong>16.8 kB gzip</strong>.</li>
    <li><strong>Axe-Core Audit</strong>: Scanned <code>/</code> in Light and Dark mode across WCAG 2.0, 2.1, 2.2 AA rules. <strong>0 violations found</strong>.</li>
    <li><strong>Comprehensive Test Suite Execution</strong>:
      <ul>
        <li><strong>Unit Tests</strong>: <strong>27 / 27 passed</strong> across 8 test files via Vitest.</li>
        <li><strong>Accessibility Tests</strong>: <strong>28 / 28 passed</strong> via Axe-core Playwright audit across all routes.</li>
        <li><strong>E2E Tests</strong>: <strong>99 / 99 passed</strong> (88 in marketing-shell, 3 in hero-editorial, 8 in hero-carousel).</li>
      </ul>
    </li>
  </ul>

  <!-- PAGE 2: 1280px DESKTOP SCREENSHOTS -->
  <div class="page-break"></div>
  <h2>5. Desktop 1280px Viewport Captures (Scenes 1, 2, 3 in Light &amp; Dark)</h2>
  <p>Full viewport captures displaying fixed navbar, editorial typography, action CTAs, and the 520px circular plate:</p>

  <div class="viewport-grid-desktop">
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-scene1-light.png")}" alt="Scene 1 Light 1280px">
      <div class="shot-title">Scene 1: Heritage School Overview — Light Mode (1280px)</div>
      <div class="shot-desc">Classical facade, pediment clock, pillars, exam sheet, and cloud drift inside 520px plate.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-scene1-dark.png")}" alt="Scene 1 Dark 1280px">
      <div class="shot-title">Scene 1: Heritage School Overview — Dark Mode Option B (1280px)</div>
      <div class="shot-desc">Elevated circular plate with subtle indigo border, amber sun halo, and crisp contrast.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-scene2-light.png")}" alt="Scene 2 Light 1280px">
      <div class="shot-title">Scene 2: Orbital Platform Hub — Light Mode (1280px)</div>
      <div class="shot-desc">Central core emblem with dashed orbit ring connecting 4 satellite cards scaled up by 8%.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-scene2-dark.png")}" alt="Scene 2 Dark 1280px">
      <div class="shot-title">Scene 2: Orbital Platform Hub — Dark Mode Option B (1280px)</div>
      <div class="shot-desc">Glowing connectors and harmonious dark slate satellite cards against #020617 surface.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-scene3-light.png")}" alt="Scene 3 Light 1280px">
      <div class="shot-title">Scene 3: Deep Feature Detail — Light Mode (1280px)</div>
      <div class="shot-desc">Three tilted cards showing 4-row attendance (94%), fee ledger, and grade performance bars.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-scene3-dark.png")}" alt="Scene 3 Dark 1280px">
      <div class="shot-title">Scene 3: Deep Feature Detail — Dark Mode Option B (1280px)</div>
      <div class="shot-desc">Unified slate card hierarchy with amber/indigo data pills, tags, and progress bars.</div>
    </div>
  </div>

  <!-- PAGE 3: 1536px ULTRA-WIDE SCREENSHOTS -->
  <div class="page-break"></div>
  <h2>6. Ultra-Wide 1536px Viewport Captures (Scenes 1, 2, 3 in Light &amp; Dark)</h2>
  <p>Full viewport captures on ultra-wide screens, demonstrating container centering and zero clipping:</p>

  <div class="viewport-grid-desktop">
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1536-scene1-light.png")}" alt="Scene 1 Light 1536px">
      <div class="shot-title">Scene 1: Heritage School — Light Mode (1536px)</div>
      <div class="shot-desc">Perfect 520px diameter plate centered in grid slot with peach and mint ambient washes.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1536-scene1-dark.png")}" alt="Scene 1 Dark 1536px">
      <div class="shot-title">Scene 1: Heritage School — Dark Mode (1536px)</div>
      <div class="shot-desc">Unified #020617 dark surface seamlessly integrating navbar, hero canvas, and body.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1536-scene2-light.png")}" alt="Scene 2 Light 1536px">
      <div class="shot-title">Scene 2: Orbital Hub — Light Mode (1536px)</div>
      <div class="shot-desc">Dashed orbit ring spinning smoothly with 8% scaled artwork filling margins.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1536-scene2-dark.png")}" alt="Scene 2 Dark 1536px">
      <div class="shot-title">Scene 2: Orbital Hub — Dark Mode (1536px)</div>
      <div class="shot-desc">Deep slate-800 cards with clean contrast and zero text overlap across ultrawide widths.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1536-scene3-light.png")}" alt="Scene 3 Light 1536px">
      <div class="shot-title">Scene 3: Deep Feature Detail — Light Mode (1536px)</div>
      <div class="shot-desc">Three-card stack (-4° / 0° / +4°) with all four attendance rows fully visible.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1536-scene3-dark.png")}" alt="Scene 3 Dark 1536px">
      <div class="shot-title">Scene 3: Deep Feature Detail — Dark Mode (1536px)</div>
      <div class="shot-desc">Consistent dark palette across all three tilted cards with verified WCAG contrast.</div>
    </div>
  </div>

  <!-- PAGE 4: 1024px & 1100px INTERMEDIATE VIEWPORT CAPTURES -->
  <div class="page-break"></div>
  <h2>7. Laptop &amp; Intermediate Viewports (1024px &amp; 1100px)</h2>
  <p>Full viewport captures verifying collision-free layout between desktop navigation, editorial copy, and the 430px plate:</p>

  <div class="viewport-grid-desktop">
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1024-scene1-light.png")}" alt="Scene 1 Light 1024px">
      <div class="shot-title">1024px Landscape — Scene 1 Light Mode</div>
      <div class="shot-desc">Desktop navigation links and CTAs fit cleanly; 430px circular plate centered with zero collision.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1024-scene1-dark.png")}" alt="Scene 1 Dark 1024px">
      <div class="shot-title">1024px Landscape — Scene 1 Dark Mode</div>
      <div class="shot-desc">Unified slate background with clean contrast and responsive sample data note underneath.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1024-scene3-light.png")}" alt="Scene 3 Light 1024px">
      <div class="shot-title">1024px Landscape — Scene 3 Light Mode</div>
      <div class="shot-desc">Feature detail tilted cards fit inside 430px plate with zero vertical clipping or card overlap.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1100-scene1-light.png")}" alt="Scene 1 Light 1100px">
      <div class="shot-title">1100px In-Between Viewport — Scene 1 Light Mode</div>
      <div class="shot-desc">In-between breakpoint width showing smooth fluid typography and generous breathing margins.</div>
    </div>
  </div>

  <!-- PAGE 5: 768px TABLET SCREENSHOTS -->
  <div class="page-break"></div>
  <h2>8. Tablet 768px Viewport Captures (Scenes 1, 2, 3 in Light &amp; Dark)</h2>
  <p>Full viewport captures demonstrating stacked tablet layout with expanded 500px diameter circular plate:</p>

  <div class="viewport-grid-desktop">
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-768-scene1-light.png")}" alt="Scene 1 Light 768px">
      <div class="shot-title">Scene 1: Heritage School — Light Mode (768px)</div>
      <div class="shot-desc">Stacked layout with 500px plate centered under the editorial column and CTAs.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-768-scene1-dark.png")}" alt="Scene 1 Dark 768px">
      <div class="shot-title">Scene 1: Heritage School — Dark Mode (768px)</div>
      <div class="shot-desc">Mobile drawer icon visible in navbar; dark slate background with visible plate border.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-768-scene2-light.png")}" alt="Scene 2 Light 768px">
      <div class="shot-title">Scene 2: Orbital Hub — Light Mode (768px)</div>
      <div class="shot-desc">FeaturesScene with all four satellite cards fully readable on tablet viewports.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-768-scene2-dark.png")}" alt="Scene 2 Dark 768px">
      <div class="shot-title">Scene 2: Orbital Hub — Dark Mode (768px)</div>
      <div class="shot-desc">Dark orbital hub with clear typography on attendance, fees, exams, and comms cards.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-768-scene3-light.png")}" alt="Scene 3 Light 768px">
      <div class="shot-title">Scene 3: Feature Detail — Light Mode (768px)</div>
      <div class="shot-desc">Tilted cards rendered inside 500px plate with zero vertical crowding or clipping.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-768-scene3-dark.png")}" alt="Scene 3 Dark 768px">
      <div class="shot-title">Scene 3: Feature Detail — Dark Mode (768px)</div>
      <div class="shot-desc">Dark cards stack with clean drop shadow separation and simulated sample data tags.</div>
    </div>
  </div>

  <!-- PAGE 6: 360px MOBILE SCREENSHOTS & NO-JS FALLBACK -->
  <div class="page-break"></div>
  <h2>9. Mobile 360px Viewport Captures (Scenes 1, 2, 3 in Light &amp; Dark)</h2>
  <p>Full viewport captures on compact mobile screens showing navbar, fully revealed headline, CTAs, and 328px plate with zero horizontal overflow:</p>

  <div class="viewport-grid-mobile">
    <div class="mobile-shot">
      <img src="${getBase64Image("hero-360-scene1-light.png")}" alt="Scene 1 Light 360px">
      <div class="shot-title">Scene 1: Light (360px)</div>
      <div class="shot-desc">328px plate, fully revealed headline, zero overflow.</div>
    </div>
    <div class="mobile-shot">
      <img src="${getBase64Image("hero-360-scene2-light.png")}" alt="Scene 2 Light 360px">
      <div class="shot-title">Scene 2: Light (360px)</div>
      <div class="shot-desc">Orbital hub with satellite cards cleanly centered.</div>
    </div>
    <div class="mobile-shot">
      <img src="${getBase64Image("hero-360-scene3-light.png")}" alt="Scene 3 Light 360px">
      <div class="shot-title">Scene 3: Light (360px)</div>
      <div class="shot-desc">Three-card detail stack fitting comfortably.</div>
    </div>
    <div class="mobile-shot">
      <img src="${getBase64Image("hero-360-scene1-dark.png")}" alt="Scene 1 Dark 360px">
      <div class="shot-title">Scene 1: Dark (360px)</div>
      <div class="shot-desc">Dark Mode Option B on compact mobile screen.</div>
    </div>
    <div class="mobile-shot">
      <img src="${getBase64Image("hero-360-scene2-dark.png")}" alt="Scene 2 Dark 360px">
      <div class="shot-title">Scene 2: Dark (360px)</div>
      <div class="shot-desc">Dark orbital hub with clear contrast.</div>
    </div>
    <div class="mobile-shot">
      <img src="${getBase64Image("hero-360-scene3-dark.png")}" alt="Scene 3 Dark 360px">
      <div class="shot-title">Scene 3: Dark (360px)</div>
      <div class="shot-desc">Dark feature detail cards with crisp pills.</div>
    </div>
  </div>

  <h2>10. Pure SSR No-JavaScript Fallback Verification &amp; Clean Detail Crop</h2>
  <div class="viewport-grid-desktop">
    <div class="desktop-shot">
      <img src="${getBase64Image("hero-1280-nojs-fallback.png")}" alt="No-JS Fallback 1280px">
      <div class="shot-title">No-JS Server HTML Render (1280px Desktop)</div>
      <div class="shot-desc">Rendered with JavaScript disabled: Scene 1 SVG renders visibly in initial server HTML with exact 520px diameter and vibrant indigo tagline.</div>
    </div>
    <div class="desktop-shot">
      <img src="${getBase64Image("cp3-scene3-attendance-4rows-crop.png")}" alt="Scene 3 Clean Detail Crop">
      <div class="shot-title">Scene 3 Detail Crop: 100% Free of Controls &amp; All 4 Rows Visible</div>
      <div class="shot-desc">Regenerated from current production build: strictly ZERO carousel buttons, dots, or pause controls. All 4 attendance rows (Gr 6-9) clearly visible.</div>
    </div>
  </div>

</body>
</html>`;

  fs.writeFileSync(htmlPath, html, "utf-8");
  console.log(`Saved HTML report: ${htmlPath}`);

  console.log("Rendering PDF with Chromium...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      right: "12mm",
      bottom: "12mm",
      left: "12mm",
    },
  });
  await browser.close();
  console.log(`Phase 5 Complete PDF successfully generated: ${pdfPath}`);
}

generateCompleteReport().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
