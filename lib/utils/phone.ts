/**
 * Normaliza um telefone para dígitos apenas, prefixando DDI 55 quando ausente.
 * Mantém a máscara visual separada do valor armazenado.
 */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.startsWith("55") && digits.length > 11) return digits;
  return `55${digits}`;
}

export function maskPhoneDisplay(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
