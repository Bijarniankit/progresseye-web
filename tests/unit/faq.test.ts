import { describe, expect, it } from "vitest";
import { landingFaqs } from "@/config/faq";

describe("FAQ Configuration & Planned Markers", () => {
  it("contains valid FAQ items with non-empty fields and status planned", () => {
    expect(landingFaqs.length).toBeGreaterThanOrEqual(5);

    for (const faq of landingFaqs) {
      expect(faq.id).toBeTruthy();
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
      expect(faq.status).toBe("planned");
      expect(["payments", "academics", "privacy", "platform", "onboarding"]).toContain(
        faq.category,
      );
    }
  });

  it("phrases unbuilt payment, academic, and privacy capabilities honestly as planned", () => {
    const upiFaq = landingFaqs.find((f) => f.id === "payments-upi");
    expect(upiFaq?.answer).toMatch(/designed to support|planned for Phase 18/i);

    const reportCardFaq = landingFaqs.find((f) => f.id === "academics-boards");
    expect(reportCardFaq?.answer).toMatch(/planned for Phase 17|designed to handle/i);

    const privacyFaq = landingFaqs.find((f) => f.id === "privacy-dpdp");
    expect(privacyFaq?.answer).toMatch(/designed to guarantee|designed to adhere/i);
  });
});
