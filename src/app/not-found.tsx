import { Home, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e2)]">
        <div className="mx-auto w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-contrast)] flex items-center justify-center">
          <span className="font-display font-extrabold text-[var(--color-surface)] text-xl">P</span>
        </div>

        <div className="space-y-2">
          <div className="font-display text-5xl font-extrabold tracking-tight text-[var(--color-brand)]">
            404
          </div>
          <h1 className="text-xl font-bold text-[var(--color-text)]">Page Not Found</h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            The page you requested could not be found or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Button
            asChild
            className="rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link href="/contact">
              <LifeBuoy className="h-4 w-4" />
              <span>Contact Support</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
