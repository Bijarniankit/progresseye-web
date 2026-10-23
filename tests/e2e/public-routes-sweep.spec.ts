import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/features", name: "features" },
  { path: "/faq", name: "faq" },
  { path: "/pricing", name: "pricing-redirect" },
  { path: "/contact", name: "contact" },
  { path: "/get-started", name: "get-started" },
  { path: "/demo", name: "demo" },
  { path: "/careers", name: "careers" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/cookies", name: "cookies" },
  { path: "/gdpr", name: "gdpr" },
  { path: "/login", name: "login" },
] as const;

const viewports = [
  { name: "mobile-360", width: 360, height: 740 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 800 },
] as const;

const themes = ["light", "dark"] as const;

test.describe("Phase 8 All-Routes Comprehensive Sweep", () => {
  for (const route of routes) {
    test(`audits ${route.path} across viewports and themes for overflow, h1, and a11y`, async ({
      page,
    }) => {
      for (const theme of themes) {
        for (const vp of viewports) {
          await page.setViewportSize({ width: vp.width, height: vp.height });

          const consoleErrors: string[] = [];
          page.on("console", (msg) => {
            if (msg.type() === "error") {
              consoleErrors.push(msg.text());
            }
          });

          await page.addInitScript((th) => {
            localStorage.setItem("theme", th);
          }, theme);

          await page.goto(`http://localhost:3000${route.path}`, {
            waitUntil: "networkidle",
          });

          await page.evaluate((th) => {
            if (th === "dark") {
              document.documentElement.classList.add("dark");
              document.documentElement.classList.remove("light");
            } else {
              document.documentElement.classList.remove("dark");
              document.documentElement.classList.add("light");
            }
          }, theme);

          // 1. Horizontal overflow assertion
          const overflow = await page.evaluate(() => {
            const docEl = document.documentElement;
            const body = document.body;
            return docEl.scrollWidth > docEl.clientWidth || body.scrollWidth > window.innerWidth;
          });
          expect(
            overflow,
            `Horizontal overflow detected on ${route.path} [${theme}, ${vp.name}]`,
          ).toBe(false);

          // 2. Single H1 heading assertion
          const h1Count = await page.locator("h1").count();
          expect(h1Count, `Expected exactly 1 H1 on ${route.path}`).toBe(1);

          // 3. Zero console errors
          expect(
            consoleErrors,
            `Console errors observed on ${route.path} [${theme}, ${vp.name}]`,
          ).toEqual([]);

          // 4. Axe-core accessibility scan
          const axeResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();

          const criticalOrSerious = axeResults.violations.filter(
            (v) => v.impact === "critical" || v.impact === "serious",
          );
          expect(
            criticalOrSerious,
            `Axe violations on ${route.path} [${theme}, ${vp.name}]`,
          ).toEqual([]);
        }
      }
    });
  }
});
