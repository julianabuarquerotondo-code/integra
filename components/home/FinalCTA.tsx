import { Section } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Reveal } from "@/components/ui/Reveal";
import { ctaCopy } from "@/content/site";

export function FinalCTA() {
  return (
    <Section background="white">
      <Reveal>
        <div className="mesh-bg overflow-hidden rounded-[28px] bg-soft-lilac p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold text-purple-dark sm:text-3xl">Vamos conversar?</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Você não precisa chegar com todas as respostas. O Instituto Integra+ ajuda a encontrar
            o próximo passo.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <QuizCta size="lg" />
            <ButtonLink href="/contato" variant="secondary" size="lg">
              {ctaCopy.direct}
            </ButtonLink>
            <WhatsappCta size="lg" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
