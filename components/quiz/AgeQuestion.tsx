import { ageQuestion } from "@/lib/quiz/questions";

export function AgeQuestion({
  value,
  onChange,
  error,
}: {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-dark sm:text-2xl">{ageQuestion.question}</h2>
      <p className="mt-2 text-sm text-text-secondary">{ageQuestion.helper}</p>
      <div className="mt-6 max-w-xs">
        <label htmlFor="age" className="sr-only">
          Idade
        </label>
        <input
          id="age"
          type="number"
          inputMode="numeric"
          min={0}
          max={120}
          value={value ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === "" ? undefined : Number(raw));
          }}
          className="min-h-[44px] w-full rounded-2xl border border-border px-4 py-3 text-lg font-medium text-purple-dark focus:border-purple-primary focus:outline-none"
          placeholder="Ex: 8"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "age-error" : undefined}
        />
        {error ? (
          <p id="age-error" className="mt-2 text-sm text-purple-dark" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
