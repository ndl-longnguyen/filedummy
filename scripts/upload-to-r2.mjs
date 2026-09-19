#!/usr/bin/env node

/**
 * Upload all pre-generated sample files to Cloudflare R2 Object Storage.
 *
 * Requirements:
 * Configure the following variables in .env.local:
 * - CLOUDFLARE_ACCOUNT_ID
 * - R2_ACCESS_KEY_ID
 * - R2_SECRET_ACCESS_KEY
 * - R2_BUCKET_NAME
 *
 * Usage:
 *   node scripts/upload-to-r2.mjs
 *   or: npm run upload:r2
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand, HeadBucketCommand } from "@aws-sdk/client-s3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const GENERATED_DIR = path.resolve(ROOT_DIR, "generated-files");

// 1. Load .env.local or .env
function loadEnv() {
  const envFiles = [path.resolve(ROOT_DIR, ".env.local"), path.resolve(ROOT_DIR, ".env")];
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;

// 2. Validate Credentials
if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  console.error("\x1b[31m%s\x1b[0m", "\n❌ Missing Cloudflare R2 Credentials!");
  console.log("\nPlease configure the following variables in \x1b[33m.env.local\x1b[0m:");
  console.log("--------------------------------------------------");
  console.log(`CLOUDFLARE_ACCOUNT_ID=${accountId || "your_account_id"}`);
  console.log(`R2_ACCESS_KEY_ID=${accessKeyId || "your_r2_access_key"}`);
  console.log(`R2_SECRET_ACCESS_KEY=${secretAccessKey ? "******" : "your_r2_secret_key"}`);
  console.log(`R2_BUCKET_NAME=${bucketName || "your_bucket_name"}`);
  console.log("--------------------------------------------------");
  console.log("\n💡 How to get these keys:");
  console.log("1. Cloudflare Dashboard -> R2 -> Manage R2 API Tokens -> Create API Token");
  console.log("2. Set Permissions to 'Admin Read & Write' or 'Object Read & Write'");
  console.log("3. Copy Account ID from the R2 overview page or URL");
  console.log("4. Paste into .env.local and run this script again.\n");
  process.exit(1);
}

// 3. MIME types mapping
const MIME_TYPES = {
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".csv": "text/csv; charset=utf-8",
  ".json": "application/json",
  ".zip": "application/zip",
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// 4. Collect all files in generated-files/
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function main() {
  console.log("\x1b[36m%s\x1b[0m", "\n=======================================================");
  console.log("\x1b[36m%s\x1b[0m", "   Cloudflare R2 Batch Uploader — FileDummy Assets     ");
  console.log("\x1b[36m%s\x1b[0m", "=======================================================\n");

  console.log(`Bucket:     \x1b[32m${bucketName}\x1b[0m`);
  console.log(`Account ID: \x1b[32m${accountId}\x1b[0m`);
  console.log(`Endpoint:   \x1b[32mhttps://${accountId}.r2.cloudflarestorage.com\x1b[0m\n`);

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  // Verify bucket connectivity
  try {
    process.stdout.write("Checking bucket access... ");
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log("\x1b[32m[OK]\x1b[0m\n");
  } catch (err) {
    console.log("\x1b[31m[FAILED]\x1b[0m");
    console.error(`\nCould not access bucket "${bucketName}". Reason:`, err.message);
    console.log("Please check bucket name and token permissions.\n");
    process.exit(1);
  }

  const allFiles = getAllFiles(GENERATED_DIR);
  if (allFiles.length === 0) {
    console.error(`No files found in ${GENERATED_DIR}. Please run scripts/generate-files.sh first.`);
    process.exit(1);
  }

  console.log(`Found \x1b[33m${allFiles.length}\x1b[0m files to upload from \x1b[34m${GENERATED_DIR}\x1b[0m\n`);

  let uploadedCount = 0;
  let totalBytesUploaded = 0;
  const startTime = Date.now();

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];
    const relPath = path.relative(GENERATED_DIR, filePath);
    // R2 Key matches folder/filename, e.g. "pdf/sample-1mb.pdf"
    const r2Key = relPath.split(path.sep).join("/");
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";
    const stat = fs.statSync(filePath);
    const sizeStr = formatBytes(stat.size);

    const progress = `[${i + 1}/${allFiles.length}]`;
    process.stdout.write(`${progress} Uploading \x1b[36m${r2Key}\x1b[0m (${sizeStr})... `);

    try {
      const fileStream = fs.createReadStream(filePath);
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: r2Key,
          Body: fileStream,
          ContentType: mimeType,
          ContentLength: stat.size,
        })
      );
      console.log("\x1b[32m✓ Done\x1b[0m");
      uploadedCount++;
      totalBytesUploaded += stat.size;
    } catch (uploadErr) {
      console.log("\x1b[31m✗ Failed\x1b[0m");
      console.error(`  Error: ${uploadErr.message}`);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n\x1b[32m%s\x1b[0m", "=======================================================");
  console.log(`🎉 Successfully uploaded ${uploadedCount}/${allFiles.length} files (${formatBytes(totalBytesUploaded)})`);
  console.log(`⏱️ Total time elapsed: ${durationSec}s`);
  console.log("\x1b[32m%s\x1b[0m", "=======================================================\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
