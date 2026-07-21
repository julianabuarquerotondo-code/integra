import { NextResponse } from "next/server";
import { quizSubmitSchema } from "@/lib/quiz/schemas";
import { evaluateQuiz } from "@/lib/quiz/engine";
import { resultCopy } from "@/lib/quiz/result-copy";
import { generatePublicCode } from "@/lib/utils/public-code";
import { getSupabaseAdmin, isSupabaseConfigured, QUIZ_PDF_BUCKET } from "@/lib/supabase/admin";
import { generateQuizPdf, pdfFileNameForCode } from "@/lib/pdf/generateQuizPdf";
import { sendQuizEmail, isEmailConfigured } from "@/lib/email/sendQuizEmail";
import { normalizePhone } from "@/lib/utils/phone";
import { sanitizeAnswers } from "@/lib/security/sanitize";
import { isRateLimited, getClientIdentifier } from "@/lib/security/rate-limit";
import { createQuizWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";
import { siteConfig } from "@/content/site";
import type { QuizAnswers } from "@/lib/quiz/types";

export const runtime = "nodejs";

const CONSENT_VERSION = "2026-07-v1";
const MAX_PAYLOAD_BYTES = 20_000;

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request.headers);
  if (isRateLimited(`quiz-submit:${clientId}`)) {
    return NextResponse.json(
      { success: false, error: "Muitas tentativas. Aguarde um instante e tente novamente." },
      { status: 429 },
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ success: false, error: "Payload inválido." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, error: "JSON inválido." }, { status: 400 });
  }

  const parsed = quizSubmitSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;

  // honeypot preenchido => descarta silenciosamente como sucesso falso para não alertar bots
  if (input.website) {
    return NextResponse.json({
      success: true,
      publicCode: "INT-000000",
      result: resultCopy.initial_conversation,
      whatsappUrl: "",
    });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error:
          "O envio da triagem está temporariamente indisponível. Tente novamente em instantes ou fale pelo WhatsApp.",
      },
      { status: 503 },
    );
  }

  const supabase = getSupabaseAdmin();

  // idempotência: se o token já existe, retorna a submissão existente sem duplicar
  const { data: existing } = await supabase
    .from("quiz_submissions")
    .select("public_code, result_key")
    .eq("submission_token", input.submissionToken)
    .maybeSingle();

  if (existing) {
    const result = resultCopy[existing.result_key as keyof typeof resultCopy] ?? resultCopy.initial_conversation;
    return NextResponse.json({
      success: true,
      publicCode: existing.public_code,
      result,
      whatsappUrl: createQuizWhatsappUrl(siteConfig.whatsapp, {
        respondentName: input.respondentName,
        publicCode: existing.public_code,
        resultLabel: result.label,
      }),
    });
  }

  const sanitized = sanitizeAnswers(input);
  const phone = normalizePhone(sanitized.phone);

  const answers: QuizAnswers = {
    ...sanitized,
    phone,
    email: sanitized.email || undefined,
  };

  const outcome = evaluateQuiz(answers);
  const result = resultCopy[outcome.resultKey];

  const publicCode = await generatePublicCode(async (code) => {
    const { data } = await supabase
      .from("quiz_submissions")
      .select("id")
      .eq("public_code", code)
      .maybeSingle();
    return Boolean(data);
  });

  const createdAt = new Date();
  const consentAt = createdAt;

  const respondentType =
    answers.branch === "A"
      ? (answers.a1_respondent ?? "nao_informado")
      : answers.branch === "B"
        ? (answers.b1_respondent ?? "nao_informado")
        : answers.branch === "C"
          ? (answers.c1_respondent ?? "nao_informado")
          : "nao_informado";

  const { error: insertError } = await supabase.from("quiz_submissions").insert({
    public_code: publicCode,
    age: answers.age,
    age_group: answers.ageGroup,
    branch: answers.branch,
    respondent_type: respondentType,
    respondent_name: answers.respondentName,
    subject_name_or_initials: answers.subjectNameOrInitials ?? null,
    phone: answers.phone,
    email: answers.email ?? null,
    city: answers.city,
    best_contact_time: answers.bestContactTime ?? "qualquer",
    answers: answers as unknown as Record<string, unknown>,
    additional_notes: answers.additionalNotes ?? null,
    source_interest: answers.sourceInterest ?? null,
    source_page: answers.sourcePage ?? null,
    result_key: outcome.resultKey,
    result_label: result.label,
    internal_scores: outcome.scores as unknown as Record<string, unknown>,
    consent_responsibility: true,
    consent_data_use: true,
    consent_disclaimer: true,
    consent_version: CONSENT_VERSION,
    consent_at: consentAt.toISOString(),
    email_status: "pending",
    status: "new",
    submission_token: input.submissionToken,
  });

  if (insertError) {
    return NextResponse.json(
      { success: false, error: "Não foi possível registrar a triagem agora." },
      { status: 500 },
    );
  }

  const whatsappUrl = createQuizWhatsappUrl(siteConfig.whatsapp, {
    respondentName: answers.respondentName!,
    publicCode,
    resultLabel: result.label,
  });

  // PDF + e-mail: falhas aqui não devem impedir a resposta de sucesso ao visitante.
  try {
    const pdfBuffer = await generateQuizPdf({
      publicCode,
      createdAt,
      resultKey: outcome.resultKey,
      answers,
      consentVersion: CONSENT_VERSION,
      consentAt,
    });

    const pdfPath = `${createdAt.getUTCFullYear()}/${String(createdAt.getUTCMonth() + 1).padStart(2, "0")}/${pdfFileNameForCode(publicCode)}`;

    await supabase.storage.from(QUIZ_PDF_BUCKET).upload(pdfPath, pdfBuffer, {
      contentType: "application/pdf",
      upsert: false,
    });

    await supabase
      .from("quiz_submissions")
      .update({ pdf_path: pdfPath })
      .eq("public_code", publicCode);

    if (isEmailConfigured()) {
      await sendQuizEmail({
        publicCode,
        createdAt,
        respondentName: answers.respondentName!,
        phone: answers.phone!,
        ageGroup: answers.ageGroup,
        resultKey: outcome.resultKey,
        bestContactTime: answers.bestContactTime ?? "qualquer",
        additionalNotes: answers.additionalNotes,
        pdfBuffer,
      });
      await supabase
        .from("quiz_submissions")
        .update({ email_status: "sent", email_sent_at: new Date().toISOString() })
        .eq("public_code", publicCode);
    } else {
      await supabase
        .from("quiz_submissions")
        .update({
          email_status: "failed",
          email_error: "Resend não configurado (.env incompleto).",
        })
        .eq("public_code", publicCode);
    }
  } catch (error) {
    await supabase
      .from("quiz_submissions")
      .update({
        email_status: "failed",
        email_error: error instanceof Error ? error.message.slice(0, 500) : "Erro desconhecido",
      })
      .eq("public_code", publicCode);
  }

  return NextResponse.json({
    success: true,
    publicCode,
    result,
    whatsappUrl,
  });
}
