/**
 * Central FAQ Content Source (Shared between Landing Page and Phase 7 FAQ Page)
 *
 * All unbuilt capabilities are marked status: "planned" and documented in PLACEHOLDERS.md.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  status: "planned";
  category: "payments" | "academics" | "privacy" | "platform" | "onboarding" | "training";
}

export const landingFaqs: FaqItem[] = [
  {
    id: "payments-upi",
    category: "payments",
    status: "planned", // DRAFT-CONTENT-REVIEW: Online fee collection via UPI and net banking. Blocks public launch.
    question: "Can ProgressEye handle fee collection via UPI and net banking?",
    answer:
      "Planned: collect fees online (UPI first) with digital receipts and pending dues notices once linked to your school merchant gateway.",
  },
  {
    id: "academics-boards",
    category: "academics",
    status: "planned", // DRAFT-CONTENT-REVIEW: Configurable grading scales and board report card alignment. Blocks public launch.
    question: "Does ProgressEye support CBSE, ICSE, and state-board report cards?",
    answer:
      "Planned: configurable grading scales and report cards designed to align with board requirements.",
  },
  {
    id: "privacy-dpdp",
    category: "privacy",
    status: "planned", // DRAFT-NEEDS-LEGAL-REVIEW: Multi-tenant RLS isolation adhering to DPDP. Blocks public launch.
    question: "How is student data kept private and compliant with data protection norms?",
    answer:
      "Planned: each school's records are designed to be kept separate from other schools'. We are building our data handling with India's Digital Personal Data Protection Act in mind; details will be published before launch.",
  },
  {
    id: "platform-install",
    category: "platform",
    status: "planned", // DRAFT-CONTENT-REVIEW: Responsive web shell. Blocks public launch.
    question: "Do teachers, parents, or staff need to install an app?",
    answer:
      "No installation is required. ProgressEye is designed as a calm, responsive web application that runs directly in modern mobile, tablet, and desktop browsers.",
  },
  {
    id: "onboarding-timeline",
    category: "onboarding",
    status: "planned", // DRAFT-CONTENT-REVIEW: School roster onboarding and data migration. Blocks public launch.
    question: "How does an existing school migrate student and staff records?",
    answer:
      "Planned: structured spreadsheet templates and assisted data import workflows to help administrative teams bring in student and staff rosters during guided setup.",
  },
  {
    id: "onboarding-training",
    category: "training",
    status: "planned", // DRAFT-CONTENT-REVIEW: Staff and teacher onboarding orientation. Blocks public launch.
    question: "Do you provide onboarding and teacher training support?",
    answer:
      "Planned: guided orientation walkthroughs, role-specific documentation, and onboarding guidance for administrative staff and teachers during school rollout.",
  },
];
