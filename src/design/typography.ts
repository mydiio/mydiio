export const fontFamily = {
  display: '"DM Serif Display", Georgia, serif',
  body: '"Space Grotesk", system-ui, sans-serif',
  mono: '"Space Mono", ui-monospace, monospace',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const typeScale = {
  displayXXL: "clamp(72px, 10vw, 160px)",
  displayXL: "clamp(56px, 7vw, 112px)",
  displayL: "clamp(40px, 5vw, 72px)",
  displayM: "clamp(32px, 4vw, 52px)",
  bodyLead: "clamp(18px, 1.4vw, 22px)",
  body: "16px",
  caption: "13px",
  micro: "11px",
} as const;

export const lineHeight = {
  displayXXL: 0.88,
  displayXL: 0.92,
  displayL: 1.05,
  displayM: 1.08,
  bodyLead: 1.5,
  body: 1.55,
} as const;

export const letterSpacing = {
  display: "-0.03em",
  body: "0",
  eyebrow: "0.16em",
  mono: "0.08em",
} as const;
