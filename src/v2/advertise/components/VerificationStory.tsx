import { verificationSteps } from "../advertiserContent";

const evidenceRows = [
  ["Campaign", "Active"],
  ["Vehicle", "Recorded"],
  ["Location", "GPS recorded"],
  ["Play time", "Recorded"],
  ["Report", "Every Monday"],
] as const;

export function VerificationStory() {
  return (
    <section id="verification" className="advertiser-verification" data-atlas-tone="dark">
      <div className="advertiser-shell">
        <header className="advertiser-verification-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">GPS verification</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">
            Four steps.
            <br />
            One clear record.
          </h2>

          <p className="atlas-section-copy atlas-section-copy-light">
            Each stage adds the information you need to check campaign delivery.
          </p>
        </header>

        <div className="advertiser-verification-static">
          <ol className="advertiser-verification-steps">
            {verificationSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="advertiser-evidence-panel">
            <div className="advertiser-evidence-topline">
              <span>GPS record</span>
              <strong>GPS verified</strong>
            </div>

            <div className="advertiser-evidence-status">
              <span aria-hidden="true" />
              Play recorded
            </div>

            <dl>
              {evidenceRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="advertiser-evidence-footer">
              <span>Proof, not estimates.</span>
              <span>Monday report</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
