import { Reveal } from "@/motion";
import { WHATSAPP_URL } from "../launchContent";

export function LaunchClosing() {
  return (
    <section className="launch-closing" data-atlas-tone="light">
      <div className="launch-shell launch-closing-inner">
        <Reveal as="h2" className="launch-closing-heading">
          Prefer to talk first?
        </Reveal>
        <Reveal as="p" className="launch-closing-body">
          Message us on WhatsApp. We will walk you through the network, the corridor and
          the right plan.
        </Reveal>
        <Reveal as="div" className="launch-closing-actions">
          <a
            className="atlas-button-amber"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
            <span className="launch-closing-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="atlas-button-secondary" href="/advertise">
            See plans and pricing
          </a>
        </Reveal>
      </div>
    </section>
  );
}
