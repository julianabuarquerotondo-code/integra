import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqItems } from "@/content/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQ() {
  return (
    <Section background="cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionHeading title="Perguntas frequentes" align="center" />
      <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white">
        {faqItems.map((item, index) => (
          <Reveal key={item.question} delay={index * 40}>
            <details className="group p-5 open:bg-soft-lilac/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-purple-dark marker:content-none">
                {item.question}
                <ChevronDown
                  className="size-4 shrink-0 text-purple-primary transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-sm text-text-secondary">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
