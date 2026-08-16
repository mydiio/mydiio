const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  for (const vp of [{width:1440,height:900,name:'desktop'},{width:390,height:844,name:'mobile'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4173/about', {waitUntil: 'networkidle'});
    await page.evaluate(() => document.querySelector('footer[data-atlas-footer]').scrollIntoView({block: 'end'}));
    await page.waitForTimeout(400);
    const spans = await page.evaluate(() => {
      const logo = document.querySelector('footer[data-atlas-footer] .atlas-footer-logo');
      if (!logo) return null;
      return Array.from(logo.querySelectorAll('span')).map((s) => ({
        text: s.innerText,
        color: getComputedStyle(s).color,
      }));
    });
    const amber = '#f5a623';
    const expected = [
      { text: 'myd', color: 'rgb(26, 26, 24)' },
      { text: 'ii', color: 'rgb(245, 166, 35)' },
      { text: 'o',  color: 'rgb(26, 26, 24)' },
    ];
    const actual = (spans || []).map(({ text, color }) => {
      const exp = expected.shift();
      return { text, color, match: exp && text === exp.text && color.toLowerCase() === exp.color.toLowerCase() };
    });
    console.log(vp.name, JSON.stringify(actual));
    await ctx.close();
  }
  await browser.close();
})().catch(e => console.error(e));
