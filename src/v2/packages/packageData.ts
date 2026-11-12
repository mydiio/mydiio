import { attentionMonthlyPricing } from "./attentionPricing";
import { monthlyRates, monthlyFeatures, money } from "./commercialPricing";
export type PackageSpec = { label: string; value: string };
export type PackageTier = {
  id: keyof typeof monthlyRates;
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
const identities = [
  {
    id: "roamer",
    name: "Roamer",
    eyebrow: "Start focused",
    description: "A focused campaign across up to five accepted vehicles.",
    scale: "Launch package",
  },
  {
    id: "voyager",
    name: "Voyager",
    eyebrow: "Build visibility",
    description:
      "More monthly minutes across up to fifteen vehicles. Register interest for future availability.",
    scale: "Coming soon",
  },
  {
    id: "pioneer",
    name: "Pioneer",
    eyebrow: "Join the launch",
    description:
      "2,000 monthly minutes within agreed live coverage, with twelve-month price protection.",
    scale: "Limited launch package",
  },
  {
    id: "horizon",
    name: "Horizon",
    eyebrow: "Broader coverage",
    description:
      "10,000 monthly minutes across up to twenty-five vehicles. Register interest for future availability.",
    scale: "Coming soon",
  },
] as const;
export const packageTiers: PackageTier[] = identities.map((tier, index) => ({
  ...tier,
  number: String(index + 1).padStart(2, "0"),
  price: `${money(monthlyRates[tier.id].price)} / month`,
  specs: [
    {
      label: "Screen minutes",
      value: `${monthlyRates[tier.id].minutes.toLocaleString("en-US")} / month total`,
    },
    { label: "Coverage", value: monthlyRates[tier.id].vehicles },
    { label: "Commitment", value: "3-month minimum" },
    { label: "Availability", value: tier.scale },
    { label: "Attention Insights", value: `${attentionMonthlyPricing[tier.id]} · optional pilot` },
  ],
  ...(tier.id === "pioneer" ? { emphasis: "10 active places", featured: true } : {}),
}));
export { monthlyFeatures };
