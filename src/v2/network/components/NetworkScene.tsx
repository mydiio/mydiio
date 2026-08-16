import { useMediaQuery } from "@/v2/hooks";
import { NetworkDesktop } from "./NetworkDesktop";
import { NetworkMobile } from "./NetworkMobile";

type NetworkSceneProps = {
  progress: number;
};

export function NetworkScene({ progress }: NetworkSceneProps) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return isMobile ? <NetworkMobile progress={progress} /> : <NetworkDesktop progress={progress} />;
}
