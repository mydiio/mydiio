const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:4173/drivers/apply';

(async () => {
  const browser = await chromium.launch({headless: true});

  for (const vp of [{width: 1440, height: 900, name: 'desktop'}, {width: 390, height: 844, name: 'mobile'}]) {
    const ctx = await browser.newContext({viewport: vp});
    const page = await ctx.newPage();
    await page.goto(BASE, {waitUntil: 'networkidle'});
    await page.waitForTimeout(900);

    // Probe: required sections present
    const sections = await page.evaluate(() => {
      const main = document.querySelector('main[data-driver-apply-page]');
      if (!main) return null;
      return Array.from(main.querySelectorAll('section')).map((s) => s.className);
    });
    const required = ['driver-apply-hero', 'driver-apply-form-section', 'driver-apply-closing'];
    const missing = required.filter((r) => !sections || !sections.some((c) => c.includes(r)));
    const hasAtlasFooter = await page.locator('footer[data-atlas-footer]').count();

    // Probe: progress bar has 4 steps
    const steps = await page.locator('.driver-apply-progress-step').count();

    // Capture each step
    await page.evaluate(() => document.querySelector('.driver-apply-hero').scrollIntoView({block: 'start'}));
    await page.waitForTimeout(300);
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-hero.png`});

    // Step 1 — fill minimum to advance
    await page.evaluate(() => document.querySelector('.driver-apply-form').scrollIntoView({block: 'start'}));
    await page.waitForTimeout(300);
    await page.fill('input[name="full_name"]', 'Rukshan Perera');
    await page.fill('input[name="nic_number"]', '901234567V');
    await page.fill('input[name="date_of_birth"]', '1990-01-15');
    await page.fill('input[name="phone"]', '+94 77 123 4567');
    await page.fill('textarea[name="home_address"]', '42 Galle Road, Colombo 03');
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-step1.png`});

    // Click Next
    await page.click('button.driver-apply-submit-next');
    await page.waitForTimeout(400);

    // Step 2 — vehicle
    await page.fill('input[name="vehicle_registration"]', 'WP CAB-1234');
    await page.fill('input[name="vehicle_colour"]', 'Yellow & Black');
    await page.selectOption('select[name="vehicle_age"]', 'Less than 2 years');
    await page.click('label.driver-apply-chip:has-text("I own this vehicle")');
    await page.fill('input[name="licence_number"]', 'B1234567');
    await page.fill('input[name="licence_expiry"]', '2030-01-15');
    await page.selectOption('select[name="driving_experience"]', 'More than 5 years');
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-step2.png`});
    await page.click('button.driver-apply-submit-next');
    await page.waitForTimeout(400);

    // Step 3 — routes + earnings card
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-step3.png`});
    // slide hours to 6 (below 8) to exercise the non-bonus earnings state
    await page.evaluate(() => {
      const range = document.querySelector('input[name="daily_hours"]');
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(range, '6');
      range.dispatchEvent(new Event('input', {bubbles: true}));
      range.dispatchEvent(new Event('change', {bubbles: true}));
    });
    await page.waitForTimeout(300);
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-step3-base.png`});
    // slide back to 10 to lock bonus
    await page.evaluate(() => {
      const range = document.querySelector('input[name="daily_hours"]');
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(range, '10');
      range.dispatchEvent(new Event('input', {bubbles: true}));
      range.dispatchEvent(new Event('change', {bubbles: true}));
    });
    await page.click('label.driver-apply-chip:has-text("5 days")');
    await page.click('label.driver-apply-chip:has-text("Fort")');
    await page.click('label.driver-apply-chip:has-text("Pettah")');
    await page.click('label.driver-apply-chip:has-text("PickMe")');
    await page.waitForTimeout(300);
    await page.click('button.driver-apply-submit-next');
    await page.waitForTimeout(400);

    // Step 4 — payment + summary + checks
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-step4.png`});
    await page.selectOption('select[name="bank_name"]', 'Commercial Bank');
    await page.fill('input[name="bank_account_number"]', '1234567890');
    await page.fill('input[name="account_holder_name"]', 'Rukshan Perera');
    await page.click('label.driver-apply-check:has-text("I confirm all information")');
    await page.click('label.driver-apply-check:has-text("I consent to mydiio")');
    await page.click('label.driver-apply-check:has-text("I understand this is an application")');
    await page.waitForTimeout(300);
    await page.screenshot({path: `/tmp/qa-crops/apply-${vp.name}-step4-ready.png`});

    console.log(`${vp.name}: sections=${sections?.join(' | ')} steps=${steps} footer=${hasAtlasFooter} missing=${JSON.stringify(missing)} ${missing.length === 0 && steps === 4 && hasAtlasFooter === 1 ? 'PASS' : 'FAIL'}`);

    await ctx.close();
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
