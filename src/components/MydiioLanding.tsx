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
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={COLOMBO_STREET} alt="Tuk-tuks moving through Colombo at golden hour" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.45) 40%, rgba(26,26,24,0.85) 100%)" }} />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "clamp(120px, 16vh, 180px) clamp(22px, 6vw, 80px) clamp(72px, 10vh, 110px)" }}>
        <div style={{ maxWidth: 880 }}>
          <span className="hero-enter hero-badge" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase", display: "inline-block" }}>
            {t("hero_kicker")}
          </span>
          <h1 className="font-display hero-headline" style={{
            color: "#fff",
            fontSize: "clamp(36px, 6.4vw, 78px)",
            lineHeight: 1.04,
            letterSpacing: "-1.2px",
            marginTop: 14,
          }}>
            <HeroWords text={t("hero_title")} />
          </h1>
          <p className="hero-enter hero-sub" style={{
            fontSize: "clamp(15px, 1.7vw, 19px)",
            color: "rgba(255,255,255,0.84)",
            marginTop: 20, maxWidth: 640, lineHeight: 1.55, fontWeight: 500,
          }}>
            {t("hero_sub")}
          </p>

          <div className="hero-cta-row hero-enter hero-ctas" style={{ marginTop: 32 }}>
            <Link to="/advertise" className="btn-bold font-display cta-primary" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 15.5, textDecoration: "none" }}>
              {t("cta_launch_pilot")}
            </Link>
            <Link to="/contact" className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 15.5, textDecoration: "none", border: "2.5px solid #fff", boxShadow: "none" }}>
              {t("cta_talk_founder")}
            </Link>
          </div>

          <div className="hero-trust" style={{ marginTop: 44 }}>
            {[
              { v: `${v1}+`, k: "metric_vehicles" as const },
              { v: `${v2}`, k: "metric_zones" as const },
              { v: `${v3} ${t("metric_min")}`, k: "metric_attention" as const },
              { v: `${v4} ${t("metric_hr")}`, k: "metric_launch" as const },
            ].map((m, i) => (
              <div key={m.k} className="hero-enter hero-stat" style={{ display: "flex", flexDirection: "column", gap: 4, animationDelay: `${900 + i * 100}ms` }}>
                <span className="font-display" style={{ color: "#fff", fontSize: "clamp(20px, 2.6vw, 26px)", letterSpacing: "-0.5px" }}>{m.v}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{t(m.k)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: C.amber }} />
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

function TukScreenShowcase() {
  const creatives = [
    { bg: "#1B4D8E", fg: "#fff", pillBg: "#F5A623", pillFg: "#1A1A18", headline: "Feel better. Live better.", sub: "City Pharma · Colombo 03" },
    { bg: "#2D6B4F", fg: "#fff", pillBg: "#F5A623", pillFg: "#1A1A18", headline: "Fresh bread, every morning.", sub: "Green Bakery · Nugegoda" },
    { bg: "#8B2500", fg: "#fff", pillBg: "#F5A623", pillFg: "#1A1A18", headline: "40% off this week.", sub: "Style House · Colombo 04" },
    { bg: "#F5A623", fg: "#1A1A18", pillBg: "#1A1A18", pillFg: "#F5A623", headline: "Open for lunch.", sub: "The Rice Bowl · Fort" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % creatives.length), 3500);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="reveal" style={{ marginTop: 64 }}>
      <div style={{
        position: "relative", borderRadius: 20, overflow: "hidden",
        border: `2.5px solid ${C.ink}`, boxShadow: "8px 8px 0 rgba(26,26,24,0.92)",
      }}>
        <img src={TUKTUK_INTERIOR} alt="Passenger view of mydiio screen inside a Colombo tuk-tuk" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
        {/* Rotating ad creative overlay positioned over the tablet in the photo */}
        <div className="tuk-screen-overlay" aria-hidden style={{
          position: "absolute", left: "37%", top: "9%", width: "22%", height: "25%",
          borderRadius: 4, overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}>
          {creatives.map((c, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0, background: c.bg, color: c.fg,
              opacity: i === idx ? 1 : 0, transition: "opacity 600ms ease-in-out",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              padding: "clamp(6px, 1vw, 14px)",
            }}>
              <div>
                <div className="font-display tuk-creative-h" style={{ fontSize: "clamp(9px, 1.15vw, 16px)", lineHeight: 1.1, letterSpacing: "-0.3px" }}>
                  {c.headline}
                </div>
                <div className="tuk-creative-s" style={{ fontSize: "clamp(6px, 0.7vw, 10px)", marginTop: 4, opacity: 0.85, lineHeight: 1.2 }}>
                  {c.sub}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{
                  background: c.pillBg, color: c.pillFg, fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(5px, 0.55vw, 8px)", letterSpacing: 1, padding: "2px 5px",
                  borderRadius: 999, textTransform: "uppercase", fontWeight: 700,
                }}>SPONSORED</span>
              </div>
            </div>
          ))}
        </div>
        {/* Live campaign pill */}
        <div style={{
          position: "absolute", left: 14, bottom: 14,
          background: "rgba(26,26,24,0.75)", color: "#fff",
          fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.5,
          padding: "6px 10px", borderRadius: 999, display: "inline-flex",
          alignItems: "center", gap: 6,
        }}>
          <span className="tuk-live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#F5A623", display: "inline-block" }} />
          LIVE CAMPAIGN
        </div>
      </div>
      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
        {creatives.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show creative ${i + 1}`}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 8 : 6, height: i === idx ? 8 : 6,
              borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: i === idx ? C.amber : "rgba(26,26,24,0.25)",
              transition: "background 200ms ease, width 200ms ease, height 200ms ease",
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes tuk-live-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .tuk-live-dot { animation: tuk-live-pulse 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .tuk-live-dot { animation: none; } }
      `}</style>
    </div>
  );
}

function WhyItWorks() {
  const { t } = useI18n();
  const cards = [
    { n: "01", t: t("why_c1_t"), b: t("why_c1_b") },
    { n: "02", t: t("why_c2_t"), b: t("why_c2_b") },
    { n: "03", t: t("why_c3_t"), b: t("why_c3_b") },
    { n: "04", t: t("why_c4_t"), b: t("why_c4_b") },
  ];
  return (
    <Section bg={C.cream}>
      <SectionHeader kicker={t("why_kicker")} title={t("why_title")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        {cards.map((c, i) => (
          <div key={c.n} className={`reveal hover-lift reveal-up delay-${i + 1}`} style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18,
            padding: "28px 26px", display: "flex", flexDirection: "column", gap: 12,
            boxShadow: "0 18px 40px -28px rgba(26,26,24,0.35)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: C.amber }}>{c.n}</div>
            <div className="font-display" style={{ fontSize: 21, color: C.ink, lineHeight: 1.2, letterSpacing: "-0.4px" }}>{c.t}</div>
            <div style={{ fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, fontWeight: 500 }}>{c.b}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { n: "01", t: t("how_s1_t"), b: t("how_s1_b") },
    { n: "02", t: t("how_s2_t"), b: t("how_s2_b") },
    { n: "03", t: t("how_s3_t"), b: t("how_s3_b") },
  ];
  return (
    <Section bg={"#FBF6E8"}>
      <SectionHeader kicker={t("how_kicker")} title={t("how_title")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
        {steps.map((s, i) => (
          <div key={s.n} className={`reveal hover-lift reveal-up delay-${i + 1}`} style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 20,
            padding: "32px 28px", boxShadow: "5px 5px 0 rgba(26,26,24,0.92)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div className="font-display" style={{ fontSize: 36, color: C.amber, letterSpacing: "-1px" }}>{s.n}</div>
            <div className="font-display" style={{ fontSize: 22, color: C.ink, marginTop: 10, letterSpacing: "-0.4px" }}>{s.t}</div>
            <div style={{ fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, marginTop: 10, fontWeight: 500 }}>{s.b}</div>
          </div>
        ))}
      </div>

      <TukScreenShowcase />
    </Section>
  );
}

function Coverage() {
  return (
    <Section bg={C.cream}>
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
    <Section bg={C.cream}>
      <div className="paths-grid">
        <div className="reveal path-card reveal-up delay-1" style={{ background: C.amberPale }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>{t("ad_kicker")}</span>
          <h3 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 32px)", color: C.ink, marginTop: 12, lineHeight: 1.15, letterSpacing: "-0.6px" }}>
            {t("ad_title")}
          </h3>
          <p style={{ fontSize: 15, color: C.ink, marginTop: 14, lineHeight: 1.55, fontWeight: 500 }}>
            {t("ad_body")}
          </p>
          <Link to="/advertise" className="btn-bold font-display" style={{ display: "inline-block", marginTop: 24, background: C.amber, color: C.ink, padding: "13px 20px", borderRadius: 11, fontSize: 14.5, textDecoration: "none" }}>
            {t("ad_cta")}
          </Link>
        </div>

        <div className="reveal path-card reveal-up delay-2" style={{ background: C.greenPale, padding: 0, overflow: "hidden" }}>
          <img src={DRIVER_PAYMENT} alt="Colombo tuk-tuk driver receiving monthly payment" style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 25%", display: "block", borderBottom: `2.5px solid ${C.ink}` }} />
          <div style={{ padding: "28px 28px 32px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#2D8A4E", textTransform: "uppercase" }}>{t("dr_kicker")}</span>
            <h3 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 32px)", color: C.ink, marginTop: 12, lineHeight: 1.15, letterSpacing: "-0.6px" }}>
              {t("dr_title")}
            </h3>
            <p style={{ fontSize: 15, color: C.ink, marginTop: 14, lineHeight: 1.55, fontWeight: 500 }}>
              {t("dr_body")}
            </p>
            <Link to="/drive" className="btn-bold font-display" style={{ display: "inline-block", marginTop: 24, background: C.green, color: "#fff", padding: "13px 20px", borderRadius: 11, fontSize: 14.5, textDecoration: "none" }}>
              {t("dr_cta")}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Reporting() {
  const { t } = useI18n();
  return (
    <Section bg={"#FBF6E8"}>
      <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <span className="reveal-up" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase", display: "inline-block" }}>{t("rep_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(28px, 4.4vw, 48px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
          {t("rep_title")}
        </h2>
        <p className="reveal-up delay-2" style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 18, fontWeight: 500 }}>
          {t("rep_body")}
        </p>
      </div>
    </Section>
  );
}

function WhyNow() {
  const { t } = useI18n();
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <span className="reveal-up" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase", display: "inline-block" }}>{t("whyn_kicker")}</span>
        <h2 className="font-display reveal-up delay-1" style={{ fontSize: "clamp(28px, 4.6vw, 50px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
          {t("whyn_title")}
        </h2>
        <p className="reveal-up delay-2" style={{ fontSize: "clamp(15px, 1.7vw, 19px)", color: C.inkSoft, lineHeight: 1.6, marginTop: 22, fontWeight: 500 }}>
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
    <Section bg={"#FBF6E8"}>
      <SectionHeader kicker={t("scale_kicker")} title={t("scale_title")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        {cards.map((c, i) => (
          <div key={c.n} className={`reveal hover-lift reveal-up delay-${i + 1}`} style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18, padding: "28px 26px",
            boxShadow: "0 18px 40px -28px rgba(26,26,24,0.35)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: C.amber }}>{c.n}</div>
            <div className="font-display" style={{ fontSize: 19, color: C.ink, lineHeight: 1.2, marginTop: 10, letterSpacing: "-0.3px" }}>{c.t}</div>
            <div style={{ fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, marginTop: 10, fontWeight: 500 }}>{c.b}</div>
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
    <Section bg={C.cream}>
      <div className="reveal reveal-up" style={{
        background: "#fff", border: `3px solid ${C.ink}`, borderRadius: 24,
        padding: "clamp(36px, 5vw, 64px)", boxShadow: "8px 8px 0 rgba(26,26,24,0.92)",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>{t("fo_kicker")}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 42px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
          {t("fo_title")}
        </h2>
        <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 16, maxWidth: 540, fontWeight: 500 }}>
          {t("fo_body")}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {benefits.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: C.ink, fontWeight: 600 }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={C.amberDeep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 12 10 18 20 6" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
        <Link to="/advertise" className="btn-bold font-display" style={{ display: "inline-block", marginTop: 28, background: C.amber, color: C.ink, padding: "15px 22px", borderRadius: 12, fontSize: 15.5, textDecoration: "none" }}>
          {t("fo_cta")}
        </Link>
      </div>
    </Section>
  );
}

function FAQ() {
  const { t } = useI18n();
  const items = [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
    { q: t("faq_q3"), a: t("faq_a3") },
    { q: t("faq_q4"), a: t("faq_a4") },
    { q: t("faq_q5"), a: t("faq_a5") },
  ];
  return (
    <Section bg={C.cream}>
      <SectionHeader kicker={t("faq_kicker")} title={t("faq_title")} />
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it, i) => (
          <details key={i} className={`reveal faq-item reveal-up${i < 4 ? ` delay-${i + 1}` : ""}`} style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 16,
            padding: "20px 24px", boxShadow: "0 14px 40px -28px rgba(26,26,24,0.25)",
          }}>
            <summary className="font-display" style={{
              fontSize: "clamp(15px, 1.7vw, 18px)", color: C.ink, cursor: "pointer",
              listStyle: "none", display: "flex", justifyContent: "space-between",
              alignItems: "center", gap: 16, letterSpacing: "-0.2px",
            }}>
              <span>{it.q}</span>
              <span className="faq-plus" style={{ color: C.amber, fontSize: 22, lineHeight: 1, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}>+</span>
            </summary>
            <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.6, marginTop: 14, fontWeight: 500 }}>{it.a}</p>
          </details>
        ))}
      </div>
      <style>{`
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] .faq-plus { transform: rotate(45deg); }
      `}</style>
    </Section>
  );
}

function FinalCTA() {
  const { t } = useI18n();
  return (
    <section id="waitlist" className="relative w-full overflow-hidden" style={{ minHeight: 520, scrollMarginTop: 96 }}>
      <span id="signup-section" style={{ position: "absolute", top: -96 }} aria-hidden />
      <img src={FLEET_SUNSET} alt="A line of mydiio tuk-tuks parked at sunset in Colombo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.85) 100%)" }} />
      <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>{t("fcta_kicker")}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.8vw, 54px)", color: "#fff", lineHeight: 1.05, marginTop: 14, letterSpacing: "-1.2px" }}>
          {t("fcta_title")}
        </h2>
        <div style={{ marginTop: 36 }}>
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
          border: 2.5px solid ${C.ink};
          border-radius: 22px;
          box-shadow: 6px 6px 0 ${C.ink}, 0 24px 48px -28px rgba(26,26,14,0.35);
          padding: clamp(28px, 4vw, 40px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .path-card:hover { transform: translateY(-4px); box-shadow: 8px 10px 0 ${C.ink}, 0 36px 60px -28px rgba(26,26,14,0.45); }
      `}</style>

      <Hero />
      <WhyItWorks />
      <HowItWorks />
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

