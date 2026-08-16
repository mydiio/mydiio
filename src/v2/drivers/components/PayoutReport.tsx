import {
  payoutEyebrow,
  payoutHeading,
  payoutBody,
  payoutFeatures,
  payoutRows,
} from "../driverContent";
import { Reveal } from "@/motion";

export function PayoutReport() {
  return (
    <section className="driver-payout" data-atlas-tone="dark">
      <div className="driver-shell driver-payout-grid">
        <Reveal as="header" className="driver-payout-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-light">{payoutEyebrow}</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">{payoutHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-light">{payoutBody}</p>

          <ul className="driver-payout-features">
            {payoutFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="div" className="driver-payout-preview" stagger={0}>
          <div className="driver-payout-topline">
            <span>Driver app</span>
            <strong>Live record</strong>
          </div>

          <div className="driver-payout-surface">
            <div className="driver-payout-headline">
              <div>
                <span>Monthly pay</span>
                <h3>Every pay, one place.</h3>
              </div>
              <span>May 2026</span>
            </div>

            <div className="driver-payout-summary">
              <div>
                <span>Days driven</span>
                <strong>27 days</strong>
              </div>
              <div>
                <span>Avg hours</span>
                <strong>8.4 h</strong>
              </div>
              <div>
                <span>Tier</span>
                <strong>Base + Bonus</strong>
              </div>
            </div>

            <div className="driver-payout-history" aria-label="Recent monthly pays">
              {payoutRows.map((row) => (
                <div key={row.month} className="driver-payout-row">
                  <span>{row.month}</span>
                  <span>
                    {row.days} · {row.hours} · {row.tier}
                  </span>
                  <strong>{row.amount}</strong>
                </div>
              ))}
            </div>

            <div className="driver-payout-foot">
              <span>Next pay</span>
              <strong>5 June 2026</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
