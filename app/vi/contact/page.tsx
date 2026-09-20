import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, MessageSquare, HelpCircle, ShieldAlert, Globe, Clock } from "lucide-react";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";
import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Liên Hệ & Hỗ Trợ — FileDummy | Hệ Sinh Thái NDL",
  description:
    "Kênh liên hệ chính thức, thông tin nhà phát triển và hỗ trợ kỹ thuật cho FileDummy thuộc Hệ sinh thái NDL. Email: ndl.long.nguyendai@gmail.com.",
  alternates: getAlternateLanguages("/contact", "vi"),
};

export default function VietnameseContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: "Liên hệ" }]} locale="vi" />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>
            Mạng lưới Hệ Sinh Thái NDL (
            <a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="underline hover:text-blue-300">
              ndlong.site
            </a>
            )
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Liên Hệ &amp; Hỗ Trợ Kỹ Thuật
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Chúng tôi luôn sẵn sàng lắng nghe phản hồi từ các lập trình viên, kỹ sư QA, sinh viên và đối tác. Cho dù bạn có thắc mắc về tệp mẫu, cần bổ sung định dạng/kích thước mới, hoặc muốn tìm hiểu cơ hội hợp tác, chúng tôi luôn ở đây để hỗ trợ bạn.
        </p>
      </div>

      {/* 4 Support Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Hỗ Trợ Kỹ Thuật &amp; Vận Hành</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Giải đáp thắc mắc chung, báo cáo liên kết tải lỗi, hỗ trợ tích hợp API hoặc xử lý các sự cố tải file:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Ho%20Tro%20Ky%20Thuat"
            className="inline-block text-xs font-semibold text-blue-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Đề Xuất Định Dạng &amp; Tính Năng</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bạn cần một loại MIME đặc thù, giới hạn dung lượng lớn hơn hoặc tính năng tự động hóa bằng CLI mới?
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Yeu%20Cau%20Dinh%20Dang"
            className="inline-block text-xs font-semibold text-cyan-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Quảng Cáo &amp; Tuân Thủ AdSense</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Trao đổi về chính sách Google AdSense, tài trợ trực tiếp, phản hồi vị trí hiển thị quảng cáo hoặc banner:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Lien%20He%20Quang%20Cao"
            className="inline-block text-xs font-semibold text-purple-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Thông Báo Pháp Lý &amp; Bản Quyền</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Các vấn đề sở hữu trí tuệ, yêu cầu quyền riêng tư dữ liệu GDPR/CCPA hoặc trao đổi văn bản pháp lý chính thức:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Thong%20Bao%20Phap%20Ly"
            className="inline-block text-xs font-semibold text-indigo-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>
      </div>

      {/* Publisher Transparency Box */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Thông Tin Đơn Vị Quản Trị &amp; Vận Hành</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <p><strong className="text-white">Dự án:</strong> FileDummy (Kho tệp mẫu &amp; Công cụ tạo file kiểm thử)</p>
            <p><strong className="text-white">Tên miền:</strong> <code className="text-blue-400">filedummy.ndlong.site</code></p>
            <p><strong className="text-white">Hệ sinh thái:</strong> NDL Ecosystem Network</p>
            <p><strong className="text-white">Kỹ sư sáng lập:</strong> Nguyễn Đại Long</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <p className="flex items-center gap-1.5 text-white font-semibold">
              <Clock className="w-4 h-4 text-emerald-400" /> Cam Kết Phản Hồi
            </p>
            <p className="text-slate-400 leading-relaxed">
              Chúng tôi xem xét và giải quyết tất cả yêu cầu hợp lệ, báo lỗi kỹ thuật và đề xuất định dạng trong vòng <strong className="text-white font-semibold">24 đến 48 giờ làm việc</strong>.
            </p>
            <p className="text-slate-400 pt-1">
              Hộp thư trực tiếp: <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline font-mono">ndl.long.nguyendai@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-400 flex flex-wrap gap-4">
          <span>Liên kết nhanh:</span>
          <Link href="/vi/about" className="text-blue-400 hover:underline">Về chúng tôi</Link>
          <span>•</span>
          <Link href="/vi/privacy" className="text-blue-400 hover:underline">Chính sách bảo mật</Link>
          <span>•</span>
          <Link href="/vi/terms" className="text-blue-400 hover:underline">Điều khoản dịch vụ</Link>
          <span>•</span>
          <a href="/ads.txt" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">ads.txt</a>
        </div>
      </div>
    </div>
  );
}
