/**
 * ProgressEye Marketing Feature Claims & Verification Status
 *
 * Status Governance:
 * - "available": Verified in production build and shipped.
 * - "planned": Architectural goal / roadmap item. Displayed in UI with
 *   "Preview of planned features, shown with sample data" banner and small "Planned" tag.
 *
 * All planned items are registered in docs/design/PLACEHOLDERS.md as "blocks public launch = Yes".
 */

export type ClaimStatus = "available" | "planned";

export interface FeatureClaim {
  id: string;
  titleKey: string;
  descriptionKey: string;
  status: ClaimStatus;
  blocksLaunch: boolean;
}

export const tourTabsConfig: Record<string, FeatureClaim> = {
  attendance: {
    id: "attendance",
    titleKey: "landing.tour.tabs.attendance.title",
    descriptionKey: "landing.tour.tabs.attendance.description",
    status: "planned", // Planned feature (attendance engine built in Phase 16)
    blocksLaunch: true,
  },
  fees: {
    id: "fees",
    titleKey: "landing.tour.tabs.fees.title",
    descriptionKey: "landing.tour.tabs.fees.description",
    status: "planned", // Planned feature (fee ledger built in Phase 17)
    blocksLaunch: true,
  },
  exams: {
    id: "exams",
    titleKey: "landing.tour.tabs.exams.title",
    descriptionKey: "landing.tour.tabs.exams.description",
    status: "planned", // Planned feature (gradebook engine built in Phase 18)
    blocksLaunch: true,
  },
};

export const bentoCardsConfig: Record<string, FeatureClaim> = {
  roles: {
    id: "roles",
    titleKey: "landing.bento.cards.roles.title",
    descriptionKey: "landing.bento.cards.roles.description",
    status: "planned", // Planned feature (RBAC user management built in Phase 13)
    blocksLaunch: true,
  },
  attendance: {
    id: "attendance",
    titleKey: "landing.bento.cards.attendance.title",
    descriptionKey: "landing.bento.cards.attendance.description",
    status: "planned", // Planned feature
    blocksLaunch: true,
  },
  fees: {
    id: "fees",
    titleKey: "landing.bento.cards.fees.title",
    descriptionKey: "landing.bento.cards.fees.description",
    status: "planned", // Planned feature
    blocksLaunch: true,
  },
  exams: {
    id: "exams",
    titleKey: "landing.bento.cards.exams.title",
    descriptionKey: "landing.bento.cards.exams.description",
    status: "planned", // Planned feature
    blocksLaunch: true,
  },
  communication: {
    id: "communication",
    titleKey: "landing.bento.cards.communication.title",
    descriptionKey: "landing.bento.cards.communication.description",
    status: "planned", // Planned feature (parent broadcasts built in Phase 19)
    blocksLaunch: true,
  },
  insights: {
    id: "insights",
    titleKey: "landing.bento.cards.insights.title",
    descriptionKey: "landing.bento.cards.insights.description",
    status: "planned", // Planned feature (analytics charts built in Phase 20)
    blocksLaunch: true,
  },
};

export const whyRowsConfig: Record<string, FeatureClaim> = {
  speed: {
    id: "speed",
    titleKey: "landing.why.rows.speed.title",
    descriptionKey: "landing.why.rows.speed.description",
    status: "planned",
    blocksLaunch: true,
  },
  privacy: {
    id: "privacy",
    titleKey: "landing.why.rows.privacy.title",
    descriptionKey: "landing.why.rows.privacy.description",
    status: "planned",
    blocksLaunch: true,
  },
  everywhere: {
    id: "everywhere",
    titleKey: "landing.why.rows.everywhere.title",
    descriptionKey: "landing.why.rows.everywhere.description",
    status: "planned",
    blocksLaunch: true,
  },
  india: {
    id: "india",
    titleKey: "landing.why.rows.india.title",
    descriptionKey: "landing.why.rows.india.description",
    status: "planned",
    blocksLaunch: true,
  },
};
