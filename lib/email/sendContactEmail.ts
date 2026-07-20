import "server-only";
import { Resend } from "resend";
import type { ContactFormInput } from "@/lib/quiz/schemas";

export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.INSTITUTE_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error(
      "Resend não está configurado. Defina RESEND_API_KEY, RESEND_FROM_EMAIL e INSTITUTE_EMAIL.",
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2F2932;">
      <h2 style="color:#75507F;">Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${input.name}</p>
      <p><strong>WhatsApp:</strong> ${input.whatsapp}</p>
      ${input.email ? `<p><strong>E-mail:</strong> ${input.email}</p>` : ""}
      <p><strong>Faixa etária:</strong> ${input.ageRange}</p>
      <p><strong>Serviço de interesse:</strong> ${input.serviceInterest}</p>
      <p><strong>Mensagem:</strong> ${input.message}</p>
    </div>
  `;

  await resend.emails.send({
    from,
    to,
    subject: `Novo contato pelo site — ${input.name}`,
    html,
  });
}
