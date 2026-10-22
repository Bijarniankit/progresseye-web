/**
 * ProgressEye Careers Configuration
 *
 * Governed by Decision D-036 (Careers Gating & Honest Zero-Vacancy State).
 * Zero fake job postings. Reflects real hiring status truthfully.
 */

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const careersConfig = {
  headline: "Careers at ProgressEye",
  subheadline:
    "We are engineering calm, dependable school operating software. Learn about our team culture and current openings.",
  // Gated flag: true only when real, verified openings exist
  hasOpenRoles: false,
  openRoles: [] as JobOpening[],
  emptyState: {
    title: "No Open Roles at Present",
    message:
      "We are currently focused on foundational product engineering and are not actively hiring. As our school rollout expands, verified engineering and school support positions will be published here.",
    contactPrompt: "Want to connect with our founding team? Reach out via our contact page.",
    contactHref: "/contact",
  },
};
