import { MessageCircle, SearchCheck, ClipboardList, Rocket } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorksSteps } from "@/content/site";

const icons = [MessageCircle, SearchCheck, ClipboardList, Rocket];

export function HowItWorks() {
  return (
    <Section background="white">
      <SectionHeading title="Como funciona" align="center" />
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute top-6 right-0 left-0 hidden h-px bg-border lg:block" />
        {howItWorksSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={step.title} delay={index * 100}>
              <div className="relative text-center">
                <span className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-primary text-white shadow-sm shadow-purple-primary/30">
                  <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-purple-dark">{step.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
