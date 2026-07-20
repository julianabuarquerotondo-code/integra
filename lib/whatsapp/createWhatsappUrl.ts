export interface WhatsappMessageParams {
  respondentName: string;
  publicCode: string;
  resultLabel: string;
}

export function buildQuizWhatsappMessage({
  respondentName,
  publicCode,
  resultLabel,
}: WhatsappMessageParams): string {
  return `Olá! Respondi à triagem rápida no site do Instituto Integra+.

Meu nome é ${respondentName} e o código do meu questionário é *${publicCode}*.

A orientação inicial apresentada foi: ${resultLabel}.

Gostaria de conversar sobre o próximo passo.`;
}

export function createWhatsappUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function createQuizWhatsappUrl(
  number: string,
  params: WhatsappMessageParams,
): string {
  return createWhatsappUrl(number, buildQuizWhatsappMessage(params));
}
