CREATE TABLE public.general_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new'
);

GRANT INSERT ON public.general_enquiries TO anon, authenticated;
GRANT ALL ON public.general_enquiries TO service_role;

ALTER TABLE public.general_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a general enquiry"
  ON public.general_enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND char_length(COALESCE(name, '')) BETWEEN 1 AND 200
    AND char_length(COALESCE(phone, '')) BETWEEN 1 AND 50
    AND char_length(COALESCE(message, '')) BETWEEN 1 AND 4000
  );