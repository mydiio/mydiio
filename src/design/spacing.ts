export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
  8: "64px",
  9: "96px",
  10: "128px",
  11: "192px",
  12: "256px",
} as const;

export const sectionPadding = {
  mobile: spacing[5],
  tablet: spacing[7],
  desktop: spacing[9],
} as const;

export const containerWidth = {
  page: "1400px",
  content: "720px",
  composition: "1200px",
} as const;
