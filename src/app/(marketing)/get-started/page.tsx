import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Get Started — Free School Workspace Trial",
  description:
    "Launch your ProgressEye school workspace in minutes with full administrative feature access.",
};

export default function GetStartedPage() {
  return (
    <StubPage
      title="Get Started with ProgressEye"
      subtitle="Launch your school workspace in minutes. Free 30-day full-feature trial for educational institutions."
    />
  );
}
