"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-purple-dark">Algo não saiu como esperado</h1>
      <p className="max-w-md text-text-secondary">
        Ocorreu um erro inesperado. Tente novamente em alguns instantes.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </Container>
  );
}
