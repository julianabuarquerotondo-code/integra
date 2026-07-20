const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // sem O, 0, I, 1
const CODE_LENGTH = 6;
const PREFIX = "INT-";

function randomCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `${PREFIX}${code}`;
}

export interface CodeExistsChecker {
  (code: string): Promise<boolean>;
}

/**
 * Gera um código público único (INT-XXXXXX), verificando colisão via `exists`.
 */
export async function generatePublicCode(
  exists: CodeExistsChecker,
  maxAttempts = 10,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = randomCode();
    if (!(await exists(candidate))) {
      return candidate;
    }
  }
  throw new Error("Não foi possível gerar um código público único.");
}

export function isValidPublicCodeFormat(code: string): boolean {
  return new RegExp(`^INT-[${ALPHABET}]{${CODE_LENGTH}}$`).test(code);
}
