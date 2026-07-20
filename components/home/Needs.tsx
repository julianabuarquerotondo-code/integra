import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { perceivedNeeds } from "@/content/site";

export function Needs() {
  return (
    <Section background="cream">
      <SectionHeading title="Talvez você esteja percebendo" align="center" />
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
        {perceivedNeeds.map((need, index) => (
          <Reveal key={need} delay={index * 40} className="inline-block">
            <span className="inline-block rounded-full border border-border bg-white px-4 py-2 text-sm text-text-secondary transition-colors hover:border-purple-primary/30">
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
