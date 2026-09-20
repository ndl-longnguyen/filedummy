import Link from "next/link";
import { Download, ArrowRight, Sparkles } from "lucide-react";

interface BlogDownloadCTAProps {
  fileType: string;
  fileSlug: string;
  message: string;
  buttonLabel?: string;
  locale?: "en" | "vi";
}

export function BlogDownloadCTA({
  fileType,
  fileSlug,
  message,
  buttonLabel,
  locale = "en",
}: BlogDownloadCTAProps) {
  const isVi = locale === "vi";
  const prefix = isVi ? "/vi" : "";

  return (
    <div className="relative my-9 overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-900/90 via-blue-950/40 to-indigo-950/40 p-6 sm:p-7 shadow-2xl shadow-black/40 backdrop-blur-md transition-all hover:border-blue-500/50">
      {/* Subtle radial ambient glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start gap-5">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center shadow-inner">
          <Download className="w-6 h-6 text-blue-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {isVi ? "Thử Nghiệm Thực Tế" : "Verified Test Asset"}
            </span>
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
              .{fileType.toLowerCase()}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-5">{message}</p>

          <Link
            href={`${prefix}/${fileType}/${fileSlug}`}
            className="inline-flex items-center gap-2.5 text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-500 text-white transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>
              {buttonLabel ??
                (isVi
                  ? `Tải File Mẫu ${fileSlug.toUpperCase()} ${fileType.toUpperCase()}`
                  : `Download Sample ${fileSlug.toUpperCase()} ${fileType.toUpperCase()}`)}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
