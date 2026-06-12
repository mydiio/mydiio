import { Fragment, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import HERO_NIGHT from "@/assets/hero-tuk-tuk-night-screen.png.asset.json";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import TUK_SCREEN from "@/assets/illustration-tuk-screen.png.asset.json";
import AYASHA from "@/assets/illustration-ayasha-passenger.png.asset.json";
import KAMAL from "@/assets/illustration-kamal-driver.png.asset.json";
import PIONEER_TUK from "@/assets/illustration-pioneer-tuk.png.asset.json";
import ROAD_LEFT from "@/assets/tuk-stand-drivers-road-ahead.png.asset.json";

type Variant = "advertiser" | "driver";

const BEFORE_DATA: Record<Variant, { eyebrow: string; eyebrowColor: string; heading: string; rows: string[]; afterBg: string; afterShadow: string; afterBorder: string }> = {
  advertiser: {
    eyebrow: "For business owners",
    eyebrowColor: "var(--accent-deep)",
    heading: "Advertising was only for big companies.",
    rows: [
      "Billboard — LKR 200,000+ per month",
      "TV slot — LKR 500,000+ minimum",
      "Zero proof your ad ever ran",
      "Need an agency just to start",
    ],
    afterBg: "var(--paper)",
    afterShadow: "var(--shadow-card)",
    afterBorder: "var(--ink)",
  },
  driver: {
    eyebrow: "For tuk-tuk drivers",
    eyebrowColor: "var(--green-ink)",
    heading: "Driving was the only way to earn.",
    rows: [
      "Zero passive income from the vehicle",
      "Income drops the moment you stop driving",
      "No benefits, no recognition, no bonus",
      "The tuk-tuk interior earned nothing while you drove",
    ],
    afterBg: "var(--green-soft)",
    afterShadow: "var(--shadow-green)",
    afterBorder: "var(--green)",
  },
};

function BeforeAfterCard({ variant, children }: { variant: Variant; children: React.ReactNode }) {
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
        {showBefore ? <>Before <span className="brand">mydiio</span></> : meta.eyebrow}
      </div>
      <div style={{ opacity, transition: "opacity 300ms ease", flex: 1, marginTop: 8 }}>
        {renderBefore ? (
          <>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--ink-mute)", textDecoration: "line-through", margin: "0 0 16px" }}>
              {meta.heading}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {meta.rows.map((r) => (
                <li key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#E24B4A", fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>×</span>
                  <span style={{ color: "var(--ink-mute)", textDecoration: "line-through", fontSize: 14, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>{r}</span>
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
        {showBefore ? "← Back to now" : "What was it like before? →"}
      </button>
    </div>
  );
}

const PILLAR_PANELS: Record<string, { rows: string[]; chip?: string }> = {
  "01": {
    rows: [
      "Every play logged with vehicle ID, GPS location, time, and duration",
      "Weekly verified report delivered every Monday",
      "No estimates — exact numbers only",
      "GPS-verified — not self-reported",
    ],
  },
  "02": {
    rows: [
      "Paid on the 5th of every month by bank transfer — without exception",
      "Clear written agreement before any screen is installed",
      "Never penalised for genuine technical faults",
      "Branded merchandise, loyalty bonuses, founding partner recognition",
    ],
    chip: "A competitor can copy our screens. They cannot copy our culture.",
  },
  "03": {
    rows: [
      "A percentage of net revenue reinvested into driver communities",
      "Commitment built in from day one — not added later",
      "The city that powers our network shares in its growth",
    ],
    chip: "Built in Colombo. For Colombo.",
  },
};


function PillarCard({ n, h, b, i, openId, setOpenId, img }: { n: string; h: string; b: string; i: number; openId: string | null; setOpenId: (v: string | null) => void; img?: { url: string; alt: string; fit?: "cover" | "contain"; blend?: boolean } }) {
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
        Read more <span style={{ display: "inline-block", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.5s var(--ease-spring)" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 16, marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {panel.rows.map((r) => (
            <div key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--accent)", fontSize: 12, lineHeight: 1.5 }}>●</span>
              <span style={{ color: "var(--on-dark)", opacity: 0.7, fontSize: 13, lineHeight: 1.55, fontFamily: "'Space Grotesk', sans-serif" }}>{r}</span>
            </div>
          ))}
          {panel.chip && (
            <div style={{ marginTop: 6 }}>
              <span style={{ display: "inline-block", background: "var(--accent)", color: "var(--accent-ink)", borderRadius: 20, padding: "4px 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700 }}>
                {panel.chip}
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
      { title: "About mydiio — Built in Colombo, for Colombo" },
      { name: "description", content: "mydiio is Sri Lanka's first tuk-tuk advertising network. Built on three pillars: radical transparency, driver dignity, and community reinvestment. Ads on the Move." },
      { property: "og:title", content: "About — mydiio" },
      { property: "og:description", content: "Ads on the move. Built in Colombo, for Colombo." },
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

const tickerText = "Ads on the Move · GPS Verified · Built in Colombo · For Colombo · Every Ride · Every Screen · Every Business · ";

function AboutPage() {
  const [openPillar, setOpenPillar] = useState<string | null>(null);
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

      {/* SECTION 1 — HERO */}
      <section className="page-hero-fixed" style={{ position: "relative", overflow: "hidden", paddingBottom: "clamp(48px, 6vh, 80px)" }}>
        <img src={HERO_NIGHT.url} alt="Tuk-tuks moving through Colombo at night" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center" }} />
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
              About <span className="brand">mydiio</span>
            </span>
            <h1 className="page-hero-headline" style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "#fff",
              fontWeight: 500,
              lineHeight: 1.4,
              marginTop: 14,
            }}>
              Ads on the move.
            </h1>
            <p style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 400,
              fontSize: 16,
              color: "rgba(253,250,243,0.85)", marginTop: 18, maxWidth: 600, lineHeight: 1.7,
            }}>
              mydiio puts digital advertising screens inside tuk-tuks across Colombo. Every ride is an audience. Every driver earns more. Every impression is verified.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <a href="/advertise/apply" className="about-btn" style={primaryBtn}>Launch a campaign →</a>
              <a href="/drivers/apply" className="about-btn" style={greenBtn}>Become a driver →</a>
            </div>
            <div className="page-hero-stats" style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid rgba(253,250,243,0.18)", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
              {[
                { v: "Colombo", suffix: "", label: "where we operate" },
                { v: "2026", suffix: "", label: "founded" },
                { v: "Drivers", suffix: "", label: "our partners" },
                { v: "Verified", suffix: "", label: "every impression" },
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

      {/* SECTION 2 — THE PROBLEM */}
      <section style={{ background: "var(--bg2)", padding: "var(--section-py) clamp(20px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="mission-intro reveal-up" style={{ display: "flex", gap: "clamp(20px, 4vw, 48px)", alignItems: "center", marginBottom: 52, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 320px", textAlign: "left" }}>
              <span className="about-eyebrow">The problem we solve</span>
              <h2 className="about-h2" style={{ marginTop: 10 }}>Two groups were being left behind.</h2>
              <p className="about-lead" style={{ maxWidth: "52ch", marginTop: 16 }}>
                Small businesses couldn't afford to advertise. Tuk-tuk drivers had no way to earn extra income. mydiio fixes both at once.
              </p>
            </div>
            <img
              src={TUK_SCREEN.url}
              alt="Tuk-tuk with digital advertising screen mounted inside cab, Colombo Sri Lanka"
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
            <img src={ROAD_LEFT.url} alt="Tuk-tuks on the road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          </div>
          <div className="problem-grid reveal-up delay-3">
            <BeforeAfterCard variant="advertiser">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--ink)", margin: "0 0 12px" }}>Advertising was only for big companies.</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                A pharmacy in Nugegoda. A bakery in Fort. A clothing shop in Wellawatte. They had nowhere to go. Billboards cost millions. TV ads need an agency. Digital requires expertise most small businesses don't have. mydiio changes that — starting from LKR 25,000 a month, with GPS-verified proof that your ad ran.
              </p>
            </BeforeAfterCard>
            <BeforeAfterCard variant="driver">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--ink)", margin: "0 0 12px" }}>Driving was the only way to earn.</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                Over a million tuk-tuks move through Sri Lanka every day. Their drivers earn from fares and nothing else. mydiio installs a screen in your tuk — you drive your normal routes, and earn LKR 6,000 every month as a base. Drive 8+ hours a day and that becomes LKR 8,000. The screen does the work. You just drive.
              </p>
            </BeforeAfterCard>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section style={{ background: "var(--bg)", padding: "var(--section-py) clamp(20px, 5vw, 72px)", textAlign: "center" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <span className="about-eyebrow reveal-up">How it works</span>
          <h2 className="about-h2 reveal-up delay-1" dangerouslySetInnerHTML={{ __html: "Simple for brands. Valuable for <em>drivers</em>." }} />
          <p className="about-lead reveal-up delay-2" style={{ maxWidth: "46ch", margin: "16px auto 48px" }}>
            Three steps. No technical knowledge needed. From sending your ad to going live in 72 hours.
          </p>
          <div className="steps-row reveal-up delay-3">
            {[
              { n: "01", h: "Send us your creative", b: "A 15 or 30-second video, or a static image. Don't have one yet? We'll produce your first ad for free as part of getting started." },
              { n: "02", h: "We go live overnight", b: "Your ad loads to every active screen in your chosen zones across the fleet. GPS tracking starts the moment it goes live." },
              { n: "03", h: "You get the proof", b: "Every Monday you receive a verified report. It shows every vehicle, every GPS location, every play. No estimates. No guessing. Exact numbers." },

            ].map((s, i, arr) => (
              <Fragment key={s.n}>
                <div className="step-card" style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "var(--accent-deep)", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1 }}>{s.n}</div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20, color: "var(--ink)", margin: "12px 0 8px" }}>{s.h}</h4>
                  <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{s.b}</p>
                </div>
                {i < arr.length - 1 && <div className="step-connector" />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — COMMITMENTS */}
      <section style={{ background: "var(--ink)", padding: "var(--section-py) clamp(20px, 5vw, 72px)", textAlign: "center" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <span className="about-eyebrow reveal-up" style={{ color: "var(--accent)" }}>Our commitments</span>
          <h2 className="about-h2 about-h2-dark reveal-up delay-1" style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }} dangerouslySetInnerHTML={{ __html: "Not just the right thing to do. The <em>smart</em> thing to do." }} />
          <p className="reveal-up delay-2" style={{ color: "var(--on-dark)", opacity: 0.65, fontSize: "clamp(15px,1.4vw,18px)", maxWidth: "52ch", margin: "16px auto 48px", lineHeight: 1.55, fontFamily: "'Space Grotesk', sans-serif" }}>
            Three commitments that make us better to work with — and harder for anyone else to copy.
          </p>
          <div className="pillars-row">
            {([
              { n: "01", h: "Radical transparency", b: "Every advertiser sees exactly which vehicles showed their ad, when, and where — GPS-verified and time-stamped. Most advertising in Sri Lanka offers zero proof of delivery. mydiio offers complete verification. No black box. No estimates.", img: { url: AYASHA.url, alt: "Passenger watching tuk-tuk advertising screen inside a Colombo tuk-tuk", fit: "cover" as const } },
              { n: "02", h: "Driver dignity", b: "Paid on the 5th of every month by bank transfer — without exception or delay. Clear written agreements before any screen is installed. Never penalised for things outside their control. Treated as partners, not vendors.", img: { url: KAMAL.url, alt: "Tuk-tuk driver earning passive income with mydiio advertising platform", fit: "cover" as const } },
              { n: "03", h: "Community reinvestment", b: "A share of mydiio's revenue goes back into the communities our drivers serve. Not as a PR exercise — as a founding commitment built into the business from day one.", img: { url: PIONEER_TUK.url, alt: "mydiio pioneer tuk-tuk with amber flag — founding advertiser programme", fit: "contain" as const, blend: true } },
            ]).map((p, i) => (
              <PillarCard key={p.n} n={p.n} h={p.h} b={p.b} i={i} openId={openPillar} setOpenId={setOpenPillar} img={p.img} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4.5 — DRIVER DIGNITY PROOF (transitional) */}
      <section style={{ background: "var(--bg2)", padding: "var(--section-py) clamp(20px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 56px)", alignItems: "center" }} className="dignity-grid">
          <div className="reveal-up" style={{ background: "var(--bg)", border: "2px dashed rgba(30,26,21,0.2)", borderRadius: 18, aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img src={DRIVER_PAYMENT} alt="Driver payment confirmation" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="reveal-up delay-1">
            <span className="eyebrow" style={{ color: "var(--green-ink)" }}>Driver Dignity</span>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 34px)", color: "var(--ink)", margin: "8px 0 14px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Paid on the 5th. Every month.
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
              Not a promise on a website. A commitment built into the business from day one. Every driver receives a bank transfer on the 5th of every calendar month, without exception. We've built the platform around this — not around it.
            </p>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--green-ink)", fontWeight: 700, marginTop: 16, letterSpacing: "0.08em" }}>
              No exceptions · No delays · No excuses
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .dignity-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* SECTION 5 — CTA */}
      <section style={{ background: "var(--bg2)", padding: "var(--section-py) clamp(20px, 5vw, 72px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <img src={COLOMBO_STREET} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.06, zIndex: 0, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <span className="about-eyebrow reveal-up">Get involved</span>
          <h2 className="about-h2 reveal-up delay-1" style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }}>There's a place for you in the network.</h2>
          <p className="about-lead reveal-up delay-2" style={{ maxWidth: "48ch", margin: "16px auto 40px" }}>
            Whether you want to reach Colombo's daily commuters or earn extra income alongside your existing routes — the door is open.
          </p>
          <div className="cta-grid reveal-up delay-3">
            <div className="cta-card-amber" style={{ background: "var(--accent-soft)", border: "2px solid var(--ink)", borderRadius: 26, boxShadow: "var(--shadow-card)", padding: "32px 28px", textAlign: "left", transition: "all 0.2s ease" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", color: "var(--accent-deep)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>For businesses</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>Run your first campaign.</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>From LKR 25,000 a month. First 7 days free. GPS-verified proof every Monday. No agency needed.</p>
              <a href="/advertise/apply" className="about-btn" style={{ ...primaryBtn, marginTop: 20, width: "100%", textAlign: "center", boxSizing: "border-box" }}>Apply for a spot →</a>
            </div>
            <div className="cta-card-green" style={{ background: "var(--green-soft)", border: "2px solid var(--green)", borderRadius: 26, boxShadow: "var(--shadow-green)", padding: "32px 28px", textAlign: "left", transition: "all 0.2s ease" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", color: "var(--green-ink)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>For tuk-tuk drivers</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>Earn more from every ride.</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>LKR 6,000 base pay every month. Keep your routes. Screen installed free. Payment on the 5th, every month, without fail.</p>
              <a href="/drivers/apply" className="about-btn" style={{ ...greenBtn, marginTop: 20, width: "100%", textAlign: "center", boxSizing: "border-box" }}>Apply to join →</a>
            </div>
          </div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--ink-mute)", marginTop: 20, letterSpacing: "0.08em" }}>
            No payment today. We'll contact you within 24 hours.
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
