import { tiersEyebrow, tiersHeading, tiersBody, tiersAnchor, earningsTiers } from "../driverContent";
import { Reveal } from "@/motion";

export function DriverPackages() {
  return (
    <section id="earnings-tiers" className="driver-tiers" data-atlas-tone="light">
      <div className="driver-shell">
        <Reveal as="header" className="driver-tiers-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{tiersEyebrow}</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">{tiersHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-dark">{tiersBody}</p>

          <div className="driver-tiers-anchor">{tiersAnchor}</div>
        </Reveal>

        <Reveal as="div" className="driver-tiers-grid">
          {earningsTiers.map((tier) => {
            const featured = tier.featured === true;
            return (
              <article
                className={
                  featured
                    ? "driver-tier-card driver-tier-card-featured"
                    : "driver-tier-card"
                }
                key={tier.id}
              >
                <div className="driver-tier-topline">
                  <span>{tier.number}</span>
                  {tier.emphasis ? <strong>{tier.emphasis}</strong> : null}
                </div>

                <div className="driver-tier-eyebrow">{tier.eyebrow}</div>

                <h3>{tier.name}</h3>

                <div className="driver-tier-price">
                  {tier.price}
                  <span className="driver-tier-price-suffix">{tier.period}</span>
                </div>

                <dl className="driver-tier-specs">
                  {tier.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="driver-tier-audience">{tier.audience}</p>

                <a
                  href={
                    tier.id === "fleet"
                      ? "/contact"
                      : `/drivers/apply?tier=${tier.id}`
                  }
                  className={
                    featured
                      ? "driver-tier-cta driver-tier-cta-amber"
                      : "driver-tier-cta"
                  }
                >
                  {tier.cta}
                </a>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
