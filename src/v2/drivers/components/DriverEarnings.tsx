import { earningsEyebrow, earningsHeading, earningsBody, earningsInputs } from "../driverContent";
import { Reveal } from "@/motion";

export function DriverEarnings() {
  return (
    <section id="earnings" className="driver-earnings" data-atlas-tone="light">
      <div className="driver-shell">
        <Reveal as="header" className="driver-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{earningsEyebrow}</div>

          <h2 className="atlas-section-heading">{earningsHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-dark">{earningsBody}</p>
        </Reveal>

        <Reveal as="div" className="driver-earnings-grid">
          {earningsInputs.map((item) => (
            <article className="driver-earnings-item" key={item.number}>
              <div className="driver-item-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
