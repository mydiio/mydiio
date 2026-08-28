const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const port = 4192;
const baseUrl = process.env.QA_URL || `http://127.0.0.1:${port}`;
const outputDir = "/tmp/mydiio-motion-parity";
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
      const context = await browser.newContext({
        viewport,
        reducedMotion: "no-preference",
      });

      const page = await context.newPage();
      console.log(`[motion] ${viewport.name} ${route}`);

      await page.goto(baseUrl + route, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });

      const sections = await page.evaluate(() => {
        const items = [...document.querySelectorAll("main > section, main [data-v2-act]")];

        return [...new Set(items)]
          .map((element, index) => {
            const rect = element.getBoundingClientRect();

            return {
              index,
              top: Math.round(rect.top + window.scrollY),
              height: Math.round(rect.height),
              label: element.getAttribute("data-v2-act") || element.className || "section-" + index,
            };
          })
          .filter((item) => item.height > 180);
      });

      for (const section of sections) {
        const maxScroll = await page.evaluate(() =>
          Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
        );

        const travel = Math.max(0, section.height - viewport.height);
        const positions = [
          Math.max(0, section.top - viewport.height * 0.1),
          Math.min(maxScroll, section.top + travel * 0.5),
          Math.min(maxScroll, section.top + travel),
        ];

        for (const [state, scrollY] of ["start", "middle", "end"].map((state, index) => [
          state,
          positions[index],
        ])) {
          await page.evaluate((value) => window.scrollTo(0, value), scrollY);
          await page.waitForTimeout(350);

          const snapshot = await page.evaluate(() => {
            const running = document
              .getAnimations()
              .filter((animation) => animation.playState === "running").length;

            return {
              horizontalOverflow: Math.max(
                0,
                document.documentElement.scrollWidth - window.innerWidth,
              ),
              runningAnimations: running,
              visibleHeadings: [...document.querySelectorAll("h1, h2, h3")]
                .filter((element) => {
                  const rect = element.getBoundingClientRect();
                  const style = getComputedStyle(element);

                  return (
                    rect.bottom > 0 &&
                    rect.top < window.innerHeight &&
                    style.visibility !== "hidden" &&
                    style.opacity !== "0"
                  );
                })
                .map((element) => (element.textContent || "").replace(/\s+/g, " ").trim())
                .filter(Boolean),
            };
          });

          const file =
            routeName(route) +
            "-" +
            viewport.name +
            "-" +
            String(section.index).padStart(2, "0") +
            "-" +
            state +
            ".png";

          await page.screenshot({ path: path.join(outputDir, file) });

          report.push({
            route,
            viewport: viewport.name,
            section: section.label,
            state,
            screenshot: file,
            ...snapshot,
          });
        }
      }

      await context.close();
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2));

  const failures = report.filter(
    (item) =>
      item.horizontalOverflow > 1 || (item.state === "middle" && item.visibleHeadings.length === 0),
  );

  console.log("Motion parity QA complete.");
  console.log("Screenshots: " + outputDir);
  console.log("Captured states: " + report.length);
  console.log("Potential failures: " + failures.length);

  failures.forEach((failure) => console.log(JSON.stringify(failure)));

  if (failures.length > 0) {
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
