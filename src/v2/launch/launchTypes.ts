// src/v2/launch/launchTypes.ts
// Shared types for the V2 launch campaign page.

export type LaunchBudget =
  | "Under LKR 25k"
  | "LKR 25 to 84k"
  | "LKR 85 to 149k"
  | "LKR 150 to 249k"
  | "LKR 250k+"
  | "Not sure yet";

export type LaunchTier = "Pioneer" | "Roamer" | "Voyager" | "Horizon" | "Not sure, help me choose";

export type LaunchGoal =
  | "More customers"
  | "Build awareness"
  | "Promote an event"
  | "Launch something new"
  | "Stay visible year-round";

export type LaunchReferral =
  | "Word of mouth"
  | "Social media"
  | "Saw a tuk-tuk screen"
  | "Google search"
  | "Referred by someone"
  | "WhatsApp"
  | "Other";

export type LaunchBusinessType =
  | "Retail Shop"
  | "Restaurant or Café"
  | "Pharmacy or Healthcare"
  | "Salon or Beauty"
  | "Hotel or Hospitality"
  | "Clothing or Fashion"
  | "Supermarket or Grocery"
  | "Bank or Finance"
  | "Telecom or Tech"
  | "Education"
  | "Event or Entertainment"
  | "Other";

export const launchBusinessTypes: readonly LaunchBusinessType[] = [
  "Retail Shop",
  "Restaurant or Café",
  "Pharmacy or Healthcare",
  "Salon or Beauty",
  "Hotel or Hospitality",
  "Clothing or Fashion",
  "Supermarket or Grocery",
  "Bank or Finance",
  "Telecom or Tech",
  "Education",
  "Event or Entertainment",
  "Other",
];

export const launchGoals: readonly LaunchGoal[] = [
  "More customers",
  "Build awareness",
  "Promote an event",
  "Launch something new",
  "Stay visible year-round",
];

export const launchReferrals: readonly LaunchReferral[] = [
  "Word of mouth",
  "Social media",
  "Saw a tuk-tuk screen",
  "Google search",
  "Referred by someone",
  "WhatsApp",
  "Other",
];
