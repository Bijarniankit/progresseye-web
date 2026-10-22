import { describe, expect, it } from "vitest";
import { featuresConfig } from "@/config/features";

describe("Features Page Configuration & Decision D-032 Governance", () => {
  it("marks all modules and highlights with status: planned", () => {
    expect(featuresConfig.modules.length).toBeGreaterThanOrEqual(6);
    for (const mod of featuresConfig.modules) {
      expect(mod.status).toBe("planned");
      expect(mod.highlights.length).toBeGreaterThan(0);
      for (const hl of mod.highlights) {
        expect(hl.status).toBe("planned");
      }
    }
  });

  it("contains zero numbers or quantitative metrics in highlights and overviews", () => {
    for (const mod of featuresConfig.modules) {
      // Must not assert quantitative metrics like 100%, 99%, 14k, 35+
      expect(mod.overview).not.toMatch(/\b\d+%\b/);
      expect(mod.overview).not.toMatch(/\b\d+k\b/i);
      expect(mod.overview).not.toMatch(/\b\d+\+/);
      for (const hl of mod.highlights) {
        expect(hl.description).not.toMatch(/\b\d+%\b/);
        expect(hl.description).not.toMatch(/\b\d+k\b/i);
        expect(hl.description).not.toMatch(/\b\d+\+/);
      }
    }
  });

  it("contains zero examination board names (CBSE, ICSE, State Boards)", () => {
    const serialized = JSON.stringify(featuresConfig).toLowerCase();
    expect(serialized).not.toContain("cbse");
    expect(serialized).not.toContain("icse");
    expect(serialized).not.toContain("state board");
  });

  it("contains zero WhatsApp branding mentions", () => {
    const serialized = JSON.stringify(featuresConfig).toLowerCase();
    expect(serialized).not.toContain("whatsapp");
  });

  it("contains zero delivery timing promises or quarter deadlines", () => {
    const serialized = JSON.stringify(featuresConfig).toLowerCase();
    expect(serialized).not.toMatch(/\bq[1-4]\b/i);
    expect(serialized).not.toMatch(/\bcoming in\b/i);
    expect(serialized).not.toMatch(/\blaunching in\b/i);
  });

  it("contains zero competitor claims or comparisons", () => {
    const serialized = JSON.stringify(featuresConfig).toLowerCase();
    expect(serialized).not.toContain("better than");
    expect(serialized).not.toContain("faster than");
    expect(serialized).not.toContain("competitor");
  });

  it("contains zero internal phase numbers in copy", () => {
    const serialized = JSON.stringify(featuresConfig);
    expect(serialized).not.toMatch(/Phase\s+\d+/i);
  });
});
