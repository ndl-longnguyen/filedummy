import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";
import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Điều Khoản Dịch Vụ — FileDummy | Hệ Sinh Thái NDL",
  description:
    "Điều khoản dịch vụ, quy định sử dụng hợp lệ, miễn trừ trách nhiệm và các điều kiện pháp lý khi sử dụng dịch vụ tải tệp mẫu FileDummy.",
  alternates: getAlternateLanguages("/terms", "vi"),
};

export default function VietnameseTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-300">
      <Breadcrumbs items={[{ label: "Điều khoản dịch vụ" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Điều Khoản Dịch Vụ
        </h1>
        <p className="text-xs text-slate-400">
          Ngày hiệu lực: 19 tháng 9, 2026 | Cập nhật lần cuối: 19 tháng 9, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Chấp Thuận Điều Khoản</h2>
          <p>
            Bằng việc truy cập hoặc sử dụng FileDummy (tại địa chỉ{" "}
            <code className="text-blue-400 font-mono">https://filedummy.ndlong.site</code>
            ), bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ các Điều khoản Dịch vụ này. FileDummy hoạt động như một tiện ích thành viên thuộc <strong className="text-white font-semibold">Hệ sinh thái NDL</strong> (
            <a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
              ndlong.site
            </a>
            ), do kỹ sư phần mềm Nguyễn Đại Long phát triển và quản trị.
          </p>
          <p>
            Nếu bạn không đồng ý với các điều khoản này, vui lòng ngừng sử dụng trang web và các điểm cuối tải tệp ngay lập tức.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Mục Đích &amp; Phạm Vi Sử Dụng Hợp Lệ</h2>
          <p>
            FileDummy cung cấp các tệp mẫu giả lập chuẩn hóa và các công cụ tạo file phía trình duyệt, phục vụ riêng cho kỹ thuật phần mềm, kiểm thử QA, học tập đào tạo, benchmark dung lượng lưu trữ và pipeline tự động hóa CI/CD.
          </p>
          <p>Bạn được phép một cách rõ ràng:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Tải xuống từng tệp mẫu để kiểm thử thủ công biểu mẫu upload trên web/mobile.</li>
            <li>Tích hợp các điểm cuối tải tệp vào kịch bản kiểm thử CI/CD tự động bằng cURL, Wget, Python hoặc Node.js.</li>
            <li>Sử dụng Bộ tạo file dummy tùy chỉnh để tạo bộ đệm kiểm thử trực tiếp trong trình duyệt cục bộ của bạn.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Bản Chất Dữ Liệu Dummy &amp; Nghiêm Cấm Lạm Dụng</h2>
          <p className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
            <strong>Lưu ý quan trọng:</strong> Toàn bộ tài liệu, bảng tính, hình ảnh và tập dữ liệu trên FileDummy được tạo lập tự động bằng văn bản giữ chỗ (Lorem Ipsum), byte ngẫu nhiên hoặc bản ghi bảng giả định. Chúng không đại diện cho các văn bản pháp lý, y tế, doanh nghiệp hay tài chính xác thực.
          </p>
          <p>
            Bạn cam kết KHÔNG sử dụng bất kỳ tệp mẫu nào từ trang web này cho mục đích lừa đảo, giả mạo giấy tờ, qua mặt cơ quan chức năng hoặc trình bày tệp dummy dưới danh nghĩa tài liệu pháp lý thật.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Quy Tắc Sử Dụng Mạng &amp; Chống Tấn Công</h2>
          <p>Khi tương tác với hệ thống hạ tầng của chúng tôi, bạn cam kết không:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Tiến hành tấn công từ chối dịch vụ (DDoS) hoặc cố ý làm tràn băng thông tải file vượt quá mức độ kiểm thử thông thường.</li>
            <li>Cố ý dịch ngược, khai thác lỗ hổng hoặc xâm nhập trái phép hạ tầng lưu trữ biên Cloudflare R2.</li>
            <li>Truyền phát mã độc, virus hoặc các payload Trojan giả dạng yêu cầu của FileDummy.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Quảng Cáo Của Bên Thứ Ba &amp; Google AdSense</h2>
          <p>
            FileDummy hiển thị quảng cáo bên thứ ba chủ yếu do <strong className="text-white font-semibold">Google AdSense</strong> cung cấp. Quảng cáo tuân theo các chính sách của Google. FileDummy không bảo đảm, chịu trách nhiệm hay đại diện cho các sản phẩm, dịch vụ hoặc giao dịch diễn ra trên các trang web quảng cáo của bên thứ ba.
          </p>
          <p>
            Người dùng tương tác với quảng cáo trên tinh thần tự nguyện và tuân theo các điều khoản bảo mật của từng nhà quảng cáo tương ứng.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Quyền Sở Hữu Trí Tuệ</h2>
          <p>
            Kiến trúc phần mềm, nhận diện thương hiệu, giao diện người dùng, bài viết hướng dẫn và các engine tạo file client-side của FileDummy là tài sản trí tuệ của Nguyễn Đại Long và Hệ sinh thái NDL.
          </p>
          <p>
            Bản thân các nội dung nhị phân mẫu và các file dummy được tạo ra được đóng góp vào phạm vi công cộng (tương đương chuẩn CC0 / Unlicense) nhằm cho phép các nhà phát triển sử dụng tự do trong các dự án thương mại và nội bộ mà không đòi hỏi ghi công.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. Miễn Trừ Trách Nhiệm Bảo Hành (&quot;NGUYÊN TRẠNG&quot;)</h2>
          <p>
            FileDummy và tất cả các dịch vụ tệp được cung cấp trên cơ sở <strong className="text-white font-semibold">&quot;NGUYÊN TRẠNG&quot;</strong> và <strong className="text-white font-semibold">&quot;TÙY MỨC ĐỘ KHẢ DỤNG&quot;</strong> mà không có bất kỳ sự đảm bảo nào, dù minh thị hay mặc định.
          </p>
          <p>
            Mặc dù chúng tôi áp dụng quy trình kiểm định nghiêm ngặt nhằm đảm bảo 100% tệp tin sạch virus, chúng tôi không cam kết việc tải xuống sẽ không bao giờ gián đoạn hoặc tương thích với các trình phân tích cú pháp (parsers) quá lỗi thời.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">8. Giới Hạn Trách Nhiệm Pháp Lý</h2>
          <p>
            Trong mọi trường hợp, FileDummy, kỹ sư sáng lập Nguyễn Đại Long hoặc Hệ sinh thái NDL sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp hay ngẫu nhiên nào phát sinh từ việc truy cập, sử dụng hoặc không thể sử dụng các tệp mẫu và dịch vụ của chúng tôi.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white">9. Yêu Cầu &amp; Thông Báo Pháp Lý</h2>
          <p>
            Mọi thắc mắc pháp lý, khiếu nại bản quyền hoặc làm rõ điều khoản dịch vụ, xin vui lòng liên hệ:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <p><strong className="text-white">Pháp nhân:</strong> NDL Ecosystem Network</p>
            <p><strong className="text-white">Đại diện:</strong> Nguyễn Đại Long</p>
            <p><strong className="text-white">Email chính thức:</strong> <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline">ndl.long.nguyendai@gmail.com</a></p>
            <p><strong className="text-white">Trung tâm hỗ trợ:</strong> <Link href="/vi/contact" className="text-blue-400 underline">filedummy.ndlong.site/vi/contact</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
