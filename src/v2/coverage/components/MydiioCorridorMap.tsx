import { useMemo, useState } from "react";
import "./MydiioCorridorMap.css";

type CorridorLocation = {
  name: string;
  latitude: number;
  longitude: number;
  coordinate: string;
  label: string;
};

const locations: CorridorLocation[] = [
  {
    name: "Dehiwala",
    latitude: 6.8518,
    longitude: 79.8655,
    coordinate: "6.8518° N, 79.8655° E",
    label: "Corridor entry",
  },
  {
    name: "Mount Lavinia",
    latitude: 6.8389,
    longitude: 79.8653,
    coordinate: "6.8389° N, 79.8653° E",
    label: "Corridor midpoint",
  },
  {
    name: "Ratmalana",
    latitude: 6.8211,
    longitude: 79.8862,
    coordinate: "6.8211° N, 79.8862° E",
    label: "Corridor endpoint",
  },
];

const expansionPlan = [
  {
    name: "Kandy",
    description: "Planned next-city expansion",
  },
  {
    name: "Galle",
    description: "Planned southern expansion",
  },
  {
    name: "Jaffna",
    description: "Planned northern expansion",
  },
  {
    name: "Nuwara Eliya",
    description: "Planned hill-country expansion",
  },
];

function latLngToTile(latitude: number, longitude: number, zoom: number) {
  const scale = 2 ** zoom;
  const radians = (latitude * Math.PI) / 180;

  return {
    x: ((longitude + 180) / 360) * scale,
    y: ((1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) / 2) * scale,
  };
}

function getTileUrl(x: number, y: number, zoom: number) {
  return "https://a.basemaps.cartocdn.com/light_all/" + zoom + "/" + x + "/" + y + ".png";
}

function MapTiles({ location }: { location: CorridorLocation }) {
  const tiles = useMemo(() => {
    const zoom = 15;
    const centre = latLngToTile(location.latitude, location.longitude, zoom);
    const centreX = Math.floor(centre.x);
    const centreY = Math.floor(centre.y);

    return Array.from({ length: 9 }, (_, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);

      return {
        left: column * 256,
        src: getTileUrl(centreX + column - 1, centreY + row - 1, zoom),
        top: row * 256,
      };
    });
  }, [location]);

  return (
    <div className="mydiio-map-tiles" aria-hidden="true">
      {tiles.map((tile) => (
        <img
          key={tile.src}
          src={tile.src}
          alt=""
          draggable={false}
          style={{ left: tile.left, top: tile.top }}
        />
      ))}
    </div>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

function Pin() {
  return (
    <svg className="mydiio-map-pin" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.75A6.25 6.25 0 0 0 5.75 9c0 4.62 6.25 12.25 6.25 12.25S18.25 13.62 18.25 9A6.25 6.25 0 0 0 12 2.75Z" />
      <circle cx="12" cy="9" r="2.25" />
    </svg>
  );
}

function LocationCard({
  expanded,
  location,
  onToggle,
}: {
  expanded: boolean;
  location: CorridorLocation;
  onToggle: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <button
      type="button"
      className={"mydiio-location-card" + (expanded ? " is-expanded" : "")}
      aria-expanded={expanded}
      aria-label={
        expanded ? "Collapse " + location.name + " map" : "Expand " + location.name + " map"
      }
      onClick={onToggle}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

        setTilt({ x: y, y: x });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: "perspective(900px) rotateX(" + tilt.x + "deg) rotateY(" + tilt.y + "deg)",
      }}
    >
      <div className="mydiio-map-layer">
        <MapTiles location={location} />
        <div className="mydiio-map-vignette" />
        <span className="mydiio-map-marker">
          <Pin />
        </span>
      </div>

      <div className="mydiio-location-content">
        <MapIcon />

        <div className="mydiio-location-copy">
          <span className="mydiio-location-label">{location.label}</span>
          <strong>{location.name}</strong>

          <span className="mydiio-location-coordinate">{location.coordinate}</span>

          <span className="mydiio-location-line" />
        </div>
      </div>
    </button>
  );
}

export function MydiioCorridorMap({ progress = 1 }: { progress?: number }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      data-mydiio-corridor-map
      style={{
        opacity: progress > 0 ? 1 : 0,
      }}
    >
      <div className="mydiio-corridor-intro">
        <p>Colombo Metro corridor</p>
        <h2>See the first connected journey.</h2>
        <span>
          Dehiwala, Mount Lavinia and Ratmalana form the practical first corridor for mydiio.
        </span>
      </div>

      <div className="mydiio-location-grid">
        {locations.map((location, index) => (
          <LocationCard
            key={location.name}
            location={location}
            expanded={expandedIndex === index}
            onToggle={() => setExpandedIndex((current) => (current === index ? null : index))}
          />
        ))}
      </div>

      <div className="mydiio-expansion-plan">
        <div className="mydiio-expansion-plan-heading">
          <p>Planned expansion</p>
          <span>One connected operating model, city by city.</span>
        </div>

        <div className="mydiio-expansion-grid">
          {expansionPlan.map((city, index) => (
            <article className="mydiio-expansion-card" key={city.name}>
              <span>0{index + 1}</span>
              <strong>{city.name}</strong>
              <p>{city.description}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="mydiio-map-attribution">
        Map data © OpenStreetMap contributors · Tiles © CARTO
      </p>
    </section>
  );
}
