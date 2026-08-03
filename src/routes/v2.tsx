import { createFileRoute } from "@tanstack/react-router";
import { ActOne } from "@/v2/act1";

export const Route = createFileRoute("/v2")({
  component: V2Page,
});

function V2Page() {
  return <ActOne />;
}
