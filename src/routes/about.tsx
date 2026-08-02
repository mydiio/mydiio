import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";

const INTERIOR_IMG = "/assets/tuktuk-interior-screen.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "What mydiio stands for | Built for people, funded by advertising | mydiio" },
      {
        name: "description",
        content:
          "mydiio is Sri Lanka's first connected passenger network. Built for people, funded by advertising. Radical transparency, driver dignity, and community reinvestment are written into how it works.",
      },
      { property: "og:title", content: "What mydiio stands for | mydiio" },
      {
        property: "og:description",
        content: "Built for people, funded by advertising. The pillars behind the network.",
      },
      { property: "og:url", content: "https://mydiio.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/about" }],
  }),
});

function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: onDark ? C.accent : C.inkMute,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Layer({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div className="reveal" style={{ background: C.paper, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 22 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: C.accentInk, background: C.accentSoft, display: "inline-block", padding: "3px 9px", borderRadius: 999, marginBottom: 12 }}>
        {tag}
      </div>
      <div style={{ fontWeight: 800, fontSize: 19, color: C.ink, marginBottom: 7 }}>{title}</div>
      <div style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

function Pillar({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="reveal" style={{ flex: "1 1 260px", minWidth: 250 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 34, fontWeight: 700, color: C.accent, lineHeight: 1, marginBottom: 12 }}>
        {n}
      </div>
      <div style={{ fontWeight: 800, fontSize: 19, color: C.ink, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

function AboutPage() {
  return (
    <SiteShell accent="green">
      {/* HERO */}
      <section style={{ background: C.bg, padding: "72px 20px 52px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>What mydiio stands for</Eyebrow>
          <h1 className="reveal" style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 800, color: C.ink, margin: "0 0 18px" }}>
            Built for people. Funded by advertising.
          </h1>
          <p className="reveal" style={{ fontSize: 18, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>
            mydiio is Sri Lanka's first connected passenger network. Advertising is the engine that funds it, but it
            is not the reason it exists. The reason is the driver who earns a fair wage, the small business that
            finally reaches its customers, and the passenger who gets something useful on every ride.
          </p>
        </div>
      </section>

      {/* THREE LAYERS */}
      <section style={{ background: C.paper, padding: "60px 20px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <Eyebrow>How it fits together</Eyebrow>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.ink, margin: "0 0 26px" }}>Three layers, one network.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            <Layer tag="Layer one" title="Infrastructure" body="The screens, tablets, GPS, and driver programme. This is the foundation. It costs money to build and every vehicle we add is an investment in it." />
            <Layer tag="Layer two" title="Revenue" body="Advertising. It funds the infrastructure, pays the drivers, and keeps the network running. It has to work on its own, and it does." />
            <Layer tag="Layer three" title="Experience" body="What makes the screen worth watching. Weather, local information, safety alerts, and transport updates that earn the passenger's attention." />
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section style={{ background: C.bg, padding: "60px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 26 }}>
          <div className="reveal">
            <Eyebrow>Mission</Eyebrow>
            <p style={{ fontSize: 19, color: C.ink, lineHeight: 1.55, fontWeight: 600, margin: 0 }}>
              To change the lives of drivers and small business owners, by building the connected infrastructure that
              modernises how Sri Lanka moves.
            </p>
          </div>
          <div className="reveal">
            <Eyebrow>Vision</Eyebrow>
            <p style={{ fontSize: 19, color: C.ink, lineHeight: 1.55, fontWeight: 600, margin: 0 }}>
              To become the passenger information network of South and South East Asia, carrying advertising, public
              information, and transport data at once.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ background: C.paper, padding: "62px 20px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <Eyebrow>The pillars</Eyebrow>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>Three promises that do not flex.</h2>
          <p style={{ fontSize: 15.5, color: C.inkMute, margin: "0 0 32px", maxWidth: 620, lineHeight: 1.6 }}>
            These are written into how the company works. If a commercial opportunity asks us to break one of them,
            we turn it down.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <Pillar n="01" title="Radical transparency" body="Every advertiser sees exactly which vehicles showed their ad, when, and where. GPS-verified and timestamped. No black box, no estimated figures. If the data does not support a claim, we do not make it." />
            <Pillar n="02" title="Driver dignity" body="Drivers are partners, not vendors. Paid on the 5th of every month without exception, with a written agreement before any hardware goes in, and never penalised for faults outside their control." />
            <Pillar n="03" title="Community reinvestment" body="A share of net revenue goes back into the communities our drivers serve. The commitment exists from day one, and grows as the network grows." />
          </div>
        </div>
      </section>

      {/* DRIVERS */}
      <section style={{ background: C.ink, color: C.onDark, padding: "60px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 36, alignItems: "center" }}>
          <div>
            <Eyebrow onDark>For drivers</Eyebrow>
            <h2 className="reveal" style={{ fontSize: 30, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
              A screen that pays, and a partner that shows up.
            </h2>
            <p className="reveal" style={{ fontSize: 16, color: "rgba(253,250,243,0.82)", lineHeight: 1.7, margin: "0 0 22px" }}>
              Drivers earn a guaranteed monthly income, paid on the 5th, every month. They keep driving their own
              route, their own way. The screen does the rest. If you drive in Colombo and want in, the founding
              places are limited.
            </p>
            <a href="/drive" className="btn-bold" style={{ background: C.accent, color: C.accentInk, padding: "13px 24px", borderRadius: 12, fontWeight: 800, fontSize: 15.5, textDecoration: "none", display: "inline-block" }}>
              Become a driver partner
            </a>
          </div>
          <div className="reveal" style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 44px rgba(0,0,0,0.3)" }}>
            <img src={INTERIOR_IMG} alt="A mydiio screen mounted inside a tuk-tuk" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </section>

      {/* CTA BACK TO ADVERTISE */}
      <section style={{ background: C.bg, padding: "58px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 className="reveal" style={{ fontSize: 28, fontWeight: 800, color: C.ink, margin: "0 0 14px", lineHeight: 1.25 }}>
            Want your brand on the network?
          </h2>
          <p className="reveal" style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>
            See how advertising works, what it costs, and how the Pioneer spots are filling up.
          </p>
          <a href="/" className="btn-bold" style={{ background: C.accent, color: C.accentInk, padding: "13px 26px", borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
            See advertising
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
