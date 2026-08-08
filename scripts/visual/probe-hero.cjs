const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,deviceScaleFactor:2,name:'mobile'}, {width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: {width: vp.width, height: vp.height}, deviceScaleFactor: vp.deviceScaleFactor ?? 1});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    const data = await page.evaluate(() => {
      const hero = document.querySelector('.about-hero');
      const title = document.querySelector('.about-hero-title');
      return {
        viewport: { w: window.innerWidth, h: window.innerHeight },
        heroMinHeight: hero ? getComputedStyle(hero).minHeight : null,
        heroHeight: hero?.offsetHeight,
        titleSize: title ? getComputedStyle(title).fontSize : null,
        titleBox: title?.getBoundingClientRect(),
      };
    });
    console.log('--- ' + vp.name + ' ---');
    console.log(JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
