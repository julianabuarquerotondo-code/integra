"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { QuizShell } from "./QuizShell";
import { cn } from "@/lib/utils/cn";

export function FloatingQuizWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  if (pathname?.startsWith("/quiz")) return null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-4 z-50 flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-border transition-all duration-300 sm:inset-auto sm:right-5 sm:bottom-24 sm:h-[600px] sm:w-[380px]",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Triagem rápida do Instituto Integra+"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/icone-instituto-integra.png"
              alt=""
              width={28}
              height={28}
              className="size-7"
            />
            <span className="text-sm font-semibold text-purple-dark">Instituto Integra+</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="inline-flex size-8 items-center justify-center rounded-lg text-text-secondary hover:bg-soft-lilac hover:text-purple-dark"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{open ? <QuizShell variant="widget" /> : null}</div>
      </div>

      <div className="fixed right-5 bottom-5 z-50 flex items-center gap-3">
        {!open && !teaserDismissed ? (
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-purple-dark shadow-lg ring-1 ring-border">
            Conte o que você está percebendo
            <button
              type="button"
              onClick={() => setTeaserDismissed(true)}
              aria-label="Dispensar mensagem"
              className="text-text-secondary hover:text-purple-dark"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar chat de triagem" : "Abrir chat de triagem"}
          aria-expanded={open}
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-purple-primary text-white shadow-lg shadow-purple-primary/30 transition-transform hover:scale-105 hover:bg-purple-dark"
        >
          {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
        </button>
      </div>
    </>
  );
}
