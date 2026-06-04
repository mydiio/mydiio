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
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/drive")({
  component: DrivePage,
  head: () => ({
    meta: [
      { title: "Drive & Earn with mydiio — LKR 6,000–8,000 Every Month" },
      { name: "description", content: "Free installation. LKR 6,000–8,000 monthly. You change nothing about how you drive. Paid on the 5th of every month." },
      { property: "og:title", content: "Drive & Earn with mydiio — LKR 6,000–8,000 Every Month" },
      { property: "og:description", content: "Free installation. LKR 6,000–8,000 monthly. Paid on the 5th." },
    ],
  }),
});

const DRIVER_CONTACT = "/contact";
const SPOTS_REMAINING = 7;


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
  const stats = [
    { v: "LKR 8,000", suffix: "", label: "per month max" },
    { v: "LKR 96,000", suffix: "", label: "per year" },
    { v: "1", suffix: " hr", label: "installation time" },
    { v: "0", suffix: "", label: "cost to join" },
  ];
  return (
    <section className="relative w-full overflow-hidden page-hero-fixed">
      <img src={DRIVER_PORTRAIT.url} alt="Sri Lankan tuk-tuk driver at golden hour in Colombo" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center" }} />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to right, rgba(20,16,12,0.85) 0%, rgba(20,16,12,0.65) 55%, rgba(20,16,12,0.35) 100%)",
      }} />
      <div className="relative z-10 flex flex-col items-start justify-end page-hero-inner" style={{ padding: "120px 6% 80px" }}>
        <div style={{ maxWidth: "55%", width: "100%" }} className="page-hero-textblock">
          <span className="page-hero-label">
            For drivers
          </span>
          <h1 className="page-hero-headline" style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            color: "#fff",
            fontWeight: 500,
            lineHeight: 1.4,
            marginTop: 14,
          }}>
            Drivers earn more every month.
          </h1>
          <p style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 400,
            fontSize: 16,
            color: "rgba(253,250,243,0.85)", marginTop: 18, maxWidth: 600, lineHeight: 1.7,
          }}>
            Join our network and get paid through ad revenue. Your tuk-tuk earns while you drive your normal routes.
          </p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href={DRIVER_CONTACT}
              className="btn-bold font-display"
              style={{
                background: C.green, color: "#fff",
                padding: "16px 22px", borderRadius: 13, fontSize: 17,
                textDecoration: "none", display: "inline-block",
              }}>
              Join as Driver →
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

/* ---------- Earnings Calculator ---------- */
function EarningsCalculator() {
  const [hours, setHours] = useState(8);
  const monthly = hours >= 8 ? 8000 : 6000;
  const annual = monthly * 12;

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
  const groupARemaining = Math.max(0, 10 - approvedCount);

  return (
    <Section bg={C.cream}>
      <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
        <span className="eyebrow">Earnings calculator</span>
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
          Earnings calculator · based on your hours
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
              per month
            </div>
            <div className="font-display" style={{
              fontSize: 22, color: C.ink, marginTop: 18,
              fontVariantNumeric: "tabular-nums",
            }}>
              LKR {annual.toLocaleString()}
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.inkSoft, letterSpacing: 1.5, marginLeft: 8 }}>/ year</span>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.inkSoft, letterSpacing: 1.5 }}>Hours per day</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.amberDeep, fontVariantNumeric: "tabular-nums" }}>{hours}h</span>
            </div>
            <input
              type="range" min={4} max={14} step={1} value={hours}
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
            Base pay: LKR 6,000. Route bonus: LKR 2,000 (8+ hours/day).
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
            ✓ PAYMENT ON THE 5TH · EVERY MONTH · BANK TRANSFER · NO EXCEPTIONS
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
          Group A Founding Partners: {groupARemaining} of 10 spots remaining
        </div>
      </div>
    </Section>
  );
}

/* ---------- Driver Earnings ---------- */
function DriverEarnings() {
  const badges = ["Fast payments", "Verified drivers", "Monthly bonuses"];
  return (
    <Section bg={C.cream}>
      <div className="earnings-grid">
        <div className="reveal earnings-photo-wrap">
          <img
            src={DRIVER_PAYMENT}
            alt="mydiio driver smiling with a payment confirmation on his phone"
            style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%",
              borderRadius: 18, border: `3px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}`,
              display: "block",
            }}
          />
        </div>
        <div className="reveal">
          <span className="eyebrow">
            Driver earnings
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: C.ink, lineHeight: 1.5, marginTop: 0, letterSpacing: 0 }}>
            Drivers earn more every month.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: 16, color: C.ink, lineHeight: 1.6, marginTop: 14, maxWidth: 520,
          }}>
            Join our network and get paid through ad revenue. Your tuk-tuk earns while you drive your normal routes.
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
            Join as Driver →
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
  const steps = [
    { n: 1, title: "Get in touch", body: "Apply through our website or reach out directly. We reply within 24 hours." },
    { n: 2, title: "We install for free", body: "We fit a small screen in your tuk at no cost to you. It takes about an hour and is powered by your vehicle." },
    { n: 3, title: "You drive normally", body: "Same routes, same hours. The screen runs automatically. You do not need to do anything differently." },
    { n: 4, title: "Money arrives on the 5th", body: "Every month, your earnings are paid directly to your bank account on the 5th. Without exception." },
  ];
  return (
    <Section bg={C.white}>
      <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
        <span className="eyebrow">How it works</span>
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
  return (
    <Section bg={C.cream}>
      <div className="install-grid">
        <div>
          <span className="eyebrow reveal reveal-up" style={{ color: "var(--green-ink)" }}>Installation</span>
          <h3 className="reveal reveal-up font-display" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: C.ink, lineHeight: 1.1, marginTop: 10 }}>
            We install it. You drive.
          </h3>
          <p className="reveal reveal-up" style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, marginTop: 14 }}>
            One hour. No cost to you. Powered by your vehicle's existing electrics. You won't notice it's there — but your passengers will.
          </p>
          <ul className="reveal reveal-up" style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {["✓ Installed at our cost", "✓ Replaced free if damaged", "✓ Removed free if you leave"].map((t) => (
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
            alt="Hands fitting a tablet screen into the roof frame of a tuk-tuk on a Colombo street"
            className="install-photo install-photo-top"
            style={{ width: "100%", height: 260, objectFit: "cover", objectPosition: "center", borderRadius: 12, display: "block" }}
          />
          <img
            src={INSTALL_LIVE.url}
            alt="Installed tuk-tuk screen displaying an amber and cream advertisement on a Colombo street"
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
  const items = [
    "Group A (drivers 1–10) — LKR 5,000 loyalty bonus at Month 3, putting you ahead of what you paid to join",
    "Group B (drivers 11–20) — LKR 3,000 loyalty bonus at Month 3",
    "Limited-edition amber founding partner shirt — only 10 will ever exist",
    "Branded merchandise every 6 months — polo shirt, umbrella, phone holder, fuel card",
  ];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
        <span className="eyebrow" style={{ textAlign: "center" }}>
          First 20 drivers only
        </span>
      </div>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: C.ink, textAlign: "center", lineHeight: 1.5, marginTop: 0, letterSpacing: 0 }}>
        Be a founding driver.
      </h2>

      <div className="reveal" style={{
        maxWidth: 560, marginInline: "auto", marginTop: 40,
        background: "#fff", border: `3px solid ${C.amber}`,
        boxShadow: `8px 8px 0 ${C.ink}`, borderRadius: 16,
        padding: 28, position: "relative",
      }}>
        <div style={{
          position: "absolute", top: -14, right: 18,
          background: C.amber, color: C.ink,
          fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2,
          padding: "5px 10px", borderRadius: 999, fontWeight: 700,
          border: `2px solid ${C.ink}`,
        }}>
          {SPOTS_REMAINING} SPOTS REMAINING
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
      </div>

      <p className="reveal" style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.2,
        color: C.inkSoft, textAlign: "center", marginTop: 28,
        maxWidth: 560, marginInline: "auto", lineHeight: 1.6,
      }}>
        Standard partners (after Group A closes): LKR 5,000 deposit, no loyalty bonus, standard rate.
      </p>
    </Section>
  );
}

/* ---------- Driver Portal Preview ---------- */
function DriverPortal() {
  return (
    <Section bg={C.white}>
      <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Your portal. Everything visible.
      </h2>

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
          }}>
            PREVIEW
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.green, letterSpacing: 2 }}>
            DRIVER PORTAL
          </div>

          <div className="font-display" style={{
            fontSize: 32, color: "rgba(255,255,255,0.25)", textAlign: "center",
            marginTop: 18, fontVariantNumeric: "tabular-nums",
          }}>
            LKR ---
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 4 }}>
            This month · Base + Route Bonus
          </div>

          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, marginTop: 22 }}>
            PAYMENT HISTORY
          </div>
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
                <span>—</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 18, padding: 14,
            background: "rgba(245,166,35,0.08)",
            border: "1px solid rgba(245,166,35,0.3)",
            borderRadius: 8,
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: C.amber, letterSpacing: 1.5 }}>YOUR REFERRAL CODE</div>
            <div className="font-display" style={{ fontSize: 14, color: "#fff", marginTop: 4, letterSpacing: 1 }}>MYD-XXX-REF</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
              Earn LKR 1,500 per driver who joins and stays 30 days.
            </div>
          </div>
        </div>
      </div>

      <p className="reveal" style={{
        fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
        fontSize: 14, color: C.inkSoft, textAlign: "center", marginTop: 22,
        maxWidth: 520, marginInline: "auto",
      }}>
        You receive full portal access when installation is confirmed.
      </p>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "How long is the commitment?", a: "We ask for a minimum 12-month agreement. Your deposit is returned in full after 6 months of continuous participation. Founding drivers receive a loyalty bonus at Month 3 that puts them ahead of what they paid to join." },
    { q: "What if I want to stop early?", a: "If you leave before 6 months, your deposit is forfeited. If you leave between 6 and 12 months, half the deposit is returned. After 12 months, you are free to leave with your full deposit returned." },
    { q: "What powers the screen?", a: "The screen runs off your vehicle's existing power supply. An auto-electrician installs it in about an hour. There are no batteries to charge and nothing extra to do." },
    { q: "What if the screen breaks or is damaged?", a: "Normal wear is covered. We handle repairs and replacements at no cost to you. The screen belongs to mydiio — you are hosting it, not responsible for it." },
    { q: "Can I refer other drivers?", a: "Yes. You earn LKR 1,500 for every driver you refer who successfully installs a screen and stays active for 30 days. There is no limit on how many drivers you can refer." },
    { q: "When exactly do I get paid?", a: "On the 5th of every calendar month, by bank transfer. This is a firm commitment — not 'around the 5th' or 'within the first week'. The 5th. Every month." },
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Everything you need to know
      </h2>
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
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
      <img
        src={FLEET_SUNSET}
        alt="A line of mydiio tuk-tuks at sunset in Colombo"
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
          Colombo · Pilot launch · 2026
        </span>
        <h2 className="reveal font-display" style={{
          fontSize: "clamp(32px, 5.2vw, 56px)", color: "#fff",
          lineHeight: 1.05, marginTop: 16, letterSpacing: "-1px",
          maxWidth: 880, marginInline: "auto",
        }}>
          Join Colombo's first in-tuk advertising network.
        </h2>
        <p className="reveal" style={{
          fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
          fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.78)",
          marginTop: 18, maxWidth: 620, marginInline: "auto", lineHeight: 1.5,
        }}>
          Free screen installation. LKR 6,000–8,000 every month. Paid on the 5th, without fail.
        </p>
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
          >
            Apply to drive →
          </a>
          <a
            href="/contact"
            className="btn-bold font-display"
            style={{
              background: "transparent", color: "#fff",
              border: "3px solid #fff", boxShadow: "5px 5px 0 rgba(255,255,255,0.25)",
              padding: "16px 24px", borderRadius: 13, fontSize: 17,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============== MAIN ============== */
function DrivePage() {
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
          src={COLOMBO_TUK_DAYTIME.url}
          alt="mydiio tuk-tuks on a Colombo street in daytime"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
        <style>{`
          .drive-supporting-band { height: 400px; }
          @media (max-width: 767px) { .drive-supporting-band { height: 280px; } }
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
      >
        Apply to drive →
      </a>
    </SiteShell>
  );
}

