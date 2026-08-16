import { Reveal } from "@/motion";
import { privacySections } from "../privacyContent";

export function PrivacyBody() {
  return (
    <section className="privacy-body" data-atlas-tone="light">
      <div className="privacy-shell privacy-body-shell">
        <div className="privacy-body-list">
          {privacySections.map((section) => (
            <Reveal as="div" key={section.id} className="privacy-body-section-wrap" stagger={0.04}>
              <article id={section.id} className="privacy-body-section">
                <header className="privacy-body-section-head">
                  <span className="privacy-body-section-number">{section.number}</span>
                  <h2 className="privacy-body-section-title">{section.title}</h2>
                </header>
                <p className="privacy-body-section-body">{section.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
