#!/usr/bin/env node
/**
 * ProgressEye Staging Smoke Test & 12-Route Sweep
 * Verifies HTTP response codes, Content-Type, security headers, and latency.
 * Usage:
 *   node scripts/staging-smoke.mjs [target_url]
 * Default target: process.env.STAGING_URL || "http://localhost:3000"
 */

const BASE_URL = (
  process.env.BASE_URL ||
  process.argv[2] ||
  process.env.STAGING_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

const ROUTES = [
  { path: "/", expectedStatus: 200, type: "text/html" },
  { path: "/about", expectedStatus: 200, type: "text/html" },
  { path: "/careers", expectedStatus: 200, type: "text/html" },
  { path: "/contact", expectedStatus: 200, type: "text/html" },
  { path: "/cookies", expectedStatus: 200, type: "text/html" },
  { path: "/demo", expectedStatus: 200, type: "text/html" },
  { path: "/faq", expectedStatus: 200, type: "text/html" },
  { path: "/features", expectedStatus: 200, type: "text/html" },
  { path: "/gdpr", expectedStatus: 200, type: "text/html" },
  { path: "/get-started", expectedStatus: 200, type: "text/html" },
  { path: "/login", expectedStatus: 200, type: "text/html" },
  { path: "/privacy", expectedStatus: 200, type: "text/html" },
  { path: "/terms", expectedStatus: 200, type: "text/html" },
  { path: "/pricing", expectedStatus: 308, redirectLocation: "/get-started" },
  { path: "/robots.txt", expectedStatus: 200, type: "text/plain" },
  { path: "/sitemap.xml", expectedStatus: 200, type: "application/xml" },
];

async function runSweep() {
  console.log(`=======================================================`);
  console.log(`ProgressEye Staging Smoke Sweep`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`=======================================================\n`);

  let failures = 0;
  const results = [];

  for (const r of ROUTES) {
    const url = `${BASE_URL}${r.path}`;
    const start = performance.now();
    try {
      const res = await fetch(url, { redirect: "manual" });
      const duration = Math.round(performance.now() - start);

      const statusOk = res.status === r.expectedStatus;
      const contentType = res.headers.get("content-type") || "";
      const typeOk = !r.type || contentType.includes(r.type);
      const redirectOk =
        !r.redirectLocation || res.headers.get("location")?.includes(r.redirectLocation);

      // Verify security headers on 200 responses
      let headersOk = true;
      if (res.status === 200) {
        const xfo = res.headers.get("x-frame-options");
        const xcto = res.headers.get("x-content-type-options");
        const csp = res.headers.get("content-security-policy-report-only");
        if (xfo !== "DENY" || xcto !== "nosniff" || !csp) {
          headersOk = false;
        }
      }

      const passed = statusOk && typeOk && redirectOk && headersOk;
      if (!passed) failures++;

      results.push({
        path: r.path,
        status: res.status,
        expectedStatus: r.expectedStatus,
        duration: `${duration}ms`,
        contentType: contentType.split(";")[0],
        headersOk: headersOk ? "PASS" : "FAIL",
        result: passed ? "PASS" : "FAIL",
      });
    } catch (err) {
      failures++;
      results.push({
        path: r.path,
        status: "ERR",
        expectedStatus: r.expectedStatus,
        duration: "-",
        contentType: "-",
        headersOk: "FAIL",
        result: `FAIL (${err.message})`,
      });
    }
  }

  console.table(results);

  if (failures > 0) {
    console.error(`\n[FAIL] Smoke sweep failed with ${failures} error(s).`);
    process.exit(1);
  } else {
    console.log(`\n[PASS] All ${ROUTES.length} routes passed smoke sweep.`);
    process.exit(0);
  }
}

runSweep();
