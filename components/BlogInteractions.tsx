"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Send,
  Trash2,
  LogIn,
  LogOut,
  User,
  Info,
  Check,
  ShieldCheck,
  Clock,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import {
  PostComment,
  UserProfile,
  isSupabaseConfigured,
  isUserAdmin,
} from "@/lib/supabase/client";
import {
  fetchPostLikeStatus,
  togglePostLike,
  fetchPostComments,
  addPostComment,
  approvePostComment,
  deletePostComment,
  getCurrentUserProfile,
  signOutUser,
  signInWithOAuthProvider,
  setStoredDevUser,
  setStoredDevAdmin,
  PostLikeStatus,
} from "@/lib/supabase/api";

interface BlogInteractionsProps {
  postSlug: string;
  locale?: Locale;
}

export function BlogInteractions({ postSlug, locale = "en" }: BlogInteractionsProps) {
  const dict = getDictionary(locale);
  const t = dict.interactions;
  const isVi = locale === "vi";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [likeStatus, setLikeStatus] = useState<PostLikeStatus>({ count: 24, userLiked: false });
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminFilter, setAdminFilter] = useState<"all" | "pending" | "approved">("all");

  const supabaseReady = isSupabaseConfigured();
  const isAdmin = isUserAdmin(user);

  // Load initial user, likes, comments
  useEffect(() => {
    let isMounted = true;

    async function init() {
      const currentUser = await getCurrentUserProfile();
      if (isMounted) setUser(currentUser);

      const isCurrentAdmin = isUserAdmin(currentUser);
      const [loadedLike, loadedComments] = await Promise.all([
        fetchPostLikeStatus(postSlug, currentUser?.id),
        fetchPostComments(postSlug, isCurrentAdmin),
      ]);

      if (isMounted) {
        setLikeStatus(loadedLike);
        setComments(loadedComments);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  // When user role changes (e.g. login as admin), re-fetch comments to see unapproved
  const reloadComments = async (currentUser: UserProfile | null) => {
    const isCurrentAdmin = isUserAdmin(currentUser);
    const loadedComments = await fetchPostComments(postSlug, isCurrentAdmin);
    setComments(loadedComments);
  };

  // Handle Like Toggle
  const handleLikeClick = async () => {
    const updated = await togglePostLike(postSlug, likeStatus, user?.id);
    setLikeStatus(updated);
  };

  // Handle OAuth Login
  const handleOAuthLogin = async (provider: "github" | "google") => {
    if (!supabaseReady) {
      const devProfile = setStoredDevUser(
        provider === "github" ? "GitHub Developer" : "Google Developer"
      );
      setUser(devProfile);
      setShowLoginModal(false);
      reloadComments(devProfile);
      return;
    }
    try {
      await signInWithOAuthProvider(provider);
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  // Handle Admin Quick Login (Dev test)
  const handleAdminLogin = () => {
    const adminProfile = setStoredDevAdmin();
    setUser(adminProfile);
    setShowLoginModal(false);
    reloadComments(adminProfile);
  };

  // Handle Regular User Quick Login (Dev test)
  const handleDevUserLogin = () => {
    const devProfile = setStoredDevUser("Alex Rivera (Developer)");
    setUser(devProfile);
    setShowLoginModal(false);
    reloadComments(devProfile);
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    reloadComments(null);
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

  // Handle Approve Comment (Admin Only)
  const handleApproveComment = async (commentId: string) => {
    if (!isAdmin) return;
    await approvePostComment(postSlug, commentId);
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, is_approved: true } : c))
    );
  };

  // Handle Delete Comment (Admin or Author)
  const handleDeleteComment = async (commentId: string, authorId: string) => {
    if (!user) return;
    await deletePostComment(postSlug, commentId, authorId, isAdmin);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const formatCommentDate = (isoDate: string) => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString(isVi ? "vi-VN" : "en-US", {
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

  // Comment counts for admin
  const pendingCount = comments.filter((c) => c.is_approved === false).length;
  const approvedCount = comments.filter((c) => c.is_approved !== false).length;

  // Filtered comments for display
  const visibleComments = comments.filter((c) => {
    if (isAdmin) {
      if (adminFilter === "pending") return c.is_approved === false;
      if (adminFilter === "approved") return c.is_approved !== false;
      return true;
    }
    // Regular users see approved comments OR their own pending comment
    return c.is_approved !== false || (user && user.id === c.user_id);
  });

  return (
    <section className="mt-14 pt-10 border-t border-slate-800/80 space-y-10">
      {/* Fallback Preview Mode Notice */}
      {!supabaseReady && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs">
          <Info className="w-4 h-4 flex-shrink-0 text-blue-400" />
          <span>{t.previewModeNotice}</span>
        </div>
      )}

      {/* 1. LIKE REACTION SECTION (Simplified to Like-Only) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <ThumbsUp className={`w-5 h-5 ${likeStatus.userLiked ? "text-blue-400 fill-blue-400" : "text-blue-400"}`} />
            {isVi ? "Bài viết này có hữu ích không?" : "Was this article helpful?"}
          </h3>
          <p className="text-xs text-slate-400">
            {isVi
              ? "Bấm Thích để ủng hộ tác giả và giúp bài viết lan tỏa tới cộng đồng lập trình viên."
              : "Click Like to support the author and help other developers discover this guide."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLikeClick}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border text-sm font-bold transition-all duration-200 active:scale-95 shadow-lg ${
            likeStatus.userLiked
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/50 shadow-blue-500/25"
              : "bg-slate-900 border-slate-700 text-slate-200 hover:border-blue-500/50 hover:bg-slate-800"
          }`}
        >
          <ThumbsUp
            className={`w-5 h-5 transition-transform group-hover:scale-110 ${
              likeStatus.userLiked ? "fill-white" : ""
            }`}
          />
          <span>{likeStatus.userLiked ? (isVi ? "Đã Thích" : "Liked") : (isVi ? "Thích Bài Viết" : "Like Article")}</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              likeStatus.userLiked ? "bg-white/25 text-white" : "bg-slate-800 text-blue-400 border border-slate-700"
            }`}
          >
            {likeStatus.count}
          </span>
        </button>
      </div>

      {/* 2. COMMENTS SECTION (OAuth Required + Admin Moderation) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                {t.commentsTitle} ({comments.length})
              </h3>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{t.commentsSubtitle}</p>
          </div>

          {/* User Badge / Sign In Trigger */}
          {user ? (
            <div className="flex items-center gap-3 p-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">{t.loggedInAs}</span>
                <strong className="text-white font-medium truncate max-w-[140px]">
                  {user.name}
                </strong>
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
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all self-start sm:self-auto shadow-md shadow-blue-500/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isVi ? "Đăng nhập để bình luận" : "Sign in to comment"}</span>
            </button>
          )}
        </div>

        {/* Admin Moderation Bar */}
        {isAdmin && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-2xl bg-amber-950/25 border border-amber-500/30 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isVi ? "Bảng Điều Khiển Duyệt Bình Luận" : "Admin Moderation Panel"}</span>
              {pendingCount > 0 && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                  {isVi ? `${pendingCount} chờ duyệt` : `${pendingCount} pending`}
                </span>
              )}
            </div>

            {/* Filter tabs for Admin */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setAdminFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  adminFilter === "all" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                {isVi ? "Tất cả" : "All"} ({comments.length})
              </button>
              <button
                type="button"
                onClick={() => setAdminFilter("pending")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  adminFilter === "pending"
                    ? "bg-amber-600 text-white font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isVi ? "Chờ duyệt" : "Pending"} ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setAdminFilter("approved")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  adminFilter === "approved"
                    ? "bg-emerald-600 text-white font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isVi ? "Đã duyệt" : "Approved"} ({approvedCount})
              </button>
            </div>
          </div>
        )}

        {/* Comment Input Box */}
        <form onSubmit={handleCommentSubmit} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => {
              if (!user) setShowLoginModal(true);
            }}
            placeholder={
              user
                ? isAdmin
                  ? isVi
                    ? "Bình luận với tư cách Quản Trị Viên (Hiển thị ngay lập tức)..."
                    : "Comment as Admin (Auto-approved immediately)..."
                  : t.leaveCommentPlaceholder
                : isVi
                ? "Vui lòng đăng nhập qua GitHub / Google để bình luận..."
                : "Please sign in with GitHub or Google to leave a comment..."
            }
            rows={3}
            maxLength={3000}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all resize-y"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">
              {newComment.length}/3000
            </span>

            <div className="flex items-center gap-2">
              {!user ? (
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{isVi ? "Đăng nhập" : "Sign In"}</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20 disabled:shadow-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? t.submitting : t.submitComment}</span>
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3 pt-2">
          {visibleComments.length === 0 && (
            <div className="p-8 rounded-2xl border border-slate-800/60 bg-slate-900/30 text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                {isAdmin && adminFilter === "pending"
                  ? isVi
                    ? "Không có bình luận nào đang chờ duyệt."
                    : "No comments pending approval."
                  : t.noCommentsYet}
              </p>
            </div>
          )}

          {visibleComments.map((comment) => {
            const isOwnComment = user && user.id === comment.user_id;
            const commentIsAdmin =
              comment.is_admin ||
              comment.user_name.includes("Nguyen Dai Long") ||
              comment.user_name.includes("Nguyễn Đại Long");

            return (
              <div
                key={comment.id}
                className={`p-4 sm:p-5 rounded-2xl bg-slate-900/50 border space-y-2 transition-all ${
                  comment.is_approved === false
                    ? "border-amber-500/40 bg-amber-950/10"
                    : "border-slate-800/80 hover:border-slate-700/80"
                }`}
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

                        {/* Admin / Author Badge */}
                        {commentIsAdmin && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                            {isVi ? "Tác Giả" : "Author"}
                          </span>
                        )}

                        {/* Approval Status Badge */}
                        {comment.is_approved === false ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                            <Clock className="w-2.5 h-2.5" />
                            {isVi ? "Chờ duyệt" : "Pending Review"}
                          </span>
                        ) : (
                          isAdmin && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                              <Check className="w-2.5 h-2.5" />
                              {isVi ? "Đã duyệt" : "Approved"}
                            </span>
                          )
                        )}
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {formatCommentDate(comment.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Approve & Delete */}
                  <div className="flex items-center gap-1.5">
                    {/* Admin Approve Button */}
                    {isAdmin && comment.is_approved === false && (
                      <button
                        onClick={() => handleApproveComment(comment.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
                        title={isVi ? "Duyệt và xuất bản bình luận này" : "Approve and publish this comment"}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isVi ? "Duyệt" : "Approve"}</span>
                      </button>
                    )}

                    {/* Delete Button (Admin can delete ANY comment; Author deletes own) */}
                    {(isAdmin || isOwnComment) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id, comment.user_id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                        title={
                          isAdmin && !isOwnComment
                            ? isVi
                              ? "Quản trị viên: Xóa bình luận của người dùng này"
                              : "Admin: Delete user comment"
                            : t.deleteComment
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="pl-11 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </div>

                {/* Non-admin notice on own pending comment */}
                {!isAdmin && isOwnComment && comment.is_approved === false && (
                  <div className="pl-11 pt-1 text-[11px] text-amber-400/90 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>
                      {isVi
                        ? "Bình luận của bạn đang chờ Quản trị viên duyệt trước khi hiển thị công khai."
                        : "Your comment is pending admin review before being visible to everyone."}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK LOGIN MODAL (With Admin & User Quick Login) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  {isVi ? "Đăng nhập bình luận" : "Sign in to comment"}
                </h4>
                <p className="text-xs text-slate-400">
                  {isVi
                    ? "Đăng nhập 1-click tức thì qua tài khoản GitHub hoặc Google."
                    : "Fast 1-click login with your GitHub or Google developer account."}
                </p>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 1-Click OAuth Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => handleOAuthLogin("github")}
                className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>{t.signInWithGithub}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors shadow-sm cursor-pointer"
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

              {/* Dev / Test Quick Switch Roles */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  {isVi ? "Chế độ thử nghiệm phân quyền (Testing Mode)" : "Role Testing Mode"}
                </p>

                <button
                  type="button"
                  onClick={handleAdminLogin}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {isVi
                      ? "Đăng nhập quyền Admin (Nguyễn Đại Long)"
                      : "Login as Admin (Full Approve & Delete)"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDevUserLogin}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>
                    {isVi
                      ? "Đăng nhập quyền Người Dùng Thường"
                      : "Login as Regular User (Submit for Review)"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
