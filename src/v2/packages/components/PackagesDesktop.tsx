import { colors } from "@/design";
import { packageTiers, type PackageTier } from "../packageData";
import { PackageCard } from "./PackageCard";

type PackagesSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function range(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function HeroPackage({
  tier,
  index,
  progress,
}: {
  tier: PackageTier;
  index: number;
  progress: number;
}) {
  const featured = tier.featured === true;
  const entrance = easeOutCubic(range(progress, 0, 0.3));
  const exit = easeInOutCubic(range(progress, 0.72, 1));

  return (
    <article
      className="atlas-package-motion"
      style={{
        position: "absolute",
        inset: 0,
        width: "min(760px, 72vw)",
        minHeight: "390px",
        margin: "auto",
        padding: "clamp(34px, 4vw, 54px)",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: "34px",
        background: featured
          ? "linear-gradient(150deg, #171714 0%, #171714 64%, #4b3518 100%)"
          : "rgba(255,255,255,0.94)",
        color: featured ? colors.cream : colors.ink,
        border: featured ? "1px solid rgba(245,166,35,0.42)" : "1px solid rgba(26,26,24,0.07)",
        boxShadow: featured
          ? "0 48px 120px -56px rgba(0,0,0,0.78)"
          : "0 42px 100px -58px rgba(26,26,24,0.34)",
        opacity: entrance * (1 - exit),
        transform: `translateY(${
          (1 - entrance) * 54 - exit * 42
        }px) scale(${0.92 + entrance * 0.08 - exit * 0.05})`,
        transformOrigin: "center",
        pointerEvents: "none",
        willChange: "opacity, transform",
      }}
    >
      {featured ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-16%",
            bottom: "-42%",
            width: "72%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.24), transparent 68%)",
            pointerEvents: "none",
          }}
        />
      ) : null}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "18px",
          }}
        >
          <span
            style={{
              color: featured ? colors.amber : colors.amberDeep,
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            {String(index + 1).padStart(2, "0")} / 04
          </span>

          {tier.emphasis ? (
            <span
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background: featured ? "rgba(245,166,35,0.15)" : "rgba(245,166,35,0.1)",
                color: colors.amber,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {tier.emphasis}
            </span>
          ) : null}
        </div>

        <div
          style={{
            marginTop: "clamp(46px, 6vh, 74px)",
            color: featured ? "rgba(253,250,243,0.5)" : "rgba(26,26,24,0.48)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {tier.eyebrow}
        </div>

        <h3
          style={{
            margin: "12px 0 0",
            fontSize: "clamp(58px, 7vw, 102px)",
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "-0.07em",
          }}
        >
          {tier.name}
        </h3>

        <p
          style={{
            margin: "22px 0 0",
            maxWidth: "39ch",
            color: featured ? "rgba(253,250,243,0.64)" : "rgba(26,26,24,0.58)",
            fontSize: "clamp(15px, 1.15vw, 18px)",
            lineHeight: 1.5,
          }}
        >
          {tier.description}
        </p>

        <div
          style={{
            marginTop: "22px",
            color: featured ? colors.amber : colors.ink,
            fontSize: "clamp(20px,1.7vw,26px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {tier.price}
        </div>

        <div
          style={{
            display: "grid",
            marginTop: "22px",
            borderTop: `1px solid ${featured ? "rgba(253,250,243,0.12)" : "rgba(26,26,24,0.08)"}`,
          }}
        >
          {tier.specs.map((spec) => (
            <div
              key={spec.label}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "18px",
                padding: "14px 0",
                borderBottom: `1px solid ${
                  featured ? "rgba(253,250,243,0.08)" : "rgba(26,26,24,0.06)"
                }`,
              }}
            >
              <div
                style={{
                  color: featured ? "rgba(253,250,243,0.45)" : "rgba(26,26,24,0.42)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {spec.label}
              </div>

              <div
                style={{
                  textAlign: "right",
                  color: featured ? "rgba(253,250,243,0.92)" : colors.ink,
                  fontSize: "14px",
                  fontWeight: 650,
                  lineHeight: 1.35,
                }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "28px",
            borderTop: `1px solid ${featured ? "rgba(253,250,243,0.12)" : "rgba(26,26,24,0.08)"}`,
            color: featured ? colors.amber : colors.ink,
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {tier.scale}
        </div>
      </div>
    </article>
  );
}

export function PackagesDesktop({ progress }: PackagesSceneProps) {
  const safeProgress = clamp(progress);

  const openingIn = easeOutCubic(range(safeProgress, 0.01, 0.11));
  const openingOut = easeInOutCubic(range(safeProgress, 0.15, 0.23));

  const packageProgress = range(safeProgress, 0.18, 0.72);
  const stagePosition = packageProgress * packageTiers.length;

  const activeIndex = Math.min(packageTiers.length - 1, Math.floor(stagePosition));

  const localProgress = clamp(stagePosition - activeIndex);

  const overviewIn = easeOutCubic(range(safeProgress, 0.75, 0.83));
  const overviewOut = easeInOutCubic(range(safeProgress, 0.87, 0.92));

  const keynoteIn = easeOutCubic(range(safeProgress, 0.92, 0.97));
  const ctaIn = easeOutCubic(range(safeProgress, 0.965, 1));

  const activeTier = packageTiers[activeIndex];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 1100px) {
          .atlas-package-overview {
            width: calc(100% - 56px) !important;
            gap: 12px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-package-motion {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <header
        className="atlas-package-motion"
        style={{
          position: "absolute",
          zIndex: 20,
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "80px 36px 48px",
          boxSizing: "border-box",
          textAlign: "center",
          opacity: openingIn * (1 - openingOut),
          transform: `translateY(${
            (1 - openingIn) * 34 - openingOut * 28
          }px) scale(${0.97 + openingIn * 0.03})`,
          pointerEvents: "none",
        }}
      >
        <div>
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Campaigns
          </div>

          <h2
            style={{
              margin: "18px auto 0",
              maxWidth: "11ch",
              fontSize: "clamp(62px, 7.5vw, 112px)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-0.072em",
            }}
          >
            One network.
            <br />
            Four ways to grow.
          </h2>

          <p
            style={{
              margin: "24px auto 0",
              maxWidth: "48ch",
              color: "rgba(26,26,24,0.58)",
              fontSize: "clamp(16px, 1.25vw, 20px)",
              lineHeight: 1.5,
            }}
          >
            Whether you're testing your first campaign or scaling across Colombo, there's a path
            built for your brand.
          </p>

          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            Campaigns from LKR 25,000 a month
          </div>
        </div>
      </header>

      <div
        style={{
          position: "absolute",
          zIndex: 10,
          inset: "74px 36px 52px",
        }}
      >
        <HeroPackage
          key={activeTier.id}
          tier={activeTier}
          index={activeIndex}
          progress={localProgress}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 58px)",
            gap: "8px",
            transform: "translateX(-50%)",
            opacity: 1 - overviewIn,
          }}
        >
          {packageTiers.map((tier, index) => {
            const complete = index < activeIndex;
            const active = index === activeIndex;

            return (
              <div
                key={tier.id}
                style={{
                  height: "3px",
                  overflow: "hidden",
                  borderRadius: "999px",
                  background: "rgba(26,26,24,0.09)",
                }}
              >
                <div
                  style={{
                    width: complete ? "100%" : active ? `${localProgress * 100}%` : "0%",
                    height: "100%",
                    borderRadius: "inherit",
                    background: colors.amber,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="atlas-package-overview atlas-package-motion"
        style={{
          position: "absolute",
          zIndex: 22,
          left: "50%",
          top: "50%",
          width: "min(1380px, calc(100% - 96px))",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "18px",
          opacity: overviewIn * (1 - overviewOut),
          transform: `translate(-50%, -50%) translateY(${
            (1 - overviewIn) * 34 - overviewOut * 24
          }px) scale(${0.96 + overviewIn * 0.04 - overviewOut * 0.035})`,
          pointerEvents: overviewIn > 0.95 && overviewOut < 0.1 ? "auto" : "none",
        }}
      >
        {packageTiers.map((tier) => (
          <PackageCard key={tier.id} tier={tier} active={false} complete={false} settled />
        ))}
      </div>

      <div
        className="atlas-package-motion"
        style={{
          position: "absolute",
          zIndex: 30,
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "72px 36px 48px",
          boxSizing: "border-box",
          textAlign: "center",
          opacity: keynoteIn,
          transform: `translateY(${(1 - keynoteIn) * 30}vh) scale(${0.92 + keynoteIn * 0.08})`,
          pointerEvents: keynoteIn > 0.9 ? "auto" : "none",
        }}
      >
        <div>
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Built for every stage
          </div>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: "14ch",
              fontSize: "clamp(58px, 7.1vw, 108px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.068em",
            }}
          >
            Start with one campaign.
            <br />
            Grow from there.
          </p>

          <div
            style={{
              marginTop: "30px",
              opacity: ctaIn,
              transform: `translateY(${(1 - ctaIn) * 12}px)`,
            }}
          >
            <a
              href="/advertise"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50px",
                padding: "0 24px",
                borderRadius: "999px",
                background: colors.ink,
                color: colors.cream,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Build your campaign
            </a>

            <div
              style={{
                marginTop: "14px",
                color: "rgba(26,26,24,0.5)",
                fontSize: "13px",
              }}
            >
              Every package includes GPS-verified reporting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
