const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const baseUrl = process.env.V2_URL || "http://localhost:5173/v2";
const outputRoot = path.resolve(process.env.HOMEPAGE_REVIEW_OUT || "diagnostics/homepage-review");

const viewports = {
  desktop: { width: 1440, height: 1000 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 1024, height: 1366 },
  mobile: { width: 390, height: 844 },
};

const acts = [
  {
    name: "act-one",
    checkpoints: [0, 0.18, 0.42, 0.68, 0.9, 1],
  },
  {
    name: "act-two",
    checkpoints: [0, 0.22, 0.5, 0.78, 1],
  },
  {
    name: "node-reveal",
    checkpoints: [0, 0.16, 0.36, 0.58, 0.8, 1],
  },
  {
    name: "journey",
    checkpoints: [0, 0.16, 0.34, 0.52, 0.7, 0.86, 1],
  },
  {
    name: "funding",
    checkpoints: [0, 0.35, 0.7, 1],
  },
  {
    name: "platform",
    checkpoints: [0, 0.14, 0.3, 0.52, 0.72, 0.86, 0.97],
  },
  {
    name: "network",
    checkpoints: [0, 0.18, 0.42, 0.68, 0.84, 0.95],
  },
  {
    name: "coverage",
    checkpoints: [0, 0.18, 0.4, 0.64, 0.86, 0.96],
  },
  {
    name: "packages",
    checkpoints: [0, 0.12, 0.28, 0.42, 0.56, 0.7, 0.82, 0.92, 0.98],
  },
  {
    name: "pioneer",
    checkpoints: [0, 0.18, 0.42, 0.68, 0.84, 0.96],
  },
  {
    name: "closing",
    checkpoints: [0, 0.18, 0.4, 0.6, 0.78, 0.94],
  },
];

function round(value) {
  return typeof value === "number" ? Math.round(value * 100) / 100 : value;
}

function safeName(value) {
  return value.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
}

async function readState(page, actName) {
  return page.evaluate((name) => {
    const round = (value) => (typeof value === "number" ? Math.round(value * 100) / 100 : value);

    const root = document.querySelector(`[data-v2-act="${name}"]`);

    if (!root) {
      return {
        missing: true,
        act: name,
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const rootRect = root.getBoundingClientRect();

    const visibleElements = [...root.querySelectorAll("*")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        const opacity = Number(style.opacity);

        const visible =
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          opacity > 0.05;

        if (!visible) {
          return null;
        }

        const text = element.textContent?.replace(/\s+/g, " ").trim().slice(0, 120);

        return {
          tagName: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          text,
          x: round(rect.x),
          y: round(rect.y),
          width: round(rect.width),
          height: round(rect.height),
          right: round(rect.right),
          bottom: round(rect.bottom),
          opacity: round(opacity),
          overflowX: rect.left < -1 || rect.right > viewportWidth + 1,
          overflowY: rect.top < -1 || rect.bottom > viewportHeight + 1,
        };
      })
      .filter(Boolean);

    const textElements = visibleElements.filter(
      (element) => element.text && ["h1", "h2", "h3", "p", "a", "button"].includes(element.tagName),
    );

    const clippedText = textElements.filter((element) => element.overflowX);

    return {
      missing: false,
      act: name,
      root: {
        x: round(rootRect.x),
        y: round(rootRect.y),
        width: round(rootRect.width),
        height: round(rootRect.height),
      },
      document: {
        scrollY: round(window.scrollY),
        scrollHeight: document.documentElement.scrollHeight,
        viewportWidth,
        viewportHeight,
      },
      counts: {
        visibleElements: visibleElements.length,
        visibleTextElements: textElements.length,
        clippedTextElements: clippedText.length,
      },
      clippedText,
    };
  }, actName);
}

async function runViewport(browser, viewportName, viewport) {
  const outDir = path.join(outputRoot, viewportName);

  fs.mkdirSync(outDir, { recursive: true });

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });

  const page = await context.newPage();

  const browserErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push({
        type: "console",
        text: message.text(),
      });
    }
  });

  page.on("pageerror", (error) => {
    browserErrors.push({
      type: "pageerror",
      text: error.message,
    });
  });

  await page.goto(baseUrl, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });

  const report = {
    baseUrl,
    viewportName,
    viewport,
    browserErrors,
    acts: [],
  };

  for (const act of acts) {
    const locator = page.locator(`[data-v2-act="${act.name}"]`);

    if ((await locator.count()) !== 1) {
      report.acts.push({
        name: act.name,
        error: `Expected exactly one act root, found ${await locator.count()}`,
        checkpoints: [],
      });

      continue;
    }

    const absoluteTop = await locator.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    const height = await locator.evaluate((element) => element.offsetHeight);

    const scrollDistance = Math.max(0, height - viewport.height);

    const actReport = {
      name: act.name,
      absoluteTop: round(absoluteTop),
      height,
      scrollDistance,
      checkpoints: [],
    };

    for (let index = 0; index < act.checkpoints.length; index += 1) {
      const progress = act.checkpoints[index];

      const targetY = absoluteTop + progress * scrollDistance;

      await page.evaluate((scrollY) => {
        window.scrollTo({
          top: scrollY,
          behavior: "instant",
        });
      }, targetY);

      await page.waitForTimeout(180);

      const state = await readState(page, act.name);

      const filename = `${String(index).padStart(2, "0")}-${safeName(act.name)}-${Math.round(
        progress * 100,
      )
        .toString()
        .padStart(3, "0")}.png`;

      const screenshotPath = path.join(outDir, filename);

      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
      });

      actReport.checkpoints.push({
        index,
        progress,
        targetY: round(targetY),
        screenshot: screenshotPath,
        state,
      });

      console.log(
        `${viewportName.padEnd(7)} ${act.name.padEnd(12)} ${String(
          Math.round(progress * 100),
        ).padStart(3, " ")}%`,
      );
    }

    report.acts.push(actReport);
  }

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));

  await context.close();

  return report;
}

(async () => {
  fs.mkdirSync(outputRoot, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
  });

  const reports = [];

  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const report = await runViewport(browser, viewportName, viewport);

    reports.push(report);
  }

  await browser.close();

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    outputRoot,
    reports: reports.map((report) => ({
      viewportName: report.viewportName,
      viewport: report.viewport,
      browserErrors: report.browserErrors,
      acts: report.acts.map((act) => ({
        name: act.name,
        error: act.error || null,
        height: act.height || null,
        scrollDistance: act.scrollDistance || null,
        checkpoints:
          act.checkpoints?.map((checkpoint) => ({
            progress: checkpoint.progress,
            screenshot: checkpoint.screenshot,
            clippedTextElements: checkpoint.state?.counts?.clippedTextElements ?? null,
          })) || [],
      })),
    })),
  };

  fs.writeFileSync(path.join(outputRoot, "summary.json"), JSON.stringify(summary, null, 2));

  console.log("");
  console.log("Created homepage review:");
  console.log(outputRoot);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
