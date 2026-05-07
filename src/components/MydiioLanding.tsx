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

// ======= TUK SVG (side view, facing left) =======
function TukSVG({ children }: { children?: React.ReactNode }) {
  // viewBox 0 0 400 220. The mydiio screen rectangle lives at x=120 y=78 w=70 h=46
  return (
    <div className="relative" style={{ width: "min(380px, 88vw)", aspectRatio: "400/220" }}>
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        <g stroke="#1A1A0E" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {/* ground shadow */}
          <ellipse cx="200" cy="195" rx="170" ry="9" fill="rgba(0,0,0,0.25)" stroke="none" />

          {/* ROOF — dark, overhanging, rounded front */}
          <path
            d="M 30 60
               L 270 60
               Q 320 60 340 80
               L 360 95
               Q 365 100 360 105
               L 340 105
               Q 325 95 305 95
               L 30 95
               Z"
            fill="#2A2A2A"
          />
          {/* roof highlight */}
          <path d="M 40 65 L 265 65 Q 305 65 320 80" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />

          {/* BODY — bright yellow */}
          <path
            d="M 30 95
               L 305 95
               Q 320 95 330 108
               L 350 125
               Q 358 135 358 150
               L 358 175
               L 30 175
               Z"
            fill="#F5C200"
          />

          {/* DRIVER section: green-tinted windshield (right) */}
          <path
            d="M 232 100
               L 305 100
               Q 318 100 326 112
               L 342 128
               L 342 150
               L 232 150
               Z"
            fill="#9FD8B4"
            opacity="0.92"
          />
          {/* windshield frame line */}
          <line x1="232" y1="100" x2="232" y2="150" stroke="#1A1A0E" strokeWidth="3" />
          {/* driver silhouette */}
          <circle cx="290" cy="128" r="11" fill="#7A4B2A" stroke="#1A1A0E" strokeWidth="2" />
          <path d="M 278 142 Q 290 138 302 142 L 305 152 L 275 152 Z" fill="#1A1A0E" />
          {/* steering wheel hint */}
          <circle cx="270" cy="148" r="5" fill="none" stroke="#1A1A0E" strokeWidth="2" />

          {/* Front nose detail */}
          <path d="M 330 108 L 350 125 Q 358 135 358 150 L 348 150 Q 348 138 342 130 L 326 114 Z" fill="#1A1A0E" opacity="0.15" stroke="none" />

          {/* Headlight */}
          <circle cx="346" cy="158" r="7" fill="#E8E8E8" />
          <circle cx="346" cy="158" r="3.5" fill="#FFE066" stroke="none" />

          {/* Orange indicator */}
          <rect x="338" y="138" width="10" height="6" rx="2" fill="#FF8F00" />

          {/* PASSENGER COMPARTMENT — open left side */}
          {/* black door arch */}
          <path d="M 30 95 L 30 175 L 38 175 L 38 102 L 222 102 L 222 175 L 230 175 L 230 95 Z" fill="#1A1A0E" stroke="none" />
          {/* interior back wall */}
          <rect x="38" y="102" width="184" height="73" fill="#3a2a1a" />
          {/* interior floor */}
          <rect x="38" y="160" width="184" height="15" fill="#1A1A0E" />
          {/* seat cushion */}
          <rect x="48" y="135" width="160" height="22" rx="4" fill="#5A3A1A" stroke="#1A1A0E" strokeWidth="2" />

          {/* PASSENGER (visible, brown jacket, dark hair, leaning fwd, facing left) */}
          {/* head */}
          <circle cx="150" cy="120" r="11" fill="#D2A679" stroke="#1A1A0E" strokeWidth="2" />
          {/* hair */}
          <path d="M 140 116 Q 150 106 160 116 L 159 122 Q 150 117 141 122 Z" fill="#1A1A0E" stroke="none" />
          {/* eye */}
          <circle cx="143" cy="121" r="1.2" fill="#1A1A0E" stroke="none" />
          {/* small smile */}
          <path d="M 141 125 Q 144 127 147 125" fill="none" stroke="#1A1A0E" strokeWidth="1.2" />
          {/* brown jacket — leaning forward */}
          <path d="M 132 132 Q 150 128 168 132 L 175 158 L 125 158 Z" fill="#8B5A2B" stroke="#1A1A0E" strokeWidth="2" />
          {/* shirt collar */}
          <path d="M 145 132 L 150 140 L 155 132" fill="#A8D8EA" stroke="#1A1A0E" strokeWidth="1.5" />
          {/* arm leaning */}
          <path d="M 165 138 Q 180 142 188 152" fill="none" stroke="#1A1A0E" strokeWidth="2" />

          {/* MYDIIO SCREEN — black rectangular panel on interior left wall */}
          {/* bezel */}
          <rect x="48" y="106" width="78" height="50" rx="3" fill="#0a0a0a" />
          {/* screen content rendered via foreignObject */}
          <foreignObject x="51" y="109" width="72" height="44">
            <div style={{ width: "100%", height: "100%", borderRadius: 2, overflow: "hidden" }}>
              {children}
            </div>
          </foreignObject>
          {/* screen mount arm */}
          <rect x="46" y="98" width="4" height="10" fill="#1A1A0E" stroke="none" />

          {/* Footboard / step */}
          <rect x="34" y="175" width="200" height="8" fill="#1A1A0E" stroke="none" />
          <rect x="34" y="175" width="200" height="8" fill="none" />

          {/* FRONT WHEEL (right) */}
          <circle cx="310" cy="180" r="26" fill="#1A1A0E" />
          <circle cx="310" cy="180" r="22" fill="#2a2a2a" />
          <circle cx="310" cy="180" r="14" fill="#2196F3" />
          <circle cx="310" cy="180" r="9" fill="#1A1A0E" />
          <circle cx="310" cy="180" r="3" fill="#A8D8EA" stroke="none" />
          {/* tread marks */}
          {[0, 60, 120, 180, 240, 300].map(a => (
            <line key={a} x1="310" y1="180" x2={310 + 24 * Math.cos(a * Math.PI/180)} y2={180 + 24 * Math.sin(a * Math.PI/180)} stroke="#1A1A0E" strokeWidth="2" />
          ))}

          {/* REAR WHEEL (left, partially visible) */}
          <circle cx="80" cy="180" r="22" fill="#1A1A0E" />
          <circle cx="80" cy="180" r="18" fill="#2a2a2a" />
          <circle cx="80" cy="180" r="11" fill="#2196F3" />
          <circle cx="80" cy="180" r="6" fill="#1A1A0E" />
          <circle cx="80" cy="180" r="2" fill="#A8D8EA" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

// ======= PARALLAX LAYERS =======
function SkylineLayer() {
  // Background — Colombo skyline silhouette
  return (
    <svg viewBox="0 0 1200 200" className="block h-full w-auto" preserveAspectRatio="xMinYMax meet">
      <g>
        {/* mountains */}
        <path d="M0,140 L120,80 L220,120 L320,70 L440,130 L560,90 L680,140 L800,100 L920,135 L1040,85 L1200,130 L1200,200 L0,200 Z" fill="#6BA8C4" opacity="0.55" />
        {/* buildings */}
        {[
          [40,90,60,'#3a4a6a'],[110,70,50,'#2a3a5a'],[170,100,80,'#5a4a6a'],[260,60,55,'#3a3a5a'],
          [325,85,70,'#4a5a7a'],[405,75,40,'#2a3a5a'],[455,55,90,'#3a4a6a'],[555,90,60,'#5a4a6a'],
          [625,70,50,'#3a3a5a'],[685,80,75,'#4a5a7a'],[770,60,45,'#2a3a5a'],[825,95,70,'#3a4a6a'],
          [905,75,55,'#5a4a6a'],[970,65,80,'#3a3a5a'],[1060,85,60,'#4a5a7a'],[1130,70,55,'#2a3a5a'],
        ].map(([x,y,h,c], i) => (
          <g key={i}>
            <rect x={x as number} y={y as number} width="50" height={h as number} fill={c as string} />
            {/* lit windows */}
            {Array.from({ length: 6 }).map((_, j) => (
              <rect key={j} x={(x as number) + 6 + (j%2)*22} y={(y as number) + 8 + Math.floor(j/2)*14} width="10" height="6" fill={((i * 7 + j * 3) % 5) > 1 ? "#FFE066" : "#1A1A0E"} opacity="0.85" />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

function MidgroundLayer() {
  return (
    <svg viewBox="0 0 1600 220" className="block h-full w-auto" preserveAspectRatio="xMinYMax meet">
      <g stroke="#1A1A0E" strokeWidth="2.5" strokeLinejoin="round">
        {/* palm 1 */}
        <rect x="40" y="100" width="10" height="120" fill="#7A4B2A" />
        <ellipse cx="45" cy="98" rx="34" ry="11" fill="#3D8B5A" />
        <ellipse cx="28" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(-25 28 92)" />
        <ellipse cx="62" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(25 62 92)" />
        <circle cx="45" cy="105" r="4" fill="#F5A623" />

        {/* PHARMACY shopfront — blue */}
        <rect x="100" y="120" width="130" height="100" fill="#FFFFFF" />
        <polygon points="92,120 238,120 228,90 102,90" fill="#2196F3" />
        <rect x="158" y="95" width="14" height="20" fill="#fff" stroke="none" />
        <rect x="151" y="102" width="28" height="6" fill="#fff" stroke="none" />
        <text x="165" y="146" fontFamily="Fredoka One, sans-serif" fontSize="14" textAnchor="middle" fill="#1A1A0E" stroke="none">PHARMACY</text>
        <rect x="115" y="160" width="40" height="55" fill="#A8D8EA" />
        <rect x="170" y="160" width="50" height="55" fill="#A8D8EA" />

        {/* lamp post */}
        <rect x="260" y="80" width="5" height="140" fill="#1A1A0E" />
        <circle cx="262.5" cy="78" r="9" fill="#FFE066" />

        {/* BAKERY — orange awning */}
        <rect x="290" y="130" width="140" height="90" fill="#FFF9ED" />
        <path d="M280,130 L440,130 L430,100 L290,100 Z" fill="#FF8F00" />
        <path d="M280,130 L295,100 L305,130 L315,100 L325,130 L335,100 L345,130 L355,100 L365,130 L375,100 L385,130 L395,100 L405,130 L415,100 L425,130 L435,100 L440,130" fill="#FFD699" />
        <text x="360" y="160" fontFamily="Fredoka One, sans-serif" fontSize="13" textAnchor="middle" fill="#1A1A0E" stroke="none">BAKERY</text>
        <rect x="305" y="170" width="50" height="50" fill="#A8D8EA" />
        <rect x="370" y="170" width="50" height="50" fill="#A8D8EA" />

        {/* mydiio billboard on posts */}
        <rect x="465" y="50" width="150" height="70" fill="#F5A623" />
        <text x="540" y="92" fontFamily="Fredoka One, sans-serif" fontSize="22" textAnchor="middle" fill="#1A1A0E" stroke="none">mydiio</text>
        <rect x="478" y="120" width="6" height="100" fill="#1A1A0E" />
        <rect x="596" y="120" width="6" height="100" fill="#1A1A0E" />

        {/* palm 2 */}
        <rect x="640" y="100" width="10" height="120" fill="#7A4B2A" />
        <ellipse cx="645" cy="98" rx="34" ry="11" fill="#3D8B5A" />
        <ellipse cx="628" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(-25 628 92)" />
        <ellipse cx="662" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(25 662 92)" />

        {/* KOVIL gopuram */}
        <rect x="700" y="130" width="120" height="90" fill="#FFDAC1" />
        <polygon points="690,130 830,130 820,95 700,95" fill="#E91E63" />
        <polygon points="715,95 805,95 800,70 720,70" fill="#F5A623" />
        <polygon points="735,70 785,70 775,50 745,50" fill="#E91E63" />
        <polygon points="755,50 765,50 760,35" fill="#F7E14A" />
        <rect x="750" y="170" width="20" height="50" fill="#1A1A0E" />

        {/* FASHION shop pink */}
        <rect x="860" y="120" width="130" height="100" fill="#FFFFFF" />
        <rect x="855" y="105" width="140" height="18" fill="#E91E63" />
        <text x="925" y="119" fontFamily="Fredoka One, sans-serif" fontSize="11" textAnchor="middle" fill="#fff" stroke="none">FASHION</text>
        <rect x="875" y="160" width="30" height="55" fill="#F7E14A" />
        <rect x="912" y="160" width="30" height="55" fill="#2196F3" />
        <rect x="950" y="160" width="30" height="55" fill="#E91E63" />

        {/* lamp 2 */}
        <rect x="1010" y="80" width="5" height="140" fill="#1A1A0E" />
        <circle cx="1012.5" cy="78" r="9" fill="#FFE066" />

        {/* second mydiio billboard — dark */}
        <rect x="1050" y="60" width="120" height="70" fill="#1A1A0E" />
        <text x="1110" y="103" fontFamily="Fredoka One, sans-serif" fontSize="20" textAnchor="middle" fill="#F5A623" stroke="none">mydiio</text>
        <rect x="1063" y="130" width="6" height="90" fill="#1A1A0E" />
        <rect x="1151" y="130" width="6" height="90" fill="#1A1A0E" />

        {/* palm 3 */}
        <rect x="1200" y="100" width="10" height="120" fill="#7A4B2A" />
        <ellipse cx="1205" cy="98" rx="34" ry="11" fill="#3D8B5A" />
        <ellipse cx="1188" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(-25 1188 92)" />
        <ellipse cx="1222" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(25 1222 92)" />

        {/* small shopfront teal */}
        <rect x="1250" y="125" width="130" height="95" fill="#FFFFFF" />
        <rect x="1245" y="110" width="140" height="18" fill="#4CAF72" />
        <text x="1315" y="124" fontFamily="Fredoka One, sans-serif" fontSize="11" textAnchor="middle" fill="#fff" stroke="none">KOTTU</text>
        <rect x="1265" y="160" width="50" height="55" fill="#A8D8EA" />
        <rect x="1325" y="160" width="50" height="55" fill="#A8D8EA" />

        {/* lamp 3 */}
        <rect x="1430" y="80" width="5" height="140" fill="#1A1A0E" />
        <circle cx="1432.5" cy="78" r="9" fill="#FFE066" />

        {/* palm 4 */}
        <rect x="1490" y="100" width="10" height="120" fill="#7A4B2A" />
        <ellipse cx="1495" cy="98" rx="34" ry="11" fill="#3D8B5A" />
        <ellipse cx="1478" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(-25 1478 92)" />
        <ellipse cx="1512" cy="92" rx="28" ry="9" fill="#3D8B5A" transform="rotate(25 1512 92)" />
      </g>
    </svg>
  );
}

function ForegroundLayer() {
  // pavement edge + barrier rails
  return (
    <svg viewBox="0 0 800 80" className="block h-full w-auto" preserveAspectRatio="xMinYMax meet">
      <g stroke="#1A1A0E" strokeWidth="2" strokeLinejoin="round">
        {/* posts */}
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={i * 50 + 10} y="20" width="6" height="60" fill="#9aa0a6" />
        ))}
        {/* top rail */}
        <rect x="0" y="20" width="800" height="6" fill="#c0c4ca" />
        {/* mid rail */}
        <rect x="0" y="42" width="800" height="4" fill="#c0c4ca" />
      </g>
    </svg>
  );
}

// ======= TUK VIEWPORT =======
function TukViewport({ skyColor, currentScreen }: { skyColor: string; currentScreen: ScreenState }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{
      background: `linear-gradient(to bottom, ${skyColor} 0%, ${skyColor} 55%, #c9c9c9 55%, #8A8A8A 100%)`,
      transition: "background 0.6s ease",
    }}>
      {/* Layer 1 — skyline (slow) */}
      <div className="absolute inset-x-0" style={{ bottom: "30%", height: "30%", opacity: 0.95 }}>
        <div className="street-track-slow flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><SkylineLayer /></div>
          <div className="h-full w-1/2"><SkylineLayer /></div>
        </div>
      </div>

      {/* Layer 2 — midground shops, palms, kovil (medium) */}
      <div className="absolute inset-x-0" style={{ bottom: "20%", height: "32%" }}>
        <div className="street-track-mid flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><MidgroundLayer /></div>
          <div className="h-full w-1/2"><MidgroundLayer /></div>
        </div>
      </div>

      {/* Pavement strip */}
      <div className="absolute inset-x-0" style={{ bottom: "20%", height: "3%", background: "#b8b8b8", borderTop: "3px solid #1A1A0E", borderBottom: "2px solid #5A5A5A" }} />

      {/* Layer 3 — foreground barrier (fast) */}
      <div className="absolute inset-x-0 z-20" style={{ bottom: "20%", height: "10%" }}>
        <div className="street-track-fast flex h-full" style={{ width: "200%" }}>
          <div className="h-full w-1/2"><ForegroundLayer /></div>
          <div className="h-full w-1/2"><ForegroundLayer /></div>
        </div>
      </div>

      {/* Road dashes */}
      <div className="absolute inset-x-0 z-10" style={{ bottom: "10%", height: "4px" }}>
        <div className="street-track-fast h-full" style={{
          width: "200%",
          backgroundImage: "repeating-linear-gradient(90deg, #FFFFFF 0 36px, transparent 36px 72px)",
        }} />
      </div>

      {/* THE TUK — fixed in lower portion */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30 tuk-bob" style={{ bottom: "5%" }}>
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
