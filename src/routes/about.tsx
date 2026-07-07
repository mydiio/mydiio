import { usePageMeta, useI18n } from "@/lib/i18n";
import { Fragment, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
const HERO_NIGHT = "/assets/hero-tuk-tuk-night-screen.png";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
const TUK_SCREEN = "/assets/illustration-tuk-screen.png";
const AYASHA = "/assets/illustration-ayasha-passenger.png";
const KAMAL = "/assets/illustration-kamal-driver.png";
const PIONEER_TUK = "/assets/illustration-pioneer-tuk.png";
const ROAD_LEFT = "/assets/tuk-stand-drivers-road-ahead.png";

type Variant = "advertiser" | "driver";

const BEFORE_DATA: Record<Variant, { eyebrowColor: string; afterBg: string; afterShadow: string; afterBorder: string }> = {
  advertiser: {
    eyebrowColor: "var(--accent-deep)",
    afterBg: "var(--paper)",
    afterShadow: "var(--shadow-card)",
    afterBorder: "var(--ink)",
  },
  driver: {
    eyebrowColor: "var(--green-ink)",
    afterBg: "var(--green-soft)",
    afterShadow: "var(--shadow-green)",
    afterBorder: "var(--green)",
  },
};

function BeforeAfterCard({ variant, children }: { variant: Variant; children: React.ReactNode }) {
  const { tt } = useI18n();
 const [showBefore, setShowBefore] = useState(false);
 const [opacity, setOpacity] = useState(1);
 const [renderBefore, setRenderBefore] = useState(false);
 const meta = BEFORE_DATA[variant];

 useEffect(() => {
 setOpacity(0);
 const t = setTimeout(() => {
 setRenderBefore(showBefore);
 setOpacity(1);
 }, 150);
 return () => clearTimeout(t);
 }, [showBefore]);

 const bg = showBefore ? "var(--bg2)" : meta.afterBg;
 const border = showBefore ? "var(--ink)" : meta.afterBorder;
 const shadow = showBefore ? "var(--shadow-card)" : meta.afterShadow;

 return (
 <div
 data-toggle={variant}
 style={{
 background: bg,
 border: `2px solid ${border}`,
 borderRadius: 26,
 boxShadow: shadow,
 padding: "clamp(24px, 3vw, 36px)",
 transition: "background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
 display: "flex",
 flexDirection: "column",
 }}
 >
 <div style={{ fontFamily: "'Space Mono', monospace", color: showBefore ? "var(--ink-mute)" : meta.eyebrowColor, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", transition: "color 300ms ease" }}>
 {showBefore ? <>{tt('about.beforeAfter.toggleBefore')} <span className="brand">mydiio</span></> : tt(`about.beforeAfter.${variant}.eyebrow`)}
 </div>
 <div style={{ opacity, transition: "opacity 300ms ease", flex: 1, marginTop: 8 }}>
 {renderBefore ? (
 <>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--ink-mute)", textDecoration: "line-through", margin: "0 0 16px" }}>
 {tt(`about.beforeAfter.${variant}.beforeHeading`)}
 </h3>
 <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
 {[1, 2, 3, 4].map((i) => (
 <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
 <span style={{ color: "#E24B4A", fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>×</span>
 <span style={{ color: "var(--ink-mute)", textDecoration: "line-through", fontSize: 14, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>{tt(`about.beforeAfter.${variant}.beforeRow${i}`)}</span>
 </li>
 ))}
 </ul>
 </>
 ) : (
 children
 )}
 </div>
 <button
 onClick={() => setShowBefore((v) => !v)}
 className="ba-toggle"
 style={{ background: "none", border: "none", padding: 0, marginTop: 18, fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--accent-deep)", cursor: "pointer", textAlign: "left", letterSpacing: "0.08em", alignSelf: "flex-start" }}
 >
 {showBefore ? tt('about.beforeAfter.backToNow') : tt('about.beforeAfter.whatWasItLike')}
 </button>
 </div>
 );
}

const PILLAR_PANELS: Record<string, { key: string; rowCount: number; hasChip?: boolean }> = {
  "01": { key: "transparency", rowCount: 4 },
  "02": { key: "driverDignity", rowCount: 4, hasChip: true },
  "03": { key: "communityReinvestment", rowCount: 3, hasChip: true },
};


function PillarCard({ n, h, b, i, openId, setOpenId, img }: { n: string; h: string; b: string; i: number; openId: string | null; setOpenId: (v: string | null) => void; img?: { url: string; alt: string; fit?: "cover" | "contain"; blend?: boolean } }) {
  const { tt } = useI18n();
 const open = openId === n;
 const panel = PILLAR_PANELS[n];
 return (
 <div
 data-pillar={n}
 className={`pillar-card reveal-up delay-${i + 1}`}
 style={{
 textAlign: "left",
 background: open ? "rgba(255,255,255,0.11)" : undefined,
 borderColor: open ? "var(--accent)" : undefined,
 transition: "all 0.2s ease",
 padding: img ? 0 : undefined,
 overflow: "hidden",
 }}
 >
 {img && (
 <img
 src={img.url}
 alt={img.alt}
 loading="lazy"
 width={800}
 height={450}
 style={{
 display: "block",
 width: "100%",
 height: 160,
 objectFit: img.fit ?? "cover",
 objectPosition: img.fit === "contain" ? "center" : "center top",
 borderRadius: "4px 4px 0 0",
 mixBlendMode: img.blend ? "multiply" : undefined,
 }}
 />
 )}
 <div style={{ padding: img ? "28px 24px" : 0 }}>
 <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "var(--accent)", fontSize: "clamp(32px,4vw,48px)", lineHeight: 1 }}>{n}</div>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20, color: "var(--on-dark)", margin: "12px 0 8px" }}>{h}</h3>
 <p style={{ color: "var(--on-dark)", opacity: 0.65, fontSize: 14, lineHeight: 1.65, margin: 0, fontFamily: "'Space Grotesk', sans-serif", overflow: open ? "visible" : "hidden", display: open ? "block" : "-webkit-box", WebkitLineClamp: open ? "unset" : 2, WebkitBoxOrient: "vertical" as const }}>
 {b}
 </p>
 <button
 onClick={() => setOpenId(open ? null : n)}
 style={{ background: "none", border: "none", padding: 0, marginTop: 14, fontFamily: "'Space Mono', monospace", color: "var(--accent)", fontSize: 12, letterSpacing: "0.08em", cursor: "pointer" }}
 >
 {tt('about.pillarCard.readMore')} <span style={{ display: "inline-block", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>+</span>
 </button>
 <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.5s var(--ease-spring)" }}>
 <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 16, marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
 {Array.from({ length: panel.rowCount }).map((_, idx) => (
 <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
 <span style={{ color: "var(--accent)", fontSize: 12, lineHeight: 1.5 }}>●</span>
 <span style={{ color: "var(--on-dark)", opacity: 0.7, fontSize: 13, lineHeight: 1.55, fontFamily: "'Space Grotesk', sans-serif" }}>{tt(`about.pillars.${panel.key}.detail.row${idx + 1}`)}</span>
 </div>
 ))}
 {panel.hasChip && (
 <div style={{ marginTop: 6 }}>
 <span style={{ display: "inline-block", background: "var(--accent)", color: "var(--accent-ink)", borderRadius: 20, padding: "4px 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700 }}>
 {tt(`about.pillars.${panel.key}.chip`)}
 </span>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
}

export const Route = createFileRoute("/about")({
 component: AboutPage,
 head: () => ({
 meta: [
 { title: "About mydiio, Built in Colombo, for Colombo" },
 { name: "description", content: "mydiio is Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people. Every Journey, Connected." },
 { property: "og:title", content: "About, mydiio" },
 { property: "og:description", content: "Every Journey, Connected. Built in Colombo, for Colombo." },
 { property: "og:image", content: "/illustrations/tuk-screen.png" },
 { property: "og:url", content: "https://mydiio.com/about" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/about" }],
 }),

});

const primaryBtn: React.CSSProperties = {
 background: "var(--accent)",
 color: "var(--accent-ink)",
 border: "2px solid var(--ink)",
 borderRadius: 14,
 boxShadow: "3px 3px 0 var(--ink)",
 padding: "12px 24px",
 fontFamily: "'Space Grotesk', sans-serif",
 fontWeight: 600,
 fontSize: 15,
 textDecoration: "none",
 display: "inline-block",
 transition: "all 0.15s ease",
 cursor: "pointer",
};

const greenBtn: React.CSSProperties = {
 ...primaryBtn,
 background: "var(--green)",
 color: "var(--on-dark)",
};

// tickerText moved inside component

function AboutPage() {
  const { tt } = useI18n();
  usePageMeta({ titleKey: "meta_about_title", descKey: "meta_about_desc" });
  const [openPillar, setOpenPillar] = useState<string | null>(null);
  const tickerText = tt('about.ticker');
  return (
  <SiteShell accent="amber">
 <style>{`
 .ba-toggle:hover { text-decoration: underline; }
 .about-eyebrow { font-family: 'Space Mono', monospace; font-weight: 700; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-deep); }
 .about-h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(44px, 7vw, 96px); letter-spacing: -0.04em; line-height: 0.93; color: var(--ink); margin: 14px 0 0; }
 .about-h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(32px, 5vw, 64px); letter-spacing: -0.03em; color: var(--ink); margin: 12px 0 0; line-height: 1.05; }
 .about-h2-dark { color: var(--on-dark); }
 .about-lead { font-family: 'Space Grotesk', sans-serif; font-weight: 400; font-size: clamp(17px, 1.6vw, 20px); color: var(--ink-soft); line-height: 1.55; }
 .about-h2 em, .about-h2-dark em { font-family: 'DM Serif Display', serif; font-style: italic; font-weight: 400; }
 .about-h2-dark em { color: var(--accent); }
 .about-btn:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--ink) !important; }

 .about-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
 @media (max-width: 480px) { .about-cta-row { flex-direction: column; align-items: stretch; } .about-cta-row a { text-align: center; } }

 @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
 .ticker-strip { background: var(--ink); padding: 11px 0; overflow: hidden; margin: 0; width: 100%; }
 .ticker-inner { display: flex; white-space: nowrap; animation: ticker 28s linear infinite; font-family: 'Space Mono', monospace; font-size: 12px; color: var(--on-dark); opacity: 0.8; letter-spacing: 0.12em; }
 .ticker-strip:hover .ticker-inner { animation-play-state: paused; }

 .problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
 @media (max-width: 768px) { .problem-grid { grid-template-columns: 1fr; } }

 .steps-row { display: flex; align-items: stretch; gap: 0; justify-content: center; }
 .steps-row > .step-card { flex: 1; }
 .step-connector { align-self: center; width: 24px; height: 2px; background: var(--accent); opacity: 0.5; margin: 0 14px; flex-shrink: 0; }
 @media (max-width: 768px) { .steps-row { flex-direction: column; gap: 20px; } .step-connector { display: none; } }

 .step-card { background: var(--paper); border: 2px solid var(--ink); border-radius: 20px; box-shadow: var(--sticker); padding: 28px 24px; transition: all 0.2s ease; }
 .step-card:hover { transform: translateY(-4px); box-shadow: var(--sticker-lg); }

 .pillars-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
 @media (max-width: 768px) { .pillars-row { grid-template-columns: 1fr; } }
 .pillar-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); border-radius: 20px; padding: 28px 24px; transition: all 0.2s ease; }
 .pillar-card:hover { background: rgba(255,255,255,0.11); border-color: var(--accent); }

 .cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
 @media (max-width: 640px) { .cta-grid { grid-template-columns: 1fr; } }
 `}</style>

 {/* SECTION 1, HERO */}
 <section className="page-hero-fixed" style={{ position: "relative", overflow: "hidden", paddingBottom: "clamp(48px, 6vh, 80px)" }}>
 <img src={HERO_NIGHT} alt={tt('about.hero.imageAlt')} loading="eager" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center" }} />
 <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.55) 40%, rgba(26,26,24,0.88) 100%)" }} />
 {/* Amber arcs decoration */}
 <svg
 aria-hidden="true"
 width="520"
 height="520"
 viewBox="0 0 520 520"
 style={{ position: "absolute", right: "-160px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.08, zIndex: 1 }}
 >
 <g fill="none" stroke="var(--accent)" strokeWidth="2">
 <circle cx="260" cy="260" r="120" />
 <circle cx="260" cy="260" r="180" />
 <circle cx="260" cy="260" r="240" />
 </g>
 </svg>
 <div className="relative z-10 flex flex-col items-start justify-end page-hero-inner" style={{ padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 72px) clamp(48px, 6vh, 80px)" }}>
 <div style={{ maxWidth: "55%", width: "100%" }} className="page-hero-textblock">
 <span className="page-hero-label">
 {tt('about.hero.eyebrow')}<span className="brand">mydiio</span>
 </span>
 <h1 className="page-hero-headline" style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif",
 color: "#fff",
 fontWeight: 500,
 lineHeight: 1.4,
 marginTop: 14,
 }}>
 Every Journey, Connected.
 </h1>
 <p style={{
 fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 400,
 fontSize: 16,
 color: "rgba(253,250,243,0.85)", marginTop: 18, maxWidth: 600, lineHeight: 1.7,
 }}>
 {tt('about.hero.body')}
 </p>
 <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
 <a href="/advertise/apply" className="about-btn" style={primaryBtn}>{tt('about.hero.ctaAdvertise')}</a>
 <a href="/drivers/apply" className="about-btn" style={greenBtn}>{tt('about.hero.ctaDriver')}</a>
 </div>
 <div className="page-hero-stats" style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid rgba(253,250,243,0.18)", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
 {[
 { v: tt('about.hero.stat1Value'), suffix: "", label: tt('about.hero.stat1Label') },
  { v: tt('about.hero.stat2Value'), suffix: "", label: tt('about.hero.stat2Label') },
  { v: tt('about.hero.stat3Value'), suffix: "", label: tt('about.hero.stat3Label') },
  { v: tt('about.hero.stat4Value'), suffix: "", label: tt('about.hero.stat4Label') },
 ].map((s, i) => (
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
 <style>{`
 .page-hero-fixed { min-height: 480px; }
 .page-hero-inner { min-height: 480px; }
 .page-hero-headline { font-size: 28px; }
 @media (max-width: 767px) {
 .page-hero-fixed { min-height: 320px; }
 .page-hero-inner { min-height: 320px; }
 .page-hero-headline { font-size: 22px; }
 .page-hero-textblock { max-width: 100% !important; }
 .page-hero-stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
 }
 `}</style>
 </section>

 {/* SECTION 2, THE PROBLEM */}
 <section style={{ background: "var(--bg2)", padding: "var(--section-py) clamp(20px, 5vw, 72px)" }}>
 <div style={{ maxWidth: 1240, margin: "0 auto" }}>
 <div className="mission-intro reveal-up" style={{ display: "flex", gap: "clamp(20px, 4vw, 48px)", alignItems: "center", marginBottom: 52, flexWrap: "wrap" }}>
 <div style={{ flex: "1 1 320px", textAlign: "left" }}>
 <span className="about-eyebrow">{tt('about.problem.eyebrow')}</span>
 <h2 className="about-h2" style={{ marginTop: 10 }}>{tt('about.problem.heading')}</h2>
 <p className="about-lead" style={{ maxWidth: "52ch", marginTop: 16 }}>
 {tt('about.problem.body')}
 </p>
 </div>
 <img
 src={TUK_SCREEN}
 alt={tt('about.problem.imageAlt')}
 loading="lazy"
 width={600}
 height={400}
 className="mission-tuk-screen"
 style={{
 width: 300,
 flexShrink: 0,
 border: "2px solid #1A1A18",
 borderRadius: 4,
 boxShadow: "#1A1A18 -5px 5px 0px 0px",
 mixBlendMode: "multiply",
 }}
 />
 </div>
 <style>{`@media (max-width: 768px) { .mission-tuk-screen { width: 100% !important; } }`}</style>
 <div className="reveal-up delay-2" style={{ position: "relative", width: "100%", height: 280, overflow: "hidden", border: "2px solid #1A1A18", boxShadow: "#1A1A18 -5px 5px 0px 0px", marginBottom: 52 }}>
 <img src={ROAD_LEFT} alt={tt('about.problem.roadImageAlt')} loading="lazy" width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
 </div>
 <div className="problem-grid reveal-up delay-3">
 <BeforeAfterCard variant="advertiser">
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--ink)", margin: "0 0 12px" }}>{tt('about.beforeAfter.advertiser.afterHeading')}</h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
 {tt('about.beforeAfter.advertiser.afterBody')}
 </p>
 </BeforeAfterCard>
 <BeforeAfterCard variant="driver">
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--ink)", margin: "0 0 12px" }}>{tt('about.beforeAfter.driver.afterHeading')}</h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
 {tt('about.beforeAfter.driver.afterBody')}
 </p>
 </BeforeAfterCard>
 </div>
 </div>
 </section>

 {/* SECTION 3, HOW IT WORKS */}
 <section style={{ background: "var(--bg)", padding: "var(--section-py) clamp(20px, 5vw, 72px)", textAlign: "center" }}>
 <div style={{ maxWidth: 1240, margin: "0 auto" }}>
 <span className="about-eyebrow reveal-up">{tt('about.howItWorks.eyebrow')}</span>
 <h2 className="about-h2 reveal-up delay-1" dangerouslySetInnerHTML={{ __html: tt('about.howItWorks.heading') }} />
 <p className="about-lead reveal-up delay-2" style={{ maxWidth: "46ch", margin: "16px auto 48px" }}>
 {tt('about.howItWorks.body')}
 </p>
 <div className="steps-row reveal-up delay-3">
 {[
 { n: "01", h: "Send us your creative", b: "A 15 or 30-second video, or a static image. Don't have one yet? We'll produce your first ad for free as part of getting started." },
 { n: "02", h: "We go live overnight", b: "Your ad loads to every active screen in your chosen vehicle plan across the fleet. GPS tracking starts the moment it goes live." },
 { n: "03", h: "You get the proof", b: "Every Monday you receive a verified report. It shows every vehicle, every GPS location, every play. No estimates. No guessing. Exact numbers." },

 ].map((s, i, arr) => (
 <Fragment key={s.n}>
 <div className="step-card" style={{ textAlign: "left" }}>
 <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "var(--accent-deep)", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1 }}>{s.n}</div>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20, color: "var(--ink)", margin: "12px 0 8px" }}>{s.h}</h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{s.b}</p>
 </div>
 {i < arr.length - 1 && <div className="step-connector" />}
 </Fragment>
 ))}
 </div>
 </div>
 </section>

 {/* SECTION 4, COMMITMENTS */}
 <section style={{ background: "var(--ink)", padding: "var(--section-py) clamp(20px, 5vw, 72px)", textAlign: "center" }}>
 <div style={{ maxWidth: 1240, margin: "0 auto" }}>
 <span className="about-eyebrow reveal-up" style={{ color: "var(--accent)" }}>{tt('about.commitments.eyebrow')}</span>
 <h2 className="about-h2 about-h2-dark reveal-up delay-1" style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }} dangerouslySetInnerHTML={{ __html: tt('about.commitments.heading') }} />
 <p className="reveal-up delay-2" style={{ color: "var(--on-dark)", opacity: 0.65, fontSize: "clamp(15px,1.4vw,18px)", maxWidth: "52ch", margin: "16px auto 48px", lineHeight: 1.55, fontFamily: "'Space Grotesk', sans-serif" }}>
 {tt('about.commitments.body')}
 </p>
 <div className="pillars-row">
 {([
  { n: "01", h: tt('about.pillars.transparency.title'), b: tt('about.pillars.transparency.bodyLong'), img: { url: AYASHA, alt: tt('about.pillars.transparency.imageAlt'), fit: "cover" as const } },
  { n: "02", h: tt('about.pillars.driverDignity.title'), b: tt('about.pillars.driverDignity.bodyLong'), img: { url: KAMAL, alt: tt('about.pillars.driverDignity.imageAlt'), fit: "cover" as const } },
  { n: "03", h: tt('about.pillars.communityReinvestment.title'), b: tt('about.pillars.communityReinvestment.bodyLong'), img: { url: PIONEER_TUK, alt: tt('about.pillars.communityReinvestment.imageAlt'), fit: "contain" as const, blend: true } },
 ]).map((p, i) => (
 <PillarCard key={p.n} n={p.n} h={p.h} b={p.b} i={i} openId={openPillar} setOpenId={setOpenPillar} img={p.img} />
 ))}
 </div>
 </div>
 </section>

 {/* SECTION 4.5, DRIVER DIGNITY PROOF (transitional) */}
 <section style={{ background: "var(--bg2)", padding: "var(--section-py) clamp(20px, 5vw, 72px)" }}>
 <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 56px)", alignItems: "center" }} className="dignity-grid">
 <div className="reveal-up" style={{ background: "var(--bg)", border: "2px dashed rgba(30,26,21,0.2)", borderRadius: 18, aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
 <img src={DRIVER_PAYMENT} alt={tt('about.driverDignityProof.imageAlt')} loading="lazy" width={800} height={450} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
 </div>
 <div className="reveal-up delay-1">
 <span className="eyebrow" style={{ color: "var(--green-ink)" }}>{tt('about.driverDignityProof.eyebrow')}</span>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 34px)", color: "var(--ink)", margin: "8px 0 14px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
 Paid on the 5th. Every month.
 </h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
 {tt('about.driverDignityProof.body')}
 </p>
 <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--green-ink)", fontWeight: 700, marginTop: 16, letterSpacing: "0.08em" }}>
 {tt('about.driverDignityProof.tagline')}
 </div>
 </div>
 </div>
 <style>{`@media (max-width: 768px) { .dignity-grid { grid-template-columns: 1fr !important; } }`}</style>
 </section>

 {/* SECTION 5, CTA */}
 <section style={{ background: "var(--bg2)", padding: "var(--section-py) clamp(20px, 5vw, 72px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
 <img src={COLOMBO_STREET} alt="" aria-hidden="true" loading="lazy" width={1200} height={500} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.06, zIndex: 0, pointerEvents: "none" }} />
 <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
 <span className="about-eyebrow reveal-up">{tt('about.cta.eyebrow')}</span>
 <h2 className="about-h2 reveal-up delay-1" style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }}>{tt('about.cta.heading')}</h2>
 <p className="about-lead reveal-up delay-2" style={{ maxWidth: "48ch", margin: "16px auto 40px" }}>
 {tt('about.cta.body')}
 </p>
 <div className="cta-grid reveal-up delay-3">
 <div className="cta-card-amber" style={{ background: "var(--accent-soft)", border: "2px solid var(--ink)", borderRadius: 26, boxShadow: "var(--shadow-card)", padding: "32px 28px", textAlign: "left", transition: "all 0.2s ease" }}>
 <div style={{ fontFamily: "'Space Mono', monospace", color: "var(--accent-deep)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>{tt('about.cta.advertiser.eyebrow')}</div>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>{tt('about.cta.advertiser.heading')}</h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{tt('about.cta.advertiser.body')}</p>
 <a href="/advertise/apply" className="about-btn" style={{ ...primaryBtn, marginTop: 20, width: "100%", textAlign: "center", boxSizing: "border-box" }}>{tt('about.cta.advertiser.button')}</a>
 </div>
 <div className="cta-card-green" style={{ background: "var(--green-soft)", border: "2px solid var(--green)", borderRadius: 26, boxShadow: "var(--shadow-green)", padding: "32px 28px", textAlign: "left", transition: "all 0.2s ease" }}>
 <div style={{ fontFamily: "'Space Mono', monospace", color: "var(--green-ink)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>{tt('about.cta.driver.eyebrow')}</div>
 <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>{tt('about.cta.driver.heading')}</h3>
 <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{tt('about.cta.driver.body')}</p>
 <a href="/drivers/apply" className="about-btn" style={{ ...greenBtn, marginTop: 20, width: "100%", textAlign: "center", boxSizing: "border-box" }}>{tt('about.cta.driver.button')}</a>
 </div>
 </div>
 <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--ink-mute)", marginTop: 20, letterSpacing: "0.08em" }}>
 {tt('about.cta.disclaimer')}
 </p>
 </div>
 <style>{`
 .cta-card-amber:hover { transform: translate(-3px,-3px); box-shadow: var(--shadow-card-hover) !important; }
 .cta-card-green:hover { transform: translate(-3px,-3px); box-shadow: var(--shadow-green-hover) !important; }
 `}</style>
 </section>
 </SiteShell>
 );
}
