const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: true});
  const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/privacy', {waitUntil: 'networkidle'});
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const first = document.querySelector('article[id]');
    const head = first.querySelector('.privacy-body-section-head');
    const title = first.querySelector('.privacy-body-section-title');
    const body = first.querySelector('.privacy-body-section-body');
    const headStyle = getComputedStyle(head);
    return {
      articleStyle: {
        display: getComputedStyle(first).display,
        gridTemplate: getComputedStyle(first).gridTemplateColumns,
        rowGap: getComputedStyle(first).rowGap,
      },
      headOuter: {
        width: head.getBoundingClientRect().width,
        height: head.getBoundingClientRect().height,
        display: getComputedStyle(head).display,
        gridColumn: headStyle.gridColumn,
        gridRow: headStyle.gridRow,
      },
      headChildren: Array.from(head.children).map(c => ({
        tag: c.tagName,
        text: c.innerText.slice(0, 40),
        rect: c.getBoundingClientRect(),
      })),
      titleRect: title.getBoundingClientRect(),
      titleVisible: title.offsetHeight > 0,
      bodyRect: body.getBoundingClientRect(),
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})().catch(e => console.error(e));
