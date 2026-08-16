import { Reveal } from "@/motion";
import {
  plansEyebrow,
  plansHeading,
  plansBody,
  plansBurstNote,
  plansPilotNote,
  homePlans,
  APPLY_URL,
} from "../homeContent";

export function HomePlans() {
  return (
    <section className="home-plans" data-atlas-tone="light">
      <div className="home-shell">
        <Reveal as="header" className="home-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{plansEyebrow}</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">{plansHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{plansBody}</p>
        </Reveal>

        <Reveal as="div" className="home-plans-grid" stagger={0.08}>
          {homePlans.map((tier) => {
            const featured = tier.featured === true;
            return (
              <article
                key={tier.id}
                className={featured ? "home-plan-card home-plan-card-featured" : "home-plan-card"}
              >
                <div className="home-plan-topline">
                  <span>{tier.number}</span>
                  {tier.emphasis ? <strong>{tier.emphasis}</strong> : null}
                </div>

                <div className="home-plan-eyebrow">{tier.name}</div>
                <div className="home-plan-price">
                  {tier.price}
                  <span className="home-plan-price-suffix">{tier.period}</span>
                </div>

                <dl className="home-plan-features">
                  {tier.features.map((feature) => (
                    <div key={feature.label}>
                      <dt>{feature.label}</dt>
                      <dd>{feature.value}</dd>
                    </div>
                  ))}

                  <div>
                    <dt>Good for</dt>
                    <dd>{tier.audience}</dd>
                  </div>
                </dl>

                <a
                  href={`${APPLY_URL}?tier=${tier.id}`}
                  className={featured ? "home-plan-cta home-plan-cta-amber" : "home-plan-cta"}
                >
                  Choose {tier.name}
                </a>
              </article>
            );
          })}
        </Reveal>

        <Reveal as="div" className="home-plans-notes">
          <p>{plansBurstNote}</p>
          <p>{plansPilotNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
