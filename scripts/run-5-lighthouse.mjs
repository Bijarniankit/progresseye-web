import { execSync } from "node:child_process";
import fs from "node:fs";

function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function main() {
  console.log("Warming up production server on http://localhost:3000/ ...");
  for (let i = 0; i < 3; i++) {
    await fetch("http://localhost:3000/");
  }
  console.log("Warm-up complete. Starting 5 Lighthouse Mobile runs...\n");

  const runs = [];

  for (let i = 1; i <= 5; i++) {
    const outputPath = `lh-run-${i}.json`;
    console.log(`[Run ${i}/5] Executing Lighthouse mobile...`);
    execSync(
      `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${outputPath} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --chrome-flags="--headless"`,
      { stdio: "ignore" },
    );

    const report = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    const audits = report.audits;
    const score = Math.round(report.categories.performance.score * 100);
    const lcp = audits["largest-contentful-paint"]?.numericValue;
    const lcpDisplay = audits["largest-contentful-paint"]?.displayValue;
    const fcp = audits["first-contentful-paint"]?.numericValue;
    const fcpDisplay = audits["first-contentful-paint"]?.displayValue;
    const speedIndex = audits["speed-index"]?.numericValue;
    const tbt = audits["total-blocking-time"]?.numericValue;
    const cls = audits["cumulative-layout-shift"]?.numericValue;

    const metrics = audits.metrics?.details?.items?.[0] || {};
    const obsLcp = metrics.observedLargestContentfulPaint;
    const obsFcp = metrics.observedFirstContentfulPaint;

    const breakdownItems = audits["lcp-breakdown-insight"]?.details?.items || [];
    let ttfb = null;
    let renderDelay = null;
    let elementSnippet = null;

    for (const item of breakdownItems) {
      if (item.type === "table" && item.items) {
        for (const sub of item.items) {
          if (sub.subpart === "timeToFirstByte") ttfb = sub.duration;
          if (sub.subpart === "elementRenderDelay") renderDelay = sub.duration;
        }
      }
      if (item.type === "node") {
        elementSnippet = item.snippet || item.nodeLabel;
      }
    }

    const runData = {
      run: i,
      score,
      lcp: Math.round(lcp),
      lcpDisplay,
      fcp: Math.round(fcp),
      fcpDisplay,
      speedIndex: Math.round(speedIndex),
      tbt: Math.round(tbt),
      cls: Number(cls?.toFixed(3) || 0),
      obsLcp: Math.round(obsLcp || 0),
      obsFcp: Math.round(obsFcp || 0),
      ttfb: Math.round(ttfb || 0),
      renderDelay: Math.round(renderDelay || 0),
      elementSnippet,
    };

    runs.push(runData);
    console.log(
      `  -> Run ${i}: Score ${runData.score} | LCP ${runData.lcpDisplay} (${runData.lcp}ms) | FCP ${runData.fcpDisplay} | TBT ${runData.tbt}ms | ObsLCP ${runData.obsLcp}ms`,
    );

    // Clean up individual run json
    try {
      fs.unlinkSync(outputPath);
    } catch {}
  }

  // True statistical medians calculated per-column
  const trueMedians = {
    score: Math.round(median(runs.map((r) => r.score))),
    lcp: Math.round(median(runs.map((r) => r.lcp))),
    obsLcp: Math.round(median(runs.map((r) => r.obsLcp))),
    fcp: Math.round(median(runs.map((r) => r.fcp))),
    obsFcp: Math.round(median(runs.map((r) => r.obsFcp))),
    speedIndex: Math.round(median(runs.map((r) => r.speedIndex))),
    tbt: Math.round(median(runs.map((r) => r.tbt))),
    cls: Number(median(runs.map((r) => r.cls)).toFixed(3)),
    ttfb: Math.round(median(runs.map((r) => r.ttfb))),
    renderDelay: Math.round(median(runs.map((r) => r.renderDelay))),
    lcpElement: runs[0].elementSnippet,
  };

  console.log("\n========================================================");
  console.log("       LIGHTHOUSE MOBILE 5-RUN SUMMARY (TRUE MEDIANS)");
  console.log("========================================================");
  console.log(`Performance Score: ${trueMedians.score} / 100`);
  console.log(
    `LCP (Simulated):    ${trueMedians.lcp} ms (${(trueMedians.lcp / 1000).toFixed(2)} s)`,
  );
  console.log(
    `LCP (Observed):     ${trueMedians.obsLcp} ms (${(trueMedians.obsLcp / 1000).toFixed(2)} s)`,
  );
  console.log(
    `FCP (Simulated):    ${trueMedians.fcp} ms (${(trueMedians.fcp / 1000).toFixed(2)} s)`,
  );
  console.log(
    `FCP (Observed):     ${trueMedians.obsFcp} ms (${(trueMedians.obsFcp / 1000).toFixed(2)} s)`,
  );
  console.log(`Speed Index:        ${trueMedians.speedIndex} ms`);
  console.log(`Total Blocking:     ${trueMedians.tbt} ms`);
  console.log(`CLS:                ${trueMedians.cls}`);
  console.log(`TTFB:               ${trueMedians.ttfb} ms`);
  console.log(`Element Render Del: ${trueMedians.renderDelay} ms`);
  console.log(`LCP Element:        ${trueMedians.lcpElement}`);
  console.log("--------------------------------------------------------");
  console.log("All Runs Table:");
  console.table(runs);

  fs.writeFileSync(
    "lighthouse-5runs-summary.json",
    JSON.stringify({ runs, medians: trueMedians }, null, 2),
  );
}

main().catch((err) => {
  console.error("Error running lighthouse suite:", err);
  process.exit(1);
});
