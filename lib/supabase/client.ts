import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type ReactionType = "like" | "love" | "rocket" | "insight" | "fire";

export interface PostComment {
  id: string;
  post_slug: string;
  user_id: string;
  user_name: string;
  user_avatar?: string | null;
  user_email?: string | null;
  content: string;
  created_at: string;
  is_approved?: boolean;
  is_admin?: boolean;
}

export interface PostReactionsSummary {
  like: number;
  love: number;
  rocket: number;
  insight: number;
  fire: number;
  userReactions: Record<ReactionType, boolean>;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;
  email?: string;
  isGuest?: boolean;
  role?: "admin" | "user";
}

export const ADMIN_EMAILS = [
  "ndl.long.nguyendai@gmail.com",
  "admin@filedummy.com",
  "ndlong.site@gmail.com",
];

export const isUserAdmin = (user: UserProfile | null): boolean => {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.email && ADMIN_EMAILS.some((e) => e.toLowerCase() === user.email?.toLowerCase())) {
    return true;
  }
  const name = user.name.toLowerCase();
  if (name.includes("nguyễn đại long") || name.includes("nguyen dai long") || name === "admin") {
    return true;
  }
  return false;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === "string" &&
    supabaseUrl.startsWith("http") &&
    typeof supabaseAnonKey === "string" &&
    supabaseAnonKey.length > 20 &&
    !supabaseUrl.includes("your-project-id")
  );
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance && supabaseUrl && supabaseAnonKey) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
};
