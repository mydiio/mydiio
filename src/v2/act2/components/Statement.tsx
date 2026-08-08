import { colors, spacing } from "@/design";

export function Statement() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        background: colors.ink,
        color: colors.cream,
        padding: `clamp(${spacing[7]}, 10vw, ${spacing[11]}) clamp(${spacing[5]}, 7vw, ${spacing[10]})`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
            fontSize: "clamp(48px, 7vw, 112px)",
            fontWeight: 600,
            lineHeight: 0.96,
            letterSpacing: "-0.055em",
          }}
        >
          Not impressions.
          <br />
          <span style={{ color: colors.amber }}>Verified journeys.</span>
        </p>
      </div>
    </section>
  );
}
