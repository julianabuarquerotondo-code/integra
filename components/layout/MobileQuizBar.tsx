"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { QuizCta } from "@/components/ui/QuizCta";
import { ctaCopy } from "@/content/site";

export function MobileQuizBar() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  if (pathname?.startsWith("/quiz") || dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <QuizCta label={ctaCopy.discoveryMain} size="md" className="flex-1 justify-center text-sm" />
        <button
          type="button"
          aria-label="Fechar barra do quiz"
          className="rounded-full p-2 text-text-secondary hover:bg-soft-lilac"
          onClick={() => setDismissed(true)}
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
