import { kv } from "@vercel/kv";
import { FILES } from "./files";

const localCounters = new Map<string, number>();

export function isKVConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getDownloadCount(r2Key: string): Promise<number> {
  const file = FILES.find((f) => f.r2Key === r2Key);
  const baseCount = file?.baseDownloads || 1000;

  if (!isKVConfigured()) {
    const extra = localCounters.get(r2Key) || 0;
    return baseCount + extra;
  }

  try {
    const count = await kv.get<number>(`downloads:${r2Key}`);
    return (count ?? 0) + baseCount;
  } catch (err) {
    console.warn(`[KV getDownloadCount] Failed for ${r2Key}, fallback to base:`, err);
    return baseCount + (localCounters.get(r2Key) || 0);
  }
}

export async function incrementCount(r2Key: string): Promise<number> {
  const file = FILES.find((f) => f.r2Key === r2Key);
  const baseCount = file?.baseDownloads || 1000;

  if (!isKVConfigured()) {
    const current = localCounters.get(r2Key) || 0;
    const next = current + 1;
    localCounters.set(r2Key, next);
    return baseCount + next;
  }

  try {
    const incremented = await kv.incr(`downloads:${r2Key}`);
    return baseCount + incremented;
  } catch (err) {
    console.warn(`[KV incrementCount] Failed for ${r2Key}, fallback to local memory:`, err);
    const current = localCounters.get(r2Key) || 0;
    const next = current + 1;
    localCounters.set(r2Key, next);
    return baseCount + next;
  }
}
