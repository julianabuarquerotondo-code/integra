import "server-only";
import { Resend } from "resend";
import type { AgeGroup, QuizResultKey } from "@/lib/quiz/types";
import { resultCopy } from "@/lib/quiz/result-copy";
import { ageGroupLabel } from "@/lib/quiz/questions";
import { formatDateTimeBR } from "@/lib/utils/date";
import { pdfFileNameForCode } from "@/lib/pdf/generateQuizPdf";

export interface SendQuizEmailParams {
  publicCode: string;
  createdAt: Date;
  respondentName: string;
  phone: string;
  ageGroup: AgeGroup;
  resultKey: QuizResultKey;
  bestContactTime: string;
  additionalNotes?: string;
  pdfBuffer: Buffer;
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.INSTITUTE_EMAIL,
  );
}

export async function sendQuizEmail(params: SendQuizEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.INSTITUTE_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error(
      "Resend não está configurado. Defina RESEND_API_KEY, RESEND_FROM_EMAIL e INSTITUTE_EMAIL.",
    );
  }

  const resend = new Resend(apiKey);
  const result = resultCopy[params.resultKey];

  const subject = `Nova triagem ${params.publicCode}: ${params.respondentName}, ${ageGroupLabel(params.ageGroup)}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2F2932;">
      <h2 style="color:#75507F;">Nova triagem recebida</h2>
      <p><strong>Código:</strong> ${params.publicCode}</p>
      <p><strong>Data:</strong> ${formatDateTimeBR(params.createdAt)}</p>
      <p><strong>Nome de quem respondeu:</strong> ${params.respondentName}</p>
      <p><strong>WhatsApp:</strong> ${params.phone}</p>
      <p><strong>Faixa etária:</strong> ${ageGroupLabel(params.ageGroup)}</p>
      <p><strong>Resultado inicial:</strong> ${result.label}</p>
      <p><strong>Melhor período para contato:</strong> ${params.bestContactTime}</p>
      ${params.additionalNotes ? `<p><strong>Relato complementar:</strong> ${params.additionalNotes}</p>` : ""}
      <p style="color:#655E68; font-size: 12px;">O resumo completo das respostas está no PDF em anexo.</p>
    </div>
  `;

  await resend.emails.send({
    from,
    to,
    subject,
    html,
    attachments: [
      {
        filename: pdfFileNameForCode(params.publicCode),
        content: params.pdfBuffer,
      },
    ],
  });
}
