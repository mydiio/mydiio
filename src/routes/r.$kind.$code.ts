import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const SITE_BASE = "https://www.mydiio.com";
const ADMIN_BASE = "https://admin.mydiio.com";
const EAGLE_EYE_FUNCTIONS =
  "https://rmqexobhpasitrexvaig.supabase.co/functions/v1";

const FALLBACK = `${SITE_BASE}/`;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function redirect(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

async function resolveTripShare(
  vehicleCode: string,
): Promise<string | null> {
  const endpoint =
    `${EAGLE_EYE_FUNCTIONS}/resolve-trip-share?code=` +
    encodeURIComponent(vehicleCode);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) return null;

  const payload = await response
    .json()
    .catch(() => null) as {
      vehicle_uuid?: unknown;
    } | null;

  const vehicleUuid =
    typeof payload?.vehicle_uuid === "string"
      ? payload.vehicle_uuid
      : "";

  return UUID.test(vehicleUuid)
    ? vehicleUuid
    : null;
}

export const Route = createFileRoute(
  "/r/$kind/$code",
)({
  server: {
    handlers: {
      GET: async ({
        request,
      }: {
        request: Request;
      }) => {
        const parts = new URL(request.url)
          .pathname
          .split("/")
          .filter(Boolean);

        const rawKind = parts[1] ?? "";
        const rawCode = decodeURIComponent(
          parts[2] ?? "",
        ).trim();

        const kind = rawKind
          .toLowerCase()
          .replace(/-/g, "_");

        if (!rawCode) {
          return redirect(FALLBACK);
        }

        switch (kind) {
          case "trip_share": {
            try {
              const vehicleUuid =
                await resolveTripShare(rawCode);

              if (!vehicleUuid) {
                return redirect(FALLBACK);
              }

              return redirect(
                `${SITE_BASE}/ride/${vehicleUuid}`,
              );
            } catch {
              return redirect(FALLBACK);
            }
          }

          case "advertise":
            return redirect(
              `${SITE_BASE}/advertise`,
            );

          case "offer":
            return redirect(
              `${ADMIN_BASE}/offer/` +
                encodeURIComponent(rawCode),
            );

          case "rate_screen":
            return redirect(
              `${ADMIN_BASE}/rate-screen/` +
                encodeURIComponent(rawCode),
            );

          default:
            return redirect(FALLBACK);
        }
      },
    },
  },
});
