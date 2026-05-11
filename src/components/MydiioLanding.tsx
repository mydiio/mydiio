import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import { useI18n } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";

// Nav + Logo + Footer live in src/components/site/* and render via SiteShell.

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={COLOMBO_STREET} alt="Tuk-tuks moving through Colombo at golden hour" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.45) 40%, rgba(26,26,24,0.85) 100%)" }} />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "clamp(120px, 16vh, 180px) clamp(22px, 6vw, 80px) clamp(72px, 10vh, 110px)" }}>
        <div style={{ maxWidth: 880 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>
            {t("hero_kicker")}
          </span>
          <h1 className="font-display reveal in" style={{
            color: "#fff",
            fontSize: "clamp(36px, 6.4vw, 78px)",
            lineHeight: 1.04,
            letterSpacing: "-1.2px",
            marginTop: 14,
          }}>
            {t("hero_title")}
          </h1>
          <p style={{
            fontSize: "clamp(15px, 1.7vw, 19px)",
            color: "rgba(255,255,255,0.84)",
            marginTop: 20, maxWidth: 640, lineHeight: 1.55, fontWeight: 500,
          }}>
            {t("hero_sub")}
          </p>

          <div className="hero-cta-row" style={{ marginTop: 32 }}>
            <Link to="/advertise" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 15.5, textDecoration: "none" }}>
              {t("cta_launch_pilot")}
            </Link>
            <Link to="/contact" className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 15.5, textDecoration: "none", border: "2.5px solid #fff", boxShadow: "none" }}>
              {t("cta_talk_founder")}
            </Link>
          </div>

          <div className="hero-trust" style={{ marginTop: 44 }}>
            {[
              { v: "50+", k: "metric_vehicles" as const },
              { v: "7", k: "metric_zones" as const },
              { v: `14 ${t("metric_min")}`, k: "metric_attention" as const },
              { v: `72 ${t("metric_hr")}`, k: "metric_launch" as const },
            ].map((m) => (
              <div key={m.k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          {kicker}
        </span>
      )}
      <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.6vw, 50px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: kicker ? 14 : 0 }}>
        {title}
      </h2>
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
        {cards.map((c) => (
          <div key={c.n} className="reveal hover-lift" style={{
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
        {steps.map((s) => (
          <div key={s.n} className="reveal" style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 20,
            padding: "32px 28px", boxShadow: "5px 5px 0 rgba(26,26,24,0.92)",
          }}>
            <div className="font-display" style={{ fontSize: 36, color: C.amber, letterSpacing: "-1px" }}>{s.n}</div>
            <div className="font-display" style={{ fontSize: 22, color: C.ink, marginTop: 10, letterSpacing: "-0.4px" }}>{s.t}</div>
            <div style={{ fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, marginTop: 10, fontWeight: 500 }}>{s.b}</div>
          </div>
        ))}
      </div>

      <div className="reveal" style={{
        marginTop: 64, borderRadius: 20, overflow: "hidden",
        border: `2.5px solid ${C.ink}`, boxShadow: "8px 8px 0 rgba(26,26,24,0.92)",
        position: "relative",
      }}>
        <img src={TUKTUK_INTERIOR} alt="Passenger view of mydiio screen inside a Colombo tuk-tuk" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
      </div>
    </Section>
  );
}

function TwoAudiences() {
  const { t } = useI18n();
  return (
    <Section bg={C.cream}>
      <div className="paths-grid">
        <div className="reveal path-card" style={{ background: C.amberPale }}>
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

        <div className="reveal path-card" style={{ background: C.greenPale, padding: 0, overflow: "hidden" }}>
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
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>{t("rep_kicker")}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.4vw, 48px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
          {t("rep_title")}
        </h2>
        <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 18, fontWeight: 500 }}>
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
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>{t("whyn_kicker")}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.6vw, 50px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
          {t("whyn_title")}
        </h2>
        <p style={{ fontSize: "clamp(15px, 1.7vw, 19px)", color: C.inkSoft, lineHeight: 1.6, marginTop: 22, fontWeight: 500 }}>
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
        {cards.map((c) => (
          <div key={c.n} className="reveal hover-lift" style={{
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
      <div className="reveal" style={{
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
          <details key={i} className="reveal faq-item" style={{
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
    <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
      <img src={FLEET_SUNSET} alt="A line of mydiio tuk-tuks parked at sunset in Colombo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.85) 100%)" }} />
      <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>{t("fcta_kicker")}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.8vw, 54px)", color: "#fff", lineHeight: 1.05, marginTop: 14, letterSpacing: "-1.2px" }}>
          {t("fcta_title")}
        </h2>
        <div className="hero-cta-row" style={{ marginTop: 32, justifyContent: "center" }}>
          <Link to="/advertise" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 15.5, textDecoration: "none" }}>
            {t("cta_launch")} →
          </Link>
          <Link to="/contact" className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 15.5, textDecoration: "none", border: "2.5px solid #fff", boxShadow: "none" }}>
            {t("cta_talk_founder")}
          </Link>
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

