
-- Create or update missing_persons table with all required fields
CREATE TABLE IF NOT EXISTS public.missing_persons (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE,
  category TEXT DEFAULT 'unknown',
  last_known_location TEXT,
  contact_info TEXT,
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'missing',
  is_reunited BOOLEAN DEFAULT FALSE,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create or update volunteers table
CREATE TABLE IF NOT EXISTS public.volunteers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  skills TEXT,
  availability TEXT,
  message TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create or update users table for authentication
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  password TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donations/contact table for donation inquiries
CREATE TABLE IF NOT EXISTS public.donations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.missing_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public service)
CREATE POLICY "Anyone can view missing persons" ON public.missing_persons FOR SELECT USING (true);
CREATE POLICY "Anyone can report missing persons" ON public.missing_persons FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view volunteers" ON public.volunteers FOR SELECT USING (true);
CREATE POLICY "Anyone can register as volunteer" ON public.volunteers FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Anyone can register" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view donations" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Anyone can submit donation inquiry" ON public.donations FOR INSERT WITH CHECK (true);
