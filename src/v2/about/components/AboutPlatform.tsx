import { Reveal } from "@/motion";
import { aboutPlatformHeading, aboutPlatformBody, aboutPortals } from "../aboutContent";

export function AboutPlatform() {
  return (
    <section className="about-platform" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            The operating system
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            {aboutPlatformHeading}
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{aboutPlatformBody}</p>
        </Reveal>

        <Reveal as="div" className="about-platform-grid" stagger={0.06}>
          {aboutPortals.map((portal) => (
            <article key={portal.name} className="about-platform-card">
              <span className="about-platform-name">{portal.name}</span>
              <span className="about-platform-role">{portal.role}</span>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
