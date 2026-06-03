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
            For advertisers
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
            mydiio puts your ad on a screen inside every tuk-tuk ride. Passengers sit facing it for 10 to 20 minutes, with nothing else to look at. Your first 14 days are completely free.
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
    { n: 1, title: "Send us your ad", body: "Share your video or image creative — 15 or 30 seconds long. No production house needed. We'll make your first one for free to get you started." },
    { n: 2, title: "We go live overnight", body: "Your ad loads to every active screen across the fleet in your chosen zones. Campaigns go live within 72 hours of approval." },
    { n: 3, title: "Weekly GPS report", body: "Every Monday you receive a verified report: every vehicle, every GPS location, every play count. Proof your ad ran — every single time." },
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
      features: ["Category exclusivity — you're the only business in your category on mydiio", "Rate locked for life — never increases", "Priority placement across the full fleet", "Free ad creative production"],
      badge: "Founding — 10 spots only",
      highlight: true,
      tierSlug: "pioneer", ctaLabel: "Apply for Pioneer →", btnStyle: "primary",
    },
    {
      name: "ROAMER", price: "LKR 25,000", per: "/mo · 3-month min",
      features: ["Standard rotation", "Up to 5 tuk-tuks in your area", "Full dashboard access", "Weekly GPS reports"],
      tierSlug: "roamer", ctaLabel: "Apply for Roamer →", btnStyle: "ink",
    },
    {
      name: "VOYAGER", price: "LKR 38,000", per: "/mo · 6-month min",
      features: ["Priority rotation", "Up to 15 tuk-tuks across Colombo", "Better loyalty points rate", "Full dashboard access"],
      tierSlug: "voyager", ctaLabel: "Apply for Voyager →", btnStyle: "ink",
    },
    {
      name: "HORIZON", price: "LKR 65,000+", per: "/mo · Custom",
      features: ["15 to 100+ tuk-tuks — your choice", "Enterprise-level support", "Multi-vehicle campaigns", "Dedicated account access"],
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
        All plans include first 7 days free and GPS-verified weekly reports.
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
        Every ad minute earns loyalty points — redeemable for free screen time. Founding Pioneer partners earn points at the highest rate, permanently. Points start accumulating from Day 8.
      </p>
    </Section>
  );
}

/* ---------- Colombo Coverage ---------- */
function ColomboCoverage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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

  const zones = [
    { id: "CMB-01", name: "Fort / Pettah", desc: "Government, banking and commercial core" },
    { id: "CMB-02", name: "Kollupitiya", desc: "Retail, hotels and seafront corridor" },
    { id: "CMB-03", name: "Bambalapitiya", desc: "Shopping, schools and coast" },
    { id: "CMB-04", name: "Wellawatte", desc: "Dense residential and dining strip" },
    { id: "CMB-05", name: "Dehiwala", desc: "Major suburban hub south of the city" },
    { id: "CMB-06", name: "Borella", desc: "Hospitals, offices and key junctions" },
    { id: "CMB-07", name: "Maradana", desc: "Transport hub and rail interchange" },
    { id: "CMB-08", name: "Rajagiriya / Kotte", desc: "Government and business district" },
    { id: "NUG-01", name: "Nugegoda", desc: "Suburban retail and commuter belt" },
    { id: "MAH-01", name: "Maharagama", desc: "Fast-growing outer suburb" },
  ];

  const tiers = [
    { name: "PIONEER", zones: "All 10 zones", accent: true },
    { name: "ROAMER", zones: "3 zones", accent: false },
    { name: "VOYAGER", zones: "7 zones", accent: false },
    { name: "HORIZON", zones: "All 10 zones", accent: false },
  ];

  const bursts = [
    { name: "SPARK", zones: "1 zone" },
    { name: "BLAST", zones: "3 zones" },
    { name: "SURGE", zones: "All 10 zones" },
  ];

  return (
    <section ref={ref} className="section-wrap" style={{ background: "var(--bg)", maxWidth: "none" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="reveal reveal-up" style={{ textAlign: "center" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em",
            color: "var(--accent-deep)", textTransform: "uppercase", display: "inline-block",
          }}>
            Where your audience is
          </span>
        </div>
        <h2 className="reveal reveal-up font-display" style={{
          fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em",
          color: "var(--ink)", textAlign: "center", marginTop: 12, lineHeight: 1.1,
        }}>
          Your ad moves with Colombo.
        </h2>
        <p className="reveal reveal-up" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)",
          fontWeight: 400, color: "var(--ink-soft)", textAlign: "center",
          maxWidth: "50ch", margin: "12px auto 48px", lineHeight: 1.5,
        }}>
          mydiio tuk-tuks drive through every part of Colombo every day. Your weekly report shows exactly which neighbourhoods your ad reached — verified by GPS on every vehicle.
        </p>

        <div className="coverage-tier-wrap">
          <div className="reveal reveal-up zone-grid">
            {zones.map((z) => (
              <div key={z.id} className="zone-card">
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                  color: "var(--accent-deep)",
                }}>
                  {z.id}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                  fontSize: 15, color: "var(--ink)", marginTop: 4,
                }}>
                  {z.name}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
                  color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 2,
                }}>
                  {z.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal reveal-up tier-card">
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 17, color: "var(--ink)", marginBottom: 4,
            }}>
              Zones by plan
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
              color: "var(--ink-soft)", marginBottom: 20,
            }}>
              The number of zones you can run in at the same time depends on your plan.
            </div>

            {tiers.map((t, i) => (
              <div key={t.name} className="tier-row" style={{
                borderBottom: i === tiers.length - 1 ? "none" : "1px solid rgba(30,26,21,0.08)",
              }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
                  color: t.accent ? "var(--accent-deep)" : "var(--ink-soft)",
                }}>
                  {t.name}
                </span>
                <span style={{
                  background: t.accent ? "var(--accent)" : "var(--paper)",
                  border: "2px solid var(--ink)", borderRadius: 20,
                  padding: "3px 12px",
                  fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  color: "var(--ink)",
                }}>
                  {t.zones}
                </span>
              </div>
            ))}

            <div style={{ height: 1, background: "rgba(30,26,21,0.08)", margin: "16px 0" }} />

            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em",
              margin: "16px 0 10px",
            }}>
              BURST PACKAGES
            </div>

            {bursts.map((b, i) => (
              <div key={b.name} className="tier-row" style={{
                borderBottom: i === bursts.length - 1 ? "none" : "1px solid rgba(30,26,21,0.08)",
              }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
                  color: "var(--ink-soft)",
                }}>
                  {b.name}
                </span>
                <span style={{
                  background: "var(--paper)",
                  border: "2px solid var(--ink)", borderRadius: 20,
                  padding: "3px 12px",
                  fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  color: "var(--ink)",
                }}>
                  {b.zones}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
          color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.6, textAlign: "left",
        }}>
          Zone limits apply to simultaneous deployment. You can change your active zones at any time by contacting your account manager.
        </p>

        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          color: "var(--accent-deep)", fontWeight: 700,
          textAlign: "center", marginTop: 32,
        }}>
          Coverage expands as more drivers join the fleet. Pioneer advertisers select their preferred zones at sign-up.
        </p>
      </div>

      <style>{`
        .coverage-tier-wrap { display: flex; gap: 40px; flex-wrap: wrap; }
        .coverage-tier-wrap > .zone-grid { flex: 1 1 55%; min-width: 280px; }
        .coverage-tier-wrap > .tier-card { flex: 1 1 45%; min-width: 280px; }
        @media (max-width: 767px) {
          .coverage-tier-wrap > .zone-grid,
          .coverage-tier-wrap > .tier-card { flex: 1 1 100%; }
        }
        .zone-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .zone-card {
          background: var(--paper);
          border: 2px solid var(--ink);
          border-radius: 14px;
          box-shadow: 3px 3px 0 var(--ink);
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .zone-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--ink);
        }
        .tier-card {
          background: var(--paper);
          border: 2px solid var(--ink);
          border-radius: 22px;
          box-shadow: 4px 4px 0 var(--ink);
          padding: 24px;
        }
        .tier-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }
      `}</style>
    </section>
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
  const statSets = [
    { impressions: "6,841", vehicles: "8 / 10", dwell: "14.3m", coverage: "7 zones" },
    { impressions: "7,204", vehicles: "9 / 10", dwell: "15.1m", coverage: "7 zones" },
    { impressions: "8,011", vehicles: "10 / 10", dwell: "13.8m", coverage: "7 zones" },
  ];
  const [statIndex, setStatIndex] = useState(0);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setStatIndex((i) => (i + 1) % statSets.length);
        setFade(false);
      }, 200);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  const current = statSets[statIndex];
  const cells: Array<[string, string]> = [
    [current.impressions, "Total impressions"],
    [current.vehicles, "Vehicles active"],
    [current.dwell, "Avg. dwell time"],
    [current.coverage, "Colombo coverage"],
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        See exactly what's running.
      </h2>
      <div className="reveal reveal-up" style={{ marginTop: 36, maxWidth: 560, marginInline: "auto" }}>
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
            {cells.map(([value, label]) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "12px 8px", textAlign: "center",
              }}>
                <div className="font-display" style={{
                  fontSize: 22, color: "#fff",
                  opacity: fade ? 0.6 : 1, transition: "opacity 0.4s ease",
                }}>{value}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#45855A",
              animation: "live-dot 1.8s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em",
            }}>
              LIVE DATA · UPDATES IN REAL TIME
            </span>
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

/* ---------- Pioneer Programme ---------- */
function PioneerProgramme() {
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

  const items = [
    { n: "01", h: "Category exclusivity", b: "You are the only business in your category advertising on mydiio. A Pioneer pharmacy means no other pharmacy — anywhere on the fleet, anywhere in Colombo — can run ads on mydiio while your campaign is active." },
    { n: "02", h: "Rate locked for life", b: "Your monthly rate never increases — regardless of how the network grows, how many advertisers join, or how many vehicles are added. The rate you start with is yours permanently." },
    { n: "03", h: "Priority rotation", b: "Your campaign always runs first in the ad rotation on every vehicle in your active zones. You are never bumped, delayed, or deprioritised by a higher-spending advertiser." },
    { n: "04", h: "Free creative production", b: "We produce your first campaign creative at no charge — a 15 or 30-second video ad or a static image, built from your existing branding. No agency needed to get started." },
  ];

  return (
    <section ref={ref} className="section-wrap" style={{ background: "var(--ink)", maxWidth: "none", color: "var(--on-dark)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal reveal-up" style={{ textAlign: "center" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em",
            color: "var(--accent)", textTransform: "uppercase", display: "inline-block",
          }}>
            Pioneer programme
          </span>
        </div>
        <h2 className="reveal reveal-up font-display" style={{
          fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em",
          color: "var(--on-dark)", textAlign: "center", marginTop: 12, lineHeight: 1.1,
        }}>
          Only 10 founding advertisers. Ever.
        </h2>
        <p className="reveal reveal-up" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(15px, 1.4vw, 18px)",
          fontWeight: 400, color: "var(--on-dark)", opacity: 0.65, textAlign: "center",
          maxWidth: "52ch", margin: "16px auto 56px", lineHeight: 1.65,
        }}>
          Pioneer spots are not a promotional offer — they are a permanent founding partnership. Your rate is locked in for life. Your category exclusivity means you are the only business in your sector advertising on mydiio. When Pioneer is full, it is full. There will only ever be 10.
        </p>

        <div className="reveal reveal-up" style={{ maxWidth: 480, margin: "0 auto 48px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const filled = i < 3;
              return (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: filled ? "var(--accent)" : "transparent",
                  border: filled ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                }}>
                  {filled ? "✓" : ""}
                </div>
              );
            })}
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "var(--accent)", marginTop: 14 }}>
            3 of 10 Pioneer spots claimed
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
            7 remaining
          </div>
        </div>

        <div className="pioneer-grid">
          {items.map((it, i) => (
            <div key={it.n} className={`reveal reveal-up delay-${i + 1} pioneer-card`}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontWeight: 700,
                fontSize: "clamp(36px, 4vw, 48px)", color: "var(--accent)", lineHeight: 1,
              }}>{it.n}</div>
              <h4 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20,
                color: "var(--on-dark)", margin: "10px 0 8px",
              }}>{it.h}</h4>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 14,
                color: "var(--on-dark)", opacity: 0.65, lineHeight: 1.65, margin: 0,
              }}>{it.b}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 15,
            color: "var(--on-dark)", opacity: 0.55, marginBottom: 20,
          }}>
            10 spots total. First come, first served. Colombo launch.
          </div>
          <a href="/advertise/apply?tier=pioneer" className="pioneer-cta" style={{
            display: "inline-block", maxWidth: 280, width: "100%",
            background: "var(--accent)", color: "var(--ink)",
            border: "2px solid var(--on-dark)", borderRadius: 12,
            boxShadow: "4px 4px 0 var(--on-dark)",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15,
            padding: "14px 28px", textDecoration: "none", transition: "all 0.2s ease",
          }}>
            Claim a Pioneer spot →
          </a>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: "var(--on-dark)", opacity: 0.4, marginTop: 12,
          }}>
            No payment now · We'll contact you within 24 hours
          </div>
        </div>
      </div>
      <style>{`
        .pioneer-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { .pioneer-grid { grid-template-columns: repeat(2, 1fr); } }
        .pioneer-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 24px;
          transition: all 0.2s ease;
        }
        .pioneer-card:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--accent);
        }
        .pioneer-cta:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--on-dark);
        }
      `}</style>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "What kind of ads can I run?", a: "15-second or 30-second video ads, or static image ads. We can produce your first creative for free from your existing branding — just share your logo, colours, and a short brief." },
    { q: "How do I know my ad actually played?", a: "Every Monday you receive a GPS-verified report showing each vehicle that ran your ad, the GPS location at the time of each play, and the total play count. There is no guessing — every impression is logged." },
    { q: "What is Pioneer category exclusivity?", a: "Pioneer advertisers are the only business in their category allowed to advertise in their active zones. For example, a Pioneer pharmacy in Fort means no other pharmacy can run on the mydiio fleet in Fort while your campaign is active." },
    { q: "Can I cancel?", a: "Subscription plans have minimum terms: 3 months for Roamer, 6 months for Voyager and Pioneer. After the minimum term, you can cancel with 30 days' notice. Burst packages have no contract — they run until your minutes or validity period are used up." },
    { q: "What does the LKR 5,000 Pioneer deposit cover?", a: "The LKR 5,000 deposit secures your spot on the waiting list. It is fully refundable — credited against your first invoice when you proceed, or returned in full if you decide not to. No risk. No commitment." },
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
        Where your ad travels.
      </h2>
      <p className="reveal" style={{
        fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
        fontSize: 16, color: C.inkSoft, textAlign: "center", marginTop: 14,
        maxWidth: 560, marginInline: "auto",
      }}>
        mydiio tuk-tuks operate across 10 key zones in Greater Colombo. Every advertiser chooses which zones they want to be active in. Pioneer advertisers can access all 10 zones simultaneously.
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

/* ---------- Burst Packages ---------- */
function BurstPackages() {
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
  const bursts = [
    {
      tier: "SPARK",
      price: "LKR 5,000",
      features: ["500 screen minutes", "Up to 5 vehicles", "Valid for 7 days"],
      bestFor: "A weekend event or a quick test",
      href: "/advertise/apply?tier=burst-spark",
      popular: false,
    },
    {
      tier: "BLAST",
      price: "LKR 18,000",
      features: ["2,000 screen minutes", "Up to 10 vehicles", "Valid for 14 days"],
      bestFor: "A week-long campaign or product launch",
      href: "/advertise/apply?tier=burst-blast",
      popular: true,
    },
    {
      tier: "SURGE",
      price: "LKR 40,000",
      features: ["5,000 screen minutes", "Full fleet", "Valid for 30 days"],
      bestFor: "A major event — full citywide reach",
      href: "/advertise/apply?tier=burst-surge",
      popular: false,
    },
  ];

  return (
    <section ref={ref} className="section-wrap" style={{ background: "var(--bg2)", maxWidth: "none" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="reveal reveal-up" style={{ textAlign: "center" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em",
            color: "var(--accent-deep)", textTransform: "uppercase", display: "inline-block",
          }}>
            Burst packages
          </span>
        </div>
        <h2 className="reveal reveal-up font-display" style={{
          fontSize: "clamp(30px, 4.4vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em",
          color: "var(--ink)", textAlign: "center", marginTop: 12, lineHeight: 1.1,
        }}>
          Need advertising without a monthly plan?
        </h2>
        <p className="reveal reveal-up" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)",
          fontWeight: 400, color: "var(--ink-soft)", textAlign: "center",
          maxWidth: "52ch", margin: "12px auto 48px", lineHeight: 1.5,
        }}>
          Burst packages let you buy a block of screen time with no contract. Perfect for events, product launches, and seasonal campaigns.
        </p>

        <div className="burst-grid">
          {bursts.map((b, i) => (
            <div key={b.tier} className={`reveal reveal-up delay-${i + 1} burst-card`}>
              {b.popular && (
                <div style={{
                  display: "inline-block", background: "var(--accent)", color: "var(--ink)",
                  border: "2px solid var(--ink)", borderRadius: 20, padding: "3px 12px",
                  fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
                }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.12em", color: "var(--ink)", textTransform: "uppercase",
              }}>
                {b.tier}
              </div>
              <div className="font-display" style={{
                fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700,
                color: "var(--ink)", margin: "8px 0 4px", lineHeight: 1.1,
              }}>
                {b.price}
              </div>
              <div style={{ height: 1, background: "rgba(30,26,21,0.1)", margin: "16px 0" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: "1 1 auto" }}>
                {b.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 0" }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", background: "var(--accent)",
                      flexShrink: 0, marginTop: 6,
                    }} />
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: 14,
                      color: "var(--ink-soft)", lineHeight: 1.5,
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: 16 }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  BEST FOR
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
                  color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.5,
                }}>
                  {b.bestFor}
                </div>
              </div>
              <a href={b.href} className={b.popular ? "burst-cta-primary" : "burst-cta-ghost"} style={{
                marginTop: 16, textDecoration: "none", display: "block", textAlign: "center",
                padding: "12px 20px", borderRadius: 12, fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600, fontSize: 14,
              }}>
                Get started →
              </a>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "var(--ink-soft)",
          textAlign: "center", maxWidth: "60ch", margin: "32px auto 0", lineHeight: 1.6,
        }}>
          Burst packages are one-off purchases with no ongoing commitment. Your campaign runs on the number of tuk-tuks shown until your minutes are used or your validity period ends — whichever comes first. Subscribed advertisers always have priority in the rotation.
        </p>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--accent-deep)",
          textAlign: "center", marginTop: 10,
        }}>
          Want consistent visibility? Monthly plans start from LKR 25,000 — with loyalty points, priority rotation, and no expiry date on your campaign.
        </p>
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
          padding: 26px; box-shadow: var(--shadow-card);
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
          .how-flow { grid-template-columns: 1fr 16px 1fr 16px 1fr; align-items: stretch; }
          .step-line {
            display: block; width: 2px; height: 36px;
            background: var(--accent); opacity: 0.45;
            border-radius: 1px; flex-shrink: 0;
            align-self: center; margin: 0 4px;
          }
        }
        @media (max-width: 767px) { .step-line { display: none !important; } }

        .pricing-grid { display: grid; grid-template-columns: 1fr; gap: 22px; margin-top: 56px; }
        @media (min-width: 600px) { .pricing-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }

        .coverage-map-wrap { display: none; }
        .coverage-list { display: flex; }
        @media (min-width: 720px) {
          .coverage-map-wrap { display: block; }
          .coverage-list { display: none; }
        }

        .tuk-interior-grid {
          display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center;
        }
        @media (min-width: 820px) {
          .tuk-interior-grid { grid-template-columns: 45fr 55fr; gap: 48px; }
        }

        @keyframes live-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (max-width: 640px) {
          .sp-strip { flex-direction: column; align-items: flex-start; }
        }

        .burst-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 768px) { .burst-grid { grid-template-columns: repeat(3, 1fr); } }
        .burst-card {
          background: ${C.paper}; border: 2px solid ${C.ink}; border-radius: 22px;
          box-shadow: 4px 4px 0 ${C.ink}; padding: clamp(24px, 3vw, 36px);
          display: flex; flex-direction: column; transition: all 0.2s ease;
        }
        .burst-card:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 ${C.ink}; }
        .burst-cta-ghost {
          display: block; text-align: center; padding: 12px 20px; border-radius: 12px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;
          text-decoration: none; background: transparent; color: ${C.ink};
          border: 2px solid ${C.ink}; box-shadow: 3px 3px 0 ${C.ink}; transition: all 0.2s ease;
        }
        .burst-cta-ghost:hover { background: ${C.ink}; color: ${C.onDark}; }
        .burst-cta-primary {
          display: block; text-align: center; padding: 12px 20px; border-radius: 12px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;
          text-decoration: none; background: ${C.accent}; color: ${C.ink};
          border: 2px solid ${C.ink}; box-shadow: 4px 4px 0 ${C.ink}; transition: all 0.2s ease;
        }
        .burst-cta-primary:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 ${C.ink}; }
      `}</style>

      <Hero />
      <HowItWorks />
      <TukInterior />
      <Pricing />
      <ColomboCoverage />
      <BurstPackages />
      <PioneerProgramme />
      <SocialProofStrip />
      <Coverage />
      <DashboardPreview />
      <FAQ />
      <section id="apply-section" className="section-wrap" style={{ background: C.cream, scrollMarginTop: 96, maxWidth: "none" }}>
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


