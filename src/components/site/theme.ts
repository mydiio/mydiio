// Single source of truth for mydiio brand tokens used inline.
// Mirrors CSS custom properties defined in src/styles.css.
export const C = {
  // New palette
  bg: "#F7F1E5",
  bg2: "#F2E9D6",
  paper: "#FFFEFA",
  ink: "#1E1A15",
  inkSoft: "#5B5347",
  inkMute: "#837B6F",
  accent: "#F5A623",
  accentSoft: "#F8E7C6",
  accentDeep: "#F5A623",
  accentInk: "#3A2C10",
  green: "#45855A",
  greenSoft: "#E1F0E3",
  greenInk: "#2E5538",
  onDark: "#F4EFE3",

  // Legacy aliases (kept so existing inline styles don't break)
  amber: "#F5A623",
  amberDeep: "#F5A623",
  amberPale: "#F8E7C6",
  yellow: "#F7E14A",
  greenDeep: "#2E5538",
  greenPale: "#E1F0E3",
  cream: "#F7F1E5",
  creamWarm: "#F2E9D6",
  white: "#FFFEFA",
} as const;

export type Accent = "amber" | "green" | "ink";

export function accentColor(a: Accent = "amber") {
  if (a === "green") return { bg: C.green, fg: C.onDark, deep: C.greenInk };
  if (a === "ink") return { bg: C.ink, fg: C.onDark, deep: C.ink };
  return { bg: C.accent, fg: C.accentInk, deep: C.accentDeep };
}
