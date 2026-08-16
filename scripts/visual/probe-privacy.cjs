const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/privacy', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    await page.screenshot({path: `/tmp/qa-crops/priv-fix-${vp.name}.png`});
    const data = await page.evaluate(() => {
      const first = document.querySelector('article[id]');
      const last = document.querySelector('article[id="contact-us"]');
      const rects = [first, last].map(a => {
        const num = a.querySelector('.privacy-body-section-number');
        const title = a.querySelector('.privacy-body-section-title');
        const body = a.querySelector('.privacy-body-section-body');
        const head = a.querySelector('.privacy-body-section-head');
        const ar = a.getBoundingClientRect();
        return {
          id: a.id,
          articleTop: Math.round(ar.top + window.scrollY),
          articleHeight: Math.round(ar.height),
          head: head ? {
            top: Math.round(head.getBoundingClientRect().top + window.scrollY),
            height: Math.round(head.getBoundingClientRect().height),
            numberText: num?.innerText,
            titleText: title?.innerText?.slice(0, 40),
            numberRect: num ? {
              top: Math.round(num.getBoundingClientRect().top + window.scrollY),
              left: Math.round(num.getBoundingClientRect().left),
              width: Math.round(num.getBoundingClientRect().width),
            } : null,
            titleRect: title ? {
              top: Math.round(title.getBoundingClientRect().top + window.scrollY),
              left: Math.round(title.getBoundingClientRect().left),
              width: Math.round(title.getBoundingClientRect().width),
            } : null,
          } : null,
          body: body ? {
            top: Math.round(body.getBoundingClientRect().top + window.scrollY),
            height: Math.round(body.getBoundingClientRect().height),
          } : null,
        };
      });
      return rects;
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
