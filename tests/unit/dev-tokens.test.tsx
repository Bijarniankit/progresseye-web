import DevTokensPage from "@/app/dev/tokens/page";
import * as navigation from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

vi.mock("@/app/dev/tokens/tokens-showcase", () => ({
  TokensShowcase: () => <div data-testid="tokens-showcase">Showcase</div>,
}));

describe("DevTokensPage production guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("calls notFound() when NODE_ENV is production", () => {
    vi.stubEnv("NODE_ENV", "production");

    DevTokensPage();

    expect(navigation.notFound).toHaveBeenCalledTimes(1);
  });

  it("renders showcase when NODE_ENV is development", () => {
    vi.stubEnv("NODE_ENV", "development");

    const result = DevTokensPage();

    expect(navigation.notFound).not.toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
