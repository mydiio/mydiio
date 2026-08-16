const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/terms', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    await page.screenshot({path: `/tmp/qa-crops/terms-fold-${vp.name}.png`});
    const data = await page.evaluate(() => {
      const sel = (q) => document.querySelector(q);
      const measure = (q) => {
        const el = sel(q);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
      };
      const hero = sel('.terms-hero');
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const nav = sel('.terms-nav');
      const intro = sel('.terms-intro');
      const article = sel('article[id]');
      const firstList = sel('.terms-body-list');
      return {
        pageHeight: document.documentElement.scrollHeight,
        heroH: heroRect ? Math.round(heroRect.height) : null,
        nav: measure('.terms-nav'),
        intro: measure('.terms-intro'),
        firstArticle: measure('article[id]'),
        firstList: measure('.terms-body-list'),
      };
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
