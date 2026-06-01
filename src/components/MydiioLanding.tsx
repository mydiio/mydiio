import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import { useI18n } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { WaitlistForm } from "@/components/site/WaitlistForm";
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

function HeroWords({ text }: { text: string }) {
  const words = text.split(/(\s+)/);
  let i = 0;
  return (
    <>
      {words.map((w, idx) => {
        if (/^\s+$/.test(w)) return <span key={idx}>{w}</span>;
        const delay = 300 + i * 60;
        i += 1;
        return (
          <span key={idx} className="hero-word" style={{ animationDelay: `${delay}ms`, display: "inline-block" }}>
            {w}
          </span>
        );
      })}
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const v1 = useCountUp(50, 1400, 0);
  const v2 = useCountUp(7, 1400, 100);
  const v3 = useCountUp(14, 1400, 200);
  const v4 = useCountUp(72, 1400, 300);

  // Split trailing period off the headline so we can color it.
  const rawTitle = t("hero_title");
  const endsWithPeriod = /[.।。]$/.test(rawTitle);
  const titleBody = endsWithPeriod ? rawTitle.slice(0, -1) : rawTitle;
  const titlePeriod = endsWithPeriod ? rawTitle.slice(-1) : "";

  // On-dark color adaptations of the global tokens
  const ON_DARK = "#F4EFE3";
  const ON_DARK_SOFT = "rgba(244,239,227,0.78)";
  const ON_DARK_MUTE = "rgba(244,239,227,0.55)";

  return (
    <section data-nav-section="home" className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={COLOMBO_STREET} alt="Tuk-tuks moving through Colombo at golden hour" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.45) 40%, rgba(20,16,12,0.88) 100%)" }} />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "clamp(120px, 16vh, 180px) clamp(22px, 6vw, 80px) clamp(72px, 10vh, 110px)" }}>
        <div style={{ maxWidth: 980 }}>
          <span className="eyebrow hero-enter hero-badge" style={{ color: C.accent }}>
            Sri Lanka · Mobility Media
          </span>
          <h1 className="hero-headline" style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            color: "#fff",
            fontSize: "clamp(44px, 7.4vw, 104px)",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            marginTop: 18,
          }}>
            <HeroWords text={titleBody} />
            {endsWithPeriod && (
              <span className="hero-word" style={{ color: C.accentDeep, display: "inline-block", animationDelay: "900ms" }}>
                {titlePeriod}
              </span>
            )}
          </h1>
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

          <div
            className="hero-trust"
            style={{
              marginTop: 52,
              paddingTop: 28,
              borderTop: "1px solid rgba(244,239,227,0.18)",
            }}
          >
            {[
              { v: `${v1}`, suffix: "+", k: "metric_vehicles" as const },
              { v: `${v2}`, suffix: "", k: "metric_zones" as const },
              { v: `${v3}`, suffix: ` ${t("metric_min")}`, k: "metric_attention" as const },
              { v: `${v4}`, suffix: ` ${t("metric_hr")}`, k: "metric_launch" as const },
            ].map((m, i) => (
              <div key={m.k} className="hero-enter hero-stat" style={{ display: "flex", flexDirection: "column", gap: 6, animationDelay: `${900 + i * 100}ms` }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}>
                  {m.v}{m.suffix && <span style={{ color: C.accent }}>{m.suffix}</span>}
                </span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: ON_DARK_MUTE,
                  textTransform: "uppercase",
                }}>
                  {t(m.k)}
                </span>
              </div>
            ))}
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
        50+ vehicles live
      </div>
      <style>{`
        @keyframes hero-live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
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
    <section ref={ref} style={{ background: bg, padding: "clamp(72px, 10vw, 140px) clamp(20px, 4vw, 32px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 56, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
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
  const { t, lang } = useI18n();
  const cards = [
    { n: "01", t: t("why_c1_t"), b: t("why_c1_b") },
    { n: "02", t: t("why_c2_t"), b: t("why_c2_b") },
    { n: "03", t: t("why_c3_t"), b: t("why_c3_b") },
    { n: "04", t: t("why_c4_t"), b: t("why_c4_b") },
  ];
  return (
    <Section bg="var(--bg2)">
      <div className="reveal" style={{ textAlign: "center", marginBottom: 56, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <span className="eyebrow reveal-up">{t("why_kicker")}</span>
        <h2 className="reveal-up delay-1" style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(34px, 5.4vw, 72px)",
          color: "var(--ink)",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          marginTop: 14,
        }}>
          {lang === "en" ? (
            <>Where digital ends, <em style={{ color: "var(--accent-deep)", fontStyle: "italic" }}>real attention</em> begins.</>
          ) : (
            t("why_title")
          )}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 18 }}>
        {cards.map((c, i) => (
          <div key={c.n} className={`reveal feature-card reveal-up delay-${i + 1}`} style={{
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius-card)",
            padding: "28px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent-deep)" }}>{c.n}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 23, fontWeight: 600, color: "var(--ink)", lineHeight: 1.2, letterSpacing: "-0.4px" }}>{c.t}</div>
            <div style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55, fontWeight: 500 }}>{c.b}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const { t, lang } = useI18n();
  const steps = [
    { n: "01", t: t("how_s1_t"), b: t("how_s1_b") },
    { n: "02", t: t("how_s2_t"), b: t("how_s2_b") },
    { n: "03", t: t("how_s3_t"), b: t("how_s3_b") },
  ];
  return (
    <Section bg="var(--bg)">
      <div className="reveal" style={{ textAlign: "center", marginBottom: 56, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <span className="eyebrow reveal-up">{t("how_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{
          fontSize: "clamp(28px, 4.6vw, 50px)",
          color: "var(--ink)",
          lineHeight: 1.06,
          letterSpacing: "-1px",
          marginTop: 14,
        }}>
          {lang === "en" ? (
            <>Simple for brands. <em style={{ color: "var(--accent-deep)", fontStyle: "italic" }}>Valuable</em> for drivers.</>
          ) : (
            t("how_title")
          )}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 22 }}>
        {steps.map((s, i) => (
          <div key={s.n} className={`reveal feature-card reveal-up delay-${i + 1}`} style={{
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius-card)",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--accent-deep)",
            }}>{s.n}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 23, fontWeight: 600, color: "var(--ink)", marginTop: 10, letterSpacing: "-0.4px", lineHeight: 1.2 }}>{s.t}</div>
            <div style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55, marginTop: 10, fontWeight: 500 }}>{s.b}</div>
          </div>
        ))}
      </div>

    </Section>
  );
}

function TukInterior() {
  const { t } = useI18n();
  return (
    <Section bg="var(--bg2)">
      <div className="tuk-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span className="eyebrow">{t("tuk_kicker")}</span>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: "var(--ink)",
            fontSize: "clamp(30px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}>
            {t("tuk_title")}
          </h3>
          <p style={{
            fontSize: "clamp(16px, 1.5vw, 19px)",
            color: "var(--ink-soft)",
            lineHeight: 1.55,
            maxWidth: "42ch",
            fontWeight: 500,
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
        <div className="reveal reveal-up delay-1" style={{ position: "relative" }}>
          <div style={{
            border: "2px solid var(--ink)",
            borderRadius: 20,
            boxShadow: "var(--sticker-lg)",
            overflow: "hidden",
          }}>
            <img src={TUKTUK_INTERIOR} alt="Passenger view of mydiio screen inside a Colombo tuk-tuk" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
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
            background: C.paper,
            color: C.ink,
            border: `2px solid ${C.ink}`,
            borderRadius: 9999,
            boxShadow: "var(--sticker-press)",
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}>
            <span aria-hidden style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#E74C3C",
              animation: "hero-live-pulse 1.8s ease-in-out infinite",
            }} />
            LIVE CAMPAIGN
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 860px) {
          .tuk-grid { grid-template-columns: 1fr 1.15fr !important; }
        }
      `}</style>
    </Section>
  );
}

function Coverage() {
  return (
    <Section bg="var(--bg)">
      <div className="reveal" style={{ textAlign: "center", marginBottom: 40, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <span className="reveal-up" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase", display: "inline-block" }}>
          Coverage
        </span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(28px, 4.6vw, 50px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
          Your campaign, across Colombo.
        </h2>
        <p className="reveal-up delay-2" style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 16, fontWeight: 500 }}>
          Reach passengers in the neighbourhoods where your customers already are. Click any zone to explore.
        </p>
      </div>
      <div className="reveal reveal-up delay-2">
        <ColomboMap />
      </div>
    </Section>
  );
}



function TwoAudiences() {
  const { t } = useI18n();
  return (
    <Section bg="var(--bg2)">
      <div className="paths-grid">
        <div className="reveal path-card reveal-up delay-1" style={{
          background: "var(--accent-soft)",
          border: "2px solid var(--ink)",
          borderRadius: 26,
          boxShadow: "var(--sticker)",
          overflow: "hidden",
          padding: "clamp(28px, 4vw, 40px)",
        }}>
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

        <div className="reveal path-card reveal-up delay-2" style={{
          background: "var(--green-soft)",
          border: "2px solid var(--ink)",
          borderRadius: 26,
          boxShadow: "var(--sticker)",
          overflow: "hidden",
          padding: 0,
        }}>
          <img src={DRIVER_PAYMENT} alt="Colombo tuk-tuk driver receiving monthly payment" style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 25%", display: "block", borderBottom: "2px solid var(--ink)" }} />
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
  const { t, lang } = useI18n();
  return (
    <Section bg={"var(--bg)"}>
      <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
        <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("rep_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14 }}>
          <EmTail text={t("rep_title")} tail="not guessed." lang={lang} />
        </h2>
        <p className="reveal-up delay-2" style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 18, fontWeight: 500 }}>
          {t("rep_body")}
        </p>
      </div>
      <div className="reveal" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        gap: 20,
      }}>
        <MetricCard label="Active vehicles" value={48} />
        <MetricCard label="Est. daily impressions" value={412} format={(n) => `${n}k`} />
        <MetricCard label="Avg screen uptime" value={98} suffix="%" />
        <MetricCard label="Routes covered" value={34} />
      </div>
    </Section>
  );
}

function WhyNow() {
  const { t, lang } = useI18n();
  return (
    <Section bg={"var(--bg2)"}>
      <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("whyn_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14 }}>
          <EmTail text={t("whyn_title")} tail="hiding in plain sight." lang={lang} />
        </h2>
        <p className="reveal-up delay-2" style={{ fontSize: "clamp(15px, 1.7vw, 19px)", color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 22, fontWeight: 500 }}>
          {t("whyn_body")}
        </p>
      </div>
    </Section>
  );
}

function ScaleStory() {
  const { t } = useI18n();
  const cards = [
    { n: "01", t: t("scale_c1_t"), b: t("scale_c1_b") },
    { n: "02", t: t("scale_c2_t"), b: t("scale_c2_b") },
    { n: "03", t: t("scale_c3_t"), b: t("scale_c3_b") },
    { n: "04", t: t("scale_c4_t"), b: t("scale_c4_b") },
  ];
  return (
    <Section bg={"var(--bg)"}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 56, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("scale_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14 }}>
          {t("scale_title")}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 20 }}>
        {cards.map((c, i) => (
          <div key={c.n} className={`reveal feature-card reveal-up delay-${i + 1}`} style={{
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            borderRadius: 26,
            padding: "28px 26px",
            boxShadow: "var(--sticker)",
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.18em", color: "var(--accent-deep)", textTransform: "uppercase" }}>{c.n}</div>
            <div className="font-display" style={{ fontSize: 23, color: "var(--ink)", lineHeight: 1.2, marginTop: 12, letterSpacing: "-0.01em", fontWeight: 600 }}>{c.t}</div>
            <div style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 12, fontWeight: 500 }}>{c.b}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FoundingOffer() {
  const { t } = useI18n();
  const benefits = [t("fo_b1"), t("fo_b2"), t("fo_b3"), t("fo_b4")];
  return (
    <Section bg={"var(--bg)"}>
      <div className="reveal reveal-up" style={{
        position: "relative",
        background: "var(--paper)",
        border: "2px solid var(--ink)",
        borderRadius: 26,
        padding: "clamp(36px, 5vw, 64px)",
        boxShadow: "var(--sticker-lg)",
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
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" style={{ display: "inline-block" }}>{t("fo_kicker")}</span>
          <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 62px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14, fontWeight: 700 }}>
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
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 12 10 18 20 6" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
          <Link to="/advertise" className="btn-bold font-display cta-primary" style={{ display: "inline-block", marginTop: 32, padding: "14px 24px", fontSize: 15, textDecoration: "none" }}>
            Claim a pilot slot →
          </Link>
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const { t, lang } = useI18n();
  const items = [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
    { q: t("faq_q3"), a: t("faq_a3") },
    { q: t("faq_q4"), a: t("faq_a4") },
    { q: t("faq_q5"), a: t("faq_a5") },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <Section bg={"var(--bg2)"}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 48, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <span className="eyebrow reveal-up" style={{ display: "inline-block" }}>{t("faq_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 14 }}>
          <EmTail text={t("faq_title")} tail="asked." lang={lang} />
        </h2>
      </div>
      <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((it, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className={`reveal reveal-up${i < 4 ? ` delay-${i + 1}` : ""}`} style={{
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              borderRadius: 14,
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
                <span>{it.q}</span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  color: "var(--accent-deep)",
                  fontSize: 22, lineHeight: 1, flexShrink: 0,
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
    </Section>
  );
}

function FinalCTA() {
  const { t } = useI18n();
  return (
    <section id="waitlist" className="relative w-full overflow-hidden" style={{ minHeight: 520, scrollMarginTop: 96 }}>
      <span id="signup-section" style={{ position: "absolute", top: -96 }} aria-hidden />
      <img src={FLEET_SUNSET} alt="A line of mydiio tuk-tuks parked at sunset in Colombo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,26,21,0.3), rgba(30,26,21,0.7))" }} />
      <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
        <span className="eyebrow" style={{ color: "var(--accent)", display: "inline-block" }}>{t("fcta_kicker")}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(38px, 6vw, 84px)", color: "var(--on-dark)", lineHeight: 1.02, marginTop: 14, letterSpacing: "-0.03em", fontWeight: 700 }}>
          {t("fcta_title")}
        </h2>
        <div style={{ marginTop: 40 }}>
          <WaitlistForm variant="dark" />
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

        .paths-grid { display: grid; grid-template-columns: 1fr; gap: 22px; }
        @media (min-width: 760px) { .paths-grid { grid-template-columns: 1fr 1fr; gap: 28px; } }

        .path-card {
          border: 2px solid var(--ink);
          border-radius: 26px;
          box-shadow: var(--sticker);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .path-card:hover { transform: translateY(-4px); box-shadow: var(--sticker-lg); }
      `}</style>

      <Hero />
      <WhyItWorks />
      <HowItWorks />
      <TukInterior />
      <Coverage />
      <TwoAudiences />
      <Reporting />
      <WhyNow />
      <ScaleStory />
      <FoundingOffer />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  );
}

