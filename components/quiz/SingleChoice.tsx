import type { QuestionOption } from "@/lib/quiz/questions";
import { cn } from "@/lib/utils/cn";

export function SingleChoice({
  options,
  value,
  onChange,
  name,
}: {
  options: QuestionOption[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <div className="grid gap-3" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-[44px] rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors",
              checked
                ? "border-purple-primary bg-soft-lilac text-purple-dark"
                : "border-border bg-white text-text-primary hover:border-purple-primary/50",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
