import { StubPage } from "@/components/marketing/stub-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us — Support & School Onboarding",
  description:
    "Get in touch with the ProgressEye team for school onboarding, enterprise support, and API integrations.",
};

export default function ContactPage() {
  return (
    <StubPage
      title="Get in Touch with our Team"
      subtitle="Have questions about school onboarding, custom deployments, or API integrations? We are here to help."
    />
  );
}
