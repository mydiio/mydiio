import { Reveal } from "@/motion";
import { differenceHeading, differenceBody } from "../homeContent";

export function HomeDifference() {
  return (
    <section className="home-difference" data-atlas-tone="light">
      <div className="home-shell">
        <Reveal as="header" className="home-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Why mydiio</div>
          <h2 className="atlas-section-heading">{differenceHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{differenceBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
