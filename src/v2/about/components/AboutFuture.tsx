import { Reveal } from "@/motion";
import { aboutFutureHeading, aboutFutureBody, aboutFuture } from "../aboutContent";

const cadenceLabel: Record<"live" | "soon" | "next", string> = {
  live: "Live today",
  soon: "Next",
  next: "Ahead",
};

export function AboutFuture() {
  return (
    <section className="about-future" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            Beyond advertising
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            {aboutFutureHeading}
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{aboutFutureBody}</p>
        </Reveal>

        <Reveal as="ol" className="about-future-track" stagger={0.08}>
          {aboutFuture.map((item, i) => (
            <li
              key={item.title}
              className={`about-future-item about-future-item-${item.cadence}`}
            >
              <header className="about-future-item-head">
                <span className="about-future-step">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="about-future-cadence">
                  {cadenceLabel[item.cadence]}
                </span>
              </header>
              <div className="about-future-body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
