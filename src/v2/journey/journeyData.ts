export const journeySteps = [
  {
    id: "advertisement",
    number: "01",
    title: "Advertisement starts",
    body: "Campaign begins playing on screen.",
    progress: 0.12,
  },
  {
    id: "gps",
    number: "02",
    title: "GPS records location",
    body: "Exact location captured in real time.",
    progress: 0.3,
  },
  {
    id: "vehicle",
    number: "03",
    title: "Vehicle ID attached",
    body: "The vehicle is identified.",
    progress: 0.48,
  },
  {
    id: "timestamp",
    number: "04",
    title: "Timestamp recorded",
    body: "The exact play time is stored.",
    progress: 0.66,
  },
  {
    id: "report",
    number: "05",
    title: "Report generated",
    body: "Verified play added to your report.",
    progress: 0.82,
  },
] as const;
