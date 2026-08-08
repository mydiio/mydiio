import { colors, spacing } from "@/design";
import { Counter } from "./Counter";

export function NetworkHero() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "grid",
        alignItems: "center",
        background: colors.cream,
        color: colors.ink,
        padding: `clamp(${spacing[7]}, 10vw, ${spacing[11]}) clamp(${spacing[5]}, 7vw, ${spacing[10]})`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          marginInline: "auto",
        }}
      >
        <p
          style={{
            margin: `0 0 ${spacing[7]}`,
            maxWidth: "16ch",
            fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
            fontSize: "clamp(52px, 8vw, 124px)",
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: "-0.06em",
          }}
        >
          One connected passenger network.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: spacing[7],
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
                fontSize: "clamp(72px, 11vw, 180px)",
                fontWeight: 700,
                lineHeight: 0.82,
                letterSpacing: "-0.075em",
              }}
            >
              <Counter target={320000} />
            </div>

            <p
              style={{
                margin: `${spacing[5]} 0 0`,
                maxWidth: "18ch",
                fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
                fontSize: "clamp(20px, 2vw, 30px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              tuk-tuks in Colombo, daily.
            </p>
          </div>

          <div
            style={{
              maxWidth: "28ch",
              justifySelf: "end",
              paddingBottom: spacing[3],
              fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
              fontSize: "clamp(18px, 1.5vw, 24px)",
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: "-0.025em",
            }}
          >
            The network Colombo already runs on.
          </div>
        </div>
      </div>
    </section>
  );
}
