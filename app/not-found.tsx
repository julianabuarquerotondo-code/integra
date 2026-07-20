import { ButtonLink } from "@/components/ui/Button";
import { QuizCta } from "@/components/ui/QuizCta";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-purple-dark">Página não encontrada</h1>
      <p className="max-w-md text-text-secondary">
        A página que você procura não existe ou foi movida. Você pode voltar ao início ou
        responder à triagem rápida.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="secondary">
          Voltar ao início
        </ButtonLink>
        <QuizCta />
      </div>
    </Container>
  );
}
