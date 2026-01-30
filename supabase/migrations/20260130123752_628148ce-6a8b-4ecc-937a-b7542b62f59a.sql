-- Fix: Add SELECT policy to protect customer inquiries from being read publicly
-- Only allow INSERT (for form submissions) - no one should be able to read the data via the API

-- First, let's see what policies exist and add a restrictive SELECT policy
-- This ensures the data can only be accessed via direct database access (admin), not via the public API

CREATE POLICY "No public read access to inquiries"
ON public.inquiries
FOR SELECT
USING (false);

-- Note: The existing INSERT policy allows public form submissions, which is correct.
-- But SELECT should be blocked to protect customer data from being harvested.