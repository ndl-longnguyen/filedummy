"use client";

import Link from "next/link";
import { Download, ArrowUpRight, Copy, Check } from "lucide-react";
import { FileEntry, formatBytes } from "@/lib/files";
import { useState } from "react";

interface SizeTableProps {
  files: FileEntry[];
  typeLabel: string;
}

export function SizeTable({ files, typeLabel }: SizeTableProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyLink = (key: string, file: FileEntry) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://filedummy.ndlong.site";
    const url = `${origin}/${file.type}/${file.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-800/80 bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
            <th className="py-4 px-6 font-semibold">File & Size</th>
            <th className="py-4 px-4 font-semibold hidden sm:table-cell">Exact Bytes</th>
            <th className="py-4 px-4 font-semibold hidden md:table-cell">Checksum (SHA-256)</th>
            <th className="py-4 px-4 font-semibold text-center hidden lg:table-cell">Downloads</th>
            <th className="py-4 px-6 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {files.map((f) => (
            <tr
              key={f.r2Key}
              className="hover:bg-slate-900/40 transition-colors group"
            >
              {/* File label & name */}
              <td className="py-4 px-6">
                <Link
                  href={`/${f.type}/${f.slug}`}
                  className="font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{f.label}</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({f.r2Key.split("/").pop()})
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
                <div className="text-xs text-slate-400 mt-0.5 sm:hidden">
                  {formatBytes(f.sizeBytes)}
                </div>
              </td>

              {/* Exact bytes */}
              <td className="py-4 px-4 hidden sm:table-cell text-xs font-mono text-slate-300">
                {f.sizeBytes.toLocaleString()} B
              </td>

              {/* Checksum */}
              <td className="py-4 px-4 hidden md:table-cell text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[140px]">{f.sha256}</span>
                  <button
                    onClick={() => copyLink(f.r2Key, f)}
                    title="Copy detail page link"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    {copiedKey === f.r2Key ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </td>

              {/* Downloads */}
              <td className="py-4 px-4 text-center hidden lg:table-cell text-xs text-slate-400">
                {f.baseDownloads.toLocaleString()}
              </td>

              {/* Action buttons */}
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/${f.type}/${f.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get {typeLabel}</span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
