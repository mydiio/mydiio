import atmosphericGlow from "./environment/atmospheric-glow.png";
import benches from "./environment/benches.png";
import bollards from "./environment/bollards.png";
import buildingsLeft from "./environment/buildings-left.png";
import buildingsRight from "./environment/buildings-right.png";
import crosswalk from "./environment/crosswalk.png";
import curvedRoad from "./environment/curved-road.png";
import curbs from "./environment/curbs.png";
import distantSkyline from "./environment/distant-skyline.png";
import palmTrees from "./environment/palm-trees.png";
import pavementLines from "./environment/pavement-lines.png";
import planters from "./environment/planters.png";
import streetlights from "./environment/streetlights.png";

import journeyRouteAnimatedReference from "./gps/journey-route-animated-reference.png";
import journeyRoute from "./gps/journey-route.png";
import locationMarker from "./gps/location-marker.png";
import pulseRings from "./gps/pulse-rings.png";
import verificationBadge from "./gps/verification-badge.png";

import batteryIcon from "./icons/battery.png";
import clockIcon from "./icons/clock.png";
import connectionIcon from "./icons/connection.png";
import gpsIcon from "./icons/gps.png";
import journeyIcon from "./icons/journey.png";
import locationIcon from "./icons/location.png";
import signalIcon from "./icons/signal.png";
import verificationIcon from "./icons/verification.png";

import osBackground from "./tablet/os-background.png";
import tabletHardware from "./tablet/tablet-hardware.webp";
import tabletHardware768 from "./tablet/tablet-hardware-768.webp";
import tabletHardware1280 from "./tablet/tablet-hardware-1280.webp";

import contentCard from "./ui/content-card.png";
import journeyRecord from "./ui/journey-record.png";
import mondayReport from "./ui/monday-report.png";

export const journeyAssets = {
  environment: {
    atmosphericGlow,
    benches,
    bollards,
    buildingsLeft,
    buildingsRight,
    crosswalk,
    curvedRoad,
    curbs,
    distantSkyline,
    palmTrees,
    pavementLines,
    planters,
    streetlights,
  },

  tablet: {
    hardware: tabletHardware,
    hardwareSrcSet: `${tabletHardware768} 768w, ${tabletHardware1280} 1280w, ${tabletHardware} 1920w`,
    osBackground,
  },

  gps: {
    journeyRoute,
    journeyRouteAnimatedReference,
    locationMarker,
    pulseRings,
    verificationBadge,
  },

  ui: {
    contentCard,
    journeyRecord,
    mondayReport,
  },

  icons: {
    battery: batteryIcon,
    clock: clockIcon,
    connection: connectionIcon,
    gps: gpsIcon,
    journey: journeyIcon,
    location: locationIcon,
    signal: signalIcon,
    verification: verificationIcon,
  },
} as const;
