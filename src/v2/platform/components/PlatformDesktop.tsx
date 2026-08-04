import { colors } from "@/design";
import { DashboardFrame } from "./DashboardFrame";
import { PlatformFeature } from "./PlatformFeature";

type PlatformSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function PlatformDesktop({
  progress,
}: PlatformSceneProps) {
  const copyProgress = clamp(progress / 0.2);
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.cream,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 980px) {
          .atlas-platform-layout {
            grid-template-columns: 1fr !important;
          }

          .atlas-platform-dashboard {
            max-width: 760px;
          }

          .atlas-platform-features {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        style={{
          width: "min(1380px, calc(100% - 72px))",
          height: "100%",
          marginInline: "auto",
          padding: "clamp(24px, 3.5vh, 44px) 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="atlas-platform-layout"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(340px, 0.78fr) minmax(520px, 1.22fr)",
            gap: "clamp(48px, 7vw, 110px)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: copyProgress,
              transform: `translateY(${
                (1 - copyProgress) * 24
              }px)`,
            }}
          >
            <div
              style={{
                marginBottom: "18px",
                color: colors.amber,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              The Platform
            </div>

            <h2
              style={{
                margin: 0,
                maxWidth: "9ch",
                fontSize: "clamp(46px, 5.2vw, 80px)",
                fontWeight: 600,
                lineHeight: 0.92,
                letterSpacing: "-0.065em",
              }}
            >
              Proof you can actually use.
            </h2>

            <p
              style={{
                margin: "22px 0 0",
                maxWidth: "470px",
                color: "rgba(253,250,243,0.62)",
                fontSize: "clamp(17px, 1.3vw, 20px)",
                lineHeight: 1.5,
                letterSpacing: "-0.02em",
              }}
            >
              Build your campaign, follow every verified play and receive a
              clear report every Monday.
            </p>
          </div>

          <div className="atlas-platform-dashboard">
            <DashboardFrame progress={progress} />
          </div>
        </div>

        <div
          className="atlas-platform-features"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(24px, 4vw, 56px)",
            marginTop: "clamp(26px, 3.5vh, 42px)",
          }}
        >
          <PlatformFeature
            number="01"
            title="Launch"
            body="Create and deploy your campaign from one place."
            progress={progress}
            threshold={0.32}
            nextThreshold={0.64}
          />

          <PlatformFeature
            number="02"
            title="Verify"
            body="See where, when and on which vehicle every play happened."
            progress={progress}
            threshold={0.64}
            nextThreshold={0.79}
          />

          <PlatformFeature
            number="03"
            title="Report"
            body="Receive a clean verified performance report every Monday."
            progress={progress}
            threshold={0.79}
          />
        </div>
      </div>
    </div>
  );
}
