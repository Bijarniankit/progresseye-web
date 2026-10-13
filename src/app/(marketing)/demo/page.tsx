import { StubPage } from "@/components/marketing/stub-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Book a Demo — Live Product Tour",
  description:
    "Schedule a personalized 20-minute demonstration tailored to your school's operating workflow.",
};

export default function DemoPage() {
  return (
    <StubPage
      title="Experience ProgressEye Live"
      subtitle="Schedule a personalized 20-minute product tour tailored to your school administrative workflow."
    />
  );
}
