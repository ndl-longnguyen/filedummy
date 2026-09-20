import {
  getSupabaseClient,
  isSupabaseConfigured,
  PostComment,
  PostReactionsSummary,
  ReactionType,
  UserProfile,
} from "./client";

const GUEST_USER_KEY = "filedummy_guest_user";

export const getStoredGuestUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(GUEST_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredGuestUser = (name: string): UserProfile => {
  const profile: UserProfile = {
    id: `guest_${Math.random().toString(36).substring(2, 10)}`,
    name: name.trim(),
    isGuest: true,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(GUEST_USER_KEY, JSON.stringify(profile));
  }
  return profile;
};

export const clearStoredGuestUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(GUEST_USER_KEY);
  }
};

export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const client = getSupabaseClient();
  if (client) {
    const { data: { user } } = await client.auth.getUser();
    if (user) {
      return {
        id: user.id,
        name:
          user.user_metadata?.full_name ||
          user.user_metadata?.user_name ||
          user.email?.split("@")[0] ||
          "Developer",
        avatar_url: user.user_metadata?.avatar_url,
        email: user.email,
        isGuest: false,
      };
    }
  }

  return getStoredGuestUser();
};

export const signInWithOAuthProvider = async (provider: "github" | "google"): Promise<void> => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and ANON_KEY in .env.local.");
  }

  const { error } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: typeof window !== "undefined" ? window.location.href : undefined,
    },
  });

  if (error) throw error;
};

export const signOutUser = async (): Promise<void> => {
  clearStoredGuestUser();
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
};

// -------------------------------------------------------------
// REACTIONS API
// -------------------------------------------------------------

const DEFAULT_REACTIONS: PostReactionsSummary = {
  like: 12,
  love: 8,
  rocket: 15,
  insight: 9,
  fire: 14,
  userReactions: {
    like: false,
    love: false,
    rocket: false,
    insight: false,
    fire: false,
  },
};

export const fetchPostReactions = async (
  postSlug: string,
  currentUserId?: string
): Promise<PostReactionsSummary> => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("post_reactions")
        .select("reaction_type, user_id")
        .eq("post_slug", postSlug);

      if (!error && data) {
        const summary: PostReactionsSummary = {
          like: 0,
          love: 0,
          rocket: 0,
          insight: 0,
          fire: 0,
          userReactions: {
            like: false,
            love: false,
            rocket: false,
            insight: false,
            fire: false,
          },
        };

        data.forEach((row) => {
          const type = row.reaction_type as ReactionType;
          if (summary[type] !== undefined) {
            summary[type]++;
          }
          if (currentUserId && row.user_id === currentUserId) {
            summary.userReactions[type] = true;
          }
        });

        return summary;
      }
    } catch (e) {
      console.warn("Failed to fetch reactions from Supabase, using local fallback", e);
    }
  }

  // Fallback / Preview Mode
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`mock_reactions_${postSlug}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_REACTIONS;
};

export const togglePostReaction = async (
  postSlug: string,
  type: ReactionType,
  user: UserProfile,
  currentSummary: PostReactionsSummary
): Promise<PostReactionsSummary> => {
  const isCurrentlyActive = !!currentSummary.userReactions[type];
  const newSummary: PostReactionsSummary = {
    ...currentSummary,
    [type]: Math.max(0, currentSummary[type] + (isCurrentlyActive ? -1 : 1)),
    userReactions: {
      ...currentSummary.userReactions,
      [type]: !isCurrentlyActive,
    },
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      if (isCurrentlyActive) {
        await client
          .from("post_reactions")
          .delete()
          .match({ post_slug: postSlug, reaction_type: type, user_id: user.id });
      } else {
        await client.from("post_reactions").insert({
          post_slug: postSlug,
          reaction_type: type,
          user_id: user.id,
          user_name: user.name,
        });
      }
      return newSummary;
    } catch (err) {
      console.warn("Error persisting reaction to Supabase:", err);
    }
  }

  // Local fallback storage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`mock_reactions_${postSlug}`, JSON.stringify(newSummary));
    } catch {
      // ignore
    }
  }

  return newSummary;
};

// -------------------------------------------------------------
// COMMENTS API
// -------------------------------------------------------------

const INITIAL_MOCK_COMMENTS: Record<string, PostComment[]> = {
  default: [
    {
      id: "mock_c1",
      post_slug: "default",
      user_id: "dev_alex",
      user_name: "Alex Rivera",
      user_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
      content:
        "Great technical breakdown! Tested this in our Node.js and AWS S3 staging pipeline. The boundary chunk sizes matched perfectly.",
      created_at: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    },
    {
      id: "mock_c2",
      post_slug: "default",
      user_id: "dev_minh",
      user_name: "Minh Tran (QA Lead)",
      user_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Minh",
      content:
        "Rất hữu ích cho đội ngũ QA khi test multipart form và boundary limits. Tệp sạch và không bị timeout khi benchmark mạng.",
      created_at: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    },
  ],
};

export const fetchPostComments = async (postSlug: string): Promise<PostComment[]> => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("post_comments")
        .select("*")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as PostComment[];
      }
    } catch (e) {
      console.warn("Failed to fetch comments from Supabase, using local fallback", e);
    }
  }

  // Fallback / Preview Mode
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`mock_comments_${postSlug}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
  }

  return INITIAL_MOCK_COMMENTS.default.map((c) => ({ ...c, post_slug: postSlug }));
};

export const addPostComment = async (
  postSlug: string,
  user: UserProfile,
  content: string
): Promise<PostComment> => {
  const newComment: PostComment = {
    id: `c_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    post_slug: postSlug,
    user_id: user.id,
    user_name: user.name,
    user_avatar: user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`,
    user_email: user.email,
    content: content.trim(),
    created_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("post_comments")
        .insert({
          post_slug: postSlug,
          user_id: user.id,
          user_name: user.name,
          user_avatar: newComment.user_avatar,
          user_email: user.email,
          content: newComment.content,
        })
        .select()
        .single();

      if (!error && data) {
        return data as PostComment;
      }
    } catch (e) {
      console.warn("Error inserting comment to Supabase, falling back to local storage:", e);
    }
  }

  // Local fallback storage
  if (typeof window !== "undefined") {
    try {
      const existing = await fetchPostComments(postSlug);
      const updated = [newComment, ...existing];
      localStorage.setItem(`mock_comments_${postSlug}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  return newComment;
};

export const deletePostComment = async (
  postSlug: string,
  commentId: string,
  userId: string
): Promise<void> => {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from("post_comments").delete().match({ id: commentId, user_id: userId });
    } catch (e) {
      console.warn("Error deleting comment from Supabase:", e);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const existing = await fetchPostComments(postSlug);
      const updated = existing.filter((c) => c.id !== commentId);
      localStorage.setItem(`mock_comments_${postSlug}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
};
