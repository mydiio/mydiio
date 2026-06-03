-- Add columns needed for the new /advertise/apply form.
-- Existing form (AdvertiserApplication) uses campaign_goals (array) and other nullable fields;
-- new columns are added as nullable to preserve compatibility with existing inserts.
ALTER TABLE public.advertiser_applications
  ADD COLUMN IF NOT EXISTS campaign_goal text,
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz;