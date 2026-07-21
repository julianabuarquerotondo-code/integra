# Instituto Integra+

Site institucional do Instituto Integra+ (neuroaprendizagem, psicopedagogia e neuromodulação),
com quiz de triagem, geração de PDF, envio de e-mail e integração com WhatsApp.

## 1. Visão geral

- Páginas institucionais: Início, Serviços, Quem somos, Contato, Política de Privacidade, Termos de Uso.
- Quiz de triagem (`/quiz`) com ramificação por idade (menos de 4 / 4–16 / 17–59 / 60+), lógica de
  direcionamento determinística (`lib/quiz/engine.ts`), geração de código público, PDF e e-mail.
- Formulário de contato simples, também enviado por e-mail.

## 2. Stack

Next.js (App Router, TypeScript estrito) · Tailwind CSS · Supabase (Postgres + Storage privado) ·
Resend · Zod · React Hook Form · `@react-pdf/renderer` · Lucide React · Vitest · Playwright.

## 3. Instalação

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 4. Variáveis de ambiente

Ver `.env.example`. Nenhuma chave secreta usa o prefixo `NEXT_PUBLIC_`.

- `NEXT_PUBLIC_SITE_URL` — URL pública do site (usada em metadata, sitemap, OG).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número do Instituto, apenas dígitos com DDI (ex.: `5511999999999`).
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SECRET_KEY` — projeto Supabase (a secret key nunca deve
  ser exposta ao cliente).
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INSTITUTE_EMAIL` — envio de e-mails via Resend.
- `QUIZ_RETENTION_DAYS` — dias de retenção das submissões (rotina de limpeza via cron).
- `CRON_SECRET` — segredo usado para autorizar a rota `/api/cron/cleanup`.
- `NEXT_PUBLIC_GOOGLE_MAPS_URL` — opcional.

Sem `NEXT_PUBLIC_SUPABASE_URL`/`SUPABASE_SECRET_KEY` configurados, o quiz responde de forma
controlada (503) em vez de falhar — útil para rodar o site localmente sem infraestrutura completa.
Sem Resend configurado, a submissão é salva normalmente e o `email_status` fica `failed` com um
erro registrado, permitindo reenvio posterior via `/api/quiz/resend`.

## 5. Criando o projeto no Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Project Settings → API**, copie a **Project URL** para `NEXT_PUBLIC_SUPABASE_URL` e a
   **service_role key** (secreta) para `SUPABASE_SECRET_KEY`.

## 6. Rodando as migrations

Com a [Supabase CLI](https://supabase.com/docs/guides/cli) configurada:

```bash
supabase link --project-ref <seu-projeto>
supabase db push
```

Ou execute manualmente o conteúdo de `supabase/migrations/001_create_quiz_submissions.sql` e
`002_create_storage_policies.sql` no SQL Editor do painel Supabase, na ordem numérica.

## 7. Criando o bucket privado

A migration `002_create_storage_policies.sql` já cria o bucket `quiz-pdfs` como privado (`public: false`)
e bloqueia qualquer leitura/escrita fora da service role. Nenhuma ação manual adicional é necessária.

## 8. Configurando o Resend

1. Crie uma conta em [resend.com](https://resend.com) e gere uma API key para `RESEND_API_KEY`.
2. Verifique o domínio de envio em **Domains** (ver item 9).
3. Defina `RESEND_FROM_EMAIL` (ex.: `Instituto Integra+ <triagem@seudominio.com.br>`) e
   `INSTITUTE_EMAIL` (caixa que recebe as triagens e mensagens de contato).

## 9. Configurando o domínio de envio

No painel do Resend, adicione o domínio do Instituto e configure os registros DNS (SPF/DKIM)
indicados. Sem domínio verificado, o Resend só permite enviar para o e-mail da conta cadastrada.

## 10. Adicionando o número do WhatsApp

Defina `NEXT_PUBLIC_WHATSAPP_NUMBER` com DDI + DDD + número, apenas dígitos (ex.: `5511999999999`).

## 11. Substituindo logo e fotos

A logo completa e o ícone já foram localizados e copiados automaticamente a partir de
`~/Downloads/Instituto Integra Mais logo/` para:

```text
/public/brand/logo-instituto-integra.png   (fonte: 1.png)
/public/brand/icone-instituto-integra.png  (fonte: 2.png)
/app/icon.png, /app/apple-icon.png, /public/favicon.ico (gerados a partir do ícone)
```

Os arquivos originais só existem em PNG (sem versão vetorial disponível na pasta), por isso não
há `.svg` — se uma versão vetorial for fornecida futuramente, adicione-a em
`/public/brand/logo-instituto-integra.svg` e `/public/brand/icone-instituto-integra.svg` e
atualize as referências em `components/layout/Header.tsx` e `components/layout/Footer.tsx`.

Fotos ainda pendentes (usar placeholders elegantes já preparados no layout até serem fornecidas):

```text
/public/images/profissional.jpg
/public/images/espaco-01.jpg
/public/images/espaco-02.jpg
/public/images/neurofeedback.jpg
/public/og/og-instituto-integra.jpg
```

## 12. Editando os textos

Todo o conteúdo institucional está centralizado e tipado em `content/`:

- `content/site.ts` — dados institucionais, navegação, CTAs, textos de seções da home.
- `content/services.ts` — os 4 serviços principais e serviços complementares.
- `content/faq.ts` — perguntas frequentes.
- `content/legal.ts` — minutas de Política de Privacidade e Termos de Uso.

Campos entre colchetes (`[NOME DA PROFISSIONAL]` etc.) são placeholders — ver seção 18.

## 13. Rodando os testes

```bash
npm run test        # Vitest — engine do quiz, código público, WhatsApp
npm run test:e2e     # Playwright — fluxo completo do quiz (requer npx playwright install)
```

## 14. Deploy na Vercel

1. Suba o repositório para o GitHub/GitLab/Bitbucket.
2. Importe o projeto na Vercel.
3. Configure todas as variáveis de `.env.example` em **Project Settings → Environment Variables**.
4. Defina `NEXT_PUBLIC_SITE_URL` com a URL final de produção.
5. Deploy.

## 15. Configurando domínio

Em **Project Settings → Domains** na Vercel, adicione o domínio do Instituto e siga as instruções
de DNS. Atualize `NEXT_PUBLIC_SITE_URL` após a configuração.

## 16. Vercel Cron

O `vercel.json` já está configurado para rodar `/api/cron/cleanup` todo dia às 6h. Além de aplicar
a retenção (`QUIZ_RETENTION_DAYS`), essa chamada diária também mantém o projeto Supabase ativo —
projetos gratuitos do Supabase pausam sozinhos após 7 dias sem nenhuma atividade, e uma chamada
por dia evita isso com folga.

A rota exige o header `Authorization: Bearer <CRON_SECRET>` — a Vercel Cron já envia esse header
automaticamente quando `CRON_SECRET` está configurado nas variáveis de ambiente do projeto na
Vercel (não esqueça de adicioná-lo lá também, além do `.env.local`).

## 17. Testando PDF e e-mail

Com `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` e
`INSTITUTE_EMAIL` configurados, complete o quiz em `/quiz` normalmente: o PDF é gerado, salvo no
bucket privado `quiz-pdfs` e anexado ao e-mail enviado para `INSTITUTE_EMAIL`. Sem essas variáveis,
o fluxo permanece funcional para desenvolvimento (ver seção 4).

## 18. Dados ainda pendentes

Estes dados **não foram inventados** e precisam ser fornecidos antes da publicação:

- ~~Nome, formação e mensagem da profissional~~ — preenchidos (Vanessa Rotondo). Sem registros
  profissionais por opção da própria profissional.
- Foto da profissional (placeholder ilustrado em uso).
- ~~Endereço, WhatsApp e horário~~ — preenchidos em `content/site.ts`.
- E-mail de contato (`content/site.ts` → `email`) e de recebimento das triagens (`INSTITUTE_EMAIL`).
- Modalidade on-line (sim/não).
- Link do Instagram.
- Fotos do espaço e dos equipamentos (placeholders ilustrados em uso).
- Domínio final e e-mail remetente verificado no Resend.
- Prazo de retenção definitivo (`QUIZ_RETENTION_DAYS`), aprovado pelo responsável.
- Revisão jurídica dos textos legais (ver aviso abaixo).

## 19. Aviso — revisão jurídica

Os textos de `/politica-de-privacidade` e `/termos-de-uso` são **minutas** geradas para estruturar
o site (ver `legalReviewNotice` em `content/legal.ts`, exibido nas próprias páginas). Eles precisam
ser revisados e validados pelo responsável pelo Instituto Integra+ e, idealmente, por profissional
jurídico especializado em LGPD antes da publicação definitiva.

## 20. Checklist antes de produção

- [ ] `npm run check` (lint + typecheck + test + build) passando.
- [ ] Variáveis de ambiente reais configuradas na Vercel.
- [ ] Domínio configurado e `NEXT_PUBLIC_SITE_URL` atualizado.
- [ ] Domínio verificado no Resend.
- [ ] Teste real do quiz (3 caminhos etários) em produção.
- [ ] Teste de e-mail (recebimento com PDF anexado).
- [ ] Teste do WhatsApp (link com código preenchido).
- [ ] Teste em celular.
- [ ] Revisão visual confirmando ausência de vermelho na interface fora da logo.
- [ ] Política de Privacidade e Termos de Uso revisados juridicamente.
- [ ] Todos os dados da seção 18 preenchidos.

## Scripts

```bash
npm run dev         # ambiente de desenvolvimento
npm run build       # build de produção
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest
npm run test:e2e    # Playwright
npm run check       # lint + typecheck + test + build
```
