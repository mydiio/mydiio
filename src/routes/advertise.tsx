import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";

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

const C = {
  amber: "#F5A623",
  amberDeep: "#E8920A",
  amberPale: "#FEF3D7",
  green: "#4CAF72",
  ink: "#1A1A18",
  inkSoft: "#7A7A72",
  cream: "#FDFAF3",
  white: "#FFFFFF",
};

const WA_ADVERTISER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20advertising%20on%20mydiio";

/* ---------- Nav ---------- */
function Logo({ scrolled }: { scrolled: boolean }) {
  const textColor = scrolled ? C.ink : "#fff";
  const borderColor = scrolled ? C.ink : "#fff";
  return (
    <Link to="/" className="font-display text-[22px] inline-flex items-center px-4 py-1 rounded-full bg-white" style={{ border: `3px solid ${borderColor}`, color: textColor }}>
      <span style={{ color: textColor }}>my</span>
      <span style={{ color: C.amber }}>di</span>
      <span style={{ color: textColor }}>io</span>
    </Link>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: "14px 28px",
        background: scrolled ? "rgba(26,26,24,0.90)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}>
      <Logo scrolled={scrolled} />
      <div className="hidden md:flex items-center gap-3">
        <Link to="/" className="font-display text-[14px]" style={{ color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.85)" }}>
          ← Back
        </Link>
        <Link to="/advertise" className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: C.amber, color: C.ink }}>
          Advertise →
        </Link>
        <Link to="/drive" className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: C.green, color: "#fff" }}>
          Drive & earn →
        </Link>
      </div>
      <div className="md:hidden flex gap-2">
        <Link to="/advertise" className="btn-bold font-display text-[13px] px-3 py-2 rounded-full" style={{ background: C.amber, color: C.ink }}>
          Advertise
        </Link>
        <Link to="/drive" className="btn-bold font-display text-[13px] px-3 py-2 rounded-full" style={{ background: C.green, color: "#fff" }}>
          Drive
        </Link>
      </div>
    </nav>
  );
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
    <section ref={ref} style={{ background: bg, padding: "96px 24px" }}>
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
            <a href={WA_ADVERTISER} target="_blank" rel="noopener noreferrer"
              className="btn-bold font-display"
              style={{
                background: C.amber, color: C.ink,
                padding: "16px 22px", borderRadius: 13, fontSize: 17,
                textDecoration: "none", display: "inline-block",
              }}>
              Start a campaign →
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
    { n: 1, title: "Send us your ad", body: "WhatsApp us your creative or idea. We'll produce it free." },
    { n: 2, title: "We go live overnight", body: "Your ad loads to every active screen in the fleet." },
    { n: 3, title: "Weekly GPS report", body: "Verified impressions delivered to your WhatsApp every Monday." },
  ];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          How it works
        </span>
      </div>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>
        Three steps. That's the whole thing.
      </h2>
      <div className="how-flow">
        {steps.map((s, i) => (
          <div key={s.n} className="reveal step-item" style={{ display: "contents" }}>
            <div className="step-card">
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
  const plans = [
    {
      name: "PIONEER", price: "LKR 25–35k", per: "/mo · 6-month min",
      features: ["Category exclusivity in your zone", "Rate locked for life", "Priority rotation"],
      cta: "Claim a Pioneer spot →",
      badge: "FOUNDING — 10 SPOTS ONLY",
      highlight: true,
    },
    {
      name: "ROAMER", price: "LKR 20,000", per: "/mo · 3-month min",
      features: ["Standard rotation", "Full dashboard access", "Weekly GPS reports"],
      cta: "Start with Roamer →",
    },
    {
      name: "VOYAGER", price: "LKR 32,000", per: "/mo · 6-month min",
      features: ["Priority rotation", "Better loyalty points rate", "Full dashboard access"],
      cta: "Choose Voyager →",
    },
    {
      name: "HORIZON", price: "LKR 65,000+", per: "/mo · Custom",
      features: ["Custom zones", "Enterprise support", "Multi-vehicle campaigns"],
      cta: "Talk to us →",
    },
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal font-display" style={{ fontSize: "clamp(30px, 4vw, 44px)", color: C.ink, textAlign: "center", lineHeight: 1.05 }}>
        Simple plans. No hidden costs.
      </h2>
      <p className="reveal" style={{
        fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
        fontSize: 16, color: C.inkSoft, textAlign: "center", marginTop: 14, maxWidth: 560, marginInline: "auto",
      }}>
        All plans include first 14 days free and GPS-verified weekly reports.
      </p>

      <div className="pricing-grid">
        {plans.map((p) => (
          <div key={p.name} className="reveal price-card" style={{
            background: "#fff",
            border: `${p.highlight ? 3 : 2}px solid ${p.highlight ? C.amber : C.ink}`,
            boxShadow: `${p.highlight ? 8 : 6}px ${p.highlight ? 8 : 6}px 0 ${C.ink}`,
            borderRadius: 16, padding: 26, position: "relative",
            display: "flex", flexDirection: "column",
          }}>
            {p.badge && (
              <div style={{
                position: "absolute", top: -14, left: 18,
                background: C.amber, color: C.ink,
                fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2,
                padding: "5px 10px", borderRadius: 999, fontWeight: 700,
                border: `2px solid ${C.ink}`,
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
            <a href={WA_ADVERTISER} target="_blank" rel="noopener noreferrer"
              className="btn-bold font-display"
              style={{
                marginTop: "auto", paddingTop: 22,
                display: "block", textAlign: "center", textDecoration: "none",
              }}>
              <span style={{
                display: "inline-block",
                background: p.highlight ? C.amber : C.ink, color: p.highlight ? C.ink : "#fff",
                padding: "12px 18px", borderRadius: 11, fontSize: 14,
                border: `3px solid ${C.ink}`, boxShadow: `4px 4px 0 ${C.ink}`,
              }}>
                {p.cta}
              </span>
            </a>
          </div>
        ))}
      </div>

      <p className="reveal" style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.2,
        color: C.inkSoft, textAlign: "center", marginTop: 36, maxWidth: 640, marginInline: "auto", lineHeight: 1.6,
      }}>
        Every ad minute earns loyalty points — redeemable for free airtime. Pioneer partners earn at the highest rate, permanently.
      </p>
    </Section>
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
              NEXT WHATSAPP REPORT
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
    { q: "How do I know my ad actually played?", a: "Every play is GPS-logged and timestamped. You receive a verified report on WhatsApp every Monday with impressions, zones covered, and week-on-week trends." },
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

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <Section bg={C.amber}>
      <h2 className="reveal font-display" style={{
        fontSize: "clamp(30px, 4.4vw, 48px)", color: C.ink, textAlign: "center", lineHeight: 1.05, maxWidth: 720, marginInline: "auto",
      }}>
        Ready to put your brand in front of Colombo?
      </h2>
      <div className="reveal" style={{ marginTop: 32, textAlign: "center" }}>
        <a href={WA_ADVERTISER} target="_blank" rel="noopener noreferrer"
          className="whatsapp-btn-amber font-display"
          style={{
            display: "inline-block", background: C.ink, color: C.amber,
            border: `3px solid ${C.ink}`, borderRadius: 13,
            padding: "16px 28px", fontSize: 18, textDecoration: "none",
          }}>
          Start on WhatsApp →
        </a>
      </div>
      <div className="reveal" style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(26,26,24,0.55)",
        textAlign: "center", marginTop: 18, letterSpacing: 1.2,
      }}>
        We reply within 24 hours. No commitment at this stage.
      </div>
    </Section>
  );
}

/* ============== MAIN ============== */
function AdvertisePage() {
  return (
    <div className="w-full" style={{ background: C.cream }}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

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
          .how-flow {
            grid-template-columns: 1fr 24px 1fr 24px 1fr;
            align-items: stretch;
          }
          .step-line {
            display: block;
            align-self: center;
            height: 2px; background: ${C.ink}; opacity: 0.18;
            width: 100%;
          }
        }

        .pricing-grid {
          display: grid; grid-template-columns: 1fr; gap: 22px;
          margin-top: 56px;
        }
        @media (min-width: 600px) { .pricing-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }

        @keyframes ctaPulseAmber {
          0%,100% { box-shadow: 5px 5px 0 ${C.ink}; }
          50% { box-shadow: 5px 5px 0 ${C.ink}, 0 0 0 8px rgba(26,26,24,0.18); }
        }
        .whatsapp-btn-amber { animation: ctaPulseAmber 3s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Nav />
      <Hero />
      <HowItWorks />
      <Pricing />
      <DashboardPreview />
      <FAQ />
      <FinalCTA />

      <footer style={{ background: C.ink, padding: "48px 24px", textAlign: "center" }}>
        <div className="font-display" style={{ fontSize: 24 }}>
          <span style={{ color: "#fff" }}>my</span>
          <span style={{ color: C.amber }}>di</span>
          <span style={{ color: "#fff" }}>io</span>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.amber, letterSpacing: 2, marginTop: 8 }}>ADS ON THE MOVE.</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>mydiio · Colombo · Sri Lanka · 2026</div>
      </footer>
    </div>
  );
}
