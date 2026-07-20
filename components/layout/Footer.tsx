import Image from "next/image";
import Link from "next/link";
import { AtSign, MapPin, Mail, Phone } from "lucide-react";
import { siteConfig, navigation } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/logo-instituto-integra.png"
              alt="Instituto Integra+"
              width={160}
              height={44}
              className="h-9 w-auto"
            />
            <p className="mt-4 text-sm text-text-secondary">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-purple-dark">Navegação</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-purple-dark">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-purple-dark">Contato</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" aria-hidden />
                {siteConfig.whatsappDisplay}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden />
                {siteConfig.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {siteConfig.city}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-purple-dark">Legal</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-purple-dark">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:text-purple-dark">
                  Termos de Uso
                </Link>
              </li>
              {siteConfig.instagramUrl ? (
                <li>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-purple-dark"
                  >
                    <AtSign className="size-4 shrink-0" aria-hidden />
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-text-secondary">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Este site possui caráter informativo e
            não substitui avaliação, diagnóstico ou acompanhamento profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}
