import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import TUKTUK_INTERIOR from "@/assets/tuktuk-interior-screen.jpg";
import FLEET_SUNSET from "@/assets/tuktuk-fleet-sunset.jpg";
import DRIVER_PAYMENT from "@/assets/driver-payment.jpg";

export const Route = createFileRoute("/investors")({
  component: InvestorsPage,
  head: () => ({
    meta: [
      { title: "Investors — mydiio | Sri Lanka's First Tuk-Tuk Media Network" },
      { name: "description", content: "mydiio turns thousands of daily tuk-tuk rides into measurable advertising inventory and recurring revenue. Currently raising." },
      { property: "og:title", content: "Investors — mydiio" },
      { property: "og:description", content: "Building Sri Lanka's first tuk-tuk media network. Recurring revenue. Asset-light. Regional potential." },
      { property: "og:image", content: COLOMBO_STREET },
    ],
  }),
});

const C = {
  amber: "#F5A623",
  amberDeep: "#E8920A",
  amberPale: "#FEF3D7",
  green: "#4CAF72",
  ink: "#1A1A18",
  inkSoft: "#7A7A72",
  cream: "#FDFAF3",
  white: "#FFFFFF",
};

const MAILTO = "mailto:investors@mydiio.com";
const WA = "https://wa.me/94XXXXXXXXX?text=Hi%2C%20I%27m%20an%20investor%20interested%20in%20mydiio";

/* ---------- Nav ---------- */
function Nav() {
  const { t } = useI18n();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{ padding: "12px 22px", background: "rgba(253,250,243,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(26,26,24,0.08)" }}
    >
      <Link to="/" className="font-display text-[20px] inline-flex items-center px-4 py-1 rounded-full bg-white" style={{ border: `3px solid ${C.ink}`, color: C.ink, boxShadow: "2px 2px 0 rgba(26,26,14,0.9)", fontFamily: "'Fredoka One', system-ui, sans-serif" }}>
        <span style={{ color: C.ink }}>my</span>
        <span style={{ color: C.amber }}>di</span>
        <span style={{ color: C.ink }}>io</span>
      </Link>
      <div className="flex items-center gap-2.5">
        <LanguageSwitcher />
        <a href={MAILTO} className="btn-bold font-display text-[13px] sm:text-[14px] px-4 py-2 rounded-[11px]" style={{ background: C.amber, color: C.ink, textDecoration: "none" }}>
          {t("inv_request_deck")} →
        </a>
      </div>
    </nav>
  );
}

/* ---------- Reusable bits ---------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amber, textTransform: "uppercase", fontWeight: 500 }}>
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display" style={{ fontSize: "clamp(30px, 4.6vw, 52px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-0.8px", marginTop: 14, textWrap: "balance" as const }}>
      {children}
    </h2>
  );
}

function Card({ title, body, accent }: { title: string; body?: string; accent?: boolean }) {
  return (
    <div
      className="reveal"
      style={{
        background: accent ? C.amberPale : "#fff",
        border: `3px solid ${C.ink}`,
        borderRadius: 18,
        padding: "26px 24px",
        boxShadow: `5px 5px 0 ${C.ink}, 0 18px 40px -24px rgba(26,26,14,0.3)`,
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="font-display" style={{ fontSize: 19, color: C.ink, lineHeight: 1.25, letterSpacing: "-0.2px" }}>{title}</div>
      {body && (
        <div style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 15, color: C.inkSoft, marginTop: 10, lineHeight: 1.55 }}>
          {body}
        </div>
      )}
    </div>
  );
}

function SectionWrap({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <section style={{ background: bg ?? C.cream, padding: "clamp(72px, 10vw, 130px) clamp(20px, 4vw, 32px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ---------- Sections ---------- */
function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      <img src={COLOMBO_STREET} alt="Colombo tuk-tuks at street level" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 70% 20%, rgba(26,26,24,0.4) 0%, rgba(26,26,24,0.7) 55%, rgba(26,26,24,0.94) 100%)" }} />
      <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "100vh", padding: "clamp(110px, 14vh, 160px) clamp(20px, 6vw, 80px) clamp(70px, 10vh, 110px)" }}>
        <div style={{ maxWidth: 820 }}>
          <Eyebrow>Investor brief · 2026</Eyebrow>
          <h1 className="font-display" style={{ color: "#fff", fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 1.04, letterSpacing: "-1px", marginTop: 14, textWrap: "balance" as const }}>
            Building Sri Lanka's first tuk-tuk media network.
          </h1>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.82)", marginTop: 20, maxWidth: 640, lineHeight: 1.5 }}>
            mydiio turns thousands of daily tuk-tuk rides into measurable advertising inventory and recurring revenue.
          </p>
          <div className="hero-cta-row" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={MAILTO} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 17, textDecoration: "none" }}>
              Request investor deck →
            </a>
            <a href={WA} className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 17, textDecoration: "none", border: "3px solid #fff" }}>
              Book founder call
            </a>
          </div>

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, maxWidth: 720 }}>
            {[
              ["Colombo", "Launching"],
              ["50+", "Vehicles pipeline"],
              ["7", "Zones identified"],
              ["Open", "Pilot sales"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ color: "#fff", fontSize: 26, lineHeight: 1, letterSpacing: "-0.5px" }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amber, textTransform: "uppercase", marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <SectionWrap>
      <Eyebrow>The problem</Eyebrow>
      <H2>Attention is expensive. Local reach is broken.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        <Card title="Digital ads are crowded and costly" body="CPMs keep climbing while clicks become harder to convert in local markets." />
        <Card title="Traditional outdoor is hard to measure" body="Billboards and posters offer no proof of delivery, frequency, or audience." />
        <Card title="Local businesses need affordable acquisition" body="SMBs in Colombo want predictable reach without enterprise budgets." />
      </div>
    </SectionWrap>
  );
}

function Solution() {
  return (
    <SectionWrap bg="#fff">
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "center" }} className="solution-grid">
        <div>
          <Eyebrow>The solution</Eyebrow>
          <H2>We use existing urban movement.</H2>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 17, color: C.inkSoft, marginTop: 18, lineHeight: 1.6, maxWidth: 620 }}>
            Tuk-tuks already move through the highest-density commercial areas of Colombo every day. We install digital screens, sell campaigns, measure delivery, and share revenue with drivers.
          </p>
        </div>
        <div style={{ borderRadius: 22, overflow: "hidden", border: `4px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}` }}>
          <img src={TUKTUK_INTERIOR} alt="In-tuk-tuk digital screen" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
        <Card title="Captive in-ride attention" />
        <Card title="Street-level visibility" />
        <Card title="GPS-verified delivery" />
        <Card title="Low infrastructure cost" />
      </div>
    </SectionWrap>
  );
}

function WhyTukTuks() {
  return (
    <SectionWrap>
      <Eyebrow>Why this vehicle</Eyebrow>
      <H2>Why tuk-tuks win.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        <Card title="High daily utilization" body="Active across morning, midday, and evening hours." accent />
        <Card title="Constant urban presence" body="Always inside the commercial core, not parked on highways." />
        <Card title="Trusted, familiar vehicle" body="A core part of daily life. Riders don't tune it out." />
        <Card title="Massive existing supply" body="No fleet to build. Inventory scales by onboarding drivers." />
      </div>
    </SectionWrap>
  );
}

function BusinessModel() {
  const flow = [
    "Advertiser pays monthly campaign fee",
    "mydiio keeps platform margin",
    "Driver receives revenue share",
    "More drivers join the network",
  ];
  return (
    <SectionWrap bg="#fff">
      <Eyebrow>Business model</Eyebrow>
      <H2>Simple, repeatable revenue.</H2>
      <div style={{ marginTop: 48, maxWidth: 620, marginInline: "auto", display: "flex", flexDirection: "column", alignItems: "stretch", gap: 14 }}>
        {flow.map((step, i) => (
          <div key={step}>
            <div style={{ background: i === 0 ? C.amber : i === flow.length - 1 ? C.green : "#fff", color: i === flow.length - 1 ? "#fff" : C.ink, border: `3px solid ${C.ink}`, borderRadius: 14, padding: "18px 22px", boxShadow: `4px 4px 0 ${C.ink}`, textAlign: "center", fontFamily: "var(--font-display)", fontSize: 17 }}>
              {step}
            </div>
            {i < flow.length - 1 && (
              <div style={{ textAlign: "center", color: C.ink, fontSize: 22, lineHeight: 1, padding: "6px 0" }}>↓</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        <Card title="Recurring revenue" body="Monthly campaign subscriptions, not one-off bookings." />
        <Card title="Asset-light growth" body="Drivers own the vehicles. We own the network and software." />
        <Card title="High inventory expansion" body="Each new screen adds inventory without proportional cost." />
      </div>
    </SectionWrap>
  );
}

function Market() {
  const cities = ["Colombo", "Kandy", "Galle", "Negombo", "Jaffna", "Regional expansion"];
  return (
    <SectionWrap>
      <Eyebrow>Market</Eyebrow>
      <H2>Large local market. Regional potential.</H2>
      <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 17, color: C.inkSoft, marginTop: 18, lineHeight: 1.6, maxWidth: 620 }}>
        Start with Colombo. Expand into every major Sri Lankan city. Then replicate into tuk-tuk-dense South Asian markets.
      </p>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {cities.map((c, i) => (
          <Card key={c} title={c} accent={i === 0} />
        ))}
      </div>
    </SectionWrap>
  );
}

function Traction() {
  const items = [
    ["Driver interest", "Collected"],
    ["Advertiser meetings", "Started"],
    ["Pilot routes", "Ready"],
    ["Website", "Live"],
    ["Screen sourcing", "Underway"],
  ];
  return (
    <SectionWrap bg="#fff">
      <Eyebrow>Early traction</Eyebrow>
      <H2>Early momentum.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
        {items.map(([k, v]) => (
          <div key={k} className="reveal" style={{ background: C.cream, border: `3px solid ${C.ink}`, borderRadius: 18, padding: "24px 22px", boxShadow: `5px 5px 0 ${C.ink}` }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amber, textTransform: "uppercase" }}>{k}</div>
            <div className="font-display" style={{ fontSize: 22, color: C.ink, marginTop: 10, letterSpacing: "-0.3px" }}>{v}</div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

function WhyNow() {
  return (
    <SectionWrap>
      <Eyebrow>Why now</Eyebrow>
      <H2>Why now.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        <Card title="Cheap screens, better hardware" body="Display and connectivity costs are at an all-time low." />
        <Card title="Local businesses need ROI" body="SMB ad budgets demand measurable, accountable channels." />
        <Card title="Sri Lanka ready for smarter media" body="Digital adoption and mobile payments unlock new formats." />
      </div>
    </SectionWrap>
  );
}

function Defensibility() {
  return (
    <SectionWrap bg="#fff">
      <Eyebrow>Defensibility</Eyebrow>
      <H2>What gets stronger over time.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
        <Card title="Driver network density" />
        <Card title="Route data" />
        <Card title="Advertiser relationships" />
        <Card title="Local brand trust" />
        <Card title="Operational know-how" />
      </div>
    </SectionWrap>
  );
}

function Team() {
  return (
    <SectionWrap>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }} className="solution-grid">
        <div style={{ borderRadius: 22, overflow: "hidden", border: `4px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}` }}>
          <img src={DRIVER_PAYMENT} alt="mydiio team and driver in Colombo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <Eyebrow>Team</Eyebrow>
          <H2>Operator-led, Colombo-built.</H2>
          <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 17, color: C.inkSoft, marginTop: 18, lineHeight: 1.6, maxWidth: 580 }}>
            Built by founders focused on execution, local trust, and category creation.
          </p>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Sri Lankan registered", "Founder led", "Colombo based"].map((b) => (
              <span key={b} className="font-display" style={{ background: "#fff", border: `3px solid ${C.ink}`, color: C.ink, borderRadius: 999, padding: "8px 14px", fontSize: 14, boxShadow: `3px 3px 0 ${C.ink}` }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

function Fundraise() {
  const uses = ["Fleet rollout", "Hardware installs", "Sales hires", "Tech platform", "Operations"];
  return (
    <SectionWrap bg="#fff">
      <Eyebrow>Fundraise</Eyebrow>
      <H2>Currently raising.</H2>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="reveal" style={{ background: C.amberPale, border: `3px solid ${C.ink}`, borderRadius: 18, padding: "28px 26px", boxShadow: `5px 5px 0 ${C.ink}` }}>
          <div className="font-display" style={{ fontSize: 21, color: C.ink, letterSpacing: "-0.3px" }}>Use of funds</div>
          <ul style={{ marginTop: 16, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
            {uses.map((u) => (
              <li key={u} style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.amber, display: "inline-block" }} /> {u}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal" style={{ background: "#fff", border: `3px solid ${C.ink}`, borderRadius: 18, padding: "28px 26px", boxShadow: `5px 5px 0 ${C.ink}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="font-display" style={{ fontSize: 21, color: C.ink, letterSpacing: "-0.3px" }}>Strategic alignment</div>
            <p style={{ fontFamily: "'DM Sans', Nunito, sans-serif", fontWeight: 500, fontSize: 15, color: C.inkSoft, marginTop: 12, lineHeight: 1.55 }}>
              Seeking strategic investors aligned with Sri Lanka growth, media, and urban infrastructure.
            </p>
          </div>
          <a href={MAILTO} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "14px 18px", borderRadius: 12, fontSize: 16, textDecoration: "none", marginTop: 24, display: "inline-block", alignSelf: "flex-start" }}>
            Request investor deck →
          </a>
        </div>
      </div>
    </SectionWrap>
  );
}

function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>
      <img src={FLEET_SUNSET} alt="mydiio tuk-tuks at sunset" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(110% 80% at 50% 30%, rgba(26,26,24,0.5) 0%, rgba(26,26,24,0.82) 60%, rgba(26,26,24,0.96) 100%)" }} />
      <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 12vw, 130px) clamp(20px, 4vw, 32px)", textAlign: "center" }}>
        <Eyebrow>Get involved</Eyebrow>
        <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 54px)", color: "#fff", lineHeight: 1.05, marginTop: 14, letterSpacing: "-1px", textWrap: "balance" as const }}>
          Early stage. Real market. Big surface area.
        </h2>
        <div className="hero-cta-row" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={WA} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 13, fontSize: 17, textDecoration: "none" }}>
            Talk to founder
          </a>
          <a href={MAILTO} className="btn-bold font-display" style={{ background: "transparent", color: "#fff", padding: "16px 22px", borderRadius: 13, fontSize: 17, textDecoration: "none", border: "3px solid #fff" }}>
            Request deck
          </a>
        </div>
      </div>
    </section>
  );
}

function InvestorsPage() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <SiteShell accent="ink">
      <style>{`
        @media (min-width: 860px) {
          .solution-grid { grid-template-columns: 1.1fr 1fr !important; }
        }
      `}</style>
      <Hero />
      <Problem />
      <Solution />
      <WhyTukTuks />
      <BusinessModel />
      <Market />
      <Traction />
      <WhyNow />
      <Defensibility />
      <Team />
      <Fundraise />
      <FinalCTA />
    </SiteShell>
  );
}

