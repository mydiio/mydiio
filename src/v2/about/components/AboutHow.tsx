import { Reveal } from "@/motion";
import { aboutHowHeading, aboutHowSteps } from "../aboutContent";

export function AboutHow() {
  return (
    <section className="about-how" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">The plain version</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">{aboutHowHeading}</h2>
        </Reveal>

        <Reveal as="ol" className="about-how-track" stagger={0.08}>
          {aboutHowSteps.map((step) => (
            <li key={step.n} className="about-how-step">
              <span className="about-how-step-n">{step.n}</span>
              <div className="about-how-step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
