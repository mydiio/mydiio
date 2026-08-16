const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const port = 4188;
const baseUrl = "http://127.0.0.1:" + port;
const outputDir = "/tmp/mydiio-site-qa";
const candidates = [
  "/",
  "/advertise",
  "/drive",
  "/investors",
  "/about",
  "/contact",
  "/privacy",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const server = spawn(
  "npm",
  ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)],
  { stdio: "ignore" },
);

function stop() {
  server.kill("SIGTERM");
}

process.on("exit", stop);
process.on("SIGINT", () => process.exit(1));
process.on("SIGTERM", () => process.exit(1));

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Development server did not start.");
}

function cleanPath(urlPath) {
  return urlPath === "/" ? "home" : urlPath.replaceAll("/", "-").replace(/^-/, "");
}

(async () => {
  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const discovered = new Set(candidates);
  const discoveryPage = await browser.newPage();

  await discoveryPage.goto(baseUrl, { waitUntil: "networkidle" });

  const links = await discoveryPage.locator("a[href]").evaluateAll((anchors) =>
    anchors
      .map((anchor) => anchor.getAttribute("href"))
      .filter((href) => href && href.startsWith("/") && !href.startsWith("//")),
  );

  links.forEach((href) => {
    const pathname = href.split("#")[0].split("?")[0];
    if (pathname && pathname !== "/") discovered.add(pathname);
  });

  await discoveryPage.close();

  const report = {
    generatedAt: new Date().toISOString(),
    routes: [...discovered].sort(),
    homepageReference: {},
    results: [],
    failures: [],
  };

  for (const viewport of viewports) {
    for (const route of report.routes) {
      const page = await browser.newPage({ viewport });

      try {
        await page.goto(baseUrl + route, { waitUntil: "networkidle" });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });

        const audit = await page.evaluate(() => {
          const visible = (element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              Number(style.opacity) > 0 &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading']")]
            .filter(visible)
            .map((element) => {
              const style = window.getComputedStyle(element);
              const rect = element.getBoundingClientRect();

              return {
                level: element.tagName.toLowerCase(),
                text: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120),
                fontFamily: style.fontFamily,
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                lineHeight: style.lineHeight,
                letterSpacing: style.letterSpacing,
                top: Math.round(rect.top),
                height: Math.round(rect.height),
              };
            });

          const clipped = [...document.querySelectorAll("main *")]
            .filter(visible)
            .filter((element) => {
              const style = window.getComputedStyle(element);
              const rect = element.getBoundingClientRect();

              if (!["hidden", "clip"].includes(style.overflowY)) return false;
              return element.scrollHeight > element.clientHeight + 2 && rect.height > 30;
            })
            .map((element) => ({
              tag: element.tagName.toLowerCase(),
              className: element.className || "",
              scrollHeight: element.scrollHeight,
              clientHeight: element.clientHeight,
            }))
            .slice(0, 20);

          return {
            title: document.title,
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
            horizontalOverflow: Math.max(
              0,
              document.documentElement.scrollWidth - window.innerWidth,
            ),
            headings,
            clipped,
          };
        });

        const filename = cleanPath(route) + "-" + viewport.name + ".png";

        await page.screenshot({
          path: path.join(outputDir, filename),
          fullPage: true,
        });

        report.results.push({
          route,
          viewport: viewport.name,
          screenshot: filename,
          ...audit,
        });

        if (audit.horizontalOverflow > 1 || audit.clipped.length > 0) {
          report.failures.push({
            route,
            viewport: viewport.name,
            horizontalOverflow: audit.horizontalOverflow,
            clipped: audit.clipped,
          });
        }

        if (route === "/" && viewport.name === "desktop") {
          report.homepageReference = {
            h1: audit.headings.find((heading) => heading.level === "h1") || null,
            h2: audit.headings.find((heading) => heading.level === "h2") || null,
            fontFamilies: [...new Set(audit.headings.map((heading) => heading.fontFamily))],
          };
        }
      } catch (error) {
        report.failures.push({
          route,
          viewport: viewport.name,
          error: error.message,
        });
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(outputDir, "report.json"),
    JSON.stringify(report, null, 2),
  );

  console.log("QA complete.");
  console.log("Screenshots: " + outputDir);
  console.log("Report: " + path.join(outputDir, "report.json"));
  console.log("Failures: " + report.failures.length);

  for (const failure of report.failures) {
    console.log(JSON.stringify(failure));
  }
})();