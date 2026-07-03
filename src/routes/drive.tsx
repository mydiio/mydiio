import { usePageMeta, useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import TUK_STAND from "@/assets/tuk-stand-drivers-road-ahead.png.asset.json";
import COLOMBO_TUK_DAYTIME from "@/assets/colombo-tuk-tuk-street-daytime.png.asset.json";
import INSTALL_HANDS from "@/assets/installation-hands-fitting-screen.png.asset.json";
import INSTALL_LIVE from "@/assets/installation-screen-live-colombo.png.asset.json";
import DRIVER_PORTRAIT from "@/assets/driver-portrait-tuk-golden-hour.png.asset.json";
import DILINI from "@/assets/illustration-dilini-driver.png.asset.json";
import KAMAL from "@/assets/illustration-kamal-driver.png.asset.json";
import PIONEER_TUK from "@/assets/illustration-pioneer-tuk.png.asset.json";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/drive")({
 component: DrivePage,
 head: () => ({
 meta: [
 { title: "Earn LKR 6,000 a Month, mydiio Tuk-Tuk Driver Programme" },
 { name: "description", content: "Join mydiio and earn passive income from your tuk-tuk. We install a screen, you drive as normal. Paid on the 5th of every month. Based in Colombo, Sri Lanka." },
 { property: "og:title", content: "Earn More From Your Tuk-Tuk | mydiio Driver Programme" },
 { property: "og:description", content: "Free installation. LKR 6,000 to 8,000 monthly. Paid on the 5th." },
 { property: "og:image", content: "/illustrations/dilini.png" },
 { property: "og:url", content: "https://mydiio.com/drive" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/drivers" }],
 }),

});

const DRIVER_CONTACT = "/contact";
const GROUP_A_TOTAL = 10;

/** Shared live count of remaining Group A founding driver spots.
 * Pulls approved driver_applications from the backend so hero and
 * founding-group section always show the same number. */
function useGroupARemaining() {
 const [approvedCount, setApprovedCount] = useState(0);
 useEffect(() => {
 (async () => {
 try {
 const { count } = await (supabase as any)
 .from("driver_applications")
 .select("id", { count: "exact", head: true })
 .eq("status", "approved");
 if (typeof count === "number") setApprovedCount(count);
 } catch {
 /* table may not exist yet */
 }
 })();
 }, []);
 return Math.max(0, GROUP_A_TOTAL - approvedCount);
}



/* ---------- Section ---------- */
function Section({ bg, children }: { bg: string; children: React.ReactNode }) {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
 const el = ref.current; if (!el) return;
 const io = new IntersectionObserver((entries) => {
 entries.forEach((e) => {
 if (e.isIntersecting) {
 el.querySelectorAll<HTMLElement>(".reveal").forEach((item, i) =>
 setTimeout(() => item.classList.add("in"), i * 80)
 );
 io.disconnect();
 }
 });
 }, { threshold: 0.18 });
 io.observe(el);
 return () => io.disconnect();
 }, []);
 return (
 <section ref={ref} className="section-wrap" style={{ background: bg, maxWidth: "none" }}>
 <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
 </section>
 );
}

/* ---------- Hero ---------- */
function StatPill({ value, label }: { value: string; label: string }) {
 return (
 <div style={{
 background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)",
 border: "1px solid rgba(255,255,255,0.20)", borderRadius: 999,
 padding: "8px 16px", display: "inline-flex", alignItems: "baseline", gap: 8,
 }}>
 <span className="font-display" style={{ fontSize: 15, color: "#fff" }}>{value}</span>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>
 {label}
 </span>
 </div>
 );
}

function Hero() {
  const { tt } = useI18n();
 const stats = [
 { v: "LKR 8,000", suffix: "", label: tt("drive.hero.stats.perMonthMax") },
 { v: "LKR 96,000", suffix: "", label: tt("drive.hero.stats.perYear") },
 { v: "1", suffix: " hr", label: tt("drive.hero.stats.installationTime") },
 { v: "0", suffix: "", label: tt("drive.hero.stats.costToJoin") },
 ];
 return (
 <section className="relative w-full overflow-hidden page-hero-fixed" style={{ borderBottom: "2px solid #1A1A18" }}>
 <img src={DILINI.url} alt={tt("home.whyItWorks.driverImg.alt")} loading="eager" width={800} height={450} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center top" }} />
 <div className="absolute inset-0" style={{
 background: "linear-gradient(to right, rgba(20,16,12,0.85) 0%, rgba(20,16,12,0.65) 55%, rgba(20,16,12,0.35) 100%)",
 }} />
 <div className="relative z-10 flex flex-col items-start justify-end page-hero-inner" style={{ padding: "120px 6% 80px" }}>
 <div style={{ maxWidth: "55%", width: "100%" }} className="page-hero-textblock">
 <span className="page-hero-label">
 {tt("drive.hero.label")}
 </span>
 <h1 className="page-hero-headline" style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif",
 color: "#fff",
 fontWeight: 500,
 lineHeight: 1.4,
 marginTop: 14,
 }}>
 {tt("drive.hero.headline")}
 </h1>
 <p style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 400,
 fontSize: 16,
 color: "rgba(253,250,243,0.85)", marginTop: 18, maxWidth: 600, lineHeight: 1.7,
 }}>
 {tt("drive.hero.body")}
 </p>
 <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
 <a href={DRIVER_CONTACT}
 className="btn-bold font-display"
 style={{
 background: C.green, color: "#fff",
 padding: "16px 22px", borderRadius: 13, fontSize: 17,
 textDecoration: "none", display: "inline-block",
 }}>
 {tt("drive.hero.ctaJoinDriver")}
 </a>
 </div>
 <div className="page-hero-stats" style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid rgba(253,250,243,0.18)", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
 {stats.map((s, i) => (
 <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: i === 0 ? 0 : 16, borderLeft: i === 0 ? "none" : "1px solid rgba(253,250,243,0.18)" }}>
 <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
 {s.v}{s.suffix && <span style={{ color: "#F5A623" }}>{s.suffix}</span>}
 </span>
 <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", color: "rgba(253,250,243,0.65)", textTransform: "uppercase" }}>
 {s.label}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 <div className="absolute bottom-0 left-0 right-0" style={{ height: 6, background: C.green }} />
 <style>{`
 .page-hero-fixed { min-height: 400px; }
 .page-hero-inner { min-height: 400px; }
 .page-hero-headline { font-size: 28px; }
 @media (max-width: 767px) {
 .page-hero-fixed { min-height: 250px; }
 .page-hero-inner { min-height: 250px; }
 .page-hero-headline { font-size: 22px; }
 .page-hero-textblock { max-width: 100% !important; }
 .page-hero-stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
 }
 `}</style>
 </section>
 );
}

/* ---------- Earnings Calculator ---------- */
function EarningsCalculator() {
  const { tt } = useI18n();
 const [hours, setHours] = useState(8);
 const monthly = hours >= 8 ? 8000 : 6000;
 const annual = monthly * 12;

 const groupARemaining = useGroupARemaining();


 return (
 <Section bg={C.cream}>
 <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
 <span className="eyebrow">{tt("drive.calculator.eyebrow")}</span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
 See exactly what you could earn.
 </h2>

 <div className="reveal reveal-up" style={{
 marginTop: 40, maxWidth: 560, marginInline: "auto",
 background: "var(--paper)",
 border: "var(--card-border)",
 borderRadius: "var(--card-radius)",
 boxShadow: "var(--shadow-card-lg)",
 overflow: "hidden",
 }}>
 <div style={{
 background: "var(--ink)", padding: "12px 24px",
 fontFamily: "'Space Mono', monospace", fontSize: 10,
 color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.12em",
 fontWeight: 700,
 }}>
 {tt("drive.calculator.cardHeader")}
 </div>
 <div style={{ padding: "36px 28px" }}>
 <div style={{ textAlign: "center" }}>
 <div className="font-display" style={{
 fontSize: "clamp(56px, 11vw, 84px)", color: C.amber,
 lineHeight: 1, fontVariantNumeric: "tabular-nums",
 }}>
 LKR {monthly.toLocaleString()}
 </div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.inkSoft, letterSpacing: 2, marginTop: 8, textTransform: "uppercase" }}>
 {tt("drive.calculator.perMonth")}</div>
 <div className="font-display" style={{
 fontSize: 22, color: C.ink, marginTop: 18,
 fontVariantNumeric: "tabular-nums",
 }}>
 LKR {annual.toLocaleString()}
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.inkSoft, letterSpacing: 1.5, marginLeft: 8 }}>{tt("drive.calculator.perYear")}</span>
 </div>
 </div>

 <div style={{ marginTop: 32 }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.inkSoft, letterSpacing: 1.5 }}>{tt("drive.calculator.sliderLabel")}</span>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.amberDeep, fontVariantNumeric: "tabular-nums" }}>{hours}h</span>
 </div>
 <input
 type="range" min={4} max={14} step={1} value={hours}
 aria-label={tt("drive.calculator.sliderAriaLabel")}
 onChange={(e) => setHours(parseInt(e.target.value))}
 style={{ width: "100%", marginTop: 10, accentColor: C.amber }}
 />

 <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.inkSoft }}>4h</span>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.inkSoft }}>14h</span>
 </div>
 </div>

 <p style={{
 fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.inkSoft,
 textAlign: "center", marginTop: 28, lineHeight: 1.6,
 }}>
 {tt("drive.calculator.footnote")}
 </p>
 </div>
 </div>

 <div className="reveal reveal-up" style={{ textAlign: "center", marginTop: 16 }}>
 <div style={{
 display: "inline-flex", alignItems: "center", gap: 8,
 background: "var(--green-soft)", border: "2px solid var(--green)",
 borderRadius: 9999, padding: "8px 18px",
 }}>
 <span style={{
 fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
 color: "var(--green-ink)", letterSpacing: "0.06em",
 }}>
 {tt("drive.calculator.paymentBadge")}
 </span>
 </div>
 </div>

 <div className="reveal reveal-up" style={{ textAlign: "center", marginTop: 12 }}>
 <div style={{
 display: "inline-block",
 background: "var(--ink)", borderRadius: 20, padding: "6px 16px",
 fontFamily: "'Space Mono', monospace", fontSize: 11,
 color: "var(--accent)", fontWeight: 700,
 }}>
 {tt("drive.calculator.spotsRemaining").replace("{groupARemaining}", String(groupARemaining))}
 </div>
 </div>
 </Section>
 );
}

/* ---------- Driver Earnings ---------- */
function DriverEarnings() {
  const { tt } = useI18n();
 const badges = [tt("drive.earnings.badges.fastPayments"), tt("drive.earnings.badges.verifiedDrivers"), tt("drive.earnings.badges.monthlyBonuses")];
 return (
 <Section bg={C.cream}>
 <div className="earnings-grid">
 <div className="reveal earnings-photo-wrap">
 <img
 src={KAMAL.url}
 alt="mydiio driver smiling with a payment confirmation on his phone"
 loading="lazy"
 width={800}
 height={450}
 style={{
 width: "100%", height: 320, objectFit: "cover", objectPosition: "center top",
 borderRadius: 4, border: "2px solid #1A1A18", boxShadow: "#1A1A18 -5px 5px 0px 0px",
 display: "block",
 }}
 />
 </div>
 <div className="reveal">
 <span className="eyebrow">
 Driver earnings
 </span>
 <h2 className="font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: C.ink, lineHeight: 1.5, marginTop: 0, letterSpacing: 0 }}>
 {tt("drive.hero.headline")}
 </h2>
 <p style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 16, color: C.ink, lineHeight: 1.6, marginTop: 14, maxWidth: 520,
 }}>
 {tt("drive.hero.body")}
 </p>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
 {badges.map((b) => (
 <div key={b} style={{
 display: "inline-flex", alignItems: "center", gap: 8,
 background: "#fff", border: `2px solid ${C.ink}`, borderRadius: 999,
 padding: "8px 14px", boxShadow: `3px 3px 0 ${C.ink}`,
 }}>
 <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="4 12 10 18 20 6" />
 </svg>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: C.ink, textTransform: "uppercase" }}>
 {b}
 </span>
 </div>
 ))}
 </div>
 <a
 href={DRIVER_CONTACT}
 className="btn-bold font-display"
 style={{
 display: "inline-block", marginTop: 28,
 background: C.green, color: "#fff",
 padding: "15px 22px", borderRadius: 13, fontSize: 16,
 textDecoration: "none",
 }}
 >
 {tt("drive.hero.ctaJoinDriver")}
 </a>
 </div>
 </div>
 <style>{`
 .earnings-grid { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; }
 @media (min-width: 760px) {
 .earnings-grid { grid-template-columns: 45% 55%; gap: 56px; }
 }
 .earnings-photo-wrap { min-height: 280px; }
 `}</style>
 </Section>
 );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const { tt } = useI18n();
 const steps = [
 { n: 1, title: tt("drive.howItWorks.step1.title"), body: tt("drive.howItWorks.step1.body") },
 { n: 2, title: tt("drive.howItWorks.step2.title"), body: tt("drive.howItWorks.step2.body") },
 { n: 3, title: tt("drive.howItWorks.step3.title"), body: tt("drive.howItWorks.step3.body") },
 { n: 4, title: tt("drive.howItWorks.step4.title"), body: tt("drive.howItWorks.step4.body") },
 ];
 return (
 <Section bg={C.white}>
 <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
 <span className="eyebrow">{tt("drive.howItWorks.eyebrow")}</span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
 Four steps. That's the whole thing.
 </h2>
 <div className="how-flow">
 {steps.map((s, i) => (
 <div key={s.n} className={`reveal reveal-up delay-${i + 1}`} style={{ display: "contents" }}>
 <div className="step-card mydiio-card">
 <div className="step-circle font-display">{s.n}</div>
 <div className="font-display" style={{ fontSize: 17, color: C.ink, marginTop: 16 }}>{s.title}</div>
 <p style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 13, color: C.inkSoft, marginTop: 8, lineHeight: 1.5,
 }}>
 {s.body}
 </p>
 </div>
 {i < steps.length - 1 && <div className="step-line" aria-hidden />}
 </div>
 ))}
 </div>
 </Section>
 );
}

/* ---------- Installation ---------- */
function Installation() {
  const { tt } = useI18n();
 return (
 <Section bg={C.cream}>
 <div className="install-grid">
 <div>
 <span className="eyebrow reveal reveal-up" style={{ color: "var(--green-ink)" }}>{tt("drive.installation.eyebrow")}</span>
 <h3 className="reveal reveal-up font-display" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: C.ink, lineHeight: 1.1, marginTop: 10 }}>
 We install it. You drive.
 </h3>
 <p className="reveal reveal-up" style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, marginTop: 14 }}>
 One hour. No cost to you. Powered by your vehicle's existing electrics. You won't notice it's there, but your passengers will.
 </p>
 <ul className="reveal reveal-up" style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
 {[tt("drive.installation.bullet1"), tt("drive.installation.bullet2"), tt("drive.installation.bullet3")].map((t) => (
 <li key={t} style={{
 fontFamily: "'Space Mono', monospace", fontSize: 12,
 color: "var(--green-ink)", fontWeight: 700,
 }}>{t}</li>
 ))}
 </ul>
 </div>
 <div className="reveal reveal-up install-photos" style={{
 display: "flex", flexDirection: "column", gap: 12,
 }}>
 <img
 src={INSTALL_HANDS.url}
 alt={tt("drive.installation.imgAlt1")}
 loading="lazy"
 width={800}
 height={450}
 className="install-photo install-photo-top"
 style={{ width: "100%", height: 260, objectFit: "cover", objectPosition: "center", borderRadius: 12, display: "block" }}
 />
 <img
 src={INSTALL_LIVE.url}
 alt={tt("drive.installation.imgAlt2")}
 loading="lazy"
 width={800}
 height={450}
 className="install-photo install-photo-bottom"
 style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center", borderRadius: 12, display: "block" }}
 />
 <style>{`
 @media (max-width: 640px) {
 .install-photo-top { height: 200px !important; }
 .install-photo-bottom { height: 180px !important; }
 }
 `}</style>
 </div>
 </div>
 </Section>
 );
}

/* ---------- Founding Group ---------- */
function FoundingGroup() {
  const { tt } = useI18n();
 const groupARemaining = useGroupARemaining();

 const items = [
 tt("drive.foundingGroup.item1"),
 tt("drive.foundingGroup.item2"),
 tt("drive.foundingGroup.item3"),
 tt("drive.foundingGroup.item4"),
 ];
 return (
 <Section bg={C.cream}>
 <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
 <span className="eyebrow" style={{ textAlign: "center" }}>{tt("drive.foundingGroup.eyebrow")}</span>
 </div>
 <h2 className="reveal font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: C.ink, textAlign: "center", lineHeight: 1.5, marginTop: 0, letterSpacing: 0 }}>{tt("drive.foundingGroup.headline")}</h2>

 <div className="reveal" style={{
 maxWidth: 560, marginInline: "auto", marginTop: 40,
 background: "#fff", border: `3px solid ${C.amber}`,
 boxShadow: `8px 8px 0 ${C.ink}`, borderRadius: 16,
 padding: 28, position: "relative", overflow: "visible",
 }}>
 <div style={{
 position: "absolute", top: -14, right: 18,
 background: C.amber, color: C.ink,
 fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2,
 padding: "5px 10px", borderRadius: 999, fontWeight: 700,
 border: `2px solid ${C.ink}`,
 }}>
 {tt("drive.foundingGroup.spotsRemainingBadge").replace("{groupARemaining}", String(groupARemaining)).replace("{GROUP_A_TOTAL}", String(GROUP_A_TOTAL))}
 </div>
 <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
 {items.map((t) => (
 <li key={t} style={{
 display: "flex", alignItems: "flex-start", gap: 10,
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 14, color: C.ink, lineHeight: 1.5, padding: "8px 0",
 borderBottom: "1px solid rgba(26,26,24,0.06)",
 }}>
 <span style={{ color: C.amberDeep, fontWeight: 800 }}>✓</span>
 <span>{t}</span>
 </li>
 ))}
 </ul>
 <img
 src={PIONEER_TUK.url}
 alt=""
 loading="lazy"
 width={400}
 height={300}
 style={{
 position: "absolute", right: -16, bottom: -16,
 width: 130, opacity: 0.9, mixBlendMode: "multiply",
 zIndex: 0, pointerEvents: "none",
 }}
 />
 </div>

 <p className="reveal" style={{
 fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.2,
 color: C.inkSoft, textAlign: "center", marginTop: 28,
 maxWidth: 560, marginInline: "auto", lineHeight: 1.6,
 }}>
 {tt("drive.foundingGroup.standardNote")}
 </p>
 </Section>
 );
}

/* ---------- Driver Portal Preview ---------- */
function DriverPortal() {
  const { tt } = useI18n();
 return (
 <Section bg={C.white}>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>{tt("drive.portal.headline")}</h2>

 <div className="reveal reveal-up" style={{ marginTop: 36, maxWidth: 520, marginInline: "auto" }}>
 <div style={{
 position: "relative",
 background: "#0D0D08",
 border: "var(--card-border)",
 borderRadius: 14, padding: 22,
 boxShadow: "var(--shadow-card-lg)",
 }}>
 <div style={{
 position: "absolute", top: 14, right: 14,
 background: C.amber, color: C.ink,
 fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2,
 padding: "4px 10px", borderRadius: 999, fontWeight: 700,
 }}>{tt("drive.portal.previewBadge")}</div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.green, letterSpacing: 2 }}>{tt("drive.portal.portalLabel")}</div>

 <div className="font-display" style={{
 fontSize: 32, color: "rgba(255,255,255,0.25)", textAlign: "center",
 marginTop: 18, fontVariantNumeric: "tabular-nums",
 }}>
 LKR ---
 </div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 4 }}>{tt("drive.portal.thisMonthLabel")}</div>

 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, marginTop: 22 }}>{tt("drive.portal.paymentHistoryLabel")}</div>
 <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
 {["05 Jul 2026", "05 Jun 2026", "05 May 2026"].map((d) => (
 <div key={d} style={{
 display: "flex", justifyContent: "space-between",
 background: "rgba(76,175,114,0.06)", border: "1px solid rgba(76,175,114,0.15)",
 borderRadius: 6, padding: "8px 10px",
 fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.55)",
 }}>
 <span>{d}</span>
 <span>LKR ---</span>
 <span>, </span>
 </div>
 ))}
 </div>

 <div style={{
 marginTop: 18, padding: 14,
 background: "rgba(245,166,35,0.08)",
 border: "1px solid rgba(245,166,35,0.3)",
 borderRadius: 8,
 }}>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: C.amber, letterSpacing: 1.5 }}>{tt("drive.portal.referralCodeLabel")}</div>
 <div className="font-display" style={{ fontSize: 14, color: "#fff", marginTop: 4, letterSpacing: 1 }}>MYD-XXX-REF</div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
 {tt("drive.portal.referralBody")}
 </div>
 </div>
 </div>
 </div>

 <p className="reveal" style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 14, color: C.inkSoft, textAlign: "center", marginTop: 22,
 maxWidth: 520, marginInline: "auto",
 }}>
 {tt("drive.portal.accessNote")}
 </p>
 </Section>
 );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const { tt } = useI18n();
 const [open, setOpen] = useState<number | null>(0);
 const items = [
 { q: tt("drive.faq.q1.question"), a: tt("drive.faq.q1.answer") },
 { q: tt("drive.faq.q2.question"), a: tt("drive.faq.q2.answer") },
 { q: tt("drive.faq.q3.question"), a: tt("drive.faq.q3.answer") },
 { q: tt("drive.faq.q4.question"), a: tt("drive.faq.q4.answer") },
 { q: tt("drive.faq.q5.question"), a: tt("drive.faq.q5.answer") },
 { q: tt("drive.faq.q6.question"), a: tt("drive.faq.q6.answer") },
 ];
 return (
 <Section bg={C.cream}>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>{tt("drive.faq.headline")}</h2>
 <div style={{ maxWidth: 720, margin: "32px auto 0" }}>
 {items.map((it, i) => {
 const isOpen = open === i;
 return (
 <div key={i} className={`reveal reveal-up delay-${(i % 3) + 1}`} style={{
 background: "#fff", border: `2px solid ${C.ink}`,
 borderRadius: 12, marginBottom: 12, overflow: "hidden",
 boxShadow: isOpen ? `5px 5px 0 ${C.ink}` : `3px 3px 0 ${C.ink}`,
 transition: "box-shadow 0.15s ease",
 }}>
 <button
 onClick={() => setOpen(isOpen ? null : i)}
 style={{
 width: "100%", padding: "16px 18px",
 display: "flex", alignItems: "center", justifyContent: "space-between",
 gap: 14, background: "transparent", border: "none", cursor: "pointer",
 textAlign: "left",
 }}
 >
 <span className="font-display" style={{ fontSize: 16, color: C.ink }}>{it.q}</span>
 <span className="font-display" style={{
 fontSize: 22, color: C.amberDeep, lineHeight: 1,
 transition: "transform 0.2s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0)",
 }}>+</span>
 </button>
 {isOpen && (
 <div style={{
 padding: "0 18px 18px",
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 14, color: C.inkSoft, lineHeight: 1.6,
 }}>
 {it.a}
 </div>
 )}
 </div>
 );
 })}
 </div>
 </Section>
 );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  const { tt } = useI18n();
 return (
 <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
 <img
 src={FLEET_SUNSET}
 alt={tt("drive.finalCta.imgAlt")}
 loading="lazy"
 width={1920}
 height={1080}
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div
 className="absolute inset-0"
 style={{
 background:
 "linear-gradient(to bottom, rgba(10,10,8,0.78) 0%, rgba(10,10,8,0.72) 50%, rgba(10,10,8,0.92) 100%)",
 }}
 />
 <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
 <span className="reveal eyebrow" style={{ textAlign: "center" }}>{tt("drive.finalCta.eyebrow")}</span>
 <h2 className="reveal font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: "#fff", lineHeight: 1.5, marginTop: 0, letterSpacing: 0, maxWidth: 880, marginInline: "auto" }}>{tt("drive.finalCta.headline")}</h2>
 <p className="reveal" style={{ fontFamily: "\'DM Sans\', Nunito, sans-serif", fontWeight: 600, fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.78)", marginTop: 18, maxWidth: 620, marginInline: "auto", lineHeight: 1.5 }}>{tt("drive.finalCta.body")}</p>
 <div className="reveal" style={{
 marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center",
 }}>
 <a
 href="/drivers/apply"
 className="btn-bold font-display"
 style={{
 background: C.amber, color: C.ink,
 padding: "16px 24px", borderRadius: 13, fontSize: 17,
 textDecoration: "none", display: "inline-block",
 }}
 >{tt("drive.stickyCta.label")}</a>
 <a
 href="/contact"
 className="btn-bold font-display"
 style={{
 background: "transparent", color: "#fff",
 border: "3px solid #fff", boxShadow: "5px 5px 0 rgba(255,255,255,0.25)",
 padding: "16px 24px", borderRadius: 13, fontSize: 17,
 textDecoration: "none", display: "inline-block",
 }}
 >{tt("drive.finalCta.ctaContact")}</a>
 </div>
 </div>
 </section>
 );
}

/* ============== MAIN ============== */
function DrivePage() {
  const { tt } = useI18n();
    usePageMeta({ titleKey: "meta_drive_title", descKey: "meta_drive_desc" });
 useEffect(() => {
 const handleScroll = () => {
 const sticky = document.getElementById("driver-sticky-cta");
 if (sticky) sticky.classList.toggle("visible", window.scrollY > 300);
 };
 window.addEventListener("scroll", handleScroll, { passive: true });

 const target = document.getElementById("drivers-apply-anchor");
 let io: IntersectionObserver | null = null;
 if (target) {
 io = new IntersectionObserver(
 ([entry]) => {
 const sticky = document.getElementById("driver-sticky-cta");
 if (!sticky) return;
 if (entry.isIntersecting) sticky.classList.remove("visible");
 else if (window.scrollY > 300) sticky.classList.add("visible");
 },
 { threshold: 0.1 }
 );
 io.observe(target);
 }
 return () => {
 window.removeEventListener("scroll", handleScroll);
 io?.disconnect();
 };
 }, []);

 return (
 <SiteShell accent="green">
 <style>{`
 .how-flow {
 display: grid; grid-template-columns: 1fr; gap: 24px;
 margin-top: 48px; align-items: stretch;
 }
 .step-card {
 background: #fff; border: 2px solid ${C.ink}; border-radius: 16px;
 padding: 26px; box-shadow: var(--shadow-card);
 }
 .step-circle {
 width: 44px; height: 44px; border-radius: 50%;
 background: ${C.green}; color: #fff;
 border: 3px solid ${C.ink}; box-shadow: 3px 3px 0 ${C.ink};
 display: flex; align-items: center; justify-content: center;
 font-size: 20px;
 }
 .step-line { display: none; }
 @media (min-width: 900px) {
 .how-flow { grid-template-columns: 1fr 12px 1fr 12px 1fr 12px 1fr; align-items: stretch; }
 .step-line {
 display: block; width: 2px; height: 36px;
 background: var(--accent); opacity: 0.45;
 border-radius: 1px; flex-shrink: 0;
 align-self: center; margin: 0 4px;
 }
 }
 @media (max-width: 767px) { .step-line { display: none !important; } }

 .install-grid {
 display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center;
 }
 @media (min-width: 820px) {
 .install-grid { grid-template-columns: 55fr 45fr; gap: 48px; }
 }

 #driver-sticky-cta:hover {
 transform: translate(-2px, -2px);
 box-shadow: var(--shadow-card-hover);
 }
 `}</style>

 <Hero />
 <EarningsCalculator />
 <DriverEarnings />
 <section className="relative w-full overflow-hidden drive-supporting-band">
 <img
 src="/illustrations/coverage-fleet.png"
 alt={tt("home.coverage.fleetImg.alt")}
 loading="lazy"
 width={1200}
 height={500}
 className="absolute inset-0 w-full h-full"
 style={{
 objectFit: "cover", objectPosition: "center",
 border: "2px solid #1A1A18", borderRadius: 4,
 boxShadow: "#1A1A18 -5px 5px 0px 0px",
 }}
 />
 <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
 <style>{`
 .drive-supporting-band { height: 280px; }
 `}</style>
 </section>
 <HowItWorks />
 <FoundingGroup />
 <DriverPortal />
 <Installation />
 <FAQ />
 <div id="drivers-apply-anchor" />
 <FinalCTA />

 <a
 id="driver-sticky-cta"
 className="sticky-cta"
 href="/drivers/apply"
 style={{
 background: "var(--green)", color: "var(--on-dark)",
 border: "2px solid var(--ink)", borderRadius: 12,
 boxShadow: "var(--shadow-card)", padding: "12px 22px",
 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
 textDecoration: "none", display: "inline-block",
 transition: "transform 0.18s var(--ease-spring), box-shadow 0.18s var(--ease-spring), opacity 0.3s ease",
 }}
 >{tt("drive.stickyCta.label")}</a>
 </SiteShell>
 );
}

