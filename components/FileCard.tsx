import Link from "next/link";
import { Download, ArrowRight, HardDrive } from "lucide-react";
import { FileEntry, FILE_TYPES, formatBytes } from "@/lib/files";

interface FileCardProps {
  file: FileEntry;
}

export function FileCard({ file }: FileCardProps) {
  const typeMeta = FILE_TYPES[file.type];

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
      {/* Top row */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${typeMeta.badgeBg} ${typeMeta.badgeText}`}
          >
            {typeMeta.name.split(" ")[0]}
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
            .{file.type}
          </span>
        </div>

        {/* Title / Size */}
        <Link href={`/${file.type}/${file.slug}`} className="block group-hover:text-blue-400 transition-colors">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-baseline gap-2">
            {file.label}
            <span className="text-xs font-normal text-slate-400 uppercase">
              {file.type}
            </span>
          </h3>
        </Link>

        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {file.description}
        </p>
      </div>

      {/* Bottom specs & buttons */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3.5">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5 text-slate-500" />
            {formatBytes(file.sizeBytes)}
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            .{file.type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/${file.type}/${file.slug}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </Link>
          <Link
            href={`/${file.type}/${file.slug}`}
            className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/60 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
