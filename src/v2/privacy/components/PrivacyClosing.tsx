import { Reveal } from "@/motion";

export function PrivacyClosing() {
  return (
    <section className="privacy-closing" data-atlas-tone="light">
      <div className="privacy-shell privacy-closing-shell">
        <Reveal as="div" className="privacy-closing-inner">
          <h2 className="privacy-closing-title">Questions about how we handle your data?</h2>
          <p className="privacy-closing-body">
            Use our contact form. We respond in plain language, usually within a few business days.
          </p>
          <div className="privacy-closing-actions">
            <a className="atlas-button-amber" href="/contact">
              Open contact form
              <span aria-hidden="true">→</span>
            </a>
            <a className="atlas-button-secondary" href="/contact">
              See the full contact page
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
