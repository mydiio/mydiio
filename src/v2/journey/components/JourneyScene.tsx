import { useMediaQuery } from "@/v2/hooks";
import { JourneyDesktop } from "./JourneyDesktop";
import { JourneyMobile } from "./JourneyMobile";

type JourneySceneProps = {
  progress: number;
};

export function JourneyScene({
  progress,
}: JourneySceneProps) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return isMobile ? (
    <JourneyMobile progress={progress} />
  ) : (
    <JourneyDesktop progress={progress} />
  );
}
