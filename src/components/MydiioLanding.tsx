import { useEffect, useRef, useState } from "react";

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

/* ---------- Count up ---------- */
function CountUp({ target, suffix = "", prefix = "", decimals = 0, format = false }: { target: number; suffix?: string; prefix?: string; decimals?: number; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const formatValue = (cur: number) => {
      if (decimals > 0) return cur.toFixed(decimals);
      if (format) return Math.floor(cur).toLocaleString();
      return Math.floor(cur).toString();
    };

    const run = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const start = performance.now();
      const duration = 1800;
      const tick = (t: number) => {
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = eased * target;
        el.textContent = `${prefix}${formatValue(cur)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${formatValue(target)}${suffix}`;
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(el);

    // Fallback: if already in viewport on mount, trigger immediately
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      run();
      io.disconnect();
    }

    return () => io.disconnect();
  }, [target, suffix, prefix, decimals, format]);
  const initial = `${prefix}${decimals > 0 ? (0).toFixed(decimals) : "0"}${suffix}`;
  return <span ref={ref}>{initial}</span>;
}

function PulseZero() {
  return <span className="pulse-zero">0</span>;
}

/* ---------- Logo with magnetic ---------- */
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
    <div
      ref={ref}
      className="font-display text-[22px] inline-flex items-center px-4 py-1 rounded-full bg-white"
      style={{ border: `3px solid ${borderColor}`, color: textColor, willChange: "transform" }}
    >
      <span style={{ color: textColor }}>my</span>
      <span style={{ color: C.amber }}>di</span>
      <span style={{ color: textColor }}>io</span>
    </div>
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
  const scrollToCta = () => document.getElementById("section-8")?.scrollIntoView({ behavior: "smooth" });
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
        <button onClick={scrollToCta} className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: C.amber, color: C.ink }}>
          Advertise →
        </button>
        <button onClick={scrollToCta} className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: C.green, color: "#fff" }}>
          Drive & earn →
        </button>
      </div>
      <div className="md:hidden">
        <button onClick={scrollToCta} className="btn-bold font-display text-[14px] px-4 py-2 rounded-full" style={{ background: C.amber, color: C.ink }}>
          Join →
        </button>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const headline = "Colombo's first tuk-tuk ad network.";
  const words = headline.split(" ");
  const wordCount = words.length;
  const headlineDoneMs = 300 + (wordCount - 1) * 80 + 700;
  const subDelay = headlineDoneMs + 400;
  const ctaDelay = subDelay + 600;
  const cueDelay = ctaDelay + 400;

  useEffect(() => {
    document.body.style.transition = "background-color 0.7s ease";
    document.body.style.backgroundColor = "#1A1A0E";
  }, []);

  // particles
  const particles = Array.from({ length: 10 }).map((_, i) => {
    const size = 4 + Math.random() * 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const dur = 4 + Math.random() * 5;
    const delay = Math.random() * 5;
    const opacity = 0.25 + Math.random() * 0.1;
    return { i, size, left, top, dur, delay, opacity };
  });

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
      {/* Replace with real mydiio photography when available. */}
      <img src={HERO_PHOTO} alt="Inside a Colombo tuk-tuk looking out at the city" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay-1" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,14,0) 0%, rgba(26,26,14,0) 30%, rgba(26,26,14,0.65) 70%, rgba(26,26,14,0.88) 100%)",
        }}
      />
      {/* particles */}
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
              ['--duration' as any]: `${p.dur}s`,
              ['--delay' as any]: `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="hero-content absolute" style={{ bottom: "12%", left: "6%", maxWidth: 600 }}>
        <div
          className="font-mono inline-block hero-eyebrow"
          style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.amber }}
        >
          Colombo · Sri Lanka · Launching 2026
        </div>
        <h1
          className="font-display text-white"
          style={{
            fontSize: "clamp(52px, 8vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-1.5px",
            marginTop: 14,
          }}
        >
          {words.map((w, i) => (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              <span
                className="hero-word"
                style={{ animationDelay: `${300 + i * 80}ms`, display: "inline-block" }}
              >
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
            marginTop: 18,
            maxWidth: 480,
            animationDelay: `${subDelay}ms`,
          }}
        >
          We install a screen inside tuk-tuks. Your ad plays to every passenger — for the full ride. No skip button. No scrolling past. From LKR 20,000 per month. First 14 days credited free.
        </p>
        <a
          href="#section-8"
          className="hero-cta hero-spring inline-block"
          style={{
            background: C.amber,
            color: C.ink,
            fontFamily: "Fredoka One, sans-serif",
            fontSize: 19,
            border: "3px solid white",
            borderRadius: 13,
            boxShadow: "5px 5px 0 rgba(255,255,255,0.25)",
            padding: "15px 36px",
            marginTop: 30,
            animationDelay: `${ctaDelay}ms`,
          }}
        >
          Get early access →
        </a>
        <div
          className="font-mono scroll-cue hero-fade"
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginTop: 36,
            animationDelay: `${cueDelay}ms`,
          }}
        >
          Scroll to see how it works ↓
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 8, background: C.amber }} />
    </section>
  );
}

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="font-mono inline-block"
      style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color, marginBottom: 14 }}
    >
      {children}
    </div>
  );
}

/* ---------- Section with staggered child reveal & ambient bg ---------- */
const sectionColors: Record<string, string> = {
  "section-1": "#1A1A0E",
  "section-2": "#F5A623",
  "section-3": "#FFFFFF",
  "section-4": "#4CAF72",
  "section-5": "#F7E14A",
  "section-6": "#F5A623",
  "section-7": "#FFFFFF",
  "section-8": "#1A1A0E",
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

  // ambient bg observer
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
      style={{ minHeight: "100vh", background: bg, padding: "48px 24px" }}
    >
      <div style={{ maxWidth: 520, width: "100%" }}>{children}</div>
    </section>
  );
}

function Stat({ value, label, dark = false, children }: { value?: React.ReactNode; label: string; dark?: boolean; children?: React.ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        background: dark ? "rgba(255,255,255,0.1)" : "#fff",
        border: `3px solid ${C.ink}`,
        boxShadow: `3px 3px 0 ${C.ink}`,
        borderRadius: 11,
        padding: "10px 14px",
        textAlign: "center",
        flex: 1,
        minWidth: 90,
      }}
    >
      <div className="font-display" style={{ fontSize: 18, color: dark ? C.amber : C.ink }}>{children ?? value}</div>
      <div className="font-mono" style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.6)" : "rgba(26,26,14,0.55)", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div
      className="reveal"
      style={{
        borderLeft: `4px solid ${color}`,
        background: `color-mix(in oklab, ${color} 8%, transparent)`,
        borderRadius: 11,
        padding: "12px 14px",
        marginBottom: 10,
      }}
    >
      <div style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 15, color: C.ink }}>
        {icon} {title}
      </div>
      <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(26,26,14,0.7)", marginTop: 2 }}>
        {desc}
      </div>
    </div>
  );
}

function StepRow({ n, title, desc, delay }: { n: number; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            el.classList.add("step-in");
            const badge = el.querySelector<HTMLElement>(".step-badge");
            if (badge) setTimeout(() => badge.classList.add("visible"), 120);
          }, delay);
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className="step-row flex gap-3 items-start"
      style={{
        background: "rgba(255,255,255,0.18)",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: 11,
        padding: "12px 14px",
        marginBottom: 10,
      }}
    >
      <div
        className="step-badge font-display flex items-center justify-center shrink-0"
        style={{ width: 26, height: 26, borderRadius: "50%", background: C.yellow, color: C.ink, fontSize: 14 }}
      >
        {n}
      </div>
      <div>
        <div style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 15, color: "#fff" }}>{title}</div>
        <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

function PriceCard({ tier, price, sub, pioneer }: { tier: string; price: string; sub: string; pioneer?: boolean }) {
  return (
    <div
      className={`reveal price-card ${pioneer ? "pioneer-card" : ""}`}
      style={{
        position: "relative",
        background: pioneer ? C.ink : "#fff",
        border: `3px solid ${pioneer ? C.amber : C.ink}`,
        borderRadius: 13,
        boxShadow: `3px 3px 0 ${C.ink}`,
        padding: "16px 12px",
        textAlign: "center",
      }}
    >
      {pioneer && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: C.amber,
            color: C.ink,
            fontFamily: "Fredoka One",
            fontSize: 11,
            padding: "3px 12px",
            borderRadius: 20,
            border: `2px solid ${C.ink}`,
            boxShadow: `2px 2px 0 ${C.ink}`,
            whiteSpace: "nowrap",
          }}
        >
          ⭐ ONLY 10 SPOTS
        </div>
      )}
      <div className="font-display" style={{ fontSize: 11, textTransform: "uppercase", color: pioneer ? C.amber : C.ink }}>
        {pioneer ? "⭐ " : ""}{tier}
      </div>
      <div className="font-display" style={{ fontSize: 20, marginTop: 6, color: pioneer ? C.yellow : C.ink }}>{price}</div>
      <div className="font-mono" style={{ fontSize: 9, textTransform: "uppercase", marginTop: 6, color: pioneer ? "rgba(255,255,255,0.5)" : "rgba(26,26,14,0.45)" }}>
        {sub}
      </div>
    </div>
  );
}

function WhatsAppIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.49-8.413z" />
    </svg>
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

/* ---------- Pioneer Pills ---------- */
const PIONEER_CATEGORIES = ["Pharmacy","Food & Beverage","Fashion","Automotive","Finance","Telecoms","Hospitality","Real Estate","Education","Beauty & Wellness"];
const TAKEN = ["Pharmacy", "Automotive"];

function PioneerPills() {
  return (
    <>
      <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span className="pulse-dot-amber" />
        <span className="font-mono" style={{ fontSize: 11, color: C.amber }}>
          {PIONEER_CATEGORIES.length - TAKEN.length} of {PIONEER_CATEGORIES.length} spots remaining
        </span>
      </div>
      <div className="reveal flex flex-wrap gap-2 mb-5">
        {PIONEER_CATEGORIES.map((c) => {
          const taken = TAKEN.includes(c);
          return (
            <span
              key={c}
              className={`pioneer-pill ${taken ? "taken" : ""}`}
              style={{ position: "relative" }}
            >
              {c}
              {taken && <span className="taken-label">TAKEN</span>}
            </span>
          );
        })}
      </div>
    </>
  );
}

/* ============== MAIN ============== */
export default function MydiioLanding() {
  return (
    <div className="w-full">
      <style>{`
        .hero-overlay-1 { background: rgba(26,26,14,0.55); }
        @keyframes scrollCue { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(7px); opacity: 0.7; } }
        .scroll-cue { animation: scrollCue 1.9s ease-in-out infinite; }
        .hero-cta:hover { transform: translate(-2px,-2px) !important; box-shadow: 7px 7px 0 rgba(255,255,255,0.25) !important; }
        .hero-cta:active { transform: translate(2px,2px) !important; box-shadow: 3px 3px 0 rgba(255,255,255,0.25) !important; }

        /* Hero word reveal */
        .hero-word {
          opacity: 0;
          transform: translateY(40px);
          filter: blur(8px);
          animation: heroWord 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroWord {
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .hero-fade {
          opacity: 0;
          animation: heroFade 0.7s ease forwards;
        }
        @keyframes heroFade { to { opacity: 1; } }
        .hero-spring {
          opacity: 0;
          transform: scale(0.85);
          animation: heroSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes heroSpring { to { opacity: 1; transform: scale(1); } }

        /* Particles */
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

        /* Reveal */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        /* Stat pulse zero */
        @keyframes pulseZero { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
        .pulse-zero { animation: pulseZero 1.4s ease-in-out infinite; display: inline-block; }

        /* WhatsApp pulse */
        @keyframes ctaPulseAmber {
          0%,100% { box-shadow: 5px 5px 0 ${C.ink}; }
          50% { box-shadow: 5px 5px 0 ${C.ink}, 0 0 0 8px rgba(245,166,35,0.15); }
        }
        @keyframes ctaPulseGreen {
          0%,100% { box-shadow: 5px 5px 0 ${C.ink}; }
          50% { box-shadow: 5px 5px 0 ${C.ink}, 0 0 0 8px rgba(76,175,114,0.15); }
        }
        .whatsapp-btn-amber { animation: ctaPulseAmber 3s ease-in-out infinite; }
        .whatsapp-btn-green { animation: ctaPulseGreen 3s ease-in-out infinite; animation-delay: 1.5s; }

        .wa-btn { transition: transform 0.1s ease, box-shadow 0.1s ease; }
        .wa-btn:hover { transform: translate(-2px,-2px); }
        .wa-btn:active { transform: translate(2px,2px); }

        /* Pioneer pill */
        .pioneer-pill {
          font-family: 'Fredoka One', sans-serif;
          background: ${C.ink};
          color: ${C.amber};
          border: 2px solid ${C.amber};
          font-size: 11px;
          border-radius: 20px;
          padding: 6px 14px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
          display: inline-block;
        }
        .pioneer-pill:hover:not(.taken) {
          background: ${C.amber};
          color: ${C.ink};
          transform: translateY(-2px);
          box-shadow: 3px 3px 0 ${C.ink};
        }
        .pioneer-pill.taken {
          background: rgba(26,26,14,0.4);
          color: rgba(245,166,35,0.35);
          border-color: rgba(245,166,35,0.2);
          text-decoration: line-through;
          cursor: not-allowed;
        }
        .taken-label {
          position: absolute;
          top: -7px;
          right: -4px;
          font-family: 'DM Mono', monospace;
          font-size: 7px;
          color: ${C.amber};
          background: ${C.ink};
          padding: 1px 4px;
          border-radius: 4px;
          letter-spacing: 1px;
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .pulse-dot-amber {
          width: 8px; height: 8px; border-radius: 50%; background: ${C.amber};
          display: inline-block; animation: pulseDot 1.4s ease-in-out infinite;
        }

        /* Pioneer card glow */
        @keyframes pioneerGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.4), 3px 3px 0 ${C.ink}; }
          50% { box-shadow: 0 0 20px 4px rgba(245,166,35,0.25), 3px 3px 0 ${C.ink}; }
        }
        .pioneer-card { animation: pioneerGlow 2.5s ease-in-out infinite; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pioneer-card:hover { transform: translateY(-4px) scale(1.02); }

        /* Step row */
        .step-row {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .step-row.step-in { opacity: 1; transform: translateX(0); }
        .step-badge { transform: scale(0); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .step-badge.visible { transform: scale(1); }

        /* Scroll progress */
        .scroll-progress {
          position: fixed; top: 0; left: 0; height: 3px;
          background: ${C.amber}; z-index: 99999; width: 0%;
          transition: width 0.05s linear;
          box-shadow: 0 0 6px rgba(245,166,35,0.4);
        }

        /* Custom cursor */
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

        @media (max-width: 767px) {
          .hero-overlay-1 { background: rgba(26,26,14,0.65) !important; }
          .hero-content { left: 0 !important; right: 0; bottom: 10% !important; padding: 0 24px; text-align: center; max-width: 100% !important; }
          .hero-content h1 { font-size: clamp(40px, 10vw, 56px) !important; }
        }
        @media (max-width: 374px) {
          .hero-sub { display: none; }
        }
      `}</style>

      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />

      {/* Section 1 */}
      <Section id="section-1" bg={C.ink}>
        <div className="reveal"><Eyebrow color={C.amber}>Why tuk-tuk advertising works</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.amber, lineHeight: 1.05 }}>
          Your customer is sitting in a tuk for 14 minutes with nothing to do but look at the screen.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(255,249,237,0.7)", marginTop: 18 }}>
          The average Colombo tuk-tuk ride lasts between 10 and 20 minutes. The passenger is sitting in an open vehicle, moving through the city, with no phone signal half the time and nowhere to be in a hurry. We install a screen right in front of them. Your ad plays on that screen, on repeat, for the entire journey. There is no skip button. There is no other ad competing for their attention. There is no feed to scroll past. Just your brand — and a passenger who has nothing else to look at.
        </p>
        <div className="flex gap-3 flex-wrap mt-6">
          <Stat label="Minutes avg. ride time"><CountUp target={14} /></Stat>
          <Stat label="Skip buttons. Ever."><PulseZero /></Stat>
          <Stat label="Attention, every ride"><CountUp target={100} suffix="%" /></Stat>
        </div>
      </Section>

      {/* Section 2 */}
      <Section id="section-2" bg={C.amber}>
        <div className="reveal"><Eyebrow color="rgba(26,26,14,0.55)">What is mydiio?</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          We built a media network inside Colombo's tuk-tuks.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.72)", marginTop: 18 }}>
          mydiio installs a 7-inch screen inside tuk-tuks across Colombo. The screen is powered by the vehicle, managed remotely from our system, and plays a rotating schedule of ads throughout the day. When you run a campaign with mydiio, you do not need to visit a single tuk. You send us your ad. We load it onto every screen in your chosen zone within 48 hours. Every play is GPS-logged and verified. Sri Lanka has over 1.1 million registered three-wheelers. We are starting in Colombo. We are starting now.
        </p>
        <div className="flex gap-3 flex-wrap mt-6">
          <Stat label="Registered tuks in Sri Lanka"><CountUp target={1.1} decimals={1} suffix="M" /></Stat>
          <Stat value="Colombo" label="Our launch city" />
          <Stat value="2026" label="Campaigns going live" />
        </div>
      </Section>

      {/* Section 3 */}
      <Section id="section-3" bg="#FFFFFF">
        <div className="reveal"><Eyebrow color={C.amber}>For Colombo businesses</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          Your ad reaches the exact customers you are trying to find — already moving through your area.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.72)", marginTop: 18, marginBottom: 24 }}>
          A family from Nugegoda heading to the pharmacy on Galle Road. A worker from Pettah grabbing lunch near the office. A couple from Wellawatte running errands on Saturday morning. These are your customers — already in the areas your business serves. Now your ad is with them, on a screen in the back of their tuk, for the entire ride.
        </p>
        <FeatureRow icon="📍" title="GPS-verified impression reports" desc="Every week you receive a report showing every vehicle, every zone, and every time your ad played. Verified GPS data — not estimates." color={C.amber} />
        <FeatureRow icon="🎬" title="First 14 days credited to your account" desc="Run your campaign, see it working with your own eyes, then pay for the remaining days." color={C.amber} />
        <FeatureRow icon="✏️" title="We create your ad for free" desc="Send us your logo, your offer, and your phone number. We design and produce your 15–30 second ad at no extra charge — usually within 48 hours." color={C.amber} />
      </Section>

      {/* Section 4 */}
      <Section id="section-4" bg={C.green}>
        <div className="reveal"><Eyebrow color={C.yellow}>How it works</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: "#fff", lineHeight: 1.05, marginBottom: 22 }}>
          You send us an ad. We put it in front of Colombo.
        </h2>
        <StepRow n={1} delay={0} title="Tell us what you want to say" desc="Contact us on WhatsApp with your business name, your offer, and where your customers are. If you have a video or image, send it. If not, we'll create it for you free within 48 hours." />
        <StepRow n={2} delay={400} title="We go live across the Colombo fleet" desc="Once your ad is approved, we load it onto our tuk-tuk network remotely. Your campaign is live and playing inside tuks within 48 hours." />
        <StepRow n={3} delay={800} title="You receive a verified weekly report" desc="Every Monday, a WhatsApp message with your report: how many plays, which vehicles, which zones, what times. GPS-verified. Every play logged." />
        <a
          href="#section-8"
          className="reveal wa-btn inline-block mt-4 font-display"
          style={{ background: C.yellow, color: C.ink, border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, borderRadius: 13, padding: "14px 28px", fontSize: 18 }}
        >
          Start a campaign — first 14 days free →
        </a>
      </Section>

      {/* Section 5 */}
      <Section id="section-5" bg={C.yellow}>
        <div className="reveal"><Eyebrow color="rgba(26,26,14,0.55)">Pricing</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05, marginBottom: 28 }}>
          One month on mydiio costs less than one boosted Facebook post. The difference is that your customers cannot skip this one.
        </h2>
        <div className="grid grid-cols-2 gap-[10px]" style={{ paddingTop: 12 }}>
          <PriceCard pioneer tier="Pioneer" price="LKR 25–35k/mo" sub="6-month min · Category exclusive · Founding rate locked for life" />
          <PriceCard tier="Roamer" price="LKR 20,000/mo" sub="3-month minimum · Standard rotation" />
          <PriceCard tier="Voyager" price="LKR 32,000/mo" sub="6-month min · Priority rotation · Better points rate" />
          <PriceCard tier="Horizon" price="LKR 65,000+/mo" sub="Enterprise · Custom zones · Dedicated fleet" />
        </div>
        <div className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(26,26,14,0.6)", marginTop: 18, textAlign: "center" }}>
          All plans include 14 days credited free. Run your campaign, receive your GPS-verified reports, and see it working — before you pay a rupee beyond your minimum term. Every plan also earns loyalty points redeemable for free ad time.
        </div>
      </Section>

      {/* Section 6 */}
      <Section id="section-6" bg={C.amber}>
        <div className="reveal"><Eyebrow color="rgba(26,26,14,0.55)">The Pioneer Programme</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          There are 10 Pioneer spots. One per category. Two are already taken.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.75)", marginTop: 18, marginBottom: 18 }}>
          A Pioneer spot means your business is the only one in your category advertising on mydiio — anywhere in Colombo. If you hold the Pharmacy spot, no other pharmacy can run a campaign on our network. Not in Fort. Not in Nugegoda. Not anywhere. Your rate is set at the founding price and locked there permanently. As the network grows and new advertisers pay higher rates — yours never changes. Two categories are already spoken for. To secure a Pioneer spot, a fully-refundable LKR 5,000 deposit is required, credited in full against your first invoice.
        </p>
        <PioneerPills />
        <div className="flex gap-3 flex-wrap mb-5">
          <Stat label="Spots. Total. Ever."><CountUp target={10} /></Stat>
          <Stat label="Competitors in your category"><PulseZero /></Stat>
          <Stat value="∞" label="Your rate, locked permanently" />
        </div>
        <a
          href="#section-8"
          className="reveal wa-btn inline-block font-display"
          style={{ background: C.ink, color: C.amber, border: `3px solid ${C.amber}`, boxShadow: `5px 5px 0 ${C.amber}`, borderRadius: 13, padding: "14px 28px", fontSize: 18 }}
        >
          Secure a Pioneer spot — LKR 5,000 refundable deposit →
        </a>
      </Section>

      {/* Section 7 */}
      <Section id="section-7" bg="#FFFFFF">
        <div className="reveal"><Eyebrow color={C.amber}>For tuk-tuk drivers in Colombo</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          Your tuk earns LKR 6,000 to LKR 8,000 every month. You change nothing about how you drive.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.72)", marginTop: 18 }}>
          We come to your location and install a 7-inch screen inside your three-wheeler. It takes about an hour. It costs you nothing. It is powered by your vehicle — no separate battery, no extra fuel. After that, you drive exactly as you always have. On the 5th of every month, LKR 6,000 is transferred to your bank account simply for keeping the screen active. Run it for 8+ hours a day on average and you receive an additional LKR 2,000 route bonus — LKR 8,000/month, LKR 96,000/year in passive income. Founding drivers also earn LKR 1,500 for every other driver they refer. A fully-refundable LKR 3,500 deposit secures your founding place — returned in full at month 3.
        </p>
        <div className="flex gap-3 flex-wrap my-6">
          <Stat value="LKR 8,000" label="Maximum monthly earnings" />
          <Stat value="LKR 96,000" label="Passive income per year" />
          <Stat value="5th" label="Every month, without fail" />
        </div>
        <FeatureRow icon="🔧" title="Free installation. We come to you." desc="Our team installs the screen at your location in an hour. You pay nothing — installation, maintenance, repairs all on us." color={C.green} />
        <FeatureRow icon="📱" title="See your earnings in the driver app" desc="Screen uptime, monthly earnings, next payment date, full payment history — all visible and transparent." color={C.green} />
        <FeatureRow icon="🤝" title="Founding Group A — first 10 drivers only" desc="LKR 5,000 cash loyalty bonus at month 3, limited edition amber founding partner shirt, and a base rate locked permanently." color={C.green} />
        <a
          href="#section-8"
          className="reveal wa-btn inline-block mt-4 font-display"
          style={{ background: C.green, color: "#fff", border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, borderRadius: 13, padding: "14px 28px", fontSize: 18 }}
        >
          I want to become a founding mydiio driver →
        </a>
      </Section>

      {/* Section 8 */}
      <Section id="section-8" bg={C.ink}>
        <div className="reveal"><Eyebrow color={C.amber}>Get early access</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(34px, 5vw, 52px)", color: C.amber, lineHeight: 1.05 }}>
          We are building our founding group of advertisers and drivers in Colombo right now.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(255,249,237,0.7)", marginTop: 18, marginBottom: 32 }}>
          mydiio launches in Colombo in 2026. Founding members receive rates, terms, and benefits that will never be available again. For businesses: 8 of 10 Pioneer spots are still open — LKR 5,000 refundable deposit secures your category. Standard waitlist spots are also open with no deposit. For drivers: Founding Group A has space for 10 — LKR 3,500 refundable deposit, with LKR 5,000 cash returned at month 3. Tap the button that applies to you. We'll WhatsApp you within 24 hours. No sales pressure. No commitment yet.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={WA_ADVERTISER}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal wa-btn whatsapp-btn-amber flex items-center justify-center gap-3 font-display"
            style={{ background: C.amber, color: C.ink, border: `3px solid ${C.ink}`, borderRadius: 14, padding: "18px 24px", fontSize: 19 }}
          >
            <WhatsAppIcon color={C.ink} />
            I want to advertise my business on mydiio →
          </a>
          <a
            href={WA_DRIVER}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal wa-btn whatsapp-btn-green flex items-center justify-center gap-3 font-display"
            style={{ background: C.green, color: "#fff", border: `3px solid ${C.ink}`, borderRadius: 14, padding: "18px 24px", fontSize: 19 }}
          >
            <WhatsAppIcon color="#fff" />
            I want to earn as a mydiio driver →
          </a>
        </div>
        <div className="font-mono text-center" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>
          We reply to every message within 24 hours · No payment is taken at this stage · We'll explain everything before you commit
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
        <a href="#" className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textDecoration: "underline", marginTop: 4, display: "inline-block" }}>Privacy Policy</a>
      </footer>
    </div>
  );
}
