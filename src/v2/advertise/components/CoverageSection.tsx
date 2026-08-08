import {
  coverageEyebrow,
  coverageHeading,
  coverageBody,
  corridorStops,
  expansionLabel,
  expansionBody,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function CoverageSection() {
  return (
    <section className="advertiser-coverage" data-atlas-tone="light">
      <div className="advertiser-shell advertiser-coverage-grid">
        <Reveal as="header" className="advertiser-coverage-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{coverageEyebrow}</div>

          <h2 className="atlas-section-heading">{coverageHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-dark">{coverageBody}</p>

          <div className="advertiser-live-status">Live today</div>
        </Reveal>

        <div className="advertiser-corridor" aria-label="Current mydiio live area">
          <div className="advertiser-corridor-heading">
            <span>Colombo South</span>
            <strong>Live area</strong>
          </div>

          <Reveal as="ol" className="advertiser-corridor-list">
            {corridorStops.map((stop) => (
              <li key={stop.name} className="advertiser-corridor-row">
                <span className="advertiser-corridor-node" aria-hidden="true" />
                <span className="advertiser-corridor-number">{stop.number}</span>
                <strong>{stop.name}</strong>
                <span className="advertiser-corridor-status">Active</span>
              </li>
            ))}
          </Reveal>

          <div className="advertiser-expansion-note">
            <span>{expansionLabel}</span>
            <p>{expansionBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
