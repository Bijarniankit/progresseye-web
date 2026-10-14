import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Cookie Policy (Draft)",
  description: "ProgressEye cookie policy and tracking minimization practices.",
};

export default function CookiesPage() {
  return (
    <StubPage
      title="Cookie Policy"
      subtitle="Draft documentation — subject to legal verification before production deployment."
      badge="DRAFT-NEEDS-LEGAL-REVIEW"
    />
  );
}
