/**
 * Contact Page Configuration & Safety Gates (Phase 7 CP3)
 *
 * All unverified contact channels (direct email, phone, office address, SLA response times)
 * are gated behind flags that default to false per Decision D-016 (Zero Invented Data).
 */

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href?: string;
  description: string;
}

export interface ContactConfig {
  hasConfiguredEmail: boolean;
  hasConfiguredPhone: boolean;
  hasConfiguredOffice: boolean;
  hasConfiguredResponseTime: boolean;
  email?: string;
  phone?: string;
  office?: string;
  responseTime?: string;
  topics: { id: string; label: string }[];
}

export const contactConfig: ContactConfig = {
  // Gated flags strictly defaulting to false until verified corporate data exists
  hasConfiguredEmail: false,
  hasConfiguredPhone: false,
  hasConfiguredOffice: false,
  hasConfiguredResponseTime: false,

  // Topics for the contact form selector
  topics: [
    { id: "general", label: "General Inquiry" },
    { id: "onboarding", label: "School Onboarding & Migration" },
    { id: "pricing", label: "Pricing & Plans" },
    { id: "security", label: "Data Protection & Security" },
  ],
};
