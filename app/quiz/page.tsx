import type { Metadata } from "next";
import { QuizShell } from "@/components/quiz/QuizShell";

export const metadata: Metadata = {
  title: "Descubra por onde começar",
  description:
    "Responda a uma triagem rápida sobre você ou sobre a pessoa para quem está buscando atendimento.",
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ interesse?: string }>;
}) {
  const { interesse } = await searchParams;
  return <QuizShell sourceInterest={interesse} />;
}
