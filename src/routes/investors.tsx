import { createFileRoute, redirect } from "@tanstack/react-router";

// The investor page has been removed from the public website.
// Any hit to /investors is redirected to the homepage.
export const Route = createFileRoute("/investors")({
  beforeLoad: () => {
    throw redirect({ to: "/" as const });
  },
});
