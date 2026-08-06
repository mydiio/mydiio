const reportRows = [
  {
    vehicle: "Tuk-tuk recorded",
    location: "Dehiwala",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
  {
    vehicle: "Tuk-tuk recorded",
    location: "Mount Lavinia",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
  {
    vehicle: "Tuk-tuk recorded",
    location: "Ratmalana",
    time: "Play time recorded",
    duration: "Play length recorded",
  },
] as const;

const reportLocations = ["Dehiwala", "Mount Lavinia", "Ratmalana"] as const;

type ReportPreviewProps = {
  compact?: boolean;
};

export function ReportPreview({ compact = false }: ReportPreviewProps) {
  return (
    <div
      className={
        compact ? "advertiser-report-ui advertiser-report-ui-compact" : "advertiser-report-ui"
      }
    >
      <header className="advertiser-report-ui-header">
        <div>
          <div className="advertiser-report-ui-eyebrow">Monday report</div>
          <h3>Every journey, recorded.</h3>
        </div>

        <div className="advertiser-report-ui-meta">
          <div>
            <span>Reporting period</span>
            <strong>Weekly</strong>
          </div>
          <div>
            <span>Verification</span>
            <strong>Complete</strong>
          </div>
        </div>
      </header>

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
          <span>Play records</span>
          <strong>Tuk-tuk, place and time</strong>
        </div>
        <div>
          <span>Verification</span>
          <strong>GPS recorded</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>Every Monday</strong>
        </div>
      </div>

      <div className="advertiser-report-table-wrap">
        <div className="advertiser-report-table-label">What your report shows</div>

        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Location</th>
              <th>Play time</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reportRows.map((row, index) => (
              <tr key={`${row.location}-${index}`}>
                <td>{row.vehicle}</td>
                <td>{row.location}</td>
                <td>{row.time}</td>
                <td>{row.duration}</td>
                <td>
                  <span className="advertiser-report-verified">Verified</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="advertiser-report-ui-footer">
        <span>Minutes left</span>
        <strong>Shown in every report</strong>
      </footer>
    </div>
  );
}
