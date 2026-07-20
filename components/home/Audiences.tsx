import { Baby, User, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuizCta } from "@/components/ui/QuizCta";
import { Reveal } from "@/components/ui/Reveal";
import { audiences } from "@/content/site";

const icons = [Baby, User, Users];
const iconStyles = [
  "bg-soft-lilac text-purple-primary",
  "bg-soft-blue text-blue",
  "bg-soft-green text-green",
];

export function Audiences() {
  return (
    <Section background="cream">
      <SectionHeading title="Para cada fase da vida" align="center" />
      <div className="grid gap-5 sm:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={audience.title} delay={index * 80}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-lg hover:shadow-purple-primary/5">
                <span className={`flex size-14 items-center justify-center rounded-2xl ${iconStyles[index % iconStyles.length]}`}>
                  <Icon className="size-7" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-purple-dark">{audience.title}</h3>
                <p className="mt-2 text-sm text-pretty text-text-secondary">{audience.description}</p>
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
