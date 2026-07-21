import { ageQuestion, ageBrackets } from "@/lib/quiz/questions";
import { SingleChoice } from "./SingleChoice";

export function AgeQuestion({
  value,
  onChange,
  error,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-dark sm:text-2xl">{ageQuestion.question}</h2>
      <p className="mt-2 text-sm text-text-secondary">{ageQuestion.helper}</p>
      <div className="mt-6">
        <SingleChoice
          options={ageBrackets.map((bracket) => ({ value: bracket.value, label: bracket.label }))}
          value={value}
          onChange={onChange}
          name="age"
        />
        {error ? (
          <p className="mt-2 text-sm text-purple-dark" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
