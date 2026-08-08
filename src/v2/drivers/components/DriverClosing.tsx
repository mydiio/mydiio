import { Reveal } from "@/motion";
import { closingEyebrow, closingHeadingLines, closingBody, closingNote } from "../driverContent";

export function DriverClosing() {
  return (
    <section className="driver-closing" data-atlas-tone="dark">
      <Reveal as="div" className="driver-shell driver-closing-inner">
        <div className="atlas-section-eyebrow atlas-section-eyebrow-light">{closingEyebrow}</div>

        <h2 className="atlas-section-heading">
          {closingHeadingLines.map((line, i) => (
            <span key={line} className="driver-closing-title-line">
              {i === 1 ? <span>{line}</span> : line}
              {i < closingHeadingLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>

        <p>{closingBody}</p>

        <div className="driver-closing-actions">
          <a href="/drivers/apply" className="atlas-button-amber">
            Apply to join
          </a>
        </div>

        <p className="driver-closing-note">{closingNote}</p>
      </Reveal>
    </section>
  );
}
