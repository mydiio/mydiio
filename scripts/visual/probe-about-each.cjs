const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
  await page.waitForTimeout(800);
  const sections = ['about-timeline', 'about-stats', 'about-sides', 'about-network', 'about-safety', 'about-future'];
  for (const cls of sections) {
    const sec = page.locator(`section.${cls}`);
    if (await sec.count() === 0) continue;
    await sec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({path: `/tmp/qa-crops/about-${cls}.png`});
    console.log('saved', cls);
  }
  await browser.close();
})().catch(e => console.error(e));
