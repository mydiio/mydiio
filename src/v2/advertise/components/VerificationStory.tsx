import {
  verificationEyebrow,
  verificationHeading,
  verificationBody,
  verificationSteps,
  verificationEvidence,
  verificationTrustLine,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function VerificationStory() {
  return (
    <section id="verification" className="advertiser-verification" data-atlas-tone="dark">
      <div className="advertiser-shell">
        <Reveal as="header" className="advertiser-verification-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">
            {verificationEyebrow}
          </div>

          <h2 className="atlas-section-heading atlas-section-heading-large">
            {verificationHeading}
          </h2>

          <p className="atlas-section-copy atlas-section-copy-light">{verificationBody}</p>
        </Reveal>

        <div className="advertiser-verification-static">
          <Reveal as="ol" className="advertiser-verification-steps">
            {verificationSteps.map((step) => (
              <li key={step.number} className="advertiser-verification-step">
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal as="div" className="advertiser-evidence-panel" stagger={0}>
            <div className="advertiser-evidence-topline">
              <span>{verificationEvidence.topline}</span>
              <strong>{verificationEvidence.toplineValue}</strong>
            </div>

            <div className="advertiser-evidence-status">
              <span aria-hidden="true" />
              {verificationEvidence.status}
            </div>

            <dl className="advertiser-evidence-list">
              {verificationEvidence.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="advertiser-evidence-footer">
              <span>{verificationEvidence.footerLeft}</span>
              <span>{verificationEvidence.footerRight}</span>
            </div>

            <p className="advertiser-evidence-trust">{verificationTrustLine}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
