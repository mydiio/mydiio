const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const baseUrl = process.env.V2_URL || "http://localhost:5173/v2";
const outDir = path.resolve("diagnostics/homepage-visual/act-four");

const checkpoints = [
  { name: "00-entry", progress: 0.0 },
  { name: "01-copy", progress: 0.14 },
  { name: "02-centre", progress: 0.3 },
  { name: "03-relationships", progress: 0.52 },
  { name: "04-flow", progress: 0.72 },
  { name: "05-conclusion", progress: 0.86 },
  { name: "06-handoff", progress: 0.97 },
];

function round(value) {
  return typeof value === "number" ? Math.round(value * 100) / 100 : value;
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      console.error("BROWSER_CONSOLE_ERROR:", message.text());
    }
  });

  await page.goto(baseUrl, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  const act = page
    .locator("section")
    .filter({
      has: page.getByText("The Operating System", { exact: true }),
    })
    .first();

  if ((await act.count()) === 0) {
    throw new Error("Act Four section could not be located.");
  }

  const actBox = await act.boundingBox();

  if (!actBox) {
    throw new Error("Act Four has no measurable bounding box.");
  }

  const viewportHeight = await page.evaluate(() => window.innerHeight);
  const actHeight = await act.evaluate((element) => element.offsetHeight);
  const scrollDistance = actHeight - viewportHeight;

  const report = {
    viewport: { width: 1440, height: viewportHeight },
    act: {
      top: round(actBox.y),
      height: actHeight,
      scrollDistance,
    },
    checkpoints: [],
  };

  for (const checkpoint of checkpoints) {
    const targetY = actBox.y + checkpoint.progress * scrollDistance;

    await page.evaluate((scrollY) => {
      window.scrollTo({
        top: scrollY,
        behavior: "instant",
      });
    }, targetY);

    await page.waitForTimeout(180);

    const state = await page.evaluate(() => {
      const round = (value) => (typeof value === "number" ? Math.round(value * 100) / 100 : value);

      const byText = (text) =>
        [...document.querySelectorAll("*")].find((element) => element.textContent?.trim() === text);

      const heading = byText("One system keeps the whole network moving.");
      const centre = byText("mydiio")?.closest(".atlas-os-centre");
      const conclusion = byText("Different products. One connected system.");
      const labels = [...document.querySelectorAll(".atlas-os-relationship")];
      const diagram = document.querySelector(".atlas-os-diagram");

      const read = (element) => {
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        return {
          x: round(rect.x),
          y: round(rect.y),
          width: round(rect.width),
          height: round(rect.height),
          right: round(rect.right),
          bottom: round(rect.bottom),
          opacity: round(Number(style.opacity)),
          transform: style.transform,
          visibility: style.visibility,
        };
      };

      const labelStates = labels.map((element) => ({
        text: element.textContent?.replace(/\s+/g, " ").trim(),
        ...read(element),
      }));

      const overlaps = [];

      for (let i = 0; i < labelStates.length; i += 1) {
        for (let j = i + 1; j < labelStates.length; j += 1) {
          const a = labelStates[i];
          const b = labelStates[j];

          if (!a || !b) continue;

          const xOverlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));

          const yOverlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));

          if (xOverlap > 0 && yOverlap > 0) {
            overlaps.push({
              first: a.text,
              second: b.text,
              width: round(xOverlap),
              height: round(yOverlap),
            });
          }
        }
      }

      return {
        scrollY: round(window.scrollY),
        heading: read(heading),
        centre: read(centre),
        conclusion: read(conclusion),
        diagram: read(diagram),
        labels: labelStates,
        overlaps,
      };
    });

    const screenshot = path.join(outDir, `${checkpoint.name}.png`);

    await page.screenshot({
      path: screenshot,
      fullPage: false,
    });

    report.checkpoints.push({
      ...checkpoint,
      screenshot,
      state,
    });

    console.log(`${checkpoint.name}: progress=${checkpoint.progress} scrollY=${state.scrollY}`);
  }

  fs.writeFileSync(path.join(outDir, "act-four-report.json"), JSON.stringify(report, null, 2));

  await browser.close();

  console.log("");
  console.log("Created:");
  console.log(path.join(outDir, "act-four-report.json"));
  console.log(path.join(outDir, "*.png"));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
