const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 2});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
  await page.waitForTimeout(1500);
  // Take a screenshot at every scroll position
  const positions = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500];
  for (const y of positions) {
    await page.evaluate((y) => window.scrollTo({top: y, behavior: 'instant'}), y);
    await page.waitForTimeout(150);
    await page.screenshot({path: `/tmp/qa-crops/home-y-${y}.png`});
  }
  console.log('captured', positions.length, 'screenshots');
  await browser.close();
})().catch(e => console.error(e));
