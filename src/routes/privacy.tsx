import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy")({
 component: PrivacyPage,
 head: () => ({
 meta: [
 { title: "Privacy Policy, mydiio" },
 { name: "description", content: "mydiio privacy policy. What we collect, why we collect it, who we share it with, and your rights." },
 { property: "og:title", content: "Privacy Policy, mydiio" },
 { property: "og:description", content: "What we collect, why we collect it, who we share it with, and your rights." },
 { property: "og:url", content: "https://mydiio.com/privacy" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/privacy" }],
 }),

});

const ink = "#1A1A18";
const amber = "#F5A623";
const cream = "#FDFAF3";
const muted = "#6B6B68";
const borderColor = "#E8E4D8";
const lightBg = "#F7F4EC";

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

export default function PrivacyPage() {
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
 Privacy Policy
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
 We believe you have a right to know exactly what we do with information about you. This policy explains what we collect, why we collect it, who we share it with, and what rights you have. We have written it to be read by a person, not a lawyer. If anything is unclear, write to us at{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: "#7A5C0A", fontWeight: 700, textDecoration: "underline" }}>
 mydiiomedia@gmail.com
 </a>{" "}
 and we will explain it plainly.
 </div>

 {/* Sections */}
 <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 48 }}>
 {/* SECTION 01 */}
 <section>
 <SectionNumber n="01" />
 <SectionHeading>Who We Are</SectionHeading>
 <BodyText>
 Start Smart Technologies Private Limited, trading as mydiio, operates Sri Lanka's first cloud-managed in-vehicle advertising platform. We place Android tablet screens inside Colombo tuk-tuks. Passengers see advertisements from local businesses. Drivers earn passive income. Advertisers receive GPS-verified proof that their ad was displayed.
 </BodyText>
 <BodyText>
 Our registered business operates in Colombo, Sri Lanka. Our contact email is{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: ink, fontWeight: 700 }}>mydiiomedia@gmail.com</a>{" "}
 and our website is{" "}
 <a href="https://mydiio.com" style={{ color: ink, fontWeight: 700 }}>mydiio.com</a>.
 </BodyText>
 <BodyText>We are the data controller for all personal information collected through our platform, portals, and website.</BodyText>
 </section>

 {/* SECTION 02 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="02" />
 <SectionHeading>Who This Policy Covers</SectionHeading>
 <BodyText>This policy applies to four groups of people who interact with mydiio:</BodyText>
 <BulletList
 items={[
 "Advertisers, businesses that purchase advertising campaigns on the mydiio network, including those on our waitlist.",
 "Driver partners, tuk-tuk drivers who join the mydiio programme and host a tablet screen in their vehicle.",
 "Website visitors, anyone who visits mydiio.com or fills out our waitlist or interest forms.",
 "Passengers, members of the public who ride in tuk-tuks carrying a mydiio screen. Passengers are not registered users of our platform. We do not collect personal data about individual passengers. The screen they see displays advertisements; it does not capture images, audio, or identifying information about them.",
 ]}
 />
 </section>

 {/* SECTION 03 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="03" />
 <SectionHeading>Information We Collect</SectionHeading>

 <SubHeading>From advertisers</SubHeading>
 <BodyText>
 When you register an interest or create an account with mydiio as an advertiser, we may collect:
 </BodyText>
 <BulletList
 items={[
 "Your name and the name of your business",
 "Your WhatsApp number and email address",
 "Your business category and preferred advertising tier",
 "Payment information including deposit transaction records (we do not store card numbers directly; payments are processed through our payment partners)",
 "The advertising creatives you upload, video files and image files",
 "Your campaign preferences, scheduling choices, and campaign history",
 "Login credentials for your advertiser portal account (passwords are stored in hashed, encrypted form and are never readable by our team)",
 ]}
 />

 <SubHeading>From driver partners</SubHeading>
 <BodyText>When you join the mydiio driver programme, we collect:</BodyText>
 <BulletList
 items={[
 "Your name, WhatsApp number, and bank account details for payment",
 "Your driver registration number and vehicle details",
 "The deposit you pay, which is tracked in our records",
 "Your daily operating hours, screen uptime data, and route bonus eligibility",
 "Your referral activity, including the names and contact details of drivers you refer",
 "Login credentials for your driver portal account",
 "The GPS location of your vehicle during operating hours (see Section 5 for full details)",
 "Device pairing information for the tablet installed in your vehicle",
 ]}
 />

 <SubHeading>From website visitors</SubHeading>
 <BodyText>When you visit mydiio.com, we may collect:</BodyText>
 <BulletList
 items={[
 "Information you voluntarily submit through our waitlist or driver interest forms",
 "Standard web analytics data such as your browser type, approximate location (city level, derived from IP address), pages visited, and time on site",
 "Your IP address for security and analytics purposes",
 ]}
 />

 <SubHeading>Automatically from devices and tablets</SubHeading>
 <BodyText>Our tablet devices in the field generate operational data including:</BodyText>
  <BulletList
    items={[
      "GPS coordinates of the device during operating hours",
      "Ad play logs recording which advertisement was displayed, at what time, for how long, and at which GPS coordinates",
      "Device online and offline status",
      "Periodic screenshots of the tablet screen during operating hours",
      "Device health signals including screen status and data connectivity",
    ]}
  />
  <BodyText>
  This data is collected for verifying ad delivery, device compliance, and driver safety. It is tied to the vehicle and device, not to individual passengers. Screenshots capture the advertisement content being displayed, not the interior of the vehicle or its passengers.
  </BodyText>
 </section>

 {/* SECTION 04 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="04" />
 <SectionHeading>How We Use Your Information</SectionHeading>

 <SubHeading>For advertisers:</SubHeading>
 <BulletList
 items={[
 "To set up and manage your advertising account and campaigns",
 "To deliver your advertisements to screens in the mydiio fleet",
 "To provide you with verified impression reports showing where, when, and how often your ad was displayed",
 "To process payments and manage billing",
 "To send you weekly performance reports and account communications",
 "To manage your category exclusivity status",
 "To contact you about your campaigns and any content review decisions",
 ]}
 />

 <SubHeading>For driver partners:</SubHeading>
 <BulletList
 items={[
 "To manage your partnership agreement and earnings record",
 "To calculate and process your monthly payments on the 5th of each month",
 "To track your route bonus eligibility based on active screen hours",
 "To monitor tablet uptime and identify technical faults",
 "To send you daily WhatsApp updates about your screen status and earnings",
 "To manage the driver compliance programme and apply the graduated consequence system where applicable",
 "To track referral bonuses",
 ]}
 />

 <SubHeading>For the platform generally:</SubHeading>
 <BulletList
 items={[
 "To prevent fraud and verify that ad impressions are genuine",
 "To ensure the security and integrity of the platform",
 "To improve platform features and user experience",
 "To comply with our legal obligations",
 ]}
 />
 </section>

 {/* SECTION 05 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="05" />
 <SectionHeading>GPS and Location Data</SectionHeading>
 <BodyText>Location data is central to what mydiio does. Understanding this section is important.</BodyText>

 <div
 style={{
 background: lightBg,
 borderLeft: `3px solid ${amber}`,
 padding: "1rem 1.25rem",
 marginTop: 16,
 borderRadius: "0 8px 8px 0",
 }}
 >
 <p
 style={{
 fontFamily: "'DM Sans', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 color: ink,
 lineHeight: 1.65,
 margin: 0,
 textAlign: "justify",
 fontStyle: "italic",
 }}
 >
 "Our platform records the GPS coordinates of tablet devices in our fleet during operating hours. This data is tied to the vehicle and device identifier, not to your personal identity as an individual."
 </p>
 </div>

 <SubHeading>Why we collect location data:</SubHeading>
 <BulletList
 items={[
 "To provide advertisers with GPS-stamped proof that their advertisement was displayed at a real location",
 "To monitor driver uptime and route activity for bonus calculations",
 "To detect when a device goes offline unexpectedly",
 "To show advertisers a live map of where their brand is travelling across Colombo",
 ]}
 />

 <SubHeading>What we do not do with location data:</SubHeading>
 <BulletList
 items={[
 "We do not sell individual driver location data to third parties",
 "We do not share location data with any government or law enforcement authority unless compelled by a valid legal order under Sri Lankan law",
 "We do not use location data to build profiles of individual passengers",
 ]}
 />

 <SubHeading>Aggregated and anonymised mobility data</SubHeading>
 <BodyText>
 Over time, the collective GPS data from our fleet builds a picture of how tuk-tuks move across Colombo. We may use this aggregated, anonymised data to produce mobility insights. Individual vehicle or driver data is not identifiable in any such output.
 </BodyText>

 <SubHeading>Driver consent</SubHeading>
 <BodyText>
 GPS monitoring is a core and disclosed element of the mydiio driver partnership. All driver partners sign a written agreement before their screen is installed. That agreement explicitly describes the monitoring programme, including GPS tracking, screenshot capture, and play log recording. By signing the agreement, drivers consent to this monitoring for the purposes described in this policy.
 </BodyText>
 </section>

 {/* SECTION 06 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="06" />
 <SectionHeading>Advertising and Impression Data</SectionHeading>
 <BodyText>
 Every time an advertisement plays on a mydiio screen, our system records an impression log containing the advertisement identifier, the vehicle identifier, the timestamp, the GPS coordinates, and the play duration.
 </BodyText>
 <BodyText>
 This data is the foundation of mydiio's Radical Transparency commitment. Advertisers can view their own impression logs at any time through the Advertiser Portal. They see data about their own campaigns only. Impression data is used to generate weekly reports and to calculate billing. It is never sold to third parties in identifiable form.
 </BodyText>
 </section>

 {/* SECTION 07 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="07" />
 <SectionHeading>How Long We Keep Your Data</SectionHeading>
 <BulletList
 items={[
 "Advertiser account data, retained for the duration of your contract plus three years",
 "Driver partner data, retained for the duration of your agreement plus three years; bank account details are deleted within 90 days of your agreement ending unless a payment dispute is outstanding",
 "GPS and play log data, retained for two years from the date of collection",
 "Remote screenshots, retained for 90 days",
 "Website enquiry data, retained for 12 months if no business relationship is established",
 "Waitlist submissions, retained until you ask us to remove them or until 24 months from submission, whichever comes first",
 ]}
 />
 <BodyText>When data is no longer required, we delete it securely from our systems.</BodyText>
 </section>

 {/* SECTION 08 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="08" />
 <SectionHeading>Who We Share Data With</SectionHeading>
 <BodyText>We do not sell your personal data. We share data only in the following circumstances.</BodyText>

 <SubHeading>Service providers (process data on our behalf under data protection agreements):</SubHeading>
 <BulletList
 items={[
 "Supabase, our cloud database and authentication provider (SOC 2 Type II compliant)",
 "Cloudinary, video and image hosting for advertising creatives",
 "Cloudflare, website and application hosting and DNS provider",
 "Resend, email delivery service for transactional emails",
 "OpenWeatherMap, weather data for informational interstitials on tablets. No personal data is shared.",
 "NewsAPI.org, Sri Lanka news content for informational interstitials. No personal data is shared.",
 "Fully Kiosk Browser / Fully Cloud, tablet device management software",
 "WhatsApp Business API, used to send automated messages to driver partners",
 ]}
 />

 <SubHeading>Legal requirements</SubHeading>
 <BodyText>
 We may disclose personal data to government authorities or law enforcement if required by applicable Sri Lankan law, a court order, or a valid legal process. We will notify you of any such request to the extent permitted by law.
 </BodyText>

 <SubHeading>Business transfers</SubHeading>
 <BodyText>
 If mydiio is acquired by or merges with another company, your data may be transferred as part of that transaction. We will notify you before this happens.
 </BodyText>
 </section>

 {/* SECTION 09 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="09" />
 <SectionHeading>Security</SectionHeading>
 <BulletList
 items={[
 "Row-Level Security (RLS) enforced at the database level, each user can only access their own data",
 "Passwords stored in hashed, encrypted form, unreadable by anyone including our team",
 "API tokens and secrets stored as encrypted environment variables, never in code",
 "All portal access is role-based, staff see only the data relevant to their function",
 "All staff actions are logged with a timestamp and the identity of the person who took the action",
 "Device pairing codes expire after 30 minutes and are single-use",
 ]}
 />
 <BodyText>
 No system is perfectly secure. If you believe your account has been compromised, contact us immediately at{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: ink, fontWeight: 700 }}>mydiiomedia@gmail.com</a>.
 </BodyText>
 </section>

 {/* SECTION 10 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="10" />
 <SectionHeading>Your Rights</SectionHeading>
 <BodyText>
 You have the following rights regarding your personal data. To exercise any of them, contact us at{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: ink, fontWeight: 700 }}>mydiiomedia@gmail.com</a>.
 </BodyText>
 <BulletList
 items={[
 "Right to access, you can ask us for a copy of the personal data we hold about you",
 "Right to correction, if information we hold about you is inaccurate, you can ask us to correct it",
 "Right to deletion, you can ask us to delete your personal data, subject to any legal or contractual obligation to retain it",
 "Right to object, you can ask us to stop using your data for any purpose you disagree with",
 "Right to portability, you can ask for your data in a machine-readable format",
 ]}
 />
 <BodyText>We will respond to all valid requests within 30 days.</BodyText>
 </section>

 {/* SECTION 11 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="11" />
 <SectionHeading>Cookies and Tracking</SectionHeading>
 <BodyText>
 Our public website (mydiio.com) uses only the cookies necessary for the site to function. We do not currently use advertising trackers or third-party analytics cookies. If this changes, we will update this policy and notify registered users.
 </BodyText>
 <BodyText>
 Our portal applications use session cookies to keep you logged in. These are deleted when you log out or close your browser.
 </BodyText>
 </section>

 {/* SECTION 12 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="12" />
 <SectionHeading>Children</SectionHeading>
 <BodyText>
 Our portals and services are not directed at or intended for anyone under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe we have inadvertently collected such data, please contact us so we can delete it.
 </BodyText>
 <BodyText>
 All advertising content displayed on our screens is reviewed before approval. We enforce an age-appropriate content standard and do not approve content unsuitable for a general audience including minors.
 </BodyText>
 </section>

 {/* SECTION 13 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="13" />
 <SectionHeading>Changes to This Policy</SectionHeading>
 <BodyText>
 We may update this policy as our platform evolves. When we make meaningful changes, we will notify you by email (for registered users) and post a notice on the website. The updated policy will show a new effective date at the top of this page.
 </BodyText>
 <BodyText>Continuing to use our services after a policy update means you accept the revised terms.</BodyText>
 </section>

 {/* SECTION 14 */}
 <section>
 <div style={{ width: "100%", height: 1, background: borderColor, marginBottom: 32 }} />
 <SectionNumber n="14" />
 <SectionHeading>Contact Us</SectionHeading>
 <div
 style={{
 background: ink,
 borderRadius: 10,
 padding: "1.5rem 2rem",
 marginTop: 16,
 }}
 >
 <h3
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: "clamp(20px, 2.2vw, 26px)",
 fontWeight: 700,
 color: amber,
 margin: 0,
 }}
 >
 Privacy questions
 </h3>
 <div
 style={{
 fontFamily: "'DM Sans', sans-serif",
 fontSize: "clamp(15px, 1.2vw, 17px)",
 color: "#C8C8C4",
 lineHeight: 1.65,
 marginTop: 14,
 }}
 >
 <p style={{ margin: 0 }}>
 If you have questions about this policy, want to exercise your rights, or want to report a concern:
 </p>
 <p style={{ margin: "10px 0 0" }}>
 Email:{" "}
 <a href="mailto:mydiiomedia@gmail.com" style={{ color: "#C8C8C4", fontWeight: 700 }}>
 mydiiomedia@gmail.com
 </a>
 </p>
 <p style={{ margin: "6px 0 0" }}>
 Phone / WhatsApp:{" "}
 <a href="tel:0707471002" style={{ color: "#C8C8C4", fontWeight: 700 }}>
 070 747 1002
 </a>
 </p>
 <p style={{ margin: "6px 0 0" }}>
 Website:{" "}
 <a href="https://mydiio.com" style={{ color: "#C8C8C4", fontWeight: 700 }}>
 mydiio.com
 </a>
 </p>
 <p style={{ margin: "10px 0 0", fontSize: 14, opacity: 0.8 }}>
 Start Smart Technologies Private Limited, trading as mydiio · Colombo, Sri Lanka
 </p>
 </div>
 </div>
 </section>
 </div>
 </div>
 </main>
 </SiteShell>
 );
}
