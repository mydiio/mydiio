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
  id: tier.id as LaunchTier,
  name: tier.name,
  pitch: tier.description,
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
    id: "Under LKR 20k",
    tier: "Roamer",
    pitch: "We'll find the right entry point for your budget.",
  },
  {
    id: "LKR 20 to 35k",
    tier: "Roamer",
    pitch: "Up to 5 tuk-tuks in your area. 500 minutes a month.",
  },
  {
    id: "LKR 35 to 65k",
    tier: "Voyager",
    pitch: "Up to 15 tuk-tuks across the live corridor. 1,800 minutes a month.",
  },
  {
    id: "LKR 65k+",
    tier: "Horizon",
    pitch: "15 to 100+ tuk-tuks, custom terms, built around your campaign.",
  },
  {
    id: "Not sure yet",
    tier: "Roamer",
    pitch: "Tell us what you want to do. We will recommend the right plan.",
  },
];

// Note: tier mapping above is the *auto-suggestion* the form makes when the user
// selects a budget. The full set of tiers is rendered in the plan cards and stays
// selectable inside the form via the explicit tier radio group.

export const launchEyebrow = "Launch campaign";

export const launchHeading = "Put your brand on the road.";

export const launchBody =
  "Three fields. We reply from hello@mydiio.com or on WhatsApp within 24 hours. No payment today.";

export const launchFormHeading = "Tell us about your business";

export const launchFormBody =
  "Name, business, email, WhatsApp. That's all we need to start the conversation.";

export const launchContactNote =
  "We will reply from hello@mydiio.com or on WhatsApp within 24 hours.";

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
  "Thank you. We have your application. The team will reply within 24 hours.";
export const launchError =
  "Something went wrong. Please try again, or email hello@mydiio.com directly.";
export const launchDuplicate =
  "We already have an application from this email. The team will be in touch.";

export const WHATSAPP_URL = "https://wa.me/94707471002";
export const APPLY_URL = "/advertise#apply-section";
