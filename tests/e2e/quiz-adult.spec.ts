import { test, expect } from "@playwright/test";

test("adulto: interesse em Neurofeedback resulta no serviço correspondente", async ({ page }) => {
  await page.route("**/api/quiz/submit", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        publicCode: "INT-9ZQ4RT",
        result: {
          key: "neurofeedback",
          label: "Neurofeedback",
          title: "Vale conhecer o Neurofeedback em uma conversa inicial",
          description: "Descrição de teste.",
          nextStepLabel: "Serviço para conhecer primeiro: Neurofeedback",
          orientativeNotice: "Este resultado é orientativo e não representa diagnóstico ou indicação definitiva.",
        },
        whatsappUrl: "https://wa.me/5511999999999?text=teste%20INT-9ZQ4RT",
      }),
    });
  });

  await page.goto("/quiz");
  await page.getByRole("button", { name: "Começar triagem" }).click();
  await page.getByLabel("Idade").fill("30");
  await page.getByRole("button", { name: "Continuar" }).click();

  for (let i = 0; i < 7; i++) {
    const firstOption = page.getByRole("radio").or(page.getByRole("checkbox")).first();
    await firstOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }

  await page.getByLabel("Nome de quem está respondendo").fill("João Teste");
  await page.getByLabel("WhatsApp").fill("11988887777");
  await page.getByLabel("Cidade").fill("Campinas");
  await page.getByRole("button", { name: "Manhã" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByText(/Declaro que sou a própria pessoa/).click();
  await page.getByText(/Autorizo o Instituto Integra\+/).click();
  await page.getByText(/Compreendo que esta triagem/).click();
  await page.getByRole("button", { name: "Enviar triagem" }).click();

  await expect(page.getByText("Neurofeedback", { exact: false })).toBeVisible();
  await expect(page.getByText("INT-9ZQ4RT")).toBeVisible();
});

test("adulto: respostas variadas resultam em conversa inicial", async ({ page }) => {
  await page.route("**/api/quiz/submit", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        publicCode: "INT-3W7H2D",
        result: {
          key: "initial_conversation",
          label: "Conversa inicial com o Instituto",
          title: "Uma conversa inicial é o melhor próximo passo",
          description: "Descrição de teste.",
          nextStepLabel: "Próximo passo: Conversa inicial com o Instituto",
          orientativeNotice: "Este resultado é orientativo e não representa diagnóstico ou indicação definitiva.",
        },
        whatsappUrl: "https://wa.me/5511999999999?text=teste%20INT-3W7H2D",
      }),
    });
  });

  await page.goto("/quiz");
  await page.getByRole("button", { name: "Começar triagem" }).click();
  await page.getByLabel("Idade").fill("35");
  await page.getByRole("button", { name: "Continuar" }).click();

  for (let i = 0; i < 7; i++) {
    const firstOption = page.getByRole("radio").or(page.getByRole("checkbox")).first();
    await firstOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }

  await page.getByLabel("Nome de quem está respondendo").fill("Ana Teste");
  await page.getByLabel("WhatsApp").fill("11977776666");
  await page.getByLabel("Cidade").fill("Santos");
  await page.getByRole("button", { name: "Qualquer horário" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByText(/Declaro que sou a própria pessoa/).click();
  await page.getByText(/Autorizo o Instituto Integra\+/).click();
  await page.getByText(/Compreendo que esta triagem/).click();
  await page.getByRole("button", { name: "Enviar triagem" }).click();

  await expect(page.getByText("Conversa inicial é o melhor próximo passo")).toBeVisible();
});
