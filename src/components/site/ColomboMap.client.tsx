import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { C } from "./theme";

type Zone = {
  id: number;
  name: string;
  center: [number, number];
  radius: number;
  description: string;
  tuk_density: string;
};

const ZONES: Zone[] = [
  { id: 1, name: "Fort / Pettah", center: [6.9344, 79.8428], radius: 900, description: "The commercial heartbeat of Colombo. Highest footfall, highest ad value.", tuk_density: "High" },
  { id: 2, name: "Kollupitiya / Slave Island", center: [6.9147, 79.849], radius: 800, description: "Hotels, embassies, finance district. Premium audience, high dwell time.", tuk_density: "High" },
  { id: 3, name: "Bambalapitiya", center: [6.896, 79.853], radius: 750, description: "Busy retail corridor. Restaurants, boutiques, daily commuter traffic.", tuk_density: "High" },
  { id: 4, name: "Wellawatte / Pamankada", center: [6.8756, 79.8579], radius: 800, description: "Dense residential and commercial mix. Strong repeat audience.", tuk_density: "Medium" },
  { id: 5, name: "Dehiwala", center: [6.8535, 79.865], radius: 900, description: "Major suburban hub south of the city. Growing retail base.", tuk_density: "Medium" },
  { id: 6, name: "Borella / Cinnamon Gardens", center: [6.9147, 79.865], radius: 850, description: "Upmarket residential. Hospitals, schools, professional services.", tuk_density: "Medium" },
  { id: 7, name: "Maradana / Dematagoda", center: [6.93, 79.87], radius: 800, description: "Transport hub zone. High tuk-tuk concentration at rail and bus interchanges.", tuk_density: "High" },
  { id: 8, name: "Rajagiriya / Kotte", center: [6.909, 79.89], radius: 900, description: "Government and business district east of the city. Weekday commuter audience.", tuk_density: "Medium" },
  { id: 9, name: "Nugegoda", center: [6.871, 79.887], radius: 1000, description: "The pilot launch corridor. Highest mydiio concentration. Dense suburban commercial.", tuk_density: "High — Pilot zone" },
  { id: 10, name: "Maharagama", center: [6.8467, 79.927], radius: 1100, description: "Fast-growing outer suburb. Lower competition, high local business density.", tuk_density: "Medium" },
];

const amberDot = L.divIcon({
  className: "",
  html: `<div style="width:10px;height:10px;border-radius:50%;background:#E8920A;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

function ZoomControls() {
  const map = useMap();
  const btn: React.CSSProperties = {
    width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
    background: C.amber, color: C.ink, border: `2px solid ${C.ink}`, borderRadius: 8,
    fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1, cursor: "pointer",
    boxShadow: "2px 2px 0 rgba(26,26,24,0.9)",
  };
  return (
    <div style={{ position: "absolute", top: 12, right: 12, zIndex: 500, display: "flex", flexDirection: "column", gap: 6 }}>
      <button type="button" aria-label="Zoom in" style={btn} onClick={() => map.zoomIn()}>+</button>
      <button type="button" aria-label="Zoom out" style={btn} onClick={() => map.zoomOut()}>−</button>
    </div>
  );
}

function densityDots(density: string) {
  const lower = density.toLowerCase();
  const filled = lower.startsWith("high") ? 3 : lower.startsWith("medium") ? 2 : 1;
  return (
    <span style={{ display: "inline-flex", gap: 4, marginLeft: 8, verticalAlign: "middle" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < filled ? C.amber : "rgba(26,26,24,0.18)" }} />
      ))}
    </span>
  );
}

export function ColomboMap() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const active = useMemo(() => ZONES.find((z) => z.id === activeId) || null, [activeId]);

  // Leaflet renders before the animated container has its final size; trigger
  // invalidateSize() once the map scrolls into view so tiles align correctly.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && mapRef.current) {
          // Allow the reveal transform to settle, then invalidate.
          setTimeout(() => mapRef.current?.invalidateSize(), 250);
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const selectZone = (z: Zone) => {
    setActiveId(z.id);
    if (mapRef.current) mapRef.current.flyTo(z.center, 13, { duration: 0.6 });
  };

  const reset = () => {
    setActiveId(null);
    if (mapRef.current) mapRef.current.flyTo([6.9271, 79.8612], 12, { duration: 0.6 });
  };

  const onGetCoverage = () => {
    const el = document.getElementById("apply-section") || document.getElementById("signup-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="coverage-grid">
      <div ref={wrapRef} className="coverage-map-wrap" style={{
        position: "relative", borderRadius: 16, overflow: "hidden",
        border: `2.5px solid ${C.ink}`, boxShadow: "6px 6px 0 rgba(26,26,24,0.9)",
      }}>
        <MapContainer
          center={[6.9271, 79.8612]}
          zoom={12}
          zoomControl={false}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
          ref={(instance) => { mapRef.current = instance; }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {ZONES.map((z) => {
            const isActive = z.id === activeId;
            return (
              <Circle
                key={z.id}
                center={z.center}
                radius={z.radius}
                pathOptions={{
                  fillColor: "#F5A623",
                  fillOpacity: isActive ? 0.45 : 0.15,
                  color: "#E8920A",
                  weight: isActive ? 2.5 : 1.5,
                }}
                eventHandlers={{
                  click: () => selectZone(z),
                  mouseover: (e) => {
                    if (z.id !== activeId) e.target.setStyle({ fillOpacity: 0.3, weight: 2 });
                  },
                  mouseout: (e) => {
                    if (z.id !== activeId) e.target.setStyle({ fillOpacity: 0.15, weight: 1.5 });
                  },
                }}
              />
            );
          })}
          {ZONES.map((z) => (
            <Marker key={`m-${z.id}`} position={z.center} icon={amberDot} eventHandlers={{ click: () => selectZone(z) }} />
          ))}
          <ZoomControls />
        </MapContainer>
      </div>

      <aside className="coverage-side" style={{
        background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 16,
        padding: 24, boxShadow: "6px 6px 0 rgba(26,26,24,0.9)",
        display: "flex", flexDirection: "column", minHeight: 360,
      }}>
        {!active ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="coverage-pulse" />
              <span className="font-display" style={{ fontSize: 16, color: C.ink, letterSpacing: "-0.2px" }}>
                10 zones across Greater Colombo
              </span>
            </div>
            <p style={{ marginTop: 14, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, fontWeight: 500 }}>
              Select a zone on the map to explore coverage, tuk-tuk density, and audience profile.
            </p>
            <div style={{ height: 1, background: "rgba(26,26,24,0.12)", margin: "20px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amberDeep, textTransform: "uppercase" }}>All zones</div>
                <div className="font-display" style={{ fontSize: 20, color: C.ink, marginTop: 6 }}>10 zones</div>
                <div className="font-display" style={{ fontSize: 20, color: C.ink, marginTop: 6 }}>50+ tuks</div>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amberDeep, textTransform: "uppercase" }}>Launching Q3 2026</div>
                <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 6, fontWeight: 500, lineHeight: 1.5 }}>7 Colombo zones active</div>
                <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 6, fontWeight: 500, lineHeight: 1.5 }}>Across all zones at launch</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <button type="button" onClick={reset} style={{
                background: "transparent", border: "none", padding: 0, cursor: "pointer",
                fontSize: 13, color: C.inkSoft, fontWeight: 600,
              }}>← All zones</button>
              <span className="font-display" style={{ fontSize: 18, color: C.amberDeep, textAlign: "right", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                {active.name}
              </span>
            </div>
            <p style={{ marginTop: 14, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.55, fontWeight: 500 }}>
              {active.description}
            </p>
            <div style={{ height: 1, background: "rgba(26,26,24,0.12)", margin: "20px 0" }} />
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amberDeep, textTransform: "uppercase" }}>Tuk density</div>
              <div className="font-display" style={{ fontSize: 17, color: C.ink, marginTop: 6, display: "flex", alignItems: "center" }}>
                {active.tuk_density}{densityDots(active.tuk_density)}
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.amberDeep, textTransform: "uppercase" }}>Status</div>
              <div className="font-display" style={{ fontSize: 17, color: C.ink, marginTop: 6 }}>Launching Q3 2026</div>
            </div>
            <div style={{ flex: 1 }} />
            <button type="button" onClick={onGetCoverage} className="btn-bold font-display" style={{
              marginTop: 20, background: C.amber, color: C.ink, padding: "13px 18px",
              borderRadius: 11, fontSize: 14.5, border: `2.5px solid ${C.ink}`, cursor: "pointer",
            }}>
              Get coverage here →
            </button>
          </>
        )}
      </aside>

      {/* Mobile pill row */}
      <div className="coverage-pills">
        {ZONES.map((z) => {
          const isActive = z.id === activeId;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => selectZone(z)}
              style={{
                background: isActive ? C.amber : "#FEF3D7",
                color: isActive ? C.ink : "#854F0B",
                borderRadius: 20, padding: "6px 14px", fontSize: 13,
                border: "none", cursor: "pointer", whiteSpace: "nowrap", fontWeight: 700,
              }}
            >
              {z.name}
            </button>
          );
        })}
      </div>

      <style>{`
        .coverage-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .coverage-map-wrap { height: 380px; }
        .coverage-pills {
          display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 8px;
          -webkit-overflow-scrolling: touch;
        }
        @media (min-width: 880px) {
          .coverage-grid {
            grid-template-columns: 65fr 35fr;
            gap: 24px;
          }
          .coverage-map-wrap { height: 520px; grid-column: 1; }
          .coverage-side { grid-column: 2; }
          .coverage-pills { display: none; }
        }
        @keyframes coverage-pulse {
          0% { box-shadow: 0 0 0 0 rgba(245,166,35,0.45); }
          100% { box-shadow: 0 0 0 12px rgba(245,166,35,0); }
        }
        .coverage-pulse {
          width: 10px; height: 10px; border-radius: 50%;
          background: ${C.amber}; display: inline-block;
          animation: coverage-pulse 2s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) { .coverage-pulse { animation: none; } }
        /* Leaflet base layout fixes inside our bordered container */
        .coverage-map-wrap .leaflet-container { background: #e9e4d8; font-family: inherit; }
        .coverage-map-wrap .leaflet-control-attribution { font-size: 10px; }
      `}</style>
    </div>
  );
}

export default ColomboMap;
