import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { privacyPolicy, legalReviewNotice } from "@/content/legal";
import { formatDateBR } from "@/lib/utils/date";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Section background="white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-2xl border border-gold/40 bg-soft-lilac p-4 text-sm text-text-secondary">
          {legalReviewNotice}
        </div>
        <h1 className="text-3xl font-semibold text-purple-dark">{privacyPolicy.title}</h1>
        <p className="mt-2 text-sm text-text-secondary">
          {privacyPolicy.updatedAtLabel}: {formatDateBR(new Date())}
        </p>
        <div className="mt-8 space-y-6">
          {privacyPolicy.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-purple-dark">{section.heading}</h2>
              <p className="mt-2 text-sm text-text-secondary">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
