import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { siteConfig } from "@/content/site";
import { createWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";

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
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={createWhatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessages.scheduleEvaluation)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <WhatsappIcon className="size-4" />
              Fale conosco
            </ButtonLink>
            <ButtonLink href="/quiz" size="lg">
              Triagem Online
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
