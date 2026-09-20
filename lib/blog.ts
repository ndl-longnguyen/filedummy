import type { FileType } from "./files";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export type BlogCluster = 1 | 2 | 3 | 4 | 5 | 6;

export interface DownloadCTA {
  text: string;
  fileType: FileType;
  fileSlug: string;
  buttonLabel: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  cluster: BlogCluster;
  clusterName: string;
  clusterColor: string;
  tags: string[];
  wordCount: number;
  readingTime: number;
  primaryKeyword: string;
  monthlyVolume: number;
  keywordDifficulty: number;
  downloadCTA: DownloadCTA;
  relatedFiles: Array<{ type: FileType; slug: string }>;
  relatedArticles: string[];
  faqItems: FaqItem[];
  published: boolean;
}

export const CLUSTER_META: Record<BlogCluster, { name: string; color: string; description: string; icon: string }> = {
  1: { name: "File Upload & Handling",       color: "from-blue-500 to-indigo-600",   description: "Frontend and backend upload techniques",       icon: "⬆️" },
  2: { name: "File Security & Integrity",    color: "from-red-500 to-rose-600",      description: "Hashing, encryption, and validation",          icon: "🔒" },
  3: { name: "File Processing & Conversion", color: "from-amber-500 to-orange-600",  description: "PDF, DOCX processing and format conversion",    icon: "⚙️" },
  4: { name: "Testing & QA with Files",      color: "from-emerald-500 to-teal-600",  description: "E2E, unit, and load testing with files",        icon: "🧪" },
  5: { name: "Cloud Storage & CDN",          color: "from-purple-500 to-violet-600", description: "S3, R2, CDN, and streaming",                   icon: "☁️" },
  6: { name: "File Formats & Deep Dives",    color: "from-cyan-500 to-sky-600",      description: "Internals, encoding, MIME types",              icon: "📖" },
};

// ─────────────────────────────────────────────────────────
// Blog Posts — 36 Articles
// ─────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [

  // CLUSTER 1 — File Upload & Handling
  {
    slug: "chunked-file-upload-javascript",
    title: "How to Upload Large Files in Chunks with JavaScript",
    description: "Learn chunked file upload with JavaScript and the Fetch API. Includes working code, error handling, and free 100MB test files to validate your implementation.",
    date: "2026-09-14", cluster: 1, clusterName: "File Upload & Handling", clusterColor: "from-blue-500 to-indigo-600",
    tags: ["javascript","file-upload","fetch-api","frontend"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "chunked file upload javascript", monthlyVolume: 4400, keywordDifficulty: 22,
    downloadCTA: { text: "Test your chunked upload with a real 100MB file — no sign-up required.", fileType: "pdf", fileSlug: "100mb", buttonLabel: "Download 100MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "100mb" },{ type: "pdf", slug: "500mb" }],
    relatedArticles: ["file-upload-progress-bar-html5","resumable-file-upload-tus-javascript","generate-dummy-files-qa-testing"],
    faqItems: [
      { q: "What is the ideal chunk size for chunked file uploads?", a: "Most implementations use 1MB–5MB chunks. Smaller chunks (1MB) reduce memory pressure. Larger chunks (5MB) reduce HTTP overhead. For AWS S3 and Cloudflare R2 multipart uploads, the minimum part size is 5MB (except the last part)." },
      { q: "How do I resume a failed chunked upload?", a: "Track the last successfully uploaded chunk index in localStorage or server-side state. On retry, start from the last failed chunk. The tus protocol handles this automatically with server-side state management." },
      { q: "Can I use chunked uploads directly to S3 or Cloudflare R2?", a: "Yes. Both natively support Multipart Upload API — each part is a separate PUT request. The upload is finalized with a CompleteMultipartUpload call. See our S3/R2 multipart upload article for the full Node.js implementation." },
    ],
    published: true,
  },
  {
    slug: "file-upload-progress-bar-html5",
    title: "File Upload Progress Bar: HTML5 + Fetch API Complete Guide",
    description: "Build a real-time file upload progress bar using HTML5 and XMLHttpRequest. Includes CSS animation and a free 50MB DOCX test file to validate your implementation.",
    date: "2026-09-17", cluster: 1, clusterName: "File Upload & Handling", clusterColor: "from-blue-500 to-indigo-600",
    tags: ["javascript","html5","xhr","progress-bar","frontend"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "file upload progress bar html5", monthlyVolume: 3200, keywordDifficulty: 18,
    downloadCTA: { text: "Need a large file to test your progress bar? Download a 50MB DOCX sample instantly.", fileType: "docx", fileSlug: "50mb", buttonLabel: "Download 50MB DOCX Sample →" },
    relatedFiles: [{ type: "docx", slug: "50mb" },{ type: "pdf", slug: "100mb" }],
    relatedArticles: ["chunked-file-upload-javascript","file-upload-validation-size-type","generate-dummy-files-qa-testing"],
    faqItems: [
      { q: "Why doesn't the Fetch API support upload progress natively?", a: "The Fetch API does not expose upload progress events. For upload progress, use XMLHttpRequest with the xhr.upload.onprogress event. Download progress is available via the Streams API on the response body." },
      { q: "How do I show download progress with the Fetch API?", a: "Use response.body.getReader() and track bytes read versus Content-Length. This works natively in all modern browsers without XHR." },
      { q: "What is a realistic file size for testing an upload progress bar?", a: "A 50MB file takes 8–40 seconds on typical broadband — long enough to observe a meaningful progress animation. Use FileDummy's 50MB DOCX sample as an ideal test file." },
    ],
    published: true,
  },
  {
    slug: "multipart-upload-s3-r2-nodejs",
    title: "Multipart Upload to S3 and Cloudflare R2 with Node.js",
    description: "Step-by-step guide to AWS S3 multipart uploads using the AWS SDK v3 in Node.js. Fully compatible with Cloudflare R2. Test with a free 500MB sample file.",
    date: "2026-09-20", cluster: 1, clusterName: "File Upload & Handling", clusterColor: "from-blue-500 to-indigo-600",
    tags: ["nodejs","aws-s3","cloudflare-r2","multipart-upload","backend"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "s3 multipart upload nodejs", monthlyVolume: 2900, keywordDifficulty: 25,
    downloadCTA: { text: "Test your multipart upload pipeline with a real 500MB sample file.", fileType: "pdf", fileSlug: "500mb", buttonLabel: "Download 500MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "500mb" },{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["resumable-file-upload-tus-javascript","cloudflare-r2-vs-aws-s3-comparison","presigned-url-s3-r2-secure-download"],
    faqItems: [
      { q: "What is the minimum part size for S3 multipart uploads?", a: "Each part (except the last) must be at least 5MB. Parts smaller than 5MB result in an EntityTooSmall error on CompleteMultipartUpload. Cloudflare R2 follows the same S3-compatible constraint." },
      { q: "How many parts can a single S3 multipart upload have?", a: "A maximum of 10,000 parts per upload. With 5MB minimum part size, this gives a theoretical maximum object size of approximately 50GB." },
      { q: "How do I cancel a multipart upload?", a: "Always call AbortMultipartUpload on failure or user cancellation. Incomplete parts accrue storage costs on both S3 and R2. Use S3 Lifecycle rules to auto-abort incomplete uploads after N days." },
    ],
    published: true,
  },
  {
    slug: "resumable-file-upload-tus-javascript",
    title: "Resumable File Uploads with tus Protocol — JavaScript Guide",
    description: "Implement resumable file uploads in JavaScript using the tus protocol and tus-js-client. Handles network failures gracefully. Test with a free 1GB dummy file.",
    date: "2026-09-23", cluster: 1, clusterName: "File Upload & Handling", clusterColor: "from-blue-500 to-indigo-600",
    tags: ["javascript","tus-protocol","resumable-upload","file-upload"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "resumable file upload javascript", monthlyVolume: 2400, keywordDifficulty: 20,
    downloadCTA: { text: "Simulate a large file resumable upload — download our 1GB dummy file to test your tus server.", fileType: "pdf", fileSlug: "1gb", buttonLabel: "Download 1GB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1gb" },{ type: "pdf", slug: "500mb" }],
    relatedArticles: ["chunked-file-upload-javascript","multipart-upload-s3-r2-nodejs","load-test-file-download-k6-jmeter"],
    faqItems: [
      { q: "What is the tus protocol?", a: "tus is an open protocol for resumable HTTP file uploads. When a connection drops, the client queries the server for the last byte offset and resumes from that point without re-uploading already-sent data." },
      { q: "Does tus work with mobile browsers?", a: "Yes. tus-js-client supports browsers, Node.js, and React Native. The library stores the upload URL in localStorage so uploads resume after a page reload or app restart." },
      { q: "What backend servers support tus?", a: "tusd (official Go reference server), Uppy/Companion, tus-node-server, and native support in Cloudflare Stream for video uploads. Major platforms including Vimeo and Transloadit use tus in production." },
    ],
    published: true,
  },
  {
    slug: "file-upload-validation-size-type",
    title: "File Upload Validation: Size, Type & Extension (Frontend + Backend)",
    description: "Complete guide to file upload validation — checking size, MIME type, and extension on both frontend and backend with Node.js. Download exact-size test files.",
    date: "2026-10-11", cluster: 1, clusterName: "File Upload & Handling", clusterColor: "from-blue-500 to-indigo-600",
    tags: ["javascript","nodejs","validation","file-upload","security"], wordCount: 1600, readingTime: 8,
    primaryKeyword: "file upload size limit validation", monthlyVolume: 3100, keywordDifficulty: 16,
    downloadCTA: { text: "Test your validation logic with exact-size files: 1MB, 10MB, and 100MB PDF samples.", fileType: "pdf", fileSlug: "100mb", buttonLabel: "Download 100MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" },{ type: "pdf", slug: "100mb" }],
    relatedArticles: ["file-type-validation-magic-bytes","chunked-file-upload-javascript","file-upload-progress-bar-html5"],
    faqItems: [
      { q: "Is client-side file validation enough?", a: "No. Client-side validation improves UX but must never replace server-side validation. Users can bypass browser checks with developer tools or direct API calls. Always validate on the server before processing." },
      { q: "How do I check file type without relying on the extension?", a: "Read the file's magic bytes (the first 4–8 bytes). PDF files start with %PDF, ZIP/DOCX with PK\\x03\\x04, JPEG with \\xFF\\xD8\\xFF. Use the file-type npm package in Node.js for easy magic byte detection." },
      { q: "What is a safe maximum upload size for web apps?", a: "Common limits: email (10–25MB), social media avatars (5–10MB), document uploads in SaaS (50–100MB). For large files, use multipart or resumable uploads and set both client-side and server-side (nginx body limit, Express bodyParser) constraints." },
    ],
    published: true,
  },
  {
    slug: "drag-drop-file-upload-react",
    title: "Drag and Drop File Upload in React with react-dropzone",
    description: "Build a polished drag-and-drop file upload component in React using react-dropzone. Covers MIME filtering, file previews, and upload progress with working code.",
    date: "2026-10-29", cluster: 1, clusterName: "File Upload & Handling", clusterColor: "from-blue-500 to-indigo-600",
    tags: ["react","react-dropzone","drag-drop","file-upload","frontend"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "drag and drop file upload react", monthlyVolume: 2900, keywordDifficulty: 24,
    downloadCTA: { text: "Test drag & drop with real files — download PDF, DOCX, and TXT samples of any size.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download 10MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "10mb" },{ type: "docx", slug: "10mb" },{ type: "txt", slug: "large" }],
    relatedArticles: ["file-upload-progress-bar-html5","file-upload-validation-size-type","generate-dummy-files-qa-testing"],
    faqItems: [
      { q: "What is the difference between react-dropzone and the HTML5 drag-and-drop API?", a: "react-dropzone wraps the HTML5 File API with an onDrop callback, MIME type filtering via the accept prop, maxSize validation, and accessible keyboard support — saving 100+ lines of boilerplate compared to raw HTML5 drag events." },
      { q: "How do I limit file types in react-dropzone?", a: "Pass the accept prop as an object: { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.png'] }. This is the react-dropzone v12+ API (breaking change from the old string format in v11)." },
      { q: "Can react-dropzone upload files directly to S3?", a: "react-dropzone only provides the File object — it does not handle uploads. Combine it with a presigned S3 PUT request or the tus-js-client library to upload directly from the browser to S3/R2 without a proxy server." },
    ],
    published: true,
  },

  // CLUSTER 2 — File Security & Integrity
  {
    slug: "hash-file-javascript-sha256-md5",
    title: "How to Hash a File in JavaScript: SHA-256, MD5, and SHA-1",
    description: "Calculate file checksums in JavaScript using the Web Crypto API (SHA-256) and crypto-js (MD5, SHA-1). Browser and Node.js examples with sample test files.",
    date: "2026-09-14", cluster: 2, clusterName: "File Security & Integrity", clusterColor: "from-red-500 to-rose-600",
    tags: ["javascript","cryptography","sha256","checksum","web-crypto"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "hash file javascript", monthlyVolume: 3600, keywordDifficulty: 18,
    downloadCTA: { text: "Download sample files to test your hash function — PDF, DOCX, and TXT with known SHA-256 checksums.", fileType: "txt", fileSlug: "large", buttonLabel: "Download 1MB TXT Sample →" },
    relatedFiles: [{ type: "txt", slug: "large" },{ type: "pdf", slug: "1mb" }],
    relatedArticles: ["verify-file-integrity-checksum","file-type-validation-magic-bytes","encrypt-file-before-upload-aes-javascript"],
    faqItems: [
      { q: "Should I use MD5 or SHA-256 for file integrity checks?", a: "For security-critical applications, always use SHA-256 or SHA-512. MD5 is cryptographically broken and should only be used for non-security checksums like deduplication or cache keys." },
      { q: "How do I hash a large file without loading it into memory?", a: "In Node.js use crypto.createHash('sha256') as a Transform stream with pipe(). In the browser, use the Web Crypto API with SubtleCrypto.digest() processing chunks via ReadableStream." },
      { q: "Can I compute a file hash entirely in the browser?", a: "Yes. The Web Crypto API (crypto.subtle.digest) is available in all modern browsers. Read the file using FileReader as an ArrayBuffer, then pass it to subtle.digest('SHA-256'). MD5 requires a third-party library since it is not in the Web Crypto API." },
    ],
    published: true,
  },
  {
    slug: "verify-file-integrity-checksum",
    title: "How to Verify File Integrity After Download (Checksum Guide)",
    description: "Verify file integrity using MD5, SHA-256, and SHA-512 checksums on Windows, macOS, and Linux. Command-line examples and pre-hashed sample files for immediate testing.",
    date: "2026-09-17", cluster: 2, clusterName: "File Security & Integrity", clusterColor: "from-red-500 to-rose-600",
    tags: ["security","checksum","md5","sha256","file-integrity"], wordCount: 1600, readingTime: 8,
    primaryKeyword: "verify file integrity checksum", monthlyVolume: 2800, keywordDifficulty: 15,
    downloadCTA: { text: "Download our pre-hashed sample files — SHA-256 checksums published for immediate verification.", fileType: "pdf", fileSlug: "1mb", buttonLabel: "Download 1MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" }],
    relatedArticles: ["hash-file-javascript-sha256-md5","virus-scan-file-upload-clamav-nodejs","file-type-validation-magic-bytes"],
    faqItems: [
      { q: "What command verifies a SHA-256 checksum on macOS?", a: "Run shasum -a 256 filename.pdf in Terminal. On Linux use sha256sum filename.pdf. On Windows PowerShell use Get-FileHash filename.pdf -Algorithm SHA256." },
      { q: "Why does my downloaded file have a different checksum?", a: "Common causes: incomplete download, file modified in transit (rare on HTTPS), or comparing against the wrong algorithm. MD5 and SHA-256 produce completely different outputs for the same file." },
      { q: "Is HTTPS enough, or do I still need checksum verification?", a: "HTTPS protects the file in transit. Checksum verification also protects against a compromised origin server serving a modified file. For security-sensitive downloads, verify checksums even over HTTPS." },
    ],
    published: true,
  },
  {
    slug: "virus-scan-file-upload-clamav-nodejs",
    title: "Scan Uploaded Files for Viruses: ClamAV + Node.js Integration",
    description: "Integrate ClamAV antivirus scanning into your Node.js file upload pipeline. Protect your application from malicious uploads with real-world code examples using clamscan.",
    date: "2026-09-20", cluster: 2, clusterName: "File Security & Integrity", clusterColor: "from-red-500 to-rose-600",
    tags: ["nodejs","security","clamav","antivirus","file-upload"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "scan uploaded files for viruses nodejs", monthlyVolume: 1300, keywordDifficulty: 18,
    downloadCTA: { text: "Need clean test files for your scanner? Download verified safe sample files for ClamAV pipeline testing.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download Safe 10MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "10mb" },{ type: "docx", slug: "10mb" },{ type: "zip", slug: "10mb" }],
    relatedArticles: ["file-type-validation-magic-bytes","verify-file-integrity-checksum","file-upload-validation-size-type"],
    faqItems: [
      { q: "Is ClamAV good enough for production use?", a: "ClamAV is adequate for common malware and macro-based threats. For enterprise-grade protection, combine with a commercial engine (VirusTotal API, OPSWAT) for multi-engine scanning. ClamAV's signature database updates multiple times daily via freshclam." },
      { q: "How slow does ClamAV make the upload process?", a: "ClamAV scans at roughly 5–10MB per second per CPU core. A 10MB file takes 1–2 seconds. For large files, run the scan asynchronously and delay file access until the scan completes." },
      { q: "What is a zip bomb and does ClamAV detect it?", a: "A zip bomb is a tiny archive that expands to a massive size (42KB → 4.5PB), designed to exhaust memory or disk. ClamAV detects known zip bomb patterns. Always set maxFileSize and maxScanSize limits in clamd.conf." },
    ],
    published: true,
  },
  {
    slug: "file-type-validation-magic-bytes",
    title: "File Type Validation with Magic Bytes (Not File Extension)",
    description: "Detect true file types using magic bytes in Node.js with the file-type library. Extension-based validation is trivially bypassed — learn the secure approach.",
    date: "2026-09-26", cluster: 2, clusterName: "File Security & Integrity", clusterColor: "from-red-500 to-rose-600",
    tags: ["nodejs","security","magic-bytes","mime-type","validation"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "file type detection magic bytes", monthlyVolume: 1600, keywordDifficulty: 15,
    downloadCTA: { text: "Test your validator with real PDF, DOCX, TXT samples — each served with the correct MIME type.", fileType: "pdf", fileSlug: "1mb", buttonLabel: "Download 1MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "docx", slug: "1mb" },{ type: "txt", slug: "lorem" }],
    relatedArticles: ["file-upload-validation-size-type","virus-scan-file-upload-clamav-nodejs","hash-file-javascript-sha256-md5"],
    faqItems: [
      { q: "What are magic bytes?", a: "Magic bytes are the first few bytes of a file that uniquely identify its format. PDF starts with 25 50 44 46 (%PDF), ZIP/DOCX with 50 4B 03 04 (PK..), JPEG with FF D8 FF, PNG with 89 50 4E 47. The file-type library uses these signatures to detect true format regardless of extension." },
      { q: "Why is extension-based validation dangerous?", a: "An attacker can rename malware.exe to document.pdf and bypass extension checks. Operating systems determine file type from content, not filename. Always validate actual bytes using file-type (Node.js) or Apache Tika (Java)." },
      { q: "Can I detect file types in the browser?", a: "Yes. Read the first 12 bytes using FileReader.readAsArrayBuffer() on a Blob.slice(0, 12), then check against known signatures. The file-type library also works in browser environments." },
    ],
    published: true,
  },
  {
    slug: "encrypt-file-before-upload-aes-javascript",
    title: "How to Encrypt a File Before Uploading: AES-256 in the Browser",
    description: "Encrypt files client-side with AES-256-GCM using the Web Crypto API before uploading to cloud storage. Zero-knowledge upload tutorial with working code.",
    date: "2026-10-14", cluster: 2, clusterName: "File Security & Integrity", clusterColor: "from-red-500 to-rose-600",
    tags: ["javascript","cryptography","aes-256","web-crypto","privacy"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "encrypt file javascript browser", monthlyVolume: 1900, keywordDifficulty: 22,
    downloadCTA: { text: "Use our TXT samples as plaintext test vectors — download lorem ipsum TXT to test AES-256 encryption.", fileType: "txt", fileSlug: "lorem", buttonLabel: "Download 50KB TXT Test Vector →" },
    relatedFiles: [{ type: "txt", slug: "lorem" },{ type: "txt", slug: "large" }],
    relatedArticles: ["hash-file-javascript-sha256-md5","presigned-url-s3-r2-secure-download","verify-file-integrity-checksum"],
    faqItems: [
      { q: "Why AES-256-GCM instead of AES-256-CBC?", a: "AES-256-GCM provides both encryption and authenticated integrity verification in one operation — any tampering with the ciphertext is detected on decryption. AES-256-CBC only encrypts. GCM is the modern standard and is natively supported by the Web Crypto API." },
      { q: "Is client-side encryption safe from the server?", a: "Client-side encryption with a user-held key achieves zero-knowledge — the server never sees plaintext. However, if the encryption code is served by the server, a compromised server could serve malicious JavaScript. True zero-knowledge requires code verification via subresource integrity or a native app." },
      { q: "What happens if I lose the encryption key?", a: "The file is permanently unrecoverable. AES-256-GCM is computationally infeasible to break without the key. Always back up the key securely, derived from a password with PBKDF2 and salt." },
    ],
    published: true,
  },
  {
    slug: "presigned-url-s3-r2-secure-download",
    title: "Presigned URLs: Secure File Downloads from S3 and Cloudflare R2",
    description: "Generate time-limited presigned URLs for secure file downloads from AWS S3 and Cloudflare R2 using the AWS SDK v3 in Node.js. No public bucket exposure required.",
    date: "2026-11-01", cluster: 2, clusterName: "File Security & Integrity", clusterColor: "from-red-500 to-rose-600",
    tags: ["nodejs","aws-s3","cloudflare-r2","presigned-url","security"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "s3 presigned url nodejs", monthlyVolume: 2400, keywordDifficulty: 25,
    downloadCTA: { text: "Test your presigned URL download flow with standardized test files.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download 10MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "10mb" },{ type: "zip", slug: "50mb" }],
    relatedArticles: ["multipart-upload-s3-r2-nodejs","s3-bucket-policy-public-private","cloudflare-r2-vs-aws-s3-comparison"],
    faqItems: [
      { q: "How long should a presigned URL be valid?", a: "Match expiry to the use case. For direct download links in a UI: 15–60 minutes. For email links: 24–72 hours. For machine-to-machine: 5–15 minutes. A leaked URL grants temporary access, so keep expiry as short as practical." },
      { q: "Can presigned URLs be revoked before they expire?", a: "You cannot directly revoke a presigned URL. To effectively revoke, move or delete the object in S3/R2. Use short expiry times for fine-grained access control." },
      { q: "What is the difference between a presigned URL and a public bucket URL?", a: "A public URL is permanently accessible to anyone. A presigned URL is time-limited, tied to specific IAM permissions, and optionally IP-restricted. Use presigned URLs for private files." },
    ],
    published: true,
  },

  // CLUSTER 3 — File Processing & Conversion
  {
    slug: "convert-pdf-to-docx-nodejs",
    title: "Convert PDF to DOCX Programmatically with Node.js (2026 Guide)",
    description: "Convert PDF files to editable DOCX format in Node.js using LibreOffice headless and Adobe PDF Services API. Compare approaches with 1MB–50MB sample test files.",
    date: "2026-09-14", cluster: 3, clusterName: "File Processing & Conversion", clusterColor: "from-amber-500 to-orange-600",
    tags: ["nodejs","pdf","docx","conversion","libreoffice"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "convert pdf to docx nodejs", monthlyVolume: 2900, keywordDifficulty: 25,
    downloadCTA: { text: "Use our sample PDFs as test input for your conversion pipeline — 1MB to 50MB sizes available.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download 10MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" },{ type: "pdf", slug: "50mb" }],
    relatedArticles: ["extract-text-pdf-javascript","compress-pdf-javascript-nodejs","parse-docx-javascript-mammoth"],
    faqItems: [
      { q: "Why is PDF to DOCX conversion difficult?", a: "PDF is a fixed-layout format storing glyphs at absolute coordinates with no concept of paragraphs or flowing text. Converting to DOCX requires reconstructing document structure from raw coordinates, which is inherently imperfect for complex layouts." },
      { q: "What is the best free tool for PDF to DOCX in Node.js?", a: "LibreOffice in headless mode (libreoffice --headless --convert-to docx) is the most reliable free option. Call it from Node.js using child_process.exec(). For better accuracy, Adobe PDF Services and Aspose.Words offer commercial Node.js SDKs." },
      { q: "Can I convert a scanned PDF to DOCX in Node.js?", a: "Scanned PDFs need OCR first. Use Tesseract.js (open source) or Google Cloud Vision / AWS Textract. After OCR, reconstruct the text as DOCX using the docx library." },
    ],
    published: true,
  },
  {
    slug: "compress-pdf-javascript-nodejs",
    title: "How to Compress and Reduce PDF File Size with JavaScript",
    description: "Reduce PDF file size in Node.js using Ghostscript and pdf-lib. Compare compression methods and test results with 100MB–500MB sample PDF files.",
    date: "2026-09-17", cluster: 3, clusterName: "File Processing & Conversion", clusterColor: "from-amber-500 to-orange-600",
    tags: ["nodejs","pdf","compression","ghostscript","pdf-lib"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "compress pdf javascript", monthlyVolume: 2400, keywordDifficulty: 22,
    downloadCTA: { text: "Test PDF compression with our 100MB and 500MB sample PDFs — download free, no signup required.", fileType: "pdf", fileSlug: "100mb", buttonLabel: "Download 100MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "100mb" },{ type: "pdf", slug: "200mb" },{ type: "pdf", slug: "500mb" }],
    relatedArticles: ["convert-pdf-to-docx-nodejs","merge-split-pdf-nodejs-pdflib","generate-pdf-from-html-nodejs-puppeteer"],
    faqItems: [
      { q: "What is the best tool for compressing PDFs in Node.js?", a: "Ghostscript achieves 60–80% size reduction on image-heavy PDFs using the ebook or screen quality preset. For pure-code compression without a binary dependency, pdf-lib can remove metadata and optimize object streams, but achieves less dramatic reduction on already-optimized PDFs." },
      { q: "Why does my compressed PDF look blurry?", a: "PDF compression primarily downsamples embedded images. The screen preset targets 72dpi (web viewing), which degrades print quality. Use the printer preset (300dpi) for documents that need to be printed." },
      { q: "Can I compress a PDF without losing text quality?", a: "Yes. Text and vector graphics are resolution-independent and do not degrade. Only embedded raster images are affected. Use Ghostscript's -dColorImageResolution flag to control image-only downsampling." },
    ],
    published: true,
  },
  {
    slug: "extract-text-pdf-javascript",
    title: "Extract Text from PDF in JavaScript: pdf-parse vs pdfjs-dist",
    description: "Compare pdf-parse and pdfjs-dist for extracting text from PDF files in Node.js and the browser. Covers multi-column layouts, Unicode text, and OCR for scanned PDFs.",
    date: "2026-09-20", cluster: 3, clusterName: "File Processing & Conversion", clusterColor: "from-amber-500 to-orange-600",
    tags: ["nodejs","pdf","text-extraction","pdfjs","pdf-parse"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "extract text from pdf javascript", monthlyVolume: 2200, keywordDifficulty: 22,
    downloadCTA: { text: "Test your text extractor with our sample PDFs containing real AI industry report content.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download 10MB PDF with Content →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" }],
    relatedArticles: ["convert-pdf-to-docx-nodejs","parse-docx-javascript-mammoth","pdf-file-format-structure-internals"],
    faqItems: [
      { q: "What is the difference between pdf-parse and pdfjs-dist?", a: "pdf-parse is a lightweight wrapper returning all text as a single string. pdfjs-dist provides lower-level access to individual text items with their coordinates, enabling layout-aware extraction for columns and tables. Use pdf-parse for simple extraction, pdfjs-dist when you need positional data." },
      { q: "Why is extracted text garbled or in wrong order?", a: "PDFs store text as glyphs at absolute positions with no inherent reading order. Correct extraction requires sorting by Y position (lines) then X position (left-to-right). For multi-column PDFs, cluster glyphs into columns first using pdfjs-dist's TextContent API." },
      { q: "How do I extract text from a scanned PDF?", a: "Scanned PDFs contain images, not text, so OCR is required. Use Tesseract.js in Node.js: render each PDF page to canvas with pdfjs-dist, then pass the canvas image data to Tesseract." },
    ],
    published: true,
  },
  {
    slug: "parse-docx-javascript-mammoth",
    title: "Parse and Read DOCX Files with mammoth.js — Node.js Tutorial",
    description: "Extract text and HTML from Microsoft Word DOCX files in Node.js using mammoth.js. Covers style mapping, custom transforms, and testing with 1MB–50MB DOCX samples.",
    date: "2026-09-29", cluster: 3, clusterName: "File Processing & Conversion", clusterColor: "from-amber-500 to-orange-600",
    tags: ["nodejs","docx","mammoth","word-processing","text-extraction"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "parse docx file javascript", monthlyVolume: 1900, keywordDifficulty: 18,
    downloadCTA: { text: "Test your DOCX parser with our 1MB–50MB Word document samples — all contain real structured content.", fileType: "docx", fileSlug: "10mb", buttonLabel: "Download 10MB DOCX Sample →" },
    relatedFiles: [{ type: "docx", slug: "1mb" },{ type: "docx", slug: "10mb" },{ type: "docx", slug: "50mb" }],
    relatedArticles: ["convert-pdf-to-docx-nodejs","extract-text-pdf-javascript","docx-file-format-openxml-explained"],
    faqItems: [
      { q: "What is mammoth.js and what does it do?", a: "mammoth.js converts DOCX files to HTML or plain text. It reads the OpenXML ZIP structure, maps Word styles (Heading 1 → h1, Bold → strong) to HTML, and outputs clean semantic HTML." },
      { q: "Does mammoth.js preserve tables and images?", a: "Tables are converted to HTML table elements. Embedded images can be extracted as base64 data URIs using a custom convertImage handler in the options. Unsupported formatting is silently ignored." },
      { q: "What alternatives to mammoth.js exist for DOCX parsing?", a: "Alternatives include docxtemplater (commercial), LibreOffice headless conversion, and Apache POI (Java). For DOCX creation, use the docx npm package." },
    ],
    published: true,
  },
  {
    slug: "merge-split-pdf-nodejs-pdflib",
    title: "Merge and Split PDF Files Programmatically with pdf-lib",
    description: "Merge multiple PDFs into one or split a PDF into pages using pdf-lib in Node.js. Pure JavaScript, no native binaries required. Working code examples included.",
    date: "2026-10-17", cluster: 3, clusterName: "File Processing & Conversion", clusterColor: "from-amber-500 to-orange-600",
    tags: ["nodejs","pdf","pdf-lib","merge-pdf","split-pdf"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "merge pdf javascript", monthlyVolume: 2400, keywordDifficulty: 20,
    downloadCTA: { text: "Download multiple sample PDFs to test your merge function — 1MB through 100MB sizes available.", fileType: "pdf", fileSlug: "50mb", buttonLabel: "Download 50MB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" },{ type: "pdf", slug: "50mb" }],
    relatedArticles: ["compress-pdf-javascript-nodejs","generate-pdf-from-html-nodejs-puppeteer","extract-text-pdf-javascript"],
    faqItems: [
      { q: "Does pdf-lib support password-protected PDFs?", a: "pdf-lib can decrypt password-protected PDFs using the password option in PDFDocument.load(). The merged output is unencrypted by default. Re-encrypt with doc.encrypt() if required." },
      { q: "How do I merge large PDFs without running out of memory?", a: "pdf-lib loads the entire PDF into memory. For very large PDFs (100MB+), use Ghostscript (gs -sDEVICE=pdfwrite -dBATCH -o merged.pdf input1.pdf input2.pdf) which processes pages in a streaming fashion." },
      { q: "Can I add page numbers when merging PDFs?", a: "Yes. After copyPages(), use page.drawText() to add page numbers at any position. Embed a font first with doc.embedFont(). You can also add headers, watermarks, or bookmarks using the same drawing API." },
    ],
    published: true,
  },
  {
    slug: "generate-pdf-from-html-nodejs-puppeteer",
    title: "Generate PDF from HTML in Node.js: Puppeteer vs playwright-pdf",
    description: "Compare Puppeteer and Playwright for HTML-to-PDF generation in Node.js. Covers CSS print styles, page size, headers and footers, and performance benchmarks.",
    date: "2026-11-04", cluster: 3, clusterName: "File Processing & Conversion", clusterColor: "from-amber-500 to-orange-600",
    tags: ["nodejs","puppeteer","playwright","pdf-generation","headless-browser"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "generate pdf from html nodejs", monthlyVolume: 2900, keywordDifficulty: 28,
    downloadCTA: { text: "Compare your output against our reference sample PDFs — available in 1MB through 50MB sizes.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download Reference 10MB PDF →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" }],
    relatedArticles: ["compress-pdf-javascript-nodejs","merge-split-pdf-nodejs-pdflib","pdf-file-format-structure-internals"],
    faqItems: [
      { q: "Which is faster: Puppeteer or Playwright for PDF generation?", a: "Both use the same Chromium rendering engine, so PDF generation performance is nearly identical. Playwright offers a slightly cleaner API and better multi-browser support. Choose based on your existing toolchain." },
      { q: "How do I add page numbers in Puppeteer-generated PDFs?", a: "Use the headerTemplate and footerTemplate options in page.pdf(). These accept HTML strings with special CSS classes: .pageNumber renders the current page, .totalPages renders the total. Inline styles are required since templates have isolated CSS scope." },
      { q: "How do I prevent page breaks mid-table?", a: "Add page-break-inside: avoid (or break-inside: avoid) to table rows and sections. Use @media print CSS rules or pass custom CSS via page.addStyleTag()." },
    ],
    published: true,
  },

  // CLUSTER 4 — Testing & QA with Files
  {
    slug: "test-file-upload-api-postman",
    title: "How to Test File Upload APIs with Postman (Multipart & Binary)",
    description: "Learn to test file upload endpoints in Postman using multipart/form-data and binary body modes. Covers Postman scripts, large file testing, and common error codes.",
    date: "2026-09-14", cluster: 4, clusterName: "Testing & QA with Files", clusterColor: "from-emerald-500 to-teal-600",
    tags: ["postman","api-testing","file-upload","qa","multipart"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "test file upload api postman", monthlyVolume: 5400, keywordDifficulty: 15,
    downloadCTA: { text: "Download ready-to-use test files for Postman — PDF, DOCX, TXT in all sizes. No sign-up required.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download 10MB PDF Test File →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" },{ type: "docx", slug: "10mb" },{ type: "txt", slug: "lorem" }],
    relatedArticles: ["generate-dummy-files-qa-testing","load-test-file-download-k6-jmeter","unit-test-file-handling-nodejs-jest"],
    faqItems: [
      { q: "How do I upload a file in Postman using multipart/form-data?", a: "In the request Body tab, select form-data, add a key with type File, then select your local file. Postman automatically sets the Content-Type: multipart/form-data header with the correct boundary — do not set it manually." },
      { q: "How do I upload a file as raw binary in Postman?", a: "Select Body → binary, then choose your file. This sends the file as the raw request body without form encoding — useful for APIs expecting Content-Type: application/pdf directly in the body, or for direct S3 PUT uploads." },
      { q: "Why does Postman fail with large files?", a: "Postman Desktop has no inherent size limit. Issues usually come from the API server: nginx body size limit, Express bodyParser limit, or AWS API Gateway's 10MB hard limit. Check server logs for 413 Request Entity Too Large errors." },
    ],
    published: true,
  },
  {
    slug: "load-test-file-download-k6-jmeter",
    title: "Load Testing File Download Endpoints with k6 and JMeter",
    description: "Load test file download servers with k6 (JavaScript) and Apache JMeter. Measure throughput, latency, and error rate under concurrent download load. Free 1GB test file.",
    date: "2026-09-17", cluster: 4, clusterName: "Testing & QA with Files", clusterColor: "from-emerald-500 to-teal-600",
    tags: ["k6","jmeter","load-testing","performance","file-download"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "load test file download server k6", monthlyVolume: 1600, keywordDifficulty: 15,
    downloadCTA: { text: "Use our 1GB sample file to stress-test your download server and pipeline throughput.", fileType: "pdf", fileSlug: "1gb", buttonLabel: "Download 1GB PDF Test File →" },
    relatedFiles: [{ type: "pdf", slug: "500mb" },{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["test-file-upload-api-postman","stream-large-file-download-nodejs","serve-large-files-cdn-best-practices"],
    faqItems: [
      { q: "What is the difference between k6 and JMeter for load testing?", a: "k6 uses JavaScript test scripts, has a modern CLI, generates no GUI overhead, and integrates well with CI/CD. JMeter is a mature Java tool with a GUI, supports more protocol types (FTP, JDBC, SOAP), and has a larger plugin ecosystem. k6 is preferred for HTTP/API load testing." },
      { q: "How do I measure download throughput in k6?", a: "k6 automatically tracks http_req_receiving duration and data_received bytes per request. Calculate throughput as data_received / test_duration. Use k6's Trend metric type for custom throughput measurements." },
      { q: "How many virtual users do I need to load test a CDN?", a: "CDNs handle massive concurrency. To meaningfully test, bypass the CDN and test the origin directly. Typical origin servers should handle 50–500 concurrent file download requests before saturating CPU or bandwidth." },
    ],
    published: true,
  },
  {
    slug: "unit-test-file-handling-nodejs-jest",
    title: "Unit Testing File Handling in Node.js with Jest and memfs",
    description: "Write robust unit tests for file handling code in Node.js using Jest and the memfs in-memory file system. Mock the fs module, test edge cases, and avoid real disk I/O.",
    date: "2026-09-20", cluster: 4, clusterName: "Testing & QA with Files", clusterColor: "from-emerald-500 to-teal-600",
    tags: ["jest","nodejs","unit-testing","memfs","mocking"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "jest test file upload mock", monthlyVolume: 1800, keywordDifficulty: 16,
    downloadCTA: { text: "Download small TXT and PDF samples as Jest fixture files — 50KB to 1MB, perfectly sized for unit tests.", fileType: "txt", fileSlug: "lorem", buttonLabel: "Download 50KB TXT Fixture →" },
    relatedFiles: [{ type: "txt", slug: "lorem" },{ type: "pdf", slug: "1mb" }],
    relatedArticles: ["mock-filesystem-jest-memfs","test-file-upload-api-postman","test-pdf-download-playwright-cypress"],
    faqItems: [
      { q: "What is memfs and why use it instead of real files?", a: "memfs is an in-memory Node.js fs implementation. Tests run faster with no disk I/O, no temp files to clean up, and reproducible state that resets between tests. It is ideal for unit testing file-reading and writing code." },
      { q: "How do I use memfs to mock the fs module in Jest?", a: "Create __mocks__/fs.js that exports memfs. Jest automatically replaces require('fs') with your mock when jest.mock('fs') is called. For ESM use jest.unstable_mockModule('node:fs', ...) or the fs/promises mock." },
      { q: "How do I test a function that reads a large file as a stream?", a: "Create a memfs virtual file with vol.writeFileSync() and any content. memfs implements createReadStream compatible with Node.js stream interfaces, so pipe it through your function normally." },
    ],
    published: true,
  },
  {
    slug: "generate-dummy-files-qa-testing",
    title: "Generate Dummy Files for QA: Scripts, Tools, and Best Practices",
    description: "Generate dummy test files of any size for QA testing — PDF, DOCX, TXT, CSV, ZIP. Compare dd, Faker.js, and pre-built download services. Save hours of setup time.",
    date: "2026-10-02", cluster: 4, clusterName: "Testing & QA with Files", clusterColor: "from-emerald-500 to-teal-600",
    tags: ["qa","testing","dummy-files","test-fixtures","tools"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "generate dummy test files", monthlyVolume: 8100, keywordDifficulty: 12,
    downloadCTA: { text: "Skip the scripting — download pre-generated dummy files instantly. PDF, DOCX, TXT from 1MB to 1GB.", fileType: "pdf", fileSlug: "100mb", buttonLabel: "Download 100MB PDF Dummy File →" },
    relatedFiles: [{ type: "pdf", slug: "100mb" },{ type: "docx", slug: "50mb" },{ type: "txt", slug: "5mb" },{ type: "zip", slug: "100mb" }],
    relatedArticles: ["test-file-upload-api-postman","test-pdf-download-playwright-cypress","file-size-bytes-kb-mb-gb-explained"],
    faqItems: [
      { q: "What is the easiest way to create a dummy file of a specific size?", a: "On macOS/Linux: dd if=/dev/zero of=test-100mb.bin bs=1M count=100. On Windows PowerShell: fsutil file createnew test-100mb.bin 104857600. For format-valid files (PDF, DOCX), use FileDummy.dev which serves structurally valid files at exact sizes." },
      { q: "What is the difference between a dummy file and a sample file?", a: "A dummy file is any file of a specific size, often with zero or random bytes — used to test storage quotas and bandwidth. A sample file is a valid format file containing representative content — used to test parsers, viewers, and content handling. FileDummy.dev provides both." },
      { q: "Why should I not use /dev/urandom to generate test files?", a: "Files from /dev/urandom are random bytes with no format structure. They fail MIME type validation, PDF parsers, and any code that validates file content beyond the extension. For testing file processing, you need format-valid files." },
    ],
    published: true,
  },
  {
    slug: "test-pdf-download-playwright-cypress",
    title: "Test PDF File Downloads with Playwright and Cypress",
    description: "Write E2E tests for PDF and file downloads using Playwright and Cypress. Verify download completion, file size, and content type with working code examples.",
    date: "2026-10-20", cluster: 4, clusterName: "Testing & QA with Files", clusterColor: "from-emerald-500 to-teal-600",
    tags: ["playwright","cypress","e2e-testing","pdf","file-download"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "test pdf download playwright", monthlyVolume: 1800, keywordDifficulty: 18,
    downloadCTA: { text: "Download our sample PDFs as E2E test fixtures — from 1MB to 1GB, valid format for CI pipelines.", fileType: "pdf", fileSlug: "10mb", buttonLabel: "Download 10MB PDF Fixture →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" }],
    relatedArticles: ["unit-test-file-handling-nodejs-jest","test-file-upload-api-postman","generate-dummy-files-qa-testing"],
    faqItems: [
      { q: "How do I test file downloads in Playwright without a browser UI?", a: "Use page.waitForEvent('download') to capture a Download object. Call download.saveAs(path) to save it locally, then verify with fs.statSync(path).size. Playwright download interception works in headless mode across Chromium, Firefox, and WebKit." },
      { q: "How do I test file downloads in Cypress?", a: "Cypress does not natively intercept browser downloads. Use cy.intercept() to intercept the download URL, then fetch it with cy.request() and verify the response headers (Content-Type, Content-Disposition) and body size." },
      { q: "How do I verify the downloaded file is a valid PDF in an E2E test?", a: "Read the first 4 bytes of the saved file and check for %PDF. In Node.js: const buf = fs.readFileSync(path); const isPDF = buf.slice(0, 4).toString() === '%PDF'. For deeper validation, use pdf-parse to verify the file can be parsed without errors." },
    ],
    published: true,
  },
  {
    slug: "mock-filesystem-jest-memfs",
    title: "How to Mock the File System in Jest Tests (memfs Guide)",
    description: "Mock the Node.js file system in Jest unit tests using memfs. Avoid real disk I/O, control test state precisely, and write faster and more reliable file handling tests.",
    date: "2026-11-07", cluster: 4, clusterName: "Testing & QA with Files", clusterColor: "from-emerald-500 to-teal-600",
    tags: ["jest","memfs","mocking","unit-testing","nodejs"], wordCount: 1600, readingTime: 8,
    primaryKeyword: "mock file system jest", monthlyVolume: 1500, keywordDifficulty: 14,
    downloadCTA: { text: "Download real fixture files as a baseline for your mocked filesystem — 100KB ASCII TXT and 1MB PDF.", fileType: "txt", fileSlug: "ascii", buttonLabel: "Download 100KB ASCII TXT →" },
    relatedFiles: [{ type: "txt", slug: "ascii" },{ type: "txt", slug: "lorem" }],
    relatedArticles: ["unit-test-file-handling-nodejs-jest","generate-dummy-files-qa-testing","test-file-upload-api-postman"],
    faqItems: [
      { q: "How do I reset the memfs virtual filesystem between tests?", a: "Call vol.reset() in Jest's beforeEach() or afterEach() hook. This wipes all in-memory files and directories, ensuring test isolation — each test starts with a clean virtual filesystem." },
      { q: "Does memfs support streams?", a: "Yes. memfs implements createReadStream and createWriteStream returning Node.js-compatible stream objects, making it suitable for testing streaming file pipelines without real disk I/O." },
      { q: "Can memfs handle large files without memory issues?", a: "memfs stores file content as Buffers in memory — a 100MB virtual file uses 100MB of heap. For streaming logic tests, use small fixture files (under 1MB) in memfs and test large-file logic separately with real files or mocked stream events." },
    ],
    published: true,
  },

  // CLUSTER 5 — Cloud Storage & CDN
  {
    slug: "cloudflare-r2-vs-aws-s3-comparison",
    title: "Cloudflare R2 vs AWS S3: Full Comparison for Developers (2026)",
    description: "Compare Cloudflare R2 and AWS S3 on pricing, egress costs, performance, S3 API compatibility, and developer experience. Which is right for your project in 2026?",
    date: "2026-09-14", cluster: 5, clusterName: "Cloud Storage & CDN", clusterColor: "from-purple-500 to-violet-600",
    tags: ["cloudflare-r2","aws-s3","cloud-storage","object-storage","comparison"], wordCount: 2500, readingTime: 13,
    primaryKeyword: "cloudflare r2 vs aws s3", monthlyVolume: 2900, keywordDifficulty: 28,
    downloadCTA: { text: "Test your cloud storage architecture and client downloads with standardized test files.", fileType: "pdf", fileSlug: "1gb", buttonLabel: "Download 1GB PDF Benchmark File →" },
    relatedFiles: [{ type: "pdf", slug: "1gb" },{ type: "zip", slug: "100mb" }],
    relatedArticles: ["serve-large-files-cdn-best-practices","s3-bucket-policy-public-private","cloud-storage-cost-comparison-2025"],
    faqItems: [
      { q: "What is Cloudflare R2's biggest advantage over AWS S3?", a: "Zero egress fees. AWS S3 charges $0.09 per GB for data transfer out to the internet. Cloudflare R2 charges $0. For high-download-volume applications, this eliminates 70–90% of the monthly storage bill." },
      { q: "Is Cloudflare R2 fully S3 API compatible?", a: "R2 implements the S3-compatible API — the AWS SDK v3 works by changing the endpoint URL. However R2 lacks some S3 features: no object versioning, no S3 replication, no S3 Select, and limited lifecycle policy support as of 2026." },
      { q: "Which is faster for global file distribution: R2 or S3?", a: "For global downloads, Cloudflare R2 with Workers CDN is generally faster due to Cloudflare's 300+ edge locations and zero-egress economics making CDN caching more viable. For uploads, both are comparable depending on your region relative to the bucket." },
    ],
    published: true,
  },
  {
    slug: "serve-large-files-cdn-best-practices",
    title: "Best Practices for Serving Large Files with a CDN",
    description: "Optimize large file delivery with a CDN — cache headers, range requests, edge caching, chunked transfer, and cost reduction strategies. Test with a free 1GB sample file.",
    date: "2026-09-17", cluster: 5, clusterName: "Cloud Storage & CDN", clusterColor: "from-purple-500 to-violet-600",
    tags: ["cdn","large-files","performance","cache","http-headers"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "serve large files cdn", monthlyVolume: 1800, keywordDifficulty: 20,
    downloadCTA: { text: "Download a 1GB sample file to benchmark download throughput and streaming performance.", fileType: "pdf", fileSlug: "1gb", buttonLabel: "Download 1GB Test File →" },
    relatedFiles: [{ type: "pdf", slug: "500mb" },{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["cloudflare-r2-vs-aws-s3-comparison","http-range-request-partial-content","stream-large-file-download-nodejs"],
    faqItems: [
      { q: "What Cache-Control header should I use for large downloadable files?", a: "For immutable versioned assets: Cache-Control: public, max-age=31536000, immutable. For files that may change: Cache-Control: public, max-age=86400, stale-while-revalidate=3600. Always include ETag or Last-Modified for efficient CDN cache validation." },
      { q: "Should I use chunked transfer encoding or Content-Length?", a: "For large files, always set Content-Length when the size is known — this enables progress bars and range requests. Chunked transfer encoding is appropriate only when the final size is unknown, such as streaming generated content." },
      { q: "How do I prevent CDN from caching user-specific download responses?", a: "Add Cache-Control: private, no-store to responses including access tokens or user-specific URLs. CDNs respect Cache-Control: private and will not cache these responses at edge nodes." },
    ],
    published: true,
  },
  {
    slug: "stream-large-file-download-nodejs",
    title: "How to Stream Large File Downloads in Node.js Without Memory Issues",
    description: "Stream large files in Node.js using fs.createReadStream and Express without loading into memory. Covers backpressure, range request support, and CDN integration.",
    date: "2026-09-20", cluster: 5, clusterName: "Cloud Storage & CDN", clusterColor: "from-purple-500 to-violet-600",
    tags: ["nodejs","streaming","express","file-download","performance"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "stream large file nodejs", monthlyVolume: 2200, keywordDifficulty: 20,
    downloadCTA: { text: "Stress-test your stream endpoint and memory consumption with large sample files.", fileType: "pdf", fileSlug: "500mb", buttonLabel: "Download 500MB Stream Test →" },
    relatedFiles: [{ type: "pdf", slug: "500mb" },{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["http-range-request-partial-content","serve-large-files-cdn-best-practices","load-test-file-download-k6-jmeter"],
    faqItems: [
      { q: "Why does Node.js run out of memory when serving large files?", a: "Using fs.readFileSync() or res.send(buffer) loads the entire file into heap memory. For a 1GB file with 10 concurrent downloads, that is 10GB of RAM. Use fs.createReadStream().pipe(res) instead — it reads in 64KB chunks, keeping memory constant regardless of file size." },
      { q: "What is backpressure in Node.js streams?", a: "Backpressure occurs when the writable stream (HTTP response) cannot consume data as fast as the readable stream (file read) produces it. Using .pipe() handles backpressure automatically by pausing the file read when the response write buffer is full." },
      { q: "How do I add HTTP Range request support to my Node.js file server?", a: "Parse the Range header, calculate the byte range, use fs.createReadStream(path, { start, end }), and respond with 206 Partial Content and the Content-Range header. This enables browser resume support and video seeking." },
    ],
    published: true,
  },
  {
    slug: "http-range-request-partial-content",
    title: "HTTP Range Requests Explained: Resumable and Partial Downloads",
    description: "Understand HTTP Range requests and 206 Partial Content. Learn how browsers, download managers, and video players use range requests — with a full Node.js implementation.",
    date: "2026-10-05", cluster: 5, clusterName: "Cloud Storage & CDN", clusterColor: "from-purple-500 to-violet-600",
    tags: ["http","range-requests","206","resumable-download","nodejs"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "http range request 206 partial content", monthlyVolume: 2400, keywordDifficulty: 20,
    downloadCTA: { text: "Test Range requests against our sample file endpoints — all files support HTTP 206 range responses.", fileType: "pdf", fileSlug: "100mb", buttonLabel: "Download Range-Ready 100MB PDF →" },
    relatedFiles: [{ type: "pdf", slug: "100mb" },{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["stream-large-file-download-nodejs","serve-large-files-cdn-best-practices","resumable-file-upload-tus-javascript"],
    faqItems: [
      { q: "What is the HTTP Range request header?", a: "The Range header asks the server to return only a specific byte range. Format: Range: bytes=start-end (e.g., bytes=0-1023 for the first 1024 bytes). The server responds with 206 Partial Content and the Content-Range header indicating the returned bytes." },
      { q: "How does video streaming use HTTP Range requests?", a: "HTML5 video elements use range requests to seek without downloading the entire video. When you drag the seek bar, the browser sends a Range request for the bytes at that timestamp — this is why you can seek before a video is fully buffered." },
      { q: "How do I check if a server supports range requests?", a: "Look for Accept-Ranges: bytes in the HEAD response. Run curl -I https://example.com/file.pdf and check for the header. All major cloud storage services (S3, R2, CloudFront) support ranges natively." },
    ],
    published: true,
  },
  {
    slug: "s3-bucket-policy-public-private",
    title: "S3 Bucket Policies: Public vs Private File Access Explained",
    description: "Understand S3 and Cloudflare R2 bucket policies for public and private file access. Learn IAM roles, presigned URLs, and the principle of least privilege with examples.",
    date: "2026-10-23", cluster: 5, clusterName: "Cloud Storage & CDN", clusterColor: "from-purple-500 to-violet-600",
    tags: ["aws-s3","cloudflare-r2","bucket-policy","iam","security"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "s3 bucket policy public private", monthlyVolume: 2200, keywordDifficulty: 22,
    downloadCTA: { text: "Test secure download flows and archive extraction with a 50MB ZIP sample.", fileType: "zip", fileSlug: "50mb", buttonLabel: "Download 50MB ZIP Sample →" },
    relatedFiles: [{ type: "zip", slug: "50mb" }],
    relatedArticles: ["presigned-url-s3-r2-secure-download","cloudflare-r2-vs-aws-s3-comparison","cloud-storage-cost-comparison-2025"],
    faqItems: [
      { q: "Should I ever make an S3 bucket fully public?", a: "Only for genuinely static public assets that require no access control — like open-source CDN assets or public sample files. Never make buckets containing user data, PII, or financial records public. Misconfigured public buckets are among the most common causes of cloud data breaches." },
      { q: "What is the difference between a bucket policy and an IAM policy?", a: "Bucket policies are resource-based policies attached to the bucket controlling access from any AWS account. IAM policies are identity-based attached to users and roles controlling which AWS resources that identity can access. Both must allow access for cross-account requests to succeed." },
      { q: "How do I block all public access to an S3 bucket?", a: "Enable all four Block Public Access settings in the S3 console. These settings override bucket policies and ACLs that would otherwise make objects public — a safety net against accidentally misconfigured policies." },
    ],
    published: true,
  },
  {
    slug: "cloud-storage-cost-comparison-2025",
    title: "Cloud Storage Cost Comparison: S3 vs R2 vs Backblaze B2 (2026)",
    description: "Compare cloud object storage pricing in 2026: AWS S3, Cloudflare R2, Backblaze B2, and Google Cloud Storage. Storage, egress, and operations costs with real scenarios.",
    date: "2026-11-10", cluster: 5, clusterName: "Cloud Storage & CDN", clusterColor: "from-purple-500 to-violet-600",
    tags: ["cloud-storage","aws-s3","cloudflare-r2","backblaze-b2","cost"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "cloud storage cost comparison 2025", monthlyVolume: 2200, keywordDifficulty: 22,
    downloadCTA: { text: "Benchmark data transfer rates and test large-scale storage downloads with a 1GB sample file.", fileType: "pdf", fileSlug: "1gb", buttonLabel: "Download 1GB PDF Sample →" },
    relatedFiles: [{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["cloudflare-r2-vs-aws-s3-comparison","s3-bucket-policy-public-private","serve-large-files-cdn-best-practices"],
    faqItems: [
      { q: "Which is cheapest for 1TB storage with 10TB monthly downloads?", a: "Cloudflare R2: about $15/month ($0.015/GB storage, $0 egress). Backblaze B2 + Cloudflare CDN: about $6/month ($0.006/GB storage, $0 egress via Cloudflare partnership). AWS S3 + CloudFront: about $905/month. For egress-heavy workloads, R2 and B2 are dramatically cheaper." },
      { q: "Does Cloudflare R2 have a free tier?", a: "Yes. R2 includes 10GB storage/month, 1 million Class A operations/month, and 10 million Class B operations/month free. No egress charges at any tier. For small projects and demos, R2 is completely free." },
      { q: "What is the difference between Class A and Class B operations in R2?", a: "Class A operations modify data: PUT, POST, DELETE at $4.50 per million. Class B operations read data: GET, HEAD at $0.36 per million. Write-heavy workloads cost more per operation than read-heavy ones." },
    ],
    published: true,
  },

  // CLUSTER 6 — File Formats & Deep Dives
  {
    slug: "pdf-file-format-structure-internals",
    title: "PDF File Format Internals: How a PDF Is Actually Structured",
    description: "Deep dive into the PDF file format — cross-reference tables, object streams, page tree, content streams, and fonts. Understand what is inside a PDF at the binary level.",
    date: "2026-09-14", cluster: 6, clusterName: "File Formats & Deep Dives", clusterColor: "from-cyan-500 to-sky-600",
    tags: ["pdf","file-format","internals","binary","deep-dive"], wordCount: 2500, readingTime: 13,
    primaryKeyword: "pdf file format structure", monthlyVolume: 2900, keywordDifficulty: 25,
    downloadCTA: { text: "Inspect our sample PDFs yourself — download and open in a hex editor to explore the binary structure.", fileType: "pdf", fileSlug: "1mb", buttonLabel: "Download 1MB PDF to Inspect →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" }],
    relatedArticles: ["extract-text-pdf-javascript","merge-split-pdf-nodejs-pdflib","binary-vs-text-files-explained"],
    faqItems: [
      { q: "What is a PDF cross-reference (xref) table?", a: "The xref table is an index at the end of a PDF mapping each object number to its byte offset. PDF readers jump to the xref to find any object without scanning the entire file — enabling fast random access to any page of a 1000-page document." },
      { q: "Why do PDF files start with %PDF-1.x?", a: "The %PDF-1.x header is the PDF magic bytes signature identifying the format and PDF specification version (1.4, 1.7, 2.0). The second line with high-byte characters signals that the file contains binary data, preventing text-mode processing by tools." },
      { q: "What is a content stream in a PDF?", a: "A content stream is a sequence of PDF operators that describe the visual appearance of a page — text positions, font selections, image placements, and vector drawing commands. It is stored as a compressed (usually zlib/deflate) binary stream within the PDF object structure." },
    ],
    published: true,
  },
  {
    slug: "docx-file-format-openxml-explained",
    title: "DOCX File Format: It's Just a ZIP of XML Files (Deep Dive)",
    description: "Explore the DOCX OpenXML format — unzip a Word document and discover the XML structure inside. Learn about document.xml, relationships, styles, and embedded media files.",
    date: "2026-09-17", cluster: 6, clusterName: "File Formats & Deep Dives", clusterColor: "from-cyan-500 to-sky-600",
    tags: ["docx","openxml","file-format","xml","deep-dive"], wordCount: 2200, readingTime: 11,
    primaryKeyword: "docx file format openxml", monthlyVolume: 1900, keywordDifficulty: 18,
    downloadCTA: { text: "Unzip our sample DOCX and explore the XML structure yourself — download a 1MB DOCX file.", fileType: "docx", fileSlug: "1mb", buttonLabel: "Download 1MB DOCX to Explore →" },
    relatedFiles: [{ type: "docx", slug: "1mb" }],
    relatedArticles: ["parse-docx-javascript-mammoth","pdf-file-format-structure-internals","file-type-validation-magic-bytes"],
    faqItems: [
      { q: "How do I manually inspect the contents of a DOCX file?", a: "Rename document.docx to document.zip and extract it. You will find folders like word/, _rels/, and [Content_Types].xml. The main content is in word/document.xml. Open it in a text editor to see the raw OpenXML markup." },
      { q: "What is word/document.xml inside a DOCX?", a: "It contains the main body content in OpenXML markup. Paragraphs are w:p elements, text runs are w:r, text content is w:t. Tables are w:tbl. Styles (fonts, colors) are referenced by ID from word/styles.xml." },
      { q: "Why does DOCX use ZIP compression?", a: "OOXML uses ZIP to package multiple related XML files (content, styles, images, relationships) into one portable file. ZIP compression significantly reduces file size — a 10MB DOCX might contain 50MB of uncompressed XML. This is also why DOCX magic bytes are identical to ZIP: 50 4B 03 04." },
    ],
    published: true,
  },
  {
    slug: "utf8-utf16-utf32-text-encoding",
    title: "UTF-8 vs UTF-16 vs UTF-32: Text File Encoding Explained Simply",
    description: "Understand the difference between UTF-8, UTF-16, and UTF-32 text encoding. Learn BOM, code points, byte order, and when each encoding is the right choice for developers.",
    date: "2026-09-20", cluster: 6, clusterName: "File Formats & Deep Dives", clusterColor: "from-cyan-500 to-sky-600",
    tags: ["encoding","utf-8","utf-16","unicode","text-files"], wordCount: 1800, readingTime: 9,
    primaryKeyword: "utf8 vs utf16 difference", monthlyVolume: 3600, keywordDifficulty: 12,
    downloadCTA: { text: "Download our Unicode and ASCII TXT samples to compare encodings — multilingual AI terminology in 10 languages.", fileType: "txt", fileSlug: "unicode", buttonLabel: "Download 50KB Unicode TXT →" },
    relatedFiles: [{ type: "txt", slug: "unicode" },{ type: "txt", slug: "ascii" }],
    relatedArticles: ["binary-vs-text-files-explained","mime-types-complete-guide-web-developer","file-size-bytes-kb-mb-gb-explained"],
    faqItems: [
      { q: "Why is UTF-8 dominant on the web?", a: "UTF-8 is backward-compatible with ASCII, self-synchronizing (character boundaries are detectable without reading from the start), has no byte order ambiguity, and is space-efficient for ASCII-heavy text. HTTP, HTML5, JSON, and XML all default to UTF-8." },
      { q: "What is a BOM (Byte Order Mark) and do I need it?", a: "A BOM is a special Unicode character (U+FEFF) that indicates byte order for UTF-16/UTF-32, or identifies UTF-8. UTF-8 BOM (EF BB BF) is optional and often causes problems with parsers. Modern tooling recommends UTF-8 without BOM." },
      { q: "When should I use UTF-16 instead of UTF-8?", a: "UTF-16 is used internally by Windows APIs, Java, JavaScript engines, and .NET — they store strings as UTF-16 in memory. For file storage and network transmission, prefer UTF-8. Use UTF-16 only when required by specific APIs." },
    ],
    published: true,
  },
  {
    slug: "file-size-bytes-kb-mb-gb-explained",
    title: "File Sizes Explained: Bytes, KB, MB, GB, TB — The Developer Guide",
    description: "Understand file size units — the difference between kilobytes and kibibytes, decimal vs binary prefixes, and how operating systems calculate and display file sizes.",
    date: "2026-10-08", cluster: 6, clusterName: "File Formats & Deep Dives", clusterColor: "from-cyan-500 to-sky-600",
    tags: ["file-size","bytes","kb","mb","gb","fundamentals"], wordCount: 1600, readingTime: 8,
    primaryKeyword: "file size kb mb gb difference", monthlyVolume: 5400, keywordDifficulty: 8,
    downloadCTA: { text: "Download files at exact sizes: 1MB, 10MB, 100MB, 1GB — verify them with your OS file size reporting tool.", fileType: "pdf", fileSlug: "100mb", buttonLabel: "Download Exact 100MB PDF →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "pdf", slug: "10mb" },{ type: "pdf", slug: "100mb" },{ type: "pdf", slug: "1gb" }],
    relatedArticles: ["generate-dummy-files-qa-testing","mime-types-complete-guide-web-developer","binary-vs-text-files-explained"],
    faqItems: [
      { q: "Why does Windows show a different file size than the actual size?", a: "Windows Explorer shows size on disk (rounded up to the cluster size, typically 4096 bytes) alongside the actual file size. A 1-byte file has 1 byte size but 4 KB size on disk. Also, Windows uses 1 KB = 1,024 bytes while storage manufacturers use 1 KB = 1,000 bytes." },
      { q: "What is the difference between KB and KiB?", a: "1 KB (kilobyte, SI standard) = 1,000 bytes. 1 KiB (kibibyte, IEC standard) = 1,024 bytes. Operating systems historically use KB to mean 1,024 bytes (binary), causing ambiguity. IEC introduced KiB/MiB/GiB for clarity. In programming, always be explicit about which base you are using." },
      { q: "How many bytes is 1 GB exactly?", a: "Decimal (storage manufacturers): 1 GB = 1,000,000,000 bytes. Binary (OS convention): 1 GiB = 1,073,741,824 bytes. This 7.4% difference explains why a 1TB hard drive shows as 931 GB in Windows. FileDummy.dev uses binary sizes for all files." },
    ],
    published: true,
  },
  {
    slug: "mime-types-complete-guide-web-developer",
    title: "MIME Types Complete Reference: The Web Developer's Guide",
    description: "Complete guide to MIME types (Content-Type) for web developers. Common MIME types, how browsers use them, server configuration, and security implications.",
    date: "2026-10-26", cluster: 6, clusterName: "File Formats & Deep Dives", clusterColor: "from-cyan-500 to-sky-600",
    tags: ["mime-types","content-type","http","web","reference"], wordCount: 2000, readingTime: 10,
    primaryKeyword: "mime types list web developer", monthlyVolume: 4400, keywordDifficulty: 15,
    downloadCTA: { text: "Download PDF, DOCX, TXT — every FileDummy file is served with the correct MIME type Content-Type header.", fileType: "pdf", fileSlug: "1mb", buttonLabel: "Download 1MB PDF (Correct MIME) →" },
    relatedFiles: [{ type: "pdf", slug: "1mb" },{ type: "docx", slug: "1mb" },{ type: "txt", slug: "lorem" }],
    relatedArticles: ["file-type-validation-magic-bytes","binary-vs-text-files-explained","utf8-utf16-utf32-text-encoding"],
    faqItems: [
      { q: "What is the MIME type for PDF files?", a: "application/pdf. Without the correct MIME type, some browsers display raw binary instead of rendering the PDF. Always serve PDF files with Content-Type: application/pdf." },
      { q: "What MIME type should I use for JSON API responses?", a: "application/json. Not text/json (non-standard) or application/javascript (incorrect). For JSON:API specification responses, use application/vnd.api+json. UTF-8 is the JSON default per RFC 8259." },
      { q: "Why does the browser download a file instead of displaying it?", a: "Two causes: (1) The server sends Content-Disposition: attachment — forces download regardless of MIME type. (2) The MIME type is application/octet-stream — browsers download unrecognized types. To display PDF inline, serve with Content-Type: application/pdf and Content-Disposition: inline." },
    ],
    published: true,
  },
  {
    slug: "binary-vs-text-files-explained",
    title: "Binary vs Text Files: What Every Developer Should Know",
    description: "Understand the fundamental difference between binary and text files. Learn how line endings, null bytes, and encoding affect file processing in every programming language.",
    date: "2026-11-13", cluster: 6, clusterName: "File Formats & Deep Dives", clusterColor: "from-cyan-500 to-sky-600",
    tags: ["binary","text-files","encoding","fundamentals","programming"], wordCount: 1600, readingTime: 8,
    primaryKeyword: "binary vs text file difference", monthlyVolume: 2500, keywordDifficulty: 10,
    downloadCTA: { text: "Download binary (PDF, DOCX) and text (TXT) samples side by side — compare them in a hex editor.", fileType: "txt", fileSlug: "ascii", buttonLabel: "Download 100KB ASCII TXT →" },
    relatedFiles: [{ type: "txt", slug: "ascii" },{ type: "pdf", slug: "1mb" },{ type: "docx", slug: "1mb" }],
    relatedArticles: ["pdf-file-format-structure-internals","utf8-utf16-utf32-text-encoding","mime-types-complete-guide-web-developer"],
    faqItems: [
      { q: "What is the technical difference between a text file and a binary file?", a: "A text file contains only printable characters and line endings. A binary file contains arbitrary byte values including null bytes (0x00) and control characters. Most file formats (PDF, DOCX, ZIP, images) are binary. The distinction matters for file opening modes — in C and Python, b mode prevents line-ending translation." },
      { q: "Why does opening a binary file in a text editor show garbled content?", a: "Text editors interpret bytes as character codes. When a binary file contains bytes that do not correspond to printable Unicode characters (such as 0xFF or 0x00), the editor displays replacement characters. A hex editor shows the raw bytes — the correct tool for inspecting binary files." },
      { q: "How do line endings differ between Windows and Unix?", a: "Unix/Linux/macOS uses LF (0x0A). Windows uses CRLF (0x0D 0x0A). Opening a Windows text file on Unix shows ^M characters at line ends. Always normalize line endings when processing text files across platforms. Git can auto-normalize with core.autocrlf settings." },
    ],
    published: true,
  },
];

// ─────────────────────────────────────────────────────────
// Helper Functions & Drip-Feed Publishing Logic
// ─────────────────────────────────────────────────────────

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isPostPublished(post: BlogPost): boolean {
  if (!post.published) return false;
  if (process.env.NEXT_PUBLIC_SHOW_ALL_POSTS === "true") return true;
  return post.date <= getTodayDateString();
}

export function getPublishedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(isPostPublished).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post || !isPostPublished(post)) return undefined;
  return post;
}

export function getBlogPostsByCluster(cluster: BlogCluster): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.cluster === cluster && isPostPublished(p)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRelatedPosts(slug: string): BlogPost[] {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return [];

  const directRelated = post.relatedArticles
    .map((s) => getBlogPost(s))
    .filter(Boolean) as BlogPost[];

  if (directRelated.length >= 3) {
    return directRelated.slice(0, 3);
  }

  // Fallback: other published posts in same cluster
  const sameCluster = getBlogPostsByCluster(post.cluster).filter(
    (p) => p.slug !== slug && !directRelated.some((d) => d.slug === p.slug)
  );

  const combined = [...directRelated, ...sameCluster];
  if (combined.length >= 3) {
    return combined.slice(0, 3);
  }

  // Fallback: any other published posts
  const otherPosts = getPublishedPosts().filter(
    (p) => p.slug !== slug && !combined.some((c) => c.slug === p.slug)
  );

  return [...combined, ...otherPosts].slice(0, 3);
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return getPublishedPosts().slice(0, limit);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.filter(isPostPublished).map((p) => p.slug);
}

export function getPostCountByCluster(): Record<BlogCluster, number> {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } as Record<BlogCluster, number>;
  BLOG_POSTS.filter(isPostPublished).forEach((p) => {
    counts[p.cluster]++;
  });
  return counts;
}
