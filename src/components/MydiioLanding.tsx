import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";

const C = {
  amber: "#F5A623",
  amberDeep: "#E8920A",
  amberPale: "#FEF3D7",
  green: "#4CAF72",
  greenPale: "#EAF2EC",
  ink: "#1A1A18",
  inkSoft: "#7A7A72",
  cream: "#FDFAF3",
  white: "#FFFFFF",
};

/* ---------- Logo ---------- */
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: "14px 28px",
        background: scrolled ? "rgba(26,26,24,0.90)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <Logo scrolled={scrolled} />
      <div className="hidden md:flex items-center gap-3">
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

/* ---------- Section 1 — Hero ---------- */
function Hero() {
  useEffect(() => {
    document.body.style.transition = "background-color 0.6s ease";
    document.body.style.backgroundColor = C.cream;
  }, []);
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <video
        src="/hero-tuktuk.mp4"
        poster={HERO_PHOTO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.55) 40%, rgba(26,26,24,0.85) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "120px 6% 80px" }}>
        <div style={{ maxWidth: 760 }}>
          <h1
            className="font-display text-white"
            style={{
              fontSize: "clamp(40px, 7vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-1px",
            }}
          >
            Your ad, inside every tuk-tuk ride.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', Nunito, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.78)",
              marginTop: 18,
              maxWidth: 600,
            }}
          >
            Screens inside Colombo's tuk-tuks. 14 minutes per ride. No skip button.
          </p>

          <div className="hero-cta-row" style={{ marginTop: 30 }}>
            <Link
              to="/advertise"
              className="btn-bold font-display"
              style={{
                background: C.amber, color: C.ink,
                padding: "16px 22px", borderRadius: 13, fontSize: 17,
                textDecoration: "none", display: "inline-block", textAlign: "center",
              }}
            >
              I want to advertise →
            </Link>
            <Link
              to="/drive"
              className="btn-bold font-display"
              style={{
                background: C.green, color: "#fff",
                padding: "16px 22px", borderRadius: 13, fontSize: 17,
                textDecoration: "none", display: "inline-block", textAlign: "center",
              }}
            >
              I want to drive & earn →
            </Link>
          </div>

          <div className="stat-pills" style={{ marginTop: 28 }}>
            <StatPill value="14 min" label="avg. ride" />
            <StatPill value="LKR 20k/mo" label="starting" />
            <StatPill value="10" label="Pioneer spots" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 6, background: C.amber }} />
    </section>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.20)",
        borderRadius: 999,
        padding: "8px 16px",
        display: "inline-flex",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <span className="font-display" style={{ fontSize: 15, color: "#fff" }}>{value}</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

/* ---------- Reveal section wrapper ---------- */
function Section({
  bg, children, padded = true,
}: { bg: string; children: React.ReactNode; padded?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".reveal").forEach((item, i) =>
            setTimeout(() => item.classList.add("in"), i * 90)
          );
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ background: bg, padding: padded ? "96px 24px" : 0 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ---------- Section 2 — How it works ---------- */
function HowItWorks() {
  const cols = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
          <path d="M6 18 L10 8 H38 L42 18" />
          <path d="M8 18 V40 H40 V18" />
          <path d="M20 40 V28 H28 V40" />
        </svg>
      ),
      title: "Advertiser pays",
      sub: "From LKR 20,000/month",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
          <path d="M8 32 V20 C8 16 11 14 14 14 H30 L38 22 V32" />
          <circle cx="14" cy="36" r="4" />
          <circle cx="34" cy="36" r="4" />
          <path d="M18 32 H30" />
        </svg>
      ),
      title: "Screen plays their ad",
      sub: "GPS-verified, no skip",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
          <circle cx="24" cy="16" r="7" />
          <path d="M10 40 C10 31 16 26 24 26 C32 26 38 31 38 40" />
        </svg>
      ),
      title: "Passenger watches",
      sub: "14 minutes average",
    },
  ];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          How it works
        </span>
      </div>
      <div className="how-grid">
        {cols.map((c, i) => (
          <div key={i} className="reveal" style={{ textAlign: "center" }}>
            <div style={{
              width: 88, height: 88, borderRadius: "50%",
              background: "#FFF", border: `3px solid ${C.ink}`,
              boxShadow: `5px 5px 0 ${C.ink}`,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 22,
            }}>
              {c.icon}
            </div>
            <div className="font-display" style={{ fontSize: 20, color: C.ink }}>{c.title}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 1.5, color: C.inkSoft, marginTop: 8, textTransform: "uppercase" }}>
              {c.sub}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Section 3 — Two paths ---------- */
function TwoPaths() {
  return (
    <Section bg={C.cream}>
      <div className="paths-grid">
        <div className="reveal path-card" style={{ background: C.amberPale }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
            For Businesses
          </span>
          <h3 className="font-display" style={{ fontSize: 28, color: C.ink, marginTop: 12, lineHeight: 1.1 }}>
            Advertise on mydiio
          </h3>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink, marginTop: 14, lineHeight: 1.5 }}>
            Reach Colombo's captive tuk-tuk passengers. GPS-verified reports every Monday. First 14 days free.
          </p>
          <Link
            to="/advertise"
            className="btn-bold font-display"
            style={{
              display: "inline-block", marginTop: 22,
              background: C.amber, color: C.ink,
              padding: "13px 20px", borderRadius: 11, fontSize: 15,
              textDecoration: "none",
            }}
          >
            See advertiser plans →
          </Link>
        </div>

        <div className="reveal path-card" style={{ background: C.greenPale }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#2D8A4E", textTransform: "uppercase" }}>
            For Tuk-Tuk Drivers
          </span>
          <h3 className="font-display" style={{ fontSize: 28, color: C.ink, marginTop: 12, lineHeight: 1.1 }}>
            Earn with mydiio
          </h3>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink, marginTop: 14, lineHeight: 1.5 }}>
            Earn LKR 6,000–8,000/month. Free installation. Drive as you always have.
          </p>
          <Link
            to="/drive"
            className="btn-bold font-display"
            style={{
              display: "inline-block", marginTop: 22,
              background: C.green, color: "#fff",
              padding: "13px 20px", borderRadius: 11, fontSize: 15,
              textDecoration: "none",
            }}
          >
            Start earning →
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Founder section ---------- */
function Founder() {
  return (
    <Section bg={C.cream}>
      <div className="founder-grid">
        <div className="reveal founder-photo-wrap">
          <div
            style={{
              width: 120, height: 120, borderRadius: "50%",
              background: "#E5E2D6",
              border: `3px solid ${C.amber}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              letterSpacing: 1.5, color: C.inkSoft, textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Founder<br/>photo
          </div>
        </div>
        <div className="reveal founder-text">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
            Who we are
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.6vw, 38px)", color: C.ink, lineHeight: 1.1, marginTop: 12 }}>
            Built in Colombo, for Colombo.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: 15, color: C.ink, lineHeight: 1.6, marginTop: 16, maxWidth: 560,
          }}>
            [Founder name] started mydiio in 2026 after noticing that every tuk-tuk passenger in Colombo spends 14 minutes looking at nothing. mydiio turns that empty space into advertising that works — and passive income for drivers. We are a registered Sri Lankan business building transparent technology for Colombo's streets.
          </p>
          <div className="founder-trust">
            <TrustItem icon={
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={C.amberDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 L4 5 V12 C4 17 8 21 12 22 C16 21 20 17 20 12 V5 Z" />
              </svg>
            } label="Registered in Sri Lanka" />
            <TrustItem icon={
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={C.amberDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
              </svg>
            } label="WhatsApp: +94 XX XXX XXXX" />
            <TrustItem icon={
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={C.amberDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            } label="Colombo-based team" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "'DM Mono', monospace", fontSize: 12,
      color: C.inkSoft,
    }}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const heights = [40, 60, 50, 75, 55, 85, 65];
  const labels = ["M","T","W","T","F","S","S"];
  return (
    <div ref={ref} style={{
      position: "relative",
      background: "#0D0D08",
      border: `1px solid ${C.ink}`,
      borderRadius: 14,
      padding: 22,
      maxWidth: 520,
      margin: "0 auto",
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
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.amber, letterSpacing: 2 }}>
        CAMPAIGN DASHBOARD
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        {[
          ["6,841", "Total impressions"],
          ["10 / 10", "Vehicles active"],
          ["14.3m", "Avg. dwell time"],
          ["7 zones", "Colombo coverage"],
        ].map(([v, l]) => (
          <div key={l} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "10px 8px", textAlign: "center",
          }}>
            <div className="font-display" style={{ fontSize: 18, color: C.amber }}>{v}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 4, marginTop: 16, height: 70 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: "100%",
              height: show ? `${h}%` : "0%",
              background: i === 5 ? C.amber : "rgba(245,166,35,0.6)",
              borderRadius: 2,
              transition: `height 0.6s ease ${i * 0.08}s`,
            }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 7, color: "rgba(255,255,255,0.3)" }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Transparency() {
  const items = [
    "Every advertiser gets a live campaign dashboard from day one",
    "Every driver sees their earnings, uptime, and payment history",
    "GPS-verified impression reports delivered weekly",
  ];
  return (
    <Section bg={C.cream}>
      <h2 className="reveal font-display" style={{
        fontSize: "clamp(30px, 4vw, 44px)", color: C.ink, lineHeight: 1.05, textAlign: "center",
      }}>
        Full transparency. Nothing hidden.
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "36px auto 0", maxWidth: 620 }}>
        {items.map((t, i) => (
          <li key={i} className="reveal" style={{
            display: "flex", alignItems: "flex-start", gap: 14,
            padding: "12px 0",
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: 16, color: C.ink, lineHeight: 1.5,
          }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={C.amberDeep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <polyline points="4 12 10 18 20 6" />
            </svg>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="reveal" style={{ marginTop: 48 }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2,
          color: C.inkSoft, textAlign: "center", textTransform: "uppercase", marginBottom: 16,
        }}>
          Dashboard preview
        </div>
        <DashboardPreview />
      </div>
    </Section>
  );
}

/* ============== MAIN ============== */
export default function MydiioLanding() {
  return (
    <div className="w-full" style={{ background: C.cream }}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 14px; }
        .stat-pills { display: flex; flex-wrap: wrap; gap: 10px; }

        .how-grid {
          display: grid; grid-template-columns: 1fr; gap: 40px;
        }
        @media (min-width: 720px) { .how-grid { grid-template-columns: 1fr 1fr 1fr; gap: 32px; } }

        .paths-grid {
          display: grid; grid-template-columns: 1fr; gap: 22px;
        }
        @media (min-width: 760px) { .paths-grid { grid-template-columns: 1fr 1fr; gap: 28px; } }

        .founder-grid {
          display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center;
        }
        .founder-photo-wrap { display: flex; justify-content: center; }
        .founder-text { text-align: center; }
        .founder-trust {
          display: flex; flex-wrap: wrap; gap: 14px 22px;
          margin-top: 22px; justify-content: center;
        }
        @media (min-width: 760px) {
          .founder-grid { grid-template-columns: 40% 60%; gap: 48px; }
          .founder-photo-wrap { justify-content: flex-start; }
          .founder-text { text-align: left; }
          .founder-trust { justify-content: flex-start; }
        }

        .path-card {
          border: 3px solid ${C.ink};
          border-radius: 18px;
          box-shadow: 6px 6px 0 ${C.ink};
          padding: 32px 28px;
        }

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
      <TwoPaths />
      <Founder />
      <Transparency />

      {/* Footer */}
      <footer style={{ background: C.ink, padding: "48px 24px", textAlign: "center" }}>
        <div className="font-display" style={{ fontSize: 24 }}>
          <span style={{ color: "#fff" }}>my</span>
          <span style={{ color: C.amber }}>di</span>
          <span style={{ color: "#fff" }}>io</span>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.amber, letterSpacing: 2, marginTop: 8 }}>ADS ON THE MOVE.</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>mydiio · Colombo · Sri Lanka · 2026 · Built in Colombo, for Colombo.</div>
      </footer>
    </div>
  );
}
