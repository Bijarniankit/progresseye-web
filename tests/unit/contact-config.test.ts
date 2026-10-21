import { describe, expect, it } from "vitest";
import { contactConfig } from "@/config/contact";

describe("Contact Configuration & Safety Gates", () => {
  it("defaults all unverified contact channel flags strictly to false (Decision D-016)", () => {
    expect(contactConfig.hasConfiguredEmail).toBe(false);
    expect(contactConfig.hasConfiguredPhone).toBe(false);
    expect(contactConfig.hasConfiguredOffice).toBe(false);
    expect(contactConfig.hasConfiguredResponseTime).toBe(false);
  });

  it("provides valid inquiry topics for school teams", () => {
    expect(contactConfig.topics.length).toBeGreaterThanOrEqual(3);
    for (const topic of contactConfig.topics) {
      expect(topic.id.trim().length).toBeGreaterThan(0);
      expect(topic.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("contains zero internal phase numbers in topics or configuration", () => {
    const serialized = JSON.stringify(contactConfig);
    expect(serialized).not.toMatch(/Phase\s+\d+/i);
  });
});
