const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({headless: true});
  const PAGES = [
    ['/about', 'about'],
    ['/advertise', 'advertise'],
    ['/drive', 'drive'],
    ['/contact', 'contact'],
    ['/privacy', 'privacy'],
    ['/terms', 'terms'],
  ];
  const out = '/tmp/qa-crops/atlas-footer-sheet.png';
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.setContent(`<html><body style="margin:0;background:#fdfaf3;font-family:system-ui;display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px"></body></html>`);
  for (const [route, name] of PAGES) {
    const p2 = await browser.newContext().then(c => c.newPage());
    await p2.goto(`http://127.0.0.1:4173${route}`, {waitUntil: 'networkidle'});
    await p2.evaluate(() => document.querySelector('footer[data-atlas-footer]').scrollIntoView({block: 'end'}));
    await p2.waitForTimeout(400);
    const card = await p2.locator('footer[data-atlas-footer]').screenshot();
    fs.writeFileSync(path.join('/tmp/qa-crops', `card-${name}.png`), card);
    await p2.close();
  }
  const cards = PAGES.map(([, name]) => path.join('/tmp/qa-crops', `card-${name}.png`));
  // Compose via HTML
  await page.setContent(`<html><body style="margin:0;background:#fdfaf3;font-family:system-ui;display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px">${
    cards.map((c) => `<img src="file://${c}" style="width:100%;border:1px solid #ddd"/>`).join('')
  }</body></html>`);
  await page.waitForTimeout(500);
  await page.screenshot({path: out, fullPage: true});
  console.log('wrote', out);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
