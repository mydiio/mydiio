import { useEffect, useRef, useState } from "react";

const C = {
  amber: "#F5A623",
  yellow: "#F7E14A",
  green: "#4CAF72",
  ink: "#1A1A0E",
};

const WA_ADVERTISER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20advertising%20on%20mydiio";
const WA_DRIVER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20becoming%20a%20mydiio%20driver";

/* hook: trigger when element enters viewport once */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ============== RIDE TIMER (Section 1) ============== */
export function RideTimer() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [runId, setRunId] = useState(0);
  const [elapsed, setElapsed] = useState(0); // 0..14 seconds
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setElapsed(0);
    setDone(false);
    const start = performance.now();
    const dur = 14000;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setElapsed(p * 14);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, runId]);

  // countdown display: 14:00 -> 00:00
  const remaining = Math.max(0, 14 - elapsed);
  const mins = Math.floor(remaining);
  const secs = Math.floor((remaining - mins) * 60);
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const labels = [
    { from: 0, to: 5, text: "Ride started. Your ad is playing." },
    { from: 5, to: 10, text: "Still watching. No skip button." },
    { from: 10, to: 14, text: "Still watching. No other ads." },
    { from: 14, to: 99, text: "Ride over. That was your 14 minutes." },
  ];
  const activeLabel = labels.find((l) => elapsed >= l.from && elapsed < l.to) ?? labels[3];

  const pct = (elapsed / 14) * 100;

  return (
    <div ref={ref} className="reveal" style={{ marginTop: 28, minHeight: 280 }}>
      <div
        className="font-display"
        style={{
          fontFamily: "Fredoka One, sans-serif",
          fontSize: "clamp(56px, 12vw, 72px)",
          color: C.amber,
          textAlign: "center",
          lineHeight: 1,
          letterSpacing: "-1px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ display: "inline-block", minWidth: "5ch", textAlign: "center" }}>{display}</span>
      </div>
      <div
        style={{
          marginTop: 18,
          height: 8,
          width: "100%",
          background: "rgba(26,26,14,0.6)",
          border: "1px solid rgba(245,166,35,0.2)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: C.amber,
            borderRadius: 8,
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <div style={{ position: "relative", height: 28, marginTop: 18 }}>
        {labels.map((l) => (
          <div
            key={l.text}
            className="font-mono"
            style={{
              position: "absolute",
              inset: 0,
              textAlign: "center",
              fontSize: 13,
              color: "#fff",
              opacity: l === activeLabel ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {l.text}
          </div>
        ))}
      </div>
      {done && (
        <button
          onClick={() => setRunId((n) => n + 1)}
          className="font-mono"
          style={{
            display: "block",
            margin: "16px auto 0",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: 10,
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ↻ Tap to restart
        </button>
      )}
    </div>
  );
}

/* ============== PLATFORM DIAGRAM (Section 2) ============== */
export function PlatformDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % 3), 3000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="reveal" style={{ marginTop: 24, minHeight: 320 }}>
      <div
        style={{
          background: C.ink,
          border: `2px solid ${C.ink}`,
          borderRadius: 16,
          padding: 20,
          minHeight: 280,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150 }}>
          <TukSVG frame={frame} />
        </div>
        {frame === 2 && (
          <div className="diagram-fade" style={{
            position: "absolute", left: 16, right: 16, bottom: 60,
            background: "rgba(255,255,255,0.06)", border: `1px solid ${C.amber}`,
            borderRadius: 10, padding: 10,
          }}>
            <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: 2 }}>WEEK 12 REPORT</div>
            <div style={{ fontFamily: "Fredoka One", fontSize: 24, color: "#fff", marginTop: 2 }}>847 impressions</div>
            <div className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Fort · Pettah · Nugegoda · Wellawatte</div>
            <div className="font-mono" style={{ fontSize: 9, color: C.green, marginTop: 4 }}>GPS verified ✓</div>
          </div>
        )}
        <div
          key={frame}
          className="diagram-fade"
          style={{
            fontFamily: "Fredoka One, sans-serif",
            fontSize: 16,
            color: "#fff",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          {["We install a screen inside your tuk.",
            "Your ad loads remotely. Live in 48 hours.",
            "You get this every Monday."][frame]}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i === frame ? C.amber : "rgba(26,26,14,0.3)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TukSVG({ frame }: { frame: number }) {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
      {/* wifi/signal pulse on frame 2 */}
      {frame === 1 && (
        <g>
          <circle cx="110" cy="22" r="6" fill={C.green}>
            <animate attributeName="r" values="4;10;4" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
      {/* tuk silhouette */}
      <path d="M30 100 Q30 50 80 50 L150 50 Q175 50 180 80 L195 90 L195 105 L30 105 Z"
        stroke={C.amber} strokeWidth="2.5" fill="none" />
      <circle cx="65" cy="115" r="14" stroke={C.amber} strokeWidth="2.5" fill={C.ink} />
      <circle cx="170" cy="115" r="14" stroke={C.amber} strokeWidth="2.5" fill={C.ink} />
      {/* roof */}
      <line x1="40" y1="50" x2="155" y2="50" stroke={C.amber} strokeWidth="2.5" />
      {/* screen on interior wall */}
      {frame >= 0 && (
        <rect
          x="92" y="68" width="42" height="26" rx="3"
          fill={frame >= 1 ? "#1565C0" : "#2a2a1a"}
          stroke={C.amber}
          strokeWidth="1.5"
          style={{
            transformOrigin: "113px 81px",
            animation: "screenPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        />
      )}
      {frame >= 1 && (
        <text x="113" y="84" textAnchor="middle"
          fill={C.amber} fontFamily="Fredoka One" fontSize="6">GALLE RD</text>
      )}
      {frame >= 1 && (
        <text x="113" y="91" textAnchor="middle"
          fill="#fff" fontFamily="Fredoka One" fontSize="5">PHARMACY</text>
      )}
    </svg>
  );
}

/* ============== WEEKLY REPORT CARD (Section 3) ============== */
export function WeeklyReportCard({ compact = false }: { compact?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * 847));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const zones = ["Fort", "Pettah", "Wellawatte", "Nugegoda", "Maharagama", "Borella"];

  return (
    <div
      ref={ref}
      className={`report-card ${inView ? "in" : ""}`}
      style={{
        background: C.ink,
        border: `3px solid ${C.amber}`,
        borderRadius: 22,
        boxShadow: `8px 8px 0 ${C.amber}`,
        padding: compact ? 16 : 22,
        maxWidth: 420,
        margin: "0 auto",
        minHeight: compact ? undefined : 360,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: 2 }}>YOUR WEEKLY REPORT</div>
        <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Week of 3 May</div>
      </div>
      <div style={{ height: 1, background: "rgba(245,166,35,0.2)", margin: "12px 0" }} />
      <div style={{ fontFamily: "Fredoka One", fontSize: compact ? 44 : 64, color: C.amber, lineHeight: 1, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
        <span style={{ display: "inline-block", minWidth: "3.5ch", textAlign: "right" }}>{count}</span>
      </div>
      <div className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", textAlign: "center", marginTop: 4 }}>
        verified impressions this week
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "Fredoka One", fontSize: 32, color: C.amber }}>12</div>
          <div className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>vehicles</div>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "Fredoka One", fontSize: 32, color: C.amber }}>6</div>
          <div className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>zones covered</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        {zones.map((z, i) => (
          <span
            key={z}
            className={`zone-pill ${inView ? "in" : ""}`}
            style={{
              background: C.ink,
              border: `1px solid ${C.amber}`,
              color: C.amber,
              fontFamily: "DM Mono, monospace",
              fontSize: 9,
              padding: "4px 8px",
              borderRadius: 8,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {z}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
        <span className="pulse-dot-green" />
        <span className="font-mono" style={{ fontSize: 9, color: C.green }}>GPS verified · All impressions confirmed</span>
      </div>
    </div>
  );
}

/* ============== HOW IT WORKS THREE FRAMES (Section 4) ============== */
export function HowItWorksFrames() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [frame, setFrame] = useState(0);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % 3), 3000);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    setShowReply(false);
    if (frame === 0) {
      const t = setTimeout(() => setShowReply(true), 1000);
      return () => clearTimeout(t);
    }
  }, [frame]);

  const advance = () => setFrame((f) => (f + 1) % 3);

  return (
    <div ref={ref} className="reveal" style={{ marginTop: 18 }}>
      <div
        onClick={advance}
        style={{
          background: "rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 16,
          padding: 18,
          minHeight: 280,
          cursor: "pointer",
        }}
      >
        {frame === 0 && <Frame1 showReply={showReply} />}
        {frame === 1 && <Frame2 />}
        {frame === 2 && <Frame3 />}
        <div
          key={frame}
          className="diagram-fade"
          style={{
            fontFamily: "Fredoka One",
            fontSize: 16,
            color: "#fff",
            textAlign: "center",
            marginTop: 14,
          }}
        >
          {["1. You tell us what you want to say.",
            "2. Your ad goes live in 48 hours.",
            "3. You get a verified report every Monday."][frame]}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: i === frame ? C.yellow : "rgba(255,255,255,0.3)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

function Frame1({ showReply }: { showReply: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#25D366" style={{ display: "inline-block" }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.49-8.413z" />
      </svg>
      <div className="diagram-fade" style={{
        marginTop: 14, marginLeft: "auto", marginRight: 0, maxWidth: 260,
        background: "#25D366", color: "#fff", padding: "10px 14px",
        borderRadius: "14px 14px 4px 14px", fontFamily: "Nunito", fontWeight: 700, fontSize: 14,
      }}>
        Hi, I want to advertise my pharmacy on mydiio
      </div>
      {!showReply ? (
        <div style={{
          marginTop: 8, marginRight: "auto", marginLeft: 0, padding: "10px 14px",
          background: "rgba(255,255,255,0.15)", borderRadius: "14px 14px 14px 4px",
          width: 50, color: "#fff",
        }}>
          <span className="typing-dot" />
          <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
          <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
        </div>
      ) : (
        <div className="diagram-fade" style={{
          marginTop: 8, marginRight: "auto", marginLeft: 0, maxWidth: 280,
          background: "rgba(255,255,255,0.15)", color: "#fff", padding: "10px 14px",
          borderRadius: "14px 14px 14px 4px", fontFamily: "Nunito", fontWeight: 700, fontSize: 14,
        }}>
          Perfect! Send us your logo and we'll have your ad ready within 48 hours. 🛺
        </div>
      )}
    </div>
  );
}

function Frame2() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= 8) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, []);
  const dots = [
    [40, 50], [80, 35], [120, 60], [160, 40],
    [180, 90], [60, 100], [110, 110], [150, 130],
  ];
  return (
    <div style={{ position: "relative" }}>
      <div className="font-mono" style={{
        position: "absolute", top: 0, right: 0,
        background: C.ink, color: C.amber, padding: "4px 8px",
        borderRadius: 6, fontSize: 10,
      }}>{count} tuks live</div>
      <svg width="100%" height="180" viewBox="0 0 220 160" style={{ display: "block" }}>
        <rect x="0" y="0" width="220" height="160" fill="rgba(0,0,0,0.2)" rx="8" />
        {/* roads */}
        <path d="M0 60 L220 70" stroke={C.amber} strokeWidth="1.5" opacity="0.4" />
        <path d="M0 100 L220 95" stroke={C.amber} strokeWidth="1.5" opacity="0.4" />
        <path d="M70 0 L80 160" stroke={C.amber} strokeWidth="1.5" opacity="0.4" />
        <path d="M150 0 L145 160" stroke={C.amber} strokeWidth="1.5" opacity="0.4" />
        {dots.slice(0, count).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={C.amber} style={{
            transformOrigin: `${x}px ${y}px`,
            animation: "dotPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
          }}>
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div>
      <div style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
        <WeeklyReportCard compact />
      </div>
      <div className="diagram-fade" style={{
        marginTop: 8, background: "#25D366", color: "#fff", padding: "10px 14px",
        borderRadius: 12, fontFamily: "Nunito", fontWeight: 700, fontSize: 13, maxWidth: 320, margin: "8px auto 0",
      }}>
        📊 Your mydiio week 1 report is ready<br />
        <span style={{ fontSize: 11, opacity: 0.85 }}>847 impressions · 12 vehicles · 6 zones</span>
      </div>
    </div>
  );
}

/* ============== PRICE COMPARISON (Section 5) ============== */
export function PriceComparison() {
  const [pick, setPick] = useState<"fb" | "my">("fb");
  const data = pick === "fb" ? {
    Reach: "~2,400 people (estimated, algorithm-dependent)",
    "Skip rate": "~73% scroll past in under 2 seconds",
    Verification: "Estimated only — no GPS data",
    Mood: "Interrupting their feed",
    Cost: "LKR 20,000 / month",
  } : {
    Reach: "1,680+ GPS-verified impressions",
    "Skip rate": "0% — no skip button exists",
    Verification: "GPS-logged. Every play confirmed.",
    Mood: "Nothing else to look at",
    Cost: "LKR 20,000 / month",
  };
  const myWins = pick === "my";

  return (
    <div className="reveal" style={{ marginTop: 24 }}>
      <div style={{
        display: "flex", gap: 0, padding: 4, background: C.ink,
        borderRadius: 12, border: `2px solid ${C.ink}`, maxWidth: 360, margin: "0 auto",
      }}>
        {[
          { id: "fb" as const, label: "Facebook Boost" },
          { id: "my" as const, label: "mydiio Roamer" },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setPick(opt.id)}
            className="font-display"
            style={{
              flex: 1, padding: "10px 8px", borderRadius: 9, border: "none",
              background: pick === opt.id ? C.amber : "transparent",
              color: pick === opt.id ? C.ink : "rgba(255,255,255,0.7)",
              fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div key={pick} className="diagram-fade" style={{
        marginTop: 18, background: "rgba(26,26,14,0.85)", border: `2px solid ${C.ink}`,
        borderRadius: 13, padding: 16,
      }}>
        {Object.entries(data).map(([k, v]) => (
          <div key={k} style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            <span className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", flexShrink: 0, paddingTop: 2 }}>{k}</span>
            <span style={{
              fontFamily: "Nunito", fontWeight: 700, fontSize: 14,
              color: myWins ? C.amber : (pick === "fb" && (k === "Reach" || k === "Skip rate" || k === "Verification" || k === "Mood")) ? "#fff" : "#fff",
              textAlign: "right",
            }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{
        fontFamily: "Fredoka One", fontSize: 18, color: C.amber,
        textAlign: "center", marginTop: 18,
      }}>
        Same price. Different universe.
      </div>
    </div>
  );
}

/* ============== ENHANCED PIONEER PILLS (Section 6) ============== */
const PIONEER_CATEGORIES = ["Pharmacy", "Food & Beverage", "Fashion", "Automotive", "Finance", "Telecoms", "Hospitality", "Real Estate", "Education", "Beauty & Wellness"];
const TAKEN = ["Pharmacy", "Automotive"];

export function EnhancedPioneerPills() {
  const [banner, setBanner] = useState<string | null>(null);
  useEffect(() => {
    const available = PIONEER_CATEGORIES.filter((c) => !TAKEN.includes(c));
    let i = 0;
    const flash = () => {
      setBanner(`💡 Someone is viewing the ${available[i % available.length]} category`);
      i++;
      setTimeout(() => setBanner(null), 3000);
    };
    const id = setInterval(flash, 8000);
    setTimeout(flash, 1500);
    return () => clearInterval(id);
  }, []);

  const available = PIONEER_CATEGORIES.filter((c) => !TAKEN.includes(c));

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span className="pulse-dot-amber-2" />
        <span className="font-mono" style={{ fontSize: 11, color: C.ink }}>
          8 of 10 spots remaining
        </span>
      </div>
      <div style={{ minHeight: 28, marginBottom: 8 }}>
        {banner && (
          <div className="diagram-fade font-mono" style={{
            display: "inline-block", background: C.amber, color: C.ink,
            padding: "6px 12px", borderRadius: 4, fontSize: 10,
            border: `1px solid ${C.ink}`,
          }}>{banner}</div>
        )}
      </div>
      <div className="reveal flex flex-wrap gap-2 mb-5">
        {PIONEER_CATEGORIES.map((c, i) => {
          const taken = TAKEN.includes(c);
          const availableIdx = available.indexOf(c);
          return (
            <span
              key={c}
              className={`pioneer-pill-v2 ${taken ? "taken" : ""}`}
              style={{
                position: "relative",
                animationDelay: taken ? undefined : `${availableIdx * 0.3}s`,
              }}
            >
              {c}
              {taken && <span className="claimed-badge">CLAIMED</span>}
              {!taken && (
                <span className="pill-tooltip font-mono">
                  1 spot available · LKR 5,000 refundable deposit
                </span>
              )}
            </span>
          );
        })}
      </div>
    </>
  );
}

/* ============== EARNINGS CALCULATOR (Section 7) ============== */
export function EarningsCalculator() {
  const [hours, setHours] = useState(8);
  const monthly = hours >= 8 ? 8000 : 6000;
  const annual = monthly * 12;

  return (
    <div className="reveal" style={{ marginTop: 24 }}>
      <div className="font-mono" style={{ fontSize: 11, color: "rgba(26,26,14,0.6)", marginBottom: 10 }}>
        How many hours do you drive per day?
      </div>
      <input
        type="range" min={4} max={14} step={1}
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        className="earn-slider"
        style={{ width: "100%", ["--p" as any]: `${((hours - 4) / 10) * 100}%` }}
      />
      <div style={{ fontFamily: "Fredoka One", fontSize: 18, color: C.ink, textAlign: "center", marginTop: 10 }}>
        {hours} hrs / day
      </div>
      <div style={{
        fontFamily: "Fredoka One", fontSize: "clamp(48px, 11vw, 64px)",
        color: C.amber, textAlign: "center", lineHeight: 1, marginTop: 10,
        transition: "color 0.3s",
      }}>
        <AnimatedNumber value={monthly} prefix="LKR " />
      </div>
      <div className="font-mono" style={{ fontSize: 11, color: "rgba(26,26,14,0.6)", textAlign: "center", marginTop: 4 }}>
        per month
      </div>
      <div style={{
        fontFamily: "Nunito", fontWeight: 800, fontSize: 18,
        color: "rgba(26,26,14,0.7)", textAlign: "center", marginTop: 10,
      }}>
        = LKR {annual.toLocaleString()} per year
      </div>
      <div className="font-mono" style={{
        fontSize: 11, color: "rgba(26,26,14,0.45)", textAlign: "center", marginTop: 12, lineHeight: 1.5,
      }}>
        Alongside your normal fare income.<br />Nothing changes about how you drive.
      </div>
      <div style={{ height: 1, background: "rgba(26,26,14,0.15)", margin: "20px 0" }} />
      {[
        "✓ Free installation — we come to you",
        "✓ LKR 5,000 bonus at month 3 (Founding Group A)",
        "✓ LKR 1,500 for every driver you refer",
      ].map((t) => (
        <div key={t} className="font-mono" style={{
          borderLeft: `3px solid ${C.green}`,
          background: "rgba(26,26,14,0.06)",
          padding: "8px 12px", borderRadius: 6, fontSize: 11, color: C.ink,
          marginBottom: 6,
        }}>{t}</div>
      ))}
    </div>
  );
}

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const start = prevRef.current;
    const target = value;
    const t0 = performance.now();
    const dur = 300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setDisplay(Math.round(start + (target - start) * p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{prefix}{display.toLocaleString()}</>;
}

/* ============== FLIP CARDS (Section 8) ============== */
export function FlipCards() {
  return (
    <div className="reveal" style={{ marginTop: 24 }}>
      <div className="flip-grid">
        <FlipCard
          bg={C.amber} fg={C.ink} icon="🏪"
          title="I'm a business owner" sub="I want to advertise"
          subColor="rgba(26,26,14,0.65)" hintColor="rgba(26,26,14,0.4)"
          steps={[
            "1. WhatsApp us — we reply in 24 hours",
            "2. We discuss your category and zone",
            "3. Your campaign goes live in 48 hours",
          ]}
          fineprint="Pioneer spots need a LKR 5,000 refundable deposit. Standard campaigns — no deposit."
          ctaBg={C.amber} ctaColor={C.ink}
          href={WA_ADVERTISER}
        />
        <FlipCard
          bg={C.green} fg="#fff" icon="🛺"
          title="I'm a tuk driver" sub="I want to earn more"
          subColor="rgba(255,255,255,0.75)" hintColor="rgba(255,255,255,0.5)"
          steps={[
            "1. WhatsApp us — we reply in 24 hours",
            "2. We arrange your free installation",
            "3. You earn from your very next ride",
          ]}
          fineprint="Founding Group A: LKR 3,500 refundable deposit. LKR 5,000 bonus at month 3. First 10 only."
          ctaBg="#fff" ctaColor={C.ink}
          href={WA_DRIVER}
        />
      </div>
      <div className="font-mono" style={{
        textAlign: "center", marginTop: 20, fontSize: 10,
        color: "rgba(255,255,255,0.35)", lineHeight: 1.6,
      }}>
        We reply to every message within 24 hours.<br />
        No commitment at this stage. Just a conversation.
      </div>
    </div>
  );
}

function FlipCard(props: {
  bg: string; fg: string; icon: string; title: string; sub: string;
  subColor: string; hintColor: string; steps: string[]; fineprint: string;
  ctaBg: string; ctaColor: string; href: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-card" onClick={() => setFlipped((f) => !f)}>
      <div className="flip-inner" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
        <div className="flip-face" style={{
          background: props.bg, color: props.fg, border: `4px solid ${C.ink}`,
          borderRadius: 22, boxShadow: `6px 6px 0 ${C.ink}`,
          padding: "28px 20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 48 }}>{props.icon}</div>
          <div style={{ fontFamily: "Fredoka One", fontSize: 22, marginTop: 10 }}>{props.title}</div>
          <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: props.subColor, marginTop: 4 }}>
            {props.sub}
          </div>
          <div className="font-mono" style={{ fontSize: 9, color: props.hintColor, marginTop: 18 }}>
            Tap to see what happens next
          </div>
        </div>
        <div className="flip-face flip-back" style={{
          background: props.bg, color: props.fg, border: `4px solid ${C.ink}`,
          borderRadius: 22, boxShadow: `6px 6px 0 ${C.ink}`,
          padding: "20px 18px",
        }}>
          {props.steps.map((s) => (
            <div key={s} className="font-mono" style={{ fontSize: 12, color: props.fg, marginBottom: 8 }}>
              {s}
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(0,0,0,0.15)", margin: "10px 0" }} />
          <div className="font-mono" style={{ fontSize: 10, color: props.subColor, lineHeight: 1.5 }}>
            {props.fineprint}
          </div>
          <a
            href={props.href} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-display"
            style={{
              display: "block", marginTop: 12, textAlign: "center",
              background: props.ctaBg, color: props.ctaColor,
              border: `3px solid ${C.ink}`, borderRadius: 12,
              padding: "10px 16px", fontSize: 14, textDecoration: "none",
              boxShadow: `3px 3px 0 ${C.ink}`,
            }}
          >
            WhatsApp us now →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============== Shared CSS for interactive components ============== */
export const InteractiveCSS = `
  @keyframes diagramFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .diagram-fade { animation: diagramFade 0.4s ease both; }
  .ride-label-fade { animation: diagramFade 0.4s ease both; }
  @keyframes screenPop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
  @keyframes dotPop { 0% { transform: scale(0); } 70% { transform: scale(1.4); } 100% { transform: scale(1); } }
  @keyframes typingDot { 0%,60%,100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
  .typing-dot {
    display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #fff; margin: 0 2px;
    animation: typingDot 1s ease-in-out infinite;
  }

  /* Report card */
  .report-card { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  .report-card.in { opacity: 1; transform: translateY(0); }
  .zone-pill { opacity: 0; transform: translateY(8px); transition: opacity 0.3s ease, transform 0.3s ease; }
  .zone-pill.in { opacity: 1; transform: translateY(0); }
  .pulse-dot-green {
    width: 8px; height: 8px; border-radius: 50%; background: #4CAF72; display: inline-block;
    animation: pulseGreen 1.4s ease-in-out infinite;
  }
  @keyframes pulseGreen { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  .pulse-dot-amber-2 {
    width: 8px; height: 8px; border-radius: 50%; background: #1A1A0E; display: inline-block;
    animation: pulseGreen 1.4s ease-in-out infinite;
  }

  /* Enhanced pioneer pills */
  .pioneer-pill-v2 {
    font-family: 'Fredoka One', sans-serif;
    background: #F5A623;
    color: #1A1A0E;
    border: 2px solid #1A1A0E;
    font-size: 12px;
    border-radius: 20px;
    padding: 6px 14px;
    cursor: pointer;
    transition: transform 0.15s ease;
    display: inline-block;
    position: relative;
    animation: pillPulse 2.5s ease-in-out infinite;
  }
  @keyframes pillPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,0); }
    50% { box-shadow: 0 0 0 6px rgba(245,166,35,0.2); }
  }
  .pioneer-pill-v2:hover:not(.taken) { transform: scale(1.05); }
  .pioneer-pill-v2.taken {
    background: rgba(26,26,14,0.4);
    color: rgba(255,255,255,0.3);
    border-color: rgba(26,26,14,0.5);
    text-decoration: line-through;
    cursor: not-allowed;
    animation: none;
  }
  .claimed-badge {
    position: absolute; top: -7px; right: -4px;
    font-family: 'DM Mono', monospace; font-size: 7px;
    color: #fff; background: #E84545;
    padding: 1px 4px; border-radius: 4px; letter-spacing: 1px;
  }
  .pill-tooltip {
    position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
    background: #1A1A0E; color: #F5A623; border: 1px solid #F5A623;
    padding: 6px 10px; border-radius: 6px; font-size: 10px;
    white-space: nowrap; opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 10;
  }
  .pioneer-pill-v2:hover:not(.taken) .pill-tooltip { opacity: 1; }

  /* Earnings slider */
  .earn-slider {
    -webkit-appearance: none; appearance: none;
    height: 6px; border-radius: 3px;
    background: linear-gradient(to right, #F5A623 var(--p, 40%), rgba(26,26,14,0.2) var(--p, 40%));
    outline: none;
  }
  .earn-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 24px; height: 24px; border-radius: 50%;
    background: #F5A623; border: 2px solid #1A1A0E;
    cursor: pointer; box-shadow: 2px 2px 0 #1A1A0E;
  }
  .earn-slider::-moz-range-thumb {
    width: 24px; height: 24px; border-radius: 50%;
    background: #F5A623; border: 2px solid #1A1A0E;
    cursor: pointer;
  }

  /* Flip cards */
  .flip-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }
  @media (max-width: 640px) {
    .flip-grid { grid-template-columns: 1fr; }
  }
  .flip-card { perspective: 1200px; cursor: pointer; min-height: 240px; }
  .flip-inner {
    position: relative; width: 100%; height: 100%; min-height: 240px;
    transition: transform 0.5s cubic-bezier(0.4,0.2,0.2,1);
    transform-style: preserve-3d;
  }
  .flip-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: flex; flex-direction: column; justify-content: center;
  }
  .flip-back { transform: rotateY(180deg); justify-content: flex-start; }
`;
