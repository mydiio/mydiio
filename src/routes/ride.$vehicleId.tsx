import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
type RoutePoint = { lat: number; lng: number };
type PlaceResult = { place_id: string; label: string };
type RouteStep = { instruction: string; maneuver?: string | null; end?: RoutePoint | null };
type RoutePreview = {
  origin: RoutePoint;
  destination: PlaceResult & RoutePoint;
  distance_metres: number;
  duration_seconds: number;
  geometry: RoutePoint[];
  steps: RouteStep[];
};
type MapConfig = { provider: "google"; browser_key: string; map_id?: string | null };

declare global {
  interface Window {
    google?: any;
    __mydiioMobileGoogleReady?: () => void;
  }
}

let googleMapsPromise: Promise<any> | null = null;
const lightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#e8e3d8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#554f46" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f4f0e7" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#f8f5ed" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#d7d0c3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f0d6a6" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b8ced0" }] },
];

function loadGoogleMaps(config: MapConfig) {
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (googleMapsPromise) return googleMapsPromise;
  googleMapsPromise = new Promise((resolve, reject) => {
    window.__mydiioMobileGoogleReady = () => {
      delete window.__mydiioMobileGoogleReady;
      resolve(window.google?.maps);
    };
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(config.browser_key)}&callback=__mydiioMobileGoogleReady&v=weekly`;
    script.onerror = () => {
      delete window.__mydiioMobileGoogleReady;
      googleMapsPromise = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(script);
  });
  return googleMapsPromise;
}

function RouteMap({ route, config }: { route: RoutePreview; config: MapConfig | null }) {
  const mapElement = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!config?.browser_key || !route.geometry?.length || !mapElement.current) return;
    loadGoogleMaps(config)
      .then((maps) => {
        if (cancelled || !maps || !mapElement.current) return;
        const map = new maps.Map(mapElement.current, {
          center: route.origin,
          zoom: 14,
          mapId: config.map_id || undefined,
          styles: config.map_id ? undefined : lightMapStyle,
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: "cooperative",
          backgroundColor: "#e8e3d8",
        });
        new maps.Polyline({
          path: route.geometry,
          strokeColor: "#332f29",
          strokeOpacity: 0.18,
          strokeWeight: 12,
          map,
        });
        new maps.Polyline({
          path: route.geometry,
          strokeColor: "#F5A623",
          strokeOpacity: 1,
          strokeWeight: 6,
          map,
        });
        new maps.Marker({
          position: route.origin,
          map,
          title: "Your tuk",
          icon: {
            path: maps.SymbolPath.CIRCLE,
            fillColor: "#171814",
            fillOpacity: 1,
            strokeColor: "#F7F2E8",
            strokeWeight: 4,
            scale: 9,
          },
        });
        new maps.Marker({
          position: route.destination,
          map,
          title: "Destination",
          icon: {
            path: maps.SymbolPath.CIRCLE,
            fillColor: "#F5A623",
            fillOpacity: 1,
            strokeColor: "#171814",
            strokeWeight: 3,
            scale: 8,
          },
        });
        const bounds = new maps.LatLngBounds();
        route.geometry.forEach((point) => bounds.extend(point));
        map.fitBounds(bounds, { top: 96, right: 38, bottom: 100, left: 38 });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [config, route]);

  return (
    <section className="route-map-shell" aria-label="Road route preview">
      <div ref={mapElement} className="route-map" />
      {!config?.browser_key && (
        <div className="route-map-fallback">
          <strong>Road route ready</strong>
          <span>Live map temporarily unavailable</span>
        </div>
      )}
      <div className="route-map-shade" />
      <div className="route-brand">
        myd<i>ii</i>o
      </div>
      <div className="route-metric">
        <strong>{Math.max(1, Math.round(route.duration_seconds / 60))} min</strong>
        <span>{(route.distance_metres / 1000).toFixed(1)} km</span>
      </div>
      <div className="route-destination">
        <span>DESTINATION</span>
        <strong>{route.destination?.label || "Selected destination"}</strong>
      </div>
    </section>
  );
}

function RidePage() {
  const { vehicleId } = Route.useParams();
  const [phase, setPhase] = useState<Phase>("pick");
  const [errorMsg, setErrorMsg] = useState("");
  const [destination, setDestination] = useState<PlaceResult | null>(null);
  const [routePreview, setRoutePreview] = useState<RoutePreview | null>(null);
  const [mapConfig, setMapConfig] = useState<MapConfig | null>(null);
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
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/passenger-place-search`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({ scan_handle: vehicleId, query: q }),
      });
      const data = await res.json().catch(() => ({}));
      setResults(res.ok && Array.isArray(data.results) ? data.results : []);
      if (!res.ok) setErrorMsg("Destination search is temporarily unavailable.");
    } catch {
      setResults([]);
      setErrorMsg("No connection. Check your signal and try again.");
    } finally {
      setSearching(false);
    }
  }

  async function chooseDestination(place: PlaceResult) {
    setDestination(place);
    setRoutePreview(null);
    setMapConfig(null);
    setResults([]);
    setQuery(place.label.split(",")[0]);
    setPreviewing(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/passenger-route-preview`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({ scan_handle: vehicleId, destination_place_id: place.place_id }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.route) {
        setRoutePreview(data.route);
        setMapConfig(data.map_config ?? null);
        if (data.destination?.place_id && data.destination?.label)
          setDestination({ place_id: data.destination.place_id, label: data.destination.label });
      } else setErrorMsg("We could not preview this road route. Choose another destination.");
    } catch {
      setErrorMsg("No connection. Check your signal and try again.");
    } finally {
      setPreviewing(false);
    }
  }

  async function confirmRide() {
    if (!destination || !routePreview) return;
    setPhase("arming");
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/arm-ride`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          scan_handle: vehicleId,
          destination_place_id: destination.place_id,
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
      // Keep the preview map and its route object mounted through arming so
      // confirming a journey does not create a second billable map load.
      if (!routePreview && data.route) setRoutePreview(data.route);
      if (!mapConfig && data.map_config) setMapConfig(data.map_config);
      setPhase("armed");
    } catch {
      setErrorMsg("No connection. Check your signal and try again.");
      setPhase("error");
    }
  }

  async function handleShare() {
    if (sharing || !tokenRef.current) return;
    setSharing(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/create-trip-share`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({ session_token: tokenRef.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok)
        setShare({
          track_url: data.track_url,
          whatsapp_url: data.whatsapp_url,
          sms_url: data.sms_url,
        });
      else setErrorMsg("We could not create the tracking link. Please try again.");
    } catch {
      setErrorMsg("No connection. Check your signal and try sharing again.");
    } finally {
      setSharing(false);
    }
  }

  async function submitRating(stars: number) {
    if (rated || !driver || !tokenRef.current) return;
    setRating(stars);
    setRated(true);
    try {
      await fetch(`${EDGE}/submit-driver-feedback`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({
          session_token: tokenRef.current,
          category: "rating",
          rating: stars,
        }),
      });
    } catch {}
  }

  async function endRideNow() {
    if (ending || !tokenRef.current) return;
    setEnding(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${EDGE}/end-ride`, {
        method: "POST",
        headers: EDGE_AUTH_HEADERS,
        body: JSON.stringify({ token: tokenRef.current, end_reason: "passenger" }),
      });
      if (!res.ok) throw new Error("Could not end ride");
      setPhase("ended");
    } catch {
      setErrorMsg("Your ride is still active. Please try ending it again.");
    } finally {
      setEnding(false);
    }
  }

  const firstInstruction =
    routePreview?.steps?.[0]?.instruction || "Continue on the highlighted route";
  const resetDestination = () => {
    setRoutePreview(null);
    setMapConfig(null);
    setDestination(null);
    setQuery("");
    setErrorMsg("");
  };

  return (
    <main className={`ride-page ride-page--${phase}`}>
      {routePreview && phase !== "error" && phase !== "ended" && (
        <RouteMap route={routePreview} config={mapConfig} />
      )}

      {phase === "pick" && !routePreview && (
        <section className="search-shell">
          <div className="wordmark">
            myd<i>ii</i>o
          </div>
          <div className="search-intro">
            <span>YOUR JOURNEY</span>
            <h1>Where would you like to go?</h1>
            <p>Choose a destination and preview the real road route before connecting your tuk.</p>
          </div>
          <div className="search-box">
            <div className="search-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && runSearch()}
                placeholder="Search Colombo"
                aria-label="Search for a destination"
              />
              <button onClick={runSearch} disabled={searching || query.trim().length < 3}>
                {searching ? "…" : "Search"}
              </button>
            </div>
            {results.length > 0 && (
              <div className="results">
                {results.map((result) => (
                  <button key={result.place_id} onClick={() => chooseDestination(result)}>
                    <b />
                    <span>{result.label}</span>
                  </button>
                ))}
                <div className="google-attribution" translate="no">
                  Google Maps
                </div>
              </div>
            )}
            {errorMsg && <p className="inline-error">{errorMsg}</p>}
          </div>
        </section>
      )}

      {phase === "pick" && routePreview && (
        <section className="ride-sheet preview-sheet">
          <div className="sheet-handle" />
          <span className="kicker">ROUTE PREVIEW</span>
          <h1>{destination?.label || routePreview.destination.label}</h1>
          <div className="next-turn">
            <span>↗</span>
            <div>
              <small>FIRST DIRECTION</small>
              <strong>{firstInstruction}</strong>
            </div>
          </div>
          {errorMsg && <p className="inline-error">{errorMsg}</p>}
          <button className="primary" onClick={confirmRide} disabled={previewing}>
            Connect this journey
          </button>
          <button className="text-button" onClick={resetDestination}>
            Choose another destination
          </button>
        </section>
      )}

      {phase === "arming" && (
        <div className="arming" role="status">
          <div className="spinner" />
          <strong>Connecting to your tuk</strong>
          <span>Your road route is ready.</span>
        </div>
      )}

      {phase === "error" && (
        <StateCard icon="!" title="Ride not connected" copy={errorMsg}>
          <button className="primary" onClick={() => setPhase("pick")}>
            Try again
          </button>
        </StateCard>
      )}

      {phase === "armed" && routePreview && (
        <section className="ride-sheet active-sheet">
          <div className="sheet-handle" />
          <div className="live-row">
            <div>
              <b />
              LIVE JOURNEY
            </div>
            <span>{plate || "mydiio verified"}</span>
          </div>
          <div className="next-turn">
            <span>↗</span>
            <div>
              <small>NEXT</small>
              <strong>{firstInstruction}</strong>
            </div>
          </div>
          {driver && (
            <div className="driver-strip">
              {driver.photo_url ? (
                <img src={driver.photo_url} alt="" />
              ) : (
                <b>{(driver.first_name || "?").charAt(0)}</b>
              )}
              <div>
                <strong>{driver.first_name || "Your driver"}</strong>
                <small>Verified mydiio driver</small>
              </div>
            </div>
          )}
          <div className="action-grid">
            <button onClick={handleShare} disabled={sharing}>
              <span>↗</span>
              {sharing ? "Creating…" : "Share ride"}
            </button>
            <a href="tel:119">
              <span>+</span>Emergency 119
            </a>
          </div>
          {share && (
            <div className="share-links">
              <a href={share.whatsapp_url} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={share.sms_url}>SMS</a>
            </div>
          )}
          {errorMsg && <p className="inline-error">{errorMsg}</p>}
          <details className="secondary-actions">
            <summary>More journey options</summary>
            {driver && !rated && <Rating onRate={submitRating} />}
            {rated && <p className="thanks">Thank you for rating your driver.</p>}
            <button className="end-button" onClick={endRideNow} disabled={ending}>
              {ending ? "Ending ride…" : "End ride tracking"}
            </button>
          </details>
        </section>
      )}

      {phase === "ended" && (
        <StateCard
          icon="✓"
          title="Ride ended"
          copy="Your live tracking has stopped. Thank you for travelling with mydiio."
        >
          {driver && !rated && <Rating onRate={submitRating} selected={rating} />}
          {rated && <p className="thanks">Thank you for your feedback.</p>}
        </StateCard>
      )}
      <style>{rideCss}</style>
    </main>
  );
}

function Rating({ onRate, selected = 0 }: { onRate: (stars: number) => void; selected?: number }) {
  return (
    <div className="rating">
      <span>Rate your driver after arrival</span>
      <div>
        {[1, 2, 3, 4, 5].map((stars) => (
          <button
            key={stars}
            className={stars <= selected ? "selected" : ""}
            onClick={() => onRate(stars)}
            aria-label={`${stars} stars`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

function StateCard({
  icon,
  title,
  copy,
  children,
}: {
  icon: string;
  title: string;
  copy: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="state-card">
      <div className="wordmark">
        myd<i>ii</i>o
      </div>
      <span className={`state-icon ${icon === "!" ? "error-icon" : ""}`}>{icon}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
      {children}
    </section>
  );
}

const rideCss = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #090a09; }
  button, input, a { font: inherit; }
  .ride-page { min-height: 100dvh; background: #090a09; color: #f3eee4; font-family: 'DM Sans', system-ui, sans-serif; }
  .wordmark, .route-brand { font-size: 28px; font-weight: 800; letter-spacing: -1px; color: #f7f2e8; }
  .wordmark i, .route-brand i { color: #f5a623; font-style: normal; }
  .search-shell { min-height: 100dvh; padding: max(42px, env(safe-area-inset-top)) 22px 34px; background: radial-gradient(circle at 78% 18%, rgba(245,166,35,.17), transparent 32%), linear-gradient(160deg, #151712, #090a09 56%); }
  .search-shell > .wordmark { margin-bottom: min(18vh, 128px); }
  .search-intro span, .kicker { color: #f5a623; font-size: 11px; font-weight: 800; letter-spacing: 2px; }
  .search-intro h1 { max-width: 350px; margin: 13px 0 14px; font-size: clamp(38px, 11vw, 52px); line-height: .98; letter-spacing: -2.3px; font-weight: 600; }
  .search-intro p { max-width: 360px; margin: 0; color: #aaa49a; font-size: 16px; line-height: 1.52; }
  .search-box { margin-top: 34px; }
  .search-row { display: flex; gap: 8px; padding: 7px; border: 1px solid #44443e; border-radius: 18px; background: rgba(21,23,18,.94); box-shadow: 0 20px 60px rgba(0,0,0,.28); }
  .search-row input { min-width: 0; flex: 1; padding: 11px 12px; border: 0; outline: 0; color: #f3eee4; background: transparent; font-size: 16px; }
  .search-row button { border: 0; border-radius: 12px; padding: 10px 15px; background: #f3eee4; color: #171814; font-weight: 800; }
  .search-row button:disabled { opacity: .45; }
  .results { margin-top: 10px; overflow: hidden; border: 1px solid #3c3d37; border-radius: 17px; background: #151712; }
  .results > button { display: flex; width: 100%; gap: 12px; padding: 15px; border: 0; border-bottom: 1px solid #30312c; color: #eee9df; background: transparent; text-align: left; line-height: 1.35; }
  .results > button b { flex: 0 0 auto; width: 10px; height: 10px; margin-top: 4px; border: 2px solid #f5a623; border-radius: 50%; }
  .google-attribution { padding: 9px 14px; color: #fff; font: 400 12px Roboto, sans-serif; text-align: right; }
  .inline-error { margin: 11px 0 0; color: #ef9f83; font-size: 13px; line-height: 1.4; }
  .route-map-shell { position: relative; height: min(58dvh, 560px); min-height: 390px; overflow: hidden; background: #e8e3d8; }
  .route-map { position: absolute; inset: 0; }
  .route-map-fallback { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; background: radial-gradient(circle at 60% 30%, #f1cf93, transparent 38%), #ded8cc; color: #312e29; }
  .route-map-fallback strong { font-size: 22px; }
  .route-map-fallback span { color: #6b655c; }
  .route-map-shade { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(9,10,9,.72), transparent 24%, transparent 65%, rgba(9,10,9,.86)); }
  .route-brand { position: absolute; top: max(22px, env(safe-area-inset-top)); left: 20px; text-shadow: 0 2px 16px rgba(0,0,0,.5); }
  .route-metric { position: absolute; top: max(68px, calc(env(safe-area-inset-top) + 46px)); left: 20px; display: flex; align-items: baseline; gap: 9px; padding: 10px 13px; border: 1px solid rgba(255,255,255,.22); border-radius: 15px; background: rgba(13,14,12,.83); backdrop-filter: blur(12px); }
  .route-metric strong { color: #f5a623; font-size: 24px; letter-spacing: -1px; }
  .route-metric span { color: #ddd6ca; font-size: 14px; }
  .route-destination { position: absolute; left: 20px; right: 20px; bottom: 26px; display: flex; flex-direction: column; gap: 4px; }
  .route-destination span { color: #f5a623; font-size: 10px; font-weight: 800; letter-spacing: 1.8px; }
  .route-destination strong { max-width: 92%; color: #f7f2e8; font-size: 19px; line-height: 1.25; text-shadow: 0 2px 16px rgba(0,0,0,.68); }
  .ride-sheet { position: relative; z-index: 3; width: 100%; margin-top: -18px; padding: 13px 20px max(28px, env(safe-area-inset-bottom)); border-radius: 28px 28px 0 0; background: #0e100d; box-shadow: 0 -14px 40px rgba(0,0,0,.28); }
  .sheet-handle { width: 40px; height: 4px; margin: 0 auto 22px; border-radius: 99px; background: #4a4a44; }
  .ride-sheet h1 { margin: 9px 0 20px; font-size: 26px; line-height: 1.12; letter-spacing: -1px; font-weight: 600; }
  .next-turn { display: flex; align-items: center; gap: 14px; padding: 15px; border-top: 1px solid #30312d; border-bottom: 1px solid #30312d; }
  .next-turn > span { display: grid; place-items: center; flex: 0 0 auto; width: 44px; height: 44px; border-radius: 50%; background: #f5a623; color: #171814; font-size: 25px; font-weight: 800; }
  .next-turn div { display: flex; min-width: 0; flex-direction: column; gap: 3px; }
  .next-turn small { color: #8f8a81; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; }
  .next-turn strong { overflow: hidden; color: #f1ece2; font-size: 15px; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
  .primary { width: 100%; margin-top: 20px; padding: 15px 18px; border: 0; border-radius: 15px; background: #f5a623; color: #171814; font-weight: 800; }
  .primary:disabled { opacity: .55; }
  .text-button { display: block; margin: 13px auto 0; padding: 8px; border: 0; background: transparent; color: #aaa49a; }
  .arming { position: fixed; inset: 0; z-index: 8; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px; background: rgba(9,10,9,.78); backdrop-filter: blur(15px); }
  .arming strong { font-size: 20px; }
  .arming span { color: #aaa49a; font-size: 14px; }
  .spinner { width: 38px; height: 38px; margin-bottom: 8px; border: 3px solid #57554f; border-top-color: #f5a623; border-radius: 50%; animation: ridespin .8s linear infinite; }
  .live-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 13px; color: #9b968c; font-size: 11px; font-weight: 800; letter-spacing: 1.2px; }
  .live-row div { display: flex; align-items: center; gap: 7px; color: #f3eee4; }
  .live-row b { width: 8px; height: 8px; border-radius: 50%; background: #4f9369; box-shadow: 0 0 0 5px rgba(79,147,105,.14); }
  .driver-strip { display: flex; align-items: center; gap: 12px; padding: 16px 0; border-bottom: 1px solid #30312d; }
  .driver-strip img, .driver-strip > b { width: 48px; height: 48px; border: 2px solid #e9e3d9; border-radius: 50%; object-fit: cover; }
  .driver-strip > b { display: grid; place-items: center; background: #3d6b4f; color: white; }
  .driver-strip div { display: flex; flex-direction: column; gap: 3px; }
  .driver-strip small { color: #98938a; font-size: 12px; }
  .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
  .action-grid button, .action-grid a { display: flex; min-height: 54px; justify-content: center; align-items: center; gap: 8px; border-radius: 15px; font-size: 14px; font-weight: 800; text-decoration: none; }
  .action-grid button { border: 0; background: #f3eee4; color: #171814; }
  .action-grid a { border: 1px solid rgba(245,166,35,.45); color: #f5a623; background: #151712; }
  .action-grid span { font-size: 20px; }
  .share-links { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 9px; }
  .share-links a { padding: 11px; border: 1px solid #3d3e38; border-radius: 12px; color: #eee9df; text-align: center; text-decoration: none; font-size: 13px; }
  .secondary-actions { margin-top: 14px; border-top: 1px solid #30312d; color: #98938a; }
  .secondary-actions summary { padding: 16px 2px 4px; cursor: pointer; font-size: 13px; }
  .rating { padding: 16px 0 8px; text-align: center; }
  .rating > span { color: #d8d2c7; font-size: 14px; }
  .rating > div { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
  .rating button { padding: 0; border: 0; background: none; color: #d8d2c7; font-size: 31px; }
  .rating button.selected { color: #f5a623; }
  .end-button { width: 100%; margin-top: 12px; padding: 13px; border: 1px solid #41413b; border-radius: 13px; background: transparent; color: #aaa49a; }
  .thanks { color: #7eb18e; text-align: center; }
  .state-card { min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 36px 24px; text-align: center; background: radial-gradient(circle at 50% 30%, rgba(245,166,35,.14), transparent 32%), #090a09; }
  .state-card .wordmark { position: absolute; top: max(38px, env(safe-area-inset-top)); }
  .state-icon { display: grid; place-items: center; width: 62px; height: 62px; margin-bottom: 22px; border-radius: 50%; background: #3d6b4f; color: #fff; font-size: 30px; }
  .error-icon { background: #86433b; }
  .state-card h1 { margin: 10px 0; font-size: 34px; letter-spacing: -1.5px; }
  .state-card > p { max-width: 330px; margin: 0; color: #aaa49a; line-height: 1.55; }
  .state-card .primary { max-width: 340px; }
  .state-card .rating { margin-top: 24px; }
  @keyframes ridespin { to { transform: rotate(360deg); } }
  @media (min-width: 700px) {
    .ride-page--armed, .ride-page--pick:has(.route-map-shell) { display: grid; min-height: 100dvh; grid-template-columns: minmax(0, 1.28fr) minmax(360px, .72fr); }
    .route-map-shell { height: 100dvh; max-height: none; }
    .ride-sheet { align-self: stretch; margin: 0; padding: 28px; border-radius: 0; overflow: auto; }
    .sheet-handle { display: none; }
  }
`;
