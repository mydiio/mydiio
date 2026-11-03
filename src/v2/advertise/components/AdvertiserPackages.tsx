import { includedFeatures, packageLimitations } from "@/v2/packages/commercialPricing";
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

        {[false, true].map((planned) => (
          <div key={String(planned)}>
            {planned && (
              <header style={{ marginTop: 64 }}>
                <h2 className="atlas-section-heading">Coming later</h2>
                <p>Express interest in future packages. No reservation deposit is required.</p>
              </header>
            )}
            <Reveal as="div" className="advertiser-package-grid">
              {packageTiers
                .filter((tier) => (tier.scale === "Coming soon") === planned)
                .map((tier) => {
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
                      <p className="advertiser-package-audience">
                        Includes weekly reporting, portal access and campaign support. Optional
                        add-ons cost extra.
                      </p>

                      <a
                        href={`/advertise/apply?tier=${tier.id}`}
                        className={
                          featured
                            ? "advertiser-package-cta advertiser-package-cta-amber"
                            : "advertiser-package-cta"
                        }
                      >
                        {tier.scale === "Coming soon"
                          ? `Express interest in ${tier.name}`
                          : `Reserve ${tier.name}`}
                      </a>
                    </article>
                  );
                })}
            </Reveal>
          </div>
        ))}

        <Reveal as="div" className="advertiser-package-footer">
          <p>{packagesFooter}</p>
          <a href="#burst-packages">See Burst packages.</a>
        </Reveal>

        <div className="advertiser-package-details">
          <h3>Included with every package</h3>
          <ul>
            {includedFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Know before you book</h3>
          <ul>
            {packageLimitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Attention Insights is an optional paid pilot, subject to compatible hardware, privacy
            review and separate written confirmation. It estimates aggregate attention; it does not
            identify passengers or guarantee views. Creative assistance and additional coverage can
            be discussed separately.
          </p>
        </div>
        <BurstPackages />
      </div>
    </section>
  );
}
