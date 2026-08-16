import { useMediaQuery } from "@/v2/hooks";
import { PackagesDesktop } from "./PackagesDesktop";
import { PackagesMobile } from "./PackagesMobile";

type PackagesSceneProps = {
  progress: number;
};

export function PackagesScene({ progress }: PackagesSceneProps) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return isMobile ? (
    <PackagesMobile progress={progress} />
  ) : (
    <PackagesDesktop progress={progress} />
  );
}
