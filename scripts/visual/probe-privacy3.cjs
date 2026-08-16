const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1024,height:1366,name:'tablet'},{width:1366,height:768,name:'laptop'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/privacy', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    const data = await page.evaluate(() => {
      const first = document.querySelector('article[id]');
      const head = first.querySelector('.privacy-body-section-head');
      const title = first.querySelector('.privacy-body-section-title');
      const body = first.querySelector('.privacy-body-section-body');
      return {
        articleWidth: first.getBoundingClientRect().width,
        articleStyle: {
          display: getComputedStyle(first).display,
          gridTemplate: getComputedStyle(first).gridTemplateColumns,
          rowGap: getComputedStyle(first).rowGap,
          columnGap: getComputedStyle(first).columnGap,
        },
        headStyle: {
          gridColumn: getComputedStyle(head).gridColumn,
          gridRow: getComputedStyle(head).gridRow,
        },
        numberTop: head.querySelector('.privacy-body-section-number').getBoundingClientRect().top,
        titleTop: title.getBoundingClientRect().top,
        titleHeight: title.getBoundingClientRect().height,
        bodyTop: body.getBoundingClientRect().top,
        bodyHeight: body.getBoundingClientRect().height,
      };
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
