import { useEffect, useRef, useState } from "react";

// ======= CONFIG =======
const WEBHOOK_URL = ""; // Paste your Zapier/Make.com webhook URL here

const CATEGORIES = [
  "Pharmacy", "Food & Beverage", "Fashion", "Automotive", "Finance",
  "Telecoms", "Hospitality", "Real Estate", "Education", "Beauty & Wellness",
];
const AREAS = ["Colombo Fort", "Pettah", "Wellawatte", "Nugegoda", "Maharagama", "Dehiwala", "Mount Lavinia", "Borella", "Maradana", "Other"];

// ======= AD SCREEN STATES =======
type ScreenState = {
  bg: string;
  fg: string;
  kind: "ad" | "info";
  title?: string;
  tagline?: string;
  emoji?: string;
  label?: string;
  big?: string;
};

const SCREENS: Record<string, ScreenState> = {
  hook:    { bg: "#2196F3", fg: "#fff", kind: "ad", title: "Galle Road Pharmacy", tagline: "Your health, on every corner.", emoji: "💊" },
  what:    { bg: "#F5A623", fg: "#1A1A0E", kind: "info", label: "WHAT IS", big: "mydiio" },
  ad:      { bg: "#FF8F00", fg: "#fff", kind: "ad", title: "Nugegoda Bakery", tagline: "Fresh bread every morning.", emoji: "🥖" },
  how:     { bg: "#4CAF72", fg: "#fff", kind: "info", label: "HOW IT", big: "WORKS" },
  pricing: { bg: "#F7E14A", fg: "#1A1A0E", kind: "info", label: "FROM", big: "LKR 20k" },
  pioneer: { bg: "#F5A623", fg: "#1A1A0E", kind: "info", label: "PIONEER", big: "10 SPOTS" },
  drivers: { bg: "#4CAF72", fg: "#fff", kind: "info", label: "DRIVERS EARN", big: "LKR 6–8k" },
  waitlist:{ bg: "#1A1A0E", fg: "#F5A623", kind: "info", label: "JOIN THE", big: "WAITLIST" },
};

// ======= AD SCREEN (rendered inside the tuk) =======
function AdScreen({ state }: { state: ScreenState }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden transition-all duration-500"
      style={{ background: state.bg, color: state.fg }}
    >
      <div className="absolute top-1 right-1 flex items-center gap-1 z-10">
        <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-[#4CAF72]" />
        <span className="font-mono text-[6px] tracking-widest text-white/90">LIVE</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center leading-none">
        {state.kind === "ad" ? (
          <>
            <div className="text-[22px] sm:text-[26px]">{state.emoji}</div>
            <div className="font-display text-[9px] sm:text-[10px] mt-0.5">{state.title}</div>
            <div className="font-body font-extrabold text-[7px] sm:text-[8px] opacity-95 mt-0.5 px-1">{state.tagline}</div>
          </>
        ) : (
          <>
            <div className="font-mono text-[6px] tracking-[2px] opacity-80">{state.label}</div>
            <div className="font-display text-[14px] sm:text-[16px] mt-0.5">{state.big}</div>
          </>
        )}
      </div>
    </div>
  );
}

// ======= TUK SVG (faces RIGHT, mydiio amber/charcoal recolour) =======
function TukSVG({ children }: { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 480 300" width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
      <ellipse cx="240" cy="278" rx="180" ry="10" fill="rgba(0,0,0,0.18)" />

      {/* ROOF */}
      <rect x="60" y="60" width="340" height="22" rx="4" fill="#2A2820" />
      <rect x="64" y="78" width="332" height="6" fill="#1A1A0E" opacity="0.6" />
      <circle cx="232" cy="58" r="5" fill="#1A1A0E" />

      {/* roof support bars */}
      {[80, 150, 220, 290].map((x) => (
        <rect key={x} x={x} y="82" width="6" height="120" fill="#E8920A" />
      ))}

      {/* passenger compartment body */}
      <rect x="78" y="86" width="220" height="84" fill="#C77B0E" />
      <rect x="70" y="170" width="240" height="60" rx="6" fill="#F5A623" />
      <rect x="70" y="218" width="240" height="14" fill="#E8920A" />
      <rect x="70" y="232" width="240" height="6" fill="#F7E14A" />
      <rect x="78" y="170" width="220" height="14" fill="#5A3820" />
      <rect x="78" y="184" width="220" height="6" fill="#3D2614" />

      {/* mydiio screen on back wall */}
      <foreignObject x="172" y="100" width="92" height="58">
        <div style={{
          width: "100%", height: "100%",
          border: "2px solid #1A1A0E", borderRadius: 4, background: "#1A1A0E", overflow: "hidden",
        }}>
          {children}
        </div>
      </foreignObject>

      {/* DRIVER SECTION (right) */}
      <path d="M310,170 L310,100 Q310,86 324,86 L360,86 Q372,86 378,98 L412,160 L412,232 L310,232 Z" fill="#F5A623" />
      <rect x="310" y="218" width="102" height="14" fill="#E8920A" />
      <rect x="310" y="232" width="102" height="6" fill="#F7E14A" />

      {/* windshield */}
      <path d="M322,98 L368,98 L398,160 L322,160 Z" fill="rgba(144,238,144,0.55)" stroke="#1A1A0E" strokeWidth="2.5" strokeLinejoin="round" />

      {/* DRIVER */}
      <path d="M328,128 Q328,114 342,114 L362,114 Q372,114 372,124 L378,158 L330,158 Z" fill="#F5A623" stroke="#1A1A0E" strokeWidth="1.5" />
      <path d="M362,134 L388,150 L388,158 L362,148 Z" fill="#E8920A" stroke="#1A1A0E" strokeWidth="1.2" />
      <circle cx="354" cy="106" r="11" fill="#B07A52" stroke="#1A1A0E" strokeWidth="1.5" />
      <path d="M344,103 Q344,94 356,94 Q366,94 366,104 L364,108 Q360,99 354,99 Q347,100 345,108 Z" fill="#1A1A0E" />
      <path d="M364,107 L368,109 L364,111 Z" fill="#9A6840" />

      {/* front lights */}
      <circle cx="408" cy="200" r="7" fill="#D9D9D9" stroke="#1A1A0E" strokeWidth="1.5" />
      <rect x="396" y="178" width="10" height="8" rx="2" fill="#FF8F00" stroke="#1A1A0E" strokeWidth="1.2" />
      <path d="M412,190 L424,210 L412,232 Z" fill="#1A1A0E" />

      {/* WHEELS */}
      <g>
        <circle cx="130" cy="240" r="32" fill="#1A1A0E" />
        <circle cx="130" cy="240" r="26" fill="#2A2820" />
        <g className="wheel-spin" style={{ transformOrigin: "130px 240px" }}>
          <circle cx="130" cy="240" r="14" fill="#2196F3" stroke="#1A1A0E" strokeWidth="2" />
          {[0, 60, 120].map((a) => (
            <rect key={a} x="128" y="228" width="4" height="24" fill="#1A1A0E" transform={`rotate(${a} 130 240)`} />
          ))}
          <circle cx="130" cy="240" r="3" fill="#1A1A0E" />
        </g>
      </g>
      <g>
        <circle cx="378" cy="246" r="36" fill="#1A1A0E" />
        <circle cx="378" cy="246" r="29" fill="#2A2820" />
        <g className="wheel-spin" style={{ transformOrigin: "378px 246px" }}>
          <circle cx="378" cy="246" r="16" fill="#2196F3" stroke="#1A1A0E" strokeWidth="2" />
          {[0, 60, 120].map((a) => (
            <rect key={a} x="376" y="232" width="4" height="28" fill="#1A1A0E" transform={`rotate(${a} 378 246)`} />
          ))}
          <circle cx="378" cy="246" r="3.5" fill="#1A1A0E" />
        </g>
      </g>
    </svg>
  );
}

// ======= SCENE BACKGROUND LAYERS =======
function CloudsLayer() {
  return (
    <svg viewBox="0 0 1200 200" className="block h-full w-auto" preserveAspectRatio="xMinYMax meet">
      <g fill="#FFFFFF">
        <ellipse cx="200" cy="80" rx="38" ry="16" />
        <ellipse cx="232" cy="72" rx="28" ry="14" />
        <ellipse cx="172" cy="74" rx="22" ry="12" />
        <ellipse cx="780" cy="50" rx="44" ry="18" />
        <ellipse cx="816" cy="42" rx="30" ry="14" />
        <ellipse cx="748" cy="44" rx="24" ry="13" />
      </g>
    </svg>
  );
}

function MountainsLayer() {
  return (
    <svg viewBox="0 0 1600 200" className="block h-full w-auto" preserveAspectRatio="xMinYMax meet">
      <path d="M0,200 L0,140 Q120,70 240,110 Q360,150 480,90 Q600,30 720,100 Q840,160 960,100 Q1080,50 1200,120 Q1320,170 1440,110 Q1520,80 1600,130 L1600,200 Z" fill="#8BAAB8" />
      <path d="M0,200 L0,170 Q160,130 320,160 Q480,190 640,150 Q800,120 960,160 Q1120,190 1280,150 Q1440,120 1600,160 L1600,200 Z" fill="#A8C2CC" opacity="0.85" />
    </svg>
  );
}

function BushesLayer() {
  return (
    <svg viewBox="0 0 1600 100" className="block h-full w-auto" preserveAspectRatio="xMinYMax meet">
      <g fill="#4CAF72">
        {[0, 90, 180, 280, 370, 470, 560, 660, 760, 860, 960, 1060, 1160, 1260, 1360, 1460, 1560].map((x, i) => (
          <ellipse key={i} cx={x} cy={i % 2 === 0 ? 78 : 82} rx={i % 3 === 0 ? 64 : 50} ry={i % 2 === 0 ? 32 : 26} />
        ))}
      </g>
      <g fill="#3D8B5A" opacity="0.65">
        {[40, 140, 240, 340, 440, 540, 640, 740, 840, 940, 1040, 1140, 1240, 1340, 1440, 1540].map((x, i) => (
          <ellipse key={i} cx={x} cy="86" rx="42" ry="22" />
        ))}
      </g>
    </svg>
  );
}

// ======= TUK VIEWPORT — clean illustrated scene =======
function TukViewport({ skyColor, currentScreen }: { skyColor: string; currentScreen: ScreenState }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: skyColor, transition: "background 0.6s ease" }}>
      <div className="absolute inset-x-0" style={{ top: "6%", height: "18%" }}>
        <div className="street-track-slow flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><CloudsLayer /></div>
          <div className="h-full w-1/2"><CloudsLayer /></div>
        </div>
      </div>

      <div className="absolute inset-x-0" style={{ bottom: "34%", height: "16%" }}>
        <div className="street-track-mid flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><MountainsLayer /></div>
          <div className="h-full w-1/2"><MountainsLayer /></div>
        </div>
      </div>

      <div className="absolute inset-x-0" style={{ bottom: "29%", height: "9%" }}>
        <div className="street-track-fast flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><BushesLayer /></div>
          <div className="h-full w-1/2"><BushesLayer /></div>
        </div>
      </div>

      {/* RED+WHITE KERB */}
      <div className="absolute inset-x-0 z-10" style={{
        bottom: "28%", height: "12px",
        backgroundImage: "repeating-linear-gradient(90deg, #E53935 0 24px, #FFFFFF 24px 48px)",
        borderTop: "1.5px solid #1A1A0E", borderBottom: "1.5px solid #1A1A0E",
      }} />

      {/* ROAD */}
      <div className="absolute inset-x-0 z-0" style={{ bottom: 0, height: "28%", background: "#3A3A3A" }} />

      {/* CENTRELINE */}
      <div className="absolute inset-x-0 z-10" style={{ bottom: "13%", height: "5px" }}>
        <div className="street-track-fast h-full" style={{
          width: "200%",
          backgroundImage: "repeating-linear-gradient(90deg, #FFFFFF 0 30px, transparent 30px 60px)",
        }} />
      </div>

      {/* THE TUK */}
      <div className="absolute z-30 tuk-bob" style={{
        left: "50%", transform: "translateX(-50%)",
        bottom: "10%", width: "min(560px, 88vw)", aspectRatio: "480 / 300",
      }}>
        <TukSVG>
          <AdScreen state={currentScreen} />
        </TukSVG>
      </div>
    </div>
  );
}

// ======= REVEAL HOOK =======
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) el.classList.add("in"); });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ======= SECTION WRAPPER =======
function Section({ id, screenKey, onEnter, children, cardBg, cardFg = "#1A1A0E" }: {
  id: string;
  screenKey: keyof typeof SCREENS;
  onEnter: (k: keyof typeof SCREENS) => void;
  children: React.ReactNode;
  cardBg: string;
  cardFg?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const cardRef = useReveal<HTMLDivElement>();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) onEnter(screenKey); });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [screenKey, onEnter]);

  // Cards float in upper sky band — top-aligned with padding so the tuk stays visible below.
  return (
    <section ref={ref} id={id} className="relative z-10 min-h-screen flex items-start pt-24 sm:pt-28 pb-[55vh] px-4">
      <div ref={cardRef} className="reveal card-bold" style={{ background: cardBg, color: cardFg }}>
        {children}
      </div>
    </section>
  );
}

// ======= STAT CHIP =======
function Stat({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className="flex-1 min-w-[90px] text-center px-2 py-2 rounded-[11px]" style={{
      background: dark ? "rgba(255,255,255,0.06)" : "#fff",
      border: dark ? "2px solid rgba(255,255,255,0.18)" : "3px solid #1A1A0E",
      boxShadow: dark ? "none" : "3px 3px 0 #1A1A0E",
      color: dark ? "#fff" : "#1A1A0E",
    }}>
      <div className="font-display text-lg sm:text-xl leading-none">{n}</div>
      <div className="font-mono text-[9px] tracking-widest opacity-70 mt-1">{label}</div>
    </div>
  );
}

// ======= MAIN PAGE =======
export default function MydiioLanding({ defaultTab }: { defaultTab?: "advertise" | "drive" }) {
  const [screenKey, setScreenKey] = useState<keyof typeof SCREENS>("hook");
  const [skyColor, setSkyColor] = useState("#A8D8EA");
  const [tab, setTab] = useState<"advertise" | "drive">(defaultTab ?? "advertise");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  // sky scroll interpolation: bright blue -> golden -> warm dusk
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, max)));
      let r: number, g: number, b: number;
      if (p < 0.5) {
        const t = p / 0.5;
        r = Math.round(168 + (255 - 168) * t);
        g = Math.round(216 + (228 - 216) * t);
        b = Math.round(234 + (176 - 234) * t);
      } else {
        const t = (p - 0.5) / 0.5;
        r = Math.round(255 + (240 - 255) * t);
        g = Math.round(228 + (160 - 228) * t);
        b = Math.round(176 + (110 - 176) * t);
      }
      setSkyColor(`rgb(${r},${g},${b})`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash.replace("#", "");
    if (h === "drive") setTab("drive");
    if (h === "advertise") setTab("advertise");
  }, []);

  const scrollToWaitlist = (which: "advertise" | "drive") => {
    setTab(which);
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { type: tab, ...data, ts: new Date().toISOString() };
    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("[mydiio waitlist]", payload);
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setBusy(false);
    }
  };

  const current = SCREENS[screenKey];

  return (
    <div className="relative">
      <TukViewport skyColor={skyColor} currentScreen={current} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="inline-flex items-center bg-white rounded-full px-4 py-1.5 font-display text-lg" style={{ border: "3px solid #1A1A0E", boxShadow: "3px 3px 0 #1A1A0E" }}>
          <span style={{ color: "#1A1A0E" }}>my</span>
          <span style={{ color: "#F5A623" }}>di</span>
          <span style={{ color: "#1A1A0E" }}>io</span>
        </a>
        <div className="flex gap-2 sm:gap-3">
          <button onClick={() => scrollToWaitlist("advertise")} className="btn-bold rounded-full px-3 sm:px-4 py-1.5 font-display text-xs sm:text-sm" style={{ background: "#F5A623", color: "#1A1A0E" }}>
            Advertise <span className="hidden sm:inline">with us</span> →
          </button>
          <button onClick={() => scrollToWaitlist("drive")} className="btn-bold rounded-full px-3 sm:px-4 py-1.5 font-display text-xs sm:text-sm" style={{ background: "#4CAF72", color: "#fff" }}>
            Drive <span className="hidden sm:inline">& earn</span> →
          </button>
        </div>
      </nav>

      <main className="relative">
        {/* hero spacer with intro headline floating in sky */}
        <section className="relative z-10 min-h-screen flex items-start pt-24 px-4">
          <div className="reveal in mx-auto text-center max-w-[640px]">
            <div className="eyebrow">WATCH IT RIDE</div>
            <h1 className="font-display mt-3" style={{ fontSize: "clamp(34px,7vw,64px)", lineHeight: 1.0, color: "#1A1A0E" }}>
              Your ad plays inside every tuk.<br/>All across Colombo.
            </h1>
            <p className="mt-3 font-mono text-[11px] tracking-[3px] uppercase" style={{ color: "rgba(26,26,14,0.6)" }}>
              Scroll to ride →
            </p>
          </div>
        </section>

        <Section id="hook" screenKey="hook" onEnter={setScreenKey} cardBg="#F5A623">
          <div className="eyebrow">THE HOOK</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            14 minutes. No skip button. Pure attention.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(26,26,14,0.78)" }}>
            That's the average tuk-tuk ride in Colombo. A captive passenger, eyes on a screen, your brand on it.
          </p>
          <div className="mt-5 flex gap-2">
            <Stat n="14 min" label="Avg ride" />
            <Stat n="0" label="Skip btns" />
            <Stat n="100%" label="Attention" />
          </div>
        </Section>

        <Section id="what" screenKey="what" onEnter={setScreenKey} cardBg="#1A1A0E" cardFg="#FFF9ED">
          <div className="eyebrow">WHAT IS MYDIIO?</div>
          <h2 className="font-display mt-3" style={{ color: "#F5A623", fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            Sri Lanka's first cloud-managed tuk-tuk ad platform.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(255,249,237,0.75)" }}>
            We install screens inside tuk-tuks across Colombo. Advertisers run campaigns. Drivers earn passive income every month. Every ride is a moving billboard through the city.
          </p>
          <div className="mt-5 flex gap-2">
            <Stat n="1.1M" label="Tuks in SL" dark />
            <Stat n="Colombo" label="Launch city" dark />
            <Stat n="2026" label="Live now" dark />
          </div>
        </Section>

        <Section id="ad" screenKey="ad" onEnter={setScreenKey} cardBg="#fff">
          <div className="eyebrow">FOR ADVERTISERS</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            Your ad. Every tuk. Every route.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(26,26,14,0.78)" }}>
            Pharmacy, bakery, clothing, food — whatever your business, your ad plays to real Colombo passengers on every ride.
          </p>
          <div className="mt-5 space-y-3">
            {[
              ["📍", "GPS-verified impressions — see exactly where and when your ad played"],
              ["🎬", "14 days completely free — you only pay after you've seen it work"],
              ["✏️", "Creative support included — we help you make the ad at no extra cost"],
            ].map(([e, t]) => (
              <div key={t} className="flex gap-3 px-3.5 py-3 rounded-[11px]" style={{
                background: "rgba(245,166,35,0.08)", borderLeft: "4px solid #F5A623",
              }}>
                <div className="text-xl">{e}</div>
                <div className="text-sm font-extrabold">{t}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="how" screenKey="how" onEnter={setScreenKey} cardBg="#4CAF72" cardFg="#fff">
          <div className="eyebrow" style={{ color: "#F7E14A", background: "rgba(247,225,74,0.18)" }}>HOW IT WORKS</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            Three steps. One campaign.
          </h2>
          <div className="mt-5 space-y-3">
            {[
              ["Send your ad", "15–30 second video or image. We'll create it free if you need help."],
              ["We go live", "Loaded across our Colombo tuk-tuk fleet within 48 hours. GPS-scheduled by zone."],
              ["You get reports", "Weekly verified data. Every vehicle, zone, and impression tracked and sent to you."],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-3 p-3 rounded-[11px]" style={{
                background: "rgba(255,255,255,0.14)", border: "2px solid rgba(255,255,255,0.4)",
              }}>
                <div className="font-display text-lg w-9 h-9 flex items-center justify-center rounded-full shrink-0" style={{ background: "#F7E14A", color: "#1A1A0E", border: "2px solid #1A1A0E" }}>{i + 1}</div>
                <div>
                  <div className="font-display text-base">{t}</div>
                  <div className="text-[13px] opacity-90">{d}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollToWaitlist("advertise")} className="btn-bold mt-6 rounded-full px-5 py-3 font-display text-[19px] w-full sm:w-auto" style={{ background: "#F7E14A", color: "#1A1A0E" }}>
            Start a campaign →
          </button>
        </Section>

        <Section id="pricing" screenKey="pricing" onEnter={setScreenKey} cardBg="#F7E14A">
          <div className="eyebrow">PRICING</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(26px,5vw,42px)", lineHeight: 1.05 }}>
            Less than one Facebook boost. Way more reach.
          </h2>
          <div className="grid grid-cols-2 gap-2.5 mt-5">
            <PriceCard tier="⭐ Pioneer" price="LKR 25–35k/mo" sub="Category exclusive · 10 spots" dark />
            <PriceCard tier="Roamer" price="LKR 20,000/mo" sub="3-month minimum" />
            <PriceCard tier="Voyager" price="LKR 32,000/mo" sub="6-month minimum" />
            <PriceCard tier="Horizon" price="LKR 65,000+/mo" sub="Enterprise" />
          </div>
          <p className="mt-4 text-[13px]" style={{ color: "rgba(26,26,14,0.65)" }}>
            All plans include 14 days free. You only pay after it works.
          </p>
        </Section>

        <Section id="pioneer" screenKey="pioneer" onEnter={setScreenKey} cardBg="#F5A623">
          <div className="eyebrow">PIONEER PROGRAMME</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(26px,5vw,42px)", lineHeight: 1.05 }}>
            Only 10 founding spots. One per category. Yours forever.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(26,26,14,0.78)" }}>
            Be the only business in your category on mydiio. No competitor can advertise while you hold your Pioneer spot. Your rate is locked for life.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {CATEGORIES.map(c => (
              <span key={c} className="font-display text-[11px] uppercase px-3.5 py-1.5 rounded-full" style={{ background: "#1A1A0E", color: "#F5A623" }}>{c}</span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <Stat n="10" label="Spots ever" />
            <Stat n="0" label="Competitors" />
            <Stat n="∞" label="Locked rate" />
          </div>
          <button onClick={() => scrollToWaitlist("advertise")} className="mt-6 rounded-full px-5 py-3 font-display text-[18px] w-full sm:w-auto"
            style={{ background: "#1A1A0E", color: "#F5A623", border: "3px solid #F5A623", boxShadow: "5px 5px 0 #F5A623" }}>
            Claim a Pioneer spot →
          </button>
        </Section>

        <Section id="drivers" screenKey="drivers" onEnter={setScreenKey} cardBg="#fff">
          <div className="eyebrow" style={{ color: "#2D8A4E", background: "rgba(76,175,114,0.15)" }}>FOR TUK DRIVERS</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            Just drive. Earn more.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(26,26,14,0.78)" }}>
            We install a screen in your tuk. You drive exactly as you do today. Every month, between LKR 6,000 and LKR 8,000 lands in your account on the 5th. No extra work. No extra hours. Ever.
          </p>
          <div className="mt-5 flex gap-2">
            <Stat n="LKR 6k" label="Base monthly" />
            <Stat n="+2,000" label="Route bonus" />
            <Stat n="5th" label="Pay date" />
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["🔧", "Free installation — we handle everything, you just show up"],
              ["📱", "Simple driver app — see your earnings, uptime, and payment history"],
              ["🤝", "Founding Group benefits — amber shirt, loyalty bonus at month 3, rate locked for life"],
            ].map(([e, t]) => (
              <div key={t} className="flex gap-3 px-3.5 py-3 rounded-[11px]" style={{
                background: "rgba(76,175,114,0.10)", borderLeft: "4px solid #4CAF72",
              }}>
                <div className="text-xl">{e}</div>
                <div className="text-sm font-extrabold">{t}</div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollToWaitlist("drive")} className="btn-bold mt-6 rounded-full px-5 py-3 font-display text-[18px] w-full sm:w-auto" style={{ background: "#4CAF72", color: "#fff" }}>
            Become a partner driver →
          </button>
        </Section>

        <Section id="waitlist" screenKey="waitlist" onEnter={setScreenKey} cardBg="#1A1A0E" cardFg="#FFF9ED">
          <div className="eyebrow">JOIN THE WAITLIST</div>
          <h2 className="font-display mt-3" style={{ color: "#F5A623", fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            Be first in Colombo.
          </h2>
          <p className="mt-3 text-[15px]" style={{ color: "rgba(255,249,237,0.75)" }}>
            Whether you're a business wanting to advertise or a driver wanting to earn — sign up and we'll WhatsApp you within 24 hours.
          </p>

          <div className="mt-5 flex gap-2">
            <button onClick={() => setTab("advertise")} className="flex-1 rounded-full py-2.5 font-display text-sm transition-all duration-300"
              style={tab === "advertise"
                ? { background: "#F5A623", color: "#1A1A0E", border: "3px solid #1A1A0E" }
                : { background: "transparent", color: "rgba(255,255,255,0.55)", border: "2px solid rgba(255,255,255,0.3)" }}>
              🏪 I want to advertise
            </button>
            <button onClick={() => setTab("drive")} className="flex-1 rounded-full py-2.5 font-display text-sm transition-all duration-300"
              style={tab === "drive"
                ? { background: "#4CAF72", color: "#fff", border: "3px solid #1A1A0E" }
                : { background: "transparent", color: "rgba(255,255,255,0.55)", border: "2px solid rgba(255,255,255,0.3)" }}>
              🛺 I want to drive & earn
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3" key={tab}>
              {tab === "advertise" ? (
                <>
                  <input className="input-bold" name="business_name" placeholder="Business name" required />
                  <input className="input-bold" name="your_name" placeholder="Your name" required />
                  <input className="input-bold" name="whatsapp" type="tel" placeholder="+94…" required />
                  <select className="input-bold" name="category" required defaultValue="">
                    <option value="" disabled>Business category</option>
                    {[...CATEGORIES, "Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <select className="input-bold" name="interest" required defaultValue="">
                    <option value="" disabled>Interested in</option>
                    {["Pioneer spot (10 only)", "Roamer", "Voyager", "Horizon", "Not sure yet"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <button disabled={busy} className="btn-bold w-full rounded-full py-3 font-display text-[16px]" style={{ background: "#F5A623", color: "#1A1A0E" }}>
                    🛺 Reserve my advertising spot!
                  </button>
                </>
              ) : (
                <>
                  <input className="input-bold" name="full_name" placeholder="Full name" required />
                  <input className="input-bold" name="whatsapp" type="tel" placeholder="+94…" required />
                  <input className="input-bold" name="tuk_reg" placeholder="Tuk-tuk registration number" required />
                  <select className="input-bold" name="area" required defaultValue="">
                    <option value="" disabled>Area you mainly drive</option>
                    {AREAS.map(a => <option key={a}>{a}</option>)}
                  </select>
                  <select className="input-bold" name="experience" required defaultValue="">
                    <option value="" disabled>Years driving</option>
                    {["Less than 1 year", "1–3 years", "3–5 years", "5+ years"].map(a => <option key={a}>{a}</option>)}
                  </select>
                  <button disabled={busy} className="btn-bold w-full rounded-full py-3 font-display text-[16px]" style={{ background: "#4CAF72", color: "#fff" }}>
                    🛺 Sign me up as a driver!
                  </button>
                </>
              )}
            </form>
          ) : (
            <div className="mt-6 text-center py-6">
              <div className="text-[52px]">🎉</div>
              <div className="font-display text-[26px] mt-2" style={{ color: "#F5A623" }}>You're on the ride!</div>
              <div className="font-body text-[14px] mt-2" style={{ color: "rgba(255,249,237,0.65)" }}>
                We'll WhatsApp you within 24 hours. Welcome to mydiio.
              </div>
            </div>
          )}
        </Section>

        <footer className="relative z-10 text-center py-[60px] px-8" style={{ background: "#1A1A0E" }}>
          <div className="font-display text-[26px]">
            <span style={{ color: "#fff" }}>my</span>
            <span style={{ color: "#F5A623" }}>di</span>
            <span style={{ color: "#fff" }}>io</span>
          </div>
          <div className="font-mono text-[11px] mt-1.5" style={{ color: "#F5A623", letterSpacing: "2px" }}>ADS ON THE MOVE.</div>
          <div className="font-mono text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>mydiio.com · Colombo · 2026</div>
          <a href="#" className="font-mono text-[10px] mt-3 inline-block underline" style={{ color: "rgba(255,255,255,0.25)" }}>Privacy Policy</a>
        </footer>
      </main>
    </div>
  );
}

function PriceCard({ tier, price, sub, dark = false }: { tier: string; price: string; sub: string; dark?: boolean }) {
  return (
    <div className="text-center px-2 py-3 rounded-[13px]" style={{
      background: dark ? "#1A1A0E" : "#fff",
      border: dark ? "3px solid #F5A623" : "3px solid #1A1A0E",
      boxShadow: "3px 3px 0 #1A1A0E",
      color: dark ? "#FFF9ED" : "#1A1A0E",
    }}>
      <div className="font-display text-[11px] uppercase" style={{ color: "#F5A623" }}>{tier}</div>
      <div className="font-display text-[18px] mt-1 leading-tight">{price}</div>
      <div className="font-mono text-[9px] uppercase mt-1.5" style={{ opacity: dark ? 0.55 : 0.35 }}>{sub}</div>
    </div>
  );
}
