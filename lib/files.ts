export type FileType = "pdf" | "docx" | "txt" | "jpg" | "png" | "csv" | "json" | "zip";

export interface FileTypeMeta {
  type: FileType;
  name: string;
  category: "Document" | "Image" | "Data" | "Archive";
  extension: string;
  mimeType: string;
  magicBytes: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  shortDesc: string;
  longDesc: string;
  testingScenarios: string[];
}

export interface FileEntry {
  type: FileType;
  slug: string;
  label: string;
  sizeBytes: number;
  r2Key: string;
  description: string;
}

export const FILE_TYPES: Record<FileType, FileTypeMeta> = {
  pdf: {
    type: "pdf",
    name: "PDF Document",
    category: "Document",
    extension: ".pdf",
    mimeType: "application/pdf",
    magicBytes: "%PDF-1.4 (25 50 44 46)",
    color: "from-red-500 to-rose-600",
    badgeBg: "bg-red-500/10 border-red-500/20",
    badgeText: "text-red-500",
    shortDesc: "Standard Portable Document Format files for rendering, printing, and upload testing.",
    longDesc: "PDF (Portable Document Format) is the global standard for electronic documents. Our sample PDF files are structurally compliant, containing valid catalog and page objects padded to exact sizes, making them perfect for testing PDF readers, preview widgets, upload size limits, and email attachment restrictions.",
    testingScenarios: [
      "File upload size validation in web forms and mobile apps",
      "Memory leak profiling in PDF viewers and rendering engines (PDF.js, Adobe SDK)",
      "Email gateway file size limit checks (10MB, 25MB limits)",
      "Object storage upload pipelines (AWS S3, Cloudflare R2, Google Cloud Storage)",
    ],
  },
  docx: {
    type: "docx",
    name: "Microsoft Word (DOCX)",
    category: "Document",
    extension: ".docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magicBytes: "PK.. (50 4B 03 04 - Zip archive)",
    color: "from-blue-500 to-indigo-600",
    badgeBg: "bg-blue-500/10 border-blue-500/20",
    badgeText: "text-blue-500",
    shortDesc: "OpenXML word processing files for document parsers, converter APIs, and office software.",
    longDesc: "DOCX is an OpenXML-based format used by Microsoft Word, Google Docs, and LibreOffice. Our dummy DOCX files simulate real document archives, enabling developers to stress-test document converters, text extractors, antivirus scanners, and cloud storage systems.",
    testingScenarios: [
      "Document ingestion and OCR processing pipelines",
      "Testing document conversion tools (DOCX to PDF, HTML, Markdown)",
      "Enterprise CMS and intranet upload quotas",
      "Antivirus and file inspection sandbox scanning latency",
    ],
  },
  txt: {
    type: "txt",
    name: "Plain Text (TXT)",
    category: "Document",
    extension: ".txt",
    mimeType: "text/plain; charset=utf-8",
    magicBytes: "Plain ASCII / UTF-8 text",
    color: "from-slate-400 to-slate-600",
    badgeBg: "bg-slate-500/10 border-slate-500/20",
    badgeText: "text-slate-400",
    shortDesc: "Authentic 2026 AI industry whitepapers, multilingual terminology, and ASCII specs.",
    longDesc: "Text files are fundamental for software development. Our sample TXT files provide authentic technical literature on 2026 artificial intelligence architectures, UTF-8 multilingual terminology, ASCII specifications, and large-scale texts up to 10MB to test string buffers, tokenizers, and stream readers.",
    testingScenarios: [
      "Character encoding detectors (UTF-8, UTF-16, ASCII)",
      "Chunked stream reading and line-by-line processing benchmarks",
      "LLM context window feeding and tokenizer evaluations",
      "Log aggregation and Elasticsearch ingestion tests",
    ],
  },
  jpg: {
    type: "jpg",
    name: "JPEG Image (JPG)",
    category: "Image",
    extension: ".jpg",
    mimeType: "image/jpeg",
    magicBytes: "FF D8 FF (JPEG SOI)",
    color: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-500/10 border-amber-500/20",
    badgeText: "text-amber-500",
    shortDesc: "Compressed sample JPEG images for thumbnail generators, image CDNs, and media galleries.",
    longDesc: "JPEG is the most widely supported lossy image format on the web. Our sample JPG files allow developers to test image optimization algorithms, CDN resizing APIs, EXIF metadata parsers, and profile picture upload validation.",
    testingScenarios: [
      "Image processing pipelines (Sharp, ImageMagick, libvips)",
      "Responsive image CDN transformations and WebP/AVIF auto-conversions",
      "Form validation for avatar and photo upload dimensions",
      "Mobile camera photo upload simulation",
    ],
  },
  png: {
    type: "png",
    name: "PNG Image (PNG)",
    category: "Image",
    extension: ".png",
    mimeType: "image/png",
    magicBytes: "89 50 4E 47 0D 0A 1A 0A",
    color: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    badgeText: "text-emerald-500",
    shortDesc: "Lossless PNG images with alpha channel transparency for UI testing and graphic pipelines.",
    longDesc: "Portable Network Graphics (PNG) provides lossless compression and full alpha transparency. These sample PNG files range from lightweight 100KB icons to heavy 10MB assets to evaluate graphics memory usage and lossless compression efficiency.",
    testingScenarios: [
      "Alpha channel transparency rendering in web browsers and game engines",
      "PNG compression tools (pngquant, optipng) performance testing",
      "Raster graphic import in design tools (Figma, Canvas apps)",
      "High-DPI / Retina asset display verification",
    ],
  },
  csv: {
    type: "csv",
    name: "Comma Separated Values (CSV)",
    category: "Data",
    extension: ".csv",
    mimeType: "text/csv; charset=utf-8",
    magicBytes: "ASCII / UTF-8 delimiter table",
    color: "from-green-500 to-emerald-600",
    badgeBg: "bg-green-500/10 border-green-500/20",
    badgeText: "text-green-500",
    shortDesc: "Authentic 2026 AI model benchmark datasets with reasoning scores and pricing.",
    longDesc: "CSV files are the backbone of data imports and exports. Our sample CSV files feature authentic 2026 AI model benchmark datasets (Model Name, Developer, Architecture, Parameters, Benchmark Scores, Pricing) sized up to 10MB to test ETL pipelines, spreadsheet software, and bulk import APIs.",
    testingScenarios: [
      "Bulk user / product import functions in SaaS applications",
      "Streaming CSV parsers (PapaParse, csv-parser) benchmark",
      "Database batch inserts with PostgreSQL / MySQL COPY commands",
      "Data science pipelines with Pandas, Polars, and DuckDB",
    ],
  },
  json: {
    type: "json",
    name: "JavaScript Object Notation (JSON)",
    category: "Data",
    extension: ".json",
    mimeType: "application/json",
    magicBytes: "7B (ASCII '{')",
    color: "from-yellow-500 to-amber-500",
    badgeBg: "bg-yellow-500/10 border-yellow-500/20",
    badgeText: "text-yellow-400",
    shortDesc: "100% valid JSON datasets of 2026 frontier AI models and LLM evaluation metrics.",
    longDesc: "JSON is the universal data interchange format for modern APIs. Our dummy JSON files contain 100% syntactically valid datasets documenting frontier reasoning models, evaluation benchmarks (MATH-500, HumanEval), and token pricing, sized up to 10MB for API performance and serialization benchmarking.",
    testingScenarios: [
      "REST API request/response payload payload size limits",
      "Evaluating `JSON.parse` memory overhead on large objects (5MB+)",
      "Document database ingestion (MongoDB, DynamoDB)",
      "Front-end virtualized list rendering with thousands of items",
    ],
  },
  zip: {
    type: "zip",
    name: "ZIP Archive (ZIP)",
    category: "Archive",
    extension: ".zip",
    mimeType: "application/zip",
    magicBytes: "50 4B 03 04 (PK..)",
    color: "from-purple-500 to-violet-600",
    badgeBg: "bg-purple-500/10 border-purple-500/20",
    badgeText: "text-purple-400",
    shortDesc: "Compressed archive files containing dummy contents for extractor and decompressor tests.",
    longDesc: "ZIP is standard for file packaging and transmission. Our sample ZIP archives test zip decompression logic, zip bomb protection filters, upload extraction workflows, and multi-file archive downloads.",
    testingScenarios: [
      "Testing automated unpack and extraction workers in cloud functions",
      "Verifying file upload scanners for malicious nested archives",
      "E-commerce digital asset delivery downloads",
      "Measuring decompression speed on low-power devices",
    ],
  },
};

// Document Sizes
const DOC_SIZES = [
  { slug: "1mb",   label: "1 MB",   bytes: 1_048_576 },
  { slug: "5mb",   label: "5 MB",   bytes: 5_242_880 },
  { slug: "10mb",  label: "10 MB",  bytes: 10_485_760 },
  { slug: "15mb",  label: "15 MB",  bytes: 15_728_640 },
  { slug: "20mb",  label: "20 MB",  bytes: 20_971_520 },
  { slug: "30mb",  label: "30 MB",  bytes: 31_457_280 },
  { slug: "50mb",  label: "50 MB",  bytes: 52_428_800 },
  { slug: "100mb", label: "100 MB", bytes: 104_857_600 },
  { slug: "200mb", label: "200 MB", bytes: 209_715_200 },
  { slug: "500mb", label: "500 MB", bytes: 524_288_000 },
  { slug: "1gb",   label: "1 GB",   bytes: 1_073_741_824 },
];

export const FILES: FileEntry[] = [
  // PDF
  ...DOC_SIZES.map((s) => ({
    type: "pdf" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `pdf/sample-${s.slug}.pdf`,
    description: `Download a valid sample PDF file ${s.label} in size containing the 2026 Global AI & Machine Learning Industry Report. Perfect for testing file upload systems, email attachments, PDF viewers, and cloud storage APIs.`,
  })),

  // DOCX
  ...DOC_SIZES.map((s) => ({
    type: "docx" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `docx/sample-${s.slug}.docx`,
    description: `Download a sample Microsoft Word DOCX file ${s.label} in size containing authentic 2026 AI industry analysis chapters. Useful for testing document parsers, Word processors, and enterprise file upload endpoints.`,
  })),

  // TXT
  {
    type: "txt",
    slug: "lorem",
    label: "AI Executive Summary (50 KB)",
    sizeBytes: 51_200,
    r2Key: "txt/sample-lorem.txt",
    description: "Download an authentic 50 KB text file containing the Executive Summary of the 2026 Global AI & Machine Learning Industry Report.",
  },
  {
    type: "txt",
    slug: "unicode",
    label: "Multilingual AI Lexicon (50 KB)",
    sizeBytes: 51_200,
    r2Key: "txt/sample-unicode.txt",
    description: "Download a 50 KB UTF-8 text file containing international artificial intelligence terminology across 10 global languages.",
  },
  {
    type: "txt",
    slug: "ascii",
    label: "ASCII AI Technical Spec (100 KB)",
    sizeBytes: 102_400,
    r2Key: "txt/sample-ascii.txt",
    description: "Download a 100 KB ASCII plain text sample file containing structured AI technical specifications for buffer and encoding checks.",
  },
  {
    type: "txt",
    slug: "large",
    label: "Complete AI Report (1 MB)",
    sizeBytes: 1_048_576,
    r2Key: "txt/sample-large.txt",
    description: "Download the complete 1 MB 2026 AI & Machine Learning Industry Report covering reasoning models, compute economics, and enterprise safety.",
  },
  {
    type: "txt",
    slug: "5mb",
    label: "Extended AI Research (5 MB)",
    sizeBytes: 5_242_880,
    r2Key: "txt/sample-5mb.txt",
    description: "Download an extended 5 MB technical text file containing comprehensive AI whitepaper volumes and technical documentation.",
  },
  {
    type: "txt",
    slug: "10mb",
    label: "Full AI Archive (10 MB)",
    sizeBytes: 10_485_760,
    r2Key: "txt/sample-10mb.txt",
    description: "Download a 10 MB plain text archive containing in-depth AI research literature for large data ingestion and string allocation testing.",
  },

  // JPG
  ...[
    { slug: "100kb", label: "100 KB", bytes: 102_400 },
    { slug: "500kb", label: "500 KB", bytes: 512_000 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576 },
    { slug: "2mb",   label: "2 MB",   bytes: 2_097_152 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760 },
  ].map((s) => ({
    type: "jpg" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `jpg/sample-${s.slug}.jpg`,
    description: `Download a sample JPEG image ${s.label} in size for image processing pipelines, responsive CDN testing, and thumbnail validation.`,
  })),

  // PNG
  ...[
    { slug: "100kb", label: "100 KB", bytes: 102_400 },
    { slug: "500kb", label: "500 KB", bytes: 512_000 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576 },
    { slug: "2mb",   label: "2 MB",   bytes: 2_097_152 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760 },
  ].map((s) => ({
    type: "png" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `png/sample-${s.slug}.png`,
    description: `Download a sample PNG image ${s.label} in size with lossless compression and alpha transparency support for graphics rendering tests.`,
  })),

  // CSV
  ...[
    { slug: "100kb", label: "100 KB", bytes: 102_400 },
    { slug: "500kb", label: "500 KB", bytes: 512_000 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760 },
  ].map((s) => ({
    type: "csv" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `csv/sample-${s.slug}.csv`,
    description: `Download an authentic 2026 AI model benchmark dataset in CSV format ${s.label} in size, with reasoning scores, token costs, and model architectures.`,
  })),

  // JSON
  ...[
    { slug: "50kb",  label: "50 KB",  bytes: 51_200 },
    { slug: "200kb", label: "200 KB", bytes: 204_800 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760 },
  ].map((s) => ({
    type: "json" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `json/sample-${s.slug}.json`,
    description: `Download a 100% valid JSON file ${s.label} in size containing structured 2026 AI model benchmarks, evaluations (MATH-500, HumanEval), and pricing telemetry.`,
  })),

  // ZIP
  ...[
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760 },
    { slug: "25mb",  label: "25 MB",  bytes: 26_214_400 },
    { slug: "50mb",  label: "50 MB",  bytes: 52_428_800 },
    { slug: "100mb", label: "100 MB", bytes: 104_857_600 },
  ].map((s) => ({
    type: "zip" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `zip/sample-${s.slug}.zip`,
    description: `Download a valid sample ZIP archive ${s.label} in size containing extractable 2026 AI research reports, benchmark CSV datasets, and documentation.`,
  })),
];

export function getFile(type: string, slug: string): FileEntry | undefined {
  return FILES.find((f) => f.type === type && f.slug === slug);
}

export function getFilesByType(type: string): FileEntry[] {
  return FILES.filter((f) => f.type === type);
}

export function getAllFileTypes(): FileTypeMeta[] {
  return Object.values(FILE_TYPES);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
