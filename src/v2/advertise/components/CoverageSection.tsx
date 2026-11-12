import { coveragePromise } from "../../commercial/policy";
export function CoverageSection() {
  return (
    <section className="advertiser-coverage" data-atlas-tone="light">
      <div className="advertiser-shell">
        <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
          Planned November 2026 launch
        </div>
        <h2 className="atlas-section-heading">Advertising across Colombo.</h2>
        <p className="atlas-section-copy atlas-section-copy-dark">{coveragePromise}</p>
        <p>
          Coverage is agreed for each campaign. Exact streets, times and future fleet expansion are
          not guaranteed.
        </p>
      </div>
    </section>
  );
}
