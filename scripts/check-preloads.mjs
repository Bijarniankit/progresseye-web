async function run() {
  const res = await fetch("http://localhost:3000/");
  const html = await res.text();
  const fontLinks = html.match(/<link[^>]+as="font"[^>]*>/gi) || [];
  console.log(`Preloaded fonts in <head>: ${fontLinks.length}`);
  fontLinks.forEach((l, i) => {
    console.log(`${i + 1}: ${l}`);
  });
}
run();
