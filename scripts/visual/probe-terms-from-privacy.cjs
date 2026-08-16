const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/privacy', {waitUntil: 'networkidle'});
  await page.waitForTimeout(800);
  const legalHrefs = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('footer a, [data-atlas-footer] a'));
    return links.map(a => ({ text: a.innerText, href: a.getAttribute('href') }));
  });
  console.log('footer links:', JSON.stringify(legalHrefs, null, 2));
  await browser.close();
})().catch(e => console.error(e));
