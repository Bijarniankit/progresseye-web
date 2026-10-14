import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "About ProgressEye — Our Mission",
  description:
    "Learn how ProgressEye builds calm, trustworthy operating software for modern educational institutions.",
};

export default function AboutPage() {
  return (
    <StubPage
      title="Building Calm Operating Software for Schools"
      subtitle="Learn about our mission to eliminate administrative friction and keep student safety at the center."
    />
  );
}
