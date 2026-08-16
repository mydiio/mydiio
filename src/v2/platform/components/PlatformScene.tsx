import { useMediaQuery } from "@/v2/hooks";
import { PlatformDesktop } from "./PlatformDesktop";
import { PlatformMobile } from "./PlatformMobile";

type PlatformSceneProps = {
  progress: number;
};

export function PlatformScene({ progress }: PlatformSceneProps) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return isMobile ? (
    <PlatformMobile progress={progress} />
  ) : (
    <PlatformDesktop progress={progress} />
  );
}
