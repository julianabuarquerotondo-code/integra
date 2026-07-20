import "server-only";

/**
 * Rate limiting em memória por instância — suficiente como proteção básica em dev
 * e como ponto de integração para uma solução distribuída (ex.: Upstash Ratelimit)
 * em produção na Vercel, onde múltiplas instâncias não compartilham este estado.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export function getClientIdentifier(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
