import { createFileRoute } from "@tanstack/react-router";
import {
  AtlasShell,
  Container,
  Section,
  Stack,
} from "@/v2";
import {
  colors,
  fontFamily,
  letterSpacing,
  lineHeight,
  spacing,
  typeScale,
} from "@/design";

export const Route = createFileRoute("/v2")({
  component: AtlasPreviewPage,
  head: () => ({
    meta: [
      {
        title: "Project Atlas | mydiio V2",
      },
      {
        name: "description",
        content: "Internal preview of the new mydiio brand experience.",
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
      <Section fullHeight>
        <Container width="composition">
          <Stack gap={7}>
            <div
              style={{
                fontFamily: fontFamily.mono,
                fontSize: typeScale.caption,
                letterSpacing: letterSpacing.eyebrow,
                textTransform: "uppercase",
              }}
            >
              Project Atlas
            </div>

            <h1
              style={{
                margin: 0,
                maxWidth: "10ch",
                fontFamily: fontFamily.display,
                fontSize: typeScale.displayXL,
                fontWeight: 400,
                lineHeight: lineHeight.displayXL,
                letterSpacing: letterSpacing.display,
              }}
            >
              mydiio, rebuilt from first principles.
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "34ch",
                fontSize: typeScale.bodyLead,
                lineHeight: lineHeight.bodyLead,
              }}
            >
              The live website remains untouched while Atlas is built scene by
              scene.
            </p>

            <div
              style={{
                width: spacing[8],
                height: "2px",
                background: colors.amber,
              }}
            />
          </Stack>
        </Container>
      </Section>
    </AtlasShell>
  );
}
