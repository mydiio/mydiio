export const networkNodes = [
  { id: "n01", x: 500, y: 42, reveal: 0.04, size: 7 },

  { id: "n02", x: 385, y: 118, reveal: 0.1, size: 6 },
  { id: "n03", x: 565, y: 112, reveal: 0.14, size: 8 },
  { id: "n04", x: 710, y: 155, reveal: 0.18, size: 6 },

  { id: "n05", x: 245, y: 205, reveal: 0.22, size: 7 },
  { id: "n06", x: 445, y: 220, reveal: 0.26, size: 6 },
  { id: "n07", x: 625, y: 248, reveal: 0.3, size: 7 },
  { id: "n08", x: 815, y: 230, reveal: 0.34, size: 5 },

  { id: "n09", x: 150, y: 340, reveal: 0.38, size: 6 },
  { id: "n10", x: 330, y: 320, reveal: 0.42, size: 8 },
  { id: "n11", x: 515, y: 365, reveal: 0.46, size: 7 },
  { id: "n12", x: 700, y: 335, reveal: 0.5, size: 6 },
  { id: "n13", x: 890, y: 375, reveal: 0.54, size: 8 },

  { id: "n14", x: 220, y: 485, reveal: 0.58, size: 7 },
  { id: "n15", x: 410, y: 505, reveal: 0.62, size: 6 },
  { id: "n16", x: 590, y: 480, reveal: 0.66, size: 8 },
  { id: "n17", x: 785, y: 520, reveal: 0.7, size: 6 },

  { id: "n18", x: 330, y: 635, reveal: 0.74, size: 7 },
  { id: "n19", x: 515, y: 615, reveal: 0.78, size: 6 },
  { id: "n20", x: 690, y: 650, reveal: 0.82, size: 8 },

  { id: "n21", x: 120, y: 585, reveal: 0.84, size: 5 },
  { id: "n22", x: 860, y: 610, reveal: 0.86, size: 5 },
  { id: "n23", x: 65, y: 430, reveal: 0.88, size: 4 },
  { id: "n24", x: 940, y: 470, reveal: 0.9, size: 4 },
] as const;

export const networkEdges = [
  ["n01", "n02"],
  ["n01", "n03"],

  ["n02", "n05"],
  ["n02", "n06"],
  ["n03", "n06"],
  ["n03", "n07"],
  ["n03", "n04"],
  ["n04", "n07"],
  ["n04", "n08"],

  ["n05", "n09"],
  ["n05", "n10"],
  ["n06", "n10"],
  ["n06", "n11"],
  ["n07", "n11"],
  ["n07", "n12"],
  ["n08", "n12"],
  ["n08", "n13"],

  ["n09", "n14"],
  ["n10", "n14"],
  ["n10", "n15"],
  ["n11", "n15"],
  ["n11", "n16"],
  ["n12", "n16"],
  ["n12", "n17"],
  ["n13", "n17"],

  ["n14", "n18"],
  ["n15", "n18"],
  ["n15", "n19"],
  ["n16", "n19"],
  ["n16", "n20"],
  ["n17", "n20"],

  ["n09", "n21"],
  ["n14", "n21"],
  ["n13", "n22"],
  ["n17", "n22"],
  ["n09", "n23"],
  ["n13", "n24"],
] as const;
