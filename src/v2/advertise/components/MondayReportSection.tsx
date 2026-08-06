import { reportFeatures } from "../advertiserContent";
import { ReportPreview } from "./ReportPreview";

export function MondayReportSection() {
  return (
    <section className="advertiser-report" data-atlas-tone="dark">
      <div className="advertiser-shell advertiser-report-grid">
        <header className="advertiser-report-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">
            Your Monday report
          </div>

          <h2 className="atlas-section-heading atlas-section-heading-large">
            Everything in one report.
          </h2>

          <p className="atlas-section-copy atlas-section-copy-light">
            See the tuk-tuks used, recorded places, play times, past delivery and remaining minutes
            in one place.
          </p>

          <ul className="advertiser-report-features">
            {reportFeatures.map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </header>

        <div className="advertiser-report-preview">
          <div className="advertiser-report-preview-topline">
            <span>Report preview</span>
            <strong>Delivered Monday</strong>
          </div>

          <div className="advertiser-report-surface">
            <ReportPreview />
          </div>

          <p>
            This preview shows the structure of your Monday report. Your report is built from
            completed campaign plays.
          </p>
        </div>
      </div>
    </section>
  );
}
