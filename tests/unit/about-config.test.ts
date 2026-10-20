import { describe, expect, it } from "vitest";
import { aboutConfig } from "@/config/about";

describe("About Configuration and Safety Gates", () => {
  it("strictly enforces unverified company flags default to false (blocks launch)", () => {
    expect(aboutConfig.hasConfiguredStats).toBe(false);
    expect(aboutConfig.hasConfiguredStory).toBe(false);
    expect(aboutConfig.hasConfiguredTeam).toBe(false);
  });

  it("marks all values with DRAFT-CONTENT-REVIEW review status", () => {
    expect(aboutConfig.values.length).toBeGreaterThan(0);
    for (const val of aboutConfig.values) {
      expect(val.reviewStatus).toBe("DRAFT-CONTENT-REVIEW");
      expect(val.title.trim().length).toBeGreaterThan(0);
      expect(val.description.trim().length).toBeGreaterThan(0);
    }
  });

  it("has non-empty non-negotiable principles", () => {
    expect(aboutConfig.principles.length).toBe(4);
    for (const p of aboutConfig.principles) {
      expect(p.text.trim().length).toBeGreaterThan(0);
    }
  });

  it("contains zero internal phase references in public copy", () => {
    const serialized = JSON.stringify(aboutConfig);
    expect(serialized).not.toMatch(/Phase\s+\d+/i);
  });
});
