import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";
import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật — FileDummy | Tuân Thủ Google AdSense & GDPR",
  description:
    "Chính sách bảo mật FileDummy: Cách chúng tôi xử lý dữ liệu người dùng, phân tích truy cập, cookie bên thứ ba, tuân thủ Google AdSense, GDPR và CCPA.",
  alternates: getAlternateLanguages("/privacy", "vi"),
};

export default function VietnamesePrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-300">
      <Breadcrumbs items={[{ label: "Chính sách bảo mật" }]} locale="vi" />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Chính Sách Bảo Mật
        </h1>
        <p className="text-xs text-slate-400">
          Ngày hiệu lực: 19 tháng 9, 2026 | Cập nhật lần cuối: 19 tháng 9, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Giới Thiệu &amp; Đơn Vị Chủ Quản</h2>
          <p>
            Chào mừng bạn đến với FileDummy (truy cập tại{" "}
            <code className="text-blue-400 font-mono">https://filedummy.ndlong.site</code>
            ). FileDummy hoạt động như một tiện ích thành viên thuộc <strong className="text-white font-semibold">Hệ sinh thái NDL</strong> (
            <a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
              ndlong.site
            </a>
            ), do kỹ sư phần mềm Nguyễn Đại Long phát triển và vận hành.
          </p>
          <p>
            Quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi. Tài liệu Chính sách bảo mật này mô tả các loại thông tin được FileDummy thu thập và ghi nhận, cũng như cách thức chúng tôi sử dụng và bảo vệ thông tin đó.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Dữ Liệu Chúng Tôi Thu Thập</h2>
          <p>
            FileDummy được thiết kế tối giản nhằm loại bỏ rào cản thao tác. <strong className="text-white font-semibold">Chúng tôi không yêu cầu đăng ký tài khoản, đăng nhập, mật khẩu hay bất kỳ thông tin thanh toán nào.</strong> Bạn có thể truy cập, xem danh mục và tải xuống tệp mẫu hoàn toàn ẩn danh.
          </p>
          <p>
            Tương tự hầu hết các dịch vụ web hiện đại, chúng tôi tự động thu thập một số dữ liệu nhật ký kỹ thuật cơ bản khi bạn tương tác với trang web:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Loại trình duyệt, phiên bản User-Agent và hệ điều hành.</li>
            <li>Ngày giờ truy cập và trang giới thiệu/chuyển hướng.</li>
            <li>Địa chỉ giao thức Internet (IP) (được ẩn danh hóa phục vụ định vị địa lý và chống lạm dụng).</li>
            <li>Định danh tệp được yêu cầu (để phân phát lệnh tải chuyển hướng qua Cloudflare R2).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Google AdSense &amp; Cookie Quảng Cáo Của Bên Thứ Ba</h2>
          <p>
            Chúng tôi hợp tác với các mạng lưới quảng cáo của bên thứ ba, chủ yếu là <strong className="text-white font-semibold">Google AdSense</strong>, để hiển thị quảng cáo khi bạn truy cập trang web. Google và các đối tác quảng cáo sử dụng cookie (chẳng hạn như cookie DoubleClick) để hiển thị quảng cáo phù hợp dựa trên các lượt truy cập trước đây của bạn vào FileDummy cũng như các trang web khác trên Internet.
          </p>
          <p className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-white">Thông báo Cookie quan trọng:</strong> Việc Google sử dụng cookie quảng cáo cho phép Google và các đối tác phân phát quảng cáo tới người dùng dựa trên lượt truy cập vào trang web của chúng tôi và/hoặc các trang web khác trên Internet.
          </p>
          <p>
            Người dùng có thể chọn tắt tính năng quảng cáo được cá nhân hóa bằng cách truy cập các trang sau:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-blue-400">
            <li>
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-blue-300"
              >
                Cài đặt quảng cáo Google (tắt quảng cáo cá nhân hóa)
              </a>
            </li>
            <li>
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-blue-300"
              >
                Công cụ lựa chọn người tiêu dùng AboutAds.info
              </a>
            </li>
            <li>
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-blue-300"
              >
                Tùy chọn tắt của Sáng kiến Quảng cáo Mạng (NAI)
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Thống Kê Truy Cập (Google Analytics 4)</h2>
          <p>
            Chúng tôi sử dụng Google Analytics để phân tích xu hướng tổng hợp của khách truy cập, nguồn lưu lượng và các định dạng tệp phổ biến. Google Analytics sử dụng cookie để thu thập dữ liệu tương tác ẩn danh. Chúng tôi đã kích hoạt tính năng <strong className="text-white font-semibold">Ẩn danh hóa IP (IP Masking)</strong>, đảm bảo địa chỉ IP đầy đủ của bạn không bao giờ được lưu trữ trên máy chủ Google.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Cam Kết Quyền Riêng Tư Với Công Cụ Tạo File Tại Trình Duyệt</h2>
          <p>
            Khi sử dụng công cụ <strong className="text-white font-semibold">Tạo File Dummy Tùy Chỉnh</strong> (tại <code className="text-blue-400">/vi/generator</code>), mọi quá trình tạo dữ liệu tệp được thực thi <strong className="text-white font-semibold">100% cục bộ trong sandbox trình duyệt của bạn</strong> thông qua các API chuẩn JavaScript ArrayBuffer và Blob.
          </p>
          <p className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl">
            ✓ Hoàn toàn không có bất kỳ byte dữ liệu hay thông số cấu hình nào được tải lên, ghi log hoặc gửi đến bất kỳ máy chủ từ xa nào.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Tuân Thủ GDPR (Người Dùng Tại Khu Vực Kinh Tế Châu Âu - EEA)</h2>
          <p>
            Nếu bạn cư trú tại Khu vực Kinh tế Châu Âu (EEA), bạn có các quyền bảo vệ dữ liệu theo Quy định chung về bảo vệ dữ liệu (GDPR), bao gồm:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Quyền truy cập, cập nhật hoặc yêu cầu xóa thông tin của bạn.</li>
            <li>Quyền sửa đổi dữ liệu và quyền chuyển đổi dữ liệu (data portability).</li>
            <li>Quyền rút lại sự đồng ý đối với cookie bất kỳ lúc nào thông qua cài đặt trình duyệt.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. Thông Báo Dành Cho Cư Dân California (CCPA / CPRA)</h2>
          <p>
            Theo Đạo luật Quyền riêng tư của Người tiêu dùng California (CCPA) và Đạo luật Quyền riêng tư California (CPRA), cư dân có quyền yêu cầu tiết lộ các danh mục dữ liệu cá nhân được thu thập và yêu cầu xóa bỏ. <strong className="text-white font-semibold">FileDummy không bán hay chia sẻ thông tin cá nhân với bất kỳ bên thứ ba nào vì mục đích tài chính.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">8. Bảo Vệ Trẻ Em (Tuân Thủ COPPA)</h2>
          <p>
            Bảo vệ quyền riêng tư của trẻ em trên môi trường trực tuyến là yếu tố cốt lõi. FileDummy không chủ ý thu thập bất kỳ thông tin nhận dạng cá nhân nào từ trẻ em dưới 13 tuổi. Nếu phụ huynh hoặc người giám hộ phát hiện con em mình cung cấp thông tin trên trang web, xin vui lòng liên hệ ngay để chúng tôi tiến hành xóa dữ liệu.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">9. Liên Kết Tới Các Trang Bên Thứ Ba &amp; Hệ Sinh Thái NDL</h2>
          <p>
            FileDummy chứa liên kết đến các công cụ khác trong Hệ sinh thái NDL (như <code className="text-blue-400">tools.ndlong.site</code>, <code className="text-blue-400">image.ndlong.site</code>, <code className="text-blue-400">s.ndlong.site</code>). Mỗi trang web đều duy trì chính sách quyền riêng tư độc lập tuân thủ quy chuẩn NDL Network. Chúng tôi khuyến nghị người dùng đọc kỹ chính sách bảo mật của các website bên ngoài khi truy cập.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white">10. Liên Hệ Bộ Phận Quyền Riêng Tư Dữ Liệu</h2>
          <p>
            Mọi câu hỏi, yêu cầu thực thi quyền dữ liệu cá nhân hoặc làm rõ về các chính sách tuân thủ AdSense, xin vui lòng liên hệ:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <p><strong className="text-white">Tổ chức:</strong> NDL Ecosystem Network</p>
            <p><strong className="text-white">Phụ trách kỹ thuật:</strong> Nguyễn Đại Long</p>
            <p><strong className="text-white">Email:</strong> <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline">ndl.long.nguyendai@gmail.com</a></p>
            <p><strong className="text-white">Trang web:</strong> <a href="https://filedummy.ndlong.site" className="text-blue-400 underline">filedummy.ndlong.site</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
