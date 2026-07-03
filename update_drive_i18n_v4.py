import re

file_path = 'src/routes/drive.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Fix per month
content = re.sub(r'per month\s*</div>', r'{tt("drive.calculator.perMonth")}</div>', content)

# Fix sticky CTA label
# Find the <a> with id="driver-sticky-cta" and replace its content
content = re.sub(
    r'(<a\s+id="driver-sticky-cta"[^>]*>)\s*\{tt\("drive.finalCta.ctaApply"\)\}\s*(</a>)',
    r'\1{tt("drive.stickyCta.label")}\2',
    content
)

with open(file_path, 'w') as f:
    f.write(content)
