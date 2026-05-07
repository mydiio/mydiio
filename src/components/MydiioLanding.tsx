import { useEffect, useRef, useState } from "react";

const HERO_PHOTO = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80";
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

function Logo({ scrolled }: { scrolled: boolean }) {
  const textColor = scrolled ? C.ink : "#fff";
  const borderColor = scrolled ? C.ink : "#fff";
  return (
    <div
      className="font-display text-[22px] inline-flex items-center px-4 py-1 rounded-full bg-white"
      style={{ border: `3px solid ${borderColor}`, color: textColor }}
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

  const scrollToCta = () => {
    document.getElementById("section-8")?.scrollIntoView({ behavior: "smooth" });
  };

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

function Hero() {
  return (
    <section className="relative w-full" style={{ height: "100vh", minHeight: 600 }}>
      <img src={HERO_PHOTO} alt="Inside a Colombo tuk-tuk looking out at the city" className="absolute inset-0 w-full h-full object-cover" />
      {/* Overlay 1 */}
      <div className="absolute inset-0 hero-overlay-1" />
      {/* Overlay 2 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,14,0) 0%, rgba(26,26,14,0) 30%, rgba(26,26,14,0.65) 70%, rgba(26,26,14,0.88) 100%)",
        }}
      />
      <div className="hero-content absolute" style={{ bottom: "12%", left: "6%", maxWidth: 600 }}>
        <div
          className="font-mono inline-block"
          style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.amber }}
        >
          Colombo · Sri Lanka
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
          Colombo's first tuk-tuk ad network.
        </h1>
        <p
          className="hero-sub"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(17px, 2vw, 22px)",
            color: "rgba(255,255,255,0.72)",
            marginTop: 18,
            maxWidth: 480,
          }}
        >
          Screens inside every tuk. Your brand playing to captive passengers on every ride.
        </p>
        <a
          href="#section-8"
          className="hero-cta inline-block"
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
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
          }}
        >
          Join the waitlist →
        </a>
        <div
          className="font-mono scroll-cue"
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginTop: 36,
          }}
        >
          Scroll to discover ↓
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

function Section({
  id,
  bg,
  children,
}: {
  id?: string;
  bg: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const items = el.querySelectorAll<HTMLElement>(".reveal");
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("in"), i * 100);
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
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

function Stat({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
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
      <div className="font-display" style={{ fontSize: 18, color: dark ? C.amber : C.ink }}>{value}</div>
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

function StepRow({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div
      className="reveal flex gap-3 items-start"
      style={{
        background: "rgba(255,255,255,0.18)",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: 11,
        padding: "12px 14px",
        marginBottom: 10,
      }}
    >
      <div
        className="font-display flex items-center justify-center shrink-0"
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
      className="reveal"
      style={{
        background: pioneer ? C.ink : "#fff",
        border: `3px solid ${pioneer ? C.amber : C.ink}`,
        borderRadius: 13,
        boxShadow: `3px 3px 0 ${C.ink}`,
        padding: "16px 12px",
        textAlign: "center",
      }}
    >
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

export default function MydiioLanding() {
  return (
    <div className="w-full">
      <style>{`
        .hero-overlay-1 { background: rgba(26,26,14,0.55); }
        @keyframes scrollCue {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(7px); opacity: 0.7; }
        }
        .scroll-cue { animation: scrollCue 1.9s ease-in-out infinite; }
        .hero-cta:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 rgba(255,255,255,0.25) !important; }
        .hero-cta:active { transform: translate(2px,2px); box-shadow: 3px 3px 0 rgba(255,255,255,0.25) !important; }
        .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .wa-btn { transition: transform 0.1s ease, box-shadow 0.1s ease; }
        .wa-btn:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 ${C.ink} !important; }
        .wa-btn:active { transform: translate(2px,2px); box-shadow: 3px 3px 0 ${C.ink} !important; }
        @media (max-width: 767px) {
          .hero-overlay-1 { background: rgba(26,26,14,0.65) !important; }
          .hero-content { left: 0 !important; right: 0; bottom: 10% !important; padding: 0 24px; text-align: center; max-width: 100% !important; }
          .hero-content h1 { font-size: clamp(40px, 10vw, 56px) !important; }
          .hero-content .hero-cta, .hero-content .scroll-cue { display: inline-block; }
        }
        @media (max-width: 374px) {
          .hero-sub { display: none; }
        }
      `}</style>

      <Nav />
      <Hero />

      {/* Section 1 */}
      <Section bg={C.ink}>
        <div className="reveal"><Eyebrow color={C.amber}>The Ride</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.amber, lineHeight: 1.05 }}>
          14 minutes. No skip button. No scroll. Just your brand.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(255,249,237,0.7)", marginTop: 18 }}>
          Every tuk ride in Colombo lasts 14 minutes. The passenger has nothing to do but look at the screen in front of them. That screen is yours.
        </p>
        <div className="flex gap-3 flex-wrap mt-6">
          <Stat value="14 min" label="Average ride" />
          <Stat value="0" label="Skip buttons" />
          <Stat value="100%" label="Captive attention" />
        </div>
      </Section>

      {/* Section 2 */}
      <Section bg={C.amber}>
        <div className="reveal"><Eyebrow color="rgba(26,26,14,0.55)">What is mydiio?</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          Sri Lanka's first cloud-managed tuk-tuk ad network.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.72)", marginTop: 18 }}>
          We install smart screens inside tuk-tuks across Colombo. Advertisers run GPS-verified campaigns. Drivers earn passive income every month. The city becomes a media network.
        </p>
        <div className="flex gap-3 flex-wrap mt-6">
          <Stat value="1.1M" label="Tuks in Sri Lanka" />
          <Stat value="Colombo" label="Launch city" />
          <Stat value="2026" label="Live now" />
        </div>
      </Section>

      {/* Section 3 */}
      <Section bg="#FFFFFF">
        <div className="reveal"><Eyebrow color={C.amber}>For advertisers</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          Your ad. Every tuk. Every route.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.72)", marginTop: 18, marginBottom: 24 }}>
          Pharmacy, bakery, clothing, food — whatever your business, your ad plays to real Colombo passengers on every single ride.
        </p>
        <FeatureRow icon="📍" title="GPS-verified impressions" desc="See exactly where and when your ad played." color={C.amber} />
        <FeatureRow icon="🎬" title="14 days completely free" desc="You only pay after you've seen it work." color={C.amber} />
        <FeatureRow icon="✏️" title="Creative support included" desc="We help you make the ad at no extra cost." color={C.amber} />
      </Section>

      {/* Section 4 */}
      <Section bg={C.green}>
        <div className="reveal"><Eyebrow color={C.yellow}>How it works</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: "#fff", lineHeight: 1.05, marginBottom: 22 }}>
          Three steps. One campaign.
        </h2>
        <StepRow n={1} title="Send your ad" desc="15–30 second video or image. Free creative help if needed." />
        <StepRow n={2} title="We go live" desc="Across our Colombo fleet within 48 hours. GPS-scheduled." />
        <StepRow n={3} title="You get reports" desc="Weekly verified data. Every vehicle and zone tracked." />
        <a
          href="#section-8"
          className="reveal wa-btn inline-block mt-4 font-display"
          style={{ background: C.yellow, color: C.ink, border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, borderRadius: 13, padding: "14px 28px", fontSize: 18 }}
        >
          Start a campaign →
        </a>
      </Section>

      {/* Section 5 */}
      <Section bg={C.yellow}>
        <div className="reveal"><Eyebrow color="rgba(26,26,14,0.55)">Pricing</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05, marginBottom: 22 }}>
          Less than one Facebook boost. Way more reach.
        </h2>
        <div className="grid grid-cols-2 gap-[10px]">
          <PriceCard pioneer tier="Pioneer" price="LKR 25–35k/mo" sub="Category exclusive · 10 spots" />
          <PriceCard tier="Roamer" price="LKR 20,000/mo" sub="3-month minimum" />
          <PriceCard tier="Voyager" price="LKR 32,000/mo" sub="6-month minimum" />
          <PriceCard tier="Horizon" price="LKR 65,000+/mo" sub="Enterprise" />
        </div>
        <div className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "rgba(26,26,14,0.6)", marginTop: 18, textAlign: "center" }}>
          All plans include 14 days free. You only pay after it works.
        </div>
      </Section>

      {/* Section 6 */}
      <Section bg={C.amber}>
        <div className="reveal"><Eyebrow color="rgba(26,26,14,0.55)">Pioneer programme</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          Only 10 founding spots. One per category. Yours forever.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.75)", marginTop: 18, marginBottom: 18 }}>
          Be the only business in your category on mydiio. No competitor can advertise while you hold your Pioneer spot. Your rate is locked for life.
        </p>
        <div className="reveal flex flex-wrap gap-2 mb-5">
          {["Pharmacy","Food & Beverage","Fashion","Automotive","Finance","Telecoms","Hospitality","Real Estate","Education","Beauty & Wellness"].map((c) => (
            <span key={c} className="font-display" style={{ background: C.ink, color: C.amber, fontSize: 11, borderRadius: 20, padding: "6px 14px" }}>{c}</span>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap mb-5">
          <Stat value="10" label="Spots" />
          <Stat value="0" label="Competitors" />
          <Stat value="∞" label="Rate locked" />
        </div>
        <a
          href="#section-8"
          className="reveal wa-btn inline-block font-display"
          style={{ background: C.ink, color: C.amber, border: `3px solid ${C.amber}`, boxShadow: `5px 5px 0 ${C.amber}`, borderRadius: 13, padding: "14px 28px", fontSize: 18 }}
        >
          Claim a Pioneer spot →
        </a>
      </Section>

      {/* Section 7 */}
      <Section bg="#FFFFFF">
        <div className="reveal"><Eyebrow color={C.amber}>For tuk drivers</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 5vw, 50px)", color: C.ink, lineHeight: 1.05 }}>
          Just drive. Earn more.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(26,26,14,0.72)", marginTop: 18 }}>
          We install the screen. You drive exactly as you do today. Between LKR 6,000 and LKR 8,000 lands in your account on the 5th of every month. Zero extra work. Zero extra hours.
        </p>
        <div className="flex gap-3 flex-wrap my-6">
          <Stat value="LKR 6,000" label="Base / month" />
          <Stat value="+2,000" label="Route bonus" />
          <Stat value="5th" label="Pay date" />
        </div>
        <FeatureRow icon="🔧" title="Free installation" desc="We handle everything, you just show up." color={C.green} />
        <FeatureRow icon="📱" title="Simple driver app" desc="Earnings, uptime, and payment history." color={C.green} />
        <FeatureRow icon="🤝" title="Founding Group benefits" desc="Loyalty bonus at month 3, rate locked for life." color={C.green} />
        <a
          href="#section-8"
          className="reveal wa-btn inline-block mt-4 font-display"
          style={{ background: C.green, color: "#fff", border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, borderRadius: 13, padding: "14px 28px", fontSize: 18 }}
        >
          Become a partner driver →
        </a>
      </Section>

      {/* Section 8 */}
      <Section id="section-8" bg={C.ink}>
        <div className="reveal"><Eyebrow color={C.amber}>Ready to ride?</Eyebrow></div>
        <h2 className="reveal font-display" style={{ fontSize: "clamp(34px, 5vw, 52px)", color: C.amber, lineHeight: 1.05 }}>
          Let's talk.
        </h2>
        <p className="reveal" style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 16, color: "rgba(255,249,237,0.7)", marginTop: 18, marginBottom: 32 }}>
          Whether you want to advertise or earn as a driver — tap the button below. We'll WhatsApp you back within 24 hours.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={WA_ADVERTISER}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal wa-btn flex items-center justify-center gap-3 font-display"
            style={{ background: C.amber, color: C.ink, border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, borderRadius: 14, padding: "18px 24px", fontSize: 19 }}
          >
            <WhatsAppIcon color={C.ink} />
            I want to advertise on mydiio →
          </a>
          <a
            href={WA_DRIVER}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal wa-btn flex items-center justify-center gap-3 font-display"
            style={{ background: C.green, color: "#fff", border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, borderRadius: 14, padding: "18px 24px", fontSize: 19 }}
          >
            <WhatsAppIcon color="#fff" />
            I want to drive and earn →
          </a>
        </div>
        <div className="font-mono text-center" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>
          We respond to every message within 24 hours · mydiio.com
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
        <div className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>mydiio.com · Colombo · 2026</div>
        <a href="#" className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textDecoration: "underline", marginTop: 4, display: "inline-block" }}>Privacy Policy</a>
      </footer>
    </div>
  );
}
