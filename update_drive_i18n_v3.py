import re

file_path = 'src/routes/drive.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Fix missed ones
content = content.replace('>per month</div>', '>{tt("drive.calculator.perMonth")}</div>')
content = content.replace('>{tt("drive.finalCta.ctaApply")}</a>\n  </SiteShell>', '>{tt("drive.stickyCta.label")}</a>\n  </SiteShell>')

# Check if there are other hardcoded strings that WERE in the doc
# drive.foundingGroup.eyebrow was First 20 drivers only.
# I see it is already replaced in the previous step.

with open(file_path, 'w') as f:
    f.write(content)
