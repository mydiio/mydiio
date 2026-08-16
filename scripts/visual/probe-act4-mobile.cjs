const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 2});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    const el = document.querySelector('[data-v2-act="platform"]');
    if (el) el.scrollIntoView({behavior:'instant', block:'start'});
  });
  await page.waitForTimeout(800);
  await page.screenshot({path: '/tmp/qa-crops/act4-mobile-before.png', fullPage: false});
  const data = await page.evaluate(() => {
    const sec = document.querySelector('[data-v2-act="platform"]');
    const items = sec ? Array.from(sec.querySelectorAll('.atlas-os-relationship')).map(it => {
      const r = it.getBoundingClientRect();
      const lbl = it.querySelector('div');
      return {
        top: Math.round(r.top + window.scrollY),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
        text: lbl?.innerText?.slice(0, 30),
      };
    }) : [];
    return { items, scrollY: window.scrollY, vw: window.innerWidth, vh: window.innerHeight };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})().catch(e => console.error(e));
