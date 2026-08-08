const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({headless: true});
  const vps = [
    {width:390, height:844, name:'mobile'},
    {width:1024, height:1366, name:'tablet'},
    {width:1366, height:768, name:'laptop'},
    {width:1440, height:900, name:'desktop'},
  ];
  for (const vp of vps) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    try { await page.goto('http://127.0.0.1:4173/v2', {waitUntil: 'networkidle', timeout: 15000}); } catch(e) {}
    await page.waitForTimeout(2000);
    const top = await page.evaluate(() => {
      const el = document.querySelector('[data-v2-act="location"]');
      if (!el) return null;
      return Math.round(el.getBoundingClientRect().top + window.scrollY);
    });
    if (top !== null) {
      await page.evaluate((y) => window.scrollTo({top: y}), top);
      await page.waitForTimeout(800);
      await page.screenshot({path: `/tmp/qa-crops/v2-loc-${vp.name}.png`, fullPage: false});
      console.log(vp.name, 'top:', top, 'screenshot ok');
    } else {
      console.log(vp.name, 'not found');
    }
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
