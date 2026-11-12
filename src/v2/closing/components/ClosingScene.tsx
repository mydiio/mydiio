import { colors } from "@/design";
import "./closingScene.css";

type ClosingSceneProps = {
  progress: number;
};

export function ClosingScene({ progress: _progress }: ClosingSceneProps) {
  return (
    <div
      className="atlas-closing-v3"
      style={{
        background: colors.cream,
        color: colors.ink,
      }}
    >
      <div className="atlas-closing-v3-shell">
        <div className="atlas-closing-v3-main">
          <div className="atlas-closing-v3-content">
            <div className="atlas-closing-v3-eyebrow">
              <span className="atlas-closing-v3-dash" />
              THE NETWORK IS MOVING
            </div>

            <h2 className="atlas-closing-v3-title">
              The future of
              <br />
              passenger advertising
              <br />
              <span>is already moving.</span>
            </h2>

            <p className="atlas-closing-v3-copy">
              Explore advertising across Colombo. Campaign activation depends
              on confirmed vehicle coverage and agreed start dates. You can
              also join the driver network helping build Sri Lanka&apos;s first
              connected passenger network.
            </p>

            <div className="atlas-closing-v3-actions">
              <a href="/advertise/apply" className="atlas-button-primary">
                Explore advertising packages
              </a>
              <a href="/drive" className="atlas-button-secondary">
                Join the driver network
              </a>
            </div>
          </div>

          <div className="atlas-closing-v3-visual" aria-hidden="true">
            <div className="atlas-closing-v3-visual-top">
              <span>MYDIIO / CONNECTED JOURNEYS</span>
              <span>COLOMBO</span>
            </div>

            <img className="atlas-closing-v3-graphic" src="/assets/illustrations/mydiio-footer-tuktuk.svg" alt="" loading="lazy" decoding="async" />

            <div className="atlas-closing-v3-visual-bottom">
              <span>CONNECTED PASSENGER MEDIA</span>
              <span>01 / NETWORK</span>
            </div>
          </div>
        </div>

        <div className="atlas-closing-v3-proof">
          {[
            ["EVERY JOURNEY", "Measured."],
            ["CAMPAIGN DELIVERY", "Reported."],
            ["EVERY PLAY", "Accounted for."],
          ].map(([label, value]) => (
            <div className="atlas-closing-v3-proof-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

