import { StubPage } from "@/components/marketing/stub-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find clear answers on school onboarding, multi-tenant security, fee reconciliation, and data privacy.",
};

export default function FaqPage() {
  return (
    <StubPage
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about ProgressEye architecture, security, pricing, and setup speed."
    />
  );
}
