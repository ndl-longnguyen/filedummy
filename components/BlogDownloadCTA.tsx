import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

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
    <div className="my-8 rounded-xl border border-blue-500/25 bg-gradient-to-br from-blue-950/60 to-indigo-950/60 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
          <Download className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
            {isVi ? "Thử Nghiệm Thực Tế" : "Test This Yourself"}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{message}</p>
          <Link
            href={`${prefix}/${fileType}/${fileSlug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-500/20"
          >
            {buttonLabel ?? (isVi ? `Tải File ${fileSlug.toUpperCase()} ${fileType.toUpperCase()} →` : `Download ${fileSlug.toUpperCase()} ${fileType.toUpperCase()} →`)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
