import {
  reportEyebrow,
  reportHeading,
  reportBody,
  reportFeatures,
  reportRows,
  reportLocations,
  reportNextDate,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function MondayReportSection() {
  return (
    <section className="advertiser-report" data-atlas-tone="dark">
      <div className="advertiser-shell advertiser-report-grid">
        <Reveal as="header" className="advertiser-report-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">{reportEyebrow}</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">{reportHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-light">{reportBody}</p>

          <ul className="advertiser-report-features">
            {reportFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="div" className="advertiser-report-preview" stagger={0}>
          <div className="advertiser-report-topline">
            <span>Monday report</span>
            <strong>Delivered Monday</strong>
          </div>

          <div className="advertiser-report-surface">
            <div className="advertiser-report-headline">
              <div>
                <span>Reporting period</span>
                <h3>Every journey, recorded.</h3>
              </div>
              <span>Weekly</span>
            </div>

            <div className="advertiser-report-route">
              <div className="advertiser-report-route-label">
                <span>GPS route record</span>
                <strong>Verified locations</strong>
              </div>
              <div className="advertiser-report-route-line">
                {reportLocations.map((location) => (
                  <div key={location}>
                    <span aria-hidden="true" />
                    <strong>{location}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="advertiser-report-summary">
              <div>
                <span>Plays</span>
                <strong>Completed delivery</strong>
              </div>
              <div>
                <span>Movement</span>
                <strong>Reported separately</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>Every Monday</strong>
              </div>
            </div>

            <div className="advertiser-report-table-wrap">
              <div className="advertiser-report-table-label">Plays from this week</div>

              <table>
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {reportRows.map((row, index) => (
                    <tr key={`${row.location}-${index}`}>
                      <td>{row.vehicle}</td>
                      <td>{row.location}</td>
                      <td>{row.time}</td>
                      <td>
                        <span className="advertiser-report-verified">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="advertiser-report-foot">
              <span>Next report</span>
              <strong>{reportNextDate}</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
