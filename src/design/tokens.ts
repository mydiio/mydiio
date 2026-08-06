export const colors = {
  cream: "#FDFAF3",
  ink: "#1A1A18",
  night: "#080807",
  amber: "#F5A623",
  amberDeep: "#E8920A",
  white: "#FFFFFF",
  forest: "#3D6B4F",
} as const;

export const colorAlpha = {
  ink04: "rgba(26, 26, 24, 0.04)",
  ink06: "rgba(26, 26, 24, 0.06)",
  ink08: "rgba(26, 26, 24, 0.08)",
  ink10: "rgba(26, 26, 24, 0.10)",
  ink15: "rgba(26, 26, 24, 0.15)",
  ink20: "rgba(26, 26, 24, 0.20)",
  ink38: "rgba(26, 26, 24, 0.38)",
  ink55: "rgba(26, 26, 24, 0.55)",
  white06: "rgba(255, 255, 255, 0.06)",
  white08: "rgba(255, 255, 255, 0.08)",
  white10: "rgba(255, 255, 255, 0.10)",
  white20: "rgba(255, 255, 255, 0.20)",
  white38: "rgba(255, 255, 255, 0.38)",
  white55: "rgba(255, 255, 255, 0.55)",
  white72: "rgba(255, 255, 255, 0.72)",
  amber20: "rgba(245, 166, 35, 0.20)",
  amber38: "rgba(245, 166, 35, 0.38)",
} as const;

export const surfaces = {
  light: colors.cream,
  dark: colors.night,
  panelLight:
    "rgba(255, 255, 255, 0.72)",
  panelDark:
    "rgba(255, 255, 255, 0.055)",
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
  light: `1px solid ${colorAlpha.ink08}`,
  dark: `1px solid ${colorAlpha.white08}`,
} as const;
