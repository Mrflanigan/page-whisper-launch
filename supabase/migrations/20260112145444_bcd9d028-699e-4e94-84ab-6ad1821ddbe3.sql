-- Create upload sessions table for phone-to-desktop uploads
CREATE TABLE public.upload_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  site_id UUID REFERENCES public.business_sites(id) ON DELETE CASCADE,
  upload_type TEXT NOT NULL DEFAULT 'video',
  uploaded_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour')
);

-- Enable RLS
ALTER TABLE public.upload_sessions ENABLE ROW LEVEL SECURITY;

-- Public access for upload sessions (needed for phone uploads without auth)
CREATE POLICY "Anyone can create upload sessions"
ON public.upload_sessions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view upload sessions by token"
ON public.upload_sessions
FOR SELECT
USING (true);

CREATE POLICY "Anyone can update their upload session"
ON public.upload_sessions
FOR UPDATE
USING (true);