import re

file_path = 'src/routes/drive.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Add useI18n to components
components = [
    'Hero', 'EarningsCalculator', 'DriverEarnings', 'HowItWorks', 
    'Installation', 'FoundingGroup', 'DriverPortal', 'FAQ', 'FinalCTA', 'DrivePage'
]

for comp in components:
    # Find the function definition and insert const { tt } = useI18n();
    # This handles both function Hero() { and const DrivePage = () => { if any
    pattern = rf'(function {comp}\([^)]*\)\s*{{|const {comp} = \([^)]*\) =>\s*{{)'
    replacement = r'\1\n  const { tt } = useI18n();'
    content = re.sub(pattern, replacement, content)

# Specific replacements for Hero
content = content.replace('label: "per month max"', 'label: tt("drive.hero.stats.perMonthMax")')
content = content.replace('label: "per year"', 'label: tt("drive.hero.stats.perYear")')
content = content.replace('label: "installation time"', 'label: tt("drive.hero.stats.installationTime")')
content = content.replace('label: "cost to join"', 'label: tt("drive.hero.stats.costToJoin")')
content = content.replace('For drivers', '{tt("drive.hero.label")}')
content = content.replace('Drivers earn more every month.', '{tt("drive.hero.headline")}')
content = content.replace('Join our network and get paid through ad revenue. Your tuk-tuk earns while you drive your normal routes.', '{tt("drive.hero.body")}')
content = content.replace('Join as Driver →', '{tt("drive.hero.ctaJoinDriver")}') # This appears twice, once in Hero and once in DriverEarnings

# EarningsCalculator
content = content.replace('>Earnings calculator</span>', '>{tt("drive.calculator.eyebrow")}</span>')
content = content.replace('>See exactly what you could earn.</h2>', '>{tt("drive.calculator.headline")}</h2>')
content = content.replace('Earnings calculator · based on your hours', '{tt("drive.calculator.cardHeader")}')
content = content.replace('>per month</div>', '>{tt("drive.calculator.perMonth")}</div>')
content = content.replace('>/ year</span>', '>{tt("drive.calculator.perYear")}</span>')
content = content.replace('>Hours per day</span>', '>{tt("drive.calculator.sliderLabel")}</span>')
content = content.replace('aria-label="Hours driven per day"', 'aria-label={tt("drive.calculator.sliderAriaLabel")}')
content = content.replace('Base pay: LKR 6,000. Route bonus: LKR 2,000 (8+ hours/day).', '{tt("drive.calculator.footnote")}')
content = content.replace('✓ PAYMENT ON THE 5TH · EVERY MONTH · BANK TRANSFER · NO EXCEPTIONS', '{tt("drive.calculator.paymentBadge")}')
content = content.replace('Group A Founding Partners: {groupARemaining} of 10 spots remaining', '{tt("drive.calculator.spotsRemaining").replace("{groupARemaining}", String(groupARemaining))}')

# DriverEarnings
content = content.replace('>Driver earnings</span>', '>{tt("drive.earnings.eyebrow")}</span>')
content = content.replace('const badges = ["Fast payments", "Verified drivers", "Monthly bonuses"];', 'const badges = [tt("drive.earnings.badges.fastPayments"), tt("drive.earnings.badges.verifiedDrivers"), tt("drive.earnings.badges.monthlyBonuses")];')

# HowItWorks
content = content.replace('>How it works</span>', '>{tt("drive.howItWorks.eyebrow")}</span>')
content = content.replace('>Four steps. That\'s the whole thing.</h2>', '>{tt("drive.howItWorks.headline")}</h2>')
content = content.replace(
    'title: "Get in touch", body: "Apply through our website or reach out directly. We reply within 24 hours."',
    'title: tt("drive.howItWorks.step1.title"), body: tt("drive.howItWorks.step1.body")'
)
content = content.replace(
    'title: "We install for free", body: "We fit a small screen in your tuk at no cost to you. It takes about an hour and is powered by your vehicle."',
    'title: tt("drive.howItWorks.step2.title"), body: tt("drive.howItWorks.step2.body")'
)
content = content.replace(
    'title: "You drive normally", body: "Same routes, same hours. The screen runs automatically. You do not need to do anything differently."',
    'title: tt("drive.howItWorks.step3.title"), body: tt("drive.howItWorks.step3.body")'
)
content = content.replace(
    'title: "Money arrives on the 5th", body: "Every month, your earnings are paid directly to your bank account on the 5th. Without exception."',
    'title: tt("drive.howItWorks.step4.title"), body: tt("drive.howItWorks.step4.body")'
)

# Installation
content = content.replace('>Installation</span>', '>{tt("drive.installation.eyebrow")}</span>')
content = content.replace('>We install it. You drive.</h3>', '>{tt("drive.installation.headline")}</h3>')
content = content.replace('>One hour. No cost to you. Powered by your vehicle\'s existing electrics. You won\'t notice it\'s there, but your passengers will.</p>', '>{tt("drive.installation.body")}</p>')
content = content.replace(
    '["✓ Installed at our cost", "✓ Replaced free if damaged", "✓ Removed free if you leave"]',
    '[tt("drive.installation.bullet1"), tt("drive.installation.bullet2"), tt("drive.installation.bullet3")]'
)
content = content.replace('alt="Hands fitting a tablet screen into the roof frame of a tuk-tuk on a Colombo street"', 'alt={tt("drive.installation.imgAlt1")}')
content = content.replace('alt="Installed tuk-tuk screen displaying an amber and cream advertisement on a Colombo street"', 'alt={tt("drive.installation.imgAlt2")}')

# FoundingGroup
content = content.replace('>First 20 drivers only</span>', '>{tt("drive.foundingGroup.eyebrow")}</span>')
content = content.replace('>Be a founding driver.</h2>', '>{tt("drive.foundingGroup.headline")}</h2>')
content = content.replace('{groupARemaining} OF {GROUP_A_TOTAL} SPOTS REMAINING', '{tt("drive.foundingGroup.spotsRemainingBadge").replace("{groupARemaining}", String(groupARemaining)).replace("{GROUP_A_TOTAL}", String(GROUP_A_TOTAL))}')
content = content.replace(
    '"Group A (drivers 1 to 10), LKR 5,000 loyalty bonus at Month 3, putting you ahead of what you paid to join",',
    'tt("drive.foundingGroup.item1"),'
)
content = content.replace(
    '"Group B (drivers 11 to 20), LKR 3,000 loyalty bonus at Month 3",',
    'tt("drive.foundingGroup.item2"),'
)
content = content.replace(
    '"Limited-edition amber founding partner shirt, only 10 will ever exist",',
    'tt("drive.foundingGroup.item3"),'
)
content = content.replace(
    '"Branded merchandise every 6 months, polo shirt, umbrella, phone holder, fuel card",',
    'tt("drive.foundingGroup.item4"),'
)
content = content.replace('Standard partners (after Group A closes): LKR 5,000 deposit, no loyalty bonus, standard rate.', '{tt("drive.foundingGroup.standardNote")}')

# DriverPortal
content = content.replace('>Your portal. Everything visible.</h2>', '>{tt("drive.portal.headline")}</h2>')
content = content.replace('>PREVIEW</div>', '>{tt("drive.portal.previewBadge")}</div>')
content = content.replace('>DRIVER PORTAL</div>', '>{tt("drive.portal.portalLabel")}</div>')
content = content.replace('>This month · Base + Route Bonus</div>', '>{tt("drive.portal.thisMonthLabel")}</div>')
content = content.replace('>PAYMENT HISTORY</div>', '>{tt("drive.portal.paymentHistoryLabel")}</div>')
content = content.replace('>YOUR REFERRAL CODE</div>', '>{tt("drive.portal.referralCodeLabel")}</div>')
content = content.replace('Earn LKR 1,500 per driver who joins and stays 30 days.', '{tt("drive.portal.referralBody")}')
content = content.replace('You receive full portal access when installation is confirmed.', '{tt("drive.portal.accessNote")}')

# FAQ
content = content.replace('>Everything you need to know</h2>', '>{tt("drive.faq.headline")}</h2>')
# Mapping FAQ items
faq_mapping = {
    'How long is the commitment?': 'drive.faq.q1.question',
    'We ask for a minimum 12-month agreement. If you exit before 6 months, your deposit is forfeited. If you exit between 6 and 12 months, 50% of your deposit is returned. The full deposit is returned only after 12 months of continuous participation. Founding drivers receive a loyalty bonus at Month 3 that puts them ahead of what they paid to join.': 'drive.faq.q1.answer',
    'What if I want to stop early?': 'drive.faq.q2.question',
    'If you leave before 6 months, your deposit is forfeited. If you leave between 6 and 12 months, half the deposit is returned. After 12 months, you are free to leave with your full deposit returned.': 'drive.faq.q2.answer',
    'What powers the screen?': 'drive.faq.q3.question',
    'The screen runs off your vehicle\'s existing power supply. An auto-electrician installs it in about an hour. There are no batteries to charge and nothing extra to do.': 'drive.faq.q3.answer',
    'What if the screen breaks or is damaged?': 'drive.faq.q4.question',
    'Normal wear is covered. We handle repairs and replacements at no cost to you. The screen belongs to mydiio, you are hosting it, not responsible for it.': 'drive.faq.q4.answer',
    'Can I refer other drivers?': 'drive.faq.q5.question',
    'Yes. You earn LKR 1,500 for every driver you refer who successfully installs a screen and stays active for 30 days. There is no limit on how many drivers you can refer.': 'drive.faq.q5.answer',
    'When exactly do I get paid?': 'drive.faq.q6.question',
    'On the 5th of every calendar month, by bank transfer. This is a firm commitment, not \'around the 5th\' or \'within the first week\'. The 5th. Every month.': 'drive.faq.q6.answer'
}
for k, v in faq_mapping.items():
    content = content.replace(f'q: "{k}"', f'q: tt("{v}")')
    content = content.replace(f'a: "{k}"', f'a: tt("{v}")')

# FinalCTA
content = content.replace('>Colombo · Pilot launch · 2026</span>', '>{tt("drive.finalCta.eyebrow")}</span>')
content = content.replace('>Join Sri Lanka\'s first connected passenger information network.</h2>', '>{tt("drive.finalCta.headline")}</h2>')
content = content.replace('>Free screen installation. LKR 6,000 to 8,000 every month. Paid on the 5th, without fail.</p>', '>{tt("drive.finalCta.body")}</p>')
content = content.replace('>Apply to drive →</a>', '>{tt("drive.finalCta.ctaApply")}</a>')
content = content.replace('>Get in touch →</a>', '>{tt("drive.finalCta.ctaContact")}</a>')
content = content.replace('alt="A line of mydiio tuk-tuks at sunset in Colombo"', 'alt={tt("drive.finalCta.imgAlt")}')

# Sticky CTA in DrivePage
content = content.replace('>Apply to drive →\n  </a>', '>{tt("drive.stickyCta.label")}\n  </a>')

# Shared
content = content.replace('alt="mydiio tuk-tuk driver in green polo shirt driving through Colombo streets"', 'alt={tt("home.whyItWorks.driverImg.alt")}') # It was mentioned in home.whyItWorks.driverImg.alt as well but let's check drive.tsx
# In drive.tsx Hero it is:
# alt="mydiio tuk-tuk driver in green polo shirt driving through Colombo streets"
# The instructions for drive.tsx don't specify an alt key for Hero, but let's see.
# Ah, the instructions say "Replace every entry" from the section "## src/routes/drive.tsx".
# Let me re-read "## src/routes/drive.tsx" section.

with open(file_path, 'w') as f:
    f.write(content)
