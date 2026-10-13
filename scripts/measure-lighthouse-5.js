const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const URL = "http://localhost:3000/";
const NUM_RUNS = 5;

function runLighthouse(theme, runIndex, throttlingMethod = "simulate") {
  const outputPath = path.join(__dirname, `lh-${theme}-run-${runIndex}.json`);
  const chromeFlags = `--headless --force-prefers-color-scheme=${theme}`;
  let cmd = `npx lighthouse ${URL} --output=json --output-path="${outputPath}" --chrome-flags="${chromeFlags}" --only-categories=performance`;
  if (throttlingMethod === "devtools") {
    cmd += " --throttling-method=devtools";
  }

  console.log(
    `[${theme.toUpperCase()} Run ${runIndex + 1}/${NUM_RUNS}] Running Lighthouse (${throttlingMethod})...`,
  );
  try {
    execSync(cmd, { stdio: "ignore" });
    const data = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    const perfScore = Math.round((data.categories.performance?.score || 0) * 100);
    const lcpMs = Math.round(data.audits["largest-contentful-paint"]?.numericValue || 0);
    const lcpDisplay = data.audits["largest-contentful-paint"]?.displayValue || "";
    const fcpMs = Math.round(data.audits["first-contentful-paint"]?.numericValue || 0);
    const tbtMs = Math.round(data.audits["total-blocking-time"]?.numericValue || 0);
    const cls = data.audits["cumulative-layout-shift"]?.numericValue || 0;
    const speedIndexMs = Math.round(data.audits["speed-index"]?.numericValue || 0);

    // Clean up temporary file
    try {
      fs.unlinkSync(outputPath);
    } catch {}

    const result = {
      run: runIndex + 1,
      theme,
      perfScore,
      lcpMs,
      lcpDisplay,
      fcpMs,
      tbtMs,
      cls,
      speedIndexMs,
    };
    console.log(
      `  -> Score: ${perfScore}, LCP: ${lcpDisplay} (${lcpMs}ms), FCP: ${fcpMs}ms, TBT: ${tbtMs}ms, CLS: ${cls}`,
    );
    return result;
  } catch (err) {
    console.error(`  Error running Lighthouse on run ${runIndex + 1}:`, err.message);
    throw err;
  }
}

function calculateMedian(results, sortKey = "lcpMs") {
  const sorted = [...results].sort((a, b) => a[sortKey] - b[sortKey]);
  const mid = Math.floor(sorted.length / 2);
  return sorted[mid];
}

async function main() {
  console.log("=== ProgressEye 2.0: Lighthouse Mobile 5-Run Measurement ===");
  console.log(`Target: ${URL}\n`);

  // 1. Light Mode (5 runs)
  console.log("--- LIGHT MODE (5 runs) ---");
  const lightResults = [];
  for (let i = 0; i < NUM_RUNS; i++) {
    lightResults.push(runLighthouse("light", i));
  }
  const lightMedian = calculateMedian(lightResults);

  // 2. Dark Mode (5 runs)
  console.log("\n--- DARK MODE (5 runs) ---");
  const darkResults = [];
  for (let i = 0; i < NUM_RUNS; i++) {
    darkResults.push(runLighthouse("dark", i));
  }
  const darkMedian = calculateMedian(darkResults);

  console.log("\n=================== SUMMARY RESULTS ===================");
  console.log("\nLight Mode Runs:");
  console.table(lightResults);
  console.log(
    `Light Mode Median (by LCP): Score ${lightMedian.perfScore}, LCP ${lightMedian.lcpDisplay} (${lightMedian.lcpMs}ms), FCP ${lightMedian.fcpMs}ms, TBT ${lightMedian.tbtMs}ms`,
  );

  console.log("\nDark Mode Runs:");
  console.table(darkResults);
  console.log(
    `Dark Mode Median (by LCP): Score ${darkMedian.perfScore}, LCP ${darkMedian.lcpDisplay} (${darkMedian.lcpMs}ms), FCP ${darkMedian.fcpMs}ms, TBT ${darkMedian.tbtMs}ms`,
  );

  fs.writeFileSync(
    path.join(__dirname, "lighthouse-5-results.json"),
    JSON.stringify({ lightResults, lightMedian, darkResults, darkMedian }, null, 2),
  );
  console.log("\nSaved full results to scripts/lighthouse-5-results.json");
}

main().catch(console.error);
