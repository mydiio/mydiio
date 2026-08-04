// Generated from OpenStreetMap data.
// Do not edit manually.

export const mapCities = [
  { id: "colombo", name: "Colombo", x: 136.21, y: 871.79, reveal: 0.08 },
  { id: "negombo", name: "Negombo", x: 130.16, y: 793.38, reveal: 0.2 },
  { id: "galle", name: "Galle", x: 239.78, y: 1134.39, reveal: 0.32 },
  { id: "jaffna", name: "Jaffna", x: 180.74, y: 81.67, reveal: 0.8 },
  { id: "trincomalee", name: "Trincomalee", x: 532.48, y: 397.19, reveal: 0.68 },
  { id: "batticaloa", name: "Batticaloa", x: 664.45, y: 640.88, reveal: 0.56 },
  { id: "hambantota", name: "Hambantota", x: 500.83, y: 1107.69, reveal: 0.44 },
] as const;

export const mapConnections = [
  ["Colombo", "Negombo"],
  ["Colombo", "Galle"],
  ["Colombo", "Hambantota"],
  ["Colombo", "Batticaloa"],
  ["Colombo", "Trincomalee"],
  ["Negombo", "Jaffna"],
  ["Negombo", "Trincomalee"],
  ["Galle", "Hambantota"],
  ["Hambantota", "Batticaloa"],
  ["Batticaloa", "Trincomalee"],
  ["Trincomalee", "Jaffna"],
] as const;
