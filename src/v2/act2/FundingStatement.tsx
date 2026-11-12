import { useState } from "react";
import { colors } from "@/design";
import { useSmoothSectionProgress } from "@/v2/hooks";

const STUDIO_URL = "/mydiio-campaign-studio-v4-4.html";

const examples = [
  {
    category: "Food & Beverage",
    brand: "THE PEPPER TABLE",
    headline: "MAKE LUNCH COUNT.",
    detail: "Fresh lunch specials from LKR 1,490",
    action: "Explore the menu",
    background: "#824A2C",
    accent: "#F3C58A",
  },
  {
    category: "Retail & Shopping",
    brand: "URBAN EDIT",
    headline: "FIND YOUR NEXT FAVOURITE.",
    detail: "New arrivals. Fresh discoveries.",
    action: "Discover the collection",
    background: "#315B57",
    accent: "#C7E6D8",
  },
  {
    category: "Experiences",
    brand: "ROAM CEYLON",
    headline: "GO SOMEWHERE NEW.",
    detail: "Your next Sri Lankan escape awaits.",
    action: "Explore experiences",
    background: "#526344",
    accent: "#E1E8BC",
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

/** Homepage teaser. The full Campaign Studio remains a separate experience. */
export function FundingStatement() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];

  const { sectionRef, progress } = useSmoothSectionProgress({
    damping: 12,
    entryProgress: true,
    entryDistance: 1.05,
    snapToEnd: true,
  });

  const panelProgress = easeOutCubic(clamp(progress / 0.28));
  const copyProgress = easeOutCubic(clamp((progress - 0.04) / 0.42));
  const supportingProgress = easeOutCubic(clamp((progress - 0.2) / 0.42));

  return (
    <section
      ref={sectionRef}
      data-v2-act="funding"
      data-atlas-tone="dark"
      aria-labelledby="atlas-campaign-title"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        padding: "clamp(90px, 10vh, 130px) 24px clamp(72px, 8vh, 100px)",
        boxSizing: "border-box",
        background: colors.ink,
        color: colors.cream,
        opacity: 1,
        transform: `translateY(${(1 - panelProgress) * 4}px)`,
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      }}
    >
      <style>{`
        .atlas-campaign-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .atlas-campaign-grid {
          display: grid;
          grid-template-columns: minmax(0, .88fr) minmax(0, 1.12fr);
          align-items: center;
          gap: clamp(36px, 5vw, 84px);
        }

        .atlas-campaign-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${colors.amber};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .atlas-campaign-eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: currentColor;
        }

        .atlas-campaign-title {
          margin: 20px 0 0;
          max-width: 580px;
          font-size: clamp(46px, 5vw, 76px);
          line-height: 1.04;
          letter-spacing: -.065em;
          font-weight: 600;
          text-wrap: balance;
        }

        .atlas-campaign-description {
          margin: 22px 0 0;
          max-width: 465px;
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.65;
          color: rgba(253,250,243,.72);
        }

        .atlas-campaign-actions {
          display: grid;
          gap: 14px;
          margin-top: 32px;
          max-width: 430px;
        }

        .atlas-campaign-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          min-height: 58px;
          padding: 15px 21px;
          border-radius: 11px;
          background: ${colors.amber};
          color: ${colors.ink};
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, background .2s ease;
        }

        .atlas-campaign-button:hover {
          background: #ffb83e;
          transform: translateY(-2px);
        }

        .atlas-campaign-button:focus-visible,
        .atlas-campaign-category:focus-visible,
        .atlas-campaign-secondary:focus-visible {
          outline: 2px solid ${colors.amber};
          outline-offset: 4px;
        }

        .atlas-campaign-secondary {
          width: fit-content;
          color: rgba(253,250,243,.84);
          font-size: 14px;
          font-weight: 600;
          text-underline-offset: 5px;
        }

        .atlas-campaign-note {
          margin: 0;
          font-size: 12px;
          color: rgba(253,250,243,.55);
        }

        .atlas-campaign-visual {
          min-width: 0;
        }

        .atlas-campaign-frame {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          background: #292923;
          border: 1px solid rgba(253,250,243,.18);
          box-shadow: 0 25px 70px rgba(0,0,0,.28);
        }

        .atlas-campaign-poster {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .atlas-campaign-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,.38),
            transparent 38%,
            rgba(0,0,0,.58)
          );
        }

        .atlas-campaign-frame-label,
        .atlas-campaign-frame-caption {
          position: absolute;
          z-index: 1;
          left: 18px;
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-shadow: 0 2px 8px rgba(0,0,0,.8);
        }

        .atlas-campaign-frame-label {
          top: 18px;
          display: flex;
          align-items: center;
          gap: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .atlas-campaign-frame-caption {
          bottom: 18px;
        }

        .atlas-campaign-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${colors.amber};
        }

        .atlas-campaign-preview {
          margin-top: 14px;
          padding: 20px;
          border: 1px solid rgba(253,250,243,.14);
          border-radius: 17px;
          background: #252521;
        }

        .atlas-campaign-preview-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
          color: rgba(253,250,243,.8);
          font-size: 12px;
          font-weight: 600;
        }

        .atlas-campaign-preview-tag {
          color: ${colors.amber};
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .atlas-campaign-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }

        .atlas-campaign-category {
          padding: 10px 12px;
          border: 1px solid rgba(253,250,243,.17);
          border-radius: 9px;
          background: transparent;
          color: rgba(253,250,243,.75);
          font: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }

        .atlas-campaign-category:hover {
          border-color: rgba(245,166,35,.6);
        }

        .atlas-campaign-category[aria-pressed="true"] {
          background: ${colors.amber};
          border-color: ${colors.amber};
          color: ${colors.ink};
        }

        .atlas-campaign-sample {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
          padding: clamp(18px, 3vw, 26px);
          border-radius: 12px;
          background: var(--sample-bg);
          color: white;
          transition: background .25s ease;
        }

        .atlas-campaign-sample-brand {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .15em;
        }

        .atlas-campaign-sample-title {
          margin: 18px 0 8px;
          max-width: 430px;
          font-size: clamp(24px, 2.8vw, 36px);
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: -.045em;
        }

        .atlas-campaign-sample-detail {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255,255,255,.88);
        }

        .atlas-campaign-sample-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 20px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,.25);
          font-size: 11px;
          font-weight: 600;
        }

        .atlas-campaign-foot {
          margin-top: 13px;
          font-size: 11px;
          line-height: 1.5;
          color: rgba(253,250,243,.55);
        }

        @media (max-width: 850px) {
          .atlas-campaign-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .atlas-campaign-title {
            max-width: 650px;
          }

          .atlas-campaign-description {
            max-width: 620px;
          }

          .atlas-campaign-visual {
            max-width: 720px;
          }
        }

        @media (max-width: 540px) {
          .atlas-campaign-title {
            font-size: clamp(42px, 10vw, 55px);
          }

          .atlas-campaign-preview {
            padding: 14px;
          }

          .atlas-campaign-category {
            flex: 1 1 auto;
            font-size: 11px;
          }

          .atlas-campaign-sample {
            min-height: 160px;
          }

          .atlas-campaign-frame {
            border-radius: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-funding-motion {
            opacity: 1 !important;
            transform: none !important;
          }

          .atlas-campaign-button,
          .atlas-campaign-category,
          .atlas-campaign-sample {
            transition: none;
          }
        }

        /* INTERACTIVE ADVERT INSIDE THE PHOTOGRAPHED TABLET */
        .atlas-campaign-tablet-ad {
          position: absolute;
          z-index: 1;
          left: 40%;
          top: 41.4%;
          width: 19%;
          height: 19.8%;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.2%;
          border-radius: 1px;
          color: #fff;
          text-align: left;
          pointer-events: none;
          box-shadow: inset 0 0 14px rgba(0,0,0,.22);
          transition: background-color .3s ease;
          transform: translateZ(0);
        }

        .atlas-campaign-tablet-brand {
          font-size: clamp(4px, .52vw, 8px);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: .08em;
          overflow-wrap: anywhere;
        }

        .atlas-campaign-tablet-headline {
          font-size: clamp(6px, .85vw, 13px);
          line-height: 1.04;
          font-weight: 800;
          letter-spacing: -.035em;
          overflow-wrap: anywhere;
        }

        .atlas-campaign-tablet-offer {
          font-size: clamp(3px, .42vw, 6px);
          line-height: 1.2;
          opacity: .9;
        }

        .atlas-campaign-tablet-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3px;
          font-size: clamp(3px, .38vw, 6px);
          font-weight: 700;
        }

        .atlas-campaign-tablet-qr {
          flex: 0 0 15%;
          aspect-ratio: 1;
          background:
            linear-gradient(90deg, #222 25%, transparent 25% 50%, #222 50% 75%, transparent 75%),
            linear-gradient(#fff, #fff);
          background-size: 8px 8px, 100% 100%;
          border: 2px solid white;
        }

        /* Keep the category selector compact beneath the photograph. */
        .atlas-campaign-preview {
          margin-top: 12px;
          padding: 16px 18px;
        }

        .atlas-campaign-categories {
          margin-bottom: 0;
        }

        /* Hide the old decorative screen outline if present. */
        .atlas-campaign-screen-glow {
          display: none;
        }

        @media (max-width: 540px) {
          .atlas-campaign-tablet-ad {
            padding: 1%;
          }

          .atlas-campaign-tablet-brand {
            font-size: 4px;
          }

          .atlas-campaign-tablet-headline {
            font-size: 6px;
          }

          .atlas-campaign-tablet-offer,
          .atlas-campaign-tablet-bottom {
            font-size: 3px;
          }

          .atlas-campaign-preview {
            padding: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-campaign-tablet-ad {
            transition: none;
          }
        }

        /* ATLAS CAMPAIGN STUDIO - IMMERSIVE WIDESCREEN V1 */

        section[data-v2-act="funding"] {
          min-height: auto !important;
          padding-top: clamp(100px, 11vw, 150px) !important;
          padding-bottom: clamp(90px, 10vw, 140px) !important;
        }

        .atlas-campaign-immersive {
          display: flex !important;
          flex-direction: column;
          align-items: stretch;
          gap: clamp(32px, 4vw, 56px);
        }

        .atlas-campaign-immersive .atlas-campaign-intro {
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
          text-align: center;
        }

        .atlas-campaign-immersive .atlas-campaign-eyebrow {
          justify-content: center;
        }

        .atlas-campaign-immersive .atlas-campaign-title {
          max-width: 950px;
          margin: 22px auto 0;
          font-size: clamp(48px, 6.4vw, 94px);
          line-height: 1.03;
          letter-spacing: -.07em;
        }

        .atlas-campaign-immersive .atlas-campaign-description {
          max-width: 640px;
          margin: 22px auto 0;
          font-size: clamp(17px, 1.6vw, 21px);
          line-height: 1.6;
        }

        .atlas-campaign-immersive .atlas-campaign-actions {
          max-width: 440px;
          margin: 28px auto 0;
          justify-items: stretch;
        }

        .atlas-campaign-immersive .atlas-campaign-secondary,
        .atlas-campaign-immersive .atlas-campaign-note {
          justify-self: center;
          text-align: center;
        }

        .atlas-campaign-immersive .atlas-campaign-visual {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        .atlas-campaign-immersive .atlas-campaign-frame {
          width: 100%;
          aspect-ratio: 1200 / 676;
          border-radius: 22px;
          border: 1px solid rgba(253,250,243,.2);
          box-shadow:
            0 35px 100px rgba(0,0,0,.35),
            0 0 70px rgba(245,166,35,.035);
        }

        .atlas-campaign-immersive .atlas-campaign-poster {
          object-fit: fill;
        }

        .atlas-campaign-immersive .atlas-campaign-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 14px;
          padding: 20px 24px;
          border-radius: 15px;
          background: #252521;
          border: 1px solid rgba(253,250,243,.15);
        }

        .atlas-campaign-immersive .atlas-campaign-preview-heading {
          margin: 0;
          flex: 0 1 auto;
        }

        .atlas-campaign-immersive .atlas-campaign-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0;
        }

        .atlas-campaign-immersive .atlas-campaign-category {
          padding: 12px 17px;
          font-size: 13px;
          border-radius: 10px;
        }

        .atlas-campaign-immersive .atlas-campaign-foot {
          margin-top: 16px;
          text-align: center;
          font-size: 12px;
        }

        /* Keep the existing screen overlay aligned with the photograph. */
        .atlas-campaign-immersive .atlas-campaign-tablet-ad {
          left: 40%;
          top: 41.4%;
          width: 19%;
          height: 19.8%;
        }

        @media (max-width: 850px) {
          .atlas-campaign-immersive {
            gap: 34px;
          }

          .atlas-campaign-immersive .atlas-campaign-title {
            font-size: clamp(46px, 8vw, 72px);
          }

          .atlas-campaign-immersive .atlas-campaign-preview {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 540px) {
          section[data-v2-act="funding"] {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .atlas-campaign-immersive .atlas-campaign-title {
            font-size: clamp(42px, 11vw, 58px);
          }

          .atlas-campaign-immersive .atlas-campaign-description {
            font-size: 15px;
          }

          .atlas-campaign-immersive .atlas-campaign-frame {
            border-radius: 14px;
          }

          .atlas-campaign-immersive .atlas-campaign-preview {
            padding: 17px;
          }

          .atlas-campaign-immersive .atlas-campaign-categories {
            width: 100%;
          }

          .atlas-campaign-immersive .atlas-campaign-category {
            flex: 1 1 auto;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: "min(900px, 110vw)",
          height: "min(900px, 110vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,.12), transparent 68%)",
          opacity: copyProgress,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="atlas-campaign-wrap atlas-funding-motion"
        style={{
          opacity: copyProgress,
          transform: `translateY(${(1 - copyProgress) * 18}px)`,
        }}
      >
        <div className="atlas-campaign-grid atlas-campaign-immersive">
          <div className="atlas-campaign-intro">
            <div className="atlas-campaign-eyebrow">
              Experience mydiio
            </div>

            <h2 id="atlas-campaign-title" className="atlas-campaign-title">
              Your brand could be{" "}
              <span style={{ color: colors.amber }}>next.</span>
            </h2>

            <div
              className="atlas-funding-motion"
              style={{
                opacity: supportingProgress,
                transform: `translateY(${(1 - supportingProgress) * 14}px)`,
              }}
            >
              <p className="atlas-campaign-description">
                See how your business could appear inside a real tuk-tuk.
                Tap a category to see a sample advert appear on the screen, then create your own in Campaign Studio.
              </p>

              <div className="atlas-campaign-actions">
                <a className="atlas-campaign-button" href={STUDIO_URL}>
                  <span>Create your own advert</span>
                  <span aria-hidden="true">{"\u2197"}</span>
                </a>

                <a className="atlas-campaign-secondary" href={STUDIO_URL}>
                  Explore the full Campaign Studio
                </a>

                <p className="atlas-campaign-note">
                  Free to preview. No payment or booking required.
                </p>
              </div>
            </div>
          </div>

          <div
            className="atlas-campaign-visual atlas-funding-motion"
            style={{
              opacity: supportingProgress,
              transform: `translateY(${(1 - supportingProgress) * 14}px)`,
            }}
          >
            <div className="atlas-campaign-frame">
              <img
                className="atlas-campaign-poster"
                src="/assets/campaign-studio/campaign-teaser-poster.webp"
                alt="Passenger view of a mydiio screen inside a tuk-tuk"
                loading="lazy"
                decoding="async"
              />

              <div
                className="atlas-campaign-tablet-ad"
                style={{ backgroundColor: example.background }}
                aria-hidden="true"
              >
                <div className="atlas-campaign-tablet-brand">
                  {example.brand}
                </div>

                <div className="atlas-campaign-tablet-headline">
                  {example.headline}
                </div>

                <div className="atlas-campaign-tablet-offer">
                  {example.detail}
                </div>

                <div className="atlas-campaign-tablet-bottom">
                  <span>Discover more</span>
                  <span className="atlas-campaign-tablet-qr" />
                </div>
              </div>

              <div className="atlas-campaign-frame-label">
                <span className="atlas-campaign-dot" />
                Real passenger perspective
              </div>

              <div className="atlas-campaign-frame-caption">
                Sample advert shown on the installed screen
              </div>
            </div>

            <div className="atlas-campaign-preview">
              <div className="atlas-campaign-preview-heading">
                <span>Choose what passengers see</span>
                <span className="atlas-campaign-preview-tag">
                  Interactive demo
                </span>
              </div>

              <div
                className="atlas-campaign-categories"
                role="group"
                aria-label="Choose a sample advert category"
              >
                {examples.map((item, index) => (
                  <button
                    key={item.category}
                    type="button"
                    className="atlas-campaign-category"
                    aria-pressed={selected === index}
                    onClick={() => setSelected(index)}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
            </div>
<p className="atlas-campaign-foot">
              Simulated screen previews for fictional businesses.
              Create your personalised preview in Campaign Studio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}