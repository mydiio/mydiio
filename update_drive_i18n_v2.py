import re

file_path = 'src/routes/drive.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Replace multi-line or whitespace-variant strings
replacements = [
    (r'<span className="eyebrow"[^>]*>\s*First 20 drivers only\s*</span>', r'<span className="eyebrow" style={{ textAlign: "center" }}>{tt("drive.foundingGroup.eyebrow")}</span>'),
    (r'<h2 className="reveal font-display"[^>]*>\s*Be a founding driver.\s*</h2>', r'<h2 className="reveal font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: C.ink, textAlign: "center", lineHeight: 1.5, marginTop: 0, letterSpacing: 0 }}>{tt("drive.foundingGroup.headline")}</h2>'),
    (r'<h2 className="reveal reveal-up font-display"[^>]*>\s*Your portal. Everything visible.\s*</h2>', r'<h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>{tt("drive.portal.headline")}</h2>'),
    (r'>\s*PREVIEW\s*</div>', r'>{tt("drive.portal.previewBadge")}</div>'),
    (r'>\s*DRIVER PORTAL\s*</div>', r'>{tt("drive.portal.portalLabel")}</div>'),
    (r'>\s*This month · Base \+ Route Bonus\s*</div>', r'>{tt("drive.portal.thisMonthLabel")}</div>'),
    (r'>\s*PAYMENT HISTORY\s*</div>', r'>{tt("drive.portal.paymentHistoryLabel")}</div>'),
    (r'<h2 className="reveal reveal-up font-display"[^>]*>\s*Everything you need to know\s*</h2>', r'<h2 className="reveal reveal-up font-display" style={{ fontSize: "clamp(28px, 3.6vw, 40px)", color: C.ink, textAlign: "center", lineHeight: 1.1 }}>{tt("drive.faq.headline")}</h2>'),
    (r'<span className="reveal eyebrow"[^>]*>\s*Colombo · Pilot launch · 2026\s*</span>', r'<span className="reveal eyebrow" style={{ textAlign: "center" }}>{tt("drive.finalCta.eyebrow")}</span>'),
    (r'<h2 className="reveal font-display"[^>]*>\s*Join Sri Lanka\'s first connected passenger information network.\s*</h2>', r'<h2 className="reveal font-display" style={{ fontSize: "clamp(16px, 1.6vw, 18px)", fontWeight: 500, color: "#fff", lineHeight: 1.5, marginTop: 0, letterSpacing: 0, maxWidth: 880, marginInline: "auto" }}>{tt("drive.finalCta.headline")}</h2>'),
    (r'<p className="reveal"[^>]*>\s*Free screen installation. LKR 6,000 to 8,000 every month. Paid on the 5th, without fail.\s*</p>', r'<p className="reveal" style={{ fontFamily: "\'DM Sans\', Nunito, sans-serif", fontWeight: 600, fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.78)", marginTop: 18, maxWidth: 620, marginInline: "auto", lineHeight: 1.5 }}>{tt("drive.finalCta.body")}</p>'),
    (r'>\s*Apply to drive →\s*</a>', r'>{tt("drive.finalCta.ctaApply")}</a>'), # This might match several
    (r'>\s*Get in touch →\s*</a>', r'>{tt("drive.finalCta.ctaContact")}</a>'),
    (r'alt="mydiio tuk-tuk fleet on busy Colombo street with Sinhala shop signs"', r'alt={tt("home.coverage.fleetImg.alt")}'),
    (r'>\s*Apply to drive →\s*\n\s*</a>', r'>{tt("drive.stickyCta.label")}\n  </a>'), # Sticky CTA
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Check for the ones that were missed in the first pass
# Sticky CTA specifically
content = content.replace('Apply to drive →\n  </a>', '{tt("drive.stickyCta.label")}\n  </a>')

with open(file_path, 'w') as f:
    f.write(content)
