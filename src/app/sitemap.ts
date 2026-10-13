import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // 12 Public marketing routes
  // /pricing is a 308 redirect to /get-started and is excluded.
  // /login is an unindexed auth-deferral stub and is excluded.
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly";
  }> = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/features", priority: 0.8, changeFrequency: "weekly" },
    { path: "/get-started", priority: 0.9, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.7, changeFrequency: "weekly" },
    { path: "/demo", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
    { path: "/cookies", priority: 0.3, changeFrequency: "monthly" },
    { path: "/gdpr", priority: 0.3, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
