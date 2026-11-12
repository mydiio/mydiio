import { Reveal } from "@/motion";

const milestones = [
  {
    number: "02",
    phase: "NEXT",
    symbol: "✳",
    title: "Public alerts",
    description: "Emergency and community notices, subject to trusted partners and reliable delivery."
  },
  {
    number: "03",
    phase: "FUTURE",
    symbol: "⌖",
    title: "Smarter journeys",
    description: "Transport updates, tourism information and local discovery."
  },
  {
    number: "04",
    phase: "FUTURE",
    symbol: "◇",
    title: "A wider network",
    description: "More vehicle types and markets, following testing and partnerships."
  }
];

export function AboutFuture() {
  return (
    <section
      className="about-future about-roadmap-v4"
      data-atlas-tone="light"
      aria-labelledby="about-roadmap-heading"
    >
      <div className="about-shell">
        <Reveal as="header" className="about-roadmap-intro">
          <div className="about-roadmap-meta">
            <span>04 / BEYOND ADVERTISING</span>
            <span>THE ROAD AHEAD</span>
          </div>

          <h2 id="about-roadmap-heading">
            More than a screen.
            <br />
            <span className="about-brand-accent">A connected journey.</span>
          </h2>

          <p>
            We're starting with useful information for passengers,
            then building towards a more connected transport experience.
          </p>
        </Reveal>

        <Reveal as="div" className="about-roadmap-feature">
          <div className="about-roadmap-art" aria-hidden="true">
            <img
              className="about-roadmap-photo"
              src="/assets/campaign-studio/campaign-teaser-poster.webp"
              alt="mydiio campaign artwork featuring a tuk-tuk with its passenger screen"
              loading="lazy"
              decoding="async"
            />
<div className="about-roadmap-art-foot">
              MYDIIO / COLOMBO
            </div>
          </div>

          <div className="about-roadmap-feature-copy">
            <div className="about-roadmap-feature-top">
              <span>01 / PLANNED LAUNCH</span>
              <span className="about-roadmap-status">
                FIRST PHASE
              </span>
            </div>

            <h3>
              Useful information,
              <br />
              <span className="about-brand-accent">every journey.</span>
            </h3>

            <p>
              Weather, news and public information alongside
              advertising, designed for everyday passengers.
            </p>

            <div className="about-roadmap-feature-bottom">
              STARTING WITH TUK-TUKS
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </Reveal>

        <Reveal
          as="ol"
          className="about-roadmap-milestones"
          stagger={0.08}
        >
          {milestones.map((item) => (
            <li
              key={item.number}
              className="about-roadmap-milestone"
            >
              <div className="about-roadmap-milestone-top">
                <span className="about-roadmap-icon" aria-hidden="true">
                  {item.symbol}
                </span>
                <span>
                  {item.number} / {item.phase}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </Reveal>

        <p className="about-roadmap-disclaimer">
          Future capabilities are planned directions, not services
          currently guaranteed or included in launch packages.
        </p>
      </div>
    </section>
  );
}