import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Zone = {
  id: string; name: string; sub: string; lat: number; lng: number;
  vehicles: number; impr: number; dwell: number; uptime: number;
  routes: [string, number][];
};

const ZONES: Zone[] = [
  { id: "CMB-01", name: "Fort",          sub: "Government, banking & commercial core", lat: 6.9344, lng: 79.8428, vehicles: 12, impr: 96,  dwell: 16, uptime: 99, routes: [["Galle Face — Fort", 92], ["Fort — Pettah loop", 78], ["Marine Drive", 61]] },
  { id: "CMB-11", name: "Pettah",        sub: "Wholesale markets & transit hub",       lat: 6.9388, lng: 79.8542, vehicles: 14, impr: 124, dwell: 11, uptime: 98, routes: [["Pettah — Borella", 88], ["Main St markets", 81], ["Pettah — Fort", 74]] },
  { id: "CMB-08", name: "Borella",       sub: "Hospitals, offices & junctions",        lat: 6.9148, lng: 79.8776, vehicles: 9,  impr: 71,  dwell: 14, uptime: 97, routes: [["Borella junction", 84], ["Borella — Nugegoda", 69], ["Cotta Rd", 52]] },
  { id: "CMB-03", name: "Kollupitiya",   sub: "Retail, embassies & seafront",          lat: 6.9101, lng: 79.8487, vehicles: 11, impr: 88,  dwell: 15, uptime: 99, routes: [["Galle Rd corridor", 90], ["Kollupitiya — Fort", 72], ["Duplication Rd", 58]] },
  { id: "CMB-04", name: "Bambalapitiya", sub: "Shopping, schools & coast",             lat: 6.8901, lng: 79.8564, vehicles: 10, impr: 82,  dwell: 13, uptime: 98, routes: [["Galle Rd south", 86], ["Bamba — Borella", 64], ["Bauddhaloka Mw", 49]] },
  { id: "CMB-06", name: "Wellawatte",    sub: "Dense residential & dining",            lat: 6.8748, lng: 79.8607, vehicles: 8,  impr: 64,  dwell: 12, uptime: 96, routes: [["Galle Rd — Wellawatte", 80], ["Wella — Nugegoda", 55], ["Marine Dr south", 47]] },
  { id: "NUG-01", name: "Nugegoda",      sub: "Suburban retail & commuter belt",       lat: 6.8649, lng: 79.8997, vehicles: 13, impr: 109, dwell: 18, uptime: 98, routes: [["High Level Rd", 89], ["Nugegoda — Borella", 70], ["Stanley Tilakaratne Mw", 60]] },
];

const EDGES: [string, string][] = [
  ["CMB-01", "CMB-11"], ["CMB-11", "CMB-08"], ["CMB-01", "CMB-03"], ["CMB-03", "CMB-11"],
  ["CMB-03", "CMB-04"], ["CMB-04", "CMB-06"], ["CMB-04", "CMB-08"], ["CMB-08", "NUG-01"], ["CMB-06", "NUG-01"],
];

function buildIcon(z: Zone, selected: boolean) {
  const d = Math.round(36 + z.vehicles * 1.4);
  const bg = selected ? "var(--accent)" : "var(--paper, #FFFEFA)";
  const shadow = selected ? "4px 5px 0 #1E1A15" : "2px 2px 0 #1E1A15";
  const scale = selected ? "scale(1.18)" : "scale(1)";
  const ring = selected
    ? `<span class="nl-ping" style="position:absolute;inset:-6px;border:2px solid #F4A62A;border-radius:9999px;opacity:0.85;"></span>`
    : "";
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;display:flex;flex-direction:column;align-items:center;transform:${scale};transition:transform .25s cubic-bezier(.16,1,.3,1);">
        ${ring}
        <div style="position:relative;width:${d}px;height:${d}px;border-radius:9999px;background:${bg};border:2px solid #1E1A15;box-shadow:${shadow};display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-weight:700;font-size:12px;color:#1E1A15;">
          ${z.vehicles}
        </div>
        <div style="margin-top:6px;padding:2px 8px;background:#FFFEFA;border:1.5px solid #1E1A15;border-radius:9999px;font-family:'Space Mono',monospace;font-size:10px;color:#1E1A15;white-space:nowrap;box-shadow:1px 1px 0 #1E1A15;">
          ${z.name}
        </div>
      </div>`,
    iconSize: [d, d + 22],
    iconAnchor: [d / 2, d / 2],
  });
}

function MapBoot({ onReady }: { onReady: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => { onReady(map); }, [map, onReady]);
  return null;
}

function Stat({ label, value, suffix, accentSuffix }: { label: string; value: number | string; suffix?: string; accentSuffix?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(244,239,227,0.6)" }}>{label}</div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 32, marginTop: 6, color: "#F4EFE3", lineHeight: 1.05 }}>
        {value}{suffix && <span style={{ color: accentSuffix ? "var(--accent)" : undefined, fontSize: 22, marginLeft: 2 }}>{suffix}</span>}
      </div>
    </div>
  );
}

export function NetworkLive() {
  const [selectedId, setSelectedId] = useState<string>("CMB-01");
  const selected = useMemo(() => ZONES.find(z => z.id === selectedId)!, [selectedId]);
  const byId = useMemo(() => Object.fromEntries(ZONES.map(z => [z.id, z])) as Record<string, Zone>, []);
  const mapRef = useRef<L.Map | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [barsKey, setBarsKey] = useState(0);

  useEffect(() => { setBarsKey(k => k + 1); }, [selectedId]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && mapRef.current) {
          setTimeout(() => mapRef.current?.invalidateSize(), 220);
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--bg)", padding: "clamp(64px,8vw,112px) 0" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,4vw,40px)" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 44px" }}>
          <span className="reveal-up" style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 3, color: "var(--accent-deep)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 0 rgba(244,166,42,0.6)", animation: "nl-pulse 2s ease-out infinite" }} />
            The Network · Live
          </span>
          <h2 className="reveal-up delay-1" style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(32px,5vw,64px)", color: "var(--ink)", lineHeight: 1.04, letterSpacing: "-1.5px", marginTop: 16, fontWeight: 500 }}>
            Colombo, mapped by <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>attention</em>.
          </h2>
          <p className="reveal-up delay-2" style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 18, fontWeight: 500 }}>
            Tap any zone to see live coverage, daily impressions and the routes that carry your brand.
          </p>
        </div>

        <div className="nl-grid">
          <div ref={wrapRef} className="nl-map reveal reveal-up" style={{
            border: "2px solid var(--ink)", borderRadius: 26, overflow: "hidden",
            boxShadow: "var(--sticker)", background: "var(--paper)", minHeight: 480,
          }}>
            <MapContainer
              center={[6.9035, 79.859]} zoom={13} scrollWheelZoom={false}
              zoomControl={false} style={{ width: "100%", height: "100%", minHeight: 480 }}
            >
              <MapBoot onReady={(m) => { mapRef.current = m; L.control.zoom({ position: "bottomright" }).addTo(m); }} />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains={["a", "b", "c", "d"] as unknown as string}
                attribution='&copy; OpenStreetMap &copy; CARTO'
              />
              {EDGES.map(([a, b], i) => {
                const za = byId[a], zb = byId[b];
                const isSel = a === selectedId || b === selectedId;
                return (
                  <Polyline
                    key={i}
                    positions={[[za.lat, za.lng], [zb.lat, zb.lng]]}
                    pathOptions={{
                      color: isSel ? "#B07A14" : "#1E1A15",
                      weight: isSel ? 4 : 2,
                      opacity: isSel ? 0.95 : 0.22,
                    }}
                  />
                );
              })}
              {ZONES.map((z) => (
                <Marker
                  key={z.id}
                  position={[z.lat, z.lng]}
                  icon={buildIcon(z, z.id === selectedId)}
                  eventHandlers={{ click: () => setSelectedId(z.id) }}
                />
              ))}
            </MapContainer>
          </div>

          <aside className="nl-panel reveal reveal-up delay-1" style={{
            background: "var(--ink)", color: "#F4EFE3", border: "2px solid var(--ink)",
            borderRadius: 26, boxShadow: "var(--sticker)", padding: "clamp(24px,3vw,30px)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)" }}>
              ZONE · {selected.id}
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 34, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 8 }}>
              {selected.name}
            </h3>
            <p style={{ marginTop: 8, fontSize: 14.5, color: "rgba(244,239,227,0.7)", lineHeight: 1.55 }}>
              {selected.sub}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(244,239,227,0.14)" }}>
              <Stat label="Vehicles active" value={selected.vehicles} />
              <Stat label="Daily impressions" value={selected.impr} suffix="k" accentSuffix />
              <Stat label="Avg dwell" value={selected.dwell} suffix=" min" />
              <Stat label="Screen uptime" value={selected.uptime} suffix="%" accentSuffix />
            </div>

            <div style={{ marginTop: 26 }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(244,239,227,0.6)", marginBottom: 12 }}>
                Top routes in zone
              </div>
              <div key={barsKey} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {selected.routes.map(([name, pct], i) => (
                  <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr 80px 36px", gap: 12, alignItems: "center" }}>
                    <div style={{ fontSize: 13.5, color: "#F4EFE3", fontWeight: 500 }}>{name}</div>
                    <div style={{ height: 8, background: "rgba(244,239,227,0.12)", borderRadius: 9999, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", width: `${pct}%`, background: "var(--accent)",
                        borderRadius: 9999, transform: "translateX(-100%)",
                        animation: `nl-bar 0.9s cubic-bezier(.16,1,.3,1) ${0.08 * i}s forwards`,
                      }} />
                    </div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "var(--accent)", textAlign: "right" }}>{pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }} />
            <div style={{ marginTop: 22, fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(244,239,227,0.55)" }}>
              ↳ Tap a marker to explore a zone
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .nl-grid { display: grid; grid-template-columns: 1fr; gap: 22px; align-items: stretch; }
        .nl-grid > * { min-width: 0; }
        @media (min-width: 1080px) {
          .nl-grid { grid-template-columns: 1.2fr 0.8fr; gap: 28px; }
        }
        .nl-map .leaflet-tile-pane { filter: sepia(0.14) saturate(0.96) contrast(1.05) hue-rotate(-4deg); }
        .nl-map .leaflet-container { background: #F2E9D6; font-family: inherit; }
        .nl-map .leaflet-control-zoom { border: 2px solid #1E1A15 !important; border-radius: 10px !important; box-shadow: 2px 2px 0 #1E1A15; overflow: hidden; }
        .nl-map .leaflet-control-zoom a {
          background: #FFFEFA !important; color: #1E1A15 !important;
          border-bottom: 1px solid #1E1A15 !important; width: 32px; height: 32px; line-height: 32px;
          font-family: 'Space Mono', monospace; font-size: 16px;
        }
        .nl-map .leaflet-control-zoom a:last-child { border-bottom: none !important; }
        .nl-map .leaflet-control-attribution {
          background: #FFFEFA !important; color: #1E1A15 !important;
          font-family: 'Space Mono', monospace !important; font-size: 9px !important;
          border: 1.5px solid #1E1A15; border-radius: 6px; padding: 2px 6px; margin: 6px;
        }
        .nl-map .leaflet-control-attribution a { color: #1E1A15 !important; text-decoration: underline; }

        @keyframes nl-bar { to { transform: translateX(0); } }
        @keyframes nl-pulse {
          0% { box-shadow: 0 0 0 0 rgba(244,166,42,0.55); }
          100% { box-shadow: 0 0 0 12px rgba(244,166,42,0); }
        }
        .nl-ping { animation: nl-pulse 1.8s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .nl-ping, .nl-grid [style*="nl-pulse"] { animation: none !important; }
          [style*="nl-bar"] > * { animation: none !important; transform: translateX(0) !important; }
        }
      `}</style>
    </section>
  );
}

export default NetworkLive;
