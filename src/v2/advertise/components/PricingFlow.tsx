import { pricingSteps } from "../advertiserContent";

export function PricingFlow() {
  return (
    <section className="advertiser-pricing-flow" data-atlas-tone="light">
      <div className="advertiser-shell">
        <header className="advertiser-pricing-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">How pricing works</div>

          <h2 className="atlas-section-heading">
            Your budget becomes
            <br />
            screen time.
          </h2>

          <p className="atlas-section-copy atlas-section-copy-dark">
            Choose a package and we divide its minutes across the tuk-tuks included in your plan.
          </p>
        </header>

        <ol className="advertiser-pricing-steps">
          {pricingSteps.map((step) => (
            <li key={step.number}>
              <div className="advertiser-pricing-number">{step.number}</div>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
