import { createFileRoute, redirect } from "@tanstack/react-router";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";

export const Route = createFileRoute("/investors")({
  beforeLoad: () => {
    throw redirect({ to: isPublicWaitlistMode ? "/" : "/contact" });
  },
});
