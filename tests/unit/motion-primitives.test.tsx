import { MagneticButton } from "@/components/marketing/motion/magnetic-button";
import { TiltCard } from "@/components/marketing/motion/tilt-card";
import { useSpotlight } from "@/components/marketing/motion/use-spotlight";
import { WordReveal } from "@/components/marketing/motion/word-reveal";
import { render, renderHook, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

describe("Motion Primitives Unit Tests", () => {
  describe("WordReveal", () => {
    it("renders text with full accessible screen-reader announcement", () => {
      render(<WordReveal text="The school workspace that runs itself." />);
      const wrapper = screen.getByText("The school workspace that runs itself.");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass("sr-only");
    });

    it("applies brand color when highlight is true", () => {
      const { container } = render(<WordReveal text="Highlighted Word" highlight />);
      const highlightedTokens = container.querySelectorAll(".text-\\[var\\(--color-brand\\)\\]");
      expect(highlightedTokens.length).toBeGreaterThan(0);
    });
  });

  describe("MagneticButton", () => {
    it("renders children cleanly", () => {
      render(
        <MagneticButton>
          <button type="button">Click me</button>
        </MagneticButton>,
      );
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });
  });

  describe("TiltCard", () => {
    it("renders content inside 3D perspective wrapper", () => {
      render(
        <TiltCard>
          <div>Card Content</div>
        </TiltCard>,
      );
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });
  });

  describe("useSpotlight", () => {
    it("provides ref and onMouseMove handler", () => {
      const { result } = renderHook(() => useSpotlight());
      expect(result.current.ref).toBeDefined();
      expect(typeof result.current.onMouseMove).toBe("function");
    });
  });
});
