import { test, expect } from "@playwright/test";

test("criança/adolescente: fluxo completo até o resultado com código e WhatsApp", async ({ page }) => {
  await page.route("**/api/quiz/submit", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        publicCode: "INT-4K7P2M",
        result: {
          key: "assessment",
          label: "Avaliação Integrada da Neuroaprendizagem",
          title: "Uma avaliação pode ser o melhor ponto de partida",
          description: "Descrição de teste.",
          nextStepLabel: "Serviço para conhecer primeiro: Avaliação Integrada da Neuroaprendizagem",
          orientativeNotice: "Este resultado é orientativo e não representa diagnóstico ou indicação definitiva.",
        },
        whatsappUrl: "https://wa.me/5511999999999?text=teste%20INT-4K7P2M",
      }),
    });
  });

  await page.goto("/quiz");
  await page.getByRole("button", { name: "Começar triagem" }).click();

  await page.getByRole("radio", { name: "4 a 10 anos" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  // Percorre todas as perguntas do caminho A escolhendo a primeira opção disponível.
  for (let i = 0; i < 11; i++) {
    const firstOption = page.getByRole("radio").or(page.getByRole("checkbox")).first();
    await firstOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }

  await page.getByLabel("Nome de quem está respondendo").fill("Maria Teste");
  await page.getByLabel("WhatsApp", { exact: true }).fill("11999998888");
  await page.getByLabel("Cidade").fill("São Paulo");
  await page.getByRole("button", { name: "Tarde" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByText(/Declaro que sou responsável legal/).click();
  await page.getByText(/Autorizo o Instituto Integra\+/).click();
  await page.getByText(/Compreendo que esta triagem/).click();
  await page.getByRole("button", { name: "Enviar triagem" }).click();

  await expect(page.getByText("Sua triagem foi registrada")).toBeVisible();
  await expect(page.getByText("INT-4K7P2M")).toBeVisible();
  const whatsappLink = page.getByRole("link", { name: /Continuar pelo WhatsApp/ });
  await expect(whatsappLink).toHaveAttribute("href", /INT-4K7P2M/);
});

test("menos de 4 anos: mostra orientação de contato direto sem enviar o questionário", async ({ page }) => {
  await page.goto("/quiz");
  await page.getByRole("button", { name: "Começar triagem" }).click();
  await page.getByRole("radio", { name: "Menos de 4 anos" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByText("Vamos conversar diretamente sobre esse caso")).toBeVisible();
  await expect(page.getByRole("link", { name: /Falar pelo WhatsApp/ })).toBeVisible();
});
