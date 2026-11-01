import { chromium } from "@playwright/test";

async function main() {
  console.log("========================================================");
  console.log("   ProgressEye Compose Lead-Flow Integration Test       ");
  console.log("========================================================");
  const testEmail = `ramanathan.${Date.now()}@cityschool.edu.in`;
  console.log(`[1/4] Launching headless browser to test lead submission (${testEmail})...`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("[2/4] Navigating to http://localhost:3000/contact...");
    await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle", timeout: 30000 });

    console.log("Filling contact inquiry form fields...");
    await page.fill("#contact-name", "Principal Ramanathan");
    await page.fill("#contact-email", testEmail);
    await page.fill("#contact-school", "City Senior Secondary School");
    await page.selectOption("#contact-topic", "onboarding");
    await page.fill(
      "#contact-message",
      "End-to-end integration test verifying browser -> web -> API rewrite -> PostgreSQL -> BullMQ -> Mailpit.",
    );

    console.log("Submitting contact inquiry form through web origin (http://localhost:3000)...");
    await page.click("button[type='submit']");

    console.log("Waiting for contact receipt confirmation element in browser DOM...");
    const receipt = page.locator('[data-testid="contact-receipt"]');
    await receipt.waitFor({ state: "visible", timeout: 20000 });
    const receiptText = await receipt.innerText();
    console.log(
      "[SUCCESS] Contact receipt displayed in browser UI:",
      receiptText.replace(/\s+/g, " "),
    );

    await browser.close();

    console.log(
      "[3/4] Polling Mailpit (http://localhost:8025/api/v1/messages) for notification delivery...",
    );
    let mailFound = false;
    let attempts = 0;
    let matchedMessage = null;

    while (!mailFound && attempts < 25) {
      attempts++;
      try {
        const res = await fetch("http://localhost:8025/api/v1/messages");
        if (res.ok) {
          const data = await res.json();
          const messages = data.messages || [];
          matchedMessage = messages.find(
            (m) =>
              m.Snippet?.includes(testEmail) ||
              m.Subject?.includes("Lead") ||
              m.Subject?.includes("Inquiry") ||
              m.To?.some((t) => t.Address?.includes("leads") || t.Address?.includes("example.com")),
          );
          if (matchedMessage) {
            mailFound = true;
            break;
          }
        }
      } catch {
        // Network polling retry
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (!mailFound) {
      throw new Error(
        `Mailpit did not receive expected notification email within 25s (test email: ${testEmail})`,
      );
    }

    console.log(
      `[SUCCESS] Mailpit notification verified: Subject="${matchedMessage.Subject}", MessageID=${matchedMessage.ID}`,
    );
    console.log("========================================================");
    console.log("   Lead-Flow End-to-End Verification Complete!          ");
    console.log("========================================================");
    process.exit(0);
  } catch (error) {
    console.error("[ERROR] Lead-flow integration test failed:", error);
    await browser.close().catch(() => {});
    process.exit(1);
  }
}

main();
