import { NextRequest, NextResponse } from "next/server";
import { getDownloadCount, incrementCount } from "@/lib/kv";
import { FILES } from "@/lib/files";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (!key) {
    // Return total downloads across all files
    let total = 0;
    for (const f of FILES) {
      total += await getDownloadCount(f.r2Key);
    }
    return NextResponse.json({ total });
  }

  const count = await getDownloadCount(key);
  return NextResponse.json({ key, count });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const key = body.key;

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    const count = await incrementCount(key);
    return NextResponse.json({ key, count });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
