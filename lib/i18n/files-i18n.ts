import { FileType, FileTypeMeta } from "../files";

export interface LocalizedFileTypeMeta {
  name: string;
  category: "Tài liệu" | "Hình ảnh" | "Dữ liệu" | "Nén & Lưu trữ";
  shortDesc: string;
  longDesc: string;
  testingScenarios: string[];
}

export const VI_FILE_TYPES: Record<FileType, LocalizedFileTypeMeta> = {
  pdf: {
    name: "Tài Liệu PDF",
    category: "Tài liệu",
    shortDesc: "Tệp Portable Document Format chuẩn quốc tế để kiểm thử hiển thị, in ấn và tải lên.",
    longDesc:
      "PDF (Portable Document Format) là tiêu chuẩn toàn cầu cho tài liệu số. Các file PDF mẫu của chúng tôi tuân thủ đầy đủ cấu trúc ISO 32000, chứa các catalog và page object hợp lệ được đệm chính xác theo từng mức dung lượng. Lý tưởng để kiểm thử trình xem PDF, giới hạn dung lượng upload và hạn chế tệp đính kèm email.",
    testingScenarios: [
      "Kiểm tra giới hạn dung lượng tải tệp lên trong form web và ứng dụng di động.",
      "Đo lường rò rỉ bộ nhớ (memory leaks) trong các engine dựng PDF (PDF.js, Adobe SDK).",
      "Kiểm tra bộ lọc kích thước tệp đính kèm cổng email (mốc 10MB, 25MB).",
      "Quy trình tải lên lưu trữ đám mây (AWS S3, Cloudflare R2, Google Cloud Storage).",
    ],
  },
  docx: {
    name: "Microsoft Word (DOCX)",
    category: "Tài liệu",
    shortDesc: "Tệp xử lý văn bản OpenXML chuẩn cho bộ chuyển đổi, API phân tích và phần mềm văn phòng.",
    longDesc:
      "DOCX là định dạng tài liệu dựa trên chuẩn OpenXML được sử dụng bởi Microsoft Word, Google Docs và LibreOffice. Các file DOCX mẫu của chúng tôi mô phỏng đúng cấu trúc gói nén ZIP chứa các cây thư mục XML hợp lệ, giúp kỹ sư kiểm thử độ chịu tải của bộ trích xuất văn bản, quét mã độc và đồng bộ đám mây.",
    testingScenarios: [
      "Quy trình xử lý nhập tài liệu và trích xuất dữ liệu OCR.",
      "Kiểm thử khả năng chuyển đổi tài liệu Word sang PDF hoặc HTML.",
      "Độ trễ khi tải và giải nén tệp tài liệu lớn trên ứng dụng di động.",
      "Xác thực bộ lọc tập tin Microsoft Office của cổng bảo mật.",
    ],
  },
  txt: {
    name: "Tệp Văn Bản Thuần (TXT)",
    category: "Tài liệu",
    shortDesc: "Tệp văn bản thuần mã hóa UTF-8 chuẩn xác để kiểm thử stream dữ liệu và benchmark I/O.",
    longDesc:
      "TXT là định dạng dữ liệu văn bản phổ biến và gọn nhẹ nhất trong khoa học máy tính. Các file TXT mẫu của chúng tôi chứa các chuỗi văn bản mã hóa UTF-8 với dung lượng từ 50KB đến 1GB, là công cụ hoàn hảo để kiểm tra khả năng xử lý log, tải tệp streaming và benchmark hiệu suất I/O đĩa cứng.",
    testingScenarios: [
      "Benchmark tốc độ xử lý I/O và truyền luồng tệp tin văn bản lớn.",
      "Kiểm thử tính toàn vẹn của mã hóa ký tự UTF-8 và nhận diện byte.",
      "Kiểm thử tính năng tìm kiếm toàn văn (full-text search) và lập chỉ mục Elasticsearch.",
      "Đo lường tốc độ phân tích log và ingestion trong các pipeline Big Data.",
    ],
  },
  jpg: {
    name: "Hình Ảnh JPEG (JPG)",
    category: "Hình ảnh",
    shortDesc: "Định dạng ảnh nén tiêu chuẩn để kiểm thử pipeline xử lý ảnh, nén dữ liệu và CDN.",
    longDesc:
      "JPEG (JPG) là định dạng chuẩn cho nhiếp ảnh số và nội dung web. Các file JPG mẫu của chúng tôi được tạo với đầy đủ JFIF header và thông số nén ảnh chuẩn, thích hợp để kiểm tra trình cắt ảnh (cropper), tạo thumbnail tự động, xác thực upload avatar và bộ lọc CDN.",
    testingScenarios: [
      "Quy trình xử lý ảnh tự động (tạo thumbnail, nén giảm dung lượng, chuyển sang WebP/AVIF).",
      "Kiểm thử giới hạn upload ảnh trong form đăng tải hình ảnh và avatar người dùng.",
      "Đo lường thời gian tải và hiệu ứng progressive rendering trên trình duyệt.",
      "Kiểm tra bảo mật: phát hiện tệp ảnh giả mạo hoặc chứa mã độc nhúng.",
    ],
  },
  png: {
    name: "Hình Ảnh PNG",
    category: "Hình ảnh",
    shortDesc: "Định dạng ảnh không mất dữ liệu với kênh alpha để kiểm thử đồ họa và thư viện UI.",
    longDesc:
      "PNG (Portable Network Graphics) hỗ trợ nén không mất dữ liệu (lossless) và kênh trong suốt (alpha channel). File PNG mẫu giúp nhà phát triển kiểm tra khả năng tối ưu ảnh, kiểm thử thư viện đồ họa (Canvas, Sharp, ImageMagick) và đo lường mức độ chiếm dụng RAM khi render ảnh kích thước lớn.",
    testingScenarios: [
      "Kiểm thử render độ trong suốt (alpha channel) và hiển thị đồ họa giao diện.",
      "Đo lường dung lượng bộ nhớ RAM tiêu thụ khi render ảnh bitmap phân giải cao.",
      "Quy trình kiểm tra tính toàn vẹn khi tải ảnh lên nền tảng thiết kế và e-commerce.",
      "Benchmark tốc độ nén PNG sang định dạng thế hệ mới như WebP hoặc AVIF.",
    ],
  },
  csv: {
    name: "Bảng Dữ Liệu CSV",
    category: "Dữ liệu",
    shortDesc: "Tệp bảng tính phân tách bằng dấu phẩy để kiểm thử hệ thống nhập liệu và phân tích dữ liệu.",
    longDesc:
      "CSV (Comma-Separated Values) là định dạng tiêu chuẩn để trao đổi dữ liệu bảng tính giữa các hệ thống cơ sở dữ liệu. Các file CSV của chúng tôi bao gồm hàng nghìn đến hàng triệu dòng dữ liệu mẫu chuẩn hóa, hoàn hảo để kiểm thử tính năng nhập danh bạ, đối soát giao dịch và phân tích số liệu tài chính.",
    testingScenarios: [
      "Kiểm thử khả năng chịu tải của tính năng import tệp dữ liệu vào database.",
      "Xác thực việc xử lý ngắt dòng, ký tự đặc biệt, dấu ngoặc kép và dấu phẩy.",
      "Benchmark tốc độ phân tích cú pháp (parsing) của thư viện Papaparse hoặc Fast-CSV.",
      "Kiểm tra quy trình xử lý theo batch (lô) và hiển thị thanh tiến trình import.",
    ],
  },
  json: {
    name: "Đối Tượng Dữ Liệu JSON",
    category: "Dữ liệu",
    shortDesc: "Cấu trúc dữ liệu JSON chuẩn để kiểm thử parser API, serialization và schema validation.",
    longDesc:
      "JSON (JavaScript Object Notation) là ngôn ngữ trao đổi dữ liệu chuẩn của web hiện đại. File JSON mẫu với các mức kích thước từ nhỏ đến hàng trăm MB giúp kiểm thử độ chịu tải của parser JSON, khả năng xử lý streaming JSON của backend và ngăn chặn lỗi tràn bộ nhớ (Out-Of-Memory).",
    testingScenarios: [
      "Đo lường hiệu năng của các hàm JSON.parse() với payload dung lượng lớn.",
      "Kiểm thử tính năng streaming JSON qua các thư viện JSONStream hoặc oboe.js.",
      "Xác thực schema JSON và quy trình nhập dữ liệu vào NoSQL (MongoDB, DynamoDB).",
      "Kiểm thử giới hạn payload kích thước body của API Gateway và Reverse Proxy.",
    ],
  },
  zip: {
    name: "Tệp Nén ZIP Archive",
    category: "Nén & Lưu trữ",
    shortDesc: "Tệp lưu trữ nén chuẩn để kiểm thử giải nén tự động, kiểm tra zip-bomb và quét virus.",
    longDesc:
      "ZIP là định dạng nén và lưu trữ phổ biến nhất trên toàn thế giới. Các file ZIP mẫu của chúng tôi chứa các tệp tin hợp lệ bên trong, cho phép kiểm tra tốc độ nén/giải nén, xác thực dung lượng sau khi trích xuất và bảo vệ hệ thống trước các kịch bản tấn công khai thác lỗ hổng tệp nén.",
    testingScenarios: [
      "Kiểm thử tính năng tự động giải nén và trích xuất tài liệu trên máy chủ.",
      "Kiểm thử an toàn: phát hiện và ngăn chặn kịch bản tấn công Zip Slip (path traversal).",
      "Đo lường thời gian xử lý và tỷ lệ giải nén của các tiến trình background worker.",
      "Kiểm tra tính năng quét mã độc tự động bên trong các tệp lưu trữ nén.",
    ],
  },
};

export function getLocalizedFileTypeMeta(type: FileType, locale: "en" | "vi" = "en") {
  return locale === "vi" ? VI_FILE_TYPES[type] : null;
}
