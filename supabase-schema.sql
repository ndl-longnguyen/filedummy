-- =========================================================
-- FileDummy Blog Database Schema for Supabase
-- Tables: page_views, post_reactions, post_comments
-- Security: Row Level Security (RLS) enabled
-- =========================================================

-- 1. Table: page_views (Page Views Analytics)
CREATE TABLE IF NOT EXISTS public.page_views (
  page_slug TEXT PRIMARY KEY,
  views_count BIGINT DEFAULT 1 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for page_views
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read page views"
  ON public.page_views
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public update/insert page views"
  ON public.page_views
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Atomic increment function for page views
CREATE OR REPLACE FUNCTION increment_page_view(slug TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_views BIGINT;
BEGIN
  INSERT INTO public.page_views (page_slug, views_count, updated_at)
  VALUES (slug, 1, timezone('utc'::text, now()))
  ON CONFLICT (page_slug)
  DO UPDATE SET
    views_count = public.page_views.views_count + 1,
    updated_at = timezone('utc'::text, now())
  RETURNING views_count INTO current_views;
  RETURN current_views;
END;
$$;


-- 2. Table: post_reactions (Likes)
CREATE TABLE IF NOT EXISTS public.post_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  reaction_type TEXT DEFAULT 'like' NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_post_reaction UNIQUE (post_slug, user_id, reaction_type)
);

-- Index for fast counts per post
CREATE INDEX IF NOT EXISTS idx_post_reactions_slug ON public.post_reactions (post_slug);
CREATE INDEX IF NOT EXISTS idx_post_reactions_user ON public.post_reactions (user_id);

-- Enable RLS for post_reactions
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read post reactions"
  ON public.post_reactions
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert reactions"
  ON public.post_reactions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to delete their own reactions"
  ON public.post_reactions
  FOR DELETE
  USING (auth.uid()::text = user_id OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');


-- 3. Table: post_comments (Authenticated Comments with Admin Moderation)
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  user_email TEXT,
  content TEXT NOT NULL CHECK (char_length(content) >= 2 AND char_length(content) <= 3000),
  is_approved BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast comment loading sorted by newest
CREATE INDEX IF NOT EXISTS idx_post_comments_slug_created ON public.post_comments (post_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_comments_user ON public.post_comments (user_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_approved ON public.post_comments (is_approved);

-- Enable RLS for post_comments
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Public can read approved comments (or users can read their own pending comment, or admin can read all)
CREATE POLICY "Public read post comments"
  ON public.post_comments
  FOR SELECT
  USING (
    is_approved = true 
    OR auth.uid()::text = user_id 
    OR auth.jwt()->>'email' IN ('ndl.long.nguyendai@gmail.com', 'admin@filedummy.com')
  );

CREATE POLICY "Allow authenticated insert comments"
  ON public.post_comments
  FOR INSERT
  WITH CHECK (char_length(content) >= 2);

-- Allow users to delete their own comments, or admin to delete any comment
CREATE POLICY "Allow delete comments"
  ON public.post_comments
  FOR DELETE
  USING (
    auth.uid()::text = user_id 
    OR user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    OR auth.jwt()->>'email' IN ('ndl.long.nguyendai@gmail.com', 'admin@filedummy.com')
  );

-- Admin can approve / update comments
CREATE POLICY "Allow admin approve comments"
  ON public.post_comments
  FOR UPDATE
  USING (auth.jwt()->>'email' IN ('ndl.long.nguyendai@gmail.com', 'admin@filedummy.com'))
  WITH CHECK (auth.jwt()->>'email' IN ('ndl.long.nguyendai@gmail.com', 'admin@filedummy.com'));

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_comments;
