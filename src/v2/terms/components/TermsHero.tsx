import { Reveal } from "@/motion";
import {
  termsEffective,
  termsHeroBody,
  termsHeroEyebrow,
  termsHeroHeading,
  termsVersion,
} from "../termsContent";

export function TermsHero() {
  return (
    <section className="terms-hero" data-atlas-tone="light">
      <div className="terms-shell terms-hero-shell">
        <Reveal>
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {termsHeroEyebrow}
          </span>
        </Reveal>

        <Reveal as="h1" className="terms-hero-title">
          {termsHeroHeading}
        </Reveal>

        <Reveal>
          <p className="terms-hero-body">{termsHeroBody}</p>
        </Reveal>

        <Reveal>
          <div className="terms-hero-meta">
            <span>Effective {termsEffective}</span>
            <span aria-hidden="true">·</span>
            <span>Version {termsVersion}</span>
            <span aria-hidden="true">·</span>
            <span>Start Smart Technologies, trading as mydiio</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
