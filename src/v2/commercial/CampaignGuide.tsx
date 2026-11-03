import { activationPolicy, refundPolicy, renewalPolicy, shortfallPolicy } from "./policy";
export function CampaignGuide() {
  return (
    <section className="commercial-section" id="creative-guide" data-atlas-tone="light">
      <div className="commercial-shell">
        <span className="commercial-eyebrow">Before you book</span>
        <h2>Your campaign, step by step.</h2>
        <ol>
          <li>Tell us about your business and preferred package.</li>
          <li>
            We confirm your campaign order, actual vehicle allocation, coverage and start date.
          </li>
          <li>
            Supply your creative for review, approve the final version and pay the agreed advance.
          </li>
          <li>We confirm activation when the first qualifying completed paid play is recorded.</li>
        </ol>
        <h3>What do your minutes buy?</h3>
        <p>
          A 500-minute Roamer allocation accommodates 1,000 completed 30-second plays across the
          agreed vehicles in total. These are screen plays, not a promise of viewers, enquiries or
          sales. Static-image display duration is agreed in your campaign order.
        </p>
        <h3>Prepare your creative</h3>
        <div className="commercial-grid">
          <article>
            <h4>Video</h4>
            <p>
              Landscape 16:9 · 1920 × 1080 pixels. MP4 with H.264 video, 25 or 30 fps. 15 or 30
              seconds; other lengths by prior agreement. Maximum 100 MB. Optional AAC audio; the ad
              must work when muted.
            </p>
          </article>
          <article>
            <h4>Static image</h4>
            <p>
              Landscape 16:9 · 1920 × 1080 pixels. High-quality JPG or PNG in RGB/sRGB. Maximum 20
              MB. Flatten transparency unless agreed otherwise. Display duration is confirmed in the
              campaign order.
            </p>
          </article>
        </div>
        <p>
          Keep important content at least 80 px from every edge. QR codes should be at least 250 ×
          250 px, with a supplied destination URL. Use large, high-contrast text; avoid flashing and
          messages that depend on sound.
        </p>
        <p>
          Submit final files, campaign name, preferred start date, destination URLs and any required
          legal wording or expiry dates at least three working days before the agreed start. Design
          and substantial edits are charged separately, with scope and price approved before work
          begins.
        </p>
        <p>
          We confirm your campaign start date once creative is approved, payment has cleared and
          capacity is confirmed, subject to our planned November 2026 launch.
        </p>
        {[
          ["When does activation happen?", activationPolicy],
          ["Deposits and pre-activation refunds", refundPolicy],
          ["Minimum term and renewal", renewalPolicy],
          ["If we deliver fewer minutes", shortfallPolicy],
        ].map(([title, body]) => (
          <details key={title}>
            <summary>{title}</summary>
            <p>{body}</p>
          </details>
        ))}
        <p>
          <a href="/terms">Read the full terms</a> · <a href="/contact">Ask a question</a>
        </p>
      </div>
    </section>
  );
}
