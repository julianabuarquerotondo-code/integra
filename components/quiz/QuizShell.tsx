"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock3, ListChecks, FileCheck2, MessageCircle } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QuizProgress } from "./QuizProgress";
import { QuestionCard } from "./QuestionCard";
import { AgeQuestion } from "./AgeQuestion";
import { ContactStep, type ContactStepValues } from "./ContactStep";
import { ConsentStep, type ConsentValues } from "./ConsentStep";
import { ResultScreen, UnderFourResult } from "./ResultScreen";
import {
  branchAQuestions,
  branchBQuestions,
  branchCQuestions,
  ageBrackets,
  type QuestionDef,
} from "@/lib/quiz/questions";
import { normalizePhone } from "@/lib/utils/phone";
import { createQuizWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";
import { siteConfig } from "@/content/site";
import type { QuizAnswers, QuizBranch } from "@/lib/quiz/types";
import type { ResultCopy } from "@/lib/quiz/result-copy";

const STORAGE_KEY = "integra-quiz-progress";

type Step =
  | { type: "intro" }
  | { type: "age" }
  | { type: "question"; question: QuestionDef }
  | { type: "contact" }
  | { type: "consent" }
  | { type: "under_four" }
  | { type: "result" };

interface StoredState {
  answers: Partial<QuizAnswers>;
  stepIndex: number;
}

function branchQuestions(branch: QuizBranch | undefined): QuestionDef[] {
  if (branch === "A") return branchAQuestions;
  if (branch === "B") return branchBQuestions;
  if (branch === "C") return branchCQuestions;
  return [];
}

function loadStoredState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : null;
  } catch {
    return null;
  }
}

export function QuizShell({ sourceInterest }: { sourceInterest?: string }) {
  const stored = useMemo(() => loadStoredState(), []);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(
    stored?.answers ?? { sourceInterest, sourcePage: "/quiz" },
  );
  const [stepIndex, setStepIndex] = useState(stored?.stepIndex ?? 0);
  const [ageBracket, setAgeBracket] = useState<string | undefined>(
    () => ageBrackets.find((b) => b.ageGroup === stored?.answers?.ageGroup)?.value,
  );
  const [ageError, setAgeError] = useState<string | undefined>();
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof ContactStepValues, string>>>({});
  const [consentError, setConsentError] = useState<string | undefined>();
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "error">("idle");
  const [submissionResult, setSubmissionResult] = useState<{
    publicCode: string;
    result: ResultCopy;
    whatsappUrl: string;
    emailWarning?: boolean;
  } | null>(null);
  const [submissionToken] = useState(() => crypto.randomUUID());

  const branch = answers.branch;

  const steps: Step[] = useMemo(() => {
    const base: Step[] = [{ type: "intro" }, { type: "age" }];
    if (!branch) return base;
    if (branch === "under_four") return [...base, { type: "under_four" }];
    const questions = branchQuestions(branch).map((q) => ({ type: "question" as const, question: q }));
    return [...base, ...questions, { type: "contact" }, { type: "consent" }, { type: "result" }];
  }, [branch]);

  useEffect(() => {
    if (submitState === "idle" && !submissionResult) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, stepIndex }));
    }
  }, [answers, stepIndex, submitState, submissionResult]);

  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const answerableSteps = steps.filter((s) => s.type !== "intro" && s.type !== "result" && s.type !== "under_four");
  const currentAnswerableIndex = answerableSteps.indexOf(currentStep as never);

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function handleAgeSubmit() {
    const bracket = ageBrackets.find((b) => b.value === ageBracket);
    if (!bracket) {
      setAgeError("Selecione uma faixa etária para continuar.");
      return;
    }
    setAgeError(undefined);
    setAnswers((prev) => ({
      ...prev,
      age: bracket.representativeAge,
      ageGroup: bracket.ageGroup,
      branch: bracket.branch,
    }));
    setStepIndex((i) => i + 1);
  }

  function handleQuestionNext(question: QuestionDef) {
    const value = (answers as Record<string, unknown>)[question.id];
    const answered = question.type === "multi" ? Array.isArray(value) && value.length > 0 : Boolean(value);
    if (!question.optional && !answered) return;
    goNext();
  }

  const contactValues: ContactStepValues = {
    respondentName: answers.respondentName ?? "",
    subjectNameOrInitials: answers.subjectNameOrInitials ?? "",
    phone: answers.phone ?? "",
    email: answers.email ?? "",
    city: answers.city ?? "",
    bestContactTime: answers.bestContactTime ?? "",
    additionalNotes: answers.additionalNotes ?? "",
  };

  function handleContactNext() {
    const errors: Partial<Record<keyof ContactStepValues, string>> = {};
    if (!contactValues.respondentName.trim()) errors.respondentName = "Informe o nome.";
    if (normalizePhone(contactValues.phone).length < 12) errors.phone = "Informe um WhatsApp válido.";
    if (!contactValues.city.trim()) errors.city = "Informe a cidade.";
    if (!contactValues.bestContactTime) errors.bestContactTime = "Selecione um período.";
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;
    goNext();
  }

  const [consentValues, setConsentValues] = useState<ConsentValues>({
    consentResponsibility: false,
    consentDataUse: false,
    consentDisclaimer: false,
  });

  async function handleSubmit() {
    if (!consentValues.consentResponsibility || !consentValues.consentDataUse || !consentValues.consentDisclaimer) {
      setConsentError("É necessário aceitar todas as declarações para enviar.");
      return;
    }
    setConsentError(undefined);
    setSubmitState("submitting");

    const payload = {
      ...answers,
      phone: normalizePhone(contactValues.phone),
      email: contactValues.email || undefined,
      consentResponsibility: true,
      consentDataUse: true,
      consentDisclaimer: true,
      website: "",
      submissionToken,
    };

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error();

      setSubmissionResult({
        publicCode: json.publicCode,
        result: json.result,
        whatsappUrl: json.whatsappUrl,
      });
      window.sessionStorage.removeItem(STORAGE_KEY);
      setSubmitState("idle");
    } catch {
      setSubmitState("error");
    }
  }

  if (submissionResult) {
    return (
      <Container className="py-16">
        <ResultScreen {...submissionResult} />
      </Container>
    );
  }

  if (currentStep.type === "intro") {
    return <IntroStep onStart={() => setStepIndex(1)} />;
  }

  if (currentStep.type === "under_four") {
    const whatsappUrl = createQuizWhatsappUrl(siteConfig.whatsapp, {
      respondentName: "responsável",
      publicCode: "N/A",
      resultLabel: "Conversa direta com o Instituto",
    });
    return (
      <Container className="py-16">
        <p className="mx-auto mb-6 max-w-xl rounded-2xl bg-soft-lilac p-4 text-center text-sm text-text-secondary">
          Para essa faixa etária, o melhor caminho é conversar diretamente com o Instituto para
          verificar quais atendimentos estão disponíveis.
        </p>
        <UnderFourResult whatsappUrl={whatsappUrl} />
        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={goBack}>
            Voltar
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <QuizProgress current={currentAnswerableIndex + 1} total={answerableSteps.length} />

        {currentStep.type === "age" ? (
          <AgeQuestion value={ageBracket} onChange={setAgeBracket} error={ageError} />
        ) : null}

        {currentStep.type === "question" ? (
          <QuestionCard
            question={currentStep.question}
            value={(answers as Record<string, unknown>)[currentStep.question.id] as string | string[] | undefined}
            onChange={(value) =>
              setAnswers((prev) => ({ ...prev, [currentStep.question.id]: value }))
            }
          />
        ) : null}

        {currentStep.type === "contact" ? (
          <ContactStep
            values={contactValues}
            errors={contactErrors}
            onChange={(values) =>
              setAnswers((prev) => ({
                ...prev,
                ...values,
                bestContactTime: values.bestContactTime || undefined,
              }))
            }
          />
        ) : null}

        {currentStep.type === "consent" ? (
          <ConsentStep
            isMinor={answers.branch === "A"}
            values={consentValues}
            onChange={setConsentValues}
            error={consentError}
          />
        ) : null}

        {submitState === "error" ? (
          <div className="mt-6 rounded-2xl bg-soft-lilac p-4 text-sm text-text-primary" role="alert">
            <p>
              Não foi possível concluir o envio agora. Suas respostas continuam nesta tela. Tente
              novamente em alguns instantes.
            </p>
            <ButtonLink
              href={createQuizWhatsappUrl(siteConfig.whatsapp, {
                respondentName: contactValues.respondentName || "Visitante",
                publicCode: "N/A",
                resultLabel: "Conversa inicial",
              })}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-3"
            >
              Falar pelo WhatsApp sem enviar o questionário
            </ButtonLink>
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
            <ArrowLeft className="size-4" aria-hidden />
            Voltar
          </Button>

          {currentStep.type === "age" ? (
            <Button onClick={handleAgeSubmit}>
              Continuar
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          ) : currentStep.type === "question" ? (
            <Button onClick={() => handleQuestionNext(currentStep.question)}>
              Continuar
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          ) : currentStep.type === "contact" ? (
            <Button onClick={handleContactNext}>
              Continuar
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          ) : currentStep.type === "consent" ? (
            <Button onClick={handleSubmit} disabled={submitState === "submitting"}>
              {submitState === "submitting" ? "Enviando..." : "Enviar triagem"}
            </Button>
          ) : null}
        </div>
      </div>
    </Container>
  );
}

const introHighlights = [
  { icon: Clock3, label: "Cerca de 3 minutos" },
  { icon: ListChecks, label: "Uma pergunta por tela, dá para voltar" },
  { icon: FileCheck2, label: "Respostas organizadas em um resumo" },
  { icon: MessageCircle, label: "WhatsApp já aberto com o código" },
];

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <Container className="mesh-bg py-12 sm:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green">Triagem rápida</p>
          <h1 className="mt-2 text-2xl font-semibold text-balance text-purple-dark sm:text-3xl">
            Descubra qual serviço melhor atende você
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-text-secondary">
            Responda sobre você ou sobre a pessoa para quem está buscando atendimento. As
            perguntas se adaptam à idade e ajudam o Instituto a compreender a demanda inicial.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {introHighlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-2xl border border-border bg-white/70 px-3.5 py-3 text-sm text-text-secondary backdrop-blur"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-soft-lilac">
                  <Icon className="size-4 text-purple-primary" aria-hidden strokeWidth={1.75} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-md text-xs text-text-secondary">
            Esta triagem possui caráter exclusivamente informativo e de acolhimento inicial. Ela
            não constitui diagnóstico, avaliação profissional, laudo, parecer técnico ou indicação
            definitiva de tratamento.
          </p>

          <Button size="lg" className="mt-8" onClick={onStart}>
            Começar triagem
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -top-4 -right-4 -z-10 h-24 w-24 rounded-3xl bg-soft-green" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-xl shadow-purple-dark/10 ring-1 ring-border">
            <Image
              src="/photos/quiz.png"
              alt="Pessoa respondendo à triagem pelo celular em um momento tranquilo"
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
