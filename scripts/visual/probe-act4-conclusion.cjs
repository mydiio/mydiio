const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 2});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
  await page.waitForTimeout(1500);
  // scroll to bottom of platform section
  await page.evaluate(() => {
    const el = document.querySelector('[data-v2-act="platform"]');
    if (el) el.scrollIntoView({behavior: 'instant', block: 'end'});
  });
  await page.waitForTimeout(1500);
  await page.screenshot({path: '/tmp/qa-crops/act4-conclusion-mobile.png', fullPage: false});
  console.log('captured');
  await browser.close();
})().catch(e => console.error(e));
