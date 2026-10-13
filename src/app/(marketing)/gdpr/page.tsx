import { StubPage } from "@/components/marketing/stub-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GDPR & DPDP Compliance (Draft)",
  description:
    "ProgressEye data protection architecture aligning with India's DPDP Act and GDPR standards.",
};

export default function GdprPage() {
  return (
    <StubPage
      title="GDPR & DPDP Compliance"
      subtitle="Draft documentation — subject to legal verification before production deployment."
      badge="DRAFT-NEEDS-LEGAL-REVIEW"
    />
  );
}
