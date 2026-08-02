import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const EDGE = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1";

const KNOWN_KINDS = new Set([
  "advertise",
  "trip_share",
  "ride_end",
  "driver_card",
  "feedback",
]);

// Scan-and-forward endpoint for every mydiio QR code. The code records the
// scan, then hands the visitor on to wherever that kind of QR belongs.
// Destinations live in the log-scan edge function, so a QR already printed
// on a tuk or displayed on a tablet can be repointed without reissuing it.
//
// The redirect is never blocked by logging: if the edge call fails for any
// reason, the visitor still lands somewhere useful.
export const Route = createFileRoute("/r/$kind/$code")({
  server: {
    handlers: {
      GET: async ({
        request,
        params,
      }: {
        request: Request;
        params: { kind: string; code: string };
      }) => {
        const kind = KNOWN_KINDS.has(params.kind) ? params.kind : "other";
        const target =
          EDGE +
          "/log-scan?k=" +
          encodeURIComponent(kind) +
          "&v=" +
          encodeURIComponent(params.code);

        let location = "https://mydiio.com";
        try {
          // Forward the scanner's own headers so log-scan records who
          // scanned, not this worker. Without this every row looks identical
          // and repeat scans cannot be told apart.
          const res = await fetch(target, {
            redirect: "manual",
            headers: {
              "user-agent": request.headers.get("user-agent") ?? "",
              referer: request.headers.get("referer") ?? "",
            },
          });
          location = res.headers.get("location") ?? location;
        } catch {
          /* logging failed; fall through to the safe default */
        }

        return new Response(null, {
          status: 302,
          headers: { Location: location, "Cache-Control": "no-store" },
        });
      },
    },
  },
});
