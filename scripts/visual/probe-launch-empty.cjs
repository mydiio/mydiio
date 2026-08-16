const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/launch', {waitUntil: 'networkidle', timeout: 20000});
  await page.waitForTimeout(1000);
  const footerCount = await page.locator('footer').count();
  const hasAtlasFooter = (await page.content()).includes('data-atlas-footer');
  const bodyEnd = (await page.evaluate(() => document.body.innerText)).slice(-400);
  console.log({ footerCount, hasAtlasFooter });
  console.log('--- body end ---');
  console.log(bodyEnd);
  await browser.close();
})().catch(e => console.error(e));
