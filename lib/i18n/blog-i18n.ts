import { BlogCluster, BlogPost, CLUSTER_META } from "../blog";

export const VI_CLUSTER_META: Record<
  BlogCluster,
  { name: string; color: string; description: string; icon: string }
> = {
  1: {
    name: "Tải Lên & Xử Lý Tệp Tin",
    color: "from-blue-500 to-indigo-600",
    description: "Kỹ thuật upload chunked, multipart và resumable phía frontend & backend",
    icon: "⬆️",
  },
  2: {
    name: "Bảo Mật & Toàn Vẹn Tệp Tin",
    color: "from-red-500 to-rose-600",
    description: "Băm checksum SHA-256, mã hóa AES-256, magic bytes và quét virus",
    icon: "🔒",
  },
  3: {
    name: "Xử Lý & Chuyển Đổi Định Dạng",
    color: "from-amber-500 to-orange-600",
    description: "Chuyển đổi PDF, nén dữ liệu, trích xuất text và tách/ghép tài liệu",
    icon: "⚙️",
  },
  4: {
    name: "Kiểm Thử & QA Với Tệp Tin",
    color: "from-emerald-500 to-teal-600",
    description: "Kiểm thử E2E Playwright/Cypress, Postman API, Jest và load test k6",
    icon: "🧪",
  },
  5: {
    name: "Lưu Trữ Đám Mây & CDN",
    color: "from-purple-500 to-violet-600",
    description: "AWS S3, Cloudflare R2, streaming tệp lớn và tối ưu chi phí egress",
    icon: "☁️",
  },
  6: {
    name: "Cấu Trúc Tệp & Chuyên Sâu",
    color: "from-cyan-500 to-sky-600",
    description: "Bản chất nội bộ PDF, OpenXML, mã hóa UTF-8 và hệ thống MIME types",
    icon: "📖",
  },
};

// Vietnamese translations for post titles and descriptions
export const VI_POST_TRANSLATIONS: Record<
  string,
  { title: string; description: string; ctaText?: string; buttonLabel?: string }
> = {
  "chunked-file-upload-javascript": {
    title: "Hướng Dẫn Tải File Dung Lượng Lớn Theo Chunks Bằng JavaScript",
    description: "Kỹ thuật chia nhỏ file thành từng phần để upload với JavaScript và Fetch API. Xử lý lỗi ngắt kết nối và tặng kèm file mẫu 100MB để kiểm thử.",
    ctaText: "Thử nghiệm tải file theo chunk với file PDF 100MB chuẩn — không cần đăng ký.",
    buttonLabel: "Tải File Mẫu 100MB PDF →",
  },
  "file-upload-progress-bar-html5": {
    title: "Tạo Thanh Tiến Trình Upload File: Hướng Dẫn Chi Tiết HTML5 + Fetch API",
    description: "Xây dựng thanh tiến trình tải file theo thời gian thực sử dụng HTML5 và XMLHttpRequest. Đi kèm CSS mượt mà và file mẫu 50MB DOCX để kiểm thử.",
    ctaText: "Cần file lớn để kiểm tra animation tiến trình? Tải file mẫu 50MB DOCX ngay.",
    buttonLabel: "Tải File Mẫu 50MB DOCX →",
  },
  "multipart-upload-s3-r2-nodejs": {
    title: "Tải Lên Đa Phần (Multipart Upload) Tới S3 & Cloudflare R2 Bằng Node.js",
    description: "Hướng dẫn từng bước sử dụng AWS SDK v3 trong Node.js để upload file lớn tới AWS S3 và Cloudflare R2. Tải kèm file mẫu 500MB để thử nghiệm.",
    ctaText: "Kiểm thử pipeline multipart upload với file 500MB từ Cloudflare R2 CDN.",
    buttonLabel: "Tải File Mẫu 500MB PDF →",
  },
  "resumable-file-upload-tus-javascript": {
    title: "Upload Tệp Có Thể Tiếp Tục (Resumable) Với Giao Thức tus Trong JavaScript",
    description: "Triển khai upload file có thể tự khôi phục khi mất mạng bằng giao thức tus và tus-js-client. Tặng kèm file mẫu 1GB để kiểm tra server.",
    ctaText: "Mô phỏng upload file 1GB và kiểm tra tính năng tiếp tục tải khi mất mạng.",
    buttonLabel: "Tải File Mẫu 1GB PDF →",
  },
  "file-upload-validation-size-type": {
    title: "Xác Thực Tệp Tải Lên: Kích Thước, Định Dạng & Đuôi File (Frontend + Backend)",
    description: "Hướng dẫn toàn diện về kiểm tra kích thước, MIME type và phần mở rộng trên cả Frontend và Backend Node.js. Tải file mẫu kích thước chuẩn xác.",
    ctaText: "Kiểm tra logic xác thực với file đúng dung lượng chuẩn: 1MB, 10MB và 100MB.",
    buttonLabel: "Tải File Mẫu 100MB PDF →",
  },
  "drag-drop-file-upload-react": {
    title: "Tạo Khu Vực Kéo Thả File Trong React Với react-dropzone",
    description: "Xây dựng component kéo thả file chuyên nghiệp trong React với react-dropzone. Hỗ trợ lọc định dạng, xem trước và hiển thị tiến trình.",
    ctaText: "Kiểm thử kéo thả với file mẫu thực tế — tải file PDF, DOCX dung lượng chuẩn.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "hash-file-javascript-sha256-md5": {
    title: "Cách Băm (Hash) File Trong JavaScript: SHA-256, MD5 và SHA-1",
    description: "Tính toán checksum toàn vẹn file trong JavaScript sử dụng Web Crypto API (SHA-256) và Node.js crypto stream. Tặng kèm file mẫu để đối soát.",
    ctaText: "Tải file mẫu để đối soát mã băm — có sẵn bảng mã checksum SHA-256 chuẩn.",
    buttonLabel: "Tải File Mẫu 1MB TXT →",
  },
  "verify-file-integrity-checksum": {
    title: "Cách Kiểm Tra Tính Toàn Vẹn File Sau Khi Tải Xuống (Hướng Dẫn Checksum)",
    description: "Xác thực tính toàn vẹn của tệp bằng MD5, SHA-256 và SHA-512 trên Windows, macOS và Linux. Các lệnh terminal thực tế và file mẫu đã băm sẵn.",
    ctaText: "Tải file mẫu đã tính sẵn checksum SHA-256 để đối chiếu ngay trên máy bạn.",
    buttonLabel: "Tải File Mẫu 1MB PDF →",
  },
  "virus-scan-file-upload-clamav-nodejs": {
    title: "Quét Virus Tệp Tải Lên: Tích Hợp ClamAV Antivirus Với Node.js",
    description: "Tích hợp công cụ quét mã độc ClamAV vào pipeline upload file của Node.js. Bảo vệ ứng dụng khỏi các mã độc với ví dụ code clamscan thực tế.",
    ctaText: "Cần file sạch để kiểm tra hệ thống quét? Tải file mẫu đã qua kiểm định an toàn.",
    buttonLabel: "Tải File Sạch 10MB PDF →",
  },
  "file-type-validation-magic-bytes": {
    title: "Xác Thực Định Dạng Tệp Bằng Magic Bytes (Không Phụ Thuộc Vào Đuôi Mở Rộng)",
    description: "Phát hiện định dạng tệp thực tế bằng magic bytes trong Node.js với thư viện file-type. Chặn đứng các tệp tin giả mạo đổi tên.",
    ctaText: "Kiểm thử validator của bạn với file PDF, DOCX chuẩn xác từng byte đầu tiên.",
    buttonLabel: "Tải File Mẫu 1MB PDF →",
  },
  "encrypt-file-before-upload-aes-javascript": {
    title: "Cách Mã Hóa Tệp Trước Khi Upload: AES-256 Ngay Trên Trình Duyệt",
    description: "Mã hóa tệp tin phía client với AES-256-GCM qua Web Crypto API trước khi gửi lên đám mây. Bảo mật thông tin tuyệt đối không lưu lộ dữ liệu.",
    ctaText: "Sử dụng file TXT mẫu của chúng tôi làm dữ liệu thô để thử hàm mã hóa AES-256.",
    buttonLabel: "Tải File Mẫu 50KB TXT →",
  },
  "presigned-url-s3-r2-secure-download": {
    title: "Presigned URL: Tải Tệp An Toàn Từ S3 & Cloudflare R2 Không Lộ Bucket",
    description: "Tạo link tải tệp có giới hạn thời gian từ AWS S3 và Cloudflare R2 bằng AWS SDK v3 trong Node.js. Bảo mật dữ liệu không cần mở public bucket.",
    ctaText: "Tải file 100MB để đo tốc độ phản hồi time-to-first-byte (TTFB) với presigned URL.",
    buttonLabel: "Tải File Mẫu 100MB PDF →",
  },
  "convert-pdf-to-docx-nodejs": {
    title: "Chuyển Đổi PDF Sang Word DOCX Bằng Node.js",
    description: "Hướng dẫn chuyển đổi tài liệu PDF thành file Word DOCX có thể chỉnh sửa bằng Node.js và LibreOffice headless. Code mẫu hoàn chỉnh và file test.",
    ctaText: "Tải file 10MB PDF mẫu để kiểm tra độ chính xác của pipeline chuyển đổi sang DOCX.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "compress-pdf-javascript-nodejs": {
    title: "Nén Giảm Dung Lượng File PDF Trong JavaScript & Node.js",
    description: "Giảm kích thước file PDF bằng cách tối ưu hóa luồng dữ liệu và giảm độ phân giải ảnh với Ghostscript và pdf-lib. Đi kèm file test 50MB.",
    ctaText: "Tải file PDF 50MB mẫu để đo lường tỷ lệ nén dung lượng và tốc độ xử lý.",
    buttonLabel: "Tải File Mẫu 50MB PDF →",
  },
  "extract-text-pdf-javascript": {
    title: "Trích Xuất Văn Bản Từ File PDF Bằng JavaScript & Node.js",
    description: "Cách trích xuất text từ tệp PDF bằng thư viện pdf-parse trong Node.js và PDF.js trên trình duyệt. Tải file PDF mẫu để kiểm thử.",
    ctaText: "Tải file PDF mẫu 5MB có cấu trúc đầy đủ để kiểm tra khả năng trích xuất text.",
    buttonLabel: "Tải File Mẫu 5MB PDF →",
  },
  "parse-docx-javascript-mammoth": {
    title: "Phân Tích Tệp DOCX Thành HTML & Markdown Với Mammoth.js Trong JavaScript",
    description: "Chuyển đổi tài liệu Word (.docx) sang HTML ngữ nghĩa sạch sẽ với Mammoth.js trong Node.js và trình duyệt. File mẫu DOCX 10MB kiểm thử.",
    ctaText: "Tải file mẫu Word DOCX 10MB chứa bảng biểu và định dạng để test Mammoth.",
    buttonLabel: "Tải File Mẫu 10MB DOCX →",
  },
  "merge-split-pdf-nodejs-pdflib": {
    title: "Tách & Ghép File PDF Trong Node.js Bằng Thư Viện pdf-lib (Thuần JS)",
    description: "Thao tác ghép nhiều tài liệu PDF hoặc trích xuất từng trang riêng biệt bằng pdf-lib hoàn toàn trên bộ nhớ RAM. File mẫu 10MB có sẵn.",
    ctaText: "Tải file PDF nhiều trang dung lượng 10MB để thử nghiệm tách và ghép trang.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "generate-pdf-from-html-nodejs-puppeteer": {
    title: "Tạo File PDF Từ HTML & CSS Chuẩn Pixel Bằng Puppeteer Trong Node.js",
    description: "Dựng tài liệu hóa đơn, báo cáo PDF chất lượng cao từ mã nguồn HTML và CSS sử dụng trình duyệt Chrome không đầu (headless) Puppeteer.",
    ctaText: "Tải file PDF mẫu 1MB để đối chiếu chất lượng hiển thị với file tạo từ Puppeteer.",
    buttonLabel: "Tải File Mẫu 1MB PDF →",
  },
  "generate-dummy-files-qa-testing": {
    title: "Tạo Dummy Files Cho QA Testing: Hướng Dẫn & File Mẫu Miễn Phí",
    description: "Cách tạo và sử dụng dummy files cho QA testing: kiểm thử upload form, giới hạn kích thước, parsing pipeline và load test. Kèm file mẫu miễn phí.",
    ctaText: "Bỏ qua việc viết script phức tạp — tải ngay các file mẫu dung lượng chuẩn hóa.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "test-file-upload-api-postman": {
    title: "Kiểm Thử API Upload Tệp Bằng Postman: Multipart, Binary & Tự Động Hóa",
    description: "Hướng dẫn cấu hình kiểm thử upload file trong Postman. Viết script assertion tự động kiểm tra mã phản hồi và schema cho kỹ sư QA.",
    ctaText: "Cần file Word 10MB sạch để kiểm thử API? Tải file mẫu DOCX đã qua kiểm định.",
    buttonLabel: "Tải File Mẫu 10MB DOCX →",
  },
  "test-pdf-download-playwright-cypress": {
    title: "Kiểm Thử Tải Tệp PDF Tự Động Trong Playwright & Cypress",
    description: "Cách kiểm thử sự kiện download tệp, xác thực tên file và kích thước byte trong các framework automation test E2E Playwright và Cypress.",
    ctaText: "Tải file PDF mẫu 5MB chuẩn để test sự kiện download và assertion tự động.",
    buttonLabel: "Tải File Mẫu 5MB PDF →",
  },
  "load-test-file-download-k6-jmeter": {
    title: "Load Test Tải Tệp Dung Lượng Lớn Với Grafana k6 & Apache JMeter",
    description: "Kiểm thử tải endpoint download tệp với hàng trăm kết nối đồng thời sử dụng k6 và JMeter. Đo lường băng thông CDN và khả năng chịu tải origin.",
    ctaText: "Thực hiện bài kiểm thử tải nặng với file 10MB được cache toàn cầu của chúng tôi.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "unit-test-file-handling-nodejs-jest": {
    title: "Unit Test Xử Lý Tệp Trong Node.js Với Jest: Tránh Ô Nhiễm Đĩa & Rò Rỉ I/O",
    description: "Chiến lược viết unit test cho các hàm đọc, ghi và xử lý tệp trong Node.js sử dụng Jest, Buffer ảo và kỹ thuật mock module an toàn.",
    ctaText: "Tải bộ dữ liệu CSV mẫu 1MB với hơn 10.000 dòng để benchmark parser của bạn.",
    buttonLabel: "Tải File Mẫu 1MB CSV →",
  },
  "mock-filesystem-jest-memfs": {
    title: "Mock Hệ Thống Tệp Bằng memfs Trong Jest: Chạy Test Siêu Tốc Không Ghi Đĩa",
    description: "Sử dụng thư viện memfs để tạo hệ thống file ảo hoàn toàn trong bộ nhớ RAM cho các bài test Jest. Tăng tốc độ kiểm thử gấp 10 lần.",
    ctaText: "Tải file nén ZIP 10MB mẫu để kiểm tra pipeline giải nén và xử lý tệp.",
    buttonLabel: "Tải File Mẫu 10MB ZIP →",
  },
  "cloudflare-r2-vs-aws-s3-comparison": {
    title: "So Sánh Cloudflare R2 vs AWS S3: Tiết Kiệm Chi Phí Băng Thông Egress",
    description: "Phân tích kiến trúc và chi phí lưu trữ tệp giữa Cloudflare R2 và Amazon S3. Tại sao chính sách miễn phí 100% egress của R2 lại vượt trội.",
    ctaText: "Trải nghiệm tốc độ tải độ trễ cực thấp được phục vụ trực tiếp từ Cloudflare R2.",
    buttonLabel: "Tải File Mẫu 100MB PDF →",
  },
  "serve-large-files-cdn-best-practices": {
    title: "Phân Phối Tệp Dung Lượng Lớn Qua CDN: Cấu Hình Cache-Control & Giảm Tải Origin",
    description: "Các quy tắc tối ưu header Cache-Control, kích hoạt byte-range slicing và chống sốc tải origin khi phân phối file dung lượng hàng trăm MB qua CDN.",
    ctaText: "Tải file nén 100MB ZIP để kiểm tra header phản hồi và trạng thái cache hit CDN.",
    buttonLabel: "Tải File Mẫu 100MB ZIP →",
  },
  "stream-large-file-download-nodejs": {
    title: "Truyền Luồng (Stream) Tải Tệp Lớn Trong Node.js Tránh Lỗi Tràn Bộ Nhớ RAM",
    description: "Cách sử dụng luồng đọc Node.js Stream và cơ chế backpressure để phân phối tệp tin dung lượng 1GB mà không tốn tài nguyên máy chủ.",
    ctaText: "Tải file PDF 500MB mẫu để kiểm thử cơ chế quản lý luồng backpressure của bạn.",
    buttonLabel: "Tải File Mẫu 500MB PDF →",
  },
  "http-range-request-partial-content": {
    title: "HTTP Range Request: Tải Từng Phần Tệp Với Mã HTTP 206 Partial Content",
    description: "Cơ chế hoạt động của HTTP Range Request giúp tua video, tiếp tục tải file dở dang và hỗ trợ các trình tăng tốc download đa luồng.",
    ctaText: "Thử nghiệm gửi request dải byte với cURL trên file PDF 10MB mẫu của chúng tôi.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "s3-bucket-policy-public-private": {
    title: "Cấu Hình Bucket Policy S3 & R2: Bảo Mật Tệp Tin & Chỉ Mở Cho CDN",
    description: "Cách thiết lập chính sách truy cập tối thiểu cho S3 và Cloudflare R2, chặn truy cập trực tiếp và chỉ cho phép tải thông qua CDN.",
    ctaText: "Tải file mẫu để kiểm tra chính sách bảo mật xác thực S3 SigV4 của bạn.",
    buttonLabel: "Tải File Mẫu 1MB TXT →",
  },
  "cloud-storage-cost-comparison-2025": {
    title: "So Sánh Chi Phí Lưu Trữ Đám Mây: AWS S3 vs Cloudflare R2 vs Google Cloud",
    description: "Bảng phân tích chi phí lưu trữ và băng thông truyền tải 100TB dữ liệu hàng tháng giữa các nhà cung cấp đám mây hàng đầu hiện nay.",
    ctaText: "Tải file 1GB mẫu để đo lường băng thông truyền tải thực tế từ Cloudflare R2.",
    buttonLabel: "Tải File Mẫu 1GB PDF →",
  },
  "pdf-file-format-structure-internals": {
    title: "Cấu Trúc Bên Trong File PDF: Header, Body, Bảng xref Và Trailer",
    description: "Khám phá cấu trúc nhị phân của tệp PDF theo tiêu chuẩn ISO 32000: các đối tượng gián tiếp, bảng xref và cơ chế Fast Web View.",
    ctaText: "Tải file PDF 1MB chuẩn cấu trúc để kiểm tra bảng xref trong trình xem Hex.",
    buttonLabel: "Tải File Mẫu 1MB PDF →",
  },
  "docx-file-format-openxml-explained": {
    title: "Bản Chất File DOCX Là Gì? Giải Mã Định Dạng Office Open XML",
    description: "Tại sao file Word DOCX thực chất là một tệp nén ZIP chứa các cây thư mục XML và cách chỉnh sửa văn bản trực tiếp không cần cài Microsoft Word.",
    ctaText: "Tải file DOCX 10MB mẫu để giải nén và khám phá cây thư mục XML bên trong.",
    buttonLabel: "Tải File Mẫu 10MB DOCX →",
  },
  "utf8-utf16-utf32-text-encoding": {
    title: "Mã Hóa Ký Tự UTF-8, UTF-16 Và UTF-32: Bản Chất Byte & Tránh Lỗi Font",
    description: "Hiểu rõ cơ chế biến đổi code point Unicode thành byte trong UTF-8, xử lý Byte Order Mark (BOM) và khắc phục triệt để lỗi hiển thị font.",
    ctaText: "Tải file văn bản thuần 1MB UTF-8 để kiểm tra giải mã ký tự đa byte của bạn.",
    buttonLabel: "Tải File Mẫu 1MB TXT →",
  },
  "file-size-bytes-kb-mb-gb-explained": {
    title: "Phân Biệt Đơn Vị Kích Thước File: Bytes, KB, MB, GB (Thập Phân vs Nhị Phân)",
    description: "Sự khác biệt giữa hệ thập phân (1MB = 1.000.000 bytes) và hệ nhị phân (1MiB = 1.048.576 bytes). Cách định dạng dung lượng chuẩn xác.",
    ctaText: "Tải file PDF chính xác 10.485.760 bytes để kiểm tra ranh giới kiểm thực của bạn.",
    buttonLabel: "Tải File Mẫu 10MB PDF →",
  },
  "mime-types-complete-guide-web-developer": {
    title: "Cẩm Nang Toàn Diện Về MIME Types Cho Lập Trình Viên Web",
    description: "Bảng tra cứu MIME type chuẩn IANA, cách cấu hình header Content-Type và tầm quan trọng sống còn của header X-Content-Type-Options: nosniff.",
    ctaText: "Tải file CSV 1MB được phân phối với header MIME type text/csv chuẩn xác.",
    buttonLabel: "Tải File Mẫu 1MB CSV →",
  },
  "binary-vs-text-files-explained": {
    title: "File Nhị Phân (Binary) vs File Văn Bản (Text): Bản Chất Khác Biệt Là Gì?",
    description: "Tìm hiểu sự khác biệt cơ bản giữa tệp văn bản và tệp nhị phân, thuật toán kiểm tra byte null (0x00) và cách xử lý ngắt dòng an toàn.",
    ctaText: "Tải file ảnh PNG 1MB mẫu để phân tích cấu trúc khối binary so với file text.",
    buttonLabel: "Tải File Mẫu 1MB PNG →",
  },
};

export function getLocalizedPost(post: BlogPost, locale: "en" | "vi" = "en"): BlogPost {
  if (locale === "en") return post;
  const trans = VI_POST_TRANSLATIONS[post.slug];
  const cluster = VI_CLUSTER_META[post.cluster];

  if (!trans) return post;

  return {
    ...post,
    title: trans.title || post.title,
    description: trans.description || post.description,
    clusterName: cluster ? cluster.name : post.clusterName,
    downloadCTA: {
      ...post.downloadCTA,
      text: trans.ctaText || post.downloadCTA.text,
      buttonLabel: trans.buttonLabel || post.downloadCTA.buttonLabel,
    },
  };
}
