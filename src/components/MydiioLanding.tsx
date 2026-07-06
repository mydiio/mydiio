import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import HERO_NIGHT from "@/assets/hero-tuk-tuk-night-screen.png.asset.json";
import INSIDE_RIDE from "@/assets/inside-ride-passenger-pov-screen.png.asset.json";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import DRIVER_CARD from "@/assets/illustration-kamal-driver.png.asset.json";
import TUK_SCREEN from "@/assets/illustration-tuk-screen.png.asset.json";
import PIONEER_TUK from "@/assets/illustration-pioneer-tuk.png.asset.json";



import HOW_STEP1 from "@/assets/illustration-perera-pharmacy.png.asset.json";
import HOW_STEP2 from "@/assets/illustration-ayasha-passenger.png.asset.json";
import HOW_STEP3 from "@/assets/illustration-nishara-boutique.png.asset.json";

import DILINI_DRIVER from "@/assets/illustration-dilini-driver.png.asset.json";

import { useI18n } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { AdvertiserApplication } from "@/components/site/AdvertiserApplication";
import { ColomboMap } from "@/components/site/ColomboMap";


// Nav + Logo + Footer live in src/components/site/* and render via SiteShell.

function prefersReducedMotion() {
 return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function useCountUp(target: number, durationMs = 1400, delayMs = 0, start = true) {
 const [value, setValue] = useState(start && !prefersReducedMotion() ? 0 : target);
 useEffect(() => {
 if (!start) return;
 if (prefersReducedMotion()) { setValue(target); return; }
 let raf = 0; let startTs = 0;
 const tick = (ts: number) => {
 if (!startTs) startTs = ts;
 const elapsed = ts - startTs - delayMs;
 if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
 const p = Math.min(1, elapsed / durationMs);
 const eased = 1 - Math.pow(1 - p, 4);
 setValue(Math.round(target * eased));
 if (p < 1) raf = requestAnimationFrame(tick);
 };
 raf = requestAnimationFrame(tick);
 return () => cancelAnimationFrame(raf);
 }, [target, durationMs, delayMs, start]);
 return value;
}


function Hero() {
 const { t, tt } = useI18n();

 // On-dark color adaptations of the global tokens
 const ON_DARK = "#F4EFE3";
 const ON_DARK_SOFT = "rgba(244,239,227,0.78)";
 const ON_DARK_MUTE = "rgba(244,239,227,0.55)";

 return (
 <section data-nav-section="home" className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
 <img src={HERO_NIGHT.url} alt={tt("home.hero.heroImg.alt")} loading="eager" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
 <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.45) 40%, rgba(20,16,12,0.88) 100%)" }} />
 <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "clamp(120px, 16vh, 180px) clamp(22px, 6vw, 80px) clamp(72px, 10vh, 110px)" }}>
 <div style={{ maxWidth: 980 }}>
 <span className="hero-brand hero-enter hero-badge" style={{ display: "block", color: C.accent }}>
 mydiio
 </span>
 <p className="hero-enter hero-sub" style={{
 fontSize: "clamp(18px, 1.8vw, 22px)",
 color: ON_DARK_SOFT,
 marginTop: 24,
 maxWidth: "46ch",
 lineHeight: 1.55,
 fontWeight: 500,
 }}>
 {t("hero_sub")}
 </p>

 <div className="hero-cta-row hero-enter hero-ctas" style={{ marginTop: 36 }}>
 <Link
 to="/advertise"
 className="btn-bold cta-primary"
 style={{
 background: C.accent,
 color: C.accentInk,
 padding: "14px 22px",
 fontSize: 15,
 fontWeight: 600,
 textDecoration: "none",
 display: "inline-flex",
 alignItems: "center",
 gap: 6,
 }}
 >
 {t("cta_launch_pilot")}
 </Link>
 <Link
 to="/contact"
 className="btn-bold"
 style={{
 background: "transparent",
 color: ON_DARK,
 padding: "14px 22px",
 fontSize: 15,
 fontWeight: 600,
 textDecoration: "none",
 border: `2px solid ${ON_DARK}`,
 boxShadow: "none",
 }}
 >
 {t("cta_talk_founder")}
 </Link>
 </div>


 </div>
 </div>

 {/* Live vehicles badge pinned bottom-left over the hero photo */}
 <div
 className="hero-live-badge"
 style={{
 position: "absolute",
 left: "clamp(22px, 6vw, 80px)",
 bottom: 28,
 zIndex: 10,
 display: "inline-flex",
 alignItems: "center",
 gap: 8,
 padding: "6px 14px",
 background: C.paper,
 color: C.ink,
 border: `2px solid ${C.ink}`,
 borderRadius: 9999,
 boxShadow: "var(--sticker-press)",
 fontFamily: "'Space Mono', monospace",
 fontSize: 12,
 fontWeight: 700,
 letterSpacing: "0.04em",
 }}
 >
 <span
 aria-hidden
 style={{
 width: 8,
 height: 8,
 borderRadius: 9999,
 background: C.green,
 animation: "hero-live-pulse 1.8s ease-in-out infinite",
 }}
 />
 {t("hero_live_badge")}
 </div>

 {/* Illustrated tuk overlay, bleeds below hero edge */}
 <img
 src={TUK_SCREEN.url}
 alt={tt("home.hero.tukOverlayImg.alt")}
 loading="eager"
 width={600}
 height={400}
 className="hero-tuk-overlay"
 />

 <style>{`
 @keyframes hero-live-pulse {
 0%, 100% { opacity: 1; }
 50% { opacity: 0.3; }
 }
 .hero-brand {
 font-family: 'Space Grotesk', system-ui, sans-serif;
 font-size: 32px;
 font-weight: 700;
 letter-spacing: 0.04em;
 text-transform: none;
 line-height: 1.1;
 }
 .hero-headline {
 font-size: 18px;
 }
 .hero-tuk-overlay {
 position: absolute;
 bottom: -20px;
 right: 40px;
 width: 200px;
 z-index: 10;
 mix-blend-mode: multiply;
 pointer-events: none;
 border: none;
 box-shadow: none;
 }
 @media (min-width: 768px) {
 .hero-brand { font-size: 40px; }
 .hero-headline { font-size: 22px; }
 .hero-tuk-overlay { width: 360px; right: 40px; }
 }
 @media (min-width: 1025px) {
 .hero-brand { font-size: 56px; }
 .hero-headline { font-size: 28px; }
 }
 `}</style>
 </section>
 );
}

function StatsStrip() {
    const { t, tt } = useI18n();
    const ref = useRef<HTMLElement>(null);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } });
        }, { threshold: 0.3 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    const v1 = useCountUp(10, 1200, 0, started);
    const v2 = useCountUp(20, 1200, 0, started);
    const v3 = useCountUp(72, 1200, 0, started);
    const v4 = useCountUp(10, 1200, 0, started);
    const items = [
        { v: v1, suffix: "", label: t("stats_pilot_vehicles") },
        { v: v2, suffix: ` ${t("stats_min")}`, label: t("stats_avg_ride") },
        { v: v3, suffix: ` ${t("stats_hrs")}`, label: t("stats_campaign") },
        { v: v4, suffix: "", label: t("stats_pioneer_spots") },
    ];
 return (
 <section
 ref={ref}
 className="fade-up stats-strip"
 style={{
 background: "#F5A623",
 borderTop: "2px solid #1A1A18",
 borderBottom: "2px solid #1A1A18",
 display: "flex",
 justifyContent: "center",
 alignItems: "stretch",
 flexWrap: "wrap",
 borderRadius: 0,
 }}
 >
 {items.map((it, i) => (
 <div
 key={it.label}
 className="stats-strip-item"
 style={{
 padding: "28px 40px",
 borderRight: i < items.length - 1 ? "2px solid #1A1A18" : "none",
 textAlign: "center",
 }}
 >
 <div style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 32,
 fontWeight: 700,
 color: "#1A1A18",
 lineHeight: 1.1,
 }}>
 {it.v}{it.suffix}
 </div>
 <div style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: 10,
 fontWeight: 700,
 letterSpacing: "0.08em",
 textTransform: "uppercase",
 color: "#1A1A18",
 opacity: 0.65,
 marginTop: 8,
 }}>
 {it.label}
 </div>
 </div>
 ))}
 <style>{`
 @media (max-width: 640px) {
 .stats-strip-item { flex: 1 1 50%; border-right: none !important; border-bottom: 2px solid #1A1A18; }
 .stats-strip-item:nth-child(odd) { border-right: 2px solid #1A1A18 !important; }
 .stats-strip-item:nth-last-child(-n+2) { border-bottom: none; }
 }
 `}</style>
 </section>
 );
}

function Marquee() {
    const { t, tt } = useI18n();
    const phrases = [
        t("mq_gps"),
        t("mq_real"),
        t("mq_every"),
        t("mq_320k"),
        t("mq_trans"),
        t("mq_dignity"),
        t("mq_paid"),
    ];
 const track = (
 <>
 {phrases.map((p, i) => (
 <span key={i}>
 {p}
 <span style={{ color: "#F5A623", margin: "0 12px" }}>◆</span>
 </span>
 ))}
 </>
 );
 return (
 <section
 style={{
 background: "#3D6B4F",
 borderTop: "2px solid #1A1A18",
 borderBottom: "2px solid #1A1A18",
 overflow: "hidden",
 padding: "14px 0",
 whiteSpace: "nowrap",
 }}
 >
 <div
 className="marquee-track"
 style={{
 display: "inline-block",
 animation: "marquee-scroll 22s linear infinite",
 fontFamily: "'Space Mono', monospace",
 fontSize: 16,
 fontWeight: 700,
 letterSpacing: "0.06em",
 textTransform: "uppercase",
 color: "#FDFAF3",
 }}
 >
 {track}{track}
 </div>
 </section>
 );
}

function Section({ bg, children }: { bg: string; children: React.ReactNode }) {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
 const el = ref.current; if (!el) return;
 const io = new IntersectionObserver((entries) => {
 entries.forEach((e) => {
 if (e.isIntersecting) {
 el.querySelectorAll<HTMLElement>(".reveal").forEach((item, i) => setTimeout(() => item.classList.add("in"), i * 80));
 io.disconnect();
 }
 });
 }, { threshold: 0.15 });
 io.observe(el);
 return () => io.disconnect();
 }, []);
 return (
 <section ref={ref} style={{ background: bg, padding: "clamp(32px, 5vw, 64px) clamp(16px, 3vw, 24px)" }}>
 <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
 </section>
 );
}

function WhatsOnScreen() {
  const { t } = useI18n();
  return (
    <Section bg="var(--bg2)">
      <div className="reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 className="reveal-up" style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(44px, 7.4vw, 104px)",
          color: "var(--ink)",
          lineHeight: 0.93,
          letterSpacing: "-0.04em",
        }}>
          {t("tuk_title")}
        </h2>
        <ul className="bullet-fade-in reveal-up delay-1" style={{
          maxWidth: "60ch",
          marginTop: 24,
        }}>
          <li><strong>Real-Time Utility:</strong> Live weather, local news, and community updates.</li>
          <li><strong>Instant Alerts:</strong> Emergency broadcasts that reach the whole network instantly.</li>
          <li><strong>Live Trip Sharing:</strong> GPS-tracked journey sharing for passengers riding alone.</li>
          <li><strong>Ad-Funded:</strong> Subtle advertising that keeps the network free for passengers.</li>
        </ul>
      </div>
    </Section>
  );
}


function SectionHeader({ kicker, title }: { kicker?: string; title: string }) {
 return (
 <div className="reveal" style={{ textAlign: "center", marginBottom: 32, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>

 {kicker && (
 <span className="reveal-up" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase", display: "inline-block" }}>
 {kicker}
 </span>
 )}
 <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(28px, 4.6vw, 50px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: kicker ? 14 : 0 }}>
 {title}
 </h2>
 </div>
 );
}


function WhyItWorks() {
 const { t, tt, lang } = useI18n();
 const cards = [
 { n: "01", t: t("why_c1_t"), b: t("why_c1_b") },
 { n: "02", t: t("why_c2_t"), b: t("why_c2_b") },
 { n: "03", t: t("why_c3_t"), b: t("why_c3_b") },
 { n: "04", t: t("why_c4_t"), b: t("why_c4_b") },
 ];
 return (
 <Section bg="var(--bg2)">
 <div className="why-split">
 <div className="why-content reveal">
 <span className="eyebrow reveal-up"><span className="brand">{t("why_kicker")}</span></span>
 <h2 className="reveal-up delay-1" style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif",
 fontWeight: 700,
 fontSize: "clamp(34px, 5vw, 56px)",
 color: "var(--ink)",
 lineHeight: 1.0,
 letterSpacing: "-0.03em",
 marginTop: 12,
 marginBottom: 28,
 }}>
 {t("why_title")}
 </h2>
 <div className="why-grid">
 {cards.map((c, i) => (
 <div key={c.n} className="brutal-card fade-up" style={{
 background: "var(--paper)",
 padding: "22px",
 display: "flex",
 flexDirection: "column",
 gap: 10,
 height: "100%",
 transitionDelay: `${i * 80}ms`,
 }}>
 <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent-deep)" }}>{c.n}</div>
 <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 600, color: "var(--ink)", lineHeight: 1.2, letterSpacing: "-0.3px" }}>{c.t}</div>
 <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55, fontWeight: 500 }}>{c.b}</div>
 </div>
 ))}
 </div>
 </div>
 <div className="why-image reveal reveal-up delay-1">
 <img src={DILINI_DRIVER.url} alt={tt("home.whyItWorks.driverImg.alt")} loading="lazy" width={800} height={450} style={{ width: "100%", height: 380, display: "block", borderRadius: 16, objectFit: "cover", objectPosition: "center" }} />
 </div>
 </div>
 <style>{`
 .why-split { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: center; }
 .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: stretch; }
 @media (min-width: 900px) {
 .why-split { grid-template-columns: 55fr 45fr; gap: 40px; }
 }
 @media (max-width: 899px) {
 .why-image img { height: 240px !important; }
 .why-split { grid-template-areas: "img" "content"; }
 .why-image { grid-area: img; }
 .why-content { grid-area: content; }
 }
 @media (max-width: 599px) {
 .why-grid { grid-template-columns: 1fr; gap: 12px; }
 .why-grid > .brutal-card { padding: 18px !important; }
 }
 `}</style>
 </Section>
 );
}


function HowItWorks() {
 const { t, tt, lang } = useI18n();
 const steps = [
 { n: "01", t: t("how_s1_t"), b: t("how_s1_b"), img: HOW_STEP1.url, alt: tt("home.howItWorks.step1.imgAlt"), pos: "center top" },
 { n: "02", t: t("how_s2_t"), b: t("how_s2_b"), img: HOW_STEP2.url, alt: tt("home.howItWorks.step2.imgAlt"), pos: "center" },
 { n: "03", t: t("how_s3_t"), b: t("how_s3_b"), img: HOW_STEP3.url, alt: tt("home.howItWorks.step3.imgAlt"), pos: "center" },
 ];
 return (
 <Section bg="var(--bg)">
 <div className="reveal" style={{ textAlign: "center", marginBottom: 32, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>

 <span className="eyebrow reveal-up">{t("how_kicker")}</span>
 <h2 className="reveal-up delay-1" style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif",
 fontWeight: 700,
 fontSize: "clamp(34px, 5vw, 56px)",
 color: "var(--ink)",
 lineHeight: 1.0,
 letterSpacing: "-0.03em",
 marginTop: 12,
 }}>
 {t("how_title")}
 </h2>
 </div>
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>

 {steps.map((s, i) => (
 <div key={s.n} className="brutal-card fade-up" style={{
 background: "var(--paper)",
 padding: 0,
 display: "flex",
 flexDirection: "column",
 overflow: "hidden",
 transitionDelay: `${i * 80}ms`,
 }}>
 <img src={s.img} alt={s.alt} loading="lazy" width={800} height={450} style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: s.pos, display: "block", borderRadius: 0 }} />
 <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
 <div style={{
 fontFamily: "'Space Mono', monospace",
 fontSize: "clamp(40px, 5vw, 60px)",
 fontWeight: 700,
 lineHeight: 1,
 color: "var(--accent-deep)",
 }}>{s.n}</div>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 23, fontWeight: 600, color: "var(--ink)", margin: "6px 0 0", letterSpacing: "-0.4px", lineHeight: 1.2 }}>{s.t}</h3>
 <div style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55, marginTop: 4, fontWeight: 500 }}>{s.b}</div>
 </div>
 </div>
 ))}
 </div>

 </Section>
 );
}


function TukInterior() {
 const { t, tt } = useI18n();
 return (
 <Section bg="var(--bg2)">
 <div className="tuk-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32, alignItems: "center" }}>
 <div className="reveal tuk-text" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
 <span className="eyebrow">{t("tuk_kicker")}</span>
 <h2 style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif",
 fontWeight: 700,
 color: "var(--ink)",
 fontSize: "clamp(44px, 7.4vw, 104px)",
 lineHeight: 0.93,
 letterSpacing: "-0.04em",
 marginTop: 18,
 }}>
 {t("tuk_title")}
 </h2>
 <p style={{
 fontSize: "clamp(16px, 1.5vw, 19px)",
 color: "var(--ink-soft)",
 lineHeight: 1.55,
 maxWidth: "42ch",
 fontWeight: 500,
 whiteSpace: "pre-line",
 }}>
 {t("tuk_body")}
 </p>
 <Link to="/advertise" className="btn-bold" style={{
 display: "inline-flex",
 alignItems: "center",
 gap: 6,
 background: "var(--accent)",
 color: "var(--accent-ink)",
 padding: "12px 20px",
 fontSize: 14,
 fontWeight: 600,
 textDecoration: "none",
 marginTop: 8,
 width: "fit-content",
 }}>
 {t("tuk_cta")}
 </Link>
 </div>
 <div className="reveal reveal-up delay-1 tuk-image" style={{ position: "relative" }}>
 <div className="brutal-frame" style={{ borderRadius: 4 }}>
 <img src={INSIDE_RIDE.url} alt={tt("home.insideTheRide.img.alt")} loading="lazy" width={800} height={450} className="inside-ride-img" style={{ width: "100%", display: "block", height: 400, objectFit: "cover", objectPosition: "center top" }} />
 </div>
 <div style={{
 position: "absolute",
 bottom: 16,
 left: "50%",
 transform: "translateX(-50%)",
 zIndex: 10,
 display: "inline-flex",
 alignItems: "center",
 gap: 8,
 padding: "6px 14px",
 background: "#F5A623",
 color: "#1A1A18",
 border: "1.5px solid #1A1A18",
 borderRadius: 2,
 boxShadow: "var(--sticker-press)",
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 fontWeight: 700,
 letterSpacing: "0.05em",
 textTransform: "uppercase",
 }}>
 <span aria-hidden style={{
 width: 8,
 height: 8,
 borderRadius: 9999,
 background: "#E74C3C",
 animation: "hero-live-pulse 1.8s ease-in-out infinite",
 }} />
 {t("tuk_live_campaign")}
 </div>
 </div>
 </div>
 <style>{`
 @media (min-width: 860px) {
 .tuk-grid { grid-template-columns: 1fr 1.15fr !important; }
 }
 @media (max-width: 599px) {
 .inside-ride-img { height: 280px !important; }
 }
 @media (max-width: 1023px) {
 .tuk-text {
 padding-left: 24px !important;
 padding-right: 24px !important;
 gap: 10px !important;
 }
 .tuk-text .eyebrow {
 margin-bottom: 0 !important;
 }
 .tuk-text h3 {
 margin-top: 4px !important;
 }
 .tuk-text .btn-bold {
 align-self: flex-start !important;
 margin-top: 2px !important;
 }
 .tuk-image {
 margin-top: 24px !important;
 padding-left: 16px !important;
 padding-right: 16px !important;
 }
 }
 `}</style>

  </Section>
  );
}

function Infrastructure() {
  const { t } = useI18n();
  return (
    <Section bg="var(--bg)">
      <div className="reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 className="reveal-up" style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(44px, 7.4vw, 104px)",
          color: "var(--ink)",
          lineHeight: 0.93,
          letterSpacing: "-0.04em",
        }}>
          {t("infra_title")}
        </h2>
        <ul className="check-list reveal-up delay-1" style={{
          fontSize: "clamp(16px, 1.5vw, 19px)",
          color: "var(--ink-soft)",
          lineHeight: 1.55,
          maxWidth: "60ch",
          fontWeight: 500,
          marginTop: 24,
          paddingLeft: 0,
          listStyle: "none",
        }}>
          <li>Live GPS tracking on every device.</li>
          <li>Real-time data monitoring.</li>
          <li>Infrastructure designed for 100% operational reliability.</li>
        </ul>
      </div>
      <style>{`
        .check-list li {
          position: relative;
          padding-left: 28px;
          margin-bottom: 10px;
        }
        .check-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--accent);
          font-weight: 700;
        }
        @media (prefers-reduced-motion: no-preference) {
          .check-list {
            opacity: 0;
            animation: check-list-fade 0.6s ease-out forwards;
          }
          .check-list.in,
          .reveal.in .check-list {
            opacity: 1;
          }
          .check-list li {
            opacity: 0;
            transform: translateY(8px);
            animation: check-li-fade 0.5s ease-out forwards;
          }
          .check-list li:nth-child(1) { animation-delay: 0.1s; }
          .check-list li:nth-child(2) { animation-delay: 0.2s; }
          .check-list li:nth-child(3) { animation-delay: 0.3s; }
        }
        @keyframes check-list-fade {
          to { opacity: 1; }
        }
        @keyframes check-li-fade {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Section>
  );
}

function Coverage() {
    const { t, tt } = useI18n();
    return (
        <Section bg="var(--bg)">
            <div className="reveal" style={{ textAlign: "center", marginBottom: 32, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
                <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>
                    {t("cov_kicker")}
                </span>
                <h2 className="reveal-up delay-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(44px, 7.4vw, 104px)", color: C.ink, lineHeight: 0.93, letterSpacing: "-0.04em", marginTop: 18 }}>
                    {t("cov_title")}
                </h2>
                <p className="reveal-up delay-2" style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 16, fontWeight: 500 }}>
                    {t("cov_body")}
                </p>
            </div>
 <div className="reveal reveal-up delay-1" style={{ marginBottom: 32 }}>
 <img src="/illustrations/coverage-fleet.png" alt={tt("home.coverage.fleetImg.alt")} loading="lazy" width={1200} height={500} className="coverage-strip" style={{ width: "100%", display: "block", height: 380, borderRadius: 4, objectFit: "cover", objectPosition: "center", border: "2px solid #1A1A18", boxShadow: "#1A1A18 -6px 6px 0px 0px" }} />
 </div>

 <div className="reveal reveal-up delay-2">
 <ColomboMap />
 </div>
 <style>{`
 @media (max-width: 599px) {
 .coverage-strip { height: 260px !important; }
 }
 `}</style>

 </Section>
 );
}



function TwoAudiences() {
 const { t, tt } = useI18n();
 return (
 <Section bg="var(--bg2)">
 <div className="paths-grid">
 <div className="reveal path-card reveal-up delay-1" style={{
 background: "var(--accent-soft)",
 border: "2px solid var(--ink)",
 borderRadius: 26,
 boxShadow: "var(--sticker)",
 overflow: "hidden",
 padding: 0,
 }}>
 <div className="brutal-frame">
 <img src={HOW_STEP3.url} alt={tt("home.twoAudiences.advertiserImg.alt")} loading="lazy" width={800} height={450} className="audience-img" style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center top", display: "block", borderRadius: 0 }} />
 </div>
 <div style={{ padding: "clamp(28px, 4vw, 40px)" }}>
 <span className="eyebrow" style={{ color: "var(--accent-deep)" }}>{t("ad_kicker")}</span>
 <h3 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: "clamp(26px, 3vw, 38px)",
 color: "var(--ink)",
 marginTop: 12,
 lineHeight: 1.1,
 letterSpacing: "-0.03em",
 }}>
 {t("ad_title")}
 </h3>
 <p style={{ fontSize: 15, color: "var(--ink)", marginTop: 14, lineHeight: 1.55, fontWeight: 500 }}>
 {t("ad_body")}
 </p>
 <Link to="/advertise" className="btn-bold" style={{
 display: "inline-flex",
 alignItems: "center",
 gap: 6,
 marginTop: 24,
 background: "var(--accent)",
 color: "var(--accent-ink)",
 padding: "12px 20px",
 fontSize: 14,
 fontWeight: 600,
 textDecoration: "none",
 }}>
 {t("ad_cta")}
 </Link>
 </div>
 </div>

 <div className="reveal path-card reveal-up delay-2" style={{
 background: "var(--green-soft)",
 border: "2px solid var(--ink)",
 borderRadius: 26,
 boxShadow: "var(--sticker)",
 overflow: "hidden",
 padding: 0,
 }}>
 <div className="brutal-frame">
 <img src={DRIVER_CARD.url} alt={tt("home.twoAudiences.driverImg.alt")} loading="lazy" width={800} height={450} className="audience-img" style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center top", display: "block", borderRadius: 0 }} />
 </div>
 <div style={{ padding: "clamp(28px, 4vw, 40px)" }}>
 <span className="eyebrow" style={{ color: "var(--green-ink)" }}>{t("dr_kicker")}</span>
 <h3 style={{
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 700,
 fontSize: "clamp(26px, 3vw, 38px)",
 color: "var(--ink)",
 marginTop: 12,
 lineHeight: 1.1,
 letterSpacing: "-0.03em",
 }}>
 {t("dr_title")}
 </h3>
 <p style={{ fontSize: 15, color: "var(--ink)", marginTop: 14, lineHeight: 1.55, fontWeight: 500 }}>
 {t("dr_body")}
 </p>
 <Link to="/drive" className="btn-bold" style={{
 display: "inline-flex",
 alignItems: "center",
 gap: 6,
 marginTop: 24,
 background: "var(--green)",
 color: "#fff",
 padding: "12px 20px",
 fontSize: 14,
 fontWeight: 600,
 textDecoration: "none",
 }}>
 {t("dr_cta")}
 </Link>
 </div>
 </div>
 </div>
 <style>{`
 @media (max-width: 599px) {
 .audience-img { height: 160px !important; }
 }
 `}</style>
  </Section>

  );
}

function WhatMydiioIsNot() {
  const { t } = useI18n();
  return (
    <Section bg="var(--bg)">
      <div className="reveal" style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2 className="reveal-up" style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(44px, 7.4vw, 104px)",
          color: "var(--ink)",
          lineHeight: 0.93,
          letterSpacing: "-0.04em",
          marginBottom: 40,
        }}>
          {t("not_title")}
        </h2>
        <ul className="not-list reveal-up delay-1" style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          padding: 0,
          margin: 0,
          listStyle: "none",
        }}>
          <li><del>An ad business</del> — Ads fund us; they aren't our identity.</li>
          <li><del>A software company</del> — We are physical city infrastructure.</li>
          <li><del>A surveillance platform</del> — Trip data is never stored beyond the journey.</li>
          <li><del>Tied to one partner</del> — We are platform and vehicle agnostic.</li>
        </ul>
      </div>
      <style>{`
        .not-list li {
          position: relative;
          padding-left: 36px;
          font-size: clamp(18px, 2vw, 24px);
          color: var(--ink);
          line-height: 1.3;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
        }
        .not-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--accent);
          font-weight: 700;
          font-size: 22px;
        }
        .not-list li del {
          text-decoration: line-through;
          text-decoration-color: var(--accent);
          text-decoration-thickness: 2px;
          opacity: 0.85;
        }
        @media (prefers-reduced-motion: no-preference) {
          .not-list {
            opacity: 0;
            animation: not-list-fade 0.6s ease-out forwards;
          }
          .not-list.in,
          .reveal.in .not-list {
            opacity: 1;
          }
          .not-list li {
            opacity: 0;
            transform: translateY(8px);
            animation: not-li-fade 0.5s ease-out forwards;
          }
          .not-list li:nth-child(1) { animation-delay: 0.1s; }
          .not-list li:nth-child(2) { animation-delay: 0.2s; }
          .not-list li:nth-child(3) { animation-delay: 0.3s; }
          .not-list li:nth-child(4) { animation-delay: 0.4s; }
        }
        @keyframes not-list-fade {
          to { opacity: 1; }
        }
        @keyframes not-li-fade {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Section>
  );
}


// Wrap a trailing phrase in <em> for English headings; leave other languages untouched.
function EmTail({ text, tail, lang }: { text: string; tail: string; lang: string }) {
 if (lang === "en" && text.endsWith(tail)) {
 const head = text.slice(0, text.length - tail.length);
 return (
 <>
 {head}
 <em style={{ color: "var(--accent-deep)", fontStyle: "italic" }}>{tail}</em>
 </>
 );
 }
 return <>{text}</>;
}

function useInView<T extends HTMLElement>(threshold = 0.25) {
 const ref = useRef<T>(null);
 const [inView, setInView] = useState(false);
 useEffect(() => {
 const el = ref.current; if (!el) return;
 const io = new IntersectionObserver((entries) => {
 entries.forEach((e) => {
 if (e.isIntersecting) { setInView(true); io.disconnect(); }
 });
 }, { threshold });
 io.observe(el);
 return () => io.disconnect();
 }, [threshold]);
 return { ref, inView };
}

function MetricBars({ active }: { active: boolean }) {
 const heights = [38, 54, 46, 68, 58, 86];
 return (
 <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 92, marginTop: 22 }}>
 {heights.map((h, i) => {
 const isLast = i === heights.length - 1;
 return (
 <div key={i} style={{
 flex: 1,
 height: active ? `${h}%` : "0%",
 background: isLast ? "var(--accent)" : "var(--accent-soft)",
 border: "2px solid var(--ink)",
 borderRadius: 6,
 transition: `height 700ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
 }} />
 );
 })}
 </div>
 );
}

function MetricCard({ label, value, suffix = "", format }: { label: string; value: number; suffix?: string; format?: (n: number) => string }) {
 const { ref, inView } = useInView<HTMLDivElement>(0.3);
 const n = useCountUp(value, 1400, 100, inView);
 const display = format ? format(n) : `${n}${suffix}`;
 return (
 <div ref={ref} className="reveal feature-card" style={{
 background: "var(--paper)",
 border: "2px solid var(--ink)",
 borderRadius: 26,
 boxShadow: "var(--sticker)",
 padding: "28px 26px",
 }}>
 <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.18em", color: "var(--ink-mute)", textTransform: "uppercase" }}>
 {label}
 </div>
 <div className="font-display" style={{ fontSize: "clamp(40px, 5vw, 56px)", color: "var(--ink)", lineHeight: 1, marginTop: 14, letterSpacing: "-0.02em", fontWeight: 700 }}>
 {display}
 </div>
 <MetricBars active={inView} />
 </div>
 );
}

function Reporting() {
 const { t, tt, lang } = useI18n();
 return (
 <Section bg={"var(--bg)"}>
 <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 32px" }}>
 <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("rep_kicker")}</span>
 <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14 }}>
 <EmTail text={t("rep_title")} tail={tt("home.reporting.title.emTail")} lang={lang} />
 </h2>
 <p className="reveal-up delay-2" style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 18, fontWeight: 500 }}>
 {t("rep_body")}
 </p>
 </div>
 <div className="reveal" style={{
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
 gap: 24,
 }}>

                    <MetricCard label={t("rep_m1")} value={48} />
                    <MetricCard label={t("rep_m2")} value={412} format={(n) => `${n}k`} />
                    <MetricCard label={t("rep_m3")} value={98} suffix="%" />
                    <MetricCard label={t("rep_m4")} value={34} />
 </div>
 </Section>
 );
}

function WhyNow() {
 const { t, tt, lang } = useI18n();
 return (
 <Section bg={"var(--bg2)"}>
 <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
 <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("whyn_kicker")}</span>
 <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14 }}>
 <EmTail text={t("whyn_title")} tail={tt("home.whyNow.title.emTail")} lang={lang} />
 </h2>
 <p className="reveal-up delay-2" style={{ fontSize: "clamp(15px, 1.7vw, 19px)", color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 22, fontWeight: 500 }}>
 {t("whyn_body")}
 </p>
 </div>
 </Section>
 );
}

function DriverSection() {
  const { t } = useI18n();
  return (
    <Section bg="var(--bg2)">
      <div className="reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 className="reveal-up" style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(44px, 7.4vw, 104px)",
          color: "var(--ink)",
          lineHeight: 0.93,
          letterSpacing: "-0.04em",
        }}>
          {t("driver_title")}
        </h2>
        <ul className="bullet-fade-in reveal-up delay-1" style={{
          fontSize: "clamp(16px, 1.5vw, 19px)",
          color: "var(--ink-soft)",
          lineHeight: 1.55,
          maxWidth: "60ch",
          fontWeight: 500,
          marginTop: 24,
          paddingLeft: 22,
          listStyle: "disc",
        }}>
          <li><strong>Guaranteed Pay:</strong> Unconditional LKR 6,000/month base.</li>
          <li><strong>Route Bonus:</strong> Earn an extra LKR 2,000 for averaging 8+ hours/day.</li>
          <li><strong>On-Time, Always:</strong> Paid directly to your bank on the 5th of every month.</li>
          <li><strong>Zero Blame:</strong> Never penalized for technical faults outside your control.</li>
          <li><strong>Dignity First:</strong> Partner status, not surveillance. Zero cost to join.</li>
        </ul>
      </div>
    </Section>
  );
}


function ScaleStory() {
 const { t, tt } = useI18n();
 const cards = [
 { n: "01", t: t("scale_c1_t"), b: t("scale_c1_b") },
 { n: "02", t: t("scale_c2_t"), b: t("scale_c2_b") },
 { n: "03", t: t("scale_c3_t"), b: t("scale_c3_b") },
 { n: "04", t: t("scale_c4_t"), b: t("scale_c4_b") },
 ];
 return (
 <Section bg={"var(--bg)"}>
 <div className="reveal" style={{ textAlign: "center", marginBottom: 32, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
 <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("scale_kicker")}</span>
 <h2 className="reveal-up delay-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(44px, 7.4vw, 104px)", color: "var(--ink)", lineHeight: 0.93, letterSpacing: "-0.04em", marginTop: 18 }}>
 {t("scale_title")}
 </h2>
 </div>
 <div className="reveal reveal-up delay-2 road-pair" style={{ marginBottom: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
 <div className="brutal-frame" style={{ borderRadius: 4 }}><img src="/illustrations/road-left.png" alt={tt("home.roadAhead.leftImg.alt")} loading="lazy" width={600} height={400} className="road-pair-img" style={{ width: "100%", height: 320, display: "block", borderRadius: 0, objectFit: "cover", objectPosition: "center" }} /></div>
 <div className="brutal-frame" style={{ borderRadius: 4 }}><img src="/illustrations/road-right.png" alt={tt("home.roadAhead.rightImg.alt")} loading="lazy" width={600} height={400} className="road-pair-img" style={{ width: "100%", height: 320, display: "block", borderRadius: 0, objectFit: "cover", objectPosition: "center" }} /></div>
 </div>
 <style>{`
 @media (max-width: 599px) {
 .road-pair { grid-template-columns: 1fr !important; gap: 12px !important; }
 .road-pair-img { height: 180px !important; }
 }
 `}</style>

 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 24 }}>

 {cards.map((c, i) => (
 <div key={c.n} className={`reveal feature-card reveal-up delay-${i + 1}`} style={{
 background: "var(--paper)",
 border: "2px solid var(--ink)",
 borderRadius: 26,
 padding: "28px 26px",
 boxShadow: "var(--sticker)",
 }}>
 <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.18em", color: "var(--accent-deep)", textTransform: "uppercase" }}>{c.n}</div>
 <h3 className="font-display" style={{ fontSize: 23, color: "var(--ink)", lineHeight: 1.2, margin: "12px 0 0", letterSpacing: "-0.01em", fontWeight: 600 }}>{c.t}</h3>
 <div style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 12, fontWeight: 500 }}>{c.b}</div>
 </div>
 ))}
 </div>
 </Section>
 );
}

function FoundingOffer() {
 const { t, tt } = useI18n();
 const benefits = [t("fo_b1"), t("fo_b2"), t("fo_b3"), t("fo_b4")];
 return (
 <Section bg={"var(--bg2)"}>
 <div className="reveal reveal-up fade-up" style={{
 position: "relative",
 background: "var(--paper)",
 border: "2px solid #1A1A18",
 borderRadius: 4,
 padding: "clamp(36px, 5vw, 64px)",
 boxShadow: "#1A1A18 -6px 6px 0px 0px",
 overflow: "hidden",
 }}>
 <div aria-hidden style={{
 position: "absolute",
 top: -180,
 right: -180,
 width: 500,
 height: 500,
 borderRadius: "50%",
 background: "var(--accent-soft)",
 opacity: 0.6,
 pointerEvents: "none",
 }} />
 <img
 src={PIONEER_TUK.url}
 alt="mydiio pioneer tuk-tuk with amber flag, founding advertiser programme"
 loading="lazy"
 width={400}
 height={300}
 className="founding-tuk-accent"
 aria-hidden
 />
 <div style={{ position: "relative", zIndex: 1 }}>
 <span style={{
 display: "inline-block",
 fontFamily: "'Space Mono', monospace",
 fontWeight: 700,
 color: "#F5A623",
 textTransform: "uppercase",
 letterSpacing: "0.04em",
 fontSize: "clamp(24px, 3vw, 32px)",
 }}>{t("fo_kicker")}</span>
 <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(44px, 7.4vw, 104px)", color: "var(--ink)", lineHeight: 0.93, letterSpacing: "-0.04em", marginTop: 18 }}>
 {t("fo_title")}
 </h2>
 <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 16, maxWidth: 540, fontWeight: 500 }}>
 {t("fo_body")}
 </p>
 <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
 {benefits.map((b) => (
 <li key={b} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "var(--ink)", fontWeight: 600 }}>
 <span style={{
 display: "inline-flex", alignItems: "center", justifyContent: "center",
 width: 22, height: 22, borderRadius: "50%",
 background: "var(--accent)", border: "2px solid var(--ink)", flexShrink: 0,
 }}>
 <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#F5A623" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="4 12 10 18 20 6" />
 </svg>
 </span>
 {b}
 </li>
 ))}
 </ul>
 <Link to="/advertise" className="btn-brutal" style={{ display: "inline-block", marginTop: 32, padding: "14px 24px", fontSize: 15, textDecoration: "none", background: "#F5A623", color: "#1A1A18" }}>
 {tt("home.foundingOffer.cta")}
 </Link>
 </div>
 </div>
 </Section>
 );
}

function FAQ() {
 const { t, tt, lang } = useI18n();
 const items = [
 { q: t("faq_q1"), a: t("faq_a1") },
 { q: t("faq_q2"), a: t("faq_a2") },
 { q: t("faq_q3"), a: t("faq_a3") },
 { q: t("faq_q4"), a: t("faq_a4") },
 { q: t("faq_q5"), a: t("faq_a5") },
 ];
 const [openIdx, setOpenIdx] = useState<number | null>(null);
 return (
 <Section bg={"var(--bg)"}>
 <div className="fade-up">
 <div className="reveal" style={{ textAlign: "center", marginBottom: 32, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
 <span className="reveal-up" style={{
 display: "inline-block",
 fontFamily: "'Space Mono', monospace",
 fontWeight: 700,
 textTransform: "uppercase",
 letterSpacing: "0.04em",
 color: "#F5A623",
 fontSize: "clamp(24px, 3vw, 32px)",
 }}>{t("faq_kicker")}</span>
 <h2 className="reveal-up delay-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(44px, 7.4vw, 104px)", color: "var(--ink)", lineHeight: 0.93, letterSpacing: "-0.04em", marginTop: 18 }}>
 <EmTail text={t("faq_title")} tail={tt("home.faq.title.emTail")} lang={lang} />
 </h2>
 </div>
 <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
 {items.map((it, i) => {
 const open = openIdx === i;
 return (
 <div key={i} className={`faq-row reveal reveal-up${i < 4 ? ` delay-${i + 1}` : ""}`} style={{
 background: "#FFFFFF",
 border: "2px solid #1A1A18",
 borderRadius: 2,
 boxShadow: open ? "var(--sticker)" : "var(--sticker-press)",
 transition: "box-shadow 0.25s ease",
 overflow: "hidden",
 }}>
 <button
 type="button"
 onClick={() => setOpenIdx(open ? null : i)}
 aria-expanded={open}
 style={{
 width: "100%", background: "transparent", border: 0, cursor: "pointer",
 padding: "20px 24px", display: "flex", justifyContent: "space-between",
 alignItems: "center", gap: 16, textAlign: "left",
 fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 600,
 color: "var(--ink)", letterSpacing: "-0.01em",
 }}
 >
 <h3 style={{ margin: 0, fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", letterSpacing: "inherit" }}>{it.q}</h3>
 <span style={{
 fontFamily: "'Space Mono', monospace",
 color: "#F5A623",
 fontSize: 22,
 fontWeight: 700,
 lineHeight: 1,
 flexShrink: 0,
 transform: open ? "rotate(45deg)" : "rotate(0deg)",
 transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
 }}>+</span>
 </button>
 <div style={{
 maxHeight: open ? 600 : 0,
 overflow: "hidden",
 transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
 }}>
 <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.65, padding: "0 24px 22px", margin: 0, fontWeight: 500 }}>
 {it.a}
 </p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </Section>
 );
}

function FinalCTA() {
 const { t, tt } = useI18n();
 return (
 <section id="waitlist" className="relative w-full overflow-hidden" style={{ minHeight: 520, scrollMarginTop: 96 }}>
 <span id="signup-section" style={{ position: "absolute", top: -96 }} aria-hidden />
 <img src={FLEET_SUNSET} alt={tt("home.finalCta.fleetImg.alt")} loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
 <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,26,21,0.3), rgba(30,26,21,0.7))" }} />
 <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
 <span className="eyebrow" style={{ color: "var(--accent)", display: "inline-block" }}>{t("fcta_kicker")}</span>
  <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(44px, 7.4vw, 104px)", color: "var(--on-dark)", lineHeight: 0.93, letterSpacing: "-0.04em", marginTop: 18 }}>
  {t("fcta_title")}
  </h2>
  <p style={{ fontSize: "clamp(16px, 1.5vw, 19px)", color: "rgba(244,239,227,0.82)", lineHeight: 1.55, maxWidth: "52ch", margin: "24px auto 0", fontWeight: 500 }}>
  {t("fcta_body")}
  </p>
  <div style={{ marginTop: 40 }}>
  <AdvertiserApplication />
  </div>
 </div>
 </section>
 );
}

export default function MydiioLanding() {
 return (
 <SiteShell accent="amber">
 <style>{`
 .hero-trust { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 32px; max-width: 540px; }
 @media (min-width: 720px) { .hero-trust { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

 .paths-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
 @media (min-width: 760px) { .paths-grid { grid-template-columns: 1fr 1fr; gap: 24px; } }


 .path-card {
 border: 2px solid var(--ink);
 border-radius: 26px;
 box-shadow: var(--sticker);
 overflow: hidden;
 transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
 }
 .path-card:hover { transform: translateY(-4px); box-shadow: var(--sticker-lg); }

 .founding-tuk-accent {
 position: absolute;
 right: -20px;
 bottom: -20px;
 width: 90px;
 opacity: 0.85;
 z-index: 0;
 mix-blend-mode: multiply;
 pointer-events: none;
 border: none;
 box-shadow: none;
 }
 @media (min-width: 768px) {
 .founding-tuk-accent { width: 150px; }
 }
 `}</style>

  <Hero />
  <StatsStrip />
  <WhatsOnScreen />
  <Marquee />
  <WhyItWorks />

  <HowItWorks />
  <Infrastructure />
  <Coverage />
  <DriverSection />
  <ScaleStory />
  <TwoAudiences />
  <WhatMydiioIsNot />
  <FoundingOffer />
  <FAQ />
  <FinalCTA />
 </SiteShell>
 );
}

