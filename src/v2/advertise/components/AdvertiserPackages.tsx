import { useState } from "react";
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

type PackageView = "launch" | "future" | "burst";

export function AdvertiserPackages() {
  const [view, setView] = useState<PackageView>("launch");
  const visibleTiers = packageTiers.filter((tier) =>
    view === "launch" ? tier.scale !== "Coming soon" : tier.scale === "Coming soon"
  );

  return (
    <section id="monthly-packages" className="advertiser-packages advertiser-packages-refined" data-atlas-tone="light">
      <div className="advertiser-shell">
        <Reveal as="header" className="advertiser-packages-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{packagesEyebrow}</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">{packagesHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{packagesBody}</p>
          <div className="advertiser-packages-anchor">{packagesAnchor}</div>
        </Reveal>

        <div className="advertiser-package-view-tabs" role="tablist" aria-label="Explore campaign packages">
          {([
            ["launch", "Launch plans"],
            ["future", "Coming later"],
            ["burst", "One-off campaigns"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`package-tab-${id}`}
              aria-selected={view === id}
              aria-controls={`package-panel-${id}`}
              className={view === id ? "is-active" : ""}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {view === "burst" ? (
          <div id="package-panel-burst" role="tabpanel" aria-labelledby="package-tab-burst" className="advertiser-package-tab-panel">
            <BurstPackages />
          </div>
        ) : (
          <div id={`package-panel-${view}`} role="tabpanel" aria-labelledby={`package-tab-${view}`} className="advertiser-package-tab-panel">
            {view === "future" && (
              <p className="advertiser-package-view-note">Future packages are available for expressions of interest. No reservation deposit is required at this stage.</p>
            )}
            <div className="advertiser-package-grid">
              {visibleTiers.map((tier) => {
                const featured = tier.id === "pioneer";
                const copy = advertiserPackageCopy[tier.id as keyof typeof advertiserPackageCopy];
                const audience = packageAudience[tier.id as keyof typeof packageAudience];
                return (
                  <article className={featured ? "advertiser-package-card advertiser-package-card-featured" : "advertiser-package-card"} key={tier.id}>
                    <div className="advertiser-package-topline">
                      <span className="advertiser-package-number">{tier.number}</span>
                      {tier.emphasis && <span className="advertiser-package-emphasis">{tier.emphasis}</span>}
                    </div>
                    <h3 className="advertiser-package-name">{tier.name}</h3>
                    <div className="advertiser-package-eyebrow">{copy.eyebrow}</div>
                    <div className="advertiser-package-price">{copy.price}</div>
                    <dl className="advertiser-package-features">
                      {copy.features.map((feature) => (
                        <div key={feature.label}><dt>{feature.label}</dt><dd>{feature.value}</dd></div>
                      ))}
                    </dl>
                    <p className="advertiser-package-audience">{audience}</p>
                    <a href={`/advertise/apply?tier=${tier.id}`} className={featured ? "advertiser-package-cta advertiser-package-cta-amber" : "advertiser-package-cta"}>
                      {tier.scale === "Coming soon" ? `Express interest in ${tier.name}` : `Reserve ${tier.name}`}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        <div className="advertiser-package-compact-foot">
          <p>{packagesFooter}</p>
          <p>Portal access, weekly reporting and campaign support are included. Optional services cost extra.</p>
        </div>

        <details className="advertiser-package-disclosure">
          <summary>What's included and what to know before booking <span aria-hidden="true">+</span></summary>
          <div className="advertiser-package-disclosure-body">
            <div><h3>Included with every package</h3><ul>{includedFeatures.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Booking and delivery conditions</h3><ul>{packageLimitations.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </details>

        <details className="advertiser-package-disclosure">
          <summary>Optional Attention Insights pilot and privacy conditions <span aria-hidden="true">+</span></summary>
          <div className="advertiser-package-disclosure-body">
            <p>Attention Insights is an optional paid pilot, subject to compatible hardware, privacy review and separate written confirmation. It estimates aggregate attention; it does not identify passengers or guarantee views. Creative assistance and additional coverage can be discussed separately.</p>
            <ul className="advertiser-attention-pricing">
              {packageTiers.map((tier) => (
                <li key={tier.id}><strong>{tier.name}</strong><span>{attentionMonthlyPricing[tier.id as keyof typeof attentionMonthlyPricing]}</span></li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
}
