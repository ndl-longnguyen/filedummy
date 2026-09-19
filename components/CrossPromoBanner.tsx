import { ExternalLink, Sparkles, Image as ImageIcon } from "lucide-react";

interface CrossPromoBannerProps {
  type?: "image" | "default";
  className?: string;
}

export function CrossPromoBanner({ type = "default", className = "" }: CrossPromoBannerProps) {
  if (type === "image") {
    return (
      <div
        className={`p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Need to compress or convert images?
              </h4>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                NDL Tool
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Use NDL Image Compressor to reduce JPG/PNG sizes by up to 80% with client-side WebP conversion.
            </p>
          </div>
        </div>

        <a
          href="https://image.ndlong.site"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex-shrink-0"
        >
          <span>Open Image Tools</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div
      className={`p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Explore More Developer Tools from NDL Ecosystem
            </h4>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              ndlong.site
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Discover our high-speed URL shortener, image compression utilities, and developer engineering tools.
          </p>
        </div>
      </div>

      <a
        href="https://ndlong.site"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all flex-shrink-0"
      >
        <span>Explore NDL Hub</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
