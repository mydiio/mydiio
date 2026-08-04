import { useMediaQuery } from "@/v2/hooks";
import { CoverageDesktop } from "./CoverageDesktop";
import { CoverageMobile } from "./CoverageMobile";

type CoverageSceneProps = {
  progress: number;
};

export function CoverageScene({
  progress,
}: CoverageSceneProps) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return isMobile ? (
    <CoverageMobile progress={progress} />
  ) : (
    <CoverageDesktop progress={progress} />
  );
}
