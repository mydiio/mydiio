const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    // scroll to funding
    await page.evaluate(() => {
      const elements = document.querySelectorAll('[data-v2-act="funding"]');
      if (elements[0]) elements[0].scrollIntoView({behavior:'instant', block:'center'});
    });
    await page.waitForTimeout(500);
    const data = await page.evaluate(() => {
      const section = document.querySelector('[data-v2-act="funding"]');
      const inner = section?.querySelector('.atlas-funding-motion');
      const eyebrow = inner?.querySelector('div');
      const h2 = inner?.querySelector('h2');
      const p = inner?.querySelector('p');
      const iw = inner?.getBoundingClientRect().width;
      return {
        viewport: {w: window.innerWidth},
        inner: inner ? {
          width: Math.round(iw),
          left: Math.round(inner.getBoundingClientRect().left),
          textAlign: getComputedStyle(inner).textAlign,
          marginLeft: getComputedStyle(inner).marginLeft,
          marginRight: getComputedStyle(inner).marginRight,
        } : null,
        eyebrow: eyebrow ? {
          textAlign: getComputedStyle(eyebrow).textAlign,
          display: getComputedStyle(eyebrow).display,
          width: Math.round(eyebrow.getBoundingClientRect().width),
          left: Math.round(eyebrow.getBoundingClientRect().left),
        } : null,
        h2: h2 ? {
          width: Math.round(h2.getBoundingClientRect().width),
          left: Math.round(h2.getBoundingClientRect().left),
        } : null,
        p: p ? {
          width: Math.round(p.getBoundingClientRect().width),
          left: Math.round(p.getBoundingClientRect().left),
        } : null,
      };
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
