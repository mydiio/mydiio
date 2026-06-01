import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";

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
    <section ref={ref} style={{ background: bg, padding: "96px 24px" }}>
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
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={HERO_PHOTO} alt="Tuk-tuk driver in Colombo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.55) 40%, rgba(26,26,24,0.88) 100%)",
      }} />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "120px 6% 80px" }}>
        <div style={{ maxWidth: 760 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.green, textTransform: "uppercase" }}>
            For Colombo Tuk-Tuk Drivers
          </span>
          <h1 className="font-display" style={{
            color: "#fff",
            fontSize: "clamp(38px, 6.5vw, 72px)", lineHeight: 1.05, letterSpacing: "-1px", marginTop: 14,
          }}>
            Your tuk earns while you drive.
          </h1>
          <p style={{
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: "clamp(15px, 1.8vw, 19px)",
            color: "rgba(255,255,255,0.78)", marginTop: 18, maxWidth: 600,
          }}>
            Free installation. LKR 6,000–8,000 every month. You change nothing.
          </p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href={DRIVER_CONTACT}
              className="btn-bold font-display"
              style={{
                background: C.green, color: "#fff",
                padding: "16px 22px", borderRadius: 13, fontSize: 17,
                textDecoration: "none", display: "inline-block",
              }}>
              Join as a driver →
            </a>
          </div>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <StatPill value="LKR 8,000" label="per month maximum" />
            <StatPill value="LKR 96,000" label="per year" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 6, background: C.green }} />
    </section>
  );
}

/* ---------- Earnings Calculator ---------- */
function EarningsCalculator() {
  const [hours, setHours] = useState(8);
  const monthly = Math.round(6000 + ((hours - 4) / 10) * 2000);
  const annual = monthly * 12;
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          Earnings calculator
        </span>
      </div>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        See exactly what you could earn.
      </h2>

      <div className="reveal" style={{
        marginTop: 40, maxWidth: 560, marginInline: "auto",
        background: "#fff", border: `2px solid ${C.ink}`, borderRadius: 16,
        boxShadow: `6px 6px 0 ${C.ink}`, padding: "36px 28px",
      }}>
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
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.inkSoft, letterSpacing: 1.5, marginLeft: 8 }}>/ YEAR</span>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.inkSoft, letterSpacing: 1.5 }}>HOURS PER DAY</span>
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
    </Section>
  );
}

/* ---------- Driver Earnings ---------- */
function DriverEarnings() {
  const badges = ["Fast Payments", "Verified Drivers", "Monthly Bonuses"];
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
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
            Driver earnings
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.6vw, 42px)", color: C.ink, lineHeight: 1.1, marginTop: 12 }}>
            Drivers earn more every month.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: 16, color: C.ink, lineHeight: 1.6, marginTop: 14, maxWidth: 520,
          }}>
            Join our network and get paid through ad revenue.
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
    { n: 1, title: "Message us on WhatsApp", body: "We reply within 24 hours." },
    { n: 2, title: "We install for free", body: "One hour. No cost. Powered by your vehicle." },
    { n: 3, title: "You drive normally", body: "Same routes, same hours. Screen runs automatically." },
    { n: 4, title: "Money arrives on the 5th", body: "Every month. Direct bank transfer." },
  ];
  return (
    <Section bg={C.white}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          How it works
        </span>
      </div>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Four steps. That's the whole thing.
      </h2>
      <div className="how-flow">
        {steps.map((s, i) => (
          <div key={s.n} className="reveal" style={{ display: "contents" }}>
            <div className="step-card">
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

/* ---------- Founding Group ---------- */
function FoundingGroup() {
  const items = [
    "LKR 3,500 refundable deposit (returned at month 3)",
    "LKR 5,000 loyalty bonus at month 3",
    "Net gain: LKR 1,500 ahead after 3 months",
    "Base rate locked permanently",
    "Limited edition amber founding partner shirt",
  ];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          Founding Group A
        </span>
      </div>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        First 10 drivers only.
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
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Your portal. Everything visible.
      </h2>

      <div className="reveal" style={{ marginTop: 36, maxWidth: 520, marginInline: "auto" }}>
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
    { q: "How long is the commitment?", a: "12-month minimum agreement. Your deposit is returned in full after 6 months of continuous participation." },
    { q: "What if I want to stop early?", a: "Exit before 6 months: deposit is forfeited. Exit between 6–12 months: 50% of deposit returned. After 6 months: full deposit returned." },
    { q: "What powers the screen?", a: "The 7-inch screen is powered by your vehicle's 12V electrical system. It adds minimal power draw — less than a phone charger." },
    { q: "What if the screen breaks or is damaged?", a: "mydiio covers replacement of defective screens at no cost to you. Deliberate damage or tampering may result in deposit forfeiture." },
    { q: "Can I refer other drivers?", a: "Yes. Share your referral code and earn LKR 1,500 for every driver who joins and stays for 30 days." },
    { q: "When and how do I get paid?", a: "Monthly bank transfer on the 5th of every month. This is a fixed commitment — never late, never missed." },
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Everything you need to know
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
          The fleet is ready
        </span>
        <h2 className="reveal font-display" style={{
          fontSize: "clamp(32px, 5.2vw, 56px)", color: "#fff",
          lineHeight: 1.05, marginTop: 16, letterSpacing: "-1px",
          maxWidth: 880, marginInline: "auto",
        }}>
          500+ tuk-tuks ready to promote your brand.
        </h2>
        <p className="reveal" style={{
          fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
          fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.78)",
          marginTop: 18, maxWidth: 620, marginInline: "auto", lineHeight: 1.5,
        }}>
          Launch campaigns across Colombo in days.
        </p>
        <div className="reveal" style={{
          marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center",
        }}>
          <a
            href={DRIVER_CONTACT}
            className="btn-bold font-display"
            style={{
              background: C.amber, color: C.ink,
              padding: "16px 24px", borderRadius: 13, fontSize: 17,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Start campaign →
          </a>
          <a
            href={DRIVER_CONTACT}
            className="btn-bold font-display"
            style={{
              background: "transparent", color: "#fff",
              border: "3px solid #fff", boxShadow: "5px 5px 0 rgba(255,255,255,0.25)",
              padding: "16px 24px", borderRadius: 13, fontSize: 17,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============== MAIN ============== */
function DrivePage() {
  return (
    <SiteShell accent="green">
      <style>{`
        .how-flow {
          display: grid; grid-template-columns: 1fr; gap: 24px;
          margin-top: 48px; align-items: stretch;
        }
        .step-card {
          background: #fff; border: 2px solid ${C.ink}; border-radius: 16px;
          padding: 26px; box-shadow: 5px 5px 0 ${C.ink};
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
          .how-flow { grid-template-columns: 1fr 18px 1fr 18px 1fr 18px 1fr; align-items: stretch; }
          .step-line { display: block; align-self: center; height: 2px; background: ${C.ink}; opacity: 0.18; width: 100%; }
        }
      `}</style>

      <Hero />
      <EarningsCalculator />
      <DriverEarnings />
      <HowItWorks />
      <FoundingGroup />
      <DriverPortal />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  );
}

