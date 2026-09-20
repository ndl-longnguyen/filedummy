-- =========================================================
-- FileDummy Blog Database Schema for Supabase
-- Tables: post_reactions, post_comments
-- Security: Row Level Security (RLS) enabled
-- =========================================================

-- 1. Table: post_reactions
CREATE TABLE IF NOT EXISTS public.post_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'rocket', 'insight', 'fire')),
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

-- Reactions Policies
CREATE POLICY "Public read post reactions"
  ON public.post_reactions
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated or guest insert reactions"
  ON public.post_reactions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to delete their own reactions"
  ON public.post_reactions
  FOR DELETE
  USING (auth.uid()::text = user_id OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');


-- 2. Table: post_comments
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  user_email TEXT,
  content TEXT NOT NULL CHECK (char_length(content) >= 2 AND char_length(content) <= 3000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast comment loading sorted by newest
CREATE INDEX IF NOT EXISTS idx_post_comments_slug_created ON public.post_comments (post_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_comments_user ON public.post_comments (user_id);

-- Enable RLS for post_comments
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Comments Policies
CREATE POLICY "Public read post comments"
  ON public.post_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert comments"
  ON public.post_comments
  FOR INSERT
  WITH CHECK (char_length(content) >= 2);

CREATE POLICY "Allow authors to delete own comments"
  ON public.post_comments
  FOR DELETE
  USING (auth.uid()::text = user_id OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Enable Realtime (optional, can be enabled in Supabase dashboard)
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_comments;
