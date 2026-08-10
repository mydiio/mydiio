export const assets = {
  m001: "/assets/video/act1/compressed/m001-colombo-before-dawn.mp4",
  m002: "/assets/video/act1/compressed/m002-rooftops-waking.mp4",
  m003: "/assets/video/act1/compressed/m003-street-sunrise.mp4",
  m006: "/assets/video/act1/compressed/m006-marine-drive.mp4",
  m007: "/assets/video/act1/compressed/m007-colombo-junction.mp4",
  m008: "/assets/video/act1/compressed/m008-tuktuk-higgsfield-v3.mp4",
  m010: "/assets/video/act1/compressed/m010-gps-pulse.mp4",
  m011: "/assets/video/act1/compressed/m011-dashboard.mp4",
} as const;

export type AssetId = keyof typeof assets;
