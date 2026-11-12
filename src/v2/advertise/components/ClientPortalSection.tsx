import { useRef, useState } from "react";
import { Reveal } from "@/motion";
import { portalEyebrow, portalHeading, portalBody } from "../advertiserContent";

const portalViews = [
  {
    label: "Launch",
    eyebrow: "Campaign control",
    heading: "Launch your next campaign.",
    copy: "Choose a plan, add your creative and send it to the network.",
    metric: "3",
    metricLabel: "steps",
    rows: [
      ["01", "Choose", "Pick a plan that fits"],
      ["02", "Create", "Add your video or image"],
      ["03", "Launch", "Send it to the network"],
    ],
    notice: ["Creative approved", "Ready to launch"],
  },
  {
    label: "Campaigns",
    eyebrow: "Campaign management",
    heading: "Control every live campaign.",
    copy: "Manage ads, check available minutes and top up without waiting.",
    metric: "Live",
    metricLabel: "control",
    rows: [
      ["01", "Active campaign", "Agreed Colombo coverage"],
      ["02", "Available minutes", "Ready for upcoming plays"],
      ["03", "Top up", "Add more minutes instantly"],
    ],
    notice: ["Minutes added", "Campaign remains live"],
  },
  {
    label: "Reports",
    eyebrow: "Monday report",
    heading: "See proof, not estimates.",
    copy: "Open the vehicle, location and time record for every verified play.",
    metric: "GPS",
    metricLabel: "verified",
    rows: [
      ["01", "Vehicle record", "The tuk-tuk that played it"],
      ["02", "Location record", "Where the play happened"],
      ["03", "Time record", "When the play completed"],
    ],
    notice: ["Monday report ready", "GPS-verified plays"],
  },
  {
    label: "Support",
    eyebrow: "Your mydiio team",
    heading: "Get help from one place.",
    copy: "Send a brief, request a custom campaign or talk directly to the team.",
    metric: "1",
    metricLabel: "thread",
    rows: [
      ["01", "Custom campaign", "Tell us what you need"],
      ["02", "Shared conversation", "Keep every answer together"],
      ["03", "Practical support", "Move from question to launch"],
    ],
    notice: ["Team response ready", "Your request is moving"],
  },
];

export function ClientPortalSection() {
  const [activeView, setActiveView] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const view = portalViews[activeView];

  const changeView = (direction: number) => {
    setActiveView((current) => (current + direction + portalViews.length) % portalViews.length);
  };

  return (
    <section
      id="client-portal"
      className="advertiser-client-portal bg-[#FDFAF3] py-16 md:py-24"
      data-atlas-tone="light"
    >
      <div className="advertiser-shell">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#1A1A18] px-6 py-10 text-[#FDFAF3] shadow-[0_40px_90px_-58px_rgba(26,26,24,0.85)] md:min-h-[760px] md:rounded-[44px] md:px-16 md:py-16 lg:px-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[47%] top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#F5A623]/10 blur-[90px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-5 -z-10 text-[170px] font-bold leading-none tracking-[-0.1em] text-[#FDFAF3]/[0.025] md:text-[260px]"
            >
              portal
            </div>

            <div className="grid items-center gap-12 md:min-h-[630px] md:grid-cols-[minmax(260px,0.82fr)_minmax(400px,1.18fr)] md:gap-14 lg:gap-24">
              <div className="relative z-10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.17em] text-[#F5A623]">
                  {portalEyebrow}
                </div>

                <h2 className="mt-5 max-w-[8ch] text-[clamp(46px,5.4vw,80px)] font-semibold leading-[0.91] tracking-[-0.07em] text-[#FDFAF3]">
                  {portalHeading}
                </h2>

                <p className="mt-6 max-w-[34ch] text-[16px] font-medium leading-[1.55] tracking-[-0.025em] text-[#FDFAF3]/65">
                  {portalBody}
                </p>

                <div className="mt-12 min-h-[170px]" key={view.label} aria-live="polite">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5A623]">
                    {view.eyebrow}
                  </div>

                  <h3 className="mt-3 max-w-[10ch] text-[clamp(28px,3vw,44px)] font-semibold leading-[0.98] tracking-[-0.055em]">
                    {view.heading}
                  </h3>

                  <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.5] text-[#FDFAF3]/55">
                    {view.copy}
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-3" aria-label="Portal preview controls">
                  <button
                    type="button"
                    onClick={() => changeView(-1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#FDFAF3]/20 text-lg transition hover:border-[#F5A623] hover:bg-[#F5A623]/10"
                    aria-label="Previous portal view"
                  >
                    ←
                  </button>

                  <div className="flex items-center gap-2" role="tablist" aria-label="Portal views">
                    {portalViews.map((item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        role="tab"
                        aria-label={"Show " + item.label}
                        aria-selected={index === activeView}
                        onClick={() => setActiveView(index)}
                        className={
                          index === activeView
                            ? "h-2 w-7 rounded-full bg-[#F5A623] transition-all"
                            : "h-2 w-2 rounded-full bg-[#FDFAF3]/25 transition-all hover:bg-[#FDFAF3]/50"
                        }
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => changeView(1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#FDFAF3]/20 text-lg transition hover:border-[#F5A623] hover:bg-[#F5A623]/10"
                    aria-label="Next portal view"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                className="relative grid min-h-[570px] place-items-center md:min-h-[630px]"
                onPointerDown={(event) => {
                  pointerStart.current = event.clientX;
                }}
                onPointerUp={(event) => {
                  if (pointerStart.current === null) return;

                  const distance = event.clientX - pointerStart.current;
                  pointerStart.current = null;

                  if (Math.abs(distance) > 42) {
                    changeView(distance < 0 ? 1 : -1);
                  }
                }}
              >
                <div className="absolute left-0 top-[11%] z-30 flex max-w-[230px] items-center gap-3 rounded-[18px] border border-[#FDFAF3]/15 bg-[#242421]/95 px-4 py-3 shadow-2xl backdrop-blur-md md:-translate-x-[10%]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[11px] bg-[#F5A623]/15 font-bold text-[#F5A623]">
                    ✓
                  </span>

                  <span>
                    <strong className="block text-[12px] font-semibold">{view.notice[0]}</strong>
                    <small className="mt-1 block text-[10px] text-[#FDFAF3]/45">
                      {view.notice[1]}
                    </small>
                  </span>
                </div>

                <div className="relative z-20 w-[min(82vw,380px)] rounded-[52px] border-2 border-[#FDFAF3]/15 bg-gradient-to-br from-[#46443F] via-[#080807] to-[#292824] p-[10px] shadow-[0_40px_85px_rgba(0,0,0,0.58)]">
                  <div className="absolute left-1/2 top-[16px] z-30 h-[29px] w-[106px] -translate-x-1/2 rounded-full bg-black" />
                  <div className="absolute -right-[5px] top-[28%] h-16 w-[5px] rounded-r bg-[#45443F]" />

                  <div className="aspect-[0.54] overflow-hidden rounded-[42px] bg-gradient-to-br from-[#151512] to-[#090908]">
                    <div className="flex items-center justify-between border-b border-[#FDFAF3]/10 px-5 pb-4 pt-8">
                      <strong className="text-[14px] tracking-[-0.05em]">
                        myd<span className="text-[#F5A623]">ii</span>o
                      </strong>

                      <span className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-[#FDFAF3]/50">
                        <i className="h-[7px] w-[7px] rounded-full bg-[#F5A623] shadow-[0_0_10px_rgba(245,166,35,0.8)]" />
                        Advertiser
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-[1fr_78px] items-center gap-3 rounded-[22px] border border-[#FDFAF3]/10 bg-[radial-gradient(circle_at_15%_100%,rgba(245,166,35,0.17),transparent_50%)] p-4">
                        <div>
                          <div className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#F5A623]">
                            {view.eyebrow}
                          </div>

                          <h4 className="mt-2 text-[20px] font-semibold leading-[1.02] tracking-[-0.055em]">
                            {view.heading}
                          </h4>

                          <p className="mt-2 text-[10px] leading-[1.4] text-[#FDFAF3]/50">
                            {view.copy}
                          </p>
                        </div>

                        <div className="grid aspect-square place-items-center rounded-full border-[7px] border-[#F5A623] border-l-[#FDFAF3]/10 text-center">
                          <strong className="text-[19px] leading-none">{view.metric}</strong>
                          <small className="-mt-5 font-mono text-[6px] uppercase tracking-[0.1em] text-[#FDFAF3]/45">
                            {view.metricLabel}
                          </small>
                        </div>
                      </div>

                      <ol className="mt-3 grid gap-2">
                        {view.rows.map(([number, title, detail]) => (
                          <li
                            key={number + title}
                            className="grid min-h-[55px] grid-cols-[34px_1fr_15px] items-center gap-2 rounded-[15px] border border-[#FDFAF3]/10 bg-[#FDFAF3]/[0.025] px-3 py-2"
                          >
                            <b className="font-mono text-[9px] text-[#F5A623]">{number}</b>

                            <span>
                              <strong className="block text-[12px] font-semibold">{title}</strong>
                              <small className="mt-1 block text-[9px] text-[#FDFAF3]/42">
                                {detail}
                              </small>
                            </span>

                            <i className="not-italic text-[#F5A623]">→</i>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-4 flex justify-between font-mono text-[7px] font-bold uppercase tracking-[0.1em] text-[#FDFAF3]/35">
                        <span>One login</span>
                        <span>Full control</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[10%] right-0 z-30 flex max-w-[230px] items-center gap-3 rounded-[18px] border border-[#FDFAF3]/15 bg-[#242421]/95 px-4 py-3 shadow-2xl backdrop-blur-md md:translate-x-[10%]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[11px] bg-[#F5A623]/15 font-bold text-[#F5A623]">
                    •
                  </span>

                  <span>
                    <strong className="block text-[12px] font-semibold">Monday report ready</strong>
                    <small className="mt-1 block text-[10px] text-[#FDFAF3]/45">
                      GPS-verified plays
                    </small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
