import { createFileRoute } from "@tanstack/react-router";
import { AtlasShell, OpeningSequence } from "@/v2";

export const Route = createFileRoute("/v2")({
  component: AtlasPreviewPage,
  head: () => ({
    meta: [
      {
        title: "Project Atlas | mydiio",
      },
      {
        name: "description",
        content:
          "Internal preview of the new mydiio connected passenger network experience.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
});

function AtlasPreviewPage() {
  return (
    <AtlasShell>
      <OpeningSequence />
    </AtlasShell>
  );
}
