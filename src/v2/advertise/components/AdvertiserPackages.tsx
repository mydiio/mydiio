import { packageTiers } from "@/v2/packages/packageData";
import { advertiserPackageCopy, packageAudience } from "../advertiserContent";
import { BurstPackages } from "./BurstPackages";

export function AdvertiserPackages() {
  return (
    <section id="monthly-packages" className="advertiser-packages" data-atlas-tone="light">
      <div className="advertiser-shell">
        <header className="advertiser-packages-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Campaign packages</div>

          <h2 className="atlas-section-heading atlas-section-heading-large">
            Four plans. Built around your goal.
          </h2>

          <p className="atlas-section-copy atlas-section-copy-dark">
            Start small, build regular visibility, join the full network or create a custom
            campaign.
          </p>

          <div className="advertiser-packages-anchor">Campaigns from LKR 25,000 a month</div>
        </header>

        <div className="advertiser-package-grid">
          {packageTiers.map((tier) => {
            const featured = tier.id === "pioneer";
            const copy = advertiserPackageCopy[tier.id as keyof typeof advertiserPackageCopy];

            return (
              <article
                className={
                  featured
                    ? "advertiser-package-card advertiser-package-card-featured"
                    : "advertiser-package-card"
                }
                key={tier.id}
              >
                <div className="advertiser-package-topline">
                  <span>{tier.number}</span>
                  {tier.emphasis ? <strong>{tier.emphasis}</strong> : null}
                </div>

                <div className="advertiser-package-eyebrow">{copy.eyebrow}</div>

                <h3>{tier.name}</h3>
                <div className="advertiser-package-price">{tier.price}</div>

                <dl>
                  {copy.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}

                  <div>
                    <dt>Best for</dt>
                    <dd>{packageAudience[tier.id as keyof typeof packageAudience]}</dd>
                  </div>
                </dl>

                <a
                  href={`/advertise/apply?tier=${tier.id}`}
                  className={
                    featured
                      ? "advertiser-package-cta advertiser-package-cta-amber"
                      : "advertiser-package-cta"
                  }
                >
                  Choose {tier.name}
                </a>
              </article>
            );
          })}
        </div>

        <div className="advertiser-package-footer">
          <p>The number of available tuk-tuks depends on the live fleet in your chosen area.</p>

          <a href="#burst-packages">Need a short campaign? See Burst packages.</a>
        </div>

        <BurstPackages />
      </div>
    </section>
  );
}
