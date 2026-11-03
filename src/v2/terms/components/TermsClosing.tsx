import { Reveal } from "@/motion";

export function TermsClosing() {
  return (
    <section className="terms-closing" data-atlas-tone="light">
      <div className="terms-shell terms-closing-shell">
        <Reveal as="div" className="terms-closing-inner">
          <h2 className="terms-closing-title">Questions about these terms?</h2>
          <p className="terms-closing-body">
            Use our contact form. We respond in plain language, usually within a few business days.
          </p>
          <div className="terms-closing-actions">
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
