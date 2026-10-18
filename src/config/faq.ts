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
  category: "payments" | "academics" | "privacy" | "platform" | "onboarding";
}

export const landingFaqs: FaqItem[] = [
  {
    id: "payments-upi",
    category: "payments",
    status: "planned", // TODO-REAL-DATA: Planned for Phase 18 (Fees & Finance). Blocks public launch.
    question: "Can ProgressEye handle fee collection via UPI and net banking?",
    answer:
      "ProgressEye is designed to support direct UPI, QR code, and net banking reconciliation (planned for Phase 18). Automated fee receipts and pending dues notices are designed to dispatch automatically once linked to your school's merchant gateway.",
  },
  {
    id: "academics-boards",
    category: "academics",
    status: "planned", // TODO-REAL-DATA: Planned for Phase 17 (Exams & Gradebook). Blocks public launch.
    question: "Does ProgressEye support CBSE, ICSE, and state-board report cards?",
    answer:
      "Compliant report card formats for CBSE, ICSE, and state boards are planned for Phase 17. The grading system is designed to handle formative assessments, summative terms, and custom weightings without manual recalculation.",
  },
  {
    id: "privacy-dpdp",
    category: "privacy",
    status: "planned", // TODO-REAL-DATA: Planned tenant isolation and DPDP compliance. Blocks public launch.
    question: "How is student data kept private and compliant with data protection norms?",
    answer:
      "ProgressEye is architected with PostgreSQL Row-Level Security, designed to guarantee that each school's records remain isolated. Workflows are designed to adhere to Indian Digital Personal Data Protection (DPDP) principles with role-based access.",
  },
  {
    id: "platform-install",
    category: "platform",
    status: "planned", // TODO-REAL-DATA: Responsive web shell. Blocks public launch.
    question: "Do teachers, parents, or staff need to install an app?",
    answer:
      "No installation is required. ProgressEye is designed as a calm, responsive web application that runs directly in modern mobile, tablet, and desktop browsers.",
  },
  {
    id: "onboarding-timeline",
    category: "onboarding",
    status: "planned", // TODO-REAL-DATA: Onboarding timeline estimate. Blocks public launch.
    question: "How long does onboarding take for an existing school?",
    answer:
      "Initial roster import and class setup are designed to take under an hour using standard spreadsheet templates during our guided pilot rollout.",
  },
];
