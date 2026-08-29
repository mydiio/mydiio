import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/ride/$vehicleId")({
  component: RidePage,
  head: () => ({
    meta: [
      { title: "Your ride, mydiio" },
      { name: "robots", content: "noindex" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
    ],
  }),
});

const EDGE = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1";
const EAGLE_EYE_ANON_KEY = import.meta.env.VITE_EAGLE_EYE_SUPABASE_ANON_KEY;
const EDGE_AUTH_HEADERS = {
  "Content-Type": "application/json",
  apikey: EAGLE_EYE_ANON_KEY,
  Authorization: `Bearer ${EAGLE_EYE_ANON_KEY}`,
};

type Phase = "pick" | "arming" | "armed" | "error" | "ended";
type ShareLinks = { track_url: string; whatsapp_url: string; sms_url: string } | null;
type PlaceResult = { place_id: string; label: string };
type RoutePreview = {
  distance_metres: number;
  duration_seconds: number;
  steps: Array<{ instruction: string }>;
};

function RidePage() {
  const { vehicleId } = Route.useParams();
  const [phase, setPhase] = useState<Phase>("pick");
  const [errorMsg, setErrorMsg] = useState("");
  const [destination, setDestination] = useState<PlaceResult | null>(null);
  const [routePreview, setRoutePreview] = useState<RoutePreview | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [share, setShare] = useState<ShareLinks>(null);
  const [driver, setDriver] = useState<{
    id: string;
    first_name: string | null;
    photo_url: string | null;
  } | null>(null);
  const [plate, setPlate] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [ending, setEnding] = useState(false);
  const tokenRef = useRef<string | null>(null);

  async function runSearch() {
    const q = query.trim();
    if (q.length < 3 || searching) return;
    setSearching(true);
    try {
      const res = await fetch(`${EDGE}/passenger-place-search`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({ scan_handle: vehicleId, query: q }),
      });
      const data = await res.json().catch(() => ({}));
      setResults(res.ok && Array.isArray(data.results) ? data.results : []);
    } catch {
      setResults([]);
    }
    setSearching(false);
  }

  async function chooseDestination(place: PlaceResult) {
    setDestination(place);
    setRoutePreview(null);
    setResults([]);
    setQuery(place.label.split(",")[0]);
    setPreviewing(true);
    try {
      const res = await fetch(`${EDGE}/passenger-route-preview`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          scan_handle: vehicleId,
          destination_place_id: place.place_id,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.route) setRoutePreview(data.route);
    } catch {
      /* Ride arming still has a GPS-only fallback. */
    } finally {
      setPreviewing(false);
    }
  }

  async function confirmRide() {
    const selected = destination;
    if (!selected) return;
    setPhase("arming");
    try {
      const res = await fetch(`${EDGE}/arm-ride`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          scan_handle: vehicleId,
          destination_place_id: selected.place_id,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(
          res.status === 404
            ? "This tuk could not be found. Check the code on the screen."
            : res.status === 403
              ? "This tuk is not currently active."
              : "Something went wrong. Please try again.",
        );
        setPhase("error");
        return;
      }
      tokenRef.current = data.token ?? null;
      setDriver(data.driver ?? null);
      setPlate(data.vehicle_registration ?? null);
      if (data.route) setRoutePreview(data.route);
      setPhase("armed");
    } catch {
      setErrorMsg("No connection. Check your signal and try again.");
      setPhase("error");
    }
  }

  async function endRideNow() {
    if (ending) return;
    const token = tokenRef.current;
    if (!token) return;
    setEnding(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/end-ride`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          token,
          end_reason: "passenger",
        }),
      });
      if (!res.ok) throw new Error("Could not end ride");
      tokenRef.current = null;
      setPhase("ended");
    } catch {
      setErrorMsg("Your ride is still active. Please try ending it again.");
    } finally {
      setEnding(false);
    }
  }

  async function submitRating(stars: number) {
    const token = tokenRef.current;
    if (rated || !driver || !token) return;
    setRating(stars);
    setRated(true);
    try {
      await fetch(`${EDGE}/submit-driver-feedback`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          session_token: token,
          category: "rating",
          rating: stars,
        }),
      });
    } catch {
      /* best-effort; the tablet slide is the other path */
    }
  }

  async function handleShare() {
    if (sharing) return;
    const token = tokenRef.current;
    if (!token) {
      setErrorMsg("Your ride is not connected yet. Please try again.");
      return;
    }
    setSharing(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/create-trip-share`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          session_token: token,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setShare({
          track_url: data.track_url,
          whatsapp_url: data.whatsapp_url,
          sms_url: data.sms_url,
        });
      } else {
        setErrorMsg(
          res.status === 403
            ? "This ride is no longer active. Start tracking again to share it."
            : "We could not create the tracking link. Please try again.",
        );
      }
    } catch {
      setErrorMsg("No connection. Check your signal and try sharing again.");
    }
    setSharing(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.wordmark}>
        myd<span style={{ color: "#F5A623" }}>ii</span>o
      </div>

      {phase === "pick" && (
        <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
          <div style={styles.hero}>
            <p style={styles.eyebrow}>YOUR JOURNEY</p>
            <p style={styles.heroTitle}>Where would you like to go?</p>
            <p style={styles.heroCopy}>
              Search for a destination. We’ll preview the road route before connecting the tuk.
            </p>
          </div>
          <div style={{ padding: "18px 18px 10px", width: "100%" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runSearch();
                }}
                placeholder="Search a place (e.g. Galle Face Hotel)"
                style={styles.searchInput}
              />
              <button onClick={runSearch} style={styles.searchBtn} disabled={searching}>
                {searching ? "…" : "Search"}
              </button>
            </div>
            {results.length > 0 && (
              <div style={styles.results}>
                {results.map((r, i) => (
                  <button
                    key={i}
                    style={styles.resultRow}
                    onClick={() => chooseDestination(r)}
                  >
                    {r.label}
                  </button>
                ))}
                <div style={styles.googleMapsAttribution} translate="no">
                  Google Maps
                </div>
              </div>
            )}
          </div>
          {(destination || previewing) && (
            <div style={styles.routePreview}>
              <div style={styles.routeLine}>
                <span style={styles.routeDot} />
                <span style={styles.routeTrack} />
                <span style={{ ...styles.routeDot, background: "#F5A623" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={styles.routeLabel}>{destination?.label || "Calculating route…"}</p>
                {previewing ? (
                  <p style={styles.routeMeta}>Finding the best road route…</p>
                ) : routePreview ? (
                  <>
                    <p style={styles.routeMetric}>
                      {Math.max(1, Math.round(routePreview.duration_seconds / 60))} min
                      <span> · {(routePreview.distance_metres / 1000).toFixed(1)} km</span>
                    </p>
                    <p style={styles.routeMeta}>
                      {routePreview.steps?.[0]?.instruction || "Road route ready"}
                    </p>
                  </>
                ) : (
                  <p style={styles.routeMeta}>Destination confirmed · route may load after connection</p>
                )}
              </div>
            </div>
          )}
          <div style={{ padding: 14 }}>
            <button
              style={{
                ...styles.primaryBtn,
                opacity: destination ? 1 : 0.5,
                cursor: destination ? "pointer" : "not-allowed",
              }}
              onClick={confirmRide}
              disabled={!destination || previewing}
            >
              {destination ? "Connect this journey" : "Choose a destination"}
            </button>
          </div>
        </div>
      )}

      {phase === "arming" && (
        <div style={styles.card}>
          <div style={styles.spinner} />
          <p style={styles.statusText}>Connecting to your ride…</p>
        </div>
      )}

      {phase === "error" && (
        <div style={styles.card}>
          <p style={styles.errTitle}>Ride not connected</p>
          <p style={styles.statusText}>{errorMsg}</p>
        </div>
      )}

      {phase === "armed" && (
        <>
          <div style={{ ...styles.card, borderColor: "#3D6B4F" }}>
            <div style={styles.tick}>✓</div>
            <p style={styles.armedTitle}>Your ride is being followed</p>
            <p style={styles.statusText}>
              The screen in your tuk is now showing your live location and route to your
              destination.
            </p>
          </div>
          {routePreview && destination && (
            <div style={styles.routePreview}>
              <div style={styles.routeLine}>
                <span style={styles.routeDot} />
                <span style={styles.routeTrack} />
                <span style={{ ...styles.routeDot, background: "#F5A623" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={styles.routeLabel}>{destination.label}</p>
                <p style={styles.routeMetric}>
                  {Math.max(1, Math.round(routePreview.duration_seconds / 60))} min
                  <span> · {(routePreview.distance_metres / 1000).toFixed(1)} km</span>
                </p>
                <p style={styles.routeMeta}>The tablet is following this same road route.</p>
              </div>
            </div>
          )}
          {driver && (
            <div style={styles.card}>
              <div style={styles.driverRow}>
                {driver.photo_url ? (
                  <img src={driver.photo_url} alt="" style={styles.driverPhoto} />
                ) : (
                  <div style={styles.driverAvatar}>{(driver.first_name || "?").charAt(0)}</div>
                )}
                <div style={{ textAlign: "left" }}>
                  <p style={styles.driverName}>{driver.first_name || "Your driver"}</p>
                  <p style={styles.driverPlate}>
                    {plate || vehicleId ? plate || "mydiio verified" : ""}
                  </p>
                </div>
              </div>
              <div style={styles.rateWrap}>
                {rated ? (
                  <p style={styles.statusText}>Thanks for rating your driver.</p>
                ) : (
                  <>
                    <p style={styles.sectionLabel}>Rate your driver</p>
                    <div style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => submitRating(n)}
                          style={{ ...styles.star, color: n <= rating ? "#F5A623" : "#D8D2C2" }}
                          aria-label={`${n} stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div style={styles.card}>
            <p style={styles.sectionLabel}>Share your ride</p>
            <p style={styles.statusText}>Send a live tracking link to someone you trust.</p>
            {!share ? (
              <button style={styles.primaryBtn} onClick={handleShare} disabled={sharing}>
                {sharing ? "Creating link…" : "Create a tracking link"}
              </button>
            ) : (
              <div style={styles.shareRow}>
                <a
                  style={styles.shareBtn}
                  href={share.whatsapp_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on WhatsApp
                </a>
                <a style={styles.shareBtnAlt} href={share.sms_url}>
                  Share by SMS
                </a>
              </div>
            )}
          </div>
          <a href="tel:119" style={styles.emergencyBtn}>
            Emergency — call 119
          </a>
          <button style={styles.endBtn} onClick={endRideNow} disabled={ending}>
            {ending ? "Ending ride…" : "End ride"}
          </button>
          {errorMsg && <p style={styles.endError}>{errorMsg}</p>}
        </>
      )}

      {phase === "ended" && (
        <div style={styles.card}>
          <p style={styles.armedTitle}>Ride ended</p>
          <p style={styles.statusText}>Your ride is no longer being followed. Safe travels.</p>
        </div>
      )}

      <a href="https://mydiio.com/advertise" target="_blank" rel="noreferrer" style={styles.adCta}>
        Want your business seen across Colombo? Advertise with mydiio →
      </a>
      <p style={styles.footer}>Every Journey, Connected.</p>
      <style>{`@keyframes ridespin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "#090A09",
    padding: "32px 20px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  wordmark: {
    fontSize: 26,
    fontWeight: 700,
    color: "#F0EDE4",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#111310",
    border: "1px solid #34342F",
    borderRadius: 22,
    padding: 22,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  hero: {
    width: "100%",
    padding: "26px 22px 24px",
    textAlign: "left",
    background: "radial-gradient(circle at 100% 0%, rgba(245,166,35,0.18), transparent 54%), #151713",
    borderBottom: "1px solid #34342F",
  },
  eyebrow: { margin: 0, color: "#F5A623", fontSize: 11, fontWeight: 700, letterSpacing: 1.8 },
  heroTitle: { margin: "12px 0 0", color: "#F0EDE4", fontSize: 29, lineHeight: 1.08, fontWeight: 600, letterSpacing: -0.9 },
  heroCopy: { margin: "12px 0 0", color: "#A8A398", fontSize: 14, lineHeight: 1.55 },
  searchInput: {
    flex: 1,
    border: "1px solid #4A4942",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    background: "#0B0C0B",
    color: "#F0EDE4",
  },
  searchBtn: {
    background: "#F0EDE4",
    color: "#111310",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  results: { marginTop: 8, border: "1px solid #3A3A35", borderRadius: 12, overflow: "hidden" },
  resultRow: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "#171915",
    border: "none",
    borderBottom: "1px solid #30312D",
    padding: "10px 12px",
    fontSize: 13,
    color: "#E9E4DA",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  googleMapsAttribution: {
    padding: "8px 12px",
    background: "#171915",
    color: "#FFFFFF",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    letterSpacing: "normal",
    whiteSpace: "nowrap",
    textAlign: "right",
  },
  routePreview: { width: "calc(100% - 36px)", margin: "6px 18px 0", padding: 18, borderRadius: 16, border: "1px solid #3A3A35", background: "#0B0C0B", display: "flex", gap: 16, textAlign: "left" },
  routeLine: { width: 16, display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0" },
  routeDot: { width: 10, height: 10, borderRadius: "50%", background: "#F0EDE4", display: "block" },
  routeTrack: { width: 2, flex: 1, minHeight: 34, background: "#F5A623", display: "block", margin: "3px 0" },
  routeLabel: { margin: 0, color: "#F0EDE4", fontSize: 14, fontWeight: 600, lineHeight: 1.35 },
  routeMetric: { margin: "10px 0 0", color: "#F5A623", fontSize: 23, fontWeight: 600 },
  routeMeta: { margin: "6px 0 0", color: "#979289", fontSize: 12, lineHeight: 1.4 },
  spinner: {
    width: 34,
    height: 34,
    border: "3px solid #EDE6D6",
    borderTopColor: "#F5A623",
    borderRadius: "50%",
    animation: "ridespin 0.8s linear infinite",
  },
  tick: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#3D6B4F",
    color: "#FDFAF3",
    fontSize: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  armedTitle: { fontSize: 18, fontWeight: 700, color: "#F0EDE4", margin: 0 },
  errTitle: { fontSize: 18, fontWeight: 700, color: "#E8920A", margin: 0 },
  sectionLabel: { fontSize: 15, fontWeight: 700, color: "#F0EDE4", margin: 0, textAlign: "left" },
  statusText: {
    fontSize: 14,
    color: "#A8A398",
    lineHeight: 1.55,
    margin: "6px 0 0",
    textAlign: "left",
  },
  primaryBtn: {
    width: "100%",
    background: "#F5A623",
    color: "#1A1A18",
    border: "none",
    borderRadius: 12,
    padding: "13px 16px",
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "inherit",
  },
  shareRow: { display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 6 },
  shareBtn: {
    background: "#25D366",
    color: "#0B3D24",
    borderRadius: 12,
    padding: "13px 16px",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    textAlign: "center",
  },
  shareBtnAlt: {
    background: "#171915",
    color: "#F0EDE4",
    border: "1px solid #4A4942",
    borderRadius: 12,
    padding: "13px 16px",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    textAlign: "center",
  },
  emergencyBtn: {
    width: "100%",
    maxWidth: 420,
    background: "#E84545",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: "15px 16px",
    fontSize: 16,
    fontWeight: 700,
    textDecoration: "none",
    textAlign: "center",
  },
  endBtn: {
    width: "100%",
    maxWidth: 420,
    background: "transparent",
    color: "#A8A398",
    border: "1px solid #4A4942",
    borderRadius: 12,
    padding: "13px 16px",
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  endError: {
    width: "100%",
    maxWidth: 420,
    color: "#B33A3A",
    fontSize: 14,
    lineHeight: 1.5,
    margin: 0,
    textAlign: "center",
  },
  driverRow: { display: "flex", alignItems: "center", gap: 14, width: "100%" },
  driverPhoto: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #EDE6D6",
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#3D6B4F",
    color: "#FDFAF3",
    fontSize: 24,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  driverName: { fontSize: 17, fontWeight: 700, color: "#F0EDE4", margin: 0 },
  driverPlate: { fontSize: 14, color: "#A8A398", margin: "2px 0 0" },
  rateWrap: { width: "100%", marginTop: 14, paddingTop: 14, borderTop: "1px solid #EDE6D6" },
  stars: { display: "flex", justifyContent: "center", gap: 6, marginTop: 8 },
  star: {
    background: "none",
    border: "none",
    fontSize: 34,
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
  },
  adCta: {
    width: "100%",
    maxWidth: 420,
    marginTop: 8,
    textAlign: "center",
    fontSize: 13,
    fontWeight: 700,
    color: "#E8920A",
    textDecoration: "none",
    padding: "10px 12px",
    border: "1px dashed #E8920A",
    borderRadius: 12,
  },
  footer: {
    marginTop: "auto",
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    color: "#B4B2A9",
  },
};
