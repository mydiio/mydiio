CREATE TABLE public.driver_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  nic_number text NOT NULL,
  date_of_birth date NOT NULL,
  whatsapp_number text NOT NULL,
  alternate_number text,
  home_address text NOT NULL,
  preferred_language text NOT NULL,
  vehicle_registration text NOT NULL,
  vehicle_colour text NOT NULL,
  vehicle_age text NOT NULL,
  vehicle_ownership text NOT NULL,
  licence_number text NOT NULL,
  licence_expiry date NOT NULL,
  driving_experience text NOT NULL,
  operating_zones text[] NOT NULL DEFAULT '{}',
  daily_hours integer NOT NULL,
  driving_days text NOT NULL,
  platform_usage text[] DEFAULT '{}',
  bank_name text NOT NULL,
  account_number text NOT NULL,
  account_holder_name text NOT NULL,
  referral_name text,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  contacted_at timestamptz
);

GRANT INSERT ON public.driver_applications TO anon, authenticated;
GRANT ALL ON public.driver_applications TO service_role;

ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a driver application"
  ON public.driver_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND char_length(full_name) BETWEEN 1 AND 200
    AND char_length(nic_number) BETWEEN 9 AND 20
    AND char_length(whatsapp_number) BETWEEN 1 AND 50
    AND char_length(home_address) BETWEEN 1 AND 1000
    AND char_length(vehicle_registration) BETWEEN 1 AND 50
    AND char_length(licence_number) BETWEEN 1 AND 50
    AND char_length(bank_name) BETWEEN 1 AND 100
    AND char_length(account_number) BETWEEN 1 AND 50
    AND char_length(account_holder_name) BETWEEN 1 AND 200
    AND daily_hours BETWEEN 1 AND 24
  );