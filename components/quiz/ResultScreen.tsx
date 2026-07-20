"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { ButtonLink, Button } from "@/components/ui/Button";
import type { ResultCopy } from "@/lib/quiz/result-copy";

export function ResultScreen({
  publicCode,
  result,
  whatsappUrl,
  emailWarning,
}: {
  publicCode: string;
  result: ResultCopy;
  whatsappUrl: string;
  emailWarning?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(publicCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — sem impacto no fluxo principal
    }
  }

  return (
    <div className="text-center" aria-live="polite">
      <h2 className="text-2xl font-semibold text-purple-dark sm:text-3xl">
        Sua triagem foi registrada
      </h2>

      <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-2xl bg-soft-lilac px-6 py-4">
        <span className="text-xl font-bold tracking-wide text-purple-dark">{publicCode}</span>
        <button
          type="button"
          onClick={copyCode}
          className="rounded-full p-2 text-purple-dark hover:bg-white/60"
          aria-label="Copiar código"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-6 text-left shadow-sm">
        <h3 className="text-lg font-semibold text-purple-dark">{result.title}</h3>
        <p className="mt-2 text-sm text-text-secondary">{result.description}</p>
        <p className="mt-3 text-xs text-text-secondary">{result.orientativeNotice}</p>
      </div>

      <p className="mx-auto mt-6 max-w-xl text-text-secondary">
        {emailWarning
          ? `Sua triagem foi registrada com o código ${publicCode}. O Instituto poderá localizar as informações pelo código. Houve uma dificuldade temporária no envio do resumo por e-mail, mas você pode continuar o contato pelo WhatsApp.`
          : "Suas respostas foram organizadas e encaminhadas ao Instituto Integra+. O botão abaixo abrirá o WhatsApp com o código já preenchido. Basta enviar a mensagem para continuar o contato."}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ButtonLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" size="lg">
          <MessageCircle className="size-4" aria-hidden />
          Continuar pelo WhatsApp
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Voltar ao início
        </ButtonLink>
      </div>
    </div>
  );
}

export function UnderFourResult({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-purple-dark sm:text-3xl">
        Vamos conversar diretamente sobre esse caso
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-text-secondary">
        Para essa faixa etária, o melhor caminho é conversar diretamente com o Instituto para
        verificar quais atendimentos estão disponíveis.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ButtonLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" size="lg">
          <MessageCircle className="size-4" aria-hidden />
          Falar pelo WhatsApp
        </ButtonLink>
        <Button variant="secondary" size="lg" onClick={() => window.history.back()}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
