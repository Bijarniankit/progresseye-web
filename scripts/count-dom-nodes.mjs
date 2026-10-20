import { chromium } from "@playwright/test";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  const getStats = async () => {
    const total = await page.evaluate(() => document.querySelectorAll("*").length);
    const heroScene = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="hero-active-scene"]');
      return el ? el.querySelectorAll("*").length : 0;
    });
    const scene0 = await page.evaluate(() => {
      const el = document.querySelector('[data-scene-index="0"]');
      return el ? el.querySelectorAll("*").length : 0;
    });
    const scene1 = await page.evaluate(() => {
      const el = document.querySelector('[data-scene-index="1"]');
      return el ? el.querySelectorAll("*").length : 0;
    });
    const scene2 = await page.evaluate(() => {
      const el = document.querySelector('[data-scene-index="2"]');
      return el ? el.querySelectorAll("*").length : 0;
    });
    return { total, heroScene, scene0, scene1, scene2 };
  };

  const initial = await getStats();
  console.log("--- At Initial Load (Before Idle) ---");
  console.log("Total DOM nodes:", initial.total);
  console.log("Hero active scene nodes:", initial.heroScene);
  console.log("  Scene 0 nodes:", initial.scene0);
  console.log("  Scene 1 nodes:", initial.scene1);
  console.log("  Scene 2 nodes:", initial.scene2);

  await page.waitForTimeout(3500);

  const afterIdle = await getStats();
  console.log("\n--- After Idle / Rotation ---");
  console.log("Total DOM nodes:", afterIdle.total);
  console.log("Hero active scene nodes:", afterIdle.heroScene);
  console.log("  Scene 0 nodes:", afterIdle.scene0);
  console.log("  Scene 1 nodes:", afterIdle.scene1);
  console.log("  Scene 2 nodes:", afterIdle.scene2);

  await browser.close();
}

main().catch(console.error);
