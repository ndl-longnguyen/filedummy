import {
  getSupabaseClient,
  isSupabaseConfigured,
  PostComment,
  UserProfile,
} from "./client";

const CLIENT_ID_KEY = "filedummy_client_id";
const DEV_USER_KEY = "filedummy_dev_user";

export const getOrCreateClientId = (): string => {
  if (typeof window === "undefined") return "server_client";
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = `cid_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(36)}`;
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
};

export const getStoredDevUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEV_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredDevUser = (name: string, email?: string): UserProfile => {
  const profile: UserProfile = {
    id: `dev_${Math.random().toString(36).substring(2, 10)}`,
    name: name.trim(),
    email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    isGuest: false,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(DEV_USER_KEY, JSON.stringify(profile));
  }
  return profile;
};

export const clearStoredDevUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEV_USER_KEY);
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

  return getStoredDevUser();
};

export const signInWithOAuthProvider = async (provider: "github" | "google"): Promise<void> => {
  const client = getSupabaseClient();
  if (!client) {
    // If not configured, auto-login with realistic developer profile for testing
    setStoredDevUser(provider === "github" ? "GitHub Developer" : "Google Developer");
    return;
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
  clearStoredDevUser();
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
};

// -------------------------------------------------------------
// PAGE VIEWS API
// -------------------------------------------------------------

export const recordAndFetchPageView = async (postSlug: string): Promise<number> => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.rpc("increment_page_view", { slug: postSlug });
      if (!error && typeof data === "number") {
        return data;
      }
      // Direct query fallback
      const { data: qData } = await client
        .from("page_views")
        .select("views_count")
        .eq("page_slug", postSlug)
        .single();
      if (qData?.views_count) return qData.views_count;
    } catch (e) {
      console.warn("Supabase page views fallback:", e);
    }
  }

  // Local storage fallback for dev / preview mode
  if (typeof window !== "undefined") {
    try {
      const key = `pv_${postSlug}`;
      const base = 1240 + Math.abs(postSlug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 850);
      const stored = localStorage.getItem(key);
      const count = stored ? parseInt(stored, 10) + 1 : base;
      localStorage.setItem(key, count.toString());
      return count;
    } catch {
      return 1450;
    }
  }
  return 1450;
};

// -------------------------------------------------------------
// LIKE REACTION API (Simplified to Like-Only)
// -------------------------------------------------------------

export interface PostLikeStatus {
  count: number;
  userLiked: boolean;
}

export const fetchPostLikeStatus = async (
  postSlug: string,
  userId?: string
): Promise<PostLikeStatus> => {
  const client = getSupabaseClient();
  const effectiveUserId = userId || getOrCreateClientId();

  if (client) {
    try {
      const { count, error } = await client
        .from("post_reactions")
        .select("id", { count: "exact", head: true })
        .eq("post_slug", postSlug)
        .eq("reaction_type", "like");

      let userLiked = false;
      if (effectiveUserId) {
        const { data: userLike } = await client
          .from("post_reactions")
          .select("id")
          .eq("post_slug", postSlug)
          .eq("reaction_type", "like")
          .eq("user_id", effectiveUserId)
          .maybeSingle();
        userLiked = !!userLike;
      }

      if (!error && typeof count === "number") {
        return { count, userLiked };
      }
    } catch (e) {
      console.warn("Failed to fetch like status from Supabase:", e);
    }
  }

  // Local fallback
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`mock_like_${postSlug}`);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  const defaultCount = 18 + Math.abs(postSlug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 45);
  return { count: defaultCount, userLiked: false };
};

export const togglePostLike = async (
  postSlug: string,
  currentStatus: PostLikeStatus,
  userId?: string
): Promise<PostLikeStatus> => {
  const effectiveUserId = userId || getOrCreateClientId();
  const nextUserLiked = !currentStatus.userLiked;
  const nextCount = Math.max(0, currentStatus.count + (nextUserLiked ? 1 : -1));
  const newStatus: PostLikeStatus = { count: nextCount, userLiked: nextUserLiked };

  const client = getSupabaseClient();
  if (client) {
    try {
      if (nextUserLiked) {
        await client.from("post_reactions").insert({
          post_slug: postSlug,
          reaction_type: "like",
          user_id: effectiveUserId,
        });
      } else {
        await client
          .from("post_reactions")
          .delete()
          .match({ post_slug: postSlug, reaction_type: "like", user_id: effectiveUserId });
      }
      return newStatus;
    } catch (err) {
      console.warn("Error toggling like on Supabase:", err);
    }
  }

  // Local fallback
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`mock_like_${postSlug}`, JSON.stringify(newStatus));
    } catch {
      // ignore
    }
  }

  return newStatus;
};

// -------------------------------------------------------------
// COMMENTS API (Strictly Authenticated, No Guest Form)
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
    id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
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
