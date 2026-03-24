
-- Create citizen_reports table
CREATE TABLE public.citizen_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.citizen_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can read reports
CREATE POLICY "Reports are publicly readable"
  ON public.citizen_reports FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert their own reports
CREATE POLICY "Authenticated users can create reports"
  ON public.citizen_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for report media
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('report-media', 'report-media', true, 10485760);

-- Allow authenticated users to upload to report-media bucket
CREATE POLICY "Authenticated users can upload report media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'report-media');

-- Allow public read of report media
CREATE POLICY "Public can view report media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'report-media');
