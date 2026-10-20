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

async function runBenchmark() {
  console.log("==========================================================");
  console.log(" 20-RUN DEVTOOLS THROTTLED LIGHTHOUSE CLS & PERFORMANCE AUDIT");
  console.log("==========================================================");
  console.log("Target: http://localhost:3000/");

  // Warmup production server
  for (let i = 0; i < 3; i++) {
    await fetch("http://localhost:3000/");
  }

  const runs = [];

  for (let i = 1; i <= 20; i++) {
    console.log(`\n[Run ${i}/20] Running Lighthouse throttled mobile...`);
    const outputPath = path.join(artifactDir, `lh-20run-run-${i}`);

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
    const passLcp = lcp <= 2500;
    const passCls = cls <= 0.01;

    // Check for layout shift elements
    const shiftElements = audits["layout-shift-elements"]?.details?.items || [];
    const layoutShifts = audits["layout-shifts"]?.details?.items || [];

    const runData = {
      run: i,
      score,
      lcp,
      fcp,
      tbt,
      cls,
      passLcp,
      passCls,
      shiftElements,
      layoutShifts,
    };
    runs.push(runData);

    console.log(
      `  -> Run ${i.toString().padStart(2, " ")}: Score ${score} | LCP ${(lcp / 1000).toFixed(2)}s (${lcp}ms) [${passLcp ? "PASS" : "FAIL"}] | TBT ${tbt}ms | CLS ${cls.toFixed(4)} [${passCls ? "PASS" : "FAIL"}]`,
    );

    if (cls > 0.01) {
      console.warn(`     WARNING: CLS > 0.01 on Run ${i}!`);
      console.warn(`     Shift Elements:`, JSON.stringify(shiftElements, null, 2));
      console.warn(`     Layout Shifts:`, JSON.stringify(layoutShifts, null, 2));
    }
  }

  const medians = {
    score: Math.round(median(runs.map((r) => r.score))),
    lcp: Math.round(median(runs.map((r) => r.lcp))),
    fcp: Math.round(median(runs.map((r) => r.fcp))),
    tbt: Math.round(median(runs.map((r) => r.tbt))),
    cls: Number(median(runs.map((r) => r.cls)).toFixed(4)),
  };

  const finalOutput = {
    runs,
    medians,
    gate: {
      targetLcpMax: 2500,
      targetClsMax: 0.01,
      targetTbtMedianMax: 600,
      allLcpPassed: runs.every((r) => r.passLcp),
      allClsPassed: runs.every((r) => r.passCls),
      medianTbtPassed: medians.tbt <= 600,
    },
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(artifactDir, "cls-20-runs-results.json"),
    JSON.stringify(finalOutput, null, 2),
    "utf-8",
  );

  console.log("\n==========================================================");
  console.log("       ALL 20 DEVTOOLS THROTTLED RUNS SUMMARY");
  console.log("==========================================================");
  runs.forEach((r) => {
    console.log(
      `Run ${r.run.toString().padStart(2, " ")}: Score ${r.score} | LCP ${(r.lcp / 1000).toFixed(2)}s (${r.lcp}ms) [${r.passLcp ? "PASS" : "FAIL"}] | TBT ${r.tbt.toString().padStart(4, " ")}ms | CLS ${r.cls.toFixed(4)} [${r.passCls ? "PASS" : "FAIL"}]`,
    );
  });
  console.log("----------------------------------------------------------");
  console.log(`20-Run Median Score: ${medians.score} / 100`);
  console.log(`20-Run Median LCP:   ${(medians.lcp / 1000).toFixed(2)}s (${medians.lcp} ms)`);
  console.log(`20-Run Median TBT:   ${medians.tbt} ms`);
  console.log(`20-Run Median CLS:   ${medians.cls.toFixed(4)}`);
  console.log(`All LCP <= 2500ms:   ${finalOutput.gate.allLcpPassed ? "YES (PASSED)" : "NO"}`);
  console.log(`All CLS <= 0.01:     ${finalOutput.gate.allClsPassed ? "YES (PASSED)" : "NO"}`);
  console.log(`Median TBT <= 600ms: ${finalOutput.gate.medianTbtPassed ? "YES (PASSED)" : "NO"}`);
}

runBenchmark().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
