"use client";

import * as React from "react";
import type { InquiryFormProps } from "./contact-form";

export function InquiryFormIsland({ mode = "contact" }: InquiryFormProps) {
  const isDemo = mode === "demo";
  const [Form, setForm] = React.useState<React.ComponentType<InquiryFormProps> | null>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    import("./contact-form").then((mod) => {
      setForm(() => mod.ContactForm);
    });
  }, []);

  if (!Form) {
    return (
      <div className="space-y-6">
        <noscript>
          <div
            data-testid={isDemo ? "demo-noscript-notice" : "contact-noscript-notice"}
            className="rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8 space-y-2"
          >
            <p className="font-display text-base font-bold text-text">
              JavaScript is required for the {isDemo ? "demo request" : "contact"} form
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              This interactive form requires JavaScript. To reach our team directly, you can{" "}
              <a
                href={isDemo ? "/contact" : "/demo"}
                className="font-semibold text-brand underline hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {isDemo ? "visit our contact page" : "book a free demo"}
              </a>
              .
            </p>
          </div>
        </noscript>

        <section
          aria-label={isDemo ? "Demo request form loading" : "Contact form loading"}
          aria-busy={isClient ? "true" : undefined}
          className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs space-y-5"
        >
          <div className="space-y-2 mb-6">
            <div className="h-7 w-48 bg-surface-subtle rounded animate-pulse" />
            <div className="h-4 w-72 bg-surface-subtle rounded animate-pulse" />
          </div>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="h-4 w-24 bg-surface-subtle rounded animate-pulse" />
              <div className="h-10 bg-surface-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-28 bg-surface-subtle rounded animate-pulse" />
              <div className="h-10 bg-surface-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-44 bg-surface-subtle rounded animate-pulse" />
              <div className="h-10 bg-surface-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-20 bg-surface-subtle rounded animate-pulse" />
              <div className="h-10 bg-surface-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-20 bg-surface-subtle rounded animate-pulse" />
              <div className="h-28 bg-surface-subtle rounded animate-pulse" />
            </div>
            <div className="h-4 w-64 bg-surface-subtle rounded animate-pulse" />
            <div className="h-10 w-36 bg-surface-subtle rounded animate-pulse" />
          </div>
        </section>
      </div>
    );
  }

  return <Form mode={mode} />;
}

export function ContactFormIsland() {
  return <InquiryFormIsland mode="contact" />;
}

export function DemoFormIsland() {
  return <InquiryFormIsland mode="demo" />;
}
