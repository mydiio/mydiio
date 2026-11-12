import { refundPolicy, renewalPolicy, shortfallPolicy } from "../commercial/policy";
// Approved commercial schedule, 10 October 2026. Prices exclude applicable taxes.
export const advertiserDepositLkr = 10000;
export const advertiserDeposit = "LKR 10,000";
export const money = (amount: number) => `LKR ${amount.toLocaleString("en-US")}`;
export const monthlyRates = {
  roamer: {
    price: 25000,
    minutes: 500,
    vehicles: "Up to 5 accepted vehicles",
    status: "Launch package",
  },
  voyager: {
    price: 150000,
    minutes: 5000,
    vehicles: "Up to 15 accepted vehicles",
    status: "Coming soon",
  },
  pioneer: {
    price: 85000,
    minutes: 2000,
    vehicles: "Agreed live coverage",
    status: "Limited launch package",
  },
  horizon: {
    price: 250000,
    minutes: 10000,
    vehicles: "Up to 25 accepted vehicles",
    status: "Coming soon",
  },
} as const;
export const burstRates = [
  {
    id: "burst-spark",
    name: "Spark",
    price: 12000,
    minutes: 200,
    vehicles: 5,
    days: 7,
    bestFor: "A short event or introductory campaign",
  },
  {
    id: "burst-blast",
    name: "Blast",
    price: 33000,
    minutes: 600,
    vehicles: 10,
    days: 14,
    bestFor: "A product launch or two-week promotion",
  },
  {
    id: "burst-surge",
    name: "Surge",
    price: 40000,
    minutes: 800,
    vehicles: 25,
    days: 30,
    bestFor: "A month-long promotion across available coverage",
  },
] as const;
export function monthlyFeatures(id: keyof typeof monthlyRates) {
  const rate = monthlyRates[id];
  return [
    { label: "Availability", value: rate.status },
    {
      label: "Screen minutes",
      value: `${rate.minutes.toLocaleString("en-US")} / month, shared across vehicles`,
    },
    { label: "Coverage", value: rate.vehicles },
    { label: "Minimum term", value: "3 months" },
    { label: "Minimum package fees", value: `${money(rate.price * 3)} over 3 months` },
    {
      label: "Reservation",
      value:
        id === "roamer" || id === "pioneer"
          ? `${advertiserDeposit}, refundable before activation; credited to first invoice`
          : "Express interest; no deposit",
    },
    ...(id === "pioneer"
      ? [
          { label: "Price protection", value: "12 months" },
          { label: "Places", value: "10 active advertisers maximum" },
        ]
      : []),
  ];
}
export const includedFeatures = [
  "Display of your supplied video or image, subject to approval; design is charged separately",
  "Monday report with completed plays, GPS evidence, moving plays and remaining minutes",
  "Advertiser portal access and campaign support",
];
export const packageLimitations = [
  "Minutes are total screen delivery across the agreed vehicles, not minutes per vehicle or a guarantee of views, passengers or sales.",
  "Coverage, routes and start date are confirmed before activation. Exact streets, times and continuous playback are not guaranteed.",
  "No category exclusivity or automatic access to future fleet expansion is included. Extra coverage and creative production require a separate agreement.",
  "Prices exclude applicable taxes and optional add-ons. Monthly plans are paid in advance with a three-month minimum. No free trial is offered.",
  refundPolicy,
  renewalPolicy,
  shortfallPolicy,
];
