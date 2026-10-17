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

async function runLighthouseBenchmark() {
  console.log("==================================================");
  console.log("   FRESH 5-RUN LIGHTHOUSE MOBILE BENCHMARK SUITE");
  console.log("==================================================");
  console.log("Server: http://localhost:3000/");

  // Warm up production server
  for (let i = 0; i < 3; i++) {
    await fetch("http://localhost:3000/");
  }

  const throttledRuns = [];
  const simulatedRuns = [];

  // Run 5 DevTools Throttled runs
  console.log("\n--- Executing 5 DevTools Throttled Mobile Runs ---");
  for (let i = 1; i <= 5; i++) {
    console.log(`[Throttled Run ${i}/5] Running Lighthouse...`);
    const jsonPath = path.join(artifactDir, `lh-devtools-run-${i}.json`);
    const htmlPath = path.join(artifactDir, `lh-devtools-run-${i}.html`);

    execSync(
      `npx --yes lighthouse http://localhost:3000/ --output=json,html --output-path=${path.join(artifactDir, `lh-devtools-run-${i}`)} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=devtools --chrome-flags="--headless"`,
      { stdio: "ignore" },
    );

    // Lighthouse creates .report.json and .report.html if extension is omitted, or renames
    let actualJson = jsonPath;
    let actualHtml = htmlPath;
    if (!fs.existsSync(actualJson)) {
      const candidateJson = path.join(artifactDir, `lh-devtools-run-${i}.report.json`);
      if (fs.existsSync(candidateJson)) actualJson = candidateJson;
    }
    if (!fs.existsSync(actualHtml)) {
      const candidateHtml = path.join(artifactDir, `lh-devtools-run-${i}.report.html`);
      if (fs.existsSync(candidateHtml)) actualHtml = candidateHtml;
    }

    const report = JSON.parse(fs.readFileSync(actualJson, "utf-8"));
    const audits = report.audits;
    const score = Math.round(report.categories.performance.score * 100);
    const lcp = audits["largest-contentful-paint"]?.numericValue;
    const lcpDisplay = audits["largest-contentful-paint"]?.displayValue;
    const fcp = audits["first-contentful-paint"]?.numericValue;
    const fcpDisplay = audits["first-contentful-paint"]?.displayValue;
    const tbt = audits["total-blocking-time"]?.numericValue;
    const cls = audits["cumulative-layout-shift"]?.numericValue;

    // Extract LCP element node
    let lcpNode = null;
    const insightItems = audits["lcp-breakdown-insight"]?.details?.items || [];
    for (const item of insightItems) {
      if (item.type === "node") {
        lcpNode = item.nodeLabel || item.snippet;
      }
    }
    if (!lcpNode) {
      lcpNode = audits["largest-contentful-paint-element"]?.details?.items?.[0]?.node?.nodeLabel;
    }

    const data = {
      run: i,
      score,
      lcp: Math.round(lcp),
      lcpDisplay,
      fcp: Math.round(fcp),
      fcpDisplay,
      tbt: Math.round(tbt),
      cls: Number((cls || 0).toFixed(4)),
      lcpNode: lcpNode || "Hero Editorial Copy (<p> / <h1>)",
      jsonFile: path.basename(actualJson),
      htmlFile: path.basename(actualHtml),
    };
    throttledRuns.push(data);
    console.log(
      `  -> Run ${i}: Score ${data.score} | LCP ${data.lcpDisplay} (${data.lcp}ms) | FCP ${data.fcpDisplay} | TBT ${data.tbt}ms | CLS ${data.cls} | Node: ${data.lcpNode.slice(0, 45)}...`,
    );
  }

  // Run 5 Simulated (Lantern) runs
  console.log("\n--- Executing 5 Simulated (Lantern) Mobile Runs ---");
  for (let i = 1; i <= 5; i++) {
    console.log(`[Simulated Run ${i}/5] Running Lighthouse...`);
    const jsonPath = path.join(artifactDir, `lh-simulated-run-${i}.json`);
    const htmlPath = path.join(artifactDir, `lh-simulated-run-${i}.html`);

    execSync(
      `npx --yes lighthouse http://localhost:3000/ --output=json,html --output-path=${path.join(artifactDir, `lh-simulated-run-${i}`)} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --chrome-flags="--headless"`,
      { stdio: "ignore" },
    );

    let actualJson = jsonPath;
    let actualHtml = htmlPath;
    if (!fs.existsSync(actualJson)) {
      const candidateJson = path.join(artifactDir, `lh-simulated-run-${i}.report.json`);
      if (fs.existsSync(candidateJson)) actualJson = candidateJson;
    }
    if (!fs.existsSync(actualHtml)) {
      const candidateHtml = path.join(artifactDir, `lh-simulated-run-${i}.report.html`);
      if (fs.existsSync(candidateHtml)) actualHtml = candidateHtml;
    }

    const report = JSON.parse(fs.readFileSync(actualJson, "utf-8"));
    const audits = report.audits;
    const score = Math.round(report.categories.performance.score * 100);
    const lcp = audits["largest-contentful-paint"]?.numericValue;
    const lcpDisplay = audits["largest-contentful-paint"]?.displayValue;
    const fcp = audits["first-contentful-paint"]?.numericValue;
    const tbt = audits["total-blocking-time"]?.numericValue;
    const cls = audits["cumulative-layout-shift"]?.numericValue;

    const data = {
      run: i,
      score,
      lcp: Math.round(lcp),
      lcpDisplay,
      fcp: Math.round(fcp),
      tbt: Math.round(tbt),
      cls: Number((cls || 0).toFixed(4)),
      jsonFile: path.basename(actualJson),
      htmlFile: path.basename(actualHtml),
    };
    simulatedRuns.push(data);
    console.log(
      `  -> Simulated Run ${i}: Score ${data.score} | LCP ${data.lcpDisplay} (${data.lcp}ms) | TBT ${data.tbt}ms`,
    );
  }

  // Calculate true column-by-column medians
  const medians = {
    throttledScore: Math.round(median(throttledRuns.map((r) => r.score))),
    throttledLcp: Math.round(median(throttledRuns.map((r) => r.lcp))),
    throttledFcp: Math.round(median(throttledRuns.map((r) => r.fcp))),
    throttledTbt: Math.round(median(throttledRuns.map((r) => r.tbt))),
    throttledCls: Number(median(throttledRuns.map((r) => r.cls)).toFixed(4)),
    simulatedScore: Math.round(median(simulatedRuns.map((r) => r.score))),
    simulatedLcp: Math.round(median(simulatedRuns.map((r) => r.lcp))),
  };

  const results = {
    throttledRuns,
    simulatedRuns,
    medians,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(artifactDir, "fresh-lighthouse-5-results.json"),
    JSON.stringify(results, null, 2),
    "utf-8",
  );
  console.log("\n==================================================");
  console.log("   TRUE STATISTICAL MEDIANS (FRESH 5 RUNS)");
  console.log("==================================================");
  console.log(`DevTools Throttled Score: ${medians.throttledScore} / 100`);
  console.log(
    `DevTools Throttled LCP:   ${(medians.throttledLcp / 1000).toFixed(2)}s (${medians.throttledLcp} ms)`,
  );
  console.log(
    `DevTools Throttled FCP:   ${(medians.throttledFcp / 1000).toFixed(2)}s (${medians.throttledFcp} ms)`,
  );
  console.log(`DevTools Throttled TBT:   ${medians.throttledTbt} ms`);
  console.log(`Cumulative Layout Shift:  ${medians.throttledCls}`);
  console.log(`Simulated (Lantern) Score: ${medians.simulatedScore}`);
  console.log(`Simulated (Lantern) LCP:   ${(medians.simulatedLcp / 1000).toFixed(2)}s`);
  console.log("==================================================\n");
}

runLighthouseBenchmark().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
