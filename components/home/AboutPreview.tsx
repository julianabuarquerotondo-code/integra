import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/content/site";

export function AboutPreview() {
  return (
    <Section background="white">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative mx-auto aspect-square w-full max-w-sm">
          <Image
            src="/illustrations/about.svg"
            alt="Ilustração representando escuta e acolhimento"
            fill
            className="object-contain"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="text-sm font-semibold uppercase tracking-wide text-green">Quem cuida</p>
          <h2 className="mt-2 text-2xl font-semibold text-purple-dark sm:text-3xl">
            {siteConfig.professionalName}
          </h2>
          <p className="mt-1 text-sm font-medium text-text-secondary">
            {siteConfig.professionalTitle}
          </p>
          <p className="mt-4 text-text-secondary">{siteConfig.personalMessage}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/quem-somos" variant="secondary">
              Conheça o Instituto
            </ButtonLink>
            <QuizCta label="Faça a triagem" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
