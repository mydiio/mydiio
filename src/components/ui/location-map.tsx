"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  className?: string;
  /** Override the pin colour so the same component reads in light, dark or amber scheme. */
  pinColor?: string;
  /** Override the road / grid stroke colour. */
  strokeColor?: string;
  /** Toggle the grid background that shows behind the map when collapsed. */
  showGrid?: boolean;
}

export function LocationMap({
  location = "Colombo, Sri Lanka",
  coordinates = "6.9271° N, 79.8612° E",
  className,
  pinColor = "#22c55e",
  strokeColor = "rgba(26, 26, 24, 0.28)",
  showGrid = true,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`Map of ${location}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          background: "#fdfaf3",
          borderColor: "rgba(26, 26, 24, 0.10)",
        }}
        animate={{
          width: isExpanded ? "min(360px, 90vw)" : "min(240px, 60vw)",
          height: isExpanded ? "min(280px, 50vh)" : 140,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Subtle gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(232, 146, 10, 0.06), rgba(253, 250, 243, 0.10) 60%, rgba(26, 26, 24, 0.04))",
          }}
        />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#fdfaf3",
                  borderRadius: "1rem",
                }}
              />

              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.line
                  x1="0%"
                  y1="35%"
                  x2="100%"
                  y2="35%"
                  stroke={strokeColor}
                  strokeWidth={4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.line
                  x1="0%"
                  y1="65%"
                  x2="100%"
                  y2="65%"
                  stroke={strokeColor}
                  strokeWidth={4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />

                <motion.line
                  x1="30%"
                  y1="0%"
                  x2="30%"
                  y2="100%"
                  stroke={strokeColor}
                  strokeOpacity={0.75}
                  strokeWidth={3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.line
                  x1="70%"
                  y1="0%"
                  x2="70%"
                  y2="100%"
                  stroke={strokeColor}
                  strokeOpacity={0.75}
                  strokeWidth={3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />

                {[20, 50, 80].map((y, i) => (
                  <motion.line
                    key={`h-${i}`}
                    x1="0%"
                    y1={`${y}%`}
                    x2="100%"
                    y2={`${y}%`}
                    stroke={strokeColor}
                    strokeOpacity={0.35}
                    strokeWidth={1.5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line
                    key={`v-${i}`}
                    x1={`${x}%`}
                    y1="0%"
                    x2={`${x}%`}
                    y2="100%"
                    stroke={strokeColor}
                    strokeOpacity={0.35}
                    strokeWidth={1.5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </svg>

              <motion.div
                className="border-muted-foreground/20 absolute top-[40%] left-[10%] h-[20%] w-[15%] rounded-sm border"
                style={{ background: "rgba(232, 146, 10, 0.18)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <motion.div
                className="border-muted-foreground/15 absolute top-[15%] left-[35%] h-[15%] w-[12%] rounded-sm border"
                style={{ background: "rgba(232, 146, 10, 0.12)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              <motion.div
                className="border-muted-foreground/15 absolute top-[70%] left-[75%] h-[18%] w-[18%] rounded-sm border"
                style={{ background: "rgba(232, 146, 10, 0.14)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
              <motion.div
                className="border-muted-foreground/12 absolute top-[20%] right-[10%] h-[25%] w-[10%] rounded-sm border"
                style={{ background: "rgba(232, 146, 10, 0.10)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              />
              <motion.div
                className="border-muted-foreground/10 absolute top-[55%] left-[5%] h-[12%] w-[8%] rounded-sm border"
                style={{ background: "rgba(232, 146, 10, 0.08)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.65 }}
              />
              <motion.div
                className="border-muted-foreground/12 absolute top-[8%] left-[75%] h-[10%] w-[14%] rounded-sm border"
                style={{ background: "rgba(232, 146, 10, 0.10)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 }}
              />

              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    filter: `drop-shadow(0 0 10px ${pinColor}80)`,
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill={pinColor}
                  />
                  <circle cx="12" cy="9" r="2.5" fill="#fdfaf3" />
                </svg>
              </motion.div>

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(253, 250, 243, 1), rgba(253, 250, 243, 0))",
                  opacity: 0.6,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid pattern — only when collapsed */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: showGrid && !isExpanded ? 0.05 : 0,
          }}
          animate={{ opacity: showGrid && !isExpanded ? 0.05 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="location-map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(26, 26, 24, 0.55)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#location-map-grid)" />
          </svg>
        </motion.div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ position: "relative" }}
            >
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  filter: isHovered
                    ? `drop-shadow(0 0 8px ${pinColor}80)`
                    : `drop-shadow(0 0 4px ${pinColor}40)`,
                }}
                transition={{ duration: 0.3 }}
                style={{ color: pinColor }}
                aria-hidden="true"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </motion.svg>
            </motion.div>

            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(26, 26, 24, 0.06)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: pinColor,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(26, 26, 24, 0.62)",
                }}
              >
                Live
              </span>
            </motion.div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <motion.h3
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#1a1a18",
              }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontFamily: '"SF Mono", ui-monospace, "JetBrains Mono", Menlo, monospace',
                    color: "rgba(26, 26, 24, 0.55)",
                  }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: isHovered || isExpanded ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                height: 1,
                background: `linear-gradient(to right, ${pinColor}80, transparent)`,
                transformOrigin: "left",
              }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          bottom: -22,
          left: "50%",
          transform: "translateX(-50%)",
          margin: 0,
          fontSize: 10,
          whiteSpace: "nowrap",
          color: "rgba(26, 26, 24, 0.55)",
        }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  );
}
