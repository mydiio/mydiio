// src/v2/privacy/privacyContent.ts
// Privacy policy copy distilled from the legacy /privacy route. Source of truth:
//   /Users/Rukshan/mydiio-website/src/routes/privacy.tsx (preserved in
//   /tmp/privacy-legacy-backup.tsx).

export type PrivacySection = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export const privacyEffective = "10 October 2026";
export const privacyLastReviewed = "10 October 2026";

export const privacyHeroEyebrow = "Privacy policy";
export const privacyHeroHeading = "Your information, treated carefully.";
export const privacyHeroBody =
  "Plain language. Short sentences. No legal theatre. This is how mydiio collects, uses and protects the information you give us.";

export const privacySections: PrivacySection[] = [
  {
    id: "who-we-are",
    number: "01",
    title: "Who we are",
    body: "Start Smart Technologies Private Limited, trading as mydiio, operates Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people. We place Android tablet screens inside Colombo tuk-tuks. Passengers see advertisements from local businesses; advertisers manage campaigns; drivers earn additional monthly income for keeping the screen powered and on-route.",
  },
  {
    id: "who-this-policy-covers",
    number: "02",
    title: "Who this policy covers",
    body: "This policy applies to four groups of people who interact with mydiio: passengers who see content on the screens, advertisers who run campaigns through our portals, drivers who carry the screens in their vehicles, and anyone who visits mydiio.com or contacts our team.",
  },
  {
    id: "information-we-collect",
    number: "03",
    title: "Information we collect",
    body: "From advertiser enquiries: business and contact name, email or WhatsApp (or both), business type, budget, package interest, campaign goal, creative readiness and referral information. From initial driver enquiries: contact details, preferred language, vehicle registration, make/model, manufacture year, ownership, condition and maintenance history, routes, days and hours. After initial screening, we request eligibility documents; identity and bank details are collected later during onboarding. From contact and partnership enquiries: contact details, message, organisation, fleet size/types and operating areas as supplied. From website enquiries: source and landing page paths, supplied marketing campaign tags, selected package and successful submission record. Our hosting systems also process IP and browser information for security and rate limiting. From tablets in the field: GPS coordinates during operating hours, attempted and completed advertisement plays, play duration, vehicle and device identifiers, and uptime health signals.",
  },
  {
    id: "how-we-use-your-information",
    number: "04",
    title: "How we use your information",
    body: "For advertisers: to create and serve campaigns, to bill accurately, to report completed delivery with GPS and movement evidence, and to support you when you write to us. For drivers: to pay you within seven days after month-end, to maintain payment and operational records, to verify that vehicles carrying our screens are operating, and to support you when you reach out. For the platform generally: to operate the network, to detect and prevent fraud or technical faults, and to meet our legal and tax obligations.",
  },
  {
    id: "gps-and-location-data",
    number: "05",
    title: "GPS and location data",
    body: "Location data is central to what mydiio does. Our platform records the GPS coordinates of tablet devices in our fleet during operating hours. This data is tied to the vehicle and device identifier, not to your personal identity as an individual. We collect it to verify that campaigns ran, to pay drivers correctly, and to operate the network. We do not use it to build passenger profiles.",
  },
  {
    id: "advertising-and-impression-data",
    number: "06",
    title: "Advertising and impression data",
    body: "When an advertisement attempts to play, our system records delivery evidence such as the advertisement and vehicle identifiers, timestamp, available GPS evidence, screen state, elapsed play duration and completion result. Accepted completed plays, plays verified while moving and rejected attempts are reported separately. These records describe campaign delivery; they do not identify a passenger or prove that a unique person viewed an advertisement.",
  },
  {
    id: "attention-insights-pilot",
    number: "07",
    title: "Attention Insights pilot",
    body: "Attention Insights is not activated when an advertiser registers interest. If a separately approved pilot is introduced, compatible tablets will estimate passenger presence and whether someone appeared to look toward the screen on the device itself. The driver must be physically excluded from the camera field of view. The pilot will not use facial recognition, identify people, infer demographics or emotions, create biometric templates, or store or transmit raw camera images. Only aggregate, non-identifying campaign trends may leave the device. A passenger notice, retention rules, minimum reporting thresholds, hardware opt-out procedure, privacy review and calibration must be approved before activation.",
  },
  {
    id: "how-long-we-keep-your-data",
    number: "08",
    title: "How long we keep your data",
    body: "We keep driver account and payment records for as long as required by Sri Lankan tax law, typically six years from the last transaction. Campaign records, including impression logs, are kept for two years from the end of the campaign. Personal information that is no longer required is deleted securely from our systems.",
  },
  {
    id: "who-we-share-data-with",
    number: "09",
    title: "Who we share data with",
    body: "We do not sell personal data. We share data only with service providers who process it on our behalf under data protection agreements, with government authorities or law enforcement when required by applicable Sri Lankan law, and with advertisers in the form of aggregated, anonymised performance reports. Campaign impression data is shared with the specific advertiser whose campaign ran.",
  },
  {
    id: "security",
    number: "10",
    title: "Security",
    body: "We use encryption in transit and at rest, role-based access controls, and monitored infrastructure. No system is perfectly secure. If you believe your account has been compromised, contact us immediately using the contact form at /contact.",
  },
  {
    id: "your-rights",
    number: "11",
    title: "Your rights",
    body: "You have the right to access the personal data we hold about you, to correct inaccurate data, to request deletion of data that is no longer required for the purpose it was collected, to withdraw consent where processing is based on consent, and to ask questions or raise concerns about how your data is used. To exercise any of these rights, use our contact form at /contact and describe your privacy enquiry or personal-data request. We will respond to all valid requests within 30 days.",
  },
  {
    id: "cookies-and-tracking",
    number: "12",
    title: "Cookies and tracking",
    body: "Our website uses no third-party analytics, advertising pixels or session recordings. We retain marketing campaign labels and landing-page paths in session storage to attach them to an enquiry; this is cleared when the browsing session ends. Driver language preference is stored locally until cleared. Submitted enquiry attribution is stored with the enquiry in our own backend, with access limited to authorised staff. Form data is not sent to a translation service. Security controls include submission rate limiting and spam checks. Our portal applications use session cookies to keep you logged in; clearing them will sign you out.",
  },
  {
    id: "children",
    number: "13",
    title: "Children",
    body: "Our portals and services are not directed at or intended for anyone under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe we have inadvertently collected such data, please contact us so we can delete it. All advertising content displayed on our screens is suitable for a general audience.",
  },
  {
    id: "changes-to-this-policy",
    number: "14",
    title: "Changes to this policy",
    body: "We may update this policy as our platform evolves. When we make meaningful changes, we will notify you by email (for registered users) and post a notice on the website. The updated policy will show a new effective date at the top of this page. Continuing to use our services after a policy update means you accept the new version.",
  },
  {
    id: "contact-us",
    number: "15",
    title: "Contact us",
    body: "For all privacy enquiries, requests to exercise your data rights, or concerns about your personal data, please use our contact form at /contact. Mention privacy in your message so we can direct your enquiry to the right person. Start Smart Technologies Private Limited, trading as mydiio, Colombo, Sri Lanka.",
  },
];
