-- Drop the overly permissive policies that allow anyone to create/update sites
DROP POLICY IF EXISTS "Anyone can create a site" ON public.business_sites;
DROP POLICY IF EXISTS "Anyone can update sites" ON public.business_sites;

-- Add token expiration check to upload_sessions policies
DROP POLICY IF EXISTS "Users can access sessions via token" ON public.upload_sessions;

CREATE POLICY "Users can access non-expired sessions via token"
ON public.upload_sessions
FOR SELECT
USING (
  token = coalesce(current_setting('request.headers', true)::json->>'x-upload-token', '')
  AND expires_at > now()
);

-- Also update the update policy to check expiration
DROP POLICY IF EXISTS "Users can update sessions via token" ON public.upload_sessions;

CREATE POLICY "Users can update non-expired sessions via token"
ON public.upload_sessions
FOR UPDATE
USING (
  token = coalesce(current_setting('request.headers', true)::json->>'x-upload-token', '')
  AND expires_at > now()
);