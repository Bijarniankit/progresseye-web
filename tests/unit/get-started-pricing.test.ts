import { describe, expect, it } from "vitest";
import { ANNUAL_SAVINGS_PERCENT, PRICING_TIERS } from "@/config/pricing";

describe("Get-Started Pricing Matrix & Free-Trial Prohibition", () => {
  it("strictly enforces zero free-trial wording in all pricing tiers", () => {
    const serialized = JSON.stringify(PRICING_TIERS).toLowerCase();
    expect(serialized).not.toContain("free trial");
    expect(serialized).not.toContain("30-day");
    expect(serialized).not.toContain("trial period");
  });

  it("defines the three required commercial tiers with planned status", () => {
    const tierKeys = Object.keys(PRICING_TIERS);
    expect(tierKeys).toEqual(["starter", "school", "district"]);

    for (const key of tierKeys as Array<keyof typeof PRICING_TIERS>) {
      const tier = PRICING_TIERS[key];
      expect(tier.name.length).toBeGreaterThan(0);
      expect(tier.features.length).toBeGreaterThanOrEqual(5);
      for (const feat of tier.features) {
        expect(feat.status).toBe("planned");
      }
    }
  });

  it("calculates annual savings mathematically from school tier rates", () => {
    expect(ANNUAL_SAVINGS_PERCENT).toBe(17);
    expect(PRICING_TIERS.school.monthlyPricePerStudent).toBe(30);
    expect(PRICING_TIERS.school.annualPricePerStudent).toBe(25);
  });

  it("points CTAs only to demo or contact inquiry routes", () => {
    expect(PRICING_TIERS.starter.ctaHref).toBe("/demo");
    expect(PRICING_TIERS.school.ctaHref).toBe("/demo");
    expect(PRICING_TIERS.district.ctaHref).toBe("/contact");
  });

  it("contains zero internal phase numbers in tier copy", () => {
    const serialized = JSON.stringify(PRICING_TIERS);
    expect(serialized).not.toMatch(/Phase\s+\d+/i);
  });
});
