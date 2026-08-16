const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
  await page.evaluate(() => document.querySelector('footer[data-atlas-footer]').scrollIntoView({block: 'end'}));
  await page.waitForTimeout(400);
  await page.screenshot({path: '/tmp/qa-crops/footer-about-mobile.png'});
  await browser.close();
})().catch(e => console.error(e));
