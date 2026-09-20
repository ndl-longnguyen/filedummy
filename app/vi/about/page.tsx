import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, HardDrive, Terminal, Zap, Globe, Code2 } from "lucide-react";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";
import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Về Chúng Tôi — FileDummy | Thành Viên Hệ Sinh Thái NDL",
  description:
    "Tìm hiểu về FileDummy, sứ mệnh kỹ thuật, hạ tầng lưu trữ và vai trò trong Hệ sinh thái NDL (ndlong.site) cung cấp tệp mẫu chuẩn hóa cho kiểm thử phần mềm toàn cầu.",
  alternates: getAlternateLanguages("/about", "vi"),
};

export default function VietnameseAboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: "Về chúng tôi" }]} />

      {/* Hero Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>
            Một sản phẩm thuộc Hệ Sinh Thái NDL (
            <a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="underline hover:text-blue-300">
              ndlong.site
            </a>
            )
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Về Nền Tảng FileDummy
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          FileDummy (<code className="text-blue-400 font-mono">filedummy.ndlong.site</code>) là nền tảng công cụ phát triển chuyên dụng, được xây dựng nhằm cung cấp cho các kỹ sư phần mềm, chuyên viên QA, kiểm toán bảo mật và quản trị viên hệ thống kho file dummy chuẩn hóa, sạch sẽ và tức thì phục vụ mục đích kiểm thử tải lên và benchmark hiệu năng.
        </p>
      </div>

      {/* Mission & Story */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 leading-relaxed text-sm text-slate-300">
        <h2 className="text-xl font-bold text-white tracking-tight">Sứ Mệnh &amp; Mục Đích Của Chúng Tôi</h2>
        <p>
          Kiểm thử giới hạn dung lượng tải lên, bộ xử lý multipart/form-data, pipeline phân phối CDN và dịch vụ chuyển đổi định dạng là công việc diễn ra hàng ngày tại các đội ngũ kỹ thuật. Tuy nhiên, việc tìm kiếm tệp mẫu thường buộc kỹ sư phải tìm đến các trang web không rõ nguồn gốc chứa đầy pop-up, tracker và rủi ro mã độc.
        </p>
        <p>
          FileDummy ra đời để xóa bỏ hoàn toàn rào cản này. Mọi tệp tin trên hệ thống đều được tạo lập bằng mã nguồn tự động với cấu trúc header hợp lệ, hoàn toàn không chứa payload độc hại và đảm bảo số byte chuẩn xác tuyệt đối.
        </p>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">100% Sạch &amp; Không Virus</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mọi tệp tin được khởi tạo trong môi trường build cô lập với nội dung đệm tiêu chuẩn (Lorem Ipsum, bộ đệm nhị phân sạch). Tuyệt đối không chứa macro, file thực thi hay mã theo dõi.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Độ Chính Xác Từng Byte</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Các mốc dung lượng 10MB, 50MB hay 100MB được căn chỉnh chính xác từng byte theo ranh giới nhị phân (IEC), giúp bài kiểm thử ranh giới dung lượng của bạn luôn đạt độ chuẩn xác 100%.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Mạng Lưới Cloudflare R2 Toàn Cầu</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dữ liệu được lưu trữ trên Cloudflare R2 Object Storage và cache tại hơn 300 trung tâm dữ liệu toàn cầu, đem lại tốc độ tải xuống đa luồng cực nhanh mà không bị bóp băng thông.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Sẵn Sàng Cho CI/CD &amp; Script</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mỗi file đều đi kèm các đoạn mã cURL, Wget, Python và Node.js, cho phép bạn copy và chạy tự động trực tiếp trong các pipeline GitHub Actions, GitLab CI hoặc Cypress.
          </p>
        </div>
      </div>

      {/* About NDL Ecosystem */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Mạng Lưới Hệ Sinh Thái NDL</h2>
            <p className="text-xs text-slate-400">Được xây dựng và phát triển bởi lập trình viên Nguyễn Đại Long</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          FileDummy là một thành viên cốt lõi của <strong className="text-white font-semibold">Hệ sinh thái NDL</strong> (<a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">ndlong.site</a>) — chuỗi ứng dụng web miễn phí, hiệu năng cao và tôn trọng quyền riêng tư dành cho lập trình viên. Các công cụ nổi bật khác trong hệ thống:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="https://tools.ndlong.site"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all group"
          >
            <span className="font-bold text-white group-hover:text-purple-400 transition-colors block">
              NDL ToolsKit
            </span>
            <span className="text-slate-400 mt-1 block">
              Bộ công cụ lập trình đa năng: định dạng code, Regex, Base64 và mã hóa tiện lợi.
            </span>
          </a>

          <a
            href="https://image.ndlong.site"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
          >
            <span className="font-bold text-white group-hover:text-cyan-400 transition-colors block">
              NDL Image Tools
            </span>
            <span className="text-slate-400 mt-1 block">
              Nén ảnh thông minh và chuyển đổi định dạng WebP trực tiếp trên trình duyệt.
            </span>
          </a>

          <a
            href="https://s.ndlong.site"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all group"
          >
            <span className="font-bold text-white group-hover:text-blue-400 transition-colors block">
              NDL Short Link
            </span>
            <span className="text-slate-400 mt-1 block">
              Rút gọn liên kết tốc độ cao, phân tích số lượt click và an toàn bảo mật.
            </span>
          </a>
        </div>
      </div>

      {/* Editorial & Transparency Guidelines */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white tracking-tight">Thông Tin Đơn Vị Phát Hành &amp; Tiêu Chuẩn Minh Bạch</h2>
        <p>
          Chúng tôi cam kết đảm bảo tính minh bạch tuyệt đối, an toàn số và tuân thủ nghiêm ngặt các chính sách quản trị trang web và Google AdSense. Nền tảng tuyệt đối không gắn nút tải giả mạo, quảng cáo gây nhầm lẫn hay lưu trữ tài liệu vi phạm bản quyền.
        </p>
        <p>
          Mọi thắc mắc, đề xuất định dạng file mới hoặc yêu cầu hỗ trợ kỹ thuật, xin vui lòng truy cập trang{" "}
          <Link href="/vi/contact" className="text-blue-400 underline hover:text-blue-300">
            Liên hệ &amp; Hỗ trợ
          </Link>{" "}
          hoặc gửi email trực tiếp về{" "}
          <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline hover:text-blue-300">
            ndl.long.nguyendai@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
