import { advertiserUseCases } from "../advertiserContent";

export function UseCases() {
  return (
    <section id="use-cases" className="advertiser-use-cases" data-atlas-tone="light">
      <div className="advertiser-shell">
        <header className="advertiser-use-cases-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            Built for different campaigns
          </div>

          <h2 className="atlas-section-heading">
            One system.
            <br />
            Three ways to use it.
          </h2>
        </header>

        <div className="advertiser-use-case-grid">
          {advertiserUseCases.map((item) => (
            <article key={item.number}>
              <div className="advertiser-use-case-topline">
                <span>{item.number}</span>
                <strong>{item.audience}</strong>
              </div>

              <h3>{item.title}</h3>
              <p>{item.body}</p>

              <dl className="advertiser-use-case-facts">
                {item.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <a className="advertiser-use-case-cta" href={item.cta.href}>
                {item.cta.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
