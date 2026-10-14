import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-[var(--text-small)] font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-brand)] text-[var(--color-brand-foreground)] shadow-[var(--shadow-e1)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]",
        primary:
          "bg-[var(--color-brand)] text-[var(--color-brand-foreground)] shadow-[var(--shadow-e1)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]",
        destructive:
          "bg-[var(--color-status-danger)] text-[var(--color-status-danger-foreground)] shadow-[var(--shadow-e1)] hover:opacity-90 active:scale-[0.98]",
        danger:
          "bg-[var(--color-status-danger)] text-[var(--color-status-danger-foreground)] shadow-[var(--shadow-e1)] hover:opacity-90 active:scale-[0.98]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-e1)] hover:bg-[var(--color-surface-subtle)] active:scale-[0.98]",
        secondary:
          "bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-card)] active:scale-[0.98]",
        ghost:
          "text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] active:scale-[0.98]",
        accent:
          "bg-[var(--color-peach-wash)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-mint-wash)] active:scale-[0.98]",
        link: "text-[var(--color-brand)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        md: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
        lg: "h-12 rounded-[var(--radius-lg)] px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
