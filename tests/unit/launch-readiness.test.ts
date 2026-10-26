import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  checkLaunchReadiness,
  extractRenderedHtmlText,
  FORBIDDEN_STRINGS,
} from "../../scripts/check-launch-readiness.mjs";

describe("checkLaunchReadiness script", () => {
  it("passes when NEXT_PUBLIC_LAUNCH_READY is false even if placeholders exist", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-test-"));
    fs.writeFileSync(path.join(tmpDir, "sample.tsx"), "const text = 'TODO-REAL-DATA';");

    const result = checkLaunchReadiness({
      env: { NEXT_PUBLIC_LAUNCH_READY: "false" },
      scanDirs: [tmpDir],
    });

    expect(result.passed).toBe(true);
    expect(result.isLaunchReady).toBe(false);
    expect(result.violations.length).toBeGreaterThan(0);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("fails when NEXT_PUBLIC_LAUNCH_READY is true and placeholders exist", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-test-"));
    fs.writeFileSync(path.join(tmpDir, "terms.tsx"), "Legal terms: DRAFT-NEEDS-LEGAL-REVIEW");

    const result = checkLaunchReadiness({
      env: {
        NEXT_PUBLIC_LAUNCH_READY: "true",
        NEXT_PUBLIC_APP_ENV: "production",
      },
      scanDirs: [tmpDir],
    });

    expect(result.passed).toBe(false);
    expect(result.isLaunchReady).toBe(true);
    const tokenViolation = result.violations.find((v) => v.type === "FORBIDDEN_TOKEN");
    expect(tokenViolation).toBeDefined();
    expect(tokenViolation?.token).toBe("DRAFT-NEEDS-LEGAL-REVIEW");

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("fails when NEXT_PUBLIC_LAUNCH_READY is true and APP_ENV is not production", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-test-"));
    fs.writeFileSync(path.join(tmpDir, "clean.tsx"), "const ok = true;");

    const result = checkLaunchReadiness({
      env: {
        NEXT_PUBLIC_LAUNCH_READY: "true",
        NEXT_PUBLIC_APP_ENV: "development",
      },
      scanDirs: [tmpDir],
    });

    expect(result.passed).toBe(false);
    const envViolation = result.violations.find((v) => v.type === "ENV_MISCONFIGURATION");
    expect(envViolation?.message).toContain('must be "production"');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("fails when NEXT_PUBLIC_LAUNCH_READY is true and Turnstile uses test key", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-test-"));
    fs.writeFileSync(path.join(tmpDir, "clean.tsx"), "const ok = true;");

    const result = checkLaunchReadiness({
      env: {
        NEXT_PUBLIC_LAUNCH_READY: "true",
        NEXT_PUBLIC_APP_ENV: "production",
        NEXT_PUBLIC_HAS_LEAD_BACKEND: "true",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      },
      scanDirs: [tmpDir],
    });

    expect(result.passed).toBe(false);
    const envViolation = result.violations.find((v) => v.type === "ENV_MISCONFIGURATION");
    expect(envViolation?.message).toContain("Cloudflare site key");

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("passes when NEXT_PUBLIC_LAUNCH_READY is true, env is production, and no placeholders exist", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-test-"));
    fs.writeFileSync(path.join(tmpDir, "clean.tsx"), "const clean = 'production text';");

    const result = checkLaunchReadiness({
      env: {
        NEXT_PUBLIC_LAUNCH_READY: "true",
        NEXT_PUBLIC_APP_ENV: "production",
        NEXT_PUBLIC_HAS_LEAD_BACKEND: "true",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAAAMmQeB123456789",
      },
      scanDirs: [tmpDir],
    });

    expect(result.passed).toBe(true);
    expect(result.violations.length).toBe(0);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("exports forbidden placeholder list including all launch-blocking markers", () => {
    expect(FORBIDDEN_STRINGS).toContain("TODO-REAL-DATA");
    expect(FORBIDDEN_STRINGS).toContain("DRAFT-NEEDS-LEGAL-REVIEW");
    expect(FORBIDDEN_STRINGS).toContain("To be provided");
    expect(FORBIDDEN_STRINGS).toContain("legal entity to be provided");
    expect(FORBIDDEN_STRINGS).toContain("DRAFT — PENDING LEGAL REVIEW");
  });

  it("extracts rendered HTML text ignoring attributes and style/script tags", () => {
    const html =
      '<html><head><style>.p { color: red; }</style></head><body><input placeholder="TODO-REAL-DATA" /><p>Hello World</p><script>console.log("secret");</script></body></html>';
    const text = extractRenderedHtmlText(html);
    expect(text).not.toContain("TODO-REAL-DATA");
    expect(text).not.toContain("color: red");
    expect(text).not.toContain("console.log");
    expect(text).toContain("Hello World");
  });

  it("detects forbidden placeholders located in messages/ json translation dictionaries", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-msg-test-"));
    const messagesDir = path.join(tmpDir, "messages");
    fs.mkdirSync(messagesDir);
    fs.writeFileSync(
      path.join(messagesDir, "en.json"),
      JSON.stringify({ footer: { retention: "TODO-REAL-DATA" } }),
    );

    const result = checkLaunchReadiness({
      env: {
        NEXT_PUBLIC_LAUNCH_READY: "true",
        NEXT_PUBLIC_APP_ENV: "production",
      },
      scanDirs: [messagesDir],
    });

    expect(result.passed).toBe(false);
    const violation = result.violations.find((v) => v.token === "TODO-REAL-DATA");
    expect(violation).toBeDefined();

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("detects forbidden placeholders emitted in .next build outputs (html / prerender)", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-build-test-"));
    const htmlFile = path.join(tmpDir, "page.html");
    fs.writeFileSync(htmlFile, "<html><body><p>DRAFT-NEEDS-LEGAL-REVIEW</p></body></html>");

    const result = checkLaunchReadiness({
      env: {
        NEXT_PUBLIC_LAUNCH_READY: "true",
        NEXT_PUBLIC_APP_ENV: "production",
      },
      scanDirs: [tmpDir],
    });

    expect(result.passed).toBe(false);
    const violation = result.violations.find((v) => v.token === "DRAFT-NEEDS-LEGAL-REVIEW");
    expect(violation).toBeDefined();

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
