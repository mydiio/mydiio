import liveJourney from "./screen_01.webp";
import gpsVerified from "./screen_02.webp";
import mondayReport from "./screen_03.webp";
import liveJourney640 from "./screen_01-640.webp";
import liveJourney960 from "./screen_01-960.webp";
import gpsVerified640 from "./screen_02-640.webp";
import gpsVerified960 from "./screen_02-960.webp";
import mondayReport640 from "./screen_03-640.webp";
import mondayReport960 from "./screen_03-960.webp";

export const journeyScreenAssets = {
  liveJourney,
  gpsVerified,
  mondayReport,
  liveJourneySrcSet: `${liveJourney640} 640w, ${liveJourney960} 960w, ${liveJourney} 1440w`,
  gpsVerifiedSrcSet: `${gpsVerified640} 640w, ${gpsVerified960} 960w, ${gpsVerified} 1440w`,
  mondayReportSrcSet: `${mondayReport640} 640w, ${mondayReport960} 960w, ${mondayReport} 1440w`,
} as const;
