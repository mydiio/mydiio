import { usePageMeta, useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
const INSIDE_RIDE = "/assets/inside-ride-passenger-pov-screen.png";
const ADVERTISER_DASHBOARD = "/assets/advertiser-pharmacy-dashboard.png";
const PERERA = "/assets/illustration-perera-pharmacy.png";
const AYASHA = "/assets/illustration-ayasha-passenger.png";
const NISHARA = "/assets/illustration-nishara-boutique.png";
const PIONEER_TUK = "/assets/illustration-pioneer-tuk.png";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { ColomboMap } from "@/components/site/ColomboMap";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/advertise")({
 component: AdvertisePage,
 head: () => ({
 meta: [
 { title: "Advertise in Sri Lanka's first connected passenger information network | mydiio" },
 { name: "description", content: "Put your brand in front of Colombo passengers every day. GPS-verified plays, weekly reports, no black box. Campaigns from LKR 25,000. 10 Pioneer spots available." },
 { property: "og:title", content: "Advertise in Sri Lanka's first connected passenger information network | mydiio" },
 { property: "og:description", content: "Up to 20 minutes per ride. GPS-verified. From LKR 25,000/month with 7 days free." },
 { property: "og:image", content: "/illustrations/nishara.png" },
 { property: "og:url", content: "https://mydiio.com/advertise" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/advertisers" }],
 scripts: [
 {
 type: "application/ld+json",
 children: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Service",
 name: "mydiio Connected Passenger Information Network",
 provider: {
 "@type": "Organization",
 name: "mydiio",
 },
 description: "GPS-verified digital advertising on screens inside Colombo tuk-tuks. Campaigns live in 72 hours with weekly verified impression reports.",
 areaServed: {
 "@type": "City",
 name: "Colombo",
 },
 offers: {
 "@type": "Offer",
 priceCurrency: "LKR",
 price: "25000",
 description: "Roamer, entry campaign tier, up to 5 tuk-tuks, 3-month minimum",
 },
 }),
 },
 {
 type: "application/ld+json",
 children: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [
 {
 "@type": "Question",
 name: "What kind of ads can I run?",
 acceptedAnswer: { "@type": "Answer", text: "15-second or 30-second video ads, or static image ads. We can produce your first creative for free from your existing branding, just share your logo, colours, and a short brief." },
 },
 {
 "@type": "Question",
 name: "How do I know my ad actually played?",
 acceptedAnswer: { "@type": "Answer", text: "Every Monday you receive a GPS-verified report showing each vehicle that ran your ad, the GPS location at the time of each play, and the total play count. There is no guessing, every impression is logged." },
 },
 {
 "@type": "Question",
 name: "What is Pioneer corridor exclusivity?",
 acceptedAnswer: { "@type": "Answer", text: "Pioneer advertisers get twelve months of exclusivity on a defined corridor for their category. The corridor is agreed at sign-up, so no other business in your category can run ads on that route during your first twelve months. Your per-minute subscription rate is fixed for the life of your subscription." },
 },
 {
 "@type": "Question",
 name: "Can I cancel?",
 acceptedAnswer: { "@type": "Answer", text: "All subscription plans have a 3-month minimum term. After the minimum term, you can cancel with 30 days' notice. Burst packages have no contract, they run until your minutes or validity period are used up." },
 },
 {
 "@type": "Question",
 name: "What does the LKR 5,000 Pioneer deposit cover?",
 acceptedAnswer: { "@type": "Answer", text: "The LKR 5,000 deposit secures your spot on the waiting list. It is fully refundable, credited against your first invoice when you proceed, or returned in full if you decide not to. No risk. No commitment." },
 },
 ],
 }),
 },
 ],
 }),

});

function scrollToWaitlist(e: React.MouseEvent) {
 e.preventDefault();
 document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
}



/* ---------- Reveal section ---------- */
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
function Hero() {
  const { tt } = useI18n();
 const stats = [
 { v: "10 to 20", suffix: " mins", label: tt("advertise.hero.statLabel.avgRideTime") },
 { v: "LKR 25,000", suffix: "", label: tt("advertise.hero.statLabel.startingPerMonth") },
 { v: "72", suffix: " hrs", label: tt("advertise.hero.statLabel.campaignLive") },
 { v: "7", suffix: " days", label: tt("advertise.hero.statLabel.freeTrial") },
 ];
 return (
 <section className="relative w-full overflow-hidden page-hero-fixed">
 <img src={NISHARA} alt={tt("advertise.hero.imgAlt")} loading="eager" width={800} height={450} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center top", borderBottom: "2px solid #1A1A18" }} />
 <div className="absolute inset-0" style={{
 background: "linear-gradient(to right, rgba(20,16,12,0.85) 0%, rgba(20,16,12,0.65) 55%, rgba(20,16,12,0.35) 100%)",
 }} />
 <div className="relative z-10 flex flex-col items-start justify-end page-hero-inner" style={{ padding: "120px 6% 80px" }}>
 <div style={{ maxWidth: "55%", width: "100%" }} className="page-hero-textblock">
 <span className="page-hero-label">
 For advertisers
 </span>
 <h1 className="page-hero-headline" style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif",
 color: "#fff",
 fontWeight: 500,
 lineHeight: 1.4,
 marginTop: 14,
 }}>
 {tt("advertise.hero.headline")}
 </h1>
 <p style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 400,
 fontSize: 16,
 color: "rgba(253,250,243,0.85)", marginTop: 18, maxWidth: 600, lineHeight: 1.7,
 }}>
 {tt("advertise.hero.body")}
 </p>
 <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
 <a href="/advertise/apply"
 className="btn-bold font-display"
 style={{
 background: C.amber, color: C.ink,
 padding: "16px 22px", borderRadius: 13, fontSize: 17,
 textDecoration: "none", display: "inline-block",
 }}>
 {tt("advertise.hero.cta")}
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
 <div className="absolute bottom-0 left-0 right-0" style={{ height: 6, background: C.amber }} />
 <style>{`
 .page-hero-fixed { min-height: 560px; }
 .page-hero-inner { min-height: 560px; }
 .page-hero-headline { font-size: 28px; }
 @media (max-width: 767px) {
 .page-hero-fixed { min-height: 380px; }
 .page-hero-inner { min-height: 380px; }
 .page-hero-headline { font-size: 22px; }
 .page-hero-textblock { max-width: 100% !important; }
 .page-hero-stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
 }
 `}</style>
 </section>
 );
}

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

/* ---------- How it works ---------- */
function HowItWorks() {
  const { tt } = useI18n();
 const steps = [
 { n: 1, title: tt("advertise.howItWorks.step1.title"), body: tt("advertise.howItWorks.step1.body"), img: PERERA, alt: tt("advertise.howItWorks.step1.imgAlt") },
 { n: 2, title: tt("advertise.howItWorks.step2.title"), body: tt("advertise.howItWorks.step2.body"), img: AYASHA, alt: tt("advertise.howItWorks.step2.imgAlt") },
 { n: 3, title: tt("advertise.howItWorks.step3.title"), body: tt("advertise.howItWorks.step3.body"), img: NISHARA, alt: tt("advertise.howItWorks.step3.imgAlt") },
 ];
 return (
 <div id="how-it-works" style={{ scrollMarginTop: 96 }}>
 <Section bg={C.cream}>
 <div style={{ maxWidth: 880, margin: "0 auto" }}>
 <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
 <span className="eyebrow" style={{ textAlign: "center" }}>{tt("advertise.howItWorks.eyebrow")}</span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
 {tt("advertise.howItWorks.sectionHeading")}
 </h2>
 </div>
 <div className="how-flow">
 {steps.map((s, i) => (
 <div key={s.n} className={`reveal reveal-up delay-${i + 1} step-item`} style={{ display: "contents" }}>
 <div className="step-card mydiio-card" style={{ padding: 0, overflow: "hidden" }}>
 <img src={s.img} alt={s.alt} loading="lazy" width={800} height={450} style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center top", display: "block", borderBottom: `2px solid ${C.ink}` }} />
 <div style={{ padding: 26 }}>
 <div className="step-circle font-display">{s.n}</div>
 <div className="font-display" style={{ fontSize: 18, color: C.ink, marginTop: 16 }}>{s.title}</div>
 <p style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 14, color: C.inkSoft, marginTop: 8, lineHeight: 1.5,
 }}>
 {s.body}
 </p>
 </div>
 </div>
 {i < steps.length - 1 && <div className="step-line" aria-hidden />}
 </div>
 ))}
 </div>
 </Section>
 </div>
 );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const { tt } = useI18n();
 const plans: Array<{
 name: string; price: string; per: string; features: string[];
 badge?: string; highlight?: boolean;
 tierSlug: "pioneer" | "roamer" | "voyager" | "horizon";
 ctaLabel: string;
 btnStyle: "primary" | "ink" | "ghost";
 }> = [
 {
 name: "PIONEER", price: "LKR 25,000", per: "/mo · 3-month min",
 features: [tt("advertise.pricing.pioneer.feature.freeTrial"), tt("advertise.pricing.pioneer.feature.exclusivity"), tt("advertise.pricing.pioneer.feature.rateLocked"), tt("advertise.pricing.pioneer.feature.priorityPlacement"), tt("advertise.pricing.pioneer.feature.freeCreative")],
 badge: tt("advertise.pricing.pioneer.badge"),
 highlight: true,
 tierSlug: "pioneer", ctaLabel: tt("advertise.pricing.pioneer.cta"), btnStyle: "primary",
 },
 {
 name: "ROAMER", price: "LKR 25,000", per: "/mo · 3-month min",
 features: [tt("advertise.pricing.pioneer.feature.freeTrial"), tt("advertise.pricing.roamer.feature.standardRotation"), tt("advertise.pricing.roamer.feature.vehicles"), tt("advertise.pricing.roamer.feature.dashboard"), tt("advertise.pricing.roamer.feature.gpsReports")],
 tierSlug: "roamer", ctaLabel: tt("advertise.pricing.roamer.cta"), btnStyle: "ink",
 },
 {
 name: "VOYAGER", price: "LKR 38,000", per: "/mo · 3-month min",
 features: [tt("advertise.pricing.pioneer.feature.freeTrial"), tt("advertise.pricing.voyager.feature.priorityRotation"), tt("advertise.pricing.voyager.feature.vehicles"), tt("advertise.pricing.roamer.feature.dashboard")],
 tierSlug: "voyager", ctaLabel: tt("advertise.pricing.voyager.cta"), btnStyle: "ink",
 },
 {
 name: "HORIZON", price: "LKR 65,000+", per: "/mo · Custom",
 features: [tt("advertise.pricing.pioneer.feature.freeTrial"), tt("advertise.pricing.horizon.feature.vehicles"), tt("advertise.pricing.horizon.feature.enterpriseSupport"), tt("advertise.pricing.horizon.feature.multiVehicle"), tt("advertise.pricing.horizon.feature.dedicatedAccount")],
 tierSlug: "horizon", ctaLabel: tt("advertise.pricing.horizon.cta"), btnStyle: "ghost",
 },
 ];
 const [pioneerCount, setPioneerCount] = useState(3);
 const [progressWidth, setProgressWidth] = useState(0);
 useEffect(() => {
 supabase
 .from("advertiser_applications")
 .select("id", { count: "exact", head: true })
 .eq("tier_interest", "pioneer")
 .then(({ count }) => {
 if (count !== null && count !== undefined) setPioneerCount(Math.min(count, 10));
 });
 }, []);
 useEffect(() => {
 const t = setTimeout(() => setProgressWidth((pioneerCount / 10) * 100), 50);
 return () => clearTimeout(t);
 }, [pioneerCount]);
 const remaining = Math.max(0, 10 - pioneerCount);

 return (
 <Section bg={C.cream}>
 <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
 <span className="eyebrow">{tt("advertise.pricing.eyebrow")}</span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(30px, 4vw, 44px)", color: C.ink, textAlign: "center", lineHeight: 1.05 }}>
 {tt("advertise.pricing.sectionHeading")}
 </h2>
 <p className="reveal reveal-up" style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 16, color: C.inkSoft, textAlign: "center", marginTop: 14, maxWidth: 560, marginInline: "auto",
 }}>
 {tt("advertise.pricing.subheading")}
 </p>

 <div className="pricing-grid">
 {plans.map((p, idx) => (
 <div key={p.name} className={`reveal reveal-up delay-${idx + 1} price-card mydiio-card`} style={{
 background: "#fff",
 border: `${p.highlight ? 3 : 2}px solid ${p.highlight ? C.amber : C.ink}`,
 boxShadow: `${p.highlight ? 8 : 6}px ${p.highlight ? 8 : 6}px 0 ${C.ink}`,
 borderRadius: 16, padding: "clamp(24px, 3vw, 32px)", position: "relative",
 overflow: p.highlight ? "visible" : undefined,
 display: "flex", flexDirection: "column", height: "100%",
 }}>
 {p.highlight && (
 <img
 src={PIONEER_TUK}
 alt=""
 aria-hidden
 loading="lazy"
 width={400}
 height={300}
 style={{
 position: "absolute", right: -16, bottom: -16, width: 130,
 opacity: 0.85, mixBlendMode: "multiply",
 zIndex: 0, pointerEvents: "none",
 }}
 />
 )}

 {p.badge && (
 <div style={{
 position: "absolute", top: -14, left: 18,
 background: "var(--accent)", color: "var(--accent-ink)",
 fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
 padding: "4px 12px", borderRadius: 20, fontWeight: 700,
 textTransform: "uppercase",
 border: "2px solid var(--ink)",
 boxShadow: "2px 2px 0 var(--ink)",
 }}>
 {p.badge}
 </div>
 )}
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep }}>
 {p.name}
 </span>
 <div className="font-display" style={{ fontSize: 26, color: C.ink, marginTop: 8, lineHeight: 1.1 }}>
 {p.price}
 </div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.inkSoft, marginTop: 4 }}>
 {p.per}
 </div>
 <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", flex: 1 }}>
 {p.features.map((f) => (
 <li key={f} style={{
 display: "flex", alignItems: "flex-start", gap: 8,
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 13, color: C.ink, lineHeight: 1.5, padding: "5px 0",
 }}>
 <span style={{ color: C.amberDeep, fontWeight: 800 }}>✓</span>
 <span>{f}</span>
 </li>
 ))}
 </ul>
 {p.tierSlug === "pioneer" && (
 <div style={{ marginTop: 16, marginBottom: 16 }}>
 <div style={{
 fontFamily: "'Space Mono', monospace", fontSize: 11,
 color: "var(--accent-deep)", fontWeight: 700, marginBottom: 6,
 }}>
 {tt("advertise.pricing.pioneer.spotsRemaining").replace("{remaining}", String(remaining))}
 </div>
 <div style={{
 width: "100%", height: 3, background: "var(--accent-soft)",
 borderRadius: 2, overflow: "hidden",
 }}>
 <div style={{
 width: `${progressWidth}%`, height: "100%",
 background: "var(--accent)", borderRadius: 2,
 transition: "width 800ms var(--ease-spring)",
 }} />
 </div>
 </div>
 )}
 <a href={`/advertise?tier=${p.tierSlug}#apply-section`}
 className={`tier-cta tier-cta-${p.btnStyle}`}
 style={{
 marginTop: "auto", textDecoration: "none",
 display: "block", textAlign: "center",
 background: p.btnStyle === "primary" ? "var(--accent)"
 : p.btnStyle === "ink" ? "var(--ink)"
 : "transparent",
 color: p.btnStyle === "primary" ? "var(--ink)"
 : p.btnStyle === "ink" ? "var(--on-dark)"
 : "var(--ink)",
 padding: "12px 20px", borderRadius: 12, fontSize: 15,
 border: "2px solid var(--ink)",
 boxShadow: p.btnStyle === "ink"
 ? "3px 3px 0 rgba(30,26,21,0.25)"
 : "3px 3px 0 var(--ink)",
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 600, width: "100%",
 cursor: "pointer", transition: "all 0.15s ease",
 }}>
 {p.ctaLabel}
 </a>

 </div>
 ))}
 </div>


 </Section>
 );
}

/* ---------- Fleet Reach ---------- */
function FleetReach() {
  const { tt } = useI18n();
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
 const el = ref.current;
 if (!el) return;
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

 const tiers = [
 { name: "PIONEER", vehicles: tt("advertise.fleetReach.pioneer.vehicles"), accent: true },
 { name: "ROAMER", vehicles: tt("advertise.fleetReach.roamer.vehicles"), accent: false },
 { name: "VOYAGER", vehicles: tt("advertise.fleetReach.voyager.vehicles"), accent: false },
 { name: "HORIZON", vehicles: tt("advertise.fleetReach.horizon.vehicles"), accent: false },
 ];

 const bursts = [
 { name: "SPARK", vehicles: tt("advertise.fleetReach.spark.vehicles") },
 { name: "BLAST", vehicles: tt("advertise.fleetReach.blast.vehicles") },
 { name: "SURGE", vehicles: tt("advertise.fleetReach.surge.vehicles") },
 ];

 return (
 <section ref={ref} className="section-wrap" style={{ background: "var(--bg)", maxWidth: "none" }}>
 <div style={{ maxWidth: 1240, margin: "0 auto" }}>
 <div className="reveal reveal-up" style={{ textAlign: "center" }}>
 <span className="eyebrow" style={{ textAlign: "center" }}>
 {tt("advertise.fleetReach.eyebrow")}
 </span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{
 fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, letterSpacing: 0,
 color: "var(--ink)", textAlign: "center", marginTop: 0, lineHeight: 1.5,
 }}>
 {tt("advertise.fleetReach.heading")}
 </h2>
 <p className="reveal reveal-up" style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)",
 fontWeight: 400, color: "var(--ink-soft)", textAlign: "center",
 maxWidth: "50ch", margin: "12px auto 48px", lineHeight: 1.5,
 }}>
 {tt("advertise.fleetReach.body")}
 </p>

 <div className="reach-tier-wrap">
 <div className="reveal reveal-up reach-card">
 <div style={{
 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
 fontSize: 17, color: "var(--ink)", marginBottom: 4,
 }}>
 {tt("advertise.fleetReach.vehiclesByPlan.title")}
 </div>
 <div style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
 color: "var(--ink-soft)", marginBottom: 20,
 }}>
 {tt("advertise.fleetReach.vehiclesByPlan.description")}
 </div>

 {tiers.map((t, i) => (
 <div key={t.name} className="tier-row" style={{
 borderBottom: i === tiers.length - 1 ? "none" : "1px solid rgba(30,26,21,0.08)",
 }}>
 <span style={{
 fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
 color: t.accent ? "var(--accent-deep)" : "var(--ink-soft)",
 }}>
 {t.name}
 </span>
 <span style={{
 background: t.accent ? "var(--accent)" : "var(--paper)",
 border: "2px solid var(--ink)", borderRadius: 20,
 padding: "3px 12px",
 fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
 color: "var(--ink)",
 }}>
 {t.vehicles}
 </span>
 </div>
 ))}

 <div style={{ height: 1, background: "rgba(30,26,21,0.08)", margin: "16px 0" }} />

 <div style={{
 fontFamily: "'Space Mono', monospace", fontSize: 10,
 color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em",
 margin: "16px 0 10px",
 }}>
 {tt("advertise.fleetReach.burstPackagesLabel")}
 </div>

 {bursts.map((b, i) => (
 <div key={b.name} className="tier-row" style={{
 borderBottom: i === bursts.length - 1 ? "none" : "1px solid rgba(30,26,21,0.08)",
 }}>
 <span style={{
 fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
 color: "var(--ink-soft)",
 }}>
 {b.name}
 </span>
 <span style={{
 background: "var(--paper)",
 border: "2px solid var(--ink)", borderRadius: 20,
 padding: "3px 12px",
 fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
 color: "var(--ink)",
 }}>
 {b.vehicles}
 </span>
 </div>
 ))}
 </div>
 </div>

 <p style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
 color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.6, textAlign: "left",
 }}>
 {tt("advertise.fleetReach.footnote")}
 </p>

 <p style={{
 fontFamily: "'Space Mono', monospace", fontSize: 12,
 color: "var(--accent-deep)", fontWeight: 700,
 textAlign: "center", marginTop: 32,
 }}>
 {tt("advertise.fleetReach.expansionNote")}
 </p>
 </div>

 <style>{`
 .reach-tier-wrap { display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; }
 .reach-tier-wrap > .reach-card { flex: 1 1 45%; min-width: 280px; max-width: 560px; }
 @media (max-width: 767px) {
 .reach-tier-wrap > .reach-card { flex: 1 1 100%; }
 }
 .reach-card {
 background: var(--paper);
 border: 2px solid var(--ink);
 border-radius: 22px;
 box-shadow: 4px 4px 0 var(--ink);
 padding: 24px;
 }
 .tier-row {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 10px 0;
 }
 `}</style>
 </section>
 );
}

/* ---------- Social proof strip ---------- */
function SocialProofStrip() {
  const { tt } = useI18n();
 const chips = [tt("advertise.socialProof.chip1"), tt("advertise.socialProof.chip2"), tt("advertise.socialProof.chip3")];
 return (
 <section className="reveal reveal-up sp-strip" style={{
 background: "var(--ink)",
 padding: "16px var(--section-px)",
 display: "flex", alignItems: "center", justifyContent: "space-between",
 gap: 16, flexWrap: "wrap",
 }}>
 <div style={{
 fontFamily: "'Space Mono', monospace", fontSize: 10,
 color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em",
 }}>
 {tt("advertise.socialProof.label")}
 </div>
 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
 {chips.map((c) => (
 <span key={c} style={{
 background: "rgba(244,166,42,0.15)",
 border: "1px solid rgba(244,166,42,0.4)",
 borderRadius: 20, padding: "5px 12px",
 fontFamily: "'Space Mono', monospace", fontSize: 11,
 color: "var(--accent)", fontWeight: 700,
 }}>{c}</span>
 ))}
 </div>
 </section>
 );
}

/* ---------- Tuk interior feature ---------- */
function TukInterior() {
  const { tt } = useI18n();
 return (
 <section className="section-wrap" style={{ background: C.cream, maxWidth: "none" }}>
 <div className="tuk-interior-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
 <div className="reveal reveal-up" style={{
 border: "2px solid var(--ink)", borderRadius: 22,
 boxShadow: "var(--shadow-card-lg)", overflow: "hidden",
 }}>
 <img src="/illustrations/coverage-fleet.png" alt={tt("advertise.tukInterior.imgAlt")} loading="lazy" width={1200} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
 </div>
 <div>
 <span className="eyebrow reveal reveal-up">{tt("advertise.tukInterior.eyebrow")}</span>
 <h3 className="reveal reveal-up font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: C.ink, lineHeight: 1.1, marginTop: 8 }}>
 {tt("advertise.tukInterior.heading")}
 </h3>
 <p className="reveal reveal-up" style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 14, lineHeight: 1.6 }}>
 {tt("advertise.tukInterior.body")}
 </p>
 <div className="reveal reveal-up" style={{
 fontFamily: "'Space Mono', monospace", fontSize: 13,
 color: "var(--accent-deep)", fontWeight: 700, marginTop: 16,
 }}>
 {tt("advertise.tukInterior.attentionStat")}
 </div>
 </div>
 </div>
 </section>
 );
}

/* ---------- Dashboard preview ---------- */
function DashboardPreview() {
  const { tt } = useI18n();
 const statSets = [
 { impressions: "6,841", vehicles: "8 / 10", dwell: "14.3m", reach: "Plan reach" },
 { impressions: "7,204", vehicles: "9 / 10", dwell: "15.1m", reach: "Plan reach" },
 { impressions: "8,011", vehicles: "10 / 10", dwell: "13.8m", reach: "Plan reach" },
 ];
 const [statIndex, setStatIndex] = useState(0);
 const [fade, setFade] = useState(false);
 useEffect(() => {
 const interval = setInterval(() => {
 setFade(true);
 setTimeout(() => {
 setStatIndex((i) => (i + 1) % statSets.length);
 setFade(false);
 }, 200);
 }, 3500);
 return () => clearInterval(interval);
 }, []);
 const current = statSets[statIndex];
 const cells: Array<[string, string]> = [
 [current.impressions, tt("advertise.dashboard.cell.totalImpressions")],
 [current.vehicles, tt("advertise.dashboard.cell.vehiclesActive")],
 [current.dwell, tt("advertise.dashboard.cell.avgDwellTime")],
 [current.reach, tt("advertise.dashboard.cell.coverageLabel")],
 ];
 return (
 <Section bg={C.cream}>
 <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
 {tt("advertise.dashboard.heading")}
 </h2>
 <div className="reveal reveal-up" style={{ marginTop: 36, maxWidth: 560, marginInline: "auto" }}>
 <div style={{
 position: "relative",
 background: "#0D0D08",
 border: `1px solid ${C.ink}`,
 borderRadius: 14, padding: 22,
 boxShadow: `8px 8px 0 ${C.ink}`,
 }}>
 <div style={{
 position: "absolute", top: 14, right: 14,
 background: C.amber, color: C.ink,
 fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2,
 padding: "4px 10px", borderRadius: 999, fontWeight: 700,
 }}>
 {tt("advertise.dashboard.previewBadge")}
 </div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.amber, letterSpacing: 2 }}>
 {tt("advertise.dashboard.label")}
 </div>
 <div className="font-display" style={{ fontSize: 16, color: "#fff", marginTop: 14 }}>
 {tt("advertise.dashboard.title")}
 </div>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
 {cells.map(([value, label]) => (
 <div key={label} style={{
 background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
 borderRadius: 8, padding: "12px 8px", textAlign: "center",
 }}>
 <div className="font-display" style={{
 fontSize: 22, color: "#fff",
 opacity: fade ? 0.6 : 1, transition: "opacity 0.4s ease",
 }}>{value}</div>
 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{label}</div>
 </div>
 ))}
 </div>
 <div style={{
 marginTop: 12, display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
 }}>
 <span style={{
 width: 6, height: 6, borderRadius: "50%", background: "#45855A",
 animation: "live-dot 1.8s ease-in-out infinite",
 }} />
 <span style={{
 fontFamily: "'Space Mono', monospace", fontSize: 10,
 color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em",
 }}>
 {tt("advertise.dashboard.liveStatus")}
 </span>
 </div>
 <div style={{
 marginTop: 14, padding: "10px 12px",
 background: "rgba(245,166,35,0.08)",
 border: "1px solid rgba(245,166,35,0.25)",
 borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center",
 }}>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 1.5 }}>
 {tt("advertise.dashboard.nextReport.label")}
 </span>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber }}>
 {tt("advertise.dashboard.nextReport.time")}
 </span>
 </div>
 </div>
 </div>
 <div className="reveal reveal-up dashboard-image-wrap" style={{ maxWidth: 600, marginInline: "auto", width: "100%" }}>
 <img
 src={ADVERTISER_DASHBOARD}
 alt={tt("advertise.dashboard.imgAlt")}
 loading="lazy"
 width={1200}
 height={675}
 style={{
 width: "100%", aspectRatio: "16 / 9", objectFit: "cover", objectPosition: "center",
 display: "block", borderRadius: 16, border: `2px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
 }}
 />
 </div>
 <style>{`
 .dashboard-image-wrap { margin-top: 48px; }
 @media (max-width: 1023px) { .dashboard-image-wrap { margin-top: 32px; } }
 @media (max-width: 639px) { .dashboard-image-wrap { margin-top: 24px; } }
 `}</style>

 <p className="reveal" style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 14, color: C.inkSoft, textAlign: "center", marginTop: 22, maxWidth: 520, marginInline: "auto",
 }}>
 {tt("advertise.dashboard.footnote")}
 </p>
 </Section>
 );
}

/* ---------- Pioneer Programme ---------- */
function PioneerProgramme() {
  const [pioneerClaimed, setPioneerClaimed] = useState(3);
  useEffect(() => {
    supabase.from("advertiser_applications").select("id", { count: "exact", head: true }).eq("tier_interest", "pioneer").then(({ count }) => {
      if (count !== null && count !== undefined) setPioneerClaimed(Math.min(count, 10));
    });
  }, []);
  const { tt } = useI18n();
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

 const items = [
 { n: "01", h: tt("advertise.pioneer.item1.heading"), b: tt("advertise.pioneer.item1.body") },
 { n: "02", h: tt("advertise.pioneer.item2.heading"), b: tt("advertise.pioneer.item2.body") },
 { n: "03", h: tt("advertise.pioneer.item3.heading"), b: tt("advertise.pioneer.item3.body") },
 { n: "04", h: tt("advertise.pioneer.item4.heading"), b: tt("advertise.pioneer.item4.body") },
 ];

 return (
 <section ref={ref} className="section-wrap" style={{ background: "var(--ink)", maxWidth: "none", color: "var(--on-dark)" }}>
 <div style={{ maxWidth: 1100, margin: "0 auto" }}>
 <div className="reveal reveal-up" style={{ textAlign: "center" }}>
 <span style={{
 fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em",
 color: "var(--accent)", textTransform: "uppercase", display: "inline-block",
 }}>
 {tt("advertise.pioneer.eyebrow")}
 </span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{
 fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em",
 color: "var(--on-dark)", textAlign: "center", marginTop: 12, lineHeight: 1.1,
 }}>
 {tt("advertise.pioneer.heading")}
 </h2>
 <p className="reveal reveal-up" style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(15px, 1.4vw, 18px)",
 fontWeight: 400, color: "var(--on-dark)", opacity: 0.65, textAlign: "center",
 maxWidth: "52ch", margin: "16px auto 56px", lineHeight: 1.65,
 }}>
 {tt("advertise.pioneer.body")}
 </p>

 <div className="reveal reveal-up" style={{ maxWidth: 480, margin: "0 auto 48px", textAlign: "center" }}>
 <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
 {Array.from({ length: 10 }).map((_, i) => {
 const filled = i < pioneerClaimed;
 return (
 <div key={i} style={{
 width: 28, height: 28, borderRadius: "50%",
 background: filled ? "var(--accent)" : "transparent",
 border: filled ? "none" : "1.5px solid rgba(255,255,255,0.2)",
 display: "flex", alignItems: "center", justifyContent: "center",
 color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
 }}>
 {filled ? "✓" : ""}
 </div>
 );
 })}
 </div>
 <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "var(--accent)", marginTop: 14 }}>
 {pioneerClaimed} of 10 Pioneer spots claimed
 </div>
 <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
 {10 - pioneerClaimed} remaining
 </div>
 </div>

 <div className="pioneer-grid">
 {items.map((it, i) => (
 <div key={it.n} className={`reveal reveal-up delay-${i + 1} pioneer-card`}>
 <div style={{
 fontFamily: "'Space Mono', monospace", fontWeight: 700,
 fontSize: "clamp(36px, 4vw, 48px)", color: "var(--accent)", lineHeight: 1,
 }}>{it.n}</div>
 <h3 style={{
 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20,
 color: "var(--on-dark)", margin: "10px 0 8px",
 }}>{it.h}</h3>
 <p style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 14,
 color: "var(--on-dark)", opacity: 0.65, lineHeight: 1.65, margin: 0,
 }}>{it.b}</p>
 </div>
 ))}
 </div>

 <div style={{ textAlign: "center", marginTop: 48 }}>
 <div style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 15,
 color: "var(--on-dark)", opacity: 0.55, marginBottom: 20,
 }}>
 {tt("advertise.pioneer.spotsNote")}
 </div>
 <a href="/advertise/apply?tier=pioneer" className="pioneer-cta" style={{
 display: "inline-block", maxWidth: 280, width: "100%",
 background: "var(--accent)", color: "var(--ink)",
 border: "2px solid var(--on-dark)", borderRadius: 12,
 boxShadow: "4px 4px 0 var(--on-dark)",
 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15,
 padding: "14px 28px", textDecoration: "none", transition: "all 0.2s ease",
 }}>
 {tt("advertise.pioneer.cta")}
 </a>
 <div style={{
 fontFamily: "'Space Mono', monospace", fontSize: 11,
 color: "var(--on-dark)", opacity: 0.4, marginTop: 12,
 }}>
 {tt("advertise.pioneer.ctaNote")}
 </div>
 </div>
 </div>
 <style>{`
 .pioneer-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
 @media (min-width: 768px) { .pioneer-grid { grid-template-columns: repeat(2, 1fr); } }
 .pioneer-card {
 background: rgba(255,255,255,0.06);
 border: 1px solid rgba(255,255,255,0.1);
 border-radius: 16px; padding: 24px;
 transition: all 0.2s ease;
 }
 .pioneer-card:hover {
 background: rgba(255,255,255,0.1);
 border-color: var(--accent);
 }
 .pioneer-cta:hover {
 transform: translate(-2px, -2px);
 box-shadow: 6px 6px 0 var(--on-dark);
 }
 `}</style>
 </section>
 );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const { tt } = useI18n();
 const [open, setOpen] = useState<number | null>(0);
 const items = [
 { q: tt("advertise.faq.q1.question"), a: tt("advertise.faq.q1.answer") },
 { q: tt("advertise.faq.q2.question"), a: tt("advertise.faq.q2.answer") },
 { q: tt("advertise.faq.q3.question"), a: tt("advertise.faq.q3.answer") },
 { q: tt("advertise.faq.q4.question"), a: tt("advertise.faq.q4.answer") },
 { q: tt("advertise.faq.q5.question"), a: tt("advertise.faq.q5.answer") },
 ];
 return (
 <Section bg={C.cream}>
 <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
 {tt("advertise.faq.heading")}
 </h2>
 <div style={{ maxWidth: 720, margin: "32px auto 0" }}>
 {items.map((it, i) => {
 const isOpen = open === i;
 return (
 <div key={i} className="reveal" style={{
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

/* ---------- Coverage ---------- */
function Coverage() {
  const { tt } = useI18n();
 return (
 <Section bg={C.cream}>
 <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
 {tt("advertise.coverage.eyebrow")}
 </span>
 </div>
 <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
 {tt("advertise.coverage.heading")}
 </h2>
 <p className="reveal" style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: 16, color: C.inkSoft, textAlign: "center", marginTop: 14,
 maxWidth: 560, marginInline: "auto",
 }}>
 {tt("advertise.coverage.body")}
 </p>

 <div className="reveal" style={{ marginTop: 40 }}>
 <ColomboMap />
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
 alt={tt("advertise.finalCta.imgAlt")}
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
 <span className="reveal" style={{
 fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3,
 color: C.amber, textTransform: "uppercase",
 }}>
 {tt("advertise.finalCta.badge")}
 </span>
 <h2 className="reveal font-display" style={{
 fontSize: "clamp(32px, 5.2vw, 56px)", color: "#fff",
 lineHeight: 1.05, marginTop: 16, letterSpacing: "-1px",
 maxWidth: 880, marginInline: "auto",
 }}>
 Put your brand on Colombo's tuk-tuks. First 7 days free.
 </h2>
 <p className="reveal" style={{
 fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
 fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.78)",
 marginTop: 18, maxWidth: 620, marginInline: "auto", lineHeight: 1.5,
 }}>
 {tt("advertise.finalCta.body")}
 </p>
 <div className="reveal" style={{
 marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center",
 }}>
 <a
 href="/advertise/apply"
 className="btn-bold font-display"
 style={{
 background: C.amber, color: C.ink,
 padding: "16px 24px", borderRadius: 13, fontSize: 17,
 textDecoration: "none", display: "inline-block",
 }}
 >
 {tt("advertise.finalCta.primaryCta")}
 </a>
 <a
 href="#how-it-works"
 onClick={(e) => {
 e.preventDefault();
 document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
 }}
 className="btn-bold font-display"
 style={{
 background: "transparent", color: "#fff",
 border: "3px solid #fff", boxShadow: "5px 5px 0 rgba(255,255,255,0.25)",
 padding: "16px 24px", borderRadius: 13, fontSize: 17,
 textDecoration: "none", display: "inline-block",
 }}
 >
 {tt("advertise.finalCta.secondaryCta")}
 </a>
 </div>
 </div>
 </section>
 );
}

/* ---------- Burst Packages ---------- */
function BurstPackages() {
  const { tt } = useI18n();
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
 const bursts = [
 {
 tier: "SPARK",
 price: "LKR 5,000",
 features: [tt("advertise.burst.spark.feature1"), tt("advertise.burst.spark.feature2"), tt("advertise.burst.spark.feature3")],
 bestFor: tt("advertise.burst.spark.bestFor"),
 href: "/advertise/apply?tier=burst-spark",
 popular: false,
 },
 {
 tier: "BLAST",
 price: "LKR 18,000",
 features: [tt("advertise.burst.blast.feature1"), tt("advertise.burst.blast.feature2"), tt("advertise.burst.blast.feature3")],
 bestFor: tt("advertise.burst.blast.bestFor"),
 href: "/advertise/apply?tier=burst-blast",
 popular: true,
 },
 {
 tier: "SURGE",
 price: "LKR 40,000",
 features: [tt("advertise.burst.surge.feature1"), tt("advertise.burst.surge.feature2"), tt("advertise.burst.surge.feature3")],
 bestFor: tt("advertise.burst.surge.bestFor"),
 href: "/advertise/apply?tier=burst-surge",
 popular: false,
 },
 ];

 return (
 <section ref={ref} className="section-wrap" style={{ background: "var(--bg2)", maxWidth: "none" }}>
 <div style={{ maxWidth: 1240, margin: "0 auto" }}>
 <div className="reveal reveal-up" style={{ textAlign: "center" }}>
 <span className="eyebrow" style={{ textAlign: "center" }}>
 {tt("advertise.burst.eyebrow")}
 </span>
 </div>
 <h2 className="reveal reveal-up font-display" style={{
 fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, letterSpacing: 0,
 color: "var(--ink)", textAlign: "center", marginTop: 0, lineHeight: 1.5,
 }}>
 {tt("advertise.burst.heading")}
 </h2>
 <p className="reveal reveal-up" style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)",
 fontWeight: 400, color: "var(--ink-soft)", textAlign: "center",
 maxWidth: "52ch", margin: "12px auto 48px", lineHeight: 1.5,
 }}>
 {tt("advertise.burst.body")}
 </p>

 <div className="burst-grid">
 {bursts.map((b, i) => (
 <div key={b.tier} className={`reveal reveal-up delay-${i + 1} burst-card`}>
 {b.popular && (
 <div style={{
 display: "inline-block", background: "var(--accent)", color: "var(--ink)",
 border: "2px solid var(--ink)", borderRadius: 20, padding: "3px 12px",
 fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
 textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
 }}>
 {tt("advertise.burst.popularBadge")}
 </div>
 )}
 <div style={{
 fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
 letterSpacing: "0.12em", color: "var(--ink)", textTransform: "uppercase",
 }}>
 {b.tier}
 </div>
 <div className="font-display" style={{
 fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700,
 color: "var(--ink)", margin: "8px 0 4px", lineHeight: 1.1,
 }}>
 {b.price}
 </div>
 <div style={{ height: 1, background: "rgba(30,26,21,0.1)", margin: "16px 0" }} />
 <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: "1 1 auto" }}>
 {b.features.map((f) => (
 <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 0" }}>
 <span style={{
 width: 6, height: 6, borderRadius: "50%", background: "var(--accent)",
 flexShrink: 0, marginTop: 6,
 }} />
 <span style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 14,
 color: "var(--ink-soft)", lineHeight: 1.5,
 }}>
 {f}
 </span>
 </li>
 ))}
 </ul>
 <div style={{ marginTop: "auto", paddingTop: 16 }}>
 <div style={{
 fontFamily: "'Space Mono', monospace", fontSize: 10,
 color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.08em",
 }}>
 {tt("advertise.burst.bestForLabel")}
 </div>
 <div style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
 color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.5,
 }}>
 {b.bestFor}
 </div>
 </div>
 <a href={b.href} className={b.popular ? "burst-cta-primary" : "burst-cta-ghost"} style={{
 marginTop: 16, textDecoration: "none", display: "block", textAlign: "center",
 padding: "12px 20px", borderRadius: 12, fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 600, fontSize: 14,
 }}>
 {tt("advertise.burst.cardCta")}
 </a>
 </div>
 ))}
 </div>

 <p style={{
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "var(--ink-soft)",
 textAlign: "center", maxWidth: "60ch", margin: "32px auto 0", lineHeight: 1.6,
 }}>
 {tt("advertise.burst.footnote")}
 </p>
 <p style={{
 fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--accent-deep)",
 textAlign: "center", marginTop: 10,
 }}>
 {tt("advertise.burst.upsellNote")}
 </p>
 </div>
 </section>
 );
}

/* ============== MAIN ============== */
function AdvertisePage() {
  const { tt } = useI18n();
    usePageMeta({ titleKey: "meta_advertise_title", descKey: "meta_advertise_desc" });
 return (
 <SiteShell accent="amber">
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
 background: ${C.amber}; color: ${C.ink};
 border: 3px solid ${C.ink}; box-shadow: 3px 3px 0 ${C.ink};
 display: flex; align-items: center; justify-content: center;
 font-size: 20px;
 }
 .step-line { display: none; }

 @media (min-width: 820px) {
 .how-flow { grid-template-columns: 1fr 16px 1fr 16px 1fr; align-items: stretch; }
 .step-line {
 display: block; width: 2px; height: 36px;
 background: var(--accent); opacity: 0.45;
 border-radius: 1px; flex-shrink: 0;
 align-self: center; margin: 0 4px;
 }
 }
 @media (max-width: 767px) { .step-line { display: none !important; } }

 .pricing-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 56px; align-items: stretch; }
 @media (min-width: 560px) { .pricing-grid { grid-template-columns: 1fr 1fr; } }
 @media (min-width: 900px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }
 .price-card { padding-bottom: 28px !important; }
 @media (max-width: 639px) { .price-card { padding-bottom: 20px !important; } }
 .pricing-footnote { margin-top: 40px; padding-top: 24px; }
 @media (max-width: 1023px) { .pricing-footnote { margin-top: 28px; } }
 @media (max-width: 639px) { .pricing-footnote { margin-top: 20px; padding-top: 16px; } }
 .tier-cta-primary:hover, .tier-cta-ghost:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--ink) !important; }
 .tier-cta-ink:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 rgba(30,26,21,0.35) !important; }
 .tier-cta-ghost:hover { background: var(--ink) !important; color: var(--on-dark) !important; }


 .coverage-map-wrap { display: none; }
 .coverage-list { display: flex; }
 @media (min-width: 720px) {
 .coverage-map-wrap { display: block; }
 .coverage-list { display: none; }
 }

 .tuk-interior-grid {
 display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center;
 }
 @media (min-width: 820px) {
 .tuk-interior-grid { grid-template-columns: 45fr 55fr; gap: 48px; }
 }

 @keyframes live-dot {
 0%, 100% { opacity: 1; }
 50% { opacity: 0.3; }
 }

 @media (max-width: 640px) {
 .sp-strip { flex-direction: column; align-items: flex-start; }
 }

 .burst-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
 @media (min-width: 768px) { .burst-grid { grid-template-columns: repeat(3, 1fr); } }
 .burst-card {
 background: ${C.paper}; border: 2px solid ${C.ink}; border-radius: 22px;
 box-shadow: 4px 4px 0 ${C.ink}; padding: clamp(24px, 3vw, 36px);
 display: flex; flex-direction: column; transition: all 0.2s ease;
 }
 .burst-card:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 ${C.ink}; }
 .burst-cta-ghost {
 display: block; text-align: center; padding: 12px 20px; border-radius: 12px;
 font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;
 text-decoration: none; background: transparent; color: ${C.ink};
 border: 2px solid ${C.ink}; box-shadow: 3px 3px 0 ${C.ink}; transition: all 0.2s ease;
 }
 .burst-cta-ghost:hover { background: ${C.ink}; color: ${C.onDark}; }
 .burst-cta-primary {
 display: block; text-align: center; padding: 12px 20px; border-radius: 12px;
 font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;
 text-decoration: none; background: ${C.accent}; color: ${C.ink};
 border: 2px solid ${C.ink}; box-shadow: 4px 4px 0 ${C.ink}; transition: all 0.2s ease;
 }
 .burst-cta-primary:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 ${C.ink}; }
 `}</style>

 <Hero />
 <HowItWorks />
 <TukInterior />
 <Pricing />
 <FleetReach />
 <BurstPackages />
 <PioneerProgramme />
 <Coverage />
 <DashboardPreview />
 <FAQ />
 <section id="apply-section" className="section-wrap" style={{ background: C.cream, scrollMarginTop: 96, maxWidth: "none" }}>
 <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
 Apply now
 </span>
 <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.4vw, 48px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
 {tt("advertise.applySection.heading")}
 </h2>
 <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 14 }}>
 {tt("advertise.applySection.body")}
 </p>
 <div style={{ marginTop: 32, textAlign: "center" }}>
              <a href="/advertise/apply" className="pioneer-cta" style={{ display: "inline-block", padding: "16px 40px", background: C.amber, color: C.ink, fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 700, fontSize: 17, borderRadius: 14, textDecoration: "none" }}>
                Launch your campaign
              </a>
            </div>
 </div>
 </section>
 <FinalCTA />
 </SiteShell>
 );
}


