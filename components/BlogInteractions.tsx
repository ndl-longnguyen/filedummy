"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Heart,
  Rocket,
  Lightbulb,
  Flame,
  Send,
  Trash2,
  LogIn,
  LogOut,
  User,
  Sparkles,
  Info,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import {
  PostComment,
  PostReactionsSummary,
  ReactionType,
  UserProfile,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import {
  fetchPostReactions,
  togglePostReaction,
  fetchPostComments,
  addPostComment,
  deletePostComment,
  getCurrentUserProfile,
  setStoredGuestUser,
  signOutUser,
  signInWithOAuthProvider,
} from "@/lib/supabase/api";

interface BlogInteractionsProps {
  postSlug: string;
  locale?: Locale;
}

const REACTION_CONFIG: Array<{
  type: ReactionType;
  emoji: string;
  icon: typeof ThumbsUp;
  color: string;
  bgActive: string;
}> = [
  { type: "like", emoji: "👍", icon: ThumbsUp, color: "text-blue-400", bgActive: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { type: "love", emoji: "❤️", icon: Heart, color: "text-rose-400", bgActive: "bg-rose-500/20 border-rose-500/40 text-rose-300" },
  { type: "rocket", emoji: "🚀", icon: Rocket, color: "text-emerald-400", bgActive: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
  { type: "insight", emoji: "💡", icon: Lightbulb, color: "text-amber-400", bgActive: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
  { type: "fire", emoji: "🔥", icon: Flame, color: "text-orange-400", bgActive: "bg-orange-500/20 border-orange-500/40 text-orange-300" },
];

export function BlogInteractions({ postSlug, locale = "en" }: BlogInteractionsProps) {
  const dict = getDictionary(locale);
  const t = dict.interactions;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [reactions, setReactions] = useState<PostReactionsSummary>({
    like: 0,
    love: 0,
    rocket: 0,
    insight: 0,
    fire: 0,
    userReactions: { like: false, love: false, rocket: false, insight: false, fire: false },
  });
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const supabaseReady = isSupabaseConfigured();

  // Load initial data
  useEffect(() => {
    let isMounted = true;

    async function init() {
      const currentUser = await getCurrentUserProfile();
      if (isMounted) setUser(currentUser);

      const [loadedReactions, loadedComments] = await Promise.all([
        fetchPostReactions(postSlug, currentUser?.id),
        fetchPostComments(postSlug),
      ]);

      if (isMounted) {
        setReactions(loadedReactions);
        setComments(loadedComments);
        setHasLoaded(true);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  // Handle Reaction Click
  const handleReactionClick = async (type: ReactionType) => {
    let currentUser = user;
    if (!currentUser) {
      // Auto-assign a random guest identifier so user doesn't face friction just to react
      currentUser = setStoredGuestUser("Developer Guest");
      setUser(currentUser);
    }

    const updated = await togglePostReaction(postSlug, type, currentUser, reactions);
    setReactions(updated);
  };

  // Handle Guest Login
  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    const profile = setStoredGuestUser(guestName);
    setUser(profile);
    setGuestName("");
    setShowLoginModal(false);
  };

  // Handle OAuth Login
  const handleOAuthLogin = async (provider: "github" | "google") => {
    if (!supabaseReady) {
      // If not configured, auto-login with mock profile
      const profile = setStoredGuestUser(
        provider === "github" ? "GitHub Developer" : "Google Developer"
      );
      setUser(profile);
      setShowLoginModal(false);
      return;
    }
    try {
      await signInWithOAuthProvider(provider);
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  // Handle Post Comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await addPostComment(postSlug, user, newComment);
      setComments((prev) => [created, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Comment submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Comment
  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;
    await deletePostComment(postSlug, commentId, user.id);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const formatCommentDate = (isoDate: string) => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoDate;
    }
  };

  return (
    <section className="mt-14 pt-10 border-t border-slate-800/80 space-y-10">
      {/* Fallback Preview Mode Notice (Only shown if Supabase keys not set) */}
      {!supabaseReady && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs">
          <Info className="w-4 h-4 flex-shrink-0 text-blue-400" />
          <span>{t.previewModeNotice}</span>
        </div>
      )}

      {/* 1. REACTIONS BAR */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {t.reactionsTitle}
          </h3>
          <p className="text-xs text-slate-400">{t.reactionsSubtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {REACTION_CONFIG.map(({ type, emoji, icon: Icon, color, bgActive }) => {
            const count = reactions[type] || 0;
            const isActive = !!reactions.userReactions[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleReactionClick(type)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? bgActive
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                }`}
              >
                <span className="text-base group-hover:scale-110 transition-transform">{emoji}</span>
                <span className="capitalize">{t[type]}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. COMMENTS SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              {t.commentsTitle} ({comments.length})
            </h3>
            <p className="text-xs text-slate-400">{t.commentsSubtitle}</p>
          </div>

          {/* User Status Badge or Quick Login Trigger */}
          {user ? (
            <div className="flex items-center gap-3 p-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">{t.loggedInAs}</span>
                <strong className="text-white font-medium truncate max-w-[120px]">
                  {user.name}
                </strong>
                {user.isGuest && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    Guest
                  </span>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                title={t.signOut}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition-all self-start sm:self-auto"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.quickLoginTitle}</span>
            </button>
          )}
        </div>

        {/* Comment Input Box */}
        <form onSubmit={handleCommentSubmit} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? t.leaveCommentPlaceholder : t.loginToComment}
            rows={3}
            maxLength={3000}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all resize-y"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">
              {newComment.length}/3000
            </span>

            <div className="flex items-center gap-2">
              {!user && (
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="text-xs text-blue-400 hover:underline font-medium"
                >
                  {t.quickLoginTitle}
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20 disabled:shadow-none"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? t.submitting : t.submitComment}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3 pt-2">
          {comments.length === 0 && (
            <div className="p-8 rounded-2xl border border-slate-800/60 bg-slate-900/30 text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">{t.noCommentsYet}</p>
            </div>
          )}

          {comments.map((comment) => {
            const isOwnComment = user && user.id === comment.user_id;
            return (
              <div
                key={comment.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2 hover:border-slate-700/80 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                      {comment.user_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs sm:text-sm font-semibold text-white">
                          {comment.user_name}
                        </strong>
                        {comment.user_name.includes("Nguyen Dai Long") && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                            Author
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {formatCommentDate(comment.created_at)}
                      </span>
                    </div>
                  </div>

                  {isOwnComment && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
                      title={t.deleteComment}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="pl-11 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  {t.quickLoginTitle}
                </h4>
                <p className="text-xs text-slate-400">{t.quickLoginDesc}</p>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* 1-Click OAuth Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleOAuthLogin("github")}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>{t.signInWithGithub}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.6 7.4C.6 9.4 0 10.6 0 12c0 1.4.6 2.6 1.6 4.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 16.6C3.5 20.4 7.4 23 12 23z"
                  />
                </svg>
                <span>{t.signInWithGoogle}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase tracking-wider">
                {t.orJoinAsGuest}
              </span>
            </div>

            {/* Guest Form */}
            <form onSubmit={handleGuestLogin} className="space-y-3">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={t.guestNamePlaceholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                maxLength={40}
              />
              <button
                type="submit"
                disabled={!guestName.trim()}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold transition-colors"
              >
                {t.joinGuestBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
