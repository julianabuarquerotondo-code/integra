import { Baby, User, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { audiences } from "@/content/site";

const icons = [Baby, User, Users];

export function Audiences() {
  return (
    <Section background="cream">
      <SectionHeading title="Para cada fase da vida" align="center" />
      <div className="grid gap-5 sm:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={audience.title} delay={index * 80}>
              <div className="rounded-3xl bg-white p-6 text-center transition-shadow duration-300 hover:shadow-md">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-soft-lilac">
                  <Icon className="size-6 text-purple-primary" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-3 text-base font-semibold text-purple-dark">{audience.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{audience.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <QuizCta label="Veja o que combina com você" />
      </div>
    </Section>
  );
}
