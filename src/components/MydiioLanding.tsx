import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
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
function Logo() {
  return (
    <Link
      to="/"
      className="font-display text-[20px] inline-flex items-center px-4 py-1 rounded-full bg-white"
      style={{ border: `3px solid ${C.ink}`, color: C.ink, boxShadow: "2px 2px 0 rgba(26,26,14,0.9)" }}
    >
      <span style={{ color: C.ink }}>my</span>
      <span style={{ color: C.amber }}>di</span>
      <span style={{ color: C.ink }}>io</span>
    </Link>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/advertise", label: "Advertisers" },
    { to: "/drive", label: "Drivers" },
    { to: "/investors", label: "Investors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: "12px 22px",
        background: scrolled ? "rgba(253,250,243,0.92)" : "rgba(253,250,243,0)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,26,24,0.08)" : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Logo />
        <div className="nav-links" style={{ display: "none", gap: 26 }}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-body"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ style: { color: C.ink } }}
              style={{
                fontSize: 14, fontWeight: 700, color: C.inkSoft,
                textDecoration: "none", letterSpacing: "-0.1px",
                transition: "color 0.2s ease",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            to="/advertise"
            className="btn-bold font-display nav-cta"
            style={{ background: C.amber, color: C.ink, padding: "10px 16px", borderRadius: 11, fontSize: 14, textDecoration: "none" }}
          >
            Launch Campaign
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="nav-burger"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: 11, background: "#fff",
              border: `2px solid ${C.ink}`, boxShadow: "2px 2px 0 rgba(26,26,14,0.9)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round">
              {open ? (<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>) : (<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="nav-mobile-panel"
          style={{
            marginTop: 12, padding: 18, borderRadius: 16, background: "#fff",
            border: `2px solid ${C.ink}`, boxShadow: "4px 4px 0 rgba(26,26,14,0.9)",
            display: "flex", flexDirection: "column", gap: 4,
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display"
              style={{
                fontSize: 18, color: C.ink, padding: "10px 6px",
                textDecoration: "none", borderBottom: `1px solid rgba(26,26,24,0.06)`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 880px) {
          .nav-links { display: flex !important; }
          .nav-burger { display: none !important; }
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={COLOMBO_STREET} alt="Tuk-tuks moving through Colombo at golden hour" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.45) 40%, rgba(26,26,24,0.85) 100%)",
      }} />
      <div className="relative z-10 flex flex-col items-start justify-end" style={{ minHeight: "100vh", padding: "clamp(120px, 16vh, 180px) clamp(22px, 6vw, 80px) clamp(72px, 10vh, 110px)" }}>
        <div style={{ maxWidth: 820 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>
            Sri Lanka · Mobility media
          </span>
          <h1 className="font-display reveal in" style={{
            color: "#fff",
            fontSize: "clamp(40px, 7vw, 80px)",
            lineHeight: 1.02,
            letterSpacing: "-1.5px",
            marginTop: 14,
          }}>
            Sri Lanka's Urban<br/>Attention Network.
          </h1>
          <p style={{
            fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600,
            fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(255,255,255,0.82)",
            marginTop: 20, maxWidth: 620, lineHeight: 1.5,
          }}>
            We turn tuk-tuks into moving media across Colombo — helping brands reach real people during real journeys.
          </p>

          <div className="hero-cta-row" style={{ marginTop: 32 }}>
            <Link to="/advertise" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 16, textDecoration: "none" }}>
              Launch Pilot Campaign →
            </Link>
            <Link to="/contact" className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 16, textDecoration: "none", border: "2.5px solid #fff", boxShadow: "none" }}>
              Talk To Founder
            </Link>
          </div>

          <div className="hero-trust" style={{ marginTop: 44 }}>
            {[
              ["50+", "Vehicles ready"],
              ["7", "Colombo zones"],
              ["14 min", "Avg ride attention"],
              ["72 hr", "Campaign launch"],
            ].map(([v, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="font-display" style={{ color: "#fff", fontSize: "clamp(20px, 2.6vw, 26px)", letterSpacing: "-0.5px" }}>{v}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: C.amber }} />
    </section>
  );
}

/* ---------- Section wrapper ---------- */
function Section({ bg, children, tight = false }: { bg: string; children: React.ReactNode; tight?: boolean }) {
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
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ background: bg, padding: tight ? "clamp(48px, 7vw, 88px) clamp(20px, 4vw, 32px)" : "clamp(72px, 10vw, 140px) clamp(20px, 4vw, 32px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ---------- Section heading ---------- */
function SectionHeader({ kicker, title, sub, center = true }: { kicker?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className="reveal" style={{ textAlign: center ? "center" : "left", marginBottom: 56, maxWidth: center ? 760 : 720, marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }}>
      {kicker && (
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>
          {kicker}
        </span>
      )}
      <h2 className="font-display" style={{ fontSize: "clamp(30px, 4.8vw, 52px)", color: C.ink, lineHeight: 1.04, letterSpacing: "-1.2px", marginTop: kicker ? 14 : 0 }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500,
          fontSize: "clamp(15px, 1.6vw, 18px)", color: C.inkSoft, lineHeight: 1.55, marginTop: 18, maxWidth: 640,
          marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0,
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------- Why It Works ---------- */
function WhyItWorks() {
  const cards = [
    { kicker: "01", title: "Captive Attention", body: "Passengers face your screen during the entire ride." },
    { kicker: "02", title: "Street Visibility", body: "Thousands of pedestrians and drivers see each vehicle daily." },
    { kicker: "03", title: "Hyperlocal Reach", body: "Target by zone, route and time of day — not guesswork." },
    { kicker: "04", title: "Fast Launch", body: "Approved creative goes live across the network in days." },
  ];
  return (
    <Section bg={C.cream}>
      <SectionHeader kicker="Why it works" title="Where digital ends, real attention begins." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        {cards.map((c) => (
          <div key={c.title} className="reveal hover-lift" style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18,
            padding: "28px 26px", display: "flex", flexDirection: "column", gap: 12,
            boxShadow: "0 18px 40px -28px rgba(26,26,24,0.35)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: C.amber }}>{c.kicker}</div>
            <div className="font-display" style={{ fontSize: 21, color: C.ink, lineHeight: 1.2, letterSpacing: "-0.4px" }}>{c.title}</div>
            <div style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55 }}>{c.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Choose Areas", body: "Pick the Colombo zones and routes that match your audience." },
    { n: "02", title: "Upload Creative", body: "Send your video or static. We handle screen formatting end-to-end." },
    { n: "03", title: "Go Live Fast", body: "Most campaigns launch within 72 hours of approval." },
  ];
  return (
    <Section bg={"#FBF6E8"}>
      <SectionHeader kicker="How it works" title="Simple for brands. Valuable for drivers." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
        {steps.map((s) => (
          <div key={s.n} className="reveal" style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 20,
            padding: "32px 28px", boxShadow: "5px 5px 0 rgba(26,26,24,0.92)",
          }}>
            <div className="font-display" style={{ fontSize: 36, color: C.amber, letterSpacing: "-1px" }}>{s.n}</div>
            <div className="font-display" style={{ fontSize: 22, color: C.ink, marginTop: 10, letterSpacing: "-0.4px" }}>{s.title}</div>
            <div style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, marginTop: 10 }}>{s.body}</div>
          </div>
        ))}
      </div>

      <div className="reveal" style={{
        marginTop: 64, borderRadius: 20, overflow: "hidden",
        border: `2.5px solid ${C.ink}`, boxShadow: "8px 8px 0 rgba(26,26,24,0.92)",
        position: "relative",
      }}>
        <img src={TUKTUK_INTERIOR} alt="Passenger view of mydiio screen inside a Colombo tuk-tuk" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
        <div style={{
          position: "absolute", left: 20, bottom: 20, right: 20,
          background: "rgba(26,26,24,0.82)", color: "#fff", backdropFilter: "blur(8px)",
          padding: "14px 18px", borderRadius: 12, maxWidth: 440,
          fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 14,
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amber, textTransform: "uppercase", marginBottom: 6 }}>
            Inside the tuk-tuk
          </div>
          14 minutes of eye-level attention. No skip button.
        </div>
      </div>
    </Section>
  );
}

/* ---------- Two Audiences ---------- */
function TwoAudiences() {
  return (
    <Section bg={C.cream}>
      <div className="paths-grid">
        <div className="reveal path-card" style={{ background: C.amberPale }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>For Advertisers</span>
          <h3 className="font-display" style={{ fontSize: "clamp(26px, 3vw, 32px)", color: C.ink, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.6px" }}>
            Turn Colombo traffic into customers.
          </h3>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 15, color: C.ink, marginTop: 14, lineHeight: 1.55 }}>
            From restaurants to banks to apps — brands use mydiio to stay visible where buying decisions happen.
          </p>
          <Link to="/advertise" className="btn-bold font-display" style={{ display: "inline-block", marginTop: 24, background: C.amber, color: C.ink, padding: "13px 20px", borderRadius: 11, fontSize: 15, textDecoration: "none" }}>
            Get Pricing →
          </Link>
        </div>

        <div className="reveal path-card" style={{ background: C.greenPale, padding: 0, overflow: "hidden" }}>
          <img src={DRIVER_PAYMENT} alt="Colombo tuk-tuk driver receiving monthly payment" style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 25%", display: "block", borderBottom: `2.5px solid ${C.ink}` }} />
          <div style={{ padding: "28px 28px 32px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#2D8A4E", textTransform: "uppercase" }}>For Drivers</span>
            <h3 className="font-display" style={{ fontSize: "clamp(26px, 3vw, 32px)", color: C.ink, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.6px" }}>
              Earn more from every ride.
            </h3>
            <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 15, color: C.ink, marginTop: 14, lineHeight: 1.55 }}>
              Join the network and unlock extra monthly income — without changing your routes.
            </p>
            <Link to="/drive" className="btn-bold font-display" style={{ display: "inline-block", marginTop: 24, background: C.green, color: "#fff", padding: "13px 20px", borderRadius: 11, fontSize: 15, textDecoration: "none" }}>
              Join Driver Network →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Dashboard ---------- */
function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const heights = [40, 60, 50, 75, 55, 85, 65];
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div ref={ref} style={{
      position: "relative", background: "#0D0D08", borderRadius: 16,
      padding: 24, maxWidth: 540, margin: "0 auto",
      boxShadow: "10px 10px 0 rgba(26,26,24,0.92)",
      border: `1px solid ${C.ink}`,
    }}>
      <div style={{ position: "absolute", top: 14, right: 14, background: C.amber, color: C.ink, fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: "4px 10px", borderRadius: 999, fontWeight: 700 }}>LIVE</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.amber, letterSpacing: 2 }}>CAMPAIGN DASHBOARD</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        {[["6,841", "Impressions"], ["10 / 10", "Vehicles active"], ["14.3m", "Avg dwell"], ["7 zones", "Coverage"]].map(([v, l]) => (
          <div key={l} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
            <div className="font-display" style={{ fontSize: 18, color: C.amber }}>{v}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: 1.5, textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 4, marginTop: 18, height: 70 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", height: show ? `${h}%` : "0%", background: i === 5 ? C.amber : "rgba(245,166,35,0.55)", borderRadius: 3, transition: `height 0.7s ease ${i * 0.08}s` }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 7, color: "rgba(255,255,255,0.35)" }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reporting() {
  return (
    <Section bg={"#FBF6E8"}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "center" }} className="report-grid">
        <div className="reveal">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>Reporting</span>
          <h2 className="font-display" style={{ fontSize: "clamp(30px, 4.6vw, 48px)", color: C.ink, lineHeight: 1.05, letterSpacing: "-1px", marginTop: 14 }}>
            Measured, not guessed.
          </h2>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 18, maxWidth: 480 }}>
            Track active vehicles, route coverage, campaign uptime and estimated impressions — verified by GPS and updated in real time.
          </p>
        </div>
        <div className="reveal"><DashboardPreview /></div>
      </div>
      <style>{`
        @media (min-width: 880px) {
          .report-grid { grid-template-columns: 1fr 1fr !important; gap: 80px !important; }
        }
      `}</style>
    </Section>
  );
}

/* ---------- Why Now ---------- */
function WhyNow() {
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>Why now</span>
        <h2 className="font-display" style={{ fontSize: "clamp(30px, 4.8vw, 52px)", color: C.ink, lineHeight: 1.05, letterSpacing: "-1.2px", marginTop: 14 }}>
          A massive channel hiding in plain sight.
        </h2>
        <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: "clamp(16px, 1.7vw, 19px)", color: C.inkSoft, lineHeight: 1.6, marginTop: 22 }}>
          Thousands of tuk-tuks move through Colombo daily. Until now, none were built as media infrastructure.
        </p>
      </div>
    </Section>
  );
}

/* ---------- Scale Story ---------- */
function ScaleStory() {
  const cards = [
    { n: "01", t: "More Vehicles = More Inventory", b: "Each vehicle added expands ad slots and city coverage." },
    { n: "02", t: "More Routes = Better Reach", b: "Density compounds as drivers fill new zones." },
    { n: "03", t: "More Advertisers = Stronger Network", b: "Recurring campaigns build predictable revenue." },
    { n: "04", t: "More Data = Smarter Campaigns", b: "Route + dwell data sharpens every future buy." },
  ];
  return (
    <Section bg={"#FBF6E8"}>
      <SectionHeader kicker="Scale story" title="Colombo first. Every city next." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        {cards.map((c) => (
          <div key={c.n} className="reveal hover-lift" style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18, padding: "28px 26px",
            boxShadow: "0 18px 40px -28px rgba(26,26,24,0.35)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: C.amber }}>{c.n}</div>
            <div className="font-display" style={{ fontSize: 19, color: C.ink, lineHeight: 1.2, marginTop: 10, letterSpacing: "-0.3px" }}>{c.t}</div>
            <div style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, marginTop: 10 }}>{c.b}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Founding Offer ---------- */
function FoundingOffer() {
  const benefits = ["Priority placements", "Launch discounts", "Weekly reporting", "Case study support"];
  return (
    <Section bg={C.cream}>
      <div className="reveal" style={{
        background: "#fff", border: `3px solid ${C.ink}`, borderRadius: 24,
        padding: "clamp(36px, 5vw, 64px)", boxShadow: "8px 8px 0 rgba(26,26,24,0.92)",
        display: "grid", gridTemplateColumns: "1fr", gap: 32, alignItems: "center",
      }}>
        <div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>Founding offer · 10 spots</span>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: C.ink, lineHeight: 1.05, letterSpacing: "-1px", marginTop: 14 }}>
            First 10 brands get founding access.
          </h2>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 16, color: C.inkSoft, lineHeight: 1.6, marginTop: 16, maxWidth: 540 }}>
            We're opening limited pilot campaigns for our first advertisers.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {benefits.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 14.5, color: C.ink }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={C.amberDeep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 12 10 18 20 6" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <Link to="/advertise" className="btn-bold font-display" style={{ display: "inline-block", marginTop: 28, background: C.amber, color: C.ink, padding: "15px 22px", borderRadius: 12, fontSize: 16, textDecoration: "none" }}>
            Claim Pilot Slot →
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "How many tuk-tuks are live?", a: "Launching with 50+ across Colombo. New vehicles added weekly as drivers join." },
    { q: "How do advertisers measure results?", a: "Live dashboard with GPS-verified impressions, active vehicles, zones and uptime." },
    { q: "How quickly can campaigns launch?", a: "Most go live within 72 hours of creative approval. No printing, no install delays." },
    { q: "What cities are next?", a: "Colombo first. Kandy, Galle and Negombo follow once the home network is saturated." },
    { q: "How do drivers get paid?", a: "Monthly via mobile wallet or bank transfer — share of campaign revenue." },
  ];
  return (
    <Section bg={C.cream}>
      <SectionHeader kicker="Questions" title="Frequently asked." />
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it, i) => (
          <details key={i} className="reveal faq-item" style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 16,
            padding: "20px 24px", boxShadow: "0 14px 40px -28px rgba(26,26,24,0.25)",
          }}>
            <summary className="font-display" style={{
              fontSize: "clamp(16px, 1.8vw, 19px)", color: C.ink, cursor: "pointer",
              listStyle: "none", display: "flex", justifyContent: "space-between",
              alignItems: "center", gap: 16, letterSpacing: "-0.2px",
            }}>
              <span>{it.q}</span>
              <span className="faq-plus" style={{ color: C.amber, fontSize: 22, lineHeight: 1, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}>+</span>
            </summary>
            <p style={{
              fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500,
              fontSize: 15, color: C.inkSoft, lineHeight: 1.6, marginTop: 14,
            }}>{it.a}</p>
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

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
      <img src={FLEET_SUNSET} alt="A line of mydiio tuk-tuks parked at sunset in Colombo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.85) 100%)" }} />
      <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase" }}>Get started</span>
        <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 56px)", color: "#fff", lineHeight: 1.04, marginTop: 14, letterSpacing: "-1.2px" }}>
          Ready to own Colombo's streets?
        </h2>
        <div className="hero-cta-row" style={{ marginTop: 32, justifyContent: "center" }}>
          <Link to="/advertise" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 16, textDecoration: "none" }}>
            Launch Campaign →
          </Link>
          <Link to="/contact" className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 16, textDecoration: "none", border: "2.5px solid #fff", boxShadow: "none" }}>
            Talk To Founder
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer style={{ background: C.ink, padding: "64px 24px 36px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="footer-grid">
          <div>
            <div className="font-display" style={{ fontSize: 26 }}>
              <span style={{ color: "#fff" }}>my</span>
              <span style={{ color: C.amber }}>di</span>
              <span style={{ color: "#fff" }}>io</span>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: 2, marginTop: 8, textTransform: "uppercase" }}>
              Sri Lanka's Urban Attention Network
            </div>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8, fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              <span>· Advertiser bookings open</span>
              <span>· Investor conversations welcome</span>
              <span>· Based in Colombo, Sri Lanka</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: 2, textTransform: "uppercase" }}>Explore</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Advertisers", "/advertise"],
                ["Drivers", "/drive"],
                ["Investors", "/investors"],
                ["About", "/about"],
              ].map(([l, h]) => (
                <Link key={l} to={h as string} style={{ color: "#fff", fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: 2, textTransform: "uppercase" }}>Legal</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link to="/contact" style={{ color: "#fff", fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Contact</Link>
              <a href="#" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Terms</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
          <span>© 2026 mydiio · Colombo · Sri Lanka</span>
          <span>Built in Colombo, for Colombo.</span>
        </div>
      </div>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 36px; }
        @media (min-width: 720px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr; gap: 48px; } }
      `}</style>
    </footer>
  );
}

/* ============== MAIN ============== */
export default function MydiioLanding() {
  return (
    <div className="w-full" style={{ background: C.cream }}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .font-display { letter-spacing: -0.5px; }
        h1.font-display, h2.font-display, h3.font-display { text-wrap: balance; }
        p { text-wrap: pretty; }

        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
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

        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 28px 50px -28px rgba(26,26,24,0.4) !important; }

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
      <WhyItWorks />
      <HowItWorks />
      <TwoAudiences />
      <Reporting />
      <WhyNow />
      <ScaleStory />
      <FoundingOffer />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
