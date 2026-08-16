const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const browser = await chromium.launch({headless: true});
  const out = '/tmp/qa-crops';
  fs.mkdirSync(out, { recursive: true });
  for (const vp of [
    {width:1024,height:1366,name:'tablet'},
    {width:1366,height:768,name:'laptop'},
  ]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    try { await page.goto('http://127.0.0.1:4173/privacy', {waitUntil: 'networkidle', timeout: 15000}); } catch(e) {}
    await page.waitForTimeout(1200);
    const file = path.join(out, `priv-fix-${vp.name}.png`);
    await page.screenshot({path: file});
    console.log(vp.name, 'ok', file);
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
