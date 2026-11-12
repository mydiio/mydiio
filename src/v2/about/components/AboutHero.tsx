import { aboutHeading } from "../aboutContent";

export function AboutHero() {
  return (
    <section className="about-hero about-hero-refined about-hero-atlas-static" data-atlas-tone="light" aria-labelledby="about-hero-heading">
      <div className="about-hero-overlay">
        <div className="about-hero-shell">
          <div className="about-hero-kicker">
            <span>ABOUT MYDIIO / 001</span>
            <span className="about-hero-origin"><span className="about-hero-dot" /> BUILT IN SRI LANKA</span>
          </div>
          <div className="about-hero-atlas-grid">
            <div className="about-hero-message">
              <h1 id="about-hero-heading" className="about-hero-title">
                {aboutHeading.includes("every journey") ? (
                  <>
                    {aboutHeading.split("every journey")[0]}
                    <span className="about-brand-accent">every journey</span>
                    {aboutHeading.split("every journey")[1]}
                  </>
                ) : aboutHeading}
              </h1>
              <p className="about-hero-description">Connecting everyday passenger journeys through useful information, local discovery and measurable advertising.</p>
              <div className="about-hero-bottom">
                <span className="about-hero-location">Starting in Colombo</span>
                <a href="#about-story" className="about-hero-discover">Discover our story <span aria-hidden="true">↘</span></a>
              </div>
            </div>
            <div className="about-hero-atlas-media">
              <img src="/assets/colombo-tuk-tuk-street-daytime.png" alt="Tuk-tuks travelling through Colombo streets" loading="eager" decoding="async" />
              <span className="about-hero-atlas-media-caption">EVERYDAY JOURNEYS / SRI LANKA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
