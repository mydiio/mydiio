export const environmentComposition = {
  horizon: {
    y: 48,
    glowWidth: 88,
    glowHeight: 24,
  },

  skyline: {
    x: 50,
    y: 34,
    width: 68,
    height: 23,
    opacity: 0.34,
    brightness: 0.62,
  },

  road: {
    x: 47,
    bottom: -17,
    width: 103,
    height: 64,
    objectX: 46,
    objectY: 61,
    opacity: 0.72,
    brightness: 0.62,
    rotate: -0.55,
  },

  buildingsLeft: {
    x: -4,
    bottom: 5,
    width: 47,
    height: 56,
    opacity: 0.74,
    brightness: 0.68,
    rotateY: 3.5,
    rotateZ: 0.15,
  },

  buildingsRight: {
    x: -4,
    bottom: 5,
    width: 47,
    height: 56,
    opacity: 0.74,
    brightness: 0.68,
    rotateY: -3.5,
    rotateZ: -0.15,
  },

  palms: {
    x: 50,
    bottom: 13,
    width: 84,
    height: 43,
    opacity: 0.36,
    brightness: 0.56,
  },

  streetlights: {
    x: 50,
    bottom: 12,
    width: 86,
    height: 45,
    opacity: 0.46,
    brightness: 0.69,
  },

  curbs: {
    x: 50,
    bottom: -1,
    width: 95,
    height: 39,
    opacity: 0.36,
  },

  pavement: {
    x: 50,
    bottom: -3,
    width: 96,
    height: 38,
    opacity: 0.25,
  },

  crosswalk: {
    x: 50,
    bottom: -4,
    width: 58,
    height: 18,
    opacity: 0.28,
  },

  foregroundDetails: {
    x: 50,
    bottom: 1,
    width: 96,
    height: 26,
    opacity: 0.22,
  },

  centreClearance: {
    width: 43,
    top: 23,
    bottom: 8,
  },
} as const;
