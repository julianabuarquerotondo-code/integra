function buildControlCharPattern(): RegExp {
  const ranges: [number, number][] = [
    [0, 8],
    [11, 12],
    [14, 31],
    [127, 127],
  ];
  const chars = ranges
    .flatMap(([start, end]) => {
      const codes: number[] = [];
      for (let c = start; c <= end; c++) codes.push(c);
      return codes;
    })
    .map((code) => String.fromCharCode(code))
    .join("");
  return new RegExp(`[${chars}]`, "g");
}

const CONTROL_CHARS = buildControlCharPattern();

/**
 * Remove marcação HTML e caracteres de controle de um texto livre fornecido pelo usuário.
 * Não aceitamos HTML em nenhum campo do site.
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(CONTROL_CHARS, "").trim();
}

export function sanitizeAnswers<T extends Record<string, unknown>>(answers: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(answers)) {
    if (typeof value === "string") {
      result[key] = sanitizeText(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map((v) => (typeof v === "string" ? sanitizeText(v) : v));
    } else {
      result[key] = value;
    }
  }
  return result as T;
}
