import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CookieBanner } from "@/components/marketing/cookies/cookie-banner";
import { siteConfig } from "@/config/site";

describe("CookieBanner Component & Decision D-035 Governance", () => {
  it("defaults siteConfig.hasConsentBanner to false", () => {
    expect(siteConfig.hasConsentBanner).toBe(false);
  });

  it("renders null (0 B DOM) when siteConfig.hasConsentBanner is false", () => {
    const { container } = render(<CookieBanner />);
    expect(container.firstChild).toBeNull();
  });
});
