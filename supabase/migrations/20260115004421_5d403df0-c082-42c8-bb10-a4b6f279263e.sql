-- Drop the old permissive policies on upload_sessions
DROP POLICY IF EXISTS "Anyone can view upload sessions by token" ON public.upload_sessions;
DROP POLICY IF EXISTS "Anyone can update their upload session" ON public.upload_sessions;

-- Create proper restricted SELECT policy for upload_sessions
-- Users can only see their own sessions OR sessions with matching token header
CREATE POLICY "View own sessions or by token"
ON public.upload_sessions
FOR SELECT
USING (
  auth.uid() = owner_id 
  OR token = current_setting('request.headers', true)::json->>'x-upload-token'
);

-- Create proper UPDATE policy - only owner or matching token can update
CREATE POLICY "Update own sessions or by token"
ON public.upload_sessions
FOR UPDATE
USING (
  auth.uid() = owner_id 
  OR token = current_setting('request.headers', true)::json->>'x-upload-token'
);