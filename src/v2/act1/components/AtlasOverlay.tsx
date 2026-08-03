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
            "linear-gradient(180deg, rgba(26,26,24,0.08) 0%, rgba(26,26,24,0.04) 46%, rgba(26,26,24,0.60) 100%)",
          opacity: active ? 1 : 0,
          transition: `opacity 0.8s ${EASE_CSS}`,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          boxShadow: "inset 0 0 140px rgba(0,0,0,0.16)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
