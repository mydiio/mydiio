type EnvironmentGuidesProps = {
  visible?: boolean;
};

export function EnvironmentGuides({ visible = false }: EnvironmentGuidesProps) {
  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 100,
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: 0,
          right: 0,
          borderTop: "1px solid rgba(255,90,90,0.8)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          borderLeft: "1px solid rgba(90,160,255,0.8)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "26%",
          right: "26%",
          top: "22%",
          bottom: "8%",
          border: "1px dashed rgba(245,166,35,0.8)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "33.333%",
          top: 0,
          bottom: 0,
          borderLeft: "1px solid rgba(255,255,255,0.17)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "66.666%",
          top: 0,
          bottom: 0,
          borderLeft: "1px solid rgba(255,255,255,0.17)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "33.333%",
          left: 0,
          right: 0,
          borderTop: "1px solid rgba(255,255,255,0.17)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "66.666%",
          left: 0,
          right: 0,
          borderTop: "1px solid rgba(255,255,255,0.17)",
        }}
      />
    </div>
  );
}
