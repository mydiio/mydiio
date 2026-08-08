import { Reveal } from "@/motion";
import {
  driverEyebrow,
  driverHeroTitleLines,
  driverHeroAccent,
  driverHeroBody,
  driverHeroAnchorNote,
} from "../driverContent";

export function DriverHero() {
  return (
    <section className="driver-hero" data-atlas-tone="light">
      <div className="driver-shell driver-hero-grid">
        <Reveal as="div" className="driver-hero-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{driverEyebrow}</div>

          <h1 className="driver-hero-title">
            {driverHeroTitleLines.map((line, i) => (
              <span key={line} className="driver-hero-title-line">
                {i === 1 ? <span>{driverHeroAccent}</span> : line}
                {i < driverHeroTitleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="driver-hero-body">{driverHeroBody}</p>

          <div className="driver-hero-actions">
            <a href="/drivers/apply" className="atlas-button-amber">
              Apply to join
            </a>
            <a href="#how-it-works" className="atlas-button-secondary">
              See how it works
            </a>
          </div>

          <p className="driver-anchor-note">{driverHeroAnchorNote}</p>
        </Reveal>

        <Reveal as="div" className="driver-product-stage">
          <div className="driver-stage-card">
            <div className="driver-stage-card-inner">
              <div className="driver-stage-eyebrow">Next pay</div>

              <div className="driver-stage-amount">
                LKR 8,000
                <span className="driver-stage-amount-suffix">on the 5th, by bank</span>
              </div>

              <div className="driver-stage-meta">
                <div>
                  <strong>LKR 6,000 base.</strong> Every driver gets this on the 5th.
                </div>
                <div>
                  <strong>LKR 2,000 bonus.</strong> Added in the same pay if you drive enough hours.
                </div>
              </div>

              <div className="driver-stage-foot">
                <span className="driver-stage-foot-label">Pay day</span>
                <span className="driver-stage-foot-value">The 5th, every month</span>
              </div>
            </div>
          </div>

          <p className="driver-stage-caption">Signed agreement. Bank transfer. Same date, every month.</p>
        </Reveal>
      </div>
    </section>
  );
}
