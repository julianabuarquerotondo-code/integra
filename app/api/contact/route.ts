import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/quiz/schemas";
import { sanitizeText } from "@/lib/security/sanitize";
import { isRateLimited, getClientIdentifier } from "@/lib/security/rate-limit";
import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { isEmailConfigured } from "@/lib/email/sendQuizEmail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request.headers);
  if (isRateLimited(`contact:${clientId}`)) {
    return NextResponse.json(
      { success: false, error: "Muitas tentativas. Aguarde um instante e tente novamente." },
      { status: 429 },
    );
  }

  const parsed = contactFormSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Dados inválidos." }, { status: 400 });
  }

  const input = parsed.data;

  if (input.website) {
    return NextResponse.json({ success: true });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { success: false, error: "O envio de mensagens está temporariamente indisponível." },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail({
      ...input,
      name: sanitizeText(input.name),
      message: sanitizeText(input.message),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Não foi possível enviar agora." }, { status: 500 });
  }
}
