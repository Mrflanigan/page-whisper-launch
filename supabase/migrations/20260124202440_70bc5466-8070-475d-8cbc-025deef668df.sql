-- Create inquiries table to track quote submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  move_from TEXT,
  move_to TEXT,
  move_date TEXT,
  details TEXT,
  has_truck BOOLEAN DEFAULT false,
  truck_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading via edge function (service role)
-- No public SELECT policy - data stays private