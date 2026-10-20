async function run() {
  const res = await fetch("http://localhost:3000");
  const html = await res.text();
  console.log("Total HTML length:", html.length);

  const regex = /self\.__next_f\.push\(\[(\d+),"(.*?)"\]\)/gs;
  let match = regex.exec(html);
  let rsc = "";
  while (match !== null) {
    try {
      rsc += JSON.parse(`"${match[2]}"`);
    } catch {
      rsc += match[2];
    }
    match = regex.exec(html);
  }

  console.log("Total RSC payload length:", rsc.length);
  console.log("RSC contains messages?:", rsc.includes("messages"));
  console.log("RSC contains stubs?:", rsc.includes("stubs"));
  console.log("RSC contains footer?:", rsc.includes("footer"));
  console.log("RSC contains common?:", rsc.includes("common"));
  console.log("RSC contains nav?:", rsc.includes("nav"));
  console.log("RSC contains landing?:", rsc.includes("landing"));

  // Let's see the size of messages in RSC:
  const msgMatch = rsc.match(/"messages":(\{.*?\})/);
  if (msgMatch) {
    console.log("Messages object serialized in RSC length:", msgMatch[1].length);
    console.log("Keys in serialized messages:", Object.keys(JSON.parse(msgMatch[1])));
  } else {
    // Search for where messages is
    const idx = rsc.indexOf("messages");
    if (idx !== -1) {
      console.log('Context around "messages":', rsc.slice(Math.max(0, idx - 100), idx + 300));
    }
  }

  // Also analyze what is inside the rendered body vs RSC
  console.log("\n--- Breakdown of 190kB HTML ---");
  const bodyIdx = html.indexOf("<body");
  const scriptsInBody = html.slice(bodyIdx).match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  const scriptsSize = scriptsInBody.reduce((sum, s) => sum + s.length, 0);
  console.log("Total HTML:", html.length, "bytes");
  console.log("RSC script tags:", scriptsSize, "bytes");
  console.log("Markup (HTML tags, text, SVGs):", html.length - scriptsSize, "bytes");

  // Let's check how much is SVG markup
  const svgs = html.match(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi) || [];
  const svgsSize = svgs.reduce((sum, s) => sum + s.length, 0);
  console.log("Total SVGs in HTML:", svgs.length, "svgs, totaling", svgsSize, "bytes");
  for (let i = 0; i < svgs.length; i++) {
    console.log(`  SVG ${i + 1}: ${svgs[i].length} bytes`);
  }
}

run().catch(console.error);
