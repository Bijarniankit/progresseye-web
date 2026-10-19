import zlib from "node:zlib";
import { chromium } from "@playwright/test";

async function analyzeChunks(baseUrl, label) {
  console.log(`\n======================================================`);
  console.log(` ANALYZING CHUNKS REQUESTED AT SCROLL 0 ON "${label}"`);
  console.log(` URL: ${baseUrl}/`);
  console.log(`======================================================`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const chunks = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes(".js")) {
      const filename = url.split("/").pop().split("?")[0];
      let body;
      try {
        body = await res.body();
      } catch {
        body = Buffer.alloc(0);
      }
      const raw = body.length;
      const gzip = zlib.gzipSync(body).length;
      const text = body.toString("utf8");

      // More precise content identification
      const contents = [];
      if (
        text.includes("react-dom") ||
        text.includes("React 19") ||
        text.includes("useActionState") ||
        text.includes("createRoot")
      )
        contents.push("React 19 / DOM");
      if (
        text.includes("next/dist/client") ||
        text.includes("turbopack") ||
        text.includes("AppRouter")
      )
        contents.push("Next.js Client Runtime");
      if (
        text.includes("next-intl") ||
        text.includes("IntlProvider") ||
        text.includes("useTranslations") ||
        text.includes("getLocale")
      )
        contents.push("next-intl");
      if (
        text.includes("lucide-react") ||
        text.includes("createLucideIcon") ||
        text.includes("lucide")
      )
        contents.push("lucide icons");
      if (text.includes("@tanstack/react-query") || text.includes("QueryClient"))
        contents.push("TanStack React Query");
      if (text.includes("next-themes") || text.includes("ThemeProvider"))
        contents.push("next-themes");
      if (
        text.includes("SchoolScene") ||
        text.includes("FeaturesScene") ||
        text.includes("HeroCarousel") ||
        text.includes("hero-plate")
      )
        contents.push("Hero Section");
      if (
        text.includes("ProductTour") ||
        text.includes("tour-island") ||
        text.includes("tourTabs") ||
        text.includes("tour-")
      )
        contents.push("Product Tour");
      if (text.includes("bentoCards") || text.includes("BentoGrid")) contents.push("Bento Grid");
      if (
        text.includes("pricingTiers") ||
        text.includes("PricingCard") ||
        text.includes("Save 17%")
      )
        contents.push("Pricing Section");
      if (text.includes("landingFaqs") || text.includes("FaqSection")) contents.push("FAQ Section");
      if (
        text.includes("LazyMotion") ||
        text.includes("AnimatePresence") ||
        text.includes("m.div") ||
        text.includes("framer-motion")
      )
        contents.push("motion/react runtime");

      let desc = contents.length > 0 ? contents.join(" + ") : "Application chunk";
      if (filename.startsWith("turbopack-")) desc = "Turbopack Runtime";

      chunks.push({
        name: filename,
        raw,
        gzip,
        contents: desc,
      });
    }
  });

  await page.goto(`${baseUrl}/`);
  await page.waitForLoadState("networkidle");
  await browser.close();

  let totalRaw = 0;
  let totalGzip = 0;
  console.log("| Chunk Name | Raw Size | Gzip Size | What It Contains |");
  console.log("| :--- | :--- | :--- | :--- |");
  for (const c of chunks) {
    totalRaw += c.raw;
    totalGzip += c.gzip;
    console.log(
      `| \`${c.name}\` | ${(c.raw / 1024).toFixed(1)} kB (${c.raw.toLocaleString()} B) | ${(c.gzip / 1024).toFixed(1)} kB (${c.gzip.toLocaleString()} B) | ${c.contents} |`,
    );
  }
  console.log(
    `| **Total (${chunks.length} chunks)** | **${(totalRaw / 1024).toFixed(1)} kB (${totalRaw.toLocaleString()} B)** | **${(totalGzip / 1024).toFixed(1)} kB (${totalGzip.toLocaleString()} B)** | **All initial JS** |`,
  );

  return { chunks, totalRaw, totalGzip };
}

(async () => {
  await analyzeChunks("http://localhost:3000", "Phase 6 PR Head (PR #23)");
})();
