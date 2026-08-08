import { Reveal } from "@/motion";

const stories = [
  {
    number: "01",
    audience: "Ruwan, full-day driver",
    title: "Drive a full day. Earn the bonus.",
    body: "Ruwan drives eight hours most days. His pay on the 5th is LKR 8,000 every month. He did not change his routes.",
    facts: [
      { label: "Tier", value: "Base + Bonus" },
      { label: "Monthly pay", value: "LKR 8,000" },
      { label: "Pay day", value: "The 5th" },
    ],
    cta: { label: "Apply for Base + Bonus", href: "/drivers/apply?tier=plus" },
  },
  {
    number: "02",
    audience: "Nadeesha, part-time driver",
    title: "Keep your usual shifts.",
    body: "Nadeesha drives four hours after school drop-off. Her pay on the 5th is LKR 6,000. No new schedule, no minimum beyond her day.",
    facts: [
      { label: "Tier", value: "Base" },
      { label: "Monthly pay", value: "LKR 6,000" },
      { label: "Pay day", value: "The 5th" },
    ],
    cta: { label: "Apply for Base", href: "/drivers/apply?tier=core" },
  },
  {
    number: "03",
    audience: "Saman, founding driver",
    title: "Be one of the first ten.",
    body: "Saman was driver number four. He has one of ten amber shirts. The shirt is not sold. It marks the people who built the start.",
    facts: [
      { label: "Spots", value: "Ten drivers" },
      { label: "Symbol", value: "Amber shirt" },
      { label: "Status", value: "Cannot be bought" },
    ],
    cta: { label: "Ask about Group A", href: "/contact" },
  },
];

export function UseCases() {
  return (
    <section id="stories" className="driver-use-cases" data-atlas-tone="light">
      <div className="driver-shell">
        <Reveal as="header" className="driver-use-cases-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            Three drivers. One agreement.
          </div>

          <h2 className="atlas-section-heading">
            Three drivers.
            <br />
            One agreement.
          </h2>
        </Reveal>

        <Reveal as="div" className="driver-use-case-grid">
          {stories.map((item) => (
            <article key={item.number} className="driver-use-case-card">
              <div className="driver-use-case-topline">
                <span>{item.number}</span>
                <strong>{item.audience}</strong>
              </div>

              <h3>{item.title}</h3>
              <p>{item.body}</p>

              <dl className="driver-use-case-facts">
                {item.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <a className="driver-use-case-cta" href={item.cta.href}>
                {item.cta.label}
              </a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
