import type { Metadata } from "next";
import { AboutCta } from "@/components/marketing/about/about-cta";
import { AboutHero } from "@/components/marketing/about/about-hero";
import { PrinciplesStrip } from "@/components/marketing/about/principles-strip";
import { ValuesGrid } from "@/components/marketing/about/values-grid";
import { VisionMission } from "@/components/marketing/about/vision-mission";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how ProgressEye builds calm school management software for Indian educational institutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | ProgressEye",
    description:
      "Learn how ProgressEye builds calm school management software for Indian educational institutions.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Manifesto Hero with pure CSS ink swoosh */}
      <AboutHero />

      {/* 2. Side-by-side Vision and Mission cards */}
      <VisionMission />

      {/* 3. Four Core Values Grid (with DRAFT-CONTENT-REVIEW markers) */}
      <ValuesGrid />

      {/* 4. Non-negotiable Product Principles Strip */}
      <PrinciplesStrip />

      {/* 5. Final Dark Card CTA */}
      <AboutCta />
    </div>
  );
}
