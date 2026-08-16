import { Reveal } from "@/motion";

const WHATSAPP_URL = "https://wa.me/94707471002";

export function DriverApplyClosing() {
  return (
    <section className="driver-apply-closing" data-atlas-tone="light">
      <div className="driver-apply-shell driver-apply-closing-inner">
        <Reveal as="h2" className="driver-apply-closing-heading">
          Prefer to talk first?
        </Reveal>
        <Reveal as="p" className="driver-apply-closing-body">
          Message us on WhatsApp and we will walk you through the network, the routes and the
          install day.
        </Reveal>
        <Reveal as="div" className="driver-apply-closing-actions">
          <a
            className="atlas-button-amber"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
            <span className="driver-apply-closing-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="atlas-button-secondary" href="/drive">
            Read about joining the driver network
          </a>
        </Reveal>
      </div>
    </section>
  );
}
