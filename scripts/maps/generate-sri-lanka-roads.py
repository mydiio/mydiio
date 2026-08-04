#!/usr/bin/env python3

from __future__ import annotations

import json
import math
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

NATURAL_EARTH_URL = (
    "https://raw.githubusercontent.com/"
    "martynafford/natural-earth-geojson/master/"
    "10m/cultural/ne_10m_admin_0_countries.json"
)

OVERPASS_ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
]

ROAD_OUTPUT = Path(
    "public/assets/maps/sri-lanka-road-network.svg"
)

CITY_OUTPUT = Path(
    "src/v2/network/generatedMapData.ts"
)

VIEWBOX_WIDTH = 800
VIEWBOX_HEIGHT = 1200
PADDING = 34

BBOX = "5.70,79.40,10.10,82.10"

CITY_NAMES = [
    "Colombo",
    "Negombo",
    "Galle",
    "Jaffna",
    "Trincomalee",
    "Batticaloa",
    "Hambantota",
]

CITY_PATTERN = "|".join(
    re.escape(name) for name in CITY_NAMES
)


def download_json(url: str) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "mydiio-atlas-map-generator/1.0",
        },
    )

    with urllib.request.urlopen(
        request,
        timeout=120,
    ) as response:
        return json.load(response)


def query_overpass(query: str) -> dict[str, Any]:
    encoded = urllib.parse.urlencode(
        {"data": query},
    ).encode("utf-8")

    last_error: Exception | None = None

    for endpoint in OVERPASS_ENDPOINTS:
        try:
            print(f"Querying {endpoint}...")

            request = urllib.request.Request(
                endpoint,
                data=encoded,
                headers={
                    "User-Agent":
                        "mydiio-atlas-map-generator/1.0",
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
            )

            with urllib.request.urlopen(
                request,
                timeout=300,
            ) as response:
                return json.load(response)

        except Exception as error:
            last_error = error
            print(
                f"Endpoint failed: {error}",
                file=sys.stderr,
            )

    raise RuntimeError(
        f"All Overpass endpoints failed: {last_error}"
    )


def feature_name(
    properties: dict[str, Any],
) -> str:
    for field in (
        "ADMIN",
        "NAME",
        "NAME_EN",
        "SOVEREIGNT",
        "FORMAL_EN",
    ):
        value = properties.get(field)

        if isinstance(value, str) and value.strip():
            return value.strip()

    return ""


def find_sri_lanka(
    data: dict[str, Any],
) -> dict[str, Any]:
    for feature in data.get("features", []):
        name = feature_name(
            feature.get("properties", {}),
        ).lower()

        if name == "sri lanka":
            return feature

    raise RuntimeError(
        "Sri Lanka was not found in Natural Earth."
    )


def extract_rings(
    geometry: dict[str, Any],
) -> list[list[list[float]]]:
    geometry_type = geometry.get("type")
    coordinates = geometry.get("coordinates", [])

    if geometry_type == "Polygon":
        return coordinates

    if geometry_type == "MultiPolygon":
        rings: list[list[list[float]]] = []

        for polygon in coordinates:
            rings.extend(polygon)

        return rings

    raise RuntimeError(
        f"Unsupported geometry: {geometry_type}"
    )


def create_projection(
    rings: list[list[list[float]]],
):
    points = [
        point
        for ring in rings
        for point in ring
        if len(point) >= 2
    ]

    longitudes = [point[0] for point in points]
    latitudes = [point[1] for point in points]

    min_lon = min(longitudes)
    max_lon = max(longitudes)
    min_lat = min(latitudes)
    max_lat = max(latitudes)

    centre_lat = math.radians(
        (min_lat + max_lat) / 2,
    )

    projected_width = (
        (max_lon - min_lon)
        * math.cos(centre_lat)
    )
    projected_height = max_lat - min_lat

    available_width = (
        VIEWBOX_WIDTH - PADDING * 2
    )
    available_height = (
        VIEWBOX_HEIGHT - PADDING * 2
    )

    scale = min(
        available_width / projected_width,
        available_height / projected_height,
    )

    content_width = projected_width * scale
    content_height = projected_height * scale

    offset_x = (
        VIEWBOX_WIDTH - content_width
    ) / 2
    offset_y = (
        VIEWBOX_HEIGHT - content_height
    ) / 2

    def project(
        longitude: float,
        latitude: float,
    ) -> tuple[float, float]:
        x = (
            (longitude - min_lon)
            * math.cos(centre_lat)
            * scale
            + offset_x
        )

        y = (
            (max_lat - latitude)
            * scale
            + offset_y
        )

        return x, y

    return project


def geometry_to_path(
    geometry: list[dict[str, Any]],
    project,
) -> str:
    commands: list[str] = []

    for index, point in enumerate(geometry):
        latitude = point.get("lat")
        longitude = point.get("lon")

        if latitude is None or longitude is None:
            continue

        x, y = project(longitude, latitude)

        command = "M" if index == 0 else "L"
        commands.append(
            f"{command}{x:.2f},{y:.2f}"
        )

    return " ".join(commands)


def city_position(
    element: dict[str, Any],
) -> tuple[float, float] | None:
    if "lat" in element and "lon" in element:
        return element["lon"], element["lat"]

    centre = element.get("center")

    if centre:
        return centre["lon"], centre["lat"]

    geometry = element.get("geometry", [])

    if geometry:
        longitudes = [
            point["lon"]
            for point in geometry
            if "lon" in point
        ]
        latitudes = [
            point["lat"]
            for point in geometry
            if "lat" in point
        ]

        if longitudes and latitudes:
            return (
                sum(longitudes) / len(longitudes),
                sum(latitudes) / len(latitudes),
            )

    return None


def main() -> None:
    print("Downloading Sri Lanka boundary...")

    natural_earth = download_json(
        NATURAL_EARTH_URL,
    )

    sri_lanka = find_sri_lanka(
        natural_earth,
    )

    rings = extract_rings(
        sri_lanka["geometry"],
    )

    project = create_projection(rings)

    query = f"""
[out:json][timeout:240];
(
  way
    ["highway"~"^(motorway|trunk|primary|secondary)$"]
    ({BBOX});

  nwr
    ["place"~"^(city|town)$"]
    ["name"~"^({CITY_PATTERN})$"]
    ({BBOX});
);
out tags center geom;
"""

    osm_data = query_overpass(query)

    roads: list[str] = []
    cities: dict[str, dict[str, Any]] = {}

    for element in osm_data.get("elements", []):
        tags = element.get("tags", {})

        if tags.get("highway"):
            path = geometry_to_path(
                element.get("geometry", []),
                project,
            )

            if path:
                road_type = tags.get(
                    "highway",
                    "secondary",
                )

                opacity = {
                    "motorway": 0.18,
                    "trunk": 0.16,
                    "primary": 0.12,
                    "secondary": 0.075,
                }.get(road_type, 0.07)

                width = {
                    "motorway": 2.0,
                    "trunk": 1.8,
                    "primary": 1.35,
                    "secondary": 0.85,
                }.get(road_type, 0.8)

                roads.append(
                    f'''    <path
      d="{path}"
      stroke-width="{width}"
      stroke-opacity="{opacity}"
    />'''
                )

        name = tags.get("name")

        if name in CITY_NAMES:
            position = city_position(element)

            if not position:
                continue

            longitude, latitude = position
            x, y = project(longitude, latitude)

            existing = cities.get(name)
            place_type = tags.get("place")

            priority = 2 if place_type == "city" else 1

            if (
                existing is None
                or priority > existing["priority"]
            ):
                cities[name] = {
                    "name": name,
                    "x": round(x, 2),
                    "y": round(y, 2),
                    "priority": priority,
                }

    missing = [
        name
        for name in CITY_NAMES
        if name not in cities
    ]

    if missing:
        raise RuntimeError(
            "Missing OSM city positions: "
            + ", ".join(missing)
        )

    road_svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<!--
  Major Sri Lanka roads from OpenStreetMap.
  Generated by generate-sri-lanka-roads.py.
-->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 {VIEWBOX_WIDTH} {VIEWBOX_HEIGHT}"
  aria-hidden="true"
>
  <g
    fill="none"
    stroke="#1A1A18"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
{chr(10).join(roads)}
  </g>
</svg>
'''

    ordered_cities = [
        cities[name]
        for name in CITY_NAMES
    ]

    city_lines = []

    reveal_values = {
        "Colombo": 0.08,
        "Negombo": 0.2,
        "Galle": 0.32,
        "Hambantota": 0.44,
        "Batticaloa": 0.56,
        "Trincomalee": 0.68,
        "Jaffna": 0.8,
    }

    for city in ordered_cities:
        city_lines.append(
            "  { "
            f'id: "{city["name"].lower()}", '
            f'name: "{city["name"]}", '
            f'x: {city["x"]}, '
            f'y: {city["y"]}, '
            f'reveal: {reveal_values[city["name"]]} '
            "},"
        )

    city_ts = f'''// Generated from OpenStreetMap data.
// Do not edit manually.

export const mapCities = [
{chr(10).join(city_lines)}
] as const;

export const mapConnections = [
  ["Colombo", "Negombo"],
  ["Colombo", "Galle"],
  ["Colombo", "Hambantota"],
  ["Colombo", "Batticaloa"],
  ["Colombo", "Trincomalee"],
  ["Negombo", "Jaffna"],
  ["Negombo", "Trincomalee"],
  ["Galle", "Hambantota"],
  ["Hambantota", "Batticaloa"],
  ["Batticaloa", "Trincomalee"],
  ["Trincomalee", "Jaffna"],
] as const;
'''

    ROAD_OUTPUT.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    CITY_OUTPUT.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    ROAD_OUTPUT.write_text(
        road_svg,
        encoding="utf-8",
    )

    CITY_OUTPUT.write_text(
        city_ts,
        encoding="utf-8",
    )

    print(f"Road paths generated: {len(roads)}")
    print(f"Cities generated: {len(cities)}")
    print(f"Created {ROAD_OUTPUT}")
    print(f"Created {CITY_OUTPUT}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(
            f"Generation failed: {error}",
            file=sys.stderr,
        )
        raise
