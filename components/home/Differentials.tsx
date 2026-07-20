import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { differentials } from "@/content/site";

export function Differentials() {
  return (
    <Section background="cream">
      <SectionHeading title="Nossos diferenciais" align="center" />
      <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {differentials.map((item, index) => (
          <Reveal key={item} delay={index * 60}>
            <span className="flex h-full items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-text-primary transition-colors hover:border-green/40">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-soft-green">
                <Check className="size-4 text-green" aria-hidden strokeWidth={2.5} />
              </span>
              {item}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
