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
  "Put your video or image on screens inside tuk-tuks driving through Colombo South. Pick a monthly plan or run a short, one-off campaign.";

export const advertiserPriceAnchor = "Plans from LKR 25,000 a month, with seven days free.";

export const advertiserDepositNote =
  "Your spot is held with a refundable LKR 5,000 deposit. Pay it back on launch.";

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
    body: "Use a monthly plan or buy a one-off Burst campaign. You see the minutes and the number of tuk-tuks before you buy.",
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

export const coverageHeading = "One live area. Three towns.";

export const coverageBody =
  "Your campaign runs today in Dehiwala, Mount Lavinia and Ratmalana. We only add a new place after active tuk-tuks are earning there.";

export const corridorStops = [
  { number: "01", name: "Dehiwala" },
  { number: "02", name: "Mount Lavinia" },
  { number: "03", name: "Ratmalana" },
] as const;

export const expansionLabel = "Where we go next";
export const expansionBody =
  "New places are added one driver at a time. We do not promise towns we are not yet in.";

/* ============================================================
 * 05 PACKAGES
 * ============================================================ */

export const packagesEyebrow = "Monthly plans";

export const packagesHeading = "Four plans. One goal each.";

export const packagesBody =
  "Pick the plan that fits your goal. Every plan starts with seven days free.";

export const packagesAnchor = "Plans from LKR 25,000 a month";

export const packageAudience = {
  roamer: "Local businesses on their first campaign",
  voyager: "Brands that want regular visibility",
  pioneer: "Brands that want the whole network",
  horizon: "Agencies and bigger brands with custom needs",
} as const;

export const advertiserPackageCopy = {
  roamer: {
    eyebrow: "Start small",
    price: "From LKR 25,000 / month",
    features: [
      { label: "Screen minutes", value: "500 a month" },
      { label: "Tuk-tuks", value: "Up to 5" },
      { label: "Minimum term", value: "3 months" },
      { label: "First seven days", value: "Free" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
  },
  voyager: {
    eyebrow: "Build visibility",
    price: "From LKR 38,000 / month",
    features: [
      { label: "Screen minutes", value: "1,800 a month" },
      { label: "Tuk-tuks", value: "Up to 15" },
      { label: "Minimum term", value: "3 months" },
      { label: "First seven days", value: "Free" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
  },
  pioneer: {
    eyebrow: "Join the full network",
    price: "From LKR 25,000 / month",
    features: [
      { label: "Screen minutes", value: "2,000 a month" },
      { label: "Tuk-tuks", value: "All active tuk-tuks" },
      { label: "Category lock", value: "12 months, only you" },
      { label: "Price promise", value: "Fixed for the term" },
      { label: "First seven days", value: "Free" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
  },
  horizon: {
    eyebrow: "Built around you",
    price: "From LKR 65,000 / month",
    features: [
      { label: "Screen minutes", value: "Set for your campaign" },
      { label: "Tuk-tuks", value: "15 to 100+" },
      { label: "Campaign length", value: "Set for your needs" },
      { label: "First seven days", value: "Free" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
  },
} as const;

export const packagesFooter =
  "The number of available tuk-tuks depends on the active fleet in your area. Need a short campaign? See Burst.";

/* ============================================================
 * 06 BURST
 * ============================================================ */

export const burstEyebrow = "One-off campaigns";

export const burstHeading = "Need a campaign for a few days?";

export const burstBody =
  "Buy a block of screen minutes once. No monthly plan. No contract. Use the minutes before they run out.";

export const burstPackages = [
  {
    id: "burst-spark",
    number: "01",
    name: "Spark",
    price: "LKR 12,000",
    badge: "",
    features: [
      { label: "Screen minutes", value: "200" },
      { label: "Tuk-tuks", value: "Up to 5" },
      { label: "Use within", value: "3 days" },
    ],
    bestFor: "A weekend event or a quick test",
  },
  {
    id: "burst-blast",
    number: "02",
    name: "Blast",
    price: "LKR 33,000",
    badge: "Most popular",
    features: [
      { label: "Screen minutes", value: "600" },
      { label: "Tuk-tuks", value: "Up to 15" },
      { label: "Use within", value: "7 days" },
    ],
    bestFor: "A week-long campaign or product launch",
  },
  {
    id: "burst-surge",
    number: "03",
    name: "Surge",
    price: "LKR 40,000",
    badge: "",
    features: [
      { label: "Screen minutes", value: "800" },
      { label: "Tuk-tuks", value: "Up to 20" },
      { label: "Use within", value: "10 days" },
    ],
    bestFor: "A big event across the live area",
  },
] as const;

export const burstNote =
  "Your campaign runs until its minutes are used or its time is up, whichever comes first. Monthly plans play first in the rotation.";

/* ============================================================
 * 07 MONDAY REPORT
 * ============================================================ */

export const reportEyebrow = "Your Monday report";

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
    location: "Dehiwala",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
  {
    vehicle: "Tuk-tuk recorded",
    location: "Mount Lavinia",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
  {
    vehicle: "Tuk-tuk recorded",
    location: "Ratmalana",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
] as const;

export const reportLocations = ["Dehiwala", "Mount Lavinia", "Ratmalana"] as const;

export const reportNextDate = "Monday, 1 June 2026";

/* ============================================================
 * 08 CLIENT PORTAL
 * ============================================================ */

export const portalEyebrow = "Your advertiser portal";

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

export const storiesEyebrow = "Real businesses";

export const storiesHeading = "Three campaigns. One network.";

export const advertiserStories = [
  {
    number: "01",
    audience: "Mahesh, restaurant chain",
    title: "Regular visibility across the area.",
    body: "Mahesh runs a chain in Colombo South. He uses Voyager to keep his offer on screens every day. He sees the result in his Monday report.",
    facts: [
      { label: "Plan", value: "Voyager" },
      { label: "Monthly pay", value: "LKR 38,000" },
      { label: "Where", value: "Across the live area" },
    ],
    cta: { label: "See Voyager", href: "#monthly-packages" },
  },
  {
    number: "02",
    audience: "Dilini, corner pharmacy",
    title: "Be seen near your shop.",
    body: "Dilini's pharmacy is in Dehiwala. She uses Roamer to reach the people passing her door. She picked the plan in one phone call.",
    facts: [
      { label: "Plan", value: "Roamer" },
      { label: "Monthly pay", value: "LKR 25,000" },
      { label: "Where", value: "Near her shop" },
    ],
    cta: { label: "See Roamer", href: "#monthly-packages" },
  },
  {
    number: "03",
    audience: "Rizan, music festival",
    title: "One weekend, no contract.",
    body: "Rizan ran Spark for the opening weekend. Three days, five tuk-tuks. The campaign ended when the festival ended.",
    facts: [
      { label: "Plan", value: "Spark" },
      { label: "One-off pay", value: "LKR 12,000" },
      { label: "Length", value: "3 days" },
    ],
    cta: { label: "See Burst", href: "#burst-packages" },
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
      "Yes. Burst packages are one-off campaigns that run for 3, 7 or 10 days. You do not need to join a monthly plan.",
  },
  {
    question: "What kind of ad can I run?",
    answer:
      "A video or an image. Small businesses can also use the simple ad builder in the portal to make an ad and send it to our team for review.",
  },
  {
    question: "Where does my campaign run?",
    answer:
      "Today, in Dehiwala, Mount Lavinia and Ratmalana. We add new places only after active tuk-tuks are earning there.",
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
  "Pick a plan and tell us what you want to achieve. We help you launch. Your spot is held with a refundable LKR 5,000 deposit.";

export const closingNote = "Free first seven days. Refundable deposit. Plain English agreement.";
