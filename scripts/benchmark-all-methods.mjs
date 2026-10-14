import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("================================================================================");
console.log("   5-RUN COMPREHENSIVE PERFORMANCE BENCHMARK (Simulated vs Throttled vs Observed)");
console.log("================================================================================");

const NUM_RUNS = 5;
const simulatedResults = [];
const throttledResults = [];

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

for (let i = 1; i <= NUM_RUNS; i++) {
  console.log(`\n--- Run ${i} of ${NUM_RUNS} ---`);

  // 1. Simulated Run (Mobile Lantern)
  const simFile = `lh-sim-${i}.json`;
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${simFile} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --chrome-flags="--headless"`,
    { stdio: "ignore" },
  );
  const simReport = JSON.parse(fs.readFileSync(simFile, "utf-8"));
  fs.unlinkSync(simFile);

  const simAudits = simReport.audits;
  const simScore = Math.round(simReport.categories.performance.score * 100);
  const simLcp = Math.round(simAudits["largest-contentful-paint"]?.numericValue || 0);
  const simFcp = Math.round(simAudits["first-contentful-paint"]?.numericValue || 0);
  const simTbt = Math.round(simAudits["total-blocking-time"]?.numericValue || 0);
  const obsLcp = Math.round(
    simAudits["largest-contentful-paint"]?.details?.items?.[0]?.renderTime ||
      simAudits["largest-contentful-paint"]?.details?.items?.[0]?.loadDelay ||
      simLcp,
  );
  const obsFcp = Math.round(
    simAudits["first-contentful-paint"]?.details?.items?.[0]?.timing || simFcp,
  );

  simulatedResults.push({
    run: i,
    score: simScore,
    lcp: simLcp,
    fcp: simFcp,
    tbt: simTbt,
    obsLcp,
    obsFcp,
  });

  console.log(
    `  Simulated Run ${i}: Score ${simScore} | LCP ${simLcp}ms | FCP ${simFcp}ms | TBT ${simTbt}ms | ObsLCP ${obsLcp}ms`,
  );

  // 2. DevTools Throttled Run
  const throtFile = `lh-throt-${i}.json`;
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${throtFile} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=devtools --chrome-flags="--headless"`,
    { stdio: "ignore" },
  );
  const throtReport = JSON.parse(fs.readFileSync(throtFile, "utf-8"));
  fs.unlinkSync(throtFile);

  const throtAudits = throtReport.audits;
  const throtScore = Math.round(throtReport.categories.performance.score * 100);
  const throtLcp = Math.round(throtAudits["largest-contentful-paint"]?.numericValue || 0);
  const throtFcp = Math.round(throtAudits["first-contentful-paint"]?.numericValue || 0);
  const throtTbt = Math.round(throtAudits["total-blocking-time"]?.numericValue || 0);

  throttledResults.push({
    run: i,
    score: throtScore,
    lcp: throtLcp,
    fcp: throtFcp,
    tbt: throtTbt,
  });

  console.log(
    `  Throttled Run ${i}: Score ${throtScore} | LCP ${throtLcp}ms | FCP ${throtFcp}ms | TBT ${throtTbt}ms`,
  );
}

// Compute Medians
const simMedian = {
  score: median(simulatedResults.map((r) => r.score)),
  lcp: median(simulatedResults.map((r) => r.lcp)),
  fcp: median(simulatedResults.map((r) => r.fcp)),
  tbt: median(simulatedResults.map((r) => r.tbt)),
  obsLcp: median(simulatedResults.map((r) => r.obsLcp)),
  obsFcp: median(simulatedResults.map((r) => r.obsFcp)),
};

const throtMedian = {
  score: median(throttledResults.map((r) => r.score)),
  lcp: median(throttledResults.map((r) => r.lcp)),
  fcp: median(throttledResults.map((r) => r.fcp)),
  tbt: median(throttledResults.map((r) => r.tbt)),
};

console.log("\n================================================================================");
console.log("                           5-RUN BENCHMARK SUMMARY TABLE");
console.log("================================================================================");
console.log("Method                 | Score | LCP (ms) | FCP (ms) | TBT (ms) | Status vs Gate");
console.log("-----------------------|-------|----------|----------|----------|-----------------");
console.log(
  `Simulated (Lantern)    |  ${simMedian.score}   |   ${simMedian.lcp}   |   ${simMedian.fcp}   |    ${simMedian.tbt}    | Simulated Model`,
);
console.log(
  `DevTools Throttled     |  ${throtMedian.score}   |   ${throtMedian.lcp}   |   ${throtMedian.fcp}   |   ${throtMedian.tbt}    | Exit Gate <= 2500ms (${throtMedian.lcp <= 2500 ? "PASS" : "FAIL"})`,
);
console.log(
  `Observed (Unthrottled) |   -   |   ${simMedian.obsLcp}   |   ${simMedian.obsFcp}   |    -     | Raw Network / Runtime`,
);
console.log("================================================================================\n");

const data = { simulatedResults, throttledResults, simMedian, throtMedian };
fs.writeFileSync("benchmark-results.json", JSON.stringify(data, null, 2), "utf-8");
console.log("Results saved to benchmark-results.json");
