import type { QuestionDef } from "@/lib/quiz/questions";
import { SingleChoice } from "./SingleChoice";
import { MultiChoice } from "./MultiChoice";

export function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: QuestionDef;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}) {
  return (
    <div>
      <h2 tabIndex={-1} id="quiz-question-heading" className="text-xl font-semibold text-purple-dark sm:text-2xl">
        {question.question}
      </h2>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-text-secondary">
        {question.type === "multi" ? (
          <span className="rounded-full bg-soft-blue px-2.5 py-1">Selecione uma ou mais opções</span>
        ) : null}
        {question.optional ? (
          <span className="rounded-full bg-soft-green px-2.5 py-1">Pergunta opcional</span>
        ) : null}
      </div>

      <div className="mt-6">
        {question.type === "single" ? (
          <SingleChoice
            options={question.options}
            value={typeof value === "string" ? value : undefined}
            onChange={onChange}
            name={question.id}
          />
        ) : (
          <MultiChoice
            options={question.options}
            values={Array.isArray(value) ? value : []}
            onChange={onChange}
            name={question.id}
          />
        )}
      </div>
    </div>
  );
}
