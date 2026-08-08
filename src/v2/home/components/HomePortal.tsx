import { Reveal, useParallax } from "@/motion";
import { portalEyebrow, portalHeading, portalBody, portalPoints } from "../homeContent";

const DASHBOARD_IMG = "/assets/advertiser-pharmacy-dashboard.png";

export function HomePortal() {
  const dashboardParallax = useParallax(0.06);

  return (
    <section className="home-portal" data-atlas-tone="light">
      <div className="home-shell home-portal-grid">
        <Reveal as="div" className="home-portal-preview">
          <div className="home-portal-preview-inner" ref={dashboardParallax}>
            <img
              src={DASHBOARD_IMG}
              alt="The mydiio advertiser portal dashboard"
              loading="lazy"
            />
            <div className="home-portal-preview-overlay" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="home-portal-copy">
          <Reveal>
            <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{portalEyebrow}</div>
          </Reveal>

          <Reveal as="h2" className="atlas-section-heading">{portalHeading}</Reveal>

          <Reveal>
            <p className="atlas-section-copy">{portalBody}</p>
          </Reveal>

          <Reveal as="ul" className="home-portal-points" stagger={0.06}>
            {portalPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
