// scripts/visual/visual-qa.cjs
// Visual QA harness for the Atlas V2 stack. Captures screenshots of every
// page at desktop, laptop, tablet and mobile breakpoints. Reports on
// console errors, failed requests, and obvious layout overflow.

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.QA_URL || "http://127.0.0.1:4173";
const OUT_ROOT = path.resolve(
  process.env.QA_OUT || "diagnostics/visual-qa"
);

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dpr: 1 },
  { name: "laptop", width: 1366, height: 768, dpr: 1 },
  { name: "tablet", width: 1024, height: 1366, dpr: 1 },
  { name: "mobile", width: 390, height: 844, dpr: 2 },
];

const PAGES = [
  { slug: "home", path: "/" },
  { slug: "advertise", path: "/advertise" },
  { slug: "drive", path: "/drive" },
  { slug: "contact", path: "/contact" },
  { slug: "about", path: "/about" },
  { slug: "launch", path: "/advertise/apply" },
  { slug: "atlas-landing", path: "/v2" },
];

function safeFileName(s) {
  return s.replace(/[^a-z0-9_-]+/gi, "_");
}

async function inspectPage(page, slug, path) {
  const issues = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (!/favicon|404|preload|warn/i.test(text)) {
        issues.push({ kind: "console", text });
      }
    }
  });
  page.on("requestfailed", (req) => {
    issues.push({
      kind: "request",
      url: req.url(),
      failure: req.failure()?.errorText || "unknown",
    });
  });
  page.on("response", (res) => {
    if (res.status() >= 500) {
      issues.push({
        kind: "response",
        url: res.url(),
        status: res.status(),
      });
    }
  });

  const url = `${BASE}${path}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  // Let any GSAP/ScrollTrigger reveal animations settle
  await page.waitForTimeout(900);
  // Force reduced-motion off so we capture the same animations users see
  await page.emulateMedia({ reducedMotion: "no-preference" });
  // Full page height for the full-page screenshot
  const fullHeight = await page.evaluate(() =>
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    )
  );

  return { issues, fullHeight, url };
}

async function main() {
  const t0 = Date.now();
  console.log(`Visual QA — base ${BASE}`);
  fs.mkdirSync(OUT_ROOT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const report = {
    base: BASE,
    startedAt: new Date(t0).toISOString(),
    pages: {},
  };

  for (const p of PAGES) {
    console.log(`→ ${p.slug}  (${p.path})`);
    report.pages[p.slug] = { path: p.path, viewports: {} };

    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.dpr,
        reducedMotion: "no-preference",
        bypassCSP: true,
      });
      const page = await ctx.newPage();
      const issues = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();
          if (!/favicon|404|preload|warn|\bpreload\b/i.test(text)) {
            issues.push({ kind: "console", text });
          }
        }
      });
      page.on("response", (res) => {
        if (res.status() >= 500) {
          issues.push({ kind: "response", url: res.url(), status: res.status() });
        }
      });

      try {
        const url = `${BASE}${p.path}`;
        const resp = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
        const httpStatus = resp?.status() ?? 0;
        // Scroll through the entire page to trigger every GSAP ScrollTrigger,
        // then jump back to the top and let the reveals settle. Without this,
        // screenshots taken above-the-fold leave every subsequent reveal at
        // opacity 0 because GSAP keeps elements hidden until they enter view.
        await page.evaluate(async () => {
          const total = document.documentElement.scrollHeight;
          for (let y = 0; y <= total; y += 600) {
            window.scrollTo({ top: y, behavior: "instant" });
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo({ top: 0, behavior: "instant" });
        });
        await page.waitForTimeout(1800);

        // Full-page screenshot
        const dir = path.join(OUT_ROOT, p.slug);
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, `${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: true });

        // Above-the-fold viewport screenshot
        const foldFile = path.join(dir, `${vp.name}-fold.png`);
        await page.screenshot({ path: foldFile, fullPage: false });

        // Compute layout signals
        const signals = await page.evaluate(() => {
          const html = document.documentElement;
          const body = document.body;
          const docW = html.scrollWidth;
          const viewW = window.innerWidth;
          const docH = Math.max(html.scrollHeight, body.scrollHeight);
          const viewH = window.innerHeight;
          // Detect any element wider than the viewport (excluding 100vw-on-purpose)
          const overflowing = [];
          document.querySelectorAll("*").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width > viewW + 1.5) {
              const tag = el.tagName.toLowerCase();
              const cls = (el.className || "").toString();
              if (!/(reveal|atlas|canvas|animate|grid|grid-)/i.test(cls)) {
                overflowing.push({
                  tag,
                  cls: cls.slice(0, 80),
                  width: Math.round(r.width),
                });
              }
            }
          });
          // Find the section closest to "hero" so we know what shows above the fold
          const sections = Array.from(
            document.querySelectorAll("section, [data-v2-act]")
          ).slice(0, 12).map((el) => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName.toLowerCase(),
              cls: (el.className || "").toString().slice(0, 60),
              top: Math.round(r.top + window.scrollY),
              height: Math.round(r.height),
            };
          });
          return {
            docW,
            viewW,
            docH,
            viewH,
            horizontalOverflow: docW > viewW + 1.5 ? docW - viewW : 0,
            overflowing: overflowing.slice(0, 8),
            sections,
            title: document.title,
            h1: document.querySelector("h1")?.innerText?.slice(0, 80) || null,
          };
        });

        report.pages[p.slug].viewports[vp.name] = {
          width: vp.width,
          height: vp.height,
          dpr: vp.dpr,
          file: path.relative(process.cwd(), file),
          foldFile: path.relative(process.cwd(), foldFile),
          httpStatus,
          title: signals.title,
          h1: signals.h1,
          docH: signals.docH,
          horizontalOverflow: signals.horizontalOverflow,
          overflowing: signals.overflowing,
          sections: signals.sections,
          consoleIssues: issues,
        };
      } catch (err) {
        report.pages[p.slug].viewports[vp.name] = {
          error: String(err && err.message ? err.message : err),
        };
      } finally {
        await ctx.close();
      }
    }
  }

  await browser.close();
  report.finishedAt = new Date().toISOString();
  report.durationMs = Date.now() - t0;

  fs.writeFileSync(
    path.join(OUT_ROOT, "report.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(`\nDone in ${(report.durationMs / 1000).toFixed(1)}s`);
  console.log(`Report: ${path.join(OUT_ROOT, "report.json")}`);

  // Human-readable summary
  let totalIssues = 0;
  let totalOverflow = 0;
  for (const slug of Object.keys(report.pages)) {
    const vps = report.pages[slug].viewports;
    for (const vp of Object.keys(vps)) {
      const r = vps[vp];
      if (r.consoleIssues && r.consoleIssues.length) {
        totalIssues += r.consoleIssues.length;
      }
      if (r.horizontalOverflow && r.horizontalOverflow > 0) {
        totalOverflow += 1;
      }
    }
  }
  console.log(`Console issues: ${totalIssues}`);
  console.log(`Pages with horizontal overflow: ${totalOverflow}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
