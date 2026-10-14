import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import type React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MagneticButton } from "@/components/marketing/motion/magnetic-button";
import { TiltCard } from "@/components/marketing/motion/tilt-card";
import { useSpotlight } from "@/components/marketing/motion/use-spotlight";
import { WordReveal } from "@/components/marketing/motion/word-reveal";

describe("Motion Primitives Unit Tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  describe("Touch / coarse-pointer disabling", () => {
    it("disables magnetic attraction on touch/coarse devices", () => {
      vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
        matches: query === "(pointer: coarse)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <MagneticButton>
          <button type="button">Touch Button</button>
        </MagneticButton>,
      );
      const motionWrapper = container.firstElementChild as HTMLElement;
      fireEvent.mouseMove(motionWrapper, { clientX: 100, clientY: 100 });
      // When inactive on touch device, style is undefined (no transform spring applied)
      expect(motionWrapper.style.transform).toBe("");
    });

    it("disables 3D tilt and specular highlight on touch/coarse devices", () => {
      vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
        matches: query === "(pointer: coarse)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <TiltCard>
          <div>Touch Card</div>
        </TiltCard>,
      );
      const card = container.firstElementChild as HTMLElement;
      fireEvent.mouseMove(card, { clientX: 150, clientY: 150 });
      // No glare highlight child element rendered
      const glare = container.querySelector(".pointer-events-none.absolute.inset-0");
      expect(glare).toBeNull();
    });

    it("disables mouse spotlight tracking on touch/coarse devices", () => {
      vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
        matches: query === "(pointer: coarse)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useSpotlight());
      const mockElement = document.createElement("div");
      result.current.ref.current = mockElement;

      // Simulate mouse move on touch device
      result.current.onMouseMove({
        clientX: 200,
        clientY: 200,
      } as React.MouseEvent<HTMLDivElement>);

      expect(mockElement.style.getPropertyValue("--mx")).toBe("");
      expect(mockElement.style.getPropertyValue("--my")).toBe("");
    });
  });
});
