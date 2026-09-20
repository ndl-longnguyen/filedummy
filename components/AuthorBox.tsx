import Link from "next/link";
import { ShieldCheck, Award, ExternalLink, Code2, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/types";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";

interface AuthorBoxProps {
  locale?: Locale;
}

export function AuthorBox({ locale = "en" }: AuthorBoxProps) {
  const isVi = locale === "vi";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
      {/* Author Profile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800/80">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-500/10">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-xl font-extrabold text-blue-400">
              NDL
            </div>
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-white"
            title={isVi ? "Kỹ sư đã xác minh" : "Verified Engineer"}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {isVi ? "Nguyễn Đại Long" : "Nguyen Dai Long"}
            </h3>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {isVi ? "Tác Giả & Kỹ Sư Trưởng" : "Author & Lead Engineer"}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isVi
              ? "Backend Lead • Chuyên gia Kiến trúc Hệ thống Phân tán & Lưu trữ Đám mây"
              : "Backend Lead • Distributed Systems & Cloud Edge Architecture Specialist"}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed pt-1 max-w-2xl">
            {isVi
              ? "Hơn 4 năm kinh nghiệm thiết kế các hệ thống xử lý tệp tải lên thông lượng lớn, tối ưu hóa cơ sở dữ liệu và hạ tầng phân tán Cloudflare R2 / AWS S3. Người sáng lập FileDummy và Mạng lưới Hệ sinh thái NDL."
              : "4+ years designing high-throughput file ingestion pipelines, database architectures, and distributed edge storage on Cloudflare R2 & AWS S3. Founder of FileDummy and the NDL Ecosystem."}
          </p>
        </div>
      </div>

      {/* Content Originality & E-E-A-T Guarantee */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>
            {isVi
              ? "Cam Kết Nghiên Cứu Kỹ Thuật Nguyên Bản (E-E-A-T Guarantee)"
              : "Original Engineering Research & E-E-A-T Guarantee"}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {isVi
            ? "Mọi bài viết trên FileDummy được biên soạn dựa trên thực nghiệm kỹ thuật thực tế với các bài đo kiểm benchmark đo lường trực tiếp, đoạn mã code có thể chạy ngay và trích dẫn chuẩn hóa theo các tiêu chuẩn IETF RFC (RFC 7578 multipart, RFC 9110 HTTP Semantics, RFC 4180 CSV, RFC 8259 JSON). Toàn bộ file mẫu được sinh tự động sạch 100%, không chứa mã độc hay tracker."
            : "Every technical guide on FileDummy is synthesized from real-world systems engineering benchmarks, reproducible code snippets, and formal IETF RFC citations (RFC 7578 multipart, RFC 9110 HTTP Semantics, RFC 4180 CSV, RFC 8259 JSON). All dummy assets are 100% virus-free, byte-exact, and zero-tracking."}
        </p>
      </div>

      {/* Social and Ecosystem Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
        <div className="flex items-center gap-3 text-slate-400">
          <a
            href="https://www.linkedin.com/in/ndl-longnguyen/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            LinkedIn Profile <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com"
            className="text-slate-300 hover:underline font-mono"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <Link
          href={isVi ? "/vi/about" : "/about"}
          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{isVi ? "Tìm hiểu về tiêu chuẩn kỹ thuật →" : "Read engineering standards →"}</span>
        </Link>
      </div>
    </div>
  );
}
