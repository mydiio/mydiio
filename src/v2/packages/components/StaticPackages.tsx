import { colors } from "@/design";
import { PackageCard } from "./PackageCard";
import { packageTiers } from "../packageData";

export function StaticPackages() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
        padding: "clamp(92px, 11vw, 150px) 24px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .atlas-static-packages-grid {
          width: min(1380px, 100%);
          margin: 70px auto 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 1100px) {
          .atlas-static-packages-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .atlas-static-packages-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-top: 44px;
          }
        }
      `}</style>

      <header
        style={{
          width: "min(860px, 100%)",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: colors.amberDeep,
            fontSize: "var(--atlas-eyebrow-size)",
            fontWeight: "var(--atlas-eyebrow-weight)",
            letterSpacing: "var(--atlas-eyebrow-tracking)",
            textTransform: "uppercase",
          }}
        >
          Campaigns
        </div>

        <h2
          className="atlas-commercial-heading"
          style={{
            margin: "18px auto 0",
            maxWidth: "11ch",
          }}
        >
          One network.
          <br />
          Four ways to grow.
        </h2>

        <p
          className="atlas-commercial-copy"
          style={{
            margin: "24px auto 0",
          }}
        >
          Whether you&apos;re testing your first campaign or scaling across Colombo, there&apos;s a
          path built for your brand.
        </p>

        <div className="atlas-price-anchor">Campaigns from LKR 25,000 a month</div>
      </header>

      <div className="atlas-static-packages-grid">
        {packageTiers.map((tier) => (
          <PackageCard key={tier.id} tier={tier} active={false} complete={false} settled />
        ))}
      </div>

      <div
        style={{
          marginTop: "clamp(52px, 7vw, 88px)",
          textAlign: "center",
        }}
      >
        <a href="/advertise" className="atlas-button-primary">
          Build your campaign
        </a>

        <div
          style={{
            marginTop: "14px",
            color: "rgba(26,26,24,0.5)",
            fontSize: "13px",
          }}
        >
          Every package includes GPS-verified reporting.
        </div>
      </div>
    </div>
  );
}
