/**
 * ProgressEye Pricing Configuration & Single Source of Truth
 *
 * TODO-REAL-DATA: All pricing values, tier thresholds, and student limits are placeholders
 * pending final commercial strategy and business model sign-off.
 * Blocks public launch = Yes.
 */

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
  features: string[];
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
      "Up to 100 students (placeholder)",
      "Daily attendance roll call",
      "Notice board & announcements",
      "Single administrator account",
      "Web-only community access",
    ],
    ctaLabel: "Get started free",
    ctaHref: "/get-started",
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
      "Unlimited students & sections",
      "Daily attendance & SMS alerts",
      "Automated fee collection & receipts",
      "Exams, grading & CBSE report cards",
      "Unlimited staff & teacher logins",
      "Priority WhatsApp & phone support",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "/get-started?tier=school",
  },
  district: {
    id: "district",
    name: "District",
    tagline: "For multi-school chains and educational trusts.",
    customPriceLabel: "Custom tailored",
    billingPeriodLabel: "tailored to scale",
    features: [
      "Multi-campus aggregated analytics",
      "Centralized group finance & fee roll-up",
      "Custom SIS & state board integrations",
      "Dedicated account success manager",
      "Guaranteed 99.9% uptime SLA",
      "On-site teacher & staff training",
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
