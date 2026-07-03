export function AnnouncementBar() {
 const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
 e.preventDefault();
 const el = document.getElementById("founding-offer");
 if (el) el.scrollIntoView({ behavior: "smooth" });
 };

 return (
 <div
 style={{
 background: "#F5A623",
 borderBottom: "2px solid #1A1A18",
 padding: "10px 32px",
 fontFamily: "'Space Mono', monospace",
 fontSize: 11,
 fontWeight: 700,
 letterSpacing: "0.05em",
 textTransform: "uppercase",
 color: "#1A1A18",
 textAlign: "center",
 width: "100%",
 boxSizing: "border-box",
 position: "relative",
 zIndex: 51,
 lineHeight: 1.4,
 }}
 >
 🛺 Pilot launch open in Colombo, 10 Pioneer spots remaining ·{" "}
 <a
 href="#founding-offer"
 onClick={handleClick}
 style={{
 color: "#1A1A18",
 textDecoration: "underline",
 cursor: "pointer",
 fontWeight: 700,
 }}
 >
 Claim yours →
 </a>
 </div>
 );
}
