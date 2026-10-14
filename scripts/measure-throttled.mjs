import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("Measuring DevTools Throttled LCP on http://localhost:3000/ ...");
const outputFile = "lh-throttled.json";

try {
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${outputFile} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=devtools --chrome-flags="--headless"`,
    { stdio: "ignore" },
  );

  const report = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
  const audits = report.audits;
  const perfScore = Math.round(report.categories.performance.score * 100);
  const lcp = audits["largest-contentful-paint"]?.numericValue;
  const lcpDisplay = audits["largest-contentful-paint"]?.displayValue;
  const fcp = audits["first-contentful-paint"]?.numericValue;
  const fcpDisplay = audits["first-contentful-paint"]?.displayValue;
  const tbt = audits["total-blocking-time"]?.numericValue;

  const lcpElement = audits["largest-contentful-paint-element"]?.details?.items?.[0]?.node;

  console.log("\n==========================================");
  console.log("   DEVTOOLS THROTTLED MOBILE RESULTS");
  console.log("==========================================");
  console.log(`Performance Score: ${perfScore} / 100`);
  console.log(`LCP (DevTools Throttled): ${lcpDisplay} (${Math.round(lcp)} ms)`);
  console.log(`FCP (DevTools Throttled): ${fcpDisplay} (${Math.round(fcp)} ms)`);
  console.log(`TBT (DevTools Throttled): ${Math.round(tbt)} ms`);
  console.log(`LCP Element: ${lcpElement?.snippet || lcpElement?.nodeLabel}`);
  console.log("==========================================\n");

  fs.unlinkSync(outputFile);
} catch (e) {
  console.error("Error measuring throttled LCP:", e);
  process.exit(1);
}
