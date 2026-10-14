import { execSync } from "node:child_process";
import fs from "node:fs";

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
  }

  // Calculate medians
  const sortedByLcp = [...runs].sort((a, b) => a.lcp - b.lcp);
  const _sortedByScore = [...runs].sort((a, b) => a.score - b.score);
  const medianRun = sortedByLcp[2]; // 3rd of 5

  console.log("\n========================================================");
  console.log("       LIGHTHOUSE MOBILE 5-RUN SUMMARY");
  console.log("========================================================");
  console.log(`Median Run: #${medianRun.run}`);
  console.log(`Performance Score: ${medianRun.score} / 100`);
  console.log(`LCP (Simulated):    ${medianRun.lcp} ms (${medianRun.lcpDisplay})`);
  console.log(`LCP (Observed):     ${medianRun.obsLcp} ms`);
  console.log(`FCP (Simulated):    ${medianRun.fcp} ms (${medianRun.fcpDisplay})`);
  console.log(`FCP (Observed):     ${medianRun.obsFcp} ms`);
  console.log(`Speed Index:        ${medianRun.speedIndex} ms`);
  console.log(`Total Blocking:     ${medianRun.tbt} ms`);
  console.log(`CLS:                ${medianRun.cls}`);
  console.log(`TTFB:               ${medianRun.ttfb} ms`);
  console.log(`Element Render Del: ${medianRun.renderDelay} ms`);
  console.log(`LCP Element:        ${medianRun.elementSnippet}`);
  console.log("--------------------------------------------------------");
  console.log("All Runs Table:");
  console.table(runs);

  fs.writeFileSync(
    "lighthouse-5runs-summary.json",
    JSON.stringify({ runs, median: medianRun }, null, 2),
  );
}

main().catch((err) => {
  console.error("Error running lighthouse suite:", err);
  process.exit(1);
});
