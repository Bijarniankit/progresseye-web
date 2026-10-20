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
  values: AboutValue[];
  principles: AboutPrinciple[];
}

export const aboutConfig: AboutConfig = {
  // Gated flags - default off until real production data is verified (blocks launch)
  hasConfiguredStats: false,
  hasConfiguredStory: false,
  hasConfiguredTeam: false,

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
        "Student data and emergency contacts require extreme care. We treat privacy and access controls as non-negotiable fundamentals.",
      reviewStatus: "DRAFT-CONTENT-REVIEW",
    },
  ],

  principles: [
    { id: "p1", text: "Respect teachers' time above all else." },
    { id: "p2", text: "Design for patchy connections and everyday phones." },
    { id: "p3", text: "Separate school data strictly by design." },
    { id: "p4", text: "Zero dark patterns or hidden add-ons." },
  ],
};
