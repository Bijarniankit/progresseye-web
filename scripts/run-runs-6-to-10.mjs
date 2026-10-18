import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";

function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function runRuns6To10() {
  console.log("==================================================");
  console.log("   EXECUTING 5 MORE THROTTLED RUNS (RUNS 6 - 10)  ");
  console.log("==================================================");

  // Warmup
  for (let i = 0; i < 3; i++) {
    await fetch("http://localhost:3000/");
  }

  const existingFile = path.join(artifactDir, "fresh-lighthouse-5-results.json");
  let existingRuns = [];
  if (fs.existsSync(existingFile)) {
    const data = JSON.parse(fs.readFileSync(existingFile, "utf-8"));
    existingRuns = data.throttledRuns || [];
  }

  const newRuns = [];

  for (let i = 6; i <= 10; i++) {
    console.log(`[Throttled Run ${i}/10] Running Lighthouse on quiet server...`);
    const outputPath = path.join(artifactDir, `lh-devtools-run-${i}`);

    execSync(
      `npx --yes lighthouse http://localhost:3000/ --output=json,html --output-path=${outputPath} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=devtools --chrome-flags="--headless"`,
      { stdio: "ignore" },
    );

    let actualJson = `${outputPath}.report.json`;
    if (!fs.existsSync(actualJson)) actualJson = `${outputPath}.json`;

    const report = JSON.parse(fs.readFileSync(actualJson, "utf-8"));
    const audits = report.audits;
    const score = Math.round(report.categories.performance.score * 100);
    const lcp = Math.round(audits["largest-contentful-paint"]?.numericValue || 0);
    const fcp = Math.round(audits["first-contentful-paint"]?.numericValue || 0);
    const tbt = Math.round(audits["total-blocking-time"]?.numericValue || 0);
    const cls = Number((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(4));

    const runData = {
      run: i,
      score,
      lcp,
      fcp,
      tbt,
      cls,
    };
    newRuns.push(runData);
    console.log(
      `  -> Run ${i}: Score ${runData.score} | LCP ${(runData.lcp / 1000).toFixed(2)}s (${runData.lcp}ms) | FCP ${(runData.fcp / 1000).toFixed(2)}s | TBT ${runData.tbt}ms | CLS ${runData.cls}`,
    );
  }

  const all10Runs = [...existingRuns, ...newRuns];

  const medians = {
    score: Math.round(median(all10Runs.map((r) => r.score))),
    lcp: Math.round(median(all10Runs.map((r) => r.lcp))),
    fcp: Math.round(median(all10Runs.map((r) => r.fcp))),
    tbt: Math.round(median(all10Runs.map((r) => r.tbt))),
    cls: Number(median(all10Runs.map((r) => r.cls)).toFixed(4)),
  };

  const finalOutput = {
    all10Runs,
    medians,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(artifactDir, "fresh-lighthouse-10-results.json"),
    JSON.stringify(finalOutput, null, 2),
    "utf-8",
  );

  console.log("\n==================================================");
  console.log("       ALL 10 DEVTOOLS THROTTLED RUNS");
  console.log("==================================================");
  all10Runs.forEach((r) => {
    console.log(
      `Run ${r.run.toString().padStart(2, " ")}: Score ${r.score} | LCP ${(r.lcp / 1000).toFixed(2)}s (${r.lcp}ms) | TBT ${r.tbt.toString().padStart(4, " ")}ms | CLS ${r.cls}`,
    );
  });
  console.log("--------------------------------------------------");
  console.log(`10-Run Median Score: ${medians.score} / 100`);
  console.log(`10-Run Median LCP:   ${(medians.lcp / 1000).toFixed(2)}s (${medians.lcp} ms)`);
  console.log(`10-Run Median FCP:   ${(medians.fcp / 1000).toFixed(2)}s (${medians.fcp} ms)`);
  console.log(`10-Run Median TBT:   ${medians.tbt} ms`);
  console.log(`10-Run Median CLS:   ${medians.cls}`);
  console.log("==================================================\n");
}

runRuns6To10().catch((err) => {
  console.error("Runs failed:", err);
  process.exit(1);
});
