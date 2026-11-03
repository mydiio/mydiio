import { Reveal } from "@/motion";
import { launchPlanOptions } from "../launchContent";

export function LaunchPlans() {
  return (
    <section className="launch-plans" data-atlas-tone="light">
      <div className="launch-shell">
        <Reveal as="header" className="launch-plans-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Pick a plan</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            Reserve a launch package.
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            Compare plans below. A refundable LKR 10,000 reservation is credited to your first
            invoice. No free trial is offered.
          </p>
        </Reveal>

        <Reveal as="div" className="launch-plans-grid" stagger={0.08}>
          {launchPlanOptions
            .filter((plan) => plan.id === "roamer" || plan.id === "pioneer")
            .map((plan) => (
              <article key={plan.id} className="launch-plan-card">
                <span className="launch-plan-card-name">{plan.name}</span>
                <strong>{plan.price}</strong>
                <p className="launch-plan-card-pitch">{plan.pitch}</p>
                <dl>
                  {plan.features.map((feature) => (
                    <div key={feature.label}>
                      <dt>{feature.label}</dt>
                      <dd>{feature.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
        </Reveal>
      </div>
    </section>
  );
}
