"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--color-surface-card)] group-[.toaster]:text-[var(--color-text)] group-[.toaster]:border-[var(--color-border)] group-[.toaster]:shadow-[var(--shadow-e3)] group-[.toaster]:rounded-[var(--radius-md)]",
          description: "group-[.toast]:text-[var(--color-text-muted)]",
          actionButton:
            "group-[.toast]:bg-[var(--color-brand)] group-[.toast]:text-[var(--color-brand-foreground)]",
          cancelButton:
            "group-[.toast]:bg-[var(--color-surface-subtle)] group-[.toast]:text-[var(--color-text-muted)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
