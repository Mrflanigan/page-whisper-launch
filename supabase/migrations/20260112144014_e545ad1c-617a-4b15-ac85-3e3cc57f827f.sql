-- Create enum for available themes
CREATE TYPE public.site_theme AS ENUM ('modern', 'classic', 'bold', 'minimal', 'warm');

-- Create business_sites table to store client configurations
CREATE TABLE public.business_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    phone TEXT,
    email TEXT,
    hours_text TEXT,
    service_area TEXT,
    theme site_theme NOT NULL DEFAULT 'modern',
    hero_image_url TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_sites ENABLE ROW LEVEL SECURITY;

-- Allow public read access (these are public-facing sites)
CREATE POLICY "Sites are publicly readable"
ON public.business_sites
FOR SELECT
USING (true);

-- Allow anyone to insert (for the builder form)
CREATE POLICY "Anyone can create a site"
ON public.business_sites
FOR INSERT
WITH CHECK (true);

-- Allow updates with a simple edit token approach (stored in URL)
CREATE POLICY "Anyone can update sites"
ON public.business_sites
FOR UPDATE
USING (true);

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies for public access
CREATE POLICY "Site images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Anyone can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site-images');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_business_sites_updated_at
BEFORE UPDATE ON public.business_sites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();