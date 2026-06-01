CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'website',
  sender_type TEXT NOT NULL DEFAULT 'prospect',
  user_id UUID NULL,
  sender_contact TEXT NULL,
  sender_name TEXT NULL,
  subject TEXT NULL,
  message TEXT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  assigned_to UUID NULL
);

GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_id IS NULL
    AND status = 'new'
    AND source = 'website'
    AND sender_type = 'prospect'
    AND assigned_to IS NULL
    AND char_length(coalesce(sender_name, '')) <= 200
    AND char_length(coalesce(sender_contact, '')) <= 200
    AND char_length(coalesce(subject, '')) <= 300
    AND char_length(coalesce(message, '')) <= 4000
  );

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX idx_enquiries_status ON public.enquiries (status);