import type { QuizAnswers } from "@/lib/quiz/types";
import {
  ageQuestion,
  ageGroupLabel,
  branchAQuestions,
  branchBQuestions,
  branchCQuestions,
  bestContactTimeOptions,
  type QuestionDef,
} from "@/lib/quiz/questions";
import type { QuizAnswerLabel } from "./QuizPdfDocument";

function labelFor(options: QuestionDef["options"], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function formatAnswer(question: QuestionDef, raw: unknown): string | null {
  if (raw === undefined || raw === null || raw === "") return null;
  if (Array.isArray(raw)) {
    if (raw.length === 0) return null;
    return raw.map((v) => labelFor(question.options, String(v))).join(", ");
  }
  return labelFor(question.options, String(raw));
}

/**
 * Converte as respostas brutas do quiz em pares pergunta/resposta legíveis para o PDF,
 * usando apenas o branch correspondente à idade informada.
 */
export function formatAnswersForPdf(answers: QuizAnswers): QuizAnswerLabel[] {
  const labels: QuizAnswerLabel[] = [
    { question: ageQuestion.question, answer: ageGroupLabel(answers.ageGroup) },
  ];

  const branchQuestions =
    answers.branch === "A"
      ? branchAQuestions
      : answers.branch === "B"
        ? branchBQuestions
        : answers.branch === "C"
          ? branchCQuestions
          : [];

  for (const question of branchQuestions) {
    const raw = (answers as unknown as Record<string, unknown>)[question.id];
    const formatted = formatAnswer(question, raw);
    if (formatted) {
      labels.push({ question: question.question, answer: formatted });
    }
  }

  if (answers.bestContactTime) {
    labels.push({
      question: "Melhor período para contato",
      answer: labelFor(bestContactTimeOptions, answers.bestContactTime),
    });
  }

  return labels;
}
