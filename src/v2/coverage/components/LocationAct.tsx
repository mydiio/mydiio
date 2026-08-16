import { LocationMap } from "@/components/ui/location-map";

export function LocationAct() {
  return (
    <section
      data-v2-act="location"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        background: "#080807",
        color: "#fdfaf3",
        padding: "clamp(120px, 14vw, 200px) 0",
      }}
    >
      <div
        style={{
          width: "min(1360px, calc(100% - 96px))",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 520,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(245, 166, 35, 0.16)",
              color: "#f5a623",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#f5a623",
                boxShadow: "0 0 0 0 rgba(245, 166, 35, 0.55)",
                animation: "loc-act-pulse 2.4s ease-out infinite",
              }}
              aria-hidden="true"
            />
            Live today
          </div>
          <h2
            style={{
              margin: 0,
              color: "#fdfaf3",
              fontSize: "clamp(40px, 5vw, 76px)",
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: "-0.045em",
              maxWidth: "18ch",
              textWrap: "balance",
            }}
          >
            One screen, every active vehicle.
          </h2>
          <p
            style={{
              margin: 0,
              color: "rgba(253, 250, 243, 0.72)",
              fontSize: "clamp(16px, 1.18vw, 19px)",
              lineHeight: 1.55,
              letterSpacing: "-0.022em",
              maxWidth: "44ch",
            }}
          >
            Every connected tuk-tuk carries the same network. Hover the map to feel it tilt; click
            to expand and see the streets come alive.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            perspective: 1200,
            paddingBlock: 20,
          }}
        >
          <LocationMap
            location="Colombo, Sri Lanka"
            coordinates="6.9271° N, 79.8612° E"
            pinColor="#f5a623"
            strokeColor="rgba(245, 166, 35, 0.45)"
          />
        </div>
      </div>

      <style>{`
        @keyframes loc-act-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.55); }
          50% { box-shadow: 0 0 0 10px rgba(245, 166, 35, 0); }
        }
        @media (max-width: 980px) {
          [data-v2-act="location"] > div {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
            text-align: center;
          }
          [data-v2-act="location"] > div > div:first-child {
            align-items: center !important;
            margin-inline: auto !important;
          }
          [data-v2-act="location"] > div > div:first-child h2,
          [data-v2-act="location"] > div > div:first-child p {
            margin-inline: auto !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-v2-act="location"] * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
