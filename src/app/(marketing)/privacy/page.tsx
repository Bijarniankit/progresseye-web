import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  description: "ProgressEye privacy policy regarding school and student data protection.",
};

export default function PrivacyPage() {
  return (
    <StubPage
      title="Privacy Policy"
      subtitle="Draft documentation — subject to legal verification before production deployment."
      badge="DRAFT-NEEDS-LEGAL-REVIEW"
    />
  );
}
