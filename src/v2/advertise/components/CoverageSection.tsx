import { corridorStops } from "../advertiserContent";

export function CoverageSection() {
  return (
    <section className="advertiser-coverage" data-atlas-tone="light">
      <div className="advertiser-shell advertiser-coverage-grid">
        <header className="advertiser-coverage-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Current coverage</div>

          <h2 className="atlas-section-heading">
            One live corridor.
            <br />
            Three active areas.
          </h2>

          <p className="atlas-section-copy atlas-section-copy-dark">
            mydiio currently runs through Dehiwala, Mount Lavinia and Ratmalana. We only add an area
            when active tuk-tuks are operating there.
          </p>

          <div className="advertiser-live-status">
            <span aria-hidden="true" />
            Current live corridor
          </div>
        </header>

        <div className="advertiser-corridor" aria-label="Current mydiio corridor">
          <div className="advertiser-corridor-heading">
            <span>Colombo South</span>
            <strong>Live corridor</strong>
          </div>

          <ol>
            {corridorStops.map((stop) => (
              <li key={stop.name}>
                <span className="advertiser-corridor-node" aria-hidden="true" />
                <span className="advertiser-corridor-number">{stop.number}</span>
                <strong>{stop.name}</strong>
                <span>Active</span>
              </li>
            ))}
          </ol>

          <div className="advertiser-expansion-note">
            <span>Future expansion</span>
            <p>We will add new areas when active tuk-tuks are operating there.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
