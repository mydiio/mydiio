import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [mode, page, home, sitemap, ...marketingRoutes] = await Promise.all([
  read("src/config/publicSiteMode.ts"),
  read("src/v2/waitlist/WaitlistPage.tsx"),
  read("src/routes/index.tsx"),
  read("src/routes/sitemap[.]xml.ts"),
  read("src/routes/about.tsx"),
  read("src/routes/advertise.tsx"),
  read("src/routes/advertise_.apply.tsx"),
  read("src/routes/contact.tsx"),
  read("src/routes/drive.tsx"),
  read("src/routes/investors.tsx"),
]);

assert.match(mode, /PUBLIC_SITE_MODE[^=]*= "waitlist"/);
assert.match(home, /isPublicWaitlistMode/);
assert.match(home, /isPublicWaitlistMode \? <WaitlistPage \/> : <HomePage \/>/);

assert.match(
  page,
  /https:\/\/rmqexobhpasitrexvaig\.supabase\.co\/functions\/v1\/submit-application/,
);
assert.match(page, /application_type: "advertiser"/);
assert.match(page, /referral_source: "Website waiting list"/);
assert.match(page, /tier_interest: "Let's talk"/);
assert.match(page, /name="contact_name"/);
assert.match(page, /name="business_name"/);
assert.match(page, /name="email"/);
assert.match(page, /name="phone"/);
assert.match(page, /name="consent"[^>]*required/);
assert.match(page, /name="website"[^>]*tabIndex=\{-1\}/);
assert.match(page, /https:\/\/admin\.mydiio\.com\/login/);
assert.match(page, /href="\/privacy"/);
assert.match(page, /href="\/terms"/);

for (const route of marketingRoutes) {
  assert.match(route, /isPublicWaitlistMode/);
  assert.match(route, /redirect\(\{ to:/);
}

assert.match(sitemap, /isPublicWaitlistMode/);
assert.match(sitemap, /path: "\/privacy"/);
assert.match(sitemap, /path: "\/terms"/);
await assert.rejects(access(new URL("../public/sitemap.xml", import.meta.url)));

for (const operationalRoute of [
  "src/routes/login.tsx",
  "src/routes/drivers.apply.tsx",
  "src/routes/r.$kind.$code.ts",
  "src/routes/ride.$vehicleId.tsx",
  "src/routes/privacy.tsx",
  "src/routes/terms.tsx",
]) {
  const source = await read(operationalRoute);
  assert.doesNotMatch(source, /isPublicWaitlistMode/);
}

console.log("Pre-launch waiting-list website contracts passed.");
