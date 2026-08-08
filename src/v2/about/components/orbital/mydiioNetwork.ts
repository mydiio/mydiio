// src/v2/about/components/orbital/mydiioNetwork.ts
// "Planets" for the about-page hero. Same Planet type as the orbital engine,
// re-themed so each body is a different element of the mydiio network,
// coloured in the brand palette (amber + cream + ink + green).

import type { Planet } from "./orbital";

// Sun = the mydiio network. It drifts through the star field on a slow lane
// and the rest of the system chases it.

const NETWORK: Planet[] = [
  {
    name: "Drivers",
    a: 1.8,
    e: 0.05,
    i: 2,
    node: 0,
    peri: 12,
    M0: 35,
    color: "#45855a", // brand green — driver trust
    size: 5.2,
    glow: 1.3,
  },
  {
    name: "Passengers",
    a: 2.8,
    e: 0.07,
    i: 5,
    node: 60,
    peri: 28,
    M0: 90,
    color: "#f5a623", // brand amber — visibility
    size: 4.4,
    glow: 1.2,
  },
  {
    name: "Businesses",
    a: 4.0,
    e: 0.04,
    i: 1,
    node: 120,
    peri: 50,
    M0: 200,
    color: "#e8920a", // amber-deep — commercial engine
    size: 4.0,
  },
  {
    name: "Eagle Eye",
    a: 5.5,
    e: 0.09,
    i: 7,
    node: 200,
    peri: 75,
    M0: 320,
    color: "#fdfaf3", // cream — operations control
    size: 3.4,
  },
  {
    name: "Communities",
    a: 7.4,
    e: 0.06,
    i: 4,
    node: 270,
    peri: 110,
    M0: 110,
    color: "#a85f00", // deep amber — community investment
    size: 3.2,
  },
];

export const mydiioNetwork = NETWORK;
