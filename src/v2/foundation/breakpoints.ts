export const homepageBreakpoints = {
  mobileMax: 559,
  tabletMin: 560,
  tabletMax: 899,
  desktopMin: 900,
  wideMin: 1200,
} as const;

export const homepageMedia = {
  mobile: `(max-width: ${homepageBreakpoints.mobileMax}px)`,
  tablet:
    `(min-width: ${homepageBreakpoints.tabletMin}px) and ` +
    `(max-width: ${homepageBreakpoints.tabletMax}px)`,
  desktop: `(min-width: ${homepageBreakpoints.desktopMin}px)`,
  wide: `(min-width: ${homepageBreakpoints.wideMin}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
