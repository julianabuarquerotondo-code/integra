import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin, isSupabaseConfigured, QUIZ_PDF_BUCKET } from "@/lib/supabase/admin";
import { sendQuizEmail, isEmailConfigured } from "@/lib/email/sendQuizEmail";
import type { AgeGroup, QuizResultKey } from "@/lib/quiz/types";

export const runtime = "nodejs";

const bodySchema = z.object({ publicCode: z.string().min(6).max(20) });

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !isEmailConfigured()) {
    return NextResponse.json({ success: false, error: "Serviço indisponível." }, { status: 503 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Dados inválidos." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: submission } = await supabase
    .from("quiz_submissions")
    .select("*")
    .eq("public_code", parsed.data.publicCode)
    .maybeSingle();

  if (!submission) {
    return NextResponse.json({ success: false, error: "Não encontrado." }, { status: 404 });
  }

  if (submission.email_status === "sent") {
    return NextResponse.json({ success: true, alreadySent: true });
  }

  if (!submission.pdf_path) {
    return NextResponse.json(
      { success: false, error: "PDF ainda não disponível para esta triagem." },
      { status: 409 },
    );
  }

  const { data: pdfData, error: downloadError } = await supabase.storage
    .from(QUIZ_PDF_BUCKET)
    .download(submission.pdf_path);

  if (downloadError || !pdfData) {
    return NextResponse.json({ success: false, error: "Não foi possível recuperar o PDF." }, { status: 500 });
  }

  const pdfBuffer = Buffer.from(await pdfData.arrayBuffer());

  try {
    await sendQuizEmail({
      publicCode: submission.public_code,
      createdAt: new Date(submission.created_at),
      respondentName: submission.respondent_name,
      phone: submission.phone,
      ageGroup: submission.age_group as AgeGroup,
      resultKey: submission.result_key as QuizResultKey,
      bestContactTime: submission.best_contact_time,
      additionalNotes: submission.additional_notes ?? undefined,
      pdfBuffer,
    });

    await supabase
      .from("quiz_submissions")
      .update({ email_status: "sent", email_sent_at: new Date().toISOString(), email_error: null })
      .eq("public_code", submission.public_code);

    return NextResponse.json({ success: true });
  } catch (error) {
    await supabase
      .from("quiz_submissions")
      .update({
        email_status: "failed",
        email_error: error instanceof Error ? error.message.slice(0, 500) : "Erro desconhecido",
      })
      .eq("public_code", submission.public_code);

    return NextResponse.json({ success: false, error: "Falha ao reenviar." }, { status: 500 });
  }
}
