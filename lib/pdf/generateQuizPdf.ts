import "server-only";
import { renderToBuffer } from "@react-pdf/renderer";
import { QuizPdfDocument } from "./QuizPdfDocument";
import { formatAnswersForPdf } from "./formatAnswers";
import type { QuizAnswers, QuizResultKey } from "@/lib/quiz/types";

export interface GenerateQuizPdfParams {
  publicCode: string;
  createdAt: Date;
  resultKey: QuizResultKey;
  answers: QuizAnswers;
  consentVersion: string;
  consentAt: Date;
}

export function pdfFileNameForCode(publicCode: string): string {
  return `triagem-integra-${publicCode}.pdf`;
}

export async function generateQuizPdf(params: GenerateQuizPdfParams): Promise<Buffer> {
  const answerLabels = formatAnswersForPdf(params.answers);
  const doc = QuizPdfDocument({ ...params, answerLabels });
  return renderToBuffer(doc);
}
