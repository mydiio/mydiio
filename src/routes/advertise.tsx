import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/advertise")({
  component: AdvertisePage,
  head: () => ({
    meta: [
      { title: "Advertise on mydiio — Reach Colombo's Tuk-Tuk Passengers" },
      { name: "description", content: "14 minutes. No skip button. GPS-verified. Reach captive passengers in Colombo tuk-tuks from LKR 20,000/month with 14 days free." },
      { property: "og:title", content: "Advertise on mydiio — Reach Colombo's Tuk-Tuk Passengers" },
      { property: "og:description", content: "14 minutes. No skip button. GPS-verified. From LKR 20,000/month with 14 days free." },
    ],
  }),
});

const C = {
  amber: "#F5A623",
  amberDeep: "#E8920A",
  yellow: "#F7E14A",
  green: "#4CAF72",
  greenDeep: "#2D8A4E",
  ink: "#1A1A0E",
  cream: "#FFF9ED",
};

const WA_ADVERTISER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20advertising%20on%20mydiio";

/* ---------- Hooks ---------- */
function useInView(threshold = 0.3): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

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
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3"
      style={{
        padding: "14px 28px",
        background: scrolled ? "rgba(26,26,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s ease",
      }}
    >
      <div className="flex items-center gap-3">
        <Link to="/" className="font-mono hidden sm:inline-block" style={{
          fontSize: 11, color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(26,26,14,0.7)",
          letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          ← Back to mydiio
        </Link>
        <Logo scrolled={scrolled} />
      </div>
      <div className="hidden md:flex items-center gap-3">
        <Link to="/advertise" className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: C.amber, color: C.ink }}>
          Advertise →
        </Link>
        <Link to="/drive" className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: "transparent", color: scrolled ? "#fff" : C.ink, border: `3px solid ${scrolled ? "#fff" : C.ink}` }}>
          Drive & earn →
        </Link>
      </div>
      <Link to="/drive" className="md:hidden btn-bold font-display text-[13px] px-3 py-2 rounded-full" style={{ background: C.green, color: "#fff" }}>
        Drive
      </Link>
    </nav>
  );
}

/* ---------- Count up ---------- */
function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [containerRef, inView] = useInView(0.4);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return (
    <span ref={containerRef as any} style={{ display: "inline-block" }}>
      <span ref={ref} style={{ display: "inline-block", minWidth: `${String(target).length}ch`, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
        {val}
      </span>
    </span>
  );
}

/* ---------- Hero ---------- */
function AdvertiserHero() {
  useEffect(() => {
    document.body.style.transition = "background-color 0.7s ease";
    document.body.style.backgroundColor = C.amber;
  }, []);

  const scrollToPricing = () => document.getElementById("section-pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{
      minHeight: "100vh",
      background: C.amber,
      padding: "140px 24px 80px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ maxWidth: 980, width: "100%" }}>
        <div className="font-mono" style={{
          fontSize: 11, color: "rgba(26,26,14,0.55)",
          letterSpacing: 3, textTransform: "uppercase",
        }}>
          For Colombo businesses
        </div>
        <h1 className="font-display" style={{
          fontSize: "clamp(46px, 7vw, 80px)", color: C.ink,
          lineHeight: 1.0, letterSpacing: "-1px", marginTop: 14,
        }}>
          Your customers are already in Colombo's tuks. Now your ad is with them.
        </h1>
        <p style={{
          fontFamily: "Nunito", fontWeight: 800, fontSize: 18,
          color: "rgba(26,26,14,0.7)", marginTop: 18, maxWidth: 520,
        }}>
          14 minutes. No skip button. GPS-verified. First 14 days credited free. From LKR 20,000/month.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 36 }}>
          <div>
            <div className="font-display" style={{ fontSize: "clamp(48px, 9vw, 64px)", color: C.ink, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              <CountUp target={14} />
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: "rgba(26,26,14,0.6)", letterSpacing: 1.5, marginTop: 6, textTransform: "uppercase" }}>
              minutes, undivided attention
            </div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: "clamp(48px, 9vw, 64px)", color: C.ink, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              <CountUp target={0} />
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: "rgba(26,26,14,0.6)", letterSpacing: 1.5, marginTop: 6, textTransform: "uppercase" }}>
              skip buttons. Ever.
            </div>
          </div>
        </div>

        <button
          onClick={scrollToPricing}
          className="path-btn font-display"
          style={{
            marginTop: 36,
            background: C.ink, color: C.amber,
            border: `3px solid ${C.amber}`,
            boxShadow: `5px 5px 0 ${C.amber}`,
            borderRadius: 13, padding: "14px 32px", fontSize: 19,
            cursor: "pointer",
          }}
        >
          See pricing →
        </button>
      </div>
    </section>
  );
}

/* ---------- Section wrapper ---------- */
function Section({ id, bg, children }: { id?: string; bg: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>(".reveal");
          items.forEach((item, i) => setTimeout(() => item.classList.add("in"), i * 100));
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) {
          document.body.style.transition = "background-color 0.7s ease";
          document.body.style.backgroundColor = bg;
        }
      });
    }, { threshold: [0.3] });
    io.observe(el);
    return () => io.disconnect();
  }, [bg]);

  return (
    <section
      id={id} ref={ref}
      className="w-full flex items-center justify-center"
      style={{ minHeight: "100vh", background: bg, padding: "80px 24px" }}
    >
      <div style={{ maxWidth: 720, width: "100%" }}>{children}</div>
    </section>
  );
}

/* ---------- Ride Timer ---------- */
function RideTimer() {
  const [ref, inView] = useInView(0.4);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setRunning(true);
  }, [inView]);

  useEffect(() => {
    if (!running) return;
    setTick(0); setDone(false);
    const start = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const elapsed = (t - start) / 1000;
      if (elapsed >= 14) { setTick(14); setDone(true); setRunning(false); return; }
      setTick(elapsed);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const remaining = Math.max(0, 14 - tick);
  const mm = Math.floor(remaining).toString().padStart(2, "0");
  const ss = Math.floor((remaining - Math.floor(remaining)) * 60).toString().padStart(2, "0");
  const progress = (tick / 14) * 100;

  const labels = [
    { from: 0, to: 4, text: "Ride started. Your ad is on screen." },
    { from: 4, to: 9, text: "Passenger still watching. No skip button." },
    { from: 9, to: 14, text: "Still watching. Your brand. Their attention." },
    { from: 14, to: 999, text: "Ride complete. That was your 14 minutes." },
  ];

  return (
    <div ref={ref as any} style={{ marginTop: 32, textAlign: "center", minHeight: 280 }}>
      <div className="font-display" style={{
        fontSize: "clamp(64px, 14vw, 96px)", color: C.amber,
        lineHeight: 1, fontVariantNumeric: "tabular-nums",
        minHeight: 96,
      }}>
        {mm}:{ss}
      </div>
      <div style={{
        marginTop: 22,
        height: 8, borderRadius: 4,
        background: "rgba(245,166,35,0.15)",
        overflow: "hidden",
        maxWidth: 480, marginLeft: "auto", marginRight: "auto",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: C.amber, borderRadius: 4,
          transition: "width 0.1s linear",
        }} />
      </div>
      <div style={{ position: "relative", marginTop: 28, height: 32 }}>
        {labels.map((l, i) => {
          const active = tick >= l.from && tick < l.to;
          const past = tick >= l.to;
          return (
            <div
              key={i}
              className="font-mono"
              style={{
                position: "absolute", inset: 0,
                fontSize: 13, color: "#fff",
                opacity: active ? 1 : (past && i === labels.length - 1 ? 1 : 0),
                transition: "opacity 0.4s ease",
              }}
            >
              {l.text}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setRunning(true)}
        className="font-mono"
        style={{
          marginTop: 24,
          background: "transparent", border: "none",
          color: C.amber, opacity: done ? 0.5 : 0,
          fontSize: 10, letterSpacing: 1.5,
          cursor: done ? "pointer" : "default",
          pointerEvents: done ? "auto" : "none",
          transition: "opacity 0.4s ease",
          textTransform: "uppercase",
        }}
      >
        ↺ Restart
      </button>
    </div>
  );
}

/* ---------- Weekly Report Card ---------- */
function WeeklyReportCard() {
  const [ref, inView] = useInView(0.3);
  const heights = [40, 65, 50, 80, 60, 90, 70];
  const days = ["M","T","W","T","F","S","S"];
  return (
    <div ref={ref as any} style={{
      maxWidth: 440, margin: "32px auto 0",
      background: "#fff",
      border: `4px solid ${C.ink}`,
      borderRadius: 18,
      boxShadow: `8px 8px 0 ${C.ink}`,
      padding: 24,
      minHeight: 360,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: 2 }}>WEEKLY REPORT</span>
        <span className="font-mono" style={{ fontSize: 9, color: "rgba(26,26,14,0.5)" }}>Mon · 06 May</span>
      </div>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <div className="font-display" style={{ fontSize: 42, color: C.ink, fontVariantNumeric: "tabular-nums" }}>
          <CountUp target={6841} />
        </div>
        <div className="font-mono" style={{ fontSize: 10, color: "rgba(26,26,14,0.5)", letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>
          Verified impressions this week
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6, marginTop: 22, height: 90 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: "100%", height: inView ? `${h}%` : "0%",
              background: i === 5 ? C.amber : "rgba(245,166,35,0.5)",
              borderRadius: 3,
              transition: `height 0.6s ease ${i * 0.08}s`,
            }} />
            <span className="font-mono" style={{ fontSize: 8, color: "rgba(26,26,14,0.4)" }}>{days[i]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 18 }}>
        {["Galle Rd","Bambalapitiya","Wellawatte","Colombo 7","Town Hall","Kotte","Pettah"].map((z) => (
          <span key={z} className="font-mono" style={{
            fontSize: 9, color: C.ink,
            background: "rgba(245,166,35,0.18)",
            border: "1px solid rgba(245,166,35,0.4)",
            padding: "3px 8px", borderRadius: 10,
          }}>{z}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 14, borderTop: "1px dashed rgba(26,26,14,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "inline-block", animation: "pulseDot 1.4s ease-in-out infinite" }} />
          <span className="font-mono" style={{ fontSize: 9, color: C.green, letterSpacing: 1 }}>GPS-VERIFIED</span>
        </div>
        <span className="font-mono" style={{ fontSize: 9, color: "rgba(26,26,14,0.5)" }}>↑ 18% vs last week</span>
      </div>
    </div>
  );
}

/* ---------- How It Works Frames ---------- */
function HowItWorksFrames() {
  const [frame, setFrame] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setFrame((f) => (f + 1) % 3), 3000);
    return () => clearInterval(t);
  }, [inView]);

  const frames = [
    { title: "1. Send us your ad on WhatsApp", body: "Or share your idea — we'll create the creative free." },
    { title: "2. Live on the Colombo fleet", body: "Your campaign loads to every active screen overnight." },
    { title: "3. Weekly GPS-verified report", body: "Delivered to your WhatsApp every Monday morning." },
  ];

  return (
    <div ref={ref as any} style={{ marginTop: 32 }} onClick={() => setFrame((f) => (f + 1) % 3)}>
      <div style={{
        background: "rgba(255,255,255,0.12)",
        border: "2px solid rgba(255,255,255,0.3)",
        borderRadius: 16,
        padding: "32px 24px",
        minHeight: 200,
        textAlign: "center",
        cursor: "pointer",
      }}>
        <div className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>
          STEP {frame + 1} OF 3
        </div>
        <div style={{ position: "relative", minHeight: 120, marginTop: 14 }}>
          {frames.map((f, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              opacity: i === frame ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}>
              <div className="font-display" style={{ fontSize: 24, color: "#fff" }}>{f.title}</div>
              <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>
                {f.body}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
          {[0,1,2].map((i) => (
            <span key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i === frame ? "#fff" : "rgba(255,255,255,0.3)",
              transition: "background 0.3s",
            }} />
          ))}
        </div>
      </div>
      <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: 10, letterSpacing: 1.5 }}>
        TAP TO ADVANCE · AUTO-CYCLES EVERY 3S
      </div>
    </div>
  );
}

/* ---------- Pricing ---------- */
function PriceCard({ tier, price, sub, pioneer }: { tier: string; price: string; sub: string; pioneer?: boolean }) {
  return (
    <div style={{
      position: "relative",
      background: pioneer ? C.ink : "#fff",
      border: `3px solid ${pioneer ? C.amber : C.ink}`,
      borderRadius: 13, boxShadow: `4px 4px 0 ${C.ink}`,
      padding: "18px 14px", textAlign: "center",
    }}>
      {pioneer && (
        <div style={{
          position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
          background: C.amber, color: C.ink, fontFamily: "Fredoka One", fontSize: 10,
          padding: "3px 10px", borderRadius: 20, border: `2px solid ${C.ink}`, whiteSpace: "nowrap",
        }}>
          ⭐ ONLY 10 SPOTS
        </div>
      )}
      <div className="font-display" style={{ fontSize: 12, textTransform: "uppercase", color: pioneer ? C.amber : C.ink }}>
        {tier}
      </div>
      <div className="font-display" style={{ fontSize: 20, marginTop: 8, color: pioneer ? C.yellow : C.ink }}>{price}</div>
      <div className="font-mono" style={{ fontSize: 9, marginTop: 8, color: pioneer ? "rgba(255,255,255,0.5)" : "rgba(26,26,14,0.5)" }}>
        {sub}
      </div>
    </div>
  );
}

function PriceComparison() {
  const [tab, setTab] = useState<"fb" | "my">("my");
  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 0, background: "rgba(26,26,14,0.08)", borderRadius: 12, padding: 4, maxWidth: 360, margin: "0 auto" }}>
        <button onClick={() => setTab("fb")} className="font-display" style={{
          flex: 1, padding: "10px 14px", borderRadius: 9,
          background: tab === "fb" ? C.ink : "transparent",
          color: tab === "fb" ? "#fff" : C.ink,
          fontSize: 13, border: "none", cursor: "pointer",
          transition: "all 0.2s",
        }}>Facebook Boost</button>
        <button onClick={() => setTab("my")} className="font-display" style={{
          flex: 1, padding: "10px 14px", borderRadius: 9,
          background: tab === "my" ? C.amber : "transparent",
          color: C.ink, fontSize: 13, border: "none", cursor: "pointer",
          transition: "all 0.2s",
        }}>mydiio</button>
      </div>
      <div style={{
        marginTop: 16, padding: 20,
        background: "rgba(26,26,14,0.06)",
        border: "2px solid rgba(26,26,14,0.15)", borderRadius: 12,
      }}>
        {tab === "fb" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Stat val="3 sec" lbl="Avg view time" />
            <Stat val="✕" lbl="Skip button always present" />
            <Stat val="?" lbl="No GPS verification" />
            <Stat val="LKR 25k" lbl="Per boost (one week)" />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Stat val="14 min" lbl="Captive viewing" highlight />
            <Stat val="0" lbl="Skip buttons" highlight />
            <Stat val="✓" lbl="GPS-verified weekly" highlight />
            <Stat val="LKR 20k" lbl="Per month — full fleet" highlight />
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ val, lbl, highlight }: { val: string; lbl: string; highlight?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="font-display" style={{ fontSize: 22, color: highlight ? C.amberDeep : C.ink }}>{val}</div>
      <div className="font-mono" style={{ fontSize: 9, color: "rgba(26,26,14,0.55)", marginTop: 4, letterSpacing: 1, textTransform: "uppercase" }}>{lbl}</div>
    </div>
  );
}

/* ---------- Pioneer ---------- */
const PIONEER_CATEGORIES = ["Pharmacy","Food & Beverage","Fashion","Automotive","Finance","Telecoms","Hospitality","Real Estate","Education","Beauty & Wellness"];
const TAKEN = ["Pharmacy", "Automotive"];

function PioneerSection() {
  const [notify, setNotify] = useState(0);
  const notifications = [
    "Someone in Colombo 5 is viewing the Pharmacy spot",
    "Pioneer spot reserved 3 days ago: Automotive",
    "8 spots remaining · 2 viewers right now",
  ];
  useEffect(() => {
    const t = setInterval(() => setNotify((n) => (n + 1) % notifications.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="reveal" style={{
        marginTop: 22, padding: "10px 14px",
        background: "rgba(26,26,14,0.85)", border: `2px solid ${C.ink}`,
        borderRadius: 10, color: C.amber,
        position: "relative", minHeight: 38, overflow: "hidden",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.amber, display: "inline-block", marginRight: 8, animation: "pulseDot 1.4s ease-in-out infinite" }} />
        {notifications.map((n, i) => (
          <span key={i} className="font-mono" style={{
            position: "absolute", left: 30, right: 14, top: 12,
            fontSize: 11, opacity: i === notify ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}>
            {n}
          </span>
        ))}
      </div>

      <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.ink, display: "inline-block", animation: "pulseDot 1.4s ease-in-out infinite" }} />
        <span className="font-mono" style={{ fontSize: 11, color: C.ink, letterSpacing: 1.5 }}>
          {PIONEER_CATEGORIES.length - TAKEN.length} of {PIONEER_CATEGORIES.length} spots remaining
        </span>
      </div>

      <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        {PIONEER_CATEGORIES.map((c) => {
          const taken = TAKEN.includes(c);
          return (
            <span key={c} className="font-display" style={{
              position: "relative",
              background: taken ? "rgba(26,26,14,0.15)" : C.ink,
              color: taken ? "rgba(26,26,14,0.45)" : C.amber,
              border: `2px solid ${taken ? "rgba(26,26,14,0.25)" : C.ink}`,
              fontSize: 12, borderRadius: 20, padding: "6px 14px",
              textDecoration: taken ? "line-through" : "none",
            }}>
              {c}
              {taken && <span className="font-mono" style={{
                position: "absolute", top: -7, right: -4, fontSize: 7, color: C.amber,
                background: C.ink, padding: "1px 4px", borderRadius: 4, letterSpacing: 1,
              }}>TAKEN</span>}
            </span>
          );
        })}
      </div>
    </>
  );
}

/* ---------- Advertiser Portal Detail ---------- */
function AdvertiserPortalDetail() {
  const [ref, inView] = useInView(0.25);
  const heights = [40, 65, 50, 80, 60, 90, 70];
  const days = ["M","T","W","T","F","S","S"];
  const zones = [
    { x: 22, y: 30 }, { x: 38, y: 45 }, { x: 55, y: 28 },
    { x: 68, y: 55 }, { x: 30, y: 65 }, { x: 75, y: 38 }, { x: 50, y: 70 },
  ];
  return (
    <div ref={ref as any} style={{
      maxWidth: 520, margin: "32px auto 0",
      background: "#0D0D08",
      border: "2px solid rgba(245,166,35,0.3)",
      borderRadius: 14, padding: 22,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: 2 }}>CAMPAIGN DASHBOARD</span>
        <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Galle Road Pharmacy</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
        {[
          ["6,841", "Total impressions"],
          ["10 / 10", "Vehicles active"],
          ["14.3m", "Avg. dwell time"],
          ["7 zones", "Colombo coverage"],
        ].map(([v, l]) => (
          <div key={l} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "12px 8px", textAlign: "center",
          }}>
            <div className="font-display" style={{ fontSize: 22, color: C.amber }}>{v}</div>
            <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 18, letterSpacing: 1.5 }}>
        IMPRESSIONS BY DAY
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6, marginTop: 8, height: 80 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: "100%", height: inView ? `${h}%` : "0%",
              background: i === 5 ? C.amber : "rgba(245,166,35,0.55)",
              borderRadius: 2,
              transition: `height 0.6s ease ${i * 0.08}s`,
            }} />
            <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>{days[i]}</span>
          </div>
        ))}
      </div>
      <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 18, letterSpacing: 1.5 }}>
        ZONE COVERAGE — COLOMBO
      </div>
      <div style={{
        position: "relative", marginTop: 8,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8, height: 140, overflow: "hidden",
      }}>
        {zones.map((z, i) => (
          <span key={i} style={{
            position: "absolute", left: `${z.x}%`, top: `${z.y}%`,
            width: 10, height: 10, borderRadius: "50%",
            background: C.amber, transform: "translate(-50%,-50%)",
            opacity: inView ? 1 : 0,
            transition: `opacity 0.4s ease ${0.5 + i * 0.12}s`,
            boxShadow: `0 0 0 4px rgba(245,166,35,0.2)`,
            animation: inView ? `pulseDot 1.6s ease-in-out infinite ${i * 0.2}s` : "none",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "inline-block", animation: "pulseDot 1.4s ease-in-out infinite" }} />
          <span className="font-mono" style={{ fontSize: 9, color: C.green, letterSpacing: 1 }}>CAMPAIGN ACTIVE</span>
        </div>
        <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>↑ 18% vs last week</span>
      </div>
    </div>
  );
}

/* ============== MAIN ============== */
function AdvertisePage() {
  return (
    <div className="w-full">
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1) translate(-50%,-50%); }
          50% { opacity: 0.5; transform: scale(0.85) translate(-50%,-50%); }
        }
        @keyframes pulseDotInline {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        @keyframes ctaPulseAmber {
          0%,100% { box-shadow: 5px 5px 0 ${C.ink}; }
          50% { box-shadow: 5px 5px 0 ${C.ink}, 0 0 0 10px rgba(245,166,35,0.2); }
        }
        .whatsapp-pulse { animation: ctaPulseAmber 3s ease-in-out infinite; transition: transform 0.12s ease; }
        .whatsapp-pulse:hover { transform: translate(-2px,-2px); }
        .whatsapp-pulse:active { transform: translate(2px,2px); }

        .path-btn { transition: transform 0.12s ease, box-shadow 0.12s ease; }
        .path-btn:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 ${C.amber} !important; }
        .path-btn:active { transform: translate(2px,2px); }

        .pricing-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        @media (min-width: 720px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Nav />
      <AdvertiserHero />

      {/* Section 2 — Ride Timer */}
      <Section bg={C.ink}>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.amber, lineHeight: 1.05, textAlign: "center" }}>
          This is what your 14 minutes looks like.
        </h2>
        <RideTimer />
      </Section>

      {/* Section 3 — Weekly Report */}
      <Section bg="#FFFFFF">
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.ink, lineHeight: 1.05, textAlign: "center" }}>
          This arrives in your WhatsApp every Monday.
        </h2>
        <WeeklyReportCard />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 440, margin: "28px auto 0" }}>
          {[
            "✓ GPS-verified — every play logged",
            "✓ First 14 days credited free",
            "✓ Ad creative produced at no charge",
          ].map((t) => (
            <div key={t} className="reveal font-mono" style={{
              borderLeft: `3px solid ${C.amber}`,
              background: "rgba(245,166,35,0.08)",
              padding: "10px 14px", borderRadius: 6,
              fontSize: 12, color: C.ink,
            }}>{t}</div>
          ))}
        </div>
      </Section>

      {/* Section 4 — How it works */}
      <Section bg={C.green}>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: "#fff", lineHeight: 1.05, textAlign: "center" }}>
          Three steps. You send an ad. Colombo sees it.
        </h2>
        <HowItWorksFrames />
      </Section>

      {/* Section 5 — Pricing */}
      <Section id="section-pricing" bg={C.yellow}>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.ink, lineHeight: 1.05, textAlign: "center" }}>
          Less than one Facebook boost. Your customers cannot skip this one.
        </h2>
        <div className="pricing-grid" style={{ marginTop: 32, paddingTop: 12 }}>
          <PriceCard pioneer tier="Pioneer" price="LKR 25–35k/mo" sub="6-month min · Category exclusive" />
          <PriceCard tier="Roamer" price="LKR 20,000/mo" sub="3-month min · Standard rotation" />
          <PriceCard tier="Voyager" price="LKR 32,000/mo" sub="6-month min · Priority rotation" />
          <PriceCard tier="Horizon" price="LKR 65,000+/mo" sub="Enterprise · Custom zones" />
        </div>
        <PriceComparison />
      </Section>

      {/* Section 6 — Pioneer */}
      <Section bg={C.amber}>
        <div className="reveal font-mono" style={{ fontSize: 11, letterSpacing: 3, color: "rgba(26,26,14,0.55)", textTransform: "uppercase", textAlign: "center" }}>
          The Pioneer Programme
        </div>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.ink, lineHeight: 1.05, textAlign: "center", marginTop: 12 }}>
          Your category. Exclusively yours. Before your competitor gets there first.
        </h2>
        <PioneerSection />
      </Section>

      {/* Section 7 — Portal preview */}
      <Section bg={C.ink}>
        <h2 className="reveal font-display" style={{ fontSize: 34, color: C.amber, lineHeight: 1.05, textAlign: "center" }}>
          Your campaign dashboard. Live from day one.
        </h2>
        <AdvertiserPortalDetail />
        <p className="reveal" style={{
          fontFamily: "Nunito", fontWeight: 700, fontSize: 15,
          color: "rgba(255,249,237,0.65)", textAlign: "center",
          maxWidth: 520, margin: "24px auto 0",
        }}>
          Every advertiser receives login credentials when their campaign goes live. Full data access, GPS-verified reports, loyalty points tracking — all in one place.
        </p>
      </Section>

      {/* Section 8 — CTA */}
      <Section bg={C.ink}>
        <div className="reveal font-mono" style={{ fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase", textAlign: "center" }}>
          Ready to start?
        </div>
        <h2 className="reveal font-display" style={{ fontSize: 44, color: C.amber, lineHeight: 1.05, textAlign: "center", marginTop: 12 }}>
          Let's get your ad in front of Colombo.
        </h2>
        <p className="reveal" style={{
          fontFamily: "Nunito", fontWeight: 700, fontSize: 16,
          color: "rgba(255,249,237,0.65)", textAlign: "center",
          maxWidth: 480, margin: "16px auto 0",
        }}>
          Tell us your business and your category. We'll confirm availability and get your first 14 days live within 48 hours.
        </p>

        <a
          href={WA_ADVERTISER}
          target="_blank" rel="noopener noreferrer"
          className="whatsapp-pulse font-display"
          style={{
            display: "block",
            maxWidth: 400, margin: "32px auto 0",
            background: C.amber, color: C.ink,
            border: `3px solid ${C.ink}`,
            borderRadius: 13, padding: "16px 22px",
            fontSize: 20, textAlign: "center",
            textDecoration: "none",
          }}
        >
          I want to advertise on mydiio →
        </a>

        <div className="font-mono" style={{
          fontSize: 10, color: "rgba(255,249,237,0.4)",
          textAlign: "center", marginTop: 18, letterSpacing: 1, maxWidth: 420, margin: "18px auto 0",
        }}>
          Pioneer spots require a LKR 5,000 fully-refundable deposit. Standard campaigns — no deposit required.
        </div>
        <div className="font-mono" style={{
          fontSize: 10, color: "rgba(255,249,237,0.3)",
          textAlign: "center", marginTop: 8, letterSpacing: 1,
        }}>
          We reply within 24 hours. No commitment at this stage.
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
        <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>mydiio · Colombo · Sri Lanka · 2026</div>
      </footer>
    </div>
  );
}
