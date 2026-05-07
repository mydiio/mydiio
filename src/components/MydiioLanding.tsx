import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

const HERO_PHOTO = "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1400&q=80";
const WA_ADVERTISER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20advertising%20on%20mydiio";
const WA_DRIVER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20becoming%20a%20mydiio%20driver";

const C = {
  amber: "#F5A623",
  amberDeep: "#E8920A",
  yellow: "#F7E14A",
  green: "#4CAF72",
  greenDeep: "#2D8A4E",
  ink: "#1A1A0E",
  cream: "#FFF9ED",
};

/* ---------- Logo with magnetic hover ---------- */
function Logo({ scrolled }: { scrolled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.18;
      const dy = (e.clientY - cy) * 0.18;
      el.style.transition = "transform 0.1s linear";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => {
      el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);
  const textColor = scrolled ? C.ink : "#fff";
  const borderColor = scrolled ? C.ink : "#fff";
  return (
    <Link to="/" className="font-display text-[22px] inline-flex items-center px-4 py-1 rounded-full bg-white" style={{ border: `3px solid ${borderColor}`, color: textColor, willChange: "transform" }}>
      <span ref={ref} style={{ display: "inline-flex" }}>
        <span style={{ color: textColor }}>my</span>
        <span style={{ color: C.amber }}>di</span>
        <span style={{ color: textColor }}>io</span>
      </span>
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
        background: scrolled ? "rgba(26,26,14,0.90)" : "transparent",
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

/* ---------- Hero ---------- */
function Hero() {
  useEffect(() => {
    document.body.style.transition = "background-color 0.7s ease";
    document.body.style.backgroundColor = "#1A1A0E";
  }, []);

  const particles = Array.from({ length: 10 }).map((_, i) => {
    const size = 4 + Math.random() * 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const dur = 4 + Math.random() * 5;
    const delay = Math.random() * 5;
    const opacity = 0.25 + Math.random() * 0.1;
    return { i, size, left, top, dur, delay, opacity };
  });

  const headline = "The screen inside every tuk-tuk in Colombo.";
  const words = headline.split(" ");
  const headlineDoneMs = 300 + (words.length - 1) * 80 + 700;
  const subDelay = headlineDoneMs + 300;
  const cueDelay = subDelay + 500;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
      <img src={HERO_PHOTO} alt="Inside a Colombo tuk-tuk looking out at the city" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay-1" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,14,0) 0%, rgba(26,26,14,0) 30%, rgba(26,26,14,0.65) 70%, rgba(26,26,14,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {particles.map((p) => (
          <span
            key={p.i}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              ["--duration" as any]: `${p.dur}s`,
              ["--delay" as any]: `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="hero-content absolute" style={{ bottom: "12%", left: "6%", maxWidth: 700 }}>
        <div
          className="font-mono inline-block hero-eyebrow"
          style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.amber }}
        >
          Colombo · Sri Lanka · 2026
        </div>
        <h1
          className="font-display text-white"
          style={{
            fontSize: "clamp(52px, 8vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-1.5px",
            marginTop: 14,
          }}
        >
          {words.map((w, i) => (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              <span className="hero-word" style={{ animationDelay: `${300 + i * 80}ms`, display: "inline-block" }}>
                {w}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p
          className="hero-sub hero-fade"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(17px, 2vw, 22px)",
            color: "rgba(255,255,255,0.72)",
            marginTop: 16,
            maxWidth: 520,
            animationDelay: `${subDelay}ms`,
          }}
        >
          We put a screen inside tuk-tuks. Advertisers reach captive passengers for 14 minutes with no skip button. Drivers earn LKR 6,000–8,000 every month doing nothing different.
        </p>
        <div
          className="font-mono scroll-cue hero-fade"
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginTop: 36,
            animationDelay: `${cueDelay}ms`,
          }}
        >
          Choose your path ↓
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 8, background: C.amber }} />
    </section>
  );
}

/* ---------- Section wrapper ---------- */
const sectionColors: Record<string, string> = {
  "section-concept": "#1A1A0E",
  "section-trust": "#1A1A0E",
  "section-cta": "#F5A623",
};

function Section({ id, bg, children }: { id?: string; bg: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const items = el.querySelectorAll<HTMLElement>(".reveal");
            items.forEach((item, i) => setTimeout(() => item.classList.add("in"), i * 100));
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !id) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.3) {
            const color = sectionColors[id];
            if (color) {
              document.body.style.transition = "background-color 0.7s ease";
              document.body.style.backgroundColor = color;
            }
          }
        });
      },
      { threshold: [0.3] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  return (
    <section
      id={id}
      ref={ref}
      className="w-full flex items-center justify-center"
      style={{ minHeight: "100vh", background: bg, padding: "80px 24px" }}
    >
      <div style={{ maxWidth: 980, width: "100%" }}>{children}</div>
    </section>
  );
}

/* ---------- Concept Diagram ---------- */
function ConceptDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const nodes = [
    { emoji: "🏪", label: "Advertiser", sub: "Pays LKR 20k+/mo" },
    { emoji: "🛺", label: "The tuk", sub: "Screen plays their ad" },
    { emoji: "👤", label: "Passenger", sub: "14 mins, no skip button" },
  ];

  return (
    <div ref={ref} className="concept-diagram" style={{ marginTop: 36 }}>
      {nodes.map((n, i) => (
        <div key={i} style={{ display: "contents" }}>
          <div className="concept-node">
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `3px solid ${C.amber}`,
                background: "#0D0D08",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
              }}
            >
              {n.emoji}
            </div>
            <div className="font-display" style={{ fontSize: 16, color: "#fff", marginTop: 12, textAlign: "center" }}>
              {n.label}
            </div>
            <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2, textAlign: "center" }}>
              {n.sub}
            </div>
          </div>
          {i < nodes.length - 1 && (
            <div className="concept-arrow">
              <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                <line
                  x1="0" y1="10" x2="92" y2="10"
                  stroke={C.amber} strokeWidth="3" strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset={show ? 0 : 100}
                  style={{ transition: `stroke-dashoffset 0.8s ease ${0.2 + i * 0.3}s` }}
                />
                <polyline
                  points="84,4 94,10 84,16"
                  fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: show ? 1 : 0, transition: `opacity 0.3s ease ${0.9 + i * 0.3}s` }}
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `3px solid ${C.ink}`,
        boxShadow: `4px 4px 0 ${C.ink}`,
        borderRadius: 11,
        padding: "10px 16px",
        textAlign: "center",
        flex: 1,
        minWidth: 120,
      }}
    >
      <div className="font-display" style={{ fontSize: 18, color: C.ink }}>{value}</div>
      <div className="font-mono" style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(26,26,14,0.55)", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

/* ---------- Portal mock cards (trust section) ---------- */
const innerCardStyle: React.CSSProperties = {
  background: "#0D0D08",
  border: "1px solid rgba(245,166,35,0.2)",
  borderRadius: 10,
  padding: 16,
};

function AdvertiserMock() {
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
    <div ref={ref} style={innerCardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-mono" style={{ fontSize: 8, color: C.amber, letterSpacing: 2 }}>CAMPAIGN DASHBOARD</span>
        <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>Galle Road Pharmacy</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
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
            <div className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 4, marginTop: 14, height: 64 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: "100%",
              height: show ? `${h}%` : "0%",
              background: i === 5 ? C.amber : "rgba(245,166,35,0.6)",
              borderRadius: 2,
              transition: `height 0.6s ease ${i * 0.08}s`,
            }} />
            <span className="font-mono" style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DriverMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={innerCardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-mono" style={{ fontSize: 8, color: C.green, letterSpacing: 2 }}>DRIVER PORTAL</span>
        <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>Kamal · MYD-007</span>
      </div>
      <div className="font-display" style={{ fontSize: 28, color: C.green, textAlign: "center", marginTop: 10 }}>LKR 8,000</div>
      <div className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 2 }}>
        This month · Base + Route Bonus
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>SCREEN UPTIME TODAY</span>
          <span className="font-mono" style={{ fontSize: 10, color: C.green }}>9.2h</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, marginTop: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: show ? "85%" : "0%",
            background: C.green,
            borderRadius: 3,
            transition: "width 1.2s ease 0.5s",
          }} />
        </div>
      </div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>NEXT PAYMENT</span>
        <span className="font-mono" style={{ fontSize: 9, color: "#fff" }}>5 August 2026</span>
      </div>
      <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>ROUTE BONUS</span>
        <span className="font-mono" style={{ fontSize: 9, color: C.green }}>✓ LKR 2,000</span>
      </div>
    </div>
  );
}

function AdminMock() {
  return (
    <div style={innerCardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-mono" style={{ fontSize: 8, color: C.amber, letterSpacing: 2 }}>OPERATIONS CENTRE</span>
        <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>Live · 22:42</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {["TUK-01 ●","TUK-02 ●","TUK-03 ●","TUK-04 ●"].map((t) => (
          <span key={t} className="font-mono" style={{
            background: "rgba(76,175,114,0.15)", border: `1px solid ${C.green}`,
            color: C.green, fontSize: 8, borderRadius: 4, padding: "4px 8px",
          }}>{t}</span>
        ))}
        <span className="font-mono" style={{
          background: "rgba(232,69,69,0.15)", border: "1px solid #E84545",
          color: "#E84545", fontSize: 8, borderRadius: 4, padding: "4px 8px",
        }}>TUK-05 ○</span>
      </div>
      <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 10 }}>9 / 10 fleet online</div>
      <div className="font-mono" style={{
        marginTop: 10, background: "rgba(245,166,35,0.1)",
        border: "1px solid rgba(245,166,35,0.3)", borderRadius: 6,
        padding: "6px 10px", fontSize: 8, color: C.amber,
      }}>⚠ TUK-05 offline 47 min — investigating</div>
      <div className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>CONTENT QUEUE</div>
      {([
        ["pharmacy_promo.mp4", "LIVE", C.green, "#fff"],
        ["bakery_banner.jpg", "PENDING", C.amber, C.ink],
        ["finance_ad.mp4", "FLAGGED", "#E84545", "#fff"],
      ] as const).map(([file, pill, bg, col]) => (
        <div key={file} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.5)" }}>{file}</span>
          <span className="font-mono" style={{
            background: bg, color: col, fontSize: 7,
            padding: "2px 6px", borderRadius: 4, letterSpacing: 1,
          }}>{pill}</span>
        </div>
      ))}
    </div>
  );
}

function PortalCard({ children, badge, badgeBg, badgeColor, title, body }: {
  children: React.ReactNode; badge: string; badgeBg: string; badgeColor: string; title: string; body: string;
}) {
  return (
    <div className="reveal" style={{
      background: "rgba(255,255,255,0.04)",
      border: "2px solid rgba(245,166,35,0.25)",
      borderRadius: 16,
      padding: "24px 20px",
    }}>
      <span className="font-mono" style={{
        display: "inline-block", background: badgeBg, color: badgeColor,
        padding: "3px 10px", borderRadius: 12, fontSize: 9, letterSpacing: "1.5px",
      }}>{badge}</span>
      <div className="font-display" style={{ fontSize: 20, color: "#fff", marginTop: 12 }}>{title}</div>
      <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(255,249,237,0.6)", marginBottom: 16, marginTop: 6 }}>{body}</div>
      {children}
    </div>
  );
}

/* ---------- Scroll progress ---------- */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (ref.current) ref.current.style.width = `${p}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref} className="scroll-progress" />;
}

/* ---------- Custom cursor ---------- */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      dot.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, select, label')) dot.classList.add("big");
      else dot.classList.remove("big");
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={dotRef} className="custom-cursor" />;
}

/* ============== MAIN ============== */
export default function MydiioLanding() {
  return (
    <div className="w-full">
      <style>{`
        .hero-overlay-1 { background: rgba(26,26,14,0.55); }
        @keyframes scrollCue { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(7px); opacity: 0.7; } }
        .scroll-cue { animation: scrollCue 1.9s ease-in-out infinite; }

        .hero-word {
          opacity: 0;
          transform: translateY(40px);
          filter: blur(8px);
          animation: heroWord 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroWord { to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .hero-fade { opacity: 0; animation: heroFade 0.7s ease forwards; }
        @keyframes heroFade { to { opacity: 1; } }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: ${C.amber};
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          pointer-events: none;
          z-index: 1;
        }
        @keyframes float {
          0%,100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-24px) translateX(8px); }
          66% { transform: translateY(-12px) translateX(-6px); }
        }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        @keyframes ctaPulseAmber {
          0%,100% { box-shadow: 5px 5px 0 ${C.ink}; }
          50% { box-shadow: 5px 5px 0 ${C.ink}, 0 0 0 8px rgba(245,166,35,0.18); }
        }
        @keyframes ctaPulseGreen {
          0%,100% { box-shadow: 5px 5px 0 ${C.ink}; }
          50% { box-shadow: 5px 5px 0 ${C.ink}, 0 0 0 8px rgba(76,175,114,0.18); }
        }
        .whatsapp-btn-amber { animation: ctaPulseAmber 3s ease-in-out infinite; }
        .whatsapp-btn-green { animation: ctaPulseGreen 3s ease-in-out infinite; animation-delay: 1.5s; }

        .path-btn { transition: transform 0.12s ease, box-shadow 0.12s ease; }
        .path-btn:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 ${C.ink} !important; }
        .path-btn:active { transform: translate(2px,2px); box-shadow: 3px 3px 0 ${C.ink} !important; }

        .scroll-progress {
          position: fixed; top: 0; left: 0; height: 3px;
          background: ${C.amber}; z-index: 99999; width: 0%;
          transition: width 0.05s linear;
          box-shadow: 0 0 6px rgba(245,166,35,0.4);
        }

        .custom-cursor {
          width: 14px; height: 14px;
          background: ${C.amber};
          border: 2.5px solid ${C.ink};
          border-radius: 50%;
          position: fixed; top: -7px; left: -7px;
          pointer-events: none; z-index: 99999;
          box-shadow: 2px 2px 0 ${C.ink};
          transition: width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease;
          will-change: transform;
        }
        .custom-cursor.big { width: 28px; height: 28px; top: -14px; left: -14px; }
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button, [role="button"], input, textarea, select, label { cursor: none; }
        }
        @media (hover: none) {
          .custom-cursor { display: none; }
          body { cursor: auto; }
        }

        /* Concept diagram */
        .concept-diagram {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr auto;
          align-items: center;
          gap: 8px;
          max-width: 720px;
          margin: 36px auto 0;
        }
        .concept-node { display: flex; flex-direction: column; align-items: center; }
        .concept-arrow { display: flex; align-items: center; min-width: 60px; }
        @media (max-width: 720px) {
          .concept-diagram {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .concept-arrow { transform: rotate(90deg); justify-self: center; min-width: 40px; max-width: 60px; }
        }

        /* Path buttons grid */
        .path-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          max-width: 760px;
          margin: 36px auto 0;
        }
        @media (min-width: 720px) { .path-grid { grid-template-columns: 1fr 1fr; } }

        /* Portals grid */
        .portals-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 900px) { .portals-grid { grid-template-columns: 1fr 1fr 1fr; } }

        /* Stat row */
        .stat-row {
          display: flex; gap: 12px; flex-wrap: wrap;
          max-width: 720px; margin: 36px auto 0;
        }

        @media (max-width: 767px) {
          .hero-overlay-1 { background: rgba(26,26,14,0.65) !important; }
          .hero-content { left: 0 !important; right: 0; bottom: 10% !important; padding: 0 24px; max-width: 100% !important; }
          .hero-content h1 { font-size: clamp(40px, 10vw, 56px) !important; }
        }
        @media (max-width: 374px) {
          .hero-sub { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />

      {/* Section 2 — The Concept */}
      <Section id="section-concept" bg={C.ink}>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.amber, lineHeight: 1.05, textAlign: "center" }}>
          How mydiio works
        </h2>

        <ConceptDiagram />

        <div className="stat-row">
          <StatChip value="14 min" label="Avg ride" />
          <StatChip value="0" label="Skip buttons" />
          <StatChip value="LKR 20k" label="Starting price" />
        </div>

        <div className="path-grid">
          <Link
            to="/advertise"
            className="path-btn font-display"
            style={{
              background: C.amber, color: C.ink,
              border: `3px solid ${C.ink}`,
              boxShadow: `5px 5px 0 ${C.ink}`,
              borderRadius: 14,
              padding: "20px 24px",
              fontSize: 20,
              textAlign: "center",
              display: "block",
              textDecoration: "none",
            }}
          >
            🏪 I want to advertise my business →
            <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(26,26,14,0.65)", marginTop: 8 }}>
              Pharmacies, bakeries, clothing, restaurants and more — see if your category is available.
            </div>
          </Link>

          <Link
            to="/drive"
            className="path-btn font-display"
            style={{
              background: C.green, color: "#fff",
              border: `3px solid ${C.ink}`,
              boxShadow: `5px 5px 0 ${C.ink}`,
              borderRadius: 14,
              padding: "20px 24px",
              fontSize: 20,
              textAlign: "center",
              display: "block",
              textDecoration: "none",
            }}
          >
            🛺 I want to earn as a driver →
            <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 8 }}>
              Free installation. LKR 8,000 per month. Zero changes to how you drive.
            </div>
          </Link>
        </div>
      </Section>

      {/* Section 3 — Trust */}
      <Section id="section-trust" bg={C.ink}>
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: "3px", color: C.amber, textTransform: "uppercase" }}>
            Built in Colombo
          </span>
        </div>
        <h2 className="reveal font-display" style={{ fontSize: 34, color: C.amber, lineHeight: 1.05, marginTop: 14, textAlign: "center" }}>
          Three portals. Full transparency. Nothing hidden.
        </h2>

        <div className="portals-grid" style={{ marginTop: 32 }}>
          <PortalCard badge="FOR ADVERTISERS" badgeBg={C.amber} badgeColor={C.ink} title="Campaign Dashboard" body="Live impression data, GPS-verified, updated every Monday.">
            <AdvertiserMock />
          </PortalCard>
          <PortalCard badge="FOR DRIVERS" badgeBg={C.green} badgeColor="#fff" title="Earnings Portal" body="Screen uptime, monthly earnings, payment history — in real time.">
            <DriverMock />
          </PortalCard>
          <PortalCard badge="OPERATIONS TEAM" badgeBg="rgba(245,166,35,0.15)" badgeColor={C.amber} title="Operations Centre" body="Every vehicle, every screen, every ad — monitored 24 hours a day.">
            <AdminMock />
          </PortalCard>
        </div>

        <p className="reveal" style={{
          fontFamily: "Nunito", fontWeight: 700, fontSize: 15,
          color: "rgba(255,249,237,0.55)", textAlign: "center", marginTop: 28,
        }}>
          Every advertiser and driver receives full portal access from day one.
        </p>
      </Section>

      {/* Section 4 — Final CTA */}
      <Section id="section-cta" bg={C.amber}>
        <h2 className="reveal font-display" style={{
          fontSize: "clamp(36px, 5vw, 56px)", color: C.ink, lineHeight: 1.05, textAlign: "center",
        }}>
          Ready to ride with us?
        </h2>
        <p className="reveal" style={{
          fontFamily: "Nunito", fontWeight: 800, fontSize: 17,
          color: "rgba(26,26,14,0.7)", textAlign: "center",
          maxWidth: 440, margin: "16px auto 0",
        }}>
          Tell us which path is yours. We'll WhatsApp you back within 24 hours.
        </p>

        <div style={{ maxWidth: 400, margin: "32px auto 0", display: "flex", flexDirection: "column", gap: 16 }}>
          <a
            href={WA_ADVERTISER}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn-amber font-display"
            style={{
              background: C.ink, color: C.amber,
              border: `3px solid ${C.amber}`,
              borderRadius: 13,
              padding: "16px 22px",
              fontSize: 19,
              textAlign: "center",
              display: "block",
              textDecoration: "none",
            }}
          >
            I want to advertise on mydiio →
          </a>
          <a
            href={WA_DRIVER}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn-green font-display"
            style={{
              background: C.ink, color: C.green,
              border: `3px solid ${C.green}`,
              borderRadius: 13,
              padding: "16px 22px",
              fontSize: 19,
              textAlign: "center",
              display: "block",
              textDecoration: "none",
            }}
          >
            I want to drive and earn →
          </a>
        </div>

        <div className="font-mono" style={{
          fontSize: 10, color: "rgba(26,26,14,0.45)",
          textAlign: "center", marginTop: 22, letterSpacing: 1.5,
        }}>
          No commitment. No payment at this stage. Just a 24-hour conversation.
        </div>
      </Section>

      {/* Footer */}
      <footer style={{ background: C.ink, padding: "48px 24px", textAlign: "center" }}>
        <div className="font-display" style={{ fontSize: 24 }}>
          <span style={{ color: "#fff" }}>my</span>
          <span style={{ color: C.amber }}>di</span>
          <span style={{ color: "#fff" }}>io</span>
        </div>
        <div className="font-mono" style={{ fontSize: 11, color: C.amber, letterSpacing: "2px", marginTop: 8 }}>ADS ON THE MOVE.</div>
        <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>mydiio · Colombo · Sri Lanka · 2026 · Built in Colombo, for Colombo.</div>
      </footer>
    </div>
  );
}
