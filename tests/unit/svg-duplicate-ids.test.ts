import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Vector Illustrations — Unique SVG Gradient and Filter IDs", () => {
  it("ensures zero duplicate IDs across all illustration scenes", () => {
    const dir = path.resolve(__dirname, "../../src/components/illustrations");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx") && f !== "index.ts");

    const idToFile = new Map<string, string>();
    const duplicates: { id: string; fileA: string; fileB: string }[] = [];

    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const idMatches = content.matchAll(/\bid=["']([^"']+)["']/g);

      for (const match of idMatches) {
        const id = match[1];
        const prevFile = idToFile.get(id);
        if (prevFile) {
          duplicates.push({
            id,
            fileA: prevFile,
            fileB: file,
          });
        } else {
          idToFile.set(id, file);
        }
      }
    }

    if (duplicates.length > 0) {
      console.error("Duplicate SVG IDs found:", duplicates);
    }

    expect(duplicates).toEqual([]);
    expect(idToFile.size).toBeGreaterThan(0);
  });
});
