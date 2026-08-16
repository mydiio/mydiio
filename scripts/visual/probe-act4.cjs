const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    const data = await page.evaluate(() => {
      const act4 = document.querySelector('[data-v2-act="platform"]');
      const header = act4?.querySelector('header');
      const h2 = act4?.querySelector('h2');
      const eyebrow = act4?.querySelector('header > div');
      return {
        headerStyle: header ? {
          textAlign: getComputedStyle(header).textAlign,
          width: getComputedStyle(header).width,
          display: getComputedStyle(header).display,
        } : null,
        h2Rect: h2 ? {
          width: Math.round(h2.getBoundingClientRect().width),
          textAlign: getComputedStyle(h2).textAlign,
          marginLeft: getComputedStyle(h2).marginLeft,
          marginRight: getComputedStyle(h2).marginRight,
        } : null,
        eyebrowRect: eyebrow ? {
          width: Math.round(eyebrow.getBoundingClientRect().width),
          textAlign: getComputedStyle(eyebrow).textAlign,
        } : null,
        h2Text: h2?.innerText,
        eyebrowText: eyebrow?.innerText,
      };
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
