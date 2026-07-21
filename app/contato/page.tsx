import type { Metadata } from "next";
import { MapPin, Clock, Phone, MessageCircle, ClipboardCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { QuizCta } from "@/components/ui/QuizCta";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { siteConfig } from "@/content/site";
import { createWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";

export const metadata: Metadata = {
  title: "Agende uma avaliação em São Paulo",
  description:
    "Fale com o Instituto Integra+ pelo WhatsApp, agende uma avaliação ou responda à triagem inicial. Atendimento em Santa Terezinha, São Paulo.",
};

export default function ContatoPage() {
  return (
    <>
      <Section background="cream">
        <SectionHeading eyebrow="Contato" title="Vamos conversar?" align="center" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-soft-green">
              <MessageCircle className="size-6 text-green" aria-hidden strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-purple-dark">Já sabe qual atendimento procura?</h3>
            <p className="mt-2 flex-1 text-sm text-text-secondary">
              Fale diretamente com o Instituto para agendar uma avaliação.
            </p>
            <ButtonLink
              href={createWhatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessages.scheduleEvaluation)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              className="mt-4 w-full justify-center"
            >
              <WhatsappIcon className="size-4" />
              Fale no WhatsApp
            </ButtonLink>
          </div>
          <div className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-soft-lilac">
              <ClipboardCheck className="size-6 text-purple-primary" aria-hidden strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-purple-dark">Ainda tem dúvidas?</h3>
            <p className="mt-2 flex-1 text-sm text-text-secondary">
              Responda à triagem rápida e organize as informações para o primeiro contato.
            </p>
            <QuizCta className="mt-4 w-full justify-center" />
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-purple-dark">Informações de contato</h2>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li className="flex items-center gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-lilac">
                  <Phone className="size-4 text-purple-primary" aria-hidden />
                </span>
                <a
                  href={createWhatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessages.scheduleEvaluation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-lilac">
                  <MapPin className="size-4 text-purple-primary" aria-hidden />
                </span>
                {siteConfig.address}, {siteConfig.city}
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-lilac">
                  <Clock className="size-4 text-purple-primary" aria-hidden />
                </span>
                {siteConfig.openingHours}
              </li>
              {siteConfig.instagramUrl ? (
                <li className="flex items-center gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-lilac">
                    <InstagramIcon className="size-4 text-purple-primary" />
                  </span>
                  <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-dark">Envie uma mensagem</h2>
            <p className="mt-2 text-sm text-text-secondary">
              O formulário abaixo é simples e não solicita detalhes clínicos.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
