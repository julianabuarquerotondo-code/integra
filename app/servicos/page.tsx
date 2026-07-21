import type { Metadata } from "next";
import Image from "next/image";
import { Users, GraduationCap, FileText, ClipboardCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { cn } from "@/lib/utils/cn";
import { services, complementaryServices, carePathway } from "@/content/services";

const complementaryIcons = [Users, GraduationCap, FileText, ClipboardCheck];

export const metadata: Metadata = {
  title: "Neurofeedback, Neuromodulação e Avaliação Psicopedagógica",
  description:
    "Avaliação Integrada da Neuroaprendizagem, Intervenção em Neuroaprendizagem, Neurofeedback e Programa de Neuromodulação em São Paulo, com Vanessa Rotondo.",
};

export default function ServicosPage() {
  return (
    <>
      <Section background="white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green">Serviços</p>
            <h1 className="text-3xl font-semibold text-balance text-purple-dark sm:text-4xl">
              Um plano para cada fase da vida
            </h1>
            <span className="mt-4 block h-1 w-12 rounded-full bg-purple-primary/70" aria-hidden />
            <p className="mt-5 max-w-md text-pretty text-text-secondary sm:leading-relaxed">
              Sem protocolo genérico. Se tiver dúvidas, a triagem rápida ajuda a organizar o
              primeiro contato.
            </p>
            <div className="mt-8">
              <QuizCta size="lg" />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute -top-4 -right-4 -bottom-4 -left-4 -z-10 rounded-[2rem] bg-soft-lilac" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-xl shadow-purple-dark/10 ring-1 ring-border">
              <Image
                src="/photos/services-hero.png"
                alt="Sessão de neurofeedback no Instituto Integra+"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <Section key={service.key} background={index % 2 === 0 ? "cream" : "white"}>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className={cn("relative mx-auto w-full max-w-md", reversed && "lg:order-2")}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-lg shadow-purple-dark/10 ring-1 ring-border">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 28rem, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={cn(reversed && "lg:order-1")}>
                <p className="text-xs font-semibold uppercase tracking-wide text-green">
                  {service.audience}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-purple-dark">{service.name}</h2>
                <p className="mt-4 text-text-secondary">{service.intro}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {service.covers.slice(0, 5).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-purple-dark ring-1 ring-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <QuizCta label={service.quizCta} interest={service.quizInterest} className="mt-6" />
              </div>
            </div>
          </Section>
        );
      })}

      <Section background="cream">
        <SectionHeading title="Serviços complementares" align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {complementaryServices.map((item, index) => {
            const Icon = complementaryIcons[index % complementaryIcons.length];
            return (
              <div
                key={item}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center transition-colors hover:border-purple-primary/30"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-soft-lilac">
                  <Icon className="size-5 text-purple-primary" aria-hidden strokeWidth={1.75} />
                </span>
                <p className="text-sm text-text-secondary">{item}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section background="white">
        <SectionHeading title="Como funciona o acompanhamento" align="center" />
        <ol className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {carePathway.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm text-text-secondary"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-soft-lilac text-xs font-semibold text-purple-dark">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section background="cream">
        <div className="rounded-[28px] bg-soft-lilac p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold text-purple-dark sm:text-3xl">
            Ainda não sabe qual serviço procurar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Responda à triagem inicial e organize o primeiro contato.
          </p>
          <div className="mt-6 flex justify-center">
            <QuizCta size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}
