import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";

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
      <img
        src={COLOMBO_STREET}
        alt="Tuk-tuks filling the streets of Colombo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 20%, rgba(26,26,24,0.35) 0%, rgba(26,26,24,0.65) 55%, rgba(26,26,24,0.92) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "clamp(110px, 14vh, 160px) clamp(20px, 6vw, 80px) clamp(70px, 10vh, 110px)" }}>
        <div style={{ maxWidth: 760 }}>
          <h1
            className="font-display text-white"
            style={{
              fontSize: "clamp(40px, 7vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-1px",
            }}
          >
            Colombo's most unavoidable ad space.
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
            Digital screens inside tuk-tuks. 14 minutes of captive attention per ride.
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
    <section ref={ref} style={{ background: bg, padding: padded ? "clamp(64px, 9vw, 128px) clamp(20px, 4vw, 32px)" : 0 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ---------- Stat strip ---------- */
function StatStrip() {
  const stats = [
    { num: "50+", label: "Tuk-tuks ready" },
    { num: "14", label: "Min avg ride", suffix: "min" },
    { num: "7", label: "Colombo zones" },
    { num: "72hr", label: "Campaign launch" },
  ];
  return (
    <Section bg={C.cream}>
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 0,
          border: `3px solid ${C.ink}`,
          borderRadius: 18,
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 14px 40px -20px rgba(26,26,24,0.25)",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              padding: "36px 22px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? `1px solid rgba(26,26,24,0.12)` : "none",
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: "clamp(38px, 5vw, 56px)",
                lineHeight: 1,
                color: C.ink,
                letterSpacing: "-1.5px",
              }}
            >
              {s.num.replace(/[^0-9+hr]/g, "").length ? (
                <>
                  <span>{s.num.replace(/[a-zA-Z+]/g, "")}</span>
                  <span style={{ color: C.amber }}>{s.num.replace(/[0-9.]/g, "")}</span>
                </>
              ) : s.num}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: C.inkSoft,
                marginTop: 12,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}


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
      sub: "Campaigns start from LKR 20,000",
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
      title: "Screen plays ads",
      sub: "Motion-triggered digital playback",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
          <circle cx="24" cy="16" r="7" />
          <path d="M10 40 C10 31 16 26 24 26 C32 26 38 31 38 40" />
        </svg>
      ),
      title: "Passenger watches",
      sub: "Average 14 minutes undivided attention",
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

      <div className="reveal" style={{
        marginTop: 64, borderRadius: 18, overflow: "hidden",
        border: `3px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}`,
        position: "relative",
      }}>
        <img src={TUKTUK_INTERIOR} alt="Passenger view of mydiio screen inside a Colombo tuk-tuk" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
        <div style={{
          position: "absolute", left: 20, bottom: 20, right: 20,
          background: "rgba(26,26,24,0.78)", color: "#fff",
          padding: "14px 18px", borderRadius: 10, maxWidth: 420,
          fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 700, fontSize: 14,
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amber, textTransform: "uppercase", marginBottom: 6 }}>
            Captive attention
          </div>
          14 minutes inside the tuk-tuk. Eye-level. No skip button.
        </div>
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

        <div className="reveal path-card" style={{ background: C.greenPale, padding: 0, overflow: "hidden" }}>
          <img src={DRIVER_PAYMENT} alt="Smiling Colombo tuk-tuk driver holding payment confirmation" style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 25%", display: "block", borderBottom: `3px solid ${C.ink}` }} />
          <div style={{ padding: "28px 28px 32px" }}>
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
            mydiio was created after noticing every tuk-tuk ride contains one rare asset: uninterrupted passenger attention. We turn that attention into measurable advertising revenue for brands and extra income for drivers. Built locally. Designed to scale nationally.
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

      <div className="reveal" style={{ marginTop: 64, textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          Dashboard preview
        </span>
        <h3 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: C.ink, lineHeight: 1.1, marginTop: 12, letterSpacing: "-0.5px" }}>
          Live reporting included.
        </h3>
        <p style={{
          fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
          fontSize: 16, color: C.inkSoft, lineHeight: 1.5, marginTop: 12,
          maxWidth: 580, marginLeft: "auto", marginRight: "auto",
        }}>
          Track impressions, active vehicles, zones and campaign uptime in real time.
        </p>
      </div>
      <div className="reveal" style={{ marginTop: 28 }}>
        <DashboardPreview />
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "How many tuk-tuks are live?",
      a: "We're launching with 50+ tuk-tuks across Colombo and adding new vehicles every week as drivers join the network.",
    },
    {
      q: "How do advertisers measure results?",
      a: "Every campaign comes with a live dashboard showing impressions, active vehicles, zone coverage and uptime — updated in real time and verified by GPS.",
    },
    {
      q: "How quickly can campaigns launch?",
      a: "Most campaigns go live within 72 hours of creative approval. No printing, no installation delays — it's all digital.",
    },
    {
      q: "What cities are next?",
      a: "Colombo first. Kandy, Galle and Negombo are on the roadmap once our Colombo network is fully saturated.",
    },
    {
      q: "How do drivers get paid?",
      a: "Drivers earn monthly through a share of campaign revenue, paid directly to their preferred mobile wallet or bank account.",
    },
  ];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          Questions
        </span>
        <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: C.ink, lineHeight: 1.05, marginTop: 14, letterSpacing: "-1px" }}>
          Frequently asked.
        </h2>
      </div>
      <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((it, i) => (
          <details
            key={i}
            className="reveal faq-item"
            style={{
              background: "#fff",
              border: `3px solid ${C.ink}`,
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: "0 14px 40px -22px rgba(26,26,24,0.25)",
            }}
          >
            <summary
              className="font-display"
              style={{
                fontSize: "clamp(17px, 2vw, 20px)",
                color: C.ink,
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                letterSpacing: "-0.2px",
              }}
            >
              <span>{it.q}</span>
              <span className="faq-plus" style={{ color: C.amber, fontSize: 24, lineHeight: 1, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}>+</span>
            </summary>
            <p
              style={{
                fontFamily: "'DM Sans', Nunito, sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: C.inkSoft,
                lineHeight: 1.6,
                marginTop: 14,
              }}
            >
              {it.a}
            </p>
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

/* ---------- Why this scales ---------- */
function WhyThisScales() {
  const cards = [
    {
      kicker: "01",
      title: "More vehicles = more inventory",
      body: "Every new tuk-tuk added to the network expands available ad slots and city coverage.",
    },
    {
      kicker: "02",
      title: "Colombo first, every city next",
      body: "A proven model in Colombo unlocks Kandy, Galle and beyond — the same playbook, multiplied.",
    },
    {
      kicker: "03",
      title: "Recurring monthly ad revenue",
      body: "Subscription-based campaigns build predictable revenue and lasting advertiser relationships.",
    },
  ];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          The opportunity
        </span>
        <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: C.ink, lineHeight: 1.05, marginTop: 14, letterSpacing: "-1px" }}>
          Why this scales.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {cards.map((c, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              background: "#fff",
              border: `3px solid ${C.ink}`,
              borderRadius: 18,
              padding: "32px 28px",
              boxShadow: "0 14px 40px -22px rgba(26,26,24,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              minHeight: 220,
            }}
          >
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, color: C.amber }}>
              {c.kicker}
            </div>
            <div className="font-display" style={{ fontSize: 22, color: C.ink, lineHeight: 1.2, letterSpacing: "-0.3px" }}>
              {c.title}
            </div>
            <div style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55 }}>
              {c.body}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============== MAIN ============== */
export default function MydiioLanding() {
  return (
    <div className="w-full" style={{ background: C.cream }}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .font-display { letter-spacing: -0.5px; }
        h1.font-display, h2.font-display, h3.font-display { text-wrap: balance; }
        p { text-wrap: pretty; }

        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 14px; }
        .stat-pills { display: flex; flex-wrap: wrap; gap: 10px; }

        .how-grid {
          display: grid; grid-template-columns: 1fr; gap: 48px;
        }
        @media (min-width: 720px) { .how-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; } }

        .paths-grid {
          display: grid; grid-template-columns: 1fr; gap: 22px;
        }
        @media (min-width: 760px) { .paths-grid { grid-template-columns: 1fr 1fr; gap: 28px; } }

        .founder-grid {
          display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center;
        }
        .founder-photo-wrap { display: flex; justify-content: center; }
        .founder-text { text-align: center; }
        .founder-trust {
          display: flex; flex-wrap: wrap; gap: 14px 22px;
          margin-top: 24px; justify-content: center;
        }
        @media (min-width: 760px) {
          .founder-grid { grid-template-columns: 40% 60%; gap: 56px; }
          .founder-photo-wrap { justify-content: flex-start; }
          .founder-text { text-align: left; }
          .founder-trust { justify-content: flex-start; }
        }

        .path-card {
          border: 3px solid ${C.ink};
          border-radius: 20px;
          box-shadow: 6px 6px 0 ${C.ink}, 0 24px 48px -28px rgba(26,26,14,0.35);
          padding: clamp(28px, 4vw, 40px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .path-card:hover { transform: translateY(-4px); box-shadow: 8px 10px 0 ${C.ink}, 0 36px 60px -28px rgba(26,26,14,0.45); }

        @media (max-width: 640px) {
          .hero-cta-row .btn-bold { width: 100%; }
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
      <StatStrip />
      <HowItWorks />
      <TwoPaths />
      <Founder />
      <Transparency />
      <WhyThisScales />

      {/* Fleet CTA */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>
        <img src={FLEET_SUNSET} alt="A line of mydiio tuk-tuks parked at sunset in Colombo" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(110% 80% at 50% 30%, rgba(26,26,24,0.45) 0%, rgba(26,26,24,0.78) 60%, rgba(26,26,24,0.95) 100%)" }} />
        <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 130px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>
            A growing Colombo fleet
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 52px)", color: "#fff", lineHeight: 1.05, marginTop: 14, letterSpacing: "-1px" }}>
            Ready to own Colombo's streets?
          </h2>
          <div className="hero-cta-row" style={{ marginTop: 30, justifyContent: "center" }}>
            <Link to="/advertise" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 17, textDecoration: "none" }}>
              Launch campaign →
            </Link>
            <Link to="/advertise" className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 17, textDecoration: "none", border: "3px solid #fff" }}>
              Talk to founder
            </Link>
          </div>
        </div>
      </section>

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
