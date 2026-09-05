import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
  pricing,
  content,
  section,
  monthly,
  burst,
  login,
  driver,
  about,
  contact,
  terms,
  privacy,
  translations,
] = await Promise.all([
  read("src/v2/packages/attentionPricing.ts"),
  read("src/v2/advertise/advertiserContent.ts"),
  read("src/v2/advertise/components/AttentionInsightsSection.tsx"),
  read("src/v2/advertise/components/AdvertiserPackages.tsx"),
  read("src/v2/advertise/components/BurstPackages.tsx"),
  read("src/routes/login.tsx"),
  read("src/v2/drivers/driverContent.ts"),
  read("src/v2/about/aboutContent.ts"),
  read("src/v2/contact/contactContent.ts"),
  read("src/v2/terms/termsContent.ts"),
  read("src/v2/privacy/privacyContent.ts"),
  read("src/lib/public-site-translations.ts"),
]);

for (const priceLine of [
  'roamer: "+ LKR 3,500 / month"',
  'voyager: "+ LKR 5,500 / month"',
  'pioneer: "+ LKR 5,000 / month"',
  'horizon: "From + LKR 10,000 / month"',
  '"burst-spark": "+ LKR 2,000 / campaign"',
  '"burst-blast": "+ LKR 4,000 / campaign"',
  '"burst-surge": "+ LKR 5,000 / campaign"',
]) {
  assert.ok(pricing.includes(priceLine), `Missing approved price: ${priceLine}`);
}

assert.match(content, /No facial recognition/);
assert.match(content, /No raw camera images are stored or transmitted/);
assert.match(content, /does not change your contracted delivery balance/);
assert.match(content, /optional pilot/i);
assert.match(content, /cta: "Register interest"/);
assert.match(section, /attentionInsights\.cta/);
assert.match(monthly, /attentionMonthlyPricing/);
assert.match(burst, /attentionBurstPricing/);

assert.doesNotMatch(login, /DriverPane|driver-portal|"driver" as Tab/);
assert.match(driver, /There is no advertising login, logout or shift button/);
assert.doesNotMatch(about, /Driver portal/);
assert.doesNotMatch(contact, /existing advertisers and drivers/i);
assert.doesNotMatch(translations, /DRIVER PORTAL|every impression is (?:logged|verified)/i);
assert.match(translations, /accepted completed plays/);
assert.doesNotMatch(terms, /all five portals/i);
assert.match(terms, /Attention Insights is an optional pilot add-on/);
assert.match(privacy, /Attention Insights is not activated/);
assert.match(privacy, /not use facial recognition/);
assert.match(privacy, /store or transmit raw camera images/);

console.log("Attention Insights and zero-touch website contracts passed.");
