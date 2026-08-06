import { Link } from "@tanstack/react-router";
import { ReportPreview } from "./ReportPreview";

export function AdvertiseHero() {
  return (
    <section className="advertiser-hero" data-atlas-tone="light">
      <div className="advertiser-shell advertiser-hero-grid">
        <div className="advertiser-hero-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">For advertisers</div>

          <h1 className="advertiser-hero-title">
            Your campaign.
            <br />
            <span>In motion.</span>
          </h1>

          <p className="advertiser-hero-body">
            Put your video or image on screens inside tuk-tuks travelling through Colombo South.
            Choose a monthly plan or run a one-off campaign.
          </p>

          <div className="advertiser-hero-actions">
            <Link to="/advertise/apply" className="atlas-button-amber">
              Launch campaign
            </Link>

            <a href="#difference" className="atlas-button-secondary">
              Why mydiio
            </a>
          </div>

          <p className="advertiser-price-anchor">Campaigns from LKR 25,000 a month</p>
        </div>

        <div className="advertiser-product-stage">
          <div className="advertiser-stage-label">
            Monday report
            <span>GPS verified</span>
          </div>

          <div className="advertiser-tablet" aria-label="Monday report preview">
            <div className="advertiser-tablet-camera" aria-hidden="true" />
            <div className="advertiser-tablet-screen">
              <ReportPreview compact />
            </div>
          </div>

          <p className="advertiser-stage-caption">Your campaign report. Sent every Monday.</p>
        </div>
      </div>
    </section>
  );
}
