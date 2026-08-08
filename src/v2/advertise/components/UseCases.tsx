import { storiesEyebrow, storiesHeading, advertiserStories } from "../advertiserContent";
import { Reveal } from "@/motion";

export function UseCases() {
  return (
    <section id="stories" className="advertiser-use-cases" data-atlas-tone="light">
      <div className="advertiser-shell">
        <Reveal as="header" className="advertiser-use-cases-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{storiesEyebrow}</div>

          <h2 className="atlas-section-heading">{storiesHeading}</h2>
        </Reveal>

        <Reveal as="div" className="advertiser-use-case-grid">
          {advertiserStories.map((item) => (
            <article key={item.number} className="advertiser-use-case-card">
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
        </Reveal>
      </div>
    </section>
  );
}
