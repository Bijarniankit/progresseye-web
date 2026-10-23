import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/config/site";

describe("Sitemap & Robots Verification", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("Sitemap", () => {
    it("indexes exactly the 12 public marketing routes", () => {
      const items = sitemap();
      const urls = items.map((i) => i.url);

      expect(urls).toContain(`${siteConfig.url}`);
      expect(urls).toContain(`${siteConfig.url}/features`);
      expect(urls).toContain(`${siteConfig.url}/get-started`);
      expect(urls).toContain(`${siteConfig.url}/faq`);
      expect(urls).toContain(`${siteConfig.url}/demo`);
      expect(urls).toContain(`${siteConfig.url}/about`);
      expect(urls).toContain(`${siteConfig.url}/careers`);
      expect(urls).toContain(`${siteConfig.url}/contact`);
      expect(urls).toContain(`${siteConfig.url}/privacy`);
      expect(urls).toContain(`${siteConfig.url}/terms`);
      expect(urls).toContain(`${siteConfig.url}/cookies`);
      expect(urls).toContain(`${siteConfig.url}/gdpr`);
      expect(items.length).toBe(12);
    });

    it("excludes /pricing (redirect) and /login (auth deferral)", () => {
      const items = sitemap();
      const urls = items.map((i) => i.url);

      expect(urls).not.toContain(`${siteConfig.url}/pricing`);
      expect(urls).not.toContain(`${siteConfig.url}/login`);
    });
  });

  describe("Robots Policy", () => {
    it("disallows all crawler traffic when NEXT_PUBLIC_APP_ENV is unset", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_ENV", "");
      const config = robots();
      expect(config.rules).toEqual({
        userAgent: "*",
        disallow: "/",
      });
      expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    });

    it("disallows all crawler traffic when NEXT_PUBLIC_APP_ENV is staging", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_ENV", "staging");
      const config = robots();
      expect(config.rules).toEqual({
        userAgent: "*",
        disallow: "/",
      });
      expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    });

    it("disallows all crawler traffic when NEXT_PUBLIC_APP_ENV is preview or other non-production value", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_ENV", "preview");
      const config = robots();
      expect(config.rules).toEqual({
        userAgent: "*",
        disallow: "/",
      });
      expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    });

    it("allows indexing of public routes while blocking internal /dev/ and /api/ only when NEXT_PUBLIC_APP_ENV is explicitly production", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_ENV", "production");
      const config = robots();
      expect(config.rules).toEqual({
        userAgent: "*",
        allow: "/",
        disallow: ["/dev/", "/api/"],
      });
      expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    });
  });
});
