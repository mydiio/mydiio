import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { Reveal, useParallax } from "@/motion";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";

const DASHBOARD_IMG = "/assets/advertiser-pharmacy-dashboard.png";

const WHATSAPP = "https://wa.me/94707471002";
const APPLY = "/advertise#apply-section";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Advertise on Colombo's tuk-tuks | GPS-verified plays | mydiio" },
      {
        name: "description",
        content:
          "Put your brand on screens inside Colombo tuk-tuks. Every play GPS-verified, a report every Monday, your own portal to build ads and track plays. Campaigns from LKR 25,000 with 7 days free.",
      },
      { property: "og:title", content: "Advertise on Colombo's tuk-tuks | mydiio" },
      {
        property: "og:description",
        content:
          "GPS-verified plays. Weekly reports. Your own advertiser portal. From LKR 25,000 a month with 7 days free.",
      },
      { property: "og:image", content: DASHBOARD_IMG },
      { property: "og:url", content: "https://mydiio.com/" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "mydiio Connected Passenger Information Network",
          provider: { "@type": "Organization", name: "mydiio", url: "https://mydiio.com" },
          description:
            "GPS-verified digital advertising on screens inside Colombo tuk-tuks. Advertisers build and submit ads in their own portal, campaigns go live within 72 hours after review, and every play is reported with GPS verification.",
          areaServed: { "@type": "City", name: "Colombo" },
          offers: {
            "@type": "Offer",
            priceCurrency: "LKR",
            price: "25000",
            description: "Roamer, entry tier, up to 5 tuk-tuks, 500 minutes, 3-month minimum",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I know my ad actually played?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Every Monday you receive a GPS-verified report showing each vehicle that ran your ad, the GPS location at the time of each play, and the total play count. Every impression is logged.",
              },
            },
            {
              "@type": "Question",
              name: "Can I build my own ad?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Inside your portal you upload your logo and photos, preview your ad, and submit it. Every ad is reviewed before it runs, and goes live within 72 hours. We can also make your first creative for free from your existing branding.",
              },
            },
            {
              "@type": "Question",
              name: "What happens when my minutes run low?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can buy more minutes in your portal at any time to keep your ad running, with no need to wait for your next billing cycle.",
              },
            },
            {
              "@type": "Question",
              name: "What is Pioneer corridor exclusivity?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pioneer advertisers get twelve months of exclusivity on a defined corridor for their category, agreed at sign-up, so no other business in your category runs on that route during your first twelve months. Your per-minute rate is fixed for the life of your subscription.",
              },
            },
            {
              "@type": "Question",
              name: "What does the LKR 5,000 deposit cover?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The LKR 5,000 deposit secures your spot. It is fully refundable, credited against your first invoice when you proceed, or returned in full if you decide not to.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: C.inkMute,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function ProofItem({ head, sub }: { head: string; sub: string }) {
  return (
    <Reveal>
      <div style={{ flex: "1 1 200px", minWidth: 180 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.ink, marginBottom: 4 }}>{head}</div>
        <div style={{ fontSize: 13.5, color: C.inkMute, lineHeight: 1.5 }}>{sub}</div>
      </div>
    </Reveal>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <Reveal>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div
        style={{
          flex: "0 0 auto",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: C.accent,
          color: C.accentInk,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 17,
        }}
      >
        {n}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 17, color: C.ink, marginBottom: 5 }}>{title}</div>
        <div style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.6 }}>{body}</div>
      </div>
      </div>
    </Reveal>
  );
}

function PlanCard({
  name,
  price,
  meta,
  points,
  featured,
}: {
  name: string;
  price: string;
  meta: string;
  points: string[];
  featured?: boolean;
}) {
  return (
    <Reveal>
      <div
      style={{
        flex: "1 1 240px",
        minWidth: 230,
        background: featured ? C.ink : C.paper,
        color: featured ? C.onDark : C.ink,
        border: `1px solid ${featured ? C.ink : "rgba(0,0,0,0.10)"}`,
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 800, fontSize: 18 }}>{name}</span>
        {featured && (
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              background: C.accent,
              color: C.accentInk,
              padding: "3px 8px",
              borderRadius: 999,
            }}
          >
            10 spots ever
          </span>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800 }}>{price}</div>
      <div style={{ fontSize: 13, color: featured ? "rgba(253,250,243,0.7)" : C.inkMute }}>{meta}</div>
      <div style={{ height: 1, background: featured ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }} />
      <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>
        {points.map((p) => (
          <li key={p} style={{ fontSize: 14, lineHeight: 1.5, color: featured ? "rgba(253,250,243,0.9)" : C.inkSoft }}>
            {p}
          </li>
        ))}
      </ul>
      </div>
    </Reveal>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <Reveal>
      <details
      style={{ borderBottom: "1px solid rgba(0,0,0,0.10)", padding: "16px 0" }}
    >
      <summary style={{ fontWeight: 700, fontSize: 16, color: C.ink, cursor: "pointer", listStyle: "none" }}>
        {q}
      </summary>
      <p style={{ margin: "10px 0 0", fontSize: 15, color: C.inkSoft, lineHeight: 1.6 }}>{a}</p>
      </details>
    </Reveal>
  );
}

function HomePage() {
  const dashboardParallax = useParallax(0.15);

  return (
    <SiteShell accent="amber">
      {/* HERO */}
      <section style={{ background: C.bg, padding: "72px 20px 56px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <Reveal>
              <Eyebrow>Sri Lanka's first connected passenger network</Eyebrow>
            </Reveal>

            <Reveal stagger={0.08}>
              <h1 style={{ fontSize: 46, lineHeight: 1.05, fontWeight: 800, color: C.ink, margin: 0 }}>
                Your ad inside Colombo's tuk-tuks. Every play proven by GPS.
              </h1>
            </Reveal>

            <Reveal stagger={0.16}>
              <p
                style={{ fontSize: 18, color: C.inkSoft, lineHeight: 1.6, margin: "20px 0 28px", maxWidth: 520 }}
              >
                Reach passengers on real Colombo routes. Build your ad in your own portal, watch every GPS-verified
                play, and get a report every Monday. Campaigns from LKR 25,000 a month with 7 days free.
              </p>
            </Reveal>

            <Reveal stagger={0.24}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={APPLY} className="btn-bold" style={{ background: C.accent, color: C.accentInk, padding: "14px 24px", borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
                  Claim your spot
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-bold" style={{ background: C.paper, color: C.ink, padding: "14px 24px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", border: "1px solid rgba(0,0,0,0.12)" }}>
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal stagger={0.32}>
              <div style={{ marginTop: 22, fontSize: 13.5, color: C.inkMute, lineHeight: 1.6 }}>
                10 Pioneer spots ever. Category locked for 12 months. Rate locked for life.
              </div>
            </Reveal>
          </div>
          <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }}>
            <img src={HERO_PHOTO} alt="A mydiio screen inside a Colombo tuk-tuk" style={{ width: "100%", display: "block" }} />
          </div>
          </Reveal>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section style={{ background: C.paper, padding: "36px 20px", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <Reveal stagger={0.08}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 28, flexWrap: "wrap" }}>
            <ProofItem head="GPS-verified plays" sub="Every impression logged with its location and time. No black box." />
            <ProofItem head="Your own portal" sub="Log in to build ads, track plays, and pull reports yourself." />
            <ProofItem head="A report every Monday" sub="See exactly which vehicles ran your ad, and where." />
            <ProofItem head="Refundable deposit" sub="LKR 5,000 secures your spot. Fully refundable." />
          </div>
        </Reveal>
      </section>

      {/* THE DIFFERENCE */}
      <section style={{ background: C.bg, padding: "64px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>Why mydiio</Eyebrow>
          <Reveal>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: C.ink, margin: "0 0 16px", lineHeight: 1.15 }}>
              Most local advertising asks you to trust a number. We show you the map.
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>
              When your ad plays on a mydiio screen, we record where and when. You do not get an estimate. You get a
              GPS-verified log of every play, in your portal and in your Monday report. That is the whole point of the
              network, and it is what no printed poster or roadside board can give you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: C.paper, padding: "64px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: C.ink, margin: "0 0 32px" }}>Four steps to live.</h2>
          <Reveal stagger={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <Step n={1} title="Reserve your spot" body="A refundable LKR 5,000 deposit holds your place. Credited to your first invoice, or returned in full if you decide not to proceed." />
              <Step n={2} title="Build your ad" body="Upload your logo and photos in your portal, preview the result, and submit. Prefer we do it? We make your first creative free from your existing branding." />
              <Step n={3} title="We review, then go live" body="Every ad is checked before it runs, so the network stays clean. Approved ads are live within 72 hours." />
              <Step n={4} title="Track and top up" body="Watch GPS-verified plays on your dashboard, pull a report every Monday, and buy more minutes in your portal whenever you run low." />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PORTAL */}
      <section style={{ background: C.bg, padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 40, alignItems: "center" }}>
          <Reveal><div ref={dashboardParallax} style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", order: 1 }}>
            <img src={DASHBOARD_IMG} alt="The mydiio advertiser portal dashboard" style={{ width: "100%", display: "block" }} />
          </div>
          </Reveal>
          <div style={{ order: 2 }}>
            <Eyebrow>Your advertiser portal</Eyebrow>
            <Reveal><h2 style={{ fontSize: 32, fontWeight: 800, color: C.ink, margin: "0 0 16px", lineHeight: 1.2 }}>
              Everything in one login.
            </h2></Reveal>
            <Reveal><p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 18px" }}>
              When you sign up you get your own portal, not a shared inbox. It is where you run your advertising and
              check that it is working.
            </p></Reveal>
            <Reveal stagger={0.06}><ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 9 }}>
              <li style={{ fontSize: 15.5, color: C.inkSoft, lineHeight: 1.5 }}>A dashboard with your live campaigns at a glance</li>
              <li style={{ fontSize: 15.5, color: C.inkSoft, lineHeight: 1.5 }}>An ad builder to upload, preview, and submit your creative</li>
              <li style={{ fontSize: 15.5, color: C.inkSoft, lineHeight: 1.5 }}>A creatives library for everything you have run</li>
              <li style={{ fontSize: 15.5, color: C.inkSoft, lineHeight: 1.5 }}>Reports with GPS-verified plays, refreshed every week</li>
              <li style={{ fontSize: 15.5, color: C.inkSoft, lineHeight: 1.5 }}>Top-ups and Peak time slots you can add yourself</li>
            </ul></Reveal>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section style={{ background: C.paper, padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow>Plans</Eyebrow>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: C.ink, margin: "0 0 10px" }}>Clear pricing. No surprises.</h2>
          <p style={{ fontSize: 15.5, color: C.inkMute, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.6 }}>
            All subscriptions run a 3-month minimum with 7 days free and a refundable LKR 5,000 deposit. Peak time
            slots add 30 percent, off-peak takes 20 percent off, and you can add either in your portal. Prices shown
            are a starting point.
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <PlanCard
              name="Roamer"
              price="From LKR 25,000"
              meta="per month"
              points={["Up to 5 tuks", "500 minutes included", "Add Peak time slots in-portal", "Top up minutes anytime"]}
            />
            <PlanCard
              name="Voyager"
              price="From LKR 38,000"
              meta="per month"
              points={["Up to 15 tuks", "1,800 minutes included", "Add Peak time slots in-portal", "Top up minutes anytime"]}
            />
            <PlanCard
              name="Pioneer"
              price="From LKR 25,000"
              meta="per month"
              featured
              points={["12-month category exclusivity", "Per-minute rate fixed for life", "2,000 minutes included", "Only 10 spots will ever exist"]}
            />
            <PlanCard
              name="Horizon"
              price="From LKR 65,000"
              meta="per month, custom"
              points={["For larger fleets", "Custom minutes and terms", "Negotiated per-minute rate", "Built around your campaign"]}
            />
          </div>
          <p style={{ fontSize: 14, color: C.inkMute, margin: "22px 0 0", lineHeight: 1.6 }}>
            Need something short and fast? Burst packages run with no contract, gap-fill only: Spark LKR 5,000, Blast
            LKR 18,000, Surge LKR 40,000.
          </p>
          <p style={{ fontSize: 14, color: C.inkMute, margin: "10px 0 0", lineHeight: 1.6 }}>
            We are early on purpose. Our pilot runs the Dehiwala, Mount Lavinia and Ratmalana corridor and the fleet
            is growing. Pioneer spots are limited because the network is young, and the early advertisers set the
            standard.
          </p>
        </div>
      </section>

      {/* PIONEER BAND */}
      <section style={{ background: C.ink, color: C.onDark, padding: "56px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginBottom: 14 }}>
            The Pioneer offer
          </div>
          <Reveal>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
              Ten businesses lock their category. Everyone else waits.
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ fontSize: 17, color: "rgba(253,250,243,0.82)", lineHeight: 1.7, margin: "0 0 26px" }}>
              A Pioneer spot gives your category twelve months of exclusivity on your corridor, and fixes your
              per-minute rate for as long as you stay. There will only ever be ten. When they are gone, they are gone.
            </p>
          </Reveal>
          <a href={APPLY} className="btn-bold" style={{ background: C.accent, color: C.accentInk, padding: "14px 28px", borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
            Claim a Pioneer spot
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: C.bg, padding: "60px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Eyebrow>Questions</Eyebrow>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.ink, margin: "0 0 18px" }}>Good to know.</h2>
          <Faq q="How do I know my ad actually played?" a="Every Monday you receive a GPS-verified report showing each vehicle that ran your ad, the GPS location at the time of each play, and the total play count. Every impression is logged." />
          <Faq q="Can I build my own ad?" a="Yes. In your portal you upload your logo and photos, preview your ad, and submit it. Every ad is reviewed before it runs and goes live within 72 hours. We can also make your first creative for free." />
          <Faq q="What happens when my minutes run low?" a="You can buy more minutes in your portal at any time to keep your ad running, without waiting for your next billing cycle." />
          <Faq q="Can I cancel?" a="Subscriptions have a 3-month minimum term. After that you can cancel with 30 days notice. Burst packages have no contract and simply run until the minutes or validity are used up." />
          <Faq q="What does the LKR 5,000 deposit cover?" a="It secures your spot. The deposit is fully refundable, credited against your first invoice when you proceed, or returned in full if you decide not to." />
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: C.paper, padding: "64px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: C.ink, margin: "0 0 14px", lineHeight: 1.2 }}>
              Put your brand on the road this week.
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ fontSize: 16.5, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 26px" }}>
              Reserve your spot with a refundable deposit, or message us on WhatsApp and we will walk you through it.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={APPLY} className="btn-bold" style={{ background: C.accent, color: C.accentInk, padding: "14px 26px", borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
              Claim your spot
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-bold" style={{ background: C.paper, color: C.ink, padding: "14px 26px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", border: "1px solid rgba(0,0,0,0.12)" }}>
              Chat on WhatsApp
            </a>
            </div>
          </Reveal>
          <p style={{ marginTop: 22, fontSize: 14, color: C.inkMute }}>
            hello@mydiio.com &nbsp;·&nbsp; 070 747 1002 &nbsp;·&nbsp;{" "}
            <a href="/about" style={{ color: C.inkSoft }}>What mydiio stands for</a>
          </p>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with mydiio sales on WhatsApp"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 50,
          background: C.green,
          color: "#fff",
          padding: "13px 18px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
        }}
      >
        Chat with sales
      </a>
    </SiteShell>
  );
}
