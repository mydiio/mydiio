import { Reveal } from "@/motion";
import { launchPlanOptions } from "../launchContent";

export function LaunchPlans() {
  return (
    <section className="launch-plans" data-atlas-tone="light">
      <div className="launch-shell">
        <Reveal as="header" className="launch-plans-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            Pick a plan
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            Four plans. One goal each.
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            Pick the plan that fits your goal. Every plan starts with seven days
            free and a refundable LKR 5,000 deposit.
          </p>
        </Reveal>

        <Reveal as="div" className="launch-plans-grid" stagger={0.08}>
          {launchPlanOptions.map((plan) => (
            <article key={plan.id} className="launch-plan-card">
              <span className="launch-plan-card-name">{plan.name}</span>
              <p className="launch-plan-card-pitch">{plan.pitch}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
