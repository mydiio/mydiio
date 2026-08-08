import { Reveal } from "@/motion";
import { aboutSafetyHeading, aboutSafetyBody, aboutSafetyPillars } from "../aboutContent";

export function AboutSafety() {
  return (
    <section className="about-safety" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            Reliability and safety
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            {aboutSafetyHeading}
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{aboutSafetyBody}</p>
        </Reveal>

        <Reveal as="div" className="about-safety-grid" stagger={0.07}>
          {aboutSafetyPillars.map((pillar) => (
            <article key={pillar.title} className="about-safety-card">
              <h3 className="about-safety-title">{pillar.title}</h3>
              <p className="about-safety-body">{pillar.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
