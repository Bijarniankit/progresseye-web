import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";
const pdfOutputPath = "E:\\ProgressEye\\Phase-06-Walkthrough-Report.pdf";
const pdfArtifactPath = path.join(artifactDir, "Phase-06-Walkthrough-Report.pdf");

function getBase64Image(filename) {
  const fullPath = path.join(artifactDir, filename);
  if (!fs.existsSync(fullPath)) return "";
  const ext = path.extname(filename).replace(".", "");
  const base64 = fs.readFileSync(fullPath).toString("base64");
  return `data:image/${ext};base64,${base64}`;
}

async function captureTabs() {
  console.log("Capturing individual tour tabs...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Light mode tabs
  await page.goto("http://localhost:3000/#tour", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  // Tab 1 Attendance
  const tourSection = page.locator("#tour");
  await tourSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await tourSection.screenshot({ path: path.join(artifactDir, "cp1-tour-attendance-light.png") });

  // Tab 2 Fees
  await page.getByRole("tab", { name: "Fees" }).click();
  await page.waitForTimeout(300);
  await tourSection.screenshot({ path: path.join(artifactDir, "cp1-tour-fees-light.png") });

  // Tab 3 Exams
  await page.getByRole("tab", { name: "Exams" }).click();
  await page.waitForTimeout(300);
  await tourSection.screenshot({ path: path.join(artifactDir, "cp1-tour-exams-light.png") });

  await browser.close();
  console.log("Tab captures complete.");
}

async function generatePdf() {
  await captureTabs();

  console.log("Assembling comprehensive HTML report...");
  const imgAttendanceLight = getBase64Image("cp1-tour-attendance-light.png");
  const imgFeesLight = getBase64Image("cp1-tour-fees-light.png");
  const imgExamsLight = getBase64Image("cp1-tour-exams-light.png");
  const imgBentoDesktopLight = getBase64Image("cp1-1280-light.png");

  const imgWhyDesktopLight = getBase64Image("why-1280-light.png");
  const imgWhyDesktopDark = getBase64Image("why-1280-dark.png");
  const imgWhyMobileLight = getBase64Image("why-360-light.png");

  const imgPricingDesktopLight = getBase64Image("pricing-1280-light.png");
  const imgPricingDesktopDark = getBase64Image("pricing-1280-dark.png");
  const imgPricingMobileLight = getBase64Image("pricing-360-light.png");

  const imgFaqDesktopLight = getBase64Image("faq-1280-light.png");
  const imgFaqDesktopDark = getBase64Image("faq-1280-dark.png");
  const imgFaqMobileLight = getBase64Image("faq-360-light.png");

  const imgCtaDesktopLight = getBase64Image("cta-1280-light.png");
  const imgCtaDesktopDark = getBase64Image("cta-1280-dark.png");
  const imgCtaMobileLight = getBase64Image("cta-360-light.png");

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ProgressEye 2.0 — Phase 6 Walkthrough & Verification Report</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 12mm 14mm 12mm;
      @bottom-right {
        content: counter(page) " / " counter(pages);
        font-size: 8pt;
        color: #737373;
        font-family: system-ui, -apple-system, sans-serif;
      }
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 9pt;
    }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 10px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .title-block h1 {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
    .title-block .subtitle {
      font-size: 10pt;
      color: #475569;
      margin-top: 2px;
    }
    .meta-block {
      text-align: right;
      font-size: 8pt;
      color: #64748b;
    }
    .meta-block strong {
      color: #0f172a;
    }
    h2 {
      font-size: 12pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 18px;
      margin-bottom: 6px;
      padding-bottom: 3px;
      border-bottom: 1px solid #e2e8f0;
      break-after: avoid;
      page-break-after: avoid;
    }
    h3 {
      font-size: 10pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 12px;
      margin-bottom: 4px;
      break-after: avoid;
      page-break-after: avoid;
    }
    p, ul, ol {
      margin-bottom: 6px;
      color: #334155;
    }
    ul, ol {
      padding-left: 18px;
    }
    li {
      margin-bottom: 2px;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8pt;
      background: #f1f5f9;
      padding: 1px 4px;
      border-radius: 3px;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }
    .badge {
      display: inline-block;
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 1px 5px;
      border-radius: 9999px;
    }
    .badge-pass { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
    .badge-planned { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
    .badge-blue { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
    .callout {
      background: #f8fafc;
      border-left: 3px solid #2563eb;
      padding: 6px 10px;
      margin: 8px 0;
      border-radius: 0 4px 4px 0;
      font-size: 8.5pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 8pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 5px 7px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .screenshot-container {
      margin: 8px 0 12px 0;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
      background: #f8fafc;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .screenshot-caption {
      padding: 4px 8px;
      font-size: 7.5pt;
      font-weight: 600;
      background: #f1f5f9;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .screenshot-caption .tag {
      font-size: 6.5pt;
      text-transform: uppercase;
      color: #64748b;
    }
    .shot {
      width: 100%;
      display: block;
      height: auto;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .avoid-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="title-block">
      <h1>ProgressEye 2.0 — Phase 6 Report</h1>
      <div class="subtitle">Marketing Landing Sections Completion (CP1, CP2, CP3)</div>
    </div>
    <div class="meta-block">
      <div><strong>Branch:</strong> <code>phase-06/landing-sections</code> (PR #23)</div>
      <div><strong>PR Head:</strong> Final Head (Motion Runtime Eliminated)</div>
      <div><strong>Date:</strong> October 19, 2026</div>
      <div><strong>Author:</strong> Antigravity Pair Programmer</div>
    </div>
  </div>

  <!-- EXECUTIVE SUMMARY -->
  <h2>1. Executive Summary</h2>
  <p>
    Phase 6 delivers the complete marketing landing page for ProgressEye 2.0. Every section strictly follows semantic token constraints (zero raw hex/rgb/hsl colors in components), React Server Components with isolated client islands, and honest roadmap framing (all unbuilt features marked as planned across code and <code>PLACEHOLDERS.md</code>).
  </p>

  <div class="callout avoid-break">
    <strong>Key Performance & Quality Milestones:</strong><br>
    • <strong>10-Run Mobile Benchmark:</strong> 10 throttled runs executed on final production build. Formal gate passed (10 / 10 runs &le; 2.21 s vs 2.50 s maximum gate). 10-run median LCP is <strong>2.02 s (2,017 ms)</strong> and median TBT is <strong>328 ms</strong> with median Performance Score of <strong>91 / 100</strong>.<br>
    • <strong>Motion Runtime Elimination:</strong> Completely removed <code>motion/react</code> from production routes. Refactored <code>hero-carousel.tsx</code> to pure CSS stacked opacity crossfade (320ms ease-in-out) with custom <code>matchMedia</code> hook, and decoupled <code>stub-page.tsx</code>. Eliminates 132 kB raw / 44 kB gzip JS.<br>
    • <strong>Zero Motion Isolation Test:</strong> Confirmed by automated Playwright test that <code>motion/react</code> vendor chunk is strictly 0 bytes on <code>/</code>, <code>/features</code>, <code>/demo</code>, <code>/faq</code>, <code>/about</code>, and <code>/pricing</code>.<br>
    • <strong>Option B (CSS Containment):</strong> Retained <code>content-visibility: auto</code> with <code>contain-intrinsic-size: auto 800px</code> across below-fold sections.<br>
    • <strong>HashScrollHandler:</strong> Retained zero-motion anchor listener (~180 B gzip) eliminating scroll drift with <code>behavior: "instant"</code> without altering active element.<br>
    • <strong>Public Copy Cleanup & FAQ Privacy:</strong> Approved legal wording applied: "Planned: each school's records are designed to be kept separate from other schools'. We are building our data handling with India's Digital Personal Data Protection Act in mind; details will be published before launch." (DRAFT-NEEDS-LEGAL-REVIEW). Zero internal phase numbers in public UI.<br>
    • <strong>Automated Test Suites:</strong> 33 Vitest unit tests (100%), 17 Playwright landing tests (100%), 127 total Playwright E2E tests (100%), 28 Axe accessibility tests (100% pass), 0 raw hex/rgb/hsl violations.
  </div>

  <!-- SECTION 2: CHECKPOINT 1 -->
  <h2>2. Checkpoint 1: Product Tour & Bento Grid</h2>
  <p>
    CP1 introduces an interactive simulated browser product tour and a responsive 6-card bento grid displaying core school workflows.
  </p>
  <ul>
    <li><strong>Tour Subtitles:</strong> Attendance ("Planned: take attendance from a phone or desktop and notify guardians of absences"), Fees ("Planned: collect fees online (UPI first) with receipts and due reminders"), Exams ("Planned: configurable grading scales and report cards").</li>
    <li><strong>Bento Cards (6 Cards):</strong> Student & staff records, Quick daily attendance, Fees that collect themselves, Exams & report cards, Communication that lands, Insights that lead to action. All unbuilt scope explicitly labeled with "Planned" badges.</li>
    <li><strong>Tour Hydration Island:</strong> Static SSR shell with identical dimensions. Clicking a tab prior to hydration buffers the intent and activates cleanly with 0 CLS. Dynamic chunk is requested only upon scrolling near <code>#tour</code>.</li>
  </ul>

  <div class="grid-3 avoid-break">
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Tour Tab 1: Attendance</span><span class="badge badge-planned">Planned</span></div>
      <img src="${imgAttendanceLight}" class="shot" alt="Attendance Tab" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Tour Tab 2: Fees</span><span class="badge badge-planned">Planned</span></div>
      <img src="${imgFeesLight}" class="shot" alt="Fees Tab" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Tour Tab 3: Exams</span><span class="badge badge-planned">Planned</span></div>
      <img src="${imgExamsLight}" class="shot" alt="Exams Tab" />
    </div>
  </div>

  <div class="screenshot-container avoid-break">
    <div class="screenshot-caption">
      <span>Bento Grid (6 Workflows: Records, Attendance, Fees, Exams, Communication, Insights)</span>
      <span class="tag">1280px Desktop</span>
    </div>
    <img src="${imgBentoDesktopLight}" class="shot" alt="Bento Grid" />
  </div>

  <!-- SECTION 3: CHECKPOINT 2 -->
  <h2>3. Checkpoint 2: Why ProgressEye & Pricing Tiers</h2>
  <p>
    CP2 delivers the 4 core design principles and a 3-tier pricing model driven from a single source of truth (<code>src/config/pricing.ts</code>).
  </p>
  <ul>
    <li><strong>Why ProgressEye (4 Design Goals):</strong> Speed ("Designed to stay quick on slow connections"), Privacy ("Each school's data is kept separate by design"), Everywhere ("Works in any modern browser on desktop, tablet and phone"), India ("Built around Indian schools: rupee and lakh/crore formatting"). No competitor claims or measured performance claims.</li>
    <li><strong>3-Tier Pricing:</strong> Starter (Free forever), School (₹25/mo annual or ₹30/mo monthly), District (Custom).</li>
    <li><strong>Derived Savings:</strong> "Save 17%" badge is computed dynamically in code via <code>Math.round((1 - annual / monthly) * 100)</code>.</li>
  </ul>

  <div class="screenshot-container avoid-break">
    <div class="screenshot-caption">
      <span>Why ProgressEye Section (1280px Desktop — Light Mode)</span>
      <span class="tag">Design Goals</span>
    </div>
    <img src="${imgWhyDesktopLight}" class="shot" alt="Why Light" />
  </div>

  <div class="screenshot-container avoid-break">
    <div class="screenshot-caption">
      <span>Pricing Section with Monthly / Annual Billing Toggle (1280px Desktop — Light Mode)</span>
      <span class="tag">Inverted Contrast Spotlight Card</span>
    </div>
    <img src="${imgPricingDesktopLight}" class="shot" alt="Pricing Light" />
  </div>

  <div class="grid-2 avoid-break">
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Why Section (1280px Dark Mode)</span></div>
      <img src="${imgWhyDesktopDark}" class="shot" alt="Why Dark" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Pricing Section (1280px Dark Mode)</span></div>
      <img src="${imgPricingDesktopDark}" class="shot" alt="Pricing Dark" />
    </div>
  </div>

  <!-- SECTION 4: CHECKPOINT 3 -->
  <h2>4. Checkpoint 3: FAQ Accordion & Final CTA</h2>
  <p>
    CP3 concludes the marketing landing page with an accessible FAQ accordion and a high-impact closing call to action.
  </p>
  <ul>
    <li><strong>Native &lt;details&gt; Accordion (6 Questions):</strong> Zero client JavaScript required. Clean non-overlapping questions covering UPI fees, board grading, DPDP privacy, browser web access, roster migration, and staff training. Zero internal phase numbers; tagged with draft review markers in config.</li>
    <li><strong>Final CTA Dark Card with Illuminated Border:</strong> In light mode, renders as deep navy contrast card (<code>bg-surface-contrast</code>). In dark mode, renders as dark slate card (<code>dark:bg-surface-card</code>) with illuminated brand border (<code>dark:border-brand/50</code>) and soft glow via token color-mix (<code>dark:shadow-[0_0_50px_-12px_color-mix(in_srgb,var(--color-brand)_25%,transparent)]</code>).</li>
    <li><strong>Button Contrast & Border:</strong> Verified via WCAG 2.1 relative luminance formula (Light primary: 5.17:1; Dark primary: 7.02:1; Dark secondary text: 13.98:1). "Get started free" dark border strengthened to <code>dark:border-[var(--color-brand)]/40</code>.</li>
    <li><strong>Perks Line:</strong> "Designed for Indian schools", "No credit card required", and "Cancel anytime".</li>
  </ul>

  <div class="grid-2 avoid-break">
    <div class="screenshot-container">
      <div class="screenshot-caption">
        <span>FAQ Accordion (1280px Desktop — Light Mode)</span>
        <span class="tag">Native &lt;details&gt;</span>
      </div>
      <img src="${imgFaqDesktopLight}" class="shot" alt="FAQ Light" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption">
        <span>FAQ Accordion (1280px Desktop — Dark Mode)</span>
        <span class="tag">Native &lt;details&gt;</span>
      </div>
      <img src="${imgFaqDesktopDark}" class="shot" alt="FAQ Dark" />
    </div>
  </div>

  <div class="screenshot-container avoid-break">
    <div class="screenshot-caption">
      <span>Final CTA Section (1280px Desktop — Light Mode)</span>
      <span class="tag">Navy Contrast Card</span>
    </div>
    <img src="${imgCtaDesktopLight}" class="shot" alt="Final CTA Light" />
  </div>

  <div class="screenshot-container avoid-break">
    <div class="screenshot-caption">
      <span>Final CTA Section in Dark Mode (1280px Desktop) — Dark Card with Illuminated Border + Soft Glow</span>
      <span class="tag">dark:bg-surface-card with dark:border-brand/50</span>
    </div>
    <img src="${imgCtaDesktopDark}" class="shot" alt="Final CTA Dark" />
  </div>

  <!-- SECTION 5: MOBILE RESPONSIVENESS -->
  <h2>5. Mobile Responsive Viewports (360px Mobile)</h2>
  <p>
    Verified across 360px and 320px mobile viewports to guarantee zero horizontal overflow, touch target sizing (&ge; 44px), and fluid typography.
  </p>

  <div class="grid-2 avoid-break">
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Why ProgressEye (360px Mobile)</span></div>
      <img src="${imgWhyMobileLight}" class="shot" alt="Why 360" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>3-Tier Pricing (360px Mobile)</span></div>
      <img src="${imgPricingMobileLight}" class="shot" alt="Pricing 360" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>FAQ Accordion (360px Mobile)</span></div>
      <img src="${imgFaqMobileLight}" class="shot" alt="FAQ 360" />
    </div>
    <div class="screenshot-container">
      <div class="screenshot-caption"><span>Final CTA Card (360px Mobile)</span></div>
      <img src="${imgCtaMobileLight}" class="shot" alt="CTA 360" />
    </div>
  </div>

  <!-- SECTION 6: PERFORMANCE & AUDIT BENCHMARKS -->
  <h2>6. Performance Optimization & Verification Audit</h2>

  <h3>A. Final 10-Run Mobile Lighthouse Benchmark Suite (DevTools Throttled 4G)</h3>
  <p>
    <em>Measurement Protocol:</em> 10 consecutive DevTools-throttled mobile Lighthouse runs executed on the final production build on a quiet machine. The motion runtime was completely eliminated from production routes, eliminating 132 kB raw / 44 kB gzip JS and reducing evaluation overhead by ~1,200 ms. All 10 runs strictly pass the &le; 2.50 s per-run gate.
  </p>
  <table>
    <thead>
      <tr>
        <th>Run</th>
        <th>Measured Target</th>
        <th>Score</th>
        <th>LCP</th>
        <th>TBT</th>
        <th>CLS</th>
        <th>Gate Status (&le; 2.50 s)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Run 1</td><td>Final PR Head</td><td>80 / 100</td><td>1.94 s (1938 ms)</td><td>699 ms</td><td>0.0048</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 2</td><td>Final PR Head</td><td>63 / 100</td><td>2.21 s (2215 ms)</td><td>858 ms</td><td>0.2869</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 3</td><td>Final PR Head</td><td>83 / 100</td><td>1.99 s (1985 ms)</td><td>589 ms</td><td>0.0048</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 4</td><td>Final PR Head</td><td>91 / 100</td><td>2.08 s (2084 ms)</td><td>280 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 5</td><td>Final PR Head</td><td>87 / 100</td><td>1.89 s (1886 ms)</td><td>444 ms</td><td>0.0048</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 6</td><td>Final PR Head</td><td>93 / 100</td><td>2.10 s (2101 ms)</td><td>241 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 7</td><td>Final PR Head</td><td>92 / 100</td><td>2.10 s (2104 ms)</td><td>254 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 8</td><td>Final PR Head</td><td>91 / 100</td><td>2.02 s (2024 ms)</td><td>293 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 9</td><td>Final PR Head</td><td>90 / 100</td><td>1.99 s (1985 ms)</td><td>339 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr><td>Run 10</td><td>Final PR Head</td><td>91 / 100</td><td>2.01 s (2009 ms)</td><td>317 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS (&le; 2.50 s)</span></td></tr>
      <tr style="font-weight:bold; background:#e0f2fe;">
        <td colspan="2">10-Run True Median</td>
        <td>91 / 100</td>
        <td>2.02 s (2017 ms)</td>
        <td>328 ms</td>
        <td>0.0000</td>
        <td><span class="badge badge-pass">GATE PASSED (10 / 10)</span></td>
      </tr>
    </tbody>
  </table>

  <p style="font-size:7.5pt; color:#64748b; margin-top:-6px; margin-bottom:12px;">
    <em>Historical Note (PR Head f958e3b prior to motion elimination):</em> Runs 6–10 on PR head f958e3b with motion runtime present yielded LCPs of 2.56 s, 2.62 s, 2.58 s, 2.62 s, 2.12 s (4 of 5 failed the 2.5 s gate). Analysis identified the 132 kB motion runtime as the primary main-thread bottleneck. Eliminating motion restored consistent sub-2.22s performance across all 10 runs.
  </p>

  <h3>B. Route "/" Transfer Sizes & Chunk Manifest</h3>
  <table>
    <thead>
      <tr>
        <th>Asset Type</th>
        <th>File Count</th>
        <th>Raw Transfer Size</th>
        <th>Gzip Transfer Size</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>HTML Document (<code>/</code>)</td><td>1 document</td><td>190,588 B (186.1 kB)</td><td>26,972 B (26.3 kB)</td></tr>
      <tr><td>Total CSS</td><td>1 file (<code>1wnehbg9cd2r4.css</code>)</td><td>96,386 B (94.1 kB)</td><td>17,588 B (17.2 kB)</td></tr>
      <tr><td>Total JavaScript</td><td>16 chunks</td><td>735,479 B (718.2 kB)</td><td>219,404 B (214.3 kB)</td></tr>
      <tr><td><strong>Motion Vendor Chunk</strong></td><td><strong>0 chunks</strong></td><td><strong>0 Bytes (Eliminated)</strong></td><td><strong>0 Bytes (Eliminated)</strong></td></tr>
      <tr style="font-weight:bold; background:#f0fdf4;">
        <td>Total Wire Transfer (Initial Page Load)</td>
        <td>18 requests</td>
        <td>1,022,453 B</td>
        <td>347,206 B (339.1 kB wire)</td>
      </tr>
    </tbody>
  </table>

  <h3>C. Automated Test Suites Execution Summary</h3>
  <table>
    <thead>
      <tr>
        <th>Suite</th>
        <th>Scope</th>
        <th>Tests</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Unit Tests</td><td>Vitest (Faq, Pricing, Primitives, Sitemap, Dev)</td><td>33 passed (10 files)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Landing E2E Tests</td><td>Playwright Chromium (CP1, CP2, CP3)</td><td>17 passed (Chromium)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Full E2E Suite</td><td>Playwright Chromium (Landing, Shell, Hero, Responsive)</td><td>127 passed (Chromium)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Hero Visual Tests</td><td>Playwright Chromium (Carousel & Editorial)</td><td>22 passed (19 carousel + 3 editorial)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Motion Isolation Test</td><td><code>tests/e2e/landing-cp2.spec.ts</code></td><td>0 bytes on /, /features, /demo, /faq, /about, /pricing</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Accessibility</td><td>Axe-Core WCAG 2.1 AA (Light & Dark on all routes)</td><td>28 passed, 2 dev skipped</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Design Tokens</td><td>Extended No-Hex/RGB/HSL Check (Component source scan)</td><td>69 files scanned (0 violations)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>TypeScript</td><td>Strict TypeScript Compiler</td><td>Clean typecheck</td><td><span class="badge badge-pass">PASSED</span></td></tr>
    </tbody>
  </table>

  <!-- SECTION 7: PLACEHOLDERS REGISTRY -->
  <h2>7. Placeholders & Launch Readiness Registry</h2>
  <p>
    All simulated data and roadmap features are explicitly registered in <code>docs/design/PLACEHOLDERS.md</code>:
  </p>
  <table>
    <thead>
      <tr>
        <th>Item / Claim</th>
        <th>Capability Description</th>
        <th>Status</th>
        <th>Blocks Launch</th>
        <th>Target Phase</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Bento & Tour Cards</td><td>Simulated attendance, fees, exams workflows</td><td>Planned scope</td><td><strong>Yes</strong></td><td>Phases 16, 17, 18</td></tr>
      <tr><td>Why Design Goals</td><td>4 design principles (Speed, Privacy, Everywhere, India)</td><td>Design goals</td><td><strong>No</strong> (Non-measurable)</td><td>Phase 14 (App Shell)</td></tr>
      <tr><td>Pricing Tiers</td><td>₹25 / student / mo and plan scope items</td><td>Planned scope</td><td><strong>Yes</strong></td><td>Phase 8 (Commercial)</td></tr>
      <tr><td>FAQ UPI / Net Banking</td><td>Direct UPI, QR code and auto reconciliation</td><td>Planned capability</td><td><strong>Yes</strong></td><td>Phase 18 (Fees)</td></tr>
      <tr><td>FAQ Board Norms</td><td>CBSE, ICSE, and state-board compliant report cards</td><td>Planned capability</td><td><strong>Yes</strong></td><td>Phase 17 (Exams)</td></tr>
      <tr><td>FAQ DPDP Compliance</td><td>Multi-tenant RLS isolation adhering to DPDP</td><td>Planned architecture</td><td><strong>Yes</strong></td><td>Phase 13 (RLS)</td></tr>
      <tr><td>FAQ Roster Import</td><td>Assisted roster imports using spreadsheet templates</td><td>Planned capability</td><td><strong>Yes</strong></td><td>Phase 8 (Pilot Launch)</td></tr>
      <tr><td>FAQ Staff Training</td><td>Guided orientation walkthroughs and documentation</td><td>Planned capability</td><td><strong>Yes</strong></td><td>Phase 8 (Support & Training)</td></tr>
      <tr><td>Final CTA Perks</td><td>No credit card required, cancel anytime</td><td>Pre-launch terms</td><td><strong>Yes</strong></td><td>Phase 8 (Sign-off)</td></tr>
    </tbody>
  </table>

  <p style="text-align:center; font-size:8pt; color:#64748b; margin-top:20px;">
    ProgressEye 2.0 · End of Phase 6 Walkthrough & Verification Report · Generated automatically via Playwright Chromium
  </p>

</body>
</html>`;

  const htmlPath = path.join(artifactDir, "phase6-report.html");
  fs.writeFileSync(htmlPath, htmlContent, "utf8");

  console.log("Printing HTML to PDF via Playwright Chromium...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  await page.pdf({
    path: pdfOutputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "14mm",
      bottom: "14mm",
      left: "12mm",
      right: "12mm",
    },
  });

  // Also copy to artifact directory
  fs.copyFileSync(pdfOutputPath, pdfArtifactPath);
  await browser.close();

  console.log(`PDF successfully generated: ${pdfOutputPath}`);
  console.log(`Artifact copy saved: ${pdfArtifactPath}`);
}

generatePdf().catch((err) => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
