// scripts/visual/build-contact-sheet.cjs
// Tile the per-page desktop screenshots into a single contact sheet.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(process.env.QA_OUT || "diagnostics/visual-qa");
const REPORT = path.join(ROOT, "report.json");
const OUT = path.join(ROOT, "contact-sheet.png");

if (!fs.existsSync(REPORT)) {
  console.error(`No report at ${REPORT}. Run visual-qa.cjs first.`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT, "utf8"));
const pages = Object.keys(report.pages);

(async () => {
  const TILE_W = 480;
  const TILE_H = 1152; // cap each thumbnail at 2.4 ratio so the sheet stays short
  const cols = 3;
  const labelH = 56;
  const gap = 24;
  const titleH = 96;

  // Build the title strip as a PNG first so its dimensions are explicit
  const rowsCount = Math.ceil(pages.length / cols);
  const canvasW = cols * TILE_W + (cols + 1) * gap;
  const canvasH = titleH + gap + rowsCount * (labelH + TILE_H) + (rowsCount + 1) * gap;

  const headerSvg = Buffer.from(
    `<svg width="${canvasW}" height="${titleH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fdfaf3"/>
      <text x="${gap}" y="40" font-family="Space Grotesk, system-ui, sans-serif" font-size="28" font-weight="700" fill="#1a1a18">Atlas V2 — Visual QA contact sheet</text>
      <text x="${gap}" y="72" font-family="Space Mono, monospace" font-size="13" fill="rgba(26,26,24,0.6)">${pages.length} pages  ·  ${Object.keys(report.pages[pages[0]].viewports).length} viewports  ·  ${report.base}</text>
    </svg>`
  );
  const headerBuf = await sharp(headerSvg, { density: 144 })
    .resize({ width: canvasW, height: titleH })
    .png()
    .toBuffer();

  // Build the title label strip for each tile (same canvas width)
  const labels = [];
  for (let i = 0; i < pages.length; i += 1) {
    const slug = pages[i];
    const title = (report.pages[slug].viewports.desktop.title || slug).slice(0, 70);
    const labelSvg = Buffer.from(
      `<svg width="${TILE_W}" height="${labelH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="rgba(253,250,243,0)"/>
        <text x="0" y="22" font-family="Space Mono, monospace" font-size="12" fill="rgba(232,146,10,0.9)">/${slug}</text>
        <text x="0" y="42" font-family="Space Grotesk, system-ui, sans-serif" font-size="14" font-weight="600" fill="#1a1a18">${escape(title)}</text>
      </svg>`
    );
    const buf = await sharp(labelSvg, { density: 144 })
      .resize({ width: TILE_W, height: labelH })
      .png()
      .toBuffer();
    labels.push(buf);
  }

  // Build each thumbnail, capped to TILE_W × TILE_H using fit:cover so every
  // cell is the same size regardless of how long the page actually is.
  const tiles = [];
  for (const slug of pages) {
    const file = path.resolve(process.cwd(), report.pages[slug].viewports.desktop.file);
    const buf = await sharp(file)
      .resize({ width: TILE_W, height: TILE_H, fit: "cover", position: "top" })
      .png()
      .toBuffer();
    tiles.push(buf);
  }

  // Compose: header on top, then for each tile its label then its image
  const composites = [
    { input: headerBuf, top: 0, left: 0 },
  ];
  for (let i = 0; i < pages.length; i += 1) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = gap + col * (TILE_W + gap);
    const yLabel = titleH + gap + row * (labelH + TILE_H) + gap;
    const yImage = yLabel + labelH;
    composites.push({ input: labels[i], top: yLabel, left: x });
    composites.push({ input: tiles[i], top: yImage, left: x });
  }

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 253, g: 250, b: 243, alpha: 1 },
    },
  })
    .composite(composites)
    .png({ compressionLevel: 8 })
    .toFile(OUT);

  console.log(`Contact sheet: ${OUT}  (${canvasW}x${canvasH})`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

function escape(s) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}
