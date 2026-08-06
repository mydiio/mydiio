import { burstPackages } from "../advertiserContent";

export function BurstPackages() {
  return (
    <div className="advertiser-burst" id="burst-packages">
      <header className="advertiser-burst-intro">
        <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">One-off campaigns</div>

        <h2>Need a campaign for a few days?</h2>

        <p>Buy a block of screen minutes once. No monthly plan. No contract.</p>
      </header>

      <div className="advertiser-burst-grid">
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

              <dl>
                {item.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="advertiser-burst-best">
                <span>Best for</span>
                <p>{item.bestFor}</p>
              </div>

              <a
                href={`/advertise/apply?tier=${item.id}`}
                className={
                  featured
                    ? "advertiser-burst-cta advertiser-burst-cta-amber"
                    : "advertiser-burst-cta"
                }
              >
                Choose {item.name}
              </a>
            </article>
          );
        })}
      </div>

      <p className="advertiser-burst-note">
        Your campaign runs until its minutes are used or its time limit ends, whichever comes first.
        Monthly plans play first in the rotation.
      </p>
    </div>
  );
}
