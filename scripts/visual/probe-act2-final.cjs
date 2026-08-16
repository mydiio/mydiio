const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    // Scroll to act2
    await page.evaluate(() => {
      const el = document.querySelector('[data-v2-act="act-two"]');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({path: `/tmp/qa-crops/v2-act2-${vp.name}.png`});
    const data = await page.evaluate(() => {
      const outer = document.querySelector('[data-v2-act="act-two"]');
      return {
        outerHeight: outer?.offsetHeight,
        viewport: window.innerHeight,
        scrollY: window.scrollY,
      };
    });
    console.log(vp.name, JSON.stringify(data));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
