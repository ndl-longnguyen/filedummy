import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client } from "@/lib/r2";
import { FILES, FILE_TYPES } from "@/lib/files";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("file");

  if (!key) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  // Whitelist check
  const entry = FILES.find((f) => f.r2Key === key);
  if (!entry) {
    return NextResponse.json({ error: "File not found or unauthorized key" }, { status: 404 });
  }

  const r2 = getR2Client();

  // If R2 is properly configured with credentials
  if (r2 && process.env.R2_BUCKET_NAME) {
    try {
      const filename = entry.r2Key.split("/").pop() || "sample-file";
      const signedUrl = await getSignedUrl(
        r2,
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: entry.r2Key,
          ResponseContentDisposition: `attachment; filename="${filename}"`,
        }),
        { expiresIn: 900 } // 15 minutes
      );

      return NextResponse.redirect(signedUrl, { status: 302 });
    } catch (err) {
      console.warn("[Download API] R2 presigned URL generation failed, fallback to local stream:", err);
    }
  }

  // Local development / fallback stream mode
  const typeMeta = FILE_TYPES[entry.type];
  const filename = entry.r2Key.split("/").pop() || `sample-${entry.slug}.${entry.type}`;

  // Generate lightweight/streamed dummy content for local testing
  const headers = new Headers();
  headers.set("Content-Disposition", `attachment; filename="${filename}"`);
  headers.set("Content-Type", typeMeta?.mimeType || "application/octet-stream");
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  // For small/medium files or local testing, generate appropriate bytes
  const targetBytes = entry.sizeBytes;
  
  // Create a ReadableStream that yields chunks up to targetBytes
  const chunkSize = 65536; // 64KB chunks
  let bytesWritten = 0;

  // Header prefix depending on type
  let prefix = new Uint8Array(0);
  if (entry.type === "pdf") {
    prefix = new TextEncoder().encode(
      "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000068 00000 n\n0000000125 00000 n\ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n200\n%%EOF\n"
    );
  } else if (entry.type === "txt") {
    prefix = new TextEncoder().encode(
      `FileDummy Sample Text File (${entry.label})\nTarget size: ${entry.sizeBytes} bytes\nGenerated for testing and QA validation.\n\n`
    );
  } else if (entry.type === "csv") {
    prefix = new TextEncoder().encode(
      "id,name,email,role,status,created_at\n1,Alex Morgan,alex@example.com,Admin,Active,2026-01-15\n2,Taylor Swift,taylor@example.com,User,Active,2026-02-01\n"
    );
  } else if (entry.type === "json") {
    prefix = new TextEncoder().encode(
      `{\n  "name": "sample-${entry.slug}",\n  "type": "sample-data",\n  "sizeBytes": ${entry.sizeBytes},\n  "items": [\n`
    );
  }

  // To prevent crashing local memory on 1GB during local dev, cap mock stream at 10MB if over 10MB in local mock mode
  const effectiveBytes = Math.min(targetBytes, 10 * 1024 * 1024);
  headers.set("Content-Length", effectiveBytes.toString());

  const stream = new ReadableStream({
    start(controller) {
      if (prefix.length > 0) {
        controller.enqueue(prefix);
        bytesWritten += prefix.length;
      }
    },
    pull(controller) {
      if (bytesWritten >= effectiveBytes) {
        if (entry.type === "json") {
          controller.enqueue(new TextEncoder().encode('    { "id": 999, "status": "end" }\n  ]\n}'));
        }
        controller.close();
        return;
      }

      const remaining = effectiveBytes - bytesWritten;
      const thisChunkSize = Math.min(remaining, chunkSize);
      const chunk = new Uint8Array(thisChunkSize);

      if (entry.type === "txt" || entry.type === "csv") {
        // Fill with repeatable readable text
        for (let i = 0; i < thisChunkSize; i++) {
          chunk[i] = 65 + (i % 26); // A-Z
        }
      } else {
        chunk.fill(0x58); // 'X'
      }

      controller.enqueue(chunk);
      bytesWritten += thisChunkSize;
    },
  });

  return new NextResponse(stream, { headers });
}
