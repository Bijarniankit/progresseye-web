import { StubPage } from "@/components/marketing/stub-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Careers at ProgressEye — We're Hiring",
  description:
    "Join us in engineering calm, high-craft operating infrastructure for schools across India.",
};

export default function CareersPage() {
  return (
    <StubPage
      title="Join the ProgressEye Mission"
      subtitle="Help us build resilient, high-craft operating systems for schools across India and beyond."
      badge="We're hiring"
    />
  );
}
