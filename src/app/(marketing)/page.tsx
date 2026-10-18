import type { Metadata } from "next";
import { BentoGrid } from "@/components/marketing/bento/bento-grid";
import { FinalCtaSection } from "@/components/marketing/cta/cta-section";
import { FaqSection } from "@/components/marketing/faq/faq-section";
import { HeroSection } from "@/components/marketing/hero/hero-section";
import { PricingSection } from "@/components/marketing/pricing/pricing-section";
import { ProductTourSection } from "@/components/marketing/tour/product-tour-section";
import { TrustStrip } from "@/components/marketing/trust/trust-strip";
import { WhySection } from "@/components/marketing/why/why-section";

export const metadata: Metadata = {
  title: "The school workspace that runs itself",
  description:
    "An advanced, end-to-end multi-tenant school operating system built for Indian schools — attendance, fees, exams, communication, all in one calm screen.",
};

interface HomePageProps {
  searchParams?: Promise<{ scene?: string; option?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const sceneParam = params?.scene ? Number.parseInt(params.scene, 10) : 0;
  const sceneIndex = (sceneParam >= 0 && sceneParam <= 2 ? sceneParam : 0) as 0 | 1 | 2;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection sceneIndex={sceneIndex} />

      {/* Trust Badges Strip (gated behind siteConfig.hasCustomerLogos) */}
      <TrustStrip />

      {/* Interactive Product Tour Section */}
      <ProductTourSection />

      {/* Features Bento Grid Section */}
      <BentoGrid />

      {/* Why ProgressEye Comparison Section */}
      <WhySection />

      {/* Pricing Section with Billing Toggle */}
      <PricingSection />

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Final Call to Action Section */}
      <FinalCtaSection />
    </div>
  );
}
