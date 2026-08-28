const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const port = 4190;
const baseUrl = process.env.QA_URL || `http://127.0.0.1:${port}`;
const outputDir = "/tmp/mydiio-scroll-qa";

const routes = ["/", "/advertise", "/drive", "/about"];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

async function waitForServer() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Development server did not start.");
}

function routeName(route) {
  return route === "/" ? "home" : route.slice(1);
}

(async () => {
  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const report = [];

  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport });

      console.log(`[scroll] ${viewport.name} ${route}`);

      await page.goto(baseUrl + route, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      await page.evaluate(async () => {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
      });

      const positions = await page.evaluate(() => {
        const viewportHeight = window.innerHeight;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);

        const sections = [...document.querySelectorAll("main > section, main [data-v2-act]")];

        const points = new Set([0, maxScroll]);

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = Math.max(rect.height, viewportHeight);

          points.add(Math.max(0, top - viewportHeight * 0.12));
          points.add(Math.max(0, top + height * 0.45 - viewportHeight * 0.5));
          points.add(Math.max(0, top + height - viewportHeight * 0.9));
        });

        return [...points]
          .map((value) => Math.min(maxScroll, Math.max(0, value)))
          .sort((a, b) => a - b)
          .filter((value, index, all) => index === 0 || value - all[index - 1] > 120);
      });

      for (let index = 0; index < positions.length; index += 1) {
        const scrollY = positions[index];

        await page.evaluate((value) => window.scrollTo(0, value), scrollY);
        await page.waitForTimeout(350);

        const visibleHeadings = await page.evaluate(() =>
          [...document.querySelectorAll("h1, h2, h3")]
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              const style = getComputedStyle(element);

              return (
                rect.bottom > 0 &&
                rect.top < window.innerHeight &&
                style.opacity !== "0" &&
                style.visibility !== "hidden"
              );
            })
            .map((element) => (element.textContent || "").replace(/\s+/g, " ").trim())
            .filter(Boolean),
        );

        const file =
          routeName(route) + "-" + viewport.name + "-" + String(index).padStart(2, "0") + ".png";

        await page.screenshot({
          path: path.join(outputDir, file),
        });

        report.push({
          route,
          viewport: viewport.name,
          scrollY: Math.round(scrollY),
          screenshot: file,
          visibleHeadings,
        });
      }

      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2));

  console.log("Scroll-state QA complete.");
  console.log("Screenshots: " + outputDir);
  console.log("Report: " + path.join(outputDir, "report.json"));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
