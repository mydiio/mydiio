CREATE TABLE public.advertiser_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  whatsapp_number text NOT NULL,
  business_type text NOT NULL,
  zones_selected text[] NOT NULL DEFAULT '{}',
  tier_interest text,
  has_creative boolean,
  campaign_goals text[] NOT NULL DEFAULT '{}',
  budget_range text,
  referral_source text,
  status text NOT NULL DEFAULT 'new',
  CONSTRAINT advertiser_applications_business_name_len CHECK (char_length(business_name) BETWEEN 1 AND 200),
  CONSTRAINT advertiser_applications_contact_name_len CHECK (char_length(contact_name) BETWEEN 1 AND 200),
  CONSTRAINT advertiser_applications_whatsapp_len CHECK (char_length(whatsapp_number) BETWEEN 4 AND 40),
  CONSTRAINT advertiser_applications_business_type_len CHECK (char_length(business_type) BETWEEN 1 AND 80),
  CONSTRAINT advertiser_applications_tier_len CHECK (tier_interest IS NULL OR char_length(tier_interest) <= 40),
  CONSTRAINT advertiser_applications_budget_len CHECK (budget_range IS NULL OR char_length(budget_range) <= 80),
  CONSTRAINT advertiser_applications_referral_len CHECK (referral_source IS NULL OR char_length(referral_source) <= 80),
  CONSTRAINT advertiser_applications_status_values CHECK (status IN ('new','in_review','contacted','converted','closed')),
  CONSTRAINT advertiser_applications_zones_count CHECK (array_length(zones_selected, 1) IS NULL OR array_length(zones_selected, 1) <= 20),
  CONSTRAINT advertiser_applications_goals_count CHECK (array_length(campaign_goals, 1) IS NULL OR array_length(campaign_goals, 1) <= 10)
);

-- Public app only submits; no read/update/delete from anon/authenticated.
GRANT INSERT ON public.advertiser_applications TO anon;
GRANT INSERT ON public.advertiser_applications TO authenticated;
GRANT ALL ON public.advertiser_applications TO service_role;

ALTER TABLE public.advertiser_applications ENABLE ROW LEVEL SECURITY;

-- Anyone may submit a new application, but only with status 'new'.
CREATE POLICY "Anyone can submit an advertiser application"
ON public.advertiser_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');

CREATE INDEX idx_advertiser_applications_created_at
  ON public.advertiser_applications (created_at DESC);
