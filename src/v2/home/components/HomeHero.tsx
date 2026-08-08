import { Reveal, useParallax } from "@/motion";
import HERO_PHOTO from "@/assets/hero-tuktuk.png";
import {
  homeEyebrow,
  homeHeroTitle,
  homeHeroBody,
  WHATSAPP_URL,
  APPLY_URL,
} from "../homeContent";

export function HomeHero() {
  const heroImageParallax = useParallax(0.08);

  return (
    <section className="home-hero" data-atlas-tone="light">
      <div className="home-shell home-hero-grid">
        <div className="home-hero-copy">
          <Reveal>
            <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{homeEyebrow}</div>
          </Reveal>

          <Reveal as="h1" className="home-hero-title">
            {homeHeroTitle}
          </Reveal>

          <Reveal>
            <p className="home-hero-body">{homeHeroBody}</p>
          </Reveal>

          <Reveal>
            <div className="home-hero-actions">
              <a href={APPLY_URL} className="atlas-button-amber">
                Claim your spot
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-button-secondary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal>
            <p className="home-anchor-note">
              10 Pioneer spots ever. Category locked for 12 months. Rate locked for life.
            </p>
          </Reveal>
        </div>

        <Reveal as="div" className="home-hero-stage">
          <div className="home-hero-image" ref={heroImageParallax}>
            <img src={HERO_PHOTO} alt="A mydiio screen inside a Colombo tuk-tuk" loading="eager" />
            <div className="home-hero-image-overlay" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
