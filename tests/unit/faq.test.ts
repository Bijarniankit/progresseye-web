import { describe, expect, it } from "vitest";
import { landingFaqs } from "@/config/faq";

describe("FAQ Configuration & Planned Markers", () => {
  it("contains 6 valid FAQ items with non-empty fields and status planned", () => {
    expect(landingFaqs.length).toBe(6);

    for (const faq of landingFaqs) {
      expect(faq.id).toBeTruthy();
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
      expect(faq.status).toBe("planned");
      expect(["payments", "academics", "privacy", "platform", "onboarding", "training"]).toContain(
        faq.category,
      );
    }
  });

  it("phrases unbuilt payment, academic, and privacy capabilities honestly as planned without phase numbers", () => {
    // Assert no answer contains internal phase numbers
    for (const faq of landingFaqs) {
      expect(faq.answer).not.toMatch(/Phase\s+\d+/i);
    }

    const upiFaq = landingFaqs.find((f) => f.id === "payments-upi");
    expect(upiFaq?.answer).toMatch(/collect fees online/i);

    const reportCardFaq = landingFaqs.find((f) => f.id === "academics-boards");
    expect(reportCardFaq?.answer).toMatch(/board requirements/i);

    const privacyFaq = landingFaqs.find((f) => f.id === "privacy-dpdp");
    expect(privacyFaq?.answer).toMatch(/PostgreSQL Row-Level Security|adhere to Indian/i);

    const onboardingFaq = landingFaqs.find((f) => f.id === "onboarding-timeline");
    expect(onboardingFaq?.answer).toMatch(/structured spreadsheet templates/i);

    const trainingFaq = landingFaqs.find((f) => f.id === "onboarding-training");
    expect(trainingFaq?.answer).toMatch(/guided orientation walkthroughs/i);
  });
});
