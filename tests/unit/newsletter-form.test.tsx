import { Footer } from "@/components/marketing/footer";
import messages from "@messages/en.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

function renderFooter(props?: { hideNewsletter?: boolean }) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Footer {...props} />
    </NextIntlClientProvider>,
  );
}

describe("Footer & Newsletter Form Unit Tests", () => {
  it("renders watermark text 'ProgressEye' in title case with aria-hidden", () => {
    const { container } = renderFooter();
    const watermark = container.querySelector("[aria-hidden='true'].font-display.font-extrabold");
    expect(watermark).toBeInTheDocument();
    expect(watermark?.textContent?.trim()).toBe("ProgressEye");
  });

  it("validates email input and prevents empty submission", () => {
    renderFooter();
    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it("displays informative not-connected state notice on submission (zero fake success)", () => {
    renderFooter();
    const emailInput = screen.getByPlaceholderText(/enter your school email/i);
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: "principal@delhischool.edu.in" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/newsletter subscriptions will open in phase 9/i)).toBeInTheDocument();
  });

  it("hides newsletter form when hideNewsletter is true", () => {
    renderFooter({ hideNewsletter: true });
    expect(screen.queryByPlaceholderText(/enter your school email/i)).not.toBeInTheDocument();
  });
});
