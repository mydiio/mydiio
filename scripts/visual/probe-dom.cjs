const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
  await page.evaluate(() => document.querySelector('footer[data-atlas-footer]').scrollIntoView({block: 'end'}));
  await page.waitForTimeout(500);
  const html = await page.evaluate(() => {
    const f = document.querySelector('footer[data-atlas-footer]');
    return f ? f.outerHTML : 'NO FOOTER';
  });
  console.log(html);
  await browser.close();
})().catch(e => console.error(e));
