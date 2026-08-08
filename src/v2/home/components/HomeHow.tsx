import { Reveal } from "@/motion";
import { howEyebrow, howHeading, howSteps } from "../homeContent";

export function HomeHow() {
  return (
    <section className="home-how" data-atlas-tone="light">
      <div className="home-shell">
        <Reveal as="header" className="home-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{howEyebrow}</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">{howHeading}</h2>
        </Reveal>

        <Reveal as="ol" className="home-how-steps" stagger={0.1}>
          {howSteps.map((step) => (
            <li key={step.n} className="home-how-step">
              <span className="home-how-number">{String(step.n).padStart(2, "0")}</span>
              <div>
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
