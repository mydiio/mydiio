// Inspect above-the-fold for layout issues by checking element widths vs viewport
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
  const page = await ctx.newPage();
  for (const [slug, path] of [['home','/'], ['about','/about'], ['contact','/contact'], ['drive','/drive'], ['advertise','/advertise'], ['atlas-landing','/v2']]) {
    await page.goto('http://127.0.0.1:4173'+path, {waitUntil:'networkidle'});
    await page.waitForTimeout(1000);
    const data = await page.evaluate(() => {
      const issues = [];
      const w = window.innerWidth;
      // 1. Find elements overflowing the viewport above the fold
      const foldH = window.innerHeight;
      const overflowing = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < foldH && r.right > w + 1) {
          const cls = (el.className || '').toString().slice(0,60);
          if (!/reveal|atlas|animation/.test(cls)) {
            overflowing.push({tag: el.tagName, cls, right: Math.round(r.right)});
          }
        }
      });
      // 2. Check that the nav is anchored at top
      const nav = document.querySelector('.atlas-nav');
      const navRect = nav?.getBoundingClientRect();
      // 3. Hero h1 present?
      const h1 = document.querySelector('h1');
      // 4. Computed h1 font-size and line-height
      const cs = h1 ? getComputedStyle(h1) : null;
      return {
        overflowing: overflowing.slice(0, 6),
        navTop: navRect?.top,
        h1Size: cs ? `${cs.fontSize} / ${cs.lineHeight}` : null,
        h1Text: h1?.innerText?.slice(0,80),
        firstSection: (() => {
          const s = document.querySelector('section');
          if (!s) return null;
          const r = s.getBoundingClientRect();
          const cls = s.className;
          return {cls, top: Math.round(r.top), height: Math.round(r.height)};
        })(),
      };
    });
    console.log(`--- ${slug} ${path}`);
    console.log('  nav top:', data.navTop);
    console.log('  first section:', data.firstSection);
    console.log('  h1:', data.h1Size, data.h1Text);
    if (data.overflowing.length) {
      console.log('  OVERFLOW ABOVE FOLD:');
      data.overflowing.forEach(o => console.log('   ', o));
    } else {
      console.log('  no overflow above the fold ✓');
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
