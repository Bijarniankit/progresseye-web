"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer automatically on route navigation
  // biome-ignore lint/correctness/useExhaustiveDependencies: close drawer whenever pathname changes
  React.useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[360px] p-6 flex flex-col justify-between bg-[var(--color-surface-card)] border-l border-[var(--color-border)]"
      >
        <div className="space-y-6">
          <SheetHeader className="text-left pb-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-surface-contrast)] relative flex items-center justify-center">
                <span className="font-display font-extrabold text-[var(--color-surface)] text-base">
                  P
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] ring-2 ring-[var(--color-surface)] absolute -bottom-0.5 -right-0.5" />
              </div>
              <SheetTitle className="text-lg font-display font-bold text-[var(--color-text)]">
                {siteConfig.shortName}
              </SheetTitle>
            </div>
            <SheetDescription className="sr-only">{tNav("openMenu")}</SheetDescription>
          </SheetHeader>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {siteConfig.navLinks.map((link) => {
              const label = tNav(link.labelKey);
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    (link.href === "/pricing" && pathname === "/get-started");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-[var(--radius-md)] text-base font-medium min-h-[44px] transition-colors ${
                    isActive
                      ? "bg-[var(--color-surface-subtle)] text-[var(--color-brand)] font-semibold"
                      : "text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 min-h-[44px] text-[var(--color-text)]"
            onClick={toggleTheme}
            aria-label={mounted && theme === "dark" ? tNav("themeLight") : tNav("themeDark")}
          >
            {mounted && theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                <span>{tNav("themeLight")}</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span>{tNav("themeDark")}</span>
              </>
            )}
          </Button>

          {/* Authentication CTAs */}
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center min-h-[44px] w-full rounded-[var(--radius-md)] text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] border border-[var(--color-border)] transition-colors"
            >
              {tNav("signIn")}
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center min-h-[44px] w-full rounded-[var(--radius-md)] text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:bg-[var(--color-brand-hover)] transition-colors"
            >
              {tNav("getStarted")}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
