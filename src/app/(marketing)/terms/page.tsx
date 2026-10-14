import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Terms of Service (Draft)",
  description:
    "ProgressEye terms of service and acceptable usage guidelines for educational institutions.",
};

export default function TermsPage() {
  return (
    <StubPage
      title="Terms of Service"
      subtitle="Draft documentation — subject to legal verification before production deployment."
      badge="DRAFT-NEEDS-LEGAL-REVIEW"
    />
  );
}
