import { Reveal } from "@/motion";
import { pioneerEyebrow, pioneerHeading, pioneerBody, APPLY_URL } from "../homeContent";

export function HomePioneer() {
  return (
    <section className="home-pioneer" data-atlas-tone="dark">
      <div className="home-shell">
        <Reveal as="div" className="home-pioneer-inner">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">{pioneerEyebrow}</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">{pioneerHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-light">{pioneerBody}</p>

          <a href={APPLY_URL} className="atlas-button-amber">
            Claim a Pioneer spot
          </a>
        </Reveal>
      </div>
    </section>
  );
}
