import { StubPage } from "@/components/marketing/stub-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Features — Engineered for Modern Education",
  description:
    "Explore ProgressEye modules: attendance, academics, fees, exams, and parent communications.",
};

export default function FeaturesPage() {
  return (
    <StubPage
      title="Engineered for Every School Role"
      subtitle="Discover attendance tracking, fee management, academic scheduling, and real-time communication modules."
    />
  );
}
