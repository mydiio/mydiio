import { Reveal } from "@/motion";

export function AdvertiseClosing() {
  return (
    <section className="advertiser-closing atlas-sales-closing" data-atlas-tone="dark">
      <Reveal as="div" className="advertiser-shell advertiser-closing-inner">
        <span className="commercial-eyebrow">Your next campaign</span>
        <h2 className="atlas-section-heading">Ready to put your business <span>in motion?</span></h2>
        <p>Tell us what you want to achieve. We'll confirm the options available for launch.</p>
        <div className="advertiser-closing-actions">
          <a href="#difference" className="atlas-button-amber">Start your campaign enquiry <span aria-hidden="true">&#8594;</span></a>
        </div>
        <p className="advertiser-closing-note">No commitment to enquire. Campaign activation is subject to confirmed coverage and availability.</p>
      </Reveal>
    </section>
  );
}
