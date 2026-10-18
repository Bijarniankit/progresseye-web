import { describe, expect, it } from "vitest";
import { whyRowsConfig } from "@/config/landing-claims";
import { ANNUAL_SAVINGS_PERCENT, PRICING_TIERS } from "@/config/pricing";

describe("Pricing Configuration & Dynamic Derivations", () => {
  it("derives the exact savings percentage mathematically from tier prices", () => {
    const { school } = PRICING_TIERS;
    const expected = Math.round(
      (1 - (school.annualPricePerStudent ?? 25) / (school.monthlyPricePerStudent ?? 30)) * 100,
    );
    expect(ANNUAL_SAVINGS_PERCENT).toBe(17);
    expect(ANNUAL_SAVINGS_PERCENT).toBe(expected);
  });

  it("defines all three required commercial tiers with placeholder flags", () => {
    expect(PRICING_TIERS.starter).toBeDefined();
    expect(PRICING_TIERS.school).toBeDefined();
    expect(PRICING_TIERS.district).toBeDefined();

    expect(PRICING_TIERS.starter.studentLimit).toBe(100);
    expect(PRICING_TIERS.school.monthlyPricePerStudent).toBe(30);
    expect(PRICING_TIERS.school.annualPricePerStudent).toBe(25);
  });

  it("flags all 4 Why ProgressEye comparison rows as planned in claims registry", () => {
    const expectedIds = ["speed", "privacy", "everywhere", "india"];
    for (const id of expectedIds) {
      const claim = whyRowsConfig[id];
      expect(claim).toBeDefined();
      expect(claim.status).toBe("planned");
      expect(claim.blocksLaunch).toBe(true);
    }
  });

  it("verifies every pricing tier feature bullet has status planned", () => {
    for (const tier of Object.values(PRICING_TIERS)) {
      expect(tier.features.length).toBeGreaterThan(0);
      for (const feature of tier.features) {
        expect(feature.status).toBe("planned");
        expect(typeof feature.text).toBe("string");
      }
    }
  });
});
