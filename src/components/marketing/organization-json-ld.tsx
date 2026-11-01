import { siteConfig } from "@/config/site";

export function OrganizationJsonLd() {
  // Schema.org Organization structured data
  // Note: sameAs is explicitly omitted until real social handles are verified
  // Note: contactPoint is omitted when siteConfig.supportEmail is empty
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    ...(siteConfig.supportEmail
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.supportEmail,
            contactType: "customer support",
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD script requires raw string
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
