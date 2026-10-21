"use client";

import * as React from "react";

export function ContactFormIsland() {
  const [Form, setForm] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    import("./contact-form").then((mod) => {
      setForm(() => mod.ContactForm);
    });
  }, []);

  if (!Form) {
    return (
      <section
        aria-label="Contact form loading"
        aria-busy="true"
        className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-[var(--shadow-e1)] space-y-4"
      >
        <div className="h-6 w-32 bg-[var(--color-surface-subtle)] rounded animate-pulse" />
        <div className="space-y-4">
          <div className="h-10 bg-[var(--color-surface-subtle)] rounded animate-pulse" />
          <div className="h-10 bg-[var(--color-surface-subtle)] rounded animate-pulse" />
          <div className="h-10 bg-[var(--color-surface-subtle)] rounded animate-pulse" />
          <div className="h-28 bg-[var(--color-surface-subtle)] rounded animate-pulse" />
          <div className="h-10 w-36 bg-[var(--color-surface-subtle)] rounded animate-pulse" />
        </div>
      </section>
    );
  }

  return <Form />;
}
