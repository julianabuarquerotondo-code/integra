import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * Rotina de retenção — remove submissões mais antigas que QUIZ_RETENTION_DAYS.
 * Não é ativada automaticamente: adicione um cron na Vercel apontando para esta
 * rota (ver README, seção "Vercel Cron") e configure CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ success: false, error: "Não autorizado." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase não configurado." }, { status: 503 });
  }

  const retentionDays = Number(process.env.QUIZ_RETENTION_DAYS ?? "180");
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

  const supabase = getSupabaseAdmin();
  const { error, count } = await supabase
    .from("quiz_submissions")
    .delete({ count: "exact" })
    .lt("created_at", cutoff.toISOString());

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: count ?? 0, cutoff: cutoff.toISOString() });
}
