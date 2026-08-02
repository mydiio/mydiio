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
    links: [
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" },
    ],
  }),
});

const EDGE = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1";

type Phase = "pick" | "arming" | "armed" | "error" | "ended";
type ShareLinks = { track_url: string; whatsapp_url: string; sms_url: string } | null;

declare global {
  interface Window { L?: any }
}

function RidePage() {
  const { vehicleId } = Route.useParams();
  const [phase, setPhase] = useState<Phase>("pick");
  const [errorMsg, setErrorMsg] = useState("");
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [destLabel, setDestLabel] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ label: string; lat: number; lng: number }>>([]);
  const [searching, setSearching] = useState(false);
  const [share, setShare] = useState<ShareLinks>(null);
  const [driver, setDriver] = useState<{ id: string; first_name: string | null; photo_url: string | null } | null>(null);
  const [plate, setPlate] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [sharing, setSharing] = useState(false);
  // Pre-selected from the phone, not asked as a question. Someone whose
  // handset is already in Sinhala should not have to answer anything, and
  // the three options label themselves in their own scripts so the control
  // is legible whichever one you read. Shared and secondhand phones make
  // the locale wrong often enough to be worth an override.
  const [lang, setLang] = useState<"en" | "si" | "ta">(() => {
    if (typeof navigator === "undefined") return "en";
    const l = (navigator.language || "").toLowerCase();
    if (l.startsWith("si")) return "si";
    if (l.startsWith("ta")) return "ta";
    return "en";
  });
  // Applying the language on its own, without following a ride. Separate
  // from confirmRide so a passenger who only wants to change the screen
  // never has to drop a destination pin.
  const [langApplied, setLangApplied] = useState(false);
  const [applyingLang, setApplyingLang] = useState(false);
  // Interface copy for this page, fetched from the database so the same
  // native-speaker review covers it. Falls back to English per key, and to
  // the key's own English literal if the fetch fails entirely.
  const [strings, setStrings] = useState<Record<string, { en: string; si: string | null; ta: string | null }>>({});

  useEffect(() => {
    fetch(`${EDGE}/ride-strings`)
      .then((r) => r.json())
      .then((d) => { if (d && d.strings) setStrings(d.strings); })
      .catch(() => { /* page falls back to English literals */ });
  }, []);

  // Resolve a label for the language the passenger has chosen. English
  // fallback per field; the second argument is the English literal so a
  // key that never loaded still shows correct text.
  const t = (key: string, en: string) => {
    const row = strings[key];
    if (!row) return en;
    if (lang !== "en") {
      const v = row[lang];
      if (typeof v === "string" && v.trim()) return v;
    }
    return row.en || en;
  };

  async function applyLanguage(next: "en" | "si" | "ta") {
    setLang(next);
    setLangApplied(false);
    setApplyingLang(true);
    try {
      const res = await fetch(`${EDGE}/set-language`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_id: vehicleId, language: next }),
      });
      if (res.ok) setLangApplied(true);
    } catch { /* best-effort; the arm call still carries lang if they follow a ride */ }
    setApplyingLang(false);
  }
  const tokenRef = useRef<string | null>(null);
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const pinRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => { pinRef.current = pin; }, [pin]);

  useEffect(() => {
    if (phase !== "pick") return;
    let cancelled = false;

    function loadLeaflet(): Promise<any> {
      if (window.L) return Promise.resolve(window.L);
      return new Promise((resolve, reject) => {
        const sc = document.createElement("script");
        sc.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        sc.onload = () => resolve(window.L);
        sc.onerror = reject;
        document.head.appendChild(sc);
      });
    }

    loadLeaflet().then((L) => {
      if (cancelled || !mapElRef.current || mapRef.current) return;
      const map = L.map(mapElRef.current, { zoomControl: true, attributionControl: false })
        .setView([6.9271, 79.8612], 13);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 20 }).addTo(map);
      mapRef.current = map;

      map.on("click", (e: any) => {
        placePin(e.latlng.lat, e.latlng.lng);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (cancelled) return;
            map.setView([pos.coords.latitude, pos.coords.longitude], 15);
          },
          () => {},
          { enableHighAccuracy: true, timeout: 8000 },
        );
      }
      setTimeout(() => map.invalidateSize(), 200);
    }).catch(() => {});

    return () => { cancelled = true; };
  }, [phase]);

  useEffect(() => {
    function endRide() {
      const token = tokenRef.current;
      if (!token) return;
      const payload = JSON.stringify({ vehicle_id: vehicleId, token });
      try {
        navigator.sendBeacon(`${EDGE}/end-ride`, new Blob([payload], { type: "application/json" }));
      } catch {
        fetch(`${EDGE}/end-ride`, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
      }
    }
    window.addEventListener("pagehide", endRide);
    return () => window.removeEventListener("pagehide", endRide);
  }, [vehicleId]);

  function placePin(lat: number, lng: number) {
    setPin({ lat, lng });
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map) return;
    if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
    else markerRef.current = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 16);
  }

  async function runSearch() {
    const q = query.trim();
    if (q.length < 3 || searching) return;
    setSearching(true);
    try {
      const url = "https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=lk&q=" + encodeURIComponent(q);
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      const data = await res.json().catch(() => []);
      setResults((data || []).map((r: any) => ({ label: r.display_name, lat: parseFloat(r.lat), lng: parseFloat(r.lon) })));
    } catch { setResults([]); }
    setSearching(false);
  }

  async function reverseGeocode(lat: number, lng: number) {
    setDestLabel(null);
    try {
      const url = "https://nominatim.openstreetmap.org/reverse?format=json&zoom=16&lat=" + lat + "&lon=" + lng;
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      const data = await res.json().catch(() => null);
      if (data && data.display_name) {
        setDestLabel(String(data.display_name).split(",").slice(0, 2).join(",").trim());
      }
    } catch { /* label is best-effort; ride is unaffected */ }
  }

  async function confirmRide() {
    const p = pinRef.current;
    if (!p) return;
    setPhase("arming");
    try {
      const res = await fetch(`${EDGE}/arm-ride`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_id: vehicleId, dest_lat: p.lat, dest_lng: p.lng, dest_label: destLabel, language: lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(
          res.status === 404 ? t("ride.err_404", "This tuk could not be found. Check the code on the screen.")
          : res.status === 403 ? t("ride.err_403", "This tuk is not currently active.")
          : t("ride.err_generic", "Something went wrong. Please try again."),
        );
        setPhase("error");
        return;
      }
      tokenRef.current = data.token ?? null;
      setDriver(data.driver ?? null);
      setPlate(data.vehicle_registration ?? null);
      setPhase("armed");
    } catch {
      setErrorMsg(t("ride.err_conn", "No connection. Check your signal and try again."));
      setPhase("error");
    }
  }

  async function endRideNow() {
    const token = tokenRef.current;
    tokenRef.current = null;
    setPhase("ended");
    // Always call end-ride, even with no token. The passenger may have set a
    // screen language on tap without arming a ride, and that still needs to
    // revert. The server treats token as optional: with one it scopes the
    // session delete, without one it clears the standalone language anyway.
    try {
      await fetch(`${EDGE}/end-ride`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_id: vehicleId, token }),
      });
    } catch { /* tablet enders are the backstop */ }
  }

  async function submitRating(stars: number) {
    if (rated || !driver) return;
    setRating(stars);
    setRated(true);
    try {
      await fetch(`${EDGE}/submit-driver-feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driver_id: driver.id, vehicle_id: vehicleId, category: "rating", rating: stars }),
      });
    } catch { /* best-effort; the tablet slide is the other path */ }
  }

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      const res = await fetch(`${EDGE}/create-trip-share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_uuid: vehicleId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setShare({ track_url: data.track_url, whatsapp_url: data.whatsapp_url, sms_url: data.sms_url });
    } catch { /* silent */ }
    setSharing(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.wordmark}>myd<span style={{ color: "#F5A623" }}>ii</span>o</div>

      {phase === "pick" && (
        <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 18px 10px" }}>
            <p style={styles.sectionLabel}>Where are you going?</p>
            <p style={styles.statusText}>Tap the map to drop a pin on your destination, then confirm.</p>
          </div>
          <div style={{ padding: "0 18px 10px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") runSearch(); }}
                placeholder={t("ride.search_ph", "Search a place (e.g. Galle Face Hotel)")}
                style={styles.searchInput}
              />
              <button onClick={runSearch} style={styles.searchBtn} disabled={searching}>
                {searching ? "\u2026" : t("ride.search_btn", "Search")}
              </button>
            </div>
            {results.length > 0 && (
              <div style={styles.results}>
                {results.map((r, i) => (
                  <button key={i} style={styles.resultRow} onClick={() => { placePin(r.lat, r.lng); setDestLabel(r.label.split(",").slice(0, 2).join(",").trim()); setResults([]); setQuery(r.label.split(",")[0]); }}>
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={mapElRef} style={styles.map} />
          <div style={{ padding: "12px 18px 0" }}>
            <p style={styles.sectionLabel}>Screen language</p>
            <div style={{ display: "flex", gap: 8 }}>
              {([
                { k: "en", label: "English" },
                { k: "si", label: "\u0dc3\u0dd2\u0d82\u0dc4\u0dbd" },
                { k: "ta", label: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd" },
              ] as const).map((o) => (
                <button
                  key={o.k}
                  onClick={() => applyLanguage(o.k)}
                  disabled={applyingLang}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: applyingLang ? "default" : "pointer",
                    border: lang === o.k ? "1px solid #F5A623" : "1px solid rgba(26,26,24,0.15)",
                    background: lang === o.k ? "#F5A623" : "transparent",
                    color: lang === o.k ? "#1A1A18" : "#6E6E66",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p style={{ ...styles.statusText, marginTop: 8, fontSize: 12 }}>
              {applyingLang
                ? "Setting the screen language\u2026"
                : langApplied
                ? "Done. The tuk screen is now in this language. You can leave without following your ride."
                : "Tap a language to change the tuk screen right away. You do not need to follow your ride to do this."}
            </p>
          </div>
          <div style={{ padding: 14 }}>
            <button style={{ ...styles.primaryBtn, opacity: pin ? 1 : 0.5, cursor: pin ? "pointer" : "not-allowed" }} onClick={confirmRide} disabled={!pin}>
              {pin ? t("ride.follow", "Follow my ride") : t("ride.drop_pin", "Drop a pin to continue")}
            </button>
          </div>
        </div>
      )}

      {phase === "arming" && (
        <div style={styles.card}><div style={styles.spinner} /><p style={styles.statusText}>{t("ride.connecting", "Connecting to your ride\u2026")}</p></div>
      )}

      {phase === "error" && (
        <div style={styles.card}><p style={styles.errTitle}>{t("ride.not_connected", "Ride not connected")}</p><p style={styles.statusText}>{errorMsg}</p></div>
      )}

      {phase === "armed" && (
        <>
          <div style={{ ...styles.card, borderColor: "#3D6B4F" }}>
            <div style={styles.tick}>✓</div>
            <p style={styles.armedTitle}>{t("ride.armed_title", "Your ride is being followed")}</p>
            <p style={styles.statusText}>{t("ride.armed_body", "The screen in your tuk is now showing your live location and route to your destination.")}</p>
          </div>
          {driver && (
            <div style={styles.card}>
              <div style={styles.driverRow}>
                {driver.photo_url ? (
                  <img src={driver.photo_url} alt="" style={styles.driverPhoto} />
                ) : (
                  <div style={styles.driverAvatar}>{(driver.first_name || "?").charAt(0)}</div>
                )}
                <div style={{ textAlign: "left" }}>
                  <p style={styles.driverName}>{driver.first_name || t("ride.driver_fallback", "Your driver")}</p>
                  <p style={styles.driverPlate}>{plate || vehicleId ? (plate || "mydiio verified") : ""}</p>
                </div>
              </div>
              <div style={styles.rateWrap}>
                {rated ? (
                  <p style={styles.statusText}>{t("ride.rate_thanks", "Thanks for rating your driver.")}</p>
                ) : (
                  <>
                    <p style={styles.sectionLabel}>{t("ride.rate", "Rate your driver")}</p>
                    <div style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => submitRating(n)} style={{ ...styles.star, color: n <= rating ? "#F5A623" : "#D8D2C2" }} aria-label={`${n} stars`}>★</button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div style={styles.card}>
            <p style={styles.sectionLabel}>{t("ride.share_title", "Share your ride")}</p>
            <p style={styles.statusText}>{t("ride.share_body", "Send a live tracking link to someone you trust.")}</p>
            {!share ? (
              <button style={styles.primaryBtn} onClick={handleShare} disabled={sharing}>{sharing ? t("ride.creating_link", "Creating link\u2026") : t("ride.create_link", "Create a tracking link")}</button>
            ) : (
              <div style={styles.shareRow}>
                <a style={styles.shareBtn} href={share.whatsapp_url} target="_blank" rel="noreferrer">{t("ride.share_wa", "Share on WhatsApp")}</a>
                <a style={styles.shareBtnAlt} href={share.sms_url}>{t("ride.share_sms", "Share by SMS")}</a>
              </div>
            )}
          </div>
          <a href="tel:119" style={styles.emergencyBtn}>{t("ride.emergency", "Emergency \u2014 call 119")}</a>
          <button style={styles.endBtn} onClick={endRideNow}>{t("ride.end_ride", "End ride")}</button>
        </>
      )}

      {phase === "ended" && (
        <div style={styles.card}>
          <p style={styles.armedTitle}>{t("ride.ended_title", "Ride ended")}</p>
          <p style={styles.statusText}>{t("ride.ended_body", "Your ride is no longer being followed. Safe travels.")}</p>
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
  page: { minHeight: "100dvh", background: "#FDFAF3", padding: "32px 20px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, fontFamily: "'Space Grotesk', system-ui, sans-serif" },
  wordmark: { fontSize: 26, fontWeight: 700, color: "#1A1A18", letterSpacing: -0.5, marginBottom: 8 },
  card: { width: "100%", maxWidth: 420, background: "#FFFFFF", border: "2px solid #EDE6D6", borderRadius: 16, padding: 22, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  map: { width: "100%", height: 300 },
  searchInput: { flex: 1, border: "2px solid #EDE6D6", borderRadius: 10, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none" },
  searchBtn: { background: "#1A1A18", color: "#FDFAF3", border: "none", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" },
  results: { marginTop: 8, border: "1px solid #EDE6D6", borderRadius: 10, overflow: "hidden" },
  resultRow: { display: "block", width: "100%", textAlign: "left", background: "#FFFFFF", border: "none", borderBottom: "1px solid #F1EFE8", padding: "10px 12px", fontSize: 13, color: "#1A1A18", cursor: "pointer", fontFamily: "inherit" },
  spinner: { width: 34, height: 34, border: "3px solid #EDE6D6", borderTopColor: "#F5A623", borderRadius: "50%", animation: "ridespin 0.8s linear infinite" },
  tick: { width: 42, height: 42, borderRadius: "50%", background: "#3D6B4F", color: "#FDFAF3", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" },
  armedTitle: { fontSize: 18, fontWeight: 700, color: "#1A1A18", margin: 0 },
  errTitle: { fontSize: 18, fontWeight: 700, color: "#E8920A", margin: 0 },
  sectionLabel: { fontSize: 15, fontWeight: 700, color: "#1A1A18", margin: 0, textAlign: "left" },
  statusText: { fontSize: 14, color: "#5F5E5A", lineHeight: 1.55, margin: "6px 0 0", textAlign: "left" },
  primaryBtn: { width: "100%", background: "#F5A623", color: "#1A1A18", border: "none", borderRadius: 12, padding: "13px 16px", fontSize: 15, fontWeight: 700, fontFamily: "inherit" },
  shareRow: { display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 6 },
  shareBtn: { background: "#25D366", color: "#0B3D24", borderRadius: 12, padding: "13px 16px", fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center" },
  shareBtnAlt: { background: "#FFFFFF", color: "#1A1A18", border: "2px solid #EDE6D6", borderRadius: 12, padding: "13px 16px", fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center" },
  emergencyBtn: { width: "100%", maxWidth: 420, background: "#E84545", color: "#FFFFFF", borderRadius: 12, padding: "15px 16px", fontSize: 16, fontWeight: 700, textDecoration: "none", textAlign: "center" },
  endBtn: { width: "100%", maxWidth: 420, background: "transparent", color: "#5F5E5A", border: "2px solid #EDE6D6", borderRadius: 12, padding: "13px 16px", fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" },
  driverRow: { display: "flex", alignItems: "center", gap: 14, width: "100%" },
  driverPhoto: { width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid #EDE6D6" },
  driverAvatar: { width: 56, height: 56, borderRadius: "50%", background: "#3D6B4F", color: "#FDFAF3", fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
  driverName: { fontSize: 17, fontWeight: 700, color: "#1A1A18", margin: 0 },
  driverPlate: { fontSize: 14, color: "#5F5E5A", margin: "2px 0 0" },
  rateWrap: { width: "100%", marginTop: 14, paddingTop: 14, borderTop: "1px solid #EDE6D6" },
  stars: { display: "flex", justifyContent: "center", gap: 6, marginTop: 8 },
  star: { background: "none", border: "none", fontSize: 34, cursor: "pointer", padding: 0, lineHeight: 1 },
  adCta: { width: "100%", maxWidth: 420, marginTop: 8, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#E8920A", textDecoration: "none", padding: "10px 12px", border: "1px dashed #E8920A", borderRadius: 12 },
  footer: { marginTop: "auto", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#B4B2A9" },
};
