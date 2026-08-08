// src/v2/drivers/driverContent.ts
// Copy from The mydiio Book (Foundational Edition, August 2026),
// Chapter 08 — The Driver Partnership — and Chapter 13 — Driver Dignity.
// Language guide (Appendix C): lowercase mydiio, no jargon, short sentences.
// Reading target: a 15-year-old can follow every line on the page.

export type DriverStat = {
  value: string;
  label: string;
};

export type EarningInput = {
  number: string;
  title: string;
  body: string;
};

export type InstallStep = {
  number: string;
  title: string;
  detail: string;
};

export type CorridorStop = {
  number: string;
  name: string;
};

export type DriverTierSpec = {
  label: string;
  value: string;
};

export type DriverTier = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  price: string;
  period: string;
  specs: DriverTierSpec[];
  cta: string;
  audience: string;
  emphasis?: string;
  featured?: boolean;
};

export type DriverUseCase = {
  number: string;
  audience: string;
  title: string;
  body: string;
  facts: DriverTierSpec[];
  cta: {
    label: string;
    href: string;
  };
};

export type DriverFaq = {
  question: string;
  answer: string;
};

/* ============================================================
 * 01 HERO
 * ============================================================ */

export const driverEyebrow = "For drivers";

export const driverHeroTitleLines = ["Drive as usual.", "Get paid every month."] as const;

export const driverHeroAccent = "Get paid every month.";

export const driverHeroBody =
  "We put a small screen in your tuk-tuk. You keep driving your normal routes. We pay you a fixed amount every month, on the 5th, by bank transfer.";

export const driverHeroAnchorNote = "Free screen. Free fit. No deposit. You sign a simple agreement first.";

/* ============================================================
 * 02 EARNINGS
 * ============================================================ */

export const earningsEyebrow = "How the pay works";

export const earningsHeading = "A fixed monthly pay, written down.";

export const earningsBody =
  "The pay date is part of the company, not a wish. Missing the 5th would not only be a money problem. It would mean the company had moved its own risk onto the driver.";

export const earningsInputs: readonly EarningInput[] = [
  {
    number: "01",
    title: "You get a base pay.",
    body: "LKR 6,000 goes into your bank on the 5th of every month, for keeping the screen on in the live area.",
  },
  {
    number: "02",
    title: "You can earn more.",
    body: "If you drive enough hours, an extra LKR 2,000 goes in the same payment. The hours you already drive are usually enough.",
  },
  {
    number: "03",
    title: "You can refer a friend.",
    body: "If you bring in a driver you trust, we pay you a small thank-you. Your word carries weight inside the trade.",
  },
];

/* ============================================================
 * 03 INSTALL
 * ============================================================ */

export const installEyebrow = "From signature to first pay";

export const installHeading = "Four steps. One signed paper.";

export const installBody =
  "You sign a written agreement first, in the language you read best. The paper says the pay, the bonus, the pay date and what both sides promise. Nothing is left to guess.";

export const installSteps: readonly InstallStep[] = [
  {
    number: "01",
    title: "Sign the agreement",
    detail: "You read and sign a one-page agreement in your language. It records the pay, the bonus, the date and the install consent.",
  },
  {
    number: "02",
    title: "We check your routes",
    detail: "We confirm your regular routes pass through the live area, so the screen is seen by real passengers.",
  },
  {
    number: "03",
    title: "We fit the screen",
    detail: "A trained fitter puts the screen in your tuk-tuk and wires it to your existing electrics. About one hour. No cost to you.",
  },
  {
    number: "04",
    title: "You get paid on the 5th",
    detail: "Your first pay lands in your bank on the 5th of the next month. Every month after, the same date, the same way.",
  },
];

export const installEvidenceHeading = "Driver record";
export const installEvidenceLabel = "Next pay";
export const installEvidenceAmount = "LKR 8,000";
export const installEvidenceFootnote = ["Paid on the 5th", "Every month"] as const;

export const installEvidenceRows: readonly [string, string][] = [
  ["Agreement", "Signed in your language"],
  ["Screen", "Fitted free"],
  ["Routes", "Live area"],
  ["Pay", "Bank transfer"],
  ["Proof", "In your app"],
];

/* ============================================================
 * 04 COVERAGE
 * ============================================================ */

export const coverageEyebrow = "Where you drive";

export const coverageHeading = "One live area. Three towns.";

export const coverageBody =
  "The screen runs today in Dehiwala, Mount Lavinia and Ratmalana. We only add a new place after drivers inside it have earned for a full month. The map shows what is real, not what we wish.";

export const corridorStops: readonly CorridorStop[] = [
  { number: "01", name: "Dehiwala" },
  { number: "02", name: "Mount Lavinia" },
  { number: "03", name: "Ratmalana" },
];

export const expansionLabel = "Where we go next";
export const expansionBody = "New places are added one driver at a time. We do not promise towns we are not yet in.";

/* ============================================================
 * 05 TIERS
 * ============================================================ */

export const tiersEyebrow = "How much you earn";

export const tiersHeading = "Three tiers. One agreement.";

export const tiersBody =
  "You sign the same agreement either way. The tier depends on the hours you already drive. You can move up or down as your work changes.";

export const tiersAnchor = "Base LKR 6,000. Bonus LKR 2,000. Paid on the 5th.";

export const earningsTiers: readonly DriverTier[] = [
  {
    id: "core",
    number: "01",
    name: "Base",
    eyebrow: "Regular driver",
    price: "LKR 6,000",
    period: "a month",
    specs: [
      { label: "Agreement", value: "Signed first" },
      { label: "Screen", value: "Fitted free" },
      { label: "Pay day", value: "5th" },
    ],
    cta: "Apply for Base",
    audience: "For drivers on regular routes in the live area.",
  },
  {
    id: "plus",
    number: "02",
    name: "Base + Bonus",
    eyebrow: "Full day driver",
    price: "LKR 8,000",
    period: "a month",
    specs: [
      { label: "Agreement", value: "Signed first" },
      { label: "Hours", value: "Active enough" },
      { label: "Pay day", value: "5th" },
    ],
    cta: "Apply for Base + Bonus",
    audience: "For drivers who already drive a full day.",
    featured: true,
    emphasis: "Most drivers",
  },
  {
    id: "fleet",
    number: "03",
    name: "Group A",
    eyebrow: "Ten founding drivers",
    price: "Founding",
    period: "ten spots only",
    specs: [
      { label: "Spots", value: "Ten drivers" },
      { label: "Symbol", value: "Amber shirt" },
      { label: "Recognition", value: "For the long run" },
    ],
    cta: "Ask about Group A",
    audience: "The first ten drivers who join the network.",
  },
];

/* ============================================================
 * 06 PAYOUTS
 * ============================================================ */

export const payoutEyebrow = "Every pay, one record";

export const payoutHeading = "The app shows every pay.";

export const payoutBody =
  "The driver app shows each monthly pay, the days you drove and the day the money cleared. The app works in English, Sinhala and Tamil. It is there to remove doubt, not add work.";

export const payoutFeatures: readonly string[] = [
  "Amount each month",
  "Day the money cleared",
  "Days you drove",
  "Average hours per day",
  "Tier you were paid at",
];

export type PayoutRow = {
  month: string;
  days: string;
  hours: string;
  tier: "Base" | "Base + Bonus";
  amount: "LKR 6,000" | "LKR 8,000";
};

export const payoutRows: readonly PayoutRow[] = [
  { month: "May 2026", days: "27 days", hours: "8.4 h", tier: "Base + Bonus", amount: "LKR 8,000" },
  { month: "Apr 2026", days: "26 days", hours: "8.1 h", tier: "Base + Bonus", amount: "LKR 8,000" },
  { month: "Mar 2026", days: "25 days", hours: "7.6 h", tier: "Base + Bonus", amount: "LKR 8,000" },
  { month: "Feb 2026", days: "24 days", hours: "7.0 h", tier: "Base", amount: "LKR 6,000" },
];

/* ============================================================
 * 08 FAQ
 * ============================================================ */

export const faqEyebrow = "Before you apply";

export const faqHeading = "Straight answers.";

export const faqBody =
  "These answers come straight from the agreement. If your question is not here, write to us.";

export const faqContactPrompt = "Still have a question?";
export const faqContactLinkLabel = "Talk to us";

export const driverFaqs: readonly DriverFaq[] = [
  {
    question: "Do I need to drive a minimum number of hours?",
    answer:
      "No minimum beyond what the bonus needs. Keep your regular routes in the live area and you get the base pay. Drive the bonus hours and you get the extra LKR 2,000 in the same pay.",
  },
  {
    question: "Do I have to change my routes?",
    answer:
      "No. You keep every route you already drive. We only check that they pass through the live area so the screen is seen by passengers.",
  },
  {
    question: "How long does the fit take?",
    answer:
      "About one hour. A trained fitter puts the screen in your tuk-tuk and connects it to your existing electrics. There is no cost to you.",
  },
  {
    question: "When do I get paid?",
    answer:
      "On the 5th of every month, by bank transfer. The date is fixed in the company. We do not move it because cash was tight that month.",
  },
  {
    question: "Where does the screen run?",
    answer:
      "Today, in Dehiwala, Mount Lavinia and Ratmalana. We add new places only after drivers there have earned for a full month.",
  },
  {
    question: "What does it cost to join?",
    answer:
      "Nothing. The screen is free. The fit is free. There is no deposit. You sign the agreement and you start earning.",
  },
  {
    question: "What languages is the app in?",
    answer:
      "English, Sinhala and Tamil. You pick the one you read best.",
  },
  {
    question: "Will I be punished if the screen breaks?",
    answer:
      "No. If the screen or the network has a fault, that is on us, not on you. We fix it. You keep driving.",
  },
];

/* ============================================================
 * 09 CLOSING
 * ============================================================ */

export const closingEyebrow = "Ready to start";

export const closingHeadingLines = ["Sign the paper.", "Get paid on the 5th."] as const;

export const closingBody =
  "Apply in about five minutes. We check your routes, fit the screen free and start your monthly pay on the 5th of the next month.";

export const closingNote = "Free screen. Free fit. No deposit. One signed paper.";
