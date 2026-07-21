import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig, aboutHistory, missionVisionValues, credentialBadges } from "@/content/site";

const badgeIcons = { award: Award, heart: Heart, users: Users } as const;

export const metadata: Metadata = {
  title: "Vanessa Rotondo, Psicopedagoga em São Paulo",
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
          <div className="relative mx-auto w-full max-w-xs lg:col-span-1">
            <div className="absolute -top-4 -left-4 -z-10 h-24 w-24 rounded-3xl bg-soft-green" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-purple-dark/10 ring-1 ring-border">
              <Image
                src="/photos/portrait.png"
                alt={`Retrato de ${siteConfig.professionalName}`}
                fill
                sizes="(min-width: 1024px) 20rem, 80vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-purple-dark">{siteConfig.professionalName}</h2>
            <p className="mt-1 text-sm font-medium text-text-secondary">{siteConfig.professionalTitle}</p>
            <p className="mt-4 text-text-secondary">{siteConfig.experienceSummary}</p>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:max-w-md">
              {credentialBadges.map((badge) => {
                const Icon = badgeIcons[badge.icon];
                return (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-soft-lilac px-3 py-4 text-center"
                  >
                    <Icon className="size-6 text-purple-primary" aria-hidden strokeWidth={1.75} />
                    <span className="text-xs font-medium text-text-primary">{badge.label}</span>
                  </div>
                );
              })}
            </div>

            <blockquote className="mt-5 border-l-2 border-green pl-4 text-sm italic text-text-secondary">
              &ldquo;{siteConfig.professionalQuote}&rdquo;
              <footer className="mt-1 not-italic font-medium text-purple-dark">
                {siteConfig.professionalName}
              </footer>
            </blockquote>

            <a
              href={siteConfig.professionalInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-dark hover:underline"
            >
              <InstagramIcon className="size-4" />
              Instagram da Vanessa
            </a>
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
        <SectionHeading title="Espaço" align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Recepção", src: "/photos/space-reception.png" },
            { label: "Sala de atendimento", src: "/photos/space-room.png" },
            { label: "Área de Neurofeedback", src: "/photos/space-neuro.png" },
          ].map((item) => (
            <figure
              key={item.label}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-border"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-dark/70 to-transparent p-4">
                <figcaption className="text-sm font-medium text-white">{item.label}</figcaption>
              </div>
            </figure>
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
