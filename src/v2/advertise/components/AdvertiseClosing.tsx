import { Link } from "@tanstack/react-router";

export function AdvertiseClosing() {
  return (
    <section className="advertiser-closing" data-atlas-tone="dark">
      <div className="advertiser-shell advertiser-closing-inner">
        <div className="atlas-section-eyebrow atlas-section-eyebrow-light">Ready to launch</div>

        <h2>
          Launch with proof.
          <br />
          <span>Not estimates.</span>
        </h2>

        <p>
          Choose a package and tell us what you want to achieve. We will help you launch your
          campaign.
        </p>

        <Link to="/advertise/apply" className="atlas-button-amber">
          Launch campaign
        </Link>
      </div>
    </section>
  );
}
