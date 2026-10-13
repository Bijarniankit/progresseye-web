"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Moon, Play, RefreshCw, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { toast } from "sonner";

export function TokensShowcase() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get("theme");
      if (urlTheme === "dark" || urlTheme === "light") {
        setTheme(urlTheme);
      }
    }
  }, [setTheme]);

  const triggerAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  };

  const brandShades = [
    { name: "brand-50", var: "var(--palette-brand-50)", textVar: "var(--palette-slate-900)" },
    { name: "brand-100", var: "var(--palette-brand-100)", textVar: "var(--palette-slate-900)" },
    { name: "brand-200", var: "var(--palette-brand-200)", textVar: "var(--palette-slate-900)" },
    { name: "brand-300", var: "var(--palette-brand-300)", textVar: "var(--palette-slate-900)" },
    { name: "brand-400", var: "var(--palette-brand-400)", textVar: "var(--palette-slate-900)" },
    { name: "brand-500", var: "var(--palette-brand-500)", textVar: "var(--palette-slate-900)" },
    { name: "brand-600", var: "var(--palette-brand-600)", textVar: "var(--palette-white)" },
    { name: "brand-700", var: "var(--palette-brand-700)", textVar: "var(--palette-white)" },
    { name: "brand-800", var: "var(--palette-brand-800)", textVar: "var(--palette-white)" },
    { name: "brand-900", var: "var(--palette-brand-900)", textVar: "var(--palette-white)" },
    { name: "brand-950", var: "var(--palette-brand-950)", textVar: "var(--palette-white)" },
  ];

  const slateShades = [
    { name: "slate-50", var: "var(--palette-slate-50)", textVar: "var(--palette-slate-900)" },
    { name: "slate-100", var: "var(--palette-slate-100)", textVar: "var(--palette-slate-900)" },
    { name: "slate-200", var: "var(--palette-slate-200)", textVar: "var(--palette-slate-900)" },
    { name: "slate-300", var: "var(--palette-slate-300)", textVar: "var(--palette-slate-900)" },
    { name: "slate-400", var: "var(--palette-slate-400)", textVar: "var(--palette-slate-900)" },
    { name: "slate-500", var: "var(--palette-slate-500)", textVar: "var(--palette-white)" },
    { name: "slate-600", var: "var(--palette-slate-600)", textVar: "var(--palette-white)" },
    { name: "slate-700", var: "var(--palette-slate-700)", textVar: "var(--palette-white)" },
    { name: "slate-800", var: "var(--palette-slate-800)", textVar: "var(--palette-white)" },
    { name: "slate-900", var: "var(--palette-slate-900)", textVar: "var(--palette-white)" },
    { name: "slate-950", var: "var(--palette-slate-950)", textVar: "var(--palette-white)" },
  ];

  const semanticColors = [
    { name: "surface", var: "var(--color-surface)", desc: "Main canvas background" },
    { name: "surface-subtle", var: "var(--color-surface-subtle)", desc: "Muted background / tags" },
    { name: "surface-card", var: "var(--color-surface-card)", desc: "Elevated card background" },
    {
      name: "surface-contrast",
      var: "var(--color-surface-contrast)",
      desc: "High contrast backdrop",
    },
    { name: "text", var: "var(--color-text)", desc: "Primary text heading & body" },
    { name: "text-muted", var: "var(--color-text-muted)", desc: "Secondary text / captions" },
    { name: "border", var: "var(--color-border)", desc: "Hairline card & input border" },
    { name: "border-focus", var: "var(--color-border-focus)", desc: "Accessible focus ring" },
    { name: "brand", var: "var(--color-brand)", desc: "Primary interactive action" },
    { name: "brand-hover", var: "var(--color-brand-hover)", desc: "Interactive hover state" },
    { name: "peach-wash", var: "var(--color-peach-wash)", desc: "Warm marketing hero accent" },
    { name: "mint-wash", var: "var(--color-mint-wash)", desc: "Fresh success accent" },
    {
      name: "status-success",
      var: "var(--color-status-success)",
      desc: "Positive / verified state",
    },
    { name: "status-warning", var: "var(--color-status-warning)", desc: "Pending / caution state" },
    { name: "status-danger", var: "var(--color-status-danger)", desc: "Destructive / error state" },
    { name: "status-info", var: "var(--color-status-info)", desc: "Informational state" },
  ];

  const spacingScale = [
    { name: "--space-1", val: "4px" },
    { name: "--space-2", val: "8px" },
    { name: "--space-3", val: "12px" },
    { name: "--space-4", val: "16px" },
    { name: "--space-5", val: "20px" },
    { name: "--space-6", val: "24px" },
    { name: "--space-8", val: "32px" },
    { name: "--space-10", val: "40px" },
    { name: "--space-12", val: "48px" },
    { name: "--space-16", val: "64px" },
    { name: "--space-20", val: "80px" },
    { name: "--space-24", val: "96px" },
    { name: "--space-32", val: "128px" },
  ];

  const motionEasings = [
    { name: "Spring", token: "var(--ease-out-spring)", cubic: "cubic-bezier(0.16, 1, 0.3, 1)" },
    { name: "Smooth", token: "var(--ease-in-out-smooth)", cubic: "cubic-bezier(0.4, 0, 0.2, 1)" },
    {
      name: "Decelerate",
      token: "var(--ease-out-decelerate)",
      cubic: "cubic-bezier(0, 0, 0.2, 1)",
    },
    { name: "Accelerate", token: "var(--ease-in-accelerate)", cubic: "cubic-bezier(0.4, 0, 1, 1)" },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-8 md:px-12 md:py-12 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)]">
                Internal Only
              </span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                /dev/tokens (404 in production)
              </span>
            </div>
            <h1 className="text-[var(--text-h2)] font-bold tracking-tight mt-2 text-[var(--color-text)]">
              ProgressEye 2.0 Design Tokens
            </h1>
            <p className="text-[var(--color-text-muted)] text-[var(--text-body)] mt-1">
              Two-layer token architecture, typography hierarchy, responsive scales, and accessible
              primitives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="gap-2"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Dark Mode
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Section 1: Color Hierarchy */}
        <section className="space-y-6" aria-labelledby="tokens-colors-title">
          <div>
            <h2
              id="tokens-colors-title"
              className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
            >
              1. Color Architecture
            </h2>
            <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
              Layer 1 defines raw palette ramps; Layer 2 binds semantic intent. Components consume
              semantic tokens only.
            </p>
          </div>

          {/* Layer 2: Semantic Tokens */}
          <div className="space-y-3">
            <h3 className="text-[var(--text-h5)] font-medium text-[var(--color-text)]">
              Layer 2: Semantic Tokens (Adaptive Light/Dark)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {semanticColors.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)] flex flex-col justify-between"
                >
                  <div
                    className="h-16 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] mb-3"
                    style={{ backgroundColor: item.var }}
                  />
                  <div>
                    <div className="font-mono text-xs font-semibold text-[var(--color-text)]">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] leading-tight mt-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 1: Brand Scale */}
          <div className="space-y-3">
            <h3 className="text-[var(--text-h5)] font-medium text-[var(--color-text)]">
              Layer 1: Brand Ramp (Primary Royal Blue)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
              {brandShades.map((shade) => (
                <div
                  key={shade.name}
                  className="p-2 rounded-[var(--radius-sm)] text-center border border-[var(--color-border)]"
                  style={{ backgroundColor: shade.var, color: shade.textVar }}
                >
                  <div className="font-mono text-xs font-bold">
                    {shade.name.replace("brand-", "")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 1: Slate Scale */}
          <div className="space-y-3">
            <h3 className="text-[var(--text-h5)] font-medium text-[var(--color-text)]">
              Layer 1: Slate Ramp (Neutrals)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
              {slateShades.map((shade) => (
                <div
                  key={shade.name}
                  className="p-2 rounded-[var(--radius-sm)] text-center border border-[var(--color-border)]"
                  style={{ backgroundColor: shade.var, color: shade.textVar }}
                >
                  <div className="font-mono text-xs font-bold">
                    {shade.name.replace("slate-", "")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Typography Scale */}
        <section className="space-y-6" aria-labelledby="tokens-typography-title">
          <div>
            <h2
              id="tokens-typography-title"
              className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
            >
              2. Typography Hierarchy
            </h2>
            <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
              Poppins for headings/display, Inter variable for UI body copy and data tables.
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] divide-y divide-[var(--color-border)]">
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-44">
                Hero Display (40–72px)
              </span>
              <span className="text-display-hero font-extrabold text-[var(--color-text)]">
                School OS 2.0
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-44">
                Page-Hero Display (28–64px)
              </span>
              <span className="text-display-page font-extrabold text-[var(--color-text)]">
                Operational Intelligence
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">
                H1 (Hero)
              </span>
              <span className="text-[var(--text-h1)] font-bold text-[var(--color-text)]">
                Calm School Intelligence
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">
                H2 (Section)
              </span>
              <span className="text-[var(--text-h2)] font-semibold text-[var(--color-text)]">
                Operational Modules
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">
                H3 (Sub-section)
              </span>
              <span className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]">
                Academic Progress Tracking
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">
                H4 (Card Header)
              </span>
              <span className="text-[var(--text-h4)] font-medium text-[var(--color-text)]">
                Attendance & Bus Telemetry
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">
                Body Large
              </span>
              <span className="text-[var(--text-body-lg)] text-[var(--color-text)]">
                Enterprise infrastructure built for modern school administrators and parents.
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">Body</span>
              <span className="text-[var(--text-body)] text-[var(--color-text)]">
                Streamline tuition billing, grade cards, and biometric security under a single pane
                of glass.
              </span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-[var(--color-text-muted)] w-36">
                Tabular Numerals
              </span>
              <div className="space-y-1 font-mono text-sm">
                <div className="tabular-nums">98,765.43 (Tabular ON)</div>
                <div className="tabular-nums">11,111.11 (Aligned decimals)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Spacing Scale */}
        <section className="space-y-6" aria-labelledby="tokens-spacing-title">
          <div>
            <h2
              id="tokens-spacing-title"
              className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
            >
              3. Spacing Rhythm (4px Baseline Grid)
            </h2>
            <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
              Consistent vertical and horizontal layout increments from 4px to 128px.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-3">
            {spacingScale.map((space) => (
              <div key={space.name} className="flex items-center gap-4 text-xs font-mono">
                <span className="w-24 text-[var(--color-text-muted)]">{space.name}</span>
                <span className="w-12 text-[var(--color-text)] font-semibold">{space.val}</span>
                <div
                  className="h-4 bg-[var(--color-brand)] rounded-[var(--radius-sm)] opacity-80"
                  style={{ width: space.val }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Motion Curves & Durations */}
        <section className="space-y-6" aria-labelledby="tokens-motion-title">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="tokens-motion-title"
                className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
              >
                4. Motion Physics & Easing Curves
              </h2>
              <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
                Natural spring easing and fluid transitions designed to respect
                prefers-reduced-motion.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={triggerAnimation} className="gap-2">
              <Play className="h-4 w-4" /> Trigger Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {motionEasings.map((curve) => (
              <div
                key={curve.name}
                className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[var(--color-text)]">
                    {curve.name}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">
                    {curve.cubic}
                  </span>
                </div>
                <div className="h-10 bg-[var(--color-surface-subtle)] rounded-[var(--radius-sm)] p-1 relative overflow-hidden">
                  <div
                    className="h-8 w-8 rounded-full bg-[var(--color-brand)]"
                    style={{
                      transitionProperty: "transform",
                      transitionDuration: "600ms",
                      transitionTimingFunction: curve.cubic,
                      transform: isAnimating
                        ? "translateX(calc(100vw - 300px)) max(calc(100% - 32px))"
                        : "translateX(0)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Elevations & Shadows */}
        <section className="space-y-6" aria-labelledby="tokens-elevation-title">
          <div>
            <h2
              id="tokens-elevation-title"
              className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
            >
              5. Elevation System
            </h2>
            <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
              Subtle, warm multi-layered shadows designed to keep hierarchy clear without harsh
              contrast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e1)]">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Elevation e1</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Cards, tables, resting UI
              </p>
            </div>
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e2)]">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Elevation e2</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Hover state, dropdown menus
              </p>
            </div>
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e3)]">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Elevation e3</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Popovers, sticky headers
              </p>
            </div>
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-e4)]">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Elevation e4</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Modals, slide-out sheets
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: UI Primitives Playground */}
        <section className="space-y-6" aria-labelledby="tokens-primitives-title">
          <div>
            <h2
              id="tokens-primitives-title"
              className="text-[var(--text-h3)] font-semibold text-[var(--color-text)]"
            >
              6. UI Primitives Playground
            </h2>
            <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
              Accessible primitives built on Radix UI, styled strictly via semantic tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-4">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Buttons & Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="accent">Accent</Button>
                <Button disabled>Disabled</Button>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-4">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Form Controls</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-input">School Admin Email</Label>
                  <Input id="demo-input" placeholder="principal@greenwood.edu" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-select">Select Academic Term</Label>
                  <Select>
                    <SelectTrigger id="demo-select">
                      <SelectValue placeholder="Choose a term..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term1">Fall Semester 2026</SelectItem>
                      <SelectItem value="term2">Spring Semester 2027</SelectItem>
                      <SelectItem value="term3">Summer Intensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox id="demo-terms" />
                  <Label htmlFor="demo-terms" className="text-xs">
                    Enable real-time SMS notifications for parents
                  </Label>
                </div>
              </div>
            </div>

            {/* Dialog & Sheet */}
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-4">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Modals & Drawers</h3>
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Enrollment</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to approve this student admission for Greenwood
                        Academy?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-2 text-sm text-[var(--color-text-muted)]">
                      Student ID: #STU-2026-042 • Grade: 9A
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="primary">Confirm Admission</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Student Details</SheetTitle>
                      <SheetDescription>
                        Inspect telemetry, bus routes, and attendance records.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-4 text-sm">
                      <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--color-surface-subtle)]">
                        Status: Active Attendance (98.4%)
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline">Close Panel</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost">Hover for Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>Accessible tooltip with semantic backdrop</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Tabs & Accordion */}
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-4">
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Tabs & Accordion</h3>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="overview"
                  className="text-xs text-[var(--color-text-muted)] pt-2"
                >
                  Displaying real-time school attendance rates across 12 campuses.
                </TabsContent>
                <TabsContent
                  value="analytics"
                  className="text-xs text-[var(--color-text-muted)] pt-2"
                >
                  Academic KPI metrics and grade point distribution charts.
                </TabsContent>
                <TabsContent
                  value="settings"
                  className="text-xs text-[var(--color-text-muted)] pt-2"
                >
                  Tenant configuration and role-based permissions.
                </TabsContent>
              </Tabs>

              <Accordion type="single" collapsible className="w-full pt-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">
                    How does multi-tenant data isolation work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Every school tenant runs with dedicated PostgreSQL Row-Level Security (RLS)
                    policies enforcing tenant isolation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm">
                    Can parent notifications be scheduled via BullMQ?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, background queues process SMS, email, and WhatsApp delivery asynchronously
                    with retry policies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Skeletons & Toasts */}
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-[var(--color-text)]">
                  Feedback & Skeleton Loading
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success("Admission fee paid successfully!")}
                  >
                    Toast Success
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.error("Failed to connect to gateway.")}
                  >
                    Toast Error
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-20 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
