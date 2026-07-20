import { bestContactTimeOptions } from "@/lib/quiz/questions";
import { maskPhoneDisplay } from "@/lib/utils/phone";
import type { BestContactTime } from "@/lib/quiz/types";

export interface ContactStepValues {
  respondentName: string;
  subjectNameOrInitials: string;
  phone: string;
  email: string;
  city: string;
  bestContactTime: BestContactTime | "";
  additionalNotes: string;
}

export function ContactStep({
  values,
  onChange,
  errors,
}: {
  values: ContactStepValues;
  onChange: (values: ContactStepValues) => void;
  errors: Partial<Record<keyof ContactStepValues, string>>;
}) {
  function set<K extends keyof ContactStepValues>(key: K, value: ContactStepValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-dark sm:text-2xl">
        Para finalizar, como podemos entrar em contato?
      </h2>
      <div className="mt-6 grid gap-5">
        <Field label="Nome de quem está respondendo" htmlFor="respondentName" error={errors.respondentName}>
          <input
            id="respondentName"
            className="min-h-[44px] w-full rounded-2xl border border-border px-4 py-3 focus:border-purple-primary focus:outline-none"
            value={values.respondentName}
            onChange={(e) => set("respondentName", e.target.value)}
          />
        </Field>

        <Field label="WhatsApp" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            className="min-h-[44px] w-full rounded-2xl border border-border px-4 py-3 focus:border-purple-primary focus:outline-none"
            value={maskPhoneDisplay(values.phone)}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>

        <Field label="Cidade" htmlFor="city" error={errors.city}>
          <input
            id="city"
            className="min-h-[44px] w-full rounded-2xl border border-border px-4 py-3 focus:border-purple-primary focus:outline-none"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </Field>

        <fieldset>
          <legend className="mb-1 block text-sm font-medium text-purple-dark">
            Melhor período para contato
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {bestContactTimeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => set("bestContactTime", option.value as BestContactTime)}
                className={`min-h-[44px] rounded-2xl border px-3 py-2 text-sm font-medium ${
                  values.bestContactTime === option.value
                    ? "border-purple-primary bg-soft-lilac text-purple-dark"
                    : "border-border bg-white text-text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.bestContactTime ? (
            <p className="mt-1 text-sm text-purple-dark" role="alert">
              {errors.bestContactTime}
            </p>
          ) : null}
        </fieldset>

        <Field label="E-mail (opcional)" htmlFor="email">
          <input
            id="email"
            type="email"
            className="min-h-[44px] w-full rounded-2xl border border-border px-4 py-3 focus:border-purple-primary focus:outline-none"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>

        <Field label="Primeiro nome ou iniciais da pessoa para quem busca atendimento (opcional)" htmlFor="subjectNameOrInitials">
          <input
            id="subjectNameOrInitials"
            className="min-h-[44px] w-full rounded-2xl border border-border px-4 py-3 focus:border-purple-primary focus:outline-none"
            value={values.subjectNameOrInitials}
            onChange={(e) => set("subjectNameOrInitials", e.target.value)}
          />
        </Field>

        <Field
          label="Conte brevemente o que mais preocupa você atualmente (opcional)"
          htmlFor="additionalNotes"
        >
          <textarea
            id="additionalNotes"
            rows={4}
            maxLength={1500}
            className="w-full rounded-2xl border border-border px-4 py-3 focus:border-purple-primary focus:outline-none"
            value={values.additionalNotes}
            onChange={(e) => set("additionalNotes", e.target.value)}
          />
          <p className="mt-1 text-xs text-text-secondary">
            {values.additionalNotes.length}/1500 caracteres
          </p>
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-purple-dark">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-sm text-purple-dark" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
