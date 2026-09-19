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

  // Check if generated file exists on local disk
  try {
    const fs = await import("fs");
    const path = await import("path");
    const localFilePath = path.join(process.cwd(), "generated-files", entry.r2Key);
    if (fs.existsSync(localFilePath)) {
      const stats = fs.statSync(localFilePath);
      const fileStream = fs.createReadStream(localFilePath);
      const headers = new Headers();
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      headers.set("Content-Type", typeMeta?.mimeType || "application/octet-stream");
      headers.set("Content-Length", stats.size.toString());
      headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

      // Convert Node ReadStream to Web ReadableStream
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk: string | Buffer) => {
            if (typeof chunk === "string") {
              controller.enqueue(new TextEncoder().encode(chunk));
            } else {
              controller.enqueue(new Uint8Array(chunk));
            }
          });
          fileStream.on("end", () => {
            controller.close();
          });
          fileStream.on("error", (err: Error) => {
            controller.error(err);
          });
        },
        cancel() {
          fileStream.destroy();
        },
      });

      return new NextResponse(webStream, { headers });
    }
  } catch (diskErr) {
    console.warn("[Download API] Could not read local file, falling back to mock stream:", diskErr);
  }

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
      "2026 GLOBAL ARTIFICIAL INTELLIGENCE & MACHINE LEARNING INDUSTRY REPORT\n" +
      "Published by Global AI Research Consortium & Enterprise Computing Council.\n" +
      "================================================================================\n" +
      "Authoritative reference document for upload testing, text parsers, and tokenizer evaluations.\n\n"
    );
  } else if (entry.type === "csv") {
    prefix = new TextEncoder().encode(
      "record_id,model_name,developer,architecture,parameters_b,context_k,math500_score,license,status\n" +
      "REC-000001,\"Claude 3.7 Sonnet\",\"Anthropic\",\"Hybrid MoE\",450,200,96.8,\"Proprietary\",\"Active\"\n" +
      "REC-000002,\"DeepSeek-R1\",\"DeepSeek AI\",\"Reasoning MoE\",671,128,97.3,\"MIT Open\",\"Active\"\n"
    );
  } else if (entry.type === "json") {
    prefix = new TextEncoder().encode(
      `{\n  "dataset": "2026 Global AI Model Benchmark Dataset",\n  "file": "sample-${entry.slug}",\n  "sizeBytes": ${entry.sizeBytes},\n  "models": [\n`
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
          controller.enqueue(new TextEncoder().encode('    { "id": "mod-999", "status": "completed" }\n  ]\n}'));
        }
        controller.close();
        return;
      }

      const remaining = effectiveBytes - bytesWritten;
      const thisChunkSize = Math.min(remaining, chunkSize);
      const chunk = new Uint8Array(thisChunkSize);

      if (entry.type === "txt" || entry.type === "csv") {
        const textSample = "Autonomous reasoning agents and test-time compute scaling dominate 2026 AI systems.\n";
        const sampleBytes = new TextEncoder().encode(textSample);
        for (let i = 0; i < thisChunkSize; i++) {
          chunk[i] = sampleBytes[i % sampleBytes.length];
        }
      } else {
        chunk.fill(0x30); // '0'
      }

      controller.enqueue(chunk);
      bytesWritten += thisChunkSize;
    },
  });

  return new NextResponse(stream, { headers });
}
