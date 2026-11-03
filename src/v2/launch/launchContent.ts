// src/v2/launch/launchContent.ts
// Single source of truth for the V2 launch campaign (advertiser application) page.
// Translated from the legacy /advertise/apply brutalist form into the Atlas V2
// design language. Plain English, no jargon. Plan names and pricing come from
// the same canonical source the advertiser page uses (@/v2/packages/packageData).

import { packageTiers } from "@/v2/packages/packageData";
import type { LaunchBudget, LaunchGoal, LaunchReferral, LaunchTier } from "./launchTypes";

export type { LaunchBudget, LaunchGoal, LaunchReferral, LaunchTier } from "./launchTypes";
export { launchBusinessTypes, launchGoals, launchReferrals } from "./launchTypes";

// Plan names and pitches are sourced live from packageTiers. The four-plan set
// rendered on the launch page is the same Pioneer / Roamer / Voyager / Horizon set
// already used on /advertise, so admin-side tier names stay in sync with the public site.

export const launchPlanOptions = packageTiers.map((tier) => ({
  id: tier.id,
  name: tier.name,
  pitch: tier.description,
  price: tier.price,
  features: tier.specs,
}));

// Budget → tier mapping. Drives the auto-select inside the form and the tier_interest
// field on submit. Mirrors the legacy TIER_MAP at /advertise/apply.

export type LaunchBudgetOption = {
  id: LaunchBudget;
  tier: LaunchTier;
  pitch: string;
};

export const launchBudgets: readonly LaunchBudgetOption[] = [
  {
    id: "Under LKR 25k",
    tier: "Not sure, help me choose",
    pitch: "Monthly plans start at LKR 25,000. Ask about future Burst availability.",
  },
  {
    id: "LKR 25 to 84k",
    tier: "Roamer",
    pitch: "LKR 25,000/month. 500 total minutes across up to 5 accepted vehicles.",
  },
  {
    id: "LKR 85 to 149k",
    tier: "Pioneer",
    pitch: "LKR 85,000/month. 2,000 total minutes within agreed live coverage.",
  },
  {
    id: "LKR 150 to 249k",
    tier: "Voyager",
    pitch: "Coming soon: LKR 150,000/month. 5,000 total minutes across up to 15 vehicles.",
  },
  {
    id: "LKR 250k+",
    tier: "Horizon",
    pitch: "Coming soon: LKR 250,000/month. 10,000 total minutes across up to 25 vehicles.",
  },
  {
    id: "Not sure yet",
    tier: "Not sure, help me choose",
    pitch: "We will recommend a plan based on confirmed coverage and your budget.",
  },
];

// Note: tier mapping above is the *auto-suggestion* the form makes when the user
// selects a budget. The full set of tiers is rendered in the plan cards and stays
// selectable inside the form via the explicit tier radio group.

export const launchEyebrow = "Launch campaign";

export const launchHeading = "Put your brand on the road.";

export const launchBody =
  "Send your application. We reply using the contact details you provide usually within 24 hours, or up to 48 hours in exceptional circumstances. No payment today.";

export const launchFormHeading = "Tell us about your business";

export const launchFormBody =
  "Tell us about your business, campaign goal, package, budget and creative readiness. Provide email or WhatsApp, or both, so we can contact you.";

export const launchContactNote =
  "We will reply using the contact details you provide usually within 24 hours, or up to 48 hours in exceptional circumstances.";

export const launchNameLabel = "Your name";
export const launchBusinessNameLabel = "Business name";
export const launchTypeLabel = "Business type";
export const launchEmailLabel = "Email";
export const launchWhatsAppLabel = "WhatsApp number";
export const launchGoalLabel = "What do you want this campaign to do?";
export const launchHasCreativeLabel = "Do you have creative ready?";
export const launchHasCreativeYesLabel = "Yes, I have creative";
export const launchHasCreativeNoLabel = "No, I need help making it";
export const launchReferralLabel = "How did you hear about us?";
export const launchReferralOtherLabel = "Pick one, or leave blank";

export const launchSend = "Send my application";
export const launchSending = "Sending…";
export const launchSuccess =
  "Thank you. We have your application. The team will reply usually within 24 hours, or up to 48 hours in exceptional circumstances.";
export const launchError =
  "Something went wrong. Please try again shortly, or use WhatsApp on our contact page.";
export const launchDuplicate =
  "We already have an application from this email. The team will be in touch.";

export const WHATSAPP_URL = "https://wa.me/94707471002";
export const APPLY_URL = "/advertise#apply-section";
