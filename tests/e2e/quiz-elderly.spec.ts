import { test, expect } from "@playwright/test";

test("idoso: mudança repentina resulta em orientação para avaliação de saúde", async ({ page }) => {
  await page.route("**/api/quiz/submit", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        publicCode: "INT-7Y2K9P",
        result: {
          key: "health_evaluation_first",
          label: "Conversa inicial e orientação para avaliação de saúde",
          title: "É importante conversar com um serviço de saúde",
          description: "Descrição de teste.",
          nextStepLabel: "Próximo passo: conversa inicial e orientação para avaliação de saúde",
          orientativeNotice: "Este resultado é orientativo e não representa diagnóstico ou indicação definitiva.",
        },
        whatsappUrl: "https://wa.me/5511999999999?text=teste%20INT-7Y2K9P",
      }),
    });
  });

  await page.goto("/quiz");
  await page.getByRole("button", { name: "Começar triagem" }).click();
  await page.getByLabel("Idade").fill("70");
  await page.getByRole("button", { name: "Continuar" }).click();

  for (let i = 0; i < 8; i++) {
    const firstOption = page.getByRole("radio").or(page.getByRole("checkbox")).first();
    await firstOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }

  await page.getByLabel("Nome de quem está respondendo").fill("Carlos Teste");
  await page.getByLabel("WhatsApp").fill("11966665555");
  await page.getByLabel("Cidade").fill("Sorocaba");
  await page.getByRole("button", { name: "Noite" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByText(/Declaro que sou a própria pessoa/).click();
  await page.getByText(/Autorizo o Instituto Integra\+/).click();
  await page.getByText(/Compreendo que esta triagem/).click();
  await page.getByRole("button", { name: "Enviar triagem" }).click();

  await expect(page.getByText("É importante conversar com um serviço de saúde")).toBeVisible();
  await expect(page.getByText("INT-7Y2K9P")).toBeVisible();
});
