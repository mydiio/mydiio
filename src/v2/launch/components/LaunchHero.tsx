import { Reveal } from "@/motion";
import { launchEyebrow, launchHeading, launchBody } from "../launchContent";

export function LaunchHero() {
  return (
    <section className="launch-hero" data-atlas-tone="light">
      <div className="launch-shell launch-hero-shell">
        <Reveal as="div" className="launch-hero-copy">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">{launchEyebrow}</span>
          <h1 className="launch-hero-title">{launchHeading}</h1>
          <p className="launch-hero-body">{launchBody}</p>
        </Reveal>

        <Reveal as="div" className="launch-hero-meta" aria-hidden="false">
          <span className="launch-hero-pill">
            <span className="launch-hero-pill-dot" aria-hidden="true" />
            No payment today
          </span>
          <span className="launch-hero-pill">
            <span className="launch-hero-pill-dot" aria-hidden="true" />
            Usually 24 hours · up to 48 in exceptional cases
          </span>
          <span className="launch-hero-pill">
            <span className="launch-hero-pill-dot" aria-hidden="true" />
            Paid plans. Clear delivery terms.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
