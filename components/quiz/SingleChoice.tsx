import { Circle, CircleCheck } from "lucide-react";
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
              "flex min-h-[44px] items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
              checked
                ? "border-purple-primary bg-soft-lilac text-purple-dark shadow-sm"
                : "border-border bg-white text-text-primary hover:-translate-y-0.5 hover:border-purple-primary/50 hover:shadow-sm",
            )}
          >
            {checked ? (
              <CircleCheck className="size-5 shrink-0 text-purple-primary" aria-hidden strokeWidth={1.75} />
            ) : (
              <Circle className="size-5 shrink-0 text-border" aria-hidden strokeWidth={1.75} />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
