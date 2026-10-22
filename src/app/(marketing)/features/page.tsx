import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Planned Features — ProgressEye",
  description:
    "Planned capabilities under development for school operations: attendance tracking, fee collection, academic scheduling, and communications.",
};

export default function FeaturesPage() {
  return (
    <StubPage
      title="Planned Capabilities for School Operations"
      subtitle="An overview of modules planned for future release: attendance tracking, fee collection, academic scheduling, and parent communication."
    />
  );
}
