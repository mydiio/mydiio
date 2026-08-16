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

export const privacyEffective = "August 2026";
export const privacyLastReviewed = "August 2026";

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
    body: "From advertisers: business name, contact name, email, WhatsApp number, business type, budget range, campaign goal and creative assets when you create an account. From drivers: full name, NIC number, date of birth, WhatsApp number, vehicle registration, licence details, bank account details and the address of the home depot. From website visitors: only what the browser sends by default (IP, user agent, referrer). From tablets in the field: the GPS coordinates of the device during operating hours, the advertisements that play, the play duration, the vehicle identifier, the device identifier and uptime health signals.",
  },
  {
    id: "how-we-use-your-information",
    number: "04",
    title: "How we use your information",
    body: "For advertisers: to create and serve campaigns, to bill accurately, to report verified plays back to you, and to support you when you write to us. For drivers: to pay you on the 5th of every month, to keep your account secure, to verify that vehicles carrying our screens are operating, and to support you when you reach out. For the platform generally: to operate the network, to detect and prevent fraud or technical faults, and to meet our legal and tax obligations.",
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
    body: "Every time an advertisement plays on a mydiio screen, our system records an impression log containing the advertisement identifier, the vehicle identifier, the timestamp, the GPS coordinates, and the play duration. This data is the foundation of mydiio's radical transparency commitment. Advertisers see exactly which vehicles ran their ad, where and when, in their weekly report.",
  },
  {
    id: "how-long-we-keep-your-data",
    number: "07",
    title: "How long we keep your data",
    body: "We keep driver account and payment records for as long as required by Sri Lankan tax law, typically six years from the last transaction. Campaign records, including impression logs, are kept for two years from the end of the campaign. Personal information that is no longer required is deleted securely from our systems.",
  },
  {
    id: "who-we-share-data-with",
    number: "08",
    title: "Who we share data with",
    body: "We do not sell personal data. We share data only with service providers who process it on our behalf under data protection agreements, with government authorities or law enforcement when required by applicable Sri Lankan law, and with advertisers in the form of aggregated, anonymised performance reports. Campaign impression data is shared with the specific advertiser whose campaign ran.",
  },
  {
    id: "security",
    number: "09",
    title: "Security",
    body: "We use encryption in transit and at rest, role-based access controls, and monitored infrastructure. No system is perfectly secure. If you believe your account has been compromised, contact us immediately at mydiiomedia@gmail.com.",
  },
  {
    id: "your-rights",
    number: "10",
    title: "Your rights",
    body: "You have the right to access the personal data we hold about you, to correct inaccurate data, to request deletion of data that is no longer required for the purpose it was collected, to withdraw consent where processing is based on consent, and to ask questions or raise concerns about how your data is used. To exercise any of these rights, contact us at mydiiomedia@gmail.com. We will respond to all valid requests within 30 days.",
  },
  {
    id: "cookies-and-tracking",
    number: "11",
    title: "Cookies and tracking",
    body: "Our public website (mydiio.com) uses only the cookies necessary for the site to function. We do not currently use advertising trackers or third-party analytics cookies. If this changes, we will update this policy and notify registered users. Our portal applications use session cookies to keep you logged in; clearing them will sign you out.",
  },
  {
    id: "children",
    number: "12",
    title: "Children",
    body: "Our portals and services are not directed at or intended for anyone under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe we have inadvertently collected such data, please contact us so we can delete it. All advertising content displayed on our screens is suitable for a general audience.",
  },
  {
    id: "changes-to-this-policy",
    number: "13",
    title: "Changes to this policy",
    body: "We may update this policy as our platform evolves. When we make meaningful changes, we will notify you by email (for registered users) and post a notice on the website. The updated policy will show a new effective date at the top of this page. Continuing to use our services after a policy update means you accept the new version.",
  },
  {
    id: "contact-us",
    number: "14",
    title: "Contact us",
    body: "For privacy questions, to exercise your rights, or to report a concern: Email: mydiiomedia@gmail.com. Phone / WhatsApp: 070 747 1002. Website: mydiio.com. Start Smart Technologies Private Limited, trading as mydiio, Colombo, Sri Lanka.",
  },
];
