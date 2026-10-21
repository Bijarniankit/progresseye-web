export interface AboutValue {
  id: string;
  title: string;
  description: string;
  reviewStatus: "DRAFT-CONTENT-REVIEW";
}

export interface AboutPrinciple {
  id: string;
  text: string;
}

export interface AboutConfig {
  hasConfiguredStats: boolean;
  hasConfiguredStory: boolean;
  hasConfiguredTeam: boolean;
  showDraftBadges: boolean;
  values: AboutValue[];
  principles: AboutPrinciple[];
}

export const aboutConfig: AboutConfig = {
  // Gated flags - default off until real production data is verified (blocks launch)
  hasConfiguredStats: false,
  hasConfiguredStory: false,
  hasConfiguredTeam: false,
  showDraftBadges: false, // Review badges hidden by default in public UI; tracked in code comments & PLACEHOLDERS.md

  /* DRAFT-CONTENT-REVIEW: Aspirational values. Tracked in PLACEHOLDERS.md. Blocks public launch. */
  values: [
    {
      id: "transparency",
      title: "Transparency",
      description:
        "We believe in straightforward pricing, honest product roadmaps, and clear communication with schools and guardians.",
      reviewStatus: "DRAFT-CONTENT-REVIEW",
    },
    {
      id: "clarity",
      title: "Clarity",
      description:
        "Every screen is designed to reduce noise, prevent accidental mistakes, and keep critical records legible at a glance.",
      reviewStatus: "DRAFT-CONTENT-REVIEW",
    },
    {
      id: "reliability",
      title: "Reliability",
      description:
        "School days run on rigid routines. Our goal is steady, dependable performance every morning when attendance and roll calls begin.",
      reviewStatus: "DRAFT-CONTENT-REVIEW",
    },
    {
      id: "child-safety",
      title: "Child safety",
      description:
        "Student data and emergency contacts require extreme care. We take privacy and access controls seriously.",
      reviewStatus: "DRAFT-CONTENT-REVIEW",
    },
  ],

  /* Plain intentions: "We aim to..." without implying measured commercial commitments */
  principles: [
    { id: "p1", text: "We aim to respect teachers' time above all else." },
    { id: "p2", text: "We aim to design for patchy connections and everyday phones." },
    { id: "p3", text: "We aim to separate school data strictly by design." },
    { id: "p4", text: "We aim for clear interfaces, plain pricing and no hidden add-ons." },
  ],
};
