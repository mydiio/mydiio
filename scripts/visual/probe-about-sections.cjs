const { chromium } = require('playwright');
const FORBIDDEN = ['about-timeline', 'about-stats', 'about-network', 'about-safety'];
const REQUIRED = ['about-hero', 'about-pillars', 'about-sides', 'about-future', 'about-closing'];
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width: 1440, height: 900}, {width: 390, height: 844}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
    await page.waitForTimeout(800);
    const cls = await page.evaluate(() => {
      const main = document.querySelector('main[data-about-page]');
      if (!main) return null;
      return Array.from(main.querySelectorAll('section')).map((s) => s.className);
    });
    const present = cls.filter((c) => !c.includes('atlas-nav'));
    const hit = FORBIDDEN.filter((f) => cls.some((c) => c.includes(f)));
    const miss = REQUIRED.filter((r) => !cls.some((c) => c.includes(r)));
    const ok = hit.length === 0 && miss.length === 0;
    console.log(vp.width, 'sections=', present.join(' | '), 'forbiddenHit=', hit, 'missingRequired=', miss, ok ? 'PASS' : 'FAIL');
    await page.screenshot({path: `/tmp/qa-crops/about-${vp.width}.png`, fullPage: true});
    await ctx.close();
  }
  await browser.close();
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
