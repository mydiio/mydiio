import { assets, type AssetId } from "./assets";

export interface AtlasMoment {
  id: AssetId;
  src: string;
  duration: number;
  headline?: string;
}

export const moments: AtlasMoment[] = [
  {
    id: "m001",
    src: assets.m001,
    duration: 6,
  },
  {
    id: "m002",
    src: assets.m002,
    duration: 3,
    headline: "The city moves.",
  },
  {
    id: "m003",
    src: assets.m003,
    duration: 3,
  },
  {
    id: "m007",
    src: assets.m007,
    duration: 3,
  },
  {
    id: "m008",
    src: assets.m008,
    duration: 4,
    headline: "We verify it.",
  },
  {
    id: "m010",
    src: assets.m010,
    duration: 2,
  },
  {
    id: "m011",
    src: assets.m011,
    duration: 5,
    headline: "mydiio",
  },
];
