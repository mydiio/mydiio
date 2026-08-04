import { colors } from "@/design";

export type JourneyStepState = "past" | "current" | "future";

type JourneyStepProps = {
  number: string;
  title: string;
  body: string;
  state: JourneyStepState;
};

export function JourneyStep({
  number,
  title,
  body,
  state,
}: JourneyStepProps) {
  const isCurrent = state === "current";
  const isPast = state === "past";

  const opacity =
    state === "current" ? 1 : state === "past" ? 0.76 : 0.2;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 4,
        textAlign: "center",
        fontFamily: '"DM Sans", system-ui, sans-serif',
        opacity,
        transform: isCurrent ? "translateY(-4px)" : "translateY(0)",
        transition:
          "opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        style={{
          marginBottom: "14px",
          color: isCurrent ? colors.amberDeep : colors.ink,
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          transition: "color 0.4s ease",
        }}
      >
        {number}
      </div>

      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: isCurrent ? "72px" : "68px",
          height: isCurrent ? "72px" : "68px",
          margin: "0 auto 18px",
          borderRadius: "50%",
          border: `1px solid ${
            isCurrent || isPast
              ? colors.amber
              : "rgba(26,26,24,0.12)"
          }`,
          background: isCurrent
            ? "rgba(245,166,35,0.11)"
            : colors.cream,
          transition:
            "width 0.45s ease, height 0.45s ease, border-color 0.4s ease, background 0.4s ease",
        }}
      >
        <div
          style={{
            width: isCurrent ? "17px" : "14px",
            height: isCurrent ? "17px" : "14px",
            borderRadius: "50%",
            background:
              isCurrent || isPast
                ? colors.amber
                : "rgba(26,26,24,0.14)",
            boxShadow: isCurrent
              ? "0 0 0 8px rgba(245,166,35,0.12)"
              : "none",
            transition:
              "width 0.4s ease, height 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
          }}
        />
      </div>

      <h3
        style={{
          margin: 0,
          minHeight: "2.4em",
          color: colors.ink,
          fontSize: "clamp(17px, 1.4vw, 22px)",
          fontWeight: isCurrent ? 700 : 600,
          lineHeight: 1.12,
          letterSpacing: "-0.035em",
          transition: "font-weight 0.4s ease",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          width: isCurrent ? "36px" : "28px",
          height: "1px",
          margin: "14px auto",
          background: isCurrent
            ? colors.amber
            : "rgba(26,26,24,0.14)",
          transition: "width 0.4s ease, background 0.4s ease",
        }}
      />

      <p
        style={{
          margin: 0,
          color: "rgba(26,26,24,0.58)",
          fontSize: "13px",
          lineHeight: 1.45,
        }}
      >
        {body}
      </p>
    </div>
  );
}
