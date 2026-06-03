import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { AdvertiserApplication } from "@/components/site/AdvertiserApplication";
import { ColomboMap } from "@/components/site/ColomboMap";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/advertise")({
  component: AdvertisePage,
  head: () => ({
    meta: [
      { title: "Advertise on mydiio — Reach Colombo's Tuk-Tuk Passengers" },
      { name: "description", content: "14 minutes. No skip button. GPS-verified weekly reports. From LKR 20,000/month with 14 days free." },
      { property: "og:title", content: "Advertise on mydiio — Reach Colombo's Tuk-Tuk Passengers" },
      { property: "og:description", content: "14 minutes. No skip button. GPS-verified. From LKR 20,000/month with 14 days free." },
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
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={HERO_PHOTO} alt="Tuk-tuk screen in Colombo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.55) 40%, rgba(26,26,24,0.88) 100%)",
      }} />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "120px 6% 80px" }}>
        <div style={{ maxWidth: 760 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>
            For Colombo Businesses
          </span>
          <h1 className="font-display" style={{
            color: "#fff",
            fontSize: "clamp(38px, 6.5vw, 72px)", lineHeight: 1.05, letterSpacing: "-1px", marginTop: 14,
          }}>
            Your customers are already in Colombo's tuk-tuks.
          </h1>
          <p style={{
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: "clamp(15px, 1.8vw, 19px)",
            color: "rgba(255,255,255,0.78)", marginTop: 18, maxWidth: 600,
          }}>
            14 minutes. No skip button. GPS-verified weekly reports. From LKR 20,000/month.
          </p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href="#waitlist" onClick={scrollToWaitlist}
              className="btn-bold font-display"
              style={{
                background: C.amber, color: C.ink,
                padding: "16px 22px", borderRadius: 13, fontSize: 17,
                textDecoration: "none", display: "inline-block",
              }}>
              Join the waiting list →
            </a>
          </div>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <StatPill value="14 min" label="captive attention" />
            <StatPill value="14 days" label="first weeks free" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 6, background: C.amber }} />
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
  const steps = [
    { n: 1, title: "Send us your ad", body: "Share your creative or idea. We'll produce it free." },
    { n: 2, title: "We go live overnight", body: "Your ad loads to every active screen in the fleet." },
    { n: 3, title: "Weekly GPS report", body: "Verified impressions delivered to your inbox every Monday." },
  ];
  return (
    <Section bg={C.cream}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div className="reveal reveal-up" style={{ textAlign: "center", marginBottom: 14 }}>
          <span className="eyebrow" style={{ textAlign: "center" }}>How it works</span>
        </div>
        <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
          Three steps. That's the whole thing.
        </h2>
      </div>
      <div className="how-flow">
        {steps.map((s, i) => (
          <div key={s.n} className={`reveal reveal-up delay-${i + 1} step-item`} style={{ display: "contents" }}>
            <div className="step-card mydiio-card">
              <div className="step-circle font-display">{s.n}</div>
              <div className="font-display" style={{ fontSize: 18, color: C.ink, marginTop: 16 }}>{s.title}</div>
              <p style={{
                fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
                fontSize: 14, color: C.inkSoft, marginTop: 8, lineHeight: 1.5,
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

/* ---------- Pricing ---------- */
function Pricing() {
  const plans: Array<{
    name: string; price: string; per: string; features: string[];
    badge?: string; highlight?: boolean;
    tierSlug: "pioneer" | "roamer" | "voyager" | "horizon";
    ctaLabel: string;
    btnStyle: "primary" | "ink" | "ghost";
  }> = [
    {
      name: "PIONEER", price: "LKR 25–35k", per: "/mo · 6-month min",
      features: ["Category exclusivity in your zone", "Rate locked for life", "Priority rotation"],
      badge: "FOUNDING — 10 SPOTS ONLY",
      highlight: true,
      tierSlug: "pioneer", ctaLabel: "Apply for Pioneer →", btnStyle: "primary",
    },
    {
      name: "ROAMER", price: "LKR 20,000", per: "/mo · 3-month min",
      features: ["Standard rotation", "Full dashboard access", "Weekly GPS reports"],
      tierSlug: "roamer", ctaLabel: "Apply for Roamer →", btnStyle: "ink",
    },
    {
      name: "VOYAGER", price: "LKR 32,000", per: "/mo · 6-month min",
      features: ["Priority rotation", "Better loyalty points rate", "Full dashboard access"],
      tierSlug: "voyager", ctaLabel: "Apply for Voyager →", btnStyle: "ink",
    },
    {
      name: "HORIZON", price: "LKR 65,000+", per: "/mo · Custom",
      features: ["Custom zones", "Enterprise support", "Multi-vehicle campaigns"],
      tierSlug: "horizon", ctaLabel: "Contact us about Horizon →", btnStyle: "ghost",
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
        <span className="eyebrow">Pricing</span>
      </div>
      <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(30px, 4vw, 44px)", color: C.ink, textAlign: "center", lineHeight: 1.05 }}>
        Simple plans. No hidden costs.
      </h2>
      <p className="reveal reveal-up" style={{
        fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
        fontSize: 16, color: C.inkSoft, textAlign: "center", marginTop: 14, maxWidth: 560, marginInline: "auto",
      }}>
        All plans include first 14 days free and GPS-verified weekly reports.
      </p>

      <div className="pricing-grid">
        {plans.map((p, idx) => (
          <div key={p.name} className={`reveal reveal-up delay-${idx + 1} price-card mydiio-card`} style={{
            background: "#fff",
            border: `${p.highlight ? 3 : 2}px solid ${p.highlight ? C.amber : C.ink}`,
            boxShadow: `${p.highlight ? 8 : 6}px ${p.highlight ? 8 : 6}px 0 ${C.ink}`,
            borderRadius: 16, padding: 26, position: "relative",
            display: "flex", flexDirection: "column",
          }}>
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
            <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0" }}>
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
              <div style={{ marginTop: 16 }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 11,
                  color: "var(--accent-deep)", fontWeight: 700, marginBottom: 6,
                }}>
                  {remaining} of 10 Pioneer spots remaining
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
                marginTop: 22, textDecoration: "none",
                display: "block", textAlign: "center",
                background: p.btnStyle === "primary" ? "var(--accent)"
                  : p.btnStyle === "ink" ? "var(--ink)"
                  : "transparent",
                color: p.btnStyle === "primary" ? "var(--accent-ink)"
                  : p.btnStyle === "ink" ? "var(--on-dark)"
                  : "var(--ink)",
                padding: "12px 24px", borderRadius: 14, fontSize: 15,
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

      <p className="reveal reveal-up" style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.2,
        color: C.inkSoft, textAlign: "center", marginTop: 36, maxWidth: 640, marginInline: "auto", lineHeight: 1.6,
      }}>
        Every ad minute earns loyalty points — redeemable for free airtime. Pioneer partners earn at the highest rate, permanently.
      </p>
    </Section>
  );
}

/* ---------- Social proof strip ---------- */
function SocialProofStrip() {
  const chips = ["Green Bakery · Nugegoda", "City Pharma · Colombo 03", "Style House · Fort"];
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
        Businesses already interested
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
  return (
    <section className="section-wrap" style={{ background: C.cream, maxWidth: "none" }}>
      <div className="tuk-interior-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal reveal-up" style={{
          border: "2px solid var(--ink)", borderRadius: 22,
          boxShadow: "var(--shadow-card-lg)", overflow: "hidden",
        }}>
          <img src={TUKTUK_INTERIOR} alt="Tuk-tuk interior screen playing an advertisement" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <span className="eyebrow reveal reveal-up">Every ride</span>
          <h3 className="reveal reveal-up font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: C.ink, lineHeight: 1.1, marginTop: 8 }}>
            Your ad plays for the full ride.
          </h3>
          <p className="reveal reveal-up" style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 14, lineHeight: 1.6 }}>
            Passengers face the screen for 10–20 minutes with nothing else to look at. No scroll button. No skip. No competition.
          </p>
          <div className="reveal reveal-up" style={{
            fontFamily: "'Space Mono', monospace", fontSize: 13,
            color: "var(--accent-deep)", fontWeight: 700, marginTop: 16,
          }}>
            14 minutes avg. passenger attention
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dashboard preview ---------- */
function DashboardPreview() {
  const metrics = [
    ["Total impressions"],
    ["Vehicles active"],
    ["Avg. dwell time"],
    ["Colombo coverage"],
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        See exactly what's running.
      </h2>
      <div className="reveal" style={{ marginTop: 36, maxWidth: 560, marginInline: "auto" }}>
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
            PREVIEW — WHAT YOU'LL SEE
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.amber, letterSpacing: 2 }}>
            CAMPAIGN DASHBOARD
          </div>
          <div className="font-display" style={{ fontSize: 16, color: "#fff", marginTop: 14 }}>
            Your Campaign Dashboard
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
            {metrics.map(([label]) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "12px 8px", textAlign: "center",
              }}>
                <div className="font-display" style={{ fontSize: 22, color: "rgba(255,255,255,0.25)" }}>---</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, padding: "10px 12px",
            background: "rgba(245,166,35,0.08)",
            border: "1px solid rgba(245,166,35,0.25)",
            borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 1.5 }}>
              NEXT WEEKLY REPORT
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber }}>
              MONDAY · 9:00 AM
            </span>
          </div>
        </div>
      </div>
      <p className="reveal" style={{
        fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
        fontSize: 14, color: C.inkSoft, textAlign: "center", marginTop: 22, maxWidth: 520, marginInline: "auto",
      }}>
        Every advertiser receives full dashboard access when their campaign goes live.
      </p>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "What kind of ads can I run?", a: "15-second or 30-second video ads, or static image ads. We can produce your first creative for free from your existing branding." },
    { q: "How do I know my ad actually played?", a: "Every play is GPS-logged and timestamped. You receive a verified weekly report every Monday with impressions, zones covered, and week-on-week trends." },
    { q: "What is Pioneer category exclusivity?", a: "As a Pioneer advertiser, no competitor in your business category can advertise on mydiio in your geographic zone while your contract is active. You are the only pharmacy, or the only restaurant, in your area." },
    { q: "Can I cancel?", a: "After your minimum contract term (3 or 6 months depending on tier), you can cancel with 30 days notice. No exit fees after the minimum term." },
    { q: "What does the LKR 5,000 Pioneer deposit cover?", a: "It's fully refundable and credited against your first invoice. It reserves your exclusive category spot while we prepare your campaign." },
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Common questions
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
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          Colombo coverage
        </span>
      </div>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Where your ad travels
      </h2>
      <p className="reveal" style={{
        fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
        fontSize: 16, color: C.inkSoft, textAlign: "center", marginTop: 14,
        maxWidth: 560, marginInline: "auto",
      }}>
        mydiio tuk-tuks cover 7 key zones across Colombo.
      </p>

      <div className="reveal" style={{ marginTop: 40 }}>
        <ColomboMap />
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
        alt="A line of mydiio tuk-tuks at sunset in Colombo, ready to drive brand campaigns"
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
            href="#waitlist"
            onClick={scrollToWaitlist}
            className="btn-bold font-display"
            style={{
              background: C.amber, color: C.ink,
              padding: "16px 24px", borderRadius: 13, fontSize: 17,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Join the waiting list →
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
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============== MAIN ============== */
function AdvertisePage() {
  return (
    <SiteShell accent="amber">
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
          background: ${C.amber}; color: ${C.ink};
          border: 3px solid ${C.ink}; box-shadow: 3px 3px 0 ${C.ink};
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .step-line { display: none; }

        @media (min-width: 820px) {
          .how-flow { grid-template-columns: 1fr 24px 1fr 24px 1fr; align-items: stretch; }
          .step-line { display: block; align-self: center; height: 2px; background: ${C.ink}; opacity: 0.18; width: 100%; }
        }

        .pricing-grid { display: grid; grid-template-columns: 1fr; gap: 22px; margin-top: 56px; }
        @media (min-width: 600px) { .pricing-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }

        .coverage-map-wrap { display: none; }
        .coverage-list { display: flex; }
        @media (min-width: 720px) {
          .coverage-map-wrap { display: block; }
          .coverage-list { display: none; }
        }
      `}</style>

      <Hero />
      <HowItWorks />
      <Pricing />
      <Coverage />
      <DashboardPreview />
      <FAQ />
      <section id="apply-section" style={{ background: C.cream, padding: "96px 24px", scrollMarginTop: 96 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
            Join the waiting list
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4.4vw, 48px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1px", marginTop: 14 }}>
            Reserve your Pioneer spot.
          </h2>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 14 }}>
            Tell us about your business. We'll confirm your spot within 24 hours.
          </p>
          <div style={{ marginTop: 32 }}>
            <AdvertiserApplication />
          </div>
        </div>
      </section>
      <FinalCTA />
    </SiteShell>
  );
}

