"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error to console in development
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-[var(--radius-xl)] border border-[var(--color-danger)]/20 bg-[var(--color-surface-card)] shadow-[var(--shadow-e2)]">
        <div className="mx-auto w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-danger)]/10 text-[var(--color-danger)] flex items-center justify-center">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[var(--color-text)]">Something went wrong</h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            An unexpected error occurred while rendering this page.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface-subtle)] px-2 py-1 rounded-[var(--radius-sm)] inline-block">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Button
            onClick={() => reset()}
            className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
