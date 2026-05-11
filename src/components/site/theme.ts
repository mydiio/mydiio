// Single source of truth for mydiio brand tokens used inline.
// CSS variables live in src/styles.css — these mirror them for inline styles.
export const C = {
  amber: "#F5A623",
  amberDeep: "#E8920A",
  amberPale: "#FEF3D7",
  yellow: "#F7E14A",
  green: "#4CAF72",
  greenDeep: "#2D8A4E",
  greenPale: "#EAF2EC",
  ink: "#1A1A18",
  inkSoft: "#7A7A72",
  cream: "#FDFAF3",
  creamWarm: "#FBF6E8",
  white: "#FFFFFF",
} as const;

export type Accent = "amber" | "green" | "ink";

export function accentColor(a: Accent = "amber") {
  if (a === "green") return { bg: C.green, fg: "#fff", deep: C.greenDeep };
  if (a === "ink") return { bg: C.ink, fg: "#fff", deep: C.ink };
  return { bg: C.amber, fg: C.ink, deep: C.amberDeep };
}
