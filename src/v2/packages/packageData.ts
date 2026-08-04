export type PackageTier = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  scale: string;
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
  },
  {
    id: "voyager",
    number: "02",
    name: "Voyager",
    eyebrow: "Build frequency",
    description:
      "Increase repetition across more journeys while keeping every play measurable.",
    scale: "Growing coverage",
  },
  {
    id: "pioneer",
    number: "03",
    name: "Pioneer",
    eyebrow: "Own the early network",
    description:
      "Priority access for brands that want stronger visibility as the mydiio network expands.",
    scale: "Full-network presence",
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
  },
];
