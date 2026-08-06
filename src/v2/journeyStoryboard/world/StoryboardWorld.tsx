import type { CSSProperties } from "react";
import { journeyAssets } from "@/assets/journey";
import { environmentComposition as C } from "../environmentComposition";

type LayerProps = {
  src: string;
  style: CSSProperties;
};

function Layer({ src, style }: LayerProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{
        position: "absolute",
        display: "block",
        maxWidth: "none",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    />
  );
}

export function StoryboardWorld() {
  return (
    <div
      aria-hidden="true"
      className="journey-environment"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        isolation: "isolate",
        background: "#090807",
        pointerEvents: "none",
      }}
    >
      <style>{`
        .journey-environment-stage {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform-origin: 50% 54%;
        }

        @media (max-width: 1000px) {
          .journey-environment-stage {
            transform: scale(1.07);
          }
        }

        @media (max-width: 720px) {
          .journey-environment-stage {
            transform: scale(1.22);
          }
        }
      `}</style>

      {/* Deep charcoal atmosphere */}
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              #070706 0%,
              #0b0a09 35%,
              #12100d 68%,
              #17120e 100%
            )
          `,
        }}
      />

      <div className="journey-environment-stage">
        {/* Wide humid city glow */}
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            left: `${(100 - C.horizon.glowWidth) / 2}%`,
            top: `${C.horizon.y - C.horizon.glowHeight / 2}%`,
            width: `${C.horizon.glowWidth}%`,
            height: `${C.horizon.glowHeight}%`,
            background: `
              linear-gradient(
                to bottom,
                transparent 0%,
                rgba(245,166,35,0.015) 18%,
                rgba(202,145,77,0.052) 48%,
                rgba(245,166,35,0.024) 72%,
                transparent 100%
              )
            `,
            filter: "blur(24px)",
          }}
        />

        {/* Distant skyline */}
        <Layer
          src={journeyAssets.environment.distantSkyline}
          style={{
            zIndex: 2,
            left: `${C.skyline.x}%`,
            top: `${C.skyline.y}%`,
            width: `${C.skyline.width}%`,
            height: `${C.skyline.height}%`,
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "translateX(-50%)",
            opacity: C.skyline.opacity,
            filter: `
              brightness(${C.skyline.brightness})
              contrast(0.82)
              blur(0.35px)
            `,
            maskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
          }}
        />

        {/* Skyline haze */}
        <div
          style={{
            position: "absolute",
            zIndex: 3,
            left: "14%",
            right: "14%",
            top: "43%",
            height: "18%",
            background: `
              linear-gradient(
                to bottom,
                rgba(170,130,80,0.012),
                rgba(245,166,35,0.032) 42%,
                rgba(128,96,58,0.014) 72%,
                transparent
              )
            `,
            filter: "blur(18px)",
          }}
        />

        {/* Left architecture */}
        <Layer
          src={journeyAssets.environment.buildingsLeft}
          style={{
            zIndex: 4,
            left: `${C.buildingsLeft.x}%`,
            bottom: `${C.buildingsLeft.bottom}%`,
            width: `${C.buildingsLeft.width}%`,
            height: `${C.buildingsLeft.height}%`,
            objectFit: "contain",
            objectPosition: "left bottom",
            opacity: C.buildingsLeft.opacity,
            filter: `
              brightness(${C.buildingsLeft.brightness})
              contrast(1.03)
            `,
            transform: `
              perspective(1500px)
              rotateY(${C.buildingsLeft.rotateY}deg)
              rotateZ(${C.buildingsLeft.rotateZ}deg)
              skewY(-0.45deg)
            `,
            transformOrigin: "left bottom",
            maskImage: `
              linear-gradient(
                90deg,
                black 0%,
                black 58%,
                rgba(0,0,0,0.78) 74%,
                rgba(0,0,0,0.32) 89%,
                transparent 100%
              )
            `,
            WebkitMaskImage: `
              linear-gradient(
                90deg,
                black 0%,
                black 58%,
                rgba(0,0,0,0.78) 74%,
                rgba(0,0,0,0.32) 89%,
                transparent 100%
              )
            `,
          }}
        />

        {/* Right architecture */}
        <Layer
          src={journeyAssets.environment.buildingsRight}
          style={{
            zIndex: 4,
            right: `${C.buildingsRight.x}%`,
            bottom: `${C.buildingsRight.bottom}%`,
            width: `${C.buildingsRight.width}%`,
            height: `${C.buildingsRight.height}%`,
            objectFit: "contain",
            objectPosition: "right bottom",
            opacity: C.buildingsRight.opacity,
            filter: `
              brightness(${C.buildingsRight.brightness})
              contrast(1.03)
            `,
            transform: `
              perspective(1500px)
              rotateY(${C.buildingsRight.rotateY}deg)
              rotateZ(${C.buildingsRight.rotateZ}deg)
              skewY(0.45deg)
            `,
            transformOrigin: "right bottom",
            maskImage: `
              linear-gradient(
                270deg,
                black 0%,
                black 58%,
                rgba(0,0,0,0.78) 74%,
                rgba(0,0,0,0.32) 89%,
                transparent 100%
              )
            `,
            WebkitMaskImage: `
              linear-gradient(
                270deg,
                black 0%,
                black 58%,
                rgba(0,0,0,0.78) 74%,
                rgba(0,0,0,0.32) 89%,
                transparent 100%
              )
            `,
          }}
        />

        {/* Curved road stage */}
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            left: `${C.road.x}%`,
            bottom: `${C.road.bottom}%`,
            width: `${C.road.width}%`,
            height: `${C.road.height}%`,
            overflow: "hidden",
            transform: "translateX(-50%)",
            maskImage: `
              linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0,0,0,0.18) 7%,
                rgba(0,0,0,0.65) 18%,
                black 33%,
                black 100%
              )
            `,
            WebkitMaskImage: `
              linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0,0,0,0.18) 7%,
                rgba(0,0,0,0.65) 18%,
                black 33%,
                black 100%
              )
            `,
          }}
        >
          <Layer
            src={journeyAssets.environment.curvedRoad}
            style={{
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: `${C.road.objectX}% ${C.road.objectY}%`,
              transform: `rotate(${C.road.rotate}deg)`,
              transformOrigin: "50% 64%",
              opacity: C.road.opacity,
              filter: `
                brightness(${C.road.brightness})
                contrast(1.01)
              `,
            }}
          />
        </div>

        {/* Road structure and pavement depth */}
        <Layer
          src={journeyAssets.environment.curbs}
          style={{
            zIndex: 6,
            left: `${C.curbs.x}%`,
            bottom: `${C.curbs.bottom}%`,
            width: `${C.curbs.width}%`,
            height: `${C.curbs.height}%`,
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "translateX(-50%)",
            opacity: C.curbs.opacity,
            filter: "brightness(0.62)",
          }}
        />

        <Layer
          src={journeyAssets.environment.pavementLines}
          style={{
            zIndex: 7,
            left: `${C.pavement.x}%`,
            bottom: `${C.pavement.bottom}%`,
            width: `${C.pavement.width}%`,
            height: `${C.pavement.height}%`,
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "translateX(-50%)",
            opacity: C.pavement.opacity,
            filter: "brightness(0.7)",
          }}
        />

        <Layer
          src={journeyAssets.environment.crosswalk}
          style={{
            zIndex: 8,
            left: `${C.crosswalk.x}%`,
            bottom: `${C.crosswalk.bottom}%`,
            width: `${C.crosswalk.width}%`,
            height: `${C.crosswalk.height}%`,
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "translateX(-50%)",
            opacity: C.crosswalk.opacity,
            filter: "brightness(0.67)",
          }}
        />

        {/* Midground palms */}
        <Layer
          src={journeyAssets.environment.palmTrees}
          style={{
            zIndex: 9,
            left: `${C.palms.x}%`,
            bottom: `${C.palms.bottom}%`,
            width: `${C.palms.width}%`,
            height: `${C.palms.height}%`,
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "translateX(-50%)",
            opacity: C.palms.opacity,
            filter: `
              brightness(${C.palms.brightness})
              contrast(0.92)
            `,
          }}
        />

        {/* Streetlights establish scale and rhythm */}
        <Layer
          src={journeyAssets.environment.streetlights}
          style={{
            zIndex: 10,
            left: `${C.streetlights.x}%`,
            bottom: `${C.streetlights.bottom}%`,
            width: `${C.streetlights.width}%`,
            height: `${C.streetlights.height}%`,
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "translateX(-50%)",
            opacity: C.streetlights.opacity,
            filter: `
              brightness(${C.streetlights.brightness})
              contrast(0.96)
            `,
          }}
        />

        {/* Restrained foreground street furniture */}
        <div
          style={{
            position: "absolute",
            zIndex: 11,
            inset: 0,
            opacity: C.foregroundDetails.opacity,
            filter: "brightness(0.58)",
          }}
        >
          <Layer
            src={journeyAssets.environment.benches}
            style={{
              left: `${C.foregroundDetails.x}%`,
              bottom: `${C.foregroundDetails.bottom}%`,
              width: `${C.foregroundDetails.width}%`,
              height: `${C.foregroundDetails.height}%`,
              objectFit: "contain",
              objectPosition: "center bottom",
              transform: "translateX(-50%)",
            }}
          />

          <Layer
            src={journeyAssets.environment.bollards}
            style={{
              left: `${C.foregroundDetails.x}%`,
              bottom: `${C.foregroundDetails.bottom}%`,
              width: `${C.foregroundDetails.width}%`,
              height: `${C.foregroundDetails.height}%`,
              objectFit: "contain",
              objectPosition: "center bottom",
              transform: "translateX(-50%)",
            }}
          />

          <Layer
            src={journeyAssets.environment.planters}
            style={{
              left: `${C.foregroundDetails.x}%`,
              bottom: `${C.foregroundDetails.bottom}%`,
              width: `${C.foregroundDetails.width}%`,
              height: `${C.foregroundDetails.height}%`,
              objectFit: "contain",
              objectPosition: "center bottom",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Calm future product corridor */}
        <div
          style={{
            position: "absolute",
            zIndex: 12,
            top: `${C.centreClearance.top}%`,
            bottom: `${C.centreClearance.bottom}%`,
            left: `${(100 - C.centreClearance.width) / 2}%`,
            width: `${C.centreClearance.width}%`,
            background: `
              linear-gradient(
                to bottom,
                transparent,
                rgba(245,166,35,0.006) 35%,
                rgba(245,166,35,0.014) 61%,
                transparent
              )
            `,
          }}
        />
      </div>

      {/* Atmospheric unification */}
      <Layer
        src={journeyAssets.environment.atmosphericGlow}
        style={{
          zIndex: 20,
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.07,
          mixBlendMode: "screen",
        }}
      />

      {/* Cinematic tonal separation */}
      <div
        style={{
          position: "absolute",
          zIndex: 21,
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.32),
              transparent 25%,
              transparent 77%,
              rgba(0,0,0,0.24)
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,0.28),
              transparent 16%,
              transparent 84%,
              rgba(0,0,0,0.28)
            )
          `,
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 22,
          inset: 0,
          boxShadow: `
            inset 0 0 110px 18px rgba(0,0,0,0.47),
            inset 0 -56px 84px rgba(0,0,0,0.17)
          `,
        }}
      />
    </div>
  );
}
