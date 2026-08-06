export const productPurchases = [
  {
    number: "01",
    title: "Move beyond one location.",
    body: "Your campaign travels with active tuk-tuks through the live corridor instead of staying in one fixed place.",
  },
  {
    number: "02",
    title: "Choose what fits.",
    body: "Start with a monthly plan or run a one-off Burst campaign. You know the minutes and tuk-tuks included before you buy.",
  },
  {
    number: "03",
    title: "Stay in control.",
    body: "Your Monday report shows what ran, where it ran and how many campaign minutes remain.",
  },
] as const;

export const verificationSteps = [
  {
    number: "01",
    title: "Campaign starts",
    detail: "We send your video or image to the tuk-tuks in your package.",
  },
  {
    number: "02",
    title: "Tuk-tuk moves",
    detail: "The screen shows your campaign during passenger journeys.",
  },
  {
    number: "03",
    title: "Play is recorded",
    detail: "GPS records the tuk-tuk, place and time of the completed play.",
  },
  {
    number: "04",
    title: "Report is ready",
    detail: "The completed plays are organised into your Monday report.",
  },
] as const;

export const corridorStops = [
  {
    number: "01",
    name: "Dehiwala",
  },
  {
    number: "02",
    name: "Mount Lavinia",
  },
  {
    number: "03",
    name: "Ratmalana",
  },
] as const;

export const packageAudience = {
  roamer: "Local businesses starting their first campaign",
  voyager: "Brands that want regular visibility",
  pioneer: "Early brands that want the full network",
  horizon: "Agencies and larger brands that need a custom campaign",
} as const;

export const advertiserPackageCopy = {
  roamer: {
    eyebrow: "Start small",
    specs: [
      { label: "Screen minutes", value: "500 each month" },
      { label: "Tuk-tuks", value: "Up to 5" },
      { label: "Minimum term", value: "3 months" },
    ],
  },
  voyager: {
    eyebrow: "Build visibility",
    specs: [
      { label: "Screen minutes", value: "1,800 each month" },
      { label: "Tuk-tuks", value: "Up to 15" },
      { label: "Minimum term", value: "3 months" },
    ],
  },
  pioneer: {
    eyebrow: "Join the full network",
    specs: [
      { label: "Screen minutes", value: "2,000 each month" },
      { label: "Tuk-tuks", value: "All active tuk-tuks" },
      { label: "Only brand in your category", value: "Reserved for 12 months" },
      { label: "Price promise", value: "Your monthly price stays fixed" },
    ],
  },
  horizon: {
    eyebrow: "Built around you",
    specs: [
      { label: "Screen minutes", value: "Set for your campaign" },
      { label: "Tuk-tuks", value: "15 to 100+ when available" },
      { label: "Campaign length", value: "Set for your needs" },
    ],
  },
} as const;

export const pricingSteps = [
  {
    number: "01",
    label: "Choose a plan",
    detail: "Pick the plan that fits your budget and goal.",
  },
  {
    number: "02",
    label: "Get minutes",
    detail: "Your plan gives you a clear amount of screen time.",
  },
  {
    number: "03",
    label: "Select tuk-tuks",
    detail: "We divide those minutes across the tuk-tuks in your plan.",
  },
  {
    number: "04",
    label: "Go live",
    detail: "Your video or image plays inside the selected tuk-tuks.",
  },
  {
    number: "05",
    label: "See what remains",
    detail: "Your Monday report shows completed plays and unused minutes.",
  },
] as const;

export const reportFeatures = [
  "Route map",
  "Tuk-tuks used",
  "Recorded places",
  "Recorded times",
  "Past plays",
  "Minutes remaining",
] as const;

export const advertiserUseCases = [
  {
    number: "01",
    audience: "National brands",
    title: "Build regular visibility.",
    body: "Use several active tuk-tuks to keep your campaign moving across the live corridor.",
    facts: [
      { label: "Packages to consider", value: "Voyager or Horizon" },
      { label: "Campaign style", value: "Ongoing monthly visibility" },
      { label: "Where it runs", value: "Across the live corridor" },
    ],
    cta: {
      label: "View monthly packages",
      href: "#monthly-packages",
    },
  },
  {
    number: "02",
    audience: "Local businesses",
    title: "Be seen near your business.",
    body: "Show your campaign in tuk-tuks travelling through the areas where you operate.",
    facts: [
      { label: "Packages to consider", value: "Roamer or Spark" },
      { label: "Good for", value: "Shops, restaurants and local services" },
      { label: "Current areas", value: "Dehiwala, Mount Lavinia and Ratmalana" },
    ],
    cta: {
      label: "Compare all packages",
      href: "#monthly-packages",
    },
  },
  {
    number: "03",
    audience: "Events and launches",
    title: "Run a short campaign.",
    body: "Promote an event, opening or product launch without joining a monthly plan.",
    facts: [
      { label: "Packages to consider", value: "Spark, Blast or Surge" },
      { label: "How you pay", value: "One payment. No monthly plan" },
      { label: "Campaign length", value: "7, 14 or 30 days" },
    ],
    cta: {
      label: "View Burst packages",
      href: "#burst-packages",
    },
  },
] as const;

export const burstPackages = [
  {
    id: "burst-spark",
    number: "01",
    name: "Spark",
    price: "LKR 5,000",
    badge: "",
    facts: [
      { label: "Screen minutes", value: "500" },
      { label: "Tuk-tuks", value: "Up to 5" },
      { label: "Use within", value: "7 days" },
    ],
    bestFor: "A weekend event or a quick test",
  },
  {
    id: "burst-blast",
    number: "02",
    name: "Blast",
    price: "LKR 18,000",
    badge: "Most popular",
    facts: [
      { label: "Screen minutes", value: "2,000" },
      { label: "Tuk-tuks", value: "Up to 10" },
      { label: "Use within", value: "14 days" },
    ],
    bestFor: "A week-long campaign or product launch",
  },
  {
    id: "burst-surge",
    number: "03",
    name: "Surge",
    price: "LKR 40,000",
    badge: "",
    facts: [
      { label: "Screen minutes", value: "5,000" },
      { label: "Tuk-tuks", value: "Full active fleet" },
      { label: "Use within", value: "30 days" },
    ],
    bestFor: "A major event across the live corridor",
  },
] as const;
