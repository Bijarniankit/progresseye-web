import { Footer } from "@/components/marketing/footer";
import { PublicNavbar } from "@/components/marketing/navbar";
import { OrganizationJsonLd } from "@/components/marketing/organization-json-ld";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | ProgressEye",
    default: "ProgressEye — Modern Multi-Tenant School Operating System",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: "ProgressEye — Modern Multi-Tenant School Operating System",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "ProgressEye — Modern Multi-Tenant School Operating System",
    description: siteConfig.description,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)] text-[var(--color-text)]">
      {/* Accessible Skip Link targeting main-content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-toast)] focus:px-4 focus:py-2 focus:bg-[var(--color-brand)] focus:text-[var(--color-brand-foreground)] focus:rounded-[var(--radius-md)] focus:shadow-[var(--shadow-e3)] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
      >
        Skip to main content
      </a>

      {/* Structured Data */}
      <OrganizationJsonLd />

      {/* Fixed Navigation Header */}
      <PublicNavbar />

      {/* Main Content Landmark with Top Offset and Scroll Padding */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 pt-16 md:pt-20 scroll-pt-16 md:scroll-pt-20 outline-none"
      >
        {children}
      </main>

      {/* Marketing Footer */}
      <Footer />
    </div>
  );
}
