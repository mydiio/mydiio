import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/drive")({
  component: DrivePage,
  head: () => ({
    meta: [
      { title: "Drive & Earn with mydiio — LKR 6,000–8,000 Every Month" },
      { name: "description", content: "Earn LKR 6,000–8,000 every month doing nothing different. Free installation, monthly bank transfer on the 5th. Founding Group A — first 10 drivers only." },
      { property: "og:title", content: "Drive & Earn with mydiio — LKR 6,000–8,000 Every Month" },
      { property: "og:description", content: "Free installation. LKR 6,000–8,000 monthly. Drive as you always have." },
    ],
  }),
});

const C = {
  amber: "#F5A623",
  yellow: "#F7E14A",
  green: "#4CAF72",
  greenDeep: "#2D8A4E",
  ink: "#1A1A0E",
  cream: "#FFF9ED",
};

const WA_DRIVER = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20becoming%20a%20mydiio%20driver";

/* ---------- useInView ---------- */
function useInView(threshold = 0.3): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
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
          fontSize: 11, color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.85)",
          letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          ← Back to mydiio
        </Link>
        <Logo scrolled={scrolled} />
      </div>
      <div className="hidden md:flex items-center gap-3">
        <Link to="/advertise" className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: "transparent", color: scrolled ? "#fff" : "#fff", border: `3px solid ${scrolled ? "#fff" : "#fff"}` }}>
          Advertise →
        </Link>
        <Link to="/drive" className="btn-bold font-display text-[15px] px-5 py-2 rounded-[11px]" style={{ background: C.green, color: "#fff" }}>
          Drive & earn →
        </Link>
      </div>
      <Link to="/advertise" className="md:hidden btn-bold font-display text-[13px] px-3 py-2 rounded-full" style={{ background: C.amber, color: C.ink }}>
        Advertise
      </Link>
    </nav>
  );
}

/* ---------- Section ---------- */
function Section({ id, bg, children }: { id?: string; bg: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const items = el.querySelectorAll<HTMLElement>(".reveal");
        items.forEach((item, i) => setTimeout(() => item.classList.add("in"), i * 100));
        io.disconnect();
      }
    }), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio >= 0.3) {
        document.body.style.transition = "background-color 0.7s ease";
        document.body.style.backgroundColor = bg;
      }
    }), { threshold: [0.3] });
    io.observe(el);
    return () => io.disconnect();
  }, [bg]);
  return (
    <section id={id} ref={ref} className="w-full flex items-center justify-center" style={{ minHeight: "100vh", background: bg, padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>{children}</div>
    </section>
  );
}

/* ---------- Hero ---------- */
function DriverHero() {
  useEffect(() => {
    document.body.style.transition = "background-color 0.7s ease";
    document.body.style.backgroundColor = C.green;
  }, []);
  const scroll = () => document.getElementById("section-calc")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section style={{
      minHeight: "100vh", background: C.green,
      padding: "140px 24px 80px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ maxWidth: 980, width: "100%" }}>
        <div className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase" }}>
          For tuk-tuk drivers in Colombo
        </div>
        <h1 className="font-display" style={{
          fontSize: "clamp(46px, 7vw, 80px)", color: "#fff",
          lineHeight: 1.0, letterSpacing: "-1px", marginTop: 14,
        }}>
          Your tuk earns money while you drive. You change nothing.
        </h1>
        <p style={{
          fontFamily: "Nunito", fontWeight: 800, fontSize: 18,
          color: "rgba(255,255,255,0.78)", marginTop: 18, maxWidth: 520,
        }}>
          We install a screen. You drive as you always have. LKR 6,000–8,000 lands in your account on the 5th of every month.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 36 }}>
          <div>
            <div className="font-display" style={{ fontSize: "clamp(40px, 8vw, 56px)", color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              LKR 8,000
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5, marginTop: 6, textTransform: "uppercase" }}>
              maximum per month
            </div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: "clamp(40px, 8vw, 56px)", color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              LKR 96,000
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5, marginTop: 6, textTransform: "uppercase" }}>
              passive income per year
            </div>
          </div>
        </div>

        <button
          onClick={scroll}
          className="path-btn font-display"
          style={{
            marginTop: 36,
            background: C.ink, color: "#fff",
            border: "3px solid #fff",
            boxShadow: "5px 5px 0 #fff",
            borderRadius: 13, padding: "14px 32px", fontSize: 19,
            cursor: "pointer",
          }}
        >
          How does it work? →
        </button>
      </div>
    </section>
  );
}

/* ---------- Earnings Calculator ---------- */
function EarningsCalculator() {
  const [hours, setHours] = useState(8);
  // 4h => 6000, 14h => 8000 linear
  const monthly = Math.round(6000 + ((hours - 4) / 10) * 2000);
  const annual = monthly * 12;
  return (
    <div style={{ marginTop: 32, minHeight: 260 }}>
      <div style={{ textAlign: "center" }}>
        <div className="font-display" style={{
          fontSize: "clamp(56px, 11vw, 72px)", color: C.green,
          lineHeight: 1, fontVariantNumeric: "tabular-nums",
          minHeight: 72,
        }}>
          LKR {monthly.toLocaleString()}
        </div>
        <div className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, marginTop: 8, textTransform: "uppercase" }}>
          per month
        </div>
        <div style={{
          fontFamily: "Nunito", fontWeight: 800, fontSize: 22,
          color: "rgba(255,255,255,0.7)", marginTop: 14,
          fontVariantNumeric: "tabular-nums",
        }}>
          LKR {annual.toLocaleString()} <span style={{ fontWeight: 700, fontSize: 14, opacity: 0.7 }}>/ year</span>
        </div>
      </div>

      <div style={{ marginTop: 32, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 1.5 }}>HOURS PER DAY</span>
          <span className="font-mono" style={{ fontSize: 12, color: C.amber, fontVariantNumeric: "tabular-nums", minWidth: "3ch", textAlign: "right" }}>{hours}h</span>
        </div>
        <input
          type="range" min={4} max={14} step={1} value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          style={{ width: "100%", marginTop: 8, accentColor: C.amber }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>4h</span>
          <span className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>14h</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Payment Timeline ---------- */
function PaymentTimeline() {
  const dots = [
    { color: "rgba(255,255,255,0.7)", title: "Day 1", body: "Screen installed free" },
    { color: C.amber, title: "Month 1, 5th", body: "First payment arrives" },
    { color: C.green, title: "Month 3, 5th", body: "LKR 5,000 loyalty bonus", extra: "(Founding Group A only)" },
  ];
  return (
    <div style={{ marginTop: 48, position: "relative", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
      <div style={{
        position: "absolute", left: "10%", right: "10%", top: 8,
        borderTop: "2px dashed rgba(255,255,255,0.2)",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
        {dots.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <span style={{
              display: "inline-block", width: 16, height: 16, borderRadius: "50%",
              background: d.color, animation: "pulseDotInline 1.6s ease-in-out infinite",
              animationDelay: `${i * 0.3}s`,
              boxShadow: `0 0 0 4px ${d.color}22`,
            }} />
            <div className="font-mono" style={{ fontSize: 9, color: d.color, marginTop: 10, letterSpacing: 1 }}>{d.title}</div>
            <div className="font-mono" style={{ fontSize: 9, color: `${d.color}cc`, marginTop: 4, opacity: 0.8 }}>{d.body}</div>
            {d.extra && <div className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{d.extra}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Step Cards ---------- */
function StepCard({ n, title, body, color, delay }: { n: number; title: string; body: string; color: string; delay: number }) {
  const [ref, inView] = useInView(0.25);
  return (
    <div ref={ref as any} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      borderLeft: `4px solid ${color}`,
      background: "#fff",
      border: `2px solid ${C.ink}`,
      borderLeftWidth: 4, borderLeftColor: color,
      boxShadow: `4px 4px 0 ${C.ink}`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 14,
      display: "flex", gap: 14, alignItems: "flex-start",
    }}>
      <div className="font-display" style={{
        flexShrink: 0, width: 36, height: 36, borderRadius: "50%",
        background: color, color: color === C.green ? "#fff" : C.ink,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
      }}>{n}</div>
      <div>
        <div className="font-display" style={{ fontSize: 18, color: C.ink }}>{title}</div>
        <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: "rgba(26,26,14,0.7)", marginTop: 4 }}>
          {body}
        </div>
      </div>
    </div>
  );
}

/* ---------- Founding Group ---------- */
function FoundingGroup() {
  return (
    <>
      <div className="founding-grid" style={{ marginTop: 32 }}>
        <div style={{
          background: C.ink, border: `2px solid ${C.amber}`,
          borderRadius: 14, padding: 22,
        }}>
          <div className="font-display" style={{ fontSize: 18, color: C.amber }}>Founding Group A</div>
          <div className="font-mono" style={{ fontSize: 10, color: "rgba(245,166,35,0.6)", letterSpacing: 1, marginTop: 4 }}>FIRST 10 DRIVERS ONLY</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {[
              "✓ LKR 3,500 refundable deposit (returned at month 3)",
              "✓ LKR 5,000 cash loyalty bonus at month 3",
              "✓ Net position: LKR 1,500 ahead after 3 months",
              "✓ Base rate locked permanently — never decreases",
              "✓ Limited edition amber founding partner shirt",
              "✓ \"Founding Partner\" badge in your driver portal",
            ].map((t) => (
              <div key={t} style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: "#fff" }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{
          background: C.ink, border: "2px solid rgba(255,255,255,0.2)",
          borderRadius: 14, padding: 22,
        }}>
          <div className="font-display" style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>Standard Partner</div>
          <div className="font-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 4 }}>JOINING AFTER FOUNDING GROUP CLOSES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {[
              "— LKR 5,000 refundable deposit",
              "— No loyalty bonus",
              "— Standard base rate (subject to change)",
              "— No founding shirt",
              "— Standard partner status",
            ].map((t) => (
              <div key={t} style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <p style={{
        fontFamily: "Nunito", fontWeight: 700, fontSize: 15,
        color: "rgba(26,26,14,0.75)", textAlign: "center",
        marginTop: 28, maxWidth: 480, marginLeft: "auto", marginRight: "auto",
      }}>
        Founding Group A has space for 10 drivers. Once it closes, it closes permanently.
      </p>

      <div className="font-display" style={{ fontSize: 28, color: C.ink, textAlign: "center", marginTop: 16 }}>
        <span style={{ color: C.amber }}>7</span> Founding Group A spots remaining
      </div>
    </>
  );
}

/* ---------- Driver Portal Detail ---------- */
function DriverPortalDetail() {
  const [ref, inView] = useInView(0.25);
  return (
    <div ref={ref as any} style={{
      maxWidth: 520, margin: "32px auto 0",
      background: "#0D0D08", border: "2px solid rgba(76,175,114,0.3)",
      borderRadius: 14, padding: 22,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-mono" style={{ fontSize: 9, color: C.green, letterSpacing: 2 }}>DRIVER PORTAL</span>
        <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Kamal · MYD-007</span>
      </div>

      <div className="font-display" style={{ fontSize: 32, color: C.green, textAlign: "center", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>
        LKR 8,000
      </div>
      <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", textAlign: "center", marginTop: 4 }}>
        This month · Base + Route Bonus
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5 }}>SCREEN UPTIME TODAY</span>
          <span className="font-mono" style={{ fontSize: 11, color: C.green }}>9.2h</span>
        </div>
        <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginTop: 6, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: inView ? "85%" : "0%",
            background: C.green, borderRadius: 4,
            transition: "width 1.2s ease 0.4s",
          }} />
        </div>
      </div>

      <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, marginTop: 22 }}>
        PAYMENT HISTORY
      </div>
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          ["05 Jul 2026", "LKR 8,000"],
          ["05 Jun 2026", "LKR 8,000"],
          ["05 May 2026", "LKR 6,000"],
        ].map(([d, a]) => (
          <div key={d} className="font-mono" style={{
            display: "flex", justifyContent: "space-between",
            background: "rgba(76,175,114,0.08)", border: "1px solid rgba(76,175,114,0.2)",
            borderRadius: 6, padding: "8px 10px",
            fontSize: 9, color: C.green,
          }}>
            <span>{d}</span>
            <span>{a}</span>
            <span>Paid ✓</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 22, padding: 14,
        background: "rgba(245,166,35,0.08)",
        border: "1px solid rgba(245,166,35,0.3)",
        borderRadius: 8,
      }}>
        <div className="font-mono" style={{ fontSize: 8, color: C.amber, letterSpacing: 1.5 }}>YOUR REFERRAL CODE</div>
        <div className="font-display" style={{ fontSize: 14, color: "#fff", marginTop: 4, letterSpacing: 1 }}>MYD-007-REF</div>
        <div className="font-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
          Share this code. Earn LKR 1,500 per driver who joins and stays 30 days.
        </div>
      </div>
    </div>
  );
}

/* ============== MAIN ============== */
function DrivePage() {
  return (
    <div className="w-full">
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        @keyframes pulseDotInline {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        @keyframes ctaPulseAmber {
          0%,100% { box-shadow: 5px 5px 0 ${C.amber}; }
          50% { box-shadow: 5px 5px 0 ${C.amber}, 0 0 0 10px rgba(245,166,35,0.2); }
        }
        .whatsapp-pulse { animation: ctaPulseAmber 3s ease-in-out infinite; transition: transform 0.12s ease; }
        .whatsapp-pulse:hover { transform: translate(-2px,-2px); }
        .whatsapp-pulse:active { transform: translate(2px,2px); }

        .path-btn { transition: transform 0.12s ease, box-shadow 0.12s ease; }
        .path-btn:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 #fff !important; }
        .path-btn:active { transform: translate(2px,2px); }

        .founding-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 720px) { .founding-grid { grid-template-columns: 1fr 1fr; } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Nav />
      <DriverHero />

      {/* Section 2 — Calculator */}
      <Section id="section-calc" bg={C.ink}>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.amber, lineHeight: 1.05, textAlign: "center" }}>
          See exactly what you could earn.
        </h2>
        <EarningsCalculator />
        <PaymentTimeline />
      </Section>

      {/* Section 3 — Installation */}
      <Section bg="#FFFFFF">
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.ink, lineHeight: 1.05, textAlign: "center", marginBottom: 28 }}>
          Here is exactly what happens.
        </h2>
        <StepCard n={1} title="You contact us on WhatsApp" body="We reply within 24 hours to arrange a time that works for you." color={C.amber} delay={0} />
        <StepCard n={2} title="We come to you" body="Our team installs a 7-inch screen in your three-wheeler. One hour. No cost to you. Powered by your vehicle." color={C.amber} delay={0.1} />
        <StepCard n={3} title="You drive as normal" body="Same routes. Same hours. The screen runs automatically. You do nothing different." color={C.amber} delay={0.2} />
        <StepCard n={4} title="LKR 6,000–8,000 arrives on the 5th" body="Every month. Directly to your bank account. Without fail." color={C.green} delay={0.3} />
      </Section>

      {/* Section 4 — Founding Group */}
      <Section bg={C.amber}>
        <h2 className="reveal font-display" style={{ fontSize: 38, color: C.ink, lineHeight: 1.05, textAlign: "center" }}>
          Join now as a Founding Group A driver. First 10 only.
        </h2>
        <FoundingGroup />
      </Section>

      {/* Section 5 — Driver Portal */}
      <Section bg={C.ink}>
        <h2 className="reveal font-display" style={{ fontSize: 34, color: C.amber, lineHeight: 1.05, textAlign: "center" }}>
          Your portal. Everything visible. Always.
        </h2>
        <DriverPortalDetail />
        <p className="reveal" style={{
          fontFamily: "Nunito", fontWeight: 700, fontSize: 15,
          color: "rgba(255,249,237,0.65)", textAlign: "center",
          maxWidth: 520, margin: "24px auto 0",
        }}>
          You receive login credentials when your installation is confirmed.
        </p>
      </Section>

      {/* Section 6 — CTA */}
      <Section bg={C.amber}>
        <div className="reveal font-mono" style={{ fontSize: 11, letterSpacing: 3, color: "rgba(26,26,14,0.55)", textTransform: "uppercase", textAlign: "center" }}>
          Ready to start earning?
        </div>
        <h2 className="reveal font-display" style={{ fontSize: 44, color: C.ink, lineHeight: 1.05, textAlign: "center", marginTop: 12 }}>
          Join as a founding driver. While spots last.
        </h2>
        <p className="reveal" style={{
          fontFamily: "Nunito", fontWeight: 700, fontSize: 16,
          color: "rgba(26,26,14,0.7)", textAlign: "center",
          maxWidth: 480, margin: "16px auto 0",
        }}>
          Message us on WhatsApp. We will arrange your free installation within the week.
        </p>

        <a
          href={WA_DRIVER}
          target="_blank" rel="noopener noreferrer"
          className="whatsapp-pulse font-display"
          style={{
            display: "block",
            maxWidth: 400, margin: "32px auto 0",
            background: C.ink, color: C.amber,
            border: `3px solid ${C.amber}`,
            borderRadius: 13, padding: "16px 22px",
            fontSize: 20, textAlign: "center",
            textDecoration: "none",
          }}
        >
          I want to become a mydiio driver →
        </a>

        <div className="font-mono" style={{
          fontSize: 10, color: "rgba(26,26,14,0.5)",
          textAlign: "center", marginTop: 18, letterSpacing: 1,
          maxWidth: 460, marginLeft: "auto", marginRight: "auto",
        }}>
          LKR 3,500 fully-refundable deposit required for Founding Group A. Returned at month 3 alongside your LKR 5,000 loyalty bonus.
        </div>
        <div className="font-mono" style={{
          fontSize: 10, color: "rgba(26,26,14,0.35)",
          textAlign: "center", marginTop: 6, letterSpacing: 1,
        }}>
          We reply within 24 hours.
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
