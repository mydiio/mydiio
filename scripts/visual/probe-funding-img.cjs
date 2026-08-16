const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    // scroll to funding section
    await page.evaluate(() => {
      const el = document.querySelector('[data-v2-act="funding"]');
      if (el) el.scrollIntoView({behavior:'instant', block:'center'});
    });
    await page.waitForTimeout(500);
    await page.screenshot({path: `/tmp/qa-crops/funding-centered-${vp.name}.png`});
    console.log(vp.name, 'ok');
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
