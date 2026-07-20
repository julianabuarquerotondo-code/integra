import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { services, complementaryServices, carePathway } from "@/content/services";

export const metadata: Metadata = {
  title: "Neurofeedback, Neuromodulação e Avaliação Psicopedagógica",
  description:
    "Avaliação Integrada da Neuroaprendizagem, Intervenção em Neuroaprendizagem, Neurofeedback e Programa de Neuromodulação em São Paulo, com Vanessa Rotondo.",
};

export default function ServicosPage() {
  return (
    <>
      <Section background="white">
        <SectionHeading
          eyebrow="Serviços"
          title="Um plano para cada fase da vida"
          description="Sem protocolo genérico. Se tiver dúvidas, a triagem rápida ajuda a organizar o primeiro contato."
          align="center"
        />
        <div className="flex justify-center">
          <QuizCta size="lg" />
        </div>
      </Section>

      {services.map((service, index) => (
        <Section key={service.key} background={index % 2 === 0 ? "cream" : "white"}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-green">
                {service.audience}
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-purple-dark">{service.name}</h2>
              <p className="mt-4 text-text-secondary">{service.intro}</p>

              <h3 className="mt-6 text-sm font-semibold text-purple-dark">
                Áreas que podem ser observadas
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.covers.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-soft-lilac px-3 py-1 text-xs font-medium text-purple-dark"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {service.process ? (
                <>
                  <h3 className="mt-6 text-sm font-semibold text-purple-dark">Como funciona</h3>
                  <ol className="mt-3 space-y-1 text-sm text-text-secondary">
                    {service.process.map((step, i) => (
                      <li key={step}>
                        {i + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-3 rounded-3xl border border-border bg-white p-6">
              <p className="text-sm text-text-secondary">
                Ainda não sabe se este é o serviço certo?
              </p>
              <QuizCta label={service.quizCta} interest={service.quizInterest} className="w-full justify-center" />
            </div>
          </div>
        </Section>
      ))}

      <Section background="cream">
        <SectionHeading title="Serviços complementares" align="center" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {complementaryServices.map((item) => (
            <li key={item} className="rounded-2xl bg-white p-4 text-sm text-text-secondary">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section background="white">
        <SectionHeading title="Como funciona o acompanhamento" align="center" />
        <ol className="mx-auto grid max-w-3xl gap-3 text-sm text-text-secondary">
          {carePathway.map((step, i) => (
            <li key={step} className="flex items-center gap-3 rounded-2xl border border-border p-4">
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
