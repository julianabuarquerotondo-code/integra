import { MessageCircle, SearchCheck, ClipboardList, Rocket } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorksSteps } from "@/content/site";

const icons = [MessageCircle, SearchCheck, ClipboardList, Rocket];

export function HowItWorks() {
  return (
    <Section background="white">
      <SectionHeading title="Como funciona" align="center" />
      <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute top-7 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
        {howItWorksSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={step.title} delay={index * 100}>
              <div className="relative text-center">
                <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-primary text-white shadow-md shadow-purple-primary/30 ring-4 ring-white">
                  <Icon className="size-6" aria-hidden strokeWidth={1.75} />
                  <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-purple-dark">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-base font-semibold text-purple-dark">{step.title}</h3>
                <p className="mt-2 text-sm text-pretty text-text-secondary">{step.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
