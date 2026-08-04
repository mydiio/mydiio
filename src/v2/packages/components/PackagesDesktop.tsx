import { colors } from "@/design";
import { packageTiers } from "../packageData";
import { PackageCard } from "./PackageCard";

type PackagesSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function PackagesDesktop({
  progress,
}: PackagesSceneProps) {
  const copyProgress = clamp(progress / 0.18);
  const cardsProgress = clamp((progress - 0.12) / 0.78);
  const finalProgress = clamp((progress - 0.86) / 0.1);

  const settled = progress >= 0.9;

  const activeIndex =
    cardsProgress >= 0.78
      ? 3
      : cardsProgress >= 0.52
        ? 2
        : cardsProgress >= 0.26
          ? 1
          : 0;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 980px) {
          .atlas-package-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .atlas-package-grid {
            grid-template-columns: 1fr !important;
          }

          .atlas-package-scene {
            overflow-y: auto !important;
          }
        }
      `}</style>

      <div
        className="atlas-package-scene"
        style={{
          width: "min(1380px, calc(100% - 96px))",
          height: "100%",
          marginInline: "auto",
          padding: "clamp(32px, 4.5vh, 52px) 0 26px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <header
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 0.9fr) minmax(320px, 0.45fr)",
            gap: "clamp(46px, 7vw, 108px)",
            alignItems: "end",
            marginBottom: "clamp(18px, 2.4vh, 28px)",
            opacity: copyProgress,
            transform: `translateY(${(1 - copyProgress) * 18}px)`,
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "15px",
                color: colors.amberDeep,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Choose your entry
            </div>

            <h2
              style={{
                margin: 0,
                maxWidth: "12ch",
                fontSize: "clamp(42px, 4.7vw, 70px)",
                fontWeight: 600,
                lineHeight: 0.93,
                letterSpacing: "-0.064em",
              }}
            >
              A campaign built around your ambition.
            </h2>
          </div>

          <div>
            <p
              style={{
                margin: 0,
                color: "rgba(26,26,24,0.6)",
                fontSize: "clamp(16px, 1.18vw, 19px)",
                lineHeight: 1.55,
              }}
            >
              Start focused, build frequency or secure a larger presence
              across the connected passenger network.
            </p>

            <div
              style={{
                marginTop: "18px",
                color: colors.ink,
                fontSize: "14px",
                fontWeight: 650,
              }}
            >
              Campaigns from LKR 25,000 a month
            </div>
          </div>
        </header>

        <div
          className="atlas-package-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {packageTiers.map((tier, index) => (
            <PackageCard
              key={tier.id}
              tier={tier}
              active={!settled && index === activeIndex}
              complete={!settled && index < activeIndex}
              settled={settled}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "20px",
            opacity: finalProgress,
            transform: `translateY(${
              (1 - finalProgress) * 8
            }px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(232,146,10,0.38)",
              background: "rgba(255,255,255,0.62)",
              fontSize: "13px",
              fontWeight: 650,
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: colors.amber,
              }}
            />

            Every package includes GPS-verified reporting.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              flexWrap: "wrap",
              color: "rgba(26,26,24,0.62)",
              fontSize: "14px",
            }}
          >
            <span>
              Not sure where to start? We’ll recommend the right package.
            </span>

            <a
              href="/advertise"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "44px",
                padding: "0 18px",
                borderRadius: "999px",
                background: colors.ink,
                color: colors.cream,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Build your campaign
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
