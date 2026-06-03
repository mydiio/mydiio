CREATE TABLE public.investor_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  whatsapp_number text NOT NULL,
  fund_or_firm text,
  status text NOT NULL DEFAULT 'new'
);

GRANT INSERT ON public.investor_enquiries TO anon, authenticated;
GRANT ALL ON public.investor_enquiries TO service_role;

ALTER TABLE public.investor_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an investor enquiry"
ON public.investor_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(coalesce(name, '')) BETWEEN 1 AND 200
  AND char_length(coalesce(whatsapp_number, '')) BETWEEN 1 AND 50
  AND char_length(coalesce(fund_or_firm, '')) <= 200
);