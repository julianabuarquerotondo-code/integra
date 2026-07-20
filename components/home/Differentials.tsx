import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { differentials } from "@/content/site";

export function Differentials() {
  return (
    <Section background="cream">
      <SectionHeading title="Nossos diferenciais" align="center" />
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
        {differentials.map((item, index) => (
          <Reveal key={item} delay={index * 60} className="inline-block">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-text-secondary">
              <Check className="size-4 text-green" aria-hidden strokeWidth={2} />
              {item}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
