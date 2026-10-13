import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isStaging =
    process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_APP_ENV === "staging";

  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
