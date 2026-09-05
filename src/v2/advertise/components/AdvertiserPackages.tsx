import { packageTiers } from "@/v2/packages/packageData";
import {
  packagesEyebrow,
  packagesHeading,
  packagesBody,
  packagesAnchor,
  packagesFooter,
  advertiserPackageCopy,
  packageAudience,
  attentionMonthlyPricing,
} from "../advertiserContent";
import { BurstPackages } from "./BurstPackages";
import { Reveal } from "@/motion";

export function AdvertiserPackages() {
  return (
    <section id="monthly-packages" className="advertiser-packages" data-atlas-tone="light">
      <div className="advertiser-shell">
        <Reveal as="header" className="advertiser-packages-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{packagesEyebrow}</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">{packagesHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{packagesBody}</p>
          <div className="advertiser-packages-anchor">{packagesAnchor}</div>
        </Reveal>

        <Reveal as="div" className="advertiser-package-grid">
          {packageTiers.map((tier) => {
            const featured = tier.id === "pioneer";
            const copy = advertiserPackageCopy[tier.id as keyof typeof advertiserPackageCopy];
            const audience = packageAudience[tier.id as keyof typeof packageAudience];

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
                  <span className="advertiser-package-number">{tier.number}</span>
                  {tier.emphasis ? (
                    <span className="advertiser-package-emphasis">{tier.emphasis}</span>
                  ) : null}
                </div>

                <h3 className="advertiser-package-name">{tier.name}</h3>
                <div className="advertiser-package-eyebrow">{copy.eyebrow}</div>
                <div className="advertiser-package-price">{copy.price}</div>

                <dl className="advertiser-package-features">
                  {copy.features.map((feature) => (
                    <div key={feature.label}>
                      <dt>{feature.label}</dt>
                      <dd>{feature.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="advertiser-package-attention">
                  <span>Attention Insights · optional pilot</span>
                  <strong>
                    {attentionMonthlyPricing[tier.id as keyof typeof attentionMonthlyPricing]}
                  </strong>
                  <a href="#attention-insights">See the privacy boundary</a>
                </div>

                <p className="advertiser-package-audience">{audience}</p>

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
        </Reveal>

        <Reveal as="div" className="advertiser-package-footer">
          <p>{packagesFooter}</p>
          <a href="#burst-packages">See Burst packages.</a>
        </Reveal>

        <BurstPackages />
      </div>
    </section>
  );
}
