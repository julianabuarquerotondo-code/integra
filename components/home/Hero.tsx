import Image from "next/image";
import { ShieldCheck, HeartHandshake, Users2 } from "lucide-react";
import { QuizCta } from "@/components/ui/QuizCta";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ctaCopy, siteConfig } from "@/content/site";
import { createWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";

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
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-green backdrop-blur">
            <span className="size-1.5 rounded-full bg-green" aria-hidden />
            Instituto Integra+ · {siteConfig.city}
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-balance text-purple-dark sm:text-4xl lg:text-[2.95rem] lg:leading-[1.12]">
            Psicopedagogia, Neuroaprendizagem e Neuromodulação
          </h1>
          <p className="mt-5 max-w-md text-base text-pretty text-text-secondary sm:text-lg sm:leading-relaxed">
            O primeiro passo para compreender dificuldades de aprendizagem, atenção e memória, com
            um plano pensado para crianças, adultos e idosos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuizCta size="lg" />
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
          </div>

          <p className="mt-4 text-sm text-text-secondary">Triagem de {ctaCopy.quizDuration}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustBadges.map(({ icon: Icon, label }) => (
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
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="absolute -top-4 -right-4 -bottom-4 -left-4 -z-10 rounded-[2rem] bg-soft-lilac lg:-top-6 lg:-right-6" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-xl shadow-purple-dark/10 ring-1 ring-border">
            <Image
              src="/photos/hero.png"
              alt="Espaço de atendimento acolhedor do Instituto Integra+"
              fill
              priority
              quality={90}
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-white/90 px-4 py-3 shadow-lg shadow-purple-dark/10 backdrop-blur sm:-left-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft-green">
              <HeartHandshake className="size-5 text-green" aria-hidden strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-purple-dark">Escuta próxima</p>
              <p className="text-xs text-text-secondary">Plano individualizado</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
