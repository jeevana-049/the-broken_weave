
-- Create a table for search queries to track what users are searching for
CREATE TABLE public.search_queries (
  id BIGSERIAL PRIMARY KEY,
  search_term TEXT NOT NULL,
  age_range TEXT,
  location TEXT,
  category TEXT,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_ip TEXT
);

-- Enable Row Level Security for search queries
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert search queries (for tracking purposes)
CREATE POLICY "Anyone can log search queries" 
  ON public.search_queries 
  FOR INSERT 
  WITH CHECK (true);

-- Policy for admins to view search queries
CREATE POLICY "Admins can view search queries" 
  ON public.search_queries 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = current_setting('app.current_user_id', true)::bigint 
      AND users.is_admin = true
    )
  );

-- Make missing_persons table accessible to everyone for viewing (remove RLS for SELECT)
DROP POLICY IF EXISTS "Users can view missing persons" ON public.missing_persons;

-- Create new policy to allow everyone to view missing persons reports
CREATE POLICY "Anyone can view missing persons reports" 
  ON public.missing_persons 
  FOR SELECT 
  USING (true);
