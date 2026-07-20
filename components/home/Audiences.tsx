import Image from "next/image";
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
const photos = [
  { src: "/photos/children.png", alt: "Criança em atividade de aprendizagem" },
  { src: "/photos/adults.png", alt: "Adulto concentrado durante o estudo" },
  { src: "/photos/elderly.png", alt: "Pessoa idosa em estimulação cognitiva" },
];

export function Audiences() {
  return (
    <Section background="cream">
      <SectionHeading title="Para cada fase da vida" align="center" />
      <div className="grid gap-6 sm:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = icons[index];
          const photo = photos[index];
          return (
            <Reveal key={audience.title} delay={index * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-lg hover:shadow-purple-primary/5">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 20rem, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-2xl shadow-sm ${iconStyles[index % iconStyles.length]}`}>
                    <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-purple-dark">{audience.title}</h3>
                  <p className="mt-2 text-sm text-pretty text-text-secondary">{audience.description}</p>
                </div>
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
