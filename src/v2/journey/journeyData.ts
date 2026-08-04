export const journeySteps = [
  {
    id: "journey",
    number: "01",
    title: "A journey begins",
    body: "A passenger enters a connected vehicle.",
    progress: 0.12,
  },
  {
    id: "experience",
    number: "02",
    title: "The screen becomes useful",
    body: "Weather, news and local information become part of the ride.",
    progress: 0.3,
  },
  {
    id: "business",
    number: "03",
    title: "A business joins the journey",
    body: "A relevant campaign reaches people already moving nearby.",
    progress: 0.48,
  },
  {
    id: "trust",
    number: "04",
    title: "The journey is verified",
    body: "The vehicle, location and time are recorded automatically.",
    progress: 0.66,
  },
  {
    id: "value",
    number: "05",
    title: "Value returns to the network",
    body: "Businesses receive proof, drivers earn and passenger content stays funded.",
    progress: 0.82,
  },
] as const;
