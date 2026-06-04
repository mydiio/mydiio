import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import COLOMBO_FLEET_GOLDEN from "@/assets/colombo-fleet-golden-hour.png.asset.json";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/investors")({
  component: InvestorsPage,
  head: () => ({
    meta: [
      { title: "Investors — mydiio | Sri Lanka's First Tuk-Tuk Media Network" },
      { name: "description", content: "mydiio turns thousands of daily tuk-tuk rides into measurable advertising inventory and recurring revenue. Currently raising." },
      { property: "og:title", content: "Investors — mydiio" },
      { property: "og:description", content: "Building Sri Lanka's first tuk-tuk media network. Recurring revenue. Asset-light. Regional potential." },
      { property: "og:image", content: COLOMBO_FLEET_GOLDEN.url },
    ],
  }),
});

const MAILTO = "mailto:investors@mydiio.com";

/* ---------- Reusable bits ---------- */
function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`eyebrow ${className ?? ""}`}>
      {children}
    </span>
  );
}

function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display ${className ?? ""}`} style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: C.ink, lineHeight: 1.5, letterSpacing: 0, marginTop: 0, textWrap: "balance" as const }}>
      {children}
    </h2>
  );
}

function Card({ title, body, accent, className }: { title: string; body?: string; accent?: boolean; className?: string }) {
  return (
    <div
      className={`mydiio-card reveal reveal-up ${className ?? ""}`}
      style={{
        background: accent ? "var(--accent-soft)" : "var(--paper)",
        padding: "26px 24px",
      }}
    >
      <div className="font-display" style={{ fontSize: 19, color: C.ink, lineHeight: 1.25, letterSpacing: "-0.2px" }}>{title}</div>
      {body && (
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.55 }}>
          {body}
        </div>
      )}
    </div>
  );
}

function SectionWrap({ children, bg, className }: { children: React.ReactNode; bg?: string; className?: string }) {
  return (
    <section className={`section-wrap ${className ?? ""}`} style={{ background: bg ?? C.cream, paddingLeft: "clamp(20px, 4vw, 32px)", paddingRight: "clamp(20px, 4vw, 32px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ---------- Deck request modal ---------- */
function DeckRequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [firm, setFirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName(""); setWhatsapp(""); setFirm("");
      setSubmitting(false); setDone(false); setError(null);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const w = whatsapp.trim();
    if (!n || !w) { setError("Name and WhatsApp number are required."); return; }
    if (n.length > 200 || w.length > 50 || firm.length > 200) { setError("Input too long."); return; }
    setSubmitting(true); setError(null);
    const { error: insErr } = await (supabase as any).from("investor_enquiries").insert({
      name: n,
      whatsapp_number: w,
      fund_or_firm: firm.trim() || null,
    });
    setSubmitting(false);
    if (insErr) { setError("Couldn't send. Please try again."); return; }
    setDone(true);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(30,26,21,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper)",
          border: "var(--card-border)",
          borderRadius: "var(--card-radius)",
          boxShadow: "var(--shadow-card-lg)",
          padding: "clamp(28px, 4vw, 44px)",
          maxWidth: 480, width: "100%",
        }}
      >
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: C.ink, lineHeight: 1.5 }}>
              Request received. Deck will arrive on WhatsApp within 24 hours.
            </div>
            <button
              onClick={onClose}
              className="font-display"
              style={{
                marginTop: 24,
                background: "var(--accent)", color: "var(--ink)",
                border: "2px solid var(--ink)", borderRadius: 14,
                boxShadow: "3px 3px 0 var(--ink)",
                padding: "12px 22px", fontSize: 15, cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="eyebrow">Investor brief</span>
            <h3 className="font-display" style={{ fontSize: 22, color: C.ink, marginTop: 4, marginBottom: 10, letterSpacing: "-0.3px" }}>
              Request the mydiio deck.
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>
              We'll send the full investor brief to your WhatsApp within 24 hours.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              <input type="text" required maxLength={200} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                style={inputStyle} />
              <input type="tel" required maxLength={50} placeholder="+94 77 000 0000" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                style={inputStyle} />
              <input type="text" maxLength={200} placeholder="Fund or firm (optional)" value={firm} onChange={(e) => setFirm(e.target.value)}
                style={inputStyle} />
            </div>
            {error && <div style={{ color: "#B33", fontSize: 13, marginTop: 10 }}>{error}</div>}
            <button
              type="submit" disabled={submitting}
              className="font-display"
              style={{
                marginTop: 18, width: "100%",
                background: "var(--accent)", color: "var(--ink)",
                border: "2px solid var(--ink)", borderRadius: 14,
                boxShadow: "3px 3px 0 var(--ink)",
                padding: "14px 20px", fontSize: 16,
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Sending…" : "Send request →"}
            </button>
            <button
              type="button" onClick={onClose}
              style={{ marginTop: 10, width: "100%", background: "transparent", border: "none", color: "var(--ink-mute)", fontSize: 13, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "var(--card-border)",
  borderRadius: 14,
  background: "var(--paper)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "'Space Grotesk', sans-serif",
  outline: "none",
};

/* ---------- Sections ---------- */
function Hero({ onRequestDeck }: { onRequestDeck: () => void }) {
  useI18n();
  const stats = [
    { v: "320k", suffix: "", label: "tuks in Colombo" },
    { v: "1.1m", suffix: "", label: "across Sri Lanka" },
    { v: "Zero", suffix: "", label: "screens before mydiio" },
    { v: "2026", suffix: "", label: "pilot year" },
  ];
  return (
    <section className="relative w-full overflow-hidden page-hero-fixed">
      <img src={COLOMBO_FLEET_GOLDEN.url} alt="Colombo tuk-tuk fleet at golden hour" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.55) 40%, rgba(26,26,24,0.88) 100%)" }} />
      <div className="relative z-10 flex flex-col items-start justify-end page-hero-inner" style={{ padding: "clamp(110px, 14vh, 160px) clamp(20px, 6vw, 80px) clamp(70px, 10vh, 110px)" }}>
        <div style={{ maxWidth: "55%", width: "100%" }} className="page-hero-textblock">
          <span className="page-hero-label">
            Investor brief · 2026
          </span>
          <h1 className="page-hero-headline" style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            color: "#fff",
            fontWeight: 500,
            lineHeight: 1.4,
            marginTop: 14,
          }}>
            Building Sri Lanka's first tuk-tuk media network.
          </h1>
          <p style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 400,
            fontSize: 16,
            color: "rgba(253,250,243,0.85)", marginTop: 18, maxWidth: 600, lineHeight: 1.7,
          }}>
            mydiio turns thousands of daily tuk-tuk rides into measurable advertising inventory and recurring revenue.
          </p>
          <div className="hero-cta-row" style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={onRequestDeck} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 14, fontSize: 17, border: "2px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)", cursor: "pointer" }}>
              Request investor deck →
            </button>
            <a href={MAILTO} className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 14, fontSize: 17, textDecoration: "none", border: "2px solid #fff" }}>
              Book founder call
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

function Problem() {
  return (
    <SectionWrap>
      <Eyebrow className="reveal-up">The problem</Eyebrow>
      <H2 className="reveal-up">Attention is expensive. Local reach is broken.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        <Card title="Digital ads are crowded and costly" body="CPMs keep climbing while clicks become harder to convert in local markets." />
        <Card title="Traditional outdoor is hard to measure" body="Billboards and posters offer no proof of delivery, frequency, or audience data." />
        <Card title="Local businesses need affordable reach" body="SMBs in Colombo want predictable local reach without enterprise-level budgets." />

      </div>
    </SectionWrap>
  );
}

/* Change 9 — visual bridge between problem and business model */
function OpportunityBridge() {
  return (
    <div style={{ position: "relative", width: "100%", height: 320, overflow: "hidden" }}>
      <img src={COLOMBO_STREET} alt="Colombo street" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.85 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(30,26,21,0.75) 0%, rgba(30,26,21,0.2) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(20px, 4vw, 32px)", maxWidth: 1140, marginInline: "auto" }}>
        <span className="reveal-up" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>
          The opportunity
        </span>
        <h2 className="font-display reveal-up" style={{ color: "var(--on-dark)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.8px", textWrap: "balance" as const, maxWidth: 820 }}>
          1.1M tuk-tuks. 0 with screens. Until now.
        </h2>
      </div>
    </div>
  );
}

function Solution() {
  return (
    <SectionWrap bg="#fff">
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "center" }} className="solution-grid">
        <div>
          <Eyebrow className="reveal-up">The solution</Eyebrow>
          <H2 className="reveal-up">We use existing urban movement.</H2>
          <p className="reveal-up" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 17, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.6, maxWidth: 620 }}>
            Tuk-tuks already move through the highest-density commercial areas of Colombo every day. We install digital screens, sell campaigns, measure delivery, and share revenue with drivers.
          </p>
        </div>
        <div className="reveal-up" style={{ borderRadius: "var(--card-radius)", overflow: "hidden", border: "var(--card-border)", boxShadow: "var(--shadow-card-lg)" }}>
          <img src={TUKTUK_INTERIOR} alt="In-tuk-tuk digital screen" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
        <Card title="Captive in-ride attention" />
        <Card title="Street-level visibility" />
        <Card title="GPS-verified delivery" />
        <Card title="Low infrastructure cost" />
      </div>
    </SectionWrap>
  );
}

function WhyTukTuks() {
  return (
    <SectionWrap>
      <Eyebrow className="reveal-up">Why this vehicle</Eyebrow>
      <H2 className="reveal-up">Why tuk-tuks win.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        <Card title="High daily utilization" body="Active across morning, midday, and evening hours." accent />
        <Card title="Constant urban presence" body="Always inside the commercial core, not parked on highways." />
        <Card title="Trusted, familiar vehicle" body="A core part of daily life. Riders don't tune it out." />
        <Card title="Massive existing supply" body="No fleet to build. Inventory scales by onboarding drivers." />
      </div>
    </SectionWrap>
  );
}

function BusinessModel() {
  const flow = [
    "Advertiser pays monthly campaign fee",
    "mydiio keeps platform margin",
    "Driver receives revenue share",
    "More drivers join the network",
  ];
  return (
    <SectionWrap bg="#fff">
      <Eyebrow className="reveal-up">Business model</Eyebrow>
      <H2 className="reveal-up">Simple, repeatable revenue.</H2>
      <div style={{ marginTop: 48, maxWidth: 620, marginInline: "auto", display: "flex", flexDirection: "column", alignItems: "stretch", gap: 14 }}>
        {flow.map((step, i) => (
          <div key={step} className="reveal-up">
            <div style={{ background: i === 0 ? C.amber : i === flow.length - 1 ? C.green : "var(--paper)", color: i === flow.length - 1 ? "#fff" : C.ink, border: "var(--card-border)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)", textAlign: "center", fontFamily: "var(--font-display)", fontSize: 17 }}>
              {step}
            </div>
            {i < flow.length - 1 && (
              <div style={{ textAlign: "center", color: C.ink, fontSize: 22, lineHeight: 1, padding: "6px 0" }}>↓</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        <Card title="Recurring revenue" body="Monthly campaign subscriptions, not one-off bookings." />
        <Card title="Asset-light growth" body="Drivers own the vehicles. We own the network and the software." />
        <Card title="High inventory expansion" body="Each new screen added to the network increases advertising slots without proportional cost." />

      </div>
    </SectionWrap>
  );
}

/* Change 8 — expansion cities timeline */
function Market() {
  const groups = [
    { time: "Now · 2026", cities: "Colombo", note: "Pilot launch", active: true },
    { time: "Year 2", cities: "Kandy · Galle", note: "Year 2 target", active: false },
    { time: "Year 3", cities: "Negombo · Jaffna", note: "Year 3 target", active: false },
    { time: "Year 4+", cities: "Regional expansion", note: "Bangladesh · Myanmar · Year 4+", active: false },

  ];
  return (
    <SectionWrap>
      <Eyebrow className="reveal-up">Market</Eyebrow>
      <H2 className="reveal-up">Large local market. Regional potential.</H2>
      <p className="reveal-up" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 17, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.6, maxWidth: 620 }}>
        Start with Colombo. Expand into every major Sri Lankan city. Then replicate into tuk-tuk-dense South Asian markets.
      </p>

      <style>{`
        .timeline-row { display: flex; align-items: stretch; gap: 0; margin-top: 56px; }
        .timeline-group { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; min-width: 0; }
        .timeline-node-row { display: flex; align-items: center; width: 100%; }
        .timeline-line { height: 2px; background: var(--accent); opacity: 0.3; flex: 1; align-self: center; }
        .timeline-line.edge { visibility: hidden; }
        .timeline-node {
          width: 32px; height: 32px; border-radius: 999px;
          border: 2px solid var(--ink);
          background: var(--paper);
          box-shadow: var(--shadow-card-press);
          flex-shrink: 0;
        }
        .timeline-node.active { background: var(--accent); }
        .timeline-content { margin-top: 18px; padding: 0 8px; }
        .timeline-time { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--ink-mute); letter-spacing: 2px; text-transform: uppercase; }
        .timeline-city { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: var(--ink); margin-top: 8px; }
        .timeline-note { font-family: 'Space Grotesk', sans-serif; font-size: 13px; color: var(--ink-soft); margin-top: 6px; line-height: 1.5; }
        @media (max-width: 720px) {
          .timeline-row { flex-direction: column; gap: 0; }
          .timeline-group { flex-direction: row; align-items: flex-start; text-align: left; gap: 16px; }
          .timeline-node-row { width: auto; flex-direction: column; height: 100%; align-self: stretch; }
          .timeline-line { width: 2px; height: auto; min-height: 24px; flex: 1; }
          .timeline-content { margin-top: 0; padding-bottom: 24px; flex: 1; }
        }
      `}</style>

      <div className="timeline-row">
        {groups.map((g, i) => (
          <div key={g.time} className="timeline-group reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="timeline-node-row">
              <div className={`timeline-line ${i === 0 ? "edge" : ""}`} />
              <div className={`timeline-node ${g.active ? "active" : ""}`} />
              <div className={`timeline-line ${i === groups.length - 1 ? "edge" : ""}`} />
            </div>
            <div className="timeline-content">
              <div className="timeline-time">{g.time}</div>
              <div className="timeline-city">{g.cities}</div>
              <div className="timeline-note">{g.note}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* Change 5/6/7 — traction with unit economics + live counters */
function Traction() {


  const items: Array<{ k: string; v: React.ReactNode; sub: string }> = [
    {
      k: "Driver interest",
      v: "Open",
      sub: "Founding applications now live",
    },
    {
      k: "Advertiser meetings",
      v: "Active",
      sub: "Warm conversations in progress",
    },
    { k: "Pilot routes", v: "Ready", sub: "Fort · Nugegoda · Wellawatte" },
    { k: "Website", v: "Live", sub: "mydiio.lovable.app" },
    { k: "Screen sourcing", v: "Underway", sub: "First 10 units being confirmed" },
  ];


  return (
    <SectionWrap bg="#fff">
      <Eyebrow className="reveal-up">Early traction</Eyebrow>
      <H2 className="reveal-up">Early momentum.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
        {/* Unit economics dark card */}
        <div
          className="reveal-up"
          style={{
            background: "var(--ink)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "var(--card-radius-sm)",
            padding: "20px 24px",
          }}
        >
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase" }}>
            Unit economics
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "var(--accent)", marginTop: 8, lineHeight: 1.1 }}>
            LKR 3,050
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "var(--on-dark)", opacity: 0.65, marginTop: 6, lineHeight: 1.5 }}>
            Net per tuk per month at break-even
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--accent)", marginTop: 8 }}>
            Break-even: Month 4 with 4 advertisers
          </div>
        </div>

        {items.map(({ k, v, sub }) => (
          <div
            key={k}
            className="mydiio-card reveal reveal-up"
            style={{ background: C.cream, padding: "24px 22px" }}
          >
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amber, textTransform: "uppercase" }}>{k}</div>
            <div className="font-display" style={{ fontSize: 22, color: C.ink, marginTop: 10, letterSpacing: "-0.3px", fontWeight: 700 }}>{v}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.5 }}>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

function WhyNow() {
  return (
    <SectionWrap>
      <Eyebrow className="reveal-up">Why now</Eyebrow>
      <H2 className="reveal-up">Why now.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        <Card title="Cheap screens, better hardware" body="Display and connectivity costs are at an all-time low." />
        <Card title="Local businesses need ROI" body="SMB ad budgets demand measurable, accountable channels." />
        <Card title="Sri Lanka ready for smarter media" body="Digital adoption and mobile payments unlock new formats." />
      </div>
    </SectionWrap>
  );
}

function Defensibility() {
  return (
    <SectionWrap bg="#fff">
      <Eyebrow className="reveal-up">Defensibility</Eyebrow>
      <H2 className="reveal-up">What gets stronger over time.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
        <Card title="Driver network density" />
        <Card title="Route data" />
        <Card title="Advertiser relationships" />
        <Card title="Local brand trust" />
        <Card title="Operational know-how" />
      </div>
    </SectionWrap>
  );
}

function Team() {
  return (
    <SectionWrap>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }} className="solution-grid">
        <div className="reveal-up" style={{ borderRadius: "var(--card-radius)", overflow: "hidden", border: "var(--card-border)", boxShadow: "var(--shadow-card-lg)" }}>
          <img src={DRIVER_PAYMENT} alt="mydiio team and driver in Colombo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <Eyebrow className="reveal-up">Team</Eyebrow>
          <H2 className="reveal-up">Operator-led, Colombo-built.</H2>
          <p className="reveal-up" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 17, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.6, maxWidth: 580 }}>
            Built by founders focused on execution, local trust, and category creation.
          </p>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Sri Lankan registered", "Founder led", "Colombo based"].map((b) => (
              <span key={b} className="font-display reveal-up" style={{ background: "var(--paper)", border: "var(--card-border)", color: C.ink, borderRadius: 999, padding: "8px 14px", fontSize: 14, boxShadow: "var(--shadow-card-press)" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

function Fundraise({ onRequestDeck }: { onRequestDeck: () => void }) {
  const uses = ["Fleet rollout", "Hardware installs", "Sales hires", "Tech platform", "Operations"];
  return (
    <SectionWrap bg="#fff">
      <Eyebrow className="reveal-up">Fundraise</Eyebrow>
      <H2 className="reveal-up">Currently raising.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="mydiio-card reveal reveal-up" style={{ background: "var(--accent-soft)", padding: "28px 26px" }}>
          <div className="font-display" style={{ fontSize: 21, color: C.ink, letterSpacing: "-0.3px" }}>Use of funds</div>
          <ul style={{ marginTop: 16, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
            {uses.map((u) => (
              <li key={u} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: C.ink, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.amber, display: "inline-block" }} /> {u}
              </li>
            ))}
          </ul>
        </div>
        <div className="mydiio-card reveal reveal-up" style={{ padding: "28px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="font-display" style={{ fontSize: 21, color: C.ink, letterSpacing: "-0.3px" }}>Strategic alignment</div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.55 }}>
              Seeking strategic investors aligned with Sri Lanka growth, media, and urban infrastructure.
            </p>
          </div>
          <button onClick={onRequestDeck} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "14px 18px", borderRadius: 14, fontSize: 16, marginTop: 24, alignSelf: "flex-start", border: "2px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)", cursor: "pointer" }}>
            Request investor deck →
          </button>
        </div>
      </div>
    </SectionWrap>
  );
}

function FinalCTA({ onRequestDeck }: { onRequestDeck: () => void }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>
      <img src={FLEET_SUNSET} alt="mydiio tuk-tuks at sunset" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(110% 80% at 50% 30%, rgba(26,26,24,0.5) 0%, rgba(26,26,24,0.82) 60%, rgba(26,26,24,0.96) 100%)" }} />
      <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 130px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
        <Eyebrow>Get involved</Eyebrow>
        <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 54px)", color: "#fff", lineHeight: 1.05, marginTop: 14, letterSpacing: "-1px", textWrap: "balance" as const }}>
          Early stage. Real market. Big surface area.
        </h2>
        <div className="hero-cta-row" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={MAILTO} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 14, fontSize: 17, textDecoration: "none", border: "2px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)" }}>
            Talk to founder
          </a>
          <button onClick={onRequestDeck} className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 14, fontSize: 17, border: "2px solid #fff", cursor: "pointer" }}>
            Request deck
          </button>
        </div>
      </div>
    </section>
  );
}

function InvestorsPage() {
  const [deckOpen, setDeckOpen] = useState(false);

  return (
    <SiteShell accent="amber">
      <style>{`
        @media (min-width: 860px) {
          .solution-grid { grid-template-columns: 1.1fr 1fr !important; }
        }
      `}</style>
      <Hero onRequestDeck={() => setDeckOpen(true)} />
      <Problem />
      <OpportunityBridge />
      <BusinessModel />
      <Solution />
      <WhyTukTuks />
      <Market />
      <Traction />
      <WhyNow />
      <Defensibility />
      <Team />
      <Fundraise onRequestDeck={() => setDeckOpen(true)} />
      <FinalCTA onRequestDeck={() => setDeckOpen(true)} />
      <DeckRequestModal open={deckOpen} onClose={() => setDeckOpen(false)} />
    </SiteShell>
  );
}
