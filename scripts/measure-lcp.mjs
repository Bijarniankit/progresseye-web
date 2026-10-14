import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("Running Lighthouse on http://localhost:3000/ ...");
const outputFile = "lighthouse-baseline.json";

try {
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${outputFile} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --chrome-flags="--headless"`,
    { stdio: "inherit" },
  );

  const report = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
  const audits = report.audits;
  const perfScore = report.categories.performance.score * 100;
  const lcpMetric = audits["largest-contentful-paint"]?.displayValue;
  const lcpNumeric = audits["largest-contentful-paint"]?.numericValue;

  console.log("\n=== Lighthouse Baseline Mobile Results ===");
  console.log(`Performance Score: ${perfScore.toFixed(0)} / 100`);
  console.log(`LCP Display Value: ${lcpMetric} (${lcpNumeric?.toFixed(0)} ms)`);

  const lcpElement = audits["largest-contentful-paint-element"];
  console.log("\n--- LCP Element ---");
  if (lcpElement?.details?.items) {
    for (const item of lcpElement.details.items) {
      console.log(`Node: ${item.node?.snippet || item.node?.nodeLabel}`);
    }
  }

  const _breakdown = audits["lcp-breakdown"] || audits["largest-contentful-paint"];
  console.log("\n--- LCP Breakdown (Diagnostic Details) ---");
  const lcpBreakdown = audits["lcp-breakdown"]?.details?.items?.[0] || {};
  console.log(
    "TTFB (Time to First Byte):",
    lcpBreakdown.ttfb ||
      audits["server-response-time"]?.displayValue ||
      audits["server-response-time"]?.numericValue,
  );
  console.log("Resource Load Delay:", lcpBreakdown.loadDelay);
  console.log("Resource Load Time (Duration):", lcpBreakdown.loadDuration);
  console.log("Element Render Delay:", lcpBreakdown.renderDelay);
} catch (err) {
  console.error("Lighthouse failed:", err);
}
