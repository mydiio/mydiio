import { useState } from "react";
import { burstRates, monthlyRates, money } from "./commercialPricing";
import "./packageExplorer.css";

type Mode = "monthly" | "burst";

type ExplorerPlan = {
  id: string;
  name: string;
  price: number;
  minutes: number;
  coverage: string;
  duration: string;
  status: string;
  available: boolean;
  note: string;
  href: string;
};

const monthlyOrder = ["roamer", "pioneer", "voyager", "horizon"] as const;

const monthlyPlans: ExplorerPlan[] = monthlyOrder.map((id) => {
  const rate = monthlyRates[id];
  const available = id === "roamer" || id === "pioneer";

  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    price: rate.price,
    minutes: rate.minutes,
    coverage: rate.vehicles,
    duration: "Per month · 3-month minimum",
    status: rate.status,
    available,
    note:
      id === "pioneer"
        ? "Limited to 10 active advertisers. 12-month price protection."
        : available
          ? "Reserve for the planned Colombo launch."
          : "Register interest for future availability.",
    href: available
      ? `/advertise/apply?tier=${id}`
      : "/advertise#monthly-packages",
  };
});

const burstPlans: ExplorerPlan[] = burstRates.map((rate) => ({
  id: rate.id,
  name: rate.name,
  price: rate.price,
  minutes: rate.minutes,
  coverage: `Up to ${rate.vehicles} accepted vehicles`,
  duration: `${rate.days} days from activation`,
  status: "Planned",
  available: false,
  note: rate.bestFor,
  href: "/advertise",
}));

function NetworkGraphic({
  minutes,
  name,
}: {
  minutes: number;
  name: string;
}) {
  // An abstract network illustration, not a geographic coverage map.
  const intensity = Math.min(minutes / 10000, 1);

  const points = [
    [34, 86],
    [104, 43],
    [158, 103],
    [223, 45],
    [283, 93],
    [345, 42],
    [400, 90],
  ];

  return (
    <div className="atlas-pe-network" aria-hidden="true">
      <div className="atlas-pe-network-top">
        <span>MYDIIO / NETWORK</span>
        <span>CAMPAIGN ALLOCATION</span>
      </div>

      <svg
        viewBox="0 0 440 150"
        role="presentation"
        focusable="false"
        className="atlas-pe-map"
      >
        <path
          d="M12 116 C78 12 135 140 202 54 S344 30 428 110"
          className="atlas-pe-road"
        />
        <path
          d="M8 49 C89 127 143 10 235 117 S348 131 430 24"
          className="atlas-pe-road"
        />
        <path
          d="M34 86 L104 43 L158 103 L223 45 L283 93 L345 42 L400 90"
          className="atlas-pe-path"
          pathLength="100"
          style={{
            strokeDasharray: "100",
            strokeDashoffset: `${80 - intensity * 65}`,
          }}
        />
        {points.map(([x, y], index) => (
          <g key={index}>
            <circle
              cx={x}
              cy={y}
              r={index === 3 ? 12 : 8}
              className="atlas-pe-node-halo"
            />
            <circle
              cx={x}
              cy={y}
              r={index === 3 ? 4.5 : 3}
              className="atlas-pe-node"
            />
          </g>
        ))}
      </svg>

      <div className="atlas-pe-network-bottom">
        <span>ONE NETWORK</span>
        <strong>{name.toUpperCase()}</strong>
      </div>
    </div>
  );
}

export function PackageExplorer() {
  const [mode, setMode] = useState<Mode>("monthly");
  const [monthlyId, setMonthlyId] = useState<string>("roamer");
  const [burstId, setBurstId] = useState<string>("burst-spark");

  const plans = mode === "monthly" ? monthlyPlans : burstPlans;
  const selectedId = mode === "monthly" ? monthlyId : burstId;
  const active = plans.find((plan) => plan.id === selectedId) ?? plans[0];

  return (
    <section
      className="atlas-pe"
      id="packages"
      data-atlas-tone="light"
      aria-labelledby="atlas-pe-heading"
    >
      <div className="atlas-pe-shell">
        <header className="atlas-pe-heading">
          <span className="atlas-pe-eyebrow">ADVERTISING PACKAGES</span>
          <h2 id="atlas-pe-heading">
            Your campaign. <span>Your reach.</span>
          </h2>
          <p>
            From a quick promotion to an ongoing presence in Colombo's tuk-tuks.
          </p>
        </header>

        <div className="atlas-pe-layout">
          <div className="atlas-pe-controls">
            <div className="atlas-pe-switch" aria-label="Package category">
              <button
                type="button"
                className={mode === "monthly" ? "is-active" : ""}
                aria-pressed={mode === "monthly"}
                onClick={() => setMode("monthly")}
              >
                Monthly plans
              </button>
              <button
                type="button"
                className={mode === "burst" ? "is-active" : ""}
                aria-pressed={mode === "burst"}
                onClick={() => setMode("burst")}
              >
                Short campaigns
              </button>
            </div>

            <div className="atlas-pe-plan-list" aria-label="Choose a package">
              {plans.map((plan) => (
                <button
                  type="button"
                  key={plan.id}
                  className={`atlas-pe-plan ${
                    active.id === plan.id ? "is-selected" : ""
                  }`}
                  aria-pressed={active.id === plan.id}
                  onClick={() => {
                    if (mode === "monthly") setMonthlyId(plan.id);
                    else setBurstId(plan.id);
                  }}
                >
                  <span className="atlas-pe-plan-main">
                    <strong>{plan.name}</strong>
                    <small>{plan.status}</small>
                  </span>
                  <span className="atlas-pe-plan-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>

            <p className="atlas-pe-controls-note">
              Select a package to explore its allocation and pricing.
            </p>
          </div>

          <div className="atlas-pe-feature">
            <NetworkGraphic minutes={active.minutes} name={active.name} />

            <div className="atlas-pe-details" aria-live="polite">
              <div className="atlas-pe-details-top">
                <span>{active.name.toUpperCase()}</span>
                <span
                  className={`atlas-pe-status ${
                    active.available ? "is-launch" : ""
                  }`}
                >
                  {active.status}
                </span>
              </div>

              <div className="atlas-pe-numbers">
                <div>
                  <span className="atlas-pe-field-label">AD MINUTES</span>
                  <div className="atlas-pe-big-number">
                    {active.minutes.toLocaleString("en-US")}
                  </div>
                  <span className="atlas-pe-field-sub">
                    {mode === "monthly" ? "total per month" : "total per campaign"}
                  </span>
                </div>

                <div className="atlas-pe-price-block">
                  <span className="atlas-pe-field-label">PACKAGE PRICE</span>
                  <strong>{money(active.price)}</strong>
                  <span className="atlas-pe-field-sub">
                    {mode === "monthly" ? "per month" : "total"}
                  </span>
                </div>
              </div>

              <div className="atlas-pe-specs">
                <div>
                  <span>VEHICLE ALLOCATION</span>
                  <strong>{active.coverage}</strong>
                </div>
                <div>
                  <span>DURATION</span>
                  <strong>{active.duration}</strong>
                </div>
              </div>

              <div className="atlas-pe-bottom">
                <div className="atlas-pe-bottom-copy">
                  <p>{active.note}</p>
                </div>
                <a className="atlas-pe-cta" href={active.href}>
                  {active.available ? "Reserve this package" : "Explore availability"}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="atlas-pe-footer">
          <span>
            Prices exclude applicable taxes. Minutes are shared across agreed
            vehicles, not guaranteed passenger views.
          </span>
          <a href="/advertise#monthly-packages">
            Compare all details <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
