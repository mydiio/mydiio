import { Reveal } from "@/motion";
import {
  privacyEffective,
  privacyHeroBody,
  privacyHeroEyebrow,
  privacyHeroHeading,
  privacyLastReviewed,
} from "../privacyContent";

export function PrivacyHero() {
  return (
    <section className="privacy-hero" data-atlas-tone="light">
      <div className="privacy-shell privacy-hero-shell">
        <Reveal>
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {privacyHeroEyebrow}
          </span>
        </Reveal>

        <Reveal as="h1" className="privacy-hero-title">
          {privacyHeroHeading}
        </Reveal>

        <Reveal>
          <p className="privacy-hero-body">{privacyHeroBody}</p>
        </Reveal>

        <Reveal>
          <div className="privacy-hero-meta">
            <span>Effective {privacyEffective}</span>
            <span aria-hidden="true">·</span>
            <span>Last reviewed {privacyLastReviewed}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
