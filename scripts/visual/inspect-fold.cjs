const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/terms', {waitUntil: 'networkidle'});
    await page.waitForTimeout(1500);
    const stats = await page.evaluate(() => {
      const articles = document.querySelectorAll('article[id]');
      const samples = ['definitions','service','advertiser-terms','liability','contact'];
      const out = {};
      samples.forEach((id) => {
        const art = document.getElementById(id);
        if (!art) { out[id] = null; return; }
        const num = art.querySelector('.terms-body-section-number');
        const title = art.querySelector('.terms-body-section-title');
        const body = art.querySelector('.terms-body-section-body');
        const r = (e) => { const x = e.getBoundingClientRect(); return { y: Math.round(x.y + window.scrollY), h: Math.round(x.height) }; };
        out[id] = {
          article: r(art),
          number: num ? r(num) : null,
          title: title ? r(title) : null,
          body: body ? r(body) : null,
          numberText: num?.innerText,
        };
      });
      const intro = document.querySelector('.terms-intro');
      out._intro = intro ? intro.getBoundingClientRect().height : null;
      return out;
    });
    console.log(vp.name, JSON.stringify(stats, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
