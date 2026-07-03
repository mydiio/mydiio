import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/terms")({
 component: TermsPage,
 head: () => ({
 meta: [
 { title: "Terms and Conditions, mydiio" },
 { name: "description", content: "mydiio terms and conditions governing use of the platform, portals, and services for advertisers, driver partners, and website visitors." },
 { property: "og:title", content: "Terms and Conditions, mydiio" },
 { property: "og:description", content: "Terms governing use of the mydiio platform, portals, and services." },
 { property: "og:url", content: "https://mydiio.com/terms" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/terms" }],
 }),

});

const ink = "#1A1A18";
const amber = "#F5A623";
const cream = "#FDFAF3";
const muted = "#6B6B68";
const borderColor = "#E8E4D8";

function SectionNumber({ n }: { n: string }) {
 return (
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 letterSpacing: "0.14em",
 textTransform: "uppercase",
 color: muted,
 fontWeight: 700,
 }}
 >
 Section {n}
 </span>
 );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
 return (
 <h2
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: "clamp(22px, 2.6vw, 30px)",
 fontWeight: 700,
 color: ink,
 lineHeight: 1.2,
 margin: "10px 0 0",
 }}
 >
 {children}
 </h2>
 );
}

function BodyText({ children }: { children: React.ReactNode }) {
 return (
 <p
 style={{
 fontFamily: "'DM Sans', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 color: ink,
 lineHeight: 1.65,
 margin: "14px 0 0",
 textAlign: "justify",
 }}
 >
 {children}
 </p>
 );
}

function BulletList({ items }: { items: string[] }) {
 return (
 <ul
 style={{
 listStyle: "none",
 padding: 0,
 margin: "14px 0 0",
 display: "flex",
 flexDirection: "column",
 gap: 10,
 }}
 >
 {items.map((item) => (
 <li
 key={item}
 style={{
 display: "flex",
 gap: 10,
 alignItems: "flex-start",
 fontFamily: "'DM Sans', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 color: ink,
 lineHeight: 1.55,
 textAlign: "justify",
 }}
 >
 <span style={{ color: amber, fontSize: 12, lineHeight: 1.6, flexShrink: 0 }}>●</span>
 <span>{item}</span>
 </li>
 ))}
 </ul>
 );
}

function SubHeading({ children }: { children: React.ReactNode }) {
 return (
 <p
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 fontWeight: 700,
 color: ink,
 margin: "20px 0 0",
 lineHeight: 1.5,
 }}
 >
 {children}
 </p>
 );
}

export default function TermsPage() {
 return (
 <SiteShell accent="amber">
 <main
 style={{
 background: cream,
 padding: `calc(var(--site-nav-height, 72px) + 40px) 24px clamp(64px, 9vh, 112px)`,
 }}
 >
 <div style={{ maxWidth: 800, margin: "0 auto" }}>
 {/* Page header */}
 <div style={{ textAlign: "center" }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 letterSpacing: "0.14em",
 textTransform: "uppercase",
 color: amber,
 fontWeight: 700,
 }}
 >
 Legal Document
 </span>
 <h1
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: "clamp(36px, 5vw, 56px)",
 fontWeight: 700,
 color: ink,
 lineHeight: 1.1,
 letterSpacing: "-0.02em",
 margin: "12px 0 0",
 }}
 >
 Terms and Conditions
 </h1>
 <p
 style={{
 fontFamily: "'DM Sans', sans-serif",
 fontSize: 14,
 color: muted,
 marginTop: 10,
 }}
 >
 Effective date: 12 June 2026 · Version 1.0 · Start Smart Technologies Private Limited, trading as mydiio · Colombo, Sri Lanka
 </p>
 </div>

 <div
 style={{
 width: "100%",
 height: 1,
 background: borderColor,
 margin: "28px 0 32px",
 }}
 />

 {/* Intro banner */}
 <div
 style={{
 background: "#FFF8EE",
 border: "1px solid #F5D48A",
 borderRadius: 8,
 padding: "1.25rem 1.5rem",
 color: "#7A5C0A",
 fontFamily: "'DM Sans', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 lineHeight: 1.65,
 }}
 >
 These terms govern your use of the mydiio platform, portals, and services. They apply to advertisers, driver partners, and website visitors. Please read them before registering, signing a contract, or submitting any form. If you do not agree with these terms, do not use our services. If anything is unclear, contact us before proceeding.
 </div>

 {/* Sections */}
 <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 48 }}>
 {/* SECTION 01 */}
 <section>
 <SectionNumber n="01" />
 <SectionHeading>Definitions</SectionHeading>
 <BodyText>Throughout these terms, the following words have the following meanings:</BodyText>
 <BulletList
 items={[
 '"mydiio", Start Smart Technologies Private Limited, trading as mydiio, the company that operates the platform.',
 '"Platform", all five portals: the Eagle Eye admin dashboard, the Advertiser Portal, the Driver Portal, the Tablet Player, and the public website at mydiio.com.',
 '"Advertiser", any business or individual who registers to display advertising on the mydiio network.',
 '"Driver partner", any tuk-tuk driver who joins the mydiio programme and hosts a tablet screen in their vehicle.',
 '"Creative", any video or image file uploaded by an advertiser for display on mydiio screens.',
 '"Campaign", an active or scheduled advertising run with defined start and end dates, assigned vehicles, and one or more creatives.',
 '"Impression", a single verified play of a creative on a mydiio screen, logged with a GPS location, timestamp, and play duration.',
 '"Pioneer tier", the founding advertiser package offering twelve-month neighbourhood category exclusivity within a corridor defined at the point of signing, a fixed per-minute rate for the life of the subscription, and limited to ten advertisers in total.',
 '"Deposit", the refundable security deposit paid by advertisers or driver partners at the commencement of their relationship with mydiio.',
 '"Agreement", any written contract signed separately between mydiio and an advertiser or driver partner, which supplements and incorporates these terms.',
 ]}
 />
 </section>

 {/* SECTION 02 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="02" />
 <SectionHeading>Acceptance of Terms</SectionHeading>
 <BodyText>
 By registering on any mydiio portal, submitting a waitlist or driver interest form, signing a driver or advertiser agreement, or otherwise using our services, you confirm that:
 </BodyText>
 <BulletList
 items={[
 "You have read and understood these terms",
 "You are at least 18 years old",
 "You have the legal authority to enter into a binding agreement (and, if acting on behalf of a business, that you have the authority to bind that business)",
 "All information you provide to us is accurate and complete",
 ]}
 />
 </section>

 {/* SECTION 03 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="03" />
 <SectionHeading>The mydiio Service</SectionHeading>
 <BodyText>
 mydiio provides a cloud-managed in-vehicle advertising network. Advertisers pay to display video or image advertisements on Android tablet screens installed in partner tuk-tuks operating in Colombo. Advertisers receive GPS-verified impression data. Driver partners receive monthly payments in exchange for hosting and maintaining the tablet screen in their vehicle.
 </BodyText>

 <SubHeading>Current platform status</SubHeading>
 <BodyText>
 mydiio is currently operating in a pilot phase with up to 10 vehicles. Year 1 targets 50 vehicles across Colombo. The platform is operational but actively developing. Features may be added, changed, or temporarily unavailable as the platform grows.
 </BodyText>

 <SubHeading>No guarantee of specific reach</SubHeading>
 <BodyText>
 We provide verified impression data for every ad play that occurs. We do not guarantee a minimum number of passengers who will view any given advertisement. Impression counts reflect verified ad plays, not estimated viewer counts.
 </BodyText>
 </section>

 {/* SECTION 04 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="04" />
 <SectionHeading>Advertiser Terms</SectionHeading>

 <SubHeading>Registration and account</SubHeading>
 <BodyText>
 Advertisers must provide accurate business and contact information at registration. You are responsible for keeping your account credentials secure. You must not share your portal login with anyone outside your business. You are responsible for all activity that occurs under your account.
 </BodyText>

 <SubHeading>Campaign tiers and pricing</SubHeading>
 <BodyText>mydiio offers the following advertising tiers. Pricing and terms are confirmed in your written agreement:</BodyText>
 <BulletList
 items={[
 "Roamer, LKR 25,000 per month, minimum 3-month commitment, up to 5 vehicles",
 "Voyager, LKR 38,000 per month, minimum 6-month commitment, up to 15 vehicles",
 "Pioneer, LKR 25,000 to LKR 35,000 per month, minimum 3-month commitment, full fleet, twelve-month neighbourhood corridor category exclusivity, fixed per-minute rate for the subscription lifetime, limited to 10 spots ever",
 "Horizon, LKR 65,000 and above, custom terms, 15 to 100+ vehicles",
 "Burst Spark, LKR 5,000 for 500 impression minutes, up to 5 vehicles, 7-day validity",
 "Burst Blast, LKR 18,000 for 2,000 impression minutes, up to 10 vehicles, 14-day validity",
 "Burst Surge, LKR 40,000 for 5,000 impression minutes, full fleet, 30-day validity",
 ]}
 />
 <BodyText>
 Burst packages do not carry category exclusivity. They are rotated into the playlist to fill unused screen time and are not guaranteed fixed scheduling.
 </BodyText>

  <SubHeading>Pioneer category exclusivity</SubHeading>
  <BodyText>
  Pioneer advertisers receive twelve-month neighbourhood category exclusivity within a corridor defined at the point of signing. The per-minute rate is fixed for the life of the subscription, but the exclusivity period itself is twelve months from the contract start date, not indefinite, and it is corridor-based, not city-wide. After the twelve-month exclusivity period, mydiio may accept new advertisers from the same category within the same corridor. If your contract lapses for more than 30 days without renewal, the category becomes open for new applications in that corridor.
  </BodyText>

 <SubHeading>Creative submission and review</SubHeading>
 <BodyText>
 All creatives must be submitted through the Advertiser Portal. No creative will go live until reviewed and approved by our content team, typically within one business day. By submitting a creative, you confirm that you own or have the legal right to use all content within it, and that the creative complies with the content standards in Section 6.
 </BodyText>

 <SubHeading>Advertiser deposit</SubHeading>
 <BodyText>
 A refundable deposit of LKR 5,000 is required to confirm your spot on the waitlist or to confirm a subscription tier booking. The deposit is credited against your first invoice. If mydiio is unable to fulfil your booking, the deposit is returned in full. If you cancel after confirming your booking but before your campaign starts, we reserve the right to retain the deposit to cover administrative costs.
 </BodyText>

 <SubHeading>Campaign changes and cancellations</SubHeading>
 <BodyText>
 You may pause or modify your campaign by contacting us at{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: ink, fontWeight: 700 }}>mydiiomedia@gmail.com</a>. Pause requests take up to 24 hours to take effect. Minimum commitment periods still apply during a pause unless otherwise agreed in writing. Campaigns cannot be cancelled mid-contract without forfeiting the remaining contract value unless mydiio fails to deliver the service.
 </BodyText>

 <SubHeading>Free trial</SubHeading>
 <BodyText>
 Where a free trial is offered, it is available to subscription tier advertisers for the first 7 days of their first campaign.
 </BodyText>
 </section>

 {/* SECTION 05 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="05" />
 <SectionHeading>Driver Partner Terms</SectionHeading>

 <SubHeading>Written agreement</SubHeading>
 <BodyText>
 No screen will be installed in your vehicle until you have signed a written driver partner agreement with mydiio. That agreement governs the specific terms of your partnership including your group designation, deposit amount, bonus structure, and compliance obligations. These terms apply alongside and supplement that agreement.
 </BodyText>

 <SubHeading>Equipment</SubHeading>
 <BodyText>
 mydiio supplies the Android tablet and associated mounting hardware. The equipment remains the property of mydiio at all times. You must not remove, modify, cover, damage, or tamper with the equipment. Any damage caused by deliberate misuse may result in deductions from your deposit or the cost of replacement being charged to you.
 </BodyText>

 <SubHeading>Uptime obligations</SubHeading>
 <BodyText>
 You are expected to keep the screen powered on and active during your normal operating hours. The route bonus of LKR 2,000 per month requires an average of 8 or more active screen hours per day across the calendar month. You will never be penalised for technical faults that are outside your control. If the screen or device malfunctions, contact us immediately and we will arrange repair or replacement.
 </BodyText>

 <SubHeading>Monitoring</SubHeading>
 <BodyText>
 mydiio monitors five signals simultaneously: screen on/off status, GPS location (every 5 minutes), ad play logs (per ad play), device online status (continuous), and remote screenshots (every 30 minutes during operating hours). All monitoring is disclosed in advance and is a core condition of the partnership.
 </BodyText>

 <SubHeading>Compliance system</SubHeading>
 <BodyText>
 mydiio operates a graduated compliance system for screen offline events, moving from Stage 0 (automated technical check) through to Stage 4 (permanent removal from the programme). All compliance decisions above Stage 1 are reviewed by a human member of the mydiio operations team before any penalty is applied.
 </BodyText>

 <SubHeading>Payment</SubHeading>
 <BodyText>
 Base pay of LKR 6,000 per month is unconditional and paid by bank transfer on the 5th of each calendar month without exception. Route bonus and referral bonus payments are made at the same time once eligibility is confirmed. If the 5th falls on a bank holiday, payment will be made on the preceding banking day.
 </BodyText>

  <SubHeading>Driver deposit and exit terms</SubHeading>
  <BulletList
    items={[
      "Exit before 6 months of continuous participation, deposit forfeited in full",
      "Exit between 6 and 12 months, 50% of deposit returned within 30 days of exit date",
      "Exit after 12 months of continuous participation, full deposit returned within 30 days",
      "Permanent removal under Stage 4 of the compliance system, deposit forfeited",
    ]}
  />

 <SubHeading>Referral programme</SubHeading>
 <BodyText>
 A referral bonus of LKR 1,500 is paid once the driver you refer completes 30 consecutive active days on the programme with their screen installed. mydiio reserves the right to verify referral activity and to decline referrals made in bad faith.
 </BodyText>
 </section>

 {/* SECTION 06 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="06" />
 <SectionHeading>Content Standards</SectionHeading>
 <BodyText>
 All creatives submitted to mydiio must comply with the following standards. Content that violates these standards will be rejected or removed and may result in account suspension without refund.
 </BodyText>

 <SubHeading>Prohibited content:</SubHeading>
 <BulletList
 items={[
 "Political content, political party imagery, or content intended to influence any election or political matter",
 "Unverified financial claims (e.g. guaranteed returns on investment, specific earnings projections)",
 "Unverified health or medical claims",
 "Content that promotes illegal products or services under Sri Lankan law",
 "Content that is sexually explicit or suggestive",
 "Content that demeans, mocks, or uses stereotypes related to religion, ethnicity, caste, or gender in a manner likely to cause offence in the context of Sri Lanka's diverse society",
 "Content targeting children in a manipulative or exploitative manner",
 ]}
 />

 <SubHeading>Your responsibility</SubHeading>
 <BodyText>
 By submitting a creative, you warrant that you own or have a valid licence for all content within it, all claims made are truthful and can be substantiated, and the creative complies with all applicable Sri Lankan advertising regulations. mydiio's content review does not substitute for your own legal compliance.
 </BodyText>
 </section>

 {/* SECTION 07 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="07" />
 <SectionHeading>Intellectual Property</SectionHeading>

 <SubHeading>Your creatives</SubHeading>
 <BodyText>
 You retain all intellectual property rights in the advertising creatives you upload. By uploading a creative, you grant mydiio a non-exclusive, royalty-free licence to display, store, compress, and transmit the creative for the purposes of delivering your campaign. This licence ends when your campaign ends.
 </BodyText>

 <SubHeading>mydiio's intellectual property</SubHeading>
 <BodyText>
 The mydiio name, logo, brand identity, platform design, software, and all content we produce are owned by mydiio. You may not use our name, logo, or branding for any commercial purpose without our written permission.
 </BodyText>

 <SubHeading>Platform content</SubHeading>
 <BodyText>
 You may use your own campaign data for your own business purposes. You may not reproduce or sell platform reports or data to third parties.
 </BodyText>
 </section>

 {/* SECTION 08 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="08" />
 <SectionHeading>Payments and Deposits</SectionHeading>

 <SubHeading>Payment terms for advertisers</SubHeading>
 <BodyText>
 Invoices are issued in Sri Lankan Rupees (LKR). Payment is due within 14 days of the invoice date unless otherwise agreed in writing. Late payments may result in the suspension of your campaign until the outstanding balance is settled.
 </BodyText>

 <SubHeading>Refund policy</SubHeading>
 <BodyText>
 The LKR 5,000 advertiser deposit is fully refundable if mydiio cannot fulfil your booking. Monthly campaign fees are non-refundable once a campaign has gone live, except in cases where mydiio fails to deliver the agreed service. In such cases, a credit or partial refund proportional to the shortfall will be applied.
 </BodyText>

 <SubHeading>Price changes</SubHeading>
 <BodyText>
 Pioneer tier advertisers hold their contracted rate for the lifetime of their Pioneer designation as long as they renew without a gap exceeding 30 days. Any price change will be communicated at least 30 days before it takes effect for existing customers.
 </BodyText>
 </section>

 {/* SECTION 09 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="09" />
 <SectionHeading>Limitation of Liability</SectionHeading>
 <BodyText>
 mydiio provides its services on an "as is" basis. To the fullest extent permitted by Sri Lankan law:
 </BodyText>
 <BulletList
 items={[
 "mydiio is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform",
 "mydiio's total liability to any advertiser is limited to the fees paid by that advertiser in the three months preceding the claim",
 "mydiio is not liable for the content of advertisements, which is the sole mechanism of the advertiser who submitted them",
 "mydiio is not liable for losses arising from connectivity failures, hardware malfunctions, or circumstances outside our reasonable control",
 ]}
 />
 <BodyText>
 Nothing in these terms limits mydiio's liability for fraud, gross negligence, or any liability that cannot be excluded under applicable law.
 </BodyText>
 </section>

 {/* SECTION 10 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="10" />
 <SectionHeading>Platform Availability</SectionHeading>
 <BodyText>
 We aim to keep the platform available at all times but do not guarantee uninterrupted access. Planned maintenance will be communicated in advance where possible.
 </BodyText>
 <BodyText>
 The tablet player in our vehicles operates offline-first, meaning that even when a tablet temporarily loses internet connectivity, it continues to play the last synced ad playlist from its local cache.
 </BodyText>
 </section>

 {/* SECTION 11 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="11" />
 <SectionHeading>Termination</SectionHeading>

 <SubHeading>Termination by you</SubHeading>
 <BodyText>
 Advertisers may request termination of their account. Termination does not waive any outstanding contractual obligations, including minimum commitment period fees. Driver partners may exit the programme subject to the deposit forfeiture terms in Section 5.
 </BodyText>

 <SubHeading>Termination by mydiio</SubHeading>
 <BodyText>mydiio may suspend or terminate your account or partnership without notice if you:</BodyText>
 <BulletList
 items={[
 "Breach any material term of these terms or your signed agreement",
 "Submit creatives that violate our content standards",
 "Deliberately tamper with, damage, or misuse mydiio equipment",
 "Provide false information to mydiio",
 "Use the platform for any illegal purpose",
 ]}
 />

 <SubHeading>Effect of termination</SubHeading>
 <BodyText>
 On termination of an advertiser account, all active campaigns are cancelled, creatives are removed from rotation, and portal access is revoked. On termination of a driver partnership, the tablet and all equipment must be returned to mydiio within 14 days. Failure to return equipment may result in legal action to recover the replacement cost.
 </BodyText>
 </section>

 {/* SECTION 12 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="12" />
 <SectionHeading>Disputes</SectionHeading>
 <BodyText>
 If you have a dispute with mydiio, please contact us first at{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: ink, fontWeight: 700 }}>mydiiomedia@gmail.com</a>. We will try to resolve any dispute informally within 14 days of receiving your written complaint.
 </BodyText>
 <BodyText>
 If informal resolution is not possible, disputes will be referred to mediation under the rules of the Institute for the Development of Commercial Law and Practice (ICLP) of Sri Lanka before any litigation is commenced, unless urgent injunctive or interim relief is required.
 </BodyText>
 <BodyText>
 These terms and any dispute arising from them are governed by the law of Sri Lanka. The courts of Sri Lanka have exclusive jurisdiction.
 </BodyText>
 </section>

 {/* SECTION 13 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="13" />
 <SectionHeading>Changes to These Terms</SectionHeading>
 <BodyText>
 We may update these terms as the platform grows and as legal or regulatory requirements change. When we make meaningful changes, we will notify registered users by email at least 14 days before the updated terms take effect.
 </BodyText>
 <BodyText>
 Changes to driver compensation structures are governed by individual written agreements and require separate written consent from affected driver partners.
 </BodyText>
 </section>

 {/* SECTION 14 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="14" />
 <SectionHeading>Governing Law and Jurisdiction</SectionHeading>
 <BodyText>
 These terms are governed by and construed in accordance with the laws of Sri Lanka, including the Consumer Affairs Authority Act, the Intellectual Property Act, and any applicable data protection regulations. Nothing in these terms is intended to exclude any right that you have under mandatory Sri Lankan law.
 </BodyText>
 </section>

 {/* SECTION 15 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="15" />
 <SectionHeading>Contact Us</SectionHeading>

 <div
 style={{
 background: "#1A1A18",
 borderRadius: 10,
 padding: "1.5rem 2rem",
 marginTop: 16,
 }}
 >
 <h3
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: "clamp(18px, 2vw, 24px)",
 fontWeight: 700,
 color: amber,
 margin: 0,
 lineHeight: 1.2,
 }}
 >
 Questions about these terms
 </h3>
 <div
 style={{
 fontFamily: "'DM Sans', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 color: "#C8C8C4",
 lineHeight: 1.65,
 marginTop: 12,
 }}
 >
 <p style={{ margin: 0 }}>
 For any question about these terms, to report a breach, or to serve formal legal notice:
 </p>
 <p style={{ margin: "8px 0 0" }}>Email: mydiiomedia@gmail.com</p>
 <p style={{ margin: "4px 0 0" }}>Phone / WhatsApp: 070 747 1002</p>
 <p style={{ margin: "4px 0 0" }}>Website: mydiio.com</p>
 <p style={{ margin: "4px 0 0" }}>Start Smart Technologies Private Limited, trading as mydiio · Colombo, Sri Lanka</p>
 <p style={{ margin: "4px 0 0" }}>Registered under the Companies Act No. 7 of 2007 of Sri Lanka</p>
 </div>
 </div>

 <p
 style={{
 fontFamily: "'DM Sans', sans-serif",
 fontSize: 12,
 color: muted,
 marginTop: 16,
 textAlign: "center",
 lineHeight: 1.5,
 }}
 >
 These documents do not constitute legal advice. mydiio recommends engaging a Sri Lanka-qualified legal practitioner before finalising any contracts or agreements.
 </p>
 </section>
 </div>
 </div>
 </main>
 </SiteShell>
 );
}
