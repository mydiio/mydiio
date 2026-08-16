const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/terms', {waitUntil: 'networkidle'});
  await page.waitForTimeout(800);
  const links = await page.locator('.terms-nav-link').count();
  const firstHref = await page.locator('.terms-nav-link').first().getAttribute('href');
  await page.locator('.terms-nav-link').first().click();
  await page.waitForTimeout(700);
  const y = await page.evaluate(() => window.scrollY);
  const target = await page.evaluate(() => {
    const a = document.querySelector('#definitions');
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return { topInViewport: Math.round(r.top) };
  });
  console.log('navLinks:', links, 'firstHref:', firstHref, 'scrollY after click:', y, 'defTopInViewport:', target);
  await browser.close();
})().catch(e => console.error(e));
