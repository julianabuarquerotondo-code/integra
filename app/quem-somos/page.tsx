import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig, aboutHistory, missionVisionValues } from "@/content/site";

export const metadata: Metadata = {
  title: "Vanessa Rotondo — Psicopedagoga em São Paulo",
  description:
    "Conheça o Instituto Integra+ e Vanessa Rotondo, psicopedagoga especializada em Neuromodulação e Neuroaprendizagem em São Paulo.",
};

export default function QuemSomosPage() {
  return (
    <>
      <Section background="white">
        <SectionHeading eyebrow="Quem somos" title="Conhecimento e cuidado individualizado" align="center" />
      </Section>

      <Section background="cream">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl lg:col-span-1">
            <Image src="/illustrations/portrait-placeholder.svg" alt="" fill className="object-cover" />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-purple-dark">{siteConfig.professionalName}</h2>
            <p className="mt-1 text-sm font-medium text-text-secondary">{siteConfig.professionalTitle}</p>
            <p className="mt-4 text-text-secondary">{siteConfig.personalMessage}</p>
            <p className="mt-2 text-sm text-text-secondary">{siteConfig.experienceSummary}</p>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="mx-auto max-w-2xl space-y-4 text-center text-text-secondary">
          {aboutHistory.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section background="cream">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-green">Missão</h3>
            <p className="mt-3 text-sm text-text-secondary">{missionVisionValues.mission}</p>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-green">Visão</h3>
            <p className="mt-3 text-sm text-text-secondary">{missionVisionValues.vision}</p>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-green">Valores</h3>
            <p className="mt-3 text-sm text-text-secondary">{missionVisionValues.values.join(" · ")}</p>
          </div>
        </div>
      </Section>

      <Section background="white">
        <SectionHeading title="Espaço" align="center" description="Fotos reais em breve." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Ambiente", "Sala de atendimento", "Área de Neurofeedback"].map((label) => (
            <div
              key={label}
              className="flex aspect-4/3 items-center justify-center rounded-3xl bg-soft-lilac text-sm font-medium text-text-secondary"
            >
              {label}
            </div>
          ))}
        </div>
      </Section>

      <Section background="cream">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <QuizCta label="Fazer a triagem" size="lg" />
            <ButtonLink href="/contato" variant="secondary" size="lg">
              Agendar uma avaliação
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
