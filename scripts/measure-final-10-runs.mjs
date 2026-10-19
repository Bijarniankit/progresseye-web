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
  console.log(" FINAL 10-RUN DEVTOOLS THROTTLED MOBILE LIGHTHOUSE BENCHMARK");
  console.log("==========================================================");
  console.log("Target: http://localhost:3000/ (Pure CSS Hero, Zero Motion Runtime)");

  // Warmup production server
  for (let i = 0; i < 3; i++) {
    await fetch("http://localhost:3000/");
  }

  const runs = [];

  for (let i = 1; i <= 10; i++) {
    console.log(`\n[Run ${i}/10] Running Lighthouse throttled mobile...`);
    const outputPath = path.join(artifactDir, `lh-final-run-${i}`);

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
    const pass = lcp <= 2500;

    // Total byte weight breakdown
    const totalByteWeight = audits["total-byte-weight"]?.details?.items || [];
    let totalBytes = 0;
    let jsBytes = 0;
    let cssBytes = 0;
    let htmlBytes = 0;

    for (const item of totalByteWeight) {
      totalBytes += item.totalBytes || 0;
      if (item.url?.endsWith(".js") || item.url?.includes("/_next/static/chunks/")) {
        jsBytes += item.totalBytes || 0;
      } else if (item.url?.endsWith(".css") || item.url?.includes("/_next/static/css/")) {
        cssBytes += item.totalBytes || 0;
      } else if (item.url === "http://localhost:3000/" || item.url?.endsWith("/")) {
        htmlBytes += item.totalBytes || 0;
      }
    }

    const runData = {
      run: i,
      score,
      lcp,
      fcp,
      tbt,
      cls,
      pass,
      status: pass ? "PASS" : "FAIL",
      totalBytes,
      jsBytes,
      cssBytes,
      htmlBytes,
    };
    runs.push(runData);

    console.log(
      `  -> Run ${i}: Score ${runData.score} | LCP ${(runData.lcp / 1000).toFixed(2)}s (${runData.lcp}ms) [${runData.status}] | FCP ${(runData.fcp / 1000).toFixed(2)}s | TBT ${runData.tbt}ms | CLS ${runData.cls}`,
    );
  }

  const medians = {
    score: Math.round(median(runs.map((r) => r.score))),
    lcp: Math.round(median(runs.map((r) => r.lcp))),
    fcp: Math.round(median(runs.map((r) => r.fcp))),
    tbt: Math.round(median(runs.map((r) => r.tbt))),
    cls: Number(median(runs.map((r) => r.cls)).toFixed(4)),
    jsBytes: Math.round(median(runs.map((r) => r.jsBytes))),
    totalBytes: Math.round(median(runs.map((r) => r.totalBytes))),
  };

  const allPassed = runs.every((r) => r.pass);

  const finalOutput = {
    runs,
    medians,
    gate: {
      targetLcpMax: 2500,
      allPassed,
      passCount: runs.filter((r) => r.pass).length,
      failCount: runs.filter((r) => !r.pass).length,
    },
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(artifactDir, "final-10-runs-results.json"),
    JSON.stringify(finalOutput, null, 2),
    "utf-8",
  );

  console.log("\n==========================================================");
  console.log("       ALL 10 DEVTOOLS THROTTLED RUNS SUMMARY");
  console.log("==========================================================");
  runs.forEach((r) => {
    console.log(
      `Run ${r.run.toString().padStart(2, " ")}: Score ${r.score} | LCP ${(r.lcp / 1000).toFixed(2)}s (${r.lcp}ms) [${r.status}] | TBT ${r.tbt.toString().padStart(4, " ")}ms | CLS ${r.cls}`,
    );
  });
  console.log("----------------------------------------------------------");
  console.log(`10-Run Median Score: ${medians.score} / 100`);
  console.log(`10-Run Median LCP:   ${(medians.lcp / 1000).toFixed(2)}s (${medians.lcp} ms)`);
  console.log(`10-Run Median TBT:   ${medians.tbt} ms`);
  console.log(`10-Run Median CLS:   ${medians.cls}`);
  console.log(
    `Gate Status:         ${allPassed ? "PASSED (all <= 2.5s)" : `FAILED (${finalOutput.gate.failCount} runs > 2.5s)`}`,
  );
}

runBenchmark().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
