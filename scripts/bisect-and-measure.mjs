import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const artifactDir =
  "C:\\Users\\ankit\\.gemini\\antigravity\\brain\\372d7063-5f3e-4649-9080-0274d00a3078";
const pagePath = "src/app/(marketing)/page.tsx";
const originalPageContent = fs.readFileSync(pagePath, "utf-8");

function stopPort3000() {
  try {
    execSync(
      'powershell -Command "Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"',
      { stdio: "ignore" },
    );
  } catch {}
}

async function startPort3000() {
  stopPort3000();
  const child = spawn("cmd.exe", ["/c", "pnpm", "start"], { detached: true, stdio: "ignore" });
  child.unref();

  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://localhost:3000/");
      if (res.status === 200) {
        return;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server failed to respond on port 3000");
}

async function getPageMetrics() {
  const res = await fetch("http://localhost:3000/");
  const html = await res.text();
  const rawHtmlBytes = Buffer.byteLength(html, "utf-8");
  const gzipHtmlBytes = zlib.gzipSync(Buffer.from(html)).length;

  const cssMatches = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map(
    (m) => m[1],
  );
  let totalRawCss = 0;
  let totalGzipCss = 0;
  for (const cssUrl of cssMatches) {
    const cssRes = await fetch(`http://localhost:3000${cssUrl}`);
    const cssText = await cssRes.text();
    totalRawCss += Buffer.byteLength(cssText, "utf-8");
    totalGzipCss += zlib.gzipSync(Buffer.from(cssText)).length;
  }

  const domNodeCount = (html.match(/<[a-zA-Z0-9-]+(\s|>)/g) || []).length;

  return {
    rawHtmlKb: (rawHtmlBytes / 1024).toFixed(1),
    gzipHtmlKb: (gzipHtmlBytes / 1024).toFixed(1),
    rawCssKb: (totalRawCss / 1024).toFixed(1),
    gzipCssKb: (totalGzipCss / 1024).toFixed(1),
    domNodeCount,
  };
}

function runSingleLighthouse(tag = "bisect") {
  const outputPath = path.join(artifactDir, `lh-${tag}`);
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${outputPath} --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=devtools --chrome-flags="--headless"`,
    { stdio: "ignore" },
  );

  let actualJson = outputPath;
  if (!fs.existsSync(actualJson)) {
    if (fs.existsSync(`${outputPath}.json`)) actualJson = `${outputPath}.json`;
    else if (fs.existsSync(`${outputPath}.report.json`)) actualJson = `${outputPath}.report.json`;
  }

  const report = JSON.parse(fs.readFileSync(actualJson, "utf-8"));
  const audits = report.audits;
  const score = Math.round(report.categories.performance.score * 100);
  const lcp = Math.round(audits["largest-contentful-paint"]?.numericValue || 0);
  const tbt = Math.round(audits["total-blocking-time"]?.numericValue || 0);
  const fcp = Math.round(audits["first-contentful-paint"]?.numericValue || 0);
  const cls = Number((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(4));

  return { score, lcp, tbt, fcp, cls };
}

function updatePageSections({ tour = true, bento = true, why = true, pricing = true }) {
  let content = originalPageContent;
  if (!pricing) {
    content = content.replace("<PricingSection />", "{/* <PricingSection /> */}");
  }
  if (!why) {
    content = content.replace("<WhySection />", "{/* <WhySection /> */}");
  }
  if (!bento) {
    content = content.replace("<BentoGrid />", "{/* <BentoGrid /> */}");
  }
  if (!tour) {
    content = content.replace("<ProductTourSection />", "{/* <ProductTourSection /> */}");
  }
  fs.writeFileSync(pagePath, content, "utf-8");
}

async function rebuildAndMeasure(name, config) {
  console.log(`\n--- Measuring: ${name} ---`);
  updatePageSections(config);
  execSync("pnpm build", { stdio: "ignore" });
  await startPort3000();

  const metrics = await getPageMetrics();
  const lh = runSingleLighthouse(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  console.log(`  Result for ${name}:`);
  console.log(
    `  HTML: ${metrics.rawHtmlKb} kB (${metrics.gzipHtmlKb} kB gz) | CSS: ${metrics.rawCssKb} kB (${metrics.gzipCssKb} kB gz) | DOM: ${metrics.domNodeCount} nodes`,
  );
  console.log(`  LCP: ${lh.lcp} ms | TBT: ${lh.tbt} ms | FCP: ${lh.fcp} ms | Score: ${lh.score}`);

  return { name, ...metrics, ...lh };
}

async function runBisect() {
  const allResults = [];
  try {
    // 1. Without Pricing
    const res2 = await rebuildAndMeasure("Without Pricing", {
      tour: true,
      bento: true,
      why: true,
      pricing: false,
    });
    allResults.push(res2);

    // 2. Without Why & Pricing
    const res3 = await rebuildAndMeasure("Without Why and Pricing", {
      tour: true,
      bento: true,
      why: false,
      pricing: false,
    });
    allResults.push(res3);

    // 3. Without Bento, Why & Pricing
    const res4 = await rebuildAndMeasure("Without Bento, Why and Pricing", {
      tour: true,
      bento: false,
      why: false,
      pricing: false,
    });
    allResults.push(res4);

    // 4. Hero Only (Baseline)
    const res5 = await rebuildAndMeasure("Hero Only (Baseline)", {
      tour: false,
      bento: false,
      why: false,
      pricing: false,
    });
    allResults.push(res5);
  } finally {
    // Always restore original page.tsx
    fs.writeFileSync(pagePath, originalPageContent, "utf-8");
    execSync("pnpm build", { stdio: "ignore" });
    await startPort3000();
  }

  fs.writeFileSync(
    path.join(artifactDir, "bisect-summary.json"),
    JSON.stringify(allResults, null, 2),
    "utf-8",
  );
  console.log("\nBisect measurements complete and original page restored!");
}

runBisect().catch(console.error);
