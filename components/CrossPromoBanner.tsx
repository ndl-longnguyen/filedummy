import { ExternalLink, Sparkles, Image as ImageIcon } from "lucide-react";
import { Locale } from "@/lib/i18n/types";

interface CrossPromoBannerProps {
  type?: "image" | "default";
  locale?: Locale;
  className?: string;
}

export function CrossPromoBanner({
  type = "default",
  locale = "en",
  className = "",
}: CrossPromoBannerProps) {
  const isVi = locale === "vi";

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
                {isVi ? "Cần nén hoặc chuyển đổi định dạng hình ảnh?" : "Need to compress or convert images?"}
              </h4>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isVi ? "Công Cụ NDL" : "NDL Tool"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isVi
                ? "Sử dụng NDL Image Compressor để giảm dung lượng JPG/PNG lên đến 80% với chuyển đổi WebP ngay trên trình duyệt."
                : "Use NDL Image Compressor to reduce JPG/PNG sizes by up to 80% with client-side WebP conversion."}
            </p>
          </div>
        </div>

        <a
          href="https://image.ndlong.site"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex-shrink-0"
        >
          <span>{isVi ? "Mở Công Cụ Ảnh" : "Open Image Tools"}</span>
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
              {isVi ? "Khám phá thêm các công cụ lập trình từ Hệ Sinh Thái NDL" : "Explore More Developer Tools from NDL Ecosystem"}
            </h4>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              ndlong.site
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isVi
              ? "Trải nghiệm các tiện ích rút gọn liên kết, tối ưu hóa hình ảnh và bộ công cụ kỹ thuật dành cho nhà phát triển."
              : "Discover our high-speed URL shortener, image compression utilities, and developer engineering tools."}
          </p>
        </div>
      </div>

      <a
        href="https://ndlong.site"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all flex-shrink-0"
      >
        <span>{isVi ? "Khám Phá NDL Hub" : "Explore NDL Hub"}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
