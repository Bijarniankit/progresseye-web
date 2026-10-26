import { describe, expect, it } from "vitest";
import nextConfigFn from "../../next.config";

describe("next.config.ts security headers", () => {
  it("defines comprehensive security headers including CSP Report-Only and short HSTS", async () => {
    const config = await nextConfigFn();
    expect(config.headers).toBeDefined();

    const headersList = await config.headers?.();
    expect(headersList).toBeDefined();
    expect(headersList?.length).toBeGreaterThan(0);

    const rootHeaders = headersList?.find((h) => h.source === "/:path*");
    expect(rootHeaders).toBeDefined();

    const headerMap = new Map(rootHeaders?.headers.map((h) => [h.key, h.value]));

    // CSP Report-Only (no report-uri endpoint, no external Google Fonts CDN)
    expect(headerMap.has("Content-Security-Policy-Report-Only")).toBe(true);
    const csp = headerMap.get("Content-Security-Policy-Report-Only");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com");
    expect(csp).toContain("frame-src https://challenges.cloudflare.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("img-src 'self' data:");
    expect(csp).not.toContain("img-src 'self' data: https:");
    expect(csp).not.toContain("fonts.googleapis.com");
    expect(csp).not.toContain("fonts.gstatic.com");
    expect(csp).not.toContain("report-uri");
    expect(csp).not.toContain("report-to");

    // Strict-Transport-Security: short max-age 86400 on staging, no preload, no includeSubDomains
    expect(headerMap.get("Strict-Transport-Security")).toBe("max-age=86400");
    expect(headerMap.get("Strict-Transport-Security")).not.toContain("preload");
    expect(headerMap.get("Strict-Transport-Security")).not.toContain("includeSubDomains");

    // Standard defense headers
    expect(headerMap.get("X-Frame-Options")).toBe("DENY");
    expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headerMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headerMap.get("Permissions-Policy")).toContain("camera=()");
  });

  it("configures Strict-Transport-Security initial ramp max-age=300 in production without preload or includeSubDomains", async () => {
    const prevEnv = process.env.NEXT_PUBLIC_APP_ENV;
    process.env.NEXT_PUBLIC_APP_ENV = "production";
    try {
      const config = await nextConfigFn();
      const headersList = await config.headers?.();
      const rootHeaders = headersList?.find((h) => h.source === "/:path*");
      const headerMap = new Map(rootHeaders?.headers.map((h) => [h.key, h.value]));

      expect(headerMap.get("Strict-Transport-Security")).toBe("max-age=300");
      expect(headerMap.get("Strict-Transport-Security")).not.toContain("preload");
      expect(headerMap.get("Strict-Transport-Security")).not.toContain("includeSubDomains");
    } finally {
      process.env.NEXT_PUBLIC_APP_ENV = prevEnv;
    }
  });
});
