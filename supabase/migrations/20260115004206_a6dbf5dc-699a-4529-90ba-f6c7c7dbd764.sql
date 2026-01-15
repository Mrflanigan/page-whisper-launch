-- Fix RLS policies for business_sites table
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view business sites" ON public.business_sites;
DROP POLICY IF EXISTS "Anyone can create business sites" ON public.business_sites;
DROP POLICY IF EXISTS "Anyone can update business sites" ON public.business_sites;

-- Allow public read access for published business sites (this is intentional for a public website)
CREATE POLICY "Public can view business sites"
ON public.business_sites
FOR SELECT
USING (true);

-- Restrict insert/update to authenticated users who created the site
-- Since there's no user_id column, we need to add one first
ALTER TABLE public.business_sites ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

-- For now, allow any authenticated user to create sites (they become the owner)
CREATE POLICY "Authenticated users can create business sites"
ON public.business_sites
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- Only site owners can update their sites
CREATE POLICY "Owners can update their business sites"
ON public.business_sites
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Only site owners can delete their sites
CREATE POLICY "Owners can delete their business sites"
ON public.business_sites
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- Fix RLS policies for upload_sessions table
DROP POLICY IF EXISTS "Anyone can view upload sessions" ON public.upload_sessions;
DROP POLICY IF EXISTS "Anyone can create upload sessions" ON public.upload_sessions;
DROP POLICY IF EXISTS "Anyone can update upload sessions" ON public.upload_sessions;

-- Add owner_id column to track who created the session
ALTER TABLE public.upload_sessions ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

-- Only the session creator can view their upload sessions
CREATE POLICY "Users can view their own upload sessions"
ON public.upload_sessions
FOR SELECT
USING (
  -- Allow viewing by owner OR by matching token (for mobile upload flow)
  auth.uid() = owner_id OR token = current_setting('request.headers', true)::json->>'x-upload-token'
);

-- Authenticated users can create upload sessions
CREATE POLICY "Authenticated users can create upload sessions"
ON public.upload_sessions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- Only session owners can update their sessions
CREATE POLICY "Users can update their own upload sessions"
ON public.upload_sessions
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Only session owners can delete their sessions
CREATE POLICY "Users can delete their own upload sessions"
ON public.upload_sessions
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);