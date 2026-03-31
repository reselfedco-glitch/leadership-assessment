-- Create assessment_results table to store all assessment submissions
CREATE TABLE IF NOT EXISTS public.assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  leadership_score INTEGER NOT NULL,
  block_scores JSONB NOT NULL,
  top_blocks TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (assessment is public)
CREATE POLICY "allow_insert" 
  ON public.assessment_results 
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to select (we'll protect admin dashboard with auth)
CREATE POLICY "allow_select" 
  ON public.assessment_results 
  FOR SELECT 
  USING (true);
