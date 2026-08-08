import {
  coverageEyebrow,
  coverageHeading,
  coverageBody,
  corridorStops,
  expansionLabel,
  expansionBody,
} from "../driverContent";
import { Reveal } from "@/motion";

export function CoverageSection() {
  return (
    <section className="driver-coverage" data-atlas-tone="light">
      <div className="driver-shell driver-coverage-grid">
        <Reveal as="header" className="driver-coverage-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{coverageEyebrow}</div>

          <h2 className="atlas-section-heading">{coverageHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-dark">{coverageBody}</p>

          <div className="driver-live-status">Live today</div>
        </Reveal>

        <div className="driver-corridor" aria-label="Current mydiio live area">
          <div className="driver-corridor-heading">
            <span>Colombo South</span>
            <strong>Live area</strong>
          </div>

          <Reveal as="ol" className="driver-corridor-list">
            {corridorStops.map((stop) => (
              <li key={stop.name} className="driver-corridor-row">
                <span className="driver-corridor-node" aria-hidden="true" />
                <span className="driver-corridor-number">{stop.number}</span>
                <strong>{stop.name}</strong>
                <span className="driver-corridor-status">Active</span>
              </li>
            ))}
          </Reveal>

          <div className="driver-expansion-note">
            <span>{expansionLabel}</span>
            <p>{expansionBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
