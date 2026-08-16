// src/v2/home/homeContent.ts
// Single source of truth for the V2 homepage. All copy lives here so the
// page can be rebuilt, A/B tested, or translated without touching layout.

export type HomePlan = {
  id: string;
  number: string;
  name: string;
  price: string;
  period: string;
  features: { label: string; value: string }[];
  audience: string;
  emphasis?: string;
  featured?: boolean;
};

export const homeEyebrow = "Sri Lanka's first connected passenger network";

export const homeHeroTitle = "Your ad inside Colombo's tuk-tuks. Every play proven by GPS.";

export const homeHeroBody =
  "Reach passengers on real Colombo routes. Build your ad in your own portal, watch every GPS-verified play, and get a report every Monday. Campaigns from LKR 25,000 a month with seven days free.";

export const homeProofItems = [
  {
    head: "GPS-verified plays",
    sub: "Every impression logged with its location and time. No black box.",
  },
  { head: "Your own portal", sub: "Log in to build ads, track plays and pull reports yourself." },
  { head: "A report every Monday", sub: "See exactly which vehicles ran your ad, and where." },
  { head: "Refundable deposit", sub: "LKR 5,000 secures your spot. Fully refundable." },
] as const;

export const differenceHeading =
  "Most local advertising asks you to trust a number. We show you the map.";

export const differenceBody =
  "When your ad plays on a mydiio screen, we record where and when. You do not get an estimate. You get a GPS-verified log of every play, in your portal and in your Monday report. That is the whole point of the network, and it is what no printed poster or roadside board can give you.";

export const howEyebrow = "How it works";

export const howHeading = "Four steps to live.";

export const howSteps = [
  {
    n: 1,
    title: "Reserve your spot",
    body: "A refundable LKR 5,000 deposit holds your place. Credited to your first invoice, or returned in full if you decide not to proceed.",
  },
  {
    n: 2,
    title: "Build your ad",
    body: "Upload your logo and photos in your portal, preview the result, and submit. Prefer we do it? We make your first creative free from your existing branding.",
  },
  {
    n: 3,
    title: "We review, then go live",
    body: "Every ad is checked before it runs, so the network stays clean. Approved ads are live within 72 hours.",
  },
  {
    n: 4,
    title: "Track and top up",
    body: "Watch GPS-verified plays on your dashboard, pull a report every Monday, and buy more minutes in your portal whenever you run low.",
  },
] as const;

export const portalEyebrow = "Your advertiser portal";

export const portalHeading = "Everything in one login.";

export const portalBody =
  "When you sign up you get your own portal, not a shared inbox. It is where you run your advertising and check that it is working.";

export const portalPoints = [
  "A dashboard with your live campaigns at a glance",
  "An ad builder to upload, preview and submit your creative",
  "A creatives library for everything you have run",
  "Reports with GPS-verified plays, refreshed every week",
  "Top-ups and Peak time slots you can add yourself",
] as const;

export const plansEyebrow = "Plans";

export const plansHeading = "Clear pricing. No surprises.";

export const plansBody =
  "All subscriptions run a 3-month minimum with seven days free and a refundable LKR 5,000 deposit. Peak time slots add 30 percent, off-peak takes 20 percent off, and you can add either in your portal. Prices shown are a starting point.";

export const plansBurstNote =
  "Need something short and fast? Burst packages run with no contract, gap-fill only: Spark LKR 5,000, Blast LKR 18,000, Surge LKR 40,000.";

export const plansPilotNote =
  "We are early on purpose. Our pilot runs the Dehiwala, Mount Lavinia and Ratmalana corridor and the fleet is growing. Pioneer spots are limited because the network is young, and the early advertisers set the standard.";

export const homePlans: readonly HomePlan[] = [
  {
    id: "roamer",
    number: "01",
    name: "Roamer",
    price: "From LKR 25,000",
    period: "per month",
    features: [
      { label: "Tuk-tuks", value: "Up to 5" },
      { label: "Screen minutes", value: "500 a month" },
      { label: "Peak time slots", value: "Add in your portal" },
      { label: "Top up", value: "Anytime" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
    audience: "Local businesses on their first campaign.",
  },
  {
    id: "voyager",
    number: "02",
    name: "Voyager",
    price: "From LKR 38,000",
    period: "per month",
    features: [
      { label: "Tuk-tuks", value: "Up to 15" },
      { label: "Screen minutes", value: "1,800 a month" },
      { label: "Peak time slots", value: "Add in your portal" },
      { label: "Top up", value: "Anytime" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
    audience: "Brands that want regular visibility.",
  },
  {
    id: "pioneer",
    number: "03",
    name: "Pioneer",
    price: "From LKR 25,000",
    period: "per month",
    emphasis: "10 spots ever",
    featured: true,
    features: [
      { label: "Tuk-tuks", value: "Full operating fleet" },
      { label: "Screen minutes", value: "2,000 a month" },
      { label: "Category lock", value: "12 months, only you" },
      { label: "Rate promise", value: "Fixed for the term" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
    audience: "Early brands that want the whole network.",
  },
  {
    id: "horizon",
    number: "04",
    name: "Horizon",
    price: "From LKR 65,000",
    period: "per month, custom",
    features: [
      { label: "Tuk-tuks", value: "15 to 100+" },
      { label: "Screen minutes", value: "Set for your campaign" },
      { label: "Length", value: "Set for your needs" },
      { label: "Rate", value: "Negotiated per minute" },
      { label: "Refundable deposit", value: "LKR 5,000" },
    ],
    audience: "Agencies and bigger brands with custom needs.",
  },
];

export const pioneerEyebrow = "The Pioneer offer";

export const pioneerHeading = "Ten businesses lock their category. Everyone else waits.";

export const pioneerBody =
  "A Pioneer spot gives your category twelve months of exclusivity on your corridor, and fixes your per-minute rate for as long as you stay. There will only ever be ten. When they are gone, they are gone.";

export const faqEyebrow = "Questions";

export const faqHeading = "Good to know.";

export const homeFaqs = [
  {
    q: "How do I know my ad actually played?",
    a: "Every Monday you receive a GPS-verified report showing each vehicle that ran your ad, the GPS location at the time of each play, and the total play count. Every impression is logged.",
  },
  {
    q: "Can I build my own ad?",
    a: "Yes. In your portal you upload your logo and photos, preview your ad, and submit it. Every ad is reviewed before it runs and goes live within 72 hours. We can also make your first creative for free.",
  },
  {
    q: "What happens when my minutes run low?",
    a: "You can buy more minutes in your portal at any time to keep your ad running, without waiting for your next billing cycle.",
  },
  {
    q: "Can I cancel?",
    a: "Subscriptions have a 3-month minimum term. After that you can cancel with 30 days notice. Burst packages have no contract and simply run until the minutes or validity are used up.",
  },
  {
    q: "What does the LKR 5,000 deposit cover?",
    a: "It secures your spot. The deposit is fully refundable, credited against your first invoice when you proceed, or returned in full if you decide not to.",
  },
] as const;

export const closingHeading = "Put your brand on the road this week.";

export const closingBody =
  "Reserve your spot with a refundable deposit, or message us on WhatsApp and we will walk you through it.";

export const closingContact = "hello@mydiio.com  ·  070 747 1002";

export const WHATSAPP_URL = "https://wa.me/94707471002";
export const APPLY_URL = "/advertise#apply-section";
