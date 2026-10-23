import { describe, expect, it } from "vitest";
import { careersConfig } from "@/config/careers";

describe("Careers Page Configuration & Decision D-036 Governance", () => {
  it("defaults hasOpenRoles to false ensuring honest zero-vacancy state", () => {
    expect(careersConfig.hasOpenRoles).toBe(false);
    expect(careersConfig.openRoles).toHaveLength(0);
  });

  it("provides truthful empty state messaging with contact link", () => {
    expect(careersConfig.emptyState.title).toBe("No Open Roles at Present");
    expect(careersConfig.emptyState.message).toContain("not actively hiring");
    expect(careersConfig.emptyState.contactHref).toBe("/contact");
  });

  it("contains zero fake quantitative claims or fabricated vacancies", () => {
    const serialized = JSON.stringify(careersConfig).toLowerCase();
    expect(serialized).not.toContain("immediate joiner");
    expect(serialized).not.toContain("competitive salary");
    expect(serialized).not.toContain("unlimited pto");
  });
});
