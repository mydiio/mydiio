const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/', {waitUntil: 'networkidle'});
  await page.waitForTimeout(1500);
  // Scroll to the journey storyboard area
  await page.screenshot({path: '/tmp/qa-crops/v2-home-mobile-top.png', fullPage: false});
  // Get all sections and their overlap with viewport
  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('[data-v2-act], [data-v2-page] > *, section'));
    return sections.map(s => {
      const r = s.getBoundingClientRect();
      const styles = getComputedStyle(s);
      return {
        tag: s.tagName,
        act: s.getAttribute('data-v2-act'),
        height: Math.round(r.height),
        top: Math.round(r.top + window.scrollY),
        position: styles.position,
        scrollMargin: styles.scrollMargin,
        scrollPadding: styles.scrollPadding,
      };
    }).filter(s => s.act).slice(0, 12);
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})().catch(e => console.error(e));
