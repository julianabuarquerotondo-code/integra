export function QuizProgress({ current, total }: { current: number; total: number }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="mb-6">
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Etapa ${current} de ${total}`}
        className="h-2 w-full overflow-hidden rounded-full bg-soft-lilac"
      >
        <div
          className="h-full rounded-full bg-purple-primary transition-all duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-text-secondary">
        Etapa {current} de {total}
      </p>
    </div>
  );
}
