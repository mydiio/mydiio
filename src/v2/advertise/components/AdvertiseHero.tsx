import { Link } from "@tanstack/react-router";
import { AdvertiserJourneyTablet } from "./AdvertiserJourneyTablet";
import { Reveal } from "@/motion";
import {
  advertiserEyebrow,
  advertiserHeroTitleLines,
  advertiserHeroAccent,
  advertiserHeroBody,
  advertiserPriceAnchor,
  advertiserDepositNote,
} from "../advertiserContent";

export function AdvertiseHero() {
  return (
    <section className="advertiser-hero" data-atlas-tone="light">
      <div className="advertiser-shell advertiser-hero-grid">
        <Reveal as="div" className="advertiser-hero-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {advertiserEyebrow}
          </div>

          <h1 className="advertiser-hero-title">
            {advertiserHeroTitleLines.map((line, i) => (
              <span key={line} className="advertiser-hero-title-line">
                {i === 1 ? <span>{advertiserHeroAccent}</span> : line}
                {i < advertiserHeroTitleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="advertiser-hero-body">{advertiserHeroBody}</p>

          <div className="advertiser-hero-actions">
            <Link to="/advertise/apply" className="atlas-button-amber">
              Reserve for November 2026
            </Link>

            <a href="/mydiio-campaign-studio-v4-4.html" className="atlas-button-secondary">
              Preview your advert
            </a>
          </div>

          <p className="advertiser-price-anchor">{advertiserPriceAnchor}</p>
          <p className="advertiser-deposit-note">{advertiserDepositNote}</p>
        </Reveal>

        <Reveal as="div" className="advertiser-product-stage">
          <div className="advertiser-stage-card">
            <div className="advertiser-stage-card-inner">
              <div className="advertiser-stage-eyebrow">
                Passenger screen preview
                <span>Advert &#183; Verify &#183; Report</span>
              </div>

              <AdvertiserJourneyTablet />

              <p className="advertiser-stage-caption">Your advert on screen. Verified delivery. Clear reporting.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
