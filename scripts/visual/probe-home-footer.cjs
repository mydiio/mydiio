const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1200);
    const footers = await page.locator('footer[data-atlas-footer]').count();
    const inlineFooters = await page.locator('footer.atlas-closing-footer').count();
    const data = await page.evaluate(() => {
      const f = document.querySelector('footer[data-atlas-footer]');
      if (!f) return null;
      return {
        links: Array.from(f.querySelectorAll('a')).map((a) => a.getAttribute('href')),
        text: f.innerText,
        brand: f.querySelector('.atlas-footer-logo')?.innerText,
        bottom: f.querySelector('.atlas-footer-bottom')?.innerText || '',
      };
    });
    console.log(vp.name, 'footers=', footers, 'inline=', inlineFooters);
    console.log(vp.name, JSON.stringify(data, null, 2));
    await page.evaluate(() => document.querySelector('footer[data-atlas-footer]')?.scrollIntoView({block: 'end'}));
    await page.waitForTimeout(400);
    await page.screenshot({path: `/tmp/qa-crops/home-footer-${vp.name}.png`});
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
