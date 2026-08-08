export type PackageSpec = {
  label: string;
  value: string;
};

export type PackageTier = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  scale: string;
  price: string;
  specs: PackageSpec[];
  emphasis?: string;
  featured?: boolean;
};

export const packageTiers: PackageTier[] = [
  {
    id: "roamer",
    number: "01",
    name: "Roamer",
    eyebrow: "Start focused",
    description:
      "A simple entry point for brands testing verified in-vehicle advertising in Colombo.",
    scale: "Focused campaign",
    price: "From LKR 25,000 / month",
    specs: [
      {
        label: "Campaign minutes",
        value: "500 included",
      },
      {
        label: "Fleet",
        value: "Up to 5 tuk-tuks",
      },
      {
        label: "Commitment",
        value: "3-month minimum",
      },
    ],
  },
  {
    id: "voyager",
    number: "02",
    name: "Voyager",
    eyebrow: "Build frequency",
    description:
      "Increase repetition across more journeys while keeping every play measurable.",
    scale: "Growing coverage",
    price: "From LKR 38,000 / month",
    specs: [
      {
        label: "Campaign minutes",
        value: "1,800 included",
      },
      {
        label: "Fleet",
        value: "Up to 15 tuk-tuks",
      },
      {
        label: "Commitment",
        value: "3-month minimum",
      },
    ],
  },
  {
    id: "pioneer",
    number: "03",
    name: "Pioneer",
    eyebrow: "Own the early network",
    description:
      "Priority access for brands that want stronger visibility as the mydiio network expands.",
    scale: "Full-network presence",
    price: "From LKR 25,000 / month",
    specs: [
      {
        label: "Campaign minutes",
        value: "2,000 included",
      },
      {
        label: "Fleet",
        value: "Full operating fleet",
      },
      {
        label: "Exclusivity",
        value: "12 months by category",
      },
      {
        label: "Rate",
        value: "Fixed for subscription life",
      },
    ],
    emphasis: "10 spots ever",
    featured: true,
  },
  {
    id: "horizon",
    number: "04",
    name: "Horizon",
    eyebrow: "Built around you",
    description:
      "A tailored campaign for larger brands, agencies and multi-location requirements.",
    scale: "Custom deployment",
    price: "From LKR 65,000 / month",
    specs: [
      {
        label: "Campaign minutes",
        value: "Custom allocation",
      },
      {
        label: "Fleet",
        value: "15 to 100+ tuk-tuks",
      },
      {
        label: "Terms",
        value: "Built around your campaign",
      },
    ],
  },
];
