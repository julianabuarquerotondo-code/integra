import Image from "next/image";
import { ShieldCheck, HeartHandshake, Users2 } from "lucide-react";
import { QuizCta } from "@/components/ui/QuizCta";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ctaCopy, siteConfig } from "@/content/site";

const trustBadges = [
  { icon: HeartHandshake, label: "Atendimento individualizado" },
  { icon: ShieldCheck, label: "Base científica" },
  { icon: Users2, label: "Crianças a idosos" },
];

export function Hero() {
  return (
    <section className="mesh-bg relative overflow-hidden bg-white">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-green">
            Instituto Integra+ · {siteConfig.city}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-purple-dark sm:text-4xl lg:text-[2.85rem] lg:leading-[1.15]">
            Psicopedagogia, Neuroaprendizagem e Neuromodulação
          </h1>
          <p className="mt-5 max-w-md text-base text-text-secondary sm:text-lg">
            O primeiro passo para compreender dificuldades de aprendizagem, atenção e memória —
            com um plano pensado para crianças, adultos e idosos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuizCta size="lg" />
            <ButtonLink href="/contato" variant="secondary" size="lg">
              {ctaCopy.direct}
            </ButtonLink>
          </div>

          <p className="mt-4 text-sm text-text-secondary">
            Triagem de {ctaCopy.quizDuration} {ctaCopy.quizAgeNote}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-text-secondary">
                <Icon className="size-4 text-purple-primary" aria-hidden strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto aspect-square w-full max-w-md animate-float">
          <Image
            src="/illustrations/hero.svg"
            alt="Ilustração representando conexão entre pessoas e desenvolvimento"
            fill
            priority
            className="object-contain"
          />
        </Reveal>
      </Container>
    </section>
  );
}
