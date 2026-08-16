import { Reveal } from "@/motion";
import { termsIntro, termsSections } from "../termsContent";

function renderBlock(block: (typeof termsSections)[number]["blocks"][number], key: string) {
  if (block.kind === "heading") {
    return (
      <p key={key} className="terms-body-subhead">
        {block.body}
      </p>
    );
  }
  if (block.kind === "list") {
    return (
      <ul key={key} className="terms-body-list">
        {block.items.map((item) => (
          <li key={item} className="terms-body-list-item">
            <span className="terms-body-list-bullet" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={key} className="terms-body-paragraph">
      {block.body}
    </p>
  );
}

export function TermsBody() {
  return (
    <section className="terms-body" data-atlas-tone="light">
      <div className="terms-shell terms-body-shell">
        <Reveal as="div" className="terms-intro">
          <p className="terms-intro-text">{termsIntro}</p>
        </Reveal>

        <div className="terms-body-list-wrap">
          {termsSections.map((section) => (
            <Reveal as="div" key={section.id} className="terms-body-section-wrap" stagger={0.04}>
              <article id={section.id} className="terms-body-section">
                <header className="terms-body-section-head">
                  <span className="terms-body-section-number">{section.number}</span>
                  <h2 className="terms-body-section-title">{section.title}</h2>
                </header>
                <div className="terms-body-section-body">
                  {section.blocks.map((block, index) =>
                    renderBlock(block, `${section.id}-${index}`),
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
