import { createFileRoute } from "@tanstack/react-router";
import { AtlasNav } from "@/v2/layout";
import { ActOne } from "@/v2/act1";
import { ActTwo, FundingStatement } from "@/v2/act2";
import { JourneyStoryboard } from "@/v2/journeyStoryboard";
import { ActThree } from "@/v2/network";
import { ActFour } from "@/v2/platform";
import { ActFive } from "@/v2/coverage";
import { ActSix } from "@/v2/packages";
import { ActSeven } from "@/v2/pioneer";
import { ActEight } from "@/v2/closing";
import "@/v2/foundation/homepage.css";

export const Route = createFileRoute("/v2")({
  component: V2Page,
  head: () => ({
    meta: [
      {
        title: "Project Atlas | mydiio",
      },
      {
        name: "description",
        content: "Internal preview of the new mydiio connected passenger network experience.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
});

function V2Page() {
  return (
    <main data-v2-page>
      <AtlasNav />

      <ActOne />
      <ActTwo />

      <JourneyStoryboard />
      <FundingStatement />

      <ActThree />
      <ActFour />
      <ActFive />

      <ActSix />
      <ActSeven />
      <ActEight />
    </main>
  );
}
