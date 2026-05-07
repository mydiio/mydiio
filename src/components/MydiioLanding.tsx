import { useEffect, useRef, useState } from "react";

// ======= CONFIG =======
const WEBHOOK_URL = ""; // Paste your Zapier/Make.com webhook URL here

const CATEGORIES = [
  "Pharmacy", "Food & Beverage", "Fashion", "Automotive", "Finance",
  "Telecoms", "Hospitality", "Real Estate", "Education", "Beauty & Wellness",
];
const AREAS = ["Colombo Fort", "Pettah", "Wellawatte", "Nugegoda", "Maharagama", "Dehiwala", "Mount Lavinia", "Borella", "Maradana", "Other"];

// ======= STREET SCENE SVG =======
function StreetStrip() {
  return (
    <svg viewBox="0 0 1600 280" xmlns="http://www.w3.org/2000/svg" className="block h-full w-auto" preserveAspectRatio="xMinYMid meet">
      <g stroke="#1A1A0E" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* skyline */}
        <rect x="0" y="120" width="80" height="100" fill="#FFB6C1"/>
        <rect x="80" y="100" width="60" height="120" fill="#B5EAD7"/>
        <rect x="140" y="130" width="70" height="90" fill="#FFDAC1"/>
        <rect x="210" y="90" width="50" height="130" fill="#C7CEEA"/>
        {/* pharmacy */}
        <rect x="280" y="110" width="120" height="120" fill="#FFFFFF"/>
        <polygon points="270,110 410,110 400,80 280,80" fill="#2196F3"/>
        <rect x="325" y="85" width="30" height="8" fill="#fff"/>
        <rect x="335" y="73" width="10" height="32" fill="#fff"/>
        <rect x="305" y="160" width="30" height="60" fill="#A8D8EA"/>
        <rect x="345" y="160" width="40" height="40" fill="#A8D8EA"/>
        <text x="340" y="145" fontFamily="Fredoka One, sans-serif" fontSize="14" textAnchor="middle" fill="#1A1A0E" stroke="none">PHARMACY</text>
        {/* palm */}
        <rect x="420" y="120" width="14" height="100" fill="#8B5A2B"/>
        <ellipse cx="427" cy="118" rx="40" ry="14" fill="#4CAF72"/>
        <ellipse cx="410" cy="108" rx="34" ry="12" fill="#4CAF72" transform="rotate(-25 410 108)"/>
        <ellipse cx="445" cy="108" rx="34" ry="12" fill="#4CAF72" transform="rotate(25 445 108)"/>
        <circle cx="427" cy="125" r="5" fill="#F5A623"/>
        <circle cx="436" cy="124" r="5" fill="#F5A623"/>
        {/* bakery */}
        <rect x="490" y="120" width="130" height="100" fill="#FFF9ED"/>
        <path d="M480,120 L630,120 L620,95 L490,95 Z" fill="#FF8F00"/>
        <path d="M480,120 L495,95 L505,120 L515,95 L525,120 L535,95 L545,120 L555,95 L565,120 L575,95 L585,120 L595,95 L605,120 L615,95 L625,120" fill="#FFD699"/>
        <text x="555" y="155" fontFamily="Fredoka One, sans-serif" fontSize="13" textAnchor="middle" fill="#1A1A0E" stroke="none">BAKERY</text>
        <rect x="510" y="170" width="40" height="50" fill="#A8D8EA"/>
        <rect x="565" y="170" width="40" height="50" fill="#A8D8EA"/>
        {/* lamp */}
        <rect x="640" y="140" width="6" height="80" fill="#1A1A0E"/>
        <circle cx="643" cy="135" r="10" fill="#FFE066"/>
        {/* kovil */}
        <rect x="670" y="140" width="120" height="80" fill="#FFDAC1"/>
        <polygon points="660,140 800,140 790,100 670,100" fill="#E91E63"/>
        <polygon points="685,100 775,100 770,75 690,75" fill="#F5A623"/>
        <polygon points="705,75 755,75 745,55 715,55" fill="#E91E63"/>
        <polygon points="725,55 735,55 730,40" fill="#F7E14A"/>
        <rect x="720" y="170" width="20" height="50" fill="#1A1A0E"/>
        {/* woman in sari */}
        <circle cx="820" cy="170" r="10" fill="#E0AC69"/>
        <path d="M810,180 Q820,178 830,180 L835,220 L805,220 Z" fill="#9B59B6"/>
        <rect x="817" y="160" width="6" height="6" fill="#1A1A0E"/>
        {/* food cart */}
        <rect x="850" y="160" width="100" height="60" fill="#F5A623"/>
        <rect x="845" y="150" width="110" height="14" fill="#E91E63"/>
        <text x="900" y="195" fontFamily="Fredoka One, sans-serif" fontSize="14" textAnchor="middle" fill="#1A1A0E" stroke="none">KOTTU!</text>
        <circle cx="868" cy="220" r="8" fill="#1A1A0E"/>
        <circle cx="932" cy="220" r="8" fill="#1A1A0E"/>
        <g className="steam">
          <circle cx="900" cy="148" r="5" fill="#fff" opacity="0.8"/>
        </g>
        <circle cx="892" cy="148" r="5" fill="#fff" opacity="0.6" className="steam" style={{ animationDelay: "0.4s" } as React.CSSProperties}/>
        <circle cx="908" cy="148" r="5" fill="#fff" opacity="0.6" className="steam" style={{ animationDelay: "0.9s" } as React.CSSProperties}/>
        {/* mydiio billboard */}
        <rect x="970" y="80" width="140" height="70" fill="#F5A623"/>
        <rect x="985" y="150" width="6" height="70" fill="#1A1A0E"/>
        <rect x="1090" y="150" width="6" height="70" fill="#1A1A0E"/>
        <text x="1040" y="120" fontFamily="Fredoka One, sans-serif" fontSize="22" textAnchor="middle" fill="#1A1A0E" stroke="none">mydiio</text>
        {/* bus stop */}
        <rect x="1130" y="150" width="100" height="70" fill="#A8D8EA"/>
        <rect x="1125" y="140" width="110" height="14" fill="#1A1A0E"/>
        <circle cx="1155" cy="180" r="9" fill="#E0AC69"/>
        <rect x="1147" y="190" width="16" height="30" fill="#2196F3"/>
        <circle cx="1190" cy="180" r="9" fill="#E0AC69"/>
        <rect x="1182" y="190" width="16" height="30" fill="#E91E63"/>
        {/* fashion shop */}
        <rect x="1250" y="110" width="130" height="110" fill="#FFFFFF"/>
        <rect x="1245" y="100" width="140" height="14" fill="#4CAF72"/>
        <text x="1315" y="140" fontFamily="Fredoka One, sans-serif" fontSize="12" textAnchor="middle" fill="#1A1A0E" stroke="none">FASHION</text>
        <rect x="1265" y="155" width="25" height="55" fill="#E91E63"/>
        <rect x="1300" y="155" width="25" height="55" fill="#F7E14A"/>
        <rect x="1335" y="155" width="25" height="55" fill="#2196F3"/>
        {/* man sarong */}
        <circle cx="1400" cy="170" r="10" fill="#8B5A2B"/>
        <rect x="1392" y="180" width="16" height="14" fill="#fff"/>
        <path d="M1390,194 L1410,194 L1414,220 L1386,220 Z" fill="#2196F3"/>
        {/* palm 2 */}
        <rect x="1440" y="120" width="14" height="100" fill="#8B5A2B"/>
        <ellipse cx="1447" cy="118" rx="40" ry="14" fill="#4CAF72"/>
        <ellipse cx="1430" cy="108" rx="34" ry="12" fill="#4CAF72" transform="rotate(-25 1430 108)"/>
        <ellipse cx="1465" cy="108" rx="34" ry="12" fill="#4CAF72" transform="rotate(25 1465 108)"/>
        {/* dark mydiio billboard */}
        <rect x="1490" y="90" width="100" height="60" fill="#1A1A0E"/>
        <text x="1540" y="125" fontFamily="Fredoka One, sans-serif" fontSize="16" textAnchor="middle" fill="#F5A623" stroke="none">mydiio</text>
        {/* road */}
        <rect x="0" y="220" width="1600" height="60" fill="#3a3a3a" stroke="none"/>
        <rect x="0" y="245" width="1600" height="6" fill="#F7E14A" stroke="none"/>
      </g>
    </svg>
  );
}

// ======= AD SCREEN STATES =======
type ScreenState = {
  bg: string;
  fg: string;
  kind: "ad" | "info";
  title?: string;
  tagline?: string;
  meta?: string;
  emoji?: string;
  label?: string;
};

const SCREENS: Record<string, ScreenState> = {
  hook:    { bg: "#2196F3", fg: "#fff", kind: "ad", title: "Galle Road Pharmacy", tagline: "Your health, on every corner.", meta: "Open 7am–10pm · All branches", emoji: "💊" },
  what:    { bg: "#F5A623", fg: "#1A1A0E", kind: "info", label: "WHAT IS MYDIIO?" },
  ad:      { bg: "#FF8F00", fg: "#fff", kind: "ad", title: "Nugegoda Bakery", tagline: "Fresh bread every morning.", meta: "Nugegoda Junction · Since 1988", emoji: "🥖" },
  how:     { bg: "#4CAF72", fg: "#fff", kind: "info", label: "HOW IT WORKS" },
  pricing: { bg: "#F7E14A", fg: "#1A1A0E", kind: "info", label: "PRICING" },
  pioneer: { bg: "#F5A623", fg: "#1A1A0E", kind: "info", label: "PIONEER PROGRAMME" },
  drivers: { bg: "#4CAF72", fg: "#fff", kind: "info", label: "FOR DRIVERS" },
  waitlist:{ bg: "#1A1A0E", fg: "#F5A623", kind: "info", label: "JOIN THE WAITLIST" },
};

function AdScreen({ state }: { state: ScreenState }) {
  return (
    <div
      className="relative mx-auto rounded-[10px] overflow-hidden transition-all duration-500"
      style={{
        background: state.bg,
        color: state.fg,
        border: "8px solid #000",
        boxShadow: "0 8px 0 #000, 0 14px 30px rgba(0,0,0,.35)",
        width: "min(420px, 78vw)",
        aspectRatio: "16/10",
      }}
    >
      {/* amber inner border */}
      <div className="absolute inset-0 pointer-events-none" style={{ border: "3px solid #F5A623", borderRadius: 8 }} />
      {/* live dot */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        <span className="pulse-dot inline-block w-2.5 h-2.5 rounded-full bg-[#4CAF72]" />
        <span className="font-mono text-[9px] tracking-widest text-white/90">LIVE</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {state.kind === "ad" ? (
          <>
            <div className="text-5xl sm:text-6xl mb-1">{state.emoji}</div>
            <div className="font-display text-xl sm:text-2xl leading-tight">{state.title}</div>
            <div className="font-body font-extrabold text-sm sm:text-base opacity-95 mt-1">{state.tagline}</div>
            <div className="font-mono text-[9px] tracking-widest mt-2 opacity-80">{state.meta}</div>
          </>
        ) : (
          <>
            <div className="font-mono text-[10px] tracking-[3px] opacity-80">{state.label}</div>
            <div className="font-display text-2xl sm:text-3xl mt-2">mydiio</div>
            <div className="font-mono text-[9px] tracking-widest mt-2 opacity-70">ads on the move</div>
          </>
        )}
      </div>
      <div className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[8px] tracking-widest opacity-70">
        powered by mydiio
      </div>
    </div>
  );
}

// ======= TUK FRAME =======
function TukViewport({ skyColor, currentScreen }: { skyColor: string; currentScreen: ScreenState }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: skyColor, transition: "background 0.6s ease" }}>
      {/* street strip */}
      <div className="absolute left-0 right-0" style={{ bottom: "30%", height: "32%" }}>
        <div className="street-track flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><StreetStrip /></div>
          <div className="h-full w-1/2"><StreetStrip /></div>
        </div>
      </div>

      {/* roof lining */}
      <div className="absolute top-0 left-0 right-0 h-[68px] z-20" style={{ background: "#F5A623", borderBottom: "4px solid #1A1A0E" }} />
      {/* chevron stripe */}
      <div className="absolute left-0 right-0 z-20 h-[14px]" style={{
        top: 68,
        backgroundImage: "repeating-linear-gradient(135deg, #1A1A0E 0 14px, #F5A623 14px 28px)",
        borderBottom: "3px solid #1A1A0E",
      }} />

      {/* left bar with floral */}
      <div className="absolute top-0 bottom-0 left-0 w-[58px] z-20" style={{ background: "#F5A623", borderRight: "4px solid #1A1A0E" }}>
        <FloralPanel className="absolute bottom-0 left-0 right-0 h-[40%]" />
      </div>
      {/* right bar with floral */}
      <div className="absolute top-0 bottom-0 right-0 w-[58px] z-20" style={{ background: "#F5A623", borderLeft: "4px solid #1A1A0E" }}>
        <FloralPanel className="absolute bottom-0 left-0 right-0 h-[40%]" />
      </div>

      {/* bench seat */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "30%", borderTop: "4px solid #1A1A0E" }}>
        <FloralPanel className="absolute inset-0" />
      </div>

      {/* arm + screen */}
      <div className="absolute z-30 left-1/2 -translate-x-1/2" style={{ top: "32%" }}>
        <AdScreen state={currentScreen} />
        <div className="mx-auto mt-1 w-3 h-12 bg-[#1A1A0E] rounded-b-md" />
      </div>
    </div>
  );
}

function FloralPanel({ className = "" }: { className?: string }) {
  return (
    <div className={className} style={{
      background:
        "radial-gradient(circle at 20% 30%, #E91E63 6px, transparent 7px)," +
        "radial-gradient(circle at 60% 60%, #2196F3 6px, transparent 7px)," +
        "radial-gradient(circle at 85% 25%, #E91E63 5px, transparent 6px)," +
        "radial-gradient(circle at 35% 80%, #2196F3 5px, transparent 6px)," +
        "radial-gradient(circle at 75% 90%, #E91E63 5px, transparent 6px)," +
        "linear-gradient(#FFF0E5, #FFE4D0)",
      backgroundSize: "60px 60px, 60px 60px, 60px 60px, 60px 60px, 60px 60px, 100% 100%",
    }} />
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

  return (
    <section ref={ref} id={id} className="relative z-10 min-h-screen flex items-end sm:items-center pb-10 sm:pb-0 px-4">
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

  // sky scroll interpolation
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / max));
      // bright blue -> golden -> warm dusk
      const lerp = (a: number, b: number) => Math.round(a + (b - a) * p);
      let r: number, g: number, b: number;
      if (p < 0.5) {
        const t = p / 0.5;
        r = Math.round(168 + (255 - 168) * t);
        g = Math.round(216 + (228 - 216) * t);
        b = Math.round(234 + (176 - 234) * t);
      } else {
        const t = (p - 0.5) / 0.5;
        r = Math.round(255 + (255 - 255) * t);
        g = Math.round(228 + (170 - 228) * t);
        b = Math.round(176 + (130 - 176) * t);
      }
      setSkyColor(`rgb(${r},${g},${b})`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // hash-based tab pre-select
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
        {/* spacer so first card sits below tuk hero */}
        <div className="h-screen" />

        <Section id="hook" screenKey="hook" onEnter={setScreenKey} cardBg="#F5A623">
          <div className="eyebrow">YOU ARE THE PASSENGER</div>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            This is what your customers see. Every single ride.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(26,26,14,0.78)" }}>
            14 minutes. Captive audience. No skip button. Just your brand on the screen, and Colombo rushing by outside.
          </p>
          <div className="mt-5 flex gap-2">
            <Stat n="14 min" label="Avg ride time" />
            <Stat n="0" label="Skip buttons" />
            <Stat n="100%" label="Undivided attn" />
          </div>
        </Section>

        <Section id="what" screenKey="what" onEnter={setScreenKey} cardBg="#1A1A0E" cardFg="#FFF9ED">
          <div className="eyebrow">WHAT IS MYDIIO?</div>
          <h2 className="font-display mt-3" style={{ color: "#F5A623", fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.05 }}>
            Sri Lanka’s first cloud-managed tuk-tuk ad platform.
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
            Pharmacy, bakery, clothing, food — whatever your business, your ad plays to real Colombo passengers sitting exactly where you’re sitting right now.
          </p>
          <div className="mt-5 space-y-3">
            {[
              ["📍", "GPS-verified impressions — you see exactly where and when your ad played"],
              ["🎬", "14 days completely free — you only pay after you’ve seen it work"],
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
              ["Send your ad", "15–30 second video or image. We’ll create it free if you need help."],
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
            Whether you’re a business wanting to advertise or a driver wanting to earn — sign up and we’ll WhatsApp you within 24 hours.
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
              <div className="font-display text-[26px] mt-2" style={{ color: "#F5A623" }}>You’re on the ride!</div>
              <div className="font-body text-[14px] mt-2" style={{ color: "rgba(255,249,237,0.65)" }}>
                We’ll WhatsApp you within 24 hours. Welcome to mydiio.
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
