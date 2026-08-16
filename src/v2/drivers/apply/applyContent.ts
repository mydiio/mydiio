// src/v2/drivers/apply/applyContent.ts
// V2 driver application copy. Distilled from the legacy /drivers/apply route.
// Single source of truth for the page.

export const applyEyebrow = "Driver partner application";

export const applyHeroHeading = "Join the mydiio network.";

export const applyHeroBody =
  "Takes about 5 minutes. We review every application personally and contact you on WhatsApp within 48 hours.";

export const applyHeroPills = [
  "No payment today",
  "Screen installed free",
  "Keep your existing routes",
  "Pay on the 5th",
] as const;

export const applyFormHeading = "Tell us about you and your routes.";

export const applyFormBody =
  "Kept private. Used only to verify your application and match you to active advertiser zones.";

export const applyContactNote =
  "If anything is unclear, message us on WhatsApp and we'll walk you through it.";

export const applySection1Heading = "About you";
export const applySection1Body = "Personal details for your application. We keep these private.";

export const applySection2Heading = "Your vehicle";
export const applySection2Body = "Registration and licence. Used to schedule installation.";

export const applySection3Heading = "Your routes";
export const applySection3Body = "Helps us match you to active advertiser zones.";

export const applySection4Heading = "Payment";
export const applySection4Body = "Where we send your monthly pay on the 5th.";

export const applyConfirmHeading = "Before you submit";
export const applyConfirmBody =
  "By submitting: (1) All information is accurate and truthful. (2) You consent to mydiio storing your data to evaluate this application. (3) This is an application, not a confirmed acceptance. (4) Your data will not be shared outside the mydiio operation. (5) A refundable deposit (LKR 3,500 founding partners, LKR 5,000 standard) is required before installation, arranged after approval, not now.";

export const applyChecks: readonly string[] = [
  "I confirm all information provided is accurate and truthful.",
  "I consent to mydiio storing my personal data for this application.",
  "I understand this is an application, not a confirmed acceptance.",
];

export const applySubmit = "Submit application";
export const applySubmitting = "Submitting…";
export const applyBack = "Back";
export const applyNext = "Next";
export const applyRestart = "Start fresh";

export const applySuccessHeading = (first: string) => `Application received, ${first}.`;
export const applySuccessBody =
  "We'll review your application and contact you on WhatsApp within 48 hours.";
export const applySuccessHome = "Back to homepage";

export const applyError = "Something went wrong, please try again, or message us on WhatsApp.";

export const applyDuplicate =
  "We already have an application from this number. We'll be in touch on WhatsApp soon.";

export const applyDraftNotice = "You have a saved draft, continuing from where you left off.";

export const applyEarningsEyebrow = "Your estimated earnings";
export const applyEarningsUnlock = (remaining: number) =>
  `Base pay. Drive ${remaining} more hour${remaining !== 1 ? "s" : ""}/day to unlock +LKR 2,000.`;
export const applyEarningsUnlocked = "Base pay LKR 6,000 + LKR 2,000 route bonus unlocked.";
export const applyEarningsBadgeUnlocked = "✓ Route bonus eligible";
export const applyEarningsBadgeLocked = (remaining: number) =>
  `Drive ${remaining} more hrs/day to unlock`;

export const applyRentNotice =
  "You'll need your vehicle owner's written consent before installation. We provide a template.";

export const applyFieldFullName = "Full name";
export const applyFieldFullNameNote = "Must match your National Identity Card";
export const applyFieldNic = "NIC number";
export const applyFieldNicNote = "12-digit new format or 9-digit + V/X old format";
export const applyFieldNicErr = "Please enter a valid Sri Lankan NIC number";
export const applyFieldDob = "Date of birth";
export const applyFieldDobErr = "You must be 18 or older to apply";
export const applyFieldWhatsApp = "WhatsApp number";
export const applyFieldWhatsAppNote = "We'll send application updates here";
export const applyFieldAlt = "Alternate contact (optional)";
export const applyFieldAltNote = "Optional, family contact";
export const applyFieldAddress = "Home address";
export const applyFieldAddressNote = "General area is fine at this stage";
export const applyFieldLanguage = "How should we communicate with you?";

export const applyFieldRegistration = "Vehicle registration";
export const applyFieldRegistrationNote = "As shown on your registration certificate (CR)";
export const applyFieldColour = "Vehicle colour";
export const applyFieldColourPlaceholder = "e.g. Yellow / Yellow & Black";
export const applyFieldVehicleAge = "Vehicle age";
export const applyFieldOwnership = "Vehicle ownership";
export const applyFieldLicence = "Driving licence number";
export const applyFieldLicenceNote = "Must cover three-wheelers";
export const applyFieldLicenceExpiry = "Licence expiry date";
export const applyFieldLicenceExpired = "An active licence is required to apply.";
export const applyFieldLicenceSoon = "Your licence expires soon, please renew before installation.";
export const applyFieldExperience = "Driving experience";

export const applyFieldDailyHours = "Hours you drive daily";
export const applyFieldDailyHoursValue = (h: number) => `${h} hours / day`;
export const applyFieldDays = "Days per week";
export const applyFieldZones = "Zones you mainly drive in";
export const applyFieldApps = "Apps you use (optional)";
export const applyFieldAppsNote = "Helps us understand the driver community";
export const applyFieldReferral = "Referred by (optional)";
export const applyFieldReferralNote = "They'll earn LKR 1,500 when you join";

export const applyFieldBank = "Bank name";
export const applyFieldAccount = "Account number";
export const applyFieldAccountNote = "Used only to send your monthly payment on the 5th";
export const applyFieldAccountName = "Account holder name";
export const applyFieldAccountNameNote = "Must match your NIC name for transfer verification";
export const applyFieldHolderPlaceholder = "Name as it appears on your bank account";

export const applySummaryName = "NAME";
export const applySummaryNic = "NIC";
export const applySummaryVehicle = "VEHICLE";
export const applySummaryZones = "ZONES";
export const applySummaryBank = "BANK";
export const applySummaryEarnings = (h: number, total: string) =>
  `Based on ${h} hours/day → LKR ${total}/month estimated`;

export const applyProgressAbout = "About you";
export const applyProgressVehicle = "Vehicle";
export const applyProgressRoutes = "Routes";
export const applyProgressPayment = "Payment";

export const VEHICLE_AGES = [
  "Less than 2 years",
  "2 to 5 years",
  "5 to 10 years",
  "More than 10 years",
] as const;

export const OWNERSHIPS = [
  "I own this vehicle",
  "I rent / lease it",
  "Family-owned, I operate it",
] as const;

export const EXPERIENCES = [
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "More than 5 years",
] as const;

export const LANGUAGES = ["Sinhala", "Tamil", "English"] as const;

export const DAYS = ["3 to 4 days", "5 days", "6 days", "Every day"] as const;

export const PLATFORMS = ["PickMe", "inDrive", "Both", "Independent"] as const;

export const ZONES = [
  "Fort",
  "Pettah",
  "Kollupitiya",
  "Bambalapitiya",
  "Wellawatte",
  "Dehiwala",
  "Borella",
  "Nugegoda",
  "Rajagiriya",
  "Maharagama",
] as const;

export const BANKS = [
  "Bank of Ceylon",
  "People's Bank",
  "Commercial Bank",
  "Sampath Bank",
  "HNB",
  "Seylan Bank",
  "NDB",
  "Pan Asia Bank",
  "Nations Trust Bank",
  "Other",
] as const;

export const NIC_REGEX = /^\d{12}$|^\d{9}[vVxX]$/;

export const SUBMIT_ENDPOINT =
  "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-application";

export const DRAFT_KEY = "mydiio_drv_app";
