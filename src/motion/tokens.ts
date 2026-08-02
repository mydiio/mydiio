// One easing, one duration scale, one stagger - never hardcode
export const motionTokens = {
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // power3.out equivalent
  durations: {
    instant: 0.2,
    fast: 0.35,
    standard: 0.5,
    slow: 0.8,
  },
  stagger: 0.08,
} as const;

// CSS variable versions for use in styles
export const motionCSSVars = {
  '--motion-easing': motionTokens.easing,
  '--motion-duration-instant': `${motionTokens.durations.instant}s`,
  '--motion-duration-fast': `${motionTokens.durations.fast}s`,
  '--motion-duration-standard': `${motionTokens.durations.standard}s`,
  '--motion-duration-slow': `${motionTokens.durations.slow}s`,
  '--motion-stagger': `${motionTokens.stagger}s`,
} as const;
