// src/v2/terms/termsContent.ts
// Terms and conditions copy distilled from the legacy /terms route.

export const termsEffective = "August 2026";
export const termsVersion = "1.0";

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
          "“Platform”, all five portals: the Eagle Eye admin dashboard, the Advertiser Portal, the Driver Portal, the Tablet Player, and the public website at mydiio.com.",
          "“Advertiser”, any business or individual who registers to display advertising on the mydiio network.",
          "“Driver partner”, any tuk-tuk driver who joins the mydiio programme and hosts a tablet screen in their vehicle.",
          "“Creative”, any video or image file uploaded by an advertiser for display on mydiio screens.",
          "“Campaign”, an active or scheduled advertising run with defined start and end dates, assigned vehicles, and one or more creatives.",
          "“Impression”, a single verified play of a creative on a mydiio screen, logged with a GPS location, timestamp, and play duration.",
          "“Pioneer tier”, the founding advertiser package offering twelve-month neighbourhood category exclusivity within a corridor defined at the point of signing, a fixed per-minute rate for the life of the subscription, and limited to ten advertisers in total.",
          "“Deposit”, the refundable security deposit paid by advertisers or driver partners at the commencement of their relationship with mydiio.",
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
        body: "mydiio provides Sri Lanka’s first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people. Advertisers pay to display video or image advertisements on Android tablet screens installed in partner tuk-tuks operating in Colombo. Advertisers receive GPS-verified impression data. Driver partners receive monthly payments in exchange for hosting and maintaining the tablet screen in their vehicle.",
      },
      { kind: "heading", body: "Current platform status" },
      {
        kind: "body",
        body: "mydiio is currently operating in a pilot phase with up to 10 vehicles. Year 1 targets 50 vehicles across Colombo. The platform is operational but actively developing. Features may be added, changed, or temporarily unavailable as the platform grows.",
      },
      { kind: "heading", body: "No guarantee of specific reach" },
      {
        kind: "body",
        body: "We provide verified impression data for every ad play that occurs. We do not guarantee a minimum number of passengers who will view any given advertisement. Impression counts reflect verified ad plays, not estimated viewer counts.",
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
          "Roamer, LKR 25,000 per month, minimum 3-month commitment, up to 5 vehicles",
          "Voyager, LKR 38,000 per month, minimum 3-month commitment, up to 15 vehicles",
          "Pioneer, LKR 25,000 to LKR 35,000 per month, minimum 3-month commitment, full fleet, twelve-month neighbourhood corridor category exclusivity, fixed per-minute rate for the subscription lifetime, limited to 10 spots ever",
          "Horizon, LKR 65,000 and above, minimum 3-month commitment, custom terms, 15 to 100+ vehicles",
          "Burst Spark, LKR 5,000 for 500 impression minutes, up to 5 vehicles, 7-day validity",
          "Burst Blast, LKR 18,000 for 2,000 impression minutes, up to 10 vehicles, 14-day validity",
          "Burst Surge, LKR 40,000 for 5,000 impression minutes, full fleet, 30-day validity",
        ],
      },
      {
        kind: "body",
        body: "Burst packages do not carry category exclusivity. They are rotated into the playlist to fill unused screen time and are not guaranteed fixed scheduling.",
      },
      { kind: "heading", body: "Pioneer category exclusivity" },
      {
        kind: "body",
        body: "Pioneer advertisers receive twelve-month neighbourhood category exclusivity within a corridor defined at the point of signing. The per-minute rate is fixed for the life of the subscription, but the exclusivity period itself is twelve months from the contract start date, not indefinite, and it is corridor-based, not city-wide. After the twelve-month exclusivity period, mydiio may accept new advertisers from the same category within the same corridor. If your contract lapses for more than 30 days without renewal, the category becomes open for new applications in that corridor.",
      },
      { kind: "heading", body: "Creative submission and review" },
      {
        kind: "body",
        body: "All creatives must be submitted through the Advertiser Portal. No creative will go live until reviewed and approved by our content team, typically within one business day. By submitting a creative, you confirm that you own or have the legal right to use all content within it, and that the creative complies with the content standards in Section 6.",
      },
      { kind: "heading", body: "Advertiser deposit" },
      {
        kind: "body",
        body: "A refundable deposit of LKR 5,000 is required to confirm your spot on the waitlist or to confirm a subscription tier booking. The deposit is credited against your first invoice. If mydiio is unable to fulfil your booking, the deposit is returned in full. If you cancel after confirming your booking but before your campaign starts, we reserve the right to retain the deposit to cover administrative costs.",
      },
      { kind: "heading", body: "Campaign changes and cancellations" },
      {
        kind: "body",
        body: "You may pause or modify your campaign by contacting us at mydiiomedia@gmail.com. Pause requests take up to 24 hours to take effect. Minimum commitment periods still apply during a pause unless otherwise agreed in writing. Campaigns cannot be cancelled mid-contract without forfeiting the remaining contract value unless mydiio fails to deliver the service.",
      },
      { kind: "heading", body: "Free trial" },
      {
        kind: "body",
        body: "Where a free trial is offered, it is available to subscription tier advertisers for the first 7 days of their first campaign.",
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
        body: "No screen will be installed in your vehicle until you have signed a written driver partner agreement with mydiio. That agreement governs the specific terms of your partnership including your group designation, deposit amount, bonus structure, and compliance obligations. These terms apply alongside and supplement that agreement.",
      },
      { kind: "heading", body: "Equipment" },
      {
        kind: "body",
        body: "mydiio supplies the Android tablet and associated mounting hardware. The equipment remains the property of mydiio at all times. You must not remove, modify, cover, damage, or tamper with the equipment. Any damage caused by deliberate misuse may result in deductions from your deposit or the cost of replacement being charged to you.",
      },
      { kind: "heading", body: "Uptime obligations" },
      {
        kind: "body",
        body: "You are expected to keep the screen powered on and active during your normal operating hours. The route bonus of LKR 2,000 per month requires an average of 8 or more active screen hours per day across the calendar month. You will never be penalised for technical faults that are outside your control. If the screen or device malfunctions, contact us immediately and we will arrange repair or replacement.",
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
        body: "Base pay of LKR 6,000 per month is unconditional and paid by bank transfer on the 5th of each calendar month without exception. Route bonus and referral bonus payments are made at the same time once eligibility is confirmed. If the 5th falls on a bank holiday, payment will be made on the preceding banking day.",
      },
      { kind: "heading", body: "Driver deposit and exit terms" },
      {
        kind: "list",
        items: [
          "Exit before 6 months of continuous participation, deposit forfeited in full",
          "Exit between 6 and 12 months, 50% of deposit returned within 30 days of exit date",
          "Exit after 12 months of continuous participation, full deposit returned within 30 days",
          "Permanent removal under Stage 4 of the compliance system, deposit forfeited",
        ],
      },
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
        body: "All creatives submitted to mydiio must comply with the following standards. Content that violates these standards will be rejected or removed and may result in account suspension without refund.",
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
        body: "Invoices are issued in Sri Lankan Rupees (LKR). Payment is due within 14 days of the invoice date unless otherwise agreed in writing. Late payments may result in the suspension of your campaign until the outstanding balance is settled.",
      },
      { kind: "heading", body: "Refund policy" },
      {
        kind: "body",
        body: "The LKR 5,000 advertiser deposit is fully refundable if mydiio cannot fulfil your booking. Monthly campaign fees are non-refundable once a campaign has gone live, except in cases where mydiio fails to deliver the agreed service. In such cases, a credit or partial refund proportional to the shortfall will be applied.",
      },
      { kind: "heading", body: "Price changes" },
      {
        kind: "body",
        body: "Pioneer tier advertisers hold a fixed per-minute rate for the life of their active subscription as long as they renew without a gap exceeding 30 days. Any price change for other tiers will be communicated at least 30 days before it takes effect for existing customers.",
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
          "mydiio is not liable for losses arising from connectivity failures, hardware malfunctions, or circumstances outside our reasonable control",
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
        body: "Advertisers may request termination of their account. Termination does not waive any outstanding contractual obligations, including minimum commitment period fees. Driver partners may exit the programme subject to the deposit forfeiture terms in Section 5.",
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
        body: "If you have a dispute with mydiio, please contact us first at mydiiomedia@gmail.com. We will try to resolve any dispute informally within 14 days of receiving your written complaint.",
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
        body: "We may update these terms as the platform grows and as legal or regulatory requirements change. When we make meaningful changes, we will notify registered users by email at least 14 days before the updated terms take effect.",
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
          "Email: mydiiomedia@gmail.com",
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
