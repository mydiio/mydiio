import { useEffect, useRef, useState } from "react";

const WEBHOOK_URL = "https://example.com/webhook"; // TODO: replace

type SectionState = {
  id: number;
  panelBg: string;
  screenBg: string;
  line1: string;
  line2: string;
};

const SECTIONS: SectionState[] = [
  { id: 1, panelBg: "#F5A623", screenBg: "#2196F3", line1: "Galle Road Pharmacy", line2: "Your health, on every corner. 💊" },
  { id: 2, panelBg: "#1A1A0E", screenBg: "#F5A623", line1: "mydiio", line2: "Ads on the Move." },
  { id: 3, panelBg: "#FFFFFF", screenBg: "#FF8F00", line1: "Nugegoda Bakery", line2: "Fresh bread every morning. 🥖" },
  { id: 4, panelBg: "#4CAF72", screenBg: "#4CAF72", line1: "How it works", line2: "3 steps. 48 hours." },
  { id: 5, panelBg: "#F7E14A", screenBg: "#F7E14A", line1: "Pricing", line2: "From LKR 20k/mo" },
  { id: 6, panelBg: "#F5A623", screenBg: "#F5A623", line1: "Pioneer", line2: "10 spots only." },
  { id: 7, panelBg: "#FFFFFF", screenBg: "#4CAF72", line1: "Drivers", line2: "LKR 6–8k/month" },
  { id: 8, panelBg: "#1A1A0E", screenBg: "#1A1A0E", line1: "Join us", line2: "Be first in Colombo." },
];

function useActiveSection() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            setActive(i);
          }
        });
      },
      { threshold: 0.5 },
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  return { active, refs };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Logo({ size = 22, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span className="font-display" style={{ fontSize: size, lineHeight: 1 }}>
      <span style={{ color: dark ? "#fff" : "#1A1A0E" }}>my</span>
      <span style={{ color: "#F5A623" }}>di</span>
      <span style={{ color: dark ? "#fff" : "#1A1A0E" }}>io</span>
    </span>
  );
}

function Nav({ onJump }: { onJump: (mode: "advertiser" | "driver") => void }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "3px solid #1A1A0E",
          boxShadow: "3px 3px 0 #1A1A0E",
          borderRadius: 999,
          padding: "8px 18px",
          pointerEvents: "auto",
        }}
      >
        <Logo size={22} />
      </div>
      <div style={{ display: "flex", gap: 10, pointerEvents: "auto" }}>
        <button
          onClick={() => onJump("advertiser")}
          className="btn-bold font-display"
          style={{
            background: "#F5A623",
            color: "#1A1A0E",
            borderRadius: 999,
            padding: "8px 16px",
            fontSize: 14,
            border: "3px solid #1A1A0E",
            boxShadow: "3px 3px 0 #1A1A0E",
          }}
        >
          Advertise with us →
        </button>
        <button
          onClick={() => onJump("driver")}
          className="btn-bold font-display"
          style={{
            background: "#4CAF72",
            color: "#fff",
            borderRadius: 999,
            padding: "8px 16px",
            fontSize: 14,
            border: "3px solid #1A1A0E",
            boxShadow: "3px 3px 0 #1A1A0E",
          }}
        >
          Drive & earn →
        </button>
      </div>
    </nav>
  );
}

function ColomboScene({ section }: { section: SectionState }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#5BB8F5",
      }}
    >
      {/* Sky clouds */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: 0,
            width: "200%",
            height: "20%",
            animation: "cloud-drift 28s linear infinite",
          }}
        >
          <svg viewBox="0 0 1000 120" width="100%" height="100%" preserveAspectRatio="none">
            {[100, 380, 620, 880, 1100, 1380].map((cx, i) => (
              <g key={i} fill="#fff" opacity="0.95">
                <ellipse cx={cx} cy="60" rx="50" ry="22" />
                <ellipse cx={cx + 30} cy="50" rx="38" ry="20" />
                <ellipse cx={cx - 30} cy="55" rx="34" ry="18" />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Mountains/buildings far */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <div
          style={{
            position: "absolute",
            bottom: "32%",
            left: 0,
            width: "200%",
            height: "35%",
            animation: "scene-loop 25s linear infinite",
          }}
        >
          <svg viewBox="0 0 2000 300" width="100%" height="100%" preserveAspectRatio="none">
            {[0, 1000].map((off) => (
              <g key={off} transform={`translate(${off},0)`}>
                <path d="M0,300 L0,180 Q120,90 240,150 Q380,40 520,140 Q660,80 820,160 Q960,100 1000,170 L1000,300 Z" fill="#8BAAB8" />
                {/* buildings */}
                {[80, 200, 340, 470, 620, 770, 900].map((bx, i) => (
                  <g key={i}>
                    <rect x={bx} y={200 - (i % 3) * 20} width="60" height={120 + (i % 3) * 20} fill="#6B8A9A" />
                    {[0, 1, 2].map((r) =>
                      [0, 1].map((c) => (
                        <rect key={`${r}-${c}`} x={bx + 10 + c * 25} y={210 - (i % 3) * 20 + r * 22} width="12" height="14" fill="#F7E14A" opacity="0.85" />
                      )),
                    )}
                  </g>
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Midground scene */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: 0,
            width: "300%",
            height: "55%",
            animation: "scene-loop 18s linear infinite",
          }}
        >
          <MidgroundStrip />
        </div>
      </div>

      {/* Road */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "28%",
          background: "#3A3A3A",
          zIndex: 6,
        }}
      >
        {/* kerb */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, display: "flex", overflow: "hidden" }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 14,
                background: i % 2 === 0 ? "#E53935" : "#fff",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        {/* dashed center */}
        <div style={{ position: "absolute", top: "55%", left: 0, right: 0, height: 6, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 30,
              width: "200%",
              animation: "dash-loop 1.2s linear infinite",
            }}
          >
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} style={{ width: 40, height: 6, background: "#fff", flexShrink: 0 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tuk */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "8%",
          transform: "translateX(-50%)",
          width: "80%",
          zIndex: 4,
          animation: "tuk-enter 1.4s cubic-bezier(0.25,0.46,0.45,0.94) both",
        }}
      >
        <div style={{ animation: "tuk-idle 0.9s ease-in-out infinite", animationDelay: "1.5s", position: "relative" }}>
          <img
            src="/tuk.png"
            alt="mydiio tuk-tuk"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "hue-rotate(82deg) saturate(1.5) brightness(1.05)",
            }}
          />
          {/* Screen overlay */}
          <div
            style={{
              position: "absolute",
              left: "11%",
              top: "26%",
              width: "24%",
              height: "30%",
              background: section.screenBg,
              borderRadius: 5,
              overflow: "hidden",
              transition: "background-color 0.4s ease",
              border: "2px solid #1A1A0E",
              padding: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              zIndex: 5,
            }}
          >
            <div style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#4CAF72" }} className="pulse-dot" />
            <div className="font-display" style={{ fontSize: "min(1.4vw, 11px)", color: "#fff", lineHeight: 1.1, mixBlendMode: "difference" }}>
              {section.line1}
            </div>
            <div className="font-mono" style={{ fontSize: "min(1.1vw, 8px)", color: "#fff", marginTop: 2, opacity: 0.9, mixBlendMode: "difference" }}>
              {section.line2}
            </div>
          </div>
        </div>
      </div>

      {/* Foreground barrier */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: "20%", height: 28, zIndex: 7, pointerEvents: "none" }}>
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 800 28">
          <line x1="0" y1="6" x2="800" y2="6" stroke="#B8BCC2" strokeWidth="3" />
          <line x1="0" y1="20" x2="800" y2="20" stroke="#B8BCC2" strokeWidth="3" />
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x={i * 50 + 10} y="0" width="4" height="28" fill="#9499A0" />
          ))}
        </svg>
      </div>
    </div>
  );
}

function MidgroundStrip() {
  return (
    <svg viewBox="0 0 3000 400" width="100%" height="100%" preserveAspectRatio="none">
      {[0, 1500].map((off) => (
        <g key={off} transform={`translate(${off},0)`}>
          {/* Pharmacy */}
          <g transform="translate(40,160)">
            <rect x="0" y="60" width="140" height="180" fill="#fff" stroke="#1A1A0E" strokeWidth="2" />
            <polygon points="0,60 70,0 140,60" fill="#2196F3" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="60" y="20" width="20" height="6" fill="#fff" />
            <rect x="67" y="13" width="6" height="20" fill="#fff" />
            <text x="70" y="120" textAnchor="middle" fontFamily="Fredoka One" fontSize="14" fill="#1A1A0E">PHARMACY</text>
            <rect x="50" y="160" width="40" height="60" fill="#5BB8F5" />
          </g>
          {/* Coconut palm */}
          <g transform="translate(210,120)">
            <rect x="22" y="100" width="10" height="120" fill="#6B4423" />
            <ellipse cx="27" cy="100" rx="40" ry="10" fill="#4CAF72" />
            <ellipse cx="27" cy="95" rx="32" ry="8" fill="#2D8A4E" transform="rotate(-20 27 95)" />
            <ellipse cx="27" cy="95" rx="32" ry="8" fill="#2D8A4E" transform="rotate(20 27 95)" />
            <circle cx="20" cy="105" r="4" fill="#F5A623" />
            <circle cx="34" cy="105" r="4" fill="#F5A623" />
          </g>
          {/* Bakery */}
          <g transform="translate(290,170)">
            <rect x="0" y="50" width="150" height="170" fill="#fff" stroke="#1A1A0E" strokeWidth="2" />
            <polygon points="0,50 75,-10 150,50" fill="#FF8F00" stroke="#1A1A0E" strokeWidth="2" />
            <line x1="20" y1="20" x2="40" y2="50" stroke="#fff" strokeWidth="3" />
            <line x1="55" y1="0" x2="75" y2="50" stroke="#fff" strokeWidth="3" />
            <line x1="95" y1="0" x2="115" y2="50" stroke="#fff" strokeWidth="3" />
            <text x="75" y="100" textAnchor="middle" fontFamily="Fredoka One" fontSize="16" fill="#1A1A0E">BAKERY</text>
            <rect x="55" y="140" width="40" height="80" fill="#6B4423" />
          </g>
          {/* Lamp */}
          <g transform="translate(460,100)">
            <rect x="6" y="20" width="4" height="200" fill="#1A1A0E" />
            <circle cx="8" cy="18" r="10" fill="#F7E14A" />
          </g>
          {/* Food cart with steam */}
          <g transform="translate(500,210)">
            <rect x="0" y="20" width="100" height="60" fill="#F5A623" stroke="#1A1A0E" strokeWidth="2" rx="4" />
            <rect x="20" y="0" width="60" height="22" fill="#fff" stroke="#1A1A0E" strokeWidth="2" />
            <text x="50" y="16" textAnchor="middle" fontFamily="Fredoka One" fontSize="11" fill="#1A1A0E">KOTTU!</text>
            <circle cx="20" cy="85" r="8" fill="#1A1A0E" />
            <circle cx="80" cy="85" r="8" fill="#1A1A0E" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={40 + i * 12} cy="-4" r="5" fill="#fff" opacity="0.6" className="steam" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </g>
          {/* Kovil */}
          <g transform="translate(640,80)">
            <rect x="0" y="180" width="120" height="60" fill="#FFE0B2" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="10" y="140" width="100" height="40" fill="#FF8F00" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="20" y="100" width="80" height="40" fill="#FFE0B2" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="30" y="60" width="60" height="40" fill="#FF8F00" stroke="#1A1A0E" strokeWidth="2" />
            <polygon points="40,60 60,30 80,60" fill="#FFE0B2" stroke="#1A1A0E" strokeWidth="2" />
          </g>
          {/* Person sari */}
          <g transform="translate(790,260)">
            <circle cx="10" cy="-30" r="10" fill="#C68E5C" />
            <path d="M0,-15 L20,-15 L25,60 L-5,60 Z" fill="#9C27B0" />
          </g>
          {/* Fashion */}
          <g transform="translate(830,180)">
            <rect x="0" y="40" width="140" height="180" fill="#fff" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="0" y="20" width="140" height="40" fill="#E91E63" stroke="#1A1A0E" strokeWidth="2" />
            <text x="70" y="48" textAnchor="middle" fontFamily="Fredoka One" fontSize="18" fill="#fff">FASHION</text>
            <rect x="20" y="100" width="40" height="80" fill="#5BB8F5" />
            <rect x="80" y="100" width="40" height="80" fill="#5BB8F5" />
          </g>
          {/* Bus stop */}
          <g transform="translate(990,200)">
            <rect x="0" y="40" width="100" height="6" fill="#2196F3" />
            <rect x="4" y="46" width="4" height="80" fill="#1A1A0E" />
            <rect x="92" y="46" width="4" height="80" fill="#1A1A0E" />
            <circle cx="30" cy="80" r="6" fill="#1A1A0E" />
            <rect x="25" y="86" width="10" height="40" fill="#1A1A0E" />
            <circle cx="60" cy="80" r="6" fill="#1A1A0E" />
            <rect x="55" y="86" width="10" height="40" fill="#1A1A0E" />
          </g>
          {/* Billboard */}
          <g transform="translate(1110,80)">
            <rect x="20" y="80" width="6" height="160" fill="#1A1A0E" />
            <rect x="-10" y="20" width="80" height="60" fill="#F5A623" stroke="#1A1A0E" strokeWidth="2" rx="4" />
            <text x="30" y="48" textAnchor="middle" fontFamily="Fredoka One" fontSize="14" fill="#1A1A0E">mydiio</text>
            <text x="30" y="65" textAnchor="middle" fontFamily="DM Mono" fontSize="7" fill="#1A1A0E">ADS ON THE MOVE</text>
          </g>
          {/* Palm */}
          <g transform="translate(1210,120)">
            <rect x="22" y="100" width="10" height="120" fill="#6B4423" />
            <ellipse cx="27" cy="100" rx="42" ry="10" fill="#4CAF72" />
            <ellipse cx="27" cy="92" rx="34" ry="8" fill="#2D8A4E" transform="rotate(-25 27 92)" />
            <ellipse cx="27" cy="92" rx="34" ry="8" fill="#2D8A4E" transform="rotate(25 27 92)" />
          </g>
          {/* Coloured buildings */}
          <g transform="translate(1280,160)">
            <rect x="0" y="0" width="60" height="220" fill="#26A69A" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="60" y="-20" width="60" height="240" fill="#FF7043" stroke="#1A1A0E" strokeWidth="2" />
            <rect x="120" y="20" width="60" height="200" fill="#F7E14A" stroke="#1A1A0E" strokeWidth="2" />
            {[0, 1, 2, 3].map((i) =>
              [0, 1].map((c) => (
                <rect key={`a-${i}-${c}`} x={10 + c * 30} y={20 + i * 40} width="20" height="22" fill="#1A1A0E" opacity="0.5" />
              )),
            )}
          </g>
          {/* Person sarong */}
          <g transform="translate(1470,260)">
            <circle cx="10" cy="-30" r="10" fill="#8D5524" />
            <rect x="0" y="-18" width="22" height="30" fill="#fff" />
            <path d="M0,12 L22,12 L25,60 L-5,60 Z" fill="#1976D2" />
          </g>
        </g>
      ))}
    </svg>
  );
}

function Chip({ top, bottom, dark = false }: { top: string; bottom: string; dark?: boolean }) {
  return (
    <div
      style={{
        background: dark ? "#1A1A0E" : "#fff",
        color: dark ? "#F5A623" : "#1A1A0E",
        border: "3px solid #1A1A0E",
        boxShadow: "3px 3px 0 #1A1A0E",
        borderRadius: 12,
        padding: "10px 14px",
        textAlign: "center",
        minWidth: 90,
      }}
    >
      <div className="font-display" style={{ fontSize: 18 }}>{top}</div>
      <div className="font-mono" style={{ fontSize: 9, letterSpacing: 1.5, opacity: 0.55, textTransform: "uppercase", marginTop: 2 }}>{bottom}</div>
    </div>
  );
}

function Eyebrow({ children, color = "#F5A623" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="font-mono"
      style={{
        fontSize: 10,
        letterSpacing: 3,
        textTransform: "uppercase",
        color,
        background: `${color}26`,
        padding: "5px 10px",
        borderRadius: 999,
        display: "inline-block",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function H({ children, color = "#1A1A0E" }: { children: React.ReactNode; color?: string }) {
  return (
    <h2 className="font-display" style={{ fontSize: "clamp(30px, 4vw, 48px)", color, lineHeight: 1.05, margin: "16px 0" }}>
      {children}
    </h2>
  );
}

function FeatureRow({ icon, title, desc, accent = "#F5A623" }: { icon: string; title: string; desc: string; accent?: string }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${accent}`,
        background: `${accent}14`,
        borderRadius: 11,
        padding: "12px 14px",
        marginBottom: 10,
      }}
    >
      <div className="font-display" style={{ fontSize: 16, color: "#1A1A0E" }}>{icon} {title}</div>
      <div style={{ fontSize: 13, color: "#1A1A0E", opacity: 0.75, marginTop: 4 }}>{desc}</div>
    </div>
  );
}

function WaitlistForm({ initialMode }: { initialMode: "advertiser" | "driver" }) {
  const [mode, setMode] = useState<"advertiser" | "driver">(initialMode);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMode(initialMode), [initialMode]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: mode, ...data }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 52 }}>🎉</div>
        <div className="font-display" style={{ fontSize: 26, color: "#F5A623", marginTop: 8 }}>You're on the ride!</div>
        <div style={{ fontSize: 14, color: "#FFF9ED", opacity: 0.65, marginTop: 8 }}>
          We'll WhatsApp you within 24 hours. Welcome to mydiio.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["advertiser", "driver"] as const).map((m) => {
          const active = mode === m;
          const isAd = m === "advertiser";
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="font-display"
              style={{
                flex: 1,
                padding: "12px 10px",
                borderRadius: 999,
                border: active ? "3px solid #1A1A0E" : "3px solid #fff",
                background: active ? (isAd ? "#F5A623" : "#4CAF72") : "transparent",
                color: active ? (isAd ? "#1A1A0E" : "#fff") : "rgba(255,255,255,0.5)",
                boxShadow: active ? "3px 3px 0 #1A1A0E" : "none",
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {isAd ? "🏪 I want to advertise" : "🛺 I want to drive & earn"}
            </button>
          );
        })}
      </div>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {mode === "advertiser" ? (
          <>
            <input className="input-bold" name="business" placeholder="Business name" required />
            <input className="input-bold" name="name" placeholder="Your name" required />
            <input className="input-bold" name="whatsapp" type="tel" placeholder="+94…" required />
            <select className="input-bold" name="category" required defaultValue="">
              <option value="" disabled>Business category</option>
              {["Pharmacy","Food & Beverage","Fashion","Automotive","Finance","Telecoms","Hospitality","Real Estate","Education","Beauty & Wellness","Other"].map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="input-bold" name="interest" required defaultValue="">
              <option value="" disabled>Interested in</option>
              {["Pioneer spot (10 only)","Roamer","Voyager","Horizon","Not sure yet"].map(c => <option key={c}>{c}</option>)}
            </select>
            <button
              className="btn-bold font-display"
              style={{ width: "100%", background: "#F5A623", color: "#1A1A0E", padding: "14px", borderRadius: 12, fontSize: 18, marginTop: 6 }}
              disabled={loading}
            >
              🛺 Reserve my advertising spot!
            </button>
          </>
        ) : (
          <>
            <input className="input-bold" name="name" placeholder="Full name" required />
            <input className="input-bold" name="whatsapp" type="tel" placeholder="+94…" required />
            <input className="input-bold" name="reg" placeholder="Tuk-tuk registration number" required />
            <select className="input-bold" name="area" required defaultValue="">
              <option value="" disabled>Area you mainly drive</option>
              {["Colombo Fort","Pettah","Wellawatte","Nugegoda","Maharagama","Dehiwala","Mount Lavinia","Borella","Maradana","Other"].map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="input-bold" name="years" required defaultValue="">
              <option value="" disabled>Years driving</option>
              {["Less than 1 year","1–3 years","3–5 years","5+ years"].map(c => <option key={c}>{c}</option>)}
            </select>
            <button
              className="btn-bold font-display"
              style={{ width: "100%", background: "#4CAF72", color: "#fff", padding: "14px", borderRadius: 12, fontSize: 18, marginTop: 6 }}
              disabled={loading}
            >
              🛺 Sign me up as a driver!
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default function MydiioLanding() {
  const { active, refs } = useActiveSection();
  const section = SECTIONS[active] ?? SECTIONS[0];
  const formRef = useRef<HTMLElement>(null);
  const [formMode, setFormMode] = useState<"advertiser" | "driver">("advertiser");

  const jump = (mode: "advertiser" | "driver") => {
    setFormMode(mode);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: section.panelBg, transition: "background-color 0.6s ease" }}>
      <Nav onJump={jump} />

      <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }} className="md-stack">
        {/* LEFT — sticky scene */}
        <div
          className="left-panel"
          style={{
            width: "50%",
            position: "sticky",
            top: 0,
            height: "100vh",
            alignSelf: "flex-start",
          }}
        >
          <ColomboScene section={section} />
        </div>

        {/* RIGHT — scrolling content */}
        <div style={{ width: "50%" }} className="right-panel">
          {SECTIONS.map((s, i) => (
            <section
              key={s.id}
              ref={(el) => {
                refs.current[i] = el;
                if (s.id === 8) (formRef as React.MutableRefObject<HTMLElement | null>).current = el;
              }}
              data-idx={i}
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 40px",
                background: s.panelBg,
                transition: "background-color 0.6s ease",
              }}
            >
              <div style={{ maxWidth: 480, width: "100%" }}>
                <SectionContent id={s.id} setFormMode={setFormMode} formMode={formMode} />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#1A1A0E", padding: "60px 32px", textAlign: "center" }}>
        <div className="font-display" style={{ fontSize: 26 }}>
          <span style={{ color: "#fff" }}>my</span><span style={{ color: "#F5A623" }}>di</span><span style={{ color: "#fff" }}>io</span>
        </div>
        <div className="font-mono" style={{ fontSize: 11, color: "#F5A623", letterSpacing: 2, marginTop: 6 }}>ADS ON THE MOVE.</div>
        <div className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>mydiio.com · Colombo · 2026</div>
        <a href="#" className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "underline", marginTop: 8, display: "inline-block" }}>Privacy Policy</a>
      </footer>

      <style>{`
        @keyframes tuk-enter {
          0% { transform: translateX(calc(120% - 50% + 50vw)); }
          85% { transform: translateX(calc(-50% - 8px)); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tuk-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes cloud-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scene-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes dash-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-70px); }
        }
        @media (max-width: 767px) {
          .md-stack { flex-direction: column !important; }
          .left-panel { width: 100% !important; height: 50vh !important; position: relative !important; }
          .right-panel { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

function SectionContent({ id, setFormMode, formMode }: { id: number; setFormMode: (m: "advertiser" | "driver") => void; formMode: "advertiser" | "driver" }) {
  if (id === 1) return (
    <Reveal>
      <Eyebrow color="#1A1A0E">Watch It Ride</Eyebrow>
      <H>Your ad plays inside every tuk. All across Colombo.</H>
      <p style={{ color: "#1A1A0E", opacity: 0.75, fontSize: 16 }}>14 minutes. Captive audience. No skip button. Your brand on the screen as the city rushes by.</p>
      <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
        <Chip top="14 min" bottom="Avg ride" />
        <Chip top="0" bottom="Skip buttons" />
        <Chip top="100%" bottom="Attention" />
      </div>
    </Reveal>
  );
  if (id === 2) return (
    <Reveal>
      <Eyebrow>What is mydiio?</Eyebrow>
      <H color="#F5A623">Sri Lanka's first cloud-managed tuk-tuk ad platform.</H>
      <p style={{ color: "#FFF9ED", opacity: 0.7, fontSize: 16 }}>We install screens inside tuk-tuks across Colombo. Advertisers run campaigns. Drivers earn passive income every month. Every ride is a moving billboard.</p>
      <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
        <Chip top="1.1M" bottom="tuks in SL" />
        <Chip top="Colombo" bottom="launch city" />
        <Chip top="2026" bottom="live now" />
      </div>
    </Reveal>
  );
  if (id === 3) return (
    <Reveal>
      <Eyebrow>For Advertisers</Eyebrow>
      <H>Your ad. Every tuk. Every route.</H>
      <p style={{ color: "#1A1A0E", opacity: 0.72, fontSize: 16, marginBottom: 20 }}>Whatever your business, your ad plays to real Colombo passengers on every single ride.</p>
      <FeatureRow icon="📍" title="GPS-verified impressions" desc="See exactly where and when your ad played." />
      <FeatureRow icon="🎬" title="14 days completely free" desc="You only pay after you've seen it work." />
      <FeatureRow icon="✏️" title="Creative support included" desc="We help you make the ad at no extra cost." />
    </Reveal>
  );
  if (id === 4) return (
    <Reveal>
      <Eyebrow color="#F7E14A">How It Works</Eyebrow>
      <H color="#fff">Three steps. One campaign.</H>
      {[
        { n: 1, t: "Send your ad", d: "15–30 second video or image. Free creative help if needed." },
        { n: 2, t: "We go live", d: "Across our Colombo fleet within 48 hours. GPS-scheduled." },
        { n: 3, t: "You get reports", d: "Weekly verified data. Every vehicle and zone tracked." },
      ].map((s) => (
        <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 11, padding: 14, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F7E14A", color: "#1A1A0E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} className="font-display">{s.n}</div>
          <div>
            <div className="font-display" style={{ color: "#fff", fontSize: 18 }}>{s.t}</div>
            <div style={{ color: "#fff", opacity: 0.85, fontSize: 13, marginTop: 2 }}>{s.d}</div>
          </div>
        </div>
      ))}
      <button className="btn-bold font-display" style={{ background: "#F7E14A", color: "#1A1A0E", padding: "14px 22px", borderRadius: 12, fontSize: 18, marginTop: 10 }}>Start a campaign →</button>
    </Reveal>
  );
  if (id === 5) return (
    <Reveal>
      <Eyebrow color="#1A1A0E">Pricing</Eyebrow>
      <H>Less than one boost. Way more reach.</H>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
        {[
          { tier: "⭐ PIONEER", price: "LKR 25–35k/mo", sub: "CATEGORY EXCLUSIVE · 10 SPOTS ONLY", dark: true },
          { tier: "ROAMER", price: "LKR 20,000/mo", sub: "3-MONTH MINIMUM" },
          { tier: "VOYAGER", price: "LKR 32,000/mo", sub: "6-MONTH MINIMUM" },
          { tier: "HORIZON", price: "LKR 65,000+/mo", sub: "ENTERPRISE" },
        ].map((p) => (
          <div key={p.tier} style={{
            background: p.dark ? "#1A1A0E" : "#fff",
            color: p.dark ? "#F5A623" : "#1A1A0E",
            border: p.dark ? "3px solid #F5A623" : "3px solid #1A1A0E",
            boxShadow: "3px 3px 0 #1A1A0E",
            borderRadius: 13,
            padding: 14,
            textAlign: "center",
          }}>
            <div className="font-display" style={{ fontSize: 11, color: p.dark ? "#F5A623" : "#1A1A0E" }}>{p.tier}</div>
            <div className="font-display" style={{ fontSize: 20, marginTop: 6, color: p.dark ? "#F7E14A" : "#1A1A0E" }}>{p.price}</div>
            <div className="font-mono" style={{ fontSize: 9, opacity: 0.4, marginTop: 6 }}>{p.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#1A1A0E", opacity: 0.6, marginTop: 16 }}>All plans include 14 days free. You only pay after it works.</p>
    </Reveal>
  );
  if (id === 6) return (
    <Reveal>
      <Eyebrow color="#1A1A0E">Pioneer Programme</Eyebrow>
      <H>Only 10 founding spots. One per category. Yours forever.</H>
      <p style={{ color: "#1A1A0E", opacity: 0.75, fontSize: 16 }}>Be the only business in your category on mydiio. No competitor can advertise while you hold it. Rate locked for life.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
        {["Pharmacy","Food & Beverage","Fashion","Automotive","Finance","Telecoms","Hospitality","Real Estate","Education","Beauty & Wellness"].map((c) => (
          <span key={c} className="font-display" style={{ background: "#1A1A0E", color: "#F5A623", padding: "6px 14px", borderRadius: 20, fontSize: 11 }}>{c}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
        <Chip top="10" bottom="spots" />
        <Chip top="0" bottom="competitors" />
        <Chip top="∞" bottom="rate" />
      </div>
      <button className="btn-bold font-display" style={{ background: "#1A1A0E", color: "#F5A623", border: "3px solid #F5A623", boxShadow: "5px 5px 0 #F5A623", padding: "14px 22px", borderRadius: 12, fontSize: 18, marginTop: 18 }}>Claim a Pioneer spot →</button>
    </Reveal>
  );
  if (id === 7) return (
    <Reveal>
      <Eyebrow>For Tuk Drivers</Eyebrow>
      <H>Just drive. Earn more.</H>
      <p style={{ color: "#1A1A0E", opacity: 0.72, fontSize: 16 }}>We install a screen. You drive as normal. LKR 6,000–8,000 every month on the 5th. Zero extra work. Zero extra hours. Ever.</p>
      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        <Chip top="LKR 6,000" bottom="base monthly" />
        <Chip top="+2,000" bottom="route bonus" />
        <Chip top="5th" bottom="pay date" />
      </div>
      <div style={{ marginTop: 18 }}>
        <FeatureRow icon="🔧" title="Free installation" desc="We handle everything, you just show up." accent="#4CAF72" />
        <FeatureRow icon="📱" title="Simple driver app" desc="Earnings, uptime, and payment history." accent="#4CAF72" />
        <FeatureRow icon="🤝" title="Founding Group benefits" desc="Loyalty bonus at month 3, rate locked for life." accent="#4CAF72" />
      </div>
      <button className="btn-bold font-display" style={{ background: "#4CAF72", color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 18, marginTop: 14 }}>Become a partner driver →</button>
    </Reveal>
  );
  if (id === 8) return (
    <Reveal>
      <Eyebrow>Join the Waitlist</Eyebrow>
      <H color="#F5A623">Be first in Colombo.</H>
      <p style={{ color: "#FFF9ED", opacity: 0.7, fontSize: 15, marginBottom: 20 }}>Sign up and we'll WhatsApp you within 24 hours.</p>
      <WaitlistForm initialMode={formMode} />
    </Reveal>
  );
  return null;
}
