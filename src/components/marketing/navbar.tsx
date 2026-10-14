"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import * as React from "react";
import { MobileDrawer } from "@/components/marketing/mobile-drawer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function PublicNavbar() {
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { theme, setTheme } = useTheme();

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[var(--z-nav)] h-16 lg:h-20 transition-colors duration-[var(--duration-normal)] ease-[var(--ease-standard)] ${
          scrolled
            ? "bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[var(--shadow-e1)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Mark & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-[var(--radius-md)] -ml-1 pl-1 py-1 pr-2"
          >
            <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-surface-contrast)] relative flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-display font-extrabold text-[var(--color-surface)] text-lg leading-none">
                P
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand)] ring-2 ring-[var(--color-surface)] absolute -bottom-1 -right-1" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-[var(--color-text)]">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Desktop Navigation Links (6 links) — shown only on lg screens (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
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
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] ${
                    isActive
                      ? "text-[var(--color-brand)] font-semibold"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive &&
                    (shouldReduceMotion ? (
                      <span className="absolute inset-0 rounded-full bg-[var(--color-surface-subtle)] -z-10" />
                    ) : (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-[var(--color-surface-subtle)] -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    ))}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Theme Toggle, Sign In, Get Started */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0 rounded-full text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
              aria-label={mounted && theme === "dark" ? tNav("themeLight") : tNav("themeDark")}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Link
              href="/login"
              className="px-3.5 py-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-[var(--radius-md)]"
            >
              {tNav("signIn")}
            </Link>

            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-surface-contrast)] text-[var(--color-surface)] hover:bg-[var(--color-brand)] hover:text-[var(--color-brand-foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              {tNav("getStarted")}
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Button (screens < 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(true)}
              className="h-10 w-10 p-0 rounded-[var(--radius-md)] text-[var(--color-text)]"
              aria-label={tNav("openMenu")}
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer */}
      <MobileDrawer open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
