import { notFound } from "next/navigation";
import { ComponentsShowcase } from "./components-showcase";

export const metadata = {
  title: "Marketing Components Showcase — ProgressEye",
  description:
    "Internal showcase for ProgressEye motion primitives and marketing shell components.",
};

export default function DevComponentsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <ComponentsShowcase />;
}
