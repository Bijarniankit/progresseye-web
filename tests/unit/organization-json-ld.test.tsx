import { OrganizationJsonLd } from "@/components/marketing/organization-json-ld";
import { siteConfig } from "@/config/site";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("OrganizationJsonLd Unit Tests", () => {
  it("renders valid Schema.org Organization structured data", () => {
    const { container } = render(<OrganizationJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe(siteConfig.name);
    expect(data.url).toBe(siteConfig.url);
    expect(data.contactPoint).toBeDefined();
    expect(data.contactPoint["@type"]).toBe("ContactPoint");
  });

  it("strictly omits sameAs until verified production social handles are configured", () => {
    const { container } = render(<OrganizationJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.textContent || "{}");

    expect(data.sameAs).toBeUndefined();
    expect("sameAs" in data).toBe(false);
  });
});
