export function ClientPortalSection() {
  const portalBenefits = [
    {
      number: "01",
      title: "Launch in three steps.",
      body: "Choose a package, add your video or image, then send your campaign for launch.",
    },
    {
      number: "02",
      title: "Manage and add minutes.",
      body: "See active campaigns, manage approved ads and top up your campaign minutes.",
    },
    {
      number: "03",
      title: "Track every campaign.",
      body: "Open past reports and check where, when and how your campaign was delivered.",
    },
    {
      number: "04",
      title: "Get help in one place.",
      body: "Send a custom campaign request or message the mydiio team directly from your portal.",
    },
  ];

  return (
    <section id="client-portal" className="advertiser-client-portal" data-atlas-tone="light">
      <div className="advertiser-shell">
        <header className="advertiser-client-portal-intro">
          <div>
            <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Client portal</div>

            <h2 className="atlas-section-heading">
              One portal.
              <br />
              Full control.
            </h2>
          </div>

          <p className="atlas-section-copy">
            Launch campaigns, add minutes, open reports and contact the mydiio team from one place.
          </p>
        </header>

        <div className="advertiser-client-portal-layout">
          <div className="advertiser-client-portal-benefits">
            {portalBenefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>

                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div
            className="advertiser-client-portal-preview"
            aria-label="Preview of the mydiio advertiser portal"
          >
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
                <li>
                  <span>01</span>
                  <div>
                    <strong>Choose</strong>
                    <p>Select a package</p>
                  </div>
                </li>

                <li>
                  <span>02</span>
                  <div>
                    <strong>Create</strong>
                    <p>Add your video or image</p>
                  </div>
                </li>

                <li>
                  <span>03</span>
                  <div>
                    <strong>Launch</strong>
                    <p>Send it to the network</p>
                  </div>
                </li>
              </ol>

              <div className="advertiser-client-portal-tools">
                <article>
                  <span>Campaigns</span>
                  <strong>Manage ads and minutes</strong>
                </article>

                <article>
                  <span>Reports</span>
                  <strong>Open every weekly report</strong>
                </article>

                <article>
                  <span>Custom campaigns</span>
                  <strong>Send your brief to our team</strong>
                </article>

                <article>
                  <span>Support</span>
                  <strong>Keep every conversation together</strong>
                </article>
              </div>

              <div className="advertiser-client-portal-footer">
                <span>Included with your advertiser account</span>
                <strong>One login. Full control.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
