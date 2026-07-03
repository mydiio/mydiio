import { usePageMeta, useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import PIONEER_TUK from "@/assets/illustration-pioneer-tuk.png.asset.json";

export const Route = createFileRoute("/contact")({
 component: ContactPage,
 head: () => ({
 meta: [
 { title: "Contact mydiio, Launch a Campaign or Join the Network" },
 {
 name: "description",
 content:
 "Get in touch with the mydiio team. Book a demo, launch a campaign, or apply to become a driver partner. Based in Colombo, Sri Lanka. mydiiomedia@gmail.com",
 },
 { property: "og:title", content: "Contact, mydiio" },
 { property: "og:description", content: "Campaign bookings, driver applications, investor questions." },
 { property: "og:url", content: "https://mydiio.com/contact" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/contact" }],
 }),
});

const EDGE = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1";

const inputStyle: React.CSSProperties = {
 width: "100%",
 background: "var(--bg)",
 border: "var(--card-border)",
 borderRadius: 10,
 padding: "10px 14px",
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: 14,
 color: "var(--ink)",
 outline: "none",
 transition: "all 0.15s",
};

function ContactPage() {
    usePageMeta({ titleKey: "meta_contact_title", descKey: "meta_contact_desc" });
 const [investorSubmitted, setInvestorSubmitted] = useState(false);
 const [investorSubmitting, setInvestorSubmitting] = useState(false);
 const [investorError, setInvestorError] = useState<string | null>(null);

 const [generalSubmitted, setGeneralSubmitted] = useState(false);
 const [generalSubmitting, setGeneralSubmitting] = useState(false);
 const [generalError, setGeneralError] = useState<string | null>(null);

 const [isOpen, setIsOpen] = useState(false);
  const { tt } = useI18n();

 useEffect(() => {
 const now = new Date();
 const sriLankaOffset = 5.5 * 60;
 const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
 const sriLankaMin = (utcMin + sriLankaOffset) % (24 * 60);
 const hour = Math.floor(sriLankaMin / 60);
 setIsOpen(hour >= 8 && hour < 20);
 }, []);

 async function handleInvestorSubmit(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault();
 setInvestorError(null);
 const fd = new FormData(e.currentTarget);
 const name = String(fd.get("name") || "")
 .trim()
 .slice(0, 200);
 const email = String(fd.get("email") || "")
 .trim()
 .slice(0, 255);
 const whatsapp = String(fd.get("whatsapp") || "")
 .trim()
 .slice(0, 50);
 const fund_firm = String(fd.get("fund_firm") || "")
 .trim()
 .slice(0, 200);
 const message = String(fd.get("message") || "")
 .trim()
 .slice(0, 4000);
 if (!name || !email || !message) return;
 setInvestorSubmitting(true);
 try {
 const res = await fetch(`${EDGE}/submit-investor-enquiry`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ name, email, whatsapp, fund_firm, message }),
 });
 if (!res.ok) throw new Error("failed");
 setInvestorSubmitted(true);
 } catch {
 setInvestorError("tt("contact.investorForm.errortt("contact.investorForm.fieldMessage.label")")");
 }
 setInvestorSubmitting(false);
 }

 async function handleGeneralSubmit(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault();
 setGeneralError(null);
 const fd = new FormData(e.currentTarget);
 const name = String(fd.get("name") || "")
 .trim()
 .slice(0, 200);
 const email = String(fd.get("email") || "")
 .trim()
 .slice(0, 255);
 const phone = String(fd.get("phone") || "")
 .trim()
 .slice(0, 50);
 const message = String(fd.get("message") || "")
 .trim()
 .slice(0, 4000);
 if (!name || !email || !message) return;
 setGeneralSubmitting(true);
 try {
 const res = await fetch(`${EDGE}/submit-general-enquiry`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ name, email, phone, message }),
 });
 if (!res.ok) throw new Error("failed");
 setGeneralSubmitted(true);
 } catch {
 setGeneralError("tt("contact.investorForm.errortt("contact.investorForm.fieldMessage.label")")");
 }
 setGeneralSubmitting(false);
 }

 return (
 <SiteShell accent="amber">
 <section
 className="contact-hero"
 style={{
 position: "relative",
 background: "var(--bg)",
 padding: "0 var(--section-px)",
 textAlign: "center",
 overflow: "hidden",
 }}
 >
 <img
 src={COLOMBO_STREET}
 alt=""
 aria-hidden="true"
 loading="eager"
 width={1200}
 height={500}
 style={{
 position: "absolute",
 inset: 0,
 width: "100%",
 height: "100%",
 objectFit: "cover",
 opacity: 0.05,
 zIndex: 0,
 }}
 />
 <div style={{ position: "relative", zIndex: 1 }}>
 <span className="page-hero-label">tt("nav.contact")</span>
 <h1
 className="reveal-up contact-hero-headline"
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 500,
 fontSize: "clamp(22px, 2.4vw, 28px)",
 letterSpacing: 0,
 lineHeight: 1.4,
 color: "var(--ink)",
 marginTop: 12,
 }}
 >
 tt("contact.hero.headline")
 </h1>
 <p
 className="reveal-up delay-1"
 style={{
 color: "var(--ink-soft)",
 fontSize: "clamp(16px,1.4vw,18px)",
 maxWidth: "44ch",
 margin: "16px auto 0",
 lineHeight: 1.55,
 }}
 >
 tt("contact.hero.subheadline")
 </p>
 </div>
 </section>

 <section style={{ padding: "0 var(--section-px) var(--section-py)" }}>
 <div className="contact-grid">
 {/* Card 1, Advertisers */}
 <div
 className="mydiio-card contact-card contact-card-amber reveal-up delay-1"
 style={{ padding: 24, display: "flex", flexDirection: "column" }}
 >
 <span className="eyebrow" style={{ color: "var(--accent-deep)" }}>
 tt("contact.advertiserCard.eyebrow")
 </span>
 <h3
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 22,
 color: "var(--ink)",
 margin: "8px 0 10px",
 }}
 >
 tt("contact.advertiserCard.heading")
 </h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65 }}>
 tt("contact.advertiserCard.body")
 </p>
 <p
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 margin: "14px 0 20px",
 }}
 >
 tt("contact.advertiserCard.meta")
 </p>
 <Link
 to="/advertise/apply"
 className="sticker-btn-amber"
 style={{
 marginTop: "auto",
 display: "block",
 width: "100%",
 textAlign: "center",
 background: "var(--accent)",
 color: "var(--ink)",
 border: "var(--card-border)",
 borderRadius: 12,
 boxShadow: "var(--shadow-card)",
 padding: "12px 16px",
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 14,
 textDecoration: "none",
 transition: "all 0.15s",
 }}
 >
 tt("contact.advertiserCard.cta")
 </Link>
 </div>

 {/* Card 2, Drivers */}
 <div
 className="mydiio-card contact-card contact-card-green reveal-up delay-2"
 style={{ padding: 24, display: "flex", flexDirection: "column" }}
 >
 <span className="eyebrow" style={{ color: "var(--green-ink)" }}>
 tt("contact.driverCard.eyebrow")
 </span>
 <h3
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 22,
 color: "var(--ink)",
 margin: "8px 0 10px",
 }}
 >
 tt("contact.driverCard.heading")
 </h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65 }}>
 LKR 6,000 base pay every month. Screen installed free. Keep your routes. Payment on the 5th, every month,
 without fail.
 </p>
 <p
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 margin: "14px 0 20px",
 }}
 >
 tt("contact.driverCard.meta")
 </p>
 <Link
 to="/drivers/apply"
 className="sticker-btn-green"
 style={{
 marginTop: "auto",
 display: "block",
 width: "100%",
 textAlign: "center",
 background: "var(--green)",
 color: "var(--on-dark)",
 border: "var(--card-border)",
 borderRadius: 12,
 boxShadow: "var(--shadow-card)",
 padding: "12px 16px",
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 14,
 textDecoration: "none",
 transition: "all 0.15s",
 }}
 >
 tt("contact.driverCard.cta")
 </Link>
 </div>

 {/* Card 3, Investors */}
 <div
 className="mydiio-card reveal-up delay-3"
 style={{ padding: 24, display: "flex", flexDirection: "column" }}
 >
 <span className="eyebrow">tt("contact.investorCard.eyebrow")</span>
 <h3
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 22,
 color: "var(--ink)",
 margin: "8px 0 10px",
 }}
 >
 tt("contact.investorCard.heading")
 </h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
 tt("contact.investorCard.body")
 </p>
 <img
 src={PIONEER_TUK.url}
 alt="tt("contact.investorCard.pioneerTukAlt")"
 loading="lazy"
 width={400}
 height={300}
 className="contact-pioneer-tuk"
 style={{ display: "block", margin: "0 auto 16px", mixBlendMode: "multiply", pointerEvents: "none" }}
 />
 {investorSubmitted ? (
 <p
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: 15,
 color: "var(--ink)",
 textAlign: "center",
 margin: "auto 0",
 padding: "24px 0",
 }}
 >
 tt("contact.investorForm.successtt("contact.investorForm.fieldMessage.label")")
 </p>
 ) : (
 <form
 onSubmit={handleInvestorSubmit}
 style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}
 >
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.form.name")
 </span>
 <input
 name="name"
 required
 maxLength={200}
 placeholder={tt("contact.form.name")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.investorForm.fieldEmail.label")
 </span>
 <input
 name="email"
 type="email"
 required
 maxLength={255}
 placeholder={tt("contact.investorForm.fieldEmail.placeholder")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.investorForm.fieldFundFirm.label")
 </span>
 <input
 name="fund_firm"
 maxLength={200}
 placeholder={tt("contact.investorForm.fieldFundFirm.placeholder")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.investorForm.fieldWhatsapp.label")
 </span>
 <input
 name="whatsapp"
 type="tel"
 maxLength={50}
 placeholder={tt("contact.investorForm.fieldWhatsapp.placeholder")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.investorForm.fieldMessage.label")
 </span>
 <textarea
 name="message"
 required
 maxLength={4000}
 rows={3}
 placeholder={tt("contact.investorForm.fieldMessage.placeholder")}
 style={{ ...inputStyle, resize: "vertical" }}
 className="contact-input"
 />
 </label>
 <button
 type="submit"
 disabled={investorSubmitting}
 className="contact-submit"
 style={{
 background: "transparent",
 border: "var(--card-border)",
 borderRadius: 12,
 boxShadow: "var(--shadow-card)",
 color: "var(--ink)",
 padding: "12px 16px",
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 14,
 cursor: investorSubmitting ? "wait" : "pointer",
 opacity: investorSubmitting ? 0.7 : 1,
 transition: "all 0.15s",
 }}
 >
 {investorSubmitting ? "tt("contact.investorForm.submitSending")" : "tt("contact.investorForm.submitIdle")"}
 </button>
 {investorError && (
 <p
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 12,
 color: "var(--accent-deep)",
 textAlign: "center",
 }}
 >
 {investorError}
 </p>
 )}
 </form>
 )}
 </div>

 {/* Card 4, General */}
 <div
 className="mydiio-card reveal-up delay-4"
 style={{ padding: 24, display: "flex", flexDirection: "column" }}
 >
 <span className="eyebrow">tt("contact.generalCard.eyebrow")</span>
 <h3
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 22,
 color: "var(--ink)",
 margin: "8px 0 10px",
 }}
 >
 tt("contact.generalCard.heading")
 </h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
 tt("contact.generalCard.body")
 </p>
 {generalSubmitted ? (
 <p
 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontSize: 15,
 color: "var(--ink)",
 textAlign: "center",
 margin: "auto 0",
 padding: "24px 0",
 }}
 >
 tt("contact.investorForm.successtt("contact.investorForm.fieldMessage.label")")
 </p>
 ) : (
 <form
 onSubmit={handleGeneralSubmit}
 style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}
 >
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.form.name")
 </span>
 <input
 name="name"
 required
 maxLength={200}
 placeholder={tt("contact.form.name")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.investorForm.fieldEmail.label")
 </span>
 <input
 name="email"
 type="email"
 required
 maxLength={255}
 placeholder={tt("contact.generalForm.fieldEmail.placeholder")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.generalForm.fieldPhone.label")
 </span>
 <input
 name="phone"
 type="tel"
 maxLength={50}
 placeholder={tt("contact.investorForm.fieldWhatsapp.placeholder")}
 style={inputStyle}
 className="contact-input"
 />
 </label>
 <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 <span
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 textTransform: "uppercase",
 letterSpacing: 1,
 }}
 >
 tt("contact.investorForm.fieldMessage.label")
 </span>
 <textarea
 name="message"
 required
 maxLength={4000}
 rows={3}
 placeholder={tt("contact.generalForm.fieldMessage.placeholder")}
 style={{ ...inputStyle, resize: "vertical" }}
 className="contact-input"
 />
 </label>
 <button
 type="submit"
 disabled={generalSubmitting}
 className="contact-submit"
 style={{
 background: "transparent",
 border: "var(--card-border)",
 borderRadius: 12,
 boxShadow: "var(--shadow-card)",
 color: "var(--ink)",
 padding: "12px 16px",
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: 14,
 cursor: generalSubmitting ? "wait" : "pointer",
 opacity: generalSubmitting ? 0.7 : 1,
 transition: "all 0.15s",
 }}
 >
 {generalSubmitting ? "tt("contact.investorForm.submitSending")" : "tt("contact.investorForm.submitIdle")"}
 </button>
 {generalError && (
 <p
 style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 12,
 color: "var(--accent-deep)",
 textAlign: "center",
 }}
 >
 {generalError}
 </p>
 )}
 </form>
 )}
 </div>
 </div>
 </section>

 <div
 className="reveal-up"
 style={{
 background: "var(--ink)",
 padding: "16px var(--section-px)",
 borderRadius: 14,
 margin: "0 var(--section-px) var(--section-py)",
 }}
 >
 <div className="response-strip">
 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
 <span
 className={isOpen ? "status-dot-pulse" : ""}
 style={{
 width: 8,
 height: 8,
 borderRadius: "50%",
 background: isOpen ? "var(--green)" : "var(--accent)",
 display: "inline-block",
 }}
 />
 <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
 {isOpen
 ? "tt("contact.statusStrip.openText")"
 : "tt("contact.statusStrip.closedText")"}
 </span>
 </div>
 <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
 tt("contact.statusStrip.humanNote")
 </span>
 </div>
 </div>

 <p
 style={{
 textAlign: "center",
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 color: "var(--ink-mute)",
 padding: "0 var(--section-px) var(--section-py-sm)",
 margin: 0,
 }}
 >
 tt("contact.legalFootnote")
 </p>

 <style>{`
 .contact-hero {
 padding-top: calc(var(--site-nav-height, 68px) + 24px) !important;
 padding-bottom: 32px !important;
 margin-top: 0 !important;
 }
 @media (min-width: 900px) {
 .contact-hero { padding-top: calc(var(--site-nav-height, 72px) + 32px) !important; padding-bottom: 48px !important; }
 }
 .contact-grid {
 display: grid;
 grid-template-columns: repeat(2, 1fr);
 gap: 16px;
 margin-top: 40px;
 }
 @media (max-width: 900px) {
 .contact-grid { grid-template-columns: 1fr; }
 }
 .contact-card-amber:hover { background: var(--accent-soft); }
 .contact-card-green:hover { background: var(--green-soft); }
 .sticker-btn-amber:hover, .sticker-btn-green:hover {
 transform: translate(-2px,-2px);
 box-shadow: var(--shadow-card-hover);
 }
 .contact-input:focus {
 border-color: var(--accent);
 box-shadow: 2px 2px 0 var(--accent);
 transform: translate(-1px,-1px);
 }
 .contact-submit:hover { background: var(--ink); color: var(--on-dark); }
 .response-strip {
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 16px;
 flex-wrap: wrap;
 }
 @media (max-width: 700px) {
 .response-strip { flex-direction: column; align-items: flex-start; }
 }
 @keyframes status-pulse {
 0%, 100% { opacity: 1; transform: scale(1); }
 50% { opacity: 0.5; transform: scale(1.3); }
 }
 .status-dot-pulse { animation: status-pulse 2s ease infinite; }
 .contact-pioneer-tuk { width: 180px; }
 @media (max-width: 900px) {
 .contact-pioneer-tuk { width: 140px; }
 }
 `}</style>
 </SiteShell>
 );
}
