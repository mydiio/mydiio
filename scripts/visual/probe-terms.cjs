const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/terms', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    await page.screenshot({path: `/tmp/qa-crops/terms-${vp.name}.png`, fullPage: true});
    const data = await page.evaluate(() => {
      const arts = document.querySelectorAll('article[id]');
      return {
        count: arts.length,
        sections: Array.from(arts).slice(0, 4).map(a => ({
          id: a.id,
          num: a.querySelector('.terms-body-section-number')?.innerText,
          title: a.querySelector('.terms-body-section-title')?.innerText?.slice(0, 60),
        })),
        navLinks: document.querySelectorAll('.terms-nav-link').length,
        introText: document.querySelector('.terms-intro-text')?.innerText?.slice(0, 60),
      };
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
