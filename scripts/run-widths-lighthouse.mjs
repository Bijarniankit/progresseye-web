import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const widths = [
  { width: 320, height: 640, label: "320px" },
  { width: 360, height: 640, label: "360px" },
  { width: 412, height: 823, label: "412px" },
];

const OUT_DIR = path.resolve(process.cwd(), ".lighthouseci/widths");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function median(arr) {
  if (arr.length === 0) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const allRuns = [];
const summary = [];

console.log("=== Running Lighthouse 5-Run Mobile Suite Across 320px, 360px, 412px ===");

for (const w of widths) {
  console.log(`\n--- Viewport Width: ${w.label} (${w.width}x${w.height}) ---`);
  const runsForWidth = [];

  for (let i = 1; i <= 5; i++) {
    const outPath = path.join(OUT_DIR, `width-${w.width}-run${i}.report`);
    const cmd =
      `pnpm exec lighthouse http://127.0.0.1:3000/ ` +
      `--chrome-flags="--headless --no-sandbox --disable-gpu" ` +
      `--output=json ` +
      `--output-path=${outPath} ` +
      `--only-categories=performance ` +
      `--form-factor=mobile ` +
      `--screenEmulation.mobile=true ` +
      `--screenEmulation.width=${w.width} ` +
      `--screenEmulation.height=${w.height} ` +
      `--throttling-method=devtools`;

    try {
      execSync(cmd, { stdio: "ignore" });
      const candidate1 = outPath;
      const candidate2 = `${outPath}.report.json`;
      const file = fs.existsSync(candidate1)
        ? candidate1
        : fs.existsSync(candidate2)
          ? candidate2
          : null;

      if (file) {
        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        const runData = {
          width: w.label,
          run: i,
          perf: Math.round((data.categories.performance?.score || 0) * 100),
          lcp: Math.round(data.audits["largest-contentful-paint"]?.numericValue || 0),
          tbt: Math.round(data.audits["total-blocking-time"]?.numericValue || 0),
          cls: parseFloat((data.audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(4)),
        };
        runsForWidth.push(runData);
        allRuns.push(runData);
        console.log(
          `  Run ${i}: Perf=${runData.perf}, LCP=${runData.lcp}ms, TBT=${runData.tbt}ms, CLS=${runData.cls}`,
        );
      } else {
        console.error(`  Run ${i}: Report file not found at ${outPath}`);
      }
    } catch (e) {
      console.error(`  Run ${i} failed: ${e.message}`);
    }
  }

  const medPerf = median(runsForWidth.map((r) => r.perf));
  const medLcp = median(runsForWidth.map((r) => r.lcp));
  const medTbt = median(runsForWidth.map((r) => r.tbt));
  const medCls = median(runsForWidth.map((r) => r.cls));

  summary.push({
    width: w.label,
    runs: runsForWidth.length,
    medPerf,
    medLcp,
    medTbt,
    medCls: medCls.toFixed(4),
  });
}

console.log("\n=== 15-Run Raw Results ===");
console.table(allRuns);

console.log("\n=== Viewport Width Medians Summary ===");
console.table(summary);
