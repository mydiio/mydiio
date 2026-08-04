import { assets, type AssetId } from "./assets";

export interface AtlasMoment {
  id: AssetId;
  src: string;

  /*
   * Relative scroll allocation, not video duration.
   * Larger values give the moment more time in the sequence.
   */
  weight: number;

  eyebrow?: string;
  headline?: string;
  supporting?: string;
  headlineTop?: string;
}

export const moments: AtlasMoment[] = [
  {
    id: "m001",
    src: assets.m001,
    weight: 1,
  },
  {
    id: "m002",
    src: assets.m002,
    weight: 1.25,
    eyebrow: "In-tuk-tuk advertising",
    headline: "Your ad plays inside Colombo’s tuk-tuks.",
    supporting: "Reach passengers across Colombo.",
  },
  {
    id: "m008",
    src: assets.m008,
    weight: 1.2,
    eyebrow: "Proof, not estimates",
    headline: "Every play is verified by GPS.",
    supporting: "Vehicle, location and time recorded for every play.",
    headlineTop: "clamp(52%, 61vh, 66%)",
  },
  {
    id: "m010",
    src: assets.m010,
    weight: 1.6,
  },
  {
    id: "m011",
    src: assets.m011,
    weight: 0.65,
  },
];
