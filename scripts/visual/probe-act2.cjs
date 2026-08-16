const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:390,height:844,name:'mobile'},{width:1440,height:900,name:'desktop'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
    await page.waitForTimeout(2000);
    const data = await page.evaluate(() => {
      const outer = document.querySelector('[data-v2-act="act-two"]');
      const inner = outer?.querySelector('section');
      const sticky = inner?.firstElementChild;
      const orb = sticky?.querySelector('[aria-hidden="true"]');
      // Find the lowest rendered content
      const contentBoxes = [];
      const walk = (el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        if (el.children.length === 0 || el.tagName === 'H2' || el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'DIV') {
          contentBoxes.push({tag: el.tagName, top: Math.round(r.top + window.scrollY), bottom: Math.round(r.bottom + window.scrollY), height: Math.round(r.height)});
        }
        for (const c of el.children) walk(c);
      };
      walk(outer);
      return {
        outer: outer ? {height: Math.round(outer.getBoundingClientRect().height), position: getComputedStyle(outer).position, overflow: getComputedStyle(outer).overflow} : null,
        inner: inner ? {height: Math.round(inner.getBoundingClientRect().height), position: getComputedStyle(inner).position} : null,
        sticky: sticky ? {height: Math.round(sticky.getBoundingClientRect().height), position: getComputedStyle(sticky).position, top: getComputedStyle(sticky).top} : null,
        orb: orb ? {height: Math.round(orb.getBoundingClientRect().height), bottom: Math.round(orb.getBoundingClientRect().bottom + window.scrollY)} : null,
        contentBoxes: contentBoxes.sort((a,b)=>a.top-b.top).slice(0, 12),
      };
    });
    console.log(vp.name, JSON.stringify(data, null, 2));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
