import { useMediaQuery } from "@/v2/hooks";
import { PioneerDesktop } from "./PioneerDesktop";
import { PioneerMobile } from "./PioneerMobile";

type PioneerSceneProps = {
  progress: number;
};

export function PioneerScene({
  progress,
}: PioneerSceneProps) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return isMobile ? (
    <PioneerMobile progress={progress} />
  ) : (
    <PioneerDesktop progress={progress} />
  );
}
