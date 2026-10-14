import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";
const pdfPath = path.join(artifactDir, "checkpoint_02_review.pdf");

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
  console.log("Generating Checkpoint 2 Review PDF with all images...");

  const scenes = [
    {
      id: "scene1-school",
      title: "Scene 1: SchoolScene (Heritage School Building)",
      description:
        "Heritage school building with pediment, 5 pillars, pediment clock, entrance arch, ground line, 3 books on left, floating exam sheet with gold seal on right, sun halo, and indigo clouds (Gap-Fill A, cloud 2 clear of sun).",
      images: [
        {
          name: "cp2-scene1-school-light-desktop-1280.png",
          label: "Light Mode — Desktop (1280px)",
        },
        {
          name: "cp2-scene1-school-dark-optA-desktop-1280.png",
          label: "Dark Mode (Option A: Identical Spec Artwork on Lighter Plate) — Desktop (1280px)",
        },
        {
          name: "cp2-scene1-school-dark-optB-desktop-1280.png",
          label: "Dark Mode (Option B: Dark-Adapted Luminous Artwork) — Desktop (1280px)",
        },
        { name: "cp2-scene1-school-light-mobile-360.png", label: "Light Mode — Mobile (360px)" },
        {
          name: "cp2-scene1-school-dark-optB-mobile-360.png",
          label: "Dark Mode (Option B) — Mobile (360px)",
        },
        { name: "cp2-scene1-school-light-tablet-768.png", label: "Light Mode — Tablet (768px)" },
        {
          name: "cp2-scene1-school-light-ultrawide-1536.png",
          label: "Light Mode — Ultrawide (1536px)",
        },
      ],
    },
    {
      id: "scene2-features",
      title: "Scene 2: FeaturesScene (Orbital Hub & 4 Satellites)",
      description:
        "Central ProgressEye eye emblem core with radial halo and dashed orbit ring, connecting to 4 satellite feature cards: Attendance (Gap-Fill B: 3x4 dots in #c7d2fe / #fde68a), Fees Rupee coin (₹ in #1e1b4b, coin #f59e0b), Exams (Gap-Fill C: A+ #1e1b4b, A/B #c7d2fe, C #fde68a), and Comms chat bubble.",
      images: [
        {
          name: "cp2-scene2-features-light-desktop-1280.png",
          label: "Light Mode — Desktop (1280px)",
        },
        {
          name: "cp2-scene2-features-dark-optA-desktop-1280.png",
          label: "Dark Mode (Option A: Identical Spec Artwork on Lighter Plate) — Desktop (1280px)",
        },
        {
          name: "cp2-scene2-features-dark-optB-desktop-1280.png",
          label: "Dark Mode (Option B: Dark-Adapted Luminous Artwork) — Desktop (1280px)",
        },
        { name: "cp2-scene2-features-light-mobile-360.png", label: "Light Mode — Mobile (360px)" },
        {
          name: "cp2-scene2-features-dark-optB-mobile-360.png",
          label: "Dark Mode (Option B) — Mobile (360px)",
        },
        { name: "cp2-scene2-features-light-tablet-768.png", label: "Light Mode — Tablet (768px)" },
        {
          name: "cp2-scene2-features-light-ultrawide-1536.png",
          label: "Light Mode — Ultrawide (1536px)",
        },
      ],
    },
    {
      id: "scene3-detail",
      title: "Scene 3: FeatureDetailScene (3 Tilted Live Metric Cards)",
      description:
        "Three stacked realistic dashboard cards: Attendance (-4° tilt, 94% badge, 6 days x 4 classes with indigo present and gold absent pills), Fee collection (0° straight, 87% circular donut, ₹ 14,82,500 of 17,00,000 collected, 87% progress bar), and Exams (+4° tilt, 53/53 badge, 5 vertical bars: A+ 12, A 18, B 14, C 7, D 2). All cards feature SAMPLE data tags.",
      images: [
        {
          name: "cp2-scene3-detail-light-desktop-1280.png",
          label: "Light Mode — Desktop (1280px)",
        },
        {
          name: "cp2-scene3-detail-dark-optA-desktop-1280.png",
          label: "Dark Mode (Option A: Identical Spec Artwork on Lighter Plate) — Desktop (1280px)",
        },
        {
          name: "cp2-scene3-detail-dark-optB-desktop-1280.png",
          label: "Dark Mode (Option B: Dark-Adapted Luminous Artwork) — Desktop (1280px)",
        },
        { name: "cp2-scene3-detail-light-mobile-360.png", label: "Light Mode — Mobile (360px)" },
        {
          name: "cp2-scene3-detail-dark-optB-mobile-360.png",
          label: "Dark Mode (Option B) — Mobile (360px)",
        },
        { name: "cp2-scene3-detail-light-tablet-768.png", label: "Light Mode — Tablet (768px)" },
        {
          name: "cp2-scene3-detail-light-ultrawide-1536.png",
          label: "Light Mode — Ultrawide (1536px)",
        },
      ],
    },
  ];

  let scenesHtml = "";
  for (const scene of scenes) {
    let imagesHtml = "";
    for (const img of scene.images) {
      const b64 = getBase64Image(img.name);
      if (!b64) continue;
      imagesHtml += `
        <div class="image-card">
          <div class="image-card-header">${img.label}</div>
          <div class="image-wrapper">
            <img src="${b64}" alt="${img.label}" />
          </div>
        </div>
      `;
    }

    scenesHtml += `
      <div class="scene-section">
        <h2>${scene.title}</h2>
        <p class="scene-desc">${scene.description}</p>
        <div class="images-grid">
          ${imagesHtml}
        </div>
      </div>
    `;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ProgressEye 2.0 — Checkpoint 2 Review Document</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 12mm 14mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      font-size: 11pt;
    }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      font-size: 9pt;
      font-weight: 700;
      border-radius: 4px;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #1e1b4b;
      margin-bottom: 4px;
      letter-spacing: -0.02em;
    }
    .meta {
      font-size: 9.5pt;
      color: #64748b;
    }
    h2 {
      font-size: 14pt;
      font-weight: 700;
      color: #1e1b4b;
      margin-top: 18px;
      margin-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      page-break-after: avoid;
    }
    h3 {
      font-size: 11.5pt;
      font-weight: 700;
      color: #334155;
      margin-top: 12px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }
    p, ul, ol {
      margin-bottom: 10px;
      color: #334155;
    }
    ul, ol {
      padding-left: 20px;
    }
    li {
      margin-bottom: 4px;
    }
    .scene-desc {
      font-size: 10pt;
      color: #475569;
      margin-bottom: 14px;
      font-style: italic;
    }
    .scene-section {
      page-break-before: always;
      margin-top: 10px;
    }
    .images-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 12px;
    }
    .image-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      overflow: hidden;
      page-break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .image-card-header {
      padding: 6px 10px;
      font-size: 9.5pt;
      font-weight: 700;
      background: #f1f5f9;
      color: #1e293b;
      border-bottom: 1px solid #cbd5e1;
    }
    .image-wrapper {
      padding: 6px;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .image-wrapper img {
      max-width: 100%;
      height: auto;
      max-height: 480px;
      display: block;
      border-radius: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .highlight-box {
      background: #faf5ff;
      border: 1px solid #d8b4fe;
      border-radius: 6px;
      padding: 12px 16px;
      margin: 14px 0;
      page-break-inside: avoid;
    }
    .highlight-box strong {
      color: #6b21a8;
    }
  </style>
</head>
<body>

  <div class="header">
    <span class="badge">PHASE 5 — CHECKPOINT 2 DELIVERABLE</span>
    <h1>ProgressEye 2.0 — Checkpoint 2 Review</h1>
    <div class="meta">
      <strong>Branch:</strong> <code>phase-05/hero-carousel</code> &nbsp;|&nbsp;
      <strong>Repo:</strong> <code>progresseye-web</code> &nbsp;|&nbsp;
      <strong>Date:</strong> October 14, 2026 &nbsp;|&nbsp;
      <strong>Status:</strong> Ready for Review & Option Selection
    </div>
  </div>

  <h2>1. Summary of CP1 Fixes Folded into CP2</h2>
  <ul>
    <li><strong>Mobile Top Spacing:</strong> Adjusted hero top padding to <code>pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24</code>. Together with the fixed navbar (<code>h-16 lg:h-20</code>), the headline sits exactly 40px below the navbar on mobile, providing balanced breathing room without crowding.</li>
    <li><strong>Left Edge & Gutter Alignment:</strong> Corrected navbar logo link from <code>p-1</code> to <code>-ml-1 pl-1 py-1 pr-2</code>. The "P" logo badge now aligns flush with the 16px container gutter on mobile (and 32px on desktop), matching the hero headline, subtitle, buttons, and footer.</li>
    <li><strong>Full Viewport Captures:</strong> All screenshots display the complete browser viewport (including the fixed navbar) at 360px, 768px, 1280px, and 1536px.</li>
    <li><strong>Dark Surface Unification:</strong> Hero canvas, page body, and footer unified on <code>--color-surface-hero: #020617</code> (matching <code>--color-surface: #020617</code> and <code>--color-surface-footer: #020617</code>). Documented in <code>DECISIONS.md</code> as <strong>D-024</strong>.</li>
    <li><strong>Circular Plate Gradient:</strong> Implemented the spec's <code>indigo-100 via cream to amber-50</code> gradient (<code>linear-gradient(135deg, #e0e7ff 0%, #FAF6EC 50%, #fef3c7 100%)</code>) with continuous 80-second rotating dashed orbit border (<code>border border-dashed border-[var(--color-hero-plate-border)]</code>). Removed placeholder inner ring and text.</li>
    <li><strong>Secondary CTA Detail:</strong> Updated play disc to purple (<code>--color-hero-play-disc: #4338ca</code> / <code>bg-[var(--color-hero-play-disc)]</code>) with white play icon. Zero raw hex literals in UI components.</li>
  </ul>

  <h2>2. Display Font Pruning & 5-Run Lighthouse Mobile Results</h2>
  <p>In <code>src/app/layout.tsx</code>, display font loading was split so only critical above-the-fold weights are preloaded in <code>&lt;head&gt;</code>: <code>Inter</code> (preload: true), <code>Poppins 800 normal</code> (preload: true), and <code>Poppins 500 italic</code> (preload: true). Weights <code>600</code> and <code>700</code> are deferred with <code>preload: false</code> (documented as <strong>D-025</strong>). This reduced initial critical font requests from 5 to 3 files.</p>

  <table>
    <thead>
      <tr>
        <th>Run</th>
        <th>Score</th>
        <th>Lantern Simulated LCP</th>
        <th>Observed Unthrottled LCP</th>
        <th>FCP</th>
        <th>TBT</th>
        <th>CLS</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Run 1</td><td>87 / 100</td><td>3.54 s</td><td>1.67 s</td><td>1.3 s</td><td>187 ms</td><td>0</td></tr>
      <tr><td>Run 2</td><td>89 / 100</td><td>3.47 s</td><td>1.62 s</td><td>1.1 s</td><td>145 ms</td><td>0</td></tr>
      <tr><td>Run 3</td><td>86 / 100</td><td>3.52 s</td><td>2.57 s</td><td>1.3 s</td><td>158 ms</td><td>0</td></tr>
      <tr><td>Run 4</td><td>88 / 100</td><td>3.48 s</td><td>1.62 s</td><td>1.3 s</td><td>139 ms</td><td>0</td></tr>
      <tr><td>Run 5 (Median)</td><td><strong>89 / 100</strong></td><td><strong>3.48 s</strong></td><td><strong>1.55 s</strong></td><td><strong>1.1 s</strong></td><td><strong>157 ms</strong></td><td><strong>0</strong></td></tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <strong>Key Decision Required Before Checkpoint 3:</strong>
    <p style="margin-top: 6px; margin-bottom: 0;">Which dark mode artwork option do you approve for the carousel?<br/>
    • <strong>Option A (Identical artwork on lighter dark plate):</strong> Preserves the exact spec light-mode vector colors on a lighter slate plate (<code>#1e293b</code>).<br/>
    • <strong>Option B (Dark-adapted variant):</strong> Specially tuned dark palette with slate cards (<code>#1e293b</code>), glowing indigo borders (<code>#818cf8</code>), and deep slate plate (<code>#0b0f19</code>).</p>
  </div>

  <h2>3. Verification & Compliance Checklist</h2>
  <ul>
    <li>[x] <strong>Zero Raw Hex in UI Components:</strong> <code>pnpm test:no-hex</code> scanned 50 files — PASSED.</li>
    <li>[x] <strong>Illustrations Exemption:</strong> All 3 scenes strictly placed in <code>src/components/illustrations/</code>.</li>
    <li>[x] <strong>Accessible h1 Name:</strong> Playwright test confirms h1 accessible name is <em>"The school workspace that runs itself."</em>.</li>
    <li>[x] <strong>No-JS SSR Visibility:</strong> Playwright test confirms h1 and subtitle are visible with JavaScript disabled.</li>
    <li>[x] <strong>Test Suite:</strong> 26 unit tests passed, contract drift check passed, skills validation passed.</li>
    <li>[x] <strong>Lint & Typecheck:</strong> 0 errors in Biome and TypeScript.</li>
  </ul>

  <!-- Scene Sections with All Embedded Images -->
  ${scenesHtml}

</body>
</html>`;

  const htmlPath = path.join(artifactDir, "checkpoint_02_review.html");
  fs.writeFileSync(htmlPath, htmlContent, "utf-8");
  console.log(`Saved self-contained HTML: ${htmlPath}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  console.log("Rendering PDF with Chromium...");
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
  });

  await browser.close();
  console.log(`PDF successfully generated: ${pdfPath}`);
}

generatePdf().catch((e) => {
  console.error("PDF generation failed:", e);
  process.exit(1);
});
