import type { Metadata } from "next";
import { MapPin, Clock, Mail, Phone, AtSign } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { QuizCta } from "@/components/ui/QuizCta";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/content/site";
import { createWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";

export const metadata: Metadata = {
  title: "Contato — Agende uma avaliação em São Paulo",
  description:
    "Fale com o Instituto Integra+ pelo WhatsApp, agende uma avaliação ou responda à triagem inicial. Atendimento em Santa Terezinha, São Paulo.",
};

export default function ContatoPage() {
  return (
    <>
      <Section background="cream">
        <SectionHeading eyebrow="Contato" title="Vamos conversar?" align="center" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-purple-dark">Já sabe qual atendimento procura?</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Fale diretamente com o Instituto para agendar uma avaliação.
            </p>
            <ButtonLink
              href={createWhatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessages.scheduleEvaluation)}
              className="mt-4 w-full justify-center"
            >
              Agende uma avaliação
            </ButtonLink>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-purple-dark">Ainda tem dúvidas?</h3>
            <p className="mt-2 text-sm text-text-secondary">
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
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" aria-hidden /> {siteConfig.whatsappDisplay}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden /> {siteConfig.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" aria-hidden /> {siteConfig.address}, {siteConfig.city}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0" aria-hidden /> {siteConfig.openingHours}
              </li>
              {siteConfig.instagramUrl ? (
                <li className="flex items-center gap-2">
                  <AtSign className="size-4 shrink-0" aria-hidden />
                  <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
            {siteConfig.googleMapsUrl ? (
              <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-border">
                <iframe
                  src={siteConfig.googleMapsUrl}
                  title="Localização do Instituto Integra+"
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mt-6 flex aspect-video items-center justify-center rounded-2xl bg-soft-lilac text-sm text-text-secondary">
                Mapa em breve
              </div>
            )}
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
