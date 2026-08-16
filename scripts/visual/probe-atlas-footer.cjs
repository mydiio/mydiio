const { chromium } = require('playwright');

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/advertise', name: 'advertise' },
  { path: '/drive', name: 'drive' },
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
];

const EXPECTED_EXPLORE = ['Advertise', 'Drive'];
const EXPECTED_COMPANY = ['About', 'Contact', 'Privacy', 'Terms'];
const EXPECTED_REACH = ['hello@mydiio.com', 'WhatsApp'];

const FORBIDDEN_FOOTER = [
  'Network',
  'Launch',
  'mydiiomedia@gmail.com',
  '+94 70 747 1002',
];

(async () => {
  const browser = await chromium.launch({headless: true});
  let failed = 0;
  for (const { path, name } of ROUTES) {
    const ctx = await browser.newContext({viewport: {width: 1440, height: 900}});
    const page = await ctx.newPage();
    try {
      await page.goto(`http://127.0.0.1:4173${path}`, {waitUntil: 'networkidle', timeout: 20000});
    } catch (e) { failed++; await ctx.close(); continue; }
    await page.waitForTimeout(800);
    const data = await page.evaluate(() => {
      const f = document.querySelector('footer[data-atlas-footer]');
      if (!f) return null;
      const columns = Array.from(f.querySelectorAll('.atlas-footer-col')).map((c) => ({
        heading: c.querySelector('.atlas-footer-heading')?.innerText || null,
        labels: Array.from(c.querySelectorAll('.atlas-footer-link')).map((a) => a.innerText),
      }));
      return {
        columns,
        links: Array.from(f.querySelectorAll('a')).map((a) => a.getAttribute('href')),
        text: f.innerText,
        brand: f.querySelector('.atlas-footer-logo')?.innerText,
        bottom: f.querySelector('.atlas-footer-bottom')?.innerText || '',
      };
    });
    if (!data) { console.log(`${path}: NO AtlasFooter`); failed++; await ctx.close(); continue; }
    const colByHeading = (h) => data.columns.find((c) => c.heading?.toLowerCase() === h.toLowerCase());
    const explore = colByHeading('Explore');
    const company = colByHeading('Company');
    const reach = colByHeading('Reach us');
    const exploreOk = !!explore && JSON.stringify(explore.labels) === JSON.stringify(EXPECTED_EXPLORE);
    const companyOk = !!company && JSON.stringify(company.labels) === JSON.stringify(EXPECTED_COMPANY);
    const reachOk = !!reach && JSON.stringify(reach.labels) === JSON.stringify(EXPECTED_REACH);
    const bottom = data.bottom;
    const copyrightOk = bottom.includes('© 2026 mydiio · designed by Start Smart Technologies')
      && !/Privacy|Terms/.test(bottom);
    const forbidden = FORBIDDEN_FOOTER.filter((s) => data.text.includes(s));
    const brandClean = (data.brand || '').replace(/\s/g, '').toLowerCase();
    const brandOk = brandClean === 'mydiio';
    const ok = exploreOk && companyOk && reachOk && copyrightOk && forbidden.length === 0 && brandOk;
    if (!ok) failed++;
    console.log(`${path}: explore=${exploreOk} company=${companyOk} reach=${reachOk} copyright=${copyrightOk} brand=${brandOk} forbidden=${JSON.stringify(forbidden)} → ${ok ? 'PASS' : 'FAIL'}`);
    if (!ok) console.log('  data:', JSON.stringify(data, null, 2));
    await page.evaluate(() => document.querySelector('footer[data-atlas-footer]').scrollIntoView({block: 'end'}));
    await page.waitForTimeout(300);
    await page.screenshot({path: `/tmp/qa-crops/footer-${name}.png`});
    await ctx.close();
  }
  await browser.close();
  process.exit(failed === 0 ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
