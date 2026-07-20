import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Cliente Supabase com a chave secreta — nunca importar em componentes client.
 * Só deve ser usado em Route Handlers / Server Actions (Node runtime).
 * Tipagem das tabelas é feita manualmente via lib/supabase/types.ts (ver QuizSubmissionRow)
 * para evitar acoplamento à inferência genérica do supabase-js.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY no .env.local.",
    );
  }

  cachedClient = createClient(url, secretKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

export const QUIZ_PDF_BUCKET = "quiz-pdfs";
