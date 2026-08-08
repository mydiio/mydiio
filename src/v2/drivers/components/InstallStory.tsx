import {
  installEyebrow,
  installHeading,
  installBody,
  installSteps,
  installEvidenceHeading,
  installEvidenceLabel,
  installEvidenceAmount,
  installEvidenceFootnote,
  installEvidenceRows,
} from "../driverContent";
import { Reveal } from "@/motion";

export function InstallStory() {
  return (
    <section id="how-it-works" className="driver-install" data-atlas-tone="dark">
      <div className="driver-shell">
        <Reveal as="header" className="driver-install-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">{installEyebrow}</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">{installHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-light">{installBody}</p>
        </Reveal>

        <div className="driver-install-static">
          <Reveal as="ol" className="driver-install-steps">
            {installSteps.map((step) => (
              <li key={step.number} className="driver-install-step">
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal as="div" className="driver-install-evidence" stagger={0}>
            <div className="driver-install-evidence-topline">
              <span>{installEvidenceHeading}</span>
              <strong>Signed</strong>
            </div>

            <div className="driver-install-evidence-amount">
              <span className="driver-install-evidence-amount-label">{installEvidenceLabel}</span>
              <span className="driver-install-evidence-amount-value">{installEvidenceAmount}</span>
            </div>

            <dl className="driver-install-evidence-list">
              {installEvidenceRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="driver-install-evidence-foot">
              {installEvidenceFootnote.map((line, i) => (
                <span key={line}>{i === 0 ? line : <strong>{line}</strong>}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
