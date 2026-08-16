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
  const data = await page.evaluate(() => {
    const sec = document.querySelector('[data-v2-act="platform"]');
    const diagram = sec?.querySelector('.atlas-os-diagram');
    const r = diagram?.getBoundingClientRect();
    const svg = sec?.querySelector('svg');
    const svgR = svg?.getBoundingClientRect();
    return {
      diagram: r ? {w: Math.round(r.width), h: Math.round(r.height), l: Math.round(r.left), t: Math.round(r.top + window.scrollY)} : null,
      svg: svgR ? {w: Math.round(svgR.width), h: Math.round(svgR.height), vw: svg?.getAttribute('viewBox')} : null,
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})().catch(e => console.error(e));
