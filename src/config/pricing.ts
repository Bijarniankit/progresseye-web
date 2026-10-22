/**
 * ProgressEye Pricing Configuration & Single Source of Truth
 *
 * TODO-REAL-DATA: All pricing values, tier thresholds, and feature bullets are placeholders
 * pending final commercial strategy and business model sign-off.
 * Blocks public launch = Yes.
 */

export type FeatureStatus = "planned" | "available";

export interface PricingFeature {
  text: string;
  status: FeatureStatus;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  studentLimit?: number; // TODO-REAL-DATA: 100 is an invented placeholder limit. Blocks public launch = Yes.
  monthlyPricePerStudent?: number; // In INR (₹)
  annualPricePerStudent?: number; // In INR (₹)
  customPriceLabel?: string;
  billingPeriodLabel?: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
}

export const PRICING_TIERS: Record<"starter" | "school" | "district", PricingTier> = {
  starter: {
    id: "starter",
    name: "Starter",
    tagline: "For small schools finding their feet.",
    studentLimit: 100, // TODO-REAL-DATA: Invented limit for free tier. Blocks public launch = Yes.
    customPriceLabel: "Free forever",
    features: [
      { text: "Daily attendance roll call", status: "planned" },
      { text: "Fee recording", status: "planned" },
      { text: "Student & parent directory", status: "planned" },
      { text: "Notice board & announcements", status: "planned" },
      { text: "Staff web portal", status: "planned" },
    ],
    ctaLabel: "Book a free demo",
    ctaHref: "/demo",
  },
  school: {
    id: "school",
    name: "School",
    tagline: "The complete operating system for modern campuses.",
    badge: "MOST POPULAR",
    isPopular: true,
    monthlyPricePerStudent: 30, // TODO-REAL-DATA: ₹30/student/month. Blocks public launch = Yes.
    annualPricePerStudent: 25, // TODO-REAL-DATA: ₹25/student/month billed annually. Blocks public launch = Yes.
    billingPeriodLabel: "/ student / month",
    features: [
      { text: "Daily attendance & alerts", status: "planned" },
      { text: "Planned fee collection & digital receipts", status: "planned" },
      { text: "Exams, grading & report cards", status: "planned" },
      { text: "Staff & teacher accounts", status: "planned" },
      { text: "Parent communication portal", status: "planned" },
    ],
    ctaLabel: "Book a free demo",
    ctaHref: "/demo",
  },
  district: {
    id: "district",
    name: "District",
    tagline: "For multi-school chains and educational trusts.",
    customPriceLabel: "Custom tailored",
    billingPeriodLabel: "tailored to scale",
    features: [
      { text: "Multi-campus aggregated analytics", status: "planned" },
      { text: "Centralized group finance & fee roll-up", status: "planned" },
      { text: "Custom SIS & board integrations", status: "planned" },
      { text: "Dedicated onboarding & support", status: "planned" },
      { text: "On-site teacher & staff training", status: "planned" },
    ],
    ctaLabel: "Talk to our team",
    ctaHref: "/contact",
  },
};

/**
 * Derived annual discount percentage.
 * Computed dynamically from School tier prices: (1 - annual / monthly) * 100.
 * NEVER hardcoded as a static string.
 */
export const ANNUAL_SAVINGS_PERCENT: number = Math.round(
  (1 -
    (PRICING_TIERS.school.annualPricePerStudent ?? 25) /
      (PRICING_TIERS.school.monthlyPricePerStudent ?? 30)) *
    100,
);
