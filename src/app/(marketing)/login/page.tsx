import { ArrowLeft, Calendar, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "School Operations & Parent Portal",
  description:
    "Administrative, educator, and parent portal logins are planned for upcoming release.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
      <div className="p-8 sm:p-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e2)] space-y-6 text-center">
        <div className="mx-auto w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface-subtle)] text-[var(--color-brand)]">
            Planned Portal Rollout
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            School Operations Portal
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Administrative, teacher, and parent portal authentication will be enabled as part of our
            upcoming operational authentication and session rollout.
          </p>
        </div>

        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] text-xs text-[var(--color-text-muted)] leading-relaxed text-left space-y-1 border border-[var(--color-border)]">
          <h2 className="font-semibold text-[var(--color-text)]">
            Looking to evaluate ProgressEye?
          </h2>
          <div>
            Book a guided demonstration with our team or return to our public features tour.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Button
            asChild
            className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] gap-2"
          >
            <Link href="/demo">
              <Calendar className="h-4 w-4" />
              <span>Book a free demo</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
