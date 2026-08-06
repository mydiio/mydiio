const { chromium } = require("playwright");

const baseUrl = process.env.V2_URL || "http://localhost:5173/v2";

(async () => {
  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });

  const browserErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    browserErrors.push(error.message);
  });

  await page.goto(baseUrl, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  const sections = await page.evaluate(() => {
    const round = (value) => Math.round(value * 100) / 100;

    return [...document.querySelectorAll("[data-v2-act]")].map((section, index) => {
      const rect = section.getBoundingClientRect();

      const text = section.textContent?.replace(/\s+/g, " ").trim().slice(0, 180);

      return {
        index,
        id: section.id || null,
        className: typeof section.className === "string" ? section.className : null,
        ariaLabel: section.getAttribute("aria-label"),
        dataAttributes: Object.fromEntries(
          [...section.attributes]
            .filter((attribute) => attribute.name.startsWith("data-"))
            .map((attribute) => [attribute.name, attribute.value]),
        ),
        top: round(rect.top + window.scrollY),
        height: round(section.offsetHeight),
        scrollDistance: round(Math.max(0, section.offsetHeight - window.innerHeight)),
        act: section.getAttribute("data-v2-act"),
        tagName: section.tagName.toLowerCase(),
        text,
      };
    });
  });

  console.log(JSON.stringify({ baseUrl, sections, browserErrors }, null, 2));

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
