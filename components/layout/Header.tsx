"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation, ctaCopy, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-border shadow-sm" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-instituto-integra.png"
            alt="Instituto Integra+"
            width={330}
            height={125}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Menu principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium text-text-secondary transition-colors hover:text-purple-dark",
                "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-purple-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                pathname === item.href && "text-purple-dark after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {siteConfig.instagramUrl ? (
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Instituto Integra+"
              className="inline-flex size-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-soft-lilac hover:text-purple-dark"
            >
              <InstagramIcon className="size-5" />
            </a>
          ) : null}
          <WhatsappCta size="md" />
          <ButtonLink href="/contato" size="md">
            {ctaCopy.direct}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-purple-dark md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border bg-white transition-[grid-template-rows] duration-300 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Menu mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-base font-medium text-text-secondary hover:bg-soft-lilac",
                  pathname === item.href && "bg-soft-lilac text-purple-dark",
                )}
              >
                {item.label}
              </Link>
            ))}
            <WhatsappCta size="md" className="mt-2 justify-center" />
            <ButtonLink
              href="/contato"
              size="md"
              className="mt-2 justify-center"
              onClick={() => setOpen(false)}
            >
              {ctaCopy.direct}
            </ButtonLink>
            {siteConfig.instagramUrl ? (
              <div className="mt-3 flex items-center justify-center">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram do Instituto Integra+"
                  className="inline-flex size-10 items-center justify-center rounded-xl text-text-secondary hover:bg-soft-lilac hover:text-purple-dark"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
