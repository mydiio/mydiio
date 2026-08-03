export const colors = {
  cream: "#FDFAF3",
  ink: "#1A1A18",
  amber: "#F5A623",
  amberDeep: "#E8920A",
  white: "#FFFFFF",
  forest: "#3D6B4F",
} as const;

export const colorAlpha = {
  ink06: "rgba(26, 26, 24, 0.06)",
  ink08: "rgba(26, 26, 24, 0.08)",
  ink15: "rgba(26, 26, 24, 0.15)",
  ink20: "rgba(26, 26, 24, 0.20)",
  ink55: "rgba(26, 26, 24, 0.55)",
  white72: "rgba(255, 255, 255, 0.72)",
} as const;

export const radius = {
  sm: "12px",
  card: "20px",
  lg: "32px",
  pill: "999px",
  round: "50%",
} as const;

export const borders = {
  subtle: `1px solid ${colorAlpha.ink06}`,
} as const;
