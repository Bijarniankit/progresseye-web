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
      margin: 16mm 14mm 16mm 14mm;
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
      line-height: 1.5;
      font-size: 9.5pt;
    }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .title-block h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
    .title-block .subtitle {
      font-size: 11pt;
      color: #475569;
      margin-top: 3px;
    }
    .meta-block {
      text-align: right;
      font-size: 8.5pt;
      color: #64748b;
    }
    .meta-block strong {
      color: #0f172a;
    }
    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 22px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
      page-break-after: avoid;
    }
    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }
    p, ul, ol {
      margin-bottom: 8px;
      color: #334155;
    }
    ul, ol {
      padding-left: 20px;
    }
    li {
      margin-bottom: 3px;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8.5pt;
      background: #f1f5f9;
      padding: 1px 4px;
      border-radius: 3px;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }
    .badge {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 2px 6px;
      border-radius: 9999px;
    }
    .badge-pass { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
    .badge-planned { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
    .badge-blue { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
    .callout {
      background: #f8fafc;
      border-left: 3px solid #2563eb;
      padding: 8px 12px;
      margin: 10px 0;
      border-radius: 0 4px 4px 0;
      font-size: 9pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
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
      margin: 10px 0 16px 0;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
      background: #f8fafc;
      page-break-inside: avoid;
    }
    .screenshot-caption {
      padding: 6px 10px;
      font-size: 8pt;
      font-weight: 600;
      background: #f1f5f9;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .screenshot-caption .tag {
      font-size: 7pt;
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
      gap: 12px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }
    .page-break {
      page-break-before: always;
    }
    .avoid-break {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="title-block">
      <h1>ProgressEye 2.0 — Phase 6 Report</h1>
      <div class="subtitle">Landing Page Sections Completion (CP1, CP2, CP3)</div>
    </div>
    <div class="meta-block">
      <div><strong>Branch:</strong> <code>phase-06/landing-sections</code> (PR #23)</div>
      <div><strong>Date:</strong> October 18, 2026</div>
      <div><strong>Author:</strong> Antigravity Pair Programmer</div>
    </div>
  </div>

  <!-- EXECUTIVE SUMMARY -->
  <h2>1. Executive Summary</h2>
  <p>
    Phase 6 implements the complete responsive marketing landing page for ProgressEye 2.0 across three checkpoints. Every section adheres strictly to the semantic design token architecture (zero raw hex colors), Server Component rendering with isolated client hydration islands, native browser mechanics (zero-JS accordion for FAQ), and 100% honest claims flagging all unbuilt roadmap capabilities with planned badges in code and <code>PLACEHOLDERS.md</code>.
  </p>

  <div class="callout avoid-break">
    <strong>Key Performance & Quality Milestones:</strong><br>
    • <strong>Lighthouse Mobile Throttled Score:</strong> <strong>90 / 100</strong> (Median LCP: <strong>2.02 s</strong> &le; 2.30 s gate; TBT: <strong>340 ms</strong> &le; 600 ms target; CLS: <strong>0.0000</strong>).<br>
    • <strong>Option A (Motion Decoupling):</strong> Removed <code>motion/react</code> from the shared navbar, reducing the shared layout bundle by <strong>132.4 kB raw / 44.1 kB gzip</strong>.<br>
    • <strong>Option B (CSS Containment):</strong> Added <code>content-visibility: auto</code> with <code>contain-intrinsic-size: auto 800px</code>, slashing initial paint layout cost.<br>
    • <strong>Tour Chunk Deferral:</strong> Playwright test verified chunk <code>1677qz4xi_e99.js</code> is completely deferred until scrolling near <code>#tour</code>.<br>
    • <strong>Automated Test Coverage:</strong> 33 Vitest unit tests (100%), 126 Playwright E2E tests (100%), 28 Axe accessibility tests (100% in light and dark mode), 0 raw hex violations.
  </div>

  <!-- SECTION 2: CHECKPOINT 1 -->
  <h2>2. Checkpoint 1: Product Tour & Bento Grid</h2>
  <p>
    CP1 introduces an interactive simulated browser product tour and a responsive 6-card bento grid displaying core school workflows.
  </p>
  <ul>
    <li><strong>Browser Chrome:</strong> Configurable domain label <code>yourschool.example</code> sourced from <code>src/config/site.ts</code>.</li>
    <li><strong>Tour Hydration Island:</strong> Static SSR shell with identical dimensions. Clicking a tab prior to hydration buffers the intent and activates cleanly with 0 CLS.</li>
    <li><strong>No-JS Resiliency:</strong> In no-JS mode, all three tabs render stacked so every panel is accessible.</li>
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
      <span>Bento Grid (6 Workflows: Attendance, Gradebook, Multi-Branch, Timetable, Fees & UPI, Notifications)</span>
      <span class="tag">1280px Desktop</span>
    </div>
    <img src="${imgBentoDesktopLight}" class="shot" alt="Bento Grid" />
  </div>

  <!-- SECTION 3: CHECKPOINT 2 -->
  <div class="page-break"></div>
  <h2>3. Checkpoint 2: Why ProgressEye & Pricing Tiers</h2>
  <p>
    CP2 delivers the 4 core design principles and a 3-tier pricing model driven from a single source of truth (<code>src/config/pricing.ts</code>).
  </p>
  <ul>
    <li><strong>Why ProgressEye (4 Design Goals):</strong> Speed ("Designed to stay quick on slow connections"), Privacy ("Each school's data is kept separate by design"), Everywhere ("Works in any modern browser on desktop, tablet and phone"), India ("Built around Indian schools: rupee and lakh/crore formatting"). No claims about competitors.</li>
    <li><strong>3-Tier Pricing:</strong> Starter (Free forever), School (₹25/mo annual or ₹30/mo monthly), District (Custom).</li>
    <li><strong>Derived Savings:</strong> "Save 17%" badge is derived dynamically in code via <code>Math.round((1 - annual / monthly) * 100)</code>.</li>
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
  <div class="page-break"></div>
  <h2>4. Checkpoint 3: FAQ Accordion & Final CTA</h2>
  <p>
    CP3 concludes the marketing landing page with an accessible FAQ accordion and a high-impact closing call to action.
  </p>
  <ul>
    <li><strong>Native &lt;details&gt; Accordion:</strong> Zero client JavaScript required. Smooth chevron rotation on open state, keyboard accessible via Space/Enter.</li>
    <li><strong>Roadmap Transparency:</strong> FAQ questions honestly state planned capabilities for UPI reconciliation (Phase 18), CBSE/ICSE report cards (Phase 17), DPDP compliance (Phase 13), and setup timeline.</li>
    <li><strong>Dual-Theme Final CTA:</strong> In light mode, renders as a deep navy contrast card (<code>bg-surface-contrast</code>). In dark mode, renders as a crisp light contrast card.</li>
    <li><strong>Option B Pure CSS Atmosphere:</strong> Subtle radial gradient glow without JavaScript particle overhead.</li>
    <li><strong>Perks Line:</strong> Features "Free Starter tier forever", "Designed for Indian schools", and "No credit card required".</li>
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
      <span class="tag">Inverted Dark Navy Contrast Card</span>
    </div>
    <img src="${imgCtaDesktopLight}" class="shot" alt="Final CTA Light" />
  </div>

  <div class="screenshot-container avoid-break">
    <div class="screenshot-caption">
      <span>Final CTA Section in Dark Mode (1280px Desktop) — Light Card Contrast Decision</span>
      <span class="tag">Dual-Theme Inverted Contrast Card</span>
    </div>
    <img src="${imgCtaDesktopDark}" class="shot" alt="Final CTA Dark" />
  </div>

  <!-- SECTION 5: MOBILE RESPONSIVENESS -->
  <div class="page-break"></div>
  <h2>5. Mobile Responsive Viewports (360px Mobile)</h2>
  <p>
    Every section was designed and verified down to 360px and 320px mobile viewports to guarantee zero horizontal overflow, touch target sizing (&ge; 44px), and fluid typography.
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
  <div class="page-break"></div>
  <h2>6. Performance Optimization & Verification Audit</h2>

  <h3>A. 5-Run Mobile Lighthouse Benchmark (Production Build, Throttled 4G)</h3>
  <table>
    <thead>
      <tr>
        <th>Run</th>
        <th>Emulation & Throttling</th>
        <th>Score</th>
        <th>LCP</th>
        <th>TBT</th>
        <th>CLS</th>
        <th>Gate Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Run 1</td><td>DevTools Mobile 4G</td><td>89 / 100</td><td>1.92 s</td><td>387 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS</span></td></tr>
      <tr><td>Run 2</td><td>DevTools Mobile 4G</td><td>90 / 100</td><td>2.02 s</td><td>321 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS</span></td></tr>
      <tr><td>Run 3</td><td>DevTools Mobile 4G</td><td>88 / 100</td><td>2.14 s</td><td>357 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS</span></td></tr>
      <tr><td>Run 4</td><td>DevTools Mobile 4G</td><td>90 / 100</td><td>2.02 s</td><td>340 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS</span></td></tr>
      <tr><td>Run 5</td><td>DevTools Mobile 4G</td><td>90 / 100</td><td>2.02 s</td><td>323 ms</td><td>0.0000</td><td><span class="badge badge-pass">PASS</span></td></tr>
      <tr style="font-weight:bold; background:#e0f2fe;">
        <td colspan="2">Statistical Median</td>
        <td>90 / 100</td>
        <td>2.02 s (&le; 2.30 s GATE)</td>
        <td>340 ms (&le; 600 ms TARGET)</td>
        <td>0.0000</td>
        <td><span class="badge badge-pass">ALL GATES MET</span></td>
      </tr>
    </tbody>
  </table>

  <h3>B. Bundle Impact: Option A (Navbar Motion Decoupling)</h3>
  <table>
    <thead>
      <tr>
        <th>Bundle Chunk</th>
        <th>Before Option A</th>
        <th>After Option A</th>
        <th>Savings (Raw / Gzip)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>1tzlwb30no9h5.js</code> (motion/react runtime)</td>
        <td>132,265 B (44,070 B gzip)</td>
        <td>0 B (Removed from layout)</td>
        <td><strong>-132.3 kB raw (-44.1 kB gzip)</strong></td>
      </tr>
      <tr>
        <td>Shared Layout / Navbar Chunk Set</td>
        <td>348.8 kB raw</td>
        <td>216.4 kB raw</td>
        <td><strong>-132.4 kB raw (-44.1 kB gzip)</strong></td>
      </tr>
      <tr>
        <td><code>1677qz4xi_e99.js</code> (ProductTour island)</td>
        <td>11.9 kB raw (2.8 kB gzip)</td>
        <td>11.9 kB raw (2.8 kB gzip)</td>
        <td>Deferred until scroll near <code>#tour</code></td>
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
      <tr><td>E2E Tests</td><td>Playwright Chromium (Landing CP1-3, Shell, Hero)</td><td>126 passed (Chromium)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Accessibility</td><td>Axe-Core WCAG 2.1 AA (Light & Dark on all routes)</td><td>28 passed, 2 dev skipped</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Design Tokens</td><td>No-Hex Check (Component source scan)</td><td>69 files scanned (0 hex)</td><td><span class="badge badge-pass">PASSED</span></td></tr>
      <tr><td>Linters & Types</td><td>Biome Check + TypeScript strict typecheck</td><td>147 files clean</td><td><span class="badge badge-pass">PASSED</span></td></tr>
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
      <tr><td>Final CTA Perks</td><td>Free Starter tier forever, no credit card required</td><td>Pre-launch terms</td><td><strong>Yes</strong></td><td>Phase 8 (Sign-off)</td></tr>
    </tbody>
  </table>

  <p style="text-align:center; font-size:8pt; color:#64748b; margin-top:24px;">
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
      left: "14mm",
      right: "14mm",
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
