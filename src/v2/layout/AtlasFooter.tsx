import { colors } from "@/design";

const PRIMARY_LINKS = [
  ["Advertise", "/advertise"],
  ["Drive", "/drive"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const LEGAL_LINKS = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
] as const;

export function AtlasFooter() {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingTop: "32px",
        paddingInline: "clamp(24px, 5vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        borderTop: "1px solid var(--atlas-border-light)",
        background: colors.cream,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
          gap: "24px",
          alignItems: "end",
        }}
      >
        <div
          aria-label="mydiio"
          style={{
            display: "inline-flex",
            color: colors.ink,
            fontSize: "24px",
            fontWeight: 750,
            letterSpacing: "-0.055em",
          }}
        >
          <span>myd</span>
          <span style={{ color: colors.amber }}>ii</span>
          <span>o</span>
        </div>

        <nav
          aria-label="Footer"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "22px",
          }}
        >
          {PRIMARY_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                color: "rgba(26,26,24,0.58)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 600,
                transition: "color 200ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div
          aria-label="© 2026 mydiio"
          style={{
            justifySelf: "end",
            color: "rgba(26,26,24,0.42)",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          © 2026 myd
          <span style={{ color: colors.amberDeep }}>ii</span>o
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          paddingTop: "16px",
          borderTop: "1px solid rgba(26,26,24,0.06)",
        }}
      >
        <nav
          aria-label="Legal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          {LEGAL_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                color: "rgba(26,26,24,0.42)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                transition: "color 200ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <span
          style={{
            color: "rgba(26,26,24,0.32)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Every journey, connected.
        </span>
      </div>
    </footer>
  );
}
