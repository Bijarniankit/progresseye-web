import { ArrowRight, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DemoFormIsland } from "@/components/marketing/contact/contact-form-island";

export const metadata: Metadata = {
  title: "Schedule a Demo — ProgressEye",
  description:
    "Request a personalized, guided product demonstration of ProgressEye school operating software.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Schedule a Demo | ProgressEye",
    description:
      "Request a personalized, guided product demonstration of ProgressEye school operating software.",
    url: "/demo",
  },
};

const walkthroughPoints = [
  {
    title: "Personalized Workflow Walkthrough",
    description: "A focused demonstration of attendance, fee management, and academic grading.",
  },
  {
    title: "Institutional Fit & Onboarding",
    description: "Discuss roster migration from existing spreadsheets and deployment schedules.",
  },
  {
    title: "Data Privacy & Governance",
    description: "Questions about data privacy and access controls.",
  },
];

export default function DemoPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Demo Hero */}
      <section
        aria-labelledby="demo-hero-heading"
        className="relative overflow-hidden bg-surface py-16 md:py-20 lg:py-24 border-b border-border"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Calendar className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span>Product Walkthrough</span>
          </div>

          <h1
            id="demo-hero-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-5xl"
          >
            Book a Free Demo
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
            Explore the planned ProgressEye interface and administrative workflows tailored to your
            school&apos;s operating model.
          </p>
        </div>
      </section>

      {/* 2. Split Layout: Walkthrough Context + Demo Request Form Island */}
      <section
        aria-labelledby="demo-section-heading"
        className="relative bg-surface py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="demo-section-heading" className="sr-only">
            Demo Details & Request Form
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Context Card */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>What to Expect</span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-text">
                    A calm, comprehensive tour of the platform
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    We walk through planned workflows shown with sample data, showing how
                    ProgressEye simplifies campus administration.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {walkthroughPoints.map((point) => (
                    <div key={point.title} className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-brand mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-text">{point.title}</p>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Contact Alternative */}
                <div className="border-t border-border pt-6 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    General Inquiries?
                  </p>
                  <p className="text-sm text-text-muted">
                    Have general questions rather than scheduling a walkthrough?
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      <span>Send our team a message</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form Island */}
            <div className="lg:col-span-7">
              <DemoFormIsland />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
