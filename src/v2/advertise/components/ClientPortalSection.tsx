import {
  portalEyebrow,
  portalHeading,
  portalBody,
  portalSteps,
  portalTools,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function ClientPortalSection() {
  return (
    <section id="client-portal" className="advertiser-client-portal" data-atlas-tone="light">
      <div className="advertiser-shell">
        <Reveal as="header" className="advertiser-client-portal-intro">
          <div>
            <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{portalEyebrow}</div>

            <h2 className="atlas-section-heading">{portalHeading}</h2>
          </div>

          <p className="atlas-section-copy">{portalBody}</p>
        </Reveal>

        <div className="advertiser-client-portal-preview" aria-label="Preview of the mydiio advertiser portal">
          <div className="advertiser-client-portal-bar">
            <strong>mydiio</strong>

            <nav aria-label="Portal preview navigation">
              <span className="is-active">Dashboard</span>
              <span>Campaigns</span>
              <span>Create ad</span>
              <span>Reports</span>
              <span>Support</span>
            </nav>

            <span className="advertiser-client-portal-status">Advertiser</span>
          </div>

          <div className="advertiser-client-portal-window">
            <div className="advertiser-client-portal-window-heading">
              <div>
                <span>Campaign control</span>
                <h3>Launch your next campaign</h3>
              </div>

              <strong>Portal ready</strong>
            </div>

            <ol className="advertiser-client-portal-steps">
              {portalSteps.map((s) => (
                <li key={s.n}>
                  <span>{s.n}</span>
                  <div>
                    <strong>{s.t}</strong>
                    <p>{s.p}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="advertiser-client-portal-tools">
              {portalTools.map((t) => (
                <div key={t.l}>
                  <span>{t.l}</span>
                  <strong>{t.v}</strong>
                </div>
              ))}
            </div>

            <div className="advertiser-client-portal-footer">
              <span>Included with your advertiser account</span>
              <strong>One login. Full control.</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
