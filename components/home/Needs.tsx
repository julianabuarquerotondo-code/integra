import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { perceivedNeeds } from "@/content/site";

export function Needs() {
  return (
    <Section background="cream">
      <SectionHeading title="Talvez você esteja percebendo" align="center" />
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
        {perceivedNeeds.map((need, index) => (
          <Reveal key={need} delay={index * 40} className="inline-block">
            <span className="inline-block rounded-full border border-border bg-white px-4 py-2.5 text-sm text-text-secondary transition-all hover:-translate-y-0.5 hover:border-purple-primary/40 hover:text-purple-dark hover:shadow-sm">
              {need}
            </span>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <QuizCta />
      </div>
    </Section>
  );
}
