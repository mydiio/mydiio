import {
  burstPackages,
  burstEyebrow,
  burstHeading,
  burstBody,
  burstNote,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function BurstPackages() {
  return (
    <div className="advertiser-burst advertiser-burst-compact" id="burst-packages">
      <Reveal as="header" className="advertiser-burst-intro">
        <div>
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{burstEyebrow}</div>
          <h2 className="atlas-section-heading">{burstHeading}</h2>
        </div>
        <p className="atlas-section-copy atlas-section-copy-dark">{burstBody}</p>
      </Reveal>

      <Reveal as="div" className="advertiser-burst-grid">
        {burstPackages.map((item) => {
          const featured = item.id === "burst-blast";
          const minutes = item.features.find((f) => /screen minutes/i.test(f.label));
          const vehicles = item.features.find((f) => /tuk-tuks|vehicles/i.test(f.label));
          const window = item.features.find((f) => /campaign window/i.test(f.label));
          const secondary = item.features.filter((f) =>
            !/screen minutes|tuk-tuks|vehicles|campaign window/i.test(f.label)
          );

          return (
            <article
              className={featured ? "advertiser-burst-card advertiser-burst-card-featured" : "advertiser-burst-card"}
              key={item.id}
            >
              <div className="advertiser-burst-topline">
                <span>{item.number}</span>
                {item.badge ? <strong>{item.badge}</strong> : null}
              </div>
              <div className="advertiser-burst-identity">
                <h3>{item.name}</h3>
                <div className="advertiser-burst-price">{item.price}</div>
              </div>
              <div className="advertiser-burst-payment">One-off campaign</div>
              <div className="advertiser-burst-metrics">
                {minutes && <div className="advertiser-burst-metric"><span>Screen time</span><strong>{minutes.value}</strong></div>}
                {window && <div className="advertiser-burst-metric"><span>Campaign window</span><strong>{window.value}</strong></div>}
                {vehicles && <div className="advertiser-burst-metric"><span>Coverage</span><strong>{vehicles.value}</strong></div>}
              </div>
              <p className="advertiser-burst-best"><span>Ideal for</span>{item.bestFor}</p>
              <a
                href={`/advertise/apply?tier=${item.id}`}
                className={featured ? "advertiser-burst-cta advertiser-burst-cta-amber" : "advertiser-burst-cta"}
              >
                Express interest in {item.name} <span aria-hidden="true">â†’</span>
              </a>
              <details className="advertiser-burst-details">
                <summary>Payment &amp; campaign conditions <span aria-hidden="true">+</span></summary>
                <dl>{secondary.map((feature) => <div key={feature.label}><dt>{feature.label}</dt><dd>{feature.value}</dd></div>)}</dl>
              </details>
            </article>
          );
        })}
      </Reveal>
      <p className="advertiser-burst-note">{burstNote}</p>
    </div>
  );
}
