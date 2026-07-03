import re

with open('src/routes/contact.tsx', 'r') as f:
    content = f.read()

# Fix the mess from previous sed
content = content.replace('tt("nav.contact")Page', 'ContactPage')
content = content.replace('component: ContactPage', 'component: ContactPage') # Correcting whatever happened in Route
content = content.replace('import { usePageMeta, useI18n } from "@/lib/i18n";', 'import { usePageMeta, useI18n } from "@/lib/i18n";')
content = content.replace('usePageMeta({ titleKey: "meta_contact_title", descKey: "meta_contact_desc" });', 'usePageMeta({ titleKey: "meta_contact_title", descKey: "meta_contact_desc" });')

# Restore the file to a clean state first or just perform very specific replacements
# Given the current state, I'll try to do targeted fixes for the broken bits first.

content = re.sub(r'tt\("nav\.contact"\) mydiio', 'Contact mydiio', content)
content = re.sub(r'tt\("contact\.investorCard\.heading"\)with', 'Get in touch with', content)
content = re.sub(r'tt\("nav\.contact"\), mydiio', 'Contact, mydiio', content)
content = content.replace('tt("nav.contact")', 'tt("nav.contact")')

# Reset the whole file's strings if possible? No, I'll just replace carefully now.
# Re-do replacements correctly:

mapping = {
    ">Contact<": ">{{tt('nav.contact')}}<", # Inside span
    ">Let\\'s talk.<": ">{{tt('contact.hero.headline')}}<",
    "Let\\'s talk.": "tt('contact.hero.headline')",
    ">Campaign bookings, driver applications, investor questions, find your path below.<": ">{{tt('contact.hero.subheadline')}}<",
    "Campaign bookings, driver applications, investor questions, find your path below.": "tt('contact.hero.subheadline')",
    "For businesses": "tt('contact.advertiserCard.eyebrow')",
    "Launch a campaign.": "tt('contact.advertiserCard.heading')",
    "From LKR 25,000 a month. First 7 days free. GPS-verified proof every Monday. No agency needed.": "tt('contact.advertiserCard.body')",
    "Takes 2 minutes · No payment now": "tt('contact.advertiserCard.meta')",
    "Apply for a campaign spot →": "tt('contact.advertiserCard.cta')",
    "For tuk-tuk drivers": "tt('contact.driverCard.eyebrow')",
    "Join the network.": "tt('contact.driverCard.heading')",
    "LKR 6,000 base pay every month. Screen installed free. Keep your routes. Payment on the 5th, every month,\n  without fail.": "tt('contact.driverCard.body')",
    "Takes 5 minutes · No deposit now": "tt('contact.driverCard.meta')",
    "Apply to drive →": "tt('contact.driverCard.cta')",
    "Investors and press": "tt('contact.investorCard.eyebrow')",
    "Get in touch.": "tt('contact.investorCard.heading')",
    "Raising a pre-seed round. Strong early traction. Full investor brief available on request.": "tt('contact.investorCard.body')",
    "mydiio pioneer tuk-tuk with amber flag": "{tt('contact.investorCard.pioneerTukAlt')}",
    "Message sent. We\\'ll be in touch within 24 hours.": "tt('contact.investorForm.successMessage')",
    "Something went wrong, please try again.": "tt('contact.investorForm.errorMessage')",
    "Your name": "tt('contact.form.name')",
    "Email": "tt('contact.investorForm.fieldEmail.label')",
    "Fund / Firm": "tt('contact.investorForm.fieldFundFirm.label')",
    "WhatsApp": "tt('contact.investorForm.fieldWhatsapp.label')",
    "Message": "tt('contact.investorForm.fieldMessage.label')",
    "Send message →": "tt('contact.investorForm.submitIdle')",
    "Sending…": "tt('contact.investorForm.submitSending')",
    "General enquiries": "tt('contact.generalCard.eyebrow')",
    "Everything else.": "tt('contact.generalCard.heading')",
    "Partnerships, press, community, or just a question, drop us a message and we\\'ll get back to you.": "tt('contact.generalCard.body')",
    "Phone": "tt('contact.generalForm.fieldPhone.label')",
    "Available now · Sri Lanka time · Typical response under 2 hours": "tt('contact.statusStrip.openText')",
    "We\\'ll respond first thing tomorrow morning · Sri Lanka time": "tt('contact.statusStrip.closedText')",
    "Every application read by a real person · No automated replies": "tt('contact.statusStrip.humanNote')",
    "mydiio · Registered in Sri Lanka · Colombo · 2026": "tt('contact.legalFootnote')",
}

# Fix placeholders
content = content.replace('placeholder="Full name"', 'placeholder={tt("contact.form.name")}')
content = content.replace('placeholder="hello@fund.com"', 'placeholder={tt("contact.investorForm.fieldEmail.placeholder")}')
content = content.replace('placeholder="Optional"', 'placeholder={tt("contact.investorForm.fieldFundFirm.placeholder")}')
content = content.replace('placeholder="+94 77 000 0000"', 'placeholder={tt("contact.investorForm.fieldWhatsapp.placeholder")}')
content = content.replace('placeholder="Tell us what you\'re working on."', 'placeholder={tt("contact.investorForm.fieldMessage.placeholder")}')
content = content.replace('placeholder="hello@company.com"', 'placeholder={tt("contact.generalForm.fieldEmail.placeholder")}')
content = content.replace('placeholder="What can we help with?"', 'placeholder={tt("contact.generalForm.fieldMessage.placeholder")}')

# Since sed already messed it up, some strings might be partially replaced. 
# I'll just write a cleaner version of the component based on original structure.

with open('src/routes/contact.tsx', 'w') as f:
    f.write(content)
