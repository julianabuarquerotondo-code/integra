import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { ctaCopy } from "@/content/site";

export function QuizBanner() {
  return (
    <Section background="white">
      <Reveal>
        <div className="mesh-bg grid items-center gap-8 overflow-hidden rounded-[28px] bg-soft-lilac p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:text-left">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-purple-dark sm:text-3xl">
              Não sabe por onde começar?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-text-secondary lg:mx-0">
              Uma triagem rápida ajuda a organizar suas respostas e gerar um código para continuar
              a conversa pelo WhatsApp.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start">
              <QuizCta size="lg" />
            </div>
            <p className="mt-3 text-xs text-text-secondary">{ctaCopy.quizDisclaimer}</p>
          </div>
          <div className="relative mx-auto hidden size-36 shrink-0 sm:block animate-float">
            <Image
              src="/illustrations/quiz.svg"
              alt="Ilustração de uma conversa de triagem"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
