import {
  burstPackages,
  burstEyebrow,
  burstHeading,
  burstBody,
  burstNote,
  attentionBurstPricing,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function BurstPackages() {
  return (
    <div className="advertiser-burst" id="burst-packages">
      <Reveal as="header" className="advertiser-burst-intro">
        <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{burstEyebrow}</div>

        <h2 className="atlas-section-heading">{burstHeading}</h2>

        <p className="atlas-section-copy atlas-section-copy-dark">{burstBody}</p>
      </Reveal>

      <Reveal as="div" className="advertiser-burst-grid">
        {burstPackages.map((item) => {
          const featured = item.id === "burst-blast";

          return (
            <article
              className={
                featured
                  ? "advertiser-burst-card advertiser-burst-card-featured"
                  : "advertiser-burst-card"
              }
              key={item.id}
            >
              <div className="advertiser-burst-topline">
                <span>{item.number}</span>
                {item.badge ? <strong>{item.badge}</strong> : null}
              </div>

              <h3>{item.name}</h3>
              <div className="advertiser-burst-price">{item.price}</div>
              <div className="advertiser-burst-payment">One-off payment</div>

              <dl className="advertiser-burst-specs">
                {item.features.map((feature) => (
                  <div key={feature.label}>
                    <dt>{feature.label}</dt>
                    <dd>{feature.value}</dd>
                  </div>
                ))}

                <div className="advertiser-burst-best-row">
                  <dt>Good for</dt>
                  <dd>{item.bestFor}</dd>
                </div>
              </dl>

              <div className="advertiser-burst-attention">
                <span>Attention Insights · optional pilot</span>
                <strong>
                  {attentionBurstPricing[item.id as keyof typeof attentionBurstPricing]}
                </strong>
                <a href="#attention-insights">See the privacy boundary</a>
              </div>

              <a
                href={`/advertise/apply?tier=${item.id}`}
                className={
                  featured
                    ? "advertiser-burst-cta advertiser-burst-cta-amber"
                    : "advertiser-burst-cta"
                }
              >
                Express interest in {item.name}
              </a>
            </article>
          );
        })}
      </Reveal>

      <p className="advertiser-burst-note">{burstNote}</p>
    </div>
  );
}
