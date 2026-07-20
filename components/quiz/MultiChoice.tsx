import type { QuestionOption } from "@/lib/quiz/questions";
import { cn } from "@/lib/utils/cn";

export function MultiChoice({
  options,
  values,
  onChange,
  name,
}: {
  options: QuestionOption[];
  values: string[];
  onChange: (values: string[]) => void;
  name: string;
}) {
  function toggle(value: string) {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  }

  return (
    <div className="grid gap-3" role="group" aria-label={name}>
      {options.map((option) => {
        const checked = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => toggle(option.value)}
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
