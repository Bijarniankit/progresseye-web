import { notFound } from "next/navigation";
import { TokensShowcase } from "./tokens-showcase";

export const metadata = {
  title: "Design Tokens Showcase — ProgressEye",
  description: "Internal design system showcase for ProgressEye tokens and UI primitives.",
};

export default function DevTokensPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <TokensShowcase />;
}
