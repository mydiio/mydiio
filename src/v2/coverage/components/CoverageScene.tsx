import { createElement } from "react";
import { MydiioCorridorMap } from "./MydiioCorridorMap";

type CoverageSceneProps = {
  progress: number;
};

export function CoverageScene({ progress }: CoverageSceneProps) {
  return createElement(MydiioCorridorMap, { progress });
}
