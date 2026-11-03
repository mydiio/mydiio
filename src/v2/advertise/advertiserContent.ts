import { coveragePromise, responsePromise } from "../commercial/policy";
import { packageTiers, monthlyFeatures } from "@/v2/packages/packageData";
import { burstRates, money } from "@/v2/packages/commercialPricing";
// src/v2/advertise/advertiserContent.ts
// Copy distilled from The mydiio Book (Foundational Edition, August 2026),
// Chapter 09 — The Business Experience — and Chapter 11 — Trust Is Built.
// Language guide (Appendix C): lowercase mydiio, no jargon, short sentences.
// Reading target: a 15-year-old can follow every line on the page.

export { attentionMonthlyPricing, attentionBurstPricing } from "@/v2/packages/attentionPricing";

export const advertiserEyebrow = "For advertisers";

export const advertiserHeroTitleLines = ["Your campaign.", "In motion."] as const;

export const advertiserHeroAccent = "In motion.";

export const advertiserHeroBody =
  "Reserve passenger-screen advertising in Colombo for our planned November 2026 launch. Choose Roamer or Pioneer; future packages are available for expressions of interest.";

export const advertiserPriceAnchor = "Plans from LKR 25,000 a month.";

export const advertiserDepositNote =
  "Reserve with a refundable LKR 10,000 deposit, credited against your first invoice.";

/* ============================================================
 * 02 PRODUCT
 * ============================================================ */

export const productEyebrow = "Why mydiio";

export const productHeading = "Advertising, with fewer unknowns.";

export const productBody =
  "Your campaign moves with active tuk-tuks. You pick a plan that fits. Every Monday you get a clear record of what ran.";

export const productPurchases = [
  {
    number: "01",
    title: "Move beyond one spot.",
    body: "Your campaign travels through the live area with active tuk-tuks. It is not stuck on one wall.",
  },
  {
    number: "02",
    title: "Pick the way you want to pay.",
    body: "Reserve Roamer or Pioneer for launch. Future monthly and Burst packages accept expressions of interest only, with no deposit.",
  },
  {
    number: "03",
    title: "See what happened.",
    body: "Your Monday report shows what ran, where it ran and how many minutes are still left.",
  },
] as const;

/* ============================================================
 * 03 VERIFICATION (dark)
 * ============================================================ */

export const verificationEyebrow = "How we prove it ran";

export const verificationHeading = "Four steps. One clear record.";

export const verificationBody =
  "Each step adds the next piece of proof. At the end, you have a Monday report you can read in one minute.";

export const verificationSteps = [
  {
    number: "01",
    title: "Your campaign goes live",
    detail: "We send your video or image to the tuk-tuks in your plan.",
  },
  {
    number: "02",
    title: "The screen runs automatically",
    detail:
      "Paired, in-service screens receive the campaign without a driver login, logout or shift button.",
  },
  {
    number: "03",
    title: "Completed delivery is recorded",
    detail:
      "The system records completed playback with fresh GPS evidence and reports moving plays separately.",
  },
  {
    number: "04",
    title: "Your Monday report",
    detail: "The plays are grouped into one report and sent to you on Monday.",
  },
] as const;

export const verificationEvidence = {
  topline: "Proof panel",
  toplineValue: "Delivery recorded",
  status: "Completed play",
  rows: [
    ["Campaign", "Active"],
    ["Vehicle", "Recorded"],
    ["GPS evidence", "Fresh fix recorded"],
    ["Movement", "Reported separately"],
    ["Report", "Every Monday"],
  ] as const,
  footerLeft: "Completed delivery, not claimed views.",
  footerRight: "Monday report",
};

export const verificationTrustLine =
  "Driver login and logout do not control playback or campaign measurement.";

/* ============================================================
 * 03A ATTENTION INSIGHTS — OPTIONAL PILOT
 * ============================================================ */

export const attentionInsights = {
  eyebrow: "Optional pilot add-on",
  heading: "Attention Insights.",
  body: "Understand whether passengers were present and appeared to look toward the screen using privacy-safe, on-device estimation. Receive aggregate attention trends alongside completed-play, GPS, movement and campaign delivery evidence.",
  privacy:
    "No facial recognition. No identity, demographic, emotion or biometric profile. No raw camera images are stored or transmitted.",
  boundary:
    "Attention is an optimization signal. It does not change your contracted delivery balance and is never presented as a guaranteed view or unique person.",
  availability:
    "Pilot availability is subject to vehicle compatibility, privacy review, camera placement validation and calibration.",
  cta: "Register interest",
} as const;

/* ============================================================
 * 04 COVERAGE
 * ============================================================ */

export const coverageEyebrow = "Where your campaign runs";

export const coverageHeading = "Colombo. Your campaign’s coverage, agreed.";

export const coverageBody =
  "Accepting campaign enquiries across Colombo for our planned November 2026 launch. Vehicle allocation, available coverage and start date are confirmed before booking.";

export const corridorStops = [{ number: "01", name: "Colombo" }] as const;

export const expansionLabel = "Where we go next";
export const expansionBody =
  "Future routes and transport types open after successful trials and operating agreements. Your current package does not automatically include them.";

/* ============================================================
 * 05 PACKAGES
 * ============================================================ */

export const packagesEyebrow = "Monthly plans";

export const packagesHeading = "Two launch packages. Clear commitments.";

export const packagesBody =
  "Compare the total minutes, coverage and commitment. Roamer and Pioneer are launch packages; Voyager and Horizon are coming soon.";

export const packagesAnchor = "Plans from LKR 25,000 a month";

export const packageAudience = {
  roamer: "Local businesses on their first campaign",
  voyager: "Brands that want regular visibility",
  pioneer: "Founding advertisers who want price protection",
  horizon: "Brands planning broader campaign coverage",
} as const;

export const advertiserPackageCopy = Object.fromEntries(
  packageTiers.map((tier) => [
    tier.id,
    {
      eyebrow: tier.eyebrow,
      price: tier.price,
      features: monthlyFeatures(tier.id),
    },
  ]),
) as Record<
  string,
  { eyebrow: string; price: string; features: { label: string; value: string }[] }
>;

export const packagesFooter =
  "All minutes are shared across the agreed vehicles. Prices exclude applicable taxes. Future packages are expressions of interest only; no deposit is needed.";

/* ============================================================
 * 06 BURST
 * ============================================================ */

export const burstEyebrow = "One-off campaigns";

export const burstHeading = "Coming later: short campaigns.";

export const burstBody =
  "Planned one-off packages. Register interest now; availability and coverage must be confirmed before booking. One campaign, with written delivery terms and no monthly subscription.";

export const burstPackages = burstRates.map((rate, index) => ({
  ...rate,
  number: String(index + 1).padStart(2, "0"),
  price: money(rate.price),
  badge: "Coming soon",
  features: [
    { label: "Screen minutes", value: `${rate.minutes} total across vehicles` },
    { label: "Tuk-tuks", value: `Up to ${rate.vehicles}` },
    { label: "Campaign window", value: `${rate.days} days from activation` },
    { label: "Payment", value: "100% before activation" },
    { label: "Commitment", value: "One campaign; no monthly subscription" },
  ],
}));

export const burstNote =
  "Planned packages only. The campaign window begins at activation. For an undelivered portion, the advertiser chooses an agreed extension, credit or proportional refund. Refunds are processed within seven business days after reconciliation and selection of a refund.";

/* ============================================================
 * 07 MONDAY REPORT
 * ============================================================ */

export const reportEyebrow = "Illustrative report — sample data";

export const reportHeading = "Everything in one report.";

export const reportBody =
  "Every Monday you get a clear record of completed delivery, fresh GPS evidence, plays verified while moving, rejected attempts and the minutes you have left.";

export const reportFeatures = [
  "Route map",
  "Tuk-tuks used",
  "Completed plays",
  "Moving-play evidence",
  "Rejected attempts",
  "Minutes left",
] as const;

export const reportRows = [
  {
    vehicle: "Tuk-tuk recorded",
    location: "Sample location A",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
  {
    vehicle: "Tuk-tuk recorded",
    location: "Sample location B",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
  {
    vehicle: "Tuk-tuk recorded",
    location: "Sample location C",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
] as const;

export const reportLocations = [
  "Sample location A",
  "Sample location B",
  "Sample location C",
] as const;

export const reportNextDate = "Sample reporting period";

/* ============================================================
 * 08 CLIENT PORTAL
 * ============================================================ */

export const portalEyebrow = "Your advertiser portal · illustrative preview";

export const portalHeading = "One portal. Full control.";

export const portalBody =
  "Launch campaigns, add minutes, open reports and talk to the mydiio team from one place. The portal is included with your account.";

export const portalSteps = [
  { n: "01", t: "Choose", p: "Pick a plan that fits" },
  { n: "02", t: "Create", p: "Add your video or image" },
  { n: "03", t: "Launch", p: "Send it to the network" },
] as const;

export const portalTools = [
  { l: "Campaigns", v: "Manage ads and minutes" },
  { l: "Reports", v: "Open every Monday report" },
  { l: "Custom", v: "Send your brief to our team" },
  { l: "Support", v: "Keep every chat in one place" },
] as const;

/* ============================================================
 * 09 STORIES
 * ============================================================ */

export const storiesEyebrow = "Example campaign ideas";

export const storiesHeading = "Ideas for your first campaign.";

export const advertiserStories = [
  {
    number: "01",
    audience: "Restaurants and cafés",
    title: "Put your menu in the journey.",
    body: "Example idea: use a Roamer campaign to introduce a menu or offer, with a QR code linking to your own page. Coverage is agreed before booking; customer visits are not guaranteed.",
    facts: [
      { label: "Plan", value: "Roamer" },
      { label: "Monthly fee", value: "LKR 25,000" },
      { label: "Status", value: "Illustrative; not a customer result" },
    ],
    cta: { label: "See Roamer", href: "#monthly-packages" },
  },
  {
    number: "02",
    audience: "Retail and local services",
    title: "Help passengers discover your business.",
    body: "Example idea: show a clear product image and offer code on Roamer. Use your own offer redemptions alongside our completed-play report to evaluate response.",
    facts: [
      { label: "Plan", value: "Roamer" },
      { label: "Monthly fee", value: "LKR 25,000" },
      { label: "Status", value: "Illustrative; not a customer result" },
    ],
    cta: { label: "See Roamer", href: "#monthly-packages" },
  },
  {
    number: "03",
    audience: "Fintech and consumer brands",
    title: "Explain one useful benefit.",
    body: "Example idea: use Pioneer’s larger minute allocation for a simple product introduction and a QR link to your authorised landing page. No personal financial information is collected on the shared screen.",
    facts: [
      { label: "Plan", value: "Pioneer" },
      { label: "Monthly fee", value: "LKR 85,000" },
      { label: "Status", value: "Illustrative; not a customer result" },
    ],
    cta: { label: "See Pioneer", href: "#monthly-packages" },
  },
] as const;

/* ============================================================
 * 10 FAQ
 * ============================================================ */

export const faqEyebrow = "Before you launch";

export const faqHeading = "Straight answers.";

export const faqBody =
  "These answers come from the agreement and the Monday report. If your question is not here, write to us.";

export const faqContactPrompt = "Still have a question?";
export const faqContactLinkLabel = "Talk to us";

export const advertiserFaqs = [
  {
    question: "Why use mydiio instead of a fixed billboard?",
    answer:
      "Your campaign moves with active tuk-tuks instead of sitting in one place. You also see the completed plays, the recorded places and the minutes left in your portal.",
  },
  {
    question: "Can I start without a monthly plan?",
    answer:
      "Planned Burst packages run for 7, 14 or 30 days from activation. You can register interest without joining a monthly plan; availability must be confirmed.",
  },
  {
    question: "What kind of ad can I run?",
    answer:
      "Supply an approved landscape 1920 × 1080 video or image. See the creative guide below. Design and substantial edits are charged separately by prior agreement.",
  },
  {
    question: "Where does my campaign run?",
    answer:
      "We accept enquiries across Colombo for November 2026. Actual coverage and vehicle allocation are agreed before booking.",
  },
  {
    question: "How quickly can my campaign launch?",
    answer:
      "Upload your ad, pick your plan and send it for review. We confirm the start date based on the ad and the available tuk-tuks.",
  },
  {
    question: "What do I receive every Monday?",
    answer:
      "Your Monday report shows the tuk-tuks used, completed delivery, fresh GPS evidence, plays verified while moving, rejected attempts and the minutes left. The report stays in your portal.",
  },
  {
    question: "Does Attention Insights identify passengers?",
    answer:
      "No. The optional pilot uses on-device estimation and only reports aggregate attention trends. It does not use facial recognition, identify people, infer demographics or emotions, store raw images, or change your contracted delivery balance.",
  },
] as const;

/* ============================================================
 * 11 CLOSING
 * ============================================================ */

export const closingEyebrow = "Ready to launch";

export const closingHeadingLines = ["Launch with proof.", "Not estimates."] as const;

export const closingAccent = "Not estimates.";

export const closingBody =
  "Reserve for our planned November 2026 launch. We confirm your campaign order, coverage and start date before booking. The LKR 10,000 reservation is refundable before activation and credited to your first invoice.";

export const closingNote =
  "Refundable LKR 10,000 reservation. No free trial. Plain English agreement.";
