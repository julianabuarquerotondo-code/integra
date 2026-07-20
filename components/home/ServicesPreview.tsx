import Link from "next/link";
import { ArrowRight, ClipboardCheck, BrainCircuit, Waves, Sparkle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

const icons = [ClipboardCheck, BrainCircuit, Waves, Sparkle];
const badgeBg = ["bg-soft-lilac text-purple-primary", "bg-soft-blue text-blue", "bg-soft-green text-green", "bg-[#FBF0DE] text-gold"];

export function ServicesPreview() {
  return (
    <Section background="white">
      <SectionHeading
        eyebrow="Serviços"
        title="Como podemos ajudar"
        description="Avaliação e intervenção em neuroaprendizagem, Neurofeedback e Neuromodulação — cada serviço com um objetivo claro."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={service.key} delay={index * 80}>
              <div className="group flex h-full flex-col rounded-3xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-lg hover:shadow-purple-primary/5">
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-2xl ${badgeBg[index % badgeBg.length]}`}
                >
                  <Icon className="size-6" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-purple-dark">{service.name}</h3>
                <p className="mt-1 text-xs text-text-secondary">{service.audience}</p>
                <p className="mt-3 flex-1 text-sm text-text-secondary">{service.shortDescription}</p>
                <Link
                  href="/servicos"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-dark transition-transform group-hover:gap-2 hover:underline"
                >
                  Ver detalhes <ArrowRight className="size-3.5" aria-hidden />
                </Link>
                <QuizCta
                  label={service.quizCta}
                  interest={service.quizInterest}
                  variant="outline"
                  size="md"
                  className="mt-3 w-full justify-center text-sm"
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
