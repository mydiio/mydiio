const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
  await page.waitForTimeout(800);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('total', total);
  // Take 4 captures that align with possible user screenshot times
  const stops = [0, 900, 1800, 2700, 3600, 4500, 5400];
  let i = 0;
  for (const y of stops) {
    if (y > total) break;
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(300);
    await page.screenshot({path: `/tmp/qa-crops/about-fold-${i++}.png`});
    console.log('saved fold', i - 1, 'at y=', y);
  }
  await browser.close();
})().catch(e => console.error(e));
