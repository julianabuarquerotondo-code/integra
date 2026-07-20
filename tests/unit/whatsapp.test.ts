import { describe, expect, it } from "vitest";
import {
  buildQuizWhatsappMessage,
  createQuizWhatsappUrl,
  createWhatsappUrl,
} from "@/lib/whatsapp/createWhatsappUrl";

describe("whatsapp url", () => {
  it("monta a mensagem do quiz com nome, código e resultado", () => {
    const message = buildQuizWhatsappMessage({
      respondentName: "Maria",
      publicCode: "INT-4K7P2M",
      resultLabel: "Avaliação Integrada da Neuroaprendizagem",
    });
    expect(message).toContain("Maria");
    expect(message).toContain("INT-4K7P2M");
    expect(message).toContain("Avaliação Integrada da Neuroaprendizagem");
  });

  it("gera uma URL wa.me com o número e a mensagem codificada", () => {
    const url = createWhatsappUrl("55 11 99999-9999", "Olá!");
    expect(url).toBe("https://wa.me/5511999999999?text=Ol%C3%A1!");
  });

  it("createQuizWhatsappUrl contém o código gerado na URL", () => {
    const url = createQuizWhatsappUrl("5511999999999", {
      respondentName: "João",
      publicCode: "INT-9ZQ4RT",
      resultLabel: "Neurofeedback",
    });
    expect(decodeURIComponent(url)).toContain("INT-9ZQ4RT");
  });
});
