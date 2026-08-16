const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
  await page.waitForTimeout(800);
  for (const y of [0, 700, 1700, 2700, 3500, 4500, 5500]) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(300);
    const dominant = await page.evaluate(() => {
      const vh = window.innerHeight;
      const cx = window.innerWidth / 2;
      const cy = window.scrollY + vh / 2;
      const els = document.elementsFromPoint(cx, vh / 2);
      const sec = els.map((e) => e.closest('section')).filter(Boolean)[0];
      return sec ? sec.className : null;
    });
    console.log('y=', y, 'top section visible at center:', dominant);
  }
  await browser.close();
})().catch(e => console.error(e));
