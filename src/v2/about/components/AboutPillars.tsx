import { useState } from "react";
import { Reveal } from "@/motion";
import { aboutPillars, aboutPillarsHeading, aboutPillarsBody } from "../aboutContent";

export function AboutPillars() {
  const [activeId, setActiveId] = useState<string>(aboutPillars[0].id);

  return (
    <section className="about-pillars" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">The pillars</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            {aboutPillarsHeading}
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{aboutPillarsBody}</p>
        </Reveal>

        <Reveal as="div" className="about-pillars-board">
          <div className="about-pillars-rail" role="tablist" aria-label="Pillars">
            {aboutPillars.map((pillar) => {
              const active = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`about-pillar-panel-${pillar.id}`}
                  id={`about-pillar-tab-${pillar.id}`}
                  className={["about-pillars-tab", active ? "is-active" : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setActiveId(pillar.id)}
                  onMouseEnter={() => setActiveId(pillar.id)}
                  onFocus={() => setActiveId(pillar.id)}
                >
                  <span className="about-pillars-tab-number">{pillar.number}</span>
                  <span className="about-pillars-tab-title">{pillar.title}</span>
                </button>
              );
            })}
          </div>

          <div className="about-pillars-stage">
            {aboutPillars.map((pillar) => {
              const active = pillar.id === activeId;
              return (
                <article
                  key={pillar.id}
                  role="tabpanel"
                  id={`about-pillar-panel-${pillar.id}`}
                  aria-labelledby={`about-pillar-tab-${pillar.id}`}
                  className={["about-pillars-card", active ? "is-active" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="about-pillars-card-number">{pillar.number}</span>
                  <h3 className="about-pillars-card-title">{pillar.title}</h3>
                  <p className="about-pillars-card-body">{pillar.body}</p>
                  <span className="about-pillars-card-proof">{pillar.proof}</span>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
