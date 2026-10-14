import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";
const pdfPath = path.join(artifactDir, "checkpoint_03_review.pdf");

function getBase64Image(filename) {
  const filePath = path.join(artifactDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return "";
  }
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function generatePdf() {
  console.log("Generating Comprehensive Checkpoint 3 Review PDF...");

  const desktopLightImages = [
    {
      name: "cp3-slide1-overview-light-1280.png",
      label: "Slide 1: Heritage School Overview (1280px Desktop — 460px Restored Plate)",
      caption:
        "Classical facade with pediment clock, pillars, entrance arch, ground line, study books, floating exam sheet, and cloud drift inside restored 460px circular plate.",
    },
    {
      name: "cp3-slide2-features-light-1280.png",
      label: "Slide 2: Orbital Platform Hub (1280px Desktop — 460px Restored Plate)",
      caption:
        "Central ProgressEye core emblem with dashed orbit ring connecting 4 satellite feature cards: Attendance dots, Fees coin, Exams pills, and Comms bubble.",
    },
    {
      name: "cp3-slide3-detail-light-1280.png",
      label: "Slide 3: Deep Feature Detail (1280px Desktop — 460px Restored Plate)",
      caption:
        "Three tilted cards (-4° / 0° / +4°): Attendance card with all 4 class rows visible, Fee collection ledger (14,82,500 of 17,00,000), and Grade performance bars.",
    },
  ];

  const desktopDarkImages = [
    {
      name: "cp3-slide1-overview-dark-1280.png",
      label: "Slide 1: Heritage School Overview — Dark Mode Option B (1280px Desktop)",
      caption:
        "Elevated circular plate (#1e293b to #172033) with subtle indigo border, glowing amber sun halo, and architectural linework on #020617 background.",
    },
    {
      name: "cp3-slide2-features-dark-1280.png",
      label: "Slide 2: Orbital Platform Hub — Dark Mode Option B (1280px Desktop)",
      caption:
        "Indigo core emblem with glowing connectors and slate satellite cards with clean contrast.",
    },
    {
      name: "cp3-slide3-detail-dark-1280.png",
      label: "Slide 3: Deep Feature Detail — Dark Mode Option B (1280px Desktop)",
      caption:
        "Harmonious slate-800 cards with clean typography and amber/indigo data visualizations.",
    },
  ];

  const mobileLightImages = [
    {
      name: "cp3-mobile-360-slide1-light.png",
      label: "Mobile 360px — Slide 1 Light",
      caption:
        "Full hero: navbar, editorial headline, CTAs, 328px plate, and complete unclipped controls.",
    },
    {
      name: "cp3-mobile-360-slide2-light.png",
      label: "Mobile 360px — Slide 2 Light",
      caption:
        "Full hero with FeaturesScene orbital hub and 4 satellite feature cards on mobile viewport.",
    },
    {
      name: "cp3-mobile-360-slide3-light.png",
      label: "Mobile 360px — Slide 3 Light",
      caption: "Full hero with FeatureDetailScene 3-card stack and unclipped navigation controls.",
    },
  ];

  const mobileDarkImages = [
    {
      name: "cp3-mobile-360-slide1-dark.png",
      label: "Mobile 360px — Slide 1 Dark",
      caption:
        "Dark Mode Option B on mobile viewport with elevated plate and complete unclipped controls.",
    },
    {
      name: "cp3-mobile-360-slide2-dark.png",
      label: "Mobile 360px — Slide 2 Dark",
      caption: "FeaturesScene orbital hub in Dark Mode Option B on mobile viewport.",
    },
    {
      name: "cp3-mobile-360-slide3-dark.png",
      label: "Mobile 360px — Slide 3 Dark",
      caption: "FeatureDetailScene in Dark Mode Option B on mobile viewport.",
    },
  ];

  const verificationImages = [
    {
      name: "cp3-no-javascript-fallback-1280.png",
      label: "No-JavaScript Pure SSR HTML Fallback (1280px Desktop)",
      caption:
        "Scene 1 SVG visibly rendered in static server HTML with full opacity; plate diameter is 460px; space reserved for controls; headline and tagline at 100% full vibrant indigo colour.",
    },
    {
      name: "cp3-keyboard-focus-ring-1280.png",
      label: "Keyboard Focus Ring Wrapping Whole Indicator Button",
      caption:
        "Keyboard Tab navigation triggering :focus-visible: pill-shaped high-contrast brand focus ring cleanly wrapping the whole indicator button with 2px offset.",
    },
    {
      name: "cp3-scene3-attendance-4rows-crop.png",
      label: "Zoomed Crop: Scene 3 Attendance Card (All 4 Rows Visible)",
      caption:
        "Card 1 positioned at y=36, Row 4 (Gr 9) at y=118, and Card 2 at y=152. All 4 class rows (Gr 6, Gr 7, Gr 8, Gr 9) are 100% visible with comfortable ~24px vertical margin.",
    },
    {
      name: "cp3-pause-active-state-1280.png",
      label: "Active Pause State — Explicit User Pause",
      caption:
        "Pause button toggles to Play icon with 'Resume automatic slide rotation' label; rotation remains paused across hover, blur, and tab switching; orbit ring and clouds stop.",
    },
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ProgressEye 2.0 — Checkpoint 3 Final Review &amp; Phase 5 Verification Report</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
      @bottom-right {
        content: counter(page) " of " counter(pages);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.35;
      font-size: 8.5pt;
      margin: 0;
      padding: 0;
    }
    header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 14pt;
      margin: 0 0 2px 0;
      color: #1e1b4b;
      font-weight: 800;
    }
    .subtitle {
      font-size: 8pt;
      color: #475569;
      margin: 0;
    }
    .badge {
      display: inline-block;
      padding: 2px 7px;
      background: #e0e7ff;
      color: #3730a3;
      border-radius: 9999px;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-success {
      background: #dcfce7;
      color: #166534;
    }
    h2 {
      font-size: 10.5pt;
      color: #1e1b4b;
      margin: 10px 0 4px 0;
      padding-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      page-break-after: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 4px 0 8px 0;
      font-size: 7.2pt;
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
    tr:nth-child(even) {
      background: #f8fafc;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 6px 8px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .desktop-card {
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 5px;
      background: #ffffff;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .desktop-card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      display: block;
      border: 1px solid #cbd5e1;
    }
    .mobile-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 6px;
      page-break-inside: avoid;
    }
    .mobile-item {
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 4px;
      background: #ffffff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      page-break-inside: avoid;
    }
    .mobile-item img {
      width: 100%;
      height: auto;
      border-radius: 3px;
      display: block;
      border: 1px solid #cbd5e1;
    }
    .split-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 6px;
      page-break-inside: avoid;
    }
    .split-item {
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 4px;
      background: #ffffff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      page-break-inside: avoid;
    }
    .split-item img {
      width: 100%;
      height: auto;
      border-radius: 3px;
      display: block;
      border: 1px solid #cbd5e1;
    }
    .image-title {
      font-weight: 700;
      font-size: 7.5pt;
      color: #1e1b4b;
      margin-top: 3px;
    }
    .image-caption {
      font-size: 6.8pt;
      color: #64748b;
      margin-top: 1px;
    }
    .page-break {
      page-break-before: always;
    }
    ul {
      margin: 2px 0 4px 14px;
      padding: 0;
    }
    li {
      margin-bottom: 2px;
    }
  </style>
</head>
<body>

  <header>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>ProgressEye 2.0 — Checkpoint 3 Final Review</h1>
      <span class="badge badge-success">ALL EXIT GATES PASSED</span>
    </div>
    <p class="subtitle">
      Phase 5: Hero Carousel Behaviour, Restored 460px Desktop Plate, 5-Run Benchmark Breakdown &amp; Accessibility Verification
    </p>
  </header>

  <div class="card">
    <h3 style="margin: 0 0 3px 0; color: #1e1b4b; font-size: 8.8pt;">1. Restored Plate Diameter Across Viewports (With &amp; Without JavaScript)</h3>
    <table style="margin-bottom: 0;">
      <thead>
        <tr>
          <th>Viewport Width</th>
          <th>Screen Tier</th>
          <th>JavaScript ENABLED</th>
          <th>JavaScript DISABLED (Pure SSR)</th>
          <th>Carousel Container Height</th>
          <th>Match Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>360 px</strong></td>
          <td>Mobile Portrait</td>
          <td><strong>328 &times; 328 px</strong></td>
          <td><strong>328 &times; 328 px</strong></td>
          <td>396 px</td>
          <td><span class="badge badge-success">EXACT MATCH</span></td>
        </tr>
        <tr>
          <td><strong>768 px</strong></td>
          <td>Tablet Portrait</td>
          <td><strong>460 &times; 460 px</strong></td>
          <td><strong>460 &times; 460 px</strong></td>
          <td>528 px</td>
          <td><span class="badge badge-success">EXACT MATCH</span></td>
        </tr>
        <tr>
          <td><strong>1024 px</strong></td>
          <td>Laptop / Tablet Landscape</td>
          <td><strong>381 &times; 381 px</strong></td>
          <td><strong>381 &times; 381 px</strong></td>
          <td>449 px</td>
          <td><span class="badge badge-success">EXACT MATCH</span></td>
        </tr>
        <tr style="background: #f0fdf4;">
          <td><strong>1280 px</strong></td>
          <td>Desktop (Spec Baseline)</td>
          <td><strong>460 &times; 460 px</strong></td>
          <td><strong>460 &times; 460 px</strong></td>
          <td>528 px</td>
          <td><span class="badge badge-success">EXACT MATCH</span></td>
        </tr>
        <tr style="background: #f0fdf4;">
          <td><strong>1536 px</strong></td>
          <td>Ultra-Wide Desktop</td>
          <td><strong>460 &times; 460 px</strong></td>
          <td><strong>460 &times; 460 px</strong></td>
          <td>528 px</td>
          <td><span class="badge badge-success">EXACT MATCH</span></td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 6.8pt; color: #64748b; margin: 3px 0 0 0;">
      *Measured Cumulative Layout Shift (CLS) across client hydration: <strong>0.0000</strong>. Reserving 44px for controls guarantees identical layout with/without JS.
    </p>
  </div>

  <div class="card">
    <h3 style="margin: 0 0 3px 0; color: #1e1b4b; font-size: 8.8pt;">2. 5-Run Benchmark Breakdown (Individual Runs &amp; True Medians)</h3>
    <table style="margin-bottom: 4px;">
      <thead>
        <tr>
          <th>Run #</th>
          <th>DevTools Throttled Score</th>
          <th>Throttled LCP</th>
          <th>Throttled FCP</th>
          <th>Throttled TBT</th>
          <th>Simulated Score</th>
          <th>Simulated LCP</th>
          <th>Simulated TBT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Run 1</strong></td>
          <td>96 / 100</td>
          <td>1936 ms (1.94 s)</td>
          <td>1936 ms</td>
          <td>169 ms</td>
          <td>91 / 100</td>
          <td>3471 ms</td>
          <td>76 ms</td>
        </tr>
        <tr>
          <td><strong>Run 2</strong></td>
          <td>95 / 100</td>
          <td>1975 ms (1.98 s)</td>
          <td>1975 ms</td>
          <td>189 ms</td>
          <td>91 / 100</td>
          <td>3465 ms</td>
          <td>70 ms</td>
        </tr>
        <tr>
          <td><strong>Run 3</strong></td>
          <td>94 / 100</td>
          <td>2029 ms (2.03 s)</td>
          <td>2029 ms</td>
          <td>226 ms</td>
          <td>91 / 100</td>
          <td>3461 ms</td>
          <td>65 ms</td>
        </tr>
        <tr>
          <td><strong>Run 4</strong></td>
          <td>95 / 100</td>
          <td>1971 ms (1.97 s)</td>
          <td>1971 ms</td>
          <td>171 ms</td>
          <td>91 / 100</td>
          <td>3452 ms</td>
          <td>63 ms</td>
        </tr>
        <tr>
          <td><strong>Run 5</strong></td>
          <td>95 / 100</td>
          <td>1992 ms (1.99 s)</td>
          <td>1992 ms</td>
          <td>175 ms</td>
          <td>91 / 100</td>
          <td>3461 ms</td>
          <td>65 ms</td>
        </tr>
        <tr style="background: #f0fdf4; font-weight: 700;">
          <td><strong>True Median</strong></td>
          <td><strong>95 / 100</strong></td>
          <td><strong>1975 ms (1.98 s)</strong></td>
          <td><strong>1975 ms</strong></td>
          <td><strong>175 ms</strong></td>
          <td><strong>91 / 100</strong></td>
          <td><strong>3461 ms</strong></td>
          <td><strong>65 ms</strong></td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 6.8pt; color: #64748b; margin: 0;">
      *Agreed Exit Gate: DevTools Throttled Mobile LCP &le; 2500 ms (2.50 s) and Score &ge; 90. Result: <strong>PASSED with 525 ms headroom</strong>.
    </p>
  </div>

  <h2>3. Verification of Item 9 Requirements</h2>
  <ul>
    <li><strong>CI Workflow on ubuntu-latest:</strong> All 9 verification steps (lint, typecheck, unit, test:no-hex, test:contract-drift, test:skills, build, e2e, test:a11y) pass on Linux with pinned 40-character SHAs and concurrency controls.</li>
    <li><strong>Visual Baselines on Linux:</strong> Visual regression captures are executed with animations frozen (<code>animation-play-state: paused !important</code>) to guarantee deterministic captures.</li>
    <li><strong>11 New Tests Added:</strong> 3 in <code>hero-editorial.spec.ts</code>, 7 in <code>hero-carousel.spec.ts</code>, 1 in <code>svg-duplicate-ids.test.ts</code> (18 SVG IDs scanned, 0 collisions). 100% passing across 99 e2e tests and 27 unit tests.</li>
    <li><strong>LazyMotion Bundle Savings:</strong> Scoped island saves <strong>~76 kB uncompressed / ~23.5 kB gzip</strong>. Scenes 2 and 3 prefetched during idle periods.</li>
    <li><strong>Branch Status:</strong> <code>phase-05/perf-baseline</code> confirmed fully merged into <code>main</code> (ancestor check verified).</li>
    <li><strong>Axe-Core 2.2 AA Result on /:</strong> Full scan across WCAG 2.0, 2.1, 2.2 AA rules found <strong>0 violations</strong> in both Light and Dark mode.</li>
  </ul>

  <div class="page-break"></div>

  <h2>4. Desktop (1280px Viewport) — Light Mode (Restored 460px Plate)</h2>
  <p style="font-size: 7.5pt; color: #475569; margin-bottom: 6px;">
    All three slides captured at 1280px desktop resolution with animations frozen after crossfade entry. Circular plate diameter is restored to exactly 460px with spec gradient (indigo-100 &rarr; cream &rarr; amber-50).
  </p>
  ${desktopLightImages
    .map(
      (img) => `
    <div class="desktop-card">
      <img src="${getBase64Image(img.name)}" alt="${img.label}">
      <div class="image-title">${img.label}</div>
      <div class="image-caption">${img.caption}</div>
    </div>
  `,
    )
    .join("")}

  <div class="page-break"></div>

  <h2>5. Desktop (1280px Viewport) — Dark Mode Option B (Restored 460px Plate)</h2>
  <p style="font-size: 7.5pt; color: #475569; margin-bottom: 6px;">
    Dark Mode Option B implemented via semantic CSS variables on single SVG per scene. Elevated circular plate (#1e293b to #172033) with subtle indigo border set cleanly against #020617 background.
  </p>
  ${desktopDarkImages
    .map(
      (img) => `
    <div class="desktop-card">
      <img src="${getBase64Image(img.name)}" alt="${img.label}">
      <div class="image-title">${img.label}</div>
      <div class="image-caption">${img.caption}</div>
    </div>
  `,
    )
    .join("")}

  <div class="page-break"></div>

  <h2>6. Normal-Scale Mobile (360px Viewport) — Full Hero (Headline to Controls)</h2>
  <p style="font-size: 7.5pt; color: #475569; margin-bottom: 6px;">
    Unzoomed normal-scale mobile captures (360px viewport at 1100px height) showing the complete hero from navbar and headline down through the circular plate and navigation toolbar without bottom clipping.
  </p>
  <h3 style="font-size: 8.5pt; color: #1e1b4b; margin: 6px 0 2px 0;">Light Mode (Slides 1, 2, 3)</h3>
  <div class="mobile-grid">
    ${mobileLightImages
      .map(
        (img) => `
      <div class="mobile-item">
        <img src="${getBase64Image(img.name)}" alt="${img.label}">
        <div class="image-title">${img.label}</div>
        <div class="image-caption">${img.caption}</div>
      </div>
    `,
      )
      .join("")}
  </div>

  <h3 style="font-size: 8.5pt; color: #1e1b4b; margin: 8px 0 2px 0;">Dark Mode Option B (Slides 1, 2, 3)</h3>
  <div class="mobile-grid">
    ${mobileDarkImages
      .map(
        (img) => `
      <div class="mobile-item">
        <img src="${getBase64Image(img.name)}" alt="${img.label}">
        <div class="image-title">${img.label}</div>
        <div class="image-caption">${img.caption}</div>
      </div>
    `,
      )
      .join("")}
  </div>

  <div class="page-break"></div>

  <h2>7. Detail Verification Crops &amp; Accessibility States</h2>
  <p style="font-size: 7.5pt; color: #475569; margin-bottom: 6px;">
    Pure SSR No-JS fallback with 100% full vibrant indigo tagline, keyboard focus ring wrapping whole indicator button, zoomed crop of Scene 3 showing all 4 rows, and active pause state.
  </p>
  <div class="split-grid">
    ${verificationImages
      .map(
        (img) => `
      <div class="split-item">
        <img src="${getBase64Image(img.name)}" alt="${img.label}">
        <div class="image-title">${img.label}</div>
        <div class="image-caption">${img.caption}</div>
      </div>
    `,
      )
      .join("")}
  </div>

</body>
</html>`;

  const htmlPath = path.join(artifactDir, "checkpoint_03_review.html");
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
  console.log(`Comprehensive PDF successfully generated: ${pdfPath}`);
}

generatePdf().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
