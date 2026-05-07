import { useEffect, useRef, useState } from "react";

const SECTION_COLORS = [
  "#2196F3",
  "#F5A623",
  "#FF8F00",
  "#4CAF72",
  "#F7E14A",
  "#F5A623",
  "#4CAF72",
  "#1A1A0E",
];

export default function MydiioLanding() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [screenColor, setScreenColor] = useState(SECTION_COLORS[0]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (farRef.current) farRef.current.style.transform = `translate3d(${-y * 0.2}px,0,0)`;
        if (midRef.current) midRef.current.style.transform = `translate3d(${-y * 0.5}px,0,0)`;
        if (railRef.current) railRef.current.style.transform = `translate3d(${-y * 0.8}px,0,0)`;
        if (dashRef.current) dashRef.current.style.transform = `translate3d(${-y * 1.4}px,0,0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-idx]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-section-idx"));
            setScreenColor(SECTION_COLORS[idx] ?? SECTION_COLORS[0]);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative bg-[#5BB8F5]">
      {/* Sticky hero scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "#5BB8F5" }}>
        {/* Sky clouds */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <div className="absolute top-[10%] left-0 w-[200%] cloud-drift">
            <Cloud style={{ position: "absolute", left: "5%", top: 0 }} />
            <Cloud style={{ position: "absolute", left: "40%", top: "30px" }} scale={0.7} />
            <Cloud style={{ position: "absolute", left: "70%", top: "10px" }} scale={1.2} />
          </div>
        </div>

        {/* Mountains */}
        <div ref={farRef} className="absolute left-0 bottom-[22%] w-[500vw] h-[35vh] will-change-transform" style={{ zIndex: 2 }}>
          <Mountains />
        </div>

        {/* Midground city */}
        <div ref={midRef} className="absolute left-0 bottom-[22%] w-[500vw] h-[55vh] will-change-transform" style={{ zIndex: 3 }}>
          <Midground />
        </div>

        {/* Tuk */}
        <div className="absolute left-1/2 bottom-[16%] -translate-x-1/2" style={{ zIndex: 4, width: "min(520px, 80vw)" }}>
          <TukSvg screenColor={screenColor} />
        </div>

        {/* Road */}
        <div className="absolute left-0 bottom-0 w-full h-[22%]" style={{ background: "#3A3A3A", zIndex: 6 }}>
          {/* Kerb */}
          <div className="absolute top-0 left-0 w-full h-[14px] flex">
            {Array.from({ length: 200 }).map((_, i) => (
              <div key={i} className="h-full" style={{ width: 24, background: i % 2 === 0 ? "#E53935" : "#fff" }} />
            ))}
          </div>
          {/* Dashes */}
          <div ref={dashRef} className="absolute left-0 top-1/2 w-[600vw] h-[8px] flex gap-[64px] will-change-transform dash-loop" style={{ zIndex: 7 }}>
            {Array.from({ length: 200 }).map((_, i) => (
              <div key={i} className="h-full bg-white" style={{ width: 64, flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/* Foreground railing */}
        <div ref={railRef} className="absolute left-0 bottom-[18%] w-[500vw] h-[60px] will-change-transform" style={{ zIndex: 8 }}>
          <Railing />
        </div>

        {/* Nav placeholder */}
        <nav className="absolute top-0 left-0 w-full px-6 py-4 flex items-center justify-between" style={{ zIndex: 50 }}>
          <div className="font-display text-2xl text-[#1A1A0E] bg-[#F5A623] px-3 py-1 rounded-full border-[3px] border-[#1A1A0E]">
            mydiio
          </div>
          <div className="text-[#1A1A0E] font-mono text-xs uppercase tracking-widest">Colombo · Sri Lanka</div>
        </nav>

        {/* Hero text */}
        <div className="absolute bottom-[26%] left-0 w-full text-center px-4 pointer-events-none" style={{ zIndex: 9 }}>
          <div className="eyebrow mb-3">Ads on the Move</div>
          <h1 className="font-display text-4xl md:text-6xl text-[#1A1A0E] drop-shadow-sm">
            Sri Lanka's tuk-tuks,<br />now on screen.
          </h1>
        </div>
      </div>

      {/* Placeholder scroll sections */}
      {SECTION_COLORS.map((_, i) => (
        <section key={i} data-section-idx={i} className="h-screen w-full" />
      ))}

      <style>{`
        @keyframes tukIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .tuk-svg { animation: tukIdle 0.85s ease-in-out infinite; }
        @keyframes wheelSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rear-wheel { transform-origin: 110px 248px; animation: wheelSpin 1.1s linear infinite; transform-box: fill-box; }
        .front-wheel { transform-origin: 415px 252px; animation: wheelSpin 1.1s linear infinite; transform-box: fill-box; }
        @keyframes cloudDrift { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cloud-drift { animation: cloudDrift 80s linear infinite; }
        @keyframes dashLoop { from { margin-left: 0; } to { margin-left: -128px; } }
        .dash-loop { animation: dashLoop 0.8s linear infinite; }
        @media (max-width: 768px) {
          h1 { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}

function Cloud({ style, scale = 1 }: { style?: React.CSSProperties; scale?: number }) {
  return (
    <svg width={120 * scale} height={50 * scale} viewBox="0 0 120 50" style={style}>
      <ellipse cx="30" cy="30" rx="25" ry="18" fill="#fff" />
      <ellipse cx="60" cy="22" rx="28" ry="20" fill="#fff" />
      <ellipse cx="90" cy="30" rx="22" ry="16" fill="#fff" />
    </svg>
  );
}

function TukSvg({ screenColor }: { screenColor: string }) {
  return (
    <svg viewBox="0 0 520 320" className="w-full h-auto tuk-svg" style={{ overflow: "visible" }}>
      {/* Ground shadow */}
      <ellipse cx="260" cy="285" rx="200" ry="12" fill="rgba(0,0,0,0.18)" />

      {/* Roof */}
      <rect x="60" y="40" width="310" height="55" rx="8" fill="#2D2D2D" />
      <rect x="60" y="88" width="310" height="8" fill="#1A1A0E" opacity="0.4" />
      <circle cx="200" cy="40" r="8" fill="#1A1A0E" />

      {/* Rear body panel */}
      <rect x="55" y="92" width="90" height="130" rx="4" fill="#F5A623" stroke="#1A1A0E" strokeWidth="2.5" />

      {/* Front body panel */}
      <path d="M 280,92 L 420,92 L 420,185 Q 400,200 360,205 L 280,200 Z" fill="#F5A623" stroke="#1A1A0E" strokeWidth="2.5" />

      {/* Passenger compartment open area */}
      <rect x="148" y="92" width="132" height="130" fill="rgba(180,220,255,0.15)" />

      {/* Cage bars */}
      <rect x="148" y="92" width="139" height="7" fill="#1A1A0E" rx="2" />
      <rect x="148" y="92" width="7" height="130" fill="#1A1A0E" rx="2" />
      <rect x="192" y="92" width="7" height="130" fill="#1A1A0E" rx="2" />
      <rect x="236" y="92" width="7" height="130" fill="#1A1A0E" rx="2" />
      <rect x="280" y="92" width="7" height="130" fill="#1A1A0E" rx="2" />

      {/* Footboard */}
      <rect x="148" y="218" width="132" height="14" rx="3" fill="#E8920A" stroke="#1A1A0E" strokeWidth="2" />

      {/* Driver windshield */}
      <path d="M 292,96 L 405,96 L 405,175 L 292,175 Z" fill="rgba(180,220,255,0.5)" stroke="#1A1A0E" strokeWidth="2.5" />
      <path d="M 292,96 L 405,96 L 405,118 L 292,118 Z" fill="rgba(100,160,220,0.25)" />

      {/* Front nose panel */}
      <path d="M 405,96 L 440,105 L 445,185 L 405,185 Z" fill="#E8920A" stroke="#1A1A0E" strokeWidth="2" />

      {/* Indicator */}
      <rect x="420" y="148" width="20" height="10" rx="3" fill="#FF8F00" stroke="#1A1A0E" strokeWidth="1.5" />

      {/* Headlight */}
      <circle cx="438" cy="165" r="14" fill="#FFFDE7" stroke="#1A1A0E" strokeWidth="2.5" />
      <circle cx="438" cy="165" r="8" fill="#fff" />

      {/* Front fender */}
      <path d="M 380,200 Q 430,195 460,210 Q 465,235 445,245 Q 410,248 390,240 Q 368,225 380,200 Z" fill="#F5A623" stroke="#1A1A0E" strokeWidth="2.5" />

      {/* Passenger woman */}
      <ellipse cx="185" cy="185" rx="22" ry="28" fill="#8B4513" />
      <ellipse cx="185" cy="135" rx="18" ry="10" fill="#1A1A0E" />
      <circle cx="185" cy="148" r="18" fill="#D4956A" stroke="#1A1A0E" strokeWidth="1.5" />
      <ellipse cx="179" cy="148" rx="2" ry="2" fill="#1A1A0E" />
      <ellipse cx="189" cy="148" rx="2" ry="2" fill="#1A1A0E" />
      <ellipse cx="184" cy="153" rx="2" ry="1.5" fill="#C17A45" />
      <path d="M 180,158 Q 184,163 188,158" stroke="#1A1A0E" strokeWidth="1.5" fill="none" />
      <path d="M 198,138 Q 205,132 202,128 Q 198,124 193,130 Z" fill="#1A1A0E" />
      <path d="M 170,175 Q 165,190 170,205" stroke="#D4956A" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 200,175 Q 205,190 200,205" stroke="#D4956A" strokeWidth="8" fill="none" strokeLinecap="round" />

      {/* Phone screen */}
      <rect
        x="162" y="195" width="46" height="32" rx="4"
        fill={screenColor}
        stroke="#1A1A0E" strokeWidth="2"
        style={{ transition: "fill 0.5s ease" }}
      />
      <text x="185" y="208" fontFamily="Fredoka One, sans-serif" fontSize="7" fill="white" textAnchor="middle">mydiio</text>
      <text x="185" y="220" fontFamily="Fredoka One, sans-serif" fontSize="5" fill="white" textAnchor="middle">LIVE ●</text>

      {/* Driver man */}
      <ellipse cx="345" cy="185" rx="24" ry="28" fill="#CC3333" />
      <ellipse cx="345" cy="136" rx="17" ry="9" fill="#1A1A0E" />
      <circle cx="345" cy="148" r="17" fill="#C17A45" stroke="#1A1A0E" strokeWidth="1.5" />
      <ellipse cx="353" cy="148" rx="2" ry="2" fill="#1A1A0E" />
      <path d="M 360,178 Q 378,182 390,178" stroke="#C17A45" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="322" y="205" width="46" height="35" rx="4" fill="#3B5998" />

      {/* Rear wheel */}
      <g className="rear-wheel">
        <circle cx="110" cy="248" r="38" fill="#1A1A0E" stroke="#1A1A0E" strokeWidth="3" />
        <circle cx="110" cy="248" r="30" fill="#2A2A2A" />
        <circle cx="110" cy="248" r="22" fill="#888888" stroke="#666" strokeWidth="1.5" />
        <circle cx="110" cy="248" r="14" fill="#C0C0C0" stroke="#888" strokeWidth="1.5" />
        <line x1="110" y1="226" x2="110" y2="270" stroke="#888" strokeWidth="2" />
        <line x1="88" y1="248" x2="132" y2="248" stroke="#888" strokeWidth="2" />
        <line x1="94" y1="232" x2="126" y2="264" stroke="#888" strokeWidth="2" />
        <line x1="94" y1="264" x2="126" y2="232" stroke="#888" strokeWidth="2" />
        <circle cx="110" cy="248" r="6" fill="#666666" />
      </g>

      {/* Front wheel */}
      <g className="front-wheel">
        <circle cx="415" cy="252" r="34" fill="#1A1A0E" stroke="#1A1A0E" strokeWidth="3" />
        <circle cx="415" cy="252" r="27" fill="#2A2A2A" />
        <circle cx="415" cy="252" r="20" fill="#888888" stroke="#666" strokeWidth="1.5" />
        <circle cx="415" cy="252" r="13" fill="#C0C0C0" stroke="#888" strokeWidth="1.5" />
        <line x1="415" y1="232" x2="415" y2="272" stroke="#888" strokeWidth="2" />
        <line x1="395" y1="252" x2="435" y2="252" stroke="#888" strokeWidth="2" />
        <line x1="401" y1="238" x2="429" y2="266" stroke="#888" strokeWidth="2" />
        <line x1="401" y1="266" x2="429" y2="238" stroke="#888" strokeWidth="2" />
        <circle cx="415" cy="252" r="5" fill="#666666" />
      </g>
    </svg>
  );
}

function Mountains() {
  return (
    <svg viewBox="0 0 4000 400" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <pattern id="mtn" x="0" y="0" width="1000" height="400" patternUnits="userSpaceOnUse">
          <path d="M0,400 L0,250 Q150,80 300,200 Q450,300 600,150 Q750,40 900,220 L1000,180 L1000,400 Z" fill="#7A9BB0" />
          <path d="M100,400 L100,300 Q250,200 400,260 Q550,310 700,240 Q850,180 1000,280 L1000,400 Z" fill="#8FAEC0" opacity="0.85" />
        </pattern>
      </defs>
      <rect width="4000" height="400" fill="url(#mtn)" />
    </svg>
  );
}

function Midground() {
  return (
    <svg viewBox="0 0 4000 600" preserveAspectRatio="xMinYMax meet" className="w-full h-full">
      <defs>
        <pattern id="city" x="0" y="0" width="1600" height="600" patternUnits="userSpaceOnUse">
          {/* Buildings */}
          <Building x={20} y={180} w={120} h={420} fill="#2A3A4A" windows />
          <Building x={160} y={260} w={140} h={340} fill="#E8745A" />
          <Building x={320} y={220} w={110} h={380} fill="#2D8A8A" windows />
          <Building x={450} y={300} w={130} h={300} fill="#6B4C8A" />
          <Building x={600} y={250} w={120} h={350} fill="#F5C842" windows />
          <Building x={740} y={200} w={150} h={400} fill="#FFFFFF" arches />
          <Building x={920} y={280} w={120} h={320} fill="#2A3A4A" windows />
          <Building x={1060} y={240} w={140} h={360} fill="#E8745A" />
          <Building x={1220} y={220} w={130} h={380} fill="#2D8A8A" windows />
          <Building x={1380} y={280} w={140} h={320} fill="#6B4C8A" />

          {/* Shops */}
          <Shop x={40} y={500} w={120} label="PHARMACY" roof="#1565C0" cross />
          <Shop x={200} y={500} w={140} label="BAKERY" roof="#FF7043" stripes />
          <Shop x={380} y={500} w={120} label="FASHION" roof="#E91E63" />
          <FoodCart x={550} y={510} />
          <Shop x={720} y={500} w={110} label="TEA" roof="#4CAF72" />
          <Shop x={1100} y={500} w={120} label="PHARMACY" roof="#1565C0" cross />
          <Shop x={1280} y={500} w={140} label="BAKERY" roof="#FF7043" stripes />

          {/* Palms */}
          <Palm x={150} y={500} />
          <Palm x={520} y={490} h={120} />
          <Palm x={880} y={500} />
          <Palm x={1340} y={490} h={120} />

          {/* Lamp posts */}
          <LampPost x={350} />
          <LampPost x={900} />
          <LampPost x={1450} />

          {/* Billboard */}
          <g transform="translate(820,360)">
            <rect x="-2" y="0" width="4" height="100" fill="#1A1A0E" />
            <rect x="-70" y="-50" width="140" height="60" fill="#F5A623" stroke="#1A1A0E" strokeWidth="3" rx="4" />
            <text x="0" y="-22" textAnchor="middle" fontFamily="Fredoka One, sans-serif" fontSize="18" fill="#1A1A0E">mydiio</text>
            <text x="0" y="-4" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="9" fontWeight="800" fill="#1A1A0E">Ads on the Move.</text>
          </g>

          {/* People */}
          <Person x={420} y={560} color="#6B4C8A" />
          <Person x={1000} y={560} color="#FFFFFF" />
        </pattern>
      </defs>
      <rect width="4000" height="600" fill="url(#city)" />
    </svg>
  );
}

function Building({
  x, y, w, h, fill, windows, arches,
}: { x: number; y: number; w: number; h: number; fill: string; windows?: boolean; arches?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="#1A1A0E" strokeWidth="2" />
      {windows &&
        Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={x + 14 + col * ((w - 28) / 3)}
              y={y + 20 + row * ((h - 40) / 5)}
              width={(w - 40) / 4}
              height={14}
              fill="#F7E14A"
              stroke="#1A1A0E"
              strokeWidth="1"
            />
          ))
        )}
      {arches &&
        Array.from({ length: 3 }).map((_, i) => (
          <path
            key={i}
            d={`M${x + 18 + i * ((w - 36) / 3)},${y + 60} a14,18 0 0 1 28,0 l0,30 l-28,0 z`}
            fill="#A8D8EA"
            stroke="#1A1A0E"
            strokeWidth="1.5"
          />
        ))}
    </g>
  );
}

function Shop({
  x, y, w, label, roof, cross, stripes,
}: { x: number; y: number; w: number; label: string; roof: string; cross?: boolean; stripes?: boolean }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x + w},${y} ${x + w / 2},${y - 30}`} fill={roof} stroke="#1A1A0E" strokeWidth="2" />
      {stripes && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={x + (i * w) / 4} y={y - 30 + i * 7} width={w / 4} height={6} fill={i % 2 ? "#fff" : roof} />
          ))}
        </g>
      )}
      <rect x={x} y={y} width={w} height={70} fill="#fff" stroke="#1A1A0E" strokeWidth="2" />
      {cross && (
        <g transform={`translate(${x + w / 2 - 5},${y + 18})`}>
          <rect x="0" y="-4" width="10" height="18" fill="#E53935" />
          <rect x="-4" y="2" width="18" height="6" fill="#E53935" />
        </g>
      )}
      <text x={x + w / 2} y={y + 55} textAnchor="middle" fontFamily="Fredoka One, sans-serif" fontSize="11" fill="#1A1A0E">
        {label}
      </text>
    </g>
  );
}

function FoodCart({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y - 30} width="100" height="50" fill="#F5A623" stroke="#1A1A0E" strokeWidth="2" rx="4" />
      <rect x={x + 10} y={y - 55} width="80" height="22" fill="#fff" stroke="#1A1A0E" strokeWidth="2" />
      <text x={x + 50} y={y - 40} textAnchor="middle" fontFamily="Fredoka One, sans-serif" fontSize="13" fill="#E53935">KOTTU!</text>
      {/* Steam */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 30 + i * 20} cy={y - 70} r="6" fill="#fff" opacity="0.7">
          <animate attributeName="cy" values={`${y - 70};${y - 95}`} dur="2.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  );
}

function Palm({ x, y, h = 140 }: { x: number; y: number; h?: number }) {
  return (
    <g>
      <rect x={x - 4} y={y - h} width="8" height={h} fill="#5D4037" />
      <ellipse cx={x - 18} cy={y - h} rx="22" ry="8" fill="#2D8A4E" />
      <ellipse cx={x + 18} cy={y - h} rx="22" ry="8" fill="#2D8A4E" />
      <ellipse cx={x} cy={y - h - 10} rx="20" ry="9" fill="#4CAF72" />
      <circle cx={x - 4} cy={y - h + 6} r="3" fill="#F5A623" />
      <circle cx={x + 4} cy={y - h + 6} r="3" fill="#F5A623" />
    </g>
  );
}

function LampPost({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 1.5} y={420} width="3" height="180" fill="#1A1A0E" />
      <circle cx={x} cy={418} r="8" fill="#F7E14A" stroke="#1A1A0E" strokeWidth="1.5" />
    </g>
  );
}

function Person({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 30} r="6" fill="#D9A074" />
      <rect x={x - 7} y={y - 24} width="14" height="20" fill={color} />
      <rect x={x - 6} y={y - 4} width="5" height="10" fill="#1A1A0E" />
      <rect x={x + 1} y={y - 4} width="5" height="10" fill="#1A1A0E" />
    </g>
  );
}

function Wheel() {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <circle cx="20" cy="20" r="18" fill="#1A1A0E" />
      <circle cx="20" cy="20" r="10" fill="#9E9E9E" />
      <circle cx="20" cy="20" r="3" fill="#1A1A0E" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <rect key={a} x="19" y="10" width="2" height="20" fill="#1A1A0E" transform={`rotate(${a} 20 20)`} />
      ))}
    </svg>
  );
}

function Railing() {
  return (
    <svg viewBox="0 0 4000 60" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <pattern id="rail" x="0" y="0" width="80" height="60" patternUnits="userSpaceOnUse">
          <rect x="0" y="10" width="80" height="4" fill="#9E9E9E" />
          <rect x="0" y="40" width="80" height="4" fill="#9E9E9E" />
          <rect x="10" y="0" width="4" height="60" fill="#757575" />
          <rect x="66" y="0" width="4" height="60" fill="#757575" />
        </pattern>
      </defs>
      <rect width="4000" height="60" fill="url(#rail)" />
    </svg>
  );
}
