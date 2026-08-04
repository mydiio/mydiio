import { colors } from "@/design";
import type { PackageTier } from "../packageData";

type PackageCardProps = {
  tier: PackageTier;
  active: boolean;
  complete: boolean;
  settled: boolean;
};

export function PackageCard({
  tier,
  active,
  complete,
  settled,
}: PackageCardProps) {
  const opacity = settled
    ? 1
    : active
      ? 1
      : complete
        ? 0.7
        : 0.28;

  return (
    <article
      style={{
        position: "relative",
        minHeight: "330px",
        padding: "26px",
        borderRadius: "24px",
        overflow: "hidden",
        background: tier.featured
          ? colors.ink
          : "rgba(255,255,255,0.88)",
        border: tier.featured
          ? "1px solid rgba(245,166,35,0.42)"
          : "1px solid rgba(26,26,24,0.075)",
        boxShadow: active
          ? tier.featured
            ? "0 34px 80px -44px rgba(0,0,0,0.62)"
            : "0 30px 68px -44px rgba(26,26,24,0.24)"
          : "none",
        color: tier.featured ? colors.cream : colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
        opacity,
        transform: settled
          ? tier.featured
            ? "translateY(-6px) scale(1.012)"
            : "translateY(0) scale(1)"
          : active
            ? "translateY(-10px) scale(1)"
            : "translateY(0) scale(0.985)",
        transition:
          "opacity 0.42s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
      }}
    >
      {tier.featured && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-28%",
            bottom: "-34%",
            width: "92%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.2), transparent 66%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            marginBottom: "34px",
          }}
        >
          <span
            style={{
              color: tier.featured
                ? colors.amber
                : colors.amberDeep,
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.13em",
            }}
          >
            {tier.number}
          </span>

          {tier.emphasis && (
            <span
              style={{
                padding: "7px 10px",
                borderRadius: "999px",
                background: "rgba(245,166,35,0.14)",
                color: colors.amber,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {tier.emphasis}
            </span>
          )}
        </div>

        <div
          style={{
            marginBottom: "10px",
            color: tier.featured
              ? "rgba(253,250,243,0.54)"
              : "rgba(26,26,24,0.66)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {tier.eyebrow}
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: "clamp(32px, 2.7vw, 46px)",
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
          }}
        >
          {tier.name}
        </h3>

        <p
          style={{
            margin: "20px 0 0",
            color: tier.featured
              ? "rgba(253,250,243,0.66)"
              : "rgba(26,26,24,0.58)",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          {tier.description}
        </p>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "26px",
            borderTop: `1px solid ${
              tier.featured
                ? "rgba(253,250,243,0.12)"
                : "rgba(26,26,24,0.08)"
            }`,
            color: tier.featured
              ? colors.amber
              : colors.ink,
            fontSize: "14px",
            fontWeight: 650,
          }}
        >
          {tier.scale}
        </div>
      </div>
    </article>
  );
}
