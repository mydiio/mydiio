import { EASE_CSS } from "@/design";

type AtlasOverlayProps = {
  active: boolean;
};

export function AtlasOverlay({ active }: AtlasOverlayProps) {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(18,18,17,0.08) 0%, rgba(18,18,17,0.015) 38%, rgba(18,18,17,0.24) 72%, rgba(18,18,17,0.58) 100%)",
          opacity: active ? 1 : 0,
          transition: `opacity 0.85s ${EASE_CSS}`,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(18,18,17,0.5) 0%, rgba(18,18,17,0.28) 28%, rgba(18,18,17,0.06) 57%, transparent 78%)",
          opacity: active ? 1 : 0,
          transition: `opacity 0.9s ${EASE_CSS}`,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "radial-gradient(circle at 24% 60%, transparent 0%, rgba(0,0,0,0.04) 36%, rgba(0,0,0,0.2) 100%)",
          opacity: active ? 1 : 0,
          transition: `opacity 1s ${EASE_CSS}`,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          boxShadow: "inset 0 0 160px rgba(0,0,0,0.16), inset 0 -90px 120px rgba(0,0,0,0.12)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
