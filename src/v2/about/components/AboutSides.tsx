import { Reveal } from "@/motion";

const perspectives = [
  {
    key: "passengers", number: "01", eyebrow: "FOR PASSENGERS",
    title: "A more useful journey.",
    body: "Useful information, local discoveries and relevant offers along the way.",
    proof: "Local updates and offers",
    cta: "Explore the passenger experience", href: "/contact",
    image: "/assets/about-perspectives/about-passengers.webp",
    alt: "Passenger inside a Colombo tuk-tuk looking towards an information screen",
  },
  {
    key: "drivers", number: "02", eyebrow: "FOR DRIVERS",
    title: "More value from every journey.",
    body: "Earn additional income on your usual routes, with clear terms and monthly payments.",
    proof: "LKR 4,000 base + up to LKR 2,000 bonus*",
    cta: "Explore the driver network", href: "/drive",
    image: "/assets/about-perspectives/about-drivers.webp",
    alt: "Smiling Sri Lankan tuk-tuk driver in his vehicle",
  },
  {
    key: "businesses", number: "03", eyebrow: "FOR BUSINESSES",
    title: "Local reach you can measure.",
    body: "Reach passengers on real journeys, with transparent campaign reporting.",
    proof: "GPS evidence and weekly reports",
    cta: "Explore advertising", href: "/advertise",
    image: "/assets/about-perspectives/about-businesses.webp",
    alt: "Sri Lankan business owner reviewing a campaign on her laptop",
  },
] as const;

export function AboutSides() {
  return (
    <section className="about-perspectives" data-atlas-tone="light" aria-labelledby="about-perspectives-title">
      <div className="about-shell">
        <Reveal as="header" className="about-perspectives-intro">
          <div className="about-perspectives-topline">
            <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">03 / WHO WE CONNECT</span>
            <span className="about-perspectives-overline">PASSENGERS. DRIVERS. BUSINESSES.</span>
          </div>
          <h2 id="about-perspectives-title">One network.<br /><span className="about-brand-accent">Three perspectives.</span></h2>
          <p>mydiio connects passengers, drivers and businesses through one shared journey. Each plays a different role. Each receives something valuable in return.</p>
        </Reveal>
        <div className="about-perspectives-grid">
          {perspectives.map((item) => (
            <Reveal as="article" className={`about-perspective-card about-perspective-${item.key}`} key={item.key}>
              <div className="about-perspective-image-wrap">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              </div>
              <div className="about-perspective-card-meta" aria-label={`Perspective ${item.number}`}>
                <span className="about-perspective-image-index">{item.number}</span>
                <span className="about-perspective-meta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                    {item.key === "passengers" ? (
                      <>
                        <circle cx="9" cy="8" r="3" />
                        <path d="M3.5 20v-2.3A5.7 5.7 0 0 1 9.2 12h.3a5.7 5.7 0 0 1 5.7 5.7V20z" />
                        <path d="M16 5.5a2.8 2.8 0 0 1 0 5.5M17 13c2.2.4 3.5 2.1 3.5 4.6V20" />
                      </>
                    ) : item.key === "drivers" ? (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M4 9.5h16M12 14v7M6.5 9.5 10 12M17.5 9.5 14 12" />
                      </>
                    ) : (
                      <>
                        <path d="M3 10v4h4l11 5V5L7 10z" />
                        <path d="m7 14 2 6h3l-2-5M21 9l2-1M21 15l2 1" />
                      </>
                    )}
                  </svg>
                </span>
              </div>
              <div className="about-perspective-content">
                <span className="about-perspective-eyebrow">{item.number} / {item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="about-perspective-proof"><span className="about-perspective-proof-mark" aria-hidden="true">✦</span>{item.proof}</div>
                <a href={item.href} className="about-perspective-link">{item.cta}<span aria-hidden="true">↗</span></a>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="about-perspectives-footer">
          <span className="about-perspectives-rule" aria-hidden="true" />
          <span className="about-perspectives-footer-mark" aria-hidden="true">✦</span>
          <span>Three connected groups. One shared network.</span>
          <span className="about-perspectives-rule" aria-hidden="true" />
        </div>
        <p className="about-perspectives-footnote">*Bonus is conditional on eligible service activity and capped at LKR 2,000 per month.</p>
      </div>
    </section>
  );
}
