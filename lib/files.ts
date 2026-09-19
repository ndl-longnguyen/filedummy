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
  sha256: string;
  md5: string;
  baseDownloads: number;
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
    shortDesc: "Raw text files with Lorem Ipsum, UTF-8 multilingual characters, and ASCII sets.",
    longDesc: "Text files are fundamental for software development. Our sample TXT files provide varying encodings, large file sizes up to 10MB, international UTF-8 character sets, and standard ASCII to test string buffers, tokenizers, and stream readers.",
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
    shortDesc: "Structured tabular datasets with headers, numbers, dates, and quoted text fields.",
    longDesc: "CSV files are the backbone of data imports and exports. Our sample CSV files feature realistic tabular columns (ID, Name, Email, Country, Timestamp, Amount) sized up to 10MB to test ETL pipelines, spreadsheet software, and bulk import APIs.",
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
    shortDesc: "Syntactically valid JSON payloads with nested arrays and records for API stress testing.",
    longDesc: "JSON is the universal data interchange format for modern APIs. Our dummy JSON files contain syntactically valid mock object arrays, allowing engineers to test JSON stream parsers, REST and GraphQL endpoints, and database document storage.",
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
  { slug: "1mb",   label: "1 MB",   bytes: 1_048_576, baseDl: 18450 },
  { slug: "5mb",   label: "5 MB",   bytes: 5_242_880, baseDl: 15200 },
  { slug: "10mb",  label: "10 MB",  bytes: 10_485_760, baseDl: 29800 },
  { slug: "15mb",  label: "15 MB",  bytes: 15_728_640, baseDl: 8900 },
  { slug: "20mb",  label: "20 MB",  bytes: 20_971_520, baseDl: 11400 },
  { slug: "30mb",  label: "30 MB",  bytes: 31_457_280, baseDl: 6700 },
  { slug: "50mb",  label: "50 MB",  bytes: 52_428_800, baseDl: 14300 },
  { slug: "100mb", label: "100 MB", bytes: 104_857_600, baseDl: 19500 },
  { slug: "200mb", label: "200 MB", bytes: 209_715_200, baseDl: 7800 },
  { slug: "500mb", label: "500 MB", bytes: 524_288_000, baseDl: 9200 },
  { slug: "1gb",   label: "1 GB",   bytes: 1_073_741_824, baseDl: 12100 },
];

// Helper to generate mock hash
function mockHash(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return {
    sha256: `${hex}8c4f9a72e19d36bb024a87e53d9c12b${hex}440f9172`,
    md5: `${hex}b58a74e921d${hex}`.slice(0, 32),
  };
}

export const FILES: FileEntry[] = [
  // PDF
  ...DOC_SIZES.map((s) => {
    const hashes = mockHash(`pdf-${s.slug}`);
    return {
      type: "pdf" as FileType,
      slug: s.slug,
      label: s.label,
      sizeBytes: s.bytes,
      r2Key: `pdf/sample-${s.slug}.pdf`,
      description: `Download a valid sample PDF file ${s.label} in size. Perfect for testing file upload systems, email attachments, PDF viewers, and cloud storage APIs.`,
      sha256: hashes.sha256,
      md5: hashes.md5,
      baseDownloads: s.baseDl,
    };
  }),

  // DOCX
  ...DOC_SIZES.map((s) => {
    const hashes = mockHash(`docx-${s.slug}`);
    return {
      type: "docx" as FileType,
      slug: s.slug,
      label: s.label,
      sizeBytes: s.bytes,
      r2Key: `docx/sample-${s.slug}.docx`,
      description: `Download a sample Microsoft Word DOCX file ${s.label} in size. Useful for testing document parsers, Word processors, and enterprise file upload endpoints.`,
      sha256: hashes.sha256,
      md5: hashes.md5,
      baseDownloads: Math.round(s.baseDl * 0.75),
    };
  }),

  // TXT
  {
    type: "txt",
    slug: "lorem",
    label: "Lorem Ipsum (50 KB)",
    sizeBytes: 51_200,
    r2Key: "txt/sample-lorem.txt",
    description: "Download a clean sample TXT file with standard Lorem Ipsum text. Ideal for testing text editors, parsers, and string manipulation.",
    sha256: mockHash("txt-lorem").sha256,
    md5: mockHash("txt-lorem").md5,
    baseDownloads: 23100,
  },
  {
    type: "txt",
    slug: "unicode",
    label: "Unicode Multi-Language (50 KB)",
    sizeBytes: 51_200,
    r2Key: "txt/sample-unicode.txt",
    description: "Download a sample UTF-8 TXT file containing English, Japanese, Chinese, Arabic, Cyrillic, and Vietnamese characters for i18n testing.",
    sha256: mockHash("txt-unicode").sha256,
    md5: mockHash("txt-unicode").md5,
    baseDownloads: 14700,
  },
  {
    type: "txt",
    slug: "ascii",
    label: "ASCII Characters (100 KB)",
    sizeBytes: 102_400,
    r2Key: "txt/sample-ascii.txt",
    description: "Download a 100KB ASCII plain text sample file containing all standard printable characters for buffer and encoding checks.",
    sha256: mockHash("txt-ascii").sha256,
    md5: mockHash("txt-ascii").md5,
    baseDownloads: 9800,
  },
  {
    type: "txt",
    slug: "large",
    label: "Large Text (1 MB)",
    sizeBytes: 1_048_576,
    r2Key: "txt/sample-large.txt",
    description: "Download a large 1 MB TXT file for stress-testing text parsers, log aggregators, and streaming readers.",
    sha256: mockHash("txt-large").sha256,
    md5: mockHash("txt-large").md5,
    baseDownloads: 18400,
  },
  {
    type: "txt",
    slug: "5mb",
    label: "Heavy Text (5 MB)",
    sizeBytes: 5_242_880,
    r2Key: "txt/sample-5mb.txt",
    description: "Download a heavy 5 MB TXT file to evaluate memory consumption during text loading and search indexing.",
    sha256: mockHash("txt-5mb").sha256,
    md5: mockHash("txt-5mb").md5,
    baseDownloads: 8100,
  },
  {
    type: "txt",
    slug: "10mb",
    label: "Ultra Text (10 MB)",
    sizeBytes: 10_485_760,
    r2Key: "txt/sample-10mb.txt",
    description: "Download a 10 MB plain text file for large data ingestion and string allocation testing.",
    sha256: mockHash("txt-10mb").sha256,
    md5: mockHash("txt-10mb").md5,
    baseDownloads: 6200,
  },

  // JPG
  ...[
    { slug: "100kb", label: "100 KB", bytes: 102_400, dl: 14500 },
    { slug: "500kb", label: "500 KB", bytes: 512_000, dl: 19800 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576, dl: 24300 },
    { slug: "2mb",   label: "2 MB",   bytes: 2_097_152, dl: 16700 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880, dl: 18900 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760, dl: 12200 },
  ].map((s) => ({
    type: "jpg" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `jpg/sample-${s.slug}.jpg`,
    description: `Download a high quality sample JPG photo file ${s.label} in size for image gallery testing, upload limits, and CDN transformations.`,
    sha256: mockHash(`jpg-${s.slug}`).sha256,
    md5: mockHash(`jpg-${s.slug}`).md5,
    baseDownloads: s.dl,
  })),

  // PNG
  ...[
    { slug: "100kb", label: "100 KB", bytes: 102_400, dl: 12400 },
    { slug: "500kb", label: "500 KB", bytes: 512_000, dl: 15300 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576, dl: 21200 },
    { slug: "2mb",   label: "2 MB",   bytes: 2_097_152, dl: 13900 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880, dl: 14800 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760, dl: 9500 },
  ].map((s) => ({
    type: "png" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `png/sample-${s.slug}.png`,
    description: `Download a sample lossless PNG image file ${s.label} in size with transparency support for graphic asset testing.`,
    sha256: mockHash(`png-${s.slug}`).sha256,
    md5: mockHash(`png-${s.slug}`).md5,
    baseDownloads: s.dl,
  })),

  // CSV
  ...[
    { slug: "100kb", label: "100 KB", bytes: 102_400, dl: 11200 },
    { slug: "500kb", label: "500 KB", bytes: 512_000, dl: 13400 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576, dl: 17800 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880, dl: 12900 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760, dl: 8900 },
  ].map((s) => ({
    type: "csv" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `csv/sample-${s.slug}.csv`,
    description: `Download a sample CSV data table file ${s.label} in size with headers, customer records, and numeric columns for import testing.`,
    sha256: mockHash(`csv-${s.slug}`).sha256,
    md5: mockHash(`csv-${s.slug}`).md5,
    baseDownloads: s.dl,
  })),

  // JSON
  ...[
    { slug: "50kb",  label: "50 KB",  bytes: 51_200, dl: 14200 },
    { slug: "200kb", label: "200 KB", bytes: 204_800, dl: 16100 },
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576, dl: 22800 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880, dl: 14700 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760, dl: 9800 },
  ].map((s) => ({
    type: "json" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `json/sample-${s.slug}.json`,
    description: `Download a valid dummy JSON file ${s.label} in size containing array of nested objects for REST API and parser load testing.`,
    sha256: mockHash(`json-${s.slug}`).sha256,
    md5: mockHash(`json-${s.slug}`).md5,
    baseDownloads: s.dl,
  })),

  // ZIP
  ...[
    { slug: "1mb",   label: "1 MB",   bytes: 1_048_576, dl: 13900 },
    { slug: "5mb",   label: "5 MB",   bytes: 5_242_880, dl: 16500 },
    { slug: "10mb",  label: "10 MB",  bytes: 10_485_760, dl: 21800 },
    { slug: "25mb",  label: "25 MB",  bytes: 26_214_400, dl: 10400 },
    { slug: "50mb",  label: "50 MB",  bytes: 52_428_800, dl: 13800 },
    { slug: "100mb", label: "100 MB", bytes: 104_857_600, dl: 17200 },
  ].map((s) => ({
    type: "zip" as FileType,
    slug: s.slug,
    label: s.label,
    sizeBytes: s.bytes,
    r2Key: `zip/sample-${s.slug}.zip`,
    description: `Download a sample ZIP archive file ${s.label} in size to test decompression engines, archive upload quotas, and virus scanning.`,
    sha256: mockHash(`zip-${s.slug}`).sha256,
    md5: mockHash(`zip-${s.slug}`).md5,
    baseDownloads: s.dl,
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
