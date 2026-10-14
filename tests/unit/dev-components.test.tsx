import { notFound } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DevComponentsPage from "@/app/dev/components/page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
  usePathname: () => "/dev/components",
}));

describe("Dev Components Route Production Guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("calls notFound() in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");
    DevComponentsPage();
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("does not call notFound() in development mode", () => {
    vi.stubEnv("NODE_ENV", "development");
    DevComponentsPage();
    expect(notFound).not.toHaveBeenCalled();
  });
});
