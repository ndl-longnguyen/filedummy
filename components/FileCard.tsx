import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { FileEntry, FILE_TYPES } from "@/lib/files";
import type { Locale } from "@/lib/i18n/types";

interface FileCardProps {
  file: FileEntry;
  locale?: Locale;
}

export function FileCard({ file, locale = "en" }: FileCardProps) {
  const typeMeta = FILE_TYPES[file.type];
  const isVi = locale === "vi";
  const prefix = isVi ? "/vi" : "";
  const filename = file.r2Key.split("/").pop() || `sample-${file.slug}.${file.type}`;
  const downloadUrl = `/api/download?file=${encodeURIComponent(file.r2Key)}`;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/95 hover:shadow-2xl hover:shadow-black/50">
      {/* Top accent glow line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${typeMeta.color} opacity-60 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Header Row: Format badge + Byte count */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border ${typeMeta.badgeBg} ${typeMeta.badgeText}`}
            >
              .{file.type.toUpperCase()}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {typeMeta.name}
            </span>
          </div>

          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-md">
            {file.sizeBytes.toLocaleString()} B
          </span>
        </div>

        {/* File Size Title */}
        <Link
          href={`${prefix}/${file.type}/${file.slug}`}
          className="block group-hover:text-blue-400 transition-colors"
        >
          <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none mb-2">
            {file.label}
          </h3>
        </Link>

        {/* Monospace Filename */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span className="truncate">{filename}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800/70">
        <div className="flex items-center gap-2">
          {/* Direct Download button */}
          <a
            href={downloadUrl}
            download
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all duration-150 active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isVi ? "Tải Ngay" : "Download"}</span>
          </a>

          {/* Details Page Link */}
          <Link
            href={`${prefix}/${file.type}/${file.slug}`}
            className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/50 transition-all duration-150"
            title={isVi ? "Xem chi tiết & mã lệnh" : "View details & CLI commands"}
          >
            <span>{isVi ? "Chi Tiết" : "Details"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
