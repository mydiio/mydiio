import { Reveal } from "@/motion";
import { applyEyebrow, applyHeroBody, applyHeroHeading, applyHeroPills } from "../applyContent";

export function DriverApplyHero() {
  return (
    <section className="driver-apply-hero" data-atlas-tone="light">
      <div className="driver-apply-shell driver-apply-hero-shell">
        <Reveal as="div" className="driver-apply-hero-copy">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">{applyEyebrow}</span>
          <h1 className="driver-apply-hero-title">{applyHeroHeading}</h1>
          <p className="driver-apply-hero-body">{applyHeroBody}</p>
        </Reveal>

        <Reveal as="div" className="driver-apply-hero-pills">
          {applyHeroPills.map((p) => (
            <span key={p} className="driver-apply-hero-pill">
              <span className="driver-apply-hero-pill-dot" aria-hidden="true" />
              {p}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
