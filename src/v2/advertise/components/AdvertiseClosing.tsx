import { Link } from "@tanstack/react-router";
import { Reveal } from "@/motion";
import {
  closingEyebrow,
  closingHeadingLines,
  closingAccent,
  closingBody,
  closingNote,
} from "../advertiserContent";

export function AdvertiseClosing() {
  return (
    <section className="advertiser-closing" data-atlas-tone="dark">
      <Reveal as="div" className="advertiser-shell advertiser-closing-inner">
        <div className="atlas-section-eyebrow atlas-section-eyebrow-light">{closingEyebrow}</div>

        <h2 className="atlas-section-heading">
          {closingHeadingLines.map((line, i) => (
            <span key={line} className="advertiser-closing-title-line">
              {i === 1 ? <span>{closingAccent}</span> : line}
              {i < closingHeadingLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>

        <p>{closingBody}</p>

        <div className="advertiser-closing-actions">
          <Link to="/advertise/apply" className="atlas-button-amber">
            Launch campaign
          </Link>
        </div>

        <p className="advertiser-closing-note">{closingNote}</p>
      </Reveal>
    </section>
  );
}
