import {
  activationPolicy,
  refundPolicy,
  renewalPolicy,
  shortfallPolicy,
  pioneerPolicy,
  joiningPolicy,
} from "../commercial/policy";
// src/v2/terms/termsContent.ts
// Terms and conditions copy distilled from the legacy /terms route.

export const termsEffective = "10 October 2026";
export const termsVersion = "2.0";

export const termsHeroEyebrow = "Terms and Conditions";
export const termsHeroHeading = "The rules of using mydiio.";
export const termsHeroBody =
  "Plain language. Short sentences. No legal theatre. These terms govern your use of the mydiio platform, portals, and services, and they apply to advertisers, driver partners, and website visitors.";

export const termsIntro =
  "These terms govern your use of the mydiio platform, portals, and services. They apply to advertisers, driver partners, and website visitors. Please read them before registering, signing a contract, or submitting any form. If you do not agree with these terms, do not use our services. If anything is unclear, contact us before proceeding.";

export type TermsBlock =
  | { kind: "heading"; body: string }
  | { kind: "body"; body: string }
  | { kind: "list"; items: string[] };

export type TermsSection = {
  id: string;
  number: string;
  title: string;
  blocks: TermsBlock[];
};

export const termsSections: TermsSection[] = [
  {
    id: "definitions",
    number: "01",
    title: "Definitions",
    blocks: [
      {
        kind: "body",
        body: "Throughout these terms, the following words have the following meanings:",
      },
      {
        kind: "list",
        items: [
          "“mydiio”, Start Smart Technologies Private Limited, trading as mydiio, the company that operates the platform.",
          "“Platform”, the four connected surfaces used to operate mydiio: the Eagle Eye admin dashboard, the Advertiser Portal, the Tablet Player, and the public website at mydiio.com. Driver operations and payment records are managed by the mydiio team without a driver advertising login or shift control.",
          "“Advertiser”, any business or individual who registers to display advertising on the mydiio network.",
          "“Driver partner”, any tuk-tuk driver who joins the mydiio programme and hosts a tablet screen in their vehicle.",
          "“Creative”, any video or image file uploaded by an advertiser for display on mydiio screens.",
          "“Campaign”, an active or scheduled advertising run with defined start and end dates, assigned vehicles, and one or more creatives.",
          "“Impression”, an accepted completed play of a creative on a mydiio screen with the delivery evidence required by the campaign agreement. It is a delivery record, not a claim that a unique passenger viewed the creative.",
          "“Pioneer tier”, a limited launch package with agreed live coverage, a three-month minimum and twelve-month price protection, limited to ten active advertisers.",
          "“Reservation deposit”, the LKR 10,000 advertiser reservation credited to the first invoice. Driver joining fees are separate and governed by Section 5.",
          "“Agreement”, any written contract signed separately between mydiio and an advertiser or driver partner, which supplements and incorporates these terms.",
        ],
      },
    ],
  },
  {
    id: "acceptance",
    number: "02",
    title: "Acceptance of Terms",
    blocks: [
      {
        kind: "body",
        body: "By registering on any mydiio portal, submitting a waitlist or driver interest form, signing a driver or advertiser agreement, or otherwise using our services, you confirm that:",
      },
      {
        kind: "list",
        items: [
          "You have read and understood these terms",
          "You are at least 18 years old",
          "You have the legal authority to enter into a binding agreement (and, if acting on behalf of a business, that you have the authority to bind that business)",
          "All information you provide to us is accurate and complete",
        ],
      },
    ],
  },
  {
    id: "service",
    number: "03",
    title: "The mydiio Service",
    blocks: [
      {
        kind: "body",
        body: "mydiio provides Sri Lanka’s first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people. Advertisers pay to display video or image advertisements on Android tablet screens installed in partner tuk-tuks operating in Colombo. Advertisers receive completed-play records with GPS evidence and separate movement verification. Driver partners receive monthly payments in exchange for hosting and maintaining the tablet screen in their vehicle.",
      },
      { kind: "heading", body: "Current platform status" },
      {
        kind: "body",
        body: "Reservations are open for our planned November 2026 launch in Colombo. Actual coverage, vehicle allocation and dates are confirmed before booking. Future vehicle types and planned packages are not current availability commitments.",
      },
      { kind: "heading", body: "No guarantee of specific reach" },
      {
        kind: "body",
        body: "We record attempted and completed play events. Contracted delivery is counted only when the agreed completion, screen-state and fresh-GPS evidence requirements are met. Plays verified while moving are reported separately. We do not guarantee a minimum number of passengers who will view any advertisement. Delivery records are not unique-viewer counts.",
      },
    ],
  },
  {
    id: "advertiser-terms",
    number: "04",
    title: "Advertiser Terms",
    blocks: [
      { kind: "heading", body: "Registration and account" },
      {
        kind: "body",
        body: "Advertisers must provide accurate business and contact information at registration. You are responsible for keeping your account credentials secure. You must not share your portal login with anyone outside your business. You are responsible for all activity that occurs under your account.",
      },
      { kind: "heading", body: "Campaign tiers and pricing" },
      {
        kind: "body",
        body: "mydiio offers the following advertising tiers. Pricing and terms are confirmed in your written agreement:",
      },
      {
        kind: "list",
        items: [
          "Roamer: LKR 25,000/month; 500 total screen minutes/month; up to 5 accepted vehicles; 3-month minimum",
          "Pioneer: LKR 85,000/month; 2,000 total screen minutes/month; agreed live coverage; 3-month minimum; 12-month price protection; maximum 10 active advertisers",
          "Voyager (planned): LKR 150,000/month; 5,000 total screen minutes/month; up to 15 accepted vehicles; 3-month minimum",
          "Horizon (planned): LKR 250,000/month; 10,000 total screen minutes/month; up to 25 accepted vehicles; 3-month minimum",
          "Spark (planned): LKR 12,000 total; 200 total screen minutes; up to 5 vehicles; 7 days from activation",
          "Blast (planned): LKR 33,000 total; 600 total screen minutes; up to 10 vehicles; 14 days from activation",
          "Surge (planned): LKR 40,000 total; 800 total screen minutes; up to 25 vehicles; 30 days from activation",
        ],
      },
      {
        kind: "body",
        body: "Burst packages do not carry category exclusivity. They are rotated into the playlist to fill unused screen time and are not guaranteed fixed scheduling.",
      },
      { kind: "heading", body: "Attention Insights pilot" },
      {
        kind: "body",
        body: "Attention Insights is an optional pilot add-on and is not activated by registering interest. If offered, availability and final terms require a separate written pilot confirmation, compatible vehicle hardware, privacy review, approved passenger notice, camera placement validation and calibration. Outputs are aggregate estimates for campaign optimization. They are not facial recognition, identity, demographic or emotion profiles, guaranteed views, unique-person counts, or the billing currency for your contracted delivery.",
      },
      { kind: "heading", body: "Pioneer coverage and price protection" },
      {
        kind: "body",
        body: pioneerPolicy,
      },
      { kind: "heading", body: "Creative submission and review" },
      {
        kind: "body",
        body: "Advertisers supply compliant creative and approve the final version before scheduling. Submit files at least three working days before the agreed start. Design and substantial edits are charged separately after agreement on scope and price. Review is required; no fixed 72-hour activation guarantee applies. Static-image display duration is agreed in the campaign order.",
      },
      { kind: "heading", body: "Advertiser deposit" },
      {
        kind: "body",
        body: refundPolicy,
      },
      { kind: "heading", body: "Campaign changes and cancellations" },
      {
        kind: "body",
        body: renewalPolicy,
      },
      { kind: "heading", body: "Activation and payment" },
      {
        kind: "body",
        body:
          activationPolicy +
          " No free trial is offered. All prices exclude applicable taxes. Burst packages are planned and, when available, require full payment before activation. Registering interest in a planned package requires no deposit.",
      },
    ],
  },
  {
    id: "driver-terms",
    number: "05",
    title: "Driver Partner Terms",
    blocks: [
      { kind: "heading", body: "Written agreement" },
      {
        kind: "body",
        body: "A written driver agreement is required before installation. Applicants provide contact, vehicle and route details initially. Identity and bank details are collected only after initial acceptance; eligibility documents are requested after screening. Vehicles should normally be no more than 15 years old by manufacture year. Older vehicles require individual review and must explicitly pass safety, condition and installation criteria. All vehicles require inspection.",
      },
      { kind: "heading", body: "Equipment" },
      {
        kind: "body",
        body:
          joiningPolicy +
          " Do not tamper with the equipment. Deliberate damage and equipment return obligations are governed by the written agreement; no driver deposit-forfeiture schedule applies.",
      },
      { kind: "heading", body: "Uptime obligations" },
      {
        kind: "body",
        body: "Keep equipment ready during normal passenger service. Bonus accrues proportionately from the first eligible service hour, up to LKR 2,000 at 260 eligible hours in a month; reasonable passenger-service waiting time counts. There is no speed or distance reward and no minimum service-hour requirement for the base. Technical faults outside your control do not reduce your protected base. Report equipment faults promptly.",
      },
      { kind: "heading", body: "Monitoring" },
      {
        kind: "body",
        body: "mydiio monitors five signals simultaneously: screen on/off status, GPS location (every 5 minutes), ad play logs (per ad play), device online status (continuous), and remote screenshots (every 30 minutes during operating hours). All monitoring is disclosed in advance and is a core condition of the partnership.",
      },
      { kind: "heading", body: "Compliance system" },
      {
        kind: "body",
        body: "mydiio operates a graduated compliance system for screen offline events, moving from Stage 0 (automated technical check) through to Stage 4 (permanent removal from the programme). All compliance decisions above Stage 1 are reviewed by a human member of the mydiio operations team before any penalty is applied.",
      },
      { kind: "heading", body: "Payment" },
      {
        kind: "body",
        body: "Base pay is LKR 4,000 per month, with a proportionate performance bonus of up to LKR 2,000 based on verified eligible service hours. Payment is made within seven days after month-end with a breakdown. The base is protected for downtime caused by mydiio.",
      },
      { kind: "heading", body: "Driver joining fee" },
      { kind: "body", body: joiningPolicy },
      { kind: "heading", body: "Referral programme" },
      {
        kind: "body",
        body: "A referral bonus of LKR 1,500 is paid once the driver you refer completes 30 consecutive active days on the programme with their screen installed. mydiio reserves the right to verify referral activity and to decline referrals made in bad faith.",
      },
    ],
  },
  {
    id: "content-standards",
    number: "06",
    title: "Content Standards",
    blocks: [
      {
        kind: "body",
        body: "All creatives submitted to mydiio must comply with the following standards. Content that violates these standards will be rejected or removed and may result in account suspension. Content rejection or suspension does not override the pre-activation refund rules or agreed delivery remedies.",
      },
      { kind: "heading", body: "Prohibited content:" },
      {
        kind: "list",
        items: [
          "Political content, political party imagery, or content intended to influence any election or political matter",
          "Unverified financial claims (e.g. guaranteed returns on investment, specific earnings projections)",
          "Unverified health or medical claims",
          "Content that promotes illegal products or services under Sri Lankan law",
          "Content that is sexually explicit or suggestive",
          "Content that demeans, mocks, or uses stereotypes related to religion, ethnicity, caste, or gender in a manner likely to cause offence in the context of Sri Lanka’s diverse society",
          "Content targeting children in a manipulative or exploitative manner",
        ],
      },
      { kind: "heading", body: "Your responsibility" },
      {
        kind: "body",
        body: "By submitting a creative, you warrant that you own or have a valid licence for all content within it, all claims made are truthful and can be substantiated, and the creative complies with all applicable Sri Lankan advertising regulations. mydiio’s content review does not substitute for your own legal compliance.",
      },
    ],
  },
  {
    id: "intellectual-property",
    number: "07",
    title: "Intellectual Property",
    blocks: [
      { kind: "heading", body: "Your creatives" },
      {
        kind: "body",
        body: "You retain all intellectual property rights in the advertising creatives you upload. By uploading a creative, you grant mydiio a non-exclusive, royalty-free licence to display, store, compress, and transmit the creative for the purposes of delivering your campaign. This licence ends when your campaign ends.",
      },
      { kind: "heading", body: "mydiio’s intellectual property" },
      {
        kind: "body",
        body: "The mydiio name, logo, brand identity, platform design, software, and all content we produce are owned by mydiio. You may not use our name, logo, or branding for any commercial purpose without our written permission.",
      },
      { kind: "heading", body: "Platform content" },
      {
        kind: "body",
        body: "You may use your own campaign data for your own business purposes. You may not reproduce or sell platform reports or data to third parties.",
      },
    ],
  },
  {
    id: "payments-deposits",
    number: "08",
    title: "Payments and Deposits",
    blocks: [
      { kind: "heading", body: "Payment terms for advertisers" },
      {
        kind: "body",
        body: renewalPolicy,
      },
      { kind: "heading", body: "Refund policy" },
      {
        kind: "body",
        body: refundPolicy + " " + shortfallPolicy,
      },
      { kind: "heading", body: "Price changes" },
      {
        kind: "body",
        body: pioneerPolicy,
      },
    ],
  },
  {
    id: "liability",
    number: "09",
    title: "Limitation of Liability",
    blocks: [
      {
        kind: "body",
        body: "mydiio provides its services on an “as is” basis. To the fullest extent permitted by Sri Lankan law:",
      },
      {
        kind: "list",
        items: [
          "mydiio is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform",
          "mydiio’s total liability to any advertiser is limited to the fees paid by that advertiser in the three months preceding the claim",
          "mydiio is not liable for the content of advertisements, which is the sole mechanism of the advertiser who submitted them",
          "Connectivity or hardware failures do not remove the agreed remedy for undelivered campaign minutes",
        ],
      },
      {
        kind: "body",
        body: "Nothing in these terms limits mydiio’s liability for fraud, gross negligence, or any liability that cannot be excluded under applicable law.",
      },
    ],
  },
  {
    id: "availability",
    number: "10",
    title: "Platform Availability",
    blocks: [
      {
        kind: "body",
        body: "We aim to keep the platform available at all times but do not guarantee uninterrupted access. Planned maintenance will be communicated in advance where possible.",
      },
      {
        kind: "body",
        body: "The tablet player in our vehicles operates offline-first, meaning that even when a tablet temporarily loses internet connectivity, it continues to play the last synced ad playlist from its local cache.",
      },
    ],
  },
  {
    id: "termination",
    number: "11",
    title: "Termination",
    blocks: [
      { kind: "heading", body: "Termination by you" },
      {
        kind: "body",
        body:
          renewalPolicy +
          " Driver partners may exit under their written agreement; the joining-fee rule in Section 5 applies.",
      },
      { kind: "heading", body: "Termination by mydiio" },
      {
        kind: "body",
        body: "mydiio may suspend or terminate your account or partnership without notice if you:",
      },
      {
        kind: "list",
        items: [
          "Breach any material term of these terms or your signed agreement",
          "Submit creatives that violate our content standards",
          "Deliberately tamper with, damage, or misuse mydiio equipment",
          "Provide false information to mydiio",
          "Use the platform for any illegal purpose",
        ],
      },
      { kind: "heading", body: "Effect of termination" },
      {
        kind: "body",
        body: "On termination of an advertiser account, all active campaigns are cancelled, creatives are removed from rotation, and portal access is revoked. On termination of a driver partnership, the tablet and all equipment must be returned to mydiio within 14 days. Failure to return equipment may result in legal action to recover the replacement cost.",
      },
    ],
  },
  {
    id: "disputes",
    number: "12",
    title: "Disputes",
    blocks: [
      {
        kind: "body",
        body: "If you have a dispute with mydiio, please contact us first using the contact form at /contact. We will try to resolve any dispute informally within 14 days of receiving your written complaint.",
      },
      {
        kind: "body",
        body: "If informal resolution is not possible, disputes will be referred to mediation under the rules of the Institute for the Development of Commercial Law and Practice (ICLP) of Sri Lanka before any litigation is commenced, unless urgent injunctive or interim relief is required.",
      },
      {
        kind: "body",
        body: "These terms and any dispute arising from them are governed by the law of Sri Lanka. The courts of Sri Lanka have exclusive jurisdiction.",
      },
    ],
  },
  {
    id: "changes",
    number: "13",
    title: "Changes to These Terms",
    blocks: [
      {
        kind: "body",
        body: "We may update these terms as the platform grows and as legal or regulatory requirements change. When we make meaningful changes, we will notify registered users by email at least 14 days before the updated terms take effect. Updates do not override an existing campaign order, the stated refund rights, or Pioneer price protection and its separate 30-day price-change notice.",
      },
      {
        kind: "body",
        body: "Changes to driver compensation structures are governed by individual written agreements and require separate written consent from affected driver partners.",
      },
    ],
  },
  {
    id: "governing-law",
    number: "14",
    title: "Governing Law and Jurisdiction",
    blocks: [
      {
        kind: "body",
        body: "These terms are governed by and construed in accordance with the laws of Sri Lanka, including the Consumer Affairs Authority Act, the Intellectual Property Act, and any applicable data protection regulations. Nothing in these terms is intended to exclude any right that you have under mandatory Sri Lankan law.",
      },
    ],
  },
  {
    id: "contact",
    number: "15",
    title: "Contact Us",
    blocks: [
      {
        kind: "body",
        body: "For any question about these terms, to report a breach, or to serve formal legal notice:",
      },
      {
        kind: "list",
        items: [
          "Contact form: https://mydiio.com/contact",
          "Phone / WhatsApp: 070 747 1002",
          "Website: mydiio.com",
          "Start Smart Technologies Private Limited, trading as mydiio, Colombo, Sri Lanka",
          "Registered under the Companies Act No. 7 of 2007 of Sri Lanka",
        ],
      },
      {
        kind: "body",
        body: "These documents do not constitute legal advice. mydiio recommends engaging a Sri Lanka-qualified legal practitioner before finalising any contracts or agreements.",
      },
    ],
  },
];
