
-- Create success_stories table
CREATE TABLE public.success_stories (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'reunion',
  is_published BOOLEAN DEFAULT false,
  created_by BIGINT REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for success_stories
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to view published success stories
CREATE POLICY "Anyone can view published success stories" 
  ON public.success_stories 
  FOR SELECT 
  USING (is_published = true);

-- Policy for admins to manage success stories
CREATE POLICY "Admins can manage success stories" 
  ON public.success_stories 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = current_setting('app.current_user_id', true)::bigint 
      AND users.is_admin = true
    )
  );

-- Create notifications table for admin alerts
CREATE TABLE public.admin_notifications (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'login', 'report', 'donation', 'volunteer', 'registration'
  user_id BIGINT REFERENCES public.users(id),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for admin_notifications
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Policy for admins to view notifications
CREATE POLICY "Admins can view notifications" 
  ON public.admin_notifications 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = current_setting('app.current_user_id', true)::bigint 
      AND users.is_admin = true
    )
  );
